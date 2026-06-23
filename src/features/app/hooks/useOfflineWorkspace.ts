import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { loadAssessments, loadLanguage, saveAssessments, saveLanguage } from '../../../app/storage'
import {
  getAssessmentProgress,
  type AppLanguage,
  type AssessmentRecord,
} from '../../../app/data'
import type { YesNoAnswer } from '../../../app/assessmentEngine'
import { appRouteSummaries } from '../../../content/publicContent'
import { createAssessmentRecord, isAssessmentComplete } from '../utils/createAssessmentRecord'

export function useOfflineWorkspace() {
  const [language, setLanguage] = useState<AppLanguage>('en')
  const [answers, setAnswers] = useState<Record<string, YesNoAnswer>>({})
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([])
  const [isLoadingStorage, setIsLoadingStorage] = useState(true)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    async function hydrate() {
      const [savedAssessments, savedLanguage] = await Promise.all([
        loadAssessments(),
        loadLanguage(),
      ])
      setAssessments(savedAssessments)
      setLanguage(savedLanguage)
      setIsLoadingStorage(false)
    }
    void hydrate()
  }, [])

  useEffect(() => {
    if (isLoadingStorage) return
    void saveLanguage(language)
  }, [isLoadingStorage, language])

  const route = appRouteSummaries.find((item) => item.path === location.pathname) ?? appRouteSummaries[0]

  const progress = useMemo(() => getAssessmentProgress(answers), [answers])
  const latestAssessment = assessments[0]
  const selectedAssessment =
    assessments.find((a) => a.id === searchParams.get('id')) ?? latestAssessment

  function resetAssessment() {
    setAnswers({})
    setActiveModuleIndex(0)
  }

  async function saveAssessment() {
    if (!isAssessmentComplete(answers)) return
    const record = createAssessmentRecord(answers, language)
    const nextRecords = [record, ...assessments]
    setAssessments(nextRecords)
    await saveAssessments(nextRecords)
    resetAssessment()
    navigate(`/app/results?id=${record.id}`)
  }

  async function clearAssessments() {
    setAssessments([])
    await saveAssessments([])
  }

  async function saveToHistory(record: AssessmentRecord) {
    const nextRecords = [record, ...assessments]
    setAssessments(nextRecords)
    await saveAssessments(nextRecords)
  }

  return {
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
  }
}
