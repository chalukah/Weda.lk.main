@echo off
title Weda.lk - Docker Management
echo =========================================
echo 🐳 Weda.lk Docker Management
echo =========================================
echo.

:menu
echo What would you like to do?
echo.
echo 1. 🚀 Start Development Server
echo 2. 🏭 Start Production Server
echo 3. 🛑 Stop All Services
echo 4. 📊 View Logs
echo 5. 🗄️ Reset Database
echo 6. 💾 Backup Database
echo 7. 📥 Restore Database
echo 8. 🔍 Check Service Status
echo 9. 🧹 Clean Up Docker
echo 10. 📋 Show Environment Info
echo 11. ❌ Exit
echo.
set /p choice="Enter your choice (1-11): "

if "%choice%"=="1" (
    call start-dev.bat
    goto menu
) else if "%choice%"=="2" (
    call start-prod.bat
    goto menu
) else if "%choice%"=="3" (
    call stop-app.bat
    goto menu
) else if "%choice%"=="4" (
    call view-logs.bat
    goto menu
) else if "%choice%"=="5" (
    call reset-database.bat
    goto menu
) else if "%choice%"=="6" (
    call backup-database.bat
    goto menu
) else if "%choice%"=="7" (
    call restore-database.bat
    goto menu
) else if "%choice%"=="8" (
    echo 🔍 Service Status:
    echo.
    docker-compose ps
    echo.
    pause
    goto menu
) else if "%choice%"=="9" (
    echo 🧹 Cleaning up Docker...
    echo.
    echo Stopping all containers...
    docker-compose down
    echo.
    echo Removing unused images...
    docker image prune -f
    echo.
    echo Removing unused volumes...
    docker volume prune -f
    echo.
    echo ✅ Cleanup completed!
    pause
    goto menu
) else if "%choice%"=="10" (
    echo 📋 Environment Information:
    echo.
    echo Docker Version:
    docker --version
    echo.
    echo Docker Compose Version:
    docker-compose --version
    echo.
    echo Running Containers:
    docker ps
    echo.
    echo Environment Files:
    if exist ".env.local" (
        echo ✅ .env.local exists
    ) else (
        echo ❌ .env.local missing
    )
    if exist ".env.example" (
        echo ✅ .env.example exists
    ) else (
        echo ❌ .env.example missing
    )
    echo.
    pause
    goto menu
) else if "%choice%"=="11" (
    echo 👋 Goodbye!
    exit /b 0
) else (
    echo ❌ Invalid choice! Please try again.
    pause
    goto menu
)