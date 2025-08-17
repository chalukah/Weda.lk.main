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

    const { email, role } = await request.json()

    // Validate role
    if (!['CUSTOMER', 'PROVIDER', 'BOTH'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Update user role in Supabase
    const { data, error } = await supabase
      .from('users')
      .update({
        role: role,
        needs_role_selection: false,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .select()
      .single()

    if (error) {
      console.error('Error updating user role:', error)
      return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
    }

    // If user selected PROVIDER or BOTH, create provider profile
    if (role === 'PROVIDER' || role === 'BOTH') {
      const { error: providerError } = await supabase.from('service_providers').upsert({
        user_id: data.id,
        business_name: '',
        description: '',
        services: [],
        service_areas: {},
        pricing: {},
        availability: {},
        is_active: false, // Will be activated after verification
      })

      if (providerError) {
        console.error('Error creating provider profile:', providerError)
        // Don't fail the request if provider profile creation fails
      }
    }

    return NextResponse.json({
      success: true,
      user: data,
      message: 'Role updated successfully',
    })
  } catch (error) {
    console.error('Error in update-role API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
