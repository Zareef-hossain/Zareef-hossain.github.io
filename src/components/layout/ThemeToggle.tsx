import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.ts'
import { cx } from '../../lib/cx.ts'

/** 44px icon button that switches between light and dark themes. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, toggle] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cx(
        'inline-flex size-11 items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-surface hover:text-ink',
        className,
      )}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
    </button>
  )
}
