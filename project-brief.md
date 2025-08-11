# Weda.lk Project Brief

## Section 1: Executive Summary

**Project Name:** Weda.lk - Sri Lankan Home Services Marketplace

**Vision:** To become Sri Lanka's leading trusted platform connecting homeowners with verified service providers for all home maintenance and repair needs.

**Mission:** Democratize access to quality home services across Sri Lanka by creating a transparent, reliable, and efficient marketplace that benefits both service seekers and providers.

**Core Value Proposition:** 
- For Customers: Instant access to police-verified, skilled service providers with transparent pricing and guaranteed quality
- For Service Providers: Direct access to customers, fair commission structure, and business growth opportunities

**Key Success Metrics:**
- Monthly Active Users: 10,000+ (Year 1)
- Service Provider Network: 1,000+ verified professionals
- Monthly Revenue: LKR 95,680+ 
- Customer Satisfaction: 4.5+ stars average rating
- Geographic Coverage: Western, Central, and Southern provinces

---

## Section 2: Market Analysis & Business Case

### 2.1 Market Opportunity

**Market Timing - Strategic Window:**
- QuickHelp.lk suspension has created an immediate market vacuum
- 6-12 month window before competitive response
- Growing digital adoption post-COVID in Sri Lanka
- Rising middle-class demand for professional home services

**Market Size & Potential:**
- Target Market: 2.1 million households in Western Province alone
- Service Categories: Plumbing, electrical, carpentry, cleaning, pest control, AC repair
- Average Service Frequency: 3-4 services per household annually
- Average Transaction Value: LKR 3,500-15,000

### 2.2 Competitive Analysis

**Current Market Landscape:**
1. **PickMe Services** - Limited to Colombo, basic vetting
2. **Urban Company** - International player, premium pricing
3. **Local Facebook Groups** - Unorganized, no quality assurance
4. **Traditional Word-of-mouth** - Unreliable, limited reach

**Competitive Advantages:**
- **Police Clearance Verification**: Only platform requiring criminal background checks
- **Nationwide Coverage Strategy**: Systematic expansion beyond Colombo
- **Fair Commission Structure**: 23% total (18% provider + 5% customer)
- **Local Market Understanding**: Sri Lankan-specific needs and preferences
- **First-mover Advantage**: QuickHelp.lk suspension creates immediate opportunity

### 2.3 Revenue Model & Financial Projections

**Commission Structure:**
- Service Provider Commission: 18% of transaction value
- Customer Service Fee: 5% of transaction value
- Total Platform Commission: 23%

**Conservative Monthly Projections (Year 1):**
- Average Transactions: 150 per month
- Average Transaction Value: LKR 4,500
- Monthly GMV: LKR 675,000
- Platform Revenue (23%): LKR 155,250
- Net Revenue (after payment processing): LKR 95,680+

**Growth Trajectory:**
- Month 1-6: Western Province focus (Colombo, Gampaha, Kalutara)
- Month 7-12: Central Province expansion (Kandy, Matale)
- Month 13-18: Southern Province expansion (Galle, Matara)

### 2.4 Geographic Expansion Strategy

**Phase 1 - Western Province (Months 1-6):**
- Primary: Colombo, Mount Lavinia, Nugegoda
- Secondary: Gampaha, Kalutara
- Target: 60% of total user base

**Phase 2 - Central Province (Months 7-12):**
- Primary: Kandy city
- Secondary: Matale, Nuwara Eliya
- Target: 25% of total user base

**Phase 3 - Southern Province (Months 13-18):**
- Primary: Galle, Matara
- Secondary: Hambantota
- Target: 15% of total user base

---

## Section 3: Technical Architecture & Requirements

### 3.1 Platform Architecture

**Frontend Technologies:**
- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS with shadcn/ui components
- GSAP for animations
- Responsive design for mobile-first approach

**Backend Requirements:**
- Node.js/Express API or Next.js API routes
- PostgreSQL for user data and transactions
- Redis for caching and session management
- File storage for documents and images
- Payment gateway integration (PayHere, Stripe)

**Core Features:**
1. **User Management**: Registration, authentication, profile management
2. **Service Provider Verification**: Police clearance upload and verification
3. **Booking System**: Real-time availability, scheduling, confirmation
4. **Payment Processing**: Secure transactions, escrow system
5. **Rating & Reviews**: Bilateral feedback system
6. **Geographic Search**: Location-based service provider discovery
7. **Admin Dashboard**: User management, verification workflow, analytics

