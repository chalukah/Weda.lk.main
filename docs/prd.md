# Weda.lk Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Establish Weda.lk as Sri Lanka's leading trusted home services marketplace
- Connect homeowners with police-verified service providers across multiple provinces
- Achieve 10,000+ monthly active users and 1,000+ verified professionals in Year 1
- Generate sustainable revenue through 23% commission structure (18% provider + 5% customer)
- Expand from Western Province to Central and Southern provinces within 18 months
- Maintain 4.5+ star average customer satisfaction rating
- Build transparent, reliable platform that benefits both service seekers and providers

### Background Context

The suspension of QuickHelp.lk has created an immediate market vacuum in Sri Lanka's home services sector, presenting a 6-12 month strategic window before competitive response. This timing coincides with growing digital adoption post-COVID and rising middle-class demand for professional home services across the island.

The current landscape consists of limited players like PickMe Services (Colombo-only with basic vetting), premium-priced Urban Company, unorganized Facebook groups, and unreliable word-of-mouth referrals. Weda.lk will differentiate through police clearance verification for all service providers, nationwide coverage strategy, and fair commission structure tailored to the Sri Lankan market.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-08-11 | 1.0 | Initial PRD creation from project brief | John (PM) |

---

## Requirements

### Functional Requirements

1. **FR1**: Users must be able to register and authenticate using email/phone with OTP verification
2. **FR2**: Service providers must upload and submit police clearance certificates for verification before platform activation
3. **FR3**: Customers must be able to search for service providers by location, service category, and availability
4. **FR4**: The platform must display service provider profiles with ratings, reviews, portfolio, and verified status
5. **FR5**: Customers must be able to book services with date/time scheduling and price confirmation
6. **FR6**: The system must process secure payments through integrated gateways (PayHere/Stripe) with escrow functionality
7. **FR7**: Both parties must be able to rate and review each other after service completion
8. **FR8**: Admin dashboard must allow verification workflow management for service provider applications
9. **FR9**: The platform must send automated notifications for booking confirmations, reminders, and status updates
10. **FR10**: Service providers must be able to set availability, pricing, and service areas
11. **FR11**: The system must track and display real-time service provider locations for proximity matching
12. **FR12**: Platform must support multiple service categories (plumbing, electrical, carpentry, cleaning, pest control, AC repair)

### Non-Functional Requirements

1. **NFR1**: Platform must handle 10,000+ concurrent users with response times under 2 seconds
2. **NFR2**: System must achieve 99.5% uptime during business hours (6 AM - 10 PM Sri Lanka time)
3. **NFR3**: Mobile-responsive design must provide optimal experience across all device types
4. **NFR4**: Payment processing must comply with PCI DSS standards and Sri Lankan financial regulations
5. **NFR5**: Platform must scale horizontally to support expansion across Western, Central, and Southern provinces
6. **NFR6**: Database must handle 150+ transactions per month initially, scaling to 1000+ by year-end
7. **NFR7**: Geographic search functionality must perform within 1 second for location-based queries
8. **NFR8**: Data backup and disaster recovery procedures must ensure maximum 4-hour recovery time
9. **NFR9**: API rate limiting must prevent abuse while allowing legitimate high-usage scenarios

---

## User Interface Design Goals

### Overall UX Vision
Establish a trustworthy, accessible marketplace that prioritizes verification transparency and ease-of-use for Sri Lankan households. The interface should bridge traditional service booking methods (phone calls, word-of-mouth) with modern digital convenience, emphasizing visual credibility indicators and straightforward navigation patterns familiar to local users.

### Key Interaction Paradigms
- **Verification-first display**: Police clearance and rating badges prominently featured throughout provider interactions
- **Location-aware discovery**: GPS-enabled service matching with manual address input fallback
- **Simplified booking workflow**: WhatsApp-like communication patterns with structured service requests
- **Bilingual interface support**: Seamless switching between English, Sinhala, and Tamil
- **Trust-building elements**: Photo verification, review authenticity indicators, and transparent pricing

