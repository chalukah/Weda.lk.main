export interface ServiceConfig {
  storage: 'cloudinary' | 'aws-s3'
  email: 'resend' | 'sendgrid'
  subscription: 'manual_bank_transfer'
  sms: 'disabled' | 'twilio'
  maps: 'google'
}

export const getServiceConfig = (): ServiceConfig => {
  return {
    // File Storage: Start with Cloudinary (25GB free), upgrade to AWS S3 when needed
    storage: process.env.AWS_ACCESS_KEY_ID ? 'aws-s3' : 'cloudinary',

    // Email: Start with Resend (3K emails/month free), upgrade to SendGrid when needed
    email: process.env.SENDGRID_API_KEY ? 'sendgrid' : 'resend',

    // Subscription: Manual bank transfers for monthly subscriptions only
    subscription: 'manual_bank_transfer' as const,

    // SMS: Disabled initially to save costs, enable Twilio when verification is critical
    sms: process.env.TWILIO_ACCOUNT_SID ? 'twilio' : 'disabled',

    // Maps: Google Maps with $200/month credit
    maps: 'google',
  }
}

export const getUpgradeThresholds = () => {
  return {
    storage: {
      cloudinary_limit_gb: 25,
      aws_upgrade_message: 'Upgrade to AWS S3 when you exceed 25GB storage',
    },
    email: {
      resend_limit_monthly: 3000,
      sendgrid_upgrade_message: 'Upgrade to SendGrid when you exceed 3K emails/month',
    },
    sms: {
      enable_threshold_users: 1000,
      twilio_upgrade_message: 'Enable SMS verification when you have 1000+ users',
    },
    subscription: {
      free_trial_days: 30,
      monthly_price_lkr: 5000,
      manual_processing_time_hours: 24,
      bank_verification_message: 'Subscription payment verification within 24 hours',
    },
  }
}

export const isFeatureEnabled = (feature: keyof ServiceConfig): boolean => {
  const config = getServiceConfig()

  switch (feature) {
    case 'sms':
      return config.sms !== 'disabled'
    default:
      return true
  }
}

// Environment checks
export const validateEnvironment = () => {
  const required = [
    'NEXTAUTH_SECRET',
    'DATABASE_URL',
    'REDIS_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'BANK_ACCOUNT_NUMBER',
    'BANK_NAME',
    'ACCOUNT_HOLDER_NAME',
    'FREE_TRIAL_DAYS',
    'MONTHLY_SUBSCRIPTION_PRICE',
  ]

  const config = getServiceConfig()

  // Check storage requirements
  if (config.storage === 'cloudinary') {
    required.push('CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET')
  } else {
    required.push('AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_S3_BUCKET_NAME')
  }

  // Check email requirements
  if (config.email === 'resend') {
    required.push('RESEND_API_KEY')
  } else {
    required.push('SENDGRID_API_KEY')
  }

  // Check optional services
  const optional = []
  if (config.sms === 'twilio') {
    optional.push('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN')
  }

  // No additional third-party services needed for subscription model
  if (config.subscription === 'manual_bank_transfer') {
    // Bank details for subscription payments are in required array
  }

  const missing = required.filter((key) => !process.env[key])
  const missingOptional = optional.filter((key) => !process.env[key])

  return {
    isValid: missing.length === 0,
    missing,
    missingOptional,
    config,
  }
}

export default {
  getServiceConfig,
  getUpgradeThresholds,
  isFeatureEnabled,
  validateEnvironment,
}
