import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { handleApiError, createSuccessResponse, ValidationError } from '@/lib/errors';
import { applyRateLimit } from '@/lib/rate-limit';
import { uploadAvatar } from '@/lib/file-upload';

/**
 * POST /api/upload/avatar
 * Upload user avatar
 */
export async function POST(request: NextRequest) {
  try {
    await applyRateLimit(request, 'upload');
    const user = await requireAuth()(request);

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new ValidationError('No file provided');
    }

    const result = await uploadAvatar(file, user.id);

    // Update user profile with new avatar URL
    // This would be done in a real implementation
    // await updateUserAvatar(user.id, result.url);

    return createSuccessResponse(result, 'Avatar uploaded successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
