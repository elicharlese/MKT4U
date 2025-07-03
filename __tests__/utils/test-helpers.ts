/**
 * Test utilities for mocking external dependencies
 */

export const createMockSupabaseClient = () => ({
  auth: {
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    getUser: jest.fn(),
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn(),
  })),
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(),
      download: jest.fn(),
      remove: jest.fn(),
      getPublicUrl: jest.fn(),
    })),
  },
  channel: jest.fn(() => ({
    on: jest.fn().mockReturnThis(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  })),
})

export const createMockRequest = (options: {
  method?: string
  body?: any
  headers?: Record<string, string>
  url?: string
}) => {
  const { method = 'GET', body, headers = {}, url = 'http://localhost:3000' } = options
  
  return {
    method,
    url,
    headers: new Headers(headers),
    json: async () => body,
    text: async () => JSON.stringify(body),
    formData: async () => {
      const formData = new FormData()
      if (body) {
        Object.entries(body).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
      }
      return formData
    },
  } as Request
}

export const createMockResponse = (data: any, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  } as Response
}

export const mockFetch = (responses: Array<{ data: any; status?: number }>) => {
  let callCount = 0
  return jest.fn().mockImplementation(() => {
    const response = responses[callCount] || responses[responses.length - 1]
    callCount++
    return Promise.resolve(createMockResponse(response.data, response.status))
  })
}

export const mockDate = (dateString: string) => {
  const mockDate = new Date(dateString)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  return mockDate
}

export const createMockUser = (overrides: Partial<any> = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createMockCampaign = (overrides: Partial<any> = {}) => ({
  id: 'campaign-123',
  title: 'Test Campaign',
  description: 'Test campaign description',
  goal: 10000,
  raised: 0,
  creator_id: 'user-123',
  status: 'active',
  category: 'technology',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createMockContent = (overrides: Partial<any> = {}) => ({
  id: 'content-123',
  title: 'Test Content',
  description: 'Test content description',
  type: 'article',
  user_id: 'user-123',
  status: 'published',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

// Mock environment variables for testing
export const mockEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-role-key',
  DATABASE_URL: 'postgresql://postgres:password@localhost:54322/postgres',
  OPENAI_API_KEY: 'test-openai-key',
  UPSTASH_REDIS_REST_URL: 'http://localhost:6379',
  UPSTASH_REDIS_REST_TOKEN: 'test-redis-token',
  RESEND_API_KEY: 'test-resend-key',
  SENTRY_DSN: 'test-sentry-dsn',
  NEXTAUTH_SECRET: 'test-secret',
  NEXTAUTH_URL: 'http://localhost:3000',
}
