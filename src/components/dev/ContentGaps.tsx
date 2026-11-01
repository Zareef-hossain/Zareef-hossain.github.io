import { useMemo } from 'react'
import { validateContent, type ContentIssue } from '../../content/validation.ts'
import { MissingField } from '../ui/MissingField.tsx'

/**
 * DEVELOPMENT ONLY: lists missing/invalid content for one section, so gaps are visible while
 * the site is being built. Rendered behind `import.meta.env.DEV` and stripped from production.
 * File-existence checks run only in `npm run check:content` (they need Node's filesystem).
 */
export function ContentGaps({ section }: { section: string }) {
  const issues = useMemo(() => validateContent().filter((i) => i.section === section), [section])
  if (!import.meta.env.DEV || issues.length === 0) return null

  const byRecord = new Map<string, ContentIssue[]>()
  for (const issue of issues) byRecord.set(issue.record, [...(byRecord.get(issue.record) ?? []), issue])

  return (
    <aside aria-label="Content gaps (development only)" className="mt-4 rounded-lg bg-surface px-5 py-4 text-sm">
      <p className="font-mono text-meta text-ink-muted">
        DEV · {issues.length} content {issues.length === 1 ? 'gap' : 'gaps'} — run npm run check:content
      </p>
      <ul className="mt-3 space-y-3">
        {[...byRecord].map(([record, items]) => (
          <li key={record}>
            <p className="font-medium text-ink">{record}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {items.map((i) => (
                <MissingField key={i.field} field={i.field} tone={i.severity === 'error' ? 'error' : 'gap'} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
