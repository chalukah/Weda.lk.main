/// <reference types="node" />
import { NextRequest, NextResponse } from 'next/server'
import { CloudinaryService } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'weda-lk'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await CloudinaryService.uploadImage(buffer, folder, file.name.split('.')[0])

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const { searchParams } = url
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json({ error: 'No public ID provided' }, { status: 400 })
    }

    await CloudinaryService.deleteImage(publicId)

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
