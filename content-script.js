chrome.runtime.onMessage.addListener(
    function(obj, sender, res) {
        console.log(obj.message);
        if(obj.message === "start") {
            start();
        }
        if(obj.message === "service-worker") {
            chrome.runtime.sendMessage("tab");
        }
    }
);

function start(){
    alert("started");
};
