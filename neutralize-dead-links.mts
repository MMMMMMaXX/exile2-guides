import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const locales = ["en", "zh-cn"];
const types = ["bosses", "skills", "guides", "items", "builds", "patches"];

// Dead targets: specific item pages missing from repo. Keyed by locale|contentType|contentId.
const deadSet = new Set([
  "en|items|catalysts",
  "zh-cn|items|catalysts",
  "en|items|waystones",
  "zh-cn|items|waystones",
  "zh-cn|items|liquid-emotions",
]);

const norm = (t: string) => (t.endsWith("/") ? t.slice(0, -1) : t);
const deadUrls = new Set([
  "/en/items/catalysts/",
  "/zh-cn/items/catalysts/",
  "/en/items/waystones/",
  "/zh-cn/items/waystones/",
  "/zh-cn/items/liquid-emotions/",
]);
const isDeadUrl = (t: string) =>
  deadUrls.has(t) || deadUrls.has(t + "/") || deadUrls.has(norm(t));

let removedHref = 0;
let removedCard = 0;
let removedMd = 0;
let changedFiles = 0;

function neutralizeMarkdown(s: string): string {
  return s.replace(/\[([^\]]+)\]\((#{0,1}\/[^)]*)\)/g, (m, text, url) => {
    if (isDeadUrl(url)) {
      removedMd++;
      return String(text);
    }
    return m;
  });
}

function walk(obj: any, locale: string, changed: { f: boolean }, parentArr: any[] | null, idx: number) {
  if (typeof obj === "string") return;
  if (Array.isArray(obj)) {
    for (let i = obj.length - 1; i >= 0; i--) {
      walk(obj[i], locale, changed, obj, i);
    }
    return;
  }
  if (obj && typeof obj === "object") {
    // href field directly pointing to dead URL
    if (typeof obj.href === "string" && isDeadUrl(obj.href)) {
      if (typeof obj.contentId === "string" && parentArr) {
        parentArr.splice(idx, 1);
        removedCard++;
        changed.f = true;
        return;
      }
      delete obj.href;
      removedHref++;
      changed.f = true;
    }
    // contentId-derived dead link (href generated at render)
    if (
      typeof obj.contentId === "string" &&
      typeof obj.contentType === "string" &&
      deadSet.has(`${locale}|${obj.contentType}|${obj.contentId}`) &&
      parentArr
    ) {
      parentArr.splice(idx, 1);
      removedCard++;
      changed.f = true;
      return;
    }
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === "string") {
        if (v.includes("](") && /\[[^\]]+\]\(#{0,1}\//.test(v)) {
          const fixed = neutralizeMarkdown(v);
          if (fixed !== v) {
            obj[k] = fixed;
            changed.f = true;
          }
        }
      } else {
        walk(v, locale, changed, null, -1);
      }
    }
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
      const fp = join("content", loc, type, f);
      let json: any;
      try {
        json = JSON.parse(readFileSync(fp, "utf8"));
      } catch {
        continue;
      }
      const changed = { f: false };
      walk(json, loc, changed, null, -1);
      if (changed.f) {
        writeFileSync(fp, JSON.stringify(json, null, 2) + "\n");
        changedFiles++;
        console.log("CHANGED", `${loc}/${type}/${f}`);
      }
    }
  }
}
console.log(
  `removedHref=${removedHref} removedCard=${removedCard} removedMd=${removedMd} changedFiles=${changedFiles}`,
);
