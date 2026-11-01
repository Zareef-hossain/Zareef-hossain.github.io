// Content schemas. Every portfolio fact on the site is typed here.
//
// Conventions:
// - `null` means "not known yet": the field is omitted in production and flagged in development.
// - Empty arrays mean "nothing provided yet" for list fields (contributions, tags, ...).
// - There are deliberately NO fields for phone numbers, home addresses, dates of birth,
//   student IDs, grades/CGPA or referee contacts. Do not add them.
// - Dates are partial ISO strings: "YYYY" or "YYYY-MM" (validated by scripts/check-content.ts).

export type Maybe<T> = T | null

/** "YYYY" or "YYYY-MM". */
export type PartialDate = string

/** Root-relative path to a file in `public/`, e.g. "/images/shock-sense.png". */
export type PublicPath = `/${string}`

export interface Image {
  src: PublicPath
  /** Describes the image for screen readers; required for every image. */
  alt: string
}

export interface Period {
  start: Maybe<PartialDate>
  /** "present" for ongoing work. */
  end: Maybe<PartialDate | 'present'>
}

// ---------------------------------------------------------------- Profile

export interface ProfileLinks {
  github: string
  linkedin: string
  orcid: Maybe<string>
  scholar: Maybe<string>
}

export interface Profile {
  name: string
  degree: string
  institution: string
  /** One-line research/engineering focus for the hero. */
  headline: Maybe<string>
  /** About Me paragraphs. */
  bio: Maybe<readonly string[]>
  location: Maybe<string>
  /** Public contact email. Owner decision: none is published (keep null). */
  email: Maybe<string>
  links: ProfileLinks
  /** Downloadable CV — only an owner-approved, redacted file in `public/cv/`. */
  cv: Maybe<{ path: PublicPath; label: string }>
  photo: Maybe<Image>
}

// ---------------------------------------------------------------- Research

export interface ResearchInterest {
  id: string
  title: string
  summary: Maybe<string>
}

export type PublicationStatus = 'published' | 'accepted' | 'under-review' | 'in-preparation'
export type VenueType = 'conference' | 'journal' | 'workshop' | 'preprint'

export interface Author {
  name: string
  /** Marks the portfolio owner so the UI can highlight them. */
  isOwner: boolean
}

/**
 * A paper PDF can only be added once the owner confirms the publisher permits posting it.
 * `permissionConfirmed: true` is required by the type, so an unconfirmed PDF cannot compile.
 */
export interface PublicationPdf {
  path: `/papers/${string}.pdf`
  version: 'preprint' | 'accepted-manuscript' | 'publisher'
  permissionConfirmed: true
}

export interface Publication {
  id: string
  title: string
  /** In publication order. */
  authors: Maybe<readonly Author[]>
  venue: Maybe<string>
  venueType: Maybe<VenueType>
  year: Maybe<number>
  status: Maybe<PublicationStatus>
  abstract: Maybe<string>
  methodology: Maybe<string>
  /** The owner's individual contributions only. */
  myContributions: readonly string[]
  /** Bare DOI, e.g. "10.1109/ABC.2026.123" (no https://doi.org/ prefix). */
  doi: Maybe<string>
  officialUrl: Maybe<string>
  pdf: Maybe<PublicationPdf>
  /** Must be reciprocated by the project's `relatedPublicationId`. */
  relatedProjectId: Maybe<string>
  tags: readonly string[]
}

// ---------------------------------------------------------------- Projects

/**
 * Only public repositories may carry a URL. Private-repo links (and source code) are never
 * published; `url?: never` makes adding one a type error.
 */
export type Repository =
  | { visibility: 'public'; url: string }
  | { visibility: 'private'; url?: never }
  | { visibility: 'unknown'; url?: never }

export interface Project {
  id: string
  title: string
  summary: Maybe<string>
  description: Maybe<string>
  period: Maybe<Period>
  role: Maybe<string>
  teamSize: Maybe<number>
  /** The owner's individual contributions only. */
  myContributions: readonly string[]
  /** Work done by the wider team (kept separate from the owner's). */
  teamContributions: readonly string[]
  techStack: readonly string[]
  repo: Repository
  demoUrl: Maybe<string>
  image: Maybe<Image>
  /** Must be reciprocated by the publication's `relatedProjectId`. */
  relatedPublicationId: Maybe<string>
}

// ---------------------------------------------------------------- Achievements

export interface Achievement {
  id: string
  /** The award itself, e.g. "Runner-up". */
  title: string
  /** Event name as the owner gave it. */
  event: string
  organizer: Maybe<string>
  year: Maybe<number>
  date: Maybe<PartialDate>
  location: Maybe<string>
  description: Maybe<string>
  role: Maybe<string>
  relatedProjectId: Maybe<string>
  /** Certificate or announcement link. */
  evidenceUrl: Maybe<string>
}

// ---------------------------------------------------------------- Skills

export interface SkillGroup {
  id: string
  label: string
  items: readonly string[]
}

// ---------------------------------------------------------------- Education

export interface Education {
  id: string
  institution: string
  /** Full degree name, e.g. "B.Sc. in Computer Science and Engineering". */
  degree: string
  location: Maybe<string>
  period: Maybe<Period>
  /** Grades/CGPA are intentionally not part of the schema (owner decision). */
  highlights: readonly string[]
}

export interface Training {
  id: string
  title: string
  provider: Maybe<string>
  date: Maybe<PartialDate>
  description: Maybe<string>
  credentialUrl: Maybe<string>
}
