// extract_tr.mjs — collect all translatable string leaves from en files
// into a compact TSV worklist:  <cat>/<slug>.json \t <jsonpath> \t <english>
// Non-translatable values (ids, urls, dates, enums, controlled keys) are
// NOT collected; the apply step copies them verbatim from en.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EN = path.join(ROOT, "content", "en");
const OUT = path.join(ROOT, "tmp", "tr_extract.tsv");

const KEEP_KEYS = new Set([
  "id",
  "slug",
  "locale",
  "type",
  "status",
  "order",
  "sourceType",
  "rarity",
  "itemType",
  "itemClass",
  "patch",
  "league",
  "verificationStatus",
  "author",
  "reviewer",
  "createdAt",
  "publishedAt",
  "updatedAt",
  "lastVerifiedAt",
  "heroImage",
  "cardImage",
  "url",
  "href",
  "method",
  "verifiedClientVersion",
  "noindex",
  "canonical",
  "time",
  "date",
  "requiredLevel",
  "gemLevel",
  "minimumCharacterLevel",
  "spiritReservation",
  "uncutGemTier",
  "patchStatus",
  "skillType",
  "skillCategory",
]);
const KEEP_ARRAY_KEYS = new Set([
  "skillTags",
  "tags",
  "relatedBuildIds",
  "relatedBossIds",
  "relatedGuideIds",
  "relatedItemIds",
  "relatedPatchIds",
  "relatedSkillIds",
]);
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
  "source-reviewed",
  "pending-pc",
  "verified",
  "active",
]);
const isSlug = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const isUrl = (s) => /^https?:\/\//i.test(s);
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const isNum = (s) => /^\d+(\.\d+)?$/.test(s);

const rows = [];
function collect(cat, slug, obj, key, path) {
  // top-level: obj is the file; we recurse
  if (Array.isArray(obj)) {
    if (key && KEEP_ARRAY_KEYS.has(key)) return; // controlled array, skip contents
    obj.forEach((v, i) => collect(cat, slug, v, key, path + "[" + i + "]"));
    return;
  }
  if (obj && typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      collect(cat, slug, obj[k], k, path ? path + "." + k : k);
    }
    return;
  }
  // leaf string
  if (typeof obj === "string") {
    if (KEEP_KEYS.has(key)) return;
    if (ENUM_VALUES.has(obj.trim().toLowerCase()) && obj.length < 24) return;
    if (isSlug(obj)) return;
    if (isUrl(obj)) return;
    if (isDate(obj)) return;
    if (isNum(obj)) return;
    // internal link value: still translate the prose, but note it may contain /en/
    if (obj.startsWith("/") && !obj.startsWith("/en/")) return; // image/path control
    rows.push({ cat, slug, path, en: obj });
  }
}

const cats = process.argv[2]
  ? [process.argv[2]]
  : fs.readdirSync(EN).filter((c) => {
      try {
        return fs.statSync(path.join(EN, c)).isDirectory();
      } catch {
        return false;
      }
    });
for (const cat of cats) {
  const dir = path.join(EN, cat);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const slug = f.replace(/\.json$/, "");
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    if (data.status && data.status !== "published") continue; // skip draft templates
    collect(cat, slug, data, null, "");
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const esc = (s) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/\t/g, "\\t")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
const lines = rows.map(
  (r) => `${r.cat}/${r.slug}.json\t${r.path}\t${esc(r.en)}`,
);
fs.writeFileSync(OUT, lines.join("\n") + (lines.length ? "\n" : ""));
console.log(`Extracted ${rows.length} translatable strings -> ${OUT}`);
