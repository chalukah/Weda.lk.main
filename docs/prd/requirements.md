# Requirements

## Functional Requirements

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

## Non-Functional Requirements

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
