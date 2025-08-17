import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { connectionId, rating, comment, photos } = await request.json()

    // Get the reviewer user
    const reviewer = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!reviewer) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the service connection to find the reviewee
    const connection = await prisma.serviceConnection.findUnique({
      where: { id: connectionId },
      include: {
        provider: true,
      },
    })

    if (!connection) {
      return NextResponse.json({ error: 'Service connection not found' }, { status: 404 })
    }

    // Verify the reviewer is the customer in this connection
    if (connection.customerId !== reviewer.id) {
      return NextResponse.json({ error: 'Unauthorized to review this service' }, { status: 403 })
    }

    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        connectionId,
        reviewerId: reviewer.id,
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'Review already submitted for this service' },
        { status: 400 }
      )
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        connectionId,
        reviewerId: reviewer.id,
        revieweeId: connection.providerId,
        rating: parseInt(rating),
        comment,
        photos: photos || [],
        isVerified: true,
      },
    })

    // Update provider's average rating
    const reviews = await prisma.review.findMany({
      where: { revieweeId: connection.providerId },
    })

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await prisma.serviceProvider.update({
      where: { userId: connection.providerId },
      data: { rating: averageRating },
    })

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: review.id,
    })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
