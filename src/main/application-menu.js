const { shell, Menu  } = require('electron');
const isMac = require('./is-mac');

const createAppMenu = (name) => {
    let template = [
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                { role: "pasteandmatchstyle" },
                { role: "delete" },
                { role: "selectall" },
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forcereload" },
                { role: "toggledevtools" },
                { type: "separator" },
                { role: "resetzoom" },
                { role: "zoomin" },
                { role: "zoomout" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            role: "window",
            submenu: [{ role: "minimize" }, { role: "close" }],
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Official Website',
                    click() {
                        shell.openExternal('https://uiux.cc');
                    }
                }
            ],
        }
    ];

    if (isMac) {
        template.unshift({
            label: name,
            submenu: [
                {
                    label: `About ${name}`,
                    role: 'about',
                },
                { type: 'separator' },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: [],
                },
                { type: 'separator' },
                {
                    label: `Hide ${name}`,
                    accelerator: 'Command+H',
                    role: 'hide',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers',
                },
                {
                    label: 'Show All',
                    role: 'unhide',
                },
                { type: 'separator' },
                {
                    label: `Quit ${name}`,
                    accelerator: 'Command+Q',
                    role: 'quit'
                },
            ],
        });

        // Edit menu
        template[1].submenu.push(
            { type: "separator" },
            {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
            }
        );

        // Window menu
        template[3].submenu = [
            { role: "close" },
            { role: "minimize" },
            { role: "zoom" },
            { type: "separator" },
            { role: "front" },
        ];
    }

    const builtMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(builtMenu);

};


module.exports = createAppMenu;