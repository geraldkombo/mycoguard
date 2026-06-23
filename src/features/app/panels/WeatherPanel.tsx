import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { practiceCards, weatherRiskRules, type AppLanguage } from '../../../app/data'
import { exportIcsCalendar } from '../../../app/exports'
import { PERSISTENT_DISCLAIMER } from '../../../config/site'

export function WeatherPanel({ language }: { language: AppLanguage }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [season, setSeason] = useState<'MAM' | 'OND' | 'DRY'>('MAM')

  const selected = useMemo(() => {
    if (!selectedId) return null
    return weatherRiskRules.observed_conditions.find((condition) => condition.id === selectedId) ?? null
  }, [selectedId])

  const actionCards = useMemo(() => {
    if (!selected) return []
    return selected.actions
      .map((id) => practiceCards.find((card) => card.id === id))
      .filter((card): card is (typeof practiceCards)[number] => Boolean(card))
  }, [selected])

  const bannerStyles = selected?.banner_type === 'danger'
    ? 'border-red-200 bg-red-50 text-red-950'
    : selected?.banner_type === 'warning'
      ? 'border-amber-200 bg-amber-50 text-amber-950'
      : 'border-emerald-200 bg-emerald-50 text-emerald-950'

  return (
    <section className="animate-fade-in mt-8 space-y-6">
      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Weather mode (offline)</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          This is not a live forecast. It is an offline tool: select the weather you observe now
          and MycoGuard will surface prevention actions that reduce moisture, mold, and re-wetting
          risk.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {weatherRiskRules.observed_conditions.map((condition) => (
            <button
              key={condition.id}
              type="button"
              onClick={() => setSelectedId(condition.id)}
              className={`rounded-[1.25rem] border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.98] ${
                selectedId === condition.id
                  ? 'border-emerald-700 bg-emerald-50 shadow-sm'
                  : 'border-stone-200 bg-stone-50 hover:border-emerald-700 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{condition.label}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    Tap to see risk banner and actions.
                  </p>
                </div>
                {selectedId === condition.id ? (
                  <svg className="mt-0.5 h-4 w-4 text-emerald-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <section className={`animate-fade-in rounded-[1.75rem] border p-6 shadow-sm ${bannerStyles}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
            Risk banner
          </p>
          <h3 className="mt-3 text-2xl font-semibold">{selected.label}</h3>
          <p className="mt-4 text-sm leading-7">
            {language === 'sw' ? selected.message_sw : selected.message_en}
          </p>
          <p className="mt-4 text-sm leading-7 opacity-80">{PERSISTENT_DISCLAIMER}</p>
          {actionCards.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {actionCards.map((card) => (
                <div key={card.id} className="rounded-[1.25rem] border border-stone-200 bg-white p-4 text-stone-900 transition-all duration-200 hover:shadow-sm">
                  <p className="font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-700">{card.summary}</p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/app/drying-directory"
              className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Open drying directory
            </Link>
            <Link
              to="/app/new-assessment"
              className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Start an assessment
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm leading-7 text-stone-700">
            Select an observed condition above to display a risk banner and recommended practices.
          </p>
        </section>
      )}

      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-stone-950">Seasonal guidance</h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          Use this for planning discussions during extension visits, cooperative meetings, and
          county trainings.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {(['MAM', 'OND', 'DRY'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSeason(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                season === key
                  ? 'bg-emerald-800 text-white shadow-sm focus-visible:ring-emerald-700'
                  : 'border border-stone-300 bg-white text-stone-800 hover:border-stone-500 hover:bg-stone-50 focus-visible:ring-stone-400'
              }`}
            >
              {key === 'MAM' ? 'MAM (Long rains)' : key === 'OND' ? 'OND (Short rains)' : 'Dry season'}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-stone-700">{weatherRiskRules.seasonal_guidance[season]}</p>
      </section>

      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-stone-950">Offline reminders (.ics export)</h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          Export a calendar file to set reminders on a phone. This works offline and does not use
          SMS or any backend service.
        </p>
        <div className="mt-6 space-y-3">
          {weatherRiskRules.ics_templates.map((template) => (
            <div key={template.id} className="rounded-[1.25rem] border border-stone-200 p-4 transition-colors duration-200 hover:border-stone-300">
              <p className="font-semibold text-stone-900">{template.title}</p>
              <p className="mt-2 text-sm leading-7 text-stone-700">{template.description}</p>
              <button
                type="button"
                onClick={() =>
                  exportIcsCalendar({
                    title: template.title,
                    description: template.description,
                    recurrence: template.recurrence,
                  })
                }
                className="mt-4 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Download .ics
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
