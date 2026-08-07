# Publish Gate Report

- **status**: `published` (no `draft` field present; schema is strict).
- **noindex**: `false`.
- **sources section**: exactly ONE `sources` section (order 17) with `verificationChecklist.status = pending-pc`.
- **top-level sources array**: 4 real entries (official + 3 community), all URLs from WebSearch, none invented.
- **banned words**: none found (`draft`, `草稿`, `TODO`, `placeholder`, `TBD`, `pending verification`, `under review`, `待审核`, etc. all absent).
- **bilingual**: EN prose in EN file; ZH file fully Simplified Chinese. `id`/`slug`/`order`/`type`/`tags`/URLs identical across both.
- **imageAlt**: present and localized (EN + ZH per brief).
- **related\*Ids**: all five arrays empty `[]`.
- **JSON validity**: both files pass `JSON.parse`.
- **files written**: EN + ZH pair complete; 18 sections each.

Recommendation: passes the publish gate as defined in SPEC §5/§6.
