/// <reference types="node" />
import Stripe from 'stripe'

// Create Stripe instance with fallback for missing keys
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    })
  : null

export interface PaymentIntentData {
  amount: number // in cents (LKR)
  currency?: string
  description?: string
  metadata?: Record<string, string>
}

export interface BookingPaymentData {
  bookingId: string
  customerId: string
  providerId: string
  serviceName: string
  amount: number
  customerEmail: string
}

export class StripeService {
  static async createPaymentIntent(data: PaymentIntentData) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    const paymentData: any = {
      amount: data.amount,
      currency: data.currency || 'lkr',
      metadata: data.metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    }

    if (data.description) {
      paymentData.description = data.description
    }

    return await stripe.paymentIntents.create(paymentData)
  }

  static async createBookingPayment(data: BookingPaymentData) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert LKR to cents
      currency: 'lkr',
      description: `Booking payment for ${data.serviceName}`,
      metadata: {
        booking_id: data.bookingId,
        customer_id: data.customerId,
        provider_id: data.providerId,
        service_name: data.serviceName,
      },
      receipt_email: data.customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    })
  }

  static async confirmPayment(paymentIntentId: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.paymentIntents.confirm(paymentIntentId)
  }

  static async retrievePayment(paymentIntentId: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.paymentIntents.retrieve(paymentIntentId)
  }

  static async cancelPayment(paymentIntentId: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.paymentIntents.cancel(paymentIntentId)
  }

  static async createCustomer(email: string, name?: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    const customerData: any = { email }
    if (name) {
      customerData.name = name
    }
    return await stripe.customers.create(customerData)
  }

  static async createConnectedAccount(providerEmail: string, providerName: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.accounts.create({
      type: 'express',
      email: providerEmail,
      business_profile: {
        name: providerName,
      },
      capabilities: {
        transfers: { requested: true },
      },
    })
  }

  static async createAccountLink(accountId: string, refreshUrl: string, returnUrl: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    })
  }

  static async createTransfer(amount: number, destination: string, description?: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    const transferData: any = {
      amount: Math.round(amount * 100), // Convert LKR to cents
      currency: 'lkr',
      destination,
    }

    if (description) {
      transferData.description = description
    }

    return await stripe.transfers.create(transferData)
  }

  static constructWebhookEvent(payload: string | Buffer, signature: string) {
    if (!stripe) {
      throw new Error(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.'
      )
    }
    return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  }

  static convertCentsToLKR(cents: number): number {
    return cents / 100
  }

  static convertLKRToCents(lkr: number): number {
    return Math.round(lkr * 100)
  }
}

export default StripeService
