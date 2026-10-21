# The record

Kern's working notes for a project, kept at `.kern/record.md` in the project root. Write it yourself from the brief, the product and the method. Never show it to the user as a form or ask them to fill it in. Update it whenever the user redirects you, and read it again before each new screen in a long session.

Mark where each decision came from: **user** (they said it, including answers to the brief), **inherited** (the existing product has it) or **kern** (you decided it). Never present a Kern decision as something the user chose, and never quietly replace a **user** decision.

```markdown
# <Product> — Kern record

## Brief (user)
Asked: (the questions, as asked)
The picture in their head:
References and what they like about them:
The one thing (do or feel in ten seconds):
How loud:
Never:
Assets they have:
Skipped because: (already answered, or they said "you decide")

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

## Register
Silent / composed / expressive / spectacular — why (experience or utility, frequency and state, how sensory, the domain's best artefacts, what you can make convincing)
Materials: (each one used, with its relevance answer; each one left out, with its reason)

## System
Colour source: … · stance: … · accent share: … · ramps: …
Type: roles → families, sizes, why; candidates tried
Space: base unit, scale, row/control heights, density
Shape: radius, stroke, nesting
Depth: elevation model
Controls: button anatomy, icon grammar or system set, inputs — and the domain object each comes from
Motion: durations, easing, signature move, any text-mode or 3D motion
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
  "register": "silent",
  "materials": ["type", "tabular numerals"],
  "type": ["IBM Plex Sans Condensed", "system"],
  "colorSource": "weighbridge ticket stock",
  "colorStance": "ink on paper, one stamp accent",
  "theme": "light+dark",
  "density": "comfortable-large-targets",
  "shape": "square, 1px rules",
  "controls": "ticket-stub buttons, system icons at 1.5px",
  "motion": "instant, no signature",
  "imagery": "none, typographic",
  "risk": "desktop app with glove-sized targets"
}
```
