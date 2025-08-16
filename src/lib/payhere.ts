/// <reference types="node" />
import crypto from 'crypto'

export interface PayHerePaymentData {
  orderId: string
  amount: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
}

export interface PayHereNotification {
  merchant_id: string
  order_id: string
  payment_id: string
  payhere_amount: string
  payhere_currency: string
  status_code: string
  md5sig: string
}

export class PayHereService {
  private static getMerchantId(): string {
    const merchantId = process.env.PAYHERE_MERCHANT_ID
    if (!merchantId) {
      throw new Error(
        'PayHere merchant ID is not configured. Please set PAYHERE_MERCHANT_ID environment variable.'
      )
    }
    return merchantId
  }

  private static getMerchantSecret(): string {
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET
    if (!merchantSecret) {
      throw new Error(
        'PayHere merchant secret is not configured. Please set PAYHERE_MERCHANT_SECRET environment variable.'
      )
    }
    return merchantSecret
  }

  private static isSandbox(): boolean {
    return process.env.PAYHERE_SANDBOX === 'true'
  }

  static getPaymentUrl(): string {
    return this.isSandbox()
      ? 'https://sandbox.payhere.lk/pay/checkout'
      : 'https://www.payhere.lk/pay/checkout'
  }

  static createPaymentForm(data: PayHerePaymentData): string {
    const merchantId = this.getMerchantId()
    const merchantSecret = this.getMerchantSecret()

    // Generate hash for security
    const hash = crypto
      .createHash('md5')
      .update(
        merchantId +
          data.orderId +
          data.amount.toFixed(2) +
          data.currency +
          crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
      )
      .digest('hex')
      .toUpperCase()

    const formData = {
      merchant_id: merchantId,
      return_url: data.returnUrl,
      cancel_url: data.cancelUrl,
      notify_url: data.notifyUrl,
      order_id: data.orderId,
      items: data.description,
      currency: data.currency,
      amount: data.amount.toFixed(2),
      first_name: data.customerName.split(' ')[0] || '',
      last_name: data.customerName.split(' ').slice(1).join(' ') || '',
      email: data.customerEmail,
      phone: data.customerPhone,
      address: '',
      city: 'Colombo',
      country: 'Sri Lanka',
      hash: hash,
    }

    // Create HTML form
    const formFields = Object.entries(formData)
      .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
      .join('\n')

    return `
      <form method="post" action="${this.getPaymentUrl()}" id="payhere-payment-form">
        ${formFields}
      </form>
      <script>
        document.getElementById('payhere-payment-form').submit();
      </script>
    `
  }

  static generatePaymentData(data: PayHerePaymentData) {
    const merchantId = this.getMerchantId()
    const merchantSecret = this.getMerchantSecret()

    // Generate hash for security
    const hash = crypto
      .createHash('md5')
      .update(
        merchantId +
          data.orderId +
          data.amount.toFixed(2) +
          data.currency +
          crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
      )
      .digest('hex')
      .toUpperCase()

    return {
      merchant_id: merchantId,
      return_url: data.returnUrl,
      cancel_url: data.cancelUrl,
      notify_url: data.notifyUrl,
      order_id: data.orderId,
      items: data.description,
      currency: data.currency,
      amount: data.amount.toFixed(2),
      first_name: data.customerName.split(' ')[0] || '',
      last_name: data.customerName.split(' ').slice(1).join(' ') || '',
      email: data.customerEmail,
      phone: data.customerPhone,
      address: '',
      city: 'Colombo',
      country: 'Sri Lanka',
      hash: hash,
    }
  }

  static verifyNotification(notification: PayHereNotification): boolean {
    try {
      const merchantSecret = this.getMerchantSecret()

      // Generate expected hash
      const expectedHash = crypto
        .createHash('md5')
        .update(
          notification.merchant_id +
            notification.order_id +
            notification.payhere_amount +
            notification.payhere_currency +
            notification.status_code +
            crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase()

      return expectedHash === notification.md5sig.toUpperCase()
    } catch (error) {
      console.error('Error verifying PayHere notification:', error)
      return false
    }
  }

  static isPaymentSuccessful(statusCode: string): boolean {
    return statusCode === '2' // Status code 2 means successful payment
  }

  static getStatusMessage(statusCode: string): string {
    const statusMessages: Record<string, string> = {
      '2': 'Payment successful',
      '0': 'Payment pending',
      '-1': 'Payment cancelled',
      '-2': 'Payment failed',
      '-3': 'Payment chargeback',
    }

    return statusMessages[statusCode] || 'Unknown payment status'
  }

  static convertLKRToCents(lkr: number): number {
    return Math.round(lkr * 100)
  }

  static convertCentsToLKR(cents: number): number {
    return cents / 100
  }
}

export default PayHereService
