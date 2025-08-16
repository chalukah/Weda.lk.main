export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  duration: number // in days
  features: string[]
  isActive: boolean
}

export interface UserSubscription {
  userId: string
  planId: string
  startDate: Date
  endDate: Date
  status: 'trial' | 'active' | 'expired' | 'cancelled'
  autoRenew: boolean
  paymentMethod?: 'bank_transfer' | 'cash'
  lastPaymentDate?: Date
  nextBillingDate: Date
}

export class SubscriptionService {
  // Available subscription plans
  static getPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'free_trial',
        name: 'Free Trial',
        price: 0,
        currency: 'LKR',
        duration: 30, // 30 days
        features: [
          'Connect with unlimited service providers',
          'Post service requests',
          'Browse all available services',
          'Direct contact with providers',
          'Basic customer support',
        ],
        isActive: true,
      },
      {
        id: 'monthly_premium',
        name: 'Monthly Premium',
        price: 5000,
        currency: 'LKR',
        duration: 30,
        features: [
          'All Free Trial features',
          'Priority listing in search results',
          'Verified badge for providers',
          'Advanced customer support',
          'Analytics dashboard',
          'Bulk service posting',
          'Featured provider status',
        ],
        isActive: true,
      },
    ]
  }

  // Check if user has active subscription
  static hasActiveSubscription(subscription: UserSubscription): boolean {
    const now = new Date()
    return (
      subscription.endDate > now &&
      (subscription.status === 'trial' || subscription.status === 'active')
    )
  }

  // Create new subscription (starts with free trial)
  static createTrialSubscription(userId: string): UserSubscription {
    const now = new Date()
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    const nextBillingDate = new Date(endDate.getTime() + 1) // Day after trial ends

    return {
      userId,
      planId: 'free_trial',
      startDate: now,
      endDate,
      status: 'trial',
      autoRenew: false,
      nextBillingDate,
    }
  }

  // Upgrade to premium subscription
  static upgradeToPremium(currentSubscription: UserSubscription): UserSubscription {
    const now = new Date()
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    const nextBillingDate = new Date(endDate.getTime() + 1)

    return {
      ...currentSubscription,
      planId: 'monthly_premium',
      startDate: now,
      endDate,
      status: 'active',
      autoRenew: true,
      nextBillingDate,
    }
  }

  // Check subscription status
  static getSubscriptionStatus(subscription: UserSubscription): {
    isActive: boolean
    daysRemaining: number
    status: string
    nextAction: string
  } {
    const now = new Date()
    const daysRemaining = Math.ceil(
      (subscription.endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
    )
    const isActive = this.hasActiveSubscription(subscription)

    let status: string
    let nextAction: string

    if (subscription.status === 'trial') {
      if (daysRemaining > 0) {
        status = `Free trial - ${daysRemaining} days remaining`
        nextAction = 'Upgrade to Premium to continue after trial'
      } else {
        status = 'Trial expired'
        nextAction = 'Subscribe to Premium (LKR 5000/month) to continue'
      }
    } else if (subscription.status === 'active') {
      if (daysRemaining > 0) {
        status = `Premium active - ${daysRemaining} days remaining`
        nextAction = subscription.autoRenew ? 'Auto-renewal enabled' : 'Renewal required'
      } else {
        status = 'Subscription expired'
        nextAction = 'Renew subscription to continue'
      }
    } else {
      status = 'Inactive'
      nextAction = 'Subscribe to access platform features'
    }

    return {
      isActive,
      daysRemaining: Math.max(0, daysRemaining),
      status,
      nextAction,
    }
  }

  // Generate payment instructions for subscription
  static generateSubscriptionPayment(
    userId: string,
    planId: string
  ): {
    amount: number
    bankDetails: {
      bankName: string
      accountNumber: string
      accountHolderName: string
    }
    referenceId: string
    instructions: string[]
  } {
    const plan = this.getPlans().find((p) => p.id === planId)
    if (!plan) throw new Error('Invalid plan ID')

    const referenceId = `SUB-${userId.slice(-8).toUpperCase()}-${Date.now().toString().slice(-6)}`

    return {
      amount: plan.price,
      bankDetails: {
        bankName: process.env.BANK_NAME || 'Commercial Bank of Ceylon',
        accountNumber: process.env.BANK_ACCOUNT_NUMBER || '8001234567',
        accountHolderName: process.env.ACCOUNT_HOLDER_NAME || 'Weda.lk (Pvt) Ltd',
      },
      referenceId,
      instructions: [
        `Transfer LKR ${plan.price.toLocaleString()} to the bank account provided`,
        `Use reference: ${referenceId}`,
        'Send payment screenshot to subscriptions@weda.lk',
        'Subscription will be activated within 24 hours of payment verification',
        'Keep your receipt for records',
      ],
    }
  }

  // Format subscription for display
  static formatSubscriptionInfo(subscription: UserSubscription, plan: SubscriptionPlan) {
    const status = this.getSubscriptionStatus(subscription)

    return {
      planName: plan.name,
      price: plan.price,
      currency: plan.currency,
      features: plan.features,
      status: status.status,
      daysRemaining: status.daysRemaining,
      nextBillingDate: subscription.nextBillingDate,
      nextAction: status.nextAction,
      isActive: status.isActive,
    }
  }
}

export default SubscriptionService
