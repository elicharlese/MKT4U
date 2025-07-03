import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { 
  handleApiError, 
  createSuccessResponse, 
  AuthenticationError,
  ValidationError 
} from '@/lib/errors';
import { validateRequest } from '@/lib/errors';
import { z } from 'zod';
import { applyRateLimit } from '@/lib/rate-limit';

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Validation schemas
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

const updatePasswordSchema = z.object({
  password: z.string().min(8).max(128),
  access_token: z.string(),
  refresh_token: z.string(),
});

/**
 * POST /api/auth/signup
 * Register a new user
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await applyRateLimit(request, 'auth');

    const body = await request.json();
    const validatedData = validateRequest(signUpSchema, body);
    const { email, password, name } = validatedData;

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      throw new ValidationError(authError.message);
    }

    if (!authData.user) {
      throw new AuthenticationError('Failed to create user');
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: name,
        role: 'user',
      });

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new ValidationError('Failed to create user profile');
    }

    return createSuccessResponse(
      {
        user: {
          id: authData.user.id,
          email,
          name,
          role: 'user',
        },
      },
      'User created successfully'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
