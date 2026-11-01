// Site structure: section ids (used as #anchors) and their navigation labels.
// Order here defines the order on the page and the section numbers ("01 — About").
export interface NavItem {
  id: string
  /** Short label for the navigation bar. */
  label: string
  /** Full heading shown on the section itself. */
  title: string
}

export const homeId = 'home'

export const sections: readonly NavItem[] = [
  { id: 'about', label: 'About', title: 'About Me' },
  { id: 'research', label: 'Research', title: 'Research Interests' },
  // Id kept as 'publications' so anchors and cross-links stay stable (owner decision on wording).
  { id: 'publications', label: 'Papers', title: 'Conference Papers & Presentations' },
  { id: 'projects', label: 'Projects', title: 'Projects' },
  { id: 'achievements', label: 'Awards', title: 'Awards & Achievements' },
  { id: 'skills', label: 'Skills', title: 'Technical Skills' },
  { id: 'education', label: 'Education', title: 'Education & Training' },
  { id: 'contact', label: 'Contact', title: 'Contact' },
]

// Stable per-item anchors for cross-links (e.g. #publication-shock-sense).
export const publicationAnchor = (id: string) => `publication-${id}`
export const projectAnchor = (id: string) => `project-${id}`
export const achievementAnchor = (id: string) => `achievement-${id}`

/** Two-digit section number for editorial labels, e.g. 3 → "03". */
export function sectionNumber(id: string): string {
  const index = sections.findIndex((s) => s.id === id)
  return String(index + 1).padStart(2, '0')
}
