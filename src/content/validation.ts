// Content validation shared by scripts/check-content.ts (CLI, runs in the build) and the
// dev-only gap indicators in the UI. Pure TypeScript: no DOM or Node APIs, so it runs in both.
//
// Severity:
// - 'error' — invalid or unsafe content (bad link, broken cross-reference, private data).
//   Fails the content check and therefore the build.
// - 'gap'   — information not provided yet (null fields, empty lists). Reported, never fatal.

import { achievements } from './achievements.ts'
import { education, training } from './education.ts'
import { profile } from './profile.ts'
import { projects } from './projects.ts'
import { publications } from './publications.ts'
import { researchInterests } from './researchInterests.ts'
import { skillGroups } from './skills.ts'

export type IssueSeverity = 'error' | 'gap'

export interface ContentIssue {
  severity: IssueSeverity
  /** Section anchor id the content belongs to (see navigation.ts). */
  section: string
  /** Human-readable record name, e.g. a paper title. */
  record: string
  field: string
  message: string
}

export interface ValidateOptions {
  /** Checks that a root-relative public path exists. Omitted in the browser. */
  fileExists?: (publicPath: string) => boolean
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PARTIAL_DATE = /^\d{4}(?:-(0[1-9]|1[0-2]))?$/
const DOI_PATTERN = /^10\.\d{4,9}\/\S+$/
// Privacy scan: anything resembling a phone number or email address, and grade terms.
const PHONE_PATTERN = /\+?\d[\d\s().-]{7,}\d/
const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[a-z]{2,}/i
const GRADE_PATTERN = /\b(c?gpa)\b/i

const isBlank = (value: unknown) =>
  value === null || (Array.isArray(value) && value.length === 0)

export function validateContent(options: ValidateOptions = {}): ContentIssue[] {
  const issues: ContentIssue[] = []
  const add = (severity: IssueSeverity, section: string, record: string, field: string, message: string) =>
    issues.push({ severity, section, record, field, message })

  /** Reports each listed field that is null or an empty array as a gap. */
  function gaps<T extends object>(section: string, record: string, item: T, fields: readonly (keyof T & string)[]) {
    for (const field of fields) {
      if (isBlank(item[field])) add('gap', section, record, field, 'not provided yet')
    }
  }

  function url(section: string, record: string, field: string, value: string | null) {
    if (value === null) return
    try {
      if (new URL(value).protocol !== 'https:') add('error', section, record, field, `must use https: ${value}`)
    } catch {
      add('error', section, record, field, `invalid URL: ${value}`)
    }
  }

  function file(section: string, record: string, field: string, path: string | null) {
    if (path === null || !options.fileExists) return
    if (!options.fileExists(path)) add('error', section, record, field, `file not found in public/: ${path}`)
  }

  function date(section: string, record: string, field: string, value: string | null) {
    if (value !== null && value !== 'present' && !PARTIAL_DATE.test(value)) {
      add('error', section, record, field, `expected YYYY or YYYY-MM: ${value}`)
    }
  }

  function year(section: string, record: string, field: string, value: number | null) {
    const max = new Date().getFullYear() + 1
    if (value !== null && (!Number.isInteger(value) || value < 1990 || value > max)) {
      add('error', section, record, field, `implausible year: ${value}`)
    }
  }

  function ids(section: string, items: readonly { id: string }[]) {
    const seen = new Set<string>()
    for (const { id } of items) {
      if (!ID_PATTERN.test(id)) add('error', section, id, 'id', 'use lowercase-kebab-case')
      if (seen.has(id)) add('error', section, id, 'id', 'duplicate id')
      seen.add(id)
    }
  }

  function emptyCollection(section: string, name: string, items: readonly unknown[]) {
    if (items.length === 0) add('gap', section, name, 'entries', 'no entries yet')
  }

  // ---------------------------------------------------------------- Profile (About)
  {
    const s = 'about'
    const r = 'Profile'
    gaps(s, r, profile, ['headline', 'bio', 'location', 'photo', 'cv'])
    gaps(s, r, profile.links, ['orcid', 'scholar'])
    // profile.email is intentionally null (owner decision) and is not a gap.
    url(s, r, 'links.github', profile.links.github)
    url(s, r, 'links.linkedin', profile.links.linkedin)
    url(s, r, 'links.orcid', profile.links.orcid)
    url(s, r, 'links.scholar', profile.links.scholar)
    file(s, r, 'cv', profile.cv?.path ?? null)
    file(s, r, 'photo', profile.photo?.src ?? null)
  }

  // ---------------------------------------------------------------- Research interests
  ids('research', researchInterests)
  emptyCollection('research', 'Research interests', researchInterests)
  for (const item of researchInterests) gaps('research', item.title, item, ['summary'])

  // ---------------------------------------------------------------- Publications
  ids('publications', publications)
  for (const pub of publications) {
    const s = 'publications'
    gaps(s, pub.title, pub, ['authors', 'venue', 'venueType', 'year', 'status', 'abstract', 'methodology', 'myContributions'])
    if (pub.doi === null && pub.officialUrl === null) add('gap', s, pub.title, 'doi/officialUrl', 'no DOI or official link yet')
    if (pub.pdf === null) add('gap', s, pub.title, 'pdf', 'not provided (requires owner permission)')
    if (pub.doi !== null && !DOI_PATTERN.test(pub.doi)) add('error', s, pub.title, 'doi', `expected a bare DOI like 10.xxxx/...: ${pub.doi}`)
    if (pub.authors !== null && !pub.authors.some((a) => a.isOwner)) add('error', s, pub.title, 'authors', 'owner is not marked in the author list')
    if (pub.pdf !== null && pub.pdf.permissionConfirmed !== true) add('error', s, pub.title, 'pdf', 'posting permission not confirmed')
    year(s, pub.title, 'year', pub.year)
    url(s, pub.title, 'officialUrl', pub.officialUrl)
    file(s, pub.title, 'pdf', pub.pdf?.path ?? null)

    if (pub.relatedProjectId !== null) {
      const project = projects.find((p) => p.id === pub.relatedProjectId)
      if (!project) add('error', s, pub.title, 'relatedProjectId', `no project with id "${pub.relatedProjectId}"`)
      else if (project.relatedPublicationId !== pub.id) {
        add('error', s, pub.title, 'relatedProjectId', `project "${project.id}" does not link back to this publication`)
      }
    }
  }

  // ---------------------------------------------------------------- Projects
  ids('projects', projects)
  for (const project of projects) {
    const s = 'projects'
    const r = project.title
    gaps(s, r, project, ['summary', 'description', 'period', 'role', 'teamSize', 'myContributions', 'techStack'])
    if (project.repo.visibility === 'unknown') add('gap', s, r, 'repo', 'visibility not confirmed (public/private)')
    if (project.repo.visibility !== 'public' && 'url' in project.repo) add('error', s, r, 'repo', 'non-public repository must not have a URL')
    if (project.repo.visibility === 'public') url(s, r, 'repo.url', project.repo.url)
    if (project.teamSize !== null && (!Number.isInteger(project.teamSize) || project.teamSize < 1)) {
      add('error', s, r, 'teamSize', `must be a positive integer: ${project.teamSize}`)
    }
    if (project.period) {
      date(s, r, 'period.start', project.period.start)
      date(s, r, 'period.end', project.period.end)
    }
    url(s, r, 'demoUrl', project.demoUrl)
    file(s, r, 'image', project.image?.src ?? null)

    if (project.relatedPublicationId !== null) {
      const pub = publications.find((p) => p.id === project.relatedPublicationId)
      if (!pub) add('error', s, r, 'relatedPublicationId', `no publication with id "${project.relatedPublicationId}"`)
      else if (pub.relatedProjectId !== project.id) {
        add('error', s, r, 'relatedPublicationId', `publication "${pub.id}" does not link back to this project`)
      }
    }
  }

  // ---------------------------------------------------------------- Achievements
  ids('achievements', achievements)
  for (const item of achievements) {
    const s = 'achievements'
    const r = `${item.title} — ${item.event}`
    gaps(s, r, item, ['date', 'location', 'description', 'role', 'evidenceUrl'])
    year(s, r, 'year', item.year)
    date(s, r, 'date', item.date)
    url(s, r, 'evidenceUrl', item.evidenceUrl)
    if (item.relatedProjectId !== null && !projects.some((p) => p.id === item.relatedProjectId)) {
      add('error', s, r, 'relatedProjectId', `no project with id "${item.relatedProjectId}"`)
    }
  }

  // ---------------------------------------------------------------- Skills
  ids('skills', skillGroups)
  emptyCollection('skills', 'Technical skills', skillGroups)
  for (const group of skillGroups) {
    if (group.items.length === 0) add('gap', 'skills', group.label, 'items', 'no skills listed')
  }

  // ---------------------------------------------------------------- Education & training
  ids('education', [...education, ...training])
  for (const item of education) {
    gaps('education', item.degree, item, ['location', 'period'])
    if (item.period) {
      date('education', item.degree, 'period.start', item.period.start)
      date('education', item.degree, 'period.end', item.period.end)
    }
  }
  emptyCollection('education', 'Training & certifications', training)
  for (const item of training) {
    gaps('education', item.title, item, ['provider', 'date'])
    date('education', item.title, 'date', item.date)
    url('education', item.title, 'credentialUrl', item.credentialUrl)
  }

  // ---------------------------------------------------------------- Privacy scan
  // Rejects phone numbers, email addresses (other than an approved profile.email) and
  // grade terms anywhere in content. URLs are skipped: IDs in them look like numbers.
  const collections = { profile, researchInterests, publications, projects, achievements, skillGroups, education, training }
  for (const [name, value] of Object.entries(collections)) {
    for (const [path, text] of strings(value, name)) {
      if (/^https?:\/\//.test(text) || text.startsWith('/')) continue
      if (text === profile.email) continue
      if (EMAIL_PATTERN.test(text)) add('error', 'privacy', path, 'text', 'looks like an email address')
      else if (PHONE_PATTERN.test(text)) add('error', 'privacy', path, 'text', 'looks like a phone number')
      if (GRADE_PATTERN.test(text)) add('error', 'privacy', path, 'text', 'grades/CGPA must not be published')
    }
  }

  return issues
}

/** Yields [path, value] for every string nested in a content value. */
function* strings(value: unknown, path: string): Generator<[string, string]> {
  if (typeof value === 'string') yield [path, value]
  else if (Array.isArray(value)) for (const [i, v] of value.entries()) yield* strings(v, `${path}[${i}]`)
  else if (value !== null && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) yield* strings(v, `${path}.${key}`)
  }
}
