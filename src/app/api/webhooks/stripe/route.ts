import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/stripe'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }

    const event = StripeService.constructWebhookEvent(body, signature)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object)
        break

      case 'account.updated':
        await handleAccountUpdate(event.data.object)
        break

      default:
        console.warn(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  try {
    const { metadata } = paymentIntent

    if (metadata.booking_id) {
      console.warn(`Payment succeeded for booking: ${metadata.booking_id}`)

      // Send booking confirmation email
      if (paymentIntent.receipt_email) {
        await EmailService.sendBookingConfirmation(paymentIntent.receipt_email, {
          customerName: metadata.customer_name || 'Valued Customer',
          providerName: metadata.provider_name || 'Service Provider',
          serviceName: metadata.service_name,
          bookingDate: metadata.booking_date || 'TBD',
          bookingTime: metadata.booking_time || 'TBD',
          location: metadata.location || 'TBD',
          totalAmount: StripeService.convertCentsToLKR(paymentIntent.amount),
        })
      }
    }
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  try {
    const { metadata } = paymentIntent

    if (metadata.booking_id) {
      console.warn(`Payment failed for booking: ${metadata.booking_id}`)
      // Handle payment failure logic here
      // e.g., update booking status, notify customer
    }
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleAccountUpdate(account: any) {
  try {
    console.warn(`Account updated: ${account.id}`)
    // Handle account update logic here
    // e.g., update provider status in database
  } catch (error) {
    console.error('Error handling account update:', error)
  }
}
