# Funda Electron Webview


Simulate a webview. It is convenient for the web page to open multiple tabs.


## File Structures


```sh
/
├── package.json
├── index.html
├── main.js
├── preload.js
├── forge.config.js
├── assets/
└── src
     ├── main/
     |   ├── app-data.js
     |   ├── application-menu.js
     |   ├── context-menu.js
     |   ├── is-mac.js
     |   ├── squirre-handler.js
     |   └── window.js
     └── renderer/
         └── index.js
```


## How To Use

To clone and run this repository. From your command line:

```sh
$ npm start
```

Create installers (.dmg, .exe)

MacOs: 
```sh
$ npm run make
```

Windows:

> It might be slow, please be patient.

```sh
$ npm run make:win
```
or

```sh
$ npm run make -- --arch="ia32" --platform=win32
```


## Contributing

- [Electron](https://www.electronjs.org/)
- [Electron Forge](https://www.electronforge.io/)



## Supported development environment

- Electron 31 +


## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).



