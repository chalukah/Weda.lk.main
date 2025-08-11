# Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Establish core project infrastructure, user authentication system, and basic service provider onboarding workflow to create a deployable foundation that enables provider registration and initial verification processes while delivering a functional health check and landing page for market validation.

## Story 1.1: Project Setup & Infrastructure

As a **developer**,
I want **a fully configured Next.js project with essential dependencies and development environment**,
so that **I can begin building features with proper tooling, testing, and deployment pipeline in place**.

### Acceptance Criteria

1. Next.js 15 project initialized with TypeScript configuration
2. Tailwind CSS and shadcn/ui components integrated and configured
3. PostgreSQL database connection established with Prisma ORM
4. Redis integration configured for session management
5. Jest and Playwright testing frameworks configured
6. ESLint, Prettier, and Husky pre-commit hooks active
7. Vercel deployment pipeline configured with staging/production environments
8. Basic CI/CD workflow running automated tests on PR/merge
9. Health check endpoint responding at /api/health with database connectivity status

## Story 1.2: Landing Page & Service Categories

As a **potential customer**,
I want **to view an attractive landing page that explains Weda.lk's value proposition and available service categories**,
so that **I can understand the platform's benefits and see what services are available in my area**.

### Acceptance Criteria

1. Responsive landing page with hero section explaining police-verified service providers
2. Service category grid displaying 6 main categories (plumbing, electrical, carpentry, cleaning, pest control, AC repair)
3. Trust indicators section highlighting verification process and platform benefits
4. Location detection prompt for geographic service availability
5. Call-to-action buttons for customer signup and service provider registration
6. Footer with contact information and basic legal pages (privacy, terms)
7. Mobile-optimized layout with touch-friendly interactions
8. Page load time under 3 seconds on 3G connections

## Story 1.3: User Registration & Authentication

As a **user (customer or service provider)**,
I want **to create an account and securely authenticate**,
so that **I can access platform features appropriate to my role**.

### Acceptance Criteria

1. Registration form with email, phone, password, and role selection (customer/provider)
2. Email and SMS OTP verification for account activation
3. NextAuth.js integration with email/password and Google OAuth providers
4. Password strength validation and secure hashing with bcrypt
5. Session management with Redis for scalable concurrent users
6. Role-based access control distinguishing customers from service providers
7. Profile completion prompts after initial registration
8. Account lockout protection after failed login attempts
9. Password reset functionality via email verification

## Story 1.4: Service Provider Document Upload

As a **service provider**,
I want **to upload my police clearance certificate and professional documents**,
so that **I can begin the verification process to join the platform**.

### Acceptance Criteria

1. Secure file upload interface for PDF documents (police clearance, NIC, certifications)
2. File validation ensuring PDF format, size limits (10MB max), and virus scanning
3. AWS S3 integration for encrypted document storage with access controls
4. Document preview functionality for uploaded files
5. Upload progress indicators and error handling for failed uploads
6. Document categorization (police clearance, identity, professional certificates)
7. Automatic notification to admin team when documents uploaded
8. Provider dashboard showing document upload status and requirements
9. Data retention policies and secure document deletion capabilities

## Story 1.5: Basic Admin Dashboard

As an **administrator**,
I want **to access a dashboard showing pending verification requests and basic platform metrics**,
so that **I can manage service provider onboarding and monitor platform health**.

### Acceptance Criteria

1. Admin login with separate authentication system and enhanced security
2. Pending verifications dashboard listing new provider applications
3. Document viewer for reviewing uploaded police clearances and certificates
4. Approval/rejection workflow with notification system to providers
5. Basic analytics showing registration counts, pending verifications, and active users
6. User management interface for customer and provider account oversight
7. System health monitoring dashboard with database and service status
8. Admin activity logging for audit trail compliance
9. Role-based permissions allowing multiple admin access levels

---