### 3.2 Mobile Strategy

**Progressive Web App (PWA):**
- Native app experience through browser
- Offline capability for basic features
- Push notifications for bookings and updates
- App-like installation on mobile devices

**Future Native Apps:**
- iOS and Android apps for enhanced user experience
- Deep integration with device features (camera, location, contacts)
- App store visibility and marketing opportunities

---

## Section 4: Business Model & Operations

### 4.1 Service Provider Onboarding

**Verification Process:**
1. **Application Submission**: Basic information, service categories, experience
2. **Document Verification**: NIC, business registration, certifications
3. **Police Clearance**: Criminal background check requirement
4. **Skill Assessment**: Category-specific competency evaluation
5. **Profile Creation**: Photos, portfolio, pricing, availability

**Ongoing Quality Assurance:**
- Customer rating requirements (minimum 4.0 stars)
- Regular performance reviews
- Continuous training opportunities
- Feedback-based improvements

### 4.2 Customer Experience Flow

**Service Request Process:**
1. **Need Identification**: Browse categories or describe requirements
2. **Provider Discovery**: Location-based matching with verified professionals
3. **Booking Confirmation**: Schedule selection, price agreement
4. **Service Delivery**: Real-time tracking, direct communication
5. **Payment & Feedback**: Secure payment, mutual rating system

**Quality Guarantees:**
- Service satisfaction guarantee
- Rework policy for unsatisfactory service
- Dispute resolution mechanism
- Insurance coverage for major issues

---

## Section 5: Marketing & Customer Acquisition

### 5.1 Launch Strategy

**Pre-Launch (Month 1):**
- Service provider recruitment in Colombo
- Beta testing with 50 selected customers
- Social media presence establishment
- Influencer partnerships initiation

**Launch Phase (Months 2-3):**
- Promotional pricing (reduced commissions)
- Digital marketing campaigns (Facebook, Google Ads)
- PR campaign highlighting police verification USP
- Referral program launch

### 5.2 Customer Acquisition Channels

**Digital Marketing:**
- Search Engine Marketing (Google Ads) - 40% of budget
- Social Media Marketing (Facebook, Instagram) - 35% of budget
- Content Marketing (blog, tutorials) - 15% of budget
- Influencer partnerships - 10% of budget

**Traditional Marketing:**
- Radio advertisements during peak hours
- Newspaper classifieds in target areas
- Community event sponsorships
- Word-of-mouth referral programs

### 5.3 Customer Retention Strategy

**Loyalty Programs:**
- Repeat customer discounts
- Service package deals
- Seasonal maintenance reminders
- Priority booking for regular customers

**Community Building:**
- Customer success stories
- Home maintenance tips and content
- Seasonal service promotions
- Customer feedback integration

---

## Section 6: Risk Assessment & Mitigation

### 6.1 Technical Risks

**Risk: Platform Downtime**
- Impact: High - Loss of bookings and revenue
- Mitigation: Robust hosting, monitoring, backup systems

**Risk: Payment Processing Issues**
- Impact: High - Transaction failures, trust loss
- Mitigation: Multiple payment gateway integration, thorough testing

**Risk: Data Security Breach**
- Impact: Critical - Legal liability, reputation damage
- Mitigation: Encryption, security audits, compliance standards

### 6.2 Business Risks

**Risk: Service Provider Quality Issues**
- Impact: High - Customer dissatisfaction, reputation damage
- Mitigation: Rigorous verification process, continuous monitoring, feedback systems

**Risk: Competitive Response**
- Impact: Medium - Market share loss
- Mitigation: Strong differentiation, customer loyalty programs, continuous innovation

**Risk: Economic Downturn**
- Impact: Medium - Reduced spending on non-essential services
- Mitigation: Essential service focus, flexible pricing, payment plans

### 6.3 Regulatory Risks

**Risk: Labor Law Compliance**
- Impact: Medium - Legal complications with contractor classification
- Mitigation: Clear contractor agreements, legal consultation, proper documentation

**Risk: Consumer Protection Requirements**
- Impact: Low - Additional compliance requirements
- Mitigation: Transparent terms, dispute resolution, consumer-friendly policies

