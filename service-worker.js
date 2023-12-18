async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
  console.log(response);
}

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
  console.log(obj.message);
  if(obj.message == "hi"){
    chrome.runtime.sendMessage({message: "service-worker"});
    sendMessageToActiveTab({message: "service-worker"});
  };
});
