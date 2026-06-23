import { jsPDF } from 'jspdf'

import type { AssessmentRecord } from './data'
import { PERSISTENT_DISCLAIMER, SITE_NAME } from '../config/site'

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadTextFile(filename: string, mimeType: string, content: string) {
  downloadBlob(filename, new Blob([content], { type: mimeType }))
}

function escapeCsv(value: string) {
  const escaped = value.replaceAll('"', '""')
  return `"${escaped}"`
}

export function exportAssessmentsToCsv(records: AssessmentRecord[]) {
  const header = [
    'id',
    'createdAt',
    'language',
    'bandLabel',
    'totalScore',
    'triggeredTags',
    'recommendedActions',
  ]

  const rows = records.map((record) => [
    record.id,
    record.createdAt,
    record.language,
    record.bandLabel,
    String(record.totalScore),
    record.triggeredTags.join('; '),
    record.recommendedActions.map((action) => action.title).join('; '),
  ])

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escapeCsv(cell)).join(','))
    .join('\n')

  downloadTextFile(`mycoguard_assessments_${getDateStamp()}.csv`, 'text/csv;charset=utf-8', csv)
}

export function exportAssessmentsBackupJson(records: AssessmentRecord[]) {
  const payload = {
    schema: 'mycoguard_assessments_backup_v1',
    exportedAt: new Date().toISOString(),
    disclaimer: PERSISTENT_DISCLAIMER,
    records,
  }

  downloadTextFile(
    `mycoguard_assessments_backup_${getDateStamp()}.json`,
    'application/json;charset=utf-8',
    JSON.stringify(payload, null, 2),
  )
}

export function exportSingleAssessmentJson(record: AssessmentRecord) {
  const payload = {
    schema: 'mycoguard_assessment_v1',
    exportedAt: new Date().toISOString(),
    disclaimer: PERSISTENT_DISCLAIMER,
    record,
  }

  downloadTextFile(
    `mycoguard_assessment_${record.id}.json`,
    'application/json;charset=utf-8',
    JSON.stringify(payload, null, 2),
  )
}

export async function exportSingleAssessmentPdf(record: AssessmentRecord) {
  const { jsPDF: JsPDF } = await import('jspdf')
  const doc = new JsPDF({ unit: 'pt', format: 'a4' } as any)
  const pageWidth = doc.internal.pageSize.getWidth()
  const marginX = 48
  const contentWidth = pageWidth - marginX * 2

  let cursorY = 56

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(`${SITE_NAME} — Assessment Summary`, marginX, cursorY)

  cursorY += 24
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(`Saved: ${formatDateTime(record.createdAt)}`, marginX, cursorY)

  cursorY += 18
  doc.text(`Language: ${record.language === 'sw' ? 'Kiswahili' : 'English'}`, marginX, cursorY)

  cursorY += 26
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`Risk band: ${record.bandLabel} (score ${record.totalScore})`, marginX, cursorY)

  cursorY += 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  cursorY = addWrappedText(doc, record.bandMessage, marginX, cursorY, contentWidth, 15)

  cursorY += 18
  doc.setFont('helvetica', 'bold')
  doc.text('Triggered drivers', marginX, cursorY)

  cursorY += 14
  doc.setFont('helvetica', 'normal')
  const drivers = record.triggeredTags.length > 0 ? record.triggeredTags : ['None recorded']
  cursorY = addBullets(doc, drivers.map((tag) => tag.replaceAll('_', ' ')), marginX, cursorY, contentWidth)

  cursorY += 18
  doc.setFont('helvetica', 'bold')
  doc.text('Top recommended practices', marginX, cursorY)

  cursorY += 14
  doc.setFont('helvetica', 'normal')
  cursorY = addBullets(
    doc,
    record.recommendedActions.map((action) => `${action.title} — ${action.summary}`),
    marginX,
    cursorY,
    contentWidth,
  )

  cursorY += 22
  doc.setFont('helvetica', 'bold')
  doc.text('Disclaimer (verbatim)', marginX, cursorY)
  cursorY += 14
  doc.setFont('helvetica', 'normal')
  addWrappedText(doc, PERSISTENT_DISCLAIMER, marginX, cursorY, contentWidth, 15)

  doc.save(`mycoguard_assessment_${record.id}.pdf`)
}

