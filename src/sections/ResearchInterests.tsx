import { publicationAnchor } from '../content/navigation.ts'
import { publications } from '../content/publications.ts'
import { researchInterests } from '../content/researchInterests.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { Card } from '../components/ui/Card.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'

/** Titles of publications topically associated with an interest (unknown ids are skipped). */
function relatedTitles(ids: readonly string[] = []): { id: string; title: string }[] {
  return ids.flatMap((id) => {
    const publication = publications.find((p) => p.id === id)
    return publication ? [{ id, title: publication.title }] : []
  })
}

export function ResearchInterests() {
  if (researchInterests.length === 0) {
    return (
      <>
        <PendingContent />
        <MissingField field="researchInterests" />
      </>
    )
  }

  return (
    <ol className="grid gap-5 sm:grid-cols-2">
      {researchInterests.map((interest, index) => {
        const related = relatedTitles(interest.relatedPublicationIds)
        return (
          <li key={interest.id} className="flex">
            <Card as="article" interactive aria-labelledby={`interest-${interest.id}`} className="flex w-full flex-col">
              <p aria-hidden="true" className="font-mono text-meta text-accent">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 id={`interest-${interest.id}`} className="mt-2 text-heading font-semibold">
                {interest.title}
              </h3>
              {interest.summary ? (
                <p className="mt-3 text-[0.9375rem] leading-relaxed">{interest.summary}</p>
              ) : (
                <MissingField field="summary" />
              )}

              {related.length > 0 && (
                <div className="mt-auto pt-6">
                  <p className="font-mono text-meta text-ink-muted">Related work</p>
                  <ul className="mt-1">
                    {related.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${publicationAnchor(item.id)}`}
                          className="flex min-h-11 items-center py-1 text-sm leading-snug text-ink-body underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </li>
        )
      })}
    </ol>
  )
}
