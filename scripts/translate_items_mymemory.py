#!/usr/bin/env python3
"""Traduz o conjunto único de strings (pt-BR) via MyMemory (único MT alcançável).
Ordem: strings mais curtas primeiro, para maximizar a cobertura de strings distintas
dentro da cota de palavras diária. Fallback: mantém o inglês se a cota esgotar.
Gera /tmp/tr_pt.json = {en: pt_ou_en}.
"""
import json
import time
import urllib.parse
import urllib.request

API = "https://api.mymemory.translated.net/get?q={q}&langpair=en-US%7Cpt-BR"


def translate(text, tries=3):
    for _ in range(tries):
        try:
            url = API.format(q=urllib.parse.quote(text))
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=25) as r:
                data = json.loads(r.read().decode("utf-8"))
            if data.get("quotaFinished"):
                return None, True
            if data.get("responseStatus") != 200:
                return None, False
            return data["responseData"]["translatedText"], False
        except Exception:
            time.sleep(2)
    return None, False


def main():
    seen = []
    s = set()
    with open("/tmp/tr_items_ptbr.jsonl", encoding="utf-8") as f:
        for line in f:
            r = json.loads(line)
            if r["en"] not in s:
                s.add(r["en"])
                seen.append(r["en"])
    # Ordem: mais curtas primeiro (maximiza cobertura de strings distintas na cota)
    order = sorted(range(len(seen)), key=lambda i: len(seen[i]))

    out = {}
    translated = 0
    quota = False
    MAX_OK = 1600  # teto de segurança (cobrindo a cota diária)
    for i in order:
        en = seen[i]
        if en in out:
            continue
        if quota or translated >= MAX_OK:
            out[en] = en
            continue
        pt, q = translate(en)
        if q:
            quota = True
            out[en] = en
            print("QUOTA ESGOTADA apos", translated, "traducoes", flush=True)
            continue
        if pt is None:
            out[en] = en
        else:
            out[en] = pt
            translated += 1
        time.sleep(0.15)
    json.dump(out, open("/tmp/tr_pt.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=0)
    print(f"total unique={len(seen)} translated={translated} fallback_en={len(seen)-translated}")


if __name__ == "__main__":
    main()