### Core Screens and Views
- **Home/Service Discovery**: Category-based browsing with location detection and featured providers
- **Provider Profile**: Comprehensive view with verification status, portfolio gallery, pricing, and customer reviews
- **Service Booking**: Step-by-step flow with date/time selection, service details, and price confirmation
- **Search Results**: Filtered provider listings with distance, rating, and availability sorting
- **Customer Dashboard**: Active bookings, service history, saved providers, and account settings
- **Provider Dashboard**: Booking management, earnings tracking, availability calendar, and profile editing
- **Payment Gateway**: Integrated checkout with PayHere/Stripe supporting local payment methods
- **Admin Console**: Provider verification workflow, dispute resolution, and platform analytics

### Accessibility: WCAG AA
Implement WCAG AA standards to ensure usability across diverse user capabilities, particularly important given varying digital literacy levels in target market. Focus on clear navigation, readable fonts, and screen reader compatibility.

### Branding
Professional yet approachable design language that builds consumer confidence. Incorporate subtle Sri Lankan design elements (color palette inspired by local preferences) while maintaining international marketplace standards. Strong emphasis on security and verification visual indicators to differentiate from informal service arrangements.

### Target Device and Platforms: Web Responsive
Mobile-first responsive design optimized for smartphones (primary user device), with progressive web app capabilities for app-like experience. Desktop version optimized for service provider management tasks and admin functions.

---

## Technical Assumptions

### Repository Structure: Monorepo
Single repository containing frontend, backend, and shared utilities to simplify development workflow, dependency management, and deployment processes for small team.

### Service Architecture
**Monolithic Architecture with Modular Design**: Start with Next.js full-stack application using API routes for backend logic, PostgreSQL for data persistence, and Redis for caching. This approach enables rapid development while maintaining clear separation of concerns and future microservices migration path as platform scales.

### Testing Requirements
**Unit + Integration Testing**: Implement comprehensive testing strategy with Jest for unit tests, Playwright for end-to-end user flows, and API integration testing for payment and external service workflows. Manual testing protocols for service provider verification processes.

### Additional Technical Assumptions and Requests

**Frontend Technology Stack:**
- **Next.js 15** with React 19 for SSR/SSG capabilities and optimal SEO
- **TypeScript** for type safety and developer productivity
- **Tailwind CSS** with shadcn/ui components for consistent design system
- **GSAP** for smooth animations and trust-building micro-interactions

**Backend & Infrastructure:**
- **Node.js/Next.js API routes** for unified development experience
- **PostgreSQL** for relational data (users, bookings, reviews, payments)
- **Redis** for session management and caching frequently accessed data
- **AWS S3/CloudFront** for document storage (police clearances, portfolio images)
- **Vercel/Railway** for hosting with auto-scaling capabilities

**Payment & External Services:**
- **PayHere** as primary payment gateway (Sri Lankan market leader)
- **Stripe** as secondary option for international cards
- **Twilio/local SMS** for OTP verification
- **Google Maps API** for location services and routing

**Security & Compliance:**
- **NextAuth.js** for authentication with multiple providers
- **bcrypt** for password hashing
- **Rate limiting** via middleware for API protection
- **File upload validation** for document verification
- **PCI DSS compliance** through payment gateway integration

---

## Epic List

**Epic 1: Foundation & Authentication Infrastructure**
Establish core project setup, user authentication, and basic service provider onboarding to create deployable foundation with initial verification workflow.

**Epic 2: Service Discovery & Provider Profiles**
Enable customers to discover, browse, and view detailed service provider profiles with verification status, ratings, and portfolio functionality.

**Epic 3: Booking & Payment System**
Implement end-to-end booking workflow with scheduling, payment processing, and escrow functionality to complete core marketplace transactions.

**Epic 4: Reviews & Platform Management**
Add bilateral review system, admin dashboard for verification management, and analytics to ensure platform quality and operational control.

---

## Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Establish core project infrastructure, user authentication system, and basic service provider onboarding workflow to create a deployable foundation that enables provider registration and initial verification processes while delivering a functional health check and landing page for market validation.

### Story 1.1: Project Setup & Infrastructure

