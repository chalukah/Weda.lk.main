import { prisma } from '@/lib/db'

// Mock the PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}))

describe('Database Client', () => {
  it('should export prisma client', () => {
    expect(prisma).toBeDefined()
  })

  it('should have user model methods', () => {
    expect(prisma.user).toBeDefined()
    expect(prisma.user.findUnique).toBeDefined()
    expect(prisma.user.create).toBeDefined()
    expect(prisma.user.update).toBeDefined()
    expect(prisma.user.delete).toBeDefined()
  })
})
