import type { Project } from './types.ts'

// Owner-confirmed project descriptions (from the owner's CV). Highlights describe what each
// project covers and are not attributed to individuals: roles, team size and personal vs team
// contributions are unknown. Repository visibility is 'unknown' until confirmed; private repos
// never get a URL. No stack is listed unless the owner named it.
const unknownDetails = {
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
} as const satisfies Partial<Project>

export const projects: readonly Project[] = [
  {
    ...unknownDetails,
    id: 'reroute-agro',
    title: 'Reroute Agro',
    context: 'AI-Powered Agricultural Marketplace · Hackathon Project',
    summary:
      'A digital agricultural marketplace connecting farmers with wholesale buyers to improve market access and selling efficiency in Bangladesh.',
    highlights: [
      'Smart Selling Advisor comparing market prices, transport costs, spoilage risks and expected net proceeds',
      'Truck pooling for shared transportation costs',
      'Smart Hisab: digital invoicing, income and expense tracking, and financial records',
      'Bangla voice assistant for accessible information and services',
    ],
    period: { start: '2026', end: '2026' },
  },
  {
    ...unknownDetails,
    id: 'university-management-system',
    title: 'University Management System Backend Software',
    context: 'Academic Software Engineering Project',
    summary: 'Backend software for core university administration.',
    highlights: [
      'Student enrollment, course registration and faculty records',
      'Database operations and API endpoints',
      'Multiple administrative user roles',
    ],
  },
  {
    ...unknownDetails,
    id: 'airline-management-system',
    title: 'Airline Management System Backend Software',
    context: 'Object-Oriented Programming Project',
    summary: 'A backend system built in C# using object-oriented programming principles.',
    highlights: [
      'Flight scheduling, seat reservations and passenger ticketing',
      'Relational database connections for transactions and data persistence',
    ],
    techStack: ['C#', 'OOP'],
  },
  {
    ...unknownDetails,
    id: 'event-planning-vendor-management',
    title: 'Event Planning and Vendor Management System',
    context: 'Documentation Project · System Analysis and Design',
    summary:
      'System analysis and design documentation for an automated event planning and vendor coordination platform.',
    highlights: [
      'System requirement specification (SRS)',
      'Use-case diagrams and process workflows',
      'Risk assessment, system architecture and stakeholder documentation',
    ],
  },
  {
    ...unknownDetails,
    id: 'shock-sense',
    title: 'Shock-Sense',
    context: 'Physiological Monitoring System',
    summary:
      'A low-cost, rule-based physiological monitoring architecture for early hemorrhagic shock risk detection.',
    highlights: ['Real-time tracking of vital signs', 'Rule-based flagging of physiological anomalies'],
    relatedPublicationId: 'shock-sense', // Owner decision: shown in Publications and Projects.
  },
]
