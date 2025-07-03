import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';
import { RateLimitError } from './errors';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limit configurations
export const rateLimitConfigs = {
  // API endpoints
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
    analytics: true,
  }),
  
  // Authentication endpoints (more restrictive)
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
    analytics: true,
  }),

  // File upload endpoints
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 uploads per minute
    analytics: true,
  }),

  // AI/OpenAI endpoints (very restrictive)
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 h'), // 30 requests per hour
    analytics: true,
  }),

  // Search endpoints
  search: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '1 m'), // 50 searches per minute
    analytics: true,
  }),

  // Blockchain endpoints
  blockchain: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 blockchain calls per minute
    analytics: true,
  }),
};

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: NextRequest): string {
  // Try to get user ID from session/auth
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    // Extract user ID from JWT or session token if available
    // This is a simplified version - implement according to your auth system
    try {
      // Placeholder for extracting user ID from auth token
      const userId = extractUserIdFromAuth(authHeader);
      if (userId) return `user:${userId}`;
    } catch (error) {
      // Fall back to IP-based limiting
    }
  }

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return `ip:${ip}`;
}

/**
 * Extract user ID from authorization header
 * This is a placeholder - implement according to your auth system
 */
function extractUserIdFromAuth(authHeader: string): string | null {
  try {
    // Remove 'Bearer ' prefix if present
    const token = authHeader.replace(/^Bearer\s+/, '');
    
    // Implement JWT decoding or session lookup here
    // For now, return null to fall back to IP-based limiting
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Apply rate limiting to a request
 */
export async function applyRateLimit(
  request: NextRequest,
  limitType: keyof typeof rateLimitConfigs = 'api'
): Promise<void> {
  const identifier = getClientIdentifier(request);
  const ratelimit = rateLimitConfigs[limitType];
  
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
    
    if (!success) {
      throw new RateLimitError(
        `Rate limit exceeded. Limit: ${limit}, Remaining: ${remaining}, Reset: ${new Date(reset)}`
      );
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }
    
    // Log the error but don't fail the request if rate limiting is down
    console.error('Rate limiting service error:', error);
  }
}

/**
 * Get rate limit status for a request
 */
export async function getRateLimitStatus(
  request: NextRequest,
  limitType: keyof typeof rateLimitConfigs = 'api'
): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
  success: boolean;
}> {
  const identifier = getClientIdentifier(request);
  const ratelimit = rateLimitConfigs[limitType];
  
  try {
    const result = await ratelimit.limit(identifier);
    return {
      limit: result.limit,
      remaining: result.remaining,
      reset: new Date(result.reset),
      success: result.success,
    };
  } catch (error) {
    console.error('Rate limiting status check error:', error);
    // Return permissive values if service is down
    return {
      limit: 100,
      remaining: 100,
      reset: new Date(Date.now() + 60000), // 1 minute from now
      success: true,
    };
  }
}

/**
 * Middleware helper for rate limiting
 */
export function withRateLimit(limitType: keyof typeof rateLimitConfigs = 'api') {
  return async (request: NextRequest) => {
    await applyRateLimit(request, limitType);
  };
}

/**
 * Custom rate limit for specific use cases
 */
export async function customRateLimit(
  identifier: string,
  requests: number,
  window: string
): Promise<boolean> {
  const customRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
  });

  try {
    const { success } = await customRateLimit.limit(identifier);
    return success;
  } catch (error) {
    console.error('Custom rate limiting error:', error);
    return true; // Allow request if rate limiting fails
  }
}
