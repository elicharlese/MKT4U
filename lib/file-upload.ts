import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface UploadOptions {
  bucket: string;
  folder?: string;
  fileName?: string;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<UploadResult> {
  // Validate file type
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }

  // Validate file size
  if (options.maxSize && file.size > options.maxSize) {
    throw new Error(`File size exceeds ${options.maxSize} bytes`);
  }

  // Generate file path
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2);
  const fileExtension = file.name.split('.').pop();
  const fileName = options.fileName || 
    `${timestamp}_${randomSuffix}.${fileExtension}`;
  
  const filePath = options.folder 
    ? `${options.folder}/${fileName}`
    : fileName;

  // Upload file
  const { data, error } = await supabase.storage
    .from(options.bucket)
    .upload(filePath, file);

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(options.bucket)
    .getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
    size: file.size,
    type: file.type,
  };
}

/**
 * Upload avatar image
 */
export async function uploadAvatar(file: File, userId: string): Promise<UploadResult> {
  return uploadFile(file, {
    bucket: 'avatars',
    folder: 'users',
    fileName: `${userId}_${Date.now()}.${file.name.split('.').pop()}`,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxSize: 5 * 1024 * 1024, // 5MB
  });
}

/**
 * Upload campaign asset
 */
export async function uploadCampaignAsset(
  file: File, 
  campaignId: string
): Promise<UploadResult> {
  return uploadFile(file, {
    bucket: 'campaigns',
    folder: campaignId,
    allowedTypes: [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm',
      'application/pdf',
      'text/plain',
    ],
    maxSize: 50 * 1024 * 1024, // 50MB
  });
}

/**
 * Upload content media
 */
export async function uploadContentMedia(
  file: File,
  userId: string
): Promise<UploadResult> {
  return uploadFile(file, {
    bucket: 'content',
    folder: `user_${userId}`,
    allowedTypes: [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mpeg', 'audio/wav',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSize: 100 * 1024 * 1024, // 100MB
  });
}

/**
 * Delete file from storage
 */
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete file error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete file failed:', error);
    return false;
  }
}

/**
 * Get signed URL for private file access
 */
export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

/**
 * List files in a folder
 */
export async function listFiles(
  bucket: string,
  folder?: string,
  limit: number = 100
): Promise<Array<{
  name: string;
  size: number;
  url: string;
  lastModified: Date;
}>> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      limit,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    throw new Error(`Failed to list files: ${error.message}`);
  }

  return data.map(file => ({
    name: file.name,
    size: file.metadata?.size || 0,
    url: supabase.storage.from(bucket).getPublicUrl(
      folder ? `${folder}/${file.name}` : file.name
    ).data.publicUrl,
    lastModified: new Date(file.updated_at || file.created_at),
  }));
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  bucket: string,
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  
  // If Supabase supports image transformations, add them here
  // For now, return the original URL
  // In production, you might want to use a service like Cloudinary or ImageKit
  
  return data.publicUrl;
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSize: number
): { isValid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`
    };
  }

  return { isValid: true };
}

/**
 * Convert file to base64 for preview
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
