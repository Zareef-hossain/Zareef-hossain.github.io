import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { education } from '../content/education.ts'
import { profile } from '../content/profile.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'
import { formatPartialDate } from '../lib/date.ts'

interface Fact {
  term: string
  detail: ReactNode
}

function ProfileLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

/** Academic facts from confirmed content only; anything unknown is left out entirely. */
function academicFacts(): Fact[] {
  const degree = education[0]
  const end = degree?.period?.end ?? null
  const facts: Fact[] = [
    { term: 'Degree', detail: profile.degree },
    { term: 'Institution', detail: profile.institution },
  ]

  if (end !== null && end !== 'present') {
    facts.push({
      // Never inferred from today's date: only the owner marks a degree as completed.
      term: degree?.expected === false ? 'Graduated' : 'Expected graduation',
      detail: <time dateTime={end}>{formatPartialDate(end)}</time>,
    })
  }
  if (profile.location) facts.push({ term: 'Location', detail: profile.location })

  const { orcid, scholar } = profile.links
  if (orcid || scholar) {
    facts.push({
      term: 'Academic profiles',
      detail: (
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          {orcid && <ProfileLink href={orcid}>ORCID</ProfileLink>}
          {scholar && <ProfileLink href={scholar}>Google Scholar</ProfileLink>}
        </span>
      ),
    })
  }
  return facts
}

export function About() {
  if (!profile.bio || profile.bio.length === 0) {
    return (
      <>
        <PendingContent />
        <MissingField field="bio" />
      </>
    )
  }

  return (
    <div className="space-y-10">
      {/* The portrait floats beside the bio from sm, so the text wraps around it and then uses
          the full width; on phones it sits above the text. flow-root contains the float. */}
      <div className="max-w-prose flow-root space-y-5">
        {profile.aboutPhoto ? (
          <figure className="mb-6 w-44 rounded-2xl bg-linear-to-br from-accent via-violet/70 to-accent/30 p-[3px] shadow-card-hover sm:float-right sm:mb-4 sm:ml-8 sm:w-52 lg:w-56">
            <img
              src={profile.aboutPhoto.src}
              alt={profile.aboutPhoto.alt}
              width={profile.aboutPhoto.width}
              height={profile.aboutPhoto.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[calc(1rem-3px)] bg-surface object-cover object-top"
            />
          </figure>
        ) : (
          <MissingField field="aboutPhoto" />
        )}
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
        {academicFacts().map(({ term, detail }) => (
          <div key={term}>
            <dt className="font-mono text-meta tracking-wide text-ink-muted">{term}</dt>
            <dd className="mt-1 text-ink">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
