
const calculateLayoutSize = () => {
    const webviews = document.querySelectorAll('.webview');
    if (webviews.length === 0) return;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;

    webviews.forEach((webview, i) => {
        webview.style.width = windowWidth + "px";
        webview.style.height = windowHeight - document.querySelector('.tabs-nav').offsetHeight - 5 + "px";
    });

};

const initWebviewTitles = () => {
    const tabTitles = new Map();
    const webviews = document.querySelectorAll('.webview');
    const tabsNav = document.querySelectorAll('.tabs-nav > .tab');
    webviews.forEach((webview, i) => {

        webview.addEventListener('dom-ready', function () {
            const _title = webview.getTitle();
            tabsNav[i].firstChild.innerHTML = _title;
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
    document.querySelector('.tabs-nav').insertAdjacentHTML('beforeend', `<li class="tab"><span>New Tab</span><small tabindex="-1" class="tab-close"><svg width="12px" height="12px" viewBox="0 0 16 16"><path fill="inherit" d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fill-rule="evenodd"></path></svg></small></li>`);
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


    // switch events
    const switchFun = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.id;
        openTab(targetId);
    };

    document.querySelectorAll('.tabs-nav .tab').forEach((el) => {
        el.removeEventListener('click', switchFun);
        el.addEventListener('click', switchFun);
    });



    // close events
    const closeFun = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const root = event.currentTarget.parentElement;
        const targetId = root.id;
        const _id = targetId.replace('-btn', '');
        const nextTab = root.nextSibling;
        if (document.getElementById(_id)) document.getElementById(_id).remove();
        if (document.getElementById(_id + '-btn')) document.getElementById(_id + '-btn').remove();

        // active last tab
        if (nextTab !== null && root.classList.contains('active')) {
            const lastTabId = nextTab.id;
            openTab(lastTabId);
        }


    };

    document.querySelectorAll('.tab-close').forEach((el) => {
        el.removeEventListener('click', closeFun);
        el.addEventListener('click', closeFun);
    });



    // initialize tab title
    initWebviewTitles();

    

};

/**
 * //////////////////////////////////////////////////////
 * Custom Tabs
 * //////////////////////////////////////////////////////
 */
window.myapi.openUrlHandle(
    'OPEN_URL',
    (event, data) =>
        function (event, data) {
            addTab(data);
        },
    event
);


window.addEventListener('DOMContentLoaded', () => {
    calculateLayoutSize();

    
    // initialize tab title
    initWebviewTitles();


    // Dynamic resize function (responsive)
    window.onresize = calculateLayoutSize;

});


