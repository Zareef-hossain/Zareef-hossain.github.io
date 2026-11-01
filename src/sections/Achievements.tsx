import { Award } from 'lucide-react'
import { achievements, volunteering } from '../content/achievements.ts'
import { achievementAnchor, projectAnchor } from '../content/navigation.ts'
import { projects } from '../content/projects.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { Card } from '../components/ui/Card.tsx'
import { TextLink } from '../components/ui/TextLink.tsx'
import { formatPeriod } from '../lib/date.ts'

/** Awards, then volunteer experience as a subsection (keeps the navigation unchanged). */
export function Achievements() {
  if (achievements.length === 0 && volunteering.length === 0) return <PendingContent />

  return (
    <div className="space-y-12">
      {achievements.length > 0 && (
        <ul className="space-y-5">
          {achievements.map((item) => {
            const project = projects.find((p) => p.id === item.relatedProjectId)
            return (
              <li key={item.id}>
                <Card
                  as="article"
                  id={achievementAnchor(item.id)}
                  aria-labelledby={`${item.id}-title`}
                  className="flex scroll-mt-6 gap-5"
                >
                  <span
                    aria-hidden="true"
                    className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-accent-fill to-accent-fill-hover text-on-accent shadow-card sm:inline-flex"
                  >
                    <Award className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 id={`${item.id}-title`} className="text-heading font-semibold">
                        {item.title}
                      </h3>
                      {item.year && <p className="font-mono text-meta text-ink-muted">{item.year}</p>}
                    </div>
                    <p className="mt-1 font-serif text-ink italic">{item.event}</p>
                    {item.description && <p className="mt-3 text-[0.9375rem] leading-relaxed">{item.description}</p>}
                    {project && (
                      <p className="mt-2">
                        <TextLink href={`#${projectAnchor(project.id)}`} arrow>
                          View project: {project.title}
                        </TextLink>
                      </p>
                    )}
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      )}

      {volunteering.length > 0 && (
        <div>
          <h3 className="text-heading font-semibold">Volunteer Experience</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {volunteering.map((item) => {
              const period = item.period && formatPeriod(item.period)
              return (
                <li key={item.id} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                  <div>
                    <h4 className="font-sans text-base font-semibold">{item.role}</h4>
                    <p className="text-[0.9375rem] text-ink-muted">{item.organization}</p>
                    {item.description && <p className="mt-2 text-[0.9375rem] leading-relaxed">{item.description}</p>}
                  </div>
                  {period && <p className="font-mono text-meta text-ink-muted sm:row-start-1 sm:col-start-2">{period}</p>}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
