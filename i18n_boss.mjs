#!/usr/bin/env node
// Boss i18n helper: collect translatable strings or apply a DE translation map.
// Mechanical transforms handled here: locale="de", /en/ -> /de/ link rewrite,
// and adding the translation metadata block.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EN_DIR = path.join(ROOT, "content", "en", "bosses");
const DE_DIR = path.join(ROOT, "content", "de", "bosses");

// Keys whose string values should be translated to German.
const TRANSLATABLE_KEYS = new Set([
  "title",
  "summary",
  "description",
  "imageAlt",
  "callout",
  "calloutDetail",
  "label",
  "text",
  "body",
  "note",
  "why",
  "fix",
  "checks",
  "objectives",
  "notes",
  "trigger",
  "name",
  "telegraph",
  "responses",
  "commonMistakes",
  "paragraphs",
  "bullets",
  "question",
  "summary",
  "editorialAnalysis",
  "linkLabel",
  "symptom",
  "directAnswer",
  "condition",
  "changes",
  "answer",
  "alt",
  "caption",
]);

function walk(obj, fn) {
  if (Array.isArray(obj)) {
    obj.forEach((v) => walk(v, fn));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string" && TRANSLATABLE_KEYS.has(k)) fn(k, v);
      else walk(v, fn);
    }
  }
}

function modeCollect(slug) {
  const en = JSON.parse(
    fs.readFileSync(path.join(EN_DIR, `${slug}.json`), "utf8"),
  );
  const set = new Map();
  walk(en, (k, v) => {
    const key = v;
    set.set(key, (set.get(key) || 0) + 1);
  });
  // Print compact: count + string, sorted by string for stable review.
  const lines = [...set.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  console.log(`# Translatable strings for ${slug}: ${lines.length}`);
  for (const [s, c] of lines) {
    console.log(`${c}\t${s}`);
  }
}

function isUrlLike(v) {
  return (
    typeof v === "string" &&
    (v.includes("http") ||
      v.startsWith("/") ||
      v.startsWith("#") ||
      v.startsWith("www."))
  );
}

function loadMaps(paths) {
  const merged = {};
  for (const p of paths) {
    const m = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const [k, val] of Object.entries(m)) merged[k] = val;
  }
  return merged;
}

function modeApply(slug, ...mapPaths) {
  const en = JSON.parse(
    fs.readFileSync(path.join(EN_DIR, `${slug}.json`), "utf8"),
  );
  const map = loadMaps(mapPaths);

  // Deep clone.
  const de = JSON.parse(JSON.stringify(en));
  de.locale = "de";

  // Rewrite internal /en/ links to /de/.
  function rewriteLinks(o) {
    if (Array.isArray(o)) o.forEach(rewriteLinks);
    else if (o && typeof o === "object") {
      for (const [k, v] of Object.entries(o)) {
        if (typeof v === "string" && v.includes("/en/")) {
          o[k] = v.replace(/\/en\//g, "/de/");
        } else rewriteLinks(v);
      }
    }
  }
  rewriteLinks(de);

  // Apply translation map at translatable keys (skip URL-like values).
  let applied = 0,
    missing = 0;
  function applyWalk(o) {
    if (Array.isArray(o)) o.forEach(applyWalk);
    else if (o && typeof o === "object") {
      for (const [k, v] of Object.entries(o)) {
        if (typeof v === "string" && TRANSLATABLE_KEYS.has(k)) {
          if (isUrlLike(v)) {
            // preserve URLs/links verbatim
          } else if (Object.prototype.hasOwnProperty.call(map, v)) {
            o[k] = map[v];
            applied++;
          } else {
            missing++;
          }
        } else applyWalk(v);
      }
    }
  }
  applyWalk(de);

  // Add translation metadata.
  de.translation = {
    sourceLocale: "en",
    sourceContentId: slug,
    sourceRevision: en.updatedAt || en.publishedAt || null,
    translationStatus: "machine-draft",
    translatedAt: "2026-08-05",
    translator: "workbuddy-agent",
    translationRisk: "low",
  };

  fs.mkdirSync(DE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DE_DIR, `${slug}.json`),
    JSON.stringify(de, null, 2) + "\n",
  );
  console.log(
    `Wrote ${slug}.json (applied ${applied}, left English ${missing})`,
  );
}

const [, , mode, slug, ...mapPaths] = process.argv;
if (mode === "collect") modeCollect(slug);
else if (mode === "apply") {
  if (!mapPaths.length) {
    console.error("apply requires at least one map file");
    process.exit(1);
  }
  modeApply(slug, ...mapPaths);
} else {
  console.error(
    "Usage: node i18n_boss.mjs collect <slug>  |  node i18n_boss.mjs apply <slug> <map.json> [base.json ...]",
  );
  process.exit(1);
}
