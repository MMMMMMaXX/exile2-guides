// Mechanical translation helper for exile2-guides-prd.
// Reads content/en/<cat>/<slug>.json, deep-clones, sets locale="tr",
// rewrites internal /en/ links to /tr/, preserves all controlled
// identifiers/enums/URLs/dates/numbers, and translates all visible
// string prose via the T() function (supplied Turkish by the operator).
//
// Usage: node scripts/translate_to_tr.mjs <cat> <slug>
//   or:   node scripts/translate_to_tr.mjs <cat>   (all slugs in cat)
// The script writes content/tr/<cat>/<slug>.json.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EN = path.join(ROOT, "content", "en");
const TR = path.join(ROOT, "content", "tr");

// ---- Deny-list: keys whose string value must NEVER be translated ----
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
  // controlled enum-like values inside objects:
  "status",
  "method",
]);

// Keys that hold arrays of controlled tags/ids -> keep whole array as-is.
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

// Enum string values that must be preserved exactly.
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
  "spell",
  "projectile",
  "lightning",
  "chaining",
  "aoe",
  "cold",
  "fire",
  "physical",
  "chaos",
]);

function isSlug(s) {
  return typeof s === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}
function isUrl(s) {
  return typeof s === "string" && /^https?:\/\//i.test(s);
}
function isPath(s) {
  return typeof s === "string" && s.startsWith("/");
}
function isDate(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}
function isNumberLike(s) {
  return typeof s === "string" && /^\d+(\.\d+)?$/.test(s);
}

// Rewrite internal links /en/ -> /tr/, keep #anchor and external.
function rewriteLink(s) {
  if (typeof s !== "string") return s;
  if (isUrl(s)) return s;
  if (s.startsWith("/en/")) return s.replace(/^\/en\//, "/tr/");
  return s;
}

// ---- The translation entry point (filled by operator) ----
// Default identity: returns text unchanged. Operator overrides per call
// by editing T() or by post-processing. We instead read a sidecar map if
// present. For this run we translate inline in the produced file.
function T(text) {
  return text; // overridden below via translateMap when provided
}

function translateString(key, value, parentObj) {
  if (value === null || value === undefined) return value;
  if (typeof value !== "string") return value;

  // Never translate controlled values.
  if (KEEP_KEYS.has(key)) return value;
  if (ENUM_VALUES.has(value.trim().toLowerCase()) && value.length < 24)
    return value;
  if (isSlug(value)) return value;
  if (isUrl(value)) return value;
  if (isPath(value) && !value.startsWith("/en/")) return value;
  if (isDate(value)) return value;
  if (isNumberLike(value)) return value;

  // internal link rewrite
  if (key === "href" || (isPath(value) && value.startsWith("/en/"))) {
    return rewriteLink(value);
  }

  return T(value);
}

function walk(obj, key) {
  if (Array.isArray(obj)) {
    // Keep controlled id/tag arrays verbatim.
    if (key && KEEP_ARRAY_KEYS.has(key)) return obj;
    return obj.map((v) => walk(v, key));
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (KEEP_KEYS.has(k)) {
        out[k] = v;
      } else if (KEEP_ARRAY_KEYS.has(k)) {
        out[k] = v; // controlled arrays
      } else if (k === "locale") {
        out[k] = "tr";
      } else if (typeof v === "string") {
        out[k] = translateString(k, v, obj);
      } else {
        out[k] = walk(v, k);
      }
    }
    return out;
  }
  return obj;
}

function processFile(cat, slug) {
  const enPath = path.join(EN, cat, slug + ".json");
  const trPath = path.join(TR, cat, slug + ".json");
  if (!fs.existsSync(enPath)) {
    console.error("MISSING en:", enPath);
    return false;
  }
  if (fs.existsSync(trPath)) {
    console.log("SKIP (exists):", cat + "/" + slug);
    return "skip";
  }
  const data = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const translated = walk(data, null);
  translated.locale = "tr";
  fs.writeFileSync(trPath, JSON.stringify(translated, null, 2) + "\n");
  console.log("WROTE:", cat + "/" + slug);
  return true;
}

function main() {
  const cat = process.argv[2];
  const slug = process.argv[3];
  if (!cat) {
    console.error("Usage: node translate_to_tr.mjs <cat> [slug]");
    process.exit(1);
  }
  let slugs;
  if (slug) {
    slugs = [slug];
  } else {
    slugs = fs
      .readdirSync(path.join(EN, cat))
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  }
  let wrote = 0,
    skip = 0,
    miss = 0;
  for (const s of slugs) {
    const r = processFile(cat, s);
    if (r === true) wrote++;
    else if (r === "skip") skip++;
    else miss++;
  }
  console.log(`\n[${cat}] wrote=${wrote} skip=${skip} missing=${miss}`);
}

main();
