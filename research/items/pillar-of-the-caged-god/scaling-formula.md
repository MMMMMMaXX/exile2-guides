# Scaling Formula — Pillar of the Caged God

> VERIFIED against PoE2Wiki / exileindex / poe2dictionary (all three agree). Current as of Path of Exile 2 Early Access 0.5.x.

## The three attribute-scaling modifiers (current, post-0.2.0)

Pillar of the Caged God is a unique **Long Quarterstaff**. Its value is three separate per-10-attribute modifiers, one per core attribute:

| Attribute | Modifier | Scope |
|-----------|----------|-------|
| Strength  | `10% increased Weapon Damage per 10 Strength` | Weapon hits only |
| Dexterity | `1% increased Attack Speed per 10 Dexterity` | Attacks |
| Intelligence | `1% increased Area of Effect for Attacks per 10 Intelligence` | Attacks |

```
Stacks(attr) = floor(attr / 10)
Increased Weapon Damage = Stacks(Strength)   x 10%
Increased Attack Speed  = Stacks(Dexterity)  x 1%
Increased AoE (Attacks) = Stacks(Intelligence) x 1%
```

`floor()` means only complete blocks of 10 count; 9 spare attribute points below a threshold add nothing.

### Important scope notes (web-verified)
- "Weapon Damage" refers to damage with **hits using your weapon**. It does **not** apply to unarmed attacks (including Concoctions) or attacks from totems that use their own weapons (e.g. Shockwave Totem).
- Attack Speed and Area of Effect mods are attack-scoped, not spell-scoped.
- There is **NO** requirement-conversion modifier. The staff only requires Level 4 and 9 Dexterity; it does NOT convert Strength/Intelligence/attribute requirements to Dexterity.

## Worked numeric examples (equal Str / Dex / Int)

| Attributes (Str/Dex/Int) | Increased Weapon Damage | Increased Attack Speed | Increased AoE (Attacks) |
|--------------------------|-------------------------|------------------------|-------------------------|
| 100 / 100 / 100 | +100% | +10% | +10% |
| 300 / 300 / 300 | +300% | +30% | +30% |
| 500 / 500 / 500 | +500% | +50% | +50% |
| 800 / 800 / 800 | +800% | +80% | +80% |
| 1000 / 1000 / 1000 | +1000% | +100% | +100% |

At these breakpoints the three percentages are independent: a character with 800 Str / 200 Dex / 100 Int gets +800% Weapon Damage, +20% Attack Speed, +10% AoE — they do not have to be equal.

## Implicit
- `16% increased Melee Strike Range with this weapon` — fixed, not a per-attribute mod, unchanged across patches.

## Legacy vs current gap
- Pre-0.2.0: `10% increased Weapon Damage per 5 Strength` (double), `2% increased Attack Speed per 10 Dexterity`, `2% increased Area of Effect per 10 Intelligence`.
- 0.2.0 (Dawn of the Hunt) halved the per-attribute rates and **auto-applied** the change to existing items. A Divine Orb only affects rolled value ranges — none of these per-attribute mods are rolled ranges, so a Divine Orb changes nothing about them. There is no tradeable legacy version with the old stronger scaling.

## Breakpoint discipline
- Aim each stacked attribute at round 10s (e.g. 300, 400, 500) so each point crosses into the next stack.
- The staff gives no Accuracy, Life/ES, resistances or resource — the build must supply those separately.
