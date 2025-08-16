# 🔐 Weda.lk API Keys & Environment Setup Guide

**Last Updated:** August 12, 2025  
**Purpose:** Subscription-based service marketplace - FREE services for platform infrastructure

## 🆓 FREE INFRASTRUCTURE Setup (No Monthly Costs)

- [ ] Database (Supabase - 500MB free)
- [ ] Redis Cache (Upstash - 10K requests/day free)
- [ ] NextAuth Secret
- [ ] Google OAuth
- [ ] File Storage (Cloudinary - 25GB free)
- [ ] Google Maps ($200/month credit)
- [ ] Email Service (Resend - 3000 emails/month free)
- [ ] Error Tracking (Sentry - 5K errors/month free)
- [ ] Your Bank Account (for subscription payments)

## 💰 REVENUE MODEL

**Subscription Revenue:**

- Free Trial: 30 days for all new users
- Premium: LKR 5,000/month per user
- Payment: Direct bank transfer to your account
- No transaction processing needed

**Scaling Options:**

- [ ] AWS S3 Storage (when you need >25GB)
- [ ] Twilio SMS (when SMS verification is required)

## 🔧 Environment Variables (.env.local)

Create a `.env.local` file in your project root with these variables:

```bash
# =======================
# 🔒 SECURITY
# =======================
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# =======================
# 🗄️ DATABASE (FREE: Supabase)
# =======================
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres

# =======================
# 🏃‍♂️ CACHE (FREE: Upstash)
# =======================
REDIS_URL=rediss://default:password@redis.upstash.io:6379

# =======================
# 🔑 AUTHENTICATION
# =======================
# Google OAuth (for social login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# =======================
# 📁 FILE STORAGE (FREE: Cloudinary)
# =======================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# =======================
# 🗺️ MAPS & LOCATION (FREE: $200 credit)
# =======================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-google-places-api-key

# =======================
# 💳 SUBSCRIPTION PAYMENTS (MANUAL BANK TRANSFER)
# =======================
# Your bank details for receiving monthly subscription payments
BANK_NAME=Commercial Bank of Ceylon
BANK_ACCOUNT_NUMBER=8001234567
ACCOUNT_HOLDER_NAME=Weda.lk (Pvt) Ltd

# Subscription settings
FREE_TRIAL_DAYS=30
MONTHLY_SUBSCRIPTION_PRICE=5000

# =======================
# 📧 EMAIL (FREE: Resend)
# =======================
RESEND_API_KEY=re_your-resend-api-key
RESEND_FROM_EMAIL=noreply@weda.lk

# =======================
# 📊 MONITORING (FREE: Sentry)
# =======================
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# =======================
# 🌐 EXTERNAL APIS
# =======================
# Exchange Rate API (for currency conversion)
EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key

# Police Verification API (Custom Sri Lankan service)
POLICE_VERIFICATION_API_KEY=your-police-api-key
POLICE_VERIFICATION_BASE_URL=https://api.police.lk/v1

# =======================
# 🔧 DEVELOPMENT
# =======================
NODE_ENV=development
LOG_LEVEL=debug

# =======================
# 💰 PAID UPGRADE OPTIONS (Add when scaling)
# =======================
# AWS S3 (when Cloudinary limits exceeded)
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=ap-southeast-1
# AWS_S3_BUCKET_NAME=weda-lk-uploads

# Twilio SMS (when SMS verification needed)
# TWILIO_ACCOUNT_SID=your-twilio-account-sid
# TWILIO_AUTH_TOKEN=your-twilio-auth-token
# TWILIO_PHONE_NUMBER=+94712345678

# PayHere (for Sri Lankan market)
# PAYHERE_MERCHANT_ID=your-payhere-merchant-id
# PAYHERE_MERCHANT_SECRET=your-payhere-secret
# PAYHERE_SANDBOX=true
```

---

## 🏗️ FREE Service Setup Instructions

### 1. 🗄️ Database Setup (Supabase - FREE 500MB)

**Setup Steps:**

```bash
# 1. Go to https://supabase.com and create account
# 2. Create new project: "weda-lk"
# 3. Go to Settings → Database
# 4. Copy connection string
# 5. Add to DATABASE_URL in .env.local
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# 6. Run migrations
npm run db:migrate
npm run db:seed
```

**Free Limits:**

- 500MB Database
- 2GB Bandwidth
- 50,000 monthly active users

### 2. 🏃‍♂️ Redis Setup (Upstash - FREE 10K requests/day)

**Setup Steps:**

