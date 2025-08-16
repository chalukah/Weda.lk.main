import { NextRequest, NextResponse } from 'next/server'
import { PayHereService, PayHereNotification } from '@/lib/payhere'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    // Extract PayHere notification data
    const notification: PayHereNotification = {
      merchant_id: body.get('merchant_id') as string,
      order_id: body.get('order_id') as string,
      payment_id: body.get('payment_id') as string,
      payhere_amount: body.get('payhere_amount') as string,
      payhere_currency: body.get('payhere_currency') as string,
      status_code: body.get('status_code') as string,
      md5sig: body.get('md5sig') as string,
    }

    // Verify the notification signature
    if (!PayHereService.verifyNotification(notification)) {
      console.error('PayHere notification verification failed')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Process the payment notification
    await handlePayHereNotification(notification)

    return NextResponse.json({ status: 'OK' })
  } catch (error) {
    console.error('PayHere webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
  }
}

async function handlePayHereNotification(notification: PayHereNotification) {
  try {
    const isSuccessful = PayHereService.isPaymentSuccessful(notification.status_code)
    const statusMessage = PayHereService.getStatusMessage(notification.status_code)

    console.log(`PayHere payment ${notification.order_id}: ${statusMessage}`)

    if (isSuccessful) {
      await handlePaymentSuccess(notification)
    } else {
      await handlePaymentFailure(notification)
    }
  } catch (error) {
    console.error('Error handling PayHere notification:', error)
  }
}

async function handlePaymentSuccess(notification: PayHereNotification) {
  try {
    console.log(`PayHere payment successful for order: ${notification.order_id}`)

    // TODO: Update booking status in database
    // TODO: Send confirmation email to customer
    // TODO: Notify service provider

    // Example: Send booking confirmation email
    // if (customerEmail) {
    //   await EmailService.sendBookingConfirmation(customerEmail, {
    //     customerName: 'Customer Name',
    //     providerName: 'Provider Name',
    //     serviceName: 'Service Name',
    //     bookingDate: 'Date',
    //     bookingTime: 'Time',
    //     location: 'Location',
    //     totalAmount: PayHereService.convertCentsToLKR(parseFloat(notification.payhere_amount) * 100),
    //   })
    // }
  } catch (error) {
    console.error('Error handling PayHere payment success:', error)
  }
}

async function handlePaymentFailure(notification: PayHereNotification) {
  try {
    console.log(`PayHere payment failed for order: ${notification.order_id}`)

    // TODO: Update booking status in database
    // TODO: Send failure notification to customer
    // TODO: Release any held resources
  } catch (error) {
    console.error('Error handling PayHere payment failure:', error)
  }
}
