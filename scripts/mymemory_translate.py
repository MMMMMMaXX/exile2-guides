#!/usr/bin/env python3
"""Fallback-Übersetzer via MyMemory (nur falls quoten/erreichbar). Schreibt nach
mm_out_dir. Robust gegen Resets (Retry). Quota-aware Stop.
"""
import glob
import json
import os
import sys
import time
import urllib.parse
import urllib.request

API = "https://api.mymemory.translated.net/get?q={q}&langpair=en-US%7Cde-DE"


def translate(text, tries=5):
    for attempt in range(tries):
        try:
            url = API.format(q=urllib.parse.quote(text))
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=25) as r:
                data = json.loads(r.read().decode("utf-8"))
            if data.get("quotaFinished"):
                raise RuntimeError("QUOTA_FINISHED")
            if data.get("responseStatus") != 200:
                raise RuntimeError(f"status {data.get('responseStatus')}")
            return data["responseData"]["translatedText"]
        except RuntimeError as e:
            if "QUOTA_FINISHED" in str(e):
                raise
            time.sleep(3)
    return None


def main(batches_dir, mm_out_dir):
    os.makedirs(mm_out_dir, exist_ok=True)
    files = sorted(glob.glob(os.path.join(batches_dir, "batch_*.json")))
    total = 0
    for bf in files:
        batch = json.load(open(bf, encoding="utf-8"))
        for slug, strings in batch.items():
            out = {}
            for s in strings:
                if s in out:
                    continue
                t = translate(s)
                if t is None:
                    out[s] = s
                else:
                    out[s] = t
                total += 1
                time.sleep(2.0)
            json.dump(out, open(os.path.join(mm_out_dir, f"{slug}.json"), "w"),
                      ensure_ascii=False, indent=2)
            print(f"MM {slug}: {len(out)}")
            sys.stdout.flush()
    print(f"=== MyMemory done, {total} strings ===")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
