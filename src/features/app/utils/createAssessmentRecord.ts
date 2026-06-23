import { buildAssessmentResult, type YesNoAnswer } from '../../../app/assessmentEngine'
import {
  assessmentModules,
  createAssessmentId,
  isAssessmentComplete,
  type AppLanguage,
  type AssessmentRecord,
  riskConfig,
  practiceCards,
} from '../../../app/data'

export function createAssessmentRecord(
  answers: Record<string, YesNoAnswer>,
  language: AppLanguage,
): AssessmentRecord {
  const result = buildAssessmentResult({
    modules: assessmentModules,
    answers,
    riskConfig,
    practiceCards,
  })

  return {
    id: createAssessmentId(),
    createdAt: new Date().toISOString(),
    language,
    answers,
    totalScore: result.totalScore,
    bandLabel: result.band.label,
    bandColor: result.band.color,
    bandMessage: result.band.message,
    triggeredTags: result.triggeredTags,
    recommendedActions: result.recommendedActions,
    disclaimer: result.disclaimer,
  }
}

export { isAssessmentComplete }
