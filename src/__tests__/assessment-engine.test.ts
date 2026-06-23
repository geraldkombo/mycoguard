import { buildAssessmentResult } from '../app/assessmentEngine'

const modules = [
  {
    module_id: 'mod_1',
    title: 'Module 1',
    questions: [
      {
        id: 'q1',
        question_en: 'Question 1',
        question_sw: 'Swali 1',
        help_en: 'Help 1',
        help_sw: 'Msaada 1',
        answer_type: 'yesno' as const,
        weights: { yes: 3, no: 0 },
        driver_tag: 'soil_contact',
        place_tag: 'Field',
      },
      {
        id: 'q2',
        question_en: 'Question 2',
        question_sw: 'Swali 2',
        help_en: 'Help 2',
        help_sw: 'Msaada 2',
        answer_type: 'yesno' as const,
        weights: { yes: 0, no: 2 },
        driver_tag: 'poor_sorting',
        place_tag: 'Drying',
      },
      {
        id: 'q3',
        question_en: 'Question 3',
        question_sw: 'Swali 3',
        help_en: 'Help 3',
        help_sw: 'Msaada 3',
        answer_type: 'yesno' as const,
        weights: { yes: 4, no: 0 },
        driver_tag: 'climate_rain',
        place_tag: 'Drying',
      },
    ],
  },
]

const riskConfig = {
  version: '1.0',
  bands: {
    Low: { min: 0, max: 15, color: 'green', msg: 'Low risk' },
    Medium: { min: 16, max: 40, color: 'yellow', msg: 'Medium risk' },
    High: { min: 41, max: 100, color: 'red', msg: 'High risk' },
  },
  rules: [
    {
      trigger_tag: 'soil_contact',
      action_id: 'pc_02',
      reason: 'Avoid soil contact.',
    },
    {
      trigger_tag: 'climate_rain',
      action_id: 'pc_16',
      reason: 'Avoid rewetting.',
    },
  ],
  global_actions: {
    top_seasonal: ['pc_01', 'pc_06', 'pc_07'],
    disclaimer:
      'MycoGuard provides risk screening, not lab testing. Always discard moldy grain from food/feed chains. Do not burn. Follow county public health guidance.',
  },
}

const practiceCards = [
  { id: 'pc_01', title: 'Timely Harvesting', summary: 'Summary 1' },
  { id: 'pc_02', title: 'Tarp Drying', summary: 'Summary 2' },
  { id: 'pc_06', title: 'Ventilation Check', summary: 'Summary 6' },
  { id: 'pc_07', title: 'Hermetic Storage Bags', summary: 'Summary 7' },
  { id: 'pc_16', title: 'Mechanical Drying Access', summary: 'Summary 16' },
]

describe('buildAssessmentResult', () => {
  test('scores risky yes and risky no answers, then fills recommended actions from rules and seasonal fallbacks', () => {
    const result = buildAssessmentResult({
      modules,
      answers: {
        q1: 'yes',
        q2: 'no',
        q3: 'yes',
      },
      riskConfig,
      practiceCards,
    })

    expect(result.totalScore).toBe(9)
    expect(result.band.label).toBe('Low')
    expect(result.triggeredTags).toEqual(['soil_contact', 'poor_sorting', 'climate_rain'])
    expect(result.recommendedActions.map((action) => action.id)).toEqual([
      'pc_02',
      'pc_16',
      'pc_01',
    ])
  })

  test('returns a high-risk band when the total exceeds the high threshold', () => {
    const result = buildAssessmentResult({
      modules: [
        {
          module_id: 'mod_2',
          title: 'Module 2',
          questions: [
            {
              id: 'q4',
              question_en: 'Question 4',
              question_sw: 'Swali 4',
              help_en: 'Help 4',
              help_sw: 'Msaada 4',
              answer_type: 'yesno' as const,
              weights: { yes: 42, no: 0 },
              driver_tag: 'feed_contamination',
              place_tag: 'Feed_store',
            },
          ],
        },
      ],
      answers: { q4: 'yes' },
      riskConfig,
      practiceCards,
    })

    expect(result.totalScore).toBe(42)
    expect(result.band.label).toBe('High')
    expect(result.band.message).toBe('High risk')
  })
})
