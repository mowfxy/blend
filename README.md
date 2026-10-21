# Kern

**A design practice for AI agents, by [M4 Labs](https://m4labs.xyz).**

Kerning is the space a designer adjusts by eye after the font's own spacing is set. The metrics come with the tools, and the kerning is taste. Kern teaches an agent the second part. Instead of handing it a menu of styles to choose from, Kern gives it a method for deriving a design from the product itself, a canon of principles it never drops, an eye for finish, and tools that measure without choosing.

It covers websites, web apps, dashboards, desktop apps (macOS, Windows, Linux; Electron, Tauri, SwiftUI, AppKit, WinUI, GTK, Flutter), iOS and iPadOS, Android, watch, TV, car, kiosks, widgets, menu bar apps, browser extensions, visionOS, terminal UIs, slides, email, documents and print.

## Why outputs differ

Most design prompts converge, because every model reaches for the same average answer. Kern works against that in four ways:

- **It derives instead of selecting.** Each design starts from the brief's own specific facts, finds the tension in them, and writes a one-sentence thesis that has to fail when you swap in a competitor's name.
- **It names the median.** The agent writes down what an average model would ship for this exact brief, then treats it as presumed wrong.
- **It defends one risk.** Every design makes one decision a cautious designer would not, and it must come from the thesis.
- **It keeps a ledger.** Each project's fingerprint is recorded in `~/.kern/ledger.jsonl`, and new work is checked against it for near-duplicates.

## Install

**Claude Code** (as a plugin):

```text
/plugin marketplace add mowfxy/kern
/plugin install kern@m4labs
```

**Claude Code or Codex** (as skills), with Python 3.9+:

```sh
git clone https://github.com/mowfxy/kern.git
cd kern
python scripts/install.py                    # Claude Code: ~/.claude/skills
python scripts/install.py --target codex     # Codex: $CODEX_HOME/skills
python scripts/install.py --target both --remove-legacy
```

`--replace` updates an existing install, and `--remove-legacy` backs up and removes the design suite Kern replaces. Backups go to `.maintainer/install-backups/`. The tools in `skills/kern/scripts/kern.mjs` need Node 18 or later and nothing else.

## Use

```text
Use $kern to build a Tauri app for logging grape deliveries at a winery weighbridge.
```

```text
Use $kern-critique to rate this dashboard before and after the redesign.
```

Kern does not interview you about taste. It decides, builds, and tells you the thesis in a sentence or two so you can redirect it. It writes its working notes to `.kern/` in your project, and nowhere else.

## The suite

| Skill | Owns |
|---|---|
| [kern](skills/kern/SKILL.md) | The method, [canon](skills/kern/references/canon.md), [eye](skills/kern/references/eye.md), [median](skills/kern/references/median.md), routing, tools |
| [kern-web](skills/kern-web/SKILL.md) | Landing pages, marketing sites, portfolios, editorial and event pages |
| [kern-product](skills/kern-product/SKILL.md) | Web apps, SaaS, forms, records, settings, every UI state |
| [kern-dashboard](skills/kern-dashboard/SKILL.md) | Dashboards built around decisions, charts, data colour, tables |
| [kern-desktop](skills/kern-desktop/SKILL.md) | Native desktop grammar and [title bars that belong to the app](skills/kern-desktop/references/chrome.md) |
| [kern-ios](skills/kern-ios/SKILL.md) | iPhone and iPad: HIG, Dynamic Type, Liquid Glass, edge-to-edge |
| [kern-android](skills/kern-android/SKILL.md) | Material 3, edge-to-edge, predictive back, adaptive layouts |
| [kern-screens](skills/kern-screens/SKILL.md) | Watch, TV, car, kiosk, widgets, menu bar, extensions, visionOS |
| [kern-terminal](skills/kern-terminal/SKILL.md) | CLI and TUI output, errors, progress, machine output |
| [kern-media](skills/kern-media/SKILL.md) | Slides, email, documents and PDFs, social images, print |
| [kern-type](skills/kern-type/SKILL.md) | Type derived from reading conditions; scales, numerals, scripts |
| [kern-color](skills/kern-color/SKILL.md) | Palettes from a real source, OKLCH ramps, themes, contrast |
| [kern-motion](skills/kern-motion/SKILL.md) | Motion from the product's physics, feedback, transitions, scroll |
| [kern-imagery](skills/kern-imagery/SKILL.md) | Pictures, illustration, icons, 3D, ambient backgrounds, characters |
| [kern-critique](skills/kern-critique/SKILL.md) | The Kern Score, before-and-after ratings, the look-and-fix loop |
| [kern-ship](skills/kern-ship/SKILL.md) | Working, honest, accessible, fast, found and secure |

## Examples

There are two fictional products, built by running the method from scratch, each with its full record in `.kern/` ([details and scores](examples/README.md)):

- **[Poolside](examples/poolside/):** an Electron desktop app for logging pool water tests. Its title bar is part of the app on macOS and Windows, and its pH reading is filled with the test kit's own colour.
- **[Holm Ferry](examples/holm-ferry/):** a website for an island ferry. It is a drawn nautical chart and a live next-sailing board, with no hero photo or feature cards.

## Tools

```sh
node skills/kern/scripts/kern.mjs palette "#7a2e1f"              # OKLCH ramp from a source colour
node skills/kern/scripts/kern.mjs contrast "#1c1d1f" "#f4f3f0"   # WCAG 2 + APCA
node skills/kern/scripts/kern.mjs ledger check --fingerprint .kern/fingerprint.json
node skills/kern/scripts/kern.mjs audit src/                     # median tells, chrome, placeholders
```

## Repository

- `skills/`: the suite.
- `.claude-plugin/`: the Claude Code plugin and marketplace manifests.
- `scripts/`: the installer, its tests and the validator.
- `evals/`: briefs and a protocol for measuring quality and divergence.
- `examples/`: two worked examples with their records.
- `docs/audit.md`: why Kern was built, with before and after ratings.

```sh
python scripts/validate.py
cd scripts && python -m unittest test_install
```

## License

[MIT](LICENSE) © 2026 M4 Labs.
