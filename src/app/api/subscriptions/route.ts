/// <reference types="node" />
import { NextRequest, NextResponse } from 'next/server'
import { SubscriptionService } from '@/lib/subscription'
import { EmailService } from '@/lib/email'

// GET: Check user's subscription status
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const { searchParams } = url
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // In a real app, fetch from database
    // For now, return mock trial subscription
    const mockSubscription = SubscriptionService.createTrialSubscription(userId)
    const plans = SubscriptionService.getPlans()
    const userPlan = plans.find((p) => p.id === mockSubscription.planId)

    if (!userPlan) {
      return NextResponse.json({ error: 'Subscription plan not found' }, { status: 404 })
    }

    const subscriptionInfo = SubscriptionService.formatSubscriptionInfo(mockSubscription, userPlan)

    return NextResponse.json({
      success: true,
      data: {
        subscription: subscriptionInfo,
        availablePlans: plans,
      },
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription data' }, { status: 500 })
  }
}

// POST: Create or upgrade subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      planId,
      userEmail,
      userName,
      action, // 'create_trial' or 'upgrade_premium'
    } = body

    if (!userId || !planId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, planId, action' },
        { status: 400 }
      )
    }

    const plans = SubscriptionService.getPlans()
    const selectedPlan = plans.find((p) => p.id === planId)

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 })
    }

    let subscription
    // const emailTemplate = '' // Unused variable

    if (action === 'create_trial') {
      subscription = SubscriptionService.createTrialSubscription(userId)

      // Send welcome email with trial info
      if (userEmail) {
        await EmailService.sendEmail({
          to: userEmail,
          subject: 'Welcome to Weda.lk - Your Free Trial Starts Now! 🎉',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Welcome to Weda.lk - Free Trial</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #16a34a;">Welcome to Weda.lk! 🎉</h1>
                  
                  <p>Hi ${userName || 'Valued User'},</p>
                  
                  <p>Your <strong>FREE 30-day trial</strong> has started! You now have full access to our service marketplace platform.</p>
                  
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 25px; border-radius: 8px; margin: 25px 0;">
                    <h3 style="margin-top: 0; color: #16a34a;">✨ What you can do during your trial:</h3>
                    <ul>
                      <li>Connect with unlimited service providers</li>
                      <li>Post service requests</li>
                      <li>Browse all available services</li>
                      <li>Direct contact with providers</li>
                      <li>Basic customer support</li>
                    </ul>
                  </div>
                  
                  <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📅 Trial Information</h4>
                    <p><strong>Trial Period:</strong> 30 days from today</p>
                    <p><strong>Expires:</strong> ${subscription.endDate.toLocaleDateString()}</p>
                    <p><strong>After Trial:</strong> LKR 5,000/month to continue</p>
                  </div>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <p>Ready to get started? Visit your dashboard to explore services!</p>
                  </div>
                  
                  <p>Questions? Contact us at <a href="mailto:support@weda.lk">support@weda.lk</a></p>
                  
                  <p>Best regards,<br>The Weda.lk Team</p>
                </div>
              </body>
            </html>
          `,
        })
      }
    } else if (action === 'upgrade_premium') {
      const currentSubscription = SubscriptionService.createTrialSubscription(userId) // Mock current
      subscription = SubscriptionService.upgradeToPremium(currentSubscription)

      // Generate payment instructions
      const paymentInfo = SubscriptionService.generateSubscriptionPayment(userId, planId)

      // Send payment instructions email
      if (userEmail) {
        await EmailService.sendEmail({
          to: userEmail,
          subject: 'Premium Subscription Payment Instructions - Weda.lk',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Premium Subscription Payment - Weda.lk</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #2563eb;">Premium Subscription Payment Instructions 💳</h1>
                  
                  <p>Hi ${userName || 'Valued User'},</p>
                  
                  <p>Thank you for upgrading to <strong>Weda.lk Premium</strong>! Please complete your payment to activate your premium features.</p>
                  
                  <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 25px; border-radius: 8px; margin: 25px 0;">
                    <h3 style="margin-top: 0; color: #0369a1;">🏦 Payment Details</h3>
                    <p><strong>Bank Name:</strong> ${paymentInfo.bankDetails.bankName}</p>
                    <p><strong>Account Number:</strong> <span style="font-family: monospace; font-size: 18px; font-weight: bold; color: #dc2626;">${paymentInfo.bankDetails.accountNumber}</span></p>
                    <p><strong>Account Holder:</strong> ${paymentInfo.bankDetails.accountHolderName}</p>
                    <p><strong>Amount:</strong> <span style="font-size: 18px; font-weight: bold; color: #16a34a;">LKR ${paymentInfo.amount.toLocaleString()}</span></p>
                    <p><strong>Reference:</strong> <span style="font-family: monospace; font-weight: bold; background: #fef3c7; padding: 4px 8px; border-radius: 4px;">${paymentInfo.referenceId}</span></p>
                  </div>
                  
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">✨ Premium Features You'll Get:</h4>
                    <ul>
                      ${selectedPlan.features.map((feature) => `<li>${feature}</li>`).join('')}
                    </ul>
                  </div>
                  
                  <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">📋 Payment Instructions:</h4>
                    <ol>
                      ${paymentInfo.instructions.map((instruction) => `<li>${instruction}</li>`).join('')}
                    </ol>
                  </div>
                  
                  <p>Your premium subscription will be activated within 24 hours of payment verification.</p>
                  
                  <p>Questions? Contact us at <a href="mailto:subscriptions@weda.lk">subscriptions@weda.lk</a></p>
                  
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
          subscription,
          paymentInstructions: paymentInfo,
          message: 'Payment instructions sent via email',
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        subscription,
        message:
          action === 'create_trial'
            ? 'Free trial activated successfully!'
            : 'Premium subscription created - payment required',
      },
    })
  } catch (error) {
    console.error('Subscription creation/upgrade error:', error)
    return NextResponse.json({ error: 'Failed to process subscription request' }, { status: 500 })
  }
}
