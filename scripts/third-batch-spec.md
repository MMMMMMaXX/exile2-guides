<!-- 文件职责：约束第三批 Patch 文章生成时的双语结构、发布状态与内容质量。 -->

# Third-Batch Patch Authoring Spec (working file for content generation)

You are authoring Patch article JSON for the site `poe2.stratlore.com` (a Path of Exile 2 guides site). Follow this spec EXACTLY. You may read `lib/patches/schema.ts` and `lib/content/section-schema.ts` for reference, but the rules below are authoritative.

## Deliverables

For each assigned article, create TWO files:

- `content/en/patches/<slug>.json`
- `content/zh-cn/patches/<slug>.json`
  (en and zh-cn are full translations of each other — do NOT copy English into the Chinese file; write proper Chinese.)

## Top-level template (copy, then fill per article)

```json
{
  "id": "<slug>",
  "slug": "<slug>",
  "locale": "en",
  "type": "patch",
  "status": "published",
  "featured": false,
  "title": "...",
  "shortTitle": "...",
  "summary": "...",
  "description": "...",
  "patchCategory": "major-updates",
  "patchVersion": "0.2.0",
  "patch": "0.2.0",
  "league": "Dawn of the Hunt",
  "patchStatus": "legacy",
  "verificationStatus": "pending-pc",
  "author": "StratLore Editorial",
  "reviewer": "StratLore Editorial",
  "createdAt": "2026-08-02",
  "publishedAt": "2026-08-02",
  "updatedAt": "2026-08-02",
  "lastVerifiedAt": "2026-08-02",
  "heroImage": "<assigned>",
  "cardImage": "<same as heroImage>",
  "imageAlt": "<assigned alt>",
  "tags": ["..."],
  "historicalStatus": "historical",
  "currentBaseline": "0.5.4e",
  "currentApplicability": [],
  "supersededByPatchIds": [],
  "returningPlayerPriority": "high",
  "sections": [],
  "relatedBuildIds": [],
  "relatedBossIds": [],
  "relatedItemIds": [],
  "relatedGuideIds": [],
  "relatedSkillIds": [],
  "sources": [],
  "seo": { "title": "...", "description": "...", "noindex": false }
}
```

## Section objects

Every section MUST include: `id` (unique lowercase-hyphen within article, e.g. `"overview"`), `order` (unique positive integer, start at 1), `title` (non-empty), `toc` (boolean — `true` for major TOC sections, `false` for the `video` section), `visible`: true, plus `type` and the type-specific fields below.

Allowed `type` values and their EXTRA required fields:

