import { useState } from 'react'

import {
  isAssessmentComplete,
  type AppLanguage,
  type AssessmentRecord,
} from '../../../app/data'
import type { YesNoAnswer } from '../../../app/assessmentEngine'
import {
  downloadTextFile,
  exportGroupSummaryPdf,
  type GroupSummaryRow,
} from '../../../app/exports'
import { PERSISTENT_DISCLAIMER } from '../../../config/site'
import { createAssessmentRecord } from '../utils/createAssessmentRecord'
import { NewAssessmentPanel } from './NewAssessmentPanel'

export function GroupModePanel({
  language,
  onSaveToHistory,
}: {
  language: AppLanguage
  onSaveToHistory: (record: AssessmentRecord) => Promise<void>
}) {
  const [sessionName, setSessionName] = useState('')
  const [participantLabel, setParticipantLabel] = useState('')
  const [rows, setRows] = useState<GroupSummaryRow[]>([])
  const [isTakingAssessment, setIsTakingAssessment] = useState(false)
  const [answers, setAnswers] = useState<Record<string, YesNoAnswer>>({})
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)

  function resetFlow() {
    setAnswers({})
    setActiveModuleIndex(0)
    setParticipantLabel('')
    setIsTakingAssessment(false)
  }

  function exportGroupCsv() {
    const header = ['participant', 'assessmentId', 'createdAt', 'bandLabel', 'score']
    const lines = rows.map((row) => [
      row.participantLabel,
      row.record.id,
      row.record.createdAt,
      row.record.bandLabel,
      String(row.record.totalScore),
    ])
    const csv = [header, ...lines]
      .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
      .join('\n')
    downloadTextFile(
      `mycoguard_group_${sessionName ? sessionName.replaceAll(' ', '_') : 'session'}.csv`,
      'text/csv;charset=utf-8',
      csv,
    )
  }

  function exportGroupJson() {
    downloadTextFile(
      `mycoguard_group_${sessionName ? sessionName.replaceAll(' ', '_') : 'session'}.json`,
      'application/json;charset=utf-8',
      JSON.stringify(
        {
          schema: 'mycoguard_group_session_v1',
          exportedAt: new Date().toISOString(),
          sessionName: sessionName || null,
          disclaimer: PERSISTENT_DISCLAIMER,
          participants: rows,
        },
        null,
        2,
      ),
    )
  }

  return (
    <section className="animate-fade-in mt-8 space-y-6">
      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Group facilitator mode</h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Run sequential screenings during a farmer group meeting or training. Each participant
          assessment can be saved on this device and exported as a summary.
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{PERSISTENT_DISCLAIMER}</p>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-stone-900">Session name</span>
          <input
            value={sessionName}
            onChange={(event) => setSessionName(event.target.value)}
            className="mt-2 w-full rounded-[1rem] border border-stone-300 bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="e.g., PELUM field school — June visit"
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsTakingAssessment(true)}
            className="rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Start next assessment
          </button>
          {rows.length > 0 ? (
            <>
              <button
                type="button"
                onClick={() => exportGroupSummaryPdf(sessionName, rows)}
                className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Download group PDF
              </button>
              <button
                type="button"
                onClick={exportGroupCsv}
                className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-stone-500 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Download group CSV
              </button>
              <button
                type="button"
                onClick={exportGroupJson}
                className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-stone-500 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Download group JSON
              </button>
            </>
          ) : null}
        </div>
      </section>

      {isTakingAssessment ? (
        <section className="space-y-6">
          <section className="animate-fade-in rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-950">Participant</h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Use a short identifier (name, village, or code). This stays local on the device
              unless you export it.
            </p>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-stone-900">Participant label</span>
              <input
                value={participantLabel}
                onChange={(event) => setParticipantLabel(event.target.value)}
                className="mt-2 w-full rounded-[1rem] border border-stone-300 bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder={`Participant ${rows.length + 1}`}
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetFlow}
                className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:border-stone-500 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Cancel
              </button>
            </div>
          </section>

          <NewAssessmentPanel
            language={language}
            answers={answers}
            activeModuleIndex={activeModuleIndex}
            onModuleChange={setActiveModuleIndex}
            onAnswer={(questionId, answer) =>
              setAnswers((current) => ({
                ...current,
                [questionId]: answer,
              }))
            }
            onReset={() => {
              setAnswers({})
              setActiveModuleIndex(0)
            }}
            onComplete={async () => {
              if (!isAssessmentComplete(answers)) return

              const record = createAssessmentRecord(answers, language)

              await onSaveToHistory(record)
              setRows((current) => [
                ...current,
                {
                  participantLabel: participantLabel || `Participant ${current.length + 1}`,
                  record,
                },
              ])
              resetFlow()
            }}
            completeLabel="Save participant"
          />
        </section>
      ) : null}

      <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-stone-950">Session summary</h3>
        <p className="mt-3 text-sm leading-7 text-stone-700">
          Summary is tabular for quick discussion and reporting.
        </p>
        {rows.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                  <th className="px-3 py-2">Participant</th>
                  <th className="px-3 py-2">Risk</th>
                  <th className="px-3 py-2">Score</th>
                  <th className="px-3 py-2">Open</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.record.id} className="rounded-[1.25rem] bg-stone-50 transition-colors duration-200 hover:bg-stone-100">
                    <td className="px-3 py-3 text-sm font-semibold text-stone-900">
                      {row.participantLabel}
                    </td>
                    <td className="px-3 py-3 text-sm text-stone-700">
                      {row.record.bandLabel}
                    </td>
                    <td className="px-3 py-3 text-sm text-stone-700">{row.record.totalScore}</td>
                    <td className="px-3 py-3 text-sm">
                      <a
                        href={`/app/results?id=${row.record.id}`}
                        className="font-semibold text-emerald-900 transition-colors hover:underline focus-visible:outline-none focus-visible:underline"
                      >
                        View &rarr;
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 text-sm leading-7 text-stone-700">
            No group assessments saved yet.
          </p>
        )}
      </section>
    </section>
  )
}
