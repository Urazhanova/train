# 🏗️ Архитектура Feedback Trainer

Документация архитектуры приложения Feedback Trainer.

## 📊 Общая архитектура

```
┌─────────────────────┐
│   Frontend (React)  │
│   localhost:3000    │
└──────────┬──────────┘
           │
           │ HTTP/REST API
           │
┌──────────▼──────────┐
│  Backend (FastAPI)  │
│   localhost:8000    │
└──────────┬──────────┘
           │
           │ LLM API
           │
┌──────────▼──────────┐
│   Groq API (LLM)    │
│   cloud.groq.com    │
└─────────────────────┘
```

## 🎯 Поток данных

### 1. Инициализация

```
User Opens App
    ↓
Frontend: apiService.initDialog()
    ↓
Backend: GET /api/init-scenario
    ↓
Groq: Generate initial manager message
    ↓
Return to Frontend: DialogPage loaded
```

### 2. Диалог

```
User types message
    ↓
Frontend: apiService.sendMessage(userMessage, history)
    ↓
Backend: POST /api/dialog
    │
    ├─ Groq: Generate manager response
    │
    ↓
Return to Frontend: New message displayed
```

### 3. Оценка

```
User clicks "Завершить и получить оценку"
    ↓
Frontend: apiService.evaluateConversation(history)
    ↓
Backend: POST /api/evaluate
    │
    ├─ Groq: Analyze conversation
    ├─ Parse JSON response
    ├─ Return scores and feedback
    │
    ↓
Frontend: FeedbackPage displayed
```

## 🗂️ Структура компонентов

### Backend (Python)

```
backend/
├── main.py
│   ├── FastAPI app initialization
│   ├── CORS setup
│   ├── Route handlers:
│   │   ├── GET /health
│   │   ├── GET /api/init-scenario
│   │   ├── POST /api/dialog
│   │   └── POST /api/evaluate
│   └── Error handling
│
├── services/
│   ├── groq_service.py
│   │   ├── GroqService class
│   │   │   ├── __init__(api_key)
│   │   │   ├── get_initial_scenario()
│   │   │   ├── get_feedback_response(user_message, history)
│   │   │   └── [groq.chat.completions.create(...)]
│   │   │
│   │   └── DialogueScenarios
│   │       └── SCENARIOS dict
│   │
│   └── evaluator.py
│       ├── FeedbackEvaluator class
│       │   ├── __init__()
│       │   ├── evaluate(conversation_history)
│       │   │   ├── Build conversation text
│       │   │   ├── Create evaluation prompt
│       │   │   ├── Call Groq API
│       │   │   ├── Parse JSON response
│       │   │   └── Return FeedbackResponse
│       │   ├── _build_conversation_text()
│       │   └── _create_default_evaluation()
│       │
│       └── FeedbackResponse (Pydantic model)
│           ├── score: float
│           ├── communication_score: float
│           ├── empathy_score: float
│           ├── clarity_score: float
│           ├── feedback: str
│           ├── strengths: List[str]
│           └── improvements: List[str]
```

### Frontend (React)

```
frontend/src/
├── App.tsx
│   ├── State management:
│   │   ├── page: 'loading' | 'dialog' | 'feedback'
│   │   ├── conversationHistory: Message[]
│   │   ├── isLoading: boolean
│   │   ├── feedback: FeedbackResponse
│   │   └── error: string | null
│   │
│   ├── useEffect: Initialize app
│   ├── Handlers:
│   │   ├── handleSendMessage()
│   │   ├── handleFinish()
│   │   └── handleRestart()
│   │
│   └── Render:
│       ├── DialogPage (if page === 'dialog')
│       ├── FeedbackPage (if page === 'feedback')
│       └── Loading / Error states
│
├── pages/
│   ├── DialogPage.tsx
│   │   ├── Props:
│   │   │   ├── conversationHistory
│   │   │   ├── isLoading
│   │   │   ├── onSendMessage()
│   │   │   └── onFinish()
│   │   │
│   │   └── Components:
│   │       ├── Dialog header
│   │       ├── Messages container
│   │       │   └── MessageBubble[] (from conversationHistory)
│   │       └── Input section
│   │           ├── textarea (message input)
│   │           ├── Send button
│   │           └── Finish button (conditional)
│   │
│   └── FeedbackPage.tsx
│       ├── Props:
│       │   ├── feedback: FeedbackResponse
│       │   └── onRestart()
│       │
│       └── Components:
│           ├── Overall score card
│           ├── 3x metric cards
│           │   ├── Communication
│           │   ├── Empathy
│           │   └── Clarity
│           ├── General feedback text
│           ├── Strengths list
│           ├── Improvements list
│           └── Restart button
│
├── components/
│   ├── MessageBubble.tsx
│   │   ├── Props: { content, sender }
│   │   └── Displays:
│   │       ├── Manager message (left, blue)
│   │       └── Employee message (right, purple)
│   │
│   ├── FeedbackCard.tsx
│   │   ├── Props: { title, score, color? }
│   │   └── Displays:
│   │       ├── Score circle (120px)
│   │       ├── Score bar (visual fill)
│   │       └── Color based on score:
│   │           ├── >= 80: green (#4CAF50)
│   │           ├── >= 60: yellow (#FFC107)
│   │           ├── >= 40: orange (#FF9800)
│   │           └── < 40: red (#F44336)
│   │
│   └── Loading.tsx
│       └── Displays spinner animation
│
├── services/
│   └── api.ts
│       ├── API_URL configuration
│       ├── axios instance with baseURL
│       └── apiService object:
│           ├── checkHealth()
│           ├── initDialog()
│           ├── sendMessage()
│           └── evaluateConversation()
│
├── types/
│   └── index.ts
│       ├── Message
│       ├── DialogResponse
│       ├── FeedbackResponse
│       ├── Scenario
│       └── PageType
│
└── styles/
    └── index.css
        ├── Global styles
        ├── Loading spinner animation
        ├── Error page styles
        ├── Dialog page styles
        │   ├── Header
        │   ├── Messages container
        │   ├── Message bubbles
        │   └── Input section
        ├── Feedback page styles
        │   ├── Header
        │   ├── Score cards
        │   ├── Metrics grid
        │   ├── Text sections
        │   └── Buttons
        └── Responsive media queries
```

