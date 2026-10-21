---
name: kern-imagery
description: Kern specialist for visual material on any platform, including photography direction, product captures, generated images, archival and open-collection pictures with credits, image treatments (duotone, halftone, dither, grain, overprint, cut-outs, collage), illustration systems, app icons, SVG drawing, generative and data art, live 3D (Three.js, model-viewer, CSS 3D, RealityKit, SceneKit), ambient backgrounds, mascots and characters, crops and fallbacks. Use it whenever a design needs pictures, a hero visual, a 3D scene, an illustration, an animated background or a character, or when the visuals look weak, flat, generic, stock or placeholder-like.
---

# Kern Imagery

The strongest visual is almost always the product's own material: its interface, its objects, its place, its people, its work, its data. Imagery shows the thing. It does not decorate the absence of the thing.

And absence is the commoner failure. A page about food, places, objects, events or craft that shows no pictures is not restrained, it is empty. Decide the [register](../kern/references/register.md) first, then give the page as much real material as that register calls for. Icons and controls live in [kern-controls](../kern-controls/SKILL.md).

## Where pictures come from

Work down this list and record each prominent picture's source in the record:

1. **The project's own:** product photographs, the place, the team (with consent), the work and real interface captures. An ordinary photograph of the real thing beats a beautiful photograph of something else.
2. **Generated,** when an image tool is available. Write a photographer's brief (subject, angle, lens, light, background, crop, "no text"), make the most important image first, and match the rest to its light and grade. Never generate pictures that pose as the client's real product, team, customers or premises.
3. **Real pictures of the subject's world from open collections:** Wikimedia Commons, Openverse, museum open-access collections (the Met, Rijksmuseum, Smithsonian, the British Library on Commons) and national archives. Old maps of the street, engravings of the trade, botanical plates, patent drawings, catalogue pages, objects of the kind. See [sourcing from Commons](#sourcing-from-commons).
4. **Drawn in code,** for what no honest picture exists of: diagrams, maps, objects, terrain, interface fragments, all in one consistent graphic language.
5. **Generated from data:** the route, the waveform, the weather, the growth curve, drawn as the picture itself.
6. **Type and colour alone,** done deliberately, with the reason recorded.

### Sourcing from Commons

Search with the words of the record's material culture, in the domain's own languages, not with the category ("Vilmorin-Andrieux 1904" finds engraved vegetable plates; "vegetables illustration" finds clip art). With network access:

```bash
# search files
curl -s "https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&format=json&srlimit=40&srsearch=Vilmorin-Andrieux+filetype:bitmap"
# licence, author, size and a resized URL for chosen files
curl -s "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600&format=json&titles=File:<name>"
```

Read `LicenseShortName` and `Artist` for every file. Use public domain, CC0, CC BY and CC BY-SA (with attribution and share-alike noted). Download into the project with a descriptive user agent, never hotlink, and credit each picture on the page with its title, author or source, licence and a link to its file page. Never present a found picture as the client's own.

## Making pictures belong together

- **One grade and one light** across the photography, with a consistent colour temperature, contrast and saturation. A mixture of stock photographs looks like stock.
- **One family for found images:** one collection, one period or one printing technique, or a shared treatment that unifies them.
- **Deliberate crops:** a small set of aspect ratios, crops that place the subject deliberately with appropriate headroom, and details cropped tight enough to become a different picture. Check them at every breakpoint with `object-position`, and use art-directed sources (`<picture>`) when the crop has to change.
- **Engineer them properly:** responsive sources, modern formats (AVIF or WebP), reserved dimensions, lazy loading below the fold, never lazy-loading the critical first image, and meaningful alt text (or empty alt text for decoration).

## Image treatments

A treatment turns a set of pictures into one family and gives them the product's voice. Choose it from the domain's own printing or capture technology, never because it is in fashion:

| Treatment | Comes from | Build with |
|---|---|---|
| **Duotone and tritone** | Two-ink printing: posters, packaging, maps | SVG `feColorMatrix` and `feComponentTransfer`, or pre-processed files |
| **Halftone** | Newspapers, comics, cheap print | A canvas or shader dot screen, or CSS `mask` with a radial pattern |
| **Dither** | Early computers, receipts, thermal and e-ink printers | Ordered (Bayer) or error-diffusion dithering on a canvas |
| **Grain** | Film, risograph, paper | A small real grain texture, not random noise on every pixel |
| **Overprint** | Risograph and screen printing | `mix-blend-mode: multiply` with slightly misregistered layers |
| **Cut-out** | Collage, catalogues, product packaging | Pre-masked PNG or WebP, or `clip-path` around the subject |
| **Engraving on paper** | Botanical, technical and natural history plates | The plate itself on a field that respects its paper, `mix-blend-mode: multiply` on light grounds |
| **Contact sheet** | Photography, film, archives | A strict grid of frames with frame numbers and marks |

One treatment per product, applied consistently, tested on the worst picture in the set.

## Illustration systems

