# Automated Publication Report — Pillar of the Caged God

## Status
- **Published**: YES (status = `published`)
- **noindex**: false
- **verificationStatus**: `pending-pc`
- **locale**: en + zh-cn (both created)
- **patch / league**: 0.5.4 / Early Access
- **dates**: createdAt, publishedAt, updatedAt, lastVerifiedAt = 2026-08-03
- **author / reviewer**: Exile2 Guides Editorial Team / Exile2 Guides Automated QA

## Files created
### Content (2, this item, both locales)
1. `content/en/items/pillar-of-the-caged-god.json`
2. `content/zh-cn/items/pillar-of-the-caged-god.json`

### Research (this item, 11)
1. `research/items/pillar-of-the-caged-god/source-ledger.md`
2. `research/items/pillar-of-the-caged-god/claim-matrix.md`
3. `research/items/pillar-of-the-caged-god/current-vs-legacy.md`
4. `research/items/pillar-of-the-caged-god/scaling-formula.md`
5. `research/items/pillar-of-the-caged-god/build-usage.md`
6. `research/items/pillar-of-the-caged-god/alternatives.md`
7. `research/items/pillar-of-the-caged-god/community-questions.md`
8. `research/items/pillar-of-the-caged-god/video-timestamps.md`
9. `research/items/pillar-of-the-caged-god/screenshot-shot-list.md`
10. `research/items/pillar-of-the-caged-god/related-content-map.md`
11. `research/items/pillar-of-the-caged-god/automated-publication-report.md`

## Gate checks (pre-publish)
- JSON.parse: PASS for both locale files.
- Forbidden strings (TODO / draft / 草稿 / 版本复核中 / example.invalid / Best in Slot / REPLACE_WITH / placeholder / 待补充): none found.
- seo.noindex = false; status = published in both files.
- Single Sources module in body (section order 170); top-level `sources` array also present (allowed by schema).
- seo schema check: `seo` contains only `{title, description, noindex}` (no `keywords` / `canonicalLocale` / `alternates`).

## Notes
- The published mods are the VERIFIED three-attribute scaling: `10% increased Weapon Damage per 10 Strength`, `1% increased Attack Speed per 10 Dexterity`, `1% increased Area of Effect for Attacks per 10 Intelligence`. There is NO requirement-conversion modifier and NO Dexterity-only "(16-22)% Attack Damage" modifier.
- Prior research batches contained incorrect mods (requirement-conversion + Dexterity-only damage). Those research files were corrected to the web-verified facts (poe2wiki / exileindex / poe2dictionary) before publication so regeneration stays accurate.
- Values remain `pending-pc` pending a live 0.5.x client capture.
