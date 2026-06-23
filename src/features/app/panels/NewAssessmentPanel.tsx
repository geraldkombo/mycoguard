import { useState } from 'react'

import {
  assessmentModules,
  getAssessmentProgress,
  getModuleTitle,
  getQuestionHelp,
  getQuestionText,
  isAssessmentComplete,
  type AppLanguage,
} from '../../../app/data'
import type { YesNoAnswer } from '../../../app/assessmentEngine'

type NewAssessmentPanelProps = {
  language: AppLanguage
  answers: Record<string, YesNoAnswer>
  activeModuleIndex: number
  onModuleChange: (index: number) => void
  onAnswer: (questionId: string, answer: YesNoAnswer) => void
  onReset: () => void
  onComplete: () => void
  completeLabel?: string
  isSaving?: boolean
}

export function NewAssessmentPanel({
  language,
  answers,
  activeModuleIndex,
  onModuleChange,
  onAnswer,
  onReset,
  onComplete,
  completeLabel = 'Continue to results',
  isSaving = false,
}: NewAssessmentPanelProps) {
  const progress = getAssessmentProgress(answers)
  const allAnswered = isAssessmentComplete(answers)
  const [notice, setNotice] = useState<string | null>(null)

  const currentModule = assessmentModules[activeModuleIndex] ?? assessmentModules[0]
  const moduleAnsweredCount = currentModule.questions.filter((question) => answers[question.id]).length
  const moduleComplete = moduleAnsweredCount === currentModule.questions.length
  const canGoBack = activeModuleIndex > 0
  const canGoNext = activeModuleIndex < assessmentModules.length - 1

  return (
    <section className="mt-8 space-y-6">
      <section className="animate-fade-in rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
              Progress
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">
              {progress.percentComplete}% complete
            </p>
          </div>
          <div className="min-w-[12rem] text-right">
            <p className="text-sm font-semibold text-stone-900">
              {progress.answeredQuestions} / {progress.totalQuestions} answered
            </p>
            <p className="mt-1 text-xs text-stone-600">
              Module {activeModuleIndex + 1} of {assessmentModules.length}
            </p>
          </div>
        </div>
        <div className="mt-4 h-3 w-full rounded-full bg-stone-100">
          <div
            className="h-3 rounded-full bg-emerald-700 transition-all duration-500 ease-out"
            style={{ width: `${progress.percentComplete}%` }}
            aria-hidden="true"
          />
        </div>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Answer each module in sequence. This is a risk-screening checklist for prevention
          planning, not a lab test.
        </p>
      </section>

      <section className="animate-fade-in rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
              Module {activeModuleIndex + 1}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">
              {getModuleTitle(currentModule)}
            </h2>
          </div>
          <p className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
            {moduleAnsweredCount}/{currentModule.questions.length} answered
          </p>
        </div>

        <div className="mt-6 space-y-5">
          {currentModule.questions.map((question) => (
            <div
              key={question.id}
              className="rounded-[1.5rem] border border-stone-200 p-5 transition-all duration-200 hover:border-stone-300"
            >
              <p className="text-base font-medium text-stone-950">
                {getQuestionText(question, language)}
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {getQuestionHelp(question, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(['yes', 'no'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setNotice(null)
                      onAnswer(question.id, option)
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.95] ${
                      answers[question.id] === option
                        ? option === 'yes'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-emerald-800 text-white shadow-sm'
                        : 'border border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50 focus-visible:ring-stone-400'
                    }`}
                  >
                    {language === 'sw'
                      ? option === 'yes'
                        ? 'Ndiyo'
                        : 'Hapana'
                      : option === 'yes'
                        ? 'Yes'
                        : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-stone-600" aria-live="polite">
          {notice ?? ''}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              if (!canGoBack) return
              setNotice(null)
              onModuleChange(activeModuleIndex - 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            disabled={!canGoBack}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              canGoBack
                ? 'border border-stone-300 bg-white text-stone-800 hover:border-stone-500 hover:bg-stone-50 focus-visible:ring-stone-400 active:scale-[0.97]'
                : 'cursor-not-allowed bg-stone-100 text-stone-400'
            }`}
          >
            Previous module
          </button>
          <button
            type="button"
            onClick={() => {
              if (!canGoNext) return
              if (!moduleComplete) {
                setNotice('Complete this module to continue.')
                return
              }
              setNotice(null)
              onModuleChange(activeModuleIndex + 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            disabled={!canGoNext}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${
              canGoNext
                ? moduleComplete
                  ? 'bg-emerald-800 text-white shadow-sm hover:bg-emerald-900 focus-visible:ring-emerald-700'
                  : 'bg-amber-100 text-amber-950 hover:bg-amber-200 focus-visible:ring-amber-600'
                : 'cursor-not-allowed bg-stone-200 text-stone-500'
            }`}
          >
            Next module
          </button>
        </div>
      </section>

      <div className="sticky bottom-4 z-10 animate-slide-up rounded-[1.75rem] border border-emerald-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900">
              {progress.answeredQuestions} of {progress.totalQuestions} questions answered
            </p>
            <p className="text-sm text-stone-600">
              Complete all modules to compute a result and save it offline.
            </p>
          </div>
<div className="flex flex-wrap gap-3">
             <button
               type="button"
               onClick={onReset}
               className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-stone-500 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
             >
               Reset answers
             </button>
             <button
               type="button"
               onClick={onComplete}
               disabled={!allAnswered || isSaving}
               className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${
                 allAnswered && !isSaving
                   ? 'bg-emerald-800 text-white shadow-sm hover:bg-emerald-900 focus-visible:ring-emerald-700'
                   : 'cursor-not-allowed bg-stone-200 text-stone-500'
               }`}
             >
               {isSaving ? (
                 <span className="flex items-center gap-2">
                   <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                   </svg>
                   Saving...
                 </span>
               ) : (
                 completeLabel
               )}
             </button>
           </div>
        </div>
      </div>
    </section>
  )
}
