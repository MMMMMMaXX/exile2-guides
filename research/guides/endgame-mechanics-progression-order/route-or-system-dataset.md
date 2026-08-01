# Route / System Dataset — endgame-mechanics-progression-order

由指南正文 data-table section 真实派生（非虚构）。

## Readiness matrix

- mechanic: Breach | clear: High | single: Medium | survive: Medium | time: Medium | failCost: Free exit | output: Splinters, jewellery | end: Xesht
- mechanic: Ritual | clear: Medium | single: Medium | survive: Medium | time: Medium | failCost: Free exit | output: Tribute, Omens | end: King
- mechanic: Delirium | clear: Medium | single: High | survive: High | time: Medium | failCost: Material cost | output: Distilled, Simulacrum | end: Tangmazu
- mechanic: Abyss | clear: High | single: Medium | survive: Medium | time: Medium | failCost: Free exit | output: Jewels, Reach | end: Kulemak
- mechanic: Vaal Temple | clear: Medium | single: Medium | survive: Medium | time: Long | failCost: Long reset | output: Vaal currency | end: Atziri
- mechanic: Trial of Chaos | clear: Medium | single: High | survive: High | time: Medium | failCost: Material cost | output: Fates, relics | end: Trialmaster
- mechanic: Sekhemas | clear: Medium | single: High | survive: High | time: Medium | failCost: Material cost | output: Relics, points | end: Zarokh
- mechanic: Fortress | clear: Medium | single: Low | survive: Low | time: Short | failCost: Free exit | output: Atlas points | end: Points

## Atlas point tracker

- system: Fortress | from: Fortress completion | note: Backbone points
- system: Breach | from: Breachstone tiers, Hive, Stronghold | note: Scales with depth
- system: Ritual | from: Rite chain completion | note: After the King
- system: Delirium | from: Delirious Effect build | note: Drives Simulacrum
- system: Abyss | from: Depths, Unique boss | note: Speed-gated
- system: Vaal Temple | from: Temple route | note: Long build

## Entry cost and failure risk

- system: Breach | cost: None (map-driven) | risk: Low, free exit
- system: Ritual | cost: None (map-driven) | risk: Low, free exit
- system: Delirium | cost: Mirror in map | risk: Medium, material on Simulacrum
- system: Abyss | cost: None (map-driven) | risk: Low, free exit
- system: Vaal Temple | cost: Temple key | risk: High, long reset
- system: Trial of Chaos | cost: Ultimatum | risk: Medium, material
- system: Sekhemas | cost: Ultimatum | risk: Medium, material

## Reward goal selector

- goal: Atlas points fast | system: Fortress | note: Backbone, short
- goal: Jewels / jewellery | system: Breach, Abyss | note: Wombgift, Depths
- goal: Crafting currency | system: Delirium, Ritual | note: Distilled, Omens
- goal: Ascendancy progress | system: Trials | note: Chaos, Sekhemas
- goal: Vaal crafts | system: Vaal Temple | note: Long build

## Build problem routing

- problem: Low damage | fixFirst: Gear and support gems | recommended: Trials, Delirium | defer: Vaal long build
- problem: One-shot deaths | fixFirst: Defence and resist | recommended: Fortress, Ritual | defer: Delirium Simulacrum
- problem: Slow clear | fixFirst: Move speed | recommended: Breach, Abyss | defer: Abyss if too slow
- problem: No currency | fixFirst: Map sustain | recommended: Ritual, Delirium | defer: Long resets