As a **developer**,
I want **a fully configured Next.js project with essential dependencies and development environment**,
so that **I can begin building features with proper tooling, testing, and deployment pipeline in place**.

#### Acceptance Criteria
1. Next.js 15 project initialized with TypeScript configuration
2. Tailwind CSS and shadcn/ui components integrated and configured
3. PostgreSQL database connection established with Prisma ORM
4. Redis integration configured for session management
5. Jest and Playwright testing frameworks configured
6. ESLint, Prettier, and Husky pre-commit hooks active
7. Vercel deployment pipeline configured with staging/production environments
8. Basic CI/CD workflow running automated tests on PR/merge
9. Health check endpoint responding at /api/health with database connectivity status

### Story 1.2: Landing Page & Service Categories

As a **potential customer**,
I want **to view an attractive landing page that explains Weda.lk's value proposition and available service categories**,
so that **I can understand the platform's benefits and see what services are available in my area**.

#### Acceptance Criteria
1. Responsive landing page with hero section explaining police-verified service providers
2. Service category grid displaying 6 main categories (plumbing, electrical, carpentry, cleaning, pest control, AC repair)
3. Trust indicators section highlighting verification process and platform benefits
4. Location detection prompt for geographic service availability
5. Call-to-action buttons for customer signup and service provider registration
6. Footer with contact information and basic legal pages (privacy, terms)
7. Mobile-optimized layout with touch-friendly interactions
8. Page load time under 3 seconds on 3G connections

### Story 1.3: User Registration & Authentication

As a **user (customer or service provider)**,
I want **to create an account and securely authenticate**,
so that **I can access platform features appropriate to my role**.

#### Acceptance Criteria
1. Registration form with email, phone, password, and role selection (customer/provider)
2. Email and SMS OTP verification for account activation
3. NextAuth.js integration with email/password and Google OAuth providers
4. Password strength validation and secure hashing with bcrypt
5. Session management with Redis for scalable concurrent users
6. Role-based access control distinguishing customers from service providers
7. Profile completion prompts after initial registration
8. Account lockout protection after failed login attempts
9. Password reset functionality via email verification

### Story 1.4: Service Provider Document Upload

As a **service provider**,
I want **to upload my police clearance certificate and professional documents**,
so that **I can begin the verification process to join the platform**.

#### Acceptance Criteria
1. Secure file upload interface for PDF documents (police clearance, NIC, certifications)
2. File validation ensuring PDF format, size limits (10MB max), and virus scanning
3. AWS S3 integration for encrypted document storage with access controls
4. Document preview functionality for uploaded files
5. Upload progress indicators and error handling for failed uploads
6. Document categorization (police clearance, identity, professional certificates)
7. Automatic notification to admin team when documents uploaded
8. Provider dashboard showing document upload status and requirements
9. Data retention policies and secure document deletion capabilities

### Story 1.5: Basic Admin Dashboard

As an **administrator**,
I want **to access a dashboard showing pending verification requests and basic platform metrics**,
so that **I can manage service provider onboarding and monitor platform health**.

#### Acceptance Criteria
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

## Epic 2: Service Discovery & Provider Profiles

**Epic Goal:** Enable customers to discover, search, and view detailed service provider profiles with verification badges, ratings, and portfolio galleries, creating a comprehensive marketplace browsing experience that builds trust and facilitates informed provider selection.

### Story 2.1: Service Provider Profile Creation

As a **verified service provider**,
I want **to create a comprehensive profile with my services, pricing, and portfolio**,
so that **customers can find me and understand my capabilities and credentials**.

#### Acceptance Criteria
1. Profile creation form with business information, service categories, and service areas
2. Pricing structure setup with hourly rates and service-specific pricing
3. Portfolio image upload with categorization by service type
4. Business hours and availability calendar integration
5. Service description text editor with formatting capabilities
6. Contact preferences and communication method selection
7. Profile completeness indicator encouraging full profile completion
8. Public profile preview functionality before publishing
9. Profile status management (draft, pending, active, suspended)

### Story 2.2: Geographic Search & Discovery

As a **customer**,
I want **to search for service providers by location and service type**,
so that **I can find qualified professionals near me for my specific needs**.

