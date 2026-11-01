import { ArrowRight } from 'lucide-react'
import { homeId } from '../content/navigation.ts'
import { profile } from '../content/profile.ts'
import { researchInterests } from '../content/researchInterests.ts'
import { Container } from '../components/layout/Container.tsx'
import { Reveal } from '../components/layout/Reveal.tsx'
import { SocialLinks } from '../components/layout/SocialLinks.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Button } from '../components/ui/Button.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'

// Hero built from confirmed content only. The headline, interest tags and portrait are omitted
// when absent. The portrait is the likely LCP element, so it loads eagerly at high priority.
export function Hero() {
  return (
    <section id={homeId} aria-labelledby="home-heading" className="pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        {profile.photo ? (
          <div className="lg:order-last lg:col-span-5">
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-36 rounded-lg border border-line bg-surface object-cover object-top sm:w-44 lg:ml-auto lg:w-full lg:max-w-sm"
            />
          </div>
        ) : (
          <MissingField field="photo" />
        )}
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
            <Button href="#projects" variant="secondary">
              Projects
            </Button>
            <SocialLinks className="sm:ml-2" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
