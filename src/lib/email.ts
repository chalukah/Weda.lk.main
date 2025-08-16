import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
}

export interface WelcomeEmailData {
  name: string
  email: string
}

export interface BookingConfirmationData {
  customerName: string
  providerName: string
  serviceName: string
  bookingDate: string
  bookingTime: string
  location: string
  totalAmount: number
}

export interface PasswordResetData {
  name: string
  resetUrl: string
}

export interface DirectPaymentInstructionsData {
  customerName: string
  serviceName: string
  bookingId: string
  paymentInstructions: {
    payToProvider: {
      providerName: string
      providerEmail: string
      bankName: string
      accountNumber: string
      accountHolderName: string
    }
    amount: number
    platformCommission: number
    providerReceives: number
    referenceId: string
    instructions: string[]
  }
}

export interface ProviderCommissionReminderData {
  providerName: string
  serviceName: string
  bookingId: string
  customerName: string
  totalAmount: number
  commissionDue: number
  providerReceives: number
}

export class EmailService {
  private static readonly FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@weda.lk'

  static async sendEmail(options: EmailOptions) {
    try {
      const emailData: any = {
        from: options.from || this.FROM_EMAIL,
        to: options.to,
        subject: options.subject,
      }

      if (options.html) {
        emailData.html = options.html
      }

      if (options.text) {
        emailData.text = options.text
      }

      const result = await resend.emails.send(emailData)
      return result
    } catch (error) {
      console.error('Email sending failed:', error)
      throw error
    }
  }

