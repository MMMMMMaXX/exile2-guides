// 由 content/en/guides 生成 content/de/guides：机械规则 + 套用翻译字典(_dict*.json)。
// 跳过已存在的 de 文件（断点续跑）。翻译块放末尾。
// 适配 guides：保留标识符/枚举/日期/时间/版本号/数字/布尔/URL/路径/特定字段，
// 内部链接 /en/ -> /de/，未知字符串保留英文原文（machine-draft 允许）。
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const EN_DIR = path.resolve("content/en/guides");
const DE_DIR = path.resolve("content/de/guides");
const MISSING_PATH = path.resolve("scripts/_missing-guides.json");

// 加载所有 _dict*.json 并合并（与 builds 管线一致的约定）
let DICT = {};
const dictFiles = (await readdir(path.resolve("scripts")))
  .filter((f) => /^_dict.*\.json$/.test(f))
  .sort();
for (const df of dictFiles) {
  try {
    const part = JSON.parse(
      await readFile(path.resolve("scripts", df), "utf8"),
    );
    Object.assign(DICT, part);
  } catch {}
}
console.log(
  `loaded dict parts: ${dictFiles.length}, entries: ${Object.keys(DICT).length}`,
);

const ENUM_VALUES = new Set([
  "yes",
  "no",
  "text",
  "high",
  "low",
  "medium",
  "official",
  "in-game",
  "community",
  "tool",
  "other",
  "current",
  "supported",
  "legacy",
  "under-review",
  "draft",
  "published",
  "archived",
  "source-reviewed",
  "pending-pc",
  "verified",
  "source",
  "machine-draft",
  "review-needed",
  "reviewed",
  "stale",
  "mechanic-critical",
  "valid",
  "outdated",
  "conflict",
  "fixed",
  "green",
  "yellow",
  "red",
  "required",
  "recommended",
  "optional",
  "luxury",
]);

// 根级/结构化字段：始终保留原值
const NEVER_KEYS = new Set([
  "id",
  "slug",
  "contentId",
  "type",
  "status",
  "locale",
  "patchStatus",
  "verificationStatus",
  "guideCategory",
  "sourceType",
  "method",
  "riskLevel",
  "danger",
  "needsTrial",
  "order",
  "key",
  "tag",
  "tags",
  "relatedBuildIds",
  "relatedBossIds",
  "relatedItemIds",
  "relatedPatchIds",
  "relatedSkillIds",
  "relatedContentIds",
  "heroImage",
  "cardImage",
  "noindex",
  "verifiedClientVersion",
  "patch",
  "league",
  "author",
  "reviewer",
]);

// 这些父键下的字符串列表项一律视为标识符
const ID_LIST_KEYS = new Set([
  "tags",
  "relatedBuildIds",
  "relatedBossIds",
  "relatedItemIds",
  "relatedPatchIds",
  "relatedSkillIds",
  "relatedContentIds",
]);

const isUrl = (v) => /^https?:\/\//i.test(v);
const isPath = (v) => v.startsWith("/");
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isTime = (v) => /^\d{1,2}:\d{2}$/.test(v);
const isNumber = (v) => /^[+-]?\d+(\.\d+)?$/.test(v);
const isPct = (v) => /^\d+(?:\.\d+)?%$/.test(v);
const isVersion = (v) => /^\d+(?:\.\d+)+[a-z]?$/.test(v);
const isSlug = (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
const isEnum = (v) => ENUM_VALUES.has(v.toLowerCase()) || ENUM_VALUES.has(v);

function autoKeep(key, value, parentKey) {
  if (value == null || typeof value !== "string") return true;
  if (NEVER_KEYS.has(key)) return true;
  if (key.endsWith("Id")) return true;
  if (ID_LIST_KEYS.has(parentKey)) return true;
  if (isUrl(value)) return true;
  if (isPath(value)) return true;
  if (isDate(value)) return true;
  if (isTime(value)) return true;
  if (isNumber(value)) return true;
  if (isPct(value)) return true;
  if (isVersion(value)) return true;
  if (isSlug(value)) return true;
  if (isEnum(value)) return true;
  return false;
}

const missing = new Set();
const untranslatedKeys = new Set();

function transform(node, parentKey) {
  if (node == null) return node;
  if (Array.isArray(node)) {
    return node.map((item) =>
      typeof item === "object" && item !== null
        ? transform(item, parentKey)
        : item,
    );
  }
  if (typeof node !== "object") return node;
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === "href") {
      out[k] =
        typeof v === "string" && v.startsWith("/en/")
          ? v.replace("/en/", "/de/")
          : v;
      continue;
    }
    if (typeof v === "string") {
      if (autoKeep(k, v, parentKey)) {
        out[k] = v;
      } else if (DICT[v] != null) {
        out[k] = DICT[v];
      } else {
        out[k] = v; // 保留英文，记录缺失
        missing.add(v);
        untranslatedKeys.add(k);
      }
    } else if (typeof v === "object" && v !== null) {
      out[k] = transform(v, k);
    } else {
      out[k] = v;
    }
  }
  return out;
}

async function main() {
  const FORCE = process.env.FORCE === "1";
  await mkdir(DE_DIR, { recursive: true });
  const files = (await readdir(EN_DIR)).filter((f) => f.endsWith(".json"));
  let written = 0,
    skipped = 0;
  for (const f of files) {
    const slug = f.replace(/\.json$/, "");
    const dePath = path.join(DE_DIR, f);
    if (existsSync(dePath) && !FORCE) {
      skipped++;
      continue;
    }
    const src = JSON.parse(await readFile(path.join(EN_DIR, f), "utf8"));
    const out = transform(src, null);
    out.locale = "de";
    out.translation = {
      sourceLocale: "en",
      sourceContentId: slug,
      sourceRevision: src.updatedAt,
      translationStatus: "machine-draft",
      translatedAt: "2026-08-04",
      translator: "llm-automated",
      translationRisk: "low",
    };
    await writeFile(dePath, JSON.stringify(out, null, 2) + "\n", "utf8");
    written++;
  }
  await writeFile(
    MISSING_PATH,
    JSON.stringify([...missing], null, 2) + "\n",
    "utf8",
  );
  console.log(
    `written=${written} skipped=${skipped} dictSize=${Object.keys(DICT).length} missing=${missing.size}`,
  );
  console.log(
    "missing sample keys:",
    [...untranslatedKeys].slice(0, 20).join(", "),
  );
}

await main();
