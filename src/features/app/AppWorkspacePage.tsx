import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'

import { SiteShell } from '../../components/layout/SiteShell'
import { Seo } from '../../seo/Seo'
import { getBreadcrumbStructuredData } from '../../seo/structuredData'
import { showToast } from '../../components/ui/toastUtils'
import { WorkspaceSkeleton } from '../../components/ui/Skeleton'
import { useOfflineWorkspace } from './hooks/useOfflineWorkspace'
import { AppHomePanel } from './panels/AppHomePanel'
import { NewAssessmentPanel } from './panels/NewAssessmentPanel'
import { ResultsPanel } from './panels/ResultsPanel'
import { HistoryPanel } from './panels/HistoryPanel'
import { SettingsPanel } from './panels/SettingsPanel'
import { appRouteSummaries } from '../../content/publicContent'
import { exportAssessmentsBackupJson, exportAssessmentsToCsv } from '../../app/exports'

const WeatherPanel = lazy(() => import('./panels/WeatherPanel').then((m) => ({ default: m.WeatherPanel })))
const DryingDirectoryPanel = lazy(() => import('./panels/DryingDirectoryPanel').then((m) => ({ default: m.DryingDirectoryPanel })))
const GroupModePanel = lazy(() => import('./panels/GroupModePanel').then((m) => ({ default: m.GroupModePanel })))

function PanelSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="h-12 w-3/4 rounded bg-stone-200" />
        <div className="mt-4 h-6 w-1/2 rounded bg-stone-200" />
        <div className="mt-4 h-64 rounded bg-stone-200" />
      </div>
    </div>
  )
}

export function AppWorkspacePage() {
  const [isSavingAssessment, setIsSavingAssessment] = useState(false)
  const {
    language,
    setLanguage,
    answers,
    setAnswers,
    activeModuleIndex,
    setActiveModuleIndex,
    assessments,
    isLoadingStorage,
    progress,
    latestAssessment,
    selectedAssessment,
    route,
    resetAssessment,
    saveAssessment,
    clearAssessments,
    saveToHistory,
  } = useOfflineWorkspace()

  async function handleSaveAssessment() {
    setIsSavingAssessment(true)
    try {
      await saveAssessment()
    } finally {
      setIsSavingAssessment(false)
    }
  }

  if (isLoadingStorage) {
    return (
      <SiteShell>
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <WorkspaceSkeleton />
        </section>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <Seo
        title={`MycoGuard App | ${route.label}`}
        description={`${route.summary} Offline-first risk screening, guidance, and exports for field use in Kenya.`}
        canonicalPath={route.path}
        structuredData={getBreadcrumbStructuredData(route.label, route.path)}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-500">
          <Link to="/" className="transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800 font-medium">{route.label}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="animate-fade-in rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
                  Working app layer
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
                  {route.label}
                </h1>
              </div>
              <div className="flex rounded-full border border-stone-300 bg-stone-50 p-1">
                {(['en', 'sw'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                      language === option
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {option === 'en' ? 'English' : 'Kiswahili'}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{route.summary}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
              This workspace is designed for field use: complete checklists, review explainable
              results, follow practical prevention guidance, and export records without any
              backend or network dependence after the first load.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {appRouteSummaries.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-[1.25rem] border p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                    item.path === route.path
                      ? 'border-emerald-700 bg-emerald-50 shadow-sm'
                      : 'border-stone-200 bg-stone-50 hover:border-emerald-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="animate-fade-in rounded-[2rem] border border-stone-200 bg-stone-900 p-6 text-white shadow-sm" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Offline status
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-100">
              {isLoadingStorage
                ? 'Loading saved offline records...'
                : `${assessments.length} saved assessment${assessments.length === 1 ? '' : 's'} available on this device.`}
            </p>
            <div className="mt-6 rounded-[1.5rem] border border-stone-700 bg-stone-800 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                Assessment progress
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">{progress.percentComplete}%</p>
              <p className="mt-2 text-sm text-stone-300">
                {progress.totalQuestions === 0
                  ? 'No active assessment'
                  : `${progress.answeredQuestions} of ${progress.totalQuestions} questions answered`}
              </p>
            </div>
          </aside>
        </div>

        {route.path === '/app' ? (
          <AppHomePanel latestAssessment={latestAssessment} />
        ) : null}

{route.path === '/app/new-assessment' ? (
          <NewAssessmentPanel
            language={language}
            answers={answers}
            activeModuleIndex={activeModuleIndex}
            onModuleChange={setActiveModuleIndex}
            onAnswer={(questionId, answer) =>
              setAnswers((current) => ({ ...current, [questionId]: answer }))
            }
            onReset={resetAssessment}
            onComplete={handleSaveAssessment}
            isSaving={isSavingAssessment}
          />
        ) : null}

        {route.path === '/app/results' ? (
          <ResultsPanel assessment={selectedAssessment} />
        ) : null}

        {route.path === '/app/history' ? (
          <HistoryPanel
            assessments={assessments}
            onExportCsv={() => {
              exportAssessmentsToCsv(assessments)
              showToast('CSV summary downloaded')
            }}
            onExportJson={() => {
              exportAssessmentsBackupJson(assessments)
              showToast('JSON backup downloaded')
            }}
          />
        ) : null}

{route.path === '/app/weather' ? (
          <Suspense fallback={<PanelSkeleton />}>
            <WeatherPanel language={language} />
          </Suspense>
        ) : null}

        {route.path === '/app/drying-directory' ? (
          <Suspense fallback={<PanelSkeleton />}>
            <DryingDirectoryPanel />
          </Suspense>
        ) : null}

        {route.path === '/app/group-mode' ? (
          <Suspense fallback={<PanelSkeleton />}>
            <GroupModePanel
              language={language}
              onSaveToHistory={async (record) => {
                await saveToHistory(record)
                showToast('Participant assessment saved')
              }}
            />
          </Suspense>
        ) : null}

        {route.path === '/app/settings' ? (
          <SettingsPanel
            language={language}
            onLanguageChange={(lang) => {
              setLanguage(lang)
              showToast(lang === 'en' ? 'Language changed to English' : 'Lugha imebadilishwa hadi Kiswahili', 'info')
            }}
            assessments={assessments}
            onClearAssessments={async () => {
              await clearAssessments()
              showToast('All assessments cleared')
            }}
          />
        ) : null}
      </section>
    </SiteShell>
  )
}
