import type { ComponentType, SVGProps } from 'react'
import { ArrowUpRight, IdCard, Mail } from 'lucide-react'
import { profile } from '../content/profile.ts'
import { FacebookIcon, GithubIcon, LinkedinIcon } from '../components/icons/BrandIcons.tsx'

interface ProfileItem {
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const rowLink =
  'group flex min-h-11 items-center gap-3 py-2 text-ink transition-colors hover:text-accent [&_svg]:shrink-0'

/** Approved research statement, email addresses and public profiles. No form or backend. */
export function Contact() {
  const { github, linkedin, orcid, facebook } = profile.links
  const profiles: ProfileItem[] = [
    { label: 'GitHub', href: github, icon: GithubIcon },
    { label: 'LinkedIn', href: linkedin, icon: LinkedinIcon },
    ...(orcid ? [{ label: 'ORCID', href: orcid, icon: IdCard }] : []),
    ...(facebook ? [{ label: 'Facebook', href: facebook, icon: FacebookIcon }] : []),
  ]

  return (
    <div className="space-y-10">
      {profile.opportunityStatement && (
        <p className="rounded-xl border border-line border-l-4 border-l-accent bg-linear-to-br from-accent-soft/80 to-card px-5 py-5 font-serif text-[1.1875rem] leading-relaxed text-ink shadow-card sm:px-7 sm:py-6 sm:text-lead">
          {profile.opportunityStatement}
        </p>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        {profile.emails.length > 0 && (
          <div>
            <h3 className="font-mono text-meta font-normal tracking-wide text-ink-muted">Email</h3>
            <ul className="mt-2">
              {profile.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className={rowLink}>
                    <Mail aria-hidden="true" className="size-4 text-ink-muted group-hover:text-accent" />
                    <span className="min-w-0 break-all underline decoration-line-strong underline-offset-4 group-hover:decoration-accent">
                      {email}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="font-mono text-meta font-normal tracking-wide text-ink-muted">Profiles</h3>
          <ul className="mt-2">
            {profiles.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={rowLink}>
                  <Icon aria-hidden="true" className="size-4 text-ink-muted group-hover:text-accent" />
                  <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-accent">
                    {label}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