export type GroupSummaryRow = {
  participantLabel: string
  record: AssessmentRecord
}

export async function exportGroupSummaryPdf(sessionName: string, rows: GroupSummaryRow[]) {
  const { jsPDF: JsPDF } = await import('jspdf')
  const doc = new JsPDF({ unit: 'pt', format: 'a4' } as any)
  const pageWidth = doc.internal.pageSize.getWidth()
  const marginX = 48
  const contentWidth = pageWidth - marginX * 2

  let cursorY = 56

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(`${SITE_NAME} — Group Summary`, marginX, cursorY)

  cursorY += 24
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(`Session: ${sessionName || 'Unnamed session'}`, marginX, cursorY)
  cursorY += 16
  doc.text(`Exported: ${new Date().toLocaleString()}`, marginX, cursorY)

  cursorY += 26
  doc.setFont('helvetica', 'bold')
  doc.text('Results table (summary)', marginX, cursorY)
  cursorY += 14
  doc.setFont('helvetica', 'normal')

  const lines = rows.map((row) => {
    const label = row.participantLabel || 'Participant'
    return `${label}: ${row.record.bandLabel} risk (score ${row.record.totalScore})`
  })

  cursorY = addBullets(doc, lines, marginX, cursorY, contentWidth)

  cursorY += 22
  doc.setFont('helvetica', 'bold')
  doc.text('Disclaimer (verbatim)', marginX, cursorY)
  cursorY += 14
  doc.setFont('helvetica', 'normal')
  addWrappedText(doc, PERSISTENT_DISCLAIMER, marginX, cursorY, contentWidth, 15)

  doc.save(`mycoguard_group_${getDateStamp()}.pdf`)
}

export type IcsTemplate = {
  title: string
  description: string
  recurrence?: string
}

export function exportIcsCalendar(template: IcsTemplate) {
  const now = new Date()
  const dtstamp = toIcsDateTimeUtc(now)
  const startDate = toIcsDateValue(now)
  const uid = `mycoguard-${now.getTime()}@local`

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${SITE_NAME}//OFFLINE//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `SUMMARY:${escapeIcsText(template.title)}`,
    `DESCRIPTION:${escapeIcsText(template.description + ' ' + PERSISTENT_DISCLAIMER)}`,
  ]

  const recurrence = template.recurrence?.trim()
  if (recurrence && !recurrence.toUpperCase().includes('FREQ=ONCE')) {
    lines.push(`RRULE:${recurrence}`)
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')

  downloadTextFile(`mycoguard_reminders_${getDateStamp()}.ics`, 'text/calendar;charset=utf-8', lines.join('\r\n'))
}

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
) {
  const lines = doc.splitTextToSize(text, width) as string[]
  lines.forEach((line: string) => {
    doc.text(line, x, y)
    y += lineHeight
  })
  return y
}

function addBullets(doc: jsPDF, items: string[], x: number, y: number, width: number) {
  const bulletIndent = 12
  const lineHeight = 15

  items.forEach((item) => {
    const lines = doc.splitTextToSize(item, width - bulletIndent) as string[]
    if (lines.length === 0) {
      return
    }
    doc.text('•', x, y)
    doc.text(lines[0], x + bulletIndent, y)
    y += lineHeight
    lines.slice(1).forEach((line: string) => {
      doc.text(line, x + bulletIndent, y)
      y += lineHeight
    })
  })

  return y
}

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function getDateStamp() {
  const now = new Date()
  const yyyy = String(now.getFullYear())
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

function toIcsDateTimeUtc(date: Date) {
  const yyyy = String(date.getUTCFullYear())
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const hh = String(date.getUTCHours()).padStart(2, '0')
  const mi = String(date.getUTCMinutes()).padStart(2, '0')
  const ss = String(date.getUTCSeconds()).padStart(2, '0')
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`
}

function toIcsDateValue(date: Date) {
  const yyyy = String(date.getFullYear())
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

function escapeIcsText(text: string) {
  return text
    .replaceAll('\\', '\\\\')
    .replaceAll('\n', '\\n')
    .replaceAll('\r', '')
    .replaceAll(',', '\\,')
    .replaceAll(';', '\\;')
}
