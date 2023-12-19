let btn = document.createElement("button");
btn.id = "btn1";
btn.innerHTML = "Click Me!";
document.body.appendChild(btn);

chrome.runtime.onMessage.addListener(
    function(obj, sender, res) {
        console.log(obj.message);
        if(obj.message === "start") {
            start();
        }
        if(obj.message === "service-worker") {
            chrome.runtime.sendMessage({message:"tab"});
        }
    }
);

function start(){
    alert("started");
};

document.getElementById("btn1").addEventListener("click", async ()=>{
    let response = await chrome.runtime.sendMessage("tab");
    console.log(response);
});
