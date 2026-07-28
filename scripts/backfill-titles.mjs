#!/usr/bin/env node
// scripts/backfill-titles.mjs
//
// Purpose: ensure every post in src/content/posts/ has BOTH title_en and
//   title_zh in its frontmatter, so the language toggle (EN | 简体中文)
//   on the homepage shows correct content in both modes.
//
// Rules (smart fallback chain):
//   1. If file has neither title_en nor title_zh and no frontmatter at all:
//      - Extract the first H1 heading from the markdown body
//      - If H1 looks Chinese → use as title_zh, generate title_en from filename slug
//      - If H1 looks English → use as title_en, generate title_zh from filename slug
//   2. If file has only title (one language):
//      - title_en || title (Chinese)? Copy to title_zh, generate title_en from slug
//      - title_en (English)? Copy to title_en, generate title_zh from slug
//   3. If file has title_en but not title_zh: generate title_zh from slug (or title_en)
//   4. If file has title_zh but not title_en: generate title_en from slug (or title_zh)
//   5. If file already has BOTH: skip.
//
// Usage: node scripts/backfill-titles.mjs [--dry-run]
//   --dry-run: show diffs without writing.
//
// NOTE: This script DOES NOT commit or push. You review, then commit.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DRY_RUN = process.argv.includes('--dry-run');
const POSTS_DIR = path.resolve('src/content/posts');

// ---- helpers ---------------------------------------------------------

// Detect if a string is "mostly Chinese" (CJK range).
function isChinese(s) {
  if (!s) return false;
  let cjk = 0, latin = 0;
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||    // CJK Unified Ideographs
      (code >= 0x3400 && code <= 0x4dbf) ||    // CJK Ext A
      (code >= 0xf900 && code <= 0xfaff)       // CJK Compat
    ) {
      cjk++;
    } else if ((code >= 0x41 && code <= 0x7a) || (code >= 0x30 && code <= 0x39)) {
      latin++;
    }
  }
  return cjk > latin;
}

// Extract a YAML frontmatter block. Returns { fm: string|null, bodyOffset: number }.
function splitFrontmatter(text) {
  const cleaned = text.replace(/^\uFEFF/, '');
  const m = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n)?/);
  if (!m) return { fm: null, fmText: null, bodyOffset: 0, body: cleaned };
  return {
    fmText: m[0],
    fm: m[1],
    bodyOffset: m[0].length,
    body: cleaned.slice(m[0].length),
  };
}

// Parse top-level `key: value` (scalar) from fm. Returns a map.
// NOTE: a YAML scalar may be wrapped in matching single or double quotes —
// those quotes are part of YAML syntax, not part of the value. We strip them
// here so downstream code sees the raw string (e.g. '"foo"' -> 'foo').
function parseFrontmatter(fm) {
  const out = {};
  const lines = fm.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    // Strip a single layer of matching outer quotes.
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

// Get first H1 (# ...) from body.
function firstH1(body) {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}

// Turn "2026-07-10-ai-agent-security-defense" into "AI Agent Security Defense".
function slugToTitle(slug, preferChinese) {
  // strip leading date prefix YYYY-MM-DD-
  const cleaned = slug.replace(/^\d{4}-\d{2}-\d{2}-?/, '').replace(/\.md$/, '');
  // Replace separators with spaces, then title-case each token.
  let parts = cleaned.split(/[-_]+/).filter(Boolean);
  if (parts.length === 0) return preferChinese ? '文章' : 'Post';
  // Drop tokens that look like pure numbers / single chars
  parts = parts.filter((p) => p.length > 1 && !/^\d+$/.test(p));
  if (parts.length === 0) return preferChinese ? '文章' : 'Post';
  const titled = parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
  return titled;
}

// Currently unused but kept in case future logic wants a fallback Title-Case.
void slugToTitle;

// Format a scalar frontmatter value (quote if it contains colon / quotes / starts weird).
function fmt(v) {
  const s = String(v);
  // If contains characters that YAML might choke on, single-quote and escape.
  if (/[:#&*?|<>=!%@`]/.test(s) || s.startsWith("'") || s.startsWith('"')) {
    return `'${s.replace(/'/g, "''")}'`;
  }
  return s;
}

// Build new frontmatter by injecting/overriding keys.
function buildNewFm(origFmLines, updates) {
  const lines = origFmLines.split(/\r?\n/);
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):/);
    if (m && updates[m[1]] !== undefined) {
      out.push(`${m[1]}: ${fmt(updates[m[1]])}`);
      seen.add(m[1]);
    } else {
      out.push(line);
    }
  }
  // Append any not-yet-seen updates at the end.
  for (const [k, v] of Object.entries(updates)) {
    if (!seen.has(k)) out.push(`${k}: ${fmt(v)}`);
  }
  return out.join('\n');
}

