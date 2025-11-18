# 🚀 Деплой на GitHub Pages (Простой способ за 5 минут)

**Результат**: `https://urazhanova.github.io/train/` - живая ссылка для клиентов

## Шаг 1️⃣: Включить GitHub Pages в репо

1. Открой https://github.com/Urazhanova/train/settings
2. Слева найди **Pages**
3. В "Build and deployment":
   - **Source**: выбери `GitHub Actions`
4. Нажми **Save**

## Шаг 2️⃣: Деплоить Backend на Railway

1. Открой https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Выбери `Urazhanova/train`
4. Railway автоматически найдет Procfile
5. В **Variables** добавь:
   - Name: `GROQ_API_KEY`
   - Value: твой Groq API ключ
6. Нажми **Deploy**
7. Дождись пока задеплоится (5-7 минут)
8. Открой **Deployments** и скопируй URL (вроде `https://train-production-xxx.railway.app`)

## Шаг 3️⃣: Добавить Backend URL в GitHub Secrets

1. Открой https://github.com/Urazhanova/train/settings/secrets/actions
2. Нажми **New repository secret**
3. Добавь:
   - **Name**: `RAILWAY_BACKEND_URL`
   - **Value**: `https://train-production-xxx.railway.app` (скопируй из Railway)
4. Нажми **Add secret**

## Шаг 4️⃣: Задеплоить фронтенд

Просто пушь код:

```bash
git push origin main
```

GitHub Actions автоматически:
1. ✅ Возьмет backend URL из secrets
2. ✅ Соберет React приложение
3. ✅ Деплоит на GitHub Pages
4. ✅ Через 2-3 минуты будет live!

---

## 🎯 Готово!

Отправь клиентам эту ссылку:

```
https://urazhanova.github.io/train/
```

---

## 📊 Проверить статус

Логи деплоя: https://github.com/Urazhanova/train/actions

Там увидишь:
- ✅ Зеленая галка = успешно
- ❌ Красный крест = ошибка (посмотри логи)

---

## 🆘 Если не работает

**GitHub Pages не обновляется?**
- Убедись что в Settings → Pages установлена "GitHub Actions"
- Подожди 5-10 минут (первый деплой может быть дольше)

**Фронтенд загружается но не работает?**
- Открой DevTools (F12) → Network
- Посмотри есть ли ошибки при запросе к backend
- Проверь что RAILWAY_BACKEND_URL правильный

**Backend не работает на Railway?**
- Проверь GROQ_API_KEY в Railway Variables
- Посмотри логи: Railway дашборд → Deployments → твой деплой → Logs

---

**Готово? Пушь и жди 2-3 минуты!** ⏳

```bash
git push origin main
# ...checking Actions...
# ...waiting...
# ✅ Live на https://urazhanova.github.io/train/
```
