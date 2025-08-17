import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'
import bcrypt from 'bcryptjs'

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
    const { data: existingUser, error: checkError } = await supabaseServer
      .from('users')
      .select('id, email, phone')
      .or(`email.eq.${email},phone.eq.${cleanPhone}`)
      .limit(1)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const { data: user, error: userError } = await supabaseServer
      .from('users')
      .insert({
        email,
        phone: cleanPhone,
        password_hash: hashedPassword,
        role: userType === 'provider' ? 'PROVIDER' : 'CUSTOMER',
      })
      .select('id, email, phone, role, verification_status, created_at')
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Create user profile
    const { data: profile, error: profileError } = await supabaseServer
      .from('user_profiles')
      .insert({
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
      })
      .select('first_name, last_name')
      .single()

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Clean up user if profile creation fails
      await supabaseServer.from('users').delete().eq('id', user.id)
      return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          ...user,
          profile,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
