import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { sectionNumber, sections } from './content/navigation.ts'
import { ContentGaps } from './components/dev/ContentGaps.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { PendingContent } from './components/layout/PendingContent.tsx'
import { Section } from './components/layout/Section.tsx'
import { SkipLink } from './components/layout/SkipLink.tsx'
import { About } from './sections/About.tsx'
import { Achievements } from './sections/Achievements.tsx'
import { Contact } from './sections/Contact.tsx'
import { Education } from './sections/Education.tsx'
import { Hero } from './sections/Hero.tsx'
import { Projects } from './sections/Projects.tsx'
import { Publications } from './sections/Publications.tsx'
import { ResearchInterests } from './sections/ResearchInterests.tsx'
import { Skills } from './sections/Skills.tsx'
import { StyleGuide } from './sections/StyleGuide.tsx'

// Section bodies, keyed by section id (see navigation.ts). PendingContent only appears for an id
// missing from this map, or inside a section whose content list has been emptied.
const sectionBodies: Partial<Record<string, ReactNode>> = {
  about: <About />,
  research: <ResearchInterests />,
  publications: <Publications />,
  projects: <Projects />,
  achievements: <Achievements />,
  skills: <Skills />,
  education: <Education />,
  contact: <Contact />,
}

export default function App() {
  return (
    // LazyMotion + `m` keeps the animation bundle small; `strict` forbids the heavier `motion.*`.
    // reducedMotion="user" disables transform animations when the OS asks for reduced motion.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Hero />
          {sections.map((section) => (
            <Section key={section.id} id={section.id} number={sectionNumber(section.id)} title={section.title}>
              {sectionBodies[section.id] ?? <PendingContent />}
              {import.meta.env.DEV && <ContentGaps section={section.id} />}
            </Section>
          ))}
          {import.meta.env.DEV && <StyleGuide />}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
