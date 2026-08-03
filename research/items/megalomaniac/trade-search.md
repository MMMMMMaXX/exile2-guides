# Megalomaniac — Trade Search

## Modern Trade (identified drops)

Since 0.5.0 Megalomaniac drops **identified**, so you can filter trade listings by the exact Notables allocated. This is the recommended buying method.

## Trade Site Workflow (current UI)

1. Open the PoE2 trade site → **Items → Jewels**.
2. Filter base **Diamond**, rarity **Unique**, name **"Megalomaniac"**.
3. The jewel drops identified, so each listing shows its allocated Notables.
4. To find a specific Notable, add a stat filter:
   `Allocates Notable Passive Skill` and choose the Notable name from the dropdown.
5. Combine multiple Notable filters to hunt for a 3-Notable jewel containing two target Notables.
6. Sort by price; high-value Notables (see `notable-index.csv`) command premiums.

> Per content-plan §13.5: do **not** hardcode a long-lived trade URL. The trade UI and stat indices change between leagues — instruct readers to apply the stat filter live. See `trade-filter-examples.md` for concrete filter snippets.

## Pricing Signals

- 3-Notable jewels with one or more high-value Notables (per `notable-index.csv`) cost significantly more.
- 2-Notable or low-value Notable sets are cheap and often used as filler.
- Because rolls are random, "perfect" 3-Notable combos are rare and priced accordingly.

## Farming Alternative

Run **Simulacrum** and kill the Delirium bosses (Omniphobia, The Fear Manifest, Kosis). Drops are identified, so you immediately know what you got.

## Sources

- `timesaver-megalomaniac` — trade filter workflow.
- `gamerant-megalomaniac` — acquisition.
- `reddit-megalomaniac` — community pricing discussion.
