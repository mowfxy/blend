# The canon

These are the principles Kern never drops. They hold on every platform and at every size of task, and they outrank style. They are deliberately few, so you can hold all of them in mind at once. Before you hand anything back, walk the list against the render.

## Structure

**1. One thing first.** Every view has a single dominant element, the thing the eye lands on in the first second. Everything else is clearly subordinate. If two things compete, one of them gets smaller, quieter or moves away. *Check:* glance at the render for one second, then look away and name what you saw. You should be able to name exactly one thing.

**2. Contrast is decisive or absent.** Differences in size, weight, colour and space are either obvious or not there at all. A heading 1.2× its body text reads as a mistake, while 3× reads as a decision. Timid steps are what make work look generated. *Check:* squint until text turns into grey bars. You should see two or three clear masses, not many medium ones.

**3. Few edges, reused.** Every block aligns to a small set of shared lines, typically two or three left edges per view. Alignment is optical as well as mathematical: round glyphs overshoot, icons sit on the text's visual centre, and punctuation can hang outside the edge. *Check:* trace the left edges down the view and count the distinct x positions.

**4. Space shows relationship.** Related things sit close and unrelated things sit far apart. The gap between groups is clearly larger than any gap inside a group. One spacing scale applies everywhere, and every value on it has a use. *Check:* point to any gap and say what relationship it expresses.

**5. Rhythm changes with content.** Repeated structure means repeated meaning. When the content changes kind, the layout changes too, and neighbouring sections never share a layout by accident. Within a list or a table, rhythm stays strictly regular.

## Surface and system

**6. Chrome belongs to the content.** Title bars, toolbars, status bars, navigation bars, tab bars, browser theme colour and window frames are part of the design, not a default frame around it. On desktop, the app's own surface extends under or into the title bar, and the window controls sit inside the app's layout rather than on a separate grey strip. On mobile, the content runs edge to edge under the system bars, which take their colour from what is beneath them. On the web, `theme-color` matches the page's top surface. A default title bar on top of a custom-coloured app is the single most common tell of an AI-built desktop app. See [kern-desktop](../../kern-desktop/SKILL.md) for each framework.

**7. The platform's grammar first, your voice second.** Controls, navigation patterns, gestures, keyboard shortcuts, sheets, menus and system fonts follow the platform people are on, because their hands already know them. Identity lives in content, composition, colour, type in the content layer, imagery and motion, not in reinventing a checkbox. You may break a platform convention only for a product reason you can state.

**8. One system, no strays.** Colour, type, spacing, radius, stroke, elevation and motion are tokens, defined once and used everywhere. Concentric corners nest: an inner radius equals the outer radius minus the padding between them. Every one-off value is either promoted to a token or removed.

**9. Light and dark are both designed, or one is chosen on purpose.** Desktop and mobile platforms switch theme with the system, so on those platforms you ship both unless the product has a reason not to. Dark is its own palette, not an inversion: surfaces get lighter as they come forward, saturated colours are tuned down, and nothing is pure black on pure white.

## Content and behaviour

**10. Real content at real length.** Design with the longest real name, the biggest real number, an empty list, the forty-third row and the German translation. Lorem ipsum hides the problems that matter. Missing facts become clearly labelled samples, and proof is never invented: no fake customers, quotes, logos or statistics.

**11. Every state is designed.** These include empty, loading, partial, error, offline, no permission, overflow, first run, hundreds of items, and success. The empty and error states use the same system as the populated state. Success appears only after the work has actually succeeded.

**12. Feedback is immediate, motion explains.** Every input acknowledges itself within about 100 ms. Motion shows causality (where something came from, where it went, what changed) and then settles. A loop is allowed only when the thing it shows really runs (a pattern playing, a live feed, a scene the visitor is watching), never just to look alive. Reduced motion keeps all the meaning.

**13. Legible by default.** Body text and labels are big enough for the platform and posture, at full ink, with sufficient contrast (WCAG 2.2 AA at minimum: 4.5:1 for text, 3:1 for large text and UI boundaries). Measure is 45–75 characters for reading. Nothing a person needs to read is decorative microtext.

**14. Accessible is a design input.** Make touch targets at least 44 pt on Apple platforms, 48 dp on Android and 24 px on the web, with comfortable spacing. Keep focus visible, support keyboard paths, and make Dynamic Type and text scaling reflow the layout without truncating meaning. Never use colour as the only signal, and give everything a real name for assistive tech. These are design decisions, not a final audit.

## Taste

**15. One idea, protected.** A design carries one memorable decision, the thesis made visible. Everything else gets quieter so that idea reads. Three medium ideas are weaker than one strong one, and spectacle is spent in one place or not at all.

**16. The register fits the subject and the person.** Decide how loud the work should be from what the person asked for, what the product offers and how it is used ([register](register.md)), then commit to it. A sensory subject with no pictures and nothing moving is as wrong as spectacle on a tool used all day. Every rich element is the product's own material, carries something a still cannot, and is made convincing.

**17. Specific over safe.** Every choice should belong to this product. If a choice could be lifted onto an unrelated product unchanged, it is a default, and defaults are what the [median](median.md) is made of. This includes the icons and buttons: a stock set at its defaults is a default ([kern-controls](../../kern-controls/SKILL.md)).

**18. Finish is the premium.** Craft means deliberate crops, consistent strokes, tabular numerals where values compare, no accidental gaps, no orphaned words in headlines, real font files, matched icon weights and resolved hover, press and focus states. People feel finish before they can name it.
