# Megalomaniac — Passive Tree Interactions

## How Allocation Reaches the Tree

Megalomaniac is socketed into any **Jewel Socket** on the passive tree. Its implicit immediately **allocates 2–3 random Notable Passive Skills** — these Notables are granted as if you had specced them, without spending passive points and **without requiring you to path to them**.

Key differences from normal Notables:

- The granted Notables are **free** (no point cost).
- They are granted **regardless of your pathing** — you do not need to connect to them.
- They are **random** per jewel; you cannot choose which ones.

## What Gets Allocated

| Condition | Allocated? |
|---|---|
| Any Notable in the game pool | Yes (random selection) |
| Keystones | No (Keystones are not Notables) |
| Normal/Minor passives | No (only Notables) |
| Ascendancy notables | No (only passive-tree Notables) |

## Interaction Notes

- The allocated Notables stack with your manually specced nodes.
- Because they are free, Megalomaniac effectively "saves" the passive points those Notables would cost (often 1–3 points each → up to ~9 points for a 3-Notable roll). See `valuation.md` and `notable-index.csv`.
- It does **not** amplify other jewels (that is The Adorned's job) and does **not** add jewel-socket passives.
- If a granted Notable conflicts with one you already specced, you simply own it (no double-counting issue; owning it twice is redundant but not harmful).

## Socket Independence

Unlike The Adorned, Megalomaniac's value does **not** depend on neighboring sockets or radius coverage. Any single jewel socket works. Radius is irrelevant to its effect.

## Sources

- `poe2db-megalomaniac` — implicit wording.
- `poe2wiki-megalomaniac` — allocation behavior.
- `timesaver-megalomaniac` — practical tree-value discussion.
