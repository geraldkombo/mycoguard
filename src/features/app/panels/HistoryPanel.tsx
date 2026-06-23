import { Link } from 'react-router-dom'

import type { AssessmentRecord } from '../../../app/data'

export function HistoryPanel({
  assessments,
  onExportCsv,
  onExportJson,
}: {
  assessments: AssessmentRecord[]
  onExportCsv: () => void
  onExportJson: () => void
}) {
  return (
    <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-950">Offline assessment history</h2>
      <p className="mt-4 text-sm leading-7 text-stone-700">
        Saved results stay on this device through local offline storage so users can reopen them
        later without a backend.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onExportCsv}
          disabled={assessments.length === 0}
          className={`rounded-full px-5 py-3 text-sm font-semibold ${
            assessments.length === 0
              ? 'cursor-not-allowed bg-stone-200 text-stone-500'
              : 'bg-stone-900 text-white'
          }`}
        >
          Download CSV summary
        </button>
        <button
          type="button"
          onClick={onExportJson}
          disabled={assessments.length === 0}
          className={`rounded-full px-5 py-3 text-sm font-semibold ${
            assessments.length === 0
              ? 'cursor-not-allowed bg-stone-200 text-stone-500'
              : 'border border-stone-300 bg-white text-stone-800'
          }`}
        >
          Download JSON backup
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <Link
              key={assessment.id}
              to={`/app/results?id=${assessment.id}`}
              className="block rounded-[1.25rem] border border-stone-200 p-4 transition hover:border-emerald-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900">
                    {assessment.bandLabel} risk, score {assessment.totalScore}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    Saved {new Date(assessment.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-sm font-semibold text-emerald-900">Open result</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm leading-7 text-stone-700">
            No assessments have been saved yet. Complete a new assessment to create the first
            offline record.
          </p>
        )}
      </div>
    </section>
  )
}
