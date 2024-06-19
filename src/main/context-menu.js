const { Menu, MenuItem } = require('electron');


const createContextMenu = (currentWebContents, createWindow, width, height) => {
    const webviewMenu = new Menu();

    webviewMenu.append(new MenuItem({
        label: 'Back',
        click: () => {
            currentWebContents.goBack();
        }
    }));
    webviewMenu.append(new MenuItem({
        label: 'Forward',
        click: () => {
            currentWebContents.goForward();
        }
    }));
    webviewMenu.append(new MenuItem({
        label: 'Reload',
        click: () => {
            currentWebContents.reload();
        }
    }));
    webviewMenu.append(new MenuItem({
        label: 'New Window',
        click: () => {
            createWindow(width, height);
        }
    }));
    webviewMenu.append(new MenuItem({ type: 'separator' }));
    webviewMenu.append(new MenuItem({
        label: 'Cut',
        role: 'cut'
    }));
    webviewMenu.append(new MenuItem({
        label: 'Copy',
        role: 'copy'
    }));
    webviewMenu.append(new MenuItem({
        label: 'Paste',
        role: 'paste'
    }));
    webviewMenu.append(new MenuItem({ type: 'separator' }));
    webviewMenu.append(new MenuItem({
        label: 'Debug',
        click: () => {
            currentWebContents.openDevTools();
        }
    }));



    //Webview is being shown here as a window type
    currentWebContents.on('context-menu', (event, click) => {
        event.preventDefault();
        //console.log(currentWebContents.getType())
        webviewMenu.popup(currentWebContents);
    }, false);


};


module.exports = createContextMenu;