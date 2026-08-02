# Automated Publication Report — Kitoko's Current

Generated: 2026-08-03
Pipeline: publish-first (no human approval, no draft)
Status: PUBLISHED (status=published, seo.noindex=false)
QA owner: Exile2 Guides Automated QA
Verification status: pending-pc

## Files produced

| File | Purpose | State |
|------|---------|-------|
| `content/en/items/kitokos-current.json` | EN published article | written |
| `content/zh-cn/items/kitokos-current.json` | ZH-CN published article | written |
| `research/items/kitokos-current/source-ledger.md` | 8 sources, mix compliance | written |
| `research/items/kitokos-current/claim-matrix.md` | 12 claims, two-source check | written |
| `research/items/kitokos-current/current-vs-legacy.md` | legacy/Divine note | written |
| `research/items/kitokos-current/scaling-formula.md` | speed + Electrocution math | written |
| `research/items/kitokos-current/build-usage.md` | usage patterns | written |
| `research/items/kitokos-current/alternatives.md` | alternative options | written |
| `research/items/kitokos-current/community-questions.md` | 6 FAQ entries | written |
| `research/items/kitokos-current/video-timestamps.md` | video index (pending-pc) | written |
| `research/items/kitokos-current/screenshot-shot-list.md` | capture spec | written |
| `research/items/kitokos-current/related-content-map.md` | link allowlist map | written |

## Quality checklist

- [x] Bilingual EN + ZH-CN, same id/slug, translated not romanized
- [x] status=published, seo.noindex=false
- [x] ≥2 data tables (Electrocution vs Shock; Speed Penalty 15/12/10)
- [x] ≥3 community questions (6)
- [x] dual sources: body `sources` section + top-level `sources` array
- [x] top-level sourceType ∈ {official, in-game, community, tool, other}
- [x] related-* IDs map to allowlisted published slugs
- [x] no forbidden words (TODO/TBD/draft/草稿/REPLACE_WITH_/example.invalid)
- [x] section order 10–180, ids unique

## Uncertain facts (kept in research, not asserted as hard numbers)

- Base ES range: PoE2Wiki 29-34 vs PoE2DB 28-33 (1-point diff, presented 29-34).
- Electrocution threshold coefficient not published precisely.
- Video timestamps are estimated (pending-pc).
- No fabricated price; "few Divine Orbs" is indicative only.

## Validation

- Command: `npm run validate:content 2>&1 | grep -iE "kitokos-current"`
- Result: see final status message after the run.
