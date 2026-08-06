#!/usr/bin/env python3
"""Step 1: 机械规则转换 + 提取可翻译字符串。

读取 content/en/bosses/*.json，对每个文件：
- locale -> "ru"
- status 复制
- href 中 "/en/" -> "/ru/"
- 末尾追加 translation 块
- 结构、键名、id/slug、标识符/enums/日期/URL/路径 全部保持原值
- 其余用户可见英文字符串替换为 "§TR<n>§" 占位符

输出：
- content/ru/bosses/<slug>.json  (占位符版本，跳过已存在文件)
- /tmp/tr_strings.jsonl  (每行 {slug, path, idx, en})
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EN_DIR = os.path.join(ROOT, "content", "en", "bosses")
RU_DIR = os.path.join(ROOT, "content", "ru", "bosses")
OUT_MAP = "/tmp/tr_strings.jsonl"

# 必须保持原值的形式
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ENUMS = {
    "yes", "no", "text", "high", "low", "medium", "official", "in-game",
    "community", "tool", "other", "current", "supported", "legacy",
    "under-review", "draft", "published", "source-reviewed", "pending-pc",
    "verified", "archived", "review-needed", "reviewed", "stale", "source",
    "machine-draft", "mechanic-critical",
}
# 这些根/嵌套字段是标识符或枚举，绝不翻译
NEVER_TRANSLATE_KEYS = {
    "id", "slug", "type", "status", "locale", "featured", "difficulty",
    "bossCategory", "act", "damageTypes", "tags", "phaseId", "attackId",
    "itemId", "mediaId", "sourceId", "sourceType", "kind", "danger",
    "rights", "relatedBuildIds", "relatedGuideIds", "relatedItemIds",
    "relatedPatchIds", "relatedQuestionIds", "relatedContentIds", "phaseIds",
    "mediaIds", "sourceIds", "contentId", "contentType", "verifiedClientVersion",
    "patchStatus", "verificationStatus", "method", "noindex",
    # 必须原样保留的字段（品牌/版本/人员/文案）
    "patch", "league", "author", "reviewer", "credit",
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
        # 页面内锚点链接（如 #preparation / #attacks）保持原样
        return True
    if "http://" in val or "https://" in val:
        # 嵌入式 URL 的整串保留（如 "Official Patch Notes — https://..."）
        return True
    if val.startswith(BRAND_PREFIXES):
        return True
    return False


def transform(obj, path, counters, slug, en_map):
    """返回转换后的对象（字符串可能被替换为占位符）。"""
    if isinstance(obj, dict):
        new = {}
        for k, v in obj.items():
            if k == "translation":
                # 不应在源中存在；跳过以防万一
                continue
            if k in NEVER_TRANSLATE_KEYS:
                new[k] = v
                continue
            if k == "href" and isinstance(v, str):
                if v.startswith("/en/"):
                    new[k] = v.replace("/en/", "/ru/", 1)
                else:
                    new[k] = v
                continue
            # seo 内的 title/description 需要翻译，但 noindex 保持
            if k == "seo" and isinstance(v, dict):
                new[k] = transform(v, path + [k], counters, slug, en_map)
                continue
            new[k] = transform(v, path + [k], counters, slug, en_map)
        return new
    if isinstance(obj, list):
        return [transform(x, path + [i], counters, slug, en_map) for i, x in enumerate(obj)]
    if isinstance(obj, str):
        # 决定是否翻译
        parent_key = path[-1] if path else ""
        if parent_key in NEVER_TRANSLATE_KEYS:
            return obj
        if is_keep_value(obj):
            return obj
        if obj.strip() == "":
            return obj
        # 占位符
        idx = counters["n"]
        counters["n"] += 1
        en_map.append({"slug": slug, "path": ".".join(str(p) for p in path), "idx": idx, "en": obj})
        return f"§TR{idx}§"
    return obj


def main():
    os.makedirs(RU_DIR, exist_ok=True)
    files = sorted(f for f in os.listdir(EN_DIR) if f.endswith(".json"))
    with open(OUT_MAP, "w", encoding="utf-8") as mf:
        written = 0
        skipped = 0
        for fname in files:
            slug = fname[:-5]
            ru_path = os.path.join(RU_DIR, fname)
            if os.path.exists(ru_path):
                skipped += 1
                continue
            with open(os.path.join(EN_DIR, fname), encoding="utf-8") as f:
                data = json.load(f)
            en_map = []
            counters = {"n": 0}
            transformed = transform(data, [], counters, slug, en_map)
            transformed["locale"] = "ru"
            # status 已复制（源值）
            # 追加 translation 块
            transformed["translation"] = {
                "sourceLocale": "en",
                "sourceContentId": slug,
                "sourceRevision": data.get("updatedAt", ""),
                "translationStatus": "machine-draft",
                "translatedAt": "2026-08-04",
                "translator": "llm-automated",
                "translationRisk": "low",
            }
            with open(ru_path, "w", encoding="utf-8") as f:
                json.dump(transformed, f, ensure_ascii=False, indent=2)
                f.write("\n")
            for rec in en_map:
                mf.write(json.dumps(rec, ensure_ascii=False) + "\n")
            written += 1
    print(f"written={written} skipped={skipped} map={OUT_MAP}")


if __name__ == "__main__":
    main()
