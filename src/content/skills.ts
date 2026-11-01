import type { SkillGroup } from './types.ts'

// Owner-confirmed skills, grouped as in the owner's CV. No proficiency levels (none confirmed).
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'programming-languages',
    label: 'Programming Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'C', 'C#'],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    items: ['HTML', 'CSS', 'Front-End Development', 'REST APIs'],
  },
  {
    id: 'machine-learning-data',
    label: 'Machine Learning & Data',
    items: ['Fundamental Machine Learning', 'Data Analysis'],
  },
  {
    id: 'embedded-systems-hardware',
    label: 'Embedded Systems & Hardware',
    items: ['Arduino', 'ESP32', 'Microcontrollers', 'NI Multisim', 'Sensor Integration'],
  },
  {
    id: 'software-engineering',
    label: 'Software Engineering & Concepts',
    items: ['Object-Oriented Programming (OOP)', 'Software Development Life Cycle (SDLC)', 'Git', 'GitHub'],
  },
  {
    id: 'simulation-tools',
    label: 'Simulation & Tools',
    items: ['MATLAB', 'VS Code', 'Database Management (MySQL)'],
  },
]
