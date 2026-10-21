---
name: kern-android
description: Kern specialist for Android phones, tablets and foldables built with Jetpack Compose, Views, Flutter or React Native. It covers Material 3 and its expressive update, edge-to-edge layout, system bar contrast, predictive back, dynamic colour, window size classes, adaptive layouts, typography scaling, touch targets and widgets. Use it for any Android screen or app, a cross-platform mobile app shown on Android, or an iOS design being brought to Android.
---

# Kern Android

Android spans phones, foldables, tablets, ChromeOS and cars, and people bring their own wallpaper, colours and font size. A good Android app adapts to the device and the person instead of imposing one fixed frame. Read [the canon](../kern/references/canon.md).

## Grammar first

- **Navigation.** Use a navigation bar for three to five top-level destinations on compact widths, a navigation rail on medium widths and a navigation drawer or rail on expanded widths. Top app bars hold the title and actions, small or large depending on the screen's role.
- **Predictive back.** Support the system back gesture and its preview animation. Never trap back or reinvent it. Opt in with `android:enableOnBackInvokedCallback="true"` and handle back with `BackHandler` or `PredictiveBackHandler` only where state must be saved.
- **Surfaces.** Use bottom sheets for supplementary content, dialogs for decisions that block, snackbars for brief confirmations with an optional undo, and FABs only for the single primary action of a screen, if there is one.
- **Components.** Use the Material 3 components, then express identity through colour, type, shape and motion in the content.

## Edge to edge: the system bars belong to the app

On Android 15 and later, apps targeting SDK 35 are edge to edge by default. Design for it on every version:

- Call `enableEdgeToEdge()` in the activity. Draw backgrounds behind the status and navigation bars, and pad content with `WindowInsets` (`Modifier.safeDrawingPadding()`, `Scaffold`'s content padding, `WindowInsets.systemBars`).
- The status bar icons switch between light and dark to contrast with what is beneath them (`SystemBarStyle.auto` and similar). Never ship a solid strip in a colour that differs from the app's top surface.
- Use gesture navigation by default and keep interactive elements out of the system gesture areas at the bottom and the edges.
- **In Flutter**, use `SystemUiMode.edgeToEdge`, `SafeArea` for content and `SystemUiOverlayStyle` for icon contrast. **In React Native**, use `react-native-edge-to-edge` or the framework default, with safe-area insets.

## Colour

- Use **dynamic colour** (Material You) when the app is a utility that lives alongside the system. Use a **brand palette** when identity matters more. Do not use both without a reason. Even with dynamic colour, keep semantic colours for success and error fixed and readable.
- Generate tonal palettes from a source colour, and map them to roles (`primary`, `onPrimary`, `primaryContainer`, `surface`, `surfaceContainer*` and so on). The source colour comes from the thesis and the domain, not from the Material baseline purple ([kern-color](../kern-color/SKILL.md)).
- Design both light and dark themes, and consider the medium- and high-contrast schemes.

## Type, shape and motion

- **Type.** The Material type scale (display, headline, title, body, label) uses `sp` so text scales with the user's setting. Test at 200% font scale with non-linear scaling, and let layouts reflow. A brand typeface belongs in the display and headline roles, and Roboto or the system face often stays in body and labels.
- **Shape.** The shape scale runs from extra small to extra large. Choose it from the material, as in [method](../kern/references/method.md#6-derive-the-system). Material 3 Expressive adds shape morphing and more varied corners, so use them for emphasis in one place, not everywhere.
- **Motion.** Material's spring-based motion schemes (standard for utilitarian apps, expressive for playful ones) should be chosen from the product's physics. Use shared-axis, container-transform and fade-through transitions between destinations.

## Adaptive layouts

- Use **window size classes** (compact, medium, expanded, large) to change the layout, not to scale it. A list on a phone becomes list-detail on a tablet (`ListDetailPaneScaffold`), and a feed gains columns.
- **Foldables:** respect hinges and postures (tabletop, book). Keep content away from the fold and put controls on the lower half in tabletop posture.
- **Large screens and ChromeOS:** support keyboard shortcuts, mouse hover, right-click and resizable windows.

## Targets and accessibility

Touch targets are 48×48 dp at minimum with 8 dp between them. Give every icon-only control a `contentDescription`. Make sure TalkBack order follows the visual order, and that focus is visible for keyboard and D-pad users.

## Beyond the app

- **Widgets** are glanceable and resizable (built with Glance), match the system's rounded corners and use dynamic colour where appropriate.
- **The app icon** is an adaptive icon with a separate foreground and background layer, plus a monochrome layer for themed icons.
- **Splash.** Use the SplashScreen API with your icon and a background colour that matches the first frame, and keep it brief.

## Verify

Run the app on an emulator or device. Check edge-to-edge on the top and bottom of every main screen, both gesture and three-button navigation, the predictive back preview, light and dark themes and dynamic colour with two different wallpapers, 200% font scale, TalkBack on the main flow, a compact phone, a tablet in landscape and a foldable posture if supported.
