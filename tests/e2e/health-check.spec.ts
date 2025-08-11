import { test, expect } from '@playwright/test'

test.describe('Health Check Endpoint', () => {
  test('should respond with health status', async ({ page }) => {
    // Navigate to the health check endpoint
    const response = await page.goto('/api/health')

    // Check that the response is successful
    expect(response?.status()).toBe(200)

    // Parse the response body
    const healthData = await response?.json()

    // Verify the response structure
    expect(healthData).toHaveProperty('status')
    expect(healthData).toHaveProperty('database')
    expect(healthData).toHaveProperty('redis')
    expect(healthData).toHaveProperty('timestamp')

    // Check that status is one of the expected values
    expect(['ok', 'degraded', 'down']).toContain(healthData.status)

    // Check database status structure
    expect(healthData.database).toHaveProperty('status')
    expect(healthData.database).toHaveProperty('responseTime')
    expect(['connected', 'disconnected']).toContain(healthData.database.status)
    expect(typeof healthData.database.responseTime).toBe('number')

    // Check redis status structure
    expect(healthData.redis).toHaveProperty('status')
    expect(healthData.redis).toHaveProperty('responseTime')
    expect(['connected', 'disconnected']).toContain(healthData.redis.status)
    expect(typeof healthData.redis.responseTime).toBe('number')

    // Check timestamp
    expect(typeof healthData.timestamp).toBe('string')
    expect(new Date(healthData.timestamp)).toBeInstanceOf(Date)
  })

  test('should be accessible from browser', async ({ page }) => {
    await page.goto('/api/health')

    // Check that the page loads without errors
    const content = await page.textContent('body')
    expect(content).toContain('status')
    expect(content).toContain('database')
    expect(content).toContain('redis')
  })
})
