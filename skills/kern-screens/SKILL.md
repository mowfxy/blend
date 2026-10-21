---
name: kern-screens
description: Kern specialist for surfaces beyond the phone and the desktop window, including smartwatches (watchOS, Wear OS), TV and 10-foot interfaces (tvOS, Android TV, web TV apps), in-car screens (CarPlay, Android Auto), kiosks and point-of-sale, home-screen and lock-screen widgets, menu bar and system tray apps, browser extensions, and spatial apps (visionOS, XR). Use it whenever the UI runs on one of these surfaces or has to adapt to them.
---

# Kern Screens

Each of these surfaces has a different distance, input, attention span and set of platform rules. Locate the surface first ([method step 1](../kern/references/method.md#1-locate)), because the posture decides more than taste does. Hold the [canon](../kern/references/canon.md) throughout.

## Watch (watchOS, Wear OS)

- **Posture:** seen for two seconds, wrist raised, often in motion. Design for one fact per screen and one primary action.
- **Layout:** full-bleed, with content reaching the rounded edges. On watchOS, use vertical pagination, `NavigationStack` and toolbar items. On Wear OS, use scrolling lists with curved text at the edges and time text at the top.
- **Type:** the system faces at their watch sizes, with large numerals for the main fact. Never set reading text below the platform's caption size.
- **Colour:** black backgrounds on OLED (true black is right here), with one accent for the app's identity and state.
- **Complications and tiles:** one glanceable value, designed for each family and rendering mode (full colour, tinted, accented).
- **Input:** the Digital Crown or rotating bezel for scrolling and adjusting values, large tap targets, and haptics for confirmation.

## TV and 10-foot interfaces (tvOS, Android TV, Google TV, web TV)

- **Posture:** viewed from three metres, controlled with a remote's directional pad, often by several people at once.
- **Focus is the interface.** Every element is reachable by D-pad, and the focused element is unmistakable (scale, lift, highlight, tvOS parallax). Focus movement must be predictable in all four directions.
- **Type:** large. Body text around 24–29 pt on tvOS or 24 sp or more on Android TV, with titles much larger. Keep text short.
- **Safe areas:** keep content inside the overscan-safe insets, about 60 px horizontally and 80 px vertically at 1080p, while backgrounds go full-bleed.
- **Layout:** rows of large artwork, one hero, a minimal chrome layer that hides during playback, and no hover-dependent controls.
- **Colour:** dark surfaces suit a dim room. Avoid pure white fields and fine lines that shimmer on TVs.

## Car (CarPlay, Android Auto, embedded automotive)

- **Safety comes first.** Use the platform templates, which are mandatory for most app categories. Keep the interaction minimal, with glanceable information, large targets and no text entry while driving.
- **Day and night:** design both themes, with the night theme dimmed. The system switches automatically.
- **Voice and steering-wheel controls** are primary inputs. Lists stay short and important things come first.

## Kiosk, point of sale and public screens

- **Posture:** strangers, standing, possibly in a hurry, possibly wearing gloves, possibly in sunlight.
- **Targets:** large (at least 60 px), with high contrast and no hover. Make a timeout reset to the start screen with a visible countdown.
- **Flow:** linear, with one decision per screen, a visible way back and to the start, and a clear end state ("Take your receipt").
- **Accessibility:** reachable heights for wheelchair users, an audio alternative where required, and support for large text.

## Widgets

- **One job:** a fact, a count or a next item. Tapping goes straight to that thing.
- **Design each size as its own composition**, not as a scaled version of another size.
- **Respect the system:** corner radius, margins and rendering modes (tinted, clear and accented on iOS, dynamic colour on Android). Use real data only, and show a sensible placeholder in the gallery preview.

## Menu bar and system tray apps

- **Tray icon:** monochrome, a template image on macOS that adapts to light, dark and tinted menu bars, sized and weighted like system icons.
- **Popover or menu:** compact, opening instantly, with keyboard navigation and a clear way to the full app or settings. It closes on outside click and on Escape.
- **Behaviour:** offer start at login as an opt-in, don't steal focus, and add no Dock icon unless the app has windows.
- **Chrome:** the popover uses the system material and matches the menu bar's theme. No custom title bar ([kern-desktop](../kern-desktop/SKILL.md)).

## Browser extensions

- **Popup:** opens instantly at roughly 360–400 px wide, with one primary task. It follows the browser's light or dark theme and does not imitate the website it runs on.
- **Injected UI:** use a shadow DOM to isolate styles, keep it minimal, make it dismissible and keep it out of the host page's layout. Never imitate the host site's identity.
- **Options page:** a simple settings form using the [kern-product](../kern-product/SKILL.md) form rules.

## Spatial (visionOS, XR)

- **Windows, volumes, spaces:** start in a window in the shared space. Use volumes for 3D content and a full space only for immersive moments the user chooses.
- **Materials:** glass windows that adapt to the room's lighting. Keep content legible against any background, and use vibrancy for text on glass.
- **Input is eyes and hands.** Targets need at least 60 pt of spacing between centres, hover effects on everything interactive, and no precise dragging requirements.
- **Depth:** use it to create hierarchy, with small offsets for ornaments and toolbars. Keep content at a comfortable distance, and never place UI behind the user or attached to their head.
- **Comfort:** no forced motion, a stable horizon, and a way to leave immersion.

## Verify

Test on the platform's simulator or device at real viewing distance. Glance at the watch for two seconds. Sit three metres from the TV and navigate with only the D-pad. Run the car template at night. Use the kiosk while standing, with the timeout running. Check widgets in every rendering mode.
