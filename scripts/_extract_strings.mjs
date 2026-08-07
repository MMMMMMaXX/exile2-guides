// 提取 en/builds 中所有"可翻译候选"字符串（去重），供人工/LLM 提供德译。
// 自动按模式判定为 KEEP 的字符串不会进入候选（脚本自动保留原值）。
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const EN_BUILD = path.resolve("content/en/builds");
const OUT = path.resolve("scripts/_strings.json");

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
  "required",
  "recommended",
  "optional",
  "luxury",
  "quote",
  "paraphrase",
  "forum",
  "reddit",
  "guide",
  "video",
  "starter",
  "leveling",
  "early-endgame",
  "endgame",
  "bossing",
  "beginner",
  "intermediate",
  "advanced",
  "true",
  "false",
]);

const NEVER_KEYS = new Set([
  "id",
  "slug",
  "contentId",
  "type",
  "status",
  "locale",
  "classId",
  "ascendancyId",
  "skillId",
  "patchStatus",
  "verificationStatus",
  "difficulty",
  "sourceType",
  "representation",
  "tier",
  "time",
  "levelRange",
  "url",
  "buildPlannerUrl",
  "importUrl",
  "downloadUrl",
  "creatorUrl",
  "heroImage",
  "cardImage",
  "image",
  "icon",
  "verifiedClientVersion",
  "patch",
]);

const ID_LIST_KEYS = new Set([
  "mainSkillIds",
  "secondarySkillIds",
  "tags",
  "relatedBuildIds",
  "relatedGuideIds",
  "playstyleTags",
  "damageTypes",
  "bestFor",
  "stages",
  "budgets",
  "supportSkillIds",
]);

const isUrl = (v) => /^https?:\/\//i.test(v);
const isPath = (v) => v.startsWith("/");
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isNumber = (v) => /^-?\d+(\.\d+)?$/.test(v);
const isSlug = (v) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v);
const isEnum = (v) => ENUM_VALUES.has(v.toLowerCase()) || ENUM_VALUES.has(v);

function isKeepByPattern(key, value, parentKey) {
  if (value == null || typeof value !== "string") return true;
  if (NEVER_KEYS.has(key)) return true;
  if (key.endsWith("Id")) return true;
  if (ID_LIST_KEYS.has(parentKey)) return true;
  if (isUrl(value)) return true;
  if (isPath(value)) return true;
  if (isDate(value)) return true;
  if (isNumber(value)) return true;
  if (isSlug(value)) return true;
  if (isEnum(value)) return true;
  return false;
}

const candidates = new Map(); // value -> { count, keys:Set, samplePaths:[] }

function walk(node, parentKey, pathStr) {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      if (typeof item === "string") {
        consider(parentKey, item, `${pathStr}[${i}]`, parentKey);
      } else if (typeof item === "object") {
        walk(item, parentKey, `${pathStr}[${i}]`);
      }
    });
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === "string") {
        consider(k, v, `${pathStr}.${k}`, k);
      } else if (typeof v === "object" && v !== null) {
        walk(v, k, `${pathStr}.${k}`);
      }
    }
  }
}

function consider(key, value, pathStr, parentKey) {
  // href 特殊处理：仅做 /en/ -> /de/ 局部化，不当作"待翻译文本"候选
  if (key === "href") return;
  if (isKeepByPattern(key, value, parentKey)) return;
  const rec = candidates.get(value) ?? { count: 0, keys: new Set(), paths: [] };
  rec.count += 1;
  rec.keys.add(key);
  if (rec.paths.length < 3) rec.paths.push(pathStr);
  candidates.set(value, rec);
}

const files = (await readdir(EN_BUILD)).filter((f) => f.endsWith(".json"));
for (const f of files) {
  const src = JSON.parse(await readFile(path.join(EN_BUILD, f), "utf8"));
  walk(src, null, f);
}

const list = [...candidates.entries()].map(([value, rec]) => ({
  value,
  count: rec.count,
  keys: [...rec.keys],
  paths: rec.paths,
}));
// 按出现频次降序，便于优先翻译高频（重复）短语
list.sort((a, b) => b.count - a.count);

await writeFile(OUT, JSON.stringify(list, null, 2) + "\n");
console.log(`files=${files.length} uniqueCandidates=${list.length}`);
console.log(
  "total candidate occurrences=",
  list.reduce((s, x) => s + x.count, 0),
);
