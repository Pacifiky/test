function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: "start"});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button1").addEventListener("click", ()=>{
        chrome.runtime.sendMessage({message: "popup"});
    });
});

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
    console.log(obj.message);
});
