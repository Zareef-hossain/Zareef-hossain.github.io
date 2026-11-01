import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { homeId, sections } from '../../content/navigation.ts'
import { useActiveSection } from '../../hooks/useActiveSection.ts'
import { useScrolled } from '../../hooks/useScrolled.ts'
import { cx } from '../../lib/cx.ts'
import { menuTransition } from '../../lib/motion.ts'
import { LogoMark } from '../icons/LogoMark.tsx'
import { Container } from './Container.tsx'
import { ThemeToggle } from './ThemeToggle.tsx'
import { SocialLinks } from './SocialLinks.tsx'

const sectionIds = sections.map((s) => s.id)
// Page regions made inert while the mobile menu is open, so focus stays in the menu.
const backgroundIds = ['skip-link', 'main-content', 'site-footer']
const desktopQuery = '(min-width: 64rem)' // matches Tailwind's lg breakpoint

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const scrolled = useScrolled()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // While open: lock page scroll, make the rest of the page inert, close on Escape,
  // and close automatically if the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return

    const root = document.documentElement
    root.style.overflow = 'hidden'
    const background = backgroundIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    background.forEach((el) => (el.inert = true))
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true)
    }
    const desktop = window.matchMedia(desktopQuery)
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) close(false)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      root.style.overflow = ''
      background.forEach((el) => (el.inert = false))
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open, close])

  // The panel is a sibling of <header>, not a child: the header's backdrop-filter would
  // otherwise become the containing block for the fixed panel and clip it.
  return (
    <>
      <header
        className={cx(
          'sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-md transition-colors duration-200 supports-[backdrop-filter]:bg-bg/80',
          scrolled || open ? 'border-line' : 'border-transparent',
        )}
      >
        <Container className="flex h-(--header-height) items-center justify-between gap-6">
          <a
            href={`#${homeId}`}
            onClick={() => close(false)}
            className="inline-flex min-h-11 items-center gap-2.5 font-serif text-[1.125rem] font-semibold tracking-tight text-ink transition-colors hover:text-accent"
          >
            {/* Short brand name (owner decision); the full name stays in the hero, title and SEO. */}
            <LogoMark className="size-7 rounded-md ring-1 ring-line-strong/60" />
            Zareef
          </a>

          <nav aria-label="Primary" className="hidden lg:ml-auto lg:block">
            <ul className="flex items-center gap-1">
              {sections.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={cx(
                        'group relative flex h-11 items-center px-2.5 text-sm font-medium transition-colors duration-200',
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cx(
                          'absolute inset-x-2.5 bottom-1.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-out-soft',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-line-strong',
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* One theme toggle for all sizes: it stays usable while the mobile menu is open. */}
          <div className="-mr-2 flex items-center gap-1 lg:-ml-3 lg:-mr-2.5">
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close(true) : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface lg:hidden"
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={menuTransition}
            className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto bg-bg lg:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <nav aria-label="Primary">
                <ul className="divide-y divide-line">
                  {sections.map((item, index) => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <a
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={`#${item.id}`}
                          onClick={() => close(false)}
                          aria-current={isActive ? 'location' : undefined}
                          className={cx(
                            'flex min-h-14 items-baseline gap-4 py-3 font-serif text-[1.375rem] transition-colors',
                            isActive ? 'text-accent' : 'text-ink hover:text-accent',
                          )}
                        >
                          <span aria-hidden="true" className="w-6 shrink-0 font-mono text-meta text-ink-muted">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {item.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <SocialLinks className="mt-auto pt-8" />
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
