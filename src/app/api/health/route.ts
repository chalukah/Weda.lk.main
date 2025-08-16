import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getRedisStatus } from '@/lib/redis'
import { validateEnvironment } from '@/lib/config'

export async function GET() {
  const timestamp = new Date().toISOString()

  try {
    // Test database connection
    const dbStartTime = Date.now()
    let dbStatus: 'connected' | 'disconnected' = 'disconnected'
    let dbResponseTime = 0

    try {
      await prisma.$queryRaw`SELECT 1`
      dbResponseTime = Date.now() - dbStartTime
      dbStatus = 'connected'
    } catch (error) {
      dbResponseTime = Date.now() - dbStartTime
      console.error('Database health check failed:', error)
    }

    // Test Redis connection
    const redisStatus = await getRedisStatus()

    // Validate environment configuration
    const envValidation = validateEnvironment()

    // Test service configurations
    let servicesStatus: 'ok' | 'misconfigured' = 'ok'
    if (!envValidation.isValid) {
      servicesStatus = 'misconfigured'
    }

    // Determine overall status
    let overallStatus: 'ok' | 'degraded' | 'down' = 'ok'

    if (dbStatus === 'disconnected' && redisStatus.status === 'disconnected') {
      overallStatus = 'down'
    } else if (
      dbStatus === 'disconnected' ||
      redisStatus.status === 'disconnected' ||
      servicesStatus === 'misconfigured'
    ) {
      overallStatus = 'degraded'
    }

    const healthData = {
      status: overallStatus,
      database: {
        status: dbStatus,
        responseTime: dbResponseTime,
      },
      redis: {
        status: redisStatus.status,
        responseTime: redisStatus.responseTime,
      },
      services: {
        status: servicesStatus,
        config: envValidation.config,
        missing: envValidation.missing,
        missingOptional: envValidation.missingOptional,
      },
      timestamp,
    }

    // Return appropriate HTTP status code based on health
    const httpStatus = overallStatus === 'down' ? 503 : overallStatus === 'degraded' ? 200 : 200

    return NextResponse.json(healthData, { status: httpStatus })
  } catch (error) {
    console.error('Health check error:', error)

    return NextResponse.json(
      {
        status: 'down',
        database: {
          status: 'disconnected',
          responseTime: 0,
        },
        redis: {
          status: 'disconnected',
          responseTime: 0,
        },
        timestamp,
        error: 'Internal server error',
      },
      { status: 503 }
    )
  }
}
