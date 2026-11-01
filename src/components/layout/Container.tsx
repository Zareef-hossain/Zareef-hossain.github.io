import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx.ts'

/** Centred page-width wrapper with responsive side gutters. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cx('mx-auto w-full max-w-page px-5 sm:px-8', className)} />
}
