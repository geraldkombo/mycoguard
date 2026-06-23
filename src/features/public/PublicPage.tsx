import { Link } from 'react-router-dom'

import { SiteShell } from '../../components/layout/SiteShell'
import { Seo } from '../../seo/Seo'
import {
  getBreadcrumbStructuredData,
  getFaqStructuredData,
} from '../../seo/structuredData'
import { faqItems, publicPages } from '../../content/publicContent'
import { relatedLinks } from './publicRoutes'
import { SectionBlock } from './SectionBlock'

export function PublicPage({ path }: { path: string }) {
  const page = publicPages.find((entry) => entry.path === path)

  if (!page) {
    return null
  }

  const structuredData =
    page.path === '/faq'
      ? [getBreadcrumbStructuredData(page.navLabel, page.path), getFaqStructuredData()]
      : getBreadcrumbStructuredData(page.navLabel, page.path)

  return (
    <SiteShell>
      <Seo
        title={page.title}
        description={page.description}
        canonicalPath={page.canonicalPath}
        structuredData={structuredData}
      />
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
            Public discovery layer
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-700">{page.intro}</p>
          {page.highlight ? (
            <p className="mt-6 rounded-[1.75rem] border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-950">
              {page.highlight}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <SectionBlock section={section} />
            </section>
          ))}
        </div>

        {page.path === '/faq' ? (
          <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-950">FAQ answers</h2>
            <dl className="mt-6 space-y-5">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-3xl border border-stone-200 p-5">
                  <dt className="font-semibold text-stone-900">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-stone-700">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-stone-100 p-6">
          <h2 className="text-xl font-semibold text-stone-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks[path]?.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition hover:border-emerald-700 hover:text-emerald-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
