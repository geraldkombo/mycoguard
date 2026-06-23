import localforage from 'localforage'

import type { AppLanguage, AssessmentRecord } from './data'

const appStorage = localforage.createInstance({
  name: 'mycoguard-kenya',
  storeName: 'offline_assessments',
})

const ASSESSMENTS_KEY = 'assessments'
const LANGUAGE_KEY = 'language'

export async function loadAssessments() {
  return (await appStorage.getItem<AssessmentRecord[]>(ASSESSMENTS_KEY)) ?? []
}

export async function saveAssessments(records: AssessmentRecord[]) {
  await appStorage.setItem(ASSESSMENTS_KEY, records)
}

export async function saveLanguage(language: AppLanguage) {
  await appStorage.setItem(LANGUAGE_KEY, language)
}

export async function loadLanguage() {
  return (await appStorage.getItem<AppLanguage>(LANGUAGE_KEY)) ?? 'en'
}
