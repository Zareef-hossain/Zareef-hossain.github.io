import type { Project } from './types.ts'

// Project names are owner-confirmed. Everything else is unknown until provided.
// Repository visibility is 'unknown' until confirmed; private repos never get a URL.
const unknownProject = {
  summary: null,
  description: null,
  period: null,
  role: null,
  teamSize: null,
  myContributions: [],
  teamContributions: [],
  techStack: [],
  repo: { visibility: 'unknown' },
  demoUrl: null,
  image: null,
  relatedPublicationId: null,
} as const satisfies Omit<Project, 'id' | 'title'>

export const projects: readonly Project[] = [
  {
    ...unknownProject,
    id: 'shock-sense',
    title: 'Shock-Sense',
    relatedPublicationId: 'shock-sense', // Owner decision: shown in Publications and Projects.
  },
  { ...unknownProject, id: 'reroute-agro', title: 'Reroute Agro' },
  {
    ...unknownProject,
    id: 'university-management-system',
    title: 'University Management System Backend Software',
  },
  {
    ...unknownProject,
    id: 'airline-management-system',
    title: 'Airline Management System Backend Software',
  },
  {
    ...unknownProject,
    id: 'event-planning-vendor-management',
    title: 'Event Planning and Vendor Management System',
  },
]
