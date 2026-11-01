import type { Education, Training } from './types.ts'

// Degree and institution are owner-confirmed. Dates, location and highlights are unknown.
// CGPA is intentionally excluded from public content (owner decision).
export const education: readonly Education[] = [
  {
    id: 'aiub-bsc-cse',
    institution: 'American International University-Bangladesh (AIUB)',
    degree: 'B.Sc. in Computer Science and Engineering',
    location: null,
    period: null,
    highlights: [],
  },
]

// No training, courses or certifications confirmed yet.
export const training: readonly Training[] = []
