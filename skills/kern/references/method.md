# The method

The full version of the steps in [SKILL.md](../SKILL.md). Each step produces something you write in `.kern/record.md`. The record is your working memory across a long task and the thing every specialist reads, so keep it current.

## 0. Ask

Run [the brief](brief.md) before any new design: one round of three to five questions about the picture in their head, references, the one thing, how loud, what they never want and what assets they have. Options are written from this brief, your recommendation first, with "you decide" always available. Write the answers under **Brief** in the record, marked **user**.

Everything after this step derives from their answers first and your judgment second. If they described a look, ground and thesis make *that look* specific and finished; they do not replace it. If they said "you decide", the method runs exactly as below.

## 1. Locate

Write one line for each:

- **Surface:** marketing page, product app, dashboard, desktop app, phone app, watch, TV, terminal, deck, email, document.
- **Platform and stack:** web/React, Electron, Tauri, SwiftUI, UIKit, Compose, Flutter, React Native, WinUI, GTK, a terminal library, and so on.
- **Device and posture:** a laptop at a desk, a phone in one hand while walking, a wall display seen from four metres, a projector in a meeting room, a watch glanced at for two seconds.
- **Frequency and stakes:** visited once, used weekly, or worked in all day? Is a mistake an annoyance, a lost sale or a medical error?

These four lines decide most of the grammar before taste enters. A tool used all day needs density, keyboard paths and calm. A page visited once needs a strong first impression and one clear action. A watch needs one fact at a glance. Load the platform specialist now.

## 2. Ground

Collect, at real length:

- **The specimen.** The longest important heading, a normal paragraph, the longest label, the biggest and smallest numbers, a real record, a real error message, names in the languages and scripts the product supports.
- **The people.** Who they are, what they are doing just before and just after, what they fear getting wrong, and what words they use. The words matter most, because the product's labels should be their words.
- **The material culture.** These are the objects, documents, tools, places, marks and rituals of the domain. A veterinary clinic has dosage charts, kennel cards, a weighing scale, appointment carbon books and the smell of disinfectant. A synthesiser maker has patch cables, front-panel legends, knurled knobs and oscilloscope traces. Collect at least five artefacts.
- **The constraints.** Brand assets, an existing design system, accessibility requirements, performance budgets, and things the user has explicitly asked for or ruled out.

Write the ten to fifteen most specific facts as a list. This list is the most important input to everything that follows. Generic facts ("users want speed") produce generic design. Specific facts ("dispatchers keep one eye on the radio and one hand on the keyboard") produce specific design.

## 3. Tension

Name the two forces the design must hold together. Examples:

- A field-service app: *dense enough for a technician who knows it cold, calm enough for one on their first day*.
- A pension calculator: *serious enough to trust with your retirement, light enough that a 25-year-old finishes it*.
- A DJ set planner: *nocturnal and expressive, but readable in a dark booth at 2 a.m.*

If you cannot find a tension, the brief is probably simple. That is fine, but say so, and keep the design correspondingly quiet.

## 4. Thesis

*"This should feel like [something concrete from the ground], because [it resolves the tension]."*

- *"The dispatch board should feel like the laminated wall map in the depot, because it has to hold forty moving things while staying readable from across the room."*
- *"The pension calculator should feel like a well-kept paper passbook, because a quiet, tabular, stamped record is how people already trust a bank with money."*

Run the **swap test**: replace the product with its nearest competitor and see if the thesis still works. If it does, it describes the category, not this product. Run the **adjective test**: rewrite any sentence that depends on clean, modern, sleek, premium, minimal, bold or elegant.

The thesis is not decoration and is never shown to users. It is the reason behind every decision in step 6.

## 5. Median

Write this brief's median in the record, as specifically as you can: *"An average model would ship Inter, a white background with an indigo accent, a 240 px icon sidebar, KPI cards across the top, rounded cards with 12 px corners and soft shadows, a default title bar, and fade-ins."* Use [median](median.md) to prompt yourself.

From now on, every median element is presumed wrong as a default. Keep one when the person asked for it (mark it **user**), or when the thesis independently arrives at it, and record the reason. For example: *"SF Pro and the system list style: this is a macOS utility and native text is the thesis."*

## 6. Register

Decide how loud the product should be before deriving any token, because the register changes what the tokens are for. If the person answered the brief's "how loud" question, that is the register; otherwise follow [the register](register.md): answer the five questions (experience or utility, frequency and state, how sensory the subject is, what the domain's best artefacts look like, what you can make convincing), name the register, and go through the richness inventory.

Write it like this:

```markdown
## Register
Expressive. People come for the race itself; the domain's best artefacts are race posters and topo maps; the subject is terrain.
Materials:
- Live 3D: the course terrain with the route on it. Turning it shows the climbs. Relevance: own material, shows elevation a map cannot, procedural terrain is convincing.
- Type as image: bib numbers at poster scale.
- Motion: the camera follows the profile scrubber; checkpoints rise in sequence.
- Photography: none. No real photographs of a fictional course exist; the terrain replaces them.
- ASCII, sound, character: no. Not the product's material.
```

Each material gets its relevance answer. A material you leave out gets its reason. Then spend the register in every section, not only the first screen.

## 7. Derive the system

Derive each token from the thesis and the ground. Write the source and the reason beside it. The craft specialists hold the detail for each.

