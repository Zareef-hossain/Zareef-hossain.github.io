import type { Transition } from 'motion/react'

// Shared motion presets. Keep animation subtle: one short fade-and-rise, no springs or parallax.
export const easeOutSoft: Transition['ease'] = [0.22, 1, 0.36, 1]

export const revealTransition: Transition = { duration: 0.45, ease: easeOutSoft }

export const menuTransition: Transition = { duration: 0.2, ease: easeOutSoft }
