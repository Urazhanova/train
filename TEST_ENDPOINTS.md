# 🧪 Тестирование API endpoints

## Быстрый старт

### 1. Убедитесь, что backend запущен
```bash
curl http://localhost:8888/health | jq .
```

**Ожидаемый результат:**
```json
{
  "status": "ok",
  "message": "Feedback Trainer API is running"
}
```

---

## Endpoints

### GET /health
**Описание**: Проверка здоровья сервера

```bash
curl http://localhost:8888/health | jq .
```

**Ответ**:
```json
{
  "status": "ok",
  "message": "Feedback Trainer API is running"
}
```

---

### GET /api/init-scenario
**Описание**: Инициализация нового сценария диалога

```bash
curl http://localhost:8888/api/init-scenario | jq .
```

**Ответ**:
```json
{
  "initial_message": "Дарина, спасибо что нашла время...",
  "conversation_history": [
    {
      "role": "assistant",
      "content": "Дарина, спасибо что нашла время..."
    }
  ]
}
```

---

### POST /api/dialog
**Описание**: Отправить сообщение и получить ответ от Дарины

```bash
curl -X POST http://localhost:8888/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Да, я готов выслушать обратную связь",
    "conversation_history": [
      {
        "role": "assistant",
        "content": "Дарина, спасибо что нашла время. Мне нужно с тобой поговорить..."
      }
    ]
  }' | jq .
```

**Параметры**:
- `user_message` (string): Сообщение от пользователя
- `conversation_history` (array): История диалога

**Ответ**:
```json
{
  "assistant_message": "Спасибо за открытость. Мне нравится твой подход...",
  "conversation_history": [
    {
      "role": "assistant",
      "content": "..."
    },
    {
      "role": "user",
      "content": "..."
    },
    {
      "role": "assistant",
      "content": "..."
    }
  ]
}
```

---

### POST /api/evaluate
**Описание**: Оценить весь диалог и получить фидбек

```bash
curl -X POST http://localhost:8888/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_history": [
      {"role": "assistant", "content": "..."},
      {"role": "user", "content": "..."},
      {"role": "assistant", "content": "..."}
    ]
  }' | jq .
```

**Параметры**:
- `conversation_history` (array): Полная история диалога

**Ответ**:
```json
{
  "score": 87.5,
  "communication_score": 90.0,
  "empathy_score": 80.0,
  "clarity_score": 95.0,
  "feedback": "Диалог характеризуется открытостью и готовностью улучшаться...",
  "strengths": [
    "Проявление открытости к критике",
    "Готовность работать над улучшением"
  ],
  "improvements": [
    "Можно быть более конкретным в предложениях",
    "Больше слушать партнера"
  ]
}
```

---

## Полный цикл диалога

### Шаг 1: Инициализировать сценарий
```bash
SCENARIO=$(curl -s http://localhost:8888/api/init-scenario)
echo "$SCENARIO" | jq .
```

### Шаг 2: Отправить первое сообщение
```bash
RESP1=$(curl -s -X POST http://localhost:8888/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Спасибо, что пригласила. Я готов обсудить.",
    "conversation_history": ['"$(echo "$SCENARIO" | jq '.conversation_history')"']
  }')
echo "$RESP1" | jq '.assistant_message'
```

### Шаг 3: Отправить второе сообщение
```bash
HISTORY1=$(echo "$RESP1" | jq '.conversation_history')
RESP2=$(curl -s -X POST http://localhost:8888/api/dialog \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Я понимаю, что нужно лучше планировать время.",
    "conversation_history": '"$HISTORY1"'
  }')
echo "$RESP2" | jq '.assistant_message'
```

### Шаг 4: Оценить диалог
```bash
FINAL_HISTORY=$(echo "$RESP2" | jq '.conversation_history')
EVAL=$(curl -s -X POST http://localhost:8888/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_history": '"$FINAL_HISTORY"'
  }')
echo "$EVAL" | jq '.'
```

---

## Примеры в Python

### Инициализация и простой диалог

