/// <reference types="node" />
import { NextRequest, NextResponse } from 'next/server'
import { DirectPaymentService } from '@/lib/bank-transfer'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, bookingId, proofImageUrl, customerEmail, customerName, serviceName } = body

    if (!paymentId || !bookingId || !proofImageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentId, bookingId, or proofImageUrl' },
        { status: 400 }
      )
    }

    // Validate the payment proof (this would be manual verification in real scenario)
    const verification = DirectPaymentService.validatePaymentProof({
      paymentId,
      bookingId,
      proofImageUrl,
    })

    // Send confirmation email to customer about proof submission
    if (customerEmail) {
      await EmailService.sendEmail({
        to: customerEmail,
        subject: 'Payment Proof Received - Weda.lk',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Payment Proof Received - Weda.lk</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb;">Payment Proof Received ✅</h1>
                
                <p>Hi ${customerName || 'Valued Customer'},</p>
                
                <p>We have received your payment proof for <strong>${serviceName}</strong>.</p>
                
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #16a34a;">What happens next?</h3>
                  <ul>
                    <li>Our team will verify your payment within 24 hours</li>
                    <li>You'll receive confirmation once payment is verified</li>
                    <li>Your service provider will be notified to start the service</li>
                    <li>You can track your booking status in your account</li>
                  </ul>
                </div>
                
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                
                <p>If you have any questions, please contact our support team at payments@weda.lk</p>
                
                <p>Best regards,<br>The Weda.lk Team</p>
              </div>
            </body>
          </html>
        `,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentId,
        status: 'proof_submitted',
        message: 'Payment proof received and queued for verification',
        estimatedVerificationTime: '24 hours',
        verification,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Failed to process payment verification' }, { status: 500 })
  }
}

// GET endpoint to check payment status
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const { searchParams } = url
    const paymentId = searchParams.get('paymentId')
    const bookingId = searchParams.get('bookingId')

    if (!paymentId && !bookingId) {
      return NextResponse.json({ error: 'paymentId or bookingId is required' }, { status: 400 })
    }

    // In a real application, you'd query your database here
    // For now, return a mock status
    return NextResponse.json({
      success: true,
      data: {
        paymentId,
        bookingId,
        status: 'awaiting_transfer',
        message: 'Awaiting bank transfer from customer',
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Payment status check error:', error)
    return NextResponse.json({ error: 'Failed to check payment status' }, { status: 500 })
  }
}
