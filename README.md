# 🎯 Feedback Trainer - AI-Powered Communication Skills Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node 16+](https://img.shields.io/badge/node-16+-green.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/react-18-61dafb.svg)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.104-009688.svg)](https://fastapi.tiangolo.com/)

**Interactive dialogue trainer for communication skills with AI-powered feedback**

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

**Feedback Trainer** is an interactive platform for learning and improving communication skills through realistic role-play conversations with AI. Users engage in dialogues with virtual characters (like a manager giving feedback) and receive detailed AI-powered assessments of their communication performance.

Perfect for:
- 🏢 Corporate training programs
- 👤 Individual skill development
- 🎓 Leadership training
- 💼 Customer service training
- 💰 Sales training

---

## ✨ Features

- 🤖 **AI-Powered Conversations** - Real-time dialogue with Groq LLM-powered characters
- 📊 **Automatic Assessment** - Intelligent analysis across multiple communication dimensions
- 💬 **Multiple Scenarios** - Manager feedback, sales, customer support
- 🎯 **Detailed Feedback** - Scores, strengths, and improvement recommendations
- 🔥 **Hot Reload Development** - Instant code updates without manual reloads
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔒 **Secure API** - FastAPI with CORS and validation
- 📚 **Comprehensive Docs** - Setup guides, API docs, architecture

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+
- Groq API Key (free from [groq.com](https://console.groq.com))

### One-Command Setup (5 minutes)

```bash
cd "/Users/irinaurazanova/Desktop/Демо тренажер"
chmod +x start-dev.sh
./start-dev.sh
```

**That's it!** Both servers start with hot reload enabled automatically.

### Manual Setup

```bash
# 1. Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "GROQ_API_KEY=your_key_here" > .env
uvicorn main:app --reload --port 8888

# 2. Frontend (new terminal)
cd frontend
npm install
npm start  # Opens http://localhost:3333
```

---

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICKSTART.md](./QUICKSTART.md)** | 5-minute setup guide |
| **[SETUP.md](./SETUP.md)** | Detailed installation steps |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System design & components |
| **[API_EXAMPLES.md](./API_EXAMPLES.md)** | API endpoint examples |
| **[HOT_RELOAD.md](./HOT_RELOAD.md)** | Development hot reload guide |

---

## 🏗️ Project Structure

```
feedback-trainer/
├── backend/                          # FastAPI Server
│   ├── main.py                       # API endpoints
│   ├── services/
│   │   ├── groq_service.py          # LLM integration
│   │   └── evaluator.py             # Assessment engine
│   ├── requirements.txt
│   └── run-dev.sh                   # Dev launcher
│
├── frontend/                         # React + TypeScript
│   ├── src/
│   │   ├── components/              # UI components
│   │   ├── pages/                   # Pages (Dialog, Feedback)
│   │   ├── services/                # API client
│   │   ├── styles/                  # CSS
│   │   └── App.tsx
│   ├── package.json
│   └── run-dev.sh                   # Dev launcher
│
├── start-dev.sh                     # One-command startup
├── HOT_RELOAD.md                    # Hot reload guide
├── ARCHITECTURE.md                  # Architecture doc
├── SETUP.md                         # Install guide
└── README.md                        # This file
```

---

## 🎯 Current Scenario

**Manager Feedback Session:**
- Situation: Manager provides feedback on team communication
- Duration: 6-8 message exchanges
- Assessment Metrics:
  - Openness (0-100): Receptiveness to feedback
  - Empathy (0-100): Understanding perspective
  - Clarity (0-100): Clear expression
  - Constructiveness (0-100): Solution-oriented

---

## 📡 API Endpoints

```
GET  /health                    Check server status
GET  /api/init-scenario         Get first AI message
POST /api/dialog                Send user message, get response
POST /api/evaluate              Get feedback on conversation
```

Full API docs at: `http://localhost:8888/docs` (Swagger UI)

---

## 🛠️ Technology Stack

**Backend:**
- FastAPI 0.104 (Web framework)
- Uvicorn 0.24 (ASGI server)
- Groq API (LLM inference)
- Pydantic 2.5 (Data validation)

**Frontend:**
- React 18 (UI framework)
- TypeScript 4.9 (Type safety)
- Axios 1.6 (HTTP client)
- CSS3 (Responsive design)

---

## 🔥 Hot Reload Features

### Backend
- **File watching:** Python changes auto-reload (0.5-2 sec)
- **Command:** `./run-dev.sh` or `uvicorn main:app --reload`

### Frontend
- **Fast Refresh:** Component updates (< 100ms)
- **Command:** `npm start` or `npm run dev`

See [HOT_RELOAD.md](./HOT_RELOAD.md) for details.

---

## 🧪 Testing

```bash
# Health check
curl http://localhost:8888/health

# API docs (interactive)
open http://localhost:8888/docs

# Frontend
open http://localhost:3333
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Module not found" (Python) | `pip install -r requirements.txt` |
| "npm not found" | Install Node.js 16+ |
| "Groq API error" | Check API key in `.env` |
| "Port already in use" | Change port or kill process |
| "Cannot find module" (npm) | `rm -rf node_modules && npm install` |

See [SETUP.md](./SETUP.md) for detailed troubleshooting.

---

## 📊 Development Workflow

```
Edit file → Auto-reload → Test changes → Repeat
    ↓          ↓              ↓
  Backend   (0.5-2s)   Health check
  Frontend  (<100ms)   Browser refresh
```

---

## 🚀 Production Deployment

```bash
# Backend
pip install gunicorn
gunicorn main:app --workers 4

# Frontend
npm run build
# Deploy build/ to static hosting
```

---

## 🤝 Contributing

```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes
# 3. Commit changes
git commit -m "Add your feature"

# 4. Push and create PR
git push origin feature/your-feature
```

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

## 👨‍💻 Built With

- [Groq](https://groq.com) - Ultra-fast LLM inference
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://react.dev/) - UI library
- [Uvicorn](https://www.uvicorn.org/) - ASGI server

---

## 📞 Need Help?

1. 📖 Check [SETUP.md](./SETUP.md) for installation help
2. 🔗 Read [API_EXAMPLES.md](./API_EXAMPLES.md) for API usage
3. 🏗️ See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
4. 🔥 Check [HOT_RELOAD.md](./HOT_RELOAD.md) for development

---

<div align="center">

**Built with ❤️ for better communication skills**

[⬆ Back to top](#feedback-trainer---ai-powered-communication-skills-platform)

</div>
