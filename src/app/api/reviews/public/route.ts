import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch verified reviews with high ratings for testimonials
    const reviews = await prisma.review.findMany({
      where: {
        rating: {
          gte: 4 // Only show 4+ star reviews
        },
        isVerified: true,
        comment: {
          not: null // Only reviews with comments
        }
      },
      include: {
        reviewer: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true
              }
            }
          }
        },
        reviewee: {
          include: {
            serviceProvider: {
              select: {
                businessName: true,
                services: true
              }
            }
          }
        },
        connection: {
          select: {
            serviceDetails: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    // Transform the data for frontend consumption
    const transformedReviews = reviews.map(review => {
      const reviewer = review.reviewer
      const reviewerProfile = reviewer.profile
      const serviceProvider = review.reviewee.serviceProvider
      const serviceDetails = review.connection.serviceDetails as any

      return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewer: {
          name: reviewerProfile 
            ? `${reviewerProfile.firstName} ${reviewerProfile.lastName}`
            : 'Anonymous Customer',
          avatar: reviewerProfile?.avatarUrl || null,
          initials: reviewerProfile 
            ? `${reviewerProfile.firstName[0]}${reviewerProfile.lastName[0]}`
            : 'AC'
        },
        service: {
          name: serviceProvider?.businessName || 'Service Provider',
          type: serviceDetails?.serviceType || 'General Service'
        }
      }
    })

    return NextResponse.json({
      reviews: transformedReviews,
      total: reviews.length
    })
  } catch (error) {
    console.error('Error fetching public reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}