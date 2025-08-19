import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('email', session.user.email)
      .single()

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const url = new URL(request.url)
    const status = url.searchParams.get('status') || 'PENDING'

    // Get pending verification documents with provider info
    const { data: documents, error } = await supabase
      .from('verification_documents')
      .select(
        `
        id,
        provider_id,
        document_type,
        file_url,
        status,
        created_at,
        expiry_date,
        service_providers!inner (
          business_name,
          phone,
          user_id,
          users!inner (
            email
          )
        )
      `
      )
      .eq('status', status.toUpperCase())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      documents,
      count: documents.length,
    })
  } catch (error) {
    console.error('Error in verify documents API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: user } = await supabase
      .from('users')
      .select('role, id')
      .eq('email', session.user.email)
      .single()

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { documentId, action, notes } = await request.json()

    if (!documentId || !action || !['VERIFIED', 'REJECTED'].includes(action)) {
      return NextResponse.json(
        {
          error: 'Document ID and valid action (VERIFIED/REJECTED) are required',
        },
        { status: 400 }
      )
    }

    // Update document verification status
    const { data: updatedDoc, error: updateError } = await supabase
      .from('verification_documents')
      .update({
        status: action,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq('id', documentId)
      .select(
        `
        id,
        provider_id,
        document_type,
        status,
        service_providers!inner (
          business_name,
          users!inner (
            email
          )
        )
      `
      )
      .single()

    if (updateError) {
      console.error('Error updating document:', updateError)
      return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
    }

    // Check if all required documents are verified for this provider
    const { data: allDocs } = await supabase
      .from('verification_documents')
      .select('document_type, status')
      .eq('provider_id', updatedDoc.provider_id)

    const hasVerifiedNationalId = allDocs?.some(
      (doc) => doc.document_type === 'NATIONAL_ID' && doc.status === 'VERIFIED'
    )
    const hasVerifiedPolice = allDocs?.some(
      (doc) => doc.document_type === 'POLICE_CLEARANCE' && doc.status === 'VERIFIED'
    )

    // If all required documents are verified, activate the provider
    if (hasVerifiedNationalId && (hasVerifiedPolice || action === 'VERIFIED')) {
      await supabase
        .from('service_providers')
        .update({
          is_verified: true,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', updatedDoc.provider_id)

      // Update provider application status
      await supabase
        .from('provider_applications')
        .update({
          status: 'approved',
          admin_notes: notes || 'Documents verified and approved',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', updatedDoc.provider_id)
    }

    return NextResponse.json({
      success: true,
      message: `Document ${action.toLowerCase()} successfully`,
      document: updatedDoc,
      providerActivated: hasVerifiedNationalId && (hasVerifiedPolice || action === 'VERIFIED'),
    })
  } catch (error) {
    console.error('Error in document verification API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
