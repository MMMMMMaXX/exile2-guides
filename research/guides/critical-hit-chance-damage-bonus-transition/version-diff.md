# Version Diff — critical-hit-chance-damage-bonus-transition

## Legacy PoE1 info to AVOID
- **"Critical Strike Multiplier"** terminology: In PoE2 the current name is **Critical Damage Bonus**. Do not use the old multiplier framing.
- **Universal crit thresholds**: Avoid stating a fixed "% where you must go crit". PoE2 build math is contextual.
- **Charges auto-granting stats**: In PoE2, charges no longer auto-grant the same passive stats as PoE1; Power Charges are mentioned only as an available crit-damage/uptime lever, not as auto-granted.

## Current PoE2 behavior stated
- Crit chance accumulates as (Base + Flat) × (1 + Increased). Structure stable.
- A Hit must land before the crit roll matters (Accuracy vs Evasion for attacks).
- Multi-hit / channel / DoT perform separate or distinct crit checks.
- Exact coefficients (base Critical Damage Bonus, weapon base crit values, DoT crit rules, Lucky/Unlucky behavior) are version-sensitive and labelled pending PC verification.

## Patch baseline
Patch string kept as "Path of Exile 2 Early Access 0.5.4". No 0.5.4d change was confirmed that alters these mechanics centrally, so the baseline is retained.
