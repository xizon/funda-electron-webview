// @https://www.electronjs.org/docs/latest/api/context-bridge

const { contextBridge, ipcRenderer } = require('electron');

/*
// Usage: renderer.js => window.myapi.hideMainWin();
// you need delete "contextIsolation: false" and "nodeIntegration: true" in "src/main/window.js"

contextBridge.exposeInMainWorld('myapi', {
    hideMainWin: () => ipcRenderer.send('HIDE_MAIN_WIN'),
    showMainWin: () => ipcRenderer.send('SHOW_MAIN_WIN')
});
*/


