import type { ElementType, HTMLAttributes } from 'react'
import { cx } from '../../lib/cx.ts'

interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Rendered element; use 'article' for self-contained entries such as papers/projects. */
  as?: ElementType
  /** Adds a hover state for cards that are themselves interactive or contain a primary link. */
  interactive?: boolean
  /** Removes inner padding when the card manages its own layout (e.g. image + body). */
  flush?: boolean
}

export function Card({ as: Tag = 'div', interactive, flush, className, ...rest }: CardProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        'rounded-xl border border-line bg-card shadow-card',
        !flush && 'p-6 sm:p-7',
        // Elevation only (no movement), so hovering never shifts layout.
        interactive && 'transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-card-hover',
        className,
      )}
    />
  )
}
