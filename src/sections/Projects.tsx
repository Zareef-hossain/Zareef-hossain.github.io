import { Lock } from 'lucide-react'
import { achievements } from '../content/achievements.ts'
import { achievementAnchor, projectAnchor, publicationAnchor } from '../content/navigation.ts'
import { projects } from '../content/projects.ts'
import { publications } from '../content/publications.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Card } from '../components/ui/Card.tsx'
import { MissingField } from '../components/ui/MissingField.tsx'
import { TextLink } from '../components/ui/TextLink.tsx'
import { cx } from '../lib/cx.ts'
import { formatPeriod } from '../lib/date.ts'

/**
 * Project cards from confirmed descriptions only. Repository links appear only for public repos;
 * private repos show a badge instead. Roles and contributions appear once the owner confirms them.
 * The first project is featured at full width, which also keeps the two-column grid even.
 */
export function Projects() {
  if (projects.length === 0) return <PendingContent />

  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project, index) => {
        const featured = index === 0 && projects.length % 2 === 1
        const paper = publications.find((p) => p.id === project.relatedPublicationId)
        const award = achievements.find((a) => a.relatedProjectId === project.id)
        const period = project.period && formatPeriod(project.period)
        return (
          <li key={project.id} className={cx('flex', featured && 'md:col-span-2')}>
            <Card
              as="article"
              interactive
              id={projectAnchor(project.id)}
              aria-labelledby={`${project.id}-title`}
              className={cx(
                'relative flex w-full scroll-mt-6 flex-col overflow-hidden',
                featured && 'bg-linear-to-br from-accent-soft/70 via-card to-card',
              )}
            >
              {featured && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent via-violet/70 to-accent/20" />
              )}
              <div className="flex items-start justify-between gap-3">
                {project.context && <p className="font-mono text-meta text-accent">{project.context}</p>}
                {period && <p className="shrink-0 font-mono text-meta text-ink-muted">{period}</p>}
              </div>
              <h3 id={`${project.id}-title`} className="mt-2 text-heading font-semibold">
                {project.title}
              </h3>
              {project.summary ? (
                <p className="mt-3 text-[0.9375rem] leading-relaxed">{project.summary}</p>
              ) : (
                <MissingField field="summary" />
              )}

              {project.highlights.length > 0 && (
                <ul
                  className={cx(
                    'mt-4 space-y-2 text-[0.9375rem] leading-relaxed',
                    featured && 'md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 md:gap-y-2',
                  )}
                >
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Personal and team contributions stay visibly separate; shown only once confirmed. */}
              {(
                [
                  ['My contributions', project.myContributions],
                  ['Team contributions', project.teamContributions],
                ] as const
              ).map(
                ([label, items]) =>
                  items.length > 0 && (
                    <div key={label} className="mt-4">
                      <h4 className="font-sans text-sm font-semibold">{label}</h4>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-[0.9375rem]">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ),
              )}

              <div className="mt-auto pt-5">
                {(project.techStack.length > 0 || project.repo.visibility === 'private') && (
                  <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <li key={tech}>
                        <Badge tone="outline">{tech}</Badge>
                      </li>
                    ))}
                    {project.repo.visibility === 'private' && (
                      <li>
                        <Badge>
                          <Lock aria-hidden="true" />
                          Source private
                        </Badge>
                      </li>
                    )}
                  </ul>
                )}
                {(paper || award || project.repo.visibility === 'public' || project.demoUrl) && (
                  <ul className="mt-2 flex flex-wrap gap-x-5">
                    {paper && (
                      <li>
                        <TextLink href={`#${publicationAnchor(paper.id)}`} arrow>
                          Related paper
                        </TextLink>
                      </li>
                    )}
                    {award && (
                      <li>
                        <TextLink href={`#${achievementAnchor(award.id)}`} arrow>
                          {award.title} ({award.year})
                        </TextLink>
                      </li>
                    )}
                    {project.repo.visibility === 'public' && (
                      <li>
                        <TextLink href={project.repo.url} external>
                          Source code
                        </TextLink>
                      </li>
                    )}
                    {project.demoUrl && (
                      <li>
                        <TextLink href={project.demoUrl} external>
                          Live demo
                        </TextLink>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
