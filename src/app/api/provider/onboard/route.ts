import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.json()
    const {
      firstName,
      lastName,
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

    // Check if user exists in auth.users, if not create one
    let user
    const { data: users } = await supabase.auth.admin.listUsers()
    const existingUser = users?.users?.find((u) => u.email === userEmail)

    if (existingUser) {
      user = existingUser
    } else {
      // Create user in Supabase auth if they don't exist
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: userEmail,
        email_confirm: true,
        user_metadata: {
          name: `${firstName} ${lastName}`,
          role: 'provider',
        },
      })

      if (createError) {
        console.error('Error creating user:', createError)
        return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 })
      }

      user = newUser.user
    }

    // Update user profile in public.users table
    const { error: userError } = await supabase.from('users').upsert({
      id: user.id,
      email: userEmail,
      name: `${firstName} ${lastName}`,
      phone: phone,
      role: 'provider',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (userError) {
      console.error('Error updating user profile:', userError)
    }

    // Create provider application record
    const { data: application, error: appError } = await supabase
      .from('provider_applications')
      .insert({
        user_id: user.id,
        user_email: userEmail,
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        description: description,
        phone: phone,
        services: services,
        service_areas: serviceAreas,
        experience: experience,
        certifications: certifications || '',
        languages: languages,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (appError) {
      console.error('Error creating provider application:', appError)
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    // Create or update service provider profile
    const { error: providerError } = await supabase.from('service_providers').upsert({
      user_id: user.id,
      business_name: businessName,
      description: description,
      services: services,
      service_areas: serviceAreas,
      experience: experience,
      certifications: certifications || '',
      languages: languages,
      phone: phone,
      rating: 0,
      completed_jobs: 0,
      is_active: false, // Will be activated after admin approval
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (providerError) {
      console.error('Error creating service provider:', providerError)
    }

    console.log('Provider application saved to Supabase:', application)

    return NextResponse.json({
      success: true,
      message: 'Provider application submitted successfully',
      applicationId: application.id,
      providerId: user.id,
    })
  } catch (error) {
    console.error('Error in provider onboarding API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
