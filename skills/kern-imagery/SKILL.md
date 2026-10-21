---
name: kern-imagery
description: Kern specialist for visual material on any platform, including photography direction, product captures, generated images, archival and open-collection pictures with credits, illustration systems, icon sets and app icons, SVG drawing, live 3D (Three.js, RealityKit, SceneKit), ambient backgrounds, mascots and characters, crops and fallbacks. Use it whenever a design needs imagery, illustrations, icons, a hero visual, a 3D scene, an animated background or a character, or when the current visuals look weak, generic or placeholder-like.
---

# Kern Imagery

The strongest visual is almost always the product's own material: its interface, its objects, its place, its people, its work. Imagery shows the thing. It does not decorate the absence of the thing.

## Where pictures come from

Work down this list and record each prominent picture's source in the record:

1. **The project's own:** product photographs, the place, the team (with consent), the work and real interface captures. An ordinary photograph of the real thing beats a beautiful photograph of something else.
2. **Generated,** when an image tool is available. Write a photographer's brief (subject, angle, lens, light, background, crop, "no text"), make the most important image first, and match the rest to its light and grade. Never generate pictures that pose as the client's real product, team, customers or premises.
3. **Real pictures of the subject's world from open collections:** Wikimedia Commons, Openverse, museum open-access collections and national archives. Examples are old maps of the street, engravings of the trade, botanical plates and objects of the kind. Search with terms from the record's material culture, not from the category. Open every result before using it. Check the licence, download the file into the project and credit it on the page. Never present a found picture as the client's own.
4. **Drawn in code,** for what no honest picture exists of: diagrams, objects, interface fragments, all in one consistent graphic language.
5. **Type and colour alone,** done deliberately, with the reason recorded.

## Making pictures belong together

- **Use one grade and one light** across the photography, with a consistent colour temperature, contrast and saturation. A mixture of stock photographs looks like stock.
- **Use deliberate crops:** a small set of aspect ratios, with crops that place the subject deliberately and leave appropriate headroom. Check them at every breakpoint with `object-position`, and use art-directed sources (`<picture>`) when the crop has to change.
- **Engineer them properly:** responsive sources, modern formats (AVIF or WebP), reserved dimensions, lazy loading below the fold, never lazy-loading the critical first image, and meaningful alt text (or empty alt text for decoration).

## Illustration systems

Before drawing a family of illustrations, define its grammar: optical size, contour weight, caps and joins, fill-to-outline balance, the palette subset, the level of detail, perspective and how much deliberate irregularity to allow. Draw three pieces, compare them side by side at real size beside their text, and fix the grammar before drawing the rest. The style comes from the thesis. Use technical line work for a precision tool and loose ink for a craft brand, and never pick one by habit.

## Icons

- **On native platforms,** use the system set (SF Symbols, Material Symbols, Fluent icons) matched to the adjacent text's weight. Custom icons must match the system set's optical size and stroke.
- **On the web,** use one set with one stroke weight, one corner style and one grid (typically 24 with a 2 px live area). Do not mix sets. Do not put icons in tinted circles by default, and do not use emoji as icons.
- **App icons:** one simple, specific silhouette that reads at the smallest size. Design the platform variants (dark, tinted and clear on iOS, adaptive and monochrome on Android, the macOS icon shape). Never use a generic glyph on a gradient.

## Spectacle

Ambient backgrounds, live 3D, scroll scenes and characters are **spectacle**. Most products get none or one. Choose one yourself, without being asked, when it passes the tests below. Leave it out when it does not.

### Ambient and animated backgrounds

Use one only when it is **the product's own material moving**, such as weather over a forecast, a tide line for a surf school, real network traffic for an infrastructure tool, or ink spreading for a calligraphy studio. All of these must hold:

- **It means something here.** If you could move it to an unrelated site unchanged, it fails.
- **It is drawn in the page's own language:** the same palette, stroke and grain.
- **It stays behind the content.** Text keeps full contrast in every frame, and nothing intercepts clicks.
- **It is calm, slow and low in contrast,** noticed on the second look rather than the first.
- **It is bounded to one region,** with one per product at most.
- **It is polite.** It pauses offscreen, shows a composed still under reduced motion and stays smooth on a mid-range phone.

### Live 3D

Use live 3D only when **depth carries information or pleasure a flat image cannot**. All of these must hold:

- **The subject is spatial:** a product people want to turn over, an assembly, a configurator, a room, terrain, a molecule.
- **Moving the viewpoint reveals something** (the back, the fit, the scale).
- **You can make it convincing,** with a credible model, coherent lighting and materials, and a considered camera. Deliberate low-poly geometry is fine when it is the art direction.
- **It is the subject itself, not filler beside a headline.**
- **It is engineered properly.** It uses a real renderer, has a poster fallback, caps the pixel ratio, renders on demand, pauses offscreen, cleans up its resources, and keeps its controls accessible in the DOM.

Bad examples include a glass torus on a fintech hero, a spinning sphere for "AI" and 3D tilt on every card.

### Characters and mascots

Add one when the user asks for one or the brand is clearly character-led. Give it a role (onboarding guide, empty-state companion, feedback beside an operation) and place it inside that task, never parked beside a headline. Derive the identity from the product's world, because a garden app's character and a finance app's character should share nothing. Rig it with real pivots (eyes lead, body follows, and a reaction settles into a held pose). Tie its states to real events, with success brief and errors supportive. Provide a still mode for reduced motion and keep status in text.

## Verify

Look at every picture slot in every screenshot, at every breakpoint and in every theme. Confirm each image loaded, is cropped deliberately, is sharp, is credited where found, and sits in one family with the others. For 3D, check the poster fallback, a slow load and an orientation change. For characters, check every state at real size.
