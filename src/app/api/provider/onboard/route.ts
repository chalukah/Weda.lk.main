import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.json()
    const {
      businessName,
      description,
      phone,
      services,
      serviceAreas,
      experience,
      certifications,
      languages,
      userEmail,
    } = formData

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user phone if provided
    if (phone) {
      await prisma.user.update({
        where: { id: user.id },
        data: { phone },
      })
    }

    // Create or update user profile
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
      },
      update: {},
    })

    // Create or update service provider profile
    const serviceProvider = await prisma.serviceProvider.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        businessName,
        description,
        services,
        serviceAreas: {
          districts: serviceAreas,
          experience: experience,
          certifications: certifications || '',
          languages: languages,
        },
        pricing: {},
        availability: {},
        rating: 0,
        completedJobs: 0,
        responseTimeMinutes: 0,
        isActive: false, // Will be activated after admin approval
        contactInfo: phone ? { phone } : {},
      },
      update: {
        businessName,
        description,
        services,
        serviceAreas: {
          districts: serviceAreas,
          experience: experience,
          certifications: certifications || '',
          languages: languages,
        },
        contactInfo: phone ? { phone } : {},
      },
    })

    // Update user role to PROVIDER
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'PROVIDER' },
    })

    return NextResponse.json({
      success: true,
      message: 'Provider onboarding completed successfully',
      providerId: user.id,
    })
  } catch (error) {
    console.error('Error in provider onboarding API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
