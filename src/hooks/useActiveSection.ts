import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the reading zone (a band ~40% from the top
 * of the viewport), or null when above the first section (e.g. on the hero).
 * At the very bottom of the page the last section wins, since a short final section
 * may never reach the reading zone.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    const update = () => {
      if (isAtBottom()) setActive(ids[ids.length - 1] ?? null)
      else setActive(ids.find((id) => visible.has(id)) ?? null)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        update()
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    window.addEventListener('scroll', update, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [ids])

  return active
}
