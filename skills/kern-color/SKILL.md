---
name: kern-color
description: Kern specialist for colour systems on any platform, covering deriving a palette from a real source in the product's domain, colour stance, OKLCH ramps, semantic roles and tokens, light and dark themes designed separately, high-contrast modes, data and status colour, contrast checking (WCAG and APCA) and platform colour systems (iOS semantic colours, Android dynamic colour, Windows and macOS accents). Use it whenever a palette or theme is chosen or changed, dark mode is added, colours look generic or muddy, or contrast fails.
---

# Kern Color

Kern gives you no palettes. A palette comes from a **source**, which is a real thing in the product's world, and is then built into a system with numbers you can check. This is what keeps two products from sharing the same indigo.

## 1. Name the source

Look in the record's material culture for something with colour: a laminated map, a seed packet, a hospital wristband, a weighbridge ticket, a tide-chart blue, the paint of a regional train line, a pharmacy cross, the patina on a brass fitting, the specific green of a cutting mat. Write it down as the source. If the brand already has colours, the brand is the source, so map it onto roles instead of inventing.

Describe what the source tells you:

- **Temperature of the neutrals:** warm paper, cool steel, or green-grey concrete.
- **Number of inks:** one, two (a print palette) or full colour.
- **Saturation character:** muted pigment, signal-bright or photographic.
- **Where colour lives:** small marks on a neutral field, or whole fields of colour.

## 2. Choose a stance

The stance is how much of the surface colour occupies, and what it does there:

- **Neutral field with a single accent.** The accent marks only the primary action and the current state, typically under 5% of any screen.
- **A full colour field.** One confident colour fills large areas, with ink on top.
- **A two-ink print palette.** Everything is drawn in two colours and their tints.
- **Photographic.** The colour comes from the imagery, and the interface stays neutral around it.
- **Functional.** Colour encodes only state and data, typical of tools and dashboards.

The stance follows from the thesis. Write it, with the accent's allowed share, in the record.

## 3. Build the ramps

Work in OKLCH, which spaces lightness perceptually, so steps look even and hues keep their character as they lighten.

```bash
node <kern>/scripts/kern.mjs palette "#7a2e1f" --steps 11        # ramp from the source colour
node <kern>/scripts/kern.mjs palette "oklch(0.62 0.03 85)" --neutral  # tinted neutral ramp
node <kern>/scripts/kern.mjs contrast "#1c1d1f" "#f4f3f0"         # WCAG ratio + APCA Lc
```

`<kern>` is the kern skill folder.

- **The neutral ramp** carries a little of the source's hue (chroma about 0.005–0.02), which gives warm or cool neutrals that belong to the product instead of pure grey.
- **Accent ramps:** reduce chroma at the very light and very dark ends so colours do not turn fluorescent or muddy, and nudge hue slightly towards a natural direction (yellows get warmer as they darken, blues get slightly purpler as they lighten) where the eye expects it.
- **Name tokens by role,** not by hue: `surface`, `surface-raised`, `ink`, `ink-muted`, `line`, `accent`, `on-accent`, `focus`, `selection`, `success`, `warning`, `critical`. Components only ever use roles.

## 4. Design each theme

- **Light.** The surface is rarely pure white, and ink is rarely pure black, so pick values from the ramps. Separate surfaces by tone steps before using lines or shadows.
- **Dark** is its own design, not an inversion. Make surfaces dark but not black (except on OLED watch or media apps), and make raised surfaces lighter. Reduce saturated colours in chroma and raise them in lightness so they do not vibrate. Keep text ink off pure white, often 90–95% lightness. Re-check every pair.
- **High contrast and Increase Contrast** modes strengthen boundaries and ink. Test them where the platform offers them.
- **On native platforms,** map your roles to the system's semantic colours where possible: iOS `label` and `secondarySystemBackground`, Android `colorScheme` roles, Windows and macOS accent colours. That way the app respects the system's appearance settings, and your custom colour lives in the content and the accent.
- **Chrome.** The title bar, status bar, `theme-color`, scrollbars and selection all use the theme's roles ([canon 6](../kern/references/canon.md)).

## 5. Check the numbers

- **Text** needs at least 4.5:1 contrast against its background (WCAG 2.2 AA), and **large text and UI boundaries** at least 3:1. As a guide to perceived contrast, APCA Lc 75 or more for body text, 60 for large text and 45 for non-text elements.
- **Check the states:** hover, pressed, disabled (which may be lower contrast but must still be recognisable), selected, focus ring against every background it sits on, and placeholder text.
- **Colour is never the only signal.** Pair status colour with an icon, a label or a pattern. Test with a colour-blindness simulator.

## Data and status colour

- **Keep status colours** (success, warning, critical, info) consistent across the product and reserved for status. Tune them to the palette rather than using pure traffic-light primaries, and check that they are distinguishable for colour-blind users.
- **Data palettes:** sequential (one hue, from light to dark), diverging (two hues around a meaningful midpoint) and categorical (five to seven hues at most). See [kern-dashboard](../kern-dashboard/SKILL.md#colour-for-data).

## Things that read as generated

Violet or indigo accents and purple-to-blue gradients chosen by default, cream with terracotta as the cure for them, neon on near-black for anything technical, an accent used in ten places, grey text on grey surfaces, and gradients standing in for an idea. None of these is banned. Each just needs to come from the source, which it almost never does ([median](../kern/references/median.md)).
