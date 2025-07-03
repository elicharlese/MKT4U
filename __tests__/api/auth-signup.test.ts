import { createMocks } from 'node-mocks-http'
import { POST } from '@/api/auth/signup/route'

// Mock Supabase
const mockSupabase = {
  auth: {
    signUp: jest.fn(),
  },
}

jest.mock('@/lib/supabase', () => ({
  createClient: () => mockSupabase,
}))

describe('/api/auth/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new user successfully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      user_metadata: { name: 'Test User' },
    }

    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: mockUser, session: null },
      error: null,
    })

    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.user).toEqual(mockUser)
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      options: {
        data: {
          name: 'Test User',
        },
      },
    })
  })

  it('should return 400 for invalid email', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid input data')
  })

  it('should return 400 for weak password', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: '123',
        name: 'Test User',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid input data')
  })

  it('should return 400 for missing name', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Invalid input data')
  })

  it('should handle Supabase errors', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'User already exists' },
    })

    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('User already exists')
  })

  it('should handle unexpected errors', async () => {
    mockSupabase.auth.signUp.mockRejectedValue(new Error('Database connection error'))

    const { req } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })
})
