import { z } from 'zod'
import { Database } from './database'

// User types
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

// Campaign types
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type CampaignInsert = Database['public']['Tables']['campaigns']['Insert']
export type CampaignUpdate = Database['public']['Tables']['campaigns']['Update']

// Content types
export type ContentItem = Database['public']['Tables']['content_collection']['Row']
export type ContentInsert = Database['public']['Tables']['content_collection']['Insert']
export type ContentUpdate = Database['public']['Tables']['content_collection']['Update']

// Social account types
export type SocialAccount = Database['public']['Tables']['social_accounts']['Row']
export type SocialAccountInsert = Database['public']['Tables']['social_accounts']['Insert']
export type SocialAccountUpdate = Database['public']['Tables']['social_accounts']['Update']

// Schedule types
export type Schedule = Database['public']['Tables']['schedules']['Row']
export type ScheduleInsert = Database['public']['Tables']['schedules']['Insert']
export type ScheduleUpdate = Database['public']['Tables']['schedules']['Update']

// Law of Attraction types
export type LawOfAttractionAnalysis = Database['public']['Tables']['law_of_attraction_analyses']['Row']
export type LawOfAttractionInsert = Database['public']['Tables']['law_of_attraction_analyses']['Insert']
export type LawOfAttractionUpdate = Database['public']['Tables']['law_of_attraction_analyses']['Update']

// Blog types
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form validation schemas
export const userUpdateSchema = z.object({
  full_name: z.string().min(1, 'Full name is required').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Must be a valid URL').optional(),
  social_links: z.record(z.string()).optional(),
})

export const campaignCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['email', 'social', 'multi-channel']),
  target_audience: z.record(z.any()).optional(),
  budget: z.number().positive('Budget must be positive').optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
})

export const contentCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['text', 'image', 'video', 'document']),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
})

export const scheduleCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['campaign', 'content', 'meeting', 'reminder']),
  scheduled_for: z.string().datetime(),
  timezone: z.string(),
  is_recurring: z.boolean().default(false),
  recurrence_pattern: z.record(z.any()).optional(),
})

export const lawOfAttractionFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  marketingGoals: z.string().min(1, 'Marketing goals are required'),
  currentChannels: z.array(z.string()).min(1, 'At least one channel is required'),
  brandTone: z.string().min(1, 'Brand tone is required'),
  contentType: z.string().min(1, 'Content type is required'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  successMetrics: z.string().min(1, 'Success metrics are required'),
})

export const socialAccountConnectSchema = z.object({
  platform: z.enum(['twitter', 'facebook', 'instagram', 'linkedin', 'youtube']),
  access_token: z.string().min(1, 'Access token is required'),
  refresh_token: z.string().optional(),
  account_id: z.string().min(1, 'Account ID is required'),
  username: z.string().min(1, 'Username is required'),
  display_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
})

// Campaign flow types
export interface CampaignNode {
  id: string
  type: 'trigger' | 'email' | 'social' | 'condition' | 'delay' | 'audience' | 'action'
  status: 'active' | 'draft' | 'completed' | 'scheduled'
  title: string
  description?: string
  position: { x: number; y: number }
  data: Record<string, any>
  connections: string[]
}

export interface CampaignFlowData {
  nodes: CampaignNode[]
  connections: Array<{
    id: string
    from: string
    to: string
    condition?: string
  }>
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}
