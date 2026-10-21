# Chrome: making the title bar part of the app

Recipes for extending an app's own surface into the title bar area and placing the window controls inside it, by framework. API names change between releases, so check the installed version's documentation when something does not compile, and keep the behaviour described in [kern-desktop](../SKILL.md#the-title-bar-is-part-of-the-app).

The pattern is the same everywhere:

1. Hide the system title bar while keeping the native window controls.
2. Let the content fill the full window height.
3. Mark the empty toolbar area as a drag region and exclude interactive controls from it.
4. Reserve space for the controls.
5. Keep the controls' colours in step with the theme.

Prefer approaches that keep the **native** window controls. Hand-drawn caption buttons lose Windows Snap Layouts, accessibility names and platform behaviour unless you rebuild all of it.

## Electron

```js
// main.js
const { app, BrowserWindow, nativeTheme } = require('electron');
const isMac = process.platform === 'darwin';

const surface = () => nativeTheme.shouldUseDarkColors
  ? { color: '#1c1d1f', symbolColor: '#e8e8e6' }   // your toolbar colours, dark
  : { color: '#f4f3f0', symbolColor: '#1c1d1f' };  // and light

const TOOLBAR = 44; // px, the height of your toolbar row

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 780, minWidth: 800, minHeight: 500,
    backgroundColor: surface().color,            // no white flash on launch
    titleBarStyle: 'hidden',                     // content extends to the top edge
    ...(isMac
      ? { trafficLightPosition: { x: 16, y: (TOOLBAR - 16) / 2 } } // centred in the toolbar row
      : { titleBarOverlay: { ...surface(), height: TOOLBAR } }),   // native caption buttons on Windows/Linux
    // Optional materials (the page background behind them must be transparent):
    // vibrancy: 'sidebar',          // macOS
    // backgroundMaterial: 'mica',   // Windows 11
  });

  nativeTheme.on('updated', () => {
    if (!isMac) win.setTitleBarOverlay({ ...surface(), height: TOOLBAR });
    win.setBackgroundColor(surface().color);
  });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);
```

```css
/* renderer */
.toolbar {
  height: 44px;
  display: flex; align-items: center;
  -webkit-app-region: drag;                       /* empty space drags the window */
  padding-left: 80px;                             /* macOS: room for the traffic lights */
}
/* Windows/Linux: the native caption buttons occupy the right; env() reports their area */
@supports (left: env(titlebar-area-x)) {
  .toolbar { padding-left: 12px; padding-right: calc(100vw - env(titlebar-area-width, 100vw) - env(titlebar-area-x, 0px)); }
}
.toolbar button, .toolbar input, .toolbar [role="tab"] { -webkit-app-region: no-drag; }
.app { user-select: none; cursor: default; overscroll-behavior: none; }
.app :is(article, .content, input, textarea) { user-select: text; }
```

The toolbar's background must be the same colour you pass to `titleBarOverlay.color`, or transparent over the same surface. Pass the platform to the renderer (for example as a class `html.platform-darwin`) so the left padding only applies on macOS. Electron also adds the `titlebar-area-*` CSS environment variables when `titleBarOverlay` is enabled, so use them rather than hard-coding the caption-button width.

## Tauri 2

`src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "windows": [{
      "title": "Harvest",
      "width": 1200, "height": 780, "minWidth": 800, "minHeight": 500,
      "titleBarStyle": "Overlay",
      "hiddenTitle": true
    }]
  }
}
```

- **macOS:** `titleBarStyle: "Overlay"` with `hiddenTitle` keeps the native traffic lights over your content. Recent Tauri 2 releases also accept `trafficLightPosition` to centre them in your toolbar row. If your version does not, size the toolbar to the default position, which is about 28 pt tall.
- **Windows and Linux:** `titleBarStyle` does not apply. Either keep the native frame and set its colour to match with `setTheme` and the system theme, or set `"decorations": false` and draw your own title bar row. In that case, add `data-tauri-drag-region` to the empty toolbar area and implement minimise, maximise and close with `getCurrentWindow().minimize()`, `.toggleMaximize()` and `.close()`. Grant `core:window:allow-start-dragging`, `allow-minimize`, `allow-toggle-maximize` and `allow-close` in `capabilities/default.json`. Custom caption buttons lose Snap Layouts on hover, so it is a real trade-off. Say so in the handoff if you choose it.
- **Materials:** `"transparent": true` plus `"windowEffects": { "effects": ["sidebar"] }` on macOS or `["mica"]` on Windows 11, with a transparent page background where the material should show.
- **Background colour:** set the window `backgroundColor` to your surface where your Tauri version supports it, so there is no white flash.

```html
<header class="toolbar" data-tauri-drag-region>
  <span class="title" data-tauri-drag-region>Today’s weigh-ins</span>
  <button>New ticket</button>
</header>
```

## SwiftUI (macOS)

```swift
@main struct HarvestApp: App {
  var body: some Scene {
    WindowGroup {
      NavigationSplitView {          // the sidebar runs full height beside the traffic lights
        Sidebar()
      } detail: {
        TicketList()
          .toolbar { ToolbarItem { Button("New Ticket", systemImage: "plus") { } } }
          .navigationTitle("Today")  // still set: used by the Window menu and Mission Control
      }
    }
    .windowToolbarStyle(.unified)    // the toolbar and title area become one row
  }
}
```

- `NavigationSplitView` with a unified toolbar is the native seamless layout. Prefer it over hiding the title bar.
- For a single-canvas app without a toolbar, use `.windowStyle(.hiddenTitleBar)` and let the content draw to the top. Keep a top inset where the traffic lights sit.
- On macOS 15 and later, `.toolbarBackgroundVisibility(.hidden, for: .windowToolbar)` lets the content show through the toolbar, `.containerBackground(.thinMaterial, for: .window)` sets the window material, and `.windowBackgroundDragBehavior(.enabled)` makes the background draggable.
- On macOS 26 and later, toolbars and sidebars adopt Liquid Glass automatically when built with standard components. Do not paint opaque backgrounds behind them, because that defeats the effect.

## AppKit

```swift
window.styleMask.insert(.fullSizeContentView)
window.titlebarAppearsTransparent = true
window.titleVisibility = .hidden          // keep window.title set anyway
window.toolbarStyle = .unified
// Full-height sidebar beside the traffic lights:
let sidebar = NSSplitViewItem(sidebarWithViewController: sidebarVC)
sidebar.allowsFullHeightLayout = true
```

Content under a transparent title bar must respect `view.safeAreaInsets` or `contentLayoutRect`, so nothing sits under the traffic lights.

## WinUI 3 (Windows App SDK)

```csharp
public MainWindow()
{
    InitializeComponent();
    ExtendsContentIntoTitleBar = true;
    SetTitleBar(AppTitleBar);                         // a Grid in your XAML toolbar row
    AppWindow.TitleBar.PreferredHeightOption = TitleBarHeightOption.Tall; // 48px when the row has controls
    AppWindow.TitleBar.ButtonBackgroundColor = Colors.Transparent;
    AppWindow.TitleBar.ButtonInactiveBackgroundColor = Colors.Transparent;
    SystemBackdrop = new MicaBackdrop();
}
```

- Pad your title row by `AppWindow.TitleBar.LeftInset` and `RightInset` so content does not collide with the caption buttons.
- Interactive controls in the title row (a search box, tabs) must be passed through with `InputNonClientPointerSource.GetForWindowId(AppWindow.Id).SetRegionRects(NonClientRegionKind.Passthrough, rects)`. Recompute the rectangles on resize.
- Newer Windows App SDK releases include a `TitleBar` control that handles much of this, so prefer it when it is available.
- Update `ButtonForegroundColor` and `ButtonHoverBackgroundColor` when the theme changes.

## WPF

Use `WindowChrome` with `CaptionHeight` equal to your toolbar height, `GlassFrameThickness="-1"` and `ResizeBorderThickness`. Set `WindowChrome.IsHitTestVisibleInChrome="True"` on interactive controls in the row. A maintained Fluent library such as WPF UI's `FluentWindow` gives Mica and snap behaviour with less work.

## GTK 4 and libadwaita

Put an `AdwHeaderBar` inside an `AdwToolbarView` as its top bar. With `AdwNavigationSplitView` or `AdwOverlaySplitView`, give the sidebar and the content each their own header bar, which produces the seamless split look GNOME apps use. Keep header bars flat, and place primary actions at the start and the menu at the end. Never draw a custom title bar on GNOME.

## Qt

Frameless windows (`Qt::FramelessWindowHint`) lose native snapping, shadows and resize behaviour on Windows. Use a library that restores native behaviour (for example QWindowKit), or newer Qt APIs for extending the client area where your Qt version has them, and keep the native buttons where possible.

## Flutter desktop

Use `window_manager`: `windowManager.setTitleBarStyle(TitleBarStyle.hidden)`, wrap the toolbar in `DragToMoveArea`, and render the native buttons on Windows with the package's caption widgets or `WindowCaption`. On macOS, `macos_window_utils` or `macos_ui` provide a transparent title bar and a full-size content view.

## Installable web apps (PWA)

```json
{ "display_override": ["window-controls-overlay"], "display": "standalone", "theme_color": "#f4f3f0" }
```

```css
.toolbar {
  position: fixed; left: env(titlebar-area-x, 0); top: env(titlebar-area-y, 0);
  width: env(titlebar-area-width, 100%); height: env(titlebar-area-height, 44px);
  app-region: drag;
}
.toolbar :is(button, input) { app-region: no-drag; }
```

## The browser tab, too

For web pages and web apps in a browser, the top of the page should be a solid colour that continues into the browser chrome. Set `theme-color` per scheme for browsers that tint their toolbar with it:

```html
<meta name="theme-color" content="#f4f3f0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1d1f" media="(prefers-color-scheme: dark)">
```

Some browsers (recent Safari) sample the page's own top background or fixed header instead, so make that surface solid and deliberate. Also set `color-scheme: light dark` on `:root` so scrollbars and form controls follow the theme.
