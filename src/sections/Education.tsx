import { education, training } from '../content/education.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { formatPartialDate } from '../lib/date.ts'

/** Degrees and school certificates, then courses. No grades are ever shown (owner decision). */
export function Education() {
  if (education.length === 0 && training.length === 0) return <PendingContent />

  return (
    <div className="space-y-12">
      {education.length > 0 && (
        <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
          {education.map((item) => {
            const end = item.period?.end
            return (
              <li key={item.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2rem+4.5px)]"
                />
                {end && end !== 'present' && (
                  <p className="font-mono text-meta text-accent">
                    {/* Only the owner marks a degree as completed (`expected: false`). */}
                    {item.expected && 'Expected '}
                    <time dateTime={end}>{formatPartialDate(end)}</time>
                  </p>
                )}
                <h3 className="mt-1 text-heading font-semibold">{item.degree}</h3>
                <p className="mt-1 text-ink-muted">{item.institution}</p>
              </li>
            )
          })}
        </ol>
      )}

      {training.length > 0 && (
        <div>
          <h3 className="text-heading font-semibold">Training &amp; Certifications</h3>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {training.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <div>
                  <p className="font-medium text-ink">{item.title}</p>
                  {item.provider && <p className="text-[0.9375rem] text-ink-muted">{item.provider}</p>}
                </div>
                {item.date && (
                  <time dateTime={item.date} className="shrink-0 font-mono text-meta text-ink-muted">
                    {formatPartialDate(item.date)}
                  </time>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
