# 🐳 Docker Commands & Batch Files Guide

Easy-to-use batch files for managing your Weda.lk Docker environment on Windows.

## 🎯 Quick Start

**Just double-click `manage-docker.bat`** and choose what you want to do!

## 📁 Batch Files Overview

| File                      | Purpose                 | When to Use                    |
| ------------------------- | ----------------------- | ------------------------------ |
| 🎛️ `manage-docker.bat`    | **Main Control Panel**  | Start here - shows all options |
| 🚀 `start-dev.bat`        | Development server      | Daily development work         |
| 🏭 `start-prod.bat`       | Production server       | Testing production build       |
| 🛑 `stop-app.bat`         | Stop all services       | When finished working          |
| 📊 `view-logs.bat`        | View container logs     | Debugging issues               |
| 🗄️ `reset-database.bat`   | Reset database          | Fresh start needed             |
| 💾 `backup-database.bat`  | Create database backup  | Before major changes           |
| 📥 `restore-database.bat` | Restore database backup | Recovering data                |

## 🔄 Common Workflows

### 🌅 Starting Your Day

1. Double-click `start-dev.bat`
2. Wait for "✅ Server will be available at: http://localhost:3000"
3. Open browser and start coding!

### 🌆 Ending Your Day

1. Press `Ctrl+C` in the terminal (if running)
2. Double-click `stop-app.bat`
3. Done!

### 🐛 When Something Goes Wrong

1. Double-click `view-logs.bat`
2. Check error messages
3. Try `reset-database.bat` if database issues
4. Restart with `start-dev.bat`

### 💾 Before Major Changes

1. Double-click `backup-database.bat`
2. Make your changes
3. If something breaks: `restore-database.bat`

## 🔧 What Each File Does

### `manage-docker.bat` - Main Control Panel

```
🐳 Weda.lk Docker Management
=========================================

What would you like to do?

1. 🚀 Start Development Server
2. 🏭 Start Production Server
3. 🛑 Stop All Services
4. 📊 View Logs
5. 🗄️ Reset Database
6. 🔍 Check Service Status
7. 🧹 Clean Up Docker
8. 📋 Show Environment Info
9. ❌ Exit
```

### `start-dev.bat` - Development Server

- ✅ Starts PostgreSQL database
- ✅ Starts Redis cache
- ✅ Checks for `.env.local` file
- ✅ Runs database migrations
- ✅ Starts Next.js in development mode
- ✅ Enables hot-reload for code changes

### `start-prod.bat` - Production Server

- ✅ Starts all services in production mode
- ✅ Builds optimized Docker images
- ✅ Uses production environment settings
- ✅ Better performance but no hot-reload

### `stop-app.bat` - Stop Everything

- 🛑 Gracefully stops all Docker containers
- 🧹 Preserves data in volumes
- 📊 Shows cleanup status

### `view-logs.bat` - Debug Helper

```
Select which logs to view:

1. Application logs
2. Database logs
3. Redis logs
4. All logs
5. Live tail all logs
```

### `reset-database.bat` - Fresh Start

- ⚠️ **WARNING**: Deletes ALL database data
- 🗄️ Removes database volume
- 🆕 Creates fresh database
- 📊 Runs migrations
- 🌱 Seeds initial data

### `backup-database.bat` - Data Safety

- 💾 Creates timestamped SQL backup
- 📁 Saves to `backups/` directory
- 📊 Shows backup file size
- 🔒 Preserves all your data

### `restore-database.bat` - Data Recovery

- 📥 Restores from backup file
- 🔍 Shows available backups
- ⚠️ Confirms before overwriting
- 🔄 Rebuilds database from backup

## 🌐 URLs After Starting

| Service            | URL                   | Purpose               |
| ------------------ | --------------------- | --------------------- |
| 🌐 **Weda.lk App** | http://localhost:3000 | Main application      |
| 🗄️ **Database**    | localhost:5432        | PostgreSQL (internal) |
| 🏃‍♂️ **Cache**       | localhost:6379        | Redis (internal)      |

## 🐛 Troubleshooting

### "Docker is not running"

1. Start Docker Desktop
2. Wait for it to fully load
3. Try again

### "Port already in use"

1. Run `stop-app.bat`
2. Check for other apps using port 3000
3. Restart Docker Desktop if needed

### "Database connection failed"

1. Run `view-logs.bat` → option 2 (Database logs)
2. Try `reset-database.bat`
3. Check `.env.local` database settings

### "Permission denied" errors

1. Make sure Docker Desktop is running as administrator
2. Try `manage-docker.bat` → option 7 (Clean Up Docker)
3. Restart Docker Desktop

### App loads but features don't work

1. Check `.env.local` file exists
2. Add your API keys (see `API-KEYS-SETUP.md`)
3. Restart with `start-dev.bat`

## 📝 Environment Files

| File           | Purpose                            |
| -------------- | ---------------------------------- |
| `.env.example` | Template with all variables        |
| `.env.local`   | Your actual API keys (create this) |
| `.env.docker`  | Docker-specific defaults           |

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Use test/sandbox keys for development
- ✅ Use production keys only in production
- ⚠️ Never commit real API keys to version control

## 🚀 Performance Tips

### Development Mode

- Faster startup
- Hot-reload enabled
- Detailed error messages
- Good for coding

### Production Mode

- Slower startup (needs to build)
- Optimized performance
- Minimal error details
- Good for testing final app

## 🆘 Getting Help

1. **Check logs first**: `view-logs.bat`
2. **Try clean restart**: `stop-app.bat` → `start-dev.bat`
3. **Reset if needed**: `reset-database.bat`
4. **Check environment**: `manage-docker.bat` → option 8

## 📚 Next Steps

1. ✅ Get app running with `start-dev.bat`
2. 📖 Read `API-KEYS-SETUP.md` for external services
3. 💻 Start coding your features
4. 💾 Regular backups with `backup-database.bat`

Happy coding! 🎉
