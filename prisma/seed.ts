import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      phone: '+94771234567',
      passwordHash: 'hashed_password_here', // In real app, use bcrypt
      role: 'CUSTOMER',
      verificationStatus: 'VERIFIED',
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'User',
          language: 'en',
          address: {
            street: '123 Test Street',
            city: 'Colombo',
            province: 'Western',
            postalCode: '10100',
          },
        },
      },
    },
  })

  // Create test service provider
  const testProvider = await prisma.user.create({
    data: {
      email: 'provider@example.com',
      phone: '+94771234568',
      passwordHash: 'hashed_password_here', // In real app, use bcrypt
      role: 'PROVIDER',
      verificationStatus: 'VERIFIED',
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Electrician',
          language: 'en',
          address: {
            street: '456 Provider Street',
            city: 'Colombo',
            province: 'Western',
            postalCode: '10200',
          },
        },
      },
      serviceProvider: {
        create: {
          businessName: "John's Electrical Services",
          description: 'Professional electrical services with 10+ years experience',
          services: ['electrical-repair', 'electrical-installation'],
          serviceAreas: {
            provinces: ['Western', 'Central'],
            districts: ['Colombo', 'Gampaha', 'Kandy'],
          },
          pricing: {
            hourlyRate: 2500,
            callOutFee: 1000,
            minimumCharge: 2000,
          },
          availability: {
            monday: { start: '08:00', end: '18:00', available: true },
            tuesday: { start: '08:00', end: '18:00', available: true },
            wednesday: { start: '08:00', end: '18:00', available: true },
            thursday: { start: '08:00', end: '18:00', available: true },
            friday: { start: '08:00', end: '18:00', available: true },
            saturday: { start: '09:00', end: '15:00', available: true },
            sunday: { start: '10:00', end: '14:00', available: false },
          },
          rating: 4.8,
          completedJobs: 156,
          responseTimeMinutes: 45,
          isActive: true,
        },
      },
    },
  })

  console.log('Seed data created successfully')
  console.log('Test customer:', testUser)
  console.log('Test provider:', testProvider)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
