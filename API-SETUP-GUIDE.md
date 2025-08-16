# 🚀 Weda.lk Backend API Setup Guide

Complete step-by-step guide to configure all backend services for your Sri Lankan service marketplace platform.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Authentication Setup](#authentication-setup)
4. [File Storage Setup](#file-storage-setup)
5. [Payment Gateway Setup](#payment-gateway-setup)
6. [Email Service Setup](#email-service-setup)
7. [Additional Services](#additional-services)
8. [Environment Configuration](#environment-configuration)
9. [Testing & Verification](#testing--verification)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- A Gmail account (for Google services)
- A valid Sri Lankan phone number
- Business registration documents (for payment gateways)
- Basic understanding of environment variables

---

## 🗄️ Database Setup

### Step 1: PostgreSQL Database (Supabase - FREE)

**Why Supabase?** Free 500MB PostgreSQL database with built-in authentication and real-time features.

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with your Google account
   - Click "New Project"

2. **Project Configuration**

   ```
   Organization: Your Name
   Project Name: weda-lk-production
   Database Password: [Generate strong password - SAVE THIS!]
   Region: Asia Pacific (Singapore) - closest to Sri Lanka
   Pricing Plan: Free tier
   ```

3. **Get Database URL**
   - Go to Project Settings → Database
   - Copy the "Connection string" under "Connection pooling"
   - Format: `postgresql://postgres.[ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`

### Step 2: Redis Cache (Upstash - FREE)

**Why Redis?** Fast caching for session management and rate limiting.

1. **Create Account**
   - Go to [upstash.com](https://upstash.com)
   - Sign up with Google account

2. **Create Database**

   ```
   Name: weda-lk-cache
   Type: Regional
   Region: Asia Pacific (Singapore)
   ```

3. **Get Redis URL**
   - Click on your database
   - Copy "UPSTASH_REDIS_REST_URL"
   - Format: `rediss://default:[password]@[endpoint].upstash.io:6379`

---

## 🔐 Authentication Setup

### Step 1: NextAuth Secret

1. **Generate Secret**
   ```bash
   # Run in terminal
   openssl rand -base64 32
   ```

   - Copy the output (32+ characters)
   - This will be your `NEXTAUTH_SECRET`

### Step 2: Google OAuth Setup

1. **Google Cloud Console**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project: "Weda.lk Authentication"

2. **Enable APIs**
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - Google+ API
     - Gmail API

3. **Create Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

   ```
   Application type: Web application
   Name: Weda.lk Web Client
   Authorized JavaScript origins:
     - http://localhost:3000 (development)
     - https://your-domain.com (production)
   Authorized redirect URIs:
     - http://localhost:3000/api/auth/callback/google (development)
     - https://your-domain.com/api/auth/callback/google (production)
   ```

4. **Save Credentials**
   - Copy `Client ID` → `GOOGLE_CLIENT_ID`
   - Copy `Client Secret` → `GOOGLE_CLIENT_SECRET`

---

## 📁 File Storage Setup

### Cloudinary Setup (FREE - 25GB)

**Why Cloudinary?** Automatic image optimization, transformation, and CDN delivery.

1. **Create Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy from "Product Environment Credentials":
     - Cloud Name → `CLOUDINARY_CLOUD_NAME`
     - API Key → `CLOUDINARY_API_KEY`
     - API Secret → `CLOUDINARY_API_SECRET`

3. **Configure Upload Settings**
   - Go to Settings → Upload
   - Enable "Unsigned uploads" for development
   - Set upload folder: `weda-lk/`

---

## 💳 Payment Gateway Setup

### Step 1: Stripe Setup (International Payments)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up with business details
   - Complete business verification

2. **Get API Keys**
   - Go to Developers → API Keys
   - Copy:
     - Publishable key → `STRIPE_PUBLISHABLE_KEY`
     - Secret key → `STRIPE_SECRET_KEY`

3. **Setup Webhooks**
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

4. **Enable LKR Currency**
   - Go to Settings → Account Details
   - Add Sri Lanka as supported country
   - Enable LKR currency

### Step 2: PayHere Setup (Local Sri Lankan Payments)

**Required Documents:**

- Business Registration Certificate
- Bank Account Details
- National ID copy
- Company/Personal bank statement

1. **Create PayHere Account**
   - Go to [payhere.lk](https://www.payhere.lk)
   - Click "Sign Up" → "Merchant Account"
   - Fill business details

2. **Document Verification**
   - Upload required documents
   - Wait 2-3 business days for approval

3. **Get Credentials**
   - Login to PayHere Dashboard
   - Go to Settings → API Details
   - Copy:
     - Merchant ID → `PAYHERE_MERCHANT_ID`
     - Merchant Secret → `PAYHERE_MERCHANT_SECRET`

4. **Test Configuration**
   - Set `PAYHERE_SANDBOX=true` for testing
   - Use test card numbers from PayHere documentation

---

## 📧 Email Service Setup

### Resend Setup (FREE - 3000 emails/month)

1. **Create Account**
   - Go to [resend.com](https://resend.com)
   - Sign up with your email

2. **Verify Domain** (Optional but recommended)
   - Go to Domains → Add Domain
   - Add your domain (e.g., weda.lk)
   - Follow DNS verification steps

3. **Get API Key**
   - Go to API Keys → Create API Key
   - Name: "Weda.lk Production"
   - Copy API key → `RESEND_API_KEY`

4. **Set From Email**
   - Use: `noreply@weda.lk` → `RESEND_FROM_EMAIL`
   - Or: `noreply@yourdomain.com`

---

## 🗺️ Additional Services

### Step 1: Google Maps & Places API

1. **Enable APIs** (in same Google Cloud project)
   - Maps JavaScript API
   - Places API
   - Geocoding API

2. **Create API Key**
   - Go to Credentials → Create Credentials → API Key
   - Restrict key to your domains
   - Copy key → `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Step 2: Sri Lankan Specific Services

#### Exchange Rate API

1. **Get Free API**
   - Go to [exchangerate-api.com](https://exchangerate-api.com)
   - Sign up for free plan (1500 requests/month)
   - Copy API key → `EXCHANGE_RATE_API_KEY`

#### Police Verification (Custom)

- Contact Sri Lankan Police IT department
- Request API access for background checks
- Get credentials → `POLICE_VERIFICATION_API_KEY`

---

## ⚙️ Environment Configuration

### Step 1: Create Environment File

1. **Copy Example File**

   ```bash
   cp .env.example .env.local
   ```

2. **Fill All Variables**

   ```bash
   # Security
   NEXTAUTH_SECRET=your-generated-32-char-secret
   NEXTAUTH_URL=http://localhost:3000

   # Database
   DATABASE_URL=your-supabase-postgresql-url
   REDIS_URL=your-upstash-redis-url

   # Authentication
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # File Storage
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   # Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-google-places-key

   # Payments
   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

   # PayHere (when approved)
   PAYHERE_MERCHANT_ID=your-payhere-merchant-id
   PAYHERE_MERCHANT_SECRET=your-payhere-secret
   PAYHERE_SANDBOX=true

   # Email
   RESEND_API_KEY=your-resend-api-key
   RESEND_FROM_EMAIL=noreply@weda.lk

   # Additional
   EXCHANGE_RATE_API_KEY=your-exchange-rate-key
   ```

### Step 2: Database Migration

1. **Generate Prisma Client**

   ```bash
   npm run db:generate
   ```

2. **Run Database Migration**

   ```bash
   npm run db:migrate
   ```

3. **Seed Initial Data**
   ```bash
   npm run db:seed
   ```

---

## ✅ Testing & Verification

### Step 1: Health Check

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Test Health Endpoint**
   - Open: `http://localhost:3000/api/health`
   - Should return: `{"status": "ok", "database": "connected"}`

### Step 2: Authentication Test

1. **Test Google Login**
   - Go to: `http://localhost:3000/login`
   - Click "Sign in with Google"
   - Verify successful login

2. **Test Email/Password**
   - Go to: `http://localhost:3000/signup`
   - Create test account
   - Verify in database

### Step 3: Payment Test

1. **Stripe Test Payment**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

2. **PayHere Test** (when approved)
   - Use PayHere test credentials
   - Test with sandbox mode

### Step 4: File Upload Test

1. **Test Image Upload**
   - Upload profile picture
   - Verify image appears in Cloudinary dashboard

---

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Failed

```bash
Error: Can't reach database server
```

**Solution:**

- Verify DATABASE_URL format
- Check Supabase dashboard for connection details
- Ensure IP whitelist includes your location

#### Google OAuth Error

```bash
Error: redirect_uri_mismatch
```

**Solution:**

- Verify redirect URI in Google Cloud Console
- Check NEXTAUTH_URL in .env.local
- Ensure exact URL match (http vs https)

#### Stripe Webhook Failed

```bash
Error: No signatures found matching the expected signature
```

**Solution:**

- Verify STRIPE_WEBHOOK_SECRET
- Check webhook endpoint URL
- Test with Stripe CLI for local development

#### PayHere Integration Issues

```bash
Error: Invalid merchant credentials
```

**Solution:**

- Verify merchant ID and secret
- Check if account is approved
- Ensure sandbox mode matches environment

### Performance Optimization

#### Database Optimization

- Add database indexes for frequently queried fields
- Use connection pooling (already configured with Supabase)
- Monitor query performance with Prisma logs

#### Redis Caching

- Cache user sessions
- Cache frequently accessed data
- Set appropriate TTL values

#### File Storage Optimization

- Use Cloudinary transformations for responsive images
- Enable auto-format and auto-quality
- Set up CDN caching headers

---

## 📞 Support Contacts

### Service Provider Support

- **Supabase:** [supabase.com/support](https://supabase.com/support)
- **Stripe:** [support.stripe.com](https://support.stripe.com)
- **PayHere:** support@payhere.lk
- **Cloudinary:** [support.cloudinary.com](https://support.cloudinary.com)

### Sri Lankan Specific

- **PayHere Support:** +94 11 2 250 250
- **Police IT Department:** +94 11 2 421 111

---

## 🎉 Congratulations!

Your Weda.lk backend is now fully configured with:

- ✅ PostgreSQL database with Redis caching
- ✅ Multi-provider authentication (Google + Email/Password)
- ✅ International payments (Stripe) + Local payments (PayHere)
- ✅ File storage with automatic optimization
- ✅ Email service for notifications
- ✅ Google Maps integration
- ✅ Sri Lankan specific services

**Next Steps:**

1. Test all integrations thoroughly
2. Set up monitoring and logging
3. Configure production deployment
4. Apply for PayHere merchant approval
5. Set up backup and disaster recovery

**Security Reminder:**

- Never commit .env.local to version control
- Use different API keys for development and production
- Regularly rotate API keys and secrets
- Monitor usage and set up alerts for unusual activity
