const { app, BrowserWindow } = require('electron');
const path = require('path');
const { screen } = require('electron/main')
const { ipcMain } = require('electron');
const { createWindow } = require('./src/main/window');
const createAppMenu = require('./src/main/application-menu');
const createContextMenu = require('./src/main/context-menu');
const check = require('./src/main/squirre-handler');
const isMac = require('./src/main/is-mac');
const { APP_NAME } = require('./src/main/app-data');

let mainWindow = null;
let mainWindowInitWidth = null;
let mainWindowInitHeight = null;

/**
 * //////////////////////////////////////////////////////
 * Set dock icon
 * //////////////////////////////////////////////////////
 */
if (isMac) {
    app.setName(APP_NAME);
    app.dock.setIcon(path.join(__dirname, './assets/images/icon.png'));
}

/**
 * //////////////////////////////////////////////////////
 * Create main window and menu
 * //////////////////////////////////////////////////////
 */
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    // Main window
    // -----------------------------------

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;


    mainWindow = createWindow(width, height);
    mainWindowInitWidth = width;
    mainWindowInitHeight = height;

    // Prevent multiple instances in Electron
    // -----------------------------------
    // !!!Note: Multiple application windows with the SAME NAME cannot be opened at the same time, 
    // edit "applicationName" and "name" of "package.json"
    app.requestSingleInstanceLock();


    // Menu (for standard keyboard shortcuts)
    // -----------------------------------
    createAppMenu(APP_NAME);

});


/**
 * //////////////////////////////////////////////////////
 * Quit when all windows are closed, except on macOS
 * //////////////////////////////////////////////////////
 */
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});


/**
 * //////////////////////////////////////////////////////
 * Execute createShortcut in a Squirrel event, except on macOS
 * //////////////////////////////////////////////////////
 */
if (check()) {
    if (!isMac) {
        app.quit();
    }
}


/**
 * //////////////////////////////////////////////////////
 * Content Functions
 * //////////////////////////////////////////////////////
 */
app.on('web-contents-created', (event, webContents) => {

    const getCurrentWebContents = () => {
        return webContents;
    };
    const getCurrentAppUi = () => {
        return BrowserWindow.fromWebContents(getCurrentWebContents());
    };



    // Auto fullscreen for new popup
    // -----------------------------------
    getCurrentWebContents().once('will-navigate', () => {
        if (getCurrentAppUi() !== null) {
            getCurrentAppUi().hide();
            getCurrentAppUi().maximize();
            getCurrentAppUi().show();
            getCurrentAppUi().focus();
        }
    });



    // Menu (for right-click context menu)
    // -----------------------------------
    createContextMenu(getCurrentWebContents(), createWindow, mainWindowInitWidth, mainWindowInitHeight);


    // Supports multiple Tabs
    // -----------------------------------
    // Capture the URL of the new window
    getCurrentWebContents().setWindowOpenHandler(({url}) => {
        // send messages from the main process to renderer process
        // do not use "getCurrentWebContents().send()"
        getCurrentAppUi().webContents.send('OPEN_URL', url);  
        return { action: 'deny' }
    });


});




/**
 * //////////////////////////////////////////////////////
 * Communicate asynchronously to the renderer process
 * //////////////////////////////////////////////////////
 */
app.on('ready', () => {

    // Show main window
    //------------------
    ipcMain.on('SHOW_MAIN_WIN', (event, data) => {
        if (mainWindow === null) return;
        mainWindow.show();
    });

    // Hide main window
    //------------------
    ipcMain.on('HIDE_MAIN_WIN', (event, data) => {
        if (mainWindow === null) return;
        mainWindow.hide();
    });

    // Reload webview
    //------------------
    ipcMain.on('WEBVIEW_ID', (event, data) => {
        console.log('webview ID: ', data);
    });


});

