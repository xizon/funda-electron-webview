const { APP_NAME } = require('./src/main/app-data');
//@https://www.electronforge.io/guides/create-and-add-icons

module.exports = {

    // Windows and macOS (icon)
    packagerConfig: {
        icon: './assets/images/icon',  // no file extension required
    },

    makers: [
        {
            name: '@electron-forge/maker-dmg',
            config: {
                name: APP_NAME,
                overwrite: true,
                format: 'ULFO',
                icon: './assets/images/icon.icns'
            }
        },
        {
            // @https://github.com/electron/windows-installer
            name: '@electron-forge/maker-squirrel',
            config: {
                name: APP_NAME,
                // The ICO file to use as the icon for the generated Setup.exe
                setupIcon: './assets/images/icon.ico',
                // loading
                loadingGif: './assets/images/loading.gif'
            }
        },
        // Linux
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    name: APP_NAME,
                    icon: './assets/images/icon.png',
                }
            }
        }
    ]
}