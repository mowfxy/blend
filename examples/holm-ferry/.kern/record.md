# Holm Ferry — Kern record

Fictional example. Holm, Skerra, the ferry *Marran*, the timetable and the fares are invented for this repository.

## Locate
Surface: a public website, a single page. **kern**
Platform / stack: static HTML, CSS and JS, with no build. **kern**
Device and posture: mostly phones. Islanders check it at the kitchen window, and visitors on the mainland train planning a day trip. Some use a laptop at home to plan a holiday. **kern**
Frequency and stakes: islanders check it daily and visitors once. If they miss the last boat, they are stuck on the wrong island overnight. **kern**

## Ground
Specimen: "Next boat from Holm: 14:20, in 38 minutes". "Last boat back from Skerra 18:45". "Foot passenger £4.80 single". "Car and driver £21.00". "Sailings are cancelled above Force 7 from the south-west". Place names: Holm Pier, Skerra Slip, Marran Sound, the Lamb (a skerry with seals) and Skerra Head light.
People: islanders (school runs, shopping on Holm), visitors with bikes or dogs, and a vet who crosses on Tuesdays. Their fear is the last boat and the weather. They say "the boat", "the 2 o'clock", "is she running?".
Material culture:
1. The Admiralty chart of the sound: white deep water, pale blue shallows, buff land, magenta for lights and notes, depth soundings in small italic numerals, and sea names in sloping type with land names upright.
2. The printed timetable board at the pier, with two columns, one per direction.
3. The punched paper ticket.
4. The lateral buoys, red to port and green to starboard.
5. Skerra Head lighthouse, which flashes white every 10 s (charted as "Fl 10s").
6. The ship's name on the bow, and the shipping forecast's wording ("south-westerly 6 to gale 8").
Constraints: phone first, readable outdoors, and the timetable must work without JavaScript. **kern**
Most specific facts:
1. The one question is when the next boat leaves, and from which side.
2. The weather decides whether she runs.
3. On charts, water features are lettered in italic and land features upright. This is a real convention.
4. Chart magenta marks what matters (lights, cautions).
5. The crossing takes 25 minutes and passes the Lamb, where seals haul out.
6. Two directions, one boat, so the timetable is a back-and-forth.

## Tension
The page has to be a strictly practical timetable for islanders, and also persuade visitors that the crossing is worth making.

## Thesis
This should feel like **the chart and timetable board at the head of the pier**, because one board answers "when is the next boat?" and shows you the water you are about to cross.
Swap test: putting a competitor in (a large mainland ferry operator's booking site) breaks the sentence, because they have booking funnels, not a board for one crossing. The thesis passes.

## Median
An average model would ship: a full-bleed stock photo of a ferry at sunset with a centred headline "Your gateway to island adventures", two buttons, three feature cards (Comfort, Reliability, Views), a booking widget, testimonials, a gradient CTA, Inter or Playfair Display, and a navy-and-teal palette.
Kept from the median, and why: navy appears only as the chart's deep ink, and there is a timetable table (the timetable *is* a table).

## System
Colour source: the Admiralty chart. **kern**
Stance: a white sea field, with pale blue shallows as a second surface, buff for land in the drawing only, black ink, and chart magenta as the single accent for "what matters now" (the next sailing and cautions). In dark mode it becomes the night-chart look (the red-light charts used on a bridge), adapted: deep blue-black sea, pale ink, and the magenta raised.
Ramps: magenta `#b5177a` (oklch about 0.50 0.19 350), shallows `#dcebf2`, land `#efe3c4` (drawing only, never as page background), ink `#15212b`.
Type: **Spectral** for text. Water names are always set in italic, following chart convention, and land names upright. The italic is a rule applied to every sea name, not an accent word. **IBM Plex Sans Condensed** for times and fares, with tabular figures, which suits a timetable board. Candidates tried: Spectral (chosen; it has a screen-optimised serif and a true italic), Source Serif 4 (too neutral for a chart), Fraunces (too soft and too much in fashion), Plex Sans Condensed (chosen for figures), and Barlow Condensed (already used in another example, so I avoided it to keep the ledger distinct).
Space: 8 px base, sections paced as boards, with 16–24 px outer margins.
Shape: square. A chart has no rounded corners. The rules are the chart's neatline (a double rule at the edge of the drawn chart).
Depth: none. Flat print.
Motion: slow and calm. The route line draws across the chart once on load, the "next boat" minutes count down live, and the drawing of the light at Skerra Head flashes on its real character (Fl 10s), under reduced motion only as a static mark.
Chrome: `theme-color` is set per scheme to the sea surface.
Themes: both.
Defended risk: **the hero is a drawn chart, not a photograph.** The next sailing is printed on it like a chart note in magenta, with the route between the two piers. It shows the actual water you will cross.

## Screens and states
| Section | Dominant element | Claim |
|---|---|---|
| The board (first screen) | The next sailing, huge, plus the chart | You can make the 14:20, and it runs today |
| Timetable | Two-direction table | Every sailing, summer and winter |
| Fares | Fare board | What it costs, and what is included |
| When she doesn't sail | The weather rule | You will know before you leave the house |
| The crossing | Chart notes along the route | 25 minutes, past the seals and the light |
| Getting to the piers | Two short columns | Buses, parking, bikes |

The live element is the next-sailing countdown with a direction switch, computed from the published timetable and the visitor's clock. It is labelled as a timetable time, not live tracking.

## Missing facts and samples
Everything is fictional. A banner and the footer say so.

## Critique log
Round 1: 8.1 (Kern Score). Fixes and what remains are listed in [examples/README.md](../../README.md#kern-critique).