---

## Section 7: Financial Projections & Funding Requirements

### 7.1 Year 1 Financial Projections

**Revenue Projections:**
- Q1: LKR 250,000 (launch phase)
- Q2: LKR 650,000 (growth acceleration)
- Q3: LKR 1,200,000 (market expansion)
- Q4: LKR 1,800,000 (full operations)
- **Total Year 1 Revenue: LKR 3,900,000**

**Cost Structure:**
- Technology Development: LKR 1,500,000
- Marketing & Customer Acquisition: LKR 1,200,000
- Operations & Staff: LKR 800,000
- Legal & Regulatory: LKR 200,000
- Miscellaneous: LKR 200,000
- **Total Year 1 Costs: LKR 3,900,000**

### 7.2 Funding Requirements

**Initial Funding Need: LKR 2,500,000**

**Use of Funds:**
- Platform Development (40%): LKR 1,000,000
- Marketing & Launch (35%): LKR 875,000
- Working Capital (15%): LKR 375,000
- Legal & Setup (10%): LKR 250,000

**Funding Sources:**
- Personal Investment: LKR 500,000 (20%)
- Angel Investors: LKR 1,500,000 (60%)
- Government Grants: LKR 500,000 (20%)

---

## Section 8: Implementation Timeline & Milestones

### 8.1 Development Timeline

**Months 1-2: Foundation**
- Technical architecture finalization
- Core platform development
- Service provider recruitment initiation
- Brand identity and marketing materials

**Months 3-4: Beta Phase**
- Beta platform launch
- 50 service providers onboarded
- 100 beta customers
- Feedback integration and improvements

**Months 5-6: Public Launch**
- Full platform launch in Colombo
- Marketing campaign activation
- Customer acquisition scaling
- Performance optimization

### 8.2 Key Milestones

**Month 3:** Beta platform operational
**Month 6:** 500 registered service providers
**Month 9:** Break-even achieved
**Month 12:** 10,000+ registered customers
**Month 18:** Multi-province operations established

### 8.3 Success Metrics & KPIs

**User Acquisition:**
- Monthly new customer registrations
- Service provider acquisition rate
- Customer lifetime value
- Market penetration rates by geographic area

**Operational Excellence:**
- Average response time to service requests
- Service completion rate
- Customer satisfaction scores
- Service provider retention rate

**Financial Performance:**
- Monthly recurring revenue
- Average transaction value
- Commission revenue growth
- Cost per acquisition

---

## Section 9: Long-term Vision & Expansion

### 9.1 5-Year Vision

**Market Leadership:** Become the #1 trusted home services platform in Sri Lanka with 50,000+ active customers and 5,000+ verified service providers.

**Service Expansion:** Beyond home services into business services, automotive services, and specialized professional services.

**Technology Evolution:** AI-powered matching, predictive maintenance recommendations, IoT integration for smart homes.

### 9.2 Potential Expansion Opportunities

**Horizontal Expansion:**
- Business services (office maintenance, commercial cleaning)
- Automotive services (mobile mechanics, car detailing)
- Event services (catering, decorations, photography)
- Health and wellness services (home physiotherapy, beauty services)

**Vertical Integration:**
- Training academy for service providers
- Equipment and tools marketplace
- Insurance products for services
- Maintenance subscription services

### 9.3 Exit Strategy Options

**Strategic Acquisition:** Potential acquisition by regional e-commerce platforms or international home services companies seeking Sri Lankan market entry.

**IPO Opportunity:** Long-term public listing potential as digital economy grows in Sri Lanka.

**Franchise Model:** Licensing platform technology to other South Asian markets.

---

## Conclusion

Weda.lk represents a significant opportunity to transform Sri Lanka's home services market by leveraging the current competitive vacuum and strong differentiation through police verification requirements. With a clear path to profitability, strong technical foundation, and comprehensive go-to-market strategy, the platform is positioned to capture substantial market share while building a sustainable, profitable business.

The combination of immediate market opportunity, strong competitive advantages, and scalable business model creates compelling investment thesis for potential stakeholders and clear roadmap for successful execution.

---

**Document Status:** Complete
**Version:** 1.0
**Date:** August 11, 2025
**Next Review:** September 11, 2025