  static async sendWelcomeEmail(to: string, data: WelcomeEmailData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Welcome to Weda.lk! 🎉</h1>
            
            <p>Hi ${data.name},</p>
            
            <p>Welcome to Weda.lk, Sri Lanka's premier service marketplace! We're excited to have you join our community.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>What you can do now:</h3>
              <ul>
                <li>Browse services in your area</li>
                <li>Book trusted service providers</li>
                <li>Rate and review services</li>
                <li>Become a service provider yourself</li>
              </ul>
            </div>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              You received this email because you created an account on Weda.lk.
            </p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: 'Welcome to Weda.lk! 🎉',
      html,
    })
  }

  static async sendBookingConfirmation(to: string, data: BookingConfirmationData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Confirmation - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">Booking Confirmed! ✅</h1>
            
            <p>Hi ${data.customerName},</p>
            
            <p>Your booking has been confirmed! Here are the details:</p>
            
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16a34a;">Booking Details</h3>
              <p><strong>Service:</strong> ${data.serviceName}</p>
              <p><strong>Provider:</strong> ${data.providerName}</p>
              <p><strong>Date:</strong> ${data.bookingDate}</p>
              <p><strong>Time:</strong> ${data.bookingTime}</p>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Total Amount:</strong> LKR ${data.totalAmount.toLocaleString()}</p>
            </div>
            
            <p>The service provider will contact you soon to confirm the appointment.</p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: 'Booking Confirmation - Weda.lk',
      html,
    })
  }

  static async sendPasswordReset(to: string, data: PasswordResetData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #dc2626;">Reset Your Password</h1>
            
            <p>Hi ${data.name},</p>
            
            <p>We received a request to reset your password for your Weda.lk account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resetUrl}" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p>This link will expire in 1 hour for security reasons.</p>
            
            <p>If you didn't request this password reset, please ignore this email.</p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: 'Reset Your Password - Weda.lk',
      html,
    })
  }

  static async sendDirectPaymentInstructions(to: string, data: DirectPaymentInstructionsData) {
    const { paymentInstructions } = data
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Direct Payment Instructions - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Payment Instructions 💳</h1>
            
            <p>Hi ${data.customerName},</p>
            
            <p>Thank you for booking <strong>${data.serviceName}</strong>! Please make payment directly to the service provider:</p>
            
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">💰 Payment Summary</h3>
              <p><strong>Total Service Cost:</strong> <span style="font-size: 18px; font-weight: bold; color: #dc2626;">LKR ${paymentInstructions.amount.toFixed(2)}</span></p>
              <p><strong>Platform Commission:</strong> LKR ${paymentInstructions.platformCommission.toFixed(2)} (handled by provider)</p>
              <p><strong>You Pay to Provider:</strong> <span style="font-size: 18px; font-weight: bold; color: #16a34a;">LKR ${paymentInstructions.providerReceives.toFixed(2)}</span></p>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #b45309;">👤 Service Provider Contact</h3>
              <p><strong>Provider:</strong> ${paymentInstructions.payToProvider.providerName}</p>
              <p><strong>Email:</strong> <a href="mailto:${paymentInstructions.payToProvider.providerEmail}">${paymentInstructions.payToProvider.providerEmail}</a></p>
              <p><strong>Reference ID:</strong> <span style="font-family: monospace; font-weight: bold; background: #fee2e2; padding: 4px 8px; border-radius: 4px;">${paymentInstructions.referenceId}</span></p>
            </div>
            
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">📝 Next Steps:</h4>
              <ol style="margin: 0; padding-left: 20px;">
                ${paymentInstructions.instructions.map((instruction) => `<li style="margin-bottom: 8px;">${instruction}</li>`).join('')}
              </ol>
            </div>
            
            <div style="background: #e0f2fe; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #0c4a6e;"><strong>ℹ️ How it works:</strong> You pay the provider directly. The provider will separately pay Weda.lk the platform commission. This keeps your payment simple and direct!</p>
            </div>
            
            <p>Questions? Contact us at <a href="mailto:support@weda.lk">support@weda.lk</a></p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              Booking ID: ${data.bookingId}<br>
              This booking connects you directly with the service provider.
            </p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: `Direct Payment Instructions - ${data.serviceName} Booking`,
      html,
    })
  }

  static async sendProviderCommissionReminder(to: string, data: ProviderCommissionReminderData) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Booking & Commission Due - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #16a34a;">New Booking Received! 🎉</h1>
            
            <p>Hi ${data.providerName},</p>
            
            <p>Great news! You have a new booking for <strong>${data.serviceName}</strong> from ${data.customerName}.</p>
            
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #16a34a;">💰 Payment Breakdown</h3>
              <p><strong>Total Service Cost:</strong> LKR ${data.totalAmount.toFixed(2)}</p>
              <p><strong>You Receive from Customer:</strong> <span style="font-size: 18px; font-weight: bold; color: #16a34a;">LKR ${data.providerReceives.toFixed(2)}</span></p>
              <p><strong>Commission Due to Weda.lk:</strong> <span style="font-size: 16px; font-weight: bold; color: #dc2626;">LKR ${data.commissionDue.toFixed(2)}</span></p>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">📋 What happens next:</h4>
              <ol style="margin: 0; padding-left: 20px;">
                <li>Customer will contact you directly for payment arrangements</li>
                <li>Provide your bank account details to the customer</li>
                <li>Complete the service after receiving payment</li>
                <li><strong>Pay your commission to Weda.lk within 7 days</strong></li>
              </ol>
            </div>
            
            <div style="background: #e0f2fe; border: 1px solid #0ea5e9; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">🏦 Pay Commission to Weda.lk</h3>
              <p><strong>Bank Name:</strong> Commercial Bank of Ceylon</p>
              <p><strong>Account Number:</strong> 8001234567</p>
              <p><strong>Account Holder:</strong> Weda.lk (Pvt) Ltd</p>
              <p><strong>Amount:</strong> LKR ${data.commissionDue.toFixed(2)}</p>
              <p><strong>Reference:</strong> COMM-${data.bookingId.slice(-8).toUpperCase()}</p>
            </div>
            
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            
            <p>Questions about commission payments? Contact us at <a href="mailto:commissions@weda.lk">commissions@weda.lk</a></p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: `New Booking: ${data.serviceName} - Commission LKR ${data.commissionDue.toFixed(2)} Due`,
      html,
    })
  }

  static async sendBankTransferInstructions(to: string, data: DirectPaymentInstructionsData) {
    const { paymentInstructions } = data
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Instructions - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Payment Instructions 💳</h1>
            
            <p>Hi ${data.customerName},</p>
            
            <p>Thank you for booking <strong>${data.serviceName}</strong>! Please complete your payment using the bank transfer details below:</p>
            
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">Bank Transfer Details</h3>
              <p><strong>Bank Name:</strong> ${paymentInstructions.payToProvider.bankName}</p>
              <p><strong>Account Number:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: bold; color: #dc2626;">${paymentInstructions.payToProvider.accountNumber}</span></p>
              <p><strong>Account Holder:</strong> ${paymentInstructions.payToProvider.accountHolderName}</p>
              <p><strong>Amount to Transfer:</strong> <span style="font-size: 18px; font-weight: bold; color: #16a34a;">LKR ${paymentInstructions.amount.toFixed(2)}</span></p>
              <p><strong>Reference ID:</strong> <span style="font-family: monospace; font-weight: bold; background: #fef3c7; padding: 4px 8px; border-radius: 4px;">${paymentInstructions.referenceId}</span></p>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">📝 Important Instructions:</h4>
              <ol style="margin: 0; padding-left: 20px;">
                ${paymentInstructions.instructions.map((instruction) => `<li style="margin-bottom: 8px;">${instruction}</li>`).join('')}
              </ol>
            </div>
            
            <div style="background: #fee2e2; border: 1px solid #fca5a5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #dc2626;"><strong>⚠️ Please Note:</strong> Your booking is confirmed but the service will only commence after payment verification (within 24 hours).</p>
            </div>
            
            <p>Questions? Contact us at <a href="mailto:payments@weda.lk">payments@weda.lk</a> or call our support team.</p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              Booking ID: ${data.bookingId}<br>
              This email contains sensitive payment information. Please do not forward.
            </p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: `Payment Instructions - ${data.serviceName} Booking`,
      html,
    })
  }

  static async sendProviderVerification(to: string, providerName: string) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Provider Verification - Weda.lk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb;">Provider Application Received</h1>
            
            <p>Hi ${providerName},</p>
            
            <p>Thank you for applying to become a service provider on Weda.lk!</p>
            
            <p>We're currently reviewing your application and will get back to you within 2-3 business days.</p>
            
            <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">What happens next?</h3>
              <ol>
                <li>Document verification</li>
                <li>Background check</li>
                <li>Profile approval</li>
                <li>Welcome to the platform!</li>
              </ol>
            </div>
            
            <p>If you have any questions, feel free to contact our support team.</p>
            
            <p>Best regards,<br>The Weda.lk Team</p>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to,
      subject: 'Provider Application Received - Weda.lk',
      html,
    })
  }
}

export default EmailService
