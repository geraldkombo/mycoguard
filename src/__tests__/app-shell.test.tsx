import { render, screen, within } from '@testing-library/react'
import App from '../App'

describe('MycoGuard Phase 1 public shell', () => {
  test('renders the homepage hero and primary call to action', () => {
    render(<App />)
    const main = screen.getByRole('main')

    expect(
      within(main).getByRole('heading', {
        name: /stop aflatoxin risk before it moves from grain to feed and milk/i,
      }),
    ).toBeInTheDocument()
    expect(within(main).getAllByRole('link', { name: /open the app/i })[0]).toBeInTheDocument()
    expect(within(main).getByRole('link', { name: /see how it works/i })).toBeInTheDocument()
  })

  test('exposes the core public navigation', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /primary/i })

    expect(within(nav).getByRole('link', { name: /about aflatoxin/i })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: /one health/i })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: /for cooperatives/i })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: /faq/i })).toBeInTheDocument()
  })
})
