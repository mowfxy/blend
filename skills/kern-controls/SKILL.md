---
name: kern-controls
description: Kern specialist for the parts people touch and scan, on any platform - icons, buttons, links, inputs, selects, toggles, sliders, steppers, tabs, chips, tooltips, cursors and selection. It replaces stock icon sets and component-kit defaults with controls derived from the domain's own instruments, marks and notation, and covers drawing a custom icon family in SVG, button anatomy and every state, tuning a library set when one is right, and native system sets. Use it whenever you add icons or controls, when buttons or icons look generic, kit-made or interchangeable, and before shipping any public page.
---

# Kern Controls

Two products with different palettes and fonts still look identical when they share the same 24 px line icons and the same rounded-md button with an arrow. The controls are where a design is touched most, and where it most often stops being designed. Hold the [canon](../kern/references/canon.md): the platform's grammar first (7), one system with no strays (8), every state designed (11), specific over safe (17) and finish (18).

Platform grammar still wins. A checkbox must still look checkable, a button pressable, a link followable. You are changing the voice of a control, never its meaning.

## Start from the domain's instruments

Every domain already has controls and marks that its people know by hand. Find them in the ground and write three to five in the record before drawing anything:

- **Instruments:** the transport keys on a tape deck, a rotary dial, a gate lever, a bike's gear shifter, the keys of a till.
- **Marks:** a painted trail blaze, a proof-reader's mark, a cattle brand, a hallmark, a rubber stamp, a punched ticket.
- **Notation:** the symbols of the field itself, such as a tracker's note-effect columns, a map's legend, a knitting chart, chemical hazard pictograms, music notation.
- **Containers:** a seed drawer label, a luggage tag, a specimen jar, a folder tab, a cassette J-card.

The control system takes its **anatomy** (shape, how it sits, how it shows pressed), not its literal picture, from these. A ferry booking button can have the notch of a ticket stub. A trail race's list markers can be the race's painted T blaze. A tracker's buttons can be key caps with their shortcut printed on them. When the domain has nothing to give, say so and make the controls quiet, precise and typographic instead.

## Buttons

Design the anatomy once, as a token set, then derive every variant from it.

1. **Shape** comes from the material: a stamp, a key, a tab, a tag, a pill only when the domain is soft or handheld. Decide radius, stroke and whether it has a body at all (some systems need only underlined words).
2. **Label** is a verb phrase in the users' words: "Reserve this seed", "Play the pattern", "Fly the course". Set it in the system's UI face at a real weight, with optical vertical centring checked at 200%.
3. **Hierarchy:** one primary per view, a secondary, and a quiet text action. They must differ in kind (filled, ruled, bare), not in three shades of one colour.
4. **Affordance** comes from how it is drawn: a hard bottom edge, an inset, a ruled frame, a shadow from the system's single light. Not from a hover lift.
5. **States**, all designed: rest, hover (behind `(hover: hover)`), pressed (moves *in*, never up), focus-visible (a ring drawn in the system's own stroke, offset so it never touches the label), disabled (still legible, with the reason nearby), busy (keeps its width; the label changes to say what is happening), done (only after the work is confirmed).
6. **Size** follows the canon's targets, but the visible body can be smaller than the hit area.

Do not put an arrow icon in every button. An arrow means the button goes somewhere; most buttons do something, and a verb says that better.

## Icons

### When to use icons at all

Icons earn their place where they are faster than words: repeated actions in a toolbar, status at a glance, dense tables, navigation people learn once. On a public page, most icons beside headings and in feature lists add nothing that the heading did not say. Try the section without them first. Numerals, the domain's own symbols, small pictures of the real thing or simply better words are often stronger.

### Native platforms

Use the system set (SF Symbols, Material Symbols, Fluent, the GNOME icon set) and match weight and scale to the adjacent text. This is the platform's grammar, not a stock part. Make it yours through rendering mode, colour, weight and the few custom symbols your product genuinely needs, drawn on the system set's template.

### On the web: draw a family

When icons are needed and the register is composed or louder, draw a small family from the domain. It is less work than it sounds, because a product needs eight to twenty icons, not two thousand.

1. **Write the grammar** in the record: grid (for example 20 or 24), live area, stroke weight relative to the body text's stem, caps and joins, corner radius, fill or outline, how much irregularity, and the one trait that makes the family recognisable (a notch, a cut corner, a hand-cut wobble, a dot terminal, a pixel grid).
2. **Derive the trait from the domain.** A cartographic product might draw icons with the map's stroke and its symbol conventions. A tracker might draw them on a 7 × 7 pixel grid like its font. A seed library might draw them as engraved line work with hatching.
3. **Draw three first:** the hardest (usually an abstract action like "share" or "settings"), the most common, and one with fine detail. Put them beside real text at real size, fix the grammar, then draw the rest.
4. **Build them as inline SVG** with `currentColor`, `stroke-width` as a token, `vector-effect: non-scaling-stroke` when they scale, `aria-hidden="true"` when a label is present, and a real accessible name when the icon is the only content.
5. **Check optical balance:** circles and triangles overshoot the square, every icon reads as the same weight at a squint, and they sit on the text's x-height centre.

### When a library set is right

Large product UIs with a hundred icons can use a library set. Then make it belong: choose a set whose construction matches the system (not by habit the most popular one), set its stroke to the system's stroke token, set its size to the type's cap height or x-height multiple, match line caps and corners to the controls, and draw the handful of icons that are specific to the product yourself. Record the set, the stroke and why. `kern.mjs audit` flags library imports so the choice is always conscious.

### Never

- Icons in tinted circles or rounded squares by default.
- Sparkles for anything AI, a rocket for "launch", a lightning bolt for "fast", a shield for "secure".
- Emoji as icons or status markers.
- Mixed sets, mixed strokes or filled and outlined icons together without a rule.

## Inputs, toggles and the rest

- **Text fields** say what they are for with a visible label, not placeholder text. Their frame comes from the same anatomy as the buttons. Autofill, the caret, selection and the placeholder are styled in the system's colours (`accent-color`, `caret-color`, `::selection`, `:-webkit-autofill`).
- **Toggles, checkboxes and radios** keep their recognisable form and get the system's stroke, radius and accent. A checkbox can be a stamped mark and a radio can be a punched hole, as long as the state reads instantly.
- **Sliders and steppers** for real quantities show the value and its unit, in tabular numerals, and the track can be the domain's own scale (a ruler, an elevation profile, a dosage scale).
- **Tabs and chips** look like the domain's dividers: folder tabs, drawer labels, the stripes on a map key.
- **Cursors:** the default arrow and the pointer on links. A custom cursor only when the page is an instrument (a drawing surface, a scrubber, a 3D view), and it must keep its hotspot exact.
- **Tooltips** are for names of icon-only controls and keyboard shortcuts, not for content people need.

## Verify

At 100% and 200%, check that every icon is from one family and one weight, every button has every state designed, focus is visible on every control, the busy state keeps width, and nothing in the controls could be lifted onto an unrelated product unchanged. Press every control with a keyboard and a pointer. Run `node ../kern/scripts/kern.mjs audit <src>` and resolve every `stock-icons`, `kit-button` and `emoji-icon` finding, or record why it stays.