**Colour** ([kern-color](../../kern-color/SKILL.md)). Name a **source**, which is a real object or place in the domain, and take the palette's character from it: hue, saturation, how many inks, how warm the neutrals are. *"Source: the depot map's laminated buff paper, its black road lines and the red route marker."* Build neutrals and accents as OKLCH ramps (`kern.mjs palette`) and check every text and boundary pair for contrast (`kern.mjs contrast`). Decide the colour stance (whether colour fills whole fields or appears as small accents) and how much of each screen the accent may occupy.

**Type** ([kern-type](../../kern-type/SKILL.md)). Start from the reading conditions: distance, duration, density, script coverage and numerals. Then consider the voice: what would this domain's signage, documents or instruments be set in? Generate three candidates of different kinds, set the real specimen in each, and choose in the render. On native platforms, the system face is often the right choice for UI text, and identity goes into a display or content face.

**Space and density.** Choose a base unit and a scale. Frequency sets density: all-day tools are compact (rows of 28–36 px on desktop), occasional flows are comfortable, and marketing pages pace by screen. Write the row height, the control height, the gutters and the section rhythm.

**Shape.** Radius and stroke come from the material: crisp and square for instruments and ledgers, soft for objects meant to be held, and on Apple platforms the system's own continuous corners. Use one stroke weight for icons and boundaries, and nest corners concentrically.

**Depth.** Decide the elevation model: flat with tone steps, the platform's materials, or a single light source with real shadows. Pick one and apply it everywhere.

**Motion** ([kern-motion](../../kern-motion/SKILL.md)). Derive the physics from the product. A precision tool moves fast and exactly. A calm reading app moves slowly with long settles. A playful consumer app can overshoot, on content but not on chrome. Write the duration and easing tokens and the one signature motion, if there is one.

**Icons and controls** ([kern-controls](../../kern-controls/SKILL.md)). Find the domain's own instruments, marks and notation, and derive the button anatomy, the icon grammar and the input styles from them: a trail blaze, a tape transport key, a rubber stamp, a seed-drawer label. On native platforms, start from the system set and tune it. Never ship a component kit's defaults on a page whose register is composed or louder.

**Chrome.** Decide how the platform frame meets the content: the title bar treatment and toolbar style on desktop, system bar behaviour and navigation bar appearance on mobile, the browser `theme-color` and scrollbar colour on the web. Never leave chrome as a default ([canon 6](canon.md)).

**The defended risk.** Name the one decision a cautious designer would not have made. It must follow from the thesis. Examples: *"The route marker red is used as a full-bleed surface for the active job, not as a small badge."* *"Numerals are set in a condensed face at 2× body size in every table."*

Record the **fingerprint**: platform, structure, register, rich materials, type families, colour source and stance, density, shape, controls, motion signature, imagery medium and the risk. Then run:

```bash
node <kern>/scripts/kern.mjs ledger check --fingerprint .kern/fingerprint.json
node <kern>/scripts/kern.mjs ledger add --fingerprint .kern/fingerprint.json
```

`<kern>` is this skill's folder. `check` compares the fingerprint against every project on this machine and flags near-duplicates. When an unrelated product scores too close, change at least three axes and record why. Related work for the same brand is supposed to match.

## 8. Compose

- **Hardest screen first.** Start with the densest table, the longest form, the most stateful view or the screen with the most real content. Easy screens follow from a resolved hard one, but the reverse never holds.
- **One dominant element per view**, decided before components.
- **Real content in place** from the specimen.
- **Every state for that screen** before the next screen: empty, loading, error and overflow.
- **Each size as its own composition:** phone, tablet, narrow window, wide window, as the platform requires.
- **Chrome integrated from the first build**, not added at the end.

## 9. Critique and kern

Render and look ([kern-critique](../../kern-critique/SKILL.md)): score, fix the three largest problems, and look again, up to three rounds. Then do the kerning pass from [the eye](eye.md#seeing-finish). Run `kern.mjs audit` on the source for measurable tells and chrome integration, and fix or defend each finding.

## Three runs of the same method

The method does not produce a look. These three products went through the same steps.

- **A desktop app for a small vineyard to log harvest weights.** Register: silent. Ground: refractometer readings, crate tags with grower numbers, a weighbridge ticket printer, cold wet mornings, gloves. Tension: fast entry with cold hands, but records that must stand up in a cooperative dispute. Thesis: *the weighbridge ticket*. Result: large tabular numerals, a narrow receipt-like record column, high-contrast ink on an off-white that matches the ticket stock, oversized hit areas despite being a desktop app, the toolbar merged into the ticket header, and no colour except the stamp-red "disputed" state.
- **A website for a night-time radio show that plays field recordings.** Register: expressive, through sound and one live element rather than pictures. Ground: microphones in the rain, the hour the show airs, listeners on night shifts, recordings named by place and time. Tension: atmospheric, but the next broadcast time must be readable in a second. Thesis: *a station clock in a dark studio*. Result: a dark blue-black field, one enormous countdown as the dominant element, recordings listed as place and time pairs in a mono-width index, a single live element (what is on air right now), and no imagery beyond a waveform of the current recording, drawn live from the audio while it plays.
- **A website for a sneaker re-issue drop.** Register: spectacular. Ground: a 1987 trail runner, its original catalogue page, suede and mesh swatches, the box's colour-blocked label, a timed release. Tension: hype, but a buyer has to read the sizes and the time in one glance. Thesis: *the shoe box opened on a shop counter*. Result: a real-time 3D model the visitor turns over to see the outsole pattern, material swatches photographed flat at 1:1 scale, the release countdown set like the box label, and nothing else animated.

Do not reuse any of these outcomes. They show reasoning, not templates.
