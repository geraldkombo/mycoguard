import { createAssessmentRecord } from '../features/app/utils/createAssessmentRecord'

describe('createAssessmentRecord', () => {
  test('builds a valid AssessmentRecord from complete answers', () => {
    const record = createAssessmentRecord({}, 'en')

    expect(record).toMatchObject({
      id: expect.stringMatching(/^assessment-/),
      createdAt: expect.any(String),
      language: 'en',
      answers: {},
    })
    expect(typeof record.totalScore).toBe('number')
    expect(typeof record.bandLabel).toBe('string')
    expect(Array.isArray(record.triggeredTags)).toBe(true)
    expect(Array.isArray(record.recommendedActions)).toBe(true)
    expect(typeof record.disclaimer).toBe('string')
  })

  test('creates a swahili record with expected language', () => {
    const record = createAssessmentRecord({}, 'sw')
    expect(record.language).toBe('sw')
  })
})
