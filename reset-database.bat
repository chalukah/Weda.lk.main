@echo off
title Reset Weda.lk Database
echo ==========================================
echo 🗄️ Reset Weda.lk Database
echo ==========================================
echo.

echo ⚠️  WARNING: This will delete ALL database data!
echo This action cannot be undone.
echo.
set /p confirm="Are you sure you want to reset the database? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo ❌ Database reset cancelled.
    pause
    exit /b 0
)

echo.
echo 🛑 Stopping application...
docker-compose stop app

echo 🗄️ Stopping and removing database...
docker-compose stop postgres
docker-compose rm -f postgres

echo 🧹 Removing database volume...
docker volume rm weda_postgres_data 2>nul

echo 🚀 Starting fresh database...
docker-compose up -d postgres

echo ⏳ Waiting for database to be ready...
timeout /t 15 /nobreak >nul

echo 📊 Running database migrations...
npm run db:generate
npm run db:migrate

if errorlevel 1 (
    echo ❌ Database migration failed!
    pause
    exit /b 1
)

echo 🌱 Seeding database with initial data...
npm run db:seed

if errorlevel 1 (
    echo ⚠️  Database seeding failed - continuing anyway...
)

echo.
echo ✅ Database reset completed successfully!
echo.
echo 🚀 You can now start the application with:
echo    - start-dev.bat (for development)
echo    - start-prod.bat (for production)
echo.
pause