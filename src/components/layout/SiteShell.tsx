import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { CONTACT_PLACEHOLDERS, PERSISTENT_DISCLAIMER } from '../../config/site'
import { publicNavItems } from '../../features/public/publicRoutes'

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-emerald-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="max-w-xs">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">
                MycoGuard Kenya
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Offline aflatoxin prevention and One Health guidance
              </p>
            </Link>
            <div
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900"
              aria-live="polite"
            >
              Discovery layer online, app workflows in progress
            </div>
          </div>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-2 text-sm">
              {publicNavItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex rounded-full border px-3 py-2 transition ${
                        isActive
                          ? 'border-emerald-800 bg-emerald-800 text-white'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-900'
                      }`
                    }
                  >
                    {item.navLabel}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/app"
                  className={({ isActive }) =>
                    `inline-flex rounded-full border px-3 py-2 transition ${
                      isActive
                        ? 'border-amber-600 bg-amber-500 text-stone-950'
                        : 'border-amber-300 bg-amber-50 text-amber-950 hover:border-amber-500'
                    }`
                  }
                >
                  Open the app
                </NavLink>
              </li>
            </ul>
          </nav>
          {location.pathname.startsWith('/app') ? (
            <p className="text-sm text-stone-600">
              Offline workspace: checklist-based risk screening, prevention guidance, and client-side
              exports. No backend, no SMS, and no lab claims.
            </p>
          ) : null}
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">
                Credible, field-ready, mobile-first
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-900">MycoGuard Kenya</h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-stone-700">
              {PERSISTENT_DISCLAIMER}
            </p>
            <p className="text-sm text-stone-600">
              Innovator: {CONTACT_PLACEHOLDERS.innovator}, {CONTACT_PLACEHOLDERS.organization}.
              Contact placeholder: {CONTACT_PLACEHOLDERS.email}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-600">
              Useful links
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>
                <Link to="/about-aflatoxin" className="hover:text-emerald-900">
                  About aflatoxin
                </Link>
              </li>
              <li>
                <Link to="/one-health" className="hover:text-emerald-900">
                  One Health
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-900">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-900">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
