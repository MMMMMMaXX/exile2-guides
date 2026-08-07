# Destruction Test Boundary — Timeless Jewels (extra)

Defines the verification boundary for the desecration destruction claim so QA does not over-assert (plan §15.7, P0).

## What is verified

- That Desecration makes Undying Hate Unstable (official, 0.3.1).
- That the destruction probability increases with each Desecration (official wording).
- That the maximum is 4 Preserved Craniums (official cap).

## What is NOT verified (and must not be claimed)

- Any specific destruction probability per Desecration count (1st / 2nd / 3rd / 4th).
- Any cumulative destruction percentage.
- Any "safe up to N mods" guarantee beyond the qualitative tiers in desecration-risk.md.
- Any community-estimated fixed number, even if widely repeated.

## Boundary rule

- The published article may only say the probability is increasing and rises with use. It must NOT assign numbers.
- If a future official source publishes a table, re-verify and update; until then the boundary stays qualitative.

## QA gate

- Lint/schema check: reject any literal fixed percentage attached to Desecration destruction.
- Source check: destruction-probability claims require an official (GGG/PoE2Wiki) numeric source; absent source -> reject.
