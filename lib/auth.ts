import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { AuthenticationError, AuthorizationError } from './errors';

// Initialize Supabase client for server-side operations
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export type UserRole = 'user' | 'admin' | 'guest';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar_url?: string;
}

/**
 * Extract and verify JWT token from request
 */
export async function verifyAuthToken(request: NextRequest): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Missing or invalid authorization header');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Verify JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new AuthenticationError('Invalid or expired token');
    }

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, role, name, avatar_url')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // If profile doesn't exist, create basic user info
      return {
        id: user.id,
        email: user.email || '',
        role: 'user',
      };
    }

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role as UserRole,
      name: profile.name || undefined,
      avatar_url: profile.avatar_url || undefined,
    };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('Token verification failed');
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthenticatedUser, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    user: 1,
    admin: 2,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Require authentication middleware
 */
export function requireAuth() {
  return async (request: NextRequest): Promise<AuthenticatedUser> => {
    const user = await verifyAuthToken(request);
    return user;
  };
}

/**
 * Require specific role middleware
 */
export function requireRole(role: UserRole) {
  return async (request: NextRequest): Promise<AuthenticatedUser> => {
    const user = await verifyAuthToken(request);
    
    if (!hasRole(user, role)) {
      throw new AuthorizationError(`Insufficient permissions. Required role: ${role}`);
    }
    
    return user;
  };
}

/**
 * Optional authentication middleware
 */
export async function optionalAuth(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    return await verifyAuthToken(request);
  } catch (error) {
    // Return null if authentication fails (optional auth)
    return null;
  }
}

/**
 * Check if user owns resource
 */
export async function checkResourceOwnership(
  userId: string,
  resourceType: string,
  resourceId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(resourceType)
      .select('user_id')
      .eq('id', resourceId)
      .single();

    if (error || !data) {
      return false;
    }

    return data.user_id === userId;
  } catch (error) {
    console.error('Resource ownership check failed:', error);
    return false;
  }
}

/**
 * Require resource ownership middleware
 */
export function requireOwnership(resourceType: string) {
  return async (request: NextRequest, resourceId: string): Promise<AuthenticatedUser> => {
    const user = await verifyAuthToken(request);
    
    // Admins can access any resource
    if (user.role === 'admin') {
      return user;
    }
    
    const ownsResource = await checkResourceOwnership(user.id, resourceType, resourceId);
    
    if (!ownsResource) {
      throw new AuthorizationError('You do not have permission to access this resource');
    }
    
    return user;
  };
}

/**
 * Get user session from request
 */
export async function getSession(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    return await verifyAuthToken(request);
  } catch (error) {
    return null;
  }
}

/**
 * Create user session response headers
 */
export function createSessionHeaders(user: AuthenticatedUser): Record<string, string> {
  return {
    'X-User-ID': user.id,
    'X-User-Role': user.role,
    'X-User-Email': user.email,
  };
}

/**
 * Middleware composer for API routes
 */
export function withMiddleware(...middlewares: Array<(request: NextRequest) => Promise<any>>) {
  return async (request: NextRequest): Promise<any[]> => {
    const results = [];
    
    for (const middleware of middlewares) {
      const result = await middleware(request);
      results.push(result);
    }
    
    return results;
  };
}

/**
 * API route wrapper with authentication and error handling
 */
export function createApiHandler<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  middlewares: Array<(request: NextRequest) => Promise<any>> = []
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      // Run middlewares
      const middlewareResults = [];
      for (const middleware of middlewares) {
        const result = await middleware(request);
        middlewareResults.push(result);
      }
      
      // Call the actual handler
      return await handler(request, ...middlewareResults as T);
    } catch (error) {
      // Error handling is done in the errors.ts file
      throw error;
    }
  };
}
