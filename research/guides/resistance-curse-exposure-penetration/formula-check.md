# Formula Check — resistance-curse-exposure-penetration

## Pipeline structure (sourced, High confidence)

Final resistance used = f(enemy total resistance, reduction from Exposure/Curses, inversion, penetration)

Order (Elyxir, 200 verified):

1. Start: enemy total resistance (incl. map/waystone mods).
2. Apply reduction (Exposure, Curses) — debuff on enemy, can push below 0.
3. Apply inversion (e.g. Rakiata's Flow) — flips the value.
4. Apply penetration — last step, local to attacker, typically cannot reduce below 0%.

## What we do NOT assert

- Exact Exposure percentage (community sources vary; not pinned to a sourced 0.5.4 number).
- Exact Curse Limit numeric value for 0.5.4.
- Exact boss curse-reduction percentage.
- Precise Penetration-vs-DoT rule coefficient.

All of the above are described qualitatively or marked "pending PC verification". No coefficients were invented.

## Worked-example math (teaching only)

damage_after = damage_before × (1 − effective_resistance_fraction)
The boss-scenario table uses 75% base resistance with illustrative -25% Exposure and 20% penetration to show the relative effect; numbers are examples, not sourced breakpoints.
