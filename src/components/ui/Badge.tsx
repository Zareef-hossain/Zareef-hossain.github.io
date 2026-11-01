import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx.ts'

type Tone = 'neutral' | 'accent' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  neutral: 'bg-surface text-ink-muted ring-line',
  accent: 'bg-accent-soft text-accent-strong ring-accent/20',
  outline: 'bg-card text-ink-body ring-line-strong',
}

/** Small mono label for metadata: venues, years, tech, status. */
export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      className={cx(
        'inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[0.75rem] leading-5 tracking-tight ring-1 ring-inset [&_svg]:size-3',
        tones[tone],
        className,
      )}
    />
  )
}
