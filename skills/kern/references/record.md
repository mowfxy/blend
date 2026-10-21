# The record

Kern's working notes for a project, kept at `.kern/record.md` in the project root. Write it yourself from the brief, the product and the method. Never show it to the user as a form or ask them to fill it in. Update it whenever the user redirects you, and read it again before each new screen in a long session.

Mark where each decision came from: **user** (they said it), **inherited** (the existing product has it) or **kern** (you decided it). Never present a Kern decision as something the user chose.

```markdown
# <Product> — Kern record

## Locate
Surface:
Platform / stack:
Device and posture:
Frequency and stakes:

## Ground
Specimen: (longest heading, longest label, extreme numbers, a real record, an error message)
People: (who, before/after, fears, their words)
Material culture: (5+ artefacts)
Constraints: (brand, system, accessibility, explicit asks and exclusions — mark user/inherited)
Most specific facts:
1.
2.

## Tension

## Thesis
This should feel like … because …
Swap test: (competitor tried, result)

## Median
An average model would ship: …
Kept from the median, and why:

## System
Colour source: … · stance: … · accent share: … · ramps: …
Type: roles → families, sizes, why; candidates tried
Space: base unit, scale, row/control heights, density
Shape: radius, stroke, nesting
Depth: elevation model
Motion: durations, easing, signature move
Chrome: title bar / system bars / theme-color treatment
Themes: light, dark, both — why
Defended risk:

## Screens and states
| Screen | Dominant element | States done |

## Critique log
Round 1: score … top three fixes …

## Missing facts and samples
(content you sampled; label it in the UI and mention it in the handoff)
```

Save the fingerprint for the ledger next to it as `.kern/fingerprint.json`:

```json
{
  "project": "vineyard-harvest",
  "brand": "Coteaux cooperative",
  "platform": "desktop-macos-windows",
  "structure": "receipt column + entry pad",
  "type": ["IBM Plex Sans Condensed", "system"],
  "colorSource": "weighbridge ticket stock",
  "colorStance": "ink on paper, one stamp accent",
  "theme": "light+dark",
  "density": "comfortable-large-targets",
  "shape": "square, 1px rules",
  "motion": "instant, no signature",
  "imagery": "none, typographic",
  "risk": "desktop app with glove-sized targets"
}
```
