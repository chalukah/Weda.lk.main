/// <reference types="node" />

export interface ExchangeRate {
  base: string
  target: string
  rate: number
  lastUpdated: string
}

export interface ExchangeRateResponse {
  success: boolean
  base: string
  date: string
  rates: Record<string, number>
}

export class ExchangeRateService {
  private static getApiKey(): string {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    if (!apiKey) {
      throw new Error(
        'Exchange Rate API key is not configured. Please set EXCHANGE_RATE_API_KEY environment variable.'
      )
    }
    return apiKey
  }

  private static getBaseUrl(): string {
    return 'https://v6.exchangerate-api.com/v6'
  }

  static async getExchangeRate(
    baseCurrency: string,
    targetCurrency: string
  ): Promise<ExchangeRate> {
    try {
      const apiKey = this.getApiKey()
      const url = `${this.getBaseUrl()}/${apiKey}/pair/${baseCurrency}/${targetCurrency}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.result !== 'success') {
        throw new Error(`Exchange rate API error: ${data.error || 'Unknown error'}`)
      }

      return {
        base: data.base_code,
        target: data.target_code,
        rate: data.conversion_rate,
        lastUpdated: data.time_last_update_utc,
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      throw error
    }
  }

  static async getAllRates(baseCurrency: string = 'LKR'): Promise<ExchangeRateResponse> {
    try {
      const apiKey = this.getApiKey()
      const url = `${this.getBaseUrl()}/${apiKey}/latest/${baseCurrency}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.result !== 'success') {
        throw new Error(`Exchange rate API error: ${data.error || 'Unknown error'}`)
      }

      return {
        success: true,
        base: data.base_code,
        date: data.time_last_update_utc,
        rates: data.conversion_rates,
      }
    } catch (error) {
      console.error('Error fetching all exchange rates:', error)
      throw error
    }
  }

  static async convertAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<{
    originalAmount: number
    convertedAmount: number
    rate: number
    fromCurrency: string
    toCurrency: string
  }> {
    try {
      if (fromCurrency === toCurrency) {
        return {
          originalAmount: amount,
          convertedAmount: amount,
          rate: 1,
          fromCurrency,
          toCurrency,
        }
      }

      const exchangeRate = await this.getExchangeRate(fromCurrency, toCurrency)
      const convertedAmount = amount * exchangeRate.rate

      return {
        originalAmount: amount,
        convertedAmount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimal places
        rate: exchangeRate.rate,
        fromCurrency,
        toCurrency,
      }
    } catch (error) {
      console.error('Error converting amount:', error)
      throw error
    }
  }

  // Common currency conversions for Sri Lankan marketplace
  static async convertLKRtoUSD(lkrAmount: number): Promise<number> {
    const result = await this.convertAmount(lkrAmount, 'LKR', 'USD')
    return result.convertedAmount
  }

  static async convertUSDtoLKR(usdAmount: number): Promise<number> {
    const result = await this.convertAmount(usdAmount, 'USD', 'LKR')
    return result.convertedAmount
  }

  static async convertLKRtoEUR(lkrAmount: number): Promise<number> {
    const result = await this.convertAmount(lkrAmount, 'LKR', 'EUR')
    return result.convertedAmount
  }

  static async convertEURtoLKR(eurAmount: number): Promise<number> {
    const result = await this.convertAmount(eurAmount, 'EUR', 'LKR')
    return result.convertedAmount
  }

  // Get popular currency rates for dashboard display
  static async getPopularRates(): Promise<Record<string, number>> {
    try {
      const rates = await this.getAllRates('LKR')
      const popularCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD']

      const popularRates: Record<string, number> = {}
      for (const currency of popularCurrencies) {
        if (rates.rates[currency]) {
          popularRates[currency] = rates.rates[currency]
        }
      }

      return popularRates
    } catch (error) {
      console.error('Error fetching popular rates:', error)
      throw error
    }
  }

  // Cache exchange rates to avoid hitting API limits
  private static rateCache = new Map<string, { rate: ExchangeRate; expiry: number }>()
  private static CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

  static async getCachedExchangeRate(
    baseCurrency: string,
    targetCurrency: string
  ): Promise<ExchangeRate> {
    const cacheKey = `${baseCurrency}-${targetCurrency}`
    const cached = this.rateCache.get(cacheKey)

    if (cached && Date.now() < cached.expiry) {
      return cached.rate
    }

    const rate = await this.getExchangeRate(baseCurrency, targetCurrency)
    this.rateCache.set(cacheKey, {
      rate,
      expiry: Date.now() + this.CACHE_DURATION,
    })

    return rate
  }

  // Clear cache manually if needed
  static clearCache(): void {
    this.rateCache.clear()
  }
}

export default ExchangeRateService