```bash
# 1. Go to https://upstash.com and create account
# 2. Create Redis database
# 3. Select "Global" for better performance
# 4. Copy REST URL
# 5. Add to REDIS_URL in .env.local
REDIS_URL=rediss://default:[password]@[endpoint].upstash.io:6379
```

**Free Limits:**

- 10,000 requests per day
- 256MB storage

### 3. 🔐 NextAuth Setup

**Generate Secret:**

```bash
# Generate a secure secret
openssl rand -base64 32
```

**Add to .env.local:**

```bash
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000  # Change for production
```

**✅ PRODUCTION-READY Authentication Features:**

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Secure user registration with validation
- ✅ Email/password and Google OAuth login
- ✅ Protected dashboard routes
- ✅ User role management (CUSTOMER/PROVIDER)
- ✅ Session management with JWT
- ✅ Form validation and error handling

### 4. 🔑 Google OAuth Setup

**Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "Weda.lk"
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://weda.lk/api/auth/callback/google`

**Get Keys:**

```bash
GOOGLE_CLIENT_ID=123456789-abcdefgh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-key
```

### 5. 📁 File Storage Setup (Cloudinary - FREE 25GB)

**Setup Steps:**

```bash
# 1. Go to https://cloudinary.com and create account
# 2. Go to Dashboard
# 3. Copy Cloud Name, API Key, and API Secret
# 4. Add to .env.local
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-secret-key
```

**Free Limits:**

- 25GB storage
- 25GB monthly bandwidth
- Image/video transformations included

**Upgrade Path:**

- When you exceed 25GB, upgrade to AWS S3
- Uncomment AWS variables in .env.local

### 6. 🗺️ Google Maps Setup

**Steps:**

