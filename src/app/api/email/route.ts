import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, to, data } = body

    if (!type || !to) {
      return NextResponse.json({ error: 'Missing required fields: type, to' }, { status: 400 })
    }

    let result

    switch (type) {
      case 'welcome':
        result = await EmailService.sendWelcomeEmail(to, data)
        break

      case 'booking-confirmation':
        result = await EmailService.sendBookingConfirmation(to, data)
        break

      case 'password-reset':
        result = await EmailService.sendPasswordReset(to, data)
        break

      case 'provider-verification':
        result = await EmailService.sendProviderVerification(to, data.providerName)
        break

      case 'custom':
        result = await EmailService.sendEmail({
          to,
          subject: data.subject,
          html: data.html,
          text: data.text,
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