- `overview` / `important-changes` / `build-impact` / `re-verification` / `follow-up`: `{ "paragraphs": ["..."], "bullets": ["..."] }`
- `verification-steps` / `checklist`: `{ "steps": [ { "label": "...", "body": ["..."] } ] }`
- `faq`: `{ "items": [ { "question": "...", "answer": ["..."] } ] }`
- `video`: `{ "entries": [ { "label": "...", "url": "https://www.youtube.com/watch?v=XXXX", "takeaway": "...", "creator": "Official Path of Exile 2", "timestamps": [ { "label": "...", "time": "MM:SS" } ] } ] }`
- `changelog`: `{ "entries": [ { "date": "2026-08-02", "changes": ["..."] } ] }`
- `sources`: `{ "categories": [ { "label": "...", "description": "...", "url": "https://..." } ], "verificationChecklist": { "status": "pending-pc", "method": "official", "verifiedClientVersion": "0.5.4" } }`
- `patch-family-timeline`: `{ "versions": [ { "code": "0.2.0", "date": "2025-04-04", "kind": "Content Update", "summary": "...", "tags": [] } ] }`
- `impact-dashboard`: `{ "cards": [ { "area": "...", "verdict": "...", "detail": "..." } ] }`
- `change-explorer`: `{ "changes": [ { "category": "new"|"buff"|"nerf"|"fix"|"qol"|"technical"|"balance"|"atlas"|"boss"|"item", "title": "...", "detail": "...", "scope": "Official 0.2.0 notes" } ] }`
- `before-after`: `{ "oldLabel": "...", "oldText": "...", "newLabel": "...", "newText": "..." }`
- `boss-impact`: `{ "bosses": [ { "name": "...", "detail": "...", "action": "..." } ] }`
- `item-impact`: `{ "items": [ { "kind": "...", "title": "...", "detail": "...", "tags": [] } ] }`
- `affected-content`: `{ "rows": [ { "name": "...", "type": "boss"|"build"|"item"|"skill"|"guide"|"patch"|"other", "trigger": "...", "action": "...", "status": "ready"|"reviewing"|"queued" } ] }`
- `community-evidence`: `{ "reports": [ { "source": "...", "context": "...", "quote": "...", "analysis": "..." } ] }`
- `technical-environment`: `{ "environments": [ { "key": "steam-vulkan"|"steam-dx12"|"standalone"|"console", "note": "..." } ] }`
- `known-issues`: `{ "issues": [ { "text": "...", "status": "open"|"tracking"|"fixed" } ] }`
- `patch-followup`: `{ "children": [ { "code": "...", "relation": "..." } ] }`
- `historical-context`: `{ "era": "...", "baselineNote": "...", "paragraphs": ["..."], "bullets": ["..."] }`
- `current-applicability`: `{ "rows": [ { "topic": "...", "status": "still-current"|"changed-later"|"removed"|"unknown", "currentSummary": "...", "supersededBy": "...", "affectedContent": "..." } ] }`
- `then-vs-now`: `{ "rows": [ { "aspect": "...", "thenText": "...", "nowText": "..." } ] }`
- `superseded-changes`: `{ "items": [ { "change": "...", "byPatch": "...", "replacement": "..." } ] }`
- `returning-player-checklist`: `{ "items": [ { "priority": "high"|"medium"|"low", "label": "...", "detail": "..." } ] }`
- `legacy-content-audit`: `{ "rows": [ { "contentId": "...", "kind": "...", "issue": "...", "action": "...", "status": "ready"|"reviewing"|"queued" } ] }`
- `version-dependency-map`: `{ "nodes": [ { "version": "...", "dependsOn": "...", "introduces": "...", "breaks": "..." } ] }`
- `system-origin`: `{ "introducedIn": "...", "sourceId": "...", "paragraphs": ["..."], "bullets": ["..."] }`
- `migration-guide`: `{ "steps": [ { "from": "...", "to": "...", "note": "..." } ] }`
- `data-table`: `{ "caption": "...", "columns": [ { "key": "c1", "label": "..." } ], "rows": [ { "c1": "...", "c2": "..." } ] }` (columns keys must match row keys)

## CRITICAL constraints

1. **Natural, rich, detailed prose.** Each narrative section should have 2–4 substantial paragraphs (3–6 sentences each) OR a solid table. Do NOT use hyphen-joined slug text (e.g. `huntress-was-added-in-0-2-0`). Use normal sentences with spaces and punctuation. This is the #1 quality requirement — thin/AI-flavored content is explicitly rejected.
2. **Real facts from official PoE2 patch notes.** Key facts you can rely on: 0.2.0 "Dawn of the Hunt" introduced the Huntress class; Huntress Ascendancies Amazon & Ritualist; Warrior→Smith of Kitava; Mercenary→Tactician; Witch→Lich; 25+ new skills (incl. Spear skills); 100+ Supports; Spears & Bucklers item classes; 100+ Uniques; 8 Endgame Maps; 12 Rogue Exiles; Azmerian Wisps; 15 Socketable items; Twilight Reliquary Key. 0.2.0f added Ascendancy Respec, Atlas Bookmarks, Charm/Rune drop changes. 0.2.0 launch week hotfixes: non-Unique campaign monster life reduced in some level bands; Rogue Exile life further reduced; Tempest Bell combo requirement 10→4; Explosive/Voltaic Grenade cooldowns lowered; Twister multi-projectile bug fixed. 0.2.1 added 22 Endgame Runes, 7 Talismans, 15 Soul Cores; Mythic Unique drop increase; Unique drop no longer considers Item Class (Rings/Amulets more common); high-tier areas reduce Common Unique share; Party Unique bonus reduced; Console Item Filter support. 0.1.1 added 4 Tower Maps (Alpine Ridge, Bluff, Mesa, Sinking Spire), Lost Towers rework, Arbiter of Ash attempts 1→up to 6 (fewer at higher difficulty), Map Checkpoints, Citadel proximity/visibility, Overseer's Precursor Tablet, Map Boss ~every 4 maps; 0.1.1c extended respawn to Xesht/Olroth/King, `/ResetAtlas`, Minimap icons. For anything you cannot verify, write "unknown" / "待核实" rather than inventing numbers.
3. **Real official source URLs** (valid `https://` URLs): 0.2.0 `https://www.pathofexile.com/forum/view-thread/3740562`; 0.2.0 launch hotfixes `https://www.pathofexile.com/forum/view-thread/3741050`; 0.2.0f `https://www.pathofexile.com/forum/view-thread/3762865`; 0.2.0h `https://www.pathofexile.com/forum/view-thread/3781189`; 0.2.1 `https://www.pathofexile.com/forum/view-thread/3787044`; 0.2.1 hotfix1 `https://www.pathofexile.com/forum/view-thread/3787155`; 0.2.1 hotfix2 `https://www.pathofexile.com/forum/view-thread/3788896`; 0.1.1 `https://www.pathofexile.com/forum/view-thread/3695606`; 0.1.1c `https://www.pathofexile.com/forum/view-thread/3717308`; EA index `https://www.pathofexile.com/forum/view-forum/2222`. Put ≥2 in the top-level `sources` array AND a `sources` section.
4. **Video:** use a YouTube `watch?v=` URL; include 3–6 `timestamps` with `MM:SS` labels (this is the required key-node module). The on-page player supports `watch?v=` URLs.
5. **The `sources` SECTION must appear EXACTLY ONCE** per article. Never render sources anywhere else (this avoids the duplicate-sources-module defect).
6. **Forbidden strings:** never write `版本复核中`, `TODO`, `REPLACE_WITH`, `example.invalid`, `draft`, `草稿`, or lorem/placeholder text.
7. `cardImage` must equal `heroImage`. `imageAlt` is required (provided per article). `seo.noindex` must be `false`.
8. `related*Ids` arrays: ONLY use IDs from the safe list below. Do NOT invent IDs.
9. Status `published` is required and is already satisfied by the template; keep it.

