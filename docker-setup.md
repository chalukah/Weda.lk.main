# 🐳 Docker Setup for Weda.lk

This guide helps you run the Weda.lk application using Docker with easy-to-use batch files for Windows.

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose v2.0+
- Windows 10+ (for batch files)
- Git (for cloning)

## 🚀 Quick Start (Windows)

### 🎯 Super Easy Method (Recommended)

1. **Double-click `manage-docker.bat`** - This opens a menu with all options
2. **Choose option 1** for development or **option 2** for production
3. **Access your app** at http://localhost:3000

### 📝 Manual Method

1. **Clone and navigate to the project:**

   ```bash
   git clone <your-repo-url>
   cd weda.lk
   ```

2. **Choose your environment:**
   - **Development**: Double-click `start-dev.bat`
   - **Production**: Double-click `start-prod.bat`

3. **Access the application:**
   - App: http://localhost:3000
   - Database: PostgreSQL on localhost:5432
   - Cache: Redis on localhost:6379

## 🛠️ Available Batch Files

| File                 | Description                               | Use When           |
| -------------------- | ----------------------------------------- | ------------------ |
| `manage-docker.bat`  | **Main menu** - All options in one place  | Always start here  |
| `start-dev.bat`      | Start development server with hot reload  | Development        |
| `start-prod.bat`     | Start production server with optimization | Production/Testing |
| `stop-app.bat`       | Stop all services cleanly                 | When done working  |
| `reset-database.bat` | Reset database (⚠️ deletes all data)      | Fresh start needed |
| `view-logs.bat`      | View container logs                       | Debugging issues   |

## Services

- **app**: Next.js application (port 3000)
- **postgres**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)
- **prisma-studio**: Database management tool (port 5555, optional)

## Useful Commands

```bash
# Stop all services
docker-compose down

# Rebuild the app image
docker-compose build app

# View database logs
docker-compose logs postgres

# Access database directly
docker-compose exec postgres psql -U weda_user -d weda_db

# Access Redis CLI
docker-compose exec redis redis-cli -a redis_password

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Generate Prisma client
docker-compose exec app npx prisma generate

# Reset database (CAUTION: This deletes all data)
docker-compose exec app npx prisma migrate reset --force
```

## Environment Variables

Key environment variables in `.env.local`:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `STRIPE_*`: Stripe payment configuration
- `CLOUDINARY_*`: Image upload configuration
- `RESEND_API_KEY`: Email service configuration

## Troubleshooting

1. **Port conflicts**: Change ports in `docker-compose.yml` if needed
2. **Permission issues**: Run `docker-compose down -v` to reset volumes
3. **Build issues**: Run `docker-compose build --no-cache app`
4. **Database connection**: Ensure PostgreSQL service is healthy

## Production Deployment

For production:

1. Update environment variables with production values
2. Use production database instead of local PostgreSQL
3. Configure proper secrets management
4. Set up SSL/TLS termination
5. Configure monitoring and logging

## Development with Docker

To develop with Docker:

```bash
# Mount source code for live reloading
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This setup provides a complete development environment with all dependencies containerized.
