import { NextRequest } from 'next/server'
import { POST } from '@/app/api/auth/signup/route'

// Mock the Supabase client
const mockSupabase = {
  auth: {
    admin: {
      createUser: jest.fn(),
    },
  },
  from: jest.fn(() => ({
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn(),
  })),
}

jest.mock('@/lib/supabase/server', () => ({
  createServerClient: () => mockSupabase,
}))

describe('/api/auth/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'securePassword123',
      name: 'Test User',
    }

    // Mock successful user creation
    mockSupabase.auth.admin.createUser.mockResolvedValue({
      data: { user: { id: 'user-123', email: 'test@example.com' } },
      error: null,
    })

    mockSupabase.from().insert().select().single.mockResolvedValue({
      data: { id: 'profile-123', name: 'Test User' },
      error: null,
    })

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.success).toBe(true)
    expect(result.data.user.email).toBe('test@example.com')
  })

  it('should reject invalid email', async () => {
    const userData = {
      email: 'invalid-email',
      password: 'securePassword123',
      name: 'Test User',
    }

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
  })

  it('should reject weak password', async () => {
    const userData = {
      email: 'test@example.com',
      password: '123',
      name: 'Test User',
    }

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
  })

  it('should handle Supabase errors', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'securePassword123',
      name: 'Test User',
    }

    // Mock Supabase error
    mockSupabase.auth.admin.createUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Email already registered' },
    })

    const request = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(500)
  })
})
