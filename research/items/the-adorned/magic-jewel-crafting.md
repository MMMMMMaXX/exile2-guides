# The Adorned — Magic Jewel Crafting Workflow

To benefit from The Adorned you must socket **Corrupted Magic Jewels** inside its radius. A "Corrupted Magic Jewel" is a jewel of **Magic rarity that has been Corrupted**. Crafting one is the central enabling step.

## Workflow

### Step 1 — Acquire a base jewel

Pick a jewel base whose granted passive skills help your build (Diamond, Citrine, etc.). Start from a **Normal** (white) base if possible so you control the mods.

### Step 2 — Make it Magic

- Use an **Orb of Transmutation** to turn Normal → Magic.
- Use an **Orb of Augmentation** to add a second Magic modifier if desired.
- (Optional) Use **Regal / Exceptional** crafting only if the base started Rare — but Rare jewels are NOT amplified by The Adorned, so prefer keeping it Magic.

### Step 3 — Corrupt it

- Use a **Vaal Orb** on the Magic jewel. This makes it **Corrupted** and may:
  - add a Corrupted implicit,
  - add/remove/change explicit modifiers,
  - (rarely) change rarity — but as long as it stays Magic + Corrupted, The Adorned amplifies it.
- Corruption is permanent. There is no undo.

### Step 4 — (Optional) targeted cleanup before corruption

If you want specific modifiers, do your augmentation/transmutation crafting **before** the Vaal Orb, because after corruption you cannot use Transmutation/Augmentation/Divine/Architect's Orb on it.

### Step 5 — Socket and verify

- Place The Adorned in a central jewel socket.
- Place the Corrupted Magic Jewel in a neighbor socket inside its radius.
- Hover the jewel — the granted passive magnitudes should show the amplified value (see `effect-breakpoints.csv`).

## Common Crafting Mistakes

- Corrupting a **Rare** jewel (stays Rare → not amplified).
- Forgetting to make it Magic first (corrupting a Normal yields a Corrupted Normal, not a Corrupted Magic Jewel).
- Trying to Divine/Architect after corruption (impossible).
- Assuming corruption guarantees good mods — vet the result before committing currency.

## Why Vaal Orb, not Architect's Orb

Architect's Orb is for rerolling jewel sockets/implicits on specific unique jewels and cannot be used on a corrupted magic jewel. The Vaal Orb is the correct corruption vehicle here. (The Adorned itself also cannot take an Architect's Orb — it is corrupted on drop.)

## Sources

- `vaal-orb` (internal) — Vaal Orb behavior.
- `poe2wiki-adorned` — eligibility (Corrupted Magic Jewels only).
- `timesaver-adorned` — practical crafting guidance.
