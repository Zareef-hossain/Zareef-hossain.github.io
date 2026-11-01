import type { PartialDate, Period } from '../content/types.ts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

/** "2027-09" → "September 2027"; "2027" → "2027". Fixed English names, independent of locale. */
export function formatPartialDate(date: PartialDate): string {
  const [year, month] = date.split('-')
  const name = month ? MONTHS[Number(month) - 1] : undefined
  return name ? `${name} ${year}` : (year ?? date)
}

/** "2021"–"2022" → "2021–2022"; equal or one-sided periods show a single date. */
export function formatPeriod({ start, end }: Period): string | null {
  const to = end === 'present' ? 'Present' : end && formatPartialDate(end)
  const from = start && formatPartialDate(start)
  if (from && to && from !== to) return `${from}–${to}`
  return from ?? to ?? null
}
