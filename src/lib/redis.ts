import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

// Create a mock Redis connection if no URL is provided
const createRedisInstance = () => {
  const redisUrl = process.env.REDIS_URL

  // If no Redis URL is provided, return a mock client
  if (!redisUrl || redisUrl.includes('[password]') || redisUrl.includes('[endpoint]')) {
    return {
      ping: async () => 'PONG',
      get: async () => null,
      set: async () => 'OK',
      del: async () => 1,
      exists: async () => 0,
      ttl: async () => -1,
      expire: async () => 1,
      disconnect: async () => {},
    } as any
  }

  return new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })
}

export const redis = globalForRedis.redis ?? createRedisInstance()

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
  } catch {
    const responseTime = Date.now() - startTime
    return { status: 'disconnected', responseTime }
  }
}
