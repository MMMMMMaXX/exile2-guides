import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const locales = ["en", "zh-cn"];
const types = ["bosses", "skills", "guides", "items", "builds", "patches"];

// Build valid route set: /{locale}/{type}/{slug} (no trailing slash)
const valid = new Set<string>();
const validWithSlash = new Set<string>();
for (const loc of locales) {
  for (const type of types) {
    let files: string[] = [];
    try {
      files = readdirSync(join("content", loc, type)).filter((f) =>
        f.endsWith(".json"),
      );
    } catch {}
    for (const f of files) {
      const slug = f.replace(/\.json$/, "");
      valid.add(`/${loc}/${type}/${slug}`);
      validWithSlash.add(`/${loc}/${type}/${slug}/`);
    }
  }
}

function norm(t: string): string {
  return t.endsWith("/") ? t.slice(0, -1) : t;
}

const dead: { file: string; path: string; target: string }[] = [];

// scan href string fields and contentId-derived links
function scan(obj: any, file: string) {
  if (typeof obj === "string") return;
  if (Array.isArray(obj)) {
    obj.forEach((v) => scan(v, file));
    return;
  }
  if (obj && typeof obj === "object") {
    // direct href
    if (typeof obj.href === "string" && obj.href.startsWith("/")) {
      const t = norm(obj.href);
      if (!valid.has(t) && !validWithSlash.has(t)) {
        dead.push({ file, path: "(href field)", target: obj.href });
      }
    }
    // contentId derived
    if (
      typeof obj.contentId === "string" &&
      typeof obj.contentType === "string" &&
      typeof obj.locale === "string"
    ) {
      const t = `/${obj.locale}/${obj.contentType}/${obj.contentId}`;
      if (!valid.has(t) && !validWithSlash.has(t)) {
        dead.push({ file, path: "(contentId card)", target: t });
      }
    }
    for (const k of Object.keys(obj)) scan(obj[k], file);
  }
}

for (const loc of locales) {
  for (const type of types) {
    let files: string[] = [];
    try {
      files = readdirSync(join("content", loc, type)).filter((f) =>
        f.endsWith(".json"),
      );
    } catch {}
    for (const f of files) {
      try {
        scan(JSON.parse(readFileSync(join("content", loc, type, f), "utf8")), `${loc}/${type}/${f}`);
      } catch {}
    }
  }
}

// also scan markdown links in any string value (rare)
console.log("=== DEAD INTERNAL LINKS ===");
const byTarget = new Map<string, number>();
for (const d of dead) {
  byTarget.set(d.target, (byTarget.get(d.target) ?? 0) + 1);
  console.log(`${d.target}  <-  ${d.file}`);
}
console.log("=== SUMMARY by target ===");
for (const [t, n] of [...byTarget.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`${n}\t${t}`);
console.log("TOTAL:", dead.length);
