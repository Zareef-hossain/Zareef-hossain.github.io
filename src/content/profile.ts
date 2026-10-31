// Single source of truth for profile details. Only facts confirmed by the owner;
// unknown values stay null (never invent content). Full schema arrives in M2.
export const profile = {
  name: 'Ifreet Zareef Hossain',
  degree: 'B.Sc. in Computer Science and Engineering',
  institution: 'American International University-Bangladesh (AIUB)',
  links: {
    github: 'https://github.com/Zareef-hossain',
    linkedin: 'https://www.linkedin.com/in/ifreet-zareef-hossain-9838b2231/',
  },
  email: null as string | null, // Pending owner confirmation of public email.
} as const
