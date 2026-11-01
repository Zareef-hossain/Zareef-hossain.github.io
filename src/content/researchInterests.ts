import type { ResearchInterest } from './types.ts'

// Owner-approved titles and summaries — keep verbatim, do not paraphrase.
// relatedPublicationIds are owner-approved topical associations only (not claims about
// methods or publication status). Projects (e.g. Reroute Agro) never go in this field.
export const researchInterests: readonly ResearchInterest[] = [
  {
    id: 'machine-learning-ai',
    title: 'Machine Learning & AI',
    summary:
      'Exploring machine learning techniques and their potential applications in intelligent systems, data-driven decision-making, and practical problem-solving.',
    relatedPublicationIds: ['mri-ml-public-awareness', 'ml-bangladesh-primary-education'],
  },
  {
    id: 'ai-in-healthcare',
    title: 'AI in Healthcare',
    summary:
      'Interested in how artificial intelligence can support medical imaging, healthcare technologies, and the development of more accessible diagnostic tools.',
    relatedPublicationIds: ['mri-ml-public-awareness'],
  },
  {
    id: 'biomedical-monitoring-systems',
    title: 'Biomedical Monitoring Systems',
    summary:
      'Exploring affordable physiological monitoring approaches, sensor-based systems, and computational methods for identifying potential health risks.',
    relatedPublicationIds: ['shock-sense'],
  },
  {
    id: 'ai-for-education-social-impact',
    title: 'AI for Education & Social Impact',
    summary:
      'Interested in the application of AI and digital technologies to educational challenges, agricultural innovation, and socially relevant problems.',
    relatedPublicationIds: ['ml-bangladesh-primary-education'],
  },
]
