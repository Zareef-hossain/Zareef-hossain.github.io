import { ArrowRight, Download } from 'lucide-react'
import { homeId } from '../content/navigation.ts'
import { profile } from '../content/profile.ts'
import { researchInterests } from '../content/researchInterests.ts'
import { Container } from '../components/layout/Container.tsx'
import { Reveal } from '../components/layout/Reveal.tsx'
import { SocialLinks } from '../components/layout/SocialLinks.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Button } from '../components/ui/Button.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'

// Hero built from confirmed content only. The headline, interest tags and photo are omitted
// when absent. The photo is the likely LCP element, so it loads eagerly at high priority.
export function Hero() {
  return (
    <section
      id={homeId}
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pt-32 lg:pb-28"
    >
      {/* Decorative background: two soft, static colour fields (no animation, no layout impact). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-accent/10 blur-3xl dark:bg-accent/10" />
        <div className="absolute top-1/3 -left-40 size-[28rem] rounded-full bg-violet/10 blur-3xl dark:bg-violet/[0.07]" />
      </div>

      {/* One image, two compositions: a full-width banner above the text on small screens, and a
          full-height panel at the right edge from lg (out of flow, beside the 7-column text, so it
          never sits under the text). .hero-photo fades its edges into the page background with
          CSS masks; the photo itself is shown unaltered (no filters, no edits to the file). */}
      {profile.photo ? (
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%]">
          <img
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={profile.photo.width}
            height={profile.photo.height}
            fetchPriority="high"
            decoding="async"
            className="hero-photo aspect-square max-h-[34rem] w-full object-cover object-[64%_20%] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:max-h-none"
          />
        </div>
      ) : (
        <MissingField field="photo" />
      )}

      <Container className="grid pt-4 sm:pt-6 lg:grid-cols-12 lg:gap-12 lg:pt-0">
        <Reveal className="max-w-3xl lg:col-span-7">
          <p className="font-mono text-meta tracking-wide text-accent">Research &amp; Engineering Portfolio</p>
          <h1 id="home-heading" className="mt-5 text-display font-semibold tracking-tight">
            {profile.name}
          </h1>
          {profile.headline ? (
            <p className="mt-6 max-w-2xl font-serif text-[1.25rem] leading-snug text-ink sm:text-[1.5rem]">
              {profile.headline}
            </p>
          ) : (
            <MissingField field="headline" />
          )}
          <p className="mt-5 max-w-prose text-body text-ink-muted sm:text-lead">
            {profile.degree}
            <br />
            {profile.institution}
          </p>

          {researchInterests.length > 0 && (
            <ul aria-label="Research interests" className="mt-6 flex flex-wrap gap-x-2">
              {researchInterests.map((interest) => (
                <li key={interest.id}>
                  {/* 44px-tall link around a compact tag keeps the tap target accessible. */}
                  <a href="#research" className="group inline-flex min-h-11 items-center">
                    <Badge
                      tone="accent"
                      className="transition-colors group-hover:bg-bg group-hover:ring-accent/50"
                    >
                      {interest.title}
                    </Badge>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#publications" iconAfter={<ArrowRight aria-hidden="true" />}>
              Conference papers
            </Button>
            {/* Rendered only when profile.cv points to an owner-approved PDF in public/cv/,
                so there is never a dead download link. */}
            {profile.cv && (
              <Button href={profile.cv.path} download variant="secondary" icon={<Download aria-hidden="true" />}>
                {profile.cv.label}
              </Button>
            )}
            <Button href="#projects" variant="secondary">
              Projects
            </Button>
          </div>
          {/* Profiles get their own row: three buttons plus icons do not fit one line in the
              text column, and wrapping them with the buttons looked accidental. */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-meta tracking-wide text-ink-muted">Profiles</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <SocialLinks />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
