import type { Author, Publication } from './types.ts'

// Owner-confirmed conference research work (titles, authors, venues, dates). The owner confirms
// none of the papers is online on the conference websites yet, so there is no DOI, official link,
// PDF, indexing or peer-review status — do not add any until the owner supplies it.
// Summaries describe only what the owner's CV states; they are not the papers' abstracts.

const owner: Author = { name: 'Ifreet Zareef Hossain', isOwner: true }
const author = (name: string): Author => ({ name, isOwner: false })

const notOnline = {
  status: null,
  abstract: null,
  methodology: null,
  myContributions: [],
  doi: null,
  officialUrl: null,
  pdf: null,
  tags: [],
} as const satisfies Partial<Publication>

export const publications: readonly Publication[] = [
  {
    ...notOnline,
    id: 'shock-sense',
    title:
      'Shock-Sense: A Low-Cost Rule-Based Physiological Monitoring System for Early Hemorrhagic Shock Risk Detection',
    authors: [owner, author('Mahir Mohtab Ayman'), author('Md Sajid Hossain')],
    venue:
      'IEEE International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON)',
    venueType: 'conference',
    venueLocation: 'IUBAT, Dhaka',
    year: 2026,
    eventDates: '04–05 September 2026',
    summary:
      'A low-cost, rule-based physiological monitoring architecture aimed at the early detection of hemorrhagic shock risk, using real-time tracking of vital signs to flag physiological anomalies.',
    relatedProjectId: 'shock-sense', // Owner decision: shown in Publications and Projects.
  },
  {
    ...notOnline,
    id: 'mri-ml-public-awareness',
    title: 'Public Awareness and Expectations of Accelerated Reliable MRI Imaging Using Machine Learning',
    authors: [
      owner,
      author('Nafisa Siddiquee'),
      author('Mahir Mohtab Ayman'),
      author('Prantik Baroi'),
      author('Shraysree Mandal'),
      author('Juena Ahmed Noshin'),
    ],
    venue: 'International Conference on Electronics and Informatics (ICEI)',
    venueType: 'conference',
    venueLocation: 'Bangladesh',
    year: 2026,
    eventDates: null,
    summary:
      'Investigates public awareness, perceptions and societal expectations regarding the use of machine learning for accelerated, reliable MRI, analysing survey and data metrics to evaluate user trust and readiness for AI-supported medical imaging.',
    relatedProjectId: null,
  },
  {
    ...notOnline,
    id: 'ml-bangladesh-primary-education',
    title: "Machine Learning in Bangladesh's Primary Education",
    authors: [owner, author('Prantik Baroi'), author('Fahim Ahmed'), author('Dr. Fatema Tuj Zohra')],
    venue: 'International Conference on Applied Statistics and Data Science',
    venueType: 'conference',
    venueLocation: null,
    year: 2025,
    eventDates: null,
    summary:
      "Examines the feasibility, prospects and systemic challenges of applying machine learning and data-driven tools in Bangladesh's primary education, with analytical perspectives on student performance tracking and resource allocation.",
    relatedProjectId: null,
  },
]
