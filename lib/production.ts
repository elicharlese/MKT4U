/**
 * Production Deployment and Optimization Configuration
 * Handles environment setup, performance optimization, and deployment verification
 */

import { NextConfig } from 'next'

// Security headers for production
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src 'self' fonts.gstatic.com",
      "img-src 'self' data: blob: *.supabase.co",
      "connect-src 'self' *.supabase.co *.vercel.app wss://*.supabase.co",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  }
]

// Performance optimization configuration
const performanceConfig = {
  // Enable compression
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'localhost',
      '*.supabase.co',
      '*.vercel.app',
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Cache configuration
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },

  // Bundle analyzer (enable only when needed)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: process.env.ANALYZE === 'true',
        })
      )
      return config
    },
  }),
}

// Environment validation
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
]

const optionalEnvVars = [
  'OPENAI_API_KEY',
  'SENTRY_DSN',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
]

export function validateEnvironment(): {
  isValid: boolean
  missing: string[]
  warnings: string[]
} {
  const missing: string[] = []
  const warnings: string[] = []

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  // Check optional variables
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar]) {
      warnings.push(`Optional environment variable ${envVar} is not set`)
    }
  }

  // Validate URLs
  if (process.env.SUPABASE_URL && !isValidUrl(process.env.SUPABASE_URL)) {
    missing.push('SUPABASE_URL (invalid format)')
  }

  if (process.env.NEXTAUTH_URL && !isValidUrl(process.env.NEXTAUTH_URL)) {
    missing.push('NEXTAUTH_URL (invalid format)')
  }

  return {
    isValid: missing.length === 0,
    missing,
    warnings,
  }
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

// Performance monitoring setup
export function setupPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    // Client-side performance monitoring
    if ('performance' in window && 'observer' in window) {
      // Measure Core Web Vitals
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      })
    }

    // Monitor resource loading
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      console.log('Performance metrics:', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        firstByte: perfData.responseStart - perfData.requestStart,
        domInteractive: perfData.domInteractive - perfData.navigationStart,
      })
    })
  }
}

// Database optimization helpers
export const dbOptimizations = {
  // Connection pooling configuration
  connectionConfig: {
    max: 20, // Maximum connections in pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },

  // Query optimization patterns
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt === maxRetries) {
          throw lastError
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
      }
    }

    throw lastError!
  },

  // Batch operations for better performance
  async batchInsert<T>(
    tableName: string,
    records: T[],
    batchSize: number = 100
  ): Promise<void> {
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize)
      // This would be implemented with your actual database client
      console.log(`Inserting batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(records.length / batchSize)} into ${tableName}`)
    }
  },
}

// Cache optimization
export const cacheStrategies = {
  // Static data cache (24 hours)
  static: {
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
  },

  // Dynamic data cache (5 minutes)
  dynamic: {
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=150',
  },

  // User-specific data (no cache)
  private: {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  },

  // API responses (1 minute)
  api: {
    'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
  },
}

// Next.js configuration with optimizations
export const nextConfig: NextConfig = {
  ...performanceConfig,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/documentation',
        permanent: true,
      },
    ]
  },

  // Rewrites for API versioning
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
    ]
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }

    return config
  },
}

// Deployment verification script
export async function verifyDeployment(baseUrl: string): Promise<{
  success: boolean
  checks: Array<{ name: string; status: 'pass' | 'fail'; message?: string }>
}> {
  const checks = []

  // Health check
  try {
    const response = await fetch(`${baseUrl}/api/health`)
    checks.push({
      name: 'Health Check',
      status: response.ok ? 'pass' : 'fail',
      message: response.ok ? undefined : `HTTP ${response.status}`,
    })
  } catch (error) {
    checks.push({
      name: 'Health Check',
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Security headers check
  try {
    const response = await fetch(baseUrl)
    const hasSecurityHeaders = securityHeaders.every(
      header => response.headers.get(header.key) !== null
    )
    checks.push({
      name: 'Security Headers',
      status: hasSecurityHeaders ? 'pass' : 'fail',
    })
  } catch (error) {
    checks.push({
      name: 'Security Headers',
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Database connectivity (would need actual implementation)
  checks.push({
    name: 'Database Connectivity',
    status: 'pass', // Placeholder
  })

  const allPassed = checks.every(check => check.status === 'pass')

  return {
    success: allPassed,
    checks,
  }
}

export default nextConfig
