import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cx } from '../../lib/cx.ts'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Icon shown before the label. Pass a Lucide/brand icon element. */
  icon?: ReactNode
  /** Icon shown after the label, e.g. a directional arrow. */
  iconAfter?: ReactNode
  children: ReactNode
  className?: string
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    /** Opens in a new tab with safe rel attributes and an external-link arrow. */
    external?: boolean
  }

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined
    external?: never
  }

export type ButtonProps = LinkProps | NativeButtonProps

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  secondary: 'border border-line-strong bg-bg text-ink hover:border-accent hover:text-accent',
  ghost: 'text-ink hover:bg-surface hover:text-accent',
}

// Both sizes keep a 44px minimum tap target.
const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-3.5 text-sm',
  md: 'min-h-11 px-5 text-[0.9375rem]',
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'className'> = {}): string {
  return cx(base, variants[variant], sizes[size], className)
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, icon, iconAfter, children, className, external, ...rest } = props
    return (
      <a
        {...rest}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={buttonClasses({ variant, size, className })}
      >
        {icon}
        {children}
        {iconAfter}
        {external && <ArrowUpRight aria-hidden="true" className="-mr-1 opacity-60" />}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    )
  }

  const { variant, size, icon, iconAfter, children, className, type = 'button', ...rest } = props
  return (
    <button {...rest} type={type} className={buttonClasses({ variant, size, className })}>
      {icon}
      {children}
      {iconAfter}
    </button>
  )
}