#### Acceptance Criteria
1. Location-based search using GPS detection or manual address entry
2. Service category filtering with subcategory options
3. Distance-based sorting with kilometer/mile radius selection
4. Google Maps integration showing provider locations on interactive map
5. Search results list view with provider cards showing key information
6. Filter options for availability, rating, price range, and verification status
7. Search result pagination with infinite scroll option
8. Recent searches and favorites functionality for repeat customers
9. "No providers found" state with option to expand search radius

### Story 2.3: Provider Profile Display

As a **customer**,
I want **to view detailed service provider profiles with verification status and reviews**,
so that **I can make informed decisions about which provider to book**.

#### Acceptance Criteria
1. Comprehensive provider profile page with verification badges prominently displayed
2. Portfolio gallery with before/after photos and project descriptions
3. Customer review and rating display with review filtering and sorting
4. Service pricing transparency with clear rate structure
5. Provider availability calendar showing open time slots
6. Contact options with in-platform messaging and external communication
7. Professional certifications and qualifications display
8. Service area coverage map with travel fee information
9. Provider response time and typical booking lead time indicators

### Story 2.4: Search Filters & Sorting

As a **customer**,
I want **advanced filtering and sorting options for provider search results**,
so that **I can quickly find providers that match my specific requirements and preferences**.

#### Acceptance Criteria
1. Multi-criteria filtering interface with real-time result updates
2. Price range slider with minimum and maximum hourly rates
3. Rating threshold filter with star rating selection
4. Availability filter for immediate, same-day, or future booking slots
5. Verification status filter for police-cleared providers only
6. Experience level filter based on years in service and completed jobs
7. Sorting options by distance, rating, price, availability, and response time
8. Filter combination logic with clear active filter indicators
9. Filter reset and save filter preferences functionality

### Story 2.5: Provider Verification Badge System

As a **customer**,
I want **to clearly see which service providers have been police-verified and professionally certified**,
so that **I can trust the providers I'm considering booking**.

#### Acceptance Criteria
1. Visual verification badge system with distinct icons for different verification types
2. Police clearance verification badge with expiration date tracking
3. Professional certification badges for specialized skills and qualifications
4. Platform verification badge for identity and contact information confirmation
5. Badge tooltip explanations detailing what each verification represents
6. Verification status timeline showing when verifications were completed
7. Badge prominence in search results, profile headers, and booking interfaces
8. Unverified provider clear indication with explanation of verification process
9. Verification status API for consistent badge display across all platform interfaces

---

## Epic 3: Booking & Payment System

**Epic Goal:** Implement complete end-to-end booking workflow with scheduling, payment processing, and escrow functionality to enable revenue-generating transactions between customers and service providers while ensuring secure financial handling and clear booking management.

### Story 3.1: Service Booking Request System

As a **customer**,
I want **to create a service booking request with specific date, time, and service requirements**,
so that **I can schedule professional services that meet my needs**.

#### Acceptance Criteria
1. Booking request form with service selection, date/time picker, and detailed requirements
2. Address input with Google Maps integration for accurate service location
3. Estimated service duration and cost calculation based on provider rates
4. Special instructions field for additional service details or access information
5. Photo upload capability for customers to show service area or problems
6. Booking request summary with all details for customer confirmation
7. Provider notification system for new booking requests
8. Request status tracking (pending, accepted, declined, modified)
9. Booking modification requests with change tracking and approval workflow

### Story 3.2: Provider Booking Management

As a **service provider**,
I want **to receive, review, and respond to booking requests with scheduling flexibility**,
so that **I can manage my calendar and confirm services that fit my availability**.

#### Acceptance Criteria
1. Real-time booking request notifications via email and platform dashboard
2. Booking request detail view with customer information and service requirements
3. Provider response options (accept, decline, propose alternative time/price)
4. Calendar integration showing existing bookings and available time slots
5. Custom pricing adjustment capability for specific service requirements
6. Booking acceptance workflow with automatic customer notification
7. Provider notes section for internal booking management
8. Batch booking management for handling multiple requests efficiently
9. Booking conflict prevention with double-booking protection

