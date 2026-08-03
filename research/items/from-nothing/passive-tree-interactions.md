# Passive Tree Interactions — From Nothing

Article ID: from-nothing

## How the tree responds
1. The jewel must be socketed in an **already allocated** Jewel Socket.
2. A fixed small radius forms around the **bound Keystone**, not around the socket.
3. Any small or Notable passive inside that radius becomes allocatable without a connecting path.
4. Allocated nodes still cost a passive point; only the connecting path is skipped.
5. Removing the jewel unallocates all remotely-allocated nodes and refunds their points.

## Pathing math (illustrative)
- Net saved = (normal path points to reach target nodes) − (points paid via jewel: target nodes + socket path).
- Example reasonable case: normal 12 points → jewel 6 (Notable + 4 small + 1 socket) → net save 6.
- The jewel occupies one Jewel Socket that could otherwise hold a Rare/Unique jewel (opportunity cost).

## Patch 0.2 socket removal
If a passive-tree update removes the socket, the jewel is not deleted; `/reclaimjewels` returns it. Documented in community-evidence and troubleshooting.
