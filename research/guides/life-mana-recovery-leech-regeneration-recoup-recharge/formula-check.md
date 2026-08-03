# Formula Check — life-mana-recovery-leech-regeneration-recoup-recharge

No explicit coefficient formula is invented in the article. Structural facts only:

- Leech recovery ∝ (damage dealt of matching type) × (leech %). Per 0.5, the damage term is capped at 40,000 per hit; damage types scaled down evenly above the cap. Increasing leech % still raises recovery.
- Recoup recovery = (damage taken from hit after mitigation) × (recoup %) paid over the base 8s duration (duration modifiers change payout window, not total).
- Regeneration = base (flat + % of max) × Recovery Rate multipliers.
- Recharge rate scales with max ES; start delayed by no-damage timer (0.5 lowered the passive thresholds).

All precise coefficients (leech rate/duration, recoup duration, recharge-start thresholds, mana 4% base) are flagged client-version dependent — not stated as fixed numbers.