Before drawing a family of illustrations, define its grammar: optical size, contour weight, caps and joins, fill-to-outline balance, the palette subset, the level of detail, perspective and how much deliberate irregularity to allow. Draw three pieces, compare them side by side at real size beside their text, and fix the grammar before drawing the rest. The style comes from the thesis: technical line work for a precision tool, loose ink for a craft brand, cartographic symbols for a place, engraving for a heritage subject. Never pick one by habit.

## App icons

One simple, specific silhouette that reads at the smallest size. Design the platform variants (dark, tinted and clear on iOS, adaptive and monochrome on Android, the macOS icon shape). Never use a generic glyph on a gradient.

## Generative and data art

When the product has real data with a shape, the data is often the best picture: the race route over terrain, the year's tides, a song's waveform, a city's bike traffic, the growth of a seed bank. Draw it with the system's palette and stroke, label it honestly, and let it carry the hero when the register allows. Generative patterns with no data behind them are decoration, and need the same relevance test as any ambient background.

## Live 3D

Use live 3D when **depth carries information or pleasure a flat image cannot**. All of these must hold:

- **The subject is spatial:** a product people want to turn over, an assembly, a configurator, a room, terrain, a molecule, a building, a vehicle.
- **Moving the viewpoint reveals something** (the back, the fit, the scale, the climb).
- **You can make it convincing.** A credible model or a procedural subject you can generate well (terrain, crystals, architecture from a plan, a molecule from its data), coherent lighting and materials, and a considered camera. Deliberate low-poly, contour-line, wireframe, point-cloud or ASCII-rendered 3D is fine when it is the art direction.
- **It is the subject itself, not filler beside a headline.**

### Choosing the tool

- **`<model-viewer>`** for a single product model in glTF with orbit, AR and a poster, when you have the model.
- **Three.js** (from an import map pinned to an exact version) for terrain, procedural subjects, custom shaders, scripted cameras and anything interactive beyond orbiting.
- **CSS 3D transforms** for flat things in space: cards, pages, packaging nets, a box opening.
- **SVG isometric or axonometric drawing** when a precise diagram of a spatial thing reads better than a rendered one.
- **RealityKit, SceneKit or Filament** on native platforms.

### Making it convincing

- **Light:** one key light that matches the page's implied light, a soft fill or an environment map, and real shadows on whatever the subject sits on. Use ACES or AgX tone mapping and an sRGB output.
- **Material:** physically based materials with believable roughness. Nothing is perfectly smooth or perfectly matte. Colour comes from the system palette.
- **Camera:** a considered focal length (35–50 mm equivalent for objects, wider for landscapes), a framed default view that works as a still, damped controls with limits so the subject cannot be lost, and scripted moves that ease in and out.
- **Atmosphere:** fog or depth haze for landscapes, a ground plane or contact shadow for objects. Nothing floats in a void unless floating is the point.
- **Interaction:** what can the visitor do that teaches them something? Scrub along the route, explode the assembly, change the material, compare sizes. Give it a DOM control as well as the gesture.

### Engineering

Cap the pixel ratio (`Math.min(devicePixelRatio, 2)`, lower on phones), render on demand or pause offscreen and in hidden tabs, keep a still poster that is a good picture in its own right (shown before load, on WebGL failure and under reduced motion), dispose of geometries, materials and textures on unmount, keep the bundle small, and keep every control reachable by keyboard with a text description of what the scene shows. Test on a throttled mid-range phone.

**Bad examples:** a glass torus on a fintech hero, a spinning sphere for "AI", 3D tilt on every card, a low-quality model of a product that would look better photographed.

## Ambient and animated backgrounds

Use one only when it is **the product's own material moving**, such as weather over a forecast, a tide line for a surf school, real network traffic for an infrastructure tool, or ink spreading for a calligraphy studio. All of these must hold:

- **It means something here.** If you could move it to an unrelated site unchanged, it fails.
- **It is drawn in the page's own language:** the same palette, stroke and grain.
- **It stays behind the content.** Text keeps full contrast in every frame, and nothing intercepts clicks.
- **It is calm, slow and low in contrast,** noticed on the second look rather than the first.
- **It is bounded to one region,** with one per product at most.
- **It is polite.** It pauses offscreen, shows a composed still under reduced motion and stays smooth on a mid-range phone.

## Characters and mascots

Add one when the user asks for one or the brand is clearly character-led. Give it a role (onboarding guide, empty-state companion, feedback beside an operation) and place it inside that task, never parked beside a headline. Derive the identity from the product's world, because a garden app's character and a finance app's character should share nothing. Rig it with real pivots (eyes lead, body follows, and a reaction settles into a held pose). Tie its states to real events, with success brief and errors supportive. Provide a still mode for reduced motion and keep status in text.

## Verify

Look at every picture slot in every screenshot, at every breakpoint and in every theme. Confirm each image loaded, is cropped deliberately, is sharp, is credited where found, and sits in one family with the others. For 3D, check the poster fallback, WebGL disabled, a slow load, a throttled phone and an orientation change, and turn it yourself. For characters, check every state at real size.
