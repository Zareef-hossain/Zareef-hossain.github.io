import { ArrowUp } from 'lucide-react'
import { homeId } from '../../content/navigation.ts'
import { profile } from '../../content/profile.ts'
import { Container } from './Container.tsx'
import { SocialLinks } from './SocialLinks.tsx'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="site-footer" className="border-t border-line bg-surface">
      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">{profile.name}</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {profile.degree}
              <br />
              {profile.institution}
            </p>
          </div>
          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 text-meta text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <a
            href={`#${homeId}`}
            className="inline-flex min-h-11 items-center gap-1.5 self-start transition-colors hover:text-accent sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
