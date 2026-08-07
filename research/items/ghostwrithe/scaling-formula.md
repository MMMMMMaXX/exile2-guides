# Scaling Formula — Ghostwrithe

## The conversion

Modifier 1 ("100% of Maximum Life is from Energy Shield") relocates the life pool into Energy Shield.

```
Maximum Energy Shield = (Maximum Energy Shield from all other sources) + (Maximum Life from all sources)
Maximum Life          = 0
```

This is NOT a percentage damage reduction. It is a pool merge.

## Worked numeric example (used in the article)

| Before Ghostwrithe    | Value                  |
| --------------------- | ---------------------- |
| Maximum Life          | 2500                   |
| Maximum Energy Shield | 3000                   |
| **After Ghostwrithe** |                        |
| Maximum Energy Shield | 2500 + 3000 = **5500** |
| Maximum Life          | **0**                  |

## Modifier 2 — hit routing

`(20-30)% of Hit Damage is taken from Energy Shield before Life`.

- In normal PoE2 a hit depletes ES first, overflow to life.
- This modifier forces an extra 20-30% of each hit onto ES before life.
- Largely redundant once life = 0 from Modifier 1; relevant only if any residual life exists.

## Modifier 3 — sustain lockout

`Cannot Leech or Regenerate Life, and Cannot gain Life from Flasks`.

- Life flask recovery: 0 (no life pool).
- Life leech: 0 returned.
- Life regeneration: ticks on an empty bar.
- Replacement sustain must come from ES: recharge rate, ES leech, ES regen, ES-on-hit, ES-on-block.

## Sustain rebuild checklist

1. Stack `Energy Shield Recharge Rate`.
2. Reduce `Energy Shield start-of-recharge delay`.
3. Add an ES leech source (e.g., Ghostshroud, ES-leech support).
4. Layer ES-on-block / ES-on-hit where available.
