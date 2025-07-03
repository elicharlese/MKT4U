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
import { requireOwnership } from '@/lib/auth';
import { applyRateLimit } from '@/lib/rate-limit';
import { updateCampaignSchema } from '@/lib/validations';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/campaigns/[id]
 * Get a specific campaign
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await applyRateLimit(request);
    const user = await requireOwnership('campaigns')(request, params.id);

    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      throw new NotFoundError('Campaign not found');
    }

    return createSuccessResponse(data, 'Campaign retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/campaigns/[id]
 * Update a specific campaign
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await applyRateLimit(request);
    const user = await requireOwnership('campaigns')(request, params.id);

    const body = await request.json();
    const validatedData = validateRequest(updateCampaignSchema, body);

    const { data, error } = await supabase
      .from('campaigns')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      throw new ValidationError(error.message);
    }

    return createSuccessResponse(data, 'Campaign updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/campaigns/[id]
 * Delete a specific campaign
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await applyRateLimit(request);
    const user = await requireOwnership('campaigns')(request, params.id);

    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', params.id);

    if (error) {
      throw new ValidationError(error.message);
    }

    return createSuccessResponse(null, 'Campaign deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
