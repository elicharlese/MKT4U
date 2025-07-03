import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { 
  handleApiError, 
  createSuccessResponse, 
  NotFoundError,
  ValidationError 
} from '@/lib/errors';
import { validateRequest } from '@/lib/errors';
import { requireAuth } from '@/lib/auth';
import { applyRateLimit } from '@/lib/rate-limit';
import { createCampaignSchema, updateCampaignSchema, paginationSchema } from '@/lib/validations';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/campaigns
 * Get all campaigns for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    await applyRateLimit(request);
    const user = await requireAuth()(request);

    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);
    const paginationData = validateRequest(paginationSchema, params);
    const { page = 1, limit = 10, sortBy, sortOrder = 'desc' } = paginationData;

    const offset = (page - 1) * limit;

    let query = supabase
      .from('campaigns')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .range(offset, offset + limit - 1);

    // Apply sorting
    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query;

    if (error) {
      throw new ValidationError(error.message);
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return createSuccessResponse(
      data,
      'Campaigns retrieved successfully',
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
 * POST /api/campaigns
 * Create a new campaign
 */
export async function POST(request: NextRequest) {
  try {
    await applyRateLimit(request);
    const user = await requireAuth()(request);

    const body = await request.json();
    const validatedData = validateRequest(createCampaignSchema, body);

    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        ...validatedData,
        user_id: user.id,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      throw new ValidationError(error.message);
    }

    return createSuccessResponse(data, 'Campaign created successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
