@echo off
title Weda.lk Development Server
echo ========================================
echo 🚀 Starting Weda.lk Development Server
echo ========================================
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
    echo ⚠️  Warning: .env.local file not found!
    echo Creating .env.local from .env.example...
    if exist ".env.example" (
        copy ".env.example" ".env.local"
        echo ✅ Created .env.local - Please update it with your API keys
    ) else (
        echo ❌ .env.example not found! Please create .env.local manually.
    )
    echo.
)

echo 🐳 Starting Docker containers...
echo.

:: Start development environment with database
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres redis

if errorlevel 1 (
    echo ❌ Failed to start Docker containers!
    pause
    exit /b 1
)

echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

:: Run database migrations
echo 📊 Running database migrations...
npm run db:generate
npm run db:migrate

if errorlevel 1 (
    echo ⚠️  Database migration failed - continuing anyway...
)

:: Start the development server
echo 🚀 Starting Next.js development server...
echo.
echo ✅ Server will be available at: http://localhost:3000
echo ✅ Database: PostgreSQL on localhost:5432
echo ✅ Cache: Redis on localhost:6379
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

echo.
echo 🛑 Development server stopped.
pause