import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import AttractionForm from '@/app/law-of-attraction/attraction-form'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock API calls
global.fetch = jest.fn()

describe('AttractionForm Component', () => {
  const mockPush = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    jest.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<AttractionForm />)
    
    expect(screen.getByLabelText(/goal/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/current situation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<AttractionForm />)
    
    const submitButton = screen.getByRole('button', { name: /analyze/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/goal is required/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockResponse = {
      id: 'analysis-123',
      suggestions: ['Practice gratitude', 'Visualize success'],
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    render(<AttractionForm />)
    
    await user.type(screen.getByLabelText(/goal/i), 'Get a new job')
    await user.type(screen.getByLabelText(/current situation/i), 'Currently unemployed')
    await user.selectOptions(screen.getByLabelText(/timeline/i), '30')
    
    const submitButton = screen.getByRole('button', { name: /analyze/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/law-of-attraction/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: 'Get a new job',
          currentSituation: 'Currently unemployed',
          timeline: 30,
        }),
      })
    })
  })

  it('handles API errors gracefully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Analysis failed' }),
    })

    render(<AttractionForm />)
    
    await user.type(screen.getByLabelText(/goal/i), 'Get a new job')
    await user.type(screen.getByLabelText(/current situation/i), 'Currently unemployed')
    
    const submitButton = screen.getByRole('button', { name: /analyze/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/analysis failed/i)).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    )

    render(<AttractionForm />)
    
    await user.type(screen.getByLabelText(/goal/i), 'Get a new job')
    await user.type(screen.getByLabelText(/current situation/i), 'Currently unemployed')
    
    const submitButton = screen.getByRole('button', { name: /analyze/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument()
  })
})
