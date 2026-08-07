# Widowhail — Scaling Formula & Quiver Bonus Calculator

## Core formula

Scaled Quiver Bonus = Base Quiver Bonus × (1 + W / 100)

- W = Widowhail roll, one of {150, 200, 250}.
- Effective multipliers: 150% → ×2.5, 200% → ×3.0, 250% → ×3.5.
- The multiplier is applied to the quiver's numeric, global/scalable bonuses (implicit, explicit, corruption) — NOT to local quiver-item mods.
- Quiver bonuses are summed first, THEN multiplied. Example: +1 implicit arrow +1 explicit arrow = 2 base → 2 × 3.5 = 7 extra arrows at 250%.

## Worked example 1 — additional arrows

- Quiver: implicit "+1 to Projectile Count" + explicit "+1 to Projectile Count" = 2 base arrows.
- At 150%: 2 × 2.5 = 5 arrows. At 200%: 2 × 3.0 = 6. At 250%: 2 × 3.5 = 7.
- Confirms the documented wiki arrow example exactly.

## Worked example 2 — life

- Quiver: +40 to Maximum Life.
- At 150%: 40 × 2.5 = 100 Life. At 200%: 40 × 3.0 = 120. At 250%: 40 × 3.5 = 140.

## Worked example 3 — attack speed

- Quiver: +20% increased Attack Speed.
- At 150%: 20 × 2.5 = 50%. At 200%: 20 × 3.0 = 60%. At 250%: 20 × 3.5 = 70%.
- Note: this is +20% × multiplier, NOT +20% + 200%. The roll is the "increased" magnitude on the quiver's underlying bonus.

## Worked example 4 — flat added damage

- Quiver: +5 to 30 Cold to Attacks.
- At 150%: 12.5 to 75. At 200%: 15 to 90. At 250%: 17.5 to 105.

## What scales vs what does not

- Scales: global, implicit, explicit, corruption quiver bonuses — added damage (flat), increased % (attack speed, crit, damage), attributes, resistances, life, accuracy, projectile speed, pierce counts, additional-arrow mods.
- Does NOT scale: local mods that affect only the quiver item itself (e.g. local increased Evasion on the quiver), and granted skills (not numeric stat bonuses).

## Opportunity-cost comparison (Rare bow)

- A Rare bow brings its own flat physical damage, attack speed, crit and sockets regardless of quiver.
- Widowhail only pays off when the equipped quiver carries large scalable bonuses. Rule: Widowhail multiplies the quiver; it is only worth it once your quiver is already strong.
