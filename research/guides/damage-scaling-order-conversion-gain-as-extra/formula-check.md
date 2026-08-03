# Formula Check — damage-scaling-order-conversion-gain-as-extra

## Structure (correct, no invented coefficients)
The damage pipeline is a fixed sequence of operations:

1. Base
2. + Added (flat)
3. × (1 + Σ Increased of same category)
4. × Π (each More/Less multiplier)
5. Conversion (changes type)
6. Gain as Extra (adds type Z, keeps Y)
7. × Crit multiplier (if crit)
8. × (1 − Enemy Resistance) and × Damage Taken modifiers

## Coefficients
- The article gives the CORRECT STRUCTURE only.
- No exact coefficients are invented. Worked-example numbers (100 base, 50 added, 100% increased, 90% conversion, 150% crit, 75% resist) are EXPLICITLY labelled as assumed teaching values.
- Where the precise conversion type-ordering or exact multiplier positions are version-sensitive, the article states they should be confirmed in the live client rather than asserting a fixed number.

## Cross-check
- Same-category Increased add: confirmed by pipeline + video.
- More multipliers multiply: confirmed.
- Conversion vs Gain as Extra distinct: confirmed by video + wiki terminology.