```python
import requests
import json

BASE_URL = "http://localhost:8888"

# 1. Health check
print("1. Проверка здоровья...")
resp = requests.get(f"{BASE_URL}/health")
print(resp.json())

# 2. Инициализация сценария
print("\n2. Инициализация сценария...")
resp = requests.get(f"{BASE_URL}/api/init-scenario")
scenario = resp.json()
history = scenario['conversation_history']
print(f"Дарина: {scenario['initial_message']}")

# 3. Первое сообщение
print("\n3. Отправка первого ответа...")
user_msg = "Спасибо, я готов выслушать обратную связь"
resp = requests.post(
    f"{BASE_URL}/api/dialog",
    json={
        "user_message": user_msg,
        "conversation_history": history
    }
)
data = resp.json()
print(f"Ты: {user_msg}")
print(f"Дарина: {data['assistant_message']}")
history = data['conversation_history']

# 4. Второе сообщение
print("\n4. Отправка второго ответа...")
user_msg = "Я понимаю твою позицию. Давай найдем компромисс."
resp = requests.post(
    f"{BASE_URL}/api/dialog",
    json={
        "user_message": user_msg,
        "conversation_history": history
    }
)
data = resp.json()
print(f"Ты: {user_msg}")
print(f"Дарина: {data['assistant_message']}")
history = data['conversation_history']

# 5. Оценка диалога
print("\n5. Оценка диалога...")
resp = requests.post(
    f"{BASE_URL}/api/evaluate",
    json={"conversation_history": history}
)
eval_data = resp.json()
print(f"Общий балл: {eval_data['score']}/100")
print(f"Открытость: {eval_data['communication_score']}/100")
print(f"Эмпатия: {eval_data['empathy_score']}/100")
print(f"Ясность: {eval_data['clarity_score']}/100")
print(f"\nОтзыв: {eval_data['feedback']}")
```

---

## Примеры в JavaScript/Node.js

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:8888';

async function testDialogue() {
  try {
    // 1. Health check
    console.log('1. Health check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log(health.data);

    // 2. Init scenario
    console.log('\n2. Initializing scenario...');
    const scenario = await axios.get(`${BASE_URL}/api/init-scenario`);
    let history = scenario.data.conversation_history;
    console.log(`Darina: ${scenario.data.initial_message}`);

    // 3. First message
    console.log('\n3. Sending first message...');
    const msg1 = 'I am ready to listen to your feedback';
    const resp1 = await axios.post(`${BASE_URL}/api/dialog`, {
      user_message: msg1,
      conversation_history: history,
    });
    console.log(`You: ${msg1}`);
    console.log(`Darina: ${resp1.data.assistant_message}`);
    history = resp1.data.conversation_history;

    // 4. Evaluate
    console.log('\n4. Evaluating conversation...');
    const eval = await axios.post(`${BASE_URL}/api/evaluate`, {
      conversation_history: history,
    });
    console.log(`Overall Score: ${eval.data.score}/100`);
    console.log(`Feedback: ${eval.data.feedback}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testDialogue();
```

---

## Статус codes

- `200 OK` - Успешный запрос
- `422 Unprocessable Entity` - Ошибка валидации данных
- `500 Internal Server Error` - Ошибка сервера

---

## Tips & Tricks

### Сохранение ответа в переменную JSON
```bash
RESP=$(curl -s http://localhost:8888/api/init-scenario)
INIT_MSG=$(echo "$RESP" | jq -r '.initial_message')
echo "$INIT_MSG"
```

### Красивый вывод JSON
```bash
curl -s http://localhost:8888/health | jq .
```

### Отправка файла JSON
```bash
curl -X POST http://localhost:8888/api/evaluate \
  -H "Content-Type: application/json" \
  -d @/path/to/file.json
```

### Debug информация
```bash
curl -v http://localhost:8888/health
```

---

## Troubleshooting

### Backend не отвечает
```bash
# Проверьте, запущен ли backend
curl http://localhost:8888/health
# Если ошибка, запустите backend:
cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8888
```

### Ошибка 422 при отправке сообщения
- Убедитесь, что `user_message` и `conversation_history` передаются корректно
- Проверьте формат `conversation_history` - должен быть массив объектов с `role` и `content`

### Пустой ответ от evaluate
- Убедитесь, что в `conversation_history` есть как минимум один диалог
- Проверьте формат данных в conversation_history

---

**Последнее обновление**: 18 ноября 2025
