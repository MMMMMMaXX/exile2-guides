# Seed and Keystone — Timeless Jewels (extra)

Deep-dive on the two-field system that drives every Timeless Jewel result (plan §15.6).

## The two fields

- Seed (the number): deterministically decides what the Notable passives in radius become. Heroic Tragedy 100-8000; Undying Hate 79-30977.
- Name (leader for Heroic Tragedy: Vorana / Medved / Olroth; faction for Undying Hate: Amanamu / Ulaman / Kurgal / Tecrod / Kulemak): decides what Keystone passives in radius become.

## How they combine

- A jewel's result is the cross product of (seed -> Notables) and (name -> Keystones).
- Divine Orb rerolls BOTH the seed and the name simultaneously; you cannot change one without the other.
- Socket choice is a third, independent axis: same seed + name in a different socket conquers a different node set.

## Verification workflow (must re-check all three)

1. Decide build need (Keystone conversion, Tribute scaling, or specific Notables).
2. Pick the target socket whose Very Large radius covers the nodes you want.
3. List nodes to keep / conquer.
4. Load the seed into Path of Building / client to preview Notables.
5. Verify the leader/faction name for the Keystone you want.
6. Re-verify seed + name + socket, then buy.

## Keystone examples (current 0.5.4)

- Heroic Tragedy: each leader converts one attribute's inherent bonus into a defensive scaling (Strength -> Energy Shield, Dexterity -> Armour, Intelligence -> Evasion, per leader).
- Undying Hate: faction name picks the Keystone (Sacrifice of Flesh/Sight/Mind/Blood/Loyalty). Tecrod's Sacrifice of Blood is the 0.4.0-changed one (1 Life/s per 16 Life in past 4s, 20% more Life Cost).

## Common mistake

- Buying "the same seed as a guide" without re-verifying in your own planner. Seeds are build- and socket-specific; never reuse blindly.
