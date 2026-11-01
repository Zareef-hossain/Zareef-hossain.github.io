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
        'rounded-lg border border-line bg-bg',
        !flush && 'p-6 sm:p-7',
        interactive &&
          'transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-[0_1px_2px_rgb(11_27_51/0.04),0_8px_24px_-12px_rgb(11_27_51/0.12)]',
        className,
      )}
    />
  )
}
