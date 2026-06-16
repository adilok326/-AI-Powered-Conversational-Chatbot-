# AI-Powered Conversational Chatbot

A full-stack, responsive conversational AI web application built using Python, Flask, and the Google Gemini API. The application provides a modern, ChatGPT-like interface featuring real-time dialogue processing, server-side context-aware conversation memory, and an optimized dark-themed user experience.

## 🚀 Features

* **Real-Time Responses:** Interfaces asynchronously with the Google Gemini API (`gemini-2.5-flash`) for rapid text generation.
* **Context-Aware Memory:** Implements server-side session tracking using Flask states to handle seamless multi-turn conversations.
* **Robust Backend Proxy:** Abstracts API logic to secure sensitive credentials and prevent client-side exposure.
* **Modern UI/UX:** Dark-mode interface designed with responsive CSS, interactive layout structures, and animated typing indicators.
* **Dynamic Input Handling:** Client-side JavaScript manages asynchronous DOM injection and runtime input validation.

### 📸 Application Interface
![Chat Application UI](images/Screenshot%202026-06-16%20190407.png)
## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Variables & Keyframe Animations), JavaScript (ES6 Fetch API, DOM Manipulation)
* **Backend:** Python 3.12+, Flask (Session State Management, Routing)
* **AI Integration:** Google GenAI SDK (`google-genai`)
* **Environment Management:** Python-dotenv

---

## 📂 Project Structure

```text
chatbot/
│
├── app.py                 
├── requirements.txt       
├── .env                  
│
├── templates/
│   └── index.html         
│
└── static/
    ├── style.css         
    └── script.js        
