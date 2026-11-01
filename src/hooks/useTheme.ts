import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// Must match the inline script in index.html, which applies the theme before first paint.
export const THEME_STORAGE_KEY = 'theme'
const systemDark = '(prefers-color-scheme: dark)'

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null // storage blocked (private mode, disabled site data)
  }
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0A1020' : '#FBFAF7')
}

/**
 * Current colour theme plus a toggle. A saved choice wins; otherwise the system preference is
 * followed live until the visitor picks a theme.
 */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    const media = window.matchMedia(systemDark)
    const onChange = (event: MediaQueryListEvent) => {
      if (readStored()) return
      const next: Theme = event.matches ? 'dark' : 'light'
      apply(next)
      setTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      apply(next)
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // Not persisted; the choice still applies for this visit.
      }
      return next
    })
  }, [])

  return [theme, toggle]
}
