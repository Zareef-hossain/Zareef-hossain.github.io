/** Fallback for a section with no content; not rendered while every section has content. */
export function PendingContent() {
  return (
    <div className="rounded-lg border border-dashed border-line-strong px-6 py-10 text-center text-sm text-ink-muted">
      This section is being prepared.
    </div>
  )
}
