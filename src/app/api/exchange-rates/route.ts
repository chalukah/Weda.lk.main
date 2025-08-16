import { NextRequest, NextResponse } from 'next/server'
import { ExchangeRateService } from '@/lib/exchange-rate'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const amount = searchParams.get('amount')
    const type = searchParams.get('type') || 'popular'

    // Get popular rates for dashboard
    if (type === 'popular') {
      const popularRates = await ExchangeRateService.getPopularRates()
      return NextResponse.json({
        success: true,
        base: 'LKR',
        rates: popularRates,
        timestamp: new Date().toISOString(),
      })
    }

    // Get specific exchange rate
    if (from && to) {
      if (amount) {
        // Convert specific amount
        const conversion = await ExchangeRateService.convertAmount(
          parseFloat(amount),
          from.toUpperCase(),
          to.toUpperCase()
        )
        return NextResponse.json({
          success: true,
          conversion,
        })
      } else {
        // Get exchange rate only
        const rate = await ExchangeRateService.getCachedExchangeRate(
          from.toUpperCase(),
          to.toUpperCase()
        )
        return NextResponse.json({
          success: true,
          rate,
        })
      }
    }

    // Get all rates for a base currency
    const base = searchParams.get('base') || 'LKR'
    const allRates = await ExchangeRateService.getAllRates(base.toUpperCase())

    return NextResponse.json({
      success: true,
      ...allRates,
    })
  } catch (error) {
    console.error('Exchange rate API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch exchange rates',
      },
      { status: 500 }
    )
  }
}

// Optional: POST endpoint for batch conversions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversions } = body

    if (!conversions || !Array.isArray(conversions)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request format. Expected array of conversions.',
        },
        { status: 400 }
      )
    }

    const results = await Promise.all(
      conversions.map(async (conversion: any) => {
        try {
          const result = await ExchangeRateService.convertAmount(
            conversion.amount,
            conversion.from.toUpperCase(),
            conversion.to.toUpperCase()
          )
          return {
            success: true,
            id: conversion.id,
            ...result,
          }
        } catch (error) {
          return {
            success: false,
            id: conversion.id,
            error: error instanceof Error ? error.message : 'Conversion failed',
          }
        }
      })
    )

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('Batch conversion error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Batch conversion failed',
      },
      { status: 500 }
    )
  }
}
