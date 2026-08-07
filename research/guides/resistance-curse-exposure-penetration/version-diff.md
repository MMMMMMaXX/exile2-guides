# Version Diff — resistance-curse-exposure-penetration

## PoE1 vs PoE2 (avoid copying legacy rules)

- **Penetration floor:** Do NOT copy PoE1 penetration floor rules into PoE2. In PoE2, penetration is local to the hit, applied last, and typically cannot reduce the used resistance value below 0%. Documented only with the current PoE2 model.
- **Penetration vs persistent resistance:** Explicitly state penetration does NOT change the enemy's stored/persistent resistance (confirmed by Elyxir for PoE2). This is the key anti-confusion point versus older guides that may phrase penetration as altering enemy resistance.
- **DoT interaction:** State the current PoE2 per-hit model — penetration generally does not apply to standalone DoT. Avoid asserting PoE1-specific DoT behavior.

## Baseline patch

- Patch string kept as "Path of Exile 2 Early Access 0.5.4" per spec. If a newer 0.5.4d changed a specific coefficient, it would be noted here, but the patch string remains the baseline.
- Exact Exposure percentage, Curse Limit value, and boss curse-reduction percentage are version-sensitive and flagged pending PC verification rather than asserted.
