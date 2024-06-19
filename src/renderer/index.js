const { ipcRenderer } = require('electron');


const calculateLayoutSize = () => {
    const webviews = document.querySelectorAll('.webview');
    if (webviews.length === 0) return;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;

    webviews.forEach((webview, i) => {
        webview.style.width = windowWidth + "px";
        webview.style.height = windowHeight + "px";
    });

};

const initWebviewTitles = () => {
    const tabTitles = new Map();
    const webviews = document.querySelectorAll('.webview');
    const tabsNav = document.querySelectorAll('.tabs-nav > .tab');
    webviews.forEach((webview, i) => {

        webview.addEventListener('dom-ready', function () {
            const _title = webview.getTitle();
            tabsNav[i].innerHTML = _title;
        });

    });
};

const openTab = (tabId) => {
    const _id = tabId.replace('-btn', '');
    const tabContent = document.querySelectorAll('.tabs-content-container > .tabs-content');
    const tabsNav = document.querySelectorAll('.tabs-nav > .tab');
    tabContent.forEach(el => {
        el.classList.remove('active');
    });
    tabsNav.forEach(el => {
        el.classList.remove('active');
    });
    
    document.getElementById(_id).classList.add('active');
    document.getElementById(_id + '-btn').classList.add('active');
    
};



const addTab = (url) => {

    document.querySelector('.tabs-content-container').insertAdjacentHTML('beforeend', `
        <li class="tabs-content"">
            <webview autosize="on" src="${url}" class="webview" allowpopups></webview>
        </li>
    `);
    document.querySelector('.tabs-nav').insertAdjacentHTML('beforeend', `<li class="tab">New Tab</li>`);
    calculateLayoutSize();

    // format Ids & title
    const tabContent = document.querySelectorAll('.tabs-content-container > .tabs-content');
    const tabsNav = document.querySelectorAll('.tabs-nav > .tab');
    tabContent.forEach((el, index) => {
        el.id = `tab-${index}`;
    });
    tabsNav.forEach((el, index) => {
        el.id = `tab-${index}-btn`;
    });

    // active last tab
    openTab(`tab-${tabsNav.length - 1}`);


    // click events
    document.querySelector('.tabs-nav').addEventListener('click', (event) => {
        const target = event.target;
        if (target.className == 'tab') {
            for (let i = 0; i < tabsNav.length; i++) {
                if (target == tabsNav[i]) {
                    openTab(target.id);
                    break;
                }
            }
        }
    });

    // initialize tab title
    initWebviewTitles();

    

};

/**
 * //////////////////////////////////////////////////////
 * Custom Tabs
 * //////////////////////////////////////////////////////
 */
ipcRenderer.on('OPEN_URL', (event, url) => {
    addTab(url);
});

window.addEventListener('DOMContentLoaded', () => {
    calculateLayoutSize();

    
    // initialize tab title
    initWebviewTitles();


    // Dynamic resize function (responsive)
    window.onresize = calculateLayoutSize;

});


