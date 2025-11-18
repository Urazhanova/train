#!/bin/bash

# Backend development server with hot reload
echo "🚀 Starting Backend (Hot Reload enabled)..."
echo "📡 Backend running on http://localhost:8888"
echo ""

source venv/bin/activate
pip install -r requirements.txt -q

# Run with reload and auto-reload on file changes
uvicorn main:app \
  --reload \
  --reload-dirs . \
  --host 0.0.0.0 \
  --port 8888 \
  --log-level info
