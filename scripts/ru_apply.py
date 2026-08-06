#!/usr/bin/env python3
"""Apply Russian translation dict to content/en -> content/ru.
Deep-copies structure, sets locale=ru, rewrites /en/ -> /ru/ links,
translates string values found in the dict. Identifiers/enums/URLs/dates
kept as-is. Strings not in dict keep their English value (graceful fallback).
"""
import json, os, re, sys, glob

SLUG_RE = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
URL_RE = re.compile(r'^https?://')
PATH_RE = re.compile(r'^/')
DATE_RE = re.compile(r'^\d{4}-\d{2}-\d{2}$')
NUM_RE = re.compile(r'^-?\d+(\.\d+)?$')

ENUM = {
    "yes","no","text","high","low","medium","official","in-game","community",
    "tool","other","current","supported","legacy","under-review","draft",
    "published","source-reviewed","pending-pc","verified","unknown","removed",
    "fixed","outdated","queued","reviewing","valid","conflict","tracking",
    "changed-later","still-current","open","ready","early-access","atlas-rebuilt",
    "archived","review-needed","reviewed","stale","source","machine-draft",
    "mechanic-critical","required","recommended","optional","luxury","quote",
    "paraphrase","forum","reddit","guide","video","starter","leveling",
    "early-endgame","endgame","bossing","beginner","intermediate","advanced",
    "true","false","high","low","medium",
}
DENY_KEYS = {
    "id","slug","locale","type","status","order","sourceType","rarity",
    "itemType","itemClass","patch","league","verificationStatus","noindex",
    "key","sinceVersion","version","format","method","kind","sourceLocale",
    "sourceContentId","translationStatus","translator","translatedAt",
    "translationRisk","url","src","image","thumbnail","icon","canonical",
    "verifiedClientVersion","classId","ascendancyId","videoId","contentId",
    "href","linkHref","anchorHref","anchor","linkText","tweet",
}
SKIP_ARRAYS = {
    "tags","playstyleTags","damageTypes","stages","budgets",
    "relatedBuildIds","relatedBossIds","relatedItemIds","relatedSkillIds",
    "relatedGuideIds","relatedPatchIds","relatedIds","mainSkillIds",
    "secondarySkillIds","seoKeywords","keywords","categories",
}
REWRITE_KEYS = {"href","linkHref"}

def tr_str(value, key, dict_map):
    if not isinstance(value, str) or not value.strip():
        return value
    if key in REWRITE_KEYS:
        return value.replace("/en/", "/ru/")
    if key in DENY_KEYS:
        return value
    if value.startswith("#"):
        return value
    if URL_RE.match(value) or PATH_RE.match(value) or DATE_RE.match(value):
        return value
    if NUM_RE.match(value.strip()):
        return value
    if value.strip().lower() in ENUM:
        return value
    if SLUG_RE.match(value) and " " not in value:
        return value
    if value in dict_map:
        ru = dict_map[value]
        if ru and ru != value:
            return ru
    return value  # graceful English fallback

def transform(obj, key, dict_map):
    if isinstance(obj, dict):
        out = {}
        for k, v in obj.items():
            out[k] = transform(v, k, dict_map)
        return out
    if isinstance(obj, list):
        if key in SKIP_ARRAYS:
            return obj
        return [transform(it, key, dict_map) for it in obj]
    if isinstance(obj, str):
        return tr_str(obj, key, dict_map)
    return obj

def main():
    dict_map = json.load(open(sys.argv[1], encoding="utf-8"))
    cats = ["builds","bosses","items","skills","guides","patches"]
    total = 0
    for cat in cats:
        en_dir = os.path.join("content/en", cat)
        ru_dir = os.path.join("content/ru", cat)
        os.makedirs(ru_dir, exist_ok=True)
        for f in sorted(glob.glob(os.path.join(en_dir, "*.json"))):
            slug = os.path.splitext(os.path.basename(f))[0]
            # skip template/placeholder files (contain forbidden markers)
            text = open(f, encoding="utf-8").read()
            if "REPLACE_WITH" in text or '"status": "draft"' in text:
                continue
            data = json.loads(text)
            data = transform(data, None, dict_map)
            data["locale"] = "ru"
            outp = os.path.join(ru_dir, slug + ".json")
            json.dump(data, open(outp, "w", encoding="utf-8"),
                      ensure_ascii=False, indent=2)
            outp_f = open(outp, "a", encoding="utf-8")
            outp_f.write("\n")
            outp_f.close()
            total += 1
    print(f"wrote {total} ru files", flush=True)

if __name__ == "__main__":
    main()
