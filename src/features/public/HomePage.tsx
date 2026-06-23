import { Link } from 'react-router-dom'

import { SiteShell } from '../../components/layout/SiteShell'
import { Seo } from '../../seo/Seo'
import { getHomeStructuredData } from '../../seo/structuredData'
import { faqItems, homeSections } from '../../content/publicContent'
import { SectionBlock } from './SectionBlock'

export function HomePage() {
  return (
    <SiteShell>
      <Seo
        title="MycoGuard Kenya | Offline Aflatoxin Prevention and One Health Agroecology Tool"
        description="MycoGuard Kenya is an offline-first early warning and action toolkit for aflatoxin risk screening and prevention across the grain, feed, and milk chain."
        canonicalPath="/"
        structuredData={getHomeStructuredData()}
      />
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
              Offline-first early warning and action toolkit
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Stop aflatoxin risk before it moves from grain to feed and milk.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-stone-700">
              MycoGuard Kenya is an offline-first early warning and action toolkit for
              farmers, cooperatives, extension teams, and frontline agrifood actors.
            </p>
            <p className="max-w-3xl rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-950">
              MycoGuard Kenya gives counties, farmer groups, cooperatives, and frontline
              value-chain actors an offline way to stop aflatoxin risk before it moves from
              grain to feed and milk, making One Health agroecology usable at the point where
              decisions are actually made.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Open the app
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-emerald-700 hover:text-emerald-900"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-stone-900 p-6 text-stone-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              Why this matters
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-200">
              <li>Designed for one-handed mobile use in real field conditions.</li>
              <li>Built for offline continuity after first successful load.</li>
              <li>Positioned around explainable risk screening, not lab claims.</li>
              <li>Structured for counties, cooperatives, facilitators, and extension teams.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {homeSections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <SectionBlock section={section} />
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
                Frequently asked questions
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950">
                Common questions from reviewers and implementers
              </h2>
            </div>
            <Link to="/faq" className="text-sm font-semibold text-emerald-900 hover:underline">
              View all FAQs
            </Link>
          </div>
          <dl className="mt-6 grid gap-4 lg:grid-cols-2">
            {faqItems.slice(0, 4).map((item) => (
              <div key={item.question} className="rounded-3xl border border-stone-200 p-5">
                <dt className="font-semibold text-stone-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-7 text-stone-700">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 rounded-[2rem] bg-emerald-900 px-6 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Next step
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Move from the public story into the app.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50">
            Phase 1 establishes the routes, metadata, and institutional framing. The next build
            increment will turn the app workspace into the working screening and prevention tool.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-stone-100"
            >
              Open the app
            </Link>
            <Link
              to="/for-extension-teams"
              className="inline-flex rounded-full border border-emerald-200 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              See extension use cases
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
