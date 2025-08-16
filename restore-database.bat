@echo off
title Restore Weda.lk Database
echo =====================================
echo 📥 Restore Weda.lk Database
echo =====================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running or not installed!
    pause
    exit /b 1
)

:: Check if backup file is provided
if "%~1"=="" (
    echo 📂 Available backup files:
    echo.
    if exist "backups\*.sql" (
        dir /b "backups\*.sql"
    ) else (
        echo No backup files found in backups\ directory
    )
    echo.
    set /p backup_file="Enter backup filename (with path): "
) else (
    set "backup_file=%~1"
)

:: Check if backup file exists
if not exist "%backup_file%" (
    echo ❌ Error: Backup file not found: %backup_file%
    pause
    exit /b 1
)

echo ⚠️  WARNING: This will replace ALL existing database data!
echo Backup file: %backup_file%
echo.
set /p confirm="Are you sure you want to restore? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo ❌ Database restore cancelled.
    pause
    exit /b 0
)

echo.
echo 🛑 Stopping application...
docker-compose stop app

echo 🗄️ Dropping existing database...
docker-compose exec postgres psql -U weda_user -d postgres -c "DROP DATABASE IF EXISTS weda_db;"

echo 🆕 Creating fresh database...
docker-compose exec postgres psql -U weda_user -d postgres -c "CREATE DATABASE weda_db OWNER weda_user;"

echo 📥 Restoring database from backup...
docker-compose exec -T postgres psql -U weda_user -d weda_db < "%backup_file%"

if errorlevel 1 (
    echo ❌ Database restore failed!
    pause
    exit /b 1
)

echo ✅ Database restored successfully!
echo.
echo 🚀 You can now start the application with:
echo    - start-dev.bat (for development)
echo    - start-prod.bat (for production)
echo.
pause