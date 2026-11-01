import { Fragment } from 'react'
import { projectAnchor, publicationAnchor } from '../content/navigation.ts'
import { projects } from '../content/projects.ts'
import { publications } from '../content/publications.ts'
import type { Publication, VenueType } from '../content/types.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Card } from '../components/ui/Card.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'
import { TextLink } from '../components/ui/TextLink.tsx'

const venueLabels: Record<VenueType, string> = {
  conference: 'Conference paper',
  journal: 'Journal article',
  workshop: 'Workshop paper',
  preprint: 'Preprint',
}

/** Author list in publication order, with the portfolio owner emphasised. */
function Authors({ authors }: { authors: Publication['authors'] }) {
  if (!authors) return <MissingField field="authors" />
  return (
    <p className="mt-3 text-[0.9375rem] leading-relaxed">
      <span className="sr-only">Authors: </span>
      {authors.map((author, i) => (
        <Fragment key={author.name}>
          {i > 0 && ', '}
          {author.isOwner ? <strong className="font-semibold text-ink">{author.name}</strong> : author.name}
        </Fragment>
      ))}
    </p>
  )
}

/**
 * Conference research work. Only confirmed facts are shown: no status badge, DOI, official link
 * or PDF appears until the owner supplies one (none is online yet).
 */
export function Publications() {
  if (publications.length === 0) return <PendingContent />

  return (
    <ol className="space-y-5">
      {publications.map((pub) => {
        const project = projects.find((p) => p.id === pub.relatedProjectId)
        const venue = [pub.venue, pub.venueLocation].filter(Boolean).join(', ')
        const when = pub.eventDates ?? pub.year
        return (
          <li key={pub.id}>
            <Card as="article" id={publicationAnchor(pub.id)} aria-labelledby={`${pub.id}-title`} className="scroll-mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {pub.venueType && <Badge tone="accent">{venueLabels[pub.venueType]}</Badge>}
                {pub.year && <Badge>{pub.year}</Badge>}
              </div>
              <h3 id={`${pub.id}-title`} className="mt-4 text-heading font-semibold">
                {pub.title}
              </h3>
              <Authors authors={pub.authors} />
              {venue ? (
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  <span className="sr-only">Venue: </span>
                  <span className="font-serif italic">{venue}</span>
                  {when && <> · {when}</>}
                </p>
              ) : (
                <MissingField field="venue" />
              )}
              {pub.summary && <p className="mt-4 border-t border-line pt-4">{pub.summary}</p>}
              {project && (
                <p className="mt-3">
                  <TextLink href={`#${projectAnchor(project.id)}`} arrow>
                    Related project: {project.title}
                  </TextLink>
                </p>
              )}
            </Card>
          </li>
        )
      })}
    </ol>
  )
}
