export interface DirectPaymentData {
  bookingId: string
  customerId: string
  providerId: string
  serviceName: string
  amount: number
  customerEmail: string
  customerName: string
  providerEmail: string
  providerName: string
  providerBankDetails?: {
    bankName: string
    accountNumber: string
    accountHolderName: string
  }
}

export interface DirectPaymentInstructions {
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

export class DirectPaymentService {
  static generateDirectPaymentInstructions(data: DirectPaymentData): DirectPaymentInstructions {
    const referenceId = `WEDA-${data.bookingId.slice(-8).toUpperCase()}`
    const commissionRate = 0.15 // 15% platform commission
    const platformCommission = Math.round(data.amount * commissionRate * 100) / 100
    const providerReceives = Math.round((data.amount - platformCommission) * 100) / 100

    return {
      payToProvider: {
        providerName: data.providerName,
        providerEmail: data.providerEmail,
        bankName: data.providerBankDetails?.bankName || 'Provider will provide bank details',
        accountNumber:
          data.providerBankDetails?.accountNumber || 'Provider will provide account number',
        accountHolderName: data.providerBankDetails?.accountHolderName || data.providerName,
      },
      amount: data.amount,
      platformCommission,
      providerReceives,
      referenceId,
      instructions: [
        'Contact the service provider directly for their bank account details',
        `Pay LKR ${providerReceives.toFixed(2)} directly to the provider (after platform commission)`,
        `Provider will pay LKR ${platformCommission.toFixed(2)} commission to Weda.lk`,
        `Use reference ID: ${referenceId} when communicating with provider`,
        'Service provider will confirm payment receipt and schedule service',
        'Keep your payment receipt for records',
      ],
    }
  }

  static async createDirectPayment(data: DirectPaymentData) {
    const paymentInstructions = this.generateDirectPaymentInstructions(data)

    return {
      success: true,
      paymentId: `dp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      paymentInstructions,
      status: 'awaiting_provider_contact',
      message: 'Direct payment instructions sent. Customer will contact provider directly.',
    }
  }

  static calculateProviderCommissionDue(totalAmount: number, commissionRate: number = 0.15) {
    const platformCommission = Math.round(totalAmount * commissionRate * 100) / 100
    const providerReceives = Math.round((totalAmount - platformCommission) * 100) / 100

    return {
      totalAmount,
      platformCommission,
      providerReceives,
      commissionRate: Math.round(commissionRate * 100),
      commissionDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }
  }

  static formatCurrency(amount: number): string {
    return `LKR ${amount.toFixed(2)}`
  }

  static validatePaymentProof(_proofData: any) {
    // This would integrate with your admin panel for manual verification
    return {
      isValid: false, // Set to false initially, requires manual verification
      requiresReview: true,
      message: 'Payment proof submitted for manual verification',
    }
  }
}

// Provider commission tracking
export interface ProviderCommission {
  providerId: string
  bookingId: string
  totalAmount: number
  commissionDue: number
  dueDate: Date
  status: 'pending' | 'paid' | 'overdue'
  paidAt?: Date
}

export default DirectPaymentService
