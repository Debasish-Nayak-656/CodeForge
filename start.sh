#!/bin/bash
echo "=========================================="
echo "  CodeForge — Starting Server"
echo "=========================================="
cd "$(dirname "$0")/backend"
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi
echo ""
echo "Starting server on http://localhost:5000"
echo "Open your browser to http://localhost:5000"
echo "Press Ctrl+C to stop"
echo ""
npm start
