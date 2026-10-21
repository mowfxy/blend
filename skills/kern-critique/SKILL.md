---
name: kern-critique
description: Kern specialist for reviewing, rating and auditing rendered design on any platform. It applies the Kern Score, a weighted ten-criterion rubric with caps and calibration, to screenshots of websites, apps, dashboards, desktop and mobile apps, decks and terminal output. It covers how to look like a stranger, before-and-after ratings, the look-and-fix loop, and comparing outputs for sameness. Use it after any substantial build, whenever the user asks for a design review, critique, audit, rating, score or "why does this look off", and to compare two versions.
---

# Kern Critique

Judge the pixels, not the code. You wrote the code, so you will read your intentions into it, while the screenshots only show what is there. Judge against the brief and the record, not against your favourite style. An audit request produces findings and changes nothing. A build request includes the fixes.

## How to look

Take screenshots at the sizes people use: for the web, 1440, 768 and 390 wide; for desktop, the default window and the minimum size; for mobile, a small and a large phone. Take them in every theme you ship. Open them, then make each of these passes separately:

1. **One second.** Glance and look away, then name what you saw. If the answer is "a website" or "an app", there is no dominant element.
2. **Squint.** Count the masses. Two or three clear masses is composed, and many medium masses is not.
3. **Swap.** Cover the name. Could this belong to a competitor, or to an unrelated product? Compare it with the record's median. How many median elements survived without a reason?
4. **Edges and space.** Count the left edges, check that gaps between groups are larger than gaps within groups, and look for holes (accidents) as opposed to rests (decisions).
5. **Type.** Look at the size jumps, the number of sizes, rag, orphans, measure and numerals. Check that the real fonts loaded.
6. **Colour.** Name the proportions, check that the accent's share matches the stance, check contrast, and confirm that dark mode is designed rather than inverted.
7. **Chrome.** Does the title bar, status bar or browser chrome continue the app's surface? Are the window controls placed inside the layout?
8. **Platform.** Do the controls, navigation and gestures follow the platform? Is the density right for the posture?
9. **Content.** Is it real and at full length? Is it honest, with no invented proof? Are the labels in the users' own words?
10. **States.** Look at the empty, loading, error, overflow and focus states. Exercise at least the primary flow and one failure.
11. **Register.** Name the register the record chose and the one the render actually shows. Is a sensory subject shown, large, more than once? Is every rich element (3D, text-mode animation, generative art, sound) the product's own material, convincing, and fast? Is a utility quiet enough to work in all day? Too quiet for the subject is a defect, not taste.
12. **Controls.** Are the icons one drawn or tuned family, and the buttons, inputs and toggles derived from the domain with every state designed? Could the controls be lifted onto an unrelated product unchanged?
13. **Motion** (watched, not screenshotted). Is the feedback immediate, the motion causal and settling, and does reduced motion still work?
14. **Finish.** Do the kerning pass from [the eye](../kern/references/eye.md#seeing-finish).

## The Kern Score

Score each criterion from 0 to 10, then compute the weighted mean. Weights depend on the surface.

| Criterion | What a 9 looks like | Web | Product / Dashboard | Desktop / Mobile | Media |
|---|---|---|---|---|---|
| **Thesis** | One specific idea visible in three seconds, which fails the swap test for competitors | 15 | 10 | 10 | 15 |
| **Hierarchy** | One dominant element per view, decisive contrast, two or three masses | 15 | 15 | 10 | 20 |
| **Composition** | Few shared edges, space that expresses relationships, rhythm that changes with content | 10 | 10 | 10 | 15 |
| **Typography** | Faces chosen and justified, a decisive scale, real details, reflow at large text sizes | 10 | 10 | 10 | 15 |
| **Colour** | A sourced palette, a clear stance, contrast that passes, both themes designed | 10 | 10 | 10 | 10 |
| **Platform and chrome** | Native grammar, integrated chrome, density right for the posture | 5 | 10 | 20 | 0 |
| **Content** | Real, complete, honest, in the users' words | 15 | 10 | 5 | 15 |
| **States and behaviour** | Every state designed, feedback immediate, keyboard and assistive tech work | 5 | 15 | 15 | 0 |
| **Craft** | Optical alignment, crops, consistent strokes and radii, no accidental gaps | 10 | 5 | 5 | 10 |
| **Distinctiveness** | Far from the median, the register spent, controls and materials that could only belong here, a defended risk, no near-duplicate in the ledger | 5 | 5 | 5 | 0 |

### Caps

These limit the total, whatever the individual scores:

- **A default title bar or status strip** that clashes with the app caps desktop and mobile work at **6.0**.
- **Text below the contrast minimum, or a primary flow that does not work,** caps the total at **5.5**.
- **Invented proof** (fake customers, quotes, logos or statistics) caps the total at **5.0**.
- **Placeholder content** (lorem ipsum, grey boxes, "Image here") caps the total at **5.0**.
- **No identifiable thesis** caps Thesis and Distinctiveness at **5**.
- **More than half of the record's median survives unexamined** caps Distinctiveness at **4**.
- **A stock icon set at its defaults or a component kit's default buttons** on a public page or a product with a composed or louder register caps Craft and Distinctiveness at **6**.
- **A register mismatch** (an expressive or spectacular brief rendered at silent or composed volume, or spectacle on a silent tool) caps Thesis at **6**.
- **Rich elements that fail the relevance test** (decoration with no source in the product) cap Distinctiveness at **5**.
- **Animation with no reduced-motion still** caps States at **6**.

### Calibration

- **9–10:** reference work in its category that people would study. This is rare, so if you score your own first draft 9, re-score it as a juror who has never seen it.
- **8:** professional, distinctive and finished, with no visible defects at normal viewing.
- **7:** good and coherent with a clear idea, plus a few visible defects or median leftovers.
- **6:** competent median work, which is what most AI output scores.
- **5 or below:** broken, generic, unfinished or dishonest.

Be specific. Every score below 8 names the visible defect that holds it there, for example *"the KPI row and the chart are equal weight, so nothing leads"*. Avoid vague verdicts like *"could be more premium"*.

## The loop

1. Score, and write the critique in the format below.
2. Fix the **three highest-impact** problems: the largest visible mismatch first, then structure before polish.
3. Re-render, re-score and repeat, up to three rounds.
4. If the score is still below 7 after round three, say so plainly and list what remains.

```markdown
### Kern critique — round N (surface: desktop)
Score: 6.8 → caps applied: none
| Thesis 7 | Hierarchy 6 | Composition 7 | Type 7 | Colour 7 | Platform 5 | Content 8 | States 7 | Craft 7 | Distinct 6 |
Top three:
1. Title bar is the default light strip above a dark sidebar → extend content, inset traffic lights (Platform 5→8)
2. …
3. …
Kept from median (defended): …
```

## Before and after ratings

When asked to compare versions, score both with the same weights, at the same sizes, in the same themes, and ideally blind, without knowing which is new. Report the scores per criterion, the delta and the evidence for each change. When several designs are compared for sameness, compare their fingerprints with `node ../kern/scripts/kern.mjs ledger compare a.json b.json` in addition to looking.

## Measured checks

Run `node ../kern/scripts/kern.mjs audit <src>` on the source. It flags measurable median tells (default faces, violet gradients, `transition: all`), stock icon libraries and kit buttons, emoji icons, decorative loops, one entrance repeated everywhere, animation without reduced-motion handling, uncapped or always-running WebGL, missing `theme-color`, and desktop chrome omissions in Electron, Tauri, SwiftUI and WinUI. Its findings are evidence, not a verdict, because an authorised brand colour stays. Passing the audit does not mean the design is good. Only looking can tell you that.
