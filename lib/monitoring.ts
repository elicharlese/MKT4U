/**
 * Application Monitoring and Logging Utilities
 * Provides centralized logging, error tracking, and performance monitoring
 */

import { NextRequest, NextResponse } from 'next/server'

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production'
const isDebug = process.env.DEBUG === 'true'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  error?: Error
  requestId?: string
  userId?: string
  userAgent?: string
  ip?: string
}

export class Logger {
  private static instance: Logger
  private requestIdCounter = 0

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  generateRequestId(): string {
    return `req_${Date.now()}_${++this.requestIdCounter}`
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, error, requestId, userId } = entry
    
    const logObj = {
      timestamp,
      level: LogLevel[level],
      message,
      ...(requestId && { requestId }),
      ...(userId && { userId }),
      ...(context && { context }),
      ...(error && { 
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      }),
    }

    return JSON.stringify(logObj)
  }

  private shouldLog(level: LogLevel): boolean {
    if (isDebug) return true
    if (isProduction) return level >= LogLevel.WARN
    return level >= LogLevel.INFO
  }

  private writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return

    const formatted = this.formatLog(entry)
    
    switch (entry.level) {
      case LogLevel.DEBUG:
      case LogLevel.INFO:
        console.log(formatted)
        break
      case LogLevel.WARN:
        console.warn(formatted)
        break
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formatted)
        break
    }

    // In production, also send to external monitoring service
    if (isProduction) {
      this.sendToMonitoring(entry)
    }
  }

  private async sendToMonitoring(entry: LogEntry): Promise<void> {
    // Integration with monitoring services (Sentry, DataDog, etc.)
    try {
      if (process.env.SENTRY_DSN && (entry.level >= LogLevel.ERROR || entry.error)) {
        // Send to Sentry (pseudo-code - would need actual Sentry SDK)
        // Sentry.captureException(entry.error || new Error(entry.message), {
        //   level: entry.level >= LogLevel.ERROR ? 'error' : 'warning',
        //   contexts: { custom: entry.context },
        //   user: { id: entry.userId },
        //   tags: { requestId: entry.requestId },
        // })
      }

      if (process.env.WEBHOOK_URL) {
        // Send to webhook for custom monitoring
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        })
      }
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error)
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context,
    })
  }

  info(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context,
    })
  }

  warn(message: string, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context,
    })
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      error,
      context,
    })
  }

  fatal(message: string, error?: Error, context?: Record<string, any>): void {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.FATAL,
      message,
      error,
      context,
    })
  }

  // Request-specific logging
  logRequest(
    request: NextRequest,
    context?: Record<string, any>
  ): { requestId: string; startTime: number } {
    const requestId = this.generateRequestId()
    const startTime = Date.now()
    
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message: `${request.method} ${request.url}`,
      requestId,
      context: {
        method: request.method,
        url: request.url,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        ...context,
      },
    })

    return { requestId, startTime }
  }

  logResponse(
    requestId: string,
    startTime: number,
    response: NextResponse,
    context?: Record<string, any>
  ): void {
    const duration = Date.now() - startTime
    
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: response.status >= 400 ? LogLevel.WARN : LogLevel.INFO,
      message: `Response ${response.status} (${duration}ms)`,
      requestId,
      context: {
        status: response.status,
        duration,
        ...context,
      },
    })
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map()

  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    
    const values = this.metrics.get(name)!
    values.push(value)
    
    // Keep only last 100 values to prevent memory leak
    if (values.length > 100) {
      values.shift()
    }
  }

  static getMetrics(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, any> = {}
    
    for (const [name, values] of this.metrics) {
      if (values.length === 0) continue
      
      const sum = values.reduce((a, b) => a + b, 0)
      result[name] = {
        avg: sum / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length,
      }
    }
    
    return result
  }

  static async measureAsync<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = Date.now()
    try {
      const result = await fn()
      this.recordMetric(name, Date.now() - start)
      return result
    } catch (error) {
      this.recordMetric(`${name}_error`, Date.now() - start)
      throw error
    }
  }

  static measure<T>(name: string, fn: () => T): T {
    const start = Date.now()
    try {
      const result = fn()
      this.recordMetric(name, Date.now() - start)
      return result
    } catch (error) {
      this.recordMetric(`${name}_error`, Date.now() - start)
      throw error
    }
  }
}

// Health check utilities
export class HealthChecker {
  private static checks: Map<string, () => Promise<boolean>> = new Map()

  static registerCheck(name: string, check: () => Promise<boolean>): void {
    this.checks.set(name, check)
  }

  static async runChecks(): Promise<Record<string, { status: 'healthy' | 'unhealthy'; timestamp: string }>> {
    const results: Record<string, any> = {}
    
    for (const [name, check] of this.checks) {
      try {
        const isHealthy = await check()
        results[name] = {
          status: isHealthy ? 'healthy' : 'unhealthy',
          timestamp: new Date().toISOString(),
        }
      } catch (error) {
        results[name] = {
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
        }
      }
    }
    
    return results
  }
}

// Middleware for request logging
export function withLogging<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const logger = Logger.getInstance()
    
    try {
      const result = await fn(...args)
      return result
    } catch (error) {
      logger.error(
        `Function ${fn.name} failed`,
        error instanceof Error ? error : new Error(String(error))
      )
      throw error
    }
  }
}

// Export singleton logger instance
export const logger = Logger.getInstance()

// Default health checks
HealthChecker.registerCheck('database', async () => {
  try {
    // This would check database connectivity
    // const { data } = await supabase.from('users').select('id').limit(1)
    // return !!data
    return true // Placeholder
  } catch {
    return false
  }
})

HealthChecker.registerCheck('memory', async () => {
  const usage = process.memoryUsage()
  const heapUsedMB = usage.heapUsed / 1024 / 1024
  return heapUsedMB < 500 // Alert if heap usage > 500MB
})

HealthChecker.registerCheck('uptime', async () => {
  return process.uptime() > 0
})
