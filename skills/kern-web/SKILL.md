---
name: kern-web
description: Kern specialist for public web pages such as landing pages, marketing sites, product pages, portfolios, studio sites, editorial pages, event pages and one-pagers. It shapes the page's argument, first screen, composition, real imagery, one live element, full content, motion layer and responsive recomposition, starting from the product's own world instead of the hero, features, testimonials and pricing template. Use it whenever you build or redesign a public-facing page, or when a site looks templated or AI-made. Not for logged-in app screens (kern-product) or dashboards (kern-dashboard).
---

# Kern Web

A public page is seen once by someone who did not ask for it and will leave in seconds unless something specific holds them. Its job is to make one argument and get one action. Work through the [method](../kern/references/method.md) and hold the [canon](../kern/references/canon.md). This file holds the craft that applies to public pages.

## The argument before the layout

Write the page as a list of **claims with proof**, one line per section, in the order a visitor needs them. What is this? Why should I believe it? What does it cost or require? What do I do now? A section without a claim is deleted. This is how the page escapes the template, because the template is just the sections every page has, in the order every page uses.

The proof must be something a visitor can inspect: the real product working, the actual menu, real photographs of the place, a piece of the work, a sample they can try, or a clearly labelled demonstration. Never invent customers, quotes, logos, press or numbers. Missing proof calls for a demonstration, not a fabrication.

## The register decides the page

Public pages range further than any other surface: a clinic's opening hours and a festival's line-up are both "a website". Set the [register](../kern/references/register.md) before composing, and make it visible from the first screen to the footer. A silent page is typography, real facts and impeccable states. An expressive page is led by pictures, type as image and a real signature motion. A spectacular page is an encounter with the subject: terrain to fly over, an object to turn, a pattern to play.

Two pages built with Kern should not share a skeleton. If the page you are building has the same sequence of sections, the same hero arrangement and the same section headers as the last one, go back to the argument and the materials.

## The first screen

- **It answers the visitor's first question in large type.** For a product, that is what it is and what it does or costs. For an event, it is what, when and where. For a place, it is what and where, plus whether it is open.
- **It contains one dominant element** that is specific to this product: the product itself, its output, the place, the work, or the name set as architecture. A headline beside an abstract shape is not a first screen.
- **The primary action is a real button**, named for what it does ("Book a table for tonight", not "Get started"), with an anatomy drawn from the domain ([kern-controls](../kern-controls/SKILL.md)).
- **Headlines fit in two lines** at the widths people use, which typically means 32 characters or fewer at a confident size. Cut words before shrinking the type.
- **The browser chrome continues the page.** The top surface is a solid, deliberate colour and `theme-color` is set for each scheme ([chrome](../kern-desktop/references/chrome.md#the-browser-tab-too)).

## Composition

- **Each desktop screen is a poster:** one dominant thing and the content it carries. Neighbouring sections never share a layout, and when the content changes kind, the structure changes too.
- **Carry the thesis into every section**, including pricing, the FAQ and the footer. A page that has an idea in the hero and turns into stock blocks below has no idea.
- **Margins.** Keep outer margins tight (16–32 px), and let the big things run to the edges. Use two or three shared left edges for the whole page. The gap between sections should be clearly larger than any gap inside one.
- **Scale.** The largest type should be much larger than body text, often 6–12vw on desktop for a display moment. Use few sizes, with big jumps between them.
- **Rest.** One deliberate rest per page at most. A rest is a decision. A hole beside a short column is an accident.
- **Phones** get their own composition: their own crops, line breaks and order. A squeezed desktop page is not a phone layout.

## Imagery

Strong public pages show far more than weak ones. A page about something people can see, taste, visit or hold must show it, large, more than once. Use, in this order:

1. The project's own photographs, product captures and work.
2. Generated images when you have an image tool, written as a photographer's brief.
3. Real pictures of the subject's world from open collections, credited (archival maps of the street, engravings of the trade, museum objects of the kind). Never present these as the client's own.
4. Drawing in code, for what no honest picture exists of: maps, terrain, diagrams, objects.
5. The product's data drawn as the picture.
6. Type and colour alone, chosen on purpose.

Give the set one treatment from the domain's own printing or capture technology. [kern-imagery](../kern-imagery/SKILL.md) owns sourcing, credits, treatments, 3D and illustration.

## Icons and buttons

Feature lists with an icon above each heading, a pill eyebrow, and a primary button with an arrow are the commonest marks of a generated page. Try every section without icons first. When icons earn a place, draw them as a family from the domain. The buttons, links and inputs take their anatomy from the domain's own instruments and marks. See [kern-controls](../kern-controls/SKILL.md).

## One live thing

Give the page one thing the visitor can do, or that changes each visit, made from the thesis and the real content. It might be choosing the wood and seeing the chair in it, setting the loan and reading the real monthly figure, or seeing what is on air right now. It works with a thumb, has a plain fallback without JavaScript, never blocks reading, and is one thing, not a playground. Never fake live data. If the state is not real, make it a calculator, a chooser or a sample instead.

## Full content

Write every section the visitor came for in full: the whole menu with prices, each room with its details, every speaker, the price and what it includes. Thin sections are the commonest reason a clean page loses to a busier one. Where the brief gives the shape but not the details, write plausible sample content at real density, label it, and list it in the handoff.

Write like someone who works there. Use specific nouns and short sentences, and avoid slogans. If a heading could sit on a competitor's site unchanged, rewrite it. Delete eyebrows that repeat the heading.

## Motion

A public page needs a motion layer, because a page that never responds feels like a mock-up. Its size follows the register ([kern-motion](../kern-motion/SKILL.md#motion-by-register)):

- One signature move that comes from the thesis. On an expressive or spectacular page it can own the first screen.
- Entrances choreographed to each section's content (a list arriving row by row, a picture revealed from a mask, a route drawing itself), each running once, and never one identical fade on every block.
- Feedback on every control.
- Content that is visible without JavaScript and under reduced motion.

Live 3D, text-mode animation, generative art, scroll stories, sound and characters are the loud end of the toolbox. Use one when the subject is made of it: terrain for a race, a playing pattern for a music tool, a turnable object for a product people covet. The test is the [relevance test](../kern/references/register.md#the-relevance-test), not a quota. Spend it in one place and make it convincing ([kern-imagery](../kern-imagery/SKILL.md#live-3d)).

## Verify

Render at 1440, 1024, 768 and 390 wide. Check the following:

- The one-second glance and the swap test on the first screen.
- Headline line counts at every width.
- Every image loaded and cropped.
- Every link and the primary action working.
- No horizontal scroll on the phone.
- The page with JavaScript disabled and with reduced motion.
- The motion watched at normal speed, any 3D turned by hand, and a throttled phone.
- Every icon from one drawn family, every button with all its states.

Then run [kern-critique](../kern-critique/SKILL.md) for the score and [kern-ship](../kern-ship/SKILL.md) for launch quality. `node ../kern/scripts/kern.mjs audit <src>` flags measurable median tells and missing `theme-color`.
