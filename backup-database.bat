@echo off
title Backup Weda.lk Database
echo =====================================
echo 💾 Backup Weda.lk Database
echo =====================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running or not installed!
    pause
    exit /b 1
)

:: Create backups directory if it doesn't exist
if not exist "backups" mkdir backups

:: Generate timestamp for backup filename
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%"

set "backup_file=backups\weda_backup_%timestamp%.sql"

echo 📦 Creating database backup...
echo Backup file: %backup_file%
echo.

:: Create database backup
docker-compose exec -T postgres pg_dump -U weda_user -d weda_db > "%backup_file%"

if errorlevel 1 (
    echo ❌ Backup failed!
    pause
    exit /b 1
)

echo ✅ Database backup created successfully!
echo 📄 File: %backup_file%
echo.

:: Show backup size
for %%A in ("%backup_file%") do (
    echo 📊 Backup size: %%~zA bytes
)

echo.
echo 💡 To restore this backup later, use:
echo    restore-database.bat "%backup_file%"
echo.
pause