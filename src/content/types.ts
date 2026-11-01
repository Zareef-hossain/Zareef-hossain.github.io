// Content schemas. Every portfolio fact on the site is typed here.
//
// Conventions:
// - `null` means "not known yet": the field is omitted in production and flagged in development.
// - Empty arrays mean "nothing provided yet" for list fields (contributions, tags, ...).
// - There are deliberately NO fields for phone numbers, home addresses, dates of birth,
//   student IDs, grades/CGPA or referee contacts. Do not add them. (The owner explicitly
//   approved publishing the student email address in `profile.emails`.)
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
  /** Intrinsic pixel size; reserves layout space before the file loads. */
  width: number
  height: number
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
  facebook: Maybe<string>
}

export interface Profile {
  name: string
  degree: string
  institution: string
  /** One-line research/engineering focus for the hero. */
  headline: Maybe<string>
  /** About Me paragraphs. */
  bio: Maybe<readonly string[]>
  /** Owner-approved statement about the opportunities sought (Contact section). */
  opportunityStatement: Maybe<string>
  location: Maybe<string>
  /** Owner-approved public email addresses, in display order. */
  emails: readonly string[]
  links: ProfileLinks
  /** Downloadable CV — only an owner-approved, redacted file in `public/cv/`. */
  cv: Maybe<{ path: PublicPath; label: string }>
  /** Main portrait (Hero). */
  photo: Maybe<Image>
  /** Secondary photo (About). */
  aboutPhoto: Maybe<Image>
}

// ---------------------------------------------------------------- Research

export interface ResearchInterest {
  id: string
  title: string
  summary: Maybe<string>
  /**
   * Publications on a related topic (ids from publications.ts). A topical association only —
   * not a claim about methods used or publication status.
   */
  relatedPublicationIds?: readonly string[]
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
  /** Where the venue took place, as the owner gave it (e.g. "IUBAT, Dhaka"). */
  venueLocation: Maybe<string>
  year: Maybe<number>
  /** Conference dates as display text, when known (e.g. "04–05 September 2026"). */
  eventDates: Maybe<string>
  /** Only set when the owner confirms it; no badge is shown while null. */
  status: Maybe<PublicationStatus>
  /** Short factual description from owner-confirmed material. Not the paper's abstract. */
  summary: Maybe<string>
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
  /** Short qualifier shown under the title, e.g. "Academic Software Engineering Project". */
  context: Maybe<string>
  summary: Maybe<string>
  description: Maybe<string>
  /** What the project covers (features, scope). Not attributed to any individual. */
  highlights: readonly string[]
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

export interface Volunteering {
  id: string
  role: string
  organization: string
  period: Maybe<Period>
  description: Maybe<string>
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
  /**
   * True while `period.end` is an expected completion date. Only the owner sets it to false,
   * once completion is confirmed — the UI never infers it from the current date.
   */
  expected: boolean
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