## Safe related* IDs (published in BOTH en and zh-cn — use only these)

- bosses: arbiter-of-ash, arbiter-of-divinity, atziri-red-queen, blackjaw-the-remnant, count-geonor, doryani-royal-thaumaturge, jamanra-the-abomination, king-in-the-mists-pinnacle, kosis-the-revelation, mektul-the-forgemaster, olroth-origin-of-the-fall, omniphobia-fear-manifest, trialmaster, vessel-of-kulemak, xesht-we-that-are-one, zarokh-the-temporal
- builds: bear-shaman-druid, cold-caster-chronomancer, corrupting-wings-gemling-legionnaire, ed-contagion-lich, explosive-witchhunter, fire-bear-smith-of-kitava, gas-grenade-pathfinder, glacial-lance-ritualist, ice-shot-deadeye, lightning-spear-amazon, plant-oracle-druid, shield-wall-titan, sniper-minion-infernalist, spark-coc-comet-stormweaver, twister-spirit-walker, whirling-assault-martial-artist
- guides: ascendancy-points-trials-guide, campaign-checklist-permanent-rewards, campaign-early-maps-gearing-crafting, early-atlas-progression-waystone-sustain, expedition-atlas-first-points, how-to-fix-low-damage, how-to-stop-getting-one-shot, liquid-verisium-safety-checklist, orb-of-sacrifice-currencies, skill-granting-unique-scaling, trade-site-currency-exchange-guide, weapon-set-passive-points-explained
- items: architects-orb, artificers-orb, catalysts, charms, essences, jewellers-orbs, liquid-emotions, liquid-verisium, omens, orb-of-sacrifice, runes-and-soul-cores, tablets, the-masters-reach, uncut-gems, vaal-orb, waystones
- skills: cast-on-elemental-ailment, chain-support, contagion, dark-effigy, essence-drain, explosive-grenade, freezing-mark, frost-darts, herald-of-ice, ice-shot, lightning-arrow, snipe, tempest-bell, twister, walking-calamity, whirling-assault

## Validation (MANDATORY — run before finishing)

```
npx tsx scripts/validate-single.mts content/en/patches/<slug>.json
npx tsx scripts/validate-single.mts content/zh-cn/patches/<slug>.json
```

Both must print `OK  <slug>  sections=N sources=M`. Fix every reported issue by reading the schema files. Do not finish until both pass.

## When done

Reply with: the two file paths, the two `OK` lines, and a one-sentence note on any fact you marked `unknown`/`待核实`.
