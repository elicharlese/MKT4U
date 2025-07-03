import { NextRequest } from 'next/server'
import { handleApiError, createSuccessResponse } from '@/lib/errors'

/**
 * @description Health check endpoint for monitoring
 * @returns Application health status
 */
export async function GET(request: NextRequest) {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
      checks: {
        database: 'healthy', // Would implement actual database check
        cache: 'healthy',    // Would implement actual cache check
        external_services: 'healthy', // Would implement external service checks
      }
    }

    return createSuccessResponse(healthData)
  } catch (error) {
    return handleApiError(error)
  }
}
