function popup(){
    alert(1);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
  });

button1=document.getElementById("button1");
button1.addEventListener('click', popup)
}
