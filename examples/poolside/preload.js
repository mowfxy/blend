const { contextBridge, ipcRenderer } = require('electron');

// The renderer only needs to know which platform's window controls to make room for.
// Menu commands arrive as plain strings; the renderer decides what each one does.
contextBridge.exposeInMainWorld('kernHost', {
  platform: process.platform,
  onMenu: (handler) => ipcRenderer.on('menu', (_event, command) => handler(String(command))),
});