### Story 3.3: Payment Gateway Integration

As a **customer**,
I want **to securely pay for services through the platform with multiple payment options**,
so that **I can complete transactions safely without handling cash or direct transfers**.

#### Acceptance Criteria
1. PayHere payment gateway integration as primary Sri Lankan payment processor
2. Stripe integration for international cards and alternative payment methods
3. Payment form with secure card input and validation
4. Payment amount breakdown showing service cost, platform fees, and total
5. Payment processing with real-time status updates and error handling
6. Payment confirmation with transaction ID and receipt generation
7. Multiple payment method support (cards, digital wallets, bank transfers)
8. Payment retry mechanism for failed transactions
9. PCI DSS compliance through gateway integration without storing card data

### Story 3.4: Escrow Payment System

As a **customer and service provider**,
I want **payment to be held in escrow until service completion and satisfaction**,
so that **both parties are protected and payment is only released when work is completed**.

#### Acceptance Criteria
1. Escrow account creation automatically upon booking confirmation
2. Payment hold mechanism preventing immediate provider payout
3. Service completion confirmation workflow requiring customer approval
4. Automatic payment release trigger after customer confirms service satisfaction
5. Dispute resolution process for payment holds when issues arise
6. Escrow balance tracking and transaction history for transparency
7. Platform fee deduction (23%) before provider payout
8. Payment release timeline with automatic release after 48 hours if no disputes
9. Refund processing capability for cancelled or unsatisfactory services

### Story 3.5: Booking Status & Communication

As a **customer and service provider**,
I want **to track booking status and communicate directly through the platform**,
so that **I can stay informed about service progress and coordinate details effectively**.

#### Acceptance Criteria
1. Booking status dashboard showing all active and completed bookings
2. Status updates for each booking phase (requested, confirmed, in-progress, completed)
3. In-platform messaging system between customers and providers
4. Automated status notifications via email and SMS for major booking events
5. Service completion workflow with photo documentation capability
6. Booking cancellation system with appropriate refund policies
7. Rescheduling requests with approval workflow and calendar updates
8. Emergency contact system for urgent booking-related communications
9. Booking history archive with search and filtering capabilities

---

## Epic 4: Reviews & Platform Management

**Epic Goal:** Implement bilateral review system, comprehensive admin dashboard for platform management, and analytics capabilities to ensure service quality, facilitate continuous improvement, and provide operational oversight for sustainable marketplace growth.

### Story 4.1: Customer Review System

As a **customer**,
I want **to rate and review service providers after service completion**,
so that **I can share my experience and help other customers make informed decisions**.

#### Acceptance Criteria
1. Review prompt automatically triggered 24 hours after service completion
2. Five-star rating system with required overall rating and optional category-specific ratings
3. Written review form with character limits and content moderation guidelines
4. Photo upload capability for before/after service documentation
5. Review editing window (48 hours) for customers to modify initial reviews
6. Review authenticity verification ensuring only actual customers can review
7. Review response capability for providers to address customer feedback
8. Review flagging system for inappropriate content with admin moderation
9. Review aggregation displaying average ratings and review count on provider profiles

### Story 4.2: Provider Review System

As a **service provider**,
I want **to rate and review customers after service completion**,
so that **I can provide feedback about customer interactions and help other providers**.

#### Acceptance Criteria
1. Provider review interface accessible after service completion confirmation
2. Customer rating system focusing on communication, payment promptness, and cooperation
3. Private review system visible only to service providers for internal reference
4. Professional feedback categories (punctual, clear instructions, respectful, payment issues)
5. Review impact on customer trustworthiness score for provider booking decisions
6. Review analytics helping providers understand customer interaction patterns
7. Constructive feedback guidelines encouraging professional communication
8. Review dispute mechanism for unfair or inaccurate provider reviews
9. Customer notification system for significant rating patterns requiring attention

### Story 4.3: Comprehensive Admin Dashboard

As an **administrator**,
I want **a comprehensive dashboard for managing all platform operations and user oversight**,
so that **I can maintain platform quality, resolve disputes, and monitor business performance**.

