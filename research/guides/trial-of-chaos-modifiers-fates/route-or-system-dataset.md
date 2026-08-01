# Route / System Dataset — trial-of-chaos-modifiers-fates

由指南正文 data-table section 真实派生（非虚构）。

## Room objectives

- room: Survival | goal: Outlast the timer | mustKill: No | risk: Medium
- room: Defeat All | goal: Kill everything | mustKill: Yes | risk: High
- room: Escort | goal: Reach exit with NPC | mustKill: Partial | risk: Medium
- room: Soul Core | goal: Capture the core | mustKill: No | risk: Medium
- room: Boss antechamber | goal: Survive mini-boss | mustKill: Yes | risk: High

## Modifier risk by build

- modifier: Monster Damage | effect: Enemies hit harder | melee: High | ranged: High | minion: Medium | dot: Medium
- modifier: Extra Projectiles | effect: More ranged pressure | melee: Medium | ranged: High | minion: Low | dot: Low
- modifier: No Leech | effect: Removes life leech | melee: High | ranged: Low | minion: Low | dot: Medium
- modifier: Monster Speed | effect: Faster enemies | melee: Medium | ranged: Medium | minion: Low | dot: Low
- modifier: Reduced Armour | effect: Less armour | melee: High | ranged: Low | minion: Low | dot: Low
- modifier: Chaos Ground | effect: Standing in chaos hurts | melee: High | ranged: Medium | minion: Low | dot: High

## Build-specific hard stops

- build: Life leech melee | hardStop: No Leech | why: Removes the only sustain
- build: Stationarycaster | hardStop: Monster Speed + Projectiles | why: Cannot reposition fast enough
- build: Minion | hardStop: Monster Damage spikes | why: Minions die, you are exposed
- build: Low resist | hardStop: Any damage modifier | why: Honour drains too fast
- build: Slow mover | hardStop: Escape-timer rooms | why: Cannot reach objectives in time

## Reward ladder

- stage: Each cleared room | reward: Currency, relics, Fate | lostOnFail: Yes (unbanked)
- stage: Checkpoint cash-out | reward: All banked so far | lostOnFail: No
- stage: Boss room | reward: Ascendancy progress + top reward | lostOnFail: Yes if room failed
- stage: Trialmaster | reward: Unique drop | lostOnFail: Yes if not reached

## Fate tracker

- fate: Order's Fate | source: Mid-loop rooms | tradeable: No
- fate: Resolve's Fate | source: Boss / checkpoint rooms | tradeable: No
- fate: Body's Fate | source: Deep-loop rooms | tradeable: No
