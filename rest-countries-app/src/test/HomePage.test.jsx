import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../components/HomePage'

test('renders Start Exploring button', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  )
  expect(screen.getByText(/Start Exploring/i)).toBeInTheDocument()
})
