import checklistsData from '../../content/checklists.json'
import dryingSitesData from '../../content/drying_sites.json'
import practiceCardsData from '../../content/practice_cards.json'
import riskRulesData from '../../content/risk_rules.json'
import uiStringsData from '../../content/ui_strings_en_sw.json'
import weatherRiskRulesData from '../../content/weather_risk_rules.json'

import type { AssessmentModule, PracticeCard, RiskConfig, YesNoAnswer } from './assessmentEngine'

export type AppLanguage = 'en' | 'sw'

export type AssessmentRecord = {
  id: string
  createdAt: string
  language: AppLanguage
  answers: Record<string, YesNoAnswer>
  totalScore: number
  bandLabel: string
  bandColor: string
  bandMessage: string
  triggeredTags: string[]
  recommendedActions: PracticeCard[]
  disclaimer: string
}

export type DryingSite = {
  id: string
  name: string
  pricing: string
  verified_date: string
  source_url: string
  status: string
  county?: string
  type?: string
  access?: string
  contact?: string
  map_query?: string
}

export type WeatherObservedCondition = {
  id: string
  label: string
  banner_type: 'danger' | 'warning' | 'info' | 'success' | string
  message_en: string
  message_sw: string
  actions: string[]
}

export type WeatherIcsTemplate = {
  id: string
  title: string
  description: string
  recurrence: string
}

export type WeatherRiskRules = {
  observed_conditions: WeatherObservedCondition[]
  seasonal_guidance: Record<'MAM' | 'OND' | 'DRY', string>
  ics_templates: WeatherIcsTemplate[]
}

export const assessmentModules = checklistsData.modules as AssessmentModule[]
export const riskConfig = riskRulesData as RiskConfig
export const practiceCards = practiceCardsData as PracticeCard[]
export const uiStrings = uiStringsData as Record<AppLanguage, Record<string, string>>
export const dryingSites = dryingSitesData as DryingSite[]
export const weatherRiskRules = weatherRiskRulesData as WeatherRiskRules

export function getModuleTitle(module: AssessmentModule) {
  return module.title
}

export function getQuestionText(
  question: AssessmentModule['questions'][number],
  language: AppLanguage,
) {
  return language === 'sw' ? question.question_sw : question.question_en
}

export function getQuestionHelp(
  question: AssessmentModule['questions'][number],
  language: AppLanguage,
) {
  return language === 'sw' ? question.help_sw : question.help_en
}

export function getAssessmentProgress(answers: Record<string, YesNoAnswer>) {
  const totalQuestions = assessmentModules.reduce((total, module) => total + module.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length

  return {
    answeredQuestions,
    totalQuestions,
    percentComplete:
      totalQuestions === 0 ? 0 : Math.round((answeredQuestions / totalQuestions) * 100),
  }
}

export function isAssessmentComplete(answers: Record<string, YesNoAnswer>) {
  return getAssessmentProgress(answers).answeredQuestions === getAssessmentProgress(answers).totalQuestions
}

export function createAssessmentId() {
  return `assessment-${Date.now()}`
}
