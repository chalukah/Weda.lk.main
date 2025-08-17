import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'
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

    // Get user ID from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user phone if provided
    if (phone) {
      await supabase.from('users').update({ phone }).eq('id', userData.id)
    }

    // Update or create service provider profile
    const { data: providerData, error: providerError } = await supabase
      .from('service_providers')
      .upsert({
        user_id: userData.id,
        business_name: businessName,
        description: description,
        services: services,
        service_areas: {
          districts: serviceAreas,
          experience: experience,
          certifications: certifications || '',
          languages: languages,
        },
        pricing: {},
        availability: {},
        rating: 0,
        completed_jobs: 0,
        response_time_minutes: 0,
        is_active: false, // Will be activated after admin approval
      })
      .select()
      .single()

    if (providerError) {
      console.error('Error creating/updating provider profile:', providerError)
      return NextResponse.json({ error: 'Failed to create provider profile' }, { status: 500 })
    }

    // Create notification for admin review
    await supabase
      .from('admin_notifications')
      .insert({
        type: 'NEW_PROVIDER_REGISTRATION',
        title: `New Provider Registration: ${businessName}`,
        message: `${businessName} has completed their registration and is ready for review.`,
        data: {
          providerId: userData.id,
          businessName: businessName,
          services: services,
          serviceAreas: serviceAreas,
        },
        is_read: false,
      })
      .select()

    return NextResponse.json({
      success: true,
      message: 'Provider onboarding completed successfully',
      providerId: userData.id,
    })
  } catch (error) {
    console.error('Error in provider onboarding API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
