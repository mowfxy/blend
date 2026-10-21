---
name: kern
description: Kern by M4 Labs is a design practice for AI agents. It gives you your own taste and a method for building interfaces that are specific to the product, not the average of what models usually ship, including how loud each product should be: when it needs photography, illustration, motion, ASCII animation or live 3D, and when it should stay quiet. It covers websites, web apps, dashboards, desktop apps (macOS, Windows, Linux, Electron, Tauri), iOS and iPadOS, Android, watch, TV, terminal UIs, slides, email and documents. Use it whenever you design, build, redesign, restyle or critique anything visual. Use it when the user says "kern" or says a UI looks generic, AI-made, plain, samey, off or unfinished. It routes to the Kern platform and craft specialists. Narrow fixes stay narrow.
---

# Kern

Kern is the gap a designer adjusts by eye after the font's own spacing is set. The metrics are what the tools give you; the kerning is what someone with taste decides. This practice is about that second part.

Your job is not to pick a style. Your job is to understand the thing well enough that its design follows from it, and then to finish it with an eye that notices what is off. The taste is yours to use. Nothing in Kern hands you a palette, a layout, or a list of directions to choose from. If you catch yourself choosing from a menu, including one you made up in your head, stop and go back to the material.

## Load order

1. **This file:** the method in brief.
2. **[The canon](references/canon.md):** the principles you may never drop, on any platform, at any size of task. Read it every time.
3. **[The eye](references/eye.md):** how taste actually works and how to see quality. Read it before any new design, redesign or taste correction.
4. **[The median](references/median.md):** what convergent AI output looks like on each platform. Use it to recognise your own defaults, not as a list of bans.
5. **[The register](references/register.md):** how loud this product should be, and which rich materials (pictures, motion, 3D, text-mode, texture, play) it is made of. Read it before any new design.
6. **[The method](references/method.md):** the full derivation, step by step, with worked reasoning.
7. **The platform specialist**, plus craft specialists only for the decisions that need them (table below). For anything with buttons, icons or inputs, that includes [kern-controls](../kern-controls/SKILL.md).

Write the working record to `.kern/record.md` in the project ([template](references/record.md)). Kern never writes any other folder name.

## The method in brief

Do these in order. On a narrow fix, do 1, inherit the rest from the existing product, and go straight to 8 and 9.

1. **Locate.** Name the surface (marketing page, tool, dashboard, desktop app, phone app, watch face, terminal, deck…), the platform, the device, the posture (glanced at, worked in all day, presented to a room), and how often and how urgently people use it. Load that platform's specialist. The platform decides the grammar before you decide anything.
2. **Ground.** Gather what is real: the actual strings, numbers, records and media at their real lengths; who uses it, when, where and under what stakes; and the material culture of the domain, meaning the objects, documents, tools, places and marks its people already know. Write the ten to fifteen most specific facts in the record. Distinct design comes from distinct facts, so the more specific this list, the less your output will resemble anyone else's.
3. **Find the tension.** Every worthwhile brief has two forces pulling against each other: dense but calm, playful but trusted, fast but careful, archival but alive. Name this brief's tension in one line. The design is how you resolve it.
4. **Write the thesis.** One sentence: *"This should feel like [something concrete from step 2], because [the tension it resolves]."* Run two tests. The **swap test**: put the nearest competitor's name in and see if the sentence still works. The **adjective test**: if the sentence leans on clean, modern, sleek, premium, minimal, bold or elegant, it is not a thesis yet.
5. **Name the median, then leave it.** Before deciding anything visual, write down in the record what an average model would ship for this exact brief: its layout, typeface, palette, hero, components and motion. Be honest and specific. That median is now presumed wrong. A decision may match it only if the thesis arrives there independently and you can say why in one sentence. This is how Kern avoids becoming one more house style.
6. **Set the register.** Decide how loud this product should be, from what it offers, how often and in what state it is used, how sensory its subject is and what the domain's best artefacts look like ([register](references/register.md)). Then go through the richness inventory and decide which materials it is made of: photography, archival images, illustration, image treatment, type as image, texture, motion, text-mode and ASCII, live 3D, generative art, sound, play. Every rich element must pass the relevance test: it is the product's own material, it carries something a still cannot, and you can make it convincing. Then spend the register you named. Silent work stays silent; expressive work that renders like a SaaS page has not committed.
7. **Derive the system.** Compute each token from the thesis and the ground, not from habit. Colour comes from a named source in the domain; type from the reading conditions and the voice; spacing and density from how often the task is done; shape from the material; motion from the product's physics; chrome from how the platform's window or system UI should meet the content; icons and controls from the domain's own instruments and marks ([kern-controls](../kern-controls/SKILL.md)). Give every token a *because*. Specialists hold the craft for each one.
8. **Compose the hardest real screen first.** That is the densest, longest or most stateful one, with real content, before the easy hero. Every view has one dominant element. Resolve one screen completely before repeating its patterns.
9. **Critique, then kern.** Render it and look at it as a stranger would. Score it with [kern-critique](../kern-critique/SKILL.md), fix the three largest problems, and look again. Then do the kerning pass: the optical alignments, crops, spacing nudges and state details that separate finished work from almost-finished work.

