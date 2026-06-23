import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { HomePage } from '../features/public/HomePage'
import { NotFoundPage } from '../features/public/NotFoundPage'

describe('app routes', () => {
  test('homepage renders heading', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: /stop aflatoxin risk/i }),
    ).toBeInTheDocument()
  })

  test('not-found page renders 404 message', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent']}>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
    expect(screen.getByText(/this route does not exist/i)).toBeInTheDocument()
  })
})
