# 🎯 Тренажер обратной связи (Feedback Trainer)

Интерактивный диалоговый тренажер для обучения навыкам общения и получения обратной связи от AI. Демо-версия проекта Boto-подобного сервиса.

## 📋 Описание

Тренажер включает:
- **Диалог** между пользователем (сотрудник) и виртуальным собеседником (менеджер)
- **LLM-интеграцию** (Groq) для генерации реалистичных ответов
- **Автоматическую оценку** качества диалога по критериям
- **Подробную обратную связь** с баллами и рекомендациями

## 🏗️ Структура проекта

```
feedback-trainer/
├── backend/                    # Python FastAPI
│   ├── main.py                # API endpoints
│   ├── services/
│   │   ├── groq_service.py    # Интеграция с Groq LLM
│   │   └── evaluator.py       # Оценка диалога
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                   # React + TypeScript
│   ├── src/
│   │   ├── components/        # React компоненты
│   │   ├── pages/             # Страницы (Dialog, Feedback)
│   │   ├── services/          # API клиент
│   │   ├── types/             # TypeScript типы
│   │   ├── styles/            # CSS стили
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── README.md
```

## 🚀 Быстрый старт

### Требования

- Python 3.9+
- Node.js 16+
- Groq API ключ (получить на groq.com)

### Установка и запуск

#### 1. Backend

```bash
cd backend

# Создать виртуальное окружение
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate

# Установить зависимости
pip install -r requirements.txt

# Создать .env файл
cp .env.example .env
# Отредактировать .env и добавить GROQ_API_KEY

# Запустить сервер
python main.py
```

Backend будет доступен на `http://localhost:8000`

#### 2. Frontend

```bash
cd frontend

# Установить зависимости
npm install

# Создать .env.local
cp .env.example .env.local

# Запустить dev сервер
npm start
```

Frontend будет доступен на `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Инициализация сценария
```
GET /api/init-scenario
```

### Отправка сообщения
```
POST /api/dialog
```

### Оценка диалога
```
POST /api/evaluate
```

## 🎮 Сценарий

Менеджер дает конструктивную обратную связь сотруднику о проблемах с коммуникацией в команде.

## 🧪 Статус

✅ Backend создан
✅ Frontend создан
⏳ Требуется тестирование и интеграция
