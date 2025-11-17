# 📡 Примеры API запросов

Примеры работы с Feedback Trainer API.

## 🏥 Health Check

Проверка доступности сервера.

### Request

```bash
curl -X GET http://localhost:8000/health
```

### Response

```json
{
  "status": "ok",
  "message": "Feedback Trainer API is running"
}
```

---

## 🎬 Инициализация сценария

Получение первого сообщения менеджера.

### Request

```bash
curl -X GET http://localhost:8000/api/init-scenario
```

### Response

```json
{
  "initial_message": "Привет! Спасибо, что нашёл время. Мне хотелось бы обсудить проект, над которым ты работал.\n\nУ меня есть несколько наблюдений, которые я хочу обсудить с тобой. Готов ли ты выслушать?",
  "conversation_history": [
    {
      "role": "assistant",
      "content": "Привет! Спасибо, что нашёл время. Мне хотелось бы обсудить проект, над которым ты работал.\n\nУ меня есть несколько наблюдений, которые я хочу обсудить с тобой. Готов ли ты выслушать?"
    }
  ]
}
```

---

## 💬 Отправка сообщения и получение ответа

Пользователь отправляет сообщение, получает ответ менеджера.

### Request

```bash
curl -X POST http://localhost:8000/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Да, конечно. Я готов слушать твои замечания.",
    "conversation_history": [
      {
        "role": "assistant",
        "content": "Привет! Спасибо, что нашёл время. Мне хотелось бы обсудить проект..."
      }
    ]
  }'
```

### Python пример

```python
import requests

url = "http://localhost:8000/api/dialog"
data = {
    "user_message": "Да, конечно. Я готов слушать твои замечания.",
    "conversation_history": [
        {
            "role": "assistant",
            "content": "Привет! Спасибо, что нашёл время..."
        }
    ]
}

response = requests.post(url, json=data)
result = response.json()

print("Manager says:", result["assistant_message"])
print("Conversation length:", len(result["conversation_history"]))
```

### JavaScript/TypeScript пример

```typescript
// Using Axios (как в frontend)
import axios from 'axios';

const sendMessage = async (userMessage: string, history: any[]) => {
  const response = await axios.post(
    'http://localhost:8000/api/dialog',
    {
      user_message: userMessage,
      conversation_history: history
    }
  );

  return response.data;
};

// Usage
const history = [
  {
    role: "assistant",
    content: "Привет! Спасибо, что нашёл время..."
  }
];

const response = await sendMessage(
  "Да, конечно. Я готов слушать твои замечания.",
  history
);

console.log(response.assistant_message);
```

### Response

```json
{
  "assistant_message": "Спасибо за открытость. Главное, что я заметил - была слабая коммуникация в команде. Проекта достаточно хорошо выполнен, но во время разработки было мало синхронизации с коллегами. Как ты оцениваешь своё взаимодействие с командой?",
  "conversation_history": [
    {
      "role": "assistant",
      "content": "Привет! Спасибо, что нашёл время..."
    },
    {
      "role": "user",
      "content": "Да, конечно. Я готов слушать твои замечания."
    },
    {
      "role": "assistant",
      "content": "Спасибо за открытость. Главное, что я заметил..."
    }
  ]
}
```

---

## 🎯 Оценка диалога

Получение анализа и обратной связи после завершения диалога.

### Request

```bash
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_history": [
      {
        "role": "assistant",
        "content": "Привет! Спасибо, что нашёл время..."
      },
      {
        "role": "user",
        "content": "Да, конечно. Я готов слушать твои замечания."
      },
      {
        "role": "assistant",
        "content": "Спасибо за открытость. Главное, что я заметил..."
      },
      {
        "role": "user",
        "content": "Я согласен. На самом деле, я понимаю, что недостаточно общался с командой. Я буду стараться улучшить это."
      },
      {
        "role": "assistant",
        "content": "Это отличный подход. Давай подумаем, какие конкретные шаги ты мог бы предпринять..."
      }
    ]
  }'
```

### Python пример

