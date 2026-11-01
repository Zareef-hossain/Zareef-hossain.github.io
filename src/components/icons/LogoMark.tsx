import type { SVGProps } from 'react'

/** The site's existing mark (same artwork as public/favicon.svg). Decorative. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="6" fill="#0B1B33" />
      <path d="M10 10h12L10 22h12" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
