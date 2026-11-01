import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { sectionNumber, sections } from './content/navigation.ts'
import { ContentGaps } from './components/dev/ContentGaps.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { PendingContent } from './components/layout/PendingContent.tsx'
import { Section } from './components/layout/Section.tsx'
import { SkipLink } from './components/layout/SkipLink.tsx'
import { Hero } from './sections/Hero.tsx'
import { StyleGuide } from './sections/StyleGuide.tsx'

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
          {/* Section shells; each is replaced by its dedicated component in M3–M6. */}
          {sections.map((section) => (
            <Section key={section.id} id={section.id} number={sectionNumber(section.id)} title={section.title}>
              <PendingContent />
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
