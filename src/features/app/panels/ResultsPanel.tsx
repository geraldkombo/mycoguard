import { Link } from 'react-router-dom'
import { useState } from 'react'

import type { AssessmentRecord } from '../../../app/data'
import { exportSingleAssessmentJson, exportSingleAssessmentPdf } from '../../../app/exports'
import { PERSISTENT_DISCLAIMER } from '../../../config/site'

export function ResultsPanel({ assessment }: { assessment?: AssessmentRecord }) {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  if (!assessment) {
    return (
      <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">No result selected</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Start a new assessment or open a saved result from history.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/app/new-assessment"
            className="inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Start a new assessment
          </Link>
          <Link
            to="/app/history"
            className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            View history
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-fade-in mt-8 space-y-6">
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
          Latest assessment result
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                assessment.bandColor === 'red'
                  ? 'bg-red-600'
                  : assessment.bandColor === 'yellow'
                    ? 'bg-amber-600'
                    : 'bg-emerald-600'
              }`}
              aria-hidden="true"
            />
            <h2 className="text-4xl font-semibold text-stone-950">{assessment.bandLabel} risk</h2>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              assessment.bandColor === 'red'
                ? 'bg-red-100 text-red-800'
                : assessment.bandColor === 'yellow'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            Score {assessment.totalScore}
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">
          {assessment.bandMessage}
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{PERSISTENT_DISCLAIMER}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={async () => {
              setIsExportingPdf(true)
              try {
                await exportSingleAssessmentPdf(assessment)
              } finally {
                setIsExportingPdf(false)
              }
            }}
            disabled={isExportingPdf}
            className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            {isExportingPdf ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              'Download PDF'
            )}
          </button>
          <button
            type="button"
            onClick={() => exportSingleAssessmentJson(assessment)}
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-stone-500 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Download JSON
          </button>
          <Link
            to="/app/history"
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Export CSV / backup
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <h3 className="text-xl font-semibold text-stone-950">Triggered drivers</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {assessment.triggeredTags.length > 0 ? (
              assessment.triggeredTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-2 text-sm font-medium text-stone-700"
                >
                  {tag.replaceAll('_', ' ')}
                </span>
              ))
            ) : (
              <p className="text-sm leading-7 text-stone-600">
                No high-weight drivers were triggered in this assessment.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <h3 className="text-xl font-semibold text-stone-950">Top recommended actions</h3>
          <div className="mt-4 space-y-4">
            {assessment.recommendedActions.map((action) => (
              <div key={action.id} className="rounded-[1.25rem] border border-stone-200 p-4 transition-colors duration-200 hover:border-stone-300">
                <p className="font-semibold text-stone-900">{action.title}</p>
                <p className="mt-2 text-sm leading-7 text-stone-700">{action.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
