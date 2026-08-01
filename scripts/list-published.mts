/** 文件职责：列出所有已发布（status=published）内容的 id 与类型，供 Patch 文章 related* 引用核对。 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "content");
const locales = readdirSync(root).filter((d) =>
  statSync(join(root, d)).isDirectory(),
);

type Entry = { id: string; type: string; status: string; locale: string };
const all: Entry[] = [];

for (const locale of locales) {
  const typeDir = join(root, locale);
  for (const type of readdirSync(typeDir)) {
    const dir = join(typeDir, type);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      try {
        const raw = JSON.parse(readFileSync(join(dir, file), "utf8"));
        if (raw.status !== "published") continue;
        all.push({
          id: raw.id ?? raw.contentId ?? "(missing)",
          type: raw.type ?? type,
          status: raw.status,
          locale,
        });
      } catch {
        /* skip */
      }
    }
  }
}

const byType: Record<string, Record<string, string[]>> = {};
for (const e of all) {
  byType[e.type] ??= { en: [], "zh-cn": [] };
  byType[e.type][e.locale].push(e.id);
}

for (const type of Object.keys(byType).sort()) {
  const en = byType[type].en;
  const zh = byType[type]["zh-cn"];
  console.log(`\n## ${type}  (en=${en.length}, zh-cn=${zh.length})`);
  // print ids that exist in BOTH locales (safe to reference)
  const both = en.filter((id) => zh.includes(id));
  console.log("BOTH:", both.sort().join(", "));
  const onlyEn = en.filter((id) => !zh.includes(id));
  const onlyZh = zh.filter((id) => !en.includes(id));
  if (onlyEn.length) console.log("only-en:", onlyEn.sort().join(", "));
  if (onlyZh.length) console.log("only-zh:", onlyZh.sort().join(", "));
}
