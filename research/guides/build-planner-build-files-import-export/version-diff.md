# Version Diff

What changed versus legacy info to avoid in this guide.

- **0.5.0** introduced the in-game Build Planner and `.build` file support. Any pre-0.5 "build code" or external-tool instructions are legacy and must not be presented as current.
- **0.5.4** is the guide's verified client version. Platform rows (Mac/console) are explicitly flagged `pending-pc` because support state can shift between patches.
- **Avoid**: telling users to "run" a `.build` file, claiming DPS calculation, or asserting a fixed Mac path. These are either wrong or unverified.
- **Keep**: data-file nature, Windows/Proton paths, P-to-open flow, console no-support note (0.5.0).
