import type { Education, Training } from './types.ts'

// Owner-confirmed. AIUB: expected graduation September 2027 (start date unknown).
// HSC and SSC show the completion year only. Locations and highlights are unknown — do not
// invent them. CGPA/GPA are intentionally excluded from public content (owner decision).
export const education: readonly Education[] = [
  {
    id: 'aiub-bsc-cse',
    institution: 'American International University-Bangladesh (AIUB)',
    degree: 'B.Sc. in Computer Science and Engineering',
    location: null,
    period: { start: null, end: '2027-09' },
    expected: true, // Keep until the owner confirms graduation.
    highlights: [],
  },
  {
    id: 'hsc',
    institution: 'Chowmohani Govt. S.A. College',
    degree: 'Higher Secondary Certificate (HSC)',
    location: null,
    period: { start: null, end: '2020' },
    expected: false,
    highlights: [],
  },
  {
    id: 'ssc',
    institution: 'Noakhali Zilla School',
    degree: 'Secondary School Certificate (SSC)',
    location: null,
    period: { start: null, end: '2018' },
    expected: false,
    highlights: [],
  },
]

// Owner-confirmed courses. No credential IDs, verification links or durations are known.
const course = (id: string, title: string, provider: string, date: string): Training => ({
  id,
  title,
  provider,
  date,
  description: null,
  credentialUrl: null,
})

export const training: readonly Training[] = [
  course('fundamental-of-ml', 'Fundamental of ML', 'Gobeshona Learning', '2025'),
  course('oop-with-java', 'Object-Oriented Programming with Java', 'Udemy', '2025'),
  course('front-end-development', 'Front-End Development', 'Udemy', '2025'),
  course('master-in-javascript', 'Master in JavaScript', 'Coursera', '2025'),
  course('digital-marketing', 'Digital Marketing', 'SR Dream IT', '2024'),
]