// ---- main ------------------------------------------------------------

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`[backfill] posts dir not found: ${POSTS_DIR}`);
  process.exit(2);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
const stats = { skipped: 0, updated: 0, errors: 0 };

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  let text;
  try {
    text = fs.readFileSync(full, 'utf8');
  } catch (e) {
    console.error(`[backfill] read error: ${file}: ${e.message}`);
    stats.errors++;
    continue;
  }

  const { fmText, fm, body } = splitFrontmatter(text);
  const slug = file.replace(/\.md$/, '');

  // No frontmatter at all → create a fresh one.
  let updates;
  if (fm === null) {
    const h1 = firstH1(body);
    const sourceText = h1 || slug;
    if (isChinese(sourceText)) {
      updates = {
        title: sourceText,
        title_en: slugToTitle(slug, false),
        title_zh: sourceText,
        date: slug.match(/^(\d{4}-\d{2}-\d{2})/) ? slug.match(/^(\d{4}-\d{2}-\d{2})/)[1] : '',
      };
    } else {
      updates = {
        title: sourceText,
        title_en: sourceText,
        title_zh: slugToTitle(slug, true),
        date: slug.match(/^(\d{4}-\d{2}-\d{2})/) ? slug.match(/^(\d{4}-\d{2}-\d{2})/)[1] : '',
      };
    }
  } else {
    const parsed = parseFrontmatter(fm);
    const hasEn = !!parsed.title_en;
    const hasZh = !!parsed.title_zh;
    const hasTitle = !!parsed.title;

    if (hasEn && hasZh) {
      stats.skipped++;
      continue; // already complete
    }

    updates = {};

    if (hasEn && !hasZh) {
      // Already have an English title; copy it across so Chinese mode also has content.
      updates.title_zh = parsed.title_en;
    } else if (hasZh && !hasEn) {
      // Already have a Chinese title; copy it across so English mode also has content.
      updates.title_en = parsed.title_zh;
    } else if (!hasEn && !hasZh && hasTitle) {
      // Only `title` exists. Use it as the single source for both languages —
      // no machine-translated placeholder (the result was always worse than
      // just showing the same string in both modes).
      updates.title_en = parsed.title;
      updates.title_zh = parsed.title;
    } else {
      // hasEn && hasZh OR hasTitle missing — already covered above or no-op.
      stats.skipped++;
      continue;
    }
  }

  // Apply.
  let newText;
  if (fm === null) {
    // Build a brand-new frontmatter block.
    const fmLines = Object.entries(updates)
      .map(([k, v]) => `${k}: ${fmt(v)}`)
      .join('\n');
    newText = `---\n${fmLines}\n---\n${body}`;
  } else {
    const newFm = buildNewFm(fm, updates);
    newText = text.replace(fmText, `---\n${newFm}\n---\n`);
  }

  if (DRY_RUN) {
    console.log(`[backfill] would update: ${file}`);
    console.log(`  + ${Object.entries(updates).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(' ')}`);
  } else {
    fs.writeFileSync(full, newText, 'utf8');
    stats.updated++;
  }
}

const mode = DRY_RUN ? 'DRY-RUN' : 'WRITE';
console.log(`[backfill] ${mode}: ${stats.updated} updated, ${stats.skipped} skipped, ${stats.errors} errors, total=${files.length}`);