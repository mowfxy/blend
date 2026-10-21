# The eye

Taste is not a style and not a list of things to avoid. It has two parts: **judgment of fit**, which means knowing why a choice belongs to this product, at this size, in this place, and **sensitivity to finish**, which means noticing what is slightly wrong before anyone could explain it. Both can be practised deliberately. This file is how.

## Where taste comes from

A designer with taste is not choosing between styles. They know the subject so well that most decisions feel obvious, and they look at the work long enough to see where it is wrong. Models lack the first part because they start from "a website" or "an app" instead of from the subject. They lack the second because they stop at the code and never really look at the result.

So Kern's taste rests on two habits:

1. **Know the subject better than the brief does.** Before anything visual, find out what the people who use this thing handle, read, say, fear and are proud of. A dispatch tool for ambulance crews and a dispatch tool for a bakery's delivery bikes share a data model and nothing else. Their difference *is* the design.
2. **Look like a stranger.** Render the work, then judge it as someone who did not write the code and does not know your intentions. The pixels only show what is there.

## Seven sensibilities

These are the lenses a trained eye applies, often without words. Use them to make and to judge every decision.

**Proportion.** Size relationships carry meaning before content does. Strong work has a few decisive ratios: a display size many times the body, a picture that owns two thirds of the frame, a sidebar a quarter of the window. Weak work has every relationship close to 1:1. Ask whether the biggest thing is big enough and the small things small enough.

**Tension.** A composition with nothing pulling against anything is inert. Tension comes from asymmetry held in balance, a large mass against a small precise detail, a strict grid with one element deliberately breaking it, or calm type beside a loud image. Tension in one place reads as intent; tension everywhere reads as noise.

**Economy.** Every element is doing a job you can name. Remove something and see whether anything is lost. When nothing is lost, it stays out. Economy is not emptiness. A dense trading screen can be perfectly economical, and a sparse landing page can be wasteful if its space says nothing.

**Specificity.** The design could only belong to this product. Its colours come from somewhere real, its words are what someone who works there would say, and its pictures show the actual thing. Specific choices also age better than fashionable ones.

**Material honesty.** Each medium behaves like itself. Glass is translucent only where something is behind it, shadows come from one light, paper does not glow, a 3D object has believable weight, and a button looks pressable because of how it is drawn rather than because it bounces. Mixing mediums is fine when the roles are deliberate. Mixing them by accident looks cheap.

**Voice.** Every surface speaks. Type, wording, colour temperature, corner shape and motion speed all say something about who made this and who it is for. Keep the voice consistent across every screen, from the error message to the hero, and make it the voice of the product, not of "a tech company".

**Time.** Things are seen in sequence and used repeatedly. Ask what someone notices first, second and third, what the hundredth use feels like, and what still works when the animation is gone. Design for the hundredth visit as well as the first.

## Making a single decision with taste

For any choice that matters (a typeface, an accent, a layout for one section, the shape of a control), do this instead of picking the first thing that comes to mind:

1. **Ask what the material says.** Go back to the ground in the record. Is there an object, document, place or habit in the domain that suggests an answer? A tide table suggests tabular numerals and a horizon-wide layout. A seed packet suggests a printed two-ink palette and a small dense label system. Start there.
2. **Generate your own candidates.** Produce three genuinely different answers yourself, from the material, not from memory of what usually works. Make them differ in kind (a serif text face, a grotesk, a mono, for example), not in degree (three shades of blue).
3. **Throw away the one that came first and easiest.** It is almost always the median. Keep it only if, after considering the others, it really is the best fit, and write down why.
4. **Test in the render, not in your head.** Set the real words in each candidate face, put each candidate colour on the real surface, and compare at actual size. Your expectations about how a font or colour will look are less reliable than a screenshot.
5. **Choose by fit to the thesis.** Pick the option that makes the thesis most visible, with the least strain on the canon.

This is how the taste becomes yours. Kern supplies the habit of deriving and testing. The answers come from the subject and from looking.

## Seeing finish

The kerning pass happens after the design works. Look at the render at 100% and then at 200%, and check:

- **Alignment.** Do text, icons and image edges line up optically, not just in CSS? Round letters and play-button triangles need to overshoot their box. Icons beside text centre on the x-height, not the line box.
- **Rag and breaks.** Look for one-word last lines in headings, awkward breaks inside names or numbers, and widows in short paragraphs.
- **Crops.** Does each image crop to its subject with deliberate headroom? Does it still crop well at every width? Is anything stretched, blurred or showing compression?
- **Strokes and radii.** Are there one or two stroke weights and corner radii, consistent across icons, borders and controls, with nested corners concentric?
- **Numbers.** Values that compare should use tabular figures and align on the decimal. Units should be consistent and stay out of the way.
- **States.** Check hover, press, focus, disabled and selected on every control, and check that each one is designed rather than defaulted.
- **Edges of the system.** Look at the scrollbar, selection colour, focus ring, caret, placeholder text, native select menus and autofill backgrounds. These are the places a design stops being designed.
- **Chrome.** Does the window frame, title bar, status bar or browser tab colour continue the app's surface?

## Using references

When someone supplies a reference, separate three layers:

- **Appearance:** scale, contrast, crop, type and spacing.
- **Behaviour:** trigger, sequence and pacing.
- **Principle:** why attention or comprehension improves.

Carry the principle, adapt the behaviour, and borrow the appearance only when asked. "Make it like Linear" usually means calm density, keyboard-first speed and precise state feedback. It does not mean a dark violet theme. Never copy another brand's assets or identity.

## Two failure modes

- **The median.** Every choice is the most common one. The result is competent and forgettable, and it is identical across products and across models. See [median](median.md).
- **The avoidance aesthetic.** All the median choices have been removed and nothing put in their place. The result is a page or app with good manners and no idea: thin type, grey on white, empty space, no pictures, nothing that moves. Removing defaults is half the job. The other half is substance: the real content, real pictures, decisive scale, motion where something moves, depth where the subject has depth, and the one idea. Taste is knowing when to be quiet *and* when to be loud. See [the register](register.md).

## Seeing richness

When a design calls for richness, look at it the way you look at finish:

- **Is the picture big enough?** Pictures of the subject usually want to be much larger than a first instinct places them, and cropped braver.
- **Is the rich element convincing?** A 3D scene with flat light, a dither on the wrong pictures, ASCII on a broken grid or motion at the wrong speed is worse than none. Fix it or remove it.
- **Is it in one place, or smeared everywhere?** One scene at full strength reads as intent. Ten effects at half strength read as a template.
- **Does the rest of the page hold up its end?** The quiet parts around a loud element still need decisive type, real content and designed controls.
- **Does it survive the hundredth visit?** Motion that delights once and blocks forever after needs to get shorter, skippable or remembered.