## 🔌 API Контракты

### Message (shared type)

```typescript
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
```

### GET /api/init-scenario

```
Request: -

Response:
{
  "initial_message": "Привет! Спасибо, что нашёл время...",
  "conversation_history": [
    {
      "role": "assistant",
      "content": "Привет! Спасибо, что нашёл время..."
    }
  ]
}
```

### POST /api/dialog

```
Request:
{
  "user_message": "Спасибо за обратную связь",
  "conversation_history": [
    {"role": "assistant", "content": "..."},
    {"role": "user", "content": "..."}
  ]
}

Response:
{
  "assistant_message": "Спасибо за ответ...",
  "conversation_history": [
    {"role": "assistant", "content": "..."},
    {"role": "user", "content": "Спасибо за обратную связь"},
    {"role": "assistant", "content": "Спасибо за ответ..."}
  ]
}
```

### POST /api/evaluate

```
Request:
{
  "conversation_history": [...]
}

Response:
{
  "score": 75,
  "communication_score": 80,
  "empathy_score": 70,
  "clarity_score": 75,
  "feedback": "Хорошо слушали и задавали вопросы...",
  "strengths": [
    "Активное слушание",
    "Конструктивные вопросы"
  ],
  "improvements": [
    "Можно быть более эмпатичным",
    "Предложить больше примеров"
  ]
}
```

## 🔄 State Management (Frontend)

### App.tsx State

```typescript
const [page, setPage] = useState<PageType>('loading');
const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
const [error, setError] = useState<string | null>(null);
```

### DialogPage Local State

```typescript
const [inputValue, setInputValue] = useState('');
```

## 🎭 Component Hierarchy

```
App
├── Loading (initial state)
├── DialogPage
│   ├── dialog-header
│   ├── messages-container
│   │   ├── MessageBubble[]
│   │   └── Loading (while waiting for response)
│   └── input-section
│       ├── textarea
│       └── button-group
│           ├── send-button
│           └── finish-button
├── FeedbackPage
│   ├── feedback-header
│   └── feedback-content
│       ├── FeedbackCard (overall)
│       ├── metrics-grid
│       │   └── FeedbackCard[] (3 metrics)
│       ├── feedback-text-section
│       │   ├── feedback-text-card
│       │   ├── strengths-section
│       │   └── improvements-section
│       └── action-section
│           └── restart-button
└── Error page
```

## 🚀 Deployment Architecture

### Local Development

```
User Machine
├── Frontend: npm start (localhost:3000)
├── Backend: python main.py (localhost:8000)
└── Browser: http://localhost:3000
```

### Production (example)

```
Cloud Infrastructure
├── Frontend: Static hosting (Vercel/Netlify)
│   ├── REACT_APP_API_URL=https://api.example.com
│   └── Served on example.com
│
└── Backend: Server hosting (Heroku/AWS/DigitalOcean)
    ├── GROQ_API_KEY=***
    └── API on api.example.com
```

## 📈 Scaling Considerations

1. **Session Management:** Добавить user ID, сохранение истории
2. **Database:** Сохранять диалоги и оценки
3. **Caching:** Кэшировать сценарии и типовые ответы
4. **Load Balancing:** Масштабировать backend для множества пользователей
5. **Monitoring:** Логирование и мониторинг API
6. **Rate Limiting:** Ограничение на requests к Groq API

## 🔐 Security

**Текущие меры:**
- GROQ_API_KEY хранится только на backend (.env)
- CORS разрешен для всех (нужна настройка в production)
- Нет аутентификации (добавить для production)

**Рекомендации:**
- Добавить authentication (JWT/OAuth)
- Валидировать все входные данные
- Ограничить размер сообщений
- Rate limiting на API
- HTTPS только в production
