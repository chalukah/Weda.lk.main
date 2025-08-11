# Technical Assumptions

## Repository Structure: Monorepo

Single repository containing frontend, backend, and shared utilities to simplify development workflow, dependency management, and deployment processes for small team.

## Service Architecture

**Monolithic Architecture with Modular Design**: Start with Next.js full-stack application using API routes for backend logic, PostgreSQL for data persistence, and Redis for caching. This approach enables rapid development while maintaining clear separation of concerns and future microservices migration path as platform scales.

## Testing Requirements

**Unit + Integration Testing**: Implement comprehensive testing strategy with Jest for unit tests, Playwright for end-to-end user flows, and API integration testing for payment and external service workflows. Manual testing protocols for service provider verification processes.

## Additional Technical Assumptions and Requests

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
