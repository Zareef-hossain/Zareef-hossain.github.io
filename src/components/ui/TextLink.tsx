import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cx } from '../../lib/cx.ts'

interface TextLinkProps {
  href: string
  children: ReactNode
  /** Opens in a new tab with safe rel attributes; adds an external arrow and sr-only note. */
  external?: boolean
  /** Shows a right arrow for in-page cross-links. */
  arrow?: boolean
  className?: string
}

/** Underlined accent link with a 44px-tall hit area. */
export function TextLink({ href, children, external, arrow, className }: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cx(
        'inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent [&_svg]:size-3.5 [&_svg]:shrink-0',
        className,
      )}
    >
      {children}
      {arrow && !external && <ArrowRight aria-hidden="true" />}
      {external && <ArrowUpRight aria-hidden="true" />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}
