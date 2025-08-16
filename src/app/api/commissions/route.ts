/// <reference types="node" />
import { NextRequest, NextResponse } from 'next/server'
// import { DirectPaymentService } from '@/lib/bank-transfer' // Unused import
import { EmailService } from '@/lib/email'

// GET: List all pending commissions for a provider
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const { searchParams } = url
    const providerId = searchParams.get('providerId')

    if (!providerId) {
      return NextResponse.json({ error: 'providerId is required' }, { status: 400 })
    }

    // In a real application, you'd query your database for pending commissions
    // For now, return mock data
    const mockCommissions = [
      {
        id: 'comm_1',
        bookingId: 'booking_123',
        serviceName: 'House Cleaning',
        customerName: 'John Doe',
        totalAmount: 5000,
        commissionDue: 750,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'pending',
        createdAt: new Date(),
      },
    ]

    return NextResponse.json({
      success: true,
      data: {
        pendingCommissions: mockCommissions,
        totalDue: mockCommissions.reduce((sum, comm) => sum + comm.commissionDue, 0),
      },
    })
  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json({ error: 'Failed to fetch commission data' }, { status: 500 })
  }
}

// POST: Record commission payment from provider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      providerId,
      bookingId,
      commissionAmount,
      paymentProofUrl,
      providerEmail,
      providerName,
    } = body

    if (!providerId || !bookingId || !commissionAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: providerId, bookingId, commissionAmount' },
        { status: 400 }
      )
    }

    // Generate commission payment record
    const commissionRecord = {
      id: `comm_payment_${Date.now()}`,
      providerId,
      bookingId,
      amount: commissionAmount,
      paymentProofUrl,
      status: 'verification_pending',
      submittedAt: new Date(),
      verificationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    }

    // Send confirmation email to provider
    if (providerEmail) {
      await EmailService.sendEmail({
        to: providerEmail,
        subject: 'Commission Payment Received - Weda.lk',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Commission Payment Received - Weda.lk</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #16a34a;">Commission Payment Received ✅</h1>
                
                <p>Hi ${providerName || 'Service Provider'},</p>
                
                <p>Thank you for submitting your commission payment!</p>
                
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #16a34a;">Payment Details</h3>
                  <p><strong>Booking ID:</strong> ${bookingId}</p>
                  <p><strong>Commission Amount:</strong> LKR ${commissionAmount.toFixed(2)}</p>
                  <p><strong>Status:</strong> Verification Pending</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="margin-top: 0;">⏱️ Next Steps</h4>
                  <ul>
                    <li>Our team will verify your payment within 24 hours</li>
                    <li>You'll receive confirmation once verified</li>
                    <li>Your account will be updated to reflect the payment</li>
                  </ul>
                </div>
                
                <p>Questions? Contact us at <a href="mailto:commissions@weda.lk">commissions@weda.lk</a></p>
                
                <p>Best regards,<br>The Weda.lk Team</p>
              </div>
            </body>
          </html>
        `,
      })
    }

    // Send notification to admin about new commission payment
    await EmailService.sendEmail({
      to: 'admin@weda.lk',
      subject: `New Commission Payment: LKR ${commissionAmount} - ${bookingId}`,
      html: `
        <h2>New Commission Payment Submitted</h2>
        <p><strong>Provider:</strong> ${providerName} (${providerEmail})</p>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Amount:</strong> LKR ${commissionAmount.toFixed(2)}</p>
        <p><strong>Payment Proof:</strong> <a href="${paymentProofUrl}">View Receipt</a></p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        
        <p>Please verify this payment in the admin dashboard.</p>
      `,
    })

    return NextResponse.json({
      success: true,
      data: {
        commissionRecord,
        message: 'Commission payment submitted successfully',
        estimatedVerificationTime: '24 hours',
      },
    })
  } catch (error) {
    console.error('Commission payment submission error:', error)
    return NextResponse.json({ error: 'Failed to submit commission payment' }, { status: 500 })
  }
}
