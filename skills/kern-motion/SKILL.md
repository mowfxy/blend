---
name: kern-motion
description: Kern specialist for motion on any platform, covering motion tokens derived from the product's physics, control feedback, transitions between views, choreographed entrances, micro-interactions, small illustrated or SVG sequences, scroll-linked stories, springs, interruption and retargeting, reduced motion, and performance. Use it whenever something should animate, an interface feels static or janky, a hover, press, page transition or scroll scene is being built, or the motion feels generic (fade-up on everything).
---

# Kern Motion

Motion explains. It shows where something came from, where it went and what changed, and then it gets out of the way. Hold the [canon](../kern/references/canon.md): feedback is immediate (12), and the design must work as a still. Motion only adds what a still cannot.

## Derive the physics

The product has a physical character, and its motion should share it. A precision instrument moves fast and exactly, with no overshoot. A calm reading app moves slowly, with long settles. A playful consumer app may overshoot on content, but never on chrome. A heavy industrial tool moves with weight, arriving slowly and stopping firmly. Write this in the record, then set the tokens from it:

| Token | Typical range | Use |
|---|---|---|
| `instant` | 0–100 ms | Press feedback, toggles, selection |
| `quick` | 120–200 ms | Hover, small state changes, menus |
| `moderate` | 200–350 ms | Panels, sheets, view transitions |
| `slow` | 400–700 ms | Large reveals, once per page at most |
| `ease-out` | e.g. `cubic-bezier(0.2, 0.8, 0.2, 1)` | Things arriving or responding |
| `ease-in-out` | e.g. `cubic-bezier(0.6, 0, 0.3, 1)` | Things travelling while visible |
| `spring` | Platform springs (SwiftUI `.smooth`, `.snappy`; Compose `spring()`) | Native platforms, gestures |

Exits run at about 70% of the entry duration. Never use `ease-in` for an arrival, and never use `transition: all`, so name the properties. These ranges are a starting point. The physics in the record decides where in each range the product sits.

## Where motion belongs

1. **Feedback.** Every control acknowledges a press immediately with a small scale, tone or position change. Hover appears only behind `(hover: hover)` and makes things clearer, never dimmer.
2. **Continuity.** When a view changes, show the relationship. A list item expands into its detail, a sheet rises from the action that opened it, and a deleted row collapses so its neighbours close the gap. Use the platform tools: View Transitions on the web, `matchedGeometryEffect` and navigation transitions in SwiftUI, shared-element transitions in Compose.
3. **State.** Loading, progress, success and error each have a brief, distinct motion, and success appears only after the work is confirmed.
4. **Entrances** (mostly on public pages). Choreograph each section by its content: a list arrives row by row (staggered 40–80 ms), a picture is revealed from a mask and a statement appears line by line. Each runs once. Never apply the same fade-up to every block. Content must be visible if the script fails, so gate the hidden initial state behind a class added by JavaScript.
5. **The signature.** At most one memorable motion per product, derived from the thesis. It might be the way a ticket prints, the way the tide line moves or the way a record is stamped. Spend boldness here only.

## Small sequences and illustrations

For an illustrated or SVG sequence (an icon that draws itself, a card illustration that acts out the feature):

- **Choose a visual verb from the content:** connect, collect, unfold, compare, resolve, stamp, fill, sort.
- **Design three poses first:** rest, the revealing middle and the resolved end. Then animate between them. Separate the moving parts in the artwork, because a flattened icon cannot reorganise itself.
- **Stage it.** Attention, one readable transformation, settle, then a hold long enough to read. Related parts overlap in time and should not all stagger equally.
- **Keep the label and hit area stable.** The drawing moves and the text does not.

## Scroll

Use scroll-linked scenes only when the content is a genuine transformation (an assembly, a process, a journey through a place) and the reader is better served by scrubbing than by flow. Map progress from measured geometry, not wheel deltas, so it is reversible in both directions. Compose the middle frames as carefully as the end. Remove empty runway. On phones, a shorter or static version is often better. Under reduced motion, remove the pinning entirely and show the content in normal flow.

## Interruption and lifecycle

- **Retarget from the current pose** when input changes mid-animation. Never snap back to the start or queue repeated hovers.
- **One owner per animated property.** Use separate wrappers when position and deformation need different transforms.
- **Animate only transform, opacity and clip-path or filter on the web.** Never animate layout properties in loops.
- **Pause offscreen and in hidden tabs.** Release animation handles and observers on unmount.
- **Never observe an element clipped to nothing.** A zero-area IntersectionObserver target never fires, so observe its unclipped parent instead.

## Reduced motion

Respect `prefers-reduced-motion` on the web, Reduce Motion on Apple platforms and the animation scale setting on Android, both at load and when the setting changes. Replace movement with an instant change or a short crossfade, keep every piece of meaning, and remove parallax, pinning and autoplaying loops. Provide a pause control for any motion that lasts more than five seconds.

## What reads as generated

The same fade-up on every block, a dozen staggered hero entrances, hover-lift on every card, bounce or elastic easing on interface chrome, infinite pulsing dots, floating shapes, shimmering text, rotating badges, and a reveal that never fires and leaves a blank band.

## Verify

Watch every animation at real size and normal speed, then slowed down (DevTools animation panel or Slow Animations in the simulator). Test fast repeated input, hover and leave in quick succession, interruption mid-transition, reduced motion switched on live, a hidden tab, and a mid-range phone. Screenshots cannot prove timing, so say what you actually watched.
