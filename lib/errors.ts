import { NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { ApiError } from '@/lib/validations';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service error') {
    super(message, 502);
  }
}

/**
 * Format error response for API
 */
export function formatErrorResponse(error: unknown): ApiError {
  const timestamp = new Date().toISOString();

  // Handle known application errors
  if (error instanceof AppError) {
    return {
      error: error.constructor.name,
      message: error.message,
      statusCode: error.statusCode,
      timestamp,
    };
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map(err => {
      const path = err.path.join('.');
      return `${path}: ${err.message}`;
    }).join(', ');

    return {
      error: 'ValidationError',
      message: errorMessages,
      statusCode: 400,
      timestamp,
    };
  }

  // Handle standard errors
  if (error instanceof Error) {
    return {
      error: 'InternalServerError',
      message: process.env.NODE_ENV === 'production' 
        ? 'An internal server error occurred' 
        : error.message,
      statusCode: 500,
      timestamp,
    };
  }

  // Handle unknown errors
  return {
    error: 'UnknownError',
    message: 'An unknown error occurred',
    statusCode: 500,
    timestamp,
  };
}

/**
 * Global error handler for API routes
 */
export function handleApiError(error: unknown): NextResponse<ApiError> {
  const errorResponse = formatErrorResponse(error);
  
  // Log error for monitoring
  console.error('API Error:', {
    error: errorResponse,
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(errorResponse, { 
    status: errorResponse.statusCode 
  });
}

/**
 * Success response helper
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    pagination,
  });
}

/**
 * Async error wrapper for API handlers
 */
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse> => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

/**
 * Rate limiting check
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): Promise<boolean> {
  // Implementation would depend on your rate limiting solution
  // This is a placeholder that should be implemented with Redis or similar
  try {
    // Implement rate limiting logic here
    return true;
  } catch (error) {
    console.error('Rate limiting check failed:', error);
    return false;
  }
}

/**
 * Middleware for validating request data
 */
export function validateRequest<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}
