---
name: kern-media
description: Kern specialist for designed media beyond interactive screens, including slide decks and presentations, HTML email and newsletters, PDF reports and documents, one-pagers, resumes, social and Open Graph images, posters, invitations and printed collateral. It covers argument-led structure, grids, type for reading and projection, data in documents, email client constraints and print production. Use it whenever the deliverable is a deck, an email, a document, a social image or something printed.
---

# Kern Media

These artefacts are read rather than operated, often away from where they were made: projected in a room, opened in an email client you do not control, printed on an office printer or shared as a thumbnail. Work through the [method](../kern/references/method.md). For media, *locate* is about the medium's physical conditions, and the canon's structure principles (1–5) carry most of the weight.

## Slides and presentations

- **The argument is the structure.** Write the deck as a sequence of claims, one per slide, readable as a story on its own when you list only the slide titles. A slide title is a sentence that states the point ("Returns fell 18% after the size guide launched"), not a topic label ("Returns").
- **Make one thing per slide** the dominant element: a number, a chart, a picture or a short statement. Speaker notes carry the rest.
- **Set type for projection.** Body text at 24 pt or more, titles much larger and few words. Use high contrast, because projectors wash out colour, so test the palette as if at half the contrast.
- **Use a grid** with consistent margins, title position and alignment across slides, so that changes between slides read as meaningful.
- **Make charts say the point.** Annotate the takeaway directly on the chart and remove everything else ([kern-dashboard](../kern-dashboard/SKILL.md#charts)).
- **Vary layouts by content kind** (statement, evidence, comparison, picture), not by decoration. Do not use the same title and bullets layout throughout.
- **Open and close with substance.** The title slide states the conclusion or the question, and the last slide is the ask or the decision. Do not end on "Thank you".

## Email

- **Respect the constraints.** Use table-based or hybrid layouts that work in Outlook, inline critical CSS, keep a single column for most content at 600–640 px wide, and use web-safe fallbacks for custom fonts.
- **Hierarchy:** the subject line and preheader are part of the design. The message comes first and the logo stays small. Give it one primary action as a bulletproof button (HTML and CSS, not an image).
- **Plan for images being off.** The message still makes sense with images blocked, every image has alt text, and no text lives inside images.
- **Plan for dark mode.** Clients invert or partially invert colours, so test transparent logos on dark backgrounds and use `color-scheme` meta and `prefers-color-scheme` where supported.
- **Meet accessibility and legal needs:** real text at 16 px or more, semantic structure, a plain-text version, and a visible unsubscribe link and postal address where required.

## Documents, reports and PDFs

- **Write for skimming:** a summary first, headings that state findings and a clear hierarchy of no more than three heading levels.
- **Typography for reading:** a measure of 60–75 characters, generous leading, a text face designed for long reading, tabular figures in tables and running heads or page numbers for orientation.
- **The page grid:** consistent margins and columns. Keep figures near their reference, and give tables and charts captions that state the point.
- **For print or PDF export,** use the CSS `@page` size and margins, `break-inside: avoid` on figures and tables, and embedded fonts. Check that colours survive greyscale printing.

## Social and Open Graph images

- **Size:** typically 1200×630 for link previews and 1080×1080 or 1080×1350 for feeds. The image must read as a thumbnail at about 300 px wide.
- **Content:** one statement or one picture, at large size, in the brand's system. Keep text out of the outer 10%, which platforms may crop.
- **Generate them from the content** (title, author, key figure) through a template, so that every page gets a real, specific image.

## Print

- **Prepare files properly:** use CMYK or the printer's profile, add 3 mm bleed, keep critical content 5 mm inside the trim, use 300 dpi images and outline or embed fonts.
- **Mind the paper:** the stock changes colour (uncoated paper absorbs ink and dulls colour). Proof on the real stock when possible.
- **Two-ink and spot colours** are a strong and economical stance when the domain suggests them.

## Verify

Present the deck at projector size, or view it at 50% to simulate the back of a room, and read only the titles to check the story. Send test emails to Gmail, Outlook and Apple Mail in light and dark modes with images off. Print a page of the document in greyscale. View each social image at thumbnail size.
