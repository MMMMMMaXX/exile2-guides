#!/usr/bin/env python3
"""Print a chunk of the sorted unique-string list for translation.
Usage: python3 scripts/ru_chunk.py <index> <size>
Prints the raw JSON array of English strings (one chunk) to stdout.
"""
import json, sys
all_s = json.load(open("/tmp/ru_strings.json", encoding="utf-8"))
idx = int(sys.argv[1])
size = int(sys.argv[2]) if len(sys.argv) > 2 else 400
chunk = all_s[idx*size:(idx+1)*size]
print(f"# CHUNK {idx} size={len(chunk)} range={idx*size}-{(idx+1)*size}")
print(json.dumps(chunk, ensure_ascii=False))
