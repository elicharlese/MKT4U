import { render, screen, fireEvent } from '../test-utils'
import '@testing-library/jest-dom'
import { ModeToggle } from '@/components/mode-toggle'

describe('ModeToggle', () => {
  it('renders without crashing', () => {
    render(<ModeToggle />)
    
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })

  it('opens dropdown menu when clicked', async () => {
    render(<ModeToggle />)
    
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    // Wait for menu items to appear
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })
})
