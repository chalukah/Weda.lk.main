# 🔧 Manual Setup Tasks Required

These are the remaining tasks you need to complete manually to finish the API setup:

## ✅ Already Completed by Claude

- ✅ Generated NextAuth secret and updated `.env.local`
- ✅ Added MCP servers: Supabase, Upstash Redis, Cloudinary, Filesystem
- ✅ Updated environment variables template with better instructions
- ✅ Verified project dependencies and structure

## 🔴 Manual Tasks You Need to Complete

### 1. 🔑 Google OAuth Setup (Required for login)

**Steps:**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project: "Weda.lk Authentication"
3. Enable APIs:
   - Go to "APIs & Services" → "Library"
   - Search and enable: **Google+ API** and **Gmail API**
4. Create OAuth credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: **Web application**
   - Name: **Weda.lk Web Client**
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy credentials to `.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=your-actual-client-id
   GOOGLE_CLIENT_SECRET=your-actual-client-secret
   ```

### 2. 📁 Cloudinary Setup (Required for file uploads)

**Steps:**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard → Product Environment Credentials
4. Copy credentials to `.env.local`:
   ```bash
   CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   CLOUDINARY_API_KEY=your-actual-api-key
   CLOUDINARY_API_SECRET=your-actual-api-secret
   ```
5. Update `.mcp.json` with same credentials

### 3. 🗺️ Google Maps Setup (Required for location features)

**Steps:**

1. In same Google Cloud project from step 1
2. Enable additional APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**
3. Create API Key:
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Restrict key to your domains for security
4. Copy to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-places-api-key
   ```

### 4. 📧 Resend Email Setup (Required for notifications)

**Steps:**

1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Go to API Keys → Create API Key
4. Name: "Weda.lk Production"
5. Copy to `.env.local`:
   ```bash
   RESEND_API_KEY=your-actual-resend-api-key
   ```

### 5. 🗄️ Database Password (Required for database connection)

**Steps:**

1. Go to your Supabase project dashboard
2. Go to Settings → Database
3. Find your database password (you set this when creating the project)
4. Update `.env.local`:
   ```bash
   DATABASE_URL=postgresql://postgres.kxkkquyymbqgwkbxralz:YOUR_ACTUAL_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```

## 🚀 After Completing Manual Tasks

Once you've completed all manual tasks above:

1. **Test the setup:**

   ```bash
   npm run dev
   ```

2. **Check health endpoint:**
   - Open: http://localhost:3000/api/health
   - Should return: `{"status": "ok", "database": "connected"}`

3. **Generate Prisma client:**

   ```bash
   npm run db:generate
   ```

4. **Run database migrations:**

   ```bash
   npm run db:migrate
   ```

5. **Seed initial data:**
   ```bash
   npm run db:seed
   ```

## 🔍 Testing Checklist

After setup:

- [ ] Google login works
- [ ] Database connects successfully
- [ ] File upload to Cloudinary works
- [ ] Email sending works
- [ ] Maps load correctly

## 📞 Support

If you encounter issues:

- **Supabase:** [supabase.com/support](https://supabase.com/support)
- **Google Cloud:** [cloud.google.com/support](https://cloud.google.com/support)
- **Cloudinary:** [support.cloudinary.com](https://support.cloudinary.com)
- **Resend:** [resend.com/support](https://resend.com/support)

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Regularly rotate API keys and secrets
- Set up domain restrictions on API keys
