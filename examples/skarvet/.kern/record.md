# Skarvet 58 — Kern record

## Locate
Surface: public race website
Platform / stack: static HTML, CSS, an ES module; Three.js 0.160 from an import map
Device and posture: runners deciding whether to enter, often on a phone; later, the same runners planning splits at a desk
Frequency and stakes: visited a few times a year; the stakes are entry and safety (cut-offs, kit)

## Ground
Specimen: "58 km", "2 590 m", "Leave by 12:45", "Djupdalen", "Waterproof jacket with taped seams", "NOK 1 450"
People: experienced mountain runners. Before: comparing races. After: training for the climb profile. Fear: missing a cut-off, the descent, the weather. Their words: climb, cut-off, checkpoint, drop bag, mandatory kit, ballot.
Material culture: the trail association's painted red T on stones and cairns; red signposts with white capitals; topographic maps with brown contours and blue lakes; the plaster relief model on the hut wall; bib numbers; elevation profiles printed on the back of the bib; kit checks at registration
Constraints: kern (fictional race). Every number must come from one source.
Most specific facts:
1. The course is one loop of one massif, from a hut by a lake.
2. Runners study the profile more than the map.
3. Cut-offs are leave-by times, not arrival times.
4. Trails are marked with red T's painted on rocks.
5. Signposts are red boards with white capitals and a pointed end.
6. Mandatory kit is checked item by item.
7. Entry is by ballot with a qualifier.
8. The highest point is a summit cairn; most retirements happen in the deepest valley.

## Tension
Spectacular enough to make someone want to run it, exact enough to plan a race by.

## Thesis
This should feel like the plaster relief model on the wall of the hut, painted like the map, because runners want to see the climbs and read the numbers off the same object.
Swap test: a road marathon or a generic event page has no massif to turn.

## Median
An average model would ship: a full-bleed drone photo with a dark overlay, a centred "Push your limits" headline, a countdown, three icon cards (distance, elevation, time), a sponsor strip, a gradient "Register now" button, Inter or Montserrat, and parallax.
Kept from the median, and why: a big number on the first screen (the distance is the race's name).

## Register
Spectacular. People come for the mountain; the domain's best artefacts are relief models, topo maps and race posters; the subject is terrain.
Materials:
- Live 3D: the course terrain with the route on it, contour lines in the shader. Turning it shows which side the climbs are on. Relevance: own material, carries depth a map cannot, procedural terrain is convincing at this style.
- Data as picture: the elevation profile is the scrubber; each terrain note has its own mini profile at a shared vertical scale.
- Type as image: the distance at poster scale in waymark red.
- Play: scrub the profile and the camera follows; a packing checklist that remembers.
- Photography: none. No honest photographs of a fictional massif exist.
- ASCII, sound, character: not the product's material.

## System
Colour source: Norwegian topographic map and the red T waymark · stance: plaster paper field, hypsometric tints, brown contours, one red · accent share: red only for the route, the distance, cut-offs and signposts
Type: Archivo, one family across its width axis: 62 for display and headings like bib numbers, 75 for labels, 100 for prose. Tried: Barlow Condensed (used elsewhere), Oswald (median for sport), Big Shoulders (too decorative).
Space: 8 px base; sections at 104 px; tables at 14 px row padding
Shape: square boards; blazes with irregular radii like paint on stone
Depth: the 3D model only; the page is flat paper
Controls: red signposts with a pointed end (primary), outlined signposts (secondary); checkboxes as stone squares that get a painted red T
Motion: 3.6 s route draw once from the hut (signature); 650 ms camera follow; 160 ms presses
Chrome: theme-color matches the paper in each scheme
Themes: light plaster and dark night map
Defended risk: the course itself in 3D is the hero, and every number on the page is measured from it.

## Screens and states
| Screen | Dominant element | States done |
|---|---|---|
| Course | the relief model | loading poster, WebGL failure (2D hillshade), reduced motion (no draw, no fly), touch (two-finger turn, one-finger scroll), offscreen pause, dark |
| Checkpoints | the table | narrow (served column hidden) |
| Kit | the list | packed count, all packed, storage unavailable |
| Entry | the facts | calendar download |

## Critique log
Round 1: 7.0. The poster stretched over the model while WebGL faded in; the start hut sat in the lake; a perfect spline read as fake; the fixed header collided with sections; the race measured 57 km. Fixed.
Round 2: 8.4 (web weights). Thesis 9, Hierarchy 9, Composition 8, Type 8, Colour 8.5, Platform 8, Content 8, States 8, Craft 7.5, Distinct 9. Held back by: dark mode terrain is low in contrast; labels can overlap at some angles.

## Missing facts and samples
The race, the massif, place names, prices, dates and kit rules are fictional and labelled in the footer. Terrain is generated; distances, climbs and cut-offs are computed from it.
