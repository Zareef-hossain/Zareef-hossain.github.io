import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './components/icons/BrandIcons.tsx'
import { profile } from './content/profile.ts'

// M0 placeholder page: verifies the toolchain (Tailwind, Motion, Lucide) and deployment.
// Replaced by the full single-page layout from M1 onward.
export default function App() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="font-mono text-sm tracking-wide text-accent">Portfolio — in development</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          {profile.degree}
          <br />
          {profile.institution}
        </p>
        <ul className="mt-8 flex gap-3">
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <GithubIcon aria-hidden="true" className="size-4" />
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-3.5 text-ink-muted" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <LinkedinIcon aria-hidden="true" className="size-4" />
              LinkedIn
              <ArrowUpRight aria-hidden="true" className="size-3.5 text-ink-muted" />
            </a>
          </li>
        </ul>
      </motion.div>
    </main>
  )
}
