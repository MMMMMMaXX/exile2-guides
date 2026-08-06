#!/usr/bin/env python3
"""Step 1: 机械规则转换 + 提取可翻译字符串 (items -> pt-br)。

读取 content/en/items/*.json，对每个文件：
- locale -> "pt-br"
- status 复制源值
- href / linkHref 中 "/en/" -> "/pt-br/"
- 末尾追加 translation 块
- 结构、键名、id/slug、标识符/enums/日期/URL/路径 全部保持原值
- 其余用户可见英文字符串替换为 "§TR<n>§" 占位符

输出：
- content/pt-br/items/<slug>.json  (占位符版本，跳过已存在文件)
- /tmp/tr_items_ptbr.jsonl  (每行 {slug, path, idx, en})
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EN_DIR = os.path.join(ROOT, "content", "en", "items")
PT_DIR = os.path.join(ROOT, "content", "pt-br", "items")
OUT_MAP = "/tmp/tr_items_ptbr.jsonl"

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ENUMS = {
    "yes", "no", "text", "high", "low", "medium", "official", "in-game",
    "community", "tool", "other", "current", "supported", "legacy",
    "under-review", "draft", "published", "source-reviewed", "pending-pc",
    "verified", "archived", "review-needed", "reviewed", "stale", "source",
    "machine-draft", "mechanic-critical",
}
# 这些键对应标识符/枚举/品牌/版本，绝不翻译（其子值保持原样）
NEVER_TRANSLATE_KEYS = {
    "id", "slug", "type", "status", "locale", "featured", "contentId",
    "contentType", "sourceId", "sourceType", "patchStatus",
    "verificationStatus", "method", "noindex", "rights", "version",
    "patch", "league", "author", "reviewer", "credit",
    "tags", "useCases", "relatedBuildIds", "relatedBossIds",
    "relatedSkillIds", "relatedGuideIds", "relatedItemIds",
    "relatedPatchIds", "relatedContentIds", "relatedQuestionIds",
}
TIMECODE_RE = re.compile(r"^\d{1,2}:\d{2}$")
BRAND_PREFIXES = ("Exile2 Guides",)


def is_keep_value(val: str) -> bool:
    if SLUG_RE.match(val):
        return True
    if ISO_DATE_RE.match(val):
        return True
    if TIMECODE_RE.match(val):
        return True
    if val in ENUMS:
        return True
    if val.startswith("http://") or val.startswith("https://"):
        return True
    if val.startswith("/"):
        return True
    if val.startswith("#"):
        return True
    if "http://" in val or "https://" in val:
        return True
    if val.startswith(BRAND_PREFIXES):
        return True
    return False


def transform(obj, path, counters, slug, en_map):
    if isinstance(obj, dict):
        new = {}
        for k, v in obj.items():
            if k == "translation":
                continue
            if k in NEVER_TRANSLATE_KEYS:
                new[k] = v
                continue
            if k == "href" and isinstance(v, str):
                new[k] = v.replace("/en/", "/pt-br/", 1) if v.startswith("/en/") else v
                continue
            if k == "linkHref" and isinstance(v, str):
                new[k] = v.replace("/en/", "/pt-br/", 1) if v.startswith("/en/") else v
                continue
            if k == "seo" and isinstance(v, dict):
                new[k] = transform(v, path + [k], counters, slug, en_map)
                continue
            new[k] = transform(v, path + [k], counters, slug, en_map)
        return new
    if isinstance(obj, list):
        return [transform(x, path + [i], counters, slug, en_map) for i, x in enumerate(obj)]
    if isinstance(obj, str):
        parent_key = path[-1] if path else ""
        if parent_key in NEVER_TRANSLATE_KEYS:
            return obj
        if is_keep_value(obj):
            return obj
        if obj.strip() == "":
            return obj
        idx = counters["n"]
        counters["n"] += 1
        en_map.append({"slug": slug, "path": ".".join(str(p) for p in path), "idx": idx, "en": obj})
        return f"\u00a7TR{idx}\u00a7"
    return obj


def main():
    os.makedirs(PT_DIR, exist_ok=True)
    files = sorted(f for f in os.listdir(EN_DIR) if f.endswith(".json"))
    with open(OUT_MAP, "w", encoding="utf-8") as mf:
        written = 0
        skipped = 0
        total_strings = 0
        for fname in files:
            slug = fname[:-5]
            pt_path = os.path.join(PT_DIR, fname)
            if os.path.exists(pt_path):
                skipped += 1
                continue
            with open(os.path.join(EN_DIR, fname), encoding="utf-8") as f:
                data = json.load(f)
            en_map = []
            counters = {"n": 0}
            transformed = transform(data, [], counters, slug, en_map)
            transformed["locale"] = "pt-br"
            transformed["translation"] = {
                "sourceLocale": "en",
                "sourceContentId": slug,
                "sourceRevision": data.get("updatedAt", ""),
                "translationStatus": "machine-draft",
                "translatedAt": "2026-08-04",
                "translator": "llm-automated",
                "translationRisk": "low",
            }
            with open(pt_path, "w", encoding="utf-8") as f:
                json.dump(transformed, f, ensure_ascii=False, indent=2)
                f.write("\n")
            for rec in en_map:
                mf.write(json.dumps(rec, ensure_ascii=False) + "\n")
            written += 1
            total_strings += len(en_map)
    print(f"written={written} skipped={skipped} total_strings={total_strings} map={OUT_MAP}")


if __name__ == "__main__":
    main()
