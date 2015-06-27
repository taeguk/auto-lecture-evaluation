function doAuto() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {msg: "do auto!"}, function(response) {
		});
	});
}

function onWindowLoad() {
	doAuto();
}

window.onload = onWindowLoad;