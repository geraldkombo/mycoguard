import { Link } from 'react-router-dom'

import type { AssessmentRecord } from '../../../app/data'

export function AppHomePanel({ latestAssessment }: { latestAssessment?: AssessmentRecord }) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Start from the app home</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Use the new assessment flow to answer the checklist modules, score explainable risk,
          and save the result on this device for follow-up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/app/new-assessment"
            className="inline-flex rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white"
          >
            Start a new assessment
          </Link>
          <Link
            to="/app/history"
            className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800"
          >
            View history
          </Link>
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Latest saved result</h2>
        {latestAssessment ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-stone-600">
              Saved {new Date(latestAssessment.createdAt).toLocaleString()}
            </p>
            <p className="text-3xl font-semibold text-stone-950">
              {latestAssessment.bandLabel} risk
            </p>
            <p className="text-sm leading-7 text-stone-700">{latestAssessment.bandMessage}</p>
            <Link
              to={`/app/results?id=${latestAssessment.id}`}
              className="text-sm font-semibold text-emerald-900 hover:underline"
            >
              Open this result
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-stone-700">
            No saved assessments yet. Complete the first assessment to create an offline record.
          </p>
        )}
      </div>
    </section>
  )
}
