# AI Chatbot

This is a simple AI Chatbot web application using HTML, CSS, and JavaScript. It provides an interactive chat interface where users can ask questions and receive AI-generated responses.

## Features
- Interactive chat interface
- AI-generated responses using Google AI API
- Supports image upload for analysis
- Responsive design for both desktop and mobile

## Project Structure
```
📁 AI Chatbot
├── index.html           # Main HTML file
├── style.css            # Styling with CSS
├── script.js            # JavaScript logic
├── ai.png               # AI avatar image
├── img.svg              # Image upload icon
├── submit.svg           # Submit button icon
├── load.svg             # Loading animation icon
├── user.png             # User avatar image
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-chatbot.git
```

2. Navigate to the project directory:
```bash
cd ai-chatbot
```

3. Open the `index.html` file in your browser.

## Configuration
- Update the API key in the `script.js` file:
```javascript
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY";
```
- Replace `YOUR_API_KEY` with a valid API key from Google AI.

## Usage
1. Enter your question in the input field.
2. Optionally upload an image using the upload button.
3. Click the submit button to receive an AI-generated response.

## Screenshots
- AI and User Chat Bubbles
- Image Upload Interface
- Loading Animation

## License
This project is licensed under the MIT License. Feel free to modify and distribute it.

## Acknowledgments
- Google AI API for AI Responses
- Icons from the project files

---

**Happy Chatting!**

