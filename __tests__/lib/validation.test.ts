import { validateRequest, handleApiError, ValidationError } from '@/lib/errors'
import { userSchema, createCampaignSchema } from '@/lib/validations'

describe('Error Handling', () => {
  describe('validateRequest', () => {
    it('should validate correct user data', () => {
      const validData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123',
      }

      const result = validateRequest(userSchema, validData)
      expect(result.email).toBe('test@example.com')
      expect(result.name).toBe('Test User')
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'securePassword123',
      }

      expect(() => {
        validateRequest(userSchema, invalidData)
      }).toThrow(ValidationError)
    })

    it('should reject weak password', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'Test User',
        password: '123',
      }

      expect(() => {
        validateRequest(userSchema, invalidData)
      }).toThrow(ValidationError)
    })
  })

  describe('handleApiError', () => {
    it('should handle validation errors', () => {
      const validationError = new Error('Validation failed')
      validationError.name = 'ZodError'

      const response = handleApiError(validationError)
      
      expect(response.status).toBe(400)
    })

    it('should handle authentication errors', () => {
      const authError = new Error('Unauthorized')
      authError.name = 'AuthError'

      const response = handleApiError(authError)
      
      expect(response.status).toBe(500) // Generic error handling
    })

    it('should handle generic errors', () => {
      const genericError = new Error('Something went wrong')

      const response = handleApiError(genericError)
      
      expect(response.status).toBe(500)
    })
  })

  describe('Campaign Validation', () => {
    it('should validate correct campaign data', () => {
      const validCampaign = {
        title: 'Test Campaign',
        description: 'A test campaign description',
        target_audience: 'Tech enthusiasts',
        budget: 1000,
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-31T00:00:00Z',
      }

      const result = validateRequest(createCampaignSchema, validCampaign)
      expect(result.title).toBe('Test Campaign')
      expect(result.budget).toBe(1000)
    })

    it('should reject invalid campaign with empty title', () => {
      const invalidCampaign = {
        title: '',
        description: 'A test campaign description',
        target_audience: 'Tech enthusiasts',
        budget: 1000,
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-31T00:00:00Z',
      }

      expect(() => {
        validateRequest(createCampaignSchema, invalidCampaign)
      }).toThrow(ValidationError)
    })

    it('should reject negative budget', () => {
      const invalidCampaign = {
        title: 'Test Campaign',
        description: 'A test campaign description',
        target_audience: 'Tech enthusiasts',
        budget: -100,
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-31T00:00:00Z',
      }

      expect(() => {
        validateRequest(createCampaignSchema, invalidCampaign)
      }).toThrow(ValidationError)
    })
  })
})
