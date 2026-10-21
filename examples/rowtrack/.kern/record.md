# Rowtrack — Kern record

## Locate
Surface: public product page for an open-source tool
Platform / stack: static HTML, CSS, one ES module; Web Audio
Device and posture: a musician or developer at a laptop, often arriving from a forum link; sometimes a phone
Frequency and stakes: seen once; the stake is whether they install it

## Ground
Specimen: "C-4 05 30 A04"; a 64-row pattern; `cargo install rowtrack`; effect commands 0xy to Fxx; channel names KICK·SNR, HATS, BASS, LEAD, CHORD
People: tracker veterans who learnt on FastTracker 2 or Impulse Tracker, and terminal people who have never seen a tracker. Their words: pattern, row, channel, instrument, effect, speed, order list.
Material culture: the pattern editor's character grid; hex row numbers with a highlight every four rows; the fixed cursor bar; bevelled DOS buttons; QWERTY-as-piano (Z S X D C…); VU meters; the oscilloscope; .mod files traded on BBSes
Constraints: kern (fictional product). Sound only on request. Real text for the install command.
Most specific facts:
1. Rows scroll *under* a fixed cursor; the cursor never moves.
2. Every fourth row is highlighted; every sixteenth is a bar.
3. A cell is four columns: note, instrument, volume, effect.
4. The effect 037 plays a minor chord from one note.
5. Z to M is the lower octave; Q to U the upper one.
6. Impulse Tracker's panels were a sandstone colour with bevels lit from the top left.
7. A song is a text file you can diff.
8. At 125 BPM and speed 6, a row is 120 ms.

## Tension
Nostalgic and loud for veterans, but legible and inviting for someone who has never seen a pattern.

## Thesis
This should feel like a tracker pattern scrolling in a terminal, because the whole idea of the tool (music as rows of text) is understood the moment you see and hear one play.
Swap test: a DAW or a generic CLI page could not use this thesis.

## Median
An average model would ship: a dark page with a neon green accent, JetBrains Mono, a terminal screenshot in a fake window with traffic lights, glyph-rain or a dot grid behind the hero, three feature cards with Lucide icons (music, terminal, zap), a "Get started →" button, and a fade-up on every block.
Kept from the median, and why: dark pattern well (the medium is literally a terminal) and a monospace face (the content is a character grid).

## Register
Spectacular, through text-mode and sound rather than pictures. People come to *hear* what it makes; the domain's best artefacts are patterns and scene demos.
Materials:
- Text-mode animation: the real pattern scrolls row by row, with a braille scope and block-element VU. Relevance: it is the product's own output; a still cannot show playback.
- Sound: Web Audio synth plays the actual pattern. Off until Play is pressed.
- Play: the kick and snare column is editable; the QWERTY piano plays notes.
- Photography, illustration, 3D: no. There is nothing to photograph and depth adds nothing to a grid.

## System
Colour source: Impulse Tracker's sandstone panels around a black pattern well · stance: chrome in sand, content in the well · accent: cursor amber, only on the cursor bar, row markers and focus · column colours: note cream, instrument teal, volume green, effect orange
Type: Martian Mono only, width axis 75 for headings and grid, 112.5 for the wordmark. Tried: JetBrains Mono (median), IBM Plex Mono (too polite), Sixtyfour (too costume).
Space: 1ch grid; 20 px rows in the well; sections 72 px apart, numbered in hex like rows
Shape: square everywhere; 2 px bevels, light from the top left
Depth: bevels only
Controls: tracker keys, a black cap printed with the shortcut beside the label; pressed state inverts the bevel and moves 1 px in. Piano keys are the same anatomy, sharps in the well colour.
Motion: discrete row steps (no easing on the scroll); 60 ms press; the scope at frame rate. Signature: the pattern scrolling under the cursor.
Chrome: theme-color matches the sand in each scheme
Themes: light and dark sand; the well is black in both
Defended risk: the hero is a playable, editable pattern rather than a screenshot.

## Screens and states
| Screen | Dominant element | States done |
|---|---|---|
| Hero | the pattern well | preview (muted), playing, stopped, reduced motion still, offscreen pause, narrow (fewer channels) |
| 10 Row | the annotated cell | — |
| 20 Effects | the effect table | narrow scroll |
| 30 Keys | the piano | pressed, keyboard, no-sound-yet (creates audio on first key) |
| 40 Install | the commands | copied |

## Critique log
Round 1: 7.4. Editable cells inherited default button styling and broke column alignment; the anatomy legend's box-drawing did not connect; the hero grid overflowed on phones (minmax). Fixed all three.
Round 2: 8.2 (web weights). Thesis 9, Hierarchy 8, Composition 8, Type 8, Colour 8, Platform 8, Content 8, States 8, Craft 7.5, Distinct 9. Held back by: the scope reads as dotted noise in the muted preview; the piano does not show which pattern notes use which keys.

## Missing facts and samples
Rowtrack, its version, licence, install channels and flags are fictional and labelled as such in the footer.