```python
import requests

url = "http://localhost:8000/api/evaluate"
data = {
    "conversation_history": [
        # ... полная история диалога
    ]
}

response = requests.post(url, json=data)
feedback = response.json()

print(f"Overall Score: {feedback['score']}")
print(f"Communication: {feedback['communication_score']}")
print(f"Empathy: {feedback['empathy_score']}")
print(f"Clarity: {feedback['clarity_score']}")
print(f"\nFeedback: {feedback['feedback']}")
print(f"\nStrengths:")
for strength in feedback['strengths']:
    print(f"  + {strength}")
print(f"\nAreas for improvement:")
for improvement in feedback['improvements']:
    print(f"  - {improvement}")
```

### Response

```json
{
  "score": 78,
  "communication_score": 82,
  "empathy_score": 75,
  "clarity_score": 76,
  "feedback": "Вы хорошо восприняли критику и показали готовность к улучшениям. Ваше общение было четким и вежливым. Старайтесь развивать навыки активного слушания и задавайте больше уточняющих вопросов.",
  "strengths": [
    "Открытость к обратной связи",
    "Четкие и уважительные ответы",
    "Готовность к изменениям"
  ],
  "improvements": [
    "Развивать навыки активного слушания",
    "Задавать больше уточняющих вопросов",
    "Предлагать конкретные решения"
  ]
}
```

---

## 🔄 Полный цикл диалога

Пример полного цикла от инициализации до оценки.

### 1. Инициализация

```bash
curl http://localhost:8000/api/init-scenario
# Получаем: conversation_history = [initial_message]
```

### 2. Сообщение пользователя 1

```bash
curl -X POST http://localhost:8000/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Да, конечно. Я готов слушать.",
    "conversation_history": [/* from step 1 */]
  }'
# Получаем: conversation_history с ответом менеджера
```

### 3. Сообщение пользователя 2

```bash
curl -X POST http://localhost:8000/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Я согласен. Я буду стараться лучше общаться.",
    "conversation_history": [/* from step 2 */]
  }'
```

### 4. Сообщение пользователя 3+

```bash
curl -X POST http://localhost:8000/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Спасибо за совет. Я буду применять это на практике.",
    "conversation_history": [/* from previous step */]
  }'
```

### 5. Оценка

```bash
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_history": [/* final history from step 4 */]
  }'
# Получаем: feedback с оценками и рекомендациями
```

---

## 📊 Использование в React компоненте

```typescript
// DialogPage.tsx
const handleSendMessage = async (message: string) => {
  setIsLoading(true);
  try {
    const response = await apiService.sendMessage(
      message,
      conversationHistory
    );
    setConversationHistory(response.conversation_history);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

const handleFinish = async () => {
  setIsLoading(true);
  try {
    const feedbackResult = await apiService.evaluateConversation(
      conversationHistory
    );
    setFeedback(feedbackResult);
    setPage('feedback');
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🧪 Testing с Postman

1. Создайте коллекцию "Feedback Trainer"
2. Добавьте запросы:
   - **Init**: GET `http://localhost:8000/api/init-scenario`
   - **Dialog**: POST `http://localhost:8000/api/dialog`
   - **Evaluate**: POST `http://localhost:8000/api/evaluate`
3. Используйте переменные для сохранения `conversation_history`

---

## ⚡ Performance Tips

1. **Кэширование сценариев:** Сценарий нужно загружать только один раз
2. **Оптимизация истории:** Не отправляйте всю историю каждый раз (слишком медленно)
3. **Debouncing ввода:** Не отправляйте на каждый character change
4. **Loading states:** Показывайте спиннер пока ждете ответа от API

---

## 🐛 Error Handling

### Типичные ошибки и решения

#### 1. 400 Bad Request

```json
{
  "detail": "Invalid request body"
}
```

**Решение:** Проверьте формат JSON, все требуемые поля заполнены?

#### 2. 503 Service Unavailable

```json
{
  "error": "Groq API error: Rate limit exceeded"
}
```

**Решение:** Groq API перегружен, повторите позже

#### 3. CORS Error (в браузере)

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Решение:** Backend должен иметь CORS middleware (уже добавлен в `main.py`)

#### 4. Connection refused

```
failed to connect to http://localhost:8000
```

**Решение:** Убедитесь, что backend запущен на порту 8000

---

## 📚 Дополнительные ресурсы

- [FastAPI документация](https://fastapi.tiangolo.com/)
- [Groq API Docs](https://console.groq.com/docs)
- [HTTP Status Codes](https://httpwg.org/specs/rfc9110.html#status.codes)
