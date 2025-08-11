import { testRedisConnection, getRedisStatus } from '@/lib/redis'

// Mock ioredis
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    ping: jest.fn().mockResolvedValue('PONG'),
    disconnect: jest.fn(),
  }))
})

describe('Redis Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('testRedisConnection', () => {
    it('should return true when Redis is connected', async () => {
      const result = await testRedisConnection()
      expect(result).toBe(true)
    })

    it('should return false when Redis connection fails', async () => {
      const Redis = require('ioredis')
      const mockInstance = new Redis()
      mockInstance.ping.mockRejectedValue(new Error('Connection failed'))

      const result = await testRedisConnection()
      expect(result).toBe(false)
    })
  })

  describe('getRedisStatus', () => {
    it('should return connected status with response time', async () => {
      const result = await getRedisStatus()

      expect(result.status).toBe('connected')
      expect(typeof result.responseTime).toBe('number')
      expect(result.responseTime).toBeGreaterThanOrEqual(0)
    })

    it('should return disconnected status when Redis fails', async () => {
      const Redis = require('ioredis')
      const mockInstance = new Redis()
      mockInstance.ping.mockRejectedValue(new Error('Connection failed'))

      const result = await getRedisStatus()

      expect(result.status).toBe('disconnected')
      expect(typeof result.responseTime).toBe('number')
    })
  })
})
