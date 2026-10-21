---
name: kern-ios
description: Kern specialist for iPhone and iPad apps built with SwiftUI, UIKit, React Native, Expo or Flutter. It covers Human Interface Guidelines grammar, navigation stacks, tab bars, sheets, lists, Dynamic Type, SF Symbols, safe areas, edge-to-edge content under the status bar, Liquid Glass materials, haptics, widgets, Live Activities, iPad multitasking and pointer support. Use it for any iOS or iPadOS screen, app redesign, or cross-platform mobile app shown on iOS, or when an app "feels like a website in a phone".
---

# Kern iOS

An iPhone app is held in one hand, used in short bursts, often outdoors and often interrupted. People's thumbs already know iOS: swipe back, pull to refresh, the tab bar, sheets, long-press menus. Read [the canon](../kern/references/canon.md). On iOS, the identity of an app comes from its content, its colour, its typography in the content layer, its imagery and its motion, and not from reinventing system controls.

## Grammar first

- **Navigation.** Use a `NavigationStack` for hierarchy, a tab bar for top-level sections (two to five), sheets for focused tasks that return, and full-screen covers only for immersive modes. Never break the swipe-back gesture with a custom back button.
- **Bars.** Large titles on top-level lists, collapsing to inline titles on scroll. Bar buttons hold verbs in system positions: primary action at the trailing edge, and Cancel or Close at the leading edge of a sheet.
- **Lists and forms.** Use system lists (inset grouped for settings and forms, plain for content). They give you Dynamic Type, swipe actions, selection, reordering and accessibility for free. Do not rebuild them as card stacks.
- **Menus and confirmation.** Use context menus on long press, `Menu` for options, confirmation dialogs for destructive choices and alerts only for things that truly interrupt.
- **Search.** Use `.searchable` in the navigation bar with suggestions and scopes.
- **Haptics.** Light feedback for selection, success, warning and error, using `sensoryFeedback` or `UIFeedbackGenerator`. Keep it sparing and always tied to a real event.

## The status bar belongs to the app

The phone version of the default title bar is a white or black strip above a coloured app. Instead:

- **Run content edge to edge** under the status bar and home indicator. Backgrounds ignore the safe area (`.ignoresSafeArea()` on the background layer only), while text and controls respect it.
- **Let navigation bars take their appearance from the content.** With the standard behaviour, bars are transparent at the scroll edge and gain material when content scrolls under them. Set both `standardAppearance` and `scrollEdgeAppearance` in UIKit, or use `.toolbarBackground` in SwiftUI, deliberately, so the bar is not a mismatched block.
- **Match the status bar style** to what is beneath it: light content over dark imagery, dark content over light imagery.
- **In React Native and Expo**, use `react-native-safe-area-context`, set the status bar style per screen, and avoid the opaque default header colours. In Flutter, use `SafeArea` for content only and set `SystemUiOverlayStyle`.

## Liquid Glass (iOS 26 and later)

On iOS 26 and later, system bars, tab bars, toolbars and controls are rendered in Liquid Glass. They float above the content and refract it.

- **Build with standard components** and they adopt it automatically. Remove custom opaque backgrounds behind bars and tab bars, which flatten the effect and look dated.
- **Keep glass in the navigation layer** (bars, floating controls, sheets) and keep the content layer opaque and content-led. Glass on glass, or glass over flat colour, reads as grey murk.
- **Use custom glass sparingly.** `.glassEffect()` with `GlassEffectContainer` is for floating controls that need it, not for every card.
- **Check legibility over busy content** and with the Reduce Transparency and Increase Contrast settings turned on.

On earlier iOS versions, the same structure works with the system materials (`.regularMaterial`, `.bar`).

## Type and sizing

- **Use San Francisco through text styles** (`.largeTitle` … `.caption2`) so Dynamic Type works. Custom faces belong in content and branding. Register them with `UIFontMetrics` or `.custom(_:size:relativeTo:)` so they scale too.
- **Test at the largest accessibility sizes.** Layouts must reflow, with stacks becoming vertical and nothing truncating critical meaning. Use `ViewThatFits` or `dynamicTypeSize` checks to change the layout, not to clamp the text.
- **Touch targets are 44×44 pt at minimum.** Keep the main actions in the bottom half, where the thumb reaches.
- **Use SF Symbols** in a weight and scale that match the adjacent text, with hierarchical or palette rendering where colour carries meaning. A custom icon set has to match their optical weight.

## Colour and theme

- **Ship light and dark.** Use semantic system colours for chrome (`.primary`, `.secondary`, background levels) and your own designed palette for content and the accent ([kern-color](../kern-color/SKILL.md)).
- **Give dark mode elevated surfaces**, lighter as they come forward, and no pure black under text, except on purpose for OLED media apps.
- **The accent** sets tint for controls. Check it against both backgrounds and in Increase Contrast.

## iPad

- Use `NavigationSplitView` for two or three columns, and design compact and regular size classes as separate compositions.
- Support pointer hover effects, keyboard shortcuts (`.keyboardShortcut`, shown when Command is held), drag and drop between apps, and multiple windows when documents are independent.
- On iPadOS 26 and later, apps run in freely resizable windows with menu bars. Design for any window size, and provide a menu structure through `commands`.

## Beyond the app

- **Widgets:** one fact, glanceable, tapping deep-links to that fact. Design each family size separately, and support the tinted and clear rendering modes.
- **Live Activities and Dynamic Island:** show live state in the compact, minimal and expanded presentations, with real progress only.
- **App icon:** one simple silhouette, readable at 29 pt, with designed dark, tinted and clear variants.
- **Launch:** the launch screen matches the first frame of the app, with no splash logo animation and no forced onboarding before value.

## Verify

Run the app in the simulator or on a device, not only in previews. Check the largest Dynamic Type size, dark mode, Reduce Motion and Reduce Transparency, VoiceOver labels and order on the main flow, swipe-back on every pushed screen, a small phone and a large phone, and iPad if supported. Screenshot the top of every main screen to confirm the status bar and navigation bar continue the content.
