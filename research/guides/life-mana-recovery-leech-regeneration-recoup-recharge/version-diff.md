# Version Diff — life-mana-recovery-leech-regeneration-recoup-recharge

## Legacy PoE1 info to AVOID
- Do NOT copy PoE1 leech (no per-hit damage cap; multiple instances could stack).
- Do NOT assume Recoup base duration of 4s — current PoE2 wiki/Mobalytics state 8s; some older community pages say 4s. Treated as client-version dependent.
- Do NOT describe charges auto-granting stats; out of scope here but noted for PoE2 correctness.

## 0.5 Leech rework (current baseline 0.5.4)
- Single Leech instance per resource (Life/Mana/ES); highest recovery-rate instance wins.
- Per-hit Leech damage cap: hits >40,000 total damage treated as 40,000 for Leech calc; values of each damage type scaled down evenly to the cap.
- Recharge-start passives reduced (Mystic Stance 30%→12%, Quick Response 20%→10%, small passives 15%→6%); ES recharge rate small nodes removed from tree.
- These are documented in the article's leech, recharge, and changelog sections. Patch string kept at baseline "0.5.4" per spec.
