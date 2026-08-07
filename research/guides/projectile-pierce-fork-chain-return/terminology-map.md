# Terminology Map — projectile-pierce-fork-chain-return

| Term               | Definition used in article                                                    |
| ------------------ | ----------------------------------------------------------------------------- |
| Projectile         | Entity travelling until it hits an enemy, obstacle, or its ~15m travel limit  |
| Pierce             | Passes through the hit enemy on original trajectory; still a hit              |
| Fork               | Splits into two projectiles at 60 and -60 degrees from the path               |
| Chain              | Redirects to another nearby enemy after collision, up to N times              |
| Return             | Travels back to origin at end of travel; one extra hit on already-hit targets |
| Split              | Auto-targeting copies; highest priority; once (separate from Fork)            |
| Enemy chain        | Chain triggered from a hit enemy (skipped if pierce/fork available)           |
| Terrain chain      | Chain triggered from a wall/obstacle (once by default; additive chance)       |
| Shotgun prevention | Only one of several simultaneous projectiles may collide with one target      |
