#!/usr/bin/env python3
"""Mechanische Hilfsfunktionen für die DE-Übersetzung der Patch-Inhalte.

Dieses Skript übernimmt NUR die mechanischen Regeln:
  - Struktur (Keys/Typen/Ids/order) 1:1 aus der EN-Quelle übernehmen
  - Übersetzbare Textwerte über eine Übersetzungsmap (en->de) ersetzen
  - Interne Links /en/ -> /de/ lokalisieren
  - locale="de", translation-Block anhängen
  - 2-Leerzeichen-Einrückung + abschließender Zeilenumbruch

Die eigentliche Übersetzung (Deutsch) erfolgt durch einen LLM-Subagenten,
der die Map(en) erzeugt.
"""
import json
import os
import re
import sys

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

ENUM_KEEP = {
    "yes", "no", "text", "high", "low", "medium",
    "official", "in-game", "community", "tool", "other", "current",
    "supported", "legacy", "under-review", "draft", "published",
    "source-reviewed", "pending-pc", "verified",
}

# Root-Ebene Felder, die immer unverändert bleiben (Bylines / Eventnamen / Versionsstring)
FORCE_KEEP_ROOT = {"patch", "league", "author", "reviewer"}


def is_keep(value):
    if not isinstance(value, str):
        return True
    if SLUG_RE.fullmatch(value):
        return True
    if value.startswith("http://") or value.startswith("https://"):
        return True
    if value.startswith("/"):
        return True
    if DATE_RE.fullmatch(value):
        return True
    if value in ENUM_KEEP:
        return True
    return False


def collect_translatable(obj, path="", out=None):
    """Sammelt alle übersetzbaren Textwerte (Pfad -> englischer Text)."""
    if out is None:
        out = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f"{path}.{k}" if path else k
            if k in FORCE_KEEP_ROOT and isinstance(v, str):
                continue
            collect_translatable(v, p, out)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            collect_translatable(v, f"{path}[{i}]", out)
    elif isinstance(obj, str):
        if not is_keep(obj):
            out[path] = obj
    return out


def localize_href(value):
    if isinstance(value, str) and value.startswith("/en/"):
        return "/de/" + value[len("/en/"):]
    return value


def transform(obj, translations, root_path=""):
    """Erzeugt die DE-Struktur aus der EN-Struktur + Übersetzungsmap."""
    if isinstance(obj, dict):
        new = {}
        for k, v in obj.items():
            if k in FORCE_KEEP_ROOT and isinstance(v, str):
                new[k] = v
                continue
            new[k] = transform(v, translations, k if root_path == "" else f"{root_path}.{k}")
        return new
    elif isinstance(obj, list):
        return [transform(v, translations, root_path) for v in obj]
    elif isinstance(obj, str):
        if obj.startswith("/en/"):
            return localize_href(obj)
        if is_keep(obj):
            return obj
        return translations.get(obj, obj)
    else:
        return obj


def build_translation_block(en_data):
    return {
        "sourceLocale": "en",
        "sourceContentId": en_data.get("slug", ""),
        "sourceRevision": en_data.get("updatedAt", ""),
        "translationStatus": "machine-draft",
        "translatedAt": "2026-08-04",
        "translator": "llm-automated",
        "translationRisk": "low",
    }


def cmd_extract(en_dir, manifest_path):
    files = sorted(f for f in os.listdir(en_dir) if f.endswith(".json"))
    manifest = {}
    for f in files:
        slug = f[:-5]
        en_path = os.path.join(en_dir, f)
        de_path = os.path.join(en_dir, "..", "de", "patches", f)
        if os.path.exists(de_path):
            print(f"SKIP (exists): {slug}")
            continue
        with open(en_path, encoding="utf-8") as fh:
            data = json.load(fh)
        strings = collect_translatable(data)
        # deduplizierte Liste
        seen = set()
        uniq = []
        for s in strings.values():
            if s not in seen:
                seen.add(s)
                uniq.append(s)
        manifest[slug] = uniq
        print(f"EXTRACT {slug}: {len(uniq)} strings")
    with open(manifest_path, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)
    print(f"Manifest -> {manifest_path}")


def cmd_apply(en_dir, de_dir, translations_dir):
    os.makedirs(de_dir, exist_ok=True)
    files = sorted(f for f in os.listdir(en_dir) if f.endswith(".json"))
    written = 0
    skipped = 0
    for f in files:
        slug = f[:-5]
        de_path = os.path.join(de_dir, f)
        if os.path.exists(de_path):
            print(f"SKIP (exists): {slug}")
            skipped += 1
            continue
        en_path = os.path.join(en_dir, f)
        with open(en_path, encoding="utf-8") as fh:
            en_data = json.load(fh)
        tpath = os.path.join(translations_dir, f"{slug}.json")
        if not os.path.exists(tpath):
            # No translation map yet -> skip (do not write an untranslated copy)
            print(f"SKIP (no map): {slug}")
            skipped += 1
            continue
        with open(tpath, encoding="utf-8") as fh:
            translations = json.load(fh)
        de_data = transform(en_data, translations)
        de_data["locale"] = "de"
        # translation-Block anhängen (alle übersetzten Felder bleiben; Struktur unverändert)
        de_data["translation"] = build_translation_block(en_data)
        # fehlende Übersetzungen melden
        missing = [s for s in collect_translatable(en_data).values() if s not in translations]
        if missing:
            print(f"WARN {slug}: {len(missing)} strings ohne Übersetzung (Original beibehalten)")
        with open(de_path, "w", encoding="utf-8") as fh:
            json.dump(de_data, fh, ensure_ascii=False, indent=2)
            fh.write("\n")
        written += 1
        print(f"WRITE {slug}")
    print(f"=== written={written} skipped={skipped} ===")


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "extract":
        cmd_extract(sys.argv[2], sys.argv[3])
    elif mode == "apply":
        cmd_apply(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        print("usage: de_patch.py extract <en_dir> <manifest> | apply <en_dir> <de_dir> <translations_dir>")
        sys.exit(1)
