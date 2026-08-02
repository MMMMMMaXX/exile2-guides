# Scaling Formula — Kitoko's Current

Checked date: 2026-08-03
Verification status: pending-pc

This file documents how Kitoko's Current scales in practice. The glove's value comes from
two independent mechanics: (1) the speed penalty is a flat "reduced" multiplier, and
(2) the signature mod converts Lightning-hit damage into Electrocution buildup, which
then follows the global Electrocution threshold formula.

## 1. Speed penalty (local, "reduced")

The mod reads `(10-15)% reduced Attack and Cast Speed`. This is a **reduced** (additive
with other reduced/more? — no, "reduced" is additive with other "reduced" modifiers and
multiplies at the end) penalty applied to the wearer.

Representative rolls:

| Roll | Reduced Attack & Cast Speed |
|------|-----------------------------|
| Top roll (15%) | 15% slower |
| Mid roll (12%) | 12% slower |
| Low roll (10%) | 10% slower |

Offset logic (qualitative, pending-pc measured DPS):
- Attack-based lightning builds usually recover speed through a different gear slot or
  gem setup. The glove is not the only source of attack speed, so a 10-15% reduction is
  rarely the binding constraint.
- Cast-based builds run into the cast-speed penalty more directly; pair with increased
  cast speed on rings/amulet/support gems so the net delta stays positive or neutral.

## 2. Electrocution buildup contribution

Signature mod: **Lightning damage from Hits Contributes to Electrocution Buildup**.

Electrocution is an Elemental Ailment. Its buildup against a target is compared to that
target's Electrocution Threshold. Per GameRant/SSEGold sources, the threshold scales with
the enemy's maximum life:

```
Electrocution Threshold ≈ f(enemy maximum life)
```

The exact coefficient is not published in a single official formula line; the mechanic is
described as "scales with the target's maximum life," so tougher (higher-life) enemies need
more buildup to be Electrocuted. The glove's benefit is that Lightning damage that would
otherwise only deal damage now also pushes toward the Electrocution threshold.

Important rule confirmed by two community/explain sites:
- **Only Hits** contribute. Damage over Time (DoT) from the wearer does NOT feed the
  Electrocution buildup via this glove.
- Electrocution is a control effect (stun/CC), distinct from Shock, which increases damage
  the enemy takes.

## 3. Why "reduced" matters vs "less"

- "Reduced" speed is additive with other "reduced" modifiers before the final
  multiplication; it is generally easier to offset than "less", which is multiplicative.
- This is why the glove is considered a manageable tax rather than a hard DPS cut, and it
  is called out explicitly in the article's Speed Penalty table.

## Uncertain / flagged

- Exact Electrocution threshold coefficient (life multiplier) is not quoted with a precise
  number in the gathered sources. Marked pending-pc; article describes the relationship
  qualitatively and references the ailments guide.
- No measured DPS delta (e.g., "you lose X% sheet DPS but gain Y% uptime") is asserted;
  the article states the trade-off qualitatively and points to PoE2 trade for build-specific
  optimization.
