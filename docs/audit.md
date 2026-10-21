# Audit: from the previous suite to Kern

This is a record of why Kern exists, what the previous design suite in this repository did wrong, and how the two compare. The previous suite is referred to here as **v0**. This file and the installer's clean-up list are the only places its folder names appear.

## What v0 was

v0 had twelve web-only skills: a coordinator, ten specialists and a launch checklist. Its public-page specialist redistributed a third-party toolkit unmodified. That toolkit contained a library of 20 researched page directions, type and palette sets, section blueprints, a picture-search script, a source linter and a headless-browser inspector. The repository came to 2.9 MB in 103 files, most of it the toolkit's JSON library and a vendored Three.js build.

## Findings

**1. It gave the model paths to pick from, so results repeated.** For public pages, a script dealt three of the same 20 directions and the model chose one. Every install shares that library, so every model ends up choosing among the same 20 layouts. Outside public pages, the guidance told the model to "sketch three directions" from fixed axis menus (11 silhouettes, 8 colour stances, 10 imagery media and so on), which is again a menu. On top of that, the hard house rules forced the same look onto everything: no gradients, no shadows, no mono, no hairlines, at least four photographs, at least eight moving elements, display type around 8vw. Even different directions converged on one aesthetic: big type, flat colour and a photo-heavy layout.

**2. The `.taste-skill` folder.** The vendored scripts were never renamed. The direction script writes `.taste-skill/` in the project and `~/.taste-skill/history.json` in the home folder, the inspector writes `.taste-skill/inspect/`, the linter's ignore comment is `taste-skill-ignore`, and the picture search sends a `taste-skill-assets` user agent. That is why a folder named after another project kept appearing in your work, for example `m4labs-site/.taste-skill/`. That folder is safe to delete.

**3. It was web only.** There were no mentions at all of title bars, Electron, Tauri, SwiftUI, iOS, Android, watchOS or terminals. Desktop apps got web-page guidance, which is how they ended up with default title bars over custom-coloured apps.

**4. It contradicted itself.** The taste guide said taste "is not a list of banned effects", while the gallery's first tier was a list of banned effects enforced as FAILs. "Motion is earned" sat beside "a page that does not move reads as a mock-up; fewer than eight moving elements FAILs". The suite also told the model never to reuse its examples while shipping two polished examples for it to look at.

**5. Its principles were scattered.** Good principles existed, but they were spread across twelve files and buried in long paragraphs, with no single canon to re-check before handing back. The "decide, do not interview" paragraph was repeated in eight skills.

**6. It was heavy.** A web build's load path was about 153 KB of Markdown before any script output.

**7. Branding and distribution.** The README cloned from a different account than the repository's own, the installer only supported Codex, and the attribution and licence notices belonged to the toolkit rather than to M4 Labs.

## What Kern does instead

