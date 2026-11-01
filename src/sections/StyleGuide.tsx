import { BookOpen, Download, FileText } from 'lucide-react'
import { Section } from '../components/layout/Section.tsx'
import { Badge } from '../components/ui/Badge.tsx'
import { Button } from '../components/ui/Button.tsx'
import { Card } from '../components/ui/Card.tsx'

// DEVELOPMENT ONLY — rendered behind import.meta.env.DEV and stripped from production builds.
// A living reference for the design system. All text here is clearly sample text.
const swatches = [
  ['ink', 'bg-ink'],
  ['ink-soft', 'bg-ink-soft'],
  ['ink-body', 'bg-ink-body'],
  ['ink-muted', 'bg-ink-muted'],
  ['line-strong', 'bg-line-strong'],
  ['line', 'bg-line'],
  ['surface', 'bg-surface'],
  ['accent', 'bg-accent'],
  ['accent-strong', 'bg-accent-strong'],
  ['accent-soft', 'bg-accent-soft'],
] as const

export function StyleGuide() {
  return (
    <Section
      id="style-guide"
      number="DEV"
      title="Design system"
      description="Development-only reference. Not included in production builds."
    >
      <div className="space-y-14">
        <div>
          <h3 className="text-heading font-semibold">Colour</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {swatches.map(([name, cls]) => (
              <li key={name} className="text-meta text-ink-muted">
                <span className={`block h-12 rounded-md ring-1 ring-line ring-inset ${cls}`} />
                <span className="mt-1.5 block font-mono">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-heading font-semibold">Typography</h3>
          <p className="font-serif text-display font-semibold tracking-tight text-ink">Display</p>
          <p className="font-serif text-title font-semibold tracking-tight text-ink">Section title</p>
          <p className="font-serif text-heading font-semibold text-ink">Card heading — Source Serif 4</p>
          <p className="text-lead text-ink-muted">Lead paragraph — Inter, used for introductions.</p>
          <p className="max-w-prose">
            Body text — Inter at 17px with a 1.7 line height, limited to a comfortable reading measure of
            roughly 68 characters per line for long-form research descriptions.
          </p>
          <p className="font-mono text-meta text-ink-muted">Metadata — system monospace · 2026 · DOI</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-heading font-semibold">Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary" icon={<Download aria-hidden="true" />}>
              With icon
            </Button>
            <Button href="https://example.com" variant="secondary" external>
              External link
            </Button>
            <Button size="sm" variant="secondary" icon={<FileText aria-hidden="true" />}>
              Small
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-heading font-semibold">Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>neutral</Badge>
            <Badge tone="accent">accent</Badge>
            <Badge tone="outline">outline</Badge>
            <Badge tone="accent">
              <BookOpen aria-hidden="true" />
              with icon
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-heading font-semibold">Cards</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <Card as="article">
              <p className="font-mono text-meta text-ink-muted">Sample · Static card</p>
              <h4 className="mt-2 text-heading font-semibold">Sample card title</h4>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">Sample body text for layout review only.</p>
            </Card>
            <Card as="article" interactive>
              <p className="font-mono text-meta text-ink-muted">Sample · Interactive card</p>
              <h4 className="mt-2 text-heading font-semibold">Sample card title</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Tag</Badge>
                <Badge>Tag</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}
