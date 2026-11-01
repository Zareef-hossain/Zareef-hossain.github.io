import type { Achievement, Volunteering } from './types.ts'

// Owner-confirmed: Runner-up, "Hack for Humanity: Hack to Protect the Environment,
// Powered by AI Collective" (2026), for developing and presenting Reroute Agro. The event name
// is kept exactly as given; organizer, date, location, role and evidence link are unknown.
export const achievements: readonly Achievement[] = [
  {
    id: 'hack-for-humanity-2026',
    title: 'Hackathon Runner-up',
    event: 'Hack for Humanity: Hack to Protect the Environment, Powered by AI Collective',
    organizer: null,
    year: 2026,
    date: null,
    location: null,
    description:
      "Runner-up for developing and presenting Reroute Agro, an AI-powered agricultural marketplace addressing farmers' market-access, transportation and post-harvest loss challenges in Bangladesh.",
    role: null,
    relatedProjectId: 'reroute-agro',
    evidenceUrl: null,
  },
]

// Owner-confirmed volunteer roles (shown as a subsection of Awards & Achievements).
export const volunteering: readonly Volunteering[] = [
  {
    id: 'comsol-seminar-2026',
    role: 'Event Volunteer',
    organization: 'Seminar on Semiconductor Device Modeling and COMSOL Multiphysics',
    period: { start: '2026', end: '2026' },
    description: 'Crowd management, workshop session coordination and attendee guidance.',
  },
  {
    id: 'activepulse-marathon-2025',
    role: 'Marathon Kit Volunteer & Race Track Handler',
    organization: 'Activepulse Bangladesh Marathon',
    period: { start: '2025', end: '2025' },
    description: 'Marathon kit distribution and race track coordination.',
  },
  {
    id: 'nusdf-campus-ambassador',
    role: 'Campus Ambassador',
    organization: 'National University Skill Development Forum (NUSDF)',
    period: { start: '2021', end: '2022' },
    description: null,
  },
  {
    id: 'imun-campus-ambassador',
    role: 'Campus Ambassador',
    organization: 'International Model United Nations (IMUN), Indonesia',
    period: { start: '2020', end: '2021' },
    description: null,
  },
]
