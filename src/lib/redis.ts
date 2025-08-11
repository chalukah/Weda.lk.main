import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

export async function testRedisConnection(): Promise<boolean> {
  try {
    const result = await redis.ping()
    return result === 'PONG'
  } catch (error) {
    console.error('Redis connection failed:', error)
    return false
  }
}

export async function getRedisStatus(): Promise<{
  status: 'connected' | 'disconnected'
  responseTime: number
}> {
  const startTime = Date.now()
  try {
    await redis.ping()
    const responseTime = Date.now() - startTime
    return { status: 'connected', responseTime }
  } catch (error) {
    const responseTime = Date.now() - startTime
    return { status: 'disconnected', responseTime }
  }
}
