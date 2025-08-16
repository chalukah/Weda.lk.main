@echo off
title Weda.lk Setup Checker
echo =========================================
echo 🔍 Weda.lk Setup Verification
echo =========================================
echo.

echo Checking your setup...
echo.

:: Check Docker
echo 🐳 Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed or not running
    echo Please install Docker Desktop and start it
) else (
    docker --version
    echo ✅ Docker is available
)
echo.

:: Check Docker Compose
echo 🐙 Checking Docker Compose...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose not available
) else (
    docker-compose --version
    echo ✅ Docker Compose is available
)
echo.

:: Check Node.js (optional, for local development)
echo 📦 Checking Node.js (optional)...
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js not installed (OK if using Docker only)
) else (
    node --version
    echo ✅ Node.js is available
)
echo.

:: Check npm (optional)
echo 📦 Checking npm (optional)...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  npm not available (OK if using Docker only)
) else (
    npm --version
    echo ✅ npm is available
)
echo.

:: Check environment files
echo 📝 Checking environment files...
if exist ".env.example" (
    echo ✅ .env.example exists
) else (
    echo ❌ .env.example missing
)

if exist ".env.local" (
    echo ✅ .env.local exists
) else (
    echo ⚠️  .env.local not found - you'll need to create this
    echo    Copy .env.example to .env.local and add your API keys
)

if exist ".env.docker" (
    echo ✅ .env.docker exists
) else (
    echo ❌ .env.docker missing
)
echo.

:: Check Docker files
echo 🐳 Checking Docker configuration...
if exist "Dockerfile" (
    echo ✅ Dockerfile exists
) else (
    echo ❌ Dockerfile missing
)

if exist "docker-compose.yml" (
    echo ✅ docker-compose.yml exists
) else (
    echo ❌ docker-compose.yml missing
)

if exist "docker-compose.dev.yml" (
    echo ✅ docker-compose.dev.yml exists
) else (
    echo ❌ docker-compose.dev.yml missing
)
echo.

:: Check batch files
echo 📁 Checking batch files...
if exist "manage-docker.bat" (
    echo ✅ manage-docker.bat exists
) else (
    echo ❌ manage-docker.bat missing
)

if exist "start-dev.bat" (
    echo ✅ start-dev.bat exists
) else (
    echo ❌ start-dev.bat missing
)

if exist "start-prod.bat" (
    echo ✅ start-prod.bat exists
) else (
    echo ❌ start-prod.bat missing
)

if exist "stop-app.bat" (
    echo ✅ stop-app.bat exists
) else (
    echo ❌ stop-app.bat missing
)
echo.

:: Check if already running
echo 🔍 Checking if containers are running...
docker ps --filter "name=weda" --format "table {{.Names}}\t{{.Status}}" 2>nul
if errorlevel 1 (
    echo ⚠️  No Weda.lk containers running
) else (
    echo ℹ️  Current container status shown above
)
echo.

:: Summary
echo ==========================================
echo 📋 SETUP SUMMARY
echo ==========================================
echo.
echo ✅ = Ready to go
echo ⚠️  = Optional or needs attention  
echo ❌ = Required but missing
echo.
echo 🚀 NEXT STEPS:
echo.
echo 1. If you see ❌ errors, fix them first
echo 2. Create .env.local from .env.example if needed
echo 3. Run manage-docker.bat to start your app
echo 4. Check API-KEYS-SETUP.md for external services
echo.
echo ==========================================
pause