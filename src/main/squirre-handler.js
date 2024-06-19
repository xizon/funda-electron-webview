const ChildProcess = require('child_process');
const path = require('path');

// this should be placed at top of main.js to handle setup events quickly
// Notice that the first time the installer launches your app, your app will see a --squirrel-firstrun flag. 
// This allows you to do things like showing up a splash screen or presenting a settings UI. 
// Another thing to be aware of is that, since the app is spawned by squirrel and squirrel 
// acquires a file lock during installation, you won't be able to successfully check for 
// app updates till a few seconds later when squirrel releases the lock.

const check = () => {
    if (process.argv.length === 1) {
        return false;
    }


    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            return true;
    }
};

module.exports = check;