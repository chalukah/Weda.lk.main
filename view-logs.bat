@echo off
title Weda.lk - View Logs
echo =====================================
echo 📊 Weda.lk Server Logs
echo =====================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running or not installed!
    pause
    exit /b 1
)

echo Select which logs to view:
echo.
echo 1. Application logs
echo 2. Database logs
echo 3. Redis logs
echo 4. All logs
echo 5. Live tail all logs
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo 📱 Viewing application logs...
    docker-compose logs app
) else if "%choice%"=="2" (
    echo 🗄️ Viewing database logs...
    docker-compose logs postgres
) else if "%choice%"=="3" (
    echo 🏃‍♂️ Viewing Redis logs...
    docker-compose logs redis
) else if "%choice%"=="4" (
    echo 📊 Viewing all logs...
    docker-compose logs
) else if "%choice%"=="5" (
    echo 📡 Live tailing all logs (Press Ctrl+C to stop)...
    docker-compose logs -f
) else (
    echo ❌ Invalid choice!
)

echo.
pause