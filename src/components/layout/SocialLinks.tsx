import { profile } from '../../content/profile.ts'
import { cx } from '../../lib/cx.ts'
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons.tsx'
import { IconLink } from '../ui/IconLink.tsx'

/** Compact icon row (hero, footer). The Contact section lists every email and profile. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cx('flex gap-2', className)}>
      <li>
        <IconLink href={profile.links.github} label="GitHub" icon={GithubIcon} />
      </li>
      <li>
        <IconLink href={profile.links.linkedin} label="LinkedIn" icon={LinkedinIcon} />
      </li>
    </ul>
  )
}
