#!/usr/bin/env python3
"""Merge one or more translated chunk files (JSON objects {en: ru}) into the
master dict /tmp/ru_dict.json. Skips empty/identical values.
Usage: python3 scripts/ru_merge.py <chunk_file> [<chunk_file> ...]
"""
import json, os, sys

MASTER = "/tmp/ru_dict.json"
master = {}
if os.path.exists(MASTER):
    master = json.load(open(MASTER, encoding="utf-8"))

added = 0
for cf in sys.argv[1:]:
    part = json.load(open(cf, encoding="utf-8"))
    for en, ru in part.items():
        if not en:
            continue
        if ru and ru != en:
            if en not in master or master[en] == en:
                master[en] = ru
                added += 1
json.dump(master, open(MASTER, "w", encoding="utf-8"),
          ensure_ascii=False, indent=0)
print(f"merged {added} new entries; master size={len(master)}", flush=True)
