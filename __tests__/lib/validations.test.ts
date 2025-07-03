import { validateSignupData, validateSigninData, validateCampaignData } from '@/lib/validations'

describe('Validation Functions', () => {
  describe('validateSignupData', () => {
    it('should validate correct signup data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
        name: 'John Doe',
      }

      const result = validateSignupData(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'StrongPassword123!',
        name: 'John Doe',
      }

      const result = validateSignupData(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject weak password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
        name: 'John Doe',
      }

      const result = validateSignupData(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing name', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
      }

      const result = validateSignupData(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('validateSigninData', () => {
    it('should validate correct signin data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = validateSigninData(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }

      const result = validateSigninData(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing password', () => {
      const invalidData = {
        email: 'test@example.com',
      }

      const result = validateSigninData(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('validateCampaignData', () => {
    it('should validate correct campaign data', () => {
      const validData = {
        title: 'Test Campaign',
        description: 'This is a test campaign description',
        goal: 10000,
        category: 'technology',
        duration: 30,
      }

      const result = validateCampaignData(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('should reject invalid goal amount', () => {
      const invalidData = {
        title: 'Test Campaign',
        description: 'This is a test campaign description',
        goal: -100,
        category: 'technology',
        duration: 30,
      }

      const result = validateCampaignData(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid category', () => {
      const invalidData = {
        title: 'Test Campaign',
        description: 'This is a test campaign description',
        goal: 10000,
        category: 'invalid-category',
        duration: 30,
      }

      const result = validateCampaignData(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short title', () => {
      const invalidData = {
        title: 'T',
        description: 'This is a test campaign description',
        goal: 10000,
        category: 'technology',
        duration: 30,
      }

      const result = validateCampaignData(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
