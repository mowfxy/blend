---
name: kern-type
description: Kern specialist for typography on any platform, including choosing typefaces from the content and reading conditions, pairing, type scales, setting display and body text, numerals, responsive and fluid type, Dynamic Type and text scaling, font loading, licensing, and multilingual, Arabic and RTL typesetting. Use it whenever a font is being chosen or changed, headings or body text look off, the type looks generic, or a design depends on typographic voice.
---

# Kern Type

Typography is most of any interface. It carries both the voice and the hierarchy. Kern gives you no font list. A fixed list would become the next median. Instead, you derive the type from the reading conditions and the voice, generate your own candidates, and choose in the render. See [the eye](../kern/references/eye.md#making-a-single-decision-with-taste).

## 1. Start from reading conditions

Write these down before you think about any typeface:

- **Distance and size:** a phone at 30 cm, a laptop at 60 cm, a projector across a room, a TV at three metres, a watch glanced at.
- **Duration:** a glance, a scan, or sustained reading.
- **Density:** sparse marketing, a moderate editorial page, or dense tables and dashboards.
- **Content:** prose, labels, numbers, code, names, and the scripts and languages it must cover.
- **Platform:** whether the platform's system face is the right answer for the interface layer (it often is on iOS, macOS, Windows and Android), leaving identity to the content layer.

These conditions rule out most faces before taste enters. Long reading needs a face designed for text sizes, with open counters and moderate contrast. Dense data needs clear, preferably tabular numerals and disambiguated glyphs. Distance needs a large x-height and sturdy strokes. Arabic needs a well-engineered Arabic face, not a Latin face with a fallback.

## 2. Find the voice in the domain

Ask what this domain's own typography looks like: its signage, its documents, its instruments and its packaging. A railway timetable, a pharmacy label, a vinyl sleeve, an engineering drawing, a school exercise book and a menu chalkboard all suggest different voices. Describe the voice in terms of form: proportion (condensed, normal, wide), construction (geometric, grotesque, humanist, slab, transitional, didone, script, monospaced), contrast, terminals and texture. Do not describe it with adjectives like "modern" or "elegant".

## 3. Generate candidates and choose in the render

1. **Search a real catalogue** against the conditions and the voice: the platform's system fonts, Google Fonts, Fontshare, the free families from foundries, or the project's licensed fonts. Filter by construction, the weights you need, script support and numerals.
2. **Pick three candidates that differ in kind.** If the first face that came to mind is one of the median faces (Inter, Geist, Space Grotesk, Poppins, Manrope, DM Sans, Playfair Display, or a serif headline with an italic word), set it aside. Bring it back only if the comparison proves it is the best fit.
3. **Set the real specimen in each:** the longest headline, a paragraph, a label, a button, a table of numbers and every required script, at real size, in the real theme and at a narrow width.
4. **Choose the face that makes the thesis most visible** with the fewest compromises. Write the reason in the record.

One family is often enough. Two is the usual limit, and the second needs a real role difference such as display versus text or prose versus data. Familiar faces are fine when the comparison chooses them. What is not fine is never comparing.

## Setting type

- **Scale.** Use few sizes with decisive jumps: typically one large display size, one or two heading sizes, a body size, and a small size for metadata. Five sizes is a ceiling for most interfaces. On public pages, display type is often four to eight times the body size.
- **Body text.** Use 16–20 px on the web, the platform's default text style on native platforms (17 pt on iOS, 13 pt on macOS, 14 px on Windows) and 24 pt or more on slides. Body text gets full ink, line height 1.4–1.6 and a measure of 45–75 characters.
- **Display text.** Tighten it carefully, typically −0.01 to −0.04 em with leading of 0.9–1.1, and check for collisions between ascenders and descenders. Never apply negative tracking universally, because small text needs neutral or positive tracking.
- **Wrapping.** Use `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs, and avoid single-word last lines in headings. Never hard-code line breaks that only work at one width.
- **Numerals.** Use tabular, lining figures wherever values compare (`font-variant-numeric: tabular-nums`), and proportional or old-style figures in running prose where the face supports them. Use real minus signs, en dashes for ranges and proper multiplication signs.
- **Details.** Use curly quotes and apostrophes, a real ellipsis and non-breaking spaces between numbers and units. Hang punctuation where supported. Small caps should come from the font's real small caps, and all-caps labels need positive tracking (+0.04–0.08 em).
- **Hierarchy without size.** Weight, colour (ink versus dimmed), case, position and space all create hierarchy, so use them before adding a new size.

## Scaling and responsive type

- **On the web,** use fluid sizes with `clamp()` so type scales between a minimum and a maximum, and make sure the minimums stay readable on phones. Respect user zoom and browser font-size settings by using `rem` for text.
- **On iOS,** use Dynamic Type through text styles and `UIFontMetrics` for custom faces. **On Android,** use `sp` units and test at 200%. **On desktop,** respect the system text-size settings where the toolkit supports them.
- **Layouts reflow with text size.** Stacks go vertical, rows wrap, and critical meaning never truncates.

## Loading and licensing

- **Self-host when possible,** with `font-display: swap` or `optional` and a metric-adjusted fallback (`size-adjust`, `ascent-override`) to reduce layout shift. Preload only the one or two files used above the fold. Subset by script without dropping the characters you need.
- **Load real weights and italics.** Synthetic bold and italic look wrong, so verify in the render that the real files are loading.
- **Check licences** for web, app embedding and redistribution before shipping. Never claim a font is installed when the screenshot shows a fallback.

## Multilingual, Arabic and RTL

- **Choose faces with native support for each script,** designed together or matched in weight, x-height and colour. Do not fake Arabic or CJK with a fallback stack and call it supported.
- **For Arabic and other joining scripts,** preserve shaping, so never letter-space Arabic. Line height is typically more generous. Do not apply Latin italic or uppercase rules. Pay attention to mixed numerals (Arabic-Indic versus Western) according to the locale.
- **For RTL,** use logical properties (`margin-inline-start`, `inset-inline`), set `dir` and mirror directional icons and layouts, but not media controls, clocks or charts with a time axis. Check bidirectional text in mixed labels.

## Verify

Screenshot the real specimen at real size in every theme, on the narrowest screen and at the largest text setting. Confirm in the render or dev tools that the intended font files loaded. Read a full paragraph at normal distance, and check the numbers in a table.
