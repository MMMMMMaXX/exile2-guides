#!/usr/bin/env python3
"""Step 2: costura dicionário final e substitui §TRn§ nos arquivos pt-br.

1) Carrega /tmp/tr_pt.json (MyMemory, com fallback en).
2) Sobrepõe chunks traduzidos manualmente (chunk_NN_pt.json) para maior qualidade.
3) Para cada content/pt-br/items/<slug>.json: substitui §TR<idx>§ usando
   (slug,idx)->en (do jsonl) e en->pt (dicionário). Fallback en se faltar.
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PT_DIR = os.path.join(ROOT, "content", "pt-br", "items")
JSONL = "/tmp/tr_items_ptbr.jsonl"
MM_DICT = "/tmp/tr_pt.json"

TOKEN_RE = re.compile(r"\u00a7TR(\d+)\u00a7")
MANUAL_CHUNKS = ["00", "01", "02"]  # traduzidos manualmente (qualidade superior)
LLM_DIR = "/tmp"  # arquivos /tmp/llm_tr_<NN>.json traduzidos pelo LLM


def _list_llm_files():
    import glob
    return sorted(glob.glob(os.path.join(LLM_DIR, "llm_tr_*.json")))


def build_dict():
    d = json.load(open(MM_DICT, encoding="utf-8"))
    for c in MANUAL_CHUNKS:
        en_path = f"/tmp/chunks/chunk_{c}.json"
        pt_path = f"/tmp/chunks/chunk_{c}_pt.json"
        if not (os.path.exists(en_path) and os.path.exists(pt_path)):
            continue
        en = json.load(open(en_path, encoding="utf-8"))
        pt = json.load(open(pt_path, encoding="utf-8"))
        for e, p in zip(en, pt):
            d[e] = p
    # overlay LLM translations (qualidade superior ao fallback en/MyMemory)
    for lp in _list_llm_files():
        d2 = json.load(open(lp, encoding="utf-8"))
        for e, p in d2.items():
            if p and p != e:
                d[e] = p
    return d


def load_jsonl_map():
    m = {}
    with open(JSONL, encoding="utf-8") as f:
        for line in f:
            r = json.loads(line)
            m[(r["slug"], r["idx"])] = r["en"]
    return m


def subst(obj, slug, mp, d):
    if isinstance(obj, dict):
        return {k: subst(v, slug, mp, d) for k, v in obj.items()}
    if isinstance(obj, list):
        return [subst(x, slug, mp, d) for x in obj]
    if isinstance(obj, str):
        def repl(mo):
            idx = int(mo.group(1))
            en = mp.get((slug, idx))
            if en is None:
                return mo.group(0)
            return d.get(en, en)
        return TOKEN_RE.sub(repl, obj)
    return obj


def main():
    d = build_dict()
    mp = load_jsonl_map()
    files = sorted(x for x in os.listdir(PT_DIR) if x.endswith(".json"))
    total_missing = 0
    for fname in files:
        slug = fname[:-5]
        path = os.path.join(PT_DIR, fname)
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        new = subst(data, slug, mp, d)
        blob = json.dumps(new, ensure_ascii=False)
        missing = len(TOKEN_RE.findall(blob))
        total_missing += missing
        with open(path, "w", encoding="utf-8") as f:
            json.dump(new, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"{fname}: missing_tokens={missing}")
    print("TOTAL missing tokens:", total_missing)
    print("dict size:", len(d))


if __name__ == "__main__":
    main()
