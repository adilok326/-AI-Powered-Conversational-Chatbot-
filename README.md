# AI Powered Conversational Chatbot-
Developed an LLM-powered chatbot with conversational memory and a responsive web interface using Flask and modern frontend technologies.
# AI Chatbot with LLM API Integration

A lightweight conversational AI chatbot built using Python, Flask, and a Large Language Model (LLM) API. The application provides a ChatGPT-like interface where users can interact with an AI assistant through a clean web-based UI.

## Features

* Real-time conversational AI responses
* Integration with OpenAI/Gemini API
* Context-aware conversation memory
* Customizable system prompts
* Responsive chat interface
* Error handling and input validation
* Chat history management
* Scalable backend architecture

## System Architecture

The application follows a client-server architecture:

User → Frontend UI → Flask Backend → LLM API → Response Generation → Frontend Display

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### AI Integration

* OpenAI API / Gemini API

## Project Structure

```text
chatbot/
│
├── app.py
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html
│
├── images/
│   └── architecture.png
│
├── requirements.txt
└── README.md
```

## Workflow

1. User enters a message through the chat interface.
2. Frontend sends the request to the backend API.
3. Backend processes the request and maintains conversation history.
4. Message is forwarded to the LLM API.
5. AI-generated response is returned to the frontend.
6. Response is displayed dynamically in the chat window.

## Future Enhancements

* Response streaming
* Database-backed chat history
* Authentication and user profiles
* Retrieval-Augmented Generation (RAG)
* PDF document chatbot
* Multi-model support
* Voice input and output

## Installation

```bash
git clone <repository-url>
cd chatbot
pip install -r requirements.txt
python app.py
```

## Learning Outcomes

* REST API integration
* Prompt engineering
* Frontend-backend communication
* State and memory management
* LLM application development
* Web deployment workflows

```
```
