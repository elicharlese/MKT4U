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

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * POST /api/auth/signin
 * Authenticate user and return session
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await applyRateLimit(request, 'auth');

    const body = await request.json();
    const validatedData = validateRequest(signInSchema, body);
    const { email, password } = validatedData;

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!authData.user || !authData.session) {
      throw new AuthenticationError('Authentication failed');
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, full_name, role, avatar_url')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      throw new AuthenticationError('User profile not found');
    }

    return createSuccessResponse(
      {
        user: {
          id: profile.id,
          email: profile.email,
          name: profile.full_name,
          role: profile.role,
          avatar_url: profile.avatar_url,
        },
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at,
        },
      },
      'Sign in successful'
    );
  } catch (error) {
    return handleApiError(error);
  }
}
