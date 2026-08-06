#!/usr/bin/env python3
"""翻译批处理辅助：
用法:
  python3 scripts/tr_chunk.py extract START SIZE   -> 写 /tmp/chunk.json (en 数组), 并打印编号
  python3 scripts/tr_chunk.py merge                -> 读取 /tmp/chunk_ru.json (ru 数组, 顺序对应 chunk)
                                                      合并进 /tmp/tr_ru.json (en->ru)
"""
import json
import os
import sys

MAP = "/tmp/tr_strings.jsonl"
CHUNK = "/tmp/chunk.json"
CHUNK_RU = "/tmp/chunk_ru.json"
RU_DICT = "/tmp/tr_ru.json"


def unique_list():
    import collections
    c = collections.Counter()
    with open(MAP, encoding="utf-8") as f:
        for line in f:
            c[json.loads(line)["en"]] += 1
    return [s for s, _ in c.most_common()]


def extract(start, size):
    uniq = unique_list()
    chunk = uniq[start:start + size]
    with open(CHUNK, "w", encoding="utf-8") as f:
        json.dump(chunk, f, ensure_ascii=False)
    for i, s in enumerate(chunk):
        print(f"{start + i}\t{s}")


def merge():
    with open(CHUNK, encoding="utf-8") as f:
        chunk = json.load(f)
    with open(CHUNK_RU, encoding="utf-8") as f:
        ru = json.load(f)
    d = {}
    if os.path.exists(RU_DICT):
        with open(RU_DICT, encoding="utf-8") as f:
            d = json.load(f)
    if isinstance(ru, dict):
        # ru: {index: translation}; index is position within current chunk
        n = 0
        for i, en in enumerate(chunk):
            if str(i) in ru or i in ru:
                d[en] = ru[str(i)] if str(i) in ru else ru[i]
                n += 1
        print(f"merged {n}/{len(chunk)} entries by index; total dict size={len(d)}")
    else:
        # ru: ordered array (legacy)
        assert len(chunk) == len(ru), f"len mismatch {len(chunk)} vs {len(ru)}"
        for en, r in zip(chunk, ru):
            d[en] = r
        print(f"merged {len(chunk)} entries; total dict size={len(d)}")
    with open(RU_DICT, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "extract":
        extract(int(sys.argv[2]), int(sys.argv[3]))
    elif cmd == "merge":
        merge()
