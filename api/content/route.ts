import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { 
  handleApiError, 
  createSuccessResponse, 
  ValidationError 
} from '@/lib/errors';
import { validateRequest } from '@/lib/errors';
import { requireAuth } from '@/lib/auth';
import { applyRateLimit } from '@/lib/rate-limit';
import { createContentSchema, paginationSchema, searchSchema } from '@/lib/validations';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/content
 * Get all content for authenticated user with search and pagination
 */
export async function GET(request: NextRequest) {
  try {
    await applyRateLimit(request);
    const user = await requireAuth()(request);

    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    
    const query = params.query;
    const { page = 1, limit = 10, sortBy, sortOrder = 'desc' } = 
      validateRequest(paginationSchema, params);

    const offset = (page - 1) * limit;

    let dbQuery = supabase
      .from('content_collection')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

    // Apply search if query provided
    if (query) {
      dbQuery = dbQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
    }

    // Apply pagination
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    // Apply sorting
    if (sortBy) {
      dbQuery = dbQuery.order(sortBy, { ascending: sortOrder === 'asc' });
    } else {
      dbQuery = dbQuery.order('created_at', { ascending: false });
    }

    const { data, error, count } = await dbQuery;

    if (error) {
      throw new ValidationError(error.message);
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return createSuccessResponse(
      data,
      'Content retrieved successfully',
      {
        page,
        limit,
        total: count || 0,
        totalPages,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/content
 * Create new content
 */
export async function POST(request: NextRequest) {
  try {
    await applyRateLimit(request);
    const user = await requireAuth()(request);

    const body = await request.json();
    const validatedData = validateRequest(createContentSchema, body);

    const { data, error } = await supabase
      .from('content_collection')
      .insert({
        ...validatedData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      throw new ValidationError(error.message);
    }

    return createSuccessResponse(data, 'Content created successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
