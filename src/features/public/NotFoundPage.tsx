import { Link } from 'react-router-dom'

import { SiteShell } from '../../components/layout/SiteShell'
import { Seo } from '../../seo/Seo'

export function NotFoundPage() {
  return (
    <SiteShell>
      <Seo
        title="Page not found | MycoGuard Kenya"
        description="The requested page could not be found in the MycoGuard Kenya web app."
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
            className="inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white"
          >
            Go home
          </Link>
          <Link
            to="/app"
            className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800"
          >
            Open the app
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