1. Go to [Google Maps Platform](https://developers.google.com/maps)
2. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API

**Restrict API Key:**

- HTTP referrers: `weda.lk/*`, `localhost:3000/*`

### 7. 💳 Subscription Payment Setup (Manual Bank Transfer)

**Setup Steps:**

```bash
# 1. Set up your business bank account
# 2. Add bank details to .env.local
BANK_NAME="Your Bank Name"
BANK_ACCOUNT_NUMBER="Your Account Number"
ACCOUNT_HOLDER_NAME="Your Business Name"
```

**Benefits:**

- No transaction fees to third-party payment processors
- Direct bank deposits
- 100% of customer payment (minus your commission setup)
- Manual verification process for security

**Subscription Platform Flow:**

1. User signs up → Gets 30-day free trial automatically
2. User connects directly with service providers during trial
3. All transactions happen directly between customer and provider
4. After 30 days → User pays LKR 5,000 monthly subscription to continue
5. You verify subscription payment and maintain access

**Benefits of Subscription Model:**

- Zero transaction handling complexity
- Predictable monthly recurring revenue
- Users handle all service payments directly
- Simple platform access fee model

### 8. 📧 Email Setup (Resend - FREE 3000 emails/month)

**Setup Steps:**

```bash
# 1. Go to https://resend.com and create account
# 2. Verify domain: weda.lk
# 3. Create API key
# 4. Add to .env.local
RESEND_API_KEY=re_your-api-key
RESEND_FROM_EMAIL=noreply@weda.lk
```

**Free Limits:**

- 3,000 emails per month
- 100 emails per day
- Domain verification included

**Email Templates Needed:**

- Welcome email
- Booking confirmation
- Provider verification
- Password reset
- Review reminders

### 9. 📊 Sentry Error Tracking (FREE 5K errors/month)

**Setup Steps:**

```bash
# 1. Go to https://sentry.io and create account
# 2. Create new project: "weda-lk"
# 3. Select "Next.js" as platform
# 4. Copy DSN from project settings
# 5. Add to .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

**Free Limits:**

- 5,000 errors per month
- 1 team member
- 30-day error retention

---

## 💰 PAID UPGRADE Services (Add Later)

### AWS S3 Setup (When Cloudinary limits exceeded)

**Steps:**

1. Create AWS account
2. Create S3 bucket: `weda-lk-uploads`
3. Create IAM user with S3 permissions
4. Uncomment AWS variables in .env.local

### Twilio SMS Setup (When SMS verification needed)

**Steps:**

1. Create [Twilio](https://www.twilio.com) account
2. Get Sri Lankan phone number (+94)
3. Uncomment Twilio variables in .env.local

**Sri Lankan SMS Rates:**

- SMS: ~$0.05 per message
- WhatsApp: ~$0.02 per message

### PayHere Setup (For Sri Lankan market)

**Steps:**

1. Register at [PayHere](https://www.payhere.lk/merchant/)
2. Complete business verification
3. Uncomment PayHere variables in .env.local

---

## 🏗️ Database Setup & Migration

After setting up your environment variables, run these commands:

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npm run db:generate

# 3. Run database migrations
npm run db:migrate

# 4. (Optional) Seed sample data
npm run db:seed
```

**✅ PRODUCTION-READY Database Features:**

- ✅ User management with profiles
- ✅ Service provider verification
- ✅ Service connections (no payment processing)
- ✅ Subscription management
- ✅ Messaging system
- ✅ Reviews and ratings
- ✅ Secure document storage

---

## 🚀 Quick Start Script

Create this script to verify all services:

```bash
# test-services.sh
#!/bin/bash

echo "🔍 Testing Weda.lk Services..."

# Test Database
echo "📦 Testing Database..."
npm run db:ping

# Test Redis
echo "🏃‍♂️ Testing Redis..."
curl http://localhost:3000/api/health

# Test Google Maps
echo "🗺️ Testing Google Maps..."
curl "https://maps.googleapis.com/maps/api/geocode/json?address=Colombo&key=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"

echo "✅ Service tests completed!"
```

---

## 🔒 Security Best Practices

### Environment Variables Security

```bash
# ❌ NEVER commit these files
.env.local
.env.production
.env

# ✅ Use different keys for each environment
# Development, Staging, Production should have separate keys
```

### API Key Rotation Schedule

- **Monthly**: Payment gateway keys
- **Quarterly**: Database passwords
- **Yearly**: OAuth secrets

### Production Checklist

- [ ] All keys are production-ready (not sandbox/test)
- [ ] API keys have proper restrictions
- [ ] Rate limiting is enabled
- [ ] Monitoring is set up
- [ ] Backup systems are configured

---

## 🐛 Common Issues & Solutions

### Issue 1: Database Connection Failed

```bash
# Check connection string format
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public

# Test connection
npm run db:ping
```

### Issue 2: Redis Connection Timeout

```bash
# Check Redis URL format
REDIS_URL=redis://username:password@host:6379

# Test locally
redis-cli ping
```

### Issue 3: Google Maps Not Loading

```bash
# Check API restrictions
# Ensure domain is allowed: localhost:3000, weda.lk
# Check billing account is active
```

### Issue 4: PayHere Sandbox Issues

```bash
# Use test merchant ID for sandbox
PAYHERE_MERCHANT_ID=1219149
PAYHERE_SANDBOX=true
```

---

## 📞 Support Contacts

| Service     | Support            | Documentation                      |
| ----------- | ------------------ | ---------------------------------- |
| PayHere     | support@payhere.lk | https://payhere.lk/docs            |
| AWS         | aws-support        | https://docs.aws.amazon.com        |
| Google Maps | maps-support       | https://developers.google.com/maps |
| Twilio      | help@twilio.com    | https://www.twilio.com/docs        |

---

## 💰 Cost Comparison

### 🆓 FREE TIER (Current Setup - 1000-2000 users)

| Service                   | Free Tier Limits         | Monthly Cost |
| ------------------------- | ------------------------ | ------------ |
| Database (Supabase)       | 500MB, 2GB bandwidth     | $0           |
| Redis (Upstash)           | 10K requests/day         | $0           |
| File Storage (Cloudinary) | 25GB storage + bandwidth | $0           |
| Google Maps               | $200 credit/month        | $0           |
| Subscription Processing   | Manual verification      | $0           |
| Email (Resend)            | 3,000 emails/month       | $0           |
| Error Tracking (Sentry)   | 5K errors/month          | $0           |

**Total Monthly Cost: $0** 🎉

### 💰 PAID TIER (When you scale beyond free limits)

| Service                 | Paid Tier                   | Monthly Cost |
| ----------------------- | --------------------------- | ------------ |
| Database (Supabase Pro) | Unlimited                   | $25/month    |
| Redis (Upstash)         | Unlimited requests          | $20/month    |
| AWS S3                  | 100GB storage               | $25/month    |
| Google Maps             | After $200 credit           | $50/month    |
| Twilio SMS              | SMS verification            | $30/month    |
| Manual Bank Processing  | Staff time for verification | ~$50/month   |

**Total Estimated Cost: ~$150/month** for scale (vs $240 previously)

---

_🔄 This document should be updated whenever new services are added or keys are rotated._