Hand back with the thesis in one or two sentences and what you departed from in the median, so the user can redirect you. Do not interview the user about taste. Ask only when a missing fact blocks the work entirely. State any other assumption in one line and proceed. Explicit user requirements, an existing brand and an existing product's conventions outrank everything in Kern.

## Why outputs differ

Kern does not add randomness. Outputs differ because every step feeds on specifics the next model will not share: this brief's facts, this tension, this thesis, this negated median, this register and these materials. A tax tool and a festival site should not differ only in accent colour; one is nearly silent and the other is the loudest thing on screen. Three more rules keep it honest:

- **The ledger.** After a project's system is fixed, record its fingerprint (`node <kern>/scripts/kern.mjs ledger add`). Before you fix the next one, run `ledger check` to confirm it is not a near-duplicate of anything you have already shipped on this machine. Related products of one brand should match; unrelated ones should not.
- **No stock parts.** Icons, buttons, inputs and toggles are part of the design, not a kit dropped on top of it. A library icon set at its default stroke and a component library's default button are the fastest way for unrelated products to look identical. Draw or tune them from the domain ([kern-controls](../kern-controls/SKILL.md)); on native platforms, use the system set properly instead.
- **One defended risk.** Every new design makes at least one decision a cautious designer would not, and it comes from the thesis: an unusual proportion, a colour taken straight from the domain, a structural idea, a typographic voice. If you cannot point to it, the design is still median.

## Specialists

Read only what the task needs. They are sibling folders and can be invoked directly. If one is missing, do the work with what you have and never claim to have loaded it.

| Surface or decision | Specialist |
|---|---|
| Marketing sites, landing pages, portfolios, editorial and event pages | [kern-web](../kern-web/SKILL.md) |
| Web apps, SaaS, admin tools, forms, records, settings | [kern-product](../kern-product/SKILL.md) |
| Dashboards, analytics, monitoring, data-dense views, charts | [kern-dashboard](../kern-dashboard/SKILL.md) |
| macOS, Windows, Linux apps; Electron, Tauri, SwiftUI, AppKit, WinUI, GTK, Flutter desktop | [kern-desktop](../kern-desktop/SKILL.md) |
| iPhone, iPad, SwiftUI/UIKit, React Native or Flutter on iOS | [kern-ios](../kern-ios/SKILL.md) |
| Android phones, tablets, foldables; Compose, Material | [kern-android](../kern-android/SKILL.md) |
| Watch, TV, car, kiosk, widgets, menu bar extras, spatial (visionOS) | [kern-screens](../kern-screens/SKILL.md) |
| CLIs, TUIs, terminal output | [kern-terminal](../kern-terminal/SKILL.md) |
| Slides, email, PDFs and reports, social cards, print | [kern-media](../kern-media/SKILL.md) |
| Choosing and setting type, any platform | [kern-type](../kern-type/SKILL.md) |
| Colour systems, themes, light and dark, contrast | [kern-color](../kern-color/SKILL.md) |
| Icons, buttons, links, inputs, toggles, sliders, cursors: every control | [kern-controls](../kern-controls/SKILL.md) |
| Motion, micro-interactions, transitions, scroll, ASCII and text-mode animation, kinetic type, shaders | [kern-motion](../kern-motion/SKILL.md) |
| Photography, archival images, image treatments, illustration, live 3D, generative art, characters | [kern-imagery](../kern-imagery/SKILL.md) |
| Reviewing and scoring a render, ratings, audits | [kern-critique](../kern-critique/SKILL.md) |
| Shipping quality: accessibility, performance, honesty, SEO, security | [kern-ship](../kern-ship/SKILL.md) |

Loading a skill does not mean spawning an agent. Use the normal tools in the user's workflow.

## Keep one design

Every specialist works from the same `.kern/record.md` and the same tokens. A specialist may refine within the thesis but must not quietly replace it. When the user redirects you ("darker", "calmer", "no illustrations"), apply it, update the record, and keep everything they did not mention.

Recompose for each size instead of shrinking. A phone layout, a narrow desktop window and a TV screen are each their own composition of the same system.

## Finish in the render

A passing build, a clean lint or an accessibility scan is not proof of design quality. Look at the actual pixels at actual size, in every theme you ship, at the widths and window sizes people use. Watch the motion at normal speed and turn the 3D yourself. Report what you saw, the checks you ran, the score, and the real limits, such as checks you could not run or devices you did not test.
