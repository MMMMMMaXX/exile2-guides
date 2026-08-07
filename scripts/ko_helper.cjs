#!/usr/bin/env node
// Mechanical helpers for ko localization (translation itself is done by the agent).
const fs = require("fs");
const path = require("path");

const CATS = ["builds", "bosses", "items", "skills", "guides", "patches"];
const ROOT = path.join(__dirname, "..", "content");
const EN = path.join(ROOT, "en");
const KO = path.join(ROOT, "ko");

function rewriteLink(v) {
  if (typeof v !== "string") return v;
  return v.replace(/\/en\//g, "/ko/");
}

// Fields whose string values must be translated (prose). Everything else preserved.
const TRANSLATE_TOP = new Set([
  "title",
  "shortTitle",
  "summary",
  "description",
  "imageAlt",
]);
const TRANSLATE_SEO = new Set(["title", "description"]);
const TRANSLATE_SOURCE = new Set(["label", "description"]);

// Walk and translate. `translate` is provided by the agent-driven pipeline.
function walk(obj, translate) {
  if (Array.isArray(obj)) {
    return obj.map((x) => walk(x, translate));
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "seo" && v && typeof v === "object") {
        out[k] = {
          ...v,
          title: TRANSLATE_SEO.has("title") ? translate(v.title) : v.title,
          description: TRANSLATE_SEO.has("description")
            ? translate(v.description)
            : v.description,
          // keep keywords, noindex, canonical untouched
        };
        continue;
      }
      if (k === "sources" && Array.isArray(v)) {
        out[k] = v.map((s) => ({
          ...s,
          label: translate(s.label),
          description: s.description ? translate(s.description) : s.description,
        }));
        continue;
      }
      if (typeof v === "string") {
        out[k] = translate(v);
      } else {
        out[k] = walk(v, translate);
      }
    }
    return out;
  }
  return obj;
}

module.exports = { CATS, EN, KO, rewriteLink, TRANSLATE_TOP };

// CLI: clone + locale + link rewrite only (no translation). Used to scaffold.
if (require.main === module) {
  const [enFile, koFile] = process.argv.slice(2);
  const d = JSON.parse(fs.readFileSync(enFile, "utf8"));
  d.locale = "ko";
  const s = JSON.stringify(d, null, 2).replace(/\/en\//g, "/ko/");
  fs.mkdirSync(path.dirname(koFile), { recursive: true });
  fs.writeFileSync(koFile, s + "\n");
  console.log("scaffolded", koFile);
}
