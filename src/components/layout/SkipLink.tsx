/** First focusable element: lets keyboard users jump past the navigation. */
export function SkipLink() {
  return (
    <a
      id="skip-link"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-accent-fill focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-accent"
    >
      Skip to content
    </a>
  )
}
