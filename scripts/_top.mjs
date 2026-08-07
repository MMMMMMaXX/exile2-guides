import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
const EN_DIR = path.resolve("content/en/guides");
const DICT = {};
for (const f of (await readdir(path.resolve("scripts")))
  .filter((f) => /^_dict.*\.json$/.test(f))
  .sort()) {
  Object.assign(
    DICT,
    JSON.parse(await readFile(path.resolve("scripts", f), "utf8")),
  );
}
const ENUM = new Set([
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
const NEVER = new Set([
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
const isUrl = (v) => /^https?:\/\//i.test(v),
  isPath = (v) => v.startsWith("/"),
  isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
  isTime = (v) => /^\d{2}:\d{2}$/.test(v),
  isNum = (v) => /^-?\d+(\.\d+)?$/.test(v),
  isVer = (v) => /^\d+(?:\.\d+)+[a-z]?$/.test(v),
  isSlug = (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
  isEnum = (v) => ENUM.has(v.toLowerCase()) || ENUM.has(v);
function keep(k, v, p) {
  if (v == null || typeof v !== "string") return true;
  if (NEVER.has(k)) return true;
  if (k.endsWith("Id")) return true;
  if (
    [
      "tags",
      "relatedBuildIds",
      "relatedBossIds",
      "relatedItemIds",
      "relatedPatchIds",
      "relatedSkillIds",
      "relatedContentIds",
    ].includes(p)
  )
    return true;
  if (
    isUrl(v) ||
    isPath(v) ||
    isDate(v) ||
    isTime(v) ||
    isNum(v) ||
    isVer(v) ||
    isSlug(v) ||
    isEnum(v)
  )
    return true;
  return false;
}
const freq = new Map();
function walk(node, p) {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((i) => (typeof i === "object" && i !== null ? walk(i, p) : 0));
    return;
  }
  if (typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "href") continue;
    if (typeof v === "string") {
      if (!keep(k, v, p) && DICT[v] == null) {
        freq.set(v, (freq.get(v) || 0) + 1);
      }
    } else if (typeof v === "object" && v !== null) {
      walk(v, k);
    }
  }
}
for (const f of (await readdir(EN_DIR)).filter((f) => f.endsWith(".json"))) {
  walk(JSON.parse(await readFile(path.join(EN_DIR, f), "utf8")), null);
}
const rows = [...freq.entries()].sort((a, b) => b[1] - a[1]);
const top = rows.slice(0, 250).map(([s, c]) => ({ count: c, text: s }));
await writeFile(
  path.resolve("tmp/_top_missing.json"),
  JSON.stringify(top, null, 2) + "\n",
  "utf8",
);
console.log("wrote tmp/_top_missing.json with " + top.length + " entries");
// also dump full text of top 60 for quick reading
for (const { count, text } of top.slice(0, 60))
  console.log("\n[" + count + "] " + text);
