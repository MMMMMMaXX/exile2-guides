# Megalomaniac — Trade Filter Examples

Concrete, copy-pasteable filter descriptions for the current PoE2 trade site UI. Because the item drops **identified** (since 0.5.0), you can filter by the exact Notables allocated.

> Reminder (content-plan §13.5): do **not** hardcode a long-lived trade URL. Apply these filters live in the trade UI; stat indices change between leagues.

## Example 1 — Any 3-Notable Jewel

1. Category: Items → Jewels
2. Rarity: Unique
3. Base type: Diamond
4. Name contains: `Megalomaniac`
5. (Optional) Sort by price ascending.

You then eyeball listings: a 3-Notable roll shows three Notable lines in the item preview.

## Example 2 — Hunt for a Specific Notable

1. Same base filter as Example 1.
2. Add stat filter → search `Allocates Notable Passive Skill`.
3. In the dropdown, pick the target Notable (e.g. `Pure Might`).
4. Listings now show only Megalomaniacs that allocated that Notable.

## Example 3 — Two Target Notables (3-Notable combo)

1. Base filter as Example 1.
2. Add **two** `Allocates Notable Passive Skill` filters, each set to a different target (e.g. `Pure Might` + `Arcane Potency`).
3. This surfaces 3-Notable jewels containing both — the highest-value rolls.

## Example 4 — Budget 2-Notable Filler

1. Base filter as Example 1.
2. No Notable filter; sort by price ascending.
3. Pick the cheapest copy whose Notables are at least usable for your build.

## Pricing Note

High-value tiers from `notable-index.csv` (Pure Might/Dex/Int, capstones, Amplified) push price up sharply on 3-Notable rolls. Low-tier filler Notables keep price near baseline.

## Sources

- `timesaver-megalomaniac` — trade filter workflow.
- `reddit-megalomaniac` — community pricing discussion.
- `official-05-4` — identified-on-drop enabling this workflow.
