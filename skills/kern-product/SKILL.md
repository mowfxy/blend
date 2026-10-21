---
name: kern-product
description: Kern specialist for web applications and SaaS products such as tools, admin panels, CRMs, editors, inboxes, settings, onboarding, forms, records, lists and detail views. It covers task flows, information architecture, navigation, density, every UI state, keyboard paths, continuity between views, and an identity that does not get in the way of the work. Use it when building or improving any logged-in product screen or flow, or when an app looks like a generic admin template. Pair it with kern-dashboard for data-dense views and kern-desktop when the app ships in a desktop wrapper.
---

# Kern Product

A product is used repeatedly by people trying to get something done. Its quality is measured on the hundredth use: how fast, how calm, how few mistakes. Work through the [method](../kern/references/method.md) and hold the [canon](../kern/references/canon.md). For a product, *ground* means the actual tasks, the records and their real fields, how often each action happens, and what a mistake costs.

## Start from the task

- **Map the loop.** Entry, orientation, action, result, recovery, for the three most frequent tasks and the one most consequential one. Design those flows first. Everything else is settings.
- **Name things in the user's words.** The labels, the empty states and the error messages come from the specimen in the record, not from the data model.
- **Calibrate density to frequency.** A screen used all day can be dense, aligned and keyboard-driven. An occasional, high-stakes flow gets space, context and explicit consequences. Within one product, different screens can have different densities.

## Structure

- **Navigation follows the nouns.** Keep a small set of top-level collections, and do not mirror the database. A sidebar suits many collections, top tabs suit two to five, and a single-purpose tool may need no navigation at all.
- **List and detail keep context.** Moving from a list to a record and back preserves the filters, sort order, selection and scroll position. Prefer side panels or split views to full-page jumps when people compare records.
- **Use the right container for the job.** Inline editing for quick changes; side panels for work that needs the page behind it; modals only for short decisions that block; full pages for long, independent tasks.
- **Tables are the product** for records. Use stable columns, numbers right-aligned in tabular figures, sticky headers, sensible truncation with the full value available, row actions on hover and in a menu, bulk selection, and a narrow-screen strategy (priority columns or a card per row).
- **Forms.** One column; labels above fields; groups with headings; inputs sized to their expected content; validation after the field is finished, not on every keystroke; errors that say how to fix the problem, next to the field; and the primary action named for its result.

## Every state

For every screen, design and build: empty (first use, explaining what will appear and offering the first action), loading (skeletons that match the layout, with progress for long jobs), partial, error (what happened, what to do, and the user's input preserved), offline, no permission, overflow (long names, 10,000 rows), and success that appears only after the work is confirmed. Empty and error states use the same system as the populated state. They are not a separate brand.

## Speed and keyboard

- Use optimistic updates where the operation is safe and reversible, with an undo instead of a confirmation dialog.
- Provide keyboard shortcuts for frequent actions, a command menu in power tools, visible focus everywhere, and focus that moves sensibly after a dialog closes or an item is deleted.
- Debounce search, keep scroll position across navigation, and never make the user re-enter something they already gave.

## Identity in a product

Utility does not require generic styling. The product's identity lives in:

- **Its colour source and stance.** Often this means quiet neutrals with one meaningful accent used for the primary action and the current selection.
- **Type**, especially for numbers, headings and empty states.
- **Its words.**
- **One signature detail** from the thesis: the way a record's status is drawn, a header that echoes a domain document, an empty-state illustration system.

Chrome and repeated controls stay calm. Repeated-work screens get no ambient backgrounds, no glass over flat colour and no decorative motion.

## Controls and icons

Products are where component kits are most useful and most visible. Use the kit for behaviour and accessibility, and redesign its surface: button anatomy, input frames, focus rings, toggles and menus get the system's stroke, radius and accent ([kern-controls](../kern-controls/SKILL.md)). A large product may use a library icon set, chosen for its construction and tuned to the system's stroke and size, with the product-specific icons drawn to match. Record which set and why.

## Verify

Run the primary path, a recovery path, a first-use empty state, long content and a narrow window. Then check keyboard-only use, plus repeated and interrupted input such as a double submit, going back mid-flow and a session timeout. Render light and dark if both ship. Score with [kern-critique](../kern-critique/SKILL.md), using its product weighting.
