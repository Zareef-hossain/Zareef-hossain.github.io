import type { Profile } from './types.ts'

// Only owner-confirmed facts. Unknown values stay null (never invent content).
export const profile: Profile = {
  name: 'Ifreet Zareef Hossain',
  degree: 'B.Sc. in Computer Science and Engineering',
  institution: 'American International University-Bangladesh (AIUB)',
  headline: null,
  bio: null,
  location: null,
  email: null, // Owner decision: no public email.
  links: {
    github: 'https://github.com/Zareef-hossain',
    linkedin: 'https://www.linkedin.com/in/ifreet-zareef-hossain-9838b2231/',
    orcid: null,
    scholar: null,
  },
  cv: null,
  photo: null,
}
