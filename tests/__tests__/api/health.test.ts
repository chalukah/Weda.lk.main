import { GET } from '@/app/api/health/route'
import { prisma } from '@/lib/db'
import { getRedisStatus } from '@/lib/redis'

// Mock the dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}))

jest.mock('@/lib/redis', () => ({
  getRedisStatus: jest.fn(),
}))

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return ok status when all services are healthy', async () => {
    // Mock successful database connection
    ;(prisma.$queryRaw as jest.Mock).mockResolvedValue([])

    // Mock successful Redis connection
    ;(getRedisStatus as jest.Mock).mockResolvedValue({
      status: 'connected',
      responseTime: 50,
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data.database.status).toBe('connected')
    expect(data.redis.status).toBe('connected')
    expect(data.timestamp).toBeDefined()
  })

  it('should return degraded status when database is down', async () => {
    // Mock failed database connection
    ;(prisma.$queryRaw as jest.Mock).mockRejectedValue(new Error('DB Error'))

    // Mock successful Redis connection
    ;(getRedisStatus as jest.Mock).mockResolvedValue({
      status: 'connected',
      responseTime: 50,
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('degraded')
    expect(data.database.status).toBe('disconnected')
    expect(data.redis.status).toBe('connected')
  })

  it('should return down status when all services are down', async () => {
    // Mock failed database connection
    ;(prisma.$queryRaw as jest.Mock).mockRejectedValue(new Error('DB Error'))

    // Mock failed Redis connection
    ;(getRedisStatus as jest.Mock).mockResolvedValue({
      status: 'disconnected',
      responseTime: 1000,
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('down')
    expect(data.database.status).toBe('disconnected')
    expect(data.redis.status).toBe('disconnected')
  })

  it('should handle unexpected errors gracefully', async () => {
    // Mock getRedisStatus to throw an error
    ;(getRedisStatus as jest.Mock).mockRejectedValue(new Error('Unexpected error'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('down')
    expect(data.error).toBe('Internal server error')
  })
})
