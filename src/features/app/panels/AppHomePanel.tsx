import { Link } from 'react-router-dom'

import type { AssessmentRecord } from '../../../app/data'

export function AppHomePanel({ latestAssessment }: { latestAssessment?: AssessmentRecord }) {
  return (
    <section className="animate-fade-in mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <h2 className="text-2xl font-semibold text-stone-950">Start from the app home</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Use the new assessment flow to answer the checklist modules, score explainable risk,
          and save the result on this device for follow-up.
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
      </div>
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
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
              className="inline-block text-sm font-semibold text-emerald-900 transition-colors hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Open this result &rarr;
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
