export type YesNoAnswer = 'yes' | 'no'

export type AssessmentQuestion = {
  id: string
  question_en: string
  question_sw: string
  help_en: string
  help_sw: string
  answer_type: 'yesno'
  weights: Record<YesNoAnswer, number>
  driver_tag: string
  place_tag: string
}

export type AssessmentModule = {
  module_id: string
  title: string
  questions: AssessmentQuestion[]
}

export type RiskBand = {
  min: number
  max: number
  color: string
  msg: string
}

export type RiskConfig = {
  version: string
  bands: Record<string, RiskBand>
  rules: Array<{
    trigger_tag: string
    action_id: string
    reason: string
  }>
  global_actions: {
    top_seasonal: string[]
    disclaimer: string
  }
}

export type PracticeCard = {
  id: string
  title: string
  summary: string
}

export type BuildAssessmentResultInput = {
  modules: AssessmentModule[]
  answers: Record<string, YesNoAnswer>
  riskConfig: RiskConfig
  practiceCards: PracticeCard[]
}

export function buildAssessmentResult({
  modules,
  answers,
  riskConfig,
  practiceCards,
}: BuildAssessmentResultInput) {
  let totalScore = 0
  const triggeredTags: string[] = []

  modules.forEach((module) => {
    module.questions.forEach((question) => {
      const answer = answers[question.id]

      if (!answer) {
        return
      }

      const weight = question.weights[answer] ?? 0
      totalScore += weight

      if (weight > 0 && !triggeredTags.includes(question.driver_tag)) {
        triggeredTags.push(question.driver_tag)
      }
    })
  })

  const bandEntry =
    Object.entries(riskConfig.bands).find(([, band]) => {
      return totalScore >= band.min && totalScore <= band.max
    }) ?? Object.entries(riskConfig.bands)[0]

  const [bandLabel, bandConfig] = bandEntry

  const recommendedActionIds = dedupe([
    ...triggeredTags.flatMap((tag) =>
      riskConfig.rules
        .filter((rule) => rule.trigger_tag === tag)
        .map((rule) => rule.action_id),
    ),
    ...riskConfig.global_actions.top_seasonal,
  ]).slice(0, 3)

  return {
    totalScore,
    band: {
      label: bandLabel,
      color: bandConfig.color,
      message: bandConfig.msg,
    },
    triggeredTags,
    recommendedActions: recommendedActionIds
      .map((actionId) => practiceCards.find((card) => card.id === actionId))
      .filter((card): card is PracticeCard => Boolean(card)),
    disclaimer: riskConfig.global_actions.disclaimer,
  }
}

function dedupe(values: string[]) {
  return [...new Set(values)]
}
