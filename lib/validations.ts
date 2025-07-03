import { z } from 'zod';

// User schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatar_url: z.string().url().optional(),
  role: z.enum(['user', 'admin', 'guest']).default('user'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar_url: z.string().url().optional(),
});

// Campaign schemas
export const campaignSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed']).default('draft'),
  target_audience: z.string().optional(),
  budget: z.number().min(0).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  metrics: z.record(z.any()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createCampaignSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  target_audience: z.string().optional(),
  budget: z.number().min(0).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
});

export const updateCampaignSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed']).optional(),
  target_audience: z.string().optional(),
  budget: z.number().min(0).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
});

// Content schemas
export const contentSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  campaign_id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  content: z.string(),
  content_type: z.enum(['post', 'story', 'video', 'image', 'article']),
  platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']).optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('draft'),
  scheduled_for: z.string().datetime().optional(),
  published_at: z.string().datetime().optional(),
  metrics: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createContentSchema = z.object({
  campaign_id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  content: z.string(),
  content_type: z.enum(['post', 'story', 'video', 'image', 'article']),
  platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']).optional(),
  scheduled_for: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateContentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).optional(),
  scheduled_for: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
});

// Social Account schemas
export const socialAccountSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']),
  platform_user_id: z.string(),
  username: z.string(),
  display_name: z.string(),
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_at: z.string().datetime().optional(),
  is_active: z.boolean().default(true),
  profile_data: z.record(z.any()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const connectSocialAccountSchema = z.object({
  platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube']),
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_at: z.string().datetime().optional(),
});

// Schedule schemas
export const scheduleEventSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  event_type: z.enum(['reminder', 'meeting', 'content_publish', 'campaign_start', 'campaign_end']),
  start_time: z.string().datetime(),
  end_time: z.string().datetime().optional(),
  timezone: z.string().default('UTC'),
  is_recurring: z.boolean().default(false),
  recurrence_rule: z.string().optional(),
  reminder_minutes: z.number().min(0).optional(),
  metadata: z.record(z.any()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createScheduleEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  event_type: z.enum(['reminder', 'meeting', 'content_publish', 'campaign_start', 'campaign_end']),
  start_time: z.string().datetime(),
  end_time: z.string().datetime().optional(),
  timezone: z.string().default('UTC'),
  is_recurring: z.boolean().default(false),
  recurrence_rule: z.string().optional(),
  reminder_minutes: z.number().min(0).optional(),
  metadata: z.record(z.any()).optional(),
});

// Law of Attraction schemas
export const lawOfAttractionFormSchema = z.object({
  goals: z.string().min(1).max(1000),
  current_situation: z.string().min(1).max(1000),
  desired_outcome: z.string().min(1).max(1000),
  limiting_beliefs: z.string().optional(),
  affirmations: z.array(z.string()).optional(),
  visualization_description: z.string().optional(),
  timeline: z.string().optional(),
});

export const lawOfAttractionResultSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  form_data: lawOfAttractionFormSchema,
  analysis: z.string(),
  recommendations: z.array(z.string()),
  affirmations: z.array(z.string()),
  action_steps: z.array(z.string()),
  score: z.number().min(0).max(100),
  created_at: z.string().datetime(),
});

// API Response schemas
export const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
  timestamp: z.string().datetime(),
});

export const apiSuccessSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }).optional(),
});

// Pagination schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Search schemas
export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.record(z.string()).optional(),
}).merge(paginationSchema);

// Export types
export type User = z.infer<typeof userSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type Campaign = z.infer<typeof campaignSchema>;
export type CreateCampaign = z.infer<typeof createCampaignSchema>;
export type UpdateCampaign = z.infer<typeof updateCampaignSchema>;
export type Content = z.infer<typeof contentSchema>;
export type CreateContent = z.infer<typeof createContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;
export type SocialAccount = z.infer<typeof socialAccountSchema>;
export type ConnectSocialAccount = z.infer<typeof connectSocialAccountSchema>;
export type ScheduleEvent = z.infer<typeof scheduleEventSchema>;
export type CreateScheduleEvent = z.infer<typeof createScheduleEventSchema>;
export type LawOfAttractionForm = z.infer<typeof lawOfAttractionFormSchema>;
export type LawOfAttractionResult = z.infer<typeof lawOfAttractionResultSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type ApiSuccess = z.infer<typeof apiSuccessSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type Search = z.infer<typeof searchSchema>;
