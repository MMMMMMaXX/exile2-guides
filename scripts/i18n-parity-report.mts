/**
 * 全表 i18n 对齐分析器（leaf-key parity）。
 * 递归抽取结构化文案的叶子键路径，与 en 比对，输出每种语言每张表的覆盖率。
 * 这是 blockout 10 语言方法论的「键对齐校验」落地：确保不会某语言掉字段。
 */
import { supportedLocales, type ContentLocale } from "../lib/content/constants";
import { uiByLocale } from "../lib/i18n/ui";
import { extraUiByLocale } from "../lib/i18n/ui-extra";
import { searchPageCopyByLocale } from "../lib/i18n/search-copy";
import { getCategoryCopy } from "../lib/i18n/category-copy";
import { getHomeCopy } from "../lib/i18n/home-copy";
import { getInformationPageCopy, informationPageSlugs } from "../lib/i18n/information-copy";

type LeafMap = Record<string, true>;

/** 递归抽取对象中所有叶子字符串键的路径（dot 形式），忽略数组下标差异以对结构。 */
function leafKeys(value: unknown, prefix = ""): LeafMap {
  const out: LeafMap = {};
  if (value === null || value === undefined) return out;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    out[prefix] = true;
    return out;
  }
  if (Array.isArray(value)) {
    // 数组：用通配下标 [] 归一并递归，避免顺序/数量差异造成误报
    for (const item of value) {
      const sub = leafKeys(item, prefix ? `${prefix}[]` : "[]");
      for (const k of Object.keys(sub)) out[k] = true;
    }
    return out;
  }
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const p = prefix ? `${prefix}.${k}` : k;
      const sub = leafKeys(v, p);
      for (const sk of Object.keys(sub)) out[sk] = true;
    }
    return out;
  }
  return out;
}

function reportTable(name: string, enLeaves: LeafMap, byLocale: Record<ContentLocale, LeafMap>) {
  const enCount = Object.keys(enLeaves).length;
  const lines: string[] = [];
  let allComplete = true;
  for (const loc of supportedLocales) {
    const leaves = byLocale[loc] ?? {};
    const keys = Object.keys(leaves);
    const missing = Object.keys(enLeaves).filter((k) => !leaves[k]);
    const extra = keys.filter((k) => !enLeaves[k]);
    const pct = enCount === 0 ? 100 : Math.round((keys.length / enCount) * 100);
    const status = missing.length === 0 && extra.length === 0 ? "OK " : "GAP";
    if (status === "GAP") allComplete = false;
    lines.push(
      `  ${loc.padEnd(6)} ${status} ${String(keys.length).padStart(4)}/${enCount} (${String(pct).padStart(3)}%)` +
        (missing.length ? ` missing:${missing.length}` : "") +
        (extra.length ? ` extra:${extra.length}` : ""),
    );
  }
  console.log(`\n### ${name}  (en leaf keys = ${enCount})  ${allComplete ? "[ALL COMPLETE]" : "[HAS GAPS]"}`);
  console.log(lines.join("\n"));
}

async function main() {
  // 1. uiByLocale（扁平）
  reportTable(
    "ui.uiByLocale",
    leafKeys(uiByLocale.en),
    Object.fromEntries(supportedLocales.map((l) => [l, leafKeys(uiByLocale[l])])) as Record<ContentLocale, LeafMap>,
  );

  // 2. extraUiByLocale（扁平）
  reportTable(
    "ui-extra.extraUiByLocale",
    leafKeys(extraUiByLocale.en),
    Object.fromEntries(supportedLocales.map((l) => [l, leafKeys(extraUiByLocale[l])])) as Record<ContentLocale, LeafMap>,
  );

  // 3. searchPageCopyByLocale（扁平）
  reportTable(
    "search-copy.searchPageCopyByLocale",
    leafKeys(searchPageCopyByLocale.en),
    Object.fromEntries(supportedLocales.map((l) => [l, leafKeys(searchPageCopyByLocale[l])])) as Record<ContentLocale, LeafMap>,
  );

  // 4. category-copy（结构化，按三个子表）
  for (const type of ["build", "boss", "generic"] as const) {
    const getter = (l: ContentLocale) =>
      type === "generic" ? getCategoryCopy(l, "item") : getCategoryCopy(l, type);
    reportTable(
      `category-copy.${type}`,
      leafKeys(getter("en")),
      Object.fromEntries(supportedLocales.map((l) => [l, leafKeys(getter(l))])) as Record<ContentLocale, LeafMap>,
    );
  }

  // 5. home-copy（结构化）
  reportTable(
    "home-copy.homeCopyByLocale",
    leafKeys(getHomeCopy("en")),
    Object.fromEntries(supportedLocales.map((l) => [l, leafKeys(getHomeCopy(l))])) as Record<ContentLocale, LeafMap>,
  );

  // 6. information-copy（结构化，按 slug 聚合）
  const infoEn: LeafMap = {};
  for (const slug of informationPageSlugs) {
    const sub = leafKeys(getInformationPageCopy("en", slug));
    for (const k of Object.keys(sub)) infoEn[`${slug}.${k}`] = true;
  }
  const infoByLocale: Record<ContentLocale, LeafMap> = Object.fromEntries(
    supportedLocales.map((l) => {
      const m: LeafMap = {};
      for (const slug of informationPageSlugs) {
        const sub = leafKeys(getInformationPageCopy(l, slug));
        for (const k of Object.keys(sub)) m[`${slug}.${k}`] = true;
      }
      return [l, m];
    }),
  ) as Record<ContentLocale, LeafMap>;
  reportTable("information-copy (all slugs)", infoEn, infoByLocale);

  // 7. 内容覆盖率（文件计数，按 locale × 分类）
  console.log("\n### content/ 文件覆盖率（按 locale × 分类）");
  const fs = await import("node:fs");
  const path = await import("node:path");
  const cats = ["builds", "bosses", "items", "skills", "guides", "patches"];
  const header = ["locale", ...cats, "TOTAL"].join("\t");
  console.log(header);
  for (const loc of supportedLocales) {
    const row: string[] = [loc];
    let total = 0;
    for (const c of cats) {
      const dir = path.join("content", loc, c);
      let n = 0;
      try {
        n = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).length;
      } catch {
        n = 0;
      }
      total += n;
      row.push(String(n));
    }
    row.push(String(total));
    console.log(row.join("\t"));
  }
  const enTotal = cats.reduce((acc, c) => {
    try {
      return acc + fs.readdirSync(path.join("content", "en", c)).filter((f) => f.endsWith(".json")).length;
    } catch {
      return acc;
    }
  }, 0);
  console.log(`\n(en 总内容文件数 = ${enTotal})`);
}

main();
