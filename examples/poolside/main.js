const { app, BrowserWindow, Menu, nativeTheme } = require('electron');
const path = require('node:path');

const isMac = process.platform === 'darwin';
const TOOLBAR = 52; // px, the toolbar row the window controls sit in

// The same surface colours as --surface and --ink in style.css, so the caption buttons match the toolbar.
const surface = () => nativeTheme.shouldUseDarkColors
  ? { color: '#12181d', symbolColor: '#e6ecee' }
  : { color: '#f7f9f9', symbolColor: '#17222b' };

function createWindow() {
  const win = new BrowserWindow({
    width: 1180, height: 760, minWidth: 860, minHeight: 560,
    title: 'Poolside',
    backgroundColor: surface().color,
    titleBarStyle: 'hidden',
    ...(isMac
      ? { trafficLightPosition: { x: 18, y: (TOOLBAR - 16) / 2 } }
      : { titleBarOverlay: { ...surface(), height: TOOLBAR } }),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true },
  });

  nativeTheme.on('updated', () => {
    if (!isMac) win.setTitleBarOverlay({ ...surface(), height: TOOLBAR });
    win.setBackgroundColor(surface().color);
  });

  win.loadFile('index.html');
}

// A real menu bar: every command is reachable from the keyboard and listed with its shortcut.
function buildMenu() {
  const send = (command) => () => BrowserWindow.getFocusedWindow()?.webContents.send('menu', command);
  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    { label: 'File', submenu: [
      { label: 'New Reading', accelerator: 'CmdOrCtrl+N', click: send('new-reading') },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' },
    ] },
    { role: 'editMenu' },
    { label: 'View', submenu: [
      { label: 'Now', accelerator: 'CmdOrCtrl+Shift+N', click: send('view-now') },
      { label: 'Log', accelerator: 'CmdOrCtrl+L', click: send('view-log') },
      { type: 'separator' },
      { label: 'Main Pool', accelerator: 'CmdOrCtrl+1', click: send('pool-1') },
      { label: 'Learner Pool', accelerator: 'CmdOrCtrl+2', click: send('pool-2') },
      { label: 'Spa', accelerator: 'CmdOrCtrl+3', click: send('pool-3') },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ] },
    { role: 'windowMenu' },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => { buildMenu(); createWindow(); });
app.on('window-all-closed', () => { if (!isMac) app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