- **The taste belongs to the model.** There is no direction library, no palette list and no font list. The [method](../skills/kern/references/method.md) derives every decision from the brief's own specific facts: locate, ground, tension, thesis, median, system, compose, critique. Choices that matter go through [the eye's](../skills/kern/references/eye.md#making-a-single-decision-with-taste) procedure: generate your own candidates, discard the first, and choose in the render.
- **Anti-convergence.** The model writes the median for this brief and treats it as presumed wrong. Every design names one defended risk. The **ledger** (`~/.kern/ledger.jsonl`) fingerprints each project, and `kern ledger check` flags near-duplicates of unrelated past work.
- **[The canon](../skills/kern/references/canon.md):** 17 principles, short enough to hold in mind and re-checked before every handback. Number 6 is *chrome belongs to the content*.
- **Every surface:** 16 skills covering web, product, dashboards, desktop (with title-bar recipes for 10 frameworks), iOS, Android, watch, TV, car, kiosk, widgets, menu bar, extensions, visionOS, terminals, slides, email, documents and print.
- **Measuring tools that never choose.** `kern.mjs` has OKLCH ramps from a source colour you name, WCAG and APCA contrast, the ledger, and an audit that catches median tells, missing `theme-color`, placeholders and desktop chrome omissions in Electron, Tauri, SwiftUI, WinUI and Android.
- **The Kern Score:** a ten-criterion rubric weighted by surface, with caps (a default title bar caps desktop work at 6.0) and calibration.
- **Distribution:** a Claude Code plugin marketplace and an installer for Claude Code and Codex that can back up and remove v0 (`--remove-legacy`). A web build's load path is about 88 KB, and the repository is about 0.18 MB.

## Ratings

The suites were scored as design systems for AI agents on ten criteria, 0–10, from reading both in full and from measurements of the repository. These are expert ratings, not yet blind output tests. [evals/](../evals/README.md) gives the protocol for measuring output quality and divergence.

| Criterion | v0 | Kern | Evidence |
|---|---|---|---|
| Taste ownership (judgment, not menus) | 4.0 | 8.0 | v0 dealt 3 of 20 fixed directions; Kern has no library and derives from the brief |
| Output divergence | 4.0 | 7.5 | v0's shared library and hard house look converge; Kern has brief facts, median negation and the ledger *(not yet measured)* |
| Principles that are never forgotten | 6.0 | 8.5 | Scattered across 12 files versus one 17-point canon, re-checked every time |
| Platform breadth | 2.5 | 9.0 | Web only, with zero desktop or mobile mentions, versus 16 surfaces |
| Desktop title-bar integration | 0.0 | 9.0 | Absent versus a canon law, recipes for 10 frameworks, audit checks and a score cap |
| Internal consistency | 4.5 | 8.0 | Ban list versus "not a ban list"; motion earned versus motion required |
| Verification tooling | 7.5 | 7.0 | v0's headless inspector was strong; Kern's audit is static, and rendering is checked by eye with the critique |
| Context efficiency | 4.0 | 8.0 | About 153 KB versus about 88 KB on a web build, with no 2.6 MB library |
| Brand hygiene | 3.0 | 9.0 | `.taste-skill` folders and the wrong clone URL versus Kern names only, enforced by the validator |
| Distribution and developer experience | 5.0 | 8.5 | Codex-only installer versus a Claude Code plugin, a dual installer, legacy clean-up and tests |
| **Overall (mean)** | **4.1** | **8.3** | |

### What Kern gave up

- **The headless-browser inspector**, which measured headline line counts and real font loading at three widths. Kern's critique asks the agent to look at screenshots it takes with whatever browser tool it has. A rendered inspector is the clearest next tool to build.
- **The open-collection picture search.** Kern describes the sources and the crediting rules, but has no script that searches them.
- **The 247-site study's numbers.** Kern keeps only the principles that generalise beyond award-gallery websites.

## Kern 1.1: the register, controls and richness

An audit of Kern 1.0 on 21 October 2026 found that it had fixed convergence on *style* but not on *volume*. Its method removed the median and then mostly asked for restraint, so unrelated products still came out at the same polite middle loudness.

**Findings**

1. **Restraint was treated as taste.** Spectacle was framed as "most products get none or one"; looping motion and ASCII art appeared only as tells; nothing ever asked whether a product was too *quiet* for its subject. The eye named the avoidance aesthetic but no step prevented it.
2. **No decision about loudness.** The method derived colour, type and space, but never decided how much picture, motion, depth or play a product should carry. A festival and a tax tool could differ only in accent colour.
3. **Controls were two bullets.** Icons and buttons, where products most visibly converge (one line-icon set, one kit button with an arrow), had no craft, no derivation and no audit rule.
4. **The rich toolbox was missing.** Motion covered feedback and entrances, but not text-mode and ASCII animation, kinetic type, scroll-driven CSS, shaders, generative data art or 3D camera work. Imagery had no image treatments and no recipe for actually sourcing open-collection pictures.
5. **The examples were both quiet.** A desktop utility and a drawn chart: good work, but they modelled only the low end of the dial.

**Changes**

- **[The register](../skills/kern/references/register.md):** a new reference and a new method step (6). The agent reads loudness from the brief (experience or utility, frequency and state, how sensory the subject is, what the domain's best artefacts look like, what it can make convincing), names a register from silent to spectacular, goes through a richness inventory of thirteen materials, and runs every rich element through a three-question relevance test. Canon 16 makes it a principle: the register fits the subject, and a sensory subject shipped silent is a defect.
- **[kern-controls](../skills/kern-controls/SKILL.md):** a new specialist for icons, buttons, inputs, toggles and cursors, derived from the domain's own instruments, marks and notation, with a procedure for drawing an icon family, rules for when a library set is right and how to tune it, and every state.
- **[kern-motion](../skills/kern-motion/SKILL.md):** motion by register, a toolbox of fourteen techniques each with when it fits, a full craft section on text-mode and ASCII animation (real grids, character ramps, braille, frame rate as voice, accessibility), loops allowed only when the thing really runs, and "too little for the subject" as a generated-looking failure.
- **[kern-imagery](../skills/kern-imagery/SKILL.md):** a Commons sourcing recipe with licence checks, eight image treatments tied to printing technologies, generative and data art, and a much deeper live-3D section (tool choice, light, material, camera, atmosphere, interaction, engineering).
- **Critique and audit:** new passes for register and controls, caps for stock icon sets, register mismatch, irrelevant spectacle and animation without a reduced-motion still. `kern.mjs audit` now flags icon-library imports, kit button classes, emoji icons, decorative loops, one entrance repeated six or more times, animation with no reduced-motion handling (FAIL), uncapped WebGL pixel ratio and WebGL that never pauses. The ledger fingerprints register, materials and controls.
- **Examples rebuilt** at three different registers: [Rowtrack](../examples/rowtrack/) (text-mode and sound), [Skarvet 58](../examples/skarvet/) (live 3D terrain) and the [Wren Street Seed Library](../examples/seed-library/) (archival plates and paper). Their fingerprints are 7–10% similar.

| Criterion | Kern 1.0 | Kern 1.1 | Evidence |
|---|---|---|---|
| Output divergence | 7.5 | 8.5 | Register and materials now differ by brief, and the ledger compares them *(still not blind-measured)* |
| Range (quiet to spectacular) | 5.0 | 8.5 | No loudness decision versus a register step, a richness inventory and a relevance test |
| Controls and icons | 3.0 | 8.0 | Two bullets versus a specialist, a derivation procedure, audit rules and caps |
| Motion craft | 6.5 | 8.5 | Feedback and entrances versus a toolbox with text-mode, shaders, scroll-driven and 3D camera craft |
| Imagery and 3D craft | 6.5 | 8.5 | Source list versus a sourcing recipe, treatments, data art and convincing-3D guidance |
| Verification tooling | 7.0 | 7.5 | Seven new audit rules, including the first FAIL for motion safety |
| Examples | 7.5 | 8.5 | Two quiet examples versus three at different registers, all rich elements verified in a browser |

## Kern 1.2: the brief

Kern 1.0 and 1.1 told the agent never to interview the person about taste. That kept the agent from offering style menus, but it also meant the agent never learnt what the person already pictured. A design that is distinctive but is not what they imagined is still a miss, and the person's own picture is the most specific input a design can have.

**Changes**

- **[The brief](../skills/kern/references/brief.md):** a new method step 0. Before any new design, redesign or big restyle, the agent asks one round of three to five short questions: the look or feel they picture, references and what they like about them, what someone should do or feel in ten seconds, how loud it should be, what they never want, and what assets they have. Options are written from the brief rather than a catalogue, the recommendation comes first, and "you decide" is always available. The round is skipped for narrow fixes, for anything already answered in the request, repository or record, and when the person says "just build it".
- **The person outranks Kern.** Answers are recorded as **user** decisions. If the person asks for something on the median list, Kern builds it at full craft with real material behind it, and may raise one concern in one sentence. The register follows their "how loud" answer.
- **Critique judges fit first.** User-chosen median elements no longer lower Distinctiveness or trigger the median caps; ignoring what the person described caps Thesis at 5.
- **Hand-back** says which decisions were theirs and which were Kern's, and asks whether it matches what they pictured.
- Two new eval briefs test both paths: asking a good first round, and respecting a "just build it" request for a style Kern would not have chosen.
