# Publish Gate Report — critical-hit-chance-damage-bonus-transition

| Check | Result |
|-------|--------|
| status = "published" | OK |
| featured = false | OK |
| guideCategory = "mechanics" | OK |
| verificationStatus = "pending-pc" | OK (no "automated-verified" used) |
| seo.noindex = false | OK |
| Unpublished marker field absent | OK (omitted) |
| No `unresolvedClaimCount` field | OK (omitted) |
| heroImage / cardImage = /images/skills/cast-on-critical-strike.webp | OK (.webp, not SVG) |
| imageAlt non-empty (EN vs ZH) | OK |
| dates all 2026-08-03 | OK |
| patch / league / patchStatus / verifiedClientVersion | OK (0.5.4 / Standard / current / 0.5.4) |
| author / reviewer | OK (Exile2 Guides Editorial Team / Max) |
| Required sections present: quick-answer, overview/data-table/diagnostic, video, faq (6), sources, changelog | OK (15 sections) |
| At least 2 data-tables | OK (attack-vs-spell, formula-variables, worked-examples = 3) |
| At least 2 worked examples | OK (2 rows) |
| Bilingual EN+ZH written | OK |
| No banned words | OK (scan clean) |
| Sources present (top-level + sources section) | OK (3 real URLs) |
| JSON parses | OK (validated via node) |

P0 avoidance confirmed:
- Uses "Critical Damage Bonus", not "Crit Multiplier".
- Distinguishes Flat vs Increased crit chance.
- Notes multi-hit/channel/DoT differ in crit checks.
- No universal "reach X% → switch to crit" conclusion.

Verdict: PASS — ready for orchestrator validation.
