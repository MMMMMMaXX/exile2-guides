import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const locales = ["en", "zh-cn"];
const types = ["bosses", "skills", "guides", "items", "builds", "patches"];

// Exact dead URLs reported by build2.log (specific item pages missing in repo)
const deadUrls = new Set([
  "/en/items/catalysts/",
  "/zh-cn/items/catalysts/",
  "/en/items/waystones/",
  "/zh-cn/items/waystones/",
  "/zh-cn/items/liquid-emotions/",
]);

const norm = (t: string) => (t.endsWith("/") ? t.slice(0, -1) : t);
const isDead = (t: string) =>
  deadUrls.has(t) || deadUrls.has(t + "/") || deadUrls.has(norm(t));

let removedHref = 0;
let removedCard = 0;
let removedMd = 0;
let changedFiles = 0;

function neutralizeMarkdown(s: string): string {
  return s.replace(/\[([^\]]+)\]\((#{0,1}\/[^)]*)\)/g, (m, text, url) => {
    if (isDead(url)) {
      removedMd++;
      return String(text);
    }
    return m;
  });
}

function walk(obj: any, changed: { f: boolean }) {
  if (typeof obj === "string") return;
  if (Array.isArray(obj)) {
    for (let i = obj.length - 1; i >= 0; i--) {
      const item = obj[i];
      if (
        item &&
        typeof item === "object" &&
        typeof item.href === "string" &&
        isDead(item.href) &&
        typeof item.contentId === "string"
      ) {
        obj.splice(i, 1);
        removedCard++;
        changed.f = true;
        continue;
      }
      walk(item, changed);
    }
    return;
  }
  if (obj && typeof obj === "object") {
    if (typeof obj.href === "string" && isDead(obj.href)) {
      delete obj.href;
      removedHref++;
      changed.f = true;
    }
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === "string" && v.includes("](") && /\[[^\]]+\]\(#{0,1}\//.test(v)) {
        const fixed = neutralizeMarkdown(v);
        if (fixed !== v) {
          obj[k] = fixed;
          changed.f = true;
        }
      } else {
        walk(v, changed);
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
      walk(json, changed);
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
