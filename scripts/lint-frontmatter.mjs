#!/usr/bin/env node
// scripts/lint-frontmatter.mjs
// Purpose: ensure every markdown post under src/content/posts has either
//   `date:` or `pubDate:` in its YAML frontmatter.
// Why: missing date => `new Date(undefined)` => Invalid Date =>
//   `.toISOString()` throws "Invalid time value" during Astro build,
//   silently skipping the page so it never appears in dist/ (=> GH Pages 404).
//
// Run: `npm run lint:frontmatter` (also runs automatically before `npm run build`).
// Exit: 0 = all posts OK; 1 = at least one post missing date.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const POSTS_DIR = path.resolve('src/content/posts');

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`[lint-frontmatter] posts dir not found: ${POSTS_DIR}`);
  process.exit(2);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
const offenders = [];

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  // Directories are filtered by `.endsWith('.md')`; skip if anything weird shows up.
  let stat;
  try {
    stat = fs.statSync(full);
  } catch {
    continue;
  }
  if (!stat.isFile()) continue;

  const text = fs.readFileSync(full, 'utf8');

  // Extract the first YAML frontmatter block (between the first pair of `---` lines).
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    offenders.push({ file, reason: 'no frontmatter (no --- block found)' });
    continue;
  }

  const fm = fmMatch[1];
  const hasDate = /^date:/m.test(fm);
  const hasPubDate = /^pubDate:/m.test(fm);

  if (!hasDate && !hasPubDate) {
    offenders.push({ file, reason: 'frontmatter missing `date:` and `pubDate:`' });
  }
}

if (offenders.length === 0) {
  console.log(`[lint-frontmatter] OK — ${files.length} post(s), all have date or pubDate`);
  process.exit(0);
}

console.error(`[lint-frontmatter] FAIL — ${offenders.length} post(s) missing date/pubDate:`);
for (const o of offenders) {
  console.error(`  - ${o.file}: ${o.reason}`);
}
console.error(`\nFix: add \`date: YYYY-MM-DDTHH:MM:SS\` (or at minimum \`pubDate: YYYY-MM-DD\`) to the frontmatter.`);
process.exit(1);