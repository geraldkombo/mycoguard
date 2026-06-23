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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:m-2 focus:rounded-full focus:bg-emerald-800 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 shadow-sm backdrop-blur-md transition-shadow duration-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="max-w-xs rounded-xl p-1 transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">
                MycoGuard
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Offline aflatoxin prevention &amp; One Health guidance
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
                      `inline-flex rounded-full border px-3 py-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                        isActive
                          ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-900'
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
                    `inline-flex rounded-full border px-3 py-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-amber-600 bg-amber-500 text-stone-950 shadow-sm'
                        : 'border-amber-300 bg-amber-50 text-amber-950 hover:border-amber-500 hover:bg-amber-100'
                    }`
                  }
                >
                  Open the app
                </NavLink>
              </li>
            </ul>
          </nav>
          {location.pathname.startsWith('/app') ? (
            <p className="text-sm leading-relaxed text-stone-600">
              Offline workspace: checklist-based risk screening, prevention guidance, and client-side
              exports. No backend, no SMS, and no lab claims.
            </p>
          ) : null}
        </div>
      </header>
      <main id="main-content" className="animate-fade-in">{children}</main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">
                Credible, field-ready, mobile-first
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-900">MycoGuard</h2>
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
                <Link to="/about-aflatoxin" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
                  About aflatoxin
                </Link>
              </li>
              <li>
                <Link to="/one-health" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
                  One Health
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
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
