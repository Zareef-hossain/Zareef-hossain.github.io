import { cx } from '../../lib/cx.ts'

interface MissingFieldProps {
  field: string
  /** Errors (invalid content) are emphasised; gaps (not provided yet) are muted. */
  tone?: 'gap' | 'error'
}

/**
 * DEVELOPMENT ONLY: marks content that is missing or invalid. Renders nothing in production,
 * so unknown facts are simply omitted from the public site.
 */
export function MissingField({ field, tone = 'gap' }: MissingFieldProps) {
  if (!import.meta.env.DEV) return null

  return (
    <span
      className={cx(
        'inline-flex items-center rounded border border-dashed px-1.5 py-px font-mono text-[0.6875rem] leading-4',
        tone === 'error' ? 'border-accent text-accent-strong' : 'border-line-strong text-ink-muted',
      )}
    >
      {tone === 'error' ? 'Invalid' : 'Missing'}: {field}
    </span>
  )
}
