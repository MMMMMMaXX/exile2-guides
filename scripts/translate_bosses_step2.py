#!/usr/bin/env python3
"""Step 2: 将俄文翻译回灌到占位符 ru 文件。

读取：
- /tmp/tr_strings.jsonl  (slug, idx, en)
- /tmp/tr_ru.json         ({en: ru} 唯一英文 -> 俄文)
遍历 content/ru/bosses/*.json，把 §TR<idx>§ 替换为对应俄文。
未找到翻译的占位符保留原样并计数（不应有剩余）。
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RU_DIR = os.path.join(ROOT, "content", "ru", "bosses")
MAP = "/tmp/tr_strings.jsonl"
RU_DICT = "/tmp/tr_ru.json"

TOKEN_RE = re.compile(r"§TR(\d+)§")


def load_map():
    # (slug, idx) -> en
    m = {}
    with open(MAP, encoding="utf-8") as f:
        for line in f:
            r = json.loads(line)
            m[(r["slug"], r["idx"])] = r["en"]
    return m


def main():
    with open(RU_DICT, encoding="utf-8") as f:
        ru = json.load(f)
    mp = load_map()
    total_missing = 0
    files = sorted(x for x in os.listdir(RU_DIR) if x.endswith(".json"))
    for fname in files:
        slug = fname[:-5]
        path = os.path.join(RU_DIR, fname)
        with open(path, encoding="utf-8") as f:
            data = json.load(f)

        def subst(obj):
            if isinstance(obj, dict):
                return {k: subst(v) for k, v in obj.items()}
            if isinstance(obj, list):
                return [subst(x) for x in obj]
            if isinstance(obj, str):
                def repl(mo):
                    idx = int(mo.group(1))
                    en = mp.get((slug, idx))
                    if en is None:
                        return mo.group(0)
                    r = ru.get(en)
                    if not r:
                        return mo.group(0)
                    return r
                return TOKEN_RE.sub(repl, obj)
            return obj

        new_data = subst(data)
        # 统计剩余占位符
        blob = json.dumps(new_data, ensure_ascii=False)
        missing = len(TOKEN_RE.findall(blob))
        total_missing += missing
        with open(path, "w", encoding="utf-8") as f:
            json.dump(new_data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"{fname}: missing={missing}")
    print(f"TOTAL missing placeholders: {total_missing}")


if __name__ == "__main__":
    main()
