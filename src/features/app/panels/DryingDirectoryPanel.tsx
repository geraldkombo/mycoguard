import { dryingSites } from '../../../app/data'

export function DryingDirectoryPanel() {
  return (
    <section className="animate-fade-in mt-8 space-y-6">
      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Drying service directory</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Listed drying centres from public sources. Verify current service availability and
          pricing before visiting. Offline access is available; source links need connectivity.
        </p>
      </section>

      <section className="space-y-4">
        {dryingSites.map((site, i) => (
          <div
            key={site.id}
            className="animate-slide-up rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                  {site.status}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-stone-950">{site.name}</h3>
              </div>
              <p className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                {site.verified_date}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-700">{site.pricing}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={site.source_url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Source URL &nearr;
              </a>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
