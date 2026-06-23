import { dryingSites } from '../../../app/data'

export function DryingDirectoryPanel() {
  return (
    <section className="mt-8 space-y-6">
      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Verified drying directory</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Read-only list from the verified directory dataset. If you are offline, you can still
          read the entries; opening a source link requires connectivity.
        </p>
      </section>

      <section className="space-y-4">
        {dryingSites.map((site) => (
          <div key={site.id} className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                  {site.status}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-stone-950">{site.name}</h3>
              </div>
              <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
                Verified {site.verified_date}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-700">{site.pricing}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={site.source_url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-900 hover:underline"
              >
                Source URL
              </a>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