#### Acceptance Criteria
1. User management interface with customer and provider account controls
2. Verification workflow dashboard with document review and approval processes
3. Review moderation system with flagged content review and resolution
4. Dispute resolution interface for booking, payment, and service quality issues
5. Platform analytics showing user growth, transaction volume, and revenue metrics
6. Financial dashboard tracking escrow balances, payouts, and commission collection
7. Service quality monitoring with provider performance metrics and alerts
8. System health dashboard monitoring technical performance and uptime
9. Automated alert system for critical issues requiring immediate admin attention

### Story 4.4: Platform Analytics & Reporting

As an **administrator and business stakeholder**,
I want **detailed analytics and reporting on platform performance and user behavior**,
so that **I can make data-driven decisions for business growth and platform improvement**.

#### Acceptance Criteria
1. User acquisition tracking with registration sources and conversion funnels
2. Transaction analytics showing booking volume, success rates, and revenue trends
3. Provider performance metrics including response times, completion rates, and ratings
4. Customer satisfaction tracking with Net Promoter Score and retention analysis
5. Geographic performance reporting showing service demand by region
6. Financial reporting with revenue breakdowns, cost analysis, and profitability metrics
7. Service category analytics identifying popular services and growth opportunities
8. Platform usage statistics tracking feature adoption and user engagement
9. Automated weekly/monthly reports with key performance indicators and insights

### Story 4.5: Quality Assurance & Dispute Resolution

As an **administrator**,
I want **systematic quality assurance processes and dispute resolution workflows**,
so that **I can maintain high platform standards and resolve conflicts fairly**.

#### Acceptance Criteria
1. Provider performance monitoring with automatic alerts for declining ratings or completion rates
2. Customer complaint tracking system with categorization and resolution workflows
3. Dispute escalation process with clear timelines and communication protocols
4. Evidence collection interface for dispute resolution with photo and document support
5. Mediation tools facilitating communication between disputing parties
6. Provider suspension and reactivation workflows based on performance and compliance
7. Refund processing system with approval workflows and accounting integration
8. Quality improvement recommendations based on common issues and feedback patterns
9. Legal compliance monitoring ensuring platform operations meet regulatory requirements

---

## Checklist Results Report

### Executive Summary
- **Overall PRD Completeness:** 95%
- **MVP Scope Appropriateness:** Just Right - Well-balanced for market entry
- **Readiness for Architecture Phase:** Ready 
- **Most Critical Gaps:** Minor technical constraint details and testing strategy specifics

### Category Analysis Table

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PASS    | None - Clear market opportunity and user needs |
| 2. MVP Scope Definition          | PASS    | Well-defined boundaries and validation approach |
| 3. User Experience Requirements  | PASS    | Comprehensive mobile-first design goals |
| 4. Functional Requirements       | PASS    | All core marketplace features covered |
| 5. Non-Functional Requirements   | PARTIAL | Could expand on specific performance metrics |
| 6. Epic & Story Structure        | PASS    | Logical sequencing with clear value delivery |
| 7. Technical Guidance            | PARTIAL | Some integration details could be more specific |
| 8. Cross-Functional Requirements | PASS    | Data, integration, and operational needs covered |
| 9. Clarity & Communication       | PASS    | Well-structured and stakeholder-aligned |

### Final Decision

**✅ READY FOR ARCHITECT**: The PRD and epics are comprehensive, properly structured, and ready for architectural design. The requirements provide clear guidance for technical implementation while maintaining focus on MVP delivery and market differentiation through police verification.

---

## Next Steps

### UX Expert Prompt
"Design the user experience architecture for Weda.lk using the attached PRD. Focus on trust-building interfaces for the Sri Lankan market, mobile-first responsive design, and seamless provider discovery to booking workflows. Prioritize verification badge systems and bilingual accessibility."

### Architect Prompt
"Create the technical architecture for Weda.lk marketplace platform using the attached PRD. Design a scalable Next.js/PostgreSQL system supporting 10K+ users, payment gateway integrations (PayHere/Stripe), document verification workflows, and geographic search capabilities. Ensure security compliance and deployment readiness."