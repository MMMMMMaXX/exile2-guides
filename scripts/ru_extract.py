#!/usr/bin/env python3
"""Extract translatable strings from content/en for Russian translation.
Translate-by-default with strong denylist of identifiers/enums/URLs/paths/dates.
"""
import glob, json, os, re, sys

ENUM = {
    "yes","no","text","high","low","medium","official","in-game","community",
    "tool","other","current","supported","legacy","under-review","draft",
    "published","source-reviewed","pending-pc","verified","unknown","removed",
    "fixed","outdated","queued","reviewing","valid","conflict","tracking",
    "changed-later","still-current","open","ready","early-access","atlas-rebuilt",
}
SLUG_RE = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
URL_RE = re.compile(r'^https?://')
PATH_RE = re.compile(r'^/')
DATE_RE = re.compile(r'^\d{4}-\d{2}-\d{2}$')
NUM_RE = re.compile(r'^-?\d+(\.\d+)?$')

# keys whose VALUE(s) must never be translated
DENY_KEYS = {
    "id","slug","locale","type","status","order","sourceType","rarity",
    "itemType","itemClass","patch","league","verificationStatus","noindex",
    "key","sinceVersion","version","format","method","kind","sourceLocale",
    "sourceContentId","translationStatus","translator","translatedAt",
    "translationRisk","url","src","image","thumbnail","icon","canonical",
    "verifiedClientVersion","classId","ascendancyId","videoId","contentId",
    "href","linkHref","anchorHref","anchor","linkText","tweet",
}
# array keys to skip entirely (controlled vocab / id lists)
SKIP_ARRAYS = {
    "tags","playstyleTags","damageTypes","stages","budgets",
    "relatedBuildIds","relatedBossIds","relatedItemIds","relatedSkillIds",
    "relatedGuideIds","relatedPatchIds","relatedIds","mainSkillIds",
    "secondarySkillIds","seoKeywords","keywords","categories",
}
# keys whose VALUE should be rewritten (/en/ -> /ru/) but not translated
REWRITE_KEYS = {"href","linkHref"}

count = 0
uniq = set()

def walk(obj, key=None):
    global count
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk(v, k)
    elif isinstance(obj, list):
        if key in SKIP_ARRAYS:
            return
        for it in obj:
            walk(it, key)
    elif isinstance(obj, str):
        if key is None:
            return
        if key in DENY_KEYS:
            return
        if not obj.strip():
            return
        if obj.startswith("#"):
            return
        if URL_RE.match(obj) or PATH_RE.match(obj) or DATE_RE.match(obj):
            return
        if NUM_RE.match(obj.strip()):
            return
        if obj.strip().lower() in ENUM:
            return
        if SLUG_RE.match(obj) and " " not in obj:
            # identifier-like, skip (e.g. classId values referenced elsewhere)
            return
        if key == "href":
            return  # links handled separately (rewrite only)
        uniq.add(obj)
        count += 1

for f in sorted(glob.glob("content/en/*/*.json")):
    try:
        walk(json.load(open(f, encoding="utf-8")))
    except Exception as e:
        print("ERR", f, e, file=sys.stderr)

print(f"total string occurrences={count} unique={len(uniq)}", file=sys.stderr)
json.dump(sorted(uniq), open(sys.argv[1], "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
