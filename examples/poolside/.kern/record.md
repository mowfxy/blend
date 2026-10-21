# Poolside — Kern record

Fictional example. Pools, staff, readings and the testing policy are samples written for this repository.

## Locate
Surface: desktop app, a single-window tool. **kern**
Platform / stack: Electron (macOS and Windows), with no framework, HTML, CSS and JS. **kern**
Device and posture: a laptop on the shelf of the pool office, beside the glass that looks onto the water. Readings are entered standing, with damp hands, in bursts of under a minute, between watching swimmers. **kern**
Frequency and stakes: every two hours, all day, seven days a week. The log is a safety record that inspectors read, so a missed or wrong reading is a real incident. **kern**

## Ground
Specimen: "Free chlorine 1.4 mg/L", "pH 7.4", "Combined chlorine 0.3 mg/L", "Water 28.5 °C". Pool names "Main pool 25 m", "Learner pool", "Spa". Staff initials "RK", "MO", "JT". The longest label is "Combined chlorine (chloramines)". An error message: "pH 8.4 is outside the safe range (7.2–7.6). Close the pool and tell the duty manager."
People: pool lifeguards and the duty manager. Just before an entry they have dipped a sample tube at the pool edge and read the colour in a comparator. Right after, they go back to the chair. They fear forgetting a reading, or writing one down wrong. In their own words, they "do the water", "do a test", and say the pool is "in range" or "out".
Material culture:
1. The comparator, a plastic block where the sample's colour is matched against printed discs. Phenol red runs from yellow (pH 6.8) through orange to magenta-red (8.2), and DPD runs from faint pink to deep pink for chlorine.
2. Depth markings tiled on the pool deck, "1.0 m" and "2.0 m": large condensed numerals readable from a step away.
3. The black-blue lane line tiled along the pool floor, ending in a T before the wall.
4. A clipboard log sheet, ruled, with columns for time, readings and initials.
5. Lane ropes, the rota whiteboard in the office, and the whistle.
Constraints: legible with a glance from about a metre away, targets usable with damp fingers, light and dark (the office is bright by day, and late sessions run with the lights low). **kern**
Most specific facts:
1. Readings happen every two hours. The most important question is "is the next test due?"
2. pH is read by colour, from phenol red.
3. Free chlorine is read by colour, from DPD pink.
4. Depth markings are the numerals everyone already reads at a glance.
5. The lane line is the darkest, most authoritative mark in the building.
6. Entries are made standing up, with wet hands.
7. The log must show who tested and when, for the inspector.
8. Out-of-range readings close the pool. That is the only real alarm.

## Tension
It is a legal record that must be exact and auditable, but it is filled in during forty-second bursts by someone whose real job is watching the water.

## Thesis
This should feel like **the depth markings on the pool deck**, because a lifeguard has to read the state of the water in one glance and get back to the chair.
Swap test: putting a competitor in (a generic facilities-compliance SaaS) breaks the sentence, because it has no deck and no glance. The thesis passes.

## Median
An average model would ship: a left icon sidebar of eight items, a top bar with search, a bell and an avatar, four KPI cards (Chlorine, pH, Temperature, Swimmers) with green percentage arrows, a line chart in indigo, a table, Inter, 12 px rounded cards with shadows, a default title bar, and a modal "Add reading" form with small inputs.
Kept from the median, and why: a sidebar, because there are three pools and the desktop pattern is right for a collection. A table for the log, because the log *is* a table, a ruled clipboard sheet.

## System
Colour source: the comparator's printed scales (phenol red and DPD pink) for **data**, and the tiled lane line for **ink and action**. **kern**
Stance: functional. Cool tile-grout neutrals, the lane-line blue-black for the primary action and selection, and reagent colours only on readings, as the reading's own colour.
Ramps: neutral from `oklch(0.6 0.012 220)`, accent (lane line) `#1f2f4a`, pH scale interpolated from the comparator (6.8 yellow `#e9c84a` → 7.4 orange-red `#e2683a` → 8.2 magenta `#b8235a`), and the DPD scale from `#f6d7e3` to `#c2306f`.
Type: SF Pro or Segoe UI through `system-ui` for the interface, which is native. Barlow Condensed 600 for readings and times, because it is the deck-marking voice: condensed, sturdy, with clear numerals. Candidates tried: Barlow Condensed (chosen), IBM Plex Sans Condensed (too quiet at large sizes) and Big Shoulders (too decorative, with a weak 1 and 7).
Space: 4 px base. Rows are 40 px, larger than desktop norm, because of damp hands. Entry targets are 56 px. The sidebar is 220 px.
Shape: 6 px radius on controls and 10 px on the window's inner panels (concentric). Rules are 1 px, like the log sheet's.
Depth: flat, with tone steps. The sidebar uses system vibrancy on macOS.
Motion: quick and exact. The reading tiles settle in 160 ms when a value changes. There is no signature motion beyond the due-countdown ring filling.
Chrome: `titleBarStyle: 'hidden'`. On macOS the traffic lights are inset in the sidebar's top row. On Windows the native caption buttons are drawn by `titleBarOverlay` in the toolbar colour and updated on theme change. The toolbar row is the drag region.
Themes: both, following the system.
Defended risk: **the readings are the depth markings**. Each current value is set in 120 px condensed numerals on a tile, and the pH tile is filled with the comparator colour for that exact pH. The colour *is* the reading, as it is in the lifeguard's hand. It is never used as decoration anywhere else.

## Screens and states
| Screen | Dominant element | States done |
|---|---|---|
| Pool (main) | The current reading tiles plus "next test in 34 min" | in range, due soon, overdue, out of range (pool closed) |
| New reading (inline panel) | Three large steppers | empty, valid, out of range warning, saved |
| Log | The ruled table | populated, today empty |

## Missing facts and samples
The testing interval, the safe ranges and all readings are samples. They are labelled in the About text and the README.

## Critique log
Round 1: 8.1 (Kern Score). Fixes and what remains are listed in [examples/README.md](../../README.md#kern-critique).
