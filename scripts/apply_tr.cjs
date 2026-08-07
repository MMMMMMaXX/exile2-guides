// apply_tr.cjs — build content/tr/<cat>/<slug>.json from en + EN->TR dictionary.
// Dictionary format (one per line):  ESC(EN) \t ESC(TR)
// A translatable leaf is substituted when its (escaped) value matches a dict key.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EN = path.join(ROOT, "content", "en");
const TR = path.join(ROOT, "content", "tr");
const TSV = process.argv[2] || path.join(ROOT, "tmp", "tr_dict.tsv");

const unesc = (s) =>
  s
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\\\/g, "\\");
const esc = (s) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/\t/g, "\\t")
    .replace(/\n/g, "\n")
    .replace(/\r/g, "\r");

// build EN->TR map
const map = new Map();
const raw = fs.readFileSync(TSV, "utf8").split("\n").filter(Boolean);
for (const l of raw) {
  const i = l.indexOf("\t");
  if (i < 0) continue;
  const en = l.slice(0, i);
  const tr = l.slice(i + 1);
  map.set(en, tr); // keys/values already escaped in the file
}

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
const rewriteLink = (s) => {
  // Rewrite every internal site link /en/... -> /tr/..., but leave external
  // http(s):// URLs that happen to contain /en/ (e.g. poe2db.tw/en/...) intact.
  if (typeof s !== "string") return s;
  const urls = [];
  let t = s.replace(/https?:\/\/[^\s)"'\]]+/g, (m) => {
    urls.push(m);
    return "\u0000" + (urls.length - 1) + "\u0000";
  });
  t = t.replace(/\/en\//g, "/tr/");
  t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => urls[+i]);
  return t;
};

let missing = 0;
function walk(obj, key) {
  if (Array.isArray(obj)) {
    if (key && KEEP_ARRAY_KEYS.has(key)) return obj;
    return obj.map((v) => walk(v, key));
  }
  if (obj && typeof obj === "object") {
    const o = {};
    for (const k of Object.keys(obj)) {
      if (k === "locale") {
        o[k] = "tr";
        continue;
      }
      o[k] = walk(obj[k], k);
    }
    return o;
  }
  if (typeof obj === "string") {
    if (KEEP_KEYS.has(key)) {
      // href/url/link hold links: rewrite internal /en/ -> /tr/ but keep external URLs.
      if (
        (key === "href" || key === "url" || key === "link") &&
        typeof obj === "string"
      )
        return rewriteLink(obj);
      return obj;
    }
    if (ENUM_VALUES.has(obj.trim().toLowerCase()) && obj.length < 24)
      return obj;
    if (isSlug(obj)) return obj;
    if (isUrl(obj)) return obj;
    if (isDate(obj)) return obj;
    if (isNum(obj)) return obj;
    if (obj.startsWith("/") && !obj.startsWith("/en/")) return obj;
    const k = esc(obj);
    if (map.has(k)) return rewriteLink(unesc(map.get(k)));
    missing++;
    return rewriteLink(obj);
  }
  return obj;
}

let wrote = 0;
for (const cat of fs.readdirSync(EN).filter((c) => {
  try {
    return fs.statSync(path.join(EN, c)).isDirectory();
  } catch {
    return false;
  }
})) {
  const dir = path.join(EN, cat);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const slug = f.replace(/\.json$/, "");
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    if (data.status && data.status !== "published") continue; // skip draft templates
    const translated = walk(data, null);
    translated.locale = "tr";
    fs.mkdirSync(path.join(TR, cat), { recursive: true });
    fs.writeFileSync(
      path.join(TR, cat, slug + ".json"),
      JSON.stringify(translated, null, 2) + "\n",
    );
    wrote++;
  }
}
console.log(
  `Applied dictionary (${map.size} entries) -> wrote ${wrote} files. Untranslated leaves (fell back to EN): ${missing}`,
);
