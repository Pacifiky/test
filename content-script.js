chrome.runtime.onMessage.addListener(
    function(obj, sender, res) {
        console.log(obj.message);
        if( obj.message === "start" ) {
            start();
        }
    }
);

function start(){
    alert("started");
    chrome.runtime.sendMessage("tab");
};
