import {
  exportAssessmentsBackupJson,
  exportAssessmentsToCsv,
} from '../../../app/exports'
import type { AppLanguage, AssessmentRecord } from '../../../app/data'
import { PERSISTENT_DISCLAIMER } from '../../../config/site'

export function SettingsPanel({
  language,
  onLanguageChange,
  assessments,
  onClearAssessments,
}: {
  language: AppLanguage
  onLanguageChange: (language: AppLanguage) => void
  assessments: AssessmentRecord[]
  onClearAssessments: () => Promise<void>
}) {
  return (
    <section className="animate-fade-in mt-8 space-y-6">
      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Settings</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Settings are stored locally on this device. MycoGuard does not require an account.
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{PERSISTENT_DISCLAIMER}</p>
      </section>

      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <h3 className="text-xl font-semibold text-stone-950">Language</h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          Toggle English or Kiswahili for the assessment questions and key prompts.
        </p>
        <div className="mt-5 flex rounded-full border border-stone-300 bg-stone-50 p-1 w-fit">
          {(['en', 'sw'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onLanguageChange(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                language === option ? 'bg-emerald-800 text-white shadow-sm' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {option === 'en' ? 'English' : 'Kiswahili'}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <h3 className="text-xl font-semibold text-stone-950">Exports and storage</h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          {assessments.length} saved assessment{assessments.length === 1 ? '' : 's'} on this
          device.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => exportAssessmentsToCsv(assessments)}
            disabled={assessments.length === 0}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${
              assessments.length === 0
                ? 'cursor-not-allowed bg-stone-200 text-stone-500'
                : 'bg-stone-900 text-white shadow-sm hover:bg-stone-800 hover:shadow-md focus-visible:ring-stone-600'
            }`}
          >
            Download CSV summary
          </button>
          <button
            type="button"
            onClick={() => exportAssessmentsBackupJson(assessments)}
            disabled={assessments.length === 0}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${
              assessments.length === 0
                ? 'cursor-not-allowed bg-stone-200 text-stone-500'
                : 'border border-stone-300 bg-white text-stone-800 hover:border-stone-500 hover:bg-stone-50 focus-visible:ring-stone-400'
            }`}
          >
            Download JSON backup
          </button>
          <button
            type="button"
            onClick={async () => {
              const ok = window.confirm('Clear all saved assessments from this device? This cannot be undone.')
              if (!ok) return
              await onClearAssessments()
            }}
            disabled={assessments.length === 0}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${
              assessments.length === 0
                ? 'cursor-not-allowed bg-stone-200 text-stone-500'
                : 'border border-red-200 bg-red-50 text-red-900 hover:border-red-400 hover:bg-red-100 focus-visible:ring-red-600'
            }`}
          >
            Clear local history
          </button>
        </div>
      </section>
    </section>
  )
}
