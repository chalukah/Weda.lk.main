# 🐳 Weda.lk Docker Setup - Complete Guide

**The easiest way to run Weda.lk with Docker on Windows!**

## 🎯 TL;DR - Super Quick Start

1. **Install Docker Desktop** and make sure it's running
2. **Double-click `manage-docker.bat`**
3. **Choose option 1** (Start Development Server)
4. **Open http://localhost:3000**
5. **Start coding!** 🎉

## 📁 What You Get

This Docker setup includes:

- ✅ **8 Easy Batch Files** - No command line needed!
- ✅ **PostgreSQL Database** - Production-ready database
- ✅ **Redis Cache** - Fast caching layer
- ✅ **Hot Reload** - See changes instantly in development
- ✅ **Production Build** - Optimized for deployment
- ✅ **Database Backups** - Never lose your data
- ✅ **One-Click Management** - Everything in one place

## 🛠️ All Batch Files

| 🎛️ File                 | What It Does                      | When to Use            |
| ----------------------- | --------------------------------- | ---------------------- |
| **`manage-docker.bat`** | 🎯 **Main menu with all options** | **Start here always!** |
| `start-dev.bat`         | 🚀 Start development server       | Daily coding           |
| `start-prod.bat`        | 🏭 Start production server        | Testing final build    |
| `stop-app.bat`          | 🛑 Stop all services              | When done working      |
| `view-logs.bat`         | 📊 View container logs            | Debugging problems     |
| `reset-database.bat`    | 🗄️ Fresh database                 | Clean slate needed     |
| `backup-database.bat`   | 💾 Backup your data               | Before big changes     |
| `restore-database.bat`  | 📥 Restore from backup            | Recovery needed        |

## 🚀 Development Workflow

### 🌅 Starting Your Day

```
1. Double-click manage-docker.bat
2. Choose "1" (Start Development Server)
3. Wait for "✅ Server will be available at: http://localhost:3000"
4. Open browser and code away!
```

### 💻 While Coding

- ✅ **Code changes auto-reload** - No restart needed
- ✅ **Database persists** - Your data stays safe
- ✅ **View logs anytime** - Run `view-logs.bat`
- ✅ **Backup before experiments** - Run `backup-database.bat`

### 🌆 Ending Your Day

```
1. Press Ctrl+C in terminal (if visible)
2. Double-click stop-app.bat
3. Done! Data is preserved.
```

## 🏭 Production Testing

Want to test how your app will perform in production?

```
1. Double-click manage-docker.bat
2. Choose "2" (Start Production Server)
3. Wait for build to complete
4. Test at http://localhost:3000
```

**Production mode includes:**

- ✅ Optimized JavaScript bundles
- ✅ Minimized CSS
- ✅ Production database settings
- ✅ Better performance
- ❌ No hot-reload (need to rebuild for changes)

## 📊 Services & URLs

After starting, you'll have:

| Service            | URL                   | Purpose                    |
| ------------------ | --------------------- | -------------------------- |
| 🌐 **Weda.lk App** | http://localhost:3000 | Your main application      |
| 🗄️ **PostgreSQL**  | localhost:5432        | Database (internal access) |
| 🏃‍♂️ **Redis**       | localhost:6379        | Cache (internal access)    |

## 💾 Database Management

### Automatic Backups

```bash
# Creates timestamped backup in backups/ folder
Double-click backup-database.bat
```

### Restore from Backup

```bash
# Shows available backups and restores
Double-click restore-database.bat
```

### Fresh Start

```bash
# ⚠️ WARNING: Deletes all data!
Double-click reset-database.bat
```

## 🐛 Troubleshooting

### "Docker is not running"

1. Start Docker Desktop
2. Wait for the whale icon to stop animating
3. Try again

### "Port 3000 already in use"

1. Run `stop-app.bat`
2. Close any other apps using port 3000
3. Try starting again

### "Database connection failed"

1. Run `view-logs.bat` → Choose option 2 (Database logs)
2. Try `reset-database.bat` for a fresh start
3. Check if Docker has enough memory (4GB+ recommended)

### "Permission denied"

1. Run Docker Desktop as Administrator
2. Try `manage-docker.bat` → option 9 (Clean Up Docker)
3. Restart Docker Desktop

### App loads but features broken

1. Create `.env.local` file (copy from `.env.example`)
2. Add your API keys following `API-KEYS-SETUP.md`
3. Restart with `start-dev.bat`

## 🔧 Technical Details

### Docker Compose Files

- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development overrides
- `Dockerfile` - Multi-stage build for optimization

### Development vs Production

| Feature           | Development        | Production               |
| ----------------- | ------------------ | ------------------------ |
| **Startup Time**  | ⚡ Fast            | 🐌 Slower (builds first) |
| **Code Changes**  | 🔄 Auto-reload     | 🔨 Need rebuild          |
| **Performance**   | 📊 Good            | 🚀 Optimized             |
| **Error Details** | 🔍 Detailed        | 🔒 Minimal               |
| **Database**      | 🗄️ Same PostgreSQL | 🗄️ Same PostgreSQL       |

### Environment Files

| File           | Purpose                        | Status             |
| -------------- | ------------------------------ | ------------------ |
| `.env.example` | 📋 Template with all variables | ✅ Included        |
| `.env.local`   | 🔑 Your actual API keys        | ❗ You create this |
| `.env.docker`  | 🐳 Docker defaults             | ✅ Included        |

## 📚 Next Steps

1. ✅ **Get it running** - `manage-docker.bat` → option 1
2. 📖 **Set up APIs** - Read `API-KEYS-SETUP.md`
3. 🎨 **Customize** - Edit your code with hot-reload
4. 💾 **Stay safe** - Regular backups with `backup-database.bat`
5. 🚀 **Deploy** - Use production mode for testing

## 🆘 Still Need Help?

1. **Check the logs**: `view-logs.bat`
2. **Try a clean start**: `stop-app.bat` → `reset-database.bat` → `start-dev.bat`
3. **Read full docs**: `DOCKER-COMMANDS.md` for detailed explanations
4. **Check environment**: `manage-docker.bat` → option 10

## 🎉 You're All Set!

Your Weda.lk Docker environment is ready to go! The batch files make everything simple - no complex Docker commands needed.

**Happy coding!** 🚀

---

_💡 Pro tip: Bookmark `manage-docker.bat` - it's your Docker command center!_
