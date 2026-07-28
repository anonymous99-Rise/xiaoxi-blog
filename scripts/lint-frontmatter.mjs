#!/usr/bin/env node
// scripts/lint-frontmatter.mjs
//
// Purpose: fail the Astro build if any post in src/content/posts/ has
//   frontmatter problems that would lead to:
//     - <title>undefined</title> on detail pages
//     - Empty / placeholder strings in the home page list
//     - GH Pages 404s (a post not generating any dist output)
//
// Run automatically as part of `npm run build`.
// Exit: 0 = all OK; 1 = at least one problem found.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const POSTS_DIR = path.resolve('src/content/posts');

// ---- helpers ---------------------------------------------------------

function hasChinese(s) {
  if (!s) return false;
  let cjk = 0;
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0xf900 && code <= 0xfaff)
    ) {
      cjk++;
    }
  }
  return cjk >= Math.max(2, s.length * 0.2);
}

function looksLikeFilename(s) {
  return /^\d{4}-\d{2}-\d{2}/.test(s.trim());
}

function splitFrontmatter(text) {
  const cleaned = text.replace(/^\uFEFF/, '');
  const m = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n)?/);
  if (!m) return { fmText: null, fm: null, body: cleaned.slice(0) };
  return {
    fmText: m[0],
    fm: m[1],
    bodyOffset: m[0].length,
    body: cleaned.slice(m[0].length),
  };
}

function parseFrontmatter(fm) {
  const out = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"') && v.length >= 2) ||
      (v.startsWith("'") && v.endsWith("'") && v.length >= 2)
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

function firstH1(body) {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}

// ---- main ------------------------------------------------------------

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`[lint-frontmatter] posts dir not found: ${POSTS_DIR}`);
  process.exit(2);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
const offenders = [];
const warnings = [];

for (const file of files) {
  const full = path.join(POSTS_DIR, file);

  // BOM check (binary read first 3 bytes)
  const fd = fs.openSync(full, 'r');
  const buf = Buffer.alloc(3);
  fs.readSync(fd, buf, 0, 3, 0);
  fs.closeSync(fd);
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    offenders.push({ file, reason: 'UTF-8 BOM at start of file (some Windows editors add it; causes Astro to skip the post)' });
    continue;
  }

  let text;
  try {
    text = fs.readFileSync(full, 'utf8');
  } catch (e) {
    offenders.push({ file, reason: `read error: ${e.message}` });
    continue;
  }

  const { fm, body } = splitFrontmatter(text);
  if (fm === null) {
    offenders.push({ file, reason: 'no frontmatter (no --- block at top)' });
    continue;
  }

  const parsed = parseFrontmatter(fm);

  // Required: date OR pubDate
  if (!parsed.date && !parsed.pubDate) {
    offenders.push({ file, reason: 'frontmatter missing `date:` and `pubDate:`' });
  }

  // Required: title_en and title_zh
  if (!parsed.title_en && !parsed.title_zh) {
    if (!parsed.title) {
      offenders.push({ file, reason: 'frontmatter missing title_en, title_zh AND title' });
    } else {
      // Has only `title`. Auto-fill both with that value (mirrors the build's
      // no-fallback policy), but warn so authors fix it later.
      warnings.push({ file, reason: `only legacy 'title' field present (no title_en/title_zh); auto-filled with "${parsed.title.slice(0, 60)}"` });
    }
  }

  // Quality: title_en should not be Chinese
  if (parsed.title_en && hasChinese(parsed.title_en)) {
    offenders.push({ file, reason: `title_en is Chinese: "${parsed.title_en.slice(0, 80)}" — EN-mode users see Chinese` });
  }

  // Quality: title should not be a filename leak
  if (parsed.title && looksLikeFilename(parsed.title)) {
    warnings.push({ file, reason: `title looks like filename "${parsed.title.slice(0, 60)}" — set a real title` });
  }
  if (parsed.title_en && looksLikeFilename(parsed.title_en)) {
    offenders.push({ file, reason: `title_en looks like filename "${parsed.title_en.slice(0, 60)}"` });
  }

  // Quality: H1 (first line starting with #) should differ from filename leak
  const h1 = firstH1(body);
  if (h1 && looksLikeFilename(h1)) {
    warnings.push({ file, reason: `first H1 is a filename "${h1.slice(0, 60)}" — write a real title` });
  }
}

// ---- report ----------------------------------------------------------

if (warnings.length > 0) {
  console.warn(`[lint-frontmatter] WARN — ${warnings.length} warning(s) (non-blocking):`);
  for (const w of warnings.slice(0, 20)) {
    console.warn(`  - ${w.file}: ${w.reason}`);
  }
  if (warnings.length > 20) {
    console.warn(`  ... and ${warnings.length - 20} more`);
  }
}

if (offenders.length === 0) {
  console.log(`[lint-frontmatter] OK — ${files.length} post(s) checked, 0 errors`);
  process.exit(0);
}

console.error(`[lint-frontmatter] FAIL — ${offenders.length} post(s) with problems:`);
for (const o of offenders.slice(0, 30)) {
  console.error(`  - ${o.file}: ${o.reason}`);
}
if (offenders.length > 30) {
  console.error(`  ... and ${offenders.length - 30} more`);
}
console.error(`\nFix the above and re-run. \`npm run lint:frontmatter\` to check.`);
process.exit(1);