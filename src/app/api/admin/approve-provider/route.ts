import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin (you'll need to implement admin check logic)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { providerId, approved } = await request.json()

    // Update provider approval status
    await prisma.serviceProvider.update({
      where: { userId: providerId },
      data: { isActive: approved },
    })

    // Update user verification status
    await prisma.user.update({
      where: { id: providerId },
      data: {
        verificationStatus: approved ? 'VERIFIED' : 'REJECTED',
      },
    })

    return NextResponse.json({
      success: true,
      message: `Provider ${approved ? 'approved' : 'rejected'} successfully`,
    })
  } catch (error) {
    console.error('Error approving provider:', error)
    return NextResponse.json({ error: 'Failed to update provider status' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
