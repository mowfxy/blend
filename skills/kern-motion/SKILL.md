---
name: kern-motion
description: Kern specialist for motion on any platform. It covers motion tokens derived from the product's physics, how much motion the register allows, control feedback, transitions between views, choreographed entrances, kinetic type, SVG drawing and morphing, ASCII and text-mode animation, canvas and shader effects, generative motion from real data, 3D camera moves, scroll-driven scenes, springs, interruption, reduced motion and performance. Use it whenever something should animate, an interface feels static, flat or janky, a hover, press, page transition, scroll scene, ASCII or terminal-style animation is being built, or the motion feels generic (fade-up on everything).
---

# Kern Motion

Motion explains, and sometimes it is the experience itself. It shows where something came from, where it went and what changed. On an expressive page it also carries the product's character: the way a pattern scrolls, a route draws itself over terrain, a stamp lands. Hold the [canon](../kern/references/canon.md): feedback is immediate (12), and the design must still work as a still.

Motion is never added to look alive. It is added when something in the product moves, changes, connects or plays, and the [register](../kern/references/register.md) says how much of that reaches the screen.

## Derive the physics

The product has a physical character, and its motion should share it. A precision instrument moves fast and exactly, with no overshoot. A calm reading app moves slowly, with long settles. A playful consumer app may overshoot on content, but never on chrome. A heavy industrial tool moves with weight, arriving slowly and stopping firmly. A text-mode tool moves in discrete steps, frame by frame, the way a terminal redraws. Write this in the record, then set the tokens from it:

| Token | Typical range | Use |
|---|---|---|
| `instant` | 0–100 ms | Press feedback, toggles, selection |
| `quick` | 120–200 ms | Hover, small state changes, menus |
| `moderate` | 200–350 ms | Panels, sheets, view transitions |
| `slow` | 400–700 ms | Large reveals, once per page at most |
| `scene` | 1–4 s | A signature sequence or camera move on an expressive or spectacular page |
| `ease-out` | e.g. `cubic-bezier(0.2, 0.8, 0.2, 1)` | Things arriving or responding |
| `ease-in-out` | e.g. `cubic-bezier(0.6, 0, 0.3, 1)` | Things travelling while visible |
| `steps(n)` | Frame-stepped | Text-mode, pixel and mechanical motion |
| `spring` | Platform springs (SwiftUI `.smooth`, `.snappy`; Compose `spring()`) | Native platforms, gestures, things that are thrown |

Exits run at about 70% of the entry duration. Never use `ease-in` for an arrival, and never use `transition: all`, so name the properties.

## Motion by register

- **Silent:** feedback and continuity only. Nothing moves that the user did not cause.
- **Composed:** feedback, continuity, state, and one small signature move. Entrances on public pages, choreographed by content.
- **Expressive:** a real signature sequence, kinetic type, image reveals, one live or generative element made from the product's material, motion in every section that has something to show.
- **Spectacular:** a scene the visitor drives or watches: a 3D camera path, a scroll-driven story, a full-screen text-mode world, sound tied to motion. One scene, made convincing, with everything around it calm enough to read.

## Where motion belongs

1. **Feedback.** Every control acknowledges a press immediately with a small scale, tone or position change. Hover appears only behind `(hover: hover)` and makes things clearer, never dimmer.
2. **Continuity.** When a view changes, show the relationship. A list item expands into its detail, a sheet rises from the action that opened it, and a deleted row collapses so its neighbours close the gap. Use the platform tools: View Transitions on the web, `matchedGeometryEffect` and navigation transitions in SwiftUI, shared-element transitions in Compose.
3. **State.** Loading, progress, success and error each have a brief, distinct motion, and success appears only after the work is confirmed.
4. **Entrances** (mostly on public pages). Choreograph each section by its content: a list arrives row by row (staggered 40–80 ms), a picture is revealed from a mask, a statement appears line by line, a number counts to its real value once. Each runs once. Most blocks need no entrance at all. Content must be visible if the script fails, so gate the hidden initial state behind a class added by JavaScript.
5. **The signature.** One memorable motion per product, derived from the thesis: the way a ticket prints, the tide line moves, a record is stamped, a route draws over terrain. On expressive and spectacular pages it can be large. Spend boldness here.

