import { NextRequest, NextResponse } from 'next/server'
import { CloudinaryService } from '@/lib/cloudinary'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('documentType') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (
      !documentType ||
      ![
        'NATIONAL_ID',
        'POLICE_CLEARANCE',
        'PASSPORT',
        'BUSINESS_REGISTRATION',
        'PROFESSIONAL_CERTIFICATE',
        'INSURANCE',
      ].includes(documentType)
    ) {
      return NextResponse.json({ error: 'Valid document type is required' }, { status: 400 })
    }

    // Validate file type (images and PDFs only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Only JPEG, PNG, and PDF files are allowed',
        },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: 'File size must be less than 10MB',
        },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary in provider-documents folder
    const folder = `weda-lk/provider-documents/${documentType.toLowerCase()}`
    const filename = `${session.user.id}_${documentType}_${Date.now()}`

    const result = await CloudinaryService.uploadImage(buffer, folder, filename)

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        fileUrl: result.secure_url,
        publicId: result.public_id,
        documentType: documentType,
        filename: file.name,
        uploadedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// Get uploaded documents for a provider
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const providerId = url.searchParams.get('providerId') || session.user.id

    // Only allow users to see their own documents unless admin
    if (providerId !== session.user.id) {
      // Check if user is admin - implement admin check here if needed
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // This would typically fetch from your database
    // For now, return placeholder response
    return NextResponse.json({
      success: true,
      message: 'Use the main verification documents API for retrieving stored documents',
      providerId,
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
