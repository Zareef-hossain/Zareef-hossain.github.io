import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { revealTransition } from '../../lib/motion.ts'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait before animating, for gentle staggering of siblings. */
  delay?: number
}

/** Fades and lifts content once as it enters the viewport. Static when reduced motion is on. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  )
}
