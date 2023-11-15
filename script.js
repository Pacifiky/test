//Export
let url;
let page;

function scroll(){
    var scrolldown = setInterval(() => window.scrollBy(0, 2000), 200);
}

function export(title){
    clearInterval(scrolldown);
    let videos = [];
    videos.push(document.querySelectorAll('yt-formatted-string[class="style-scope yt-dynamic-sizing-formatted-string yt-sans-28"]')[0].innerHTML);
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.id === "video-title") {
            link.href = link.href.split('&list=')[0];
            videos.push(title ? link.title + ',' + link.href : link.href);
        }
    }

    let data = videos.join('\n');
    let blob = new Blob([data], {type: 'text/csv'});
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = 'my_data.csv';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

//Import
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function savePlaylist(listname){
    document.querySelectorAll('[aria-label="Save to playlist"]')[0].click()
    waitForElm('tp-yt-paper-dialog').then(()=>{
    let checks = document.querySelectorAll('tp-yt-paper-checkbox[class="style-scope ytd-playlist-add-to-option-renderer"]')
    let found = false;
    for (let i=0;i<checks.length;i++){
      if(checks[i].childNodes[2].children[0].children[0].children[0].title==listname){
        checks[i].click();
        found = true;
      }
    }
    if(found == false){
        document.querySelectorAll('tp-yt-paper-item[class="style-scope ytd-compact-link-renderer"]')[0].click();
        let elm = document.querySelectorAll('input[placeholder="Enter playlist name..."]')[0];
        elm.value=listname;
        let ev = new Event("input");
        elm.parentElement.dispatchEvent(ev);
        document.querySelectorAll('button[aria-label="Create"]')[1].click();
    }
    }
    );
}

function injectplaylist(){
    bar = document.querySelectorAll('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]')[0];
    export = document.createElement('button');
    export.innerHtml = "<div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><yt-icon-shape class="style-scope yt-icon"><icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block;"><path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"/></svg></div></icon-shape></yt-icon-shape></yt-icon></div>";
    //export.setAttribute("aria-label", "Export");
    export.onclick = export(false);
    let buttonrenderer = document.createElement("ytd-button-renderer");
    buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
    bar.appendChild(buttonrenderer);
    let shape = buttonrenderer.querySelectorAll('yt-button-shape')[0];
    shape.appendChild(export);
    /*
    scroll = document.createElement('button');
    scroll.innerHtml = "Load videos";
    scroll.onclock = scroll();
    bar.appendChild(scroll)
    */
}

function injectvideo(){
    
}

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
    const { type, value, data } = obj;
    url = link;
    if(type === "playlist"){
        page = "playlist";
        injectplaylist();
    }
    else if(type === "video"){
        page = "video";
        injectvideo();
    }
    else if(type === "exportplay"){
        saveplaylist(data.title);
    }
    else if(type === "scrolldown"){
        scroll();
    }
    else if(type === "stopscroll"){
        clearInterval(scrolldown);
    }
    else if(type === "import"){
        savePlaylist(data.title);
    }
    else if(type === "nav"){
        window.href.location = data.url;
    }
})
