# ⚡ Quick Start (5 минут)

Быстрый старт Feedback Trainer.

## Предусловия

- ✅ Python 3.9+
- ✅ Node.js 16+
- ✅ Groq API ключ (groq.com → Settings → API Keys)

## Backend (2 минуты)

```bash
cd backend

# 1. Virtual environment
python -m venv venv
source venv/bin/activate  # или: venv\Scripts\activate на Windows

# 2. Install
pip install -r requirements.txt

# 3. Configure
echo "GROQ_API_KEY=YOUR_KEY_HERE" > .env

# 4. Run
python main.py
```

Проверка: `curl http://localhost:8000/health`

## Frontend (2 минуты)

```bash
cd frontend

# 1. Install
npm install

# 2. Run
npm start
```

Браузер откроется на `http://localhost:3000` 🎉

## Использование (1 минута)

1. **Диалог:** Отвечайте менеджеру (3+ сообщения)
2. **Завершение:** Нажмите "Завершить и получить оценку"
3. **Результаты:** Смотрите оценку вашего общения

---

## 📋 Checklist

```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "GROQ_API_KEY=YOUR_KEY_HERE" > .env
python main.py
# ✅ Должно быть: "Uvicorn running on http://0.0.0.0:8000"

# Terminal 2: Frontend
cd frontend
npm install
npm start
# ✅ Должно быть: "Compiled successfully!" и браузер откроется
```

---

## 🐛 Если не работает

### Backend не запускается
```bash
# Проверьте Python
python --version

# Переустановите зависимости
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend не загружается
```bash
# Проверьте Node
node --version

# Очистите кэш
rm -rf node_modules package-lock.json
npm install
npm start
```

### "Сервер недоступен"
```bash
# Убедитесь, что backend запущен
curl http://localhost:8000/health

# Проверьте .env в backend/
cat backend/.env
# Должно быть: GROQ_API_KEY=...
```

---

## 🎯 Дальше

- 📖 Читайте [SETUP.md](./SETUP.md) для подробной инструкции
- 🏗️ Изучайте [ARCHITECTURE.md](./ARCHITECTURE.md) для понимания проекта
- 📡 Используйте [API_EXAMPLES.md](./API_EXAMPLES.md) для API интеграции

---

## 💡 Советы

1. **Оба сервера должны работать одновременно** - откройте 2 терминала
2. **Убедитесь, что портыбесплатны** - 3000 для frontend, 8000 для backend
3. **Groq API ключ обязателен** - без него диалог не работает
4. **Обновите браузер** - после запуска frontend

---

**Готово! Начните диалог с менеджером.** 🚀
