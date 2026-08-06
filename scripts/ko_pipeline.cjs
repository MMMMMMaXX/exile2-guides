#!/usr/bin/env node
// ko localization pipeline: extract translatable strings, then apply translations.
// Safety: a deny-list protects identifiers / controlled vocabulary; everything else is treated as prose.
const fs = require('fs');
const path = require('path');

// Keys whose string values are identifiers / controlled vocab -> NEVER translate.
const DENY_KEYS = new Set([
  'id', 'slug', 'locale', 'type', 'status', 'order', 'sourceType', 'rarity',
  'itemType', 'itemClass', 'patch', 'patchStatus', 'league', 'verificationStatus',
  'representation', 'tier', 'slot', 'time', 'levelRange', 'date', 'createdAt',
  'publishedAt', 'updatedAt', 'lastVerifiedAt', 'noindex', 'canonical', 'keywords',
  'url', 'heroImage', 'cardImage', 'buildPlannerUrl', 'creatorUrl', 'creator',
  'creatorName', 'image', 'videoUrl', 'thumbnailUrl', 'itemId', 'featured',
  'displayId', 'category', 'region', 'questId', 'act', 'tierLabel',
  'stages', 'budgets', 'difficulty', 'playstyleTags', 'damageTypes', 'bestFor',
  'tags', 'baseType', 'itemCategory', 'bossCategory', 'skillType', 'skillCategory',
  'skillTags', 'guideCategory', 'patchCategory', 'patchVersion',
  'verifiedClientVersion', 'currentBaseline', 'returningPlayerPriority',
  'historicalStatus', 'topicId', 'rights', 'src', 'mediaType', 'damageType',
  'itemSlot', 'weaponType', 'armourType', 'gemType', 'supportType', 'skillIdRef',
  'currencyType', 'mapTier', 'method'
]);

// Also deny any key that ends with Id/Ids/Url/Image (identifiers & links).
function isDeniedKey(k) {
  if (DENY_KEYS.has(k)) return true;
  if (/Ids?$/.test(k)) return true;
  if (/Url$/.test(k) || /Image$/.test(k)) return true;
  return false;
}

function isDeniedKey(k) {
  if (DENY_KEYS.has(k)) return true;
  // id arrays / single ids
  if (/Ids?$/.test(k)) return true;
  if (/Url$/.test(k) || /Image$/.test(k)) return true;
  return false;
}

// Collect translatable string values in deterministic order.
function collect(doc, out) {
  if (Array.isArray(doc)) {
    for (const item of doc) collect(item, out);
    return;
  }
  if (doc && typeof doc === 'object') {
    for (const [k, v] of Object.entries(doc)) {
      if (isDeniedKey(k)) continue; // skip identifiers
      collect(v, out);
    }
    return;
  }
  if (typeof doc === 'string') out.push(doc);
}

// Build a new doc replacing each translatable string with the next translation.
function apply(doc, trs, idx) {
  if (Array.isArray(doc)) {
    return doc.map((item) => apply(item, trs, idx));
  }
  if (doc && typeof doc === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(doc)) {
      if (isDeniedKey(k)) { out[k] = v; continue; }
      out[k] = apply(v, trs, idx);
    }
    return out;
  }
  if (typeof doc === 'string') {
    let t = trs[idx.i++];
    if (typeof t !== 'string') t = doc;
    return t.replace(/\/en\//g, '/ko/');
  }
  return doc;
}

function check(p, d) {
  const bad = [];
  if (d.locale !== 'ko') bad.push('locale');
  if (!d.id || !d.slug) bad.push('id/slug');
  const s = JSON.stringify(d);
  if (/TODO|草稿|draft|placeholder|REPLACE_WITH/i.test(s)) bad.push('forbidden-marker');
  if (/[一-鿿]/.test(s)) bad.push('cjk-garbage');
  if (bad.length) throw new Error(p + ' BAD:' + bad.join(','));
}

function main() {
  const [cmd, a, b, c] = process.argv.slice(2);
  if (cmd === 'extract') {
    const doc = JSON.parse(fs.readFileSync(a, 'utf8'));
    const out = [];
    collect(doc, out);
    fs.writeFileSync(b, JSON.stringify(out, null, 2));
    console.log('extracted', out.length, 'strings from', a);
  } else if (cmd === 'apply') {
    const doc = JSON.parse(fs.readFileSync(a, 'utf8'));
    const trs = JSON.parse(fs.readFileSync(b, 'utf8'));
    const idx = { i: 0 };
    const ko = apply(doc, trs, idx);
    ko.locale = 'ko';
    if (idx.i !== trs.length) {
      console.error('WARN translation count mismatch: applied', idx.i, 'expected', trs.length);
    }
    const s = JSON.stringify(ko, null, 2);
    fs.mkdirSync(path.dirname(c), { recursive: true });
    fs.writeFileSync(c, s + '\n');
    check(c, JSON.parse(s));
    console.log('OK wrote', c, '(', idx.i, 'strings )');
  } else {
    console.error('usage: ko_pipeline.cjs extract <en> <stringsOut> | apply <en> <translations> <koOut>');
    process.exit(2);
  }
}
main();
