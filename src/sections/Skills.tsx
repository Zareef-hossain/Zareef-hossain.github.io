import { skillGroups } from '../content/skills.ts'
import { PendingContent } from '../components/layout/PendingContent.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Card } from '../components/ui/Card.tsx'

/** One box per skill category. No proficiency levels are shown (none confirmed). */
export function Skills() {
  if (skillGroups.length === 0) return <PendingContent />

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <li key={group.id} className="flex">
          <Card className="w-full">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-sm bg-linear-to-br from-accent to-violet" />
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <li key={skill}>
                  <Badge tone="outline" className="text-[0.8125rem]">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </li>
      ))}
    </ul>
  )
}
