import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, description, metadata } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await StripeService.createPaymentIntent({
      amount: StripeService.convertLKRToCents(amount),
      currency: currency || 'lkr',
      description,
      metadata,
    })

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
