import { ArrowRight } from 'lucide-react'
import { homeId } from '../content/navigation.ts'
import { profile } from '../content/profile.ts'
import { Container } from '../components/layout/Container.tsx'
import { Reveal } from '../components/layout/Reveal.tsx'
import { SocialLinks } from '../components/layout/SocialLinks.tsx'
import { Button } from '../components/ui/Button.tsx'

// Foundation hero using confirmed facts only. Bio and research focus line are added in M3.
export function Hero() {
  return (
    <section id={homeId} aria-labelledby="home-heading" className="pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-28">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="font-mono text-meta tracking-wide text-accent">Research &amp; Engineering Portfolio</p>
          <h1 id="home-heading" className="mt-5 text-display font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-prose text-body text-ink-muted sm:text-lead">
            {profile.degree}
            <br />
            {profile.institution}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#publications" iconAfter={<ArrowRight aria-hidden="true" />}>
              Research publications
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
