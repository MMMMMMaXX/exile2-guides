# Formula Check — critical-hit-chance-damage-bonus-transition

## Structure (correct, version-stable)

Final Crit Chance = (Base Crit Chance + Flat Crit Chance) × (1 + Σ Increased Crit Chance%)

Critical Damage Bonus (on a crit) = Normal Hit Damage + Σ Critical Damage Bonus

Stacking rules:

- Increased bonuses of the same category add together.
- Separate categories and all More multipliers multiply.

## Coefficients (version-sensitive — NOT invented)

- Base Critical Damage Bonus exact value: pending PC verification.
- Weapon base crit values per base type: pending PC verification.
- DoT/ailment crit interaction specifics: pending PC verification.
- Lucky / Unlucky crit roll behavior: pending PC verification.

## Teaching numbers used

The article's worked example uses assumed values (e.g. 10% base dagger, +30% flat, +100% Increased → 80% final; +75% bonus) explicitly labelled "assumed teaching values, pending PC verification". These illustrate structure only and must not be read as live coefficients.
