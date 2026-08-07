# Megalomaniac — Item Family and Variants

## Family: Unique Diamond Jewels (Notable Allocators)

Megalomaniac is a Diamond-base Unique whose defining trait is **allocating random Notable Passive Skills**. It shares the Diamond base and the "Limited to 1 / Corrupted on drop" pattern with The Adorned and Against the Darkness, but solves a different problem.

| Jewel                | Base             | Role              | Allocates?                            |
| -------------------- | ---------------- | ----------------- | ------------------------------------- |
| Megalomaniac         | Diamond          | Notable allocator | 2–3 random Notables                   |
| The Adorned          | Diamond          | Amplifier         | No (amplifies corrupted magic jewels) |
| Against the Darkness | Diamond          | Conditional mods  | No                                    |
| From Nothing         | (cluster/unique) | Start-notable     | Specialized                           |

## Variants

There is **one item variant** in 0.5.4 — no alternate-art or region-specific version documented. The only meaningful variation is the **set of Notables allocated** (random per drop) and the **count** (2 vs 3) determined by the implicit roll.

## Corrupted on Drop

Megalomaniac is always corrupted when it drops:

- Its allocated Notables are fixed at drop.
- Cannot be rerolled with Divine / Vaal / Architect's Orb.
- Cannot be cleansed.

## Not Cluster Jewel

Despite "allocating Notables," Megalomaniac is a standard small jewel, **not** a cluster jewel (PoE2 has no cluster jewels yet). It grants Notables directly as an implicit effect.

## Sources

- `poe2db-megalomaniac` — item line and implicit.
- `poe2wiki-megalomaniac` — family context and corrupted-on-drop.
- `from-nothing` (internal) — comparison notable-allocator unique.
