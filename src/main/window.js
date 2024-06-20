const path = require('path');
const { BrowserWindow } = require('electron'); // @https://www.electronjs.org/docs/api/browser-window

const createWindow = (width, height) => {

    let x, y;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
        const [currentWindowX, currentWindowY] = currentWindow.getPosition();
        x = currentWindowX + 24;
        y = currentWindowY + 24;
    }
    const newWindow = new BrowserWindow({
        width: width,
        height: height,
        x: x,
        y: y,
        show: false,
        icon: path.join(__dirname, '../../assets/images/icon.png'),
        //titleBarStyle: 'hidden',
        //frame: false,
        //transparent: true,
        backgroundColor: "#fff",
        webPreferences: {
            webviewTag: true, // @https://www.electronjs.org/docs/api/webview-tag,
            preload: path.join(__dirname, "../../preload.js"), // required for some function
            /*
            !!! With these two options, you can use ipcRenderer directly in renderer.js:
            
            contextIsolation: false,
            nodeIntegration: true,
            */
        },
    });

    // Uses Webtag and load a custom html file with external content
    newWindow.loadFile(path.join(__dirname, '../../index.html'));


    // Application name
    const APP_NAME = require('../../package.json').applicationName;
    newWindow.setTitle(APP_NAME);

    
    // Display Dev Tools
    // mainWindow.openDevTools();

    // auto fullscreen
    // newWindow.maximize();


    // Emitted when the navigation is done
    newWindow.webContents.on('did-finish-load', () => {
        newWindow.show();
        newWindow.focus();
    });


    return newWindow;

};

module.exports = {
    createWindow
};
