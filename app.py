import os
from flask import Flask, render_template, request, jsonify, session
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "super-secret-development-key")

try:
    client = genai.Client()
except Exception as e:
    raise ValueError("Failed to initialize Gemini Client. Ensure GEMINI_API_KEY environment variable is set.")

SYSTEM_INSTRUCTION = "You are a helpful, friendly, and intelligent AI assistant."

@app.route("/")
def index():
    if "history" not in session:
        session["history"] = []
    return render_template("index.html")  # Must be in templates/ folder

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").strip()
    if not user_message:
        return jsonify({"error": "Message cannot be empty."}), 400

    history = session.get("history", [])

    try:
        formatted_contents = []
        for msg in history:
            formatted_contents.append(
                types.Content(role=msg["role"], parts=[types.Part.from_text(text=msg["content"])])
            )

        formatted_contents.append(
            types.Content(role="user", parts=[types.Part.from_text(text=user_message)])
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=formatted_contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION
            )
        )
        ai_response = response.text

        history.append({"role": "user", "content": user_message})
        history.append({"role": "model", "content": ai_response})
        session["history"] = history
        session.modified = True

        return jsonify({"response": ai_response})

    except Exception as e:
        print(f"Error communicating with Gemini API: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route("/clear", methods=["POST"])
def clear_history():
    session["history"] = []
    return jsonify({"status": "success", "message": "Chat history cleared."})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
