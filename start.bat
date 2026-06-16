@echo off
echo ==========================================
echo   CodeForge — Starting Server
echo ==========================================
cd backend
if not exist node_modules (
    echo Installing dependencies...
    npm install
)
echo.
echo Starting server on http://localhost:5000
echo Open your browser to http://localhost:5000
echo Press Ctrl+C to stop
echo.
npm start
