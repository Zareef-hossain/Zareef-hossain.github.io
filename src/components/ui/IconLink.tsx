import type { ComponentType, SVGProps } from 'react'
import { cx } from '../../lib/cx.ts'

interface IconLinkProps {
  href: string
  /** Accessible name; the icon itself is decorative. */
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
  className?: string
}

/** Square 44px icon-only link (social profiles, email). */
export function IconLink({ href, label, icon: Icon, external = true, className }: IconLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cx(
        'inline-flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent',
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-[1.125rem]" />
      <span className="sr-only">
        {label}
        {external && ' (opens in a new tab)'}
      </span>
    </a>
  )
}
