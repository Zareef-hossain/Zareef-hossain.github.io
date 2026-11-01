// Validates portfolio content: npm run check:content (also runs as part of npm run build).
// Exits 1 only on errors (invalid links, broken cross-references, private data).
// Gaps — information not provided yet — are reported but never fail the build.
// Dependency-free: Node runs this TypeScript file directly (type stripping).

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { validateContent, type ContentIssue } from '../src/content/validation.ts'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const issues = validateContent({
  fileExists: (publicPath) => existsSync(publicDir + publicPath.replace(/^\//, '')),
})

const errors = issues.filter((i) => i.severity === 'error')
const gaps = issues.filter((i) => i.severity === 'gap')

function groupBy<T>(items: readonly T[], key: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>()
  for (const item of items) groups.set(key(item), [...(groups.get(key(item)) ?? []), item])
  return groups
}

function print(list: ContentIssue[]) {
  for (const [section, items] of groupBy(list, (i) => i.section)) {
    console.log(`\n  [${section}]`)
    for (const [record, fields] of groupBy(items, (i) => i.record)) {
      console.log(`    ${record}`)
      for (const i of fields) console.log(`      - ${i.field}: ${i.message}`)
    }
  }
}

if (gaps.length > 0) {
  console.log(`Content gaps (${gaps.length}) — information not provided yet, not fatal:`)
  print(gaps)
}

if (errors.length > 0) {
  console.error(`\nContent errors (${errors.length}):`)
  print(errors)
  console.error('\nContent check FAILED.')
  process.exit(1)
}

console.log(`\nContent check passed: 0 errors, ${gaps.length} gaps.`)
