#!/usr/bin/env python3
"""Zip an English chunk array and its Russian translation array (same order)
into the master dict /tmp/ru_dict.json.
Usage: python3 scripts/ru_zip.py <en_array_file> <ru_array_file>
"""
import json, os, sys

MASTER = "/tmp/ru_dict.json"
master = {}
if os.path.exists(MASTER):
    master = json.load(open(MASTER, encoding="utf-8"))

en = json.load(open(sys.argv[1], encoding="utf-8"))
ru = json.load(open(sys.argv[2], encoding="utf-8"))
assert len(en) == len(ru), f"length mismatch {len(en)} vs {len(ru)}"

added = 0
for e, r in zip(en, ru):
    if not e:
        continue
    if r and r.strip() and r != e:
        if e not in master or master[e] == e:
            master[e] = r
            added += 1
json.dump(master, open(MASTER, "w", encoding="utf-8"),
          ensure_ascii=False, indent=0)
print(f"added {added}; master size={len(master)}", flush=True)
