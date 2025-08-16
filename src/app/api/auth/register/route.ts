import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, password, userType } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !userType) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate phone format (Sri Lankan)
    const phoneRegex = /^(\+94)?[0-9]{9}$/
    const cleanPhone = phone.replace(/\s+/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone: cleanPhone }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email,
        phone: cleanPhone,
        passwordHash: hashedPassword,
        role: userType === 'provider' ? UserRole.PROVIDER : UserRole.CUSTOMER,
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
      include: {
        profile: true,
      },
    })

    // Return user without password
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
