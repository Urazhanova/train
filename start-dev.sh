#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Feedback Trainer - Development Server        ║${NC}"
echo -e "${BLUE}║         with Hot Reload Enabled               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "start-dev.sh" ]; then
    echo -e "${YELLOW}⚠️  Please run this script from the root directory:${NC}"
    echo "cd /Users/irinaurazanova/Desktop/Демо\\ тренажер"
    exit 1
fi

# Kill any existing processes on ports 8888 and 3333
echo -e "${YELLOW}🧹 Cleaning up old processes...${NC}"
pkill -f "uvicorn main:app" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true
sleep 2

echo ""
echo -e "${GREEN}✅ Ready to start development servers${NC}"
echo ""
echo -e "${YELLOW}Opening 2 new terminals...${NC}"
echo ""

# Terminal 1: Backend
open -a Terminal "$(pwd)/backend/run-dev.sh"

# Terminal 2: Frontend
open -a Terminal "$(pwd)/frontend/run-dev.sh"

echo ""
echo -e "${GREEN}🚀 Development servers starting...${NC}"
echo ""
echo -e "${BLUE}Backend:${NC}  http://localhost:8888 (Hot Reload: ON)"
echo -e "${BLUE}Frontend:${NC} http://localhost:3333 (Fast Refresh: ON)"
echo ""
echo -e "${YELLOW}📝 Note:${NC}"
echo "  • Changes in backend files → auto-reload (in 0.5-2 seconds)"
echo "  • Changes in frontend files → hot update in browser (instant)"
echo "  • Browser will refresh automatically on major changes"
echo ""
echo -e "${YELLOW}⏰ Waiting for servers to start (5-10 seconds)...${NC}"
sleep 10

# Open browser
echo -e "${GREEN}✅ Opening browser...${NC}"
open http://localhost:3333

echo ""
echo -e "${GREEN}🎉 Development environment ready!${NC}"
echo -e "${YELLOW}Press Ctrl+C in terminal to stop servers${NC}"
