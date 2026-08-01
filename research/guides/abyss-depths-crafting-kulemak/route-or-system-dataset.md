# Route / System Dataset — abyss-depths-crafting-kulemak

由指南正文 data-table section 真实派生（非虚构）。

## Abyss Atlas points

- source: Abyss quest | type: static | how: First completion of the Abyss storyline
- source: Depths clears | type: per-clear | how: Clearing Abyssal Depths
- source: Unique boss | type: static | how: Defeating the Abyss Unique boss
- source: Invitation chain | type: static | how: Completing the Kulemak invitation

## Unique boss tracker

- boss: Abyss Unique | trigger: Spawned in Depths | note: Drops the invitation
- boss: Invitation used | trigger: Use at the gate | note: Opens Kulemak path
- boss: Vessel of Kulemak | trigger: End of invitation chain | note: Pinnacle boss

## Invitation tracker

- state: Not dropped | source: Normal fissure | use: None yet
- state: Dropped | source: Unique boss | use: Use at the gate
- state: Used | source: Invitation consumed | use: Kulemak path open
