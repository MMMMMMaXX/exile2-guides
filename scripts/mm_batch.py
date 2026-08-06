#!/usr/bin/env python3
"""Lote curto de tradução MyMemory (pt-BR) para strings ainda em inglês.
Processa as N strings (ainda não traduzidas) MAIS CURTAS, traduz e mescla em /tmp/tr_pt.json.
Pensado para ser chamado em lotes pequenos (evita processos longos sendo mortos).
Uso: python3 scripts/mm_batch.py <N>
"""
import json
import sys
import time
import urllib.parse
import urllib.request

API = "https://api.mymemory.translated.net/get?q={q}&langpair=en-US%7Cpt-BR"
DICT = "/tmp/tr_pt.json"


def translate(text, tries=2):
    for _ in range(tries):
        try:
            url = API.format(q=urllib.parse.quote(text))
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as r:
                data = json.loads(r.read().decode("utf-8"))
            if data.get("quotaFinished"):
                return None, True
            if data.get("responseStatus") != 200:
                return None, False
            return data["responseData"]["translatedText"], False
        except Exception:
            time.sleep(1)
    return None, False


def main():
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 60
    d = json.load(open(DICT, encoding="utf-8"))
    # strings ainda em inglês (valor == chave) e não vazias
    pending = [k for k, v in d.items() if v == k and k.strip()]
    # mais curtas primeiro
    pending.sort(key=len)
    batch = pending[:n]
    done = 0
    quota = False
    for en in batch:
        if quota:
            break
        pt, q = translate(en)
        if q:
            quota = True
            print("QUOTA atingida apos", done, flush=True)
            break
        if pt is not None:
            d[en] = pt
            done += 1
        time.sleep(0.12)
    json.dump(d, open(DICT, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    remaining = sum(1 for v in d.values() if v == v and v == _same_key(d, v))
    # conta quantas ainda estão em inglês (valor==chave)
    en_count = sum(1 for k, v in d.items() if v == k)
    print(f"lote traduzido={done} total_ainda_en={en_count}", flush=True)


def _same_key(d, v):
    return v


if __name__ == "__main__":
    main()
