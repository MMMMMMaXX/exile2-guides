# The Adorned — Passive Tree Interactions

## How the Amplification Reaches the Tree

The Adorned is socketed into a **Jewel Socket** on the passive skill tree. From that socket, it radiates a **radius** (Small by default — see `radius-and-placement.md`). Every other Jewel Socket that falls inside that radius and contains a **Corrupted Magic Jewel** receives the amplification.

The mechanic wording is precise:

> increased Effect of **Jewel Socket Passive Skills** that are **Corrupted Magic Jewels**

"Jewel Socket Passive Skills" means the passive modifiers granted by the jewel itself (its implicit and explicit passive modifiers). The Adorned increases the *magnitude* of those granted passives — not the jewel's drop-only stats.

## What Gets Amplified

| Condition | Amplified? |
|---|---|
| Magic Jewel, corrupted, socketed in The Adorned's radius | Yes |
| Magic Jewel, **not** corrupted, in radius | No |
| Rare Jewel in radius | No |
| Unique Jewel in radius | No |
| Corrupted Magic Jewel **outside** the radius | No |
| Corrupted Magic Jewel inside radius but socket is itself The Adorned's socket | N/A (that socket holds The Adorned) |

## Interaction with Other Jewel Modifiers

- The amplification is a **multiplier on effect**, applied after the jewel's own magnitude. It stacks with the jewel's own rolled values but does not change which nodes the jewel grants.
- It does not interact with attribute requirements, keystones, or ascendancy nodes.
- It does not convert the magic jewel into a notable allocator (that is Megalomaniac's job).

## Keystone / Node Dependencies

The Adorned does not grant or alter keystones. The value of a given Corrupted Magic Jewel depends entirely on which passive modifiers that jewel grants; planning which jewels to socket is a build-level decision (see `build-usage.md`).

## Sinister Sockets

The Adorned itself is **not** an Expression/TVal/Simulacrum jewel and is not placed in a Sinister Socket. Sinister Sockets are unrelated to this amplification chain.

## Sources

- `poe2wiki-adorned` — radius behavior and eligible jewel types.
- `poe2db-adorned` — modifier wording.
- `timesaver-adorned` — practical tree placement guidance.
