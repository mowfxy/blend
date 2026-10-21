---
name: kern-desktop
description: Kern specialist for desktop applications on macOS, Windows and Linux, built with Electron, Tauri, SwiftUI, AppKit, WinUI, WPF, GTK/libadwaita, Qt or Flutter desktop. It makes the title bar and toolbar part of the app instead of sitting on top as a default grey strip, and it applies native window behaviour, menus, keyboard paths, density, sidebars, inspectors, system themes and materials. Use it for any desktop app UI, an Electron or Tauri wrapper, a "make this feel native" request, or an app whose top bar looks wrong.
---

# Kern Desktop

A desktop app is a place people work in for hours, using a pointer and a keyboard, in a window they resize, beside other apps that all follow the same platform conventions. Read [the canon](../kern/references/canon.md) first. On desktop, three principles fail more than any others: **chrome belongs to the content** (6), **the platform's grammar first** (7) and **light and dark both designed** (9).

## The title bar is part of the app

The most common tell of an AI-built desktop app is a default title bar, a grey or white OS strip, sitting on top of an app whose own surface is a different colour. Fix it on every desktop build, from the first commit:

1. **Extend the content into the title bar area.** The app's top surface, whether that is the sidebar, the toolbar or the document header, runs to the top edge of the window.
2. **Put the window controls inside your layout.** On macOS, the traffic lights sit inset in the sidebar or toolbar, vertically centred on the toolbar row. On Windows, the caption buttons sit at the top right of your own toolbar row, with their colours matched to it. On Linux, follow the GTK/libadwaita header bar.
3. **Make the area draggable.** The empty parts of the toolbar row drag the window and double-click to zoom or maximise per platform. Buttons, fields and tabs in that row are not draggable.
4. **Match the theme live.** When the system switches between light and dark, the title bar area changes with the rest of the app, including the Windows caption button colours.
5. **Keep the title meaningful.** Even with the title text hidden, set the window title (document name, current view) so that the Dock, taskbar, window menu and Alt-Tab all show it.
6. **Leave room for the controls.** Reserve the traffic-light inset (about 72–80 pt from the left on macOS) and the caption-button width (about 138 px on Windows at 100% scaling) so nothing collides with them.

Exact code for Electron, Tauri, SwiftUI, AppKit, WinUI 3, WPF, GTK, Qt, Flutter and installable web apps is in [chrome](references/chrome.md). Treat that file as required reading for every desktop build.

## Structure

- **Sidebar · content · inspector** is the desktop's native skeleton for anything with collections. A full-height sidebar holds the traffic lights at its top on macOS. Use it when the product has navigable collections, and not by reflex for a single-purpose utility.
- **Toolbars hold verbs, sidebars hold nouns.** Put frequent actions in the toolbar with icons and tooltips that include the shortcut, and the rest in menus.
- **Menus are not optional.** On macOS the app needs a real menu bar (App, File, Edit, View, Window, Help) with standard shortcuts. On Windows and Linux, use a menu bar or a command menu appropriate to the app. Every command reachable by pointer is also reachable by keyboard, and the shortcuts are listed in the menu.
- **A command palette** (⌘K or Ctrl+K) complements menus in power tools but does not replace them.
- **Context menus** on every selectable object, with the same commands as the menus.
- **Windows and state.** Remember window size, position, sidebar width, selection and scroll position between launches. Support multiple windows or tabs when the documents are independent.
- **Resizing.** Design for the narrowest sensible window (often 800×500) and a large one. Sidebars collapse, inspectors become popovers, and content reflows. Nothing should break when the window gets narrow.

## Density and pointer

Desktop is precise. On macOS, typical controls are 22–28 pt tall, list rows 24–32 pt, body text 13 pt and secondary text 11 pt. On Windows (Fluent), typical control heights are 32 px, list rows 32–40 px, body text 14 px and captions 12 px. Larger is fine when the context calls for it (a kiosk-like app, gloves, accessibility), but do not ship mobile-sized controls by default.

- Use the arrow cursor on controls, which is the platform standard, rather than the hand cursor on everything as on the web. Show the hand only on true links.
- Give hover a subtle state, because pointer users read it. Focus rings follow the system accent.
- Selection uses the system accent colour (or your accent mapped to it). Inactive windows dim their selection to grey, as native apps do.
- Text in the interface is not selectable by default. Content text is.
- Scrollbars follow the platform: overlay scrollbars on macOS, thin auto-hiding scrollbars on Windows 11. Do not ship web-styled scrollbars.

## Materials and theme

- **macOS:** use the system materials for sidebars and toolbars where they fit (vibrancy, `.sidebar` and `.titlebar` materials, and Liquid Glass on macOS 26 and later). Translucency should show what is behind it, typically the desktop or the content scrolling under the toolbar. A translucent panel over a flat colour just looks grey.
- **Windows 11:** Mica for the window background, Acrylic for transient surfaces such as flyouts and menus. Keep corner radii consistent with the OS (8 px windows, 4 px controls).
- **Linux:** follow libadwaita's flat header bars and the user's light, dark and accent preferences when targeting GNOME. For other desktops, respect the system theme.
- **Custom identity** goes in the content layer: the document canvas, the empty states, imagery, type in the content, and an accent that harmonises with the system accent or replaces it deliberately. The chrome stays calm and platform-true.
- **Follow the system theme** by default, and offer an override in settings. Both themes get designed palettes ([kern-color](../kern-color/SKILL.md)).

## Type

Use the system UI face for interface text unless the thesis has a strong reason not to: SF Pro on macOS, Segoe UI Variable on Windows 11, and the user's interface font (often Cantarell or Inter) on Linux. Electron and Tauri apps get this through `font-family: system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", sans-serif;`. Put the identity typeface in content, headings and empty states. Respect the system text-size settings where the toolkit supports them.

## Electron and Tauri specifics

- **Start with chrome.** Configure the window before building screens ([chrome](references/chrome.md)).
- **Feel native, not like a web page.** Set `user-select: none` on chrome, `cursor: default` on controls, and disable rubber-band overscroll on the app shell. Add native menus through the framework's menu API and native context menus where they fit. Use the system font, read the accent colour from the OS where available, and handle `prefers-color-scheme` changes live.
- **Startup.** Show a window with the correct background colour immediately (`backgroundColor` in Electron) so there is no white flash before the page paints.
- **Avoid accidental exposure.** The web content of a desktop app must not include web navigation, cookie banners, a website footer or "Download our app" prompts.

## States particular to desktop

Design for: an offline or sync-paused state; an unsaved document (the dot in the macOS close button, an asterisk in the title on Windows); a long-running background task with progress in the window and Dock or taskbar; a first launch with permission prompts explained in advance; an update available; a crash-recovery restore; and drag and drop with clear drop targets.

## Verify

Run the app, not just the web view in a browser. Check the following:

1. The title bar area is continuous with the app in light and dark themes, and on Windows the caption buttons match it.
2. The window can be dragged from the empty toolbar area, and the controls in that row still work.
3. The app is usable at the minimum window size.
4. The menus and shortcuts work.
5. There is no white flash on launch.
6. Keyboard-only navigation is possible.
7. The inactive-window appearance is correct.

Run `node ../kern/scripts/kern.mjs audit <src>`. It checks the most common chrome omissions in Electron, Tauri, SwiftUI and WinUI code. Screenshot both themes, and the window at its narrowest.
