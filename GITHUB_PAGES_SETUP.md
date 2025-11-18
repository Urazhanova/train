# 🚀 GitHub Pages Деплой (Быстрый Способ)

Это самый простой способ! Фронтенд будет жить на GitHub Pages, бэкенд на Railway.

**Итоговая ссылка:** `https://urazhanova.github.io/train/`

## Шаг 1: Включить GitHub Pages

1. Открой https://github.com/Urazhanova/train/settings
2. Слева найди **Pages**
3. В разделе "Build and deployment":
   - **Source**: Выбери `GitHub Actions`
4. Сохрани

## Шаг 2: Добавить Secret с Backend URL

1. Открой https://github.com/Urazhanova/train/settings/secrets/actions
2. Нажми **New repository secret**
3. Добавь:
   - **Name**: `BACKEND_URL`
   - **Value**: `https://train-production-xxxx.railway.app` (URL твоего бэкенда на Railway)

## Шаг 3: Деплой Backend на Railway

Если ещё не задеплоил:

1. Открой https://railway.app
2. New Project → Deploy from GitHub
3. Выбери `Urazhanova/train`
4. Railway автоматически найдет Procfile
5. В **Variables** добавь:
   - `GROQ_API_KEY` = твой ключ
6. Deploy!
7. Скопируй URL из Deployments (вроде `https://train-production-xxxx.railway.app`)
8. Добавь этот URL в GitHub Secret `BACKEND_URL` (шаг 2)

## Шаг 4: Готово! 🎉

Теперь просто делай `git push`:

```bash
git add .
git commit -m "Setup GitHub Pages"
git push origin main
```

GitHub Actions автоматически:
1. ✅ Соберет фронтенд (React → HTML/CSS/JS)
2. ✅ Задеплоит на GitHub Pages
3. ✅ Через ~2-3 минуты будет live на https://urazhanova.github.io/train/

## 📋 Проверить статус

https://github.com/Urazhanova/train/actions

Там увидишь:
- ✅ Зелёная галка = успешно
- ❌ Красный крест = ошибка (посмотри логи)

## 🔗 Ссылка для клиентов

Отправь им:
```
https://urazhanova.github.io/train/
```

Готово! 🚀

---

## 🆘 Если что-то не работает

**GitHub Pages не обновляется?**
- Убедись что Pages source установлена на "GitHub Actions"
- Посмотри логи в Actions таб

**Фронтенд подключается но не работает?**
- Проверь что `BACKEND_URL` правильный
- Посмотри Network в браузере (F12) - какие ошибки?

**Бэкенд не работает на Railway?**
- Проверь GROQ_API_KEY в Railway Variables
- Посмотри логи в Railway дашборде

---

**Это работает прямо сейчас? Да! Просто пушь и жди 2-3 минуты.** ⏳
