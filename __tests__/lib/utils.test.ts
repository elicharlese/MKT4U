import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('btn', 'btn-primary', 'text-white')
      expect(typeof result).toBe('string')
      expect(result).toContain('btn')
      expect(result).toContain('btn-primary')
      expect(result).toContain('text-white')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('btn', isActive && 'active', 'base-class')
      expect(result).toContain('btn')
      expect(result).toContain('active')
      expect(result).toContain('base-class')
    })

    it('should handle false conditionals', () => {
      const isActive = false
      const result = cn('btn', isActive && 'active', 'base-class')
      expect(result).toContain('btn')
      expect(result).not.toContain('active')
      expect(result).toContain('base-class')
    })

    it('should handle undefined and null values', () => {
      const result = cn('btn', undefined, null, 'valid-class')
      expect(result).toContain('btn')
      expect(result).toContain('valid-class')
    })

    it('should merge conflicting Tailwind classes', () => {
      // Test that clsx + tailwind-merge work together
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toContain('px-4') // Should keep the last px value
      expect(result).toContain('py-1')
    })
  })
})
