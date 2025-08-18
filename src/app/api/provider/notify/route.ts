import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name, businessName } = await request.json()

    if (!email || !name || !businessName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email to the applicant
    const applicantEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .welcome-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .next-steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .step { margin: 10px 0; padding: 10px; background: #f0fdf4; border-radius: 6px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .btn { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Weda.lk!</h1>
              <p>Your provider application has been received</p>
            </div>
            
            <div class="content">
              <div class="welcome-box">
                <h2>Hello ${name}!</h2>
                <p>Thank you for applying to join Weda.lk as a service provider for <strong>${businessName}</strong>.</p>
                <p>We're excited to have you as part of Sri Lanka's most trusted home services marketplace!</p>
              </div>
              
              <div class="next-steps">
                <h3>What happens next?</h3>
                <div class="step">
                  <strong>📋 Application Review (2-3 business days)</strong><br>
                  Our team will review your application and verify your documents.
                </div>
                <div class="step">
                  <strong>✅ Verification Process</strong><br>
                  We'll verify your documents and background information.
                </div>
                <div class="step">
                  <strong>🎯 Profile Activation</strong><br>
                  Once approved, your profile will go live and you can start receiving bookings!
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/provider/dashboard" class="btn">
                  View Application Status
                </a>
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <strong>📞 Need Help?</strong><br>
                Contact our support team at <a href="mailto:support@weda.lk">support@weda.lk</a> or call +94 77 123 4567
              </div>
            </div>
            
            <div class="footer">
              <p>Best regards,<br>The Weda.lk Team</p>
              <p><a href="${process.env.NEXTAUTH_URL}">www.weda.lk</a> | Sri Lanka's Trusted Home Services Platform</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #3b82f6; }
            .btn { display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Provider Application</h2>
            </div>
            
            <div class="content">
              <div class="info-box">
                <strong>Applicant:</strong> ${name}<br>
                <strong>Business:</strong> ${businessName}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Applied:</strong> ${new Date().toLocaleDateString('en-GB')}
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.NEXTAUTH_URL}/admin/applications" class="btn">
                  Review Application
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to applicant
    await resend.emails.send({
      from: `Weda.lk Team <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: '🎉 Welcome to Weda.lk - Application Received!',
      html: applicantEmailHtml,
    })

    // Send notification to admin
    await resend.emails.send({
      from: `Weda.lk System <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || process.env.RESEND_FROM_EMAIL || 'wedamarketplace@gmail.com',
      subject: `🔔 New Provider Application - ${businessName}`,
      html: adminEmailHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Notification emails sent successfully',
    })
  } catch (error) {
    console.error('Error sending notification emails:', error)
    return NextResponse.json({ error: 'Failed to send notification emails' }, { status: 500 })
  }
}
