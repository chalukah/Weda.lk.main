@echo off
title Weda.lk Production Server
echo ==========================================
echo 🏭 Starting Weda.lk Production Server
echo ==========================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running or not installed!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

:: Check if .env.local exists
if not exist ".env.local" (
    echo ❌ Error: .env.local file not found!
    echo Please create .env.local with your production environment variables.
    echo See API-KEYS-SETUP.md for detailed instructions.
    pause
    exit /b 1
)

echo 🐳 Starting Docker containers in production mode...
echo.

:: Pull latest images
echo 📥 Pulling latest Docker images...
docker-compose pull

:: Build and start all services
docker-compose up -d --build

if errorlevel 1 (
    echo ❌ Failed to start Docker containers!
    pause
    exit /b 1
)

echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak >nul

:: Check service health
echo 🔍 Checking service health...
docker-compose ps

echo.
echo ✅ Production server is running!
echo ✅ Application: http://localhost:3000
echo ✅ Database: PostgreSQL (internal)
echo ✅ Cache: Redis (internal)
echo.
echo 📊 To view logs: docker-compose logs -f
echo 🛑 To stop: run stop-app.bat
echo.
pause