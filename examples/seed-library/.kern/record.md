# Wren Street Seed Library — Kern record

## Locate
Surface: public page for a small community service inside a branch library
Platform / stack: static HTML, CSS, a small ES module
Device and posture: gardeners and neighbours on phones and laptops, often in the evening, planning what to sow
Frequency and stakes: a few visits a season; low stakes, high warmth

## Ground
Specimen: "Cerfeuil tubéreux", "Chaerophyllum bulbosum", "Sow Sep–Nov. The seed needs a winter to wake", "0 of 8 packets in the drawer", "Due back Oct 2027"
People: allotment holders, balcony growers, librarians. Before: browsing seed catalogues. After: sowing. Fear: wasting a packet, not knowing when to sow. Their words: packet, sow, save seed, borrow, return, due back.
Material culture: the card catalogue drawer with its brass label holder; index cards with a red header rule and blue rules; manila divider tabs; the date-due stamp in violet ink; library pockets; Vilmorin-Andrieux's 1904 engravings, captioned with their reduction ("Réd. au quinzième"); the seed house's coloured album plates
Constraints: kern (fictional library). Plates are public domain and credited.
Most specific facts:
1. A seed library lends packets; you return saved seed.
2. Seed is filed in a card drawer by call number.
3. Each variety has a sowing window by month.
4. Some seed is easy to save, some takes two years and isolation.
5. The due-back date is stamped in violet ink.
6. Vilmorin-Andrieux published engravings of exactly these heirloom varieties.
7. Three packets a season per card.
8. Tuberous chervil needs a winter to germinate.

## Tension
Archival and handsome, but practical enough to tell someone what to sow this week.

## Thesis
This should feel like pulling open the library's card drawer and finding every card is a plate, because the old catalogue is what makes the seed feel worth keeping alive.
Swap test: a seed shop would sell, not lend; it has no drawer, no due-back stamp.

## Median
An average model would ship: cream background, terracotta accent, a serif headline with one italic word, a hero photo of hands in soil, three icon cards (borrow, grow, return) with leaf icons, a product grid of seed packets, a newsletter form, and fade-ups.
Kept from the median, and why: a serif display face (Bodoni matches the plates' own Didone captions). The italic word is in the headline; it carries the verb the library asks of you.

## Register
Expressive. People come for the plants as much as the service; the domain's best artefacts are seed catalogues and botanical plates.
Materials:
- Archival images: seven 1904 engravings and one 1850s chromolithograph, all public domain, credited and linked. Relevance: they are of these exact varieties.
- Image treatment: engravings multiplied onto card stock so the paper is the card's own.
- Paper and ink: index cards, ruled lines, a borrower's card, violet stamp ink with a rough edge.
- Motion: the date stamp lands when you borrow (signature); cards stack as you scroll like a drawer; month changes cross-fade with view transitions.
- Photography of the library, 3D, ASCII, sound: no. The library is fictional; the plates are honest.

## System
Colour source: index card stock, its red and blue rules, violet stamp ink, dark oak drawer, the plates · stance: white cards on oak; colour comes from the hero plate · violet only in the stamp
Type: Bodoni Moda for names and headings (optical size axis), Courier Prime for everything typed on a card. Tried: Libre Caslon (too bookish), Fraunces (median), IBM Plex Mono (too technical).
Space: 28 px ruled line for typed fields; one card per variety, 28 to 120 px apart
Shape: index cards (3 px radius), double-ruled pocket labels
Depth: cards cast a soft shadow onto the drawer from overhead light
Controls: typed double-ruled buttons; manila divider tabs for months; a text "Undo"
Motion: 260 ms stamp with a small overshoot in scale; sticky stacking; 150 ms presses
Chrome: theme-color is the drawer's oak
Themes: one dark-drawer theme on purpose: the plates read best on dark, and the drawer is dark in any light
Defended risk: every variety is a full catalogue card with its plate at large size, not a product grid.

## Screens and states
| Screen | Dominant element | States done |
|---|---|---|
| Opening | the colour plate | — |
| Sow now | the divider tabs | each month, empty month (January), whole drawer |
| Drawer | one card | in stock, out of stock, borrowed with stamp, limit of three, undo, storage unavailable, narrow |
| Borrowing | the borrower's card | — |

## Critique log
Round 1: 7.2. The Borrow buttons collided with the section class `.borrow` and grew to 176 px; the ruled lines cut through the typed text; the stamp covered the stock line. Fixed.
Round 2: 8.2 (web weights). Thesis 9, Hierarchy 8, Composition 8, Type 8.5, Colour 8, Platform 8, Content 8, States 8, Craft 7.5, Distinct 8.5. Held back by: the borrower's card rules are faint at small sizes; there is no real borrowing backend, so the stamp only lives on this device.

## Missing facts and samples
The library, address, hours, stock counts and return numbers are fictional and labelled in the footer. The plates are real.
