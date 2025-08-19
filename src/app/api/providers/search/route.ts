import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')
    const location = searchParams.get('location')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const whereClause: any = {
      isActive: true,
      user: {
        verificationStatus: 'VERIFIED',
      },
    }

    // Filter by service if provided
    if (service) {
      whereClause.services = {
        has: service.toLowerCase().replace('-', ' '),
      }
    }

    // Get providers with their user profiles and reviews
    const providers = await prisma.serviceProvider.findMany({
      where: whereClause,
      include: {
        user: {
          include: {
            profile: true,
            reviewsReceived: {
              select: {
                rating: true,
                comment: true,
                createdAt: true,
                reviewer: {
                  select: {
                    profile: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 5,
            },
          },
        },
      },
      orderBy: [{ rating: 'desc' }, { completedJobs: 'desc' }],
      take: limit,
      skip: offset,
    })

    // Transform the data to match the frontend expectations
    const transformedProviders = providers.map((provider) => {
      const user = provider.user
      const profile = user.profile
      const reviews = user.reviewsReceived

      // Calculate average rating
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

      // Get pricing info (assuming it's stored in JSON format)
      const pricing = provider.pricing as any
      const priceDisplay = pricing?.hourlyRate
        ? `LKR ${pricing.hourlyRate}/hour`
        : 'Contact for pricing'

      // Get contact info
      const contactInfo = provider.contactInfo as any

      return {
        id: provider.userId,
        name: provider.businessName,
        rating: Number(avgRating.toFixed(1)),
        reviews: reviews.length,
        distance: '-- km', // TODO: Calculate based on location
        price: priceDisplay,
        phone: contactInfo?.phone || user.phone,
        availability: provider.isActive ? 'Available' : 'Not available',
        services: provider.services,
        description: provider.description,
        completedJobs: provider.completedJobs,
        responseTime: provider.responseTimeMinutes,
        verified: user.verificationStatus === 'VERIFIED',
        profileImage: profile?.avatarUrl || null,
        providerProfile: {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          businessName: provider.businessName,
          description: provider.description,
          serviceAreas: provider.serviceAreas,
        },
      }
    })

    // Get total count for pagination
    const totalCount = await prisma.serviceProvider.count({
      where: whereClause,
    })

    return NextResponse.json({
      providers: transformedProviders,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
