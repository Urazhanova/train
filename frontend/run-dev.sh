#!/bin/bash

# Frontend development server with hot reload
echo "🚀 Starting Frontend (Fast Refresh enabled)..."
echo "🎨 Frontend running on http://localhost:3333"
echo ""

# Enable fast refresh and set API URL
export REACT_APP_API_URL=http://localhost:8888
export PORT=3333
export GENERATE_SOURCEMAP=false
export SKIP_PREFLIGHT_CHECK=true

# Run React dev server with optimized hot reload
npm start
