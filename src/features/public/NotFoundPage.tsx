import { Link } from 'react-router-dom'

import { SiteShell } from '../../components/layout/SiteShell'
import { Seo } from '../../seo/Seo'

export function NotFoundPage() {
  return (
    <SiteShell>
      <Seo
        title="Page not found | MycoGuard"
        description="The requested page could not be found in the MycoGuard web app."
        canonicalPath="/404"
      />
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-stone-950">This route does not exist.</h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">
          Return to the public pages or open the app workspace from the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Go home
          </Link>
          <Link
            to="/app"
            className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Open the app
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
