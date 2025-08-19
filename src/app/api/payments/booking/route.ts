import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

// This endpoint is now for creating service connections (no payment processing)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      connectionId,
      customerId,
      providerId,
      serviceName,
      estimatedPrice,
      customerEmail,
      customerName,
      providerEmail,
      providerName,
      serviceDetails,
    } = body

    if (
      !connectionId ||
      !customerId ||
      !providerId ||
      !serviceName ||
      !customerEmail ||
      !providerEmail
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: connectionId, customerId, providerId, serviceName, customerEmail, providerEmail',
        },
        { status: 400 }
      )
    }

    // Check if both users have active subscriptions
    // In a real app, you'd query the database
    // For now, assume they have active subscriptions

    // Send connection notification to customer
    await EmailService.sendEmail({
      to: customerEmail,
      subject: `Service Connection Confirmed - ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Service Connection Confirmed - Weda.lk</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #16a34a;">Service Connection Confirmed! ✅</h1>
              
              <p>Hi ${customerName || 'Valued Customer'},</p>
              
              <p>Great news! You've been connected with <strong>${providerName}</strong> for <strong>${serviceName}</strong>.</p>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #16a34a;">📞 Provider Contact Information</h3>
                <p><strong>Service Provider:</strong> ${providerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${providerEmail}">${providerEmail}</a></p>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Estimated Price:</strong> ${estimatedPrice ? `LKR ${estimatedPrice}` : 'To be discussed'}</p>
              </div>
              
              <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">📋 Next Steps:</h4>
                <ol>
                  <li>Contact the provider directly to discuss details and pricing</li>
                  <li>Arrange service timing and location</li>
                  <li>Handle payment directly with the provider</li>
                  <li>Leave a review after service completion</li>
                </ol>
              </div>
              
              <div style="background: #e0f2fe; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #0c4a6e;"><strong>💡 Remember:</strong> All payments are handled directly between you and the service provider. Weda.lk provides the connection platform only.</p>
              </div>
              
              <p><strong>Connection ID:</strong> ${connectionId}</p>
              
              <p>Questions? Contact us at <a href="mailto:support@weda.lk">support@weda.lk</a></p>
              
              <p>Best regards,<br>The Weda.lk Team</p>
            </div>
          </body>
        </html>
      `,
    })

    // Send connection notification to provider
    await EmailService.sendEmail({
      to: providerEmail,
      subject: `New Service Request - ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Service Request - Weda.lk</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb;">New Service Request! 🎉</h1>
              
              <p>Hi ${providerName},</p>
              
              <p>You have a new service request from <strong>${customerName}</strong> for <strong>${serviceName}</strong>.</p>
              
              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #0369a1;">👤 Customer Information</h3>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
                <p><strong>Service Requested:</strong> ${serviceName}</p>
                <p><strong>Details:</strong> ${serviceDetails || 'No additional details provided'}</p>
              </div>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">📋 What to do next:</h4>
                <ol>
                  <li>Contact the customer directly via email or phone</li>
                  <li>Discuss service details, timing, and pricing</li>
                  <li>Arrange payment terms directly with customer</li>
                  <li>Complete the service and request a review</li>
                </ol>
              </div>
              
              <p><strong>Connection ID:</strong> ${connectionId}</p>
              
              <p>Questions? Contact us at <a href="mailto:support@weda.lk">support@weda.lk</a></p>
              
              <p>Best regards,<br>The Weda.lk Team</p>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      success: true,
      data: {
        connectionId,
        status: 'connected',
        message: 'Service connection established successfully. Both parties have been notified.',
        customerNotified: true,
        providerNotified: true,
      },
    })
  } catch (error) {
    console.error('Service connection creation error:', error)
    return NextResponse.json({ error: 'Failed to create service connection' }, { status: 500 })
  }
}