## The toolbox

These are techniques, not a menu. Use one when the relevance test in [the register](../kern/references/register.md#the-relevance-test) says the product's own material moves this way. Each line says when it fits.

| Technique | Fits when | Build with |
|---|---|---|
| **Text-mode and ASCII animation** | The product lives in a terminal, a character grid, a protocol or a data stream, or its culture made art from characters (trackers, BBSes, demoscene, teletext, receipts, flight boards) | A monospace grid rendered to `<pre>` or canvas, see below |
| **Kinetic type** | The words are the product: a publication, a poster, a launch line, a festival line-up | Split into lines or words, variable font axes animated, masks; never per-letter on body text |
| **Split-flap and counters** | Values that update in the domain itself: departures, scores, prices, countdowns | Stepped digit columns with tabular numerals |
| **SVG line drawing** | Routes, signatures, circuits, diagrams, botanical or technical drawings | `stroke-dasharray` and `pathLength`, drawn once along the real path |
| **SVG morphing** | One form becoming another with meaning: a seed into a plant, a draft into a print | Matching point counts, designed in three poses |
| **Masks and wipes** | Pictures revealed the way the domain reveals them: a shutter, a blind, a page turned, a drawer pulled | `clip-path`, `mask-image` |
| **FLIP and View Transitions** | Items move between layouts: filtering, sorting, opening a detail | View Transitions API or measured FLIP |
| **Scroll-driven animation** | A real transformation scrubbed by the reader: an assembly, a journey, a process | CSS `animation-timeline: view()` / `scroll()` with a JS fallback |
| **Canvas and generative motion** | The product has real data with a shape: weather, traffic, sound, growth, a route | Canvas 2D or WebGL, driven by the real data or an honest simulation of it |
| **Shaders** | A material needs to move as itself: water, heat, ink, film grain, light on terrain | WebGL fragment shaders, a still fallback |
| **3D camera motion** | The subject is spatial and a move reveals it: the back of an object, a climb, a room | A scripted camera path or orbit with damping, see [kern-imagery](../kern-imagery/SKILL.md#live-3d) |
| **Physics** | Things in the product are thrown, stacked, poured or dropped | A small spring or rigid-body step, settling quickly |
| **Sound-linked motion** | The product is sound | Web Audio `AnalyserNode` driving the visual, audio off until asked |
| **Lottie or Rive** | A designed illustrated sequence with states, made by an illustrator | A state machine tied to real events |

## Text-mode and ASCII animation

Done well, text-mode animation is one of the most characterful things a screen can do. Done by reflex, it is the decoration of the moment. It belongs when characters are genuinely the product's medium.

**Good fits:** a page for a CLI or TUI showing its real output; a music tracker's pattern playing; a teletext-style live board; a receipt or ticket printing; a protocol's packets scrolling; a 3D object rendered to characters because the product is a terminal renderer; a demoscene or BBS culture brief. **Poor fits:** glyph rain behind a headline, decode-scramble on every heading, random ASCII "texture" on a brand with no text-mode heritage.

Craft:

- **A real grid.** Use one monospace face for the whole grid with `font-variant-ligatures: none`, a measured cell (`1ch` wide, a fixed line height in px), and integer cell positions. Box-drawing characters (`─│┌┐└┘├┤`) only connect when line height equals the font's cell height, so test it.
- **A character ramp** maps value to density, for example ` .:-=+*#%@` or block elements `▁▂▃▄▅▆▇█` and `░▒▓█`. Braille cells (`⠁…⣿`) give 2 × 4 sub-pixels per character for smooth curves and scopes. Choose the ramp from the font's actual glyph weights, checked in the render.
- **Frame rate is a voice.** Terminals redraw in steps. 8 to 24 frames per second often looks more right than 60. Throttle in `requestAnimationFrame` by elapsed time rather than using `setInterval`.
- **Render efficiently.** For small grids, update a `<pre>` by rewriting only changed lines. For large grids or many frames, draw glyphs to a canvas from a pre-rendered glyph atlas. Never create a DOM node per character for full-screen animation.
- **Colour like a terminal.** A small palette of meaning (the theme's ANSI-like roles), dim for the past, bright for the current row, one accent for the cursor.
- **Real content.** Animate the product's real output, the real pattern, the real log. Fake commands and invented metrics are as dishonest in ASCII as anywhere.
- **Accessibility.** The animated grid gets `aria-hidden="true"` and a real text alternative nearby that says what it shows. Copyable output stays as real text. Under reduced motion, show one composed frame.

## Small sequences and illustrations

For an illustrated or SVG sequence (an icon that draws itself, a card illustration that acts out the feature):

- **Choose a visual verb from the content:** connect, collect, unfold, compare, resolve, stamp, fill, sort, grow.
- **Design three poses first:** rest, the revealing middle and the resolved end. Then animate between them. Separate the moving parts in the artwork, because a flattened icon cannot reorganise itself.
- **Stage it.** Attention, one readable transformation, settle, then a hold long enough to read. Related parts overlap in time and should not all stagger equally.
- **Keep the label and hit area stable.** The drawing moves and the text does not.

## Scroll

Use scroll-linked scenes when the content is a genuine transformation (an assembly, a process, a journey through a place) and the reader is better served by scrubbing than by flow. Map progress from measured geometry, not wheel deltas, so it is reversible in both directions. Prefer CSS scroll-driven animations where supported, with a measured fallback. Compose the middle frames as carefully as the end. Remove empty runway. On phones, a shorter or static version is often better. Never hijack scroll speed. Under reduced motion, remove the pinning entirely and show the content in normal flow.

## Loops

A loop is fine when the thing it shows really loops or runs: a pattern playing, a live feed, the tide, a machine working, a scene the visitor is watching. It is not fine as a pulse, shimmer or float that exists to look alive. Every loop pauses offscreen and in hidden tabs, has a pause control if it lasts more than five seconds, and stops under reduced motion.

## Interruption and lifecycle

- **Retarget from the current pose** when input changes mid-animation. Never snap back to the start or queue repeated hovers.
- **One owner per animated property.** Use separate wrappers when position and deformation need different transforms.
- **Animate only transform, opacity and clip-path or filter on the web,** and canvas or WebGL for everything heavier. Never animate layout properties in loops.
- **Pause offscreen and in hidden tabs** (`IntersectionObserver`, `visibilitychange`). Release animation handles, observers and GPU resources on unmount.
- **Never observe an element clipped to nothing.** A zero-area IntersectionObserver target never fires, so observe its unclipped parent instead.

## Reduced motion

Respect `prefers-reduced-motion` on the web, Reduce Motion on Apple platforms and the animation scale setting on Android, both at load and when the setting changes. Replace movement with an instant change or a short crossfade, keep every piece of meaning, and replace loops, parallax, pinning, camera moves and text-mode animation with a composed still. Interactive 3D can stay interactive, but without autoplaying motion. `kern.mjs audit` fails a project that animates with no reduced-motion handling anywhere.

## What reads as generated

- **Too much of the same:** one fade-up on every block, a dozen staggered hero entrances, hover-lift on every card, bounce or elastic easing on chrome, pulsing dots, floating shapes, shimmering text, rotating badges, a reveal that never fires and leaves a blank band.
- **Too little for the subject:** a music product that never makes a sound, a race site where nothing moves over the course, a product launch as still as a settings page. When the register is expressive, a page with only hover states is unfinished.
- **Effects without a source:** glyph rain, scramble text, particle fields, cursor trails and magnetic buttons on products whose material is none of those things.

## Verify

Watch every animation at real size and normal speed, then slowed down (DevTools animation panel or Slow Animations in the simulator). Test fast repeated input, hover and leave in quick succession, interruption mid-transition, reduced motion switched on live, a hidden tab, and a mid-range phone (CPU throttled 4× in DevTools). Check the frame rate of canvas, WebGL and text-mode scenes. Screenshots cannot prove timing, so say what you actually watched.
