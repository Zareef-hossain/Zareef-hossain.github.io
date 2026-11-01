import type { Profile } from './types.ts'

// Only owner-confirmed facts. Unknown values stay null (never invent content).
// headline and bio are owner-approved text — keep verbatim, do not paraphrase.
export const profile: Profile = {
  name: 'Ifreet Zareef Hossain',
  degree: 'B.Sc. in Computer Science and Engineering',
  institution: 'American International University-Bangladesh (AIUB)',
  headline:
    'Computer Science Undergraduate Exploring Machine Learning, Biomedical Systems, and AI for Real-World Applications.',
  bio: [
    'I am Ifreet Zareef Hossain, an undergraduate student pursuing a Bachelor of Science in Computer Science and Engineering at the American International University-Bangladesh (AIUB), with an expected graduation date of September 2027.',
    "My academic interests lie in machine learning, artificial intelligence, biomedical monitoring systems, and the application of technology to challenges in healthcare, education, and society. My academic work has explored topics including physiological monitoring for early hemorrhagic shock risk detection, public awareness of machine learning-based MRI acceleration, and machine learning in Bangladesh's primary education sector.",
    'Alongside my research-related activities, I have worked on software development projects involving backend systems and practical technology applications. These experiences have encouraged me to explore how computational methods and engineering solutions can address real-world problems.',
    'I am interested in continuing to develop my research skills, strengthen my technical foundations, and contribute to meaningful interdisciplinary projects.',
  ],
  opportunityStatement:
    'Open to research internship opportunities in Biomedical Sciences, Artificial Intelligence (AI), Machine Learning (ML), Healthcare, and Agriculture, with a strong interest in interdisciplinary research and real-world applications.',
  location: null,
  // All three addresses explicitly approved for publication by the owner.
  emails: ['hossainzareef.93@gmail.com', 'zareefhossain.93@gmail.com', '23-53186-3@student.aiub.edu'],
  links: {
    github: 'https://github.com/Zareef-hossain',
    linkedin: 'https://www.linkedin.com/in/ifreet-zareef-hossain-9838b2231',
    orcid: 'https://orcid.org/0009-0006-3760-6091',
    scholar: null, // No Google Scholar profile confirmed.
    facebook: 'https://www.facebook.com/zareef.hossain.94',
  },
  // A public-safe CV has not been approved: the supplied PDF contains private data.
  cv: null,
  photo: {
    src: '/images/profile.jpg',
    alt: 'Portrait of Ifreet Zareef Hossain wearing a blue collared shirt against a plain white background',
    width: 800,
    height: 1005,
  },
  // Same 1347×900 pixels as the owner's original section.jpg, re-encoded (918 kB → 315 kB).
  aboutPhoto: {
    src: '/images/section-optimized.jpg',
    alt: 'Ifreet Zareef Hossain seated on an outdoor bench in a light blue shirt, wearing an event lanyard',
    width: 1347,
    height: 900,
  },
}
