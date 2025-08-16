@echo off
title Stop Weda.lk Server
echo =====================================
echo 🛑 Stopping Weda.lk Server
echo =====================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running or not installed!
    pause
    exit /b 1
)

echo 🐳 Stopping Docker containers...
echo.

:: Stop all services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

if errorlevel 1 (
    echo ⚠️  Some containers may have already been stopped.
)

echo.
echo ✅ All services stopped successfully!
echo.
echo 🧹 To also remove volumes (⚠️  This will delete all data!):
echo    docker-compose down -v
echo.
echo 📊 To view remaining containers:
echo    docker ps -a
echo.
pause