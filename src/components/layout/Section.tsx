import type { ReactNode } from 'react'
import { Container } from './Container.tsx'
import { Reveal } from './Reveal.tsx'

interface SectionProps {
  id: string
  /** Two-digit editorial number, e.g. "03". */
  number: string
  title: string
  /** Optional one-line introduction under the title. */
  description?: ReactNode
  children: ReactNode
}

/**
 * Editorial section: numbered label and title in a narrow column (sticky on large screens),
 * content in the wide column. Stacks on small screens.
 */
export function Section({ id, number, title, description, children }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <header className="lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:col-span-4 lg:self-start">
          <p aria-hidden="true" className="flex items-center gap-3 font-mono text-meta tracking-wide text-accent">
            {number}
            <span className="h-0.5 w-10 rounded-full bg-linear-to-r from-accent to-violet/30" />
          </p>
          <h2 id={headingId} className="mt-3 text-title font-semibold tracking-tight">
            {title}
          </h2>
          {description && <p className="mt-4 max-w-prose text-ink-muted">{description}</p>}
        </header>
        <Reveal className="min-w-0 lg:col-span-8">{children}</Reveal>
      </Container>
    </section>
  )
}
