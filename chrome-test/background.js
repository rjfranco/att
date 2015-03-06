chrome.runtime.onMessage.addListener(
  function(request, sender) {
    console.log('For reals', arguments);
    if (request === "enabled") {
      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setTitle({
        tabId: sender.tab.id,
        title: "Click to disable ATT"
      });
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: {
          "19": "att-logo-19.png",
          "38": "att-logo-38.png"
        }
      });
    } else if (request === "disabled") {
      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setTitle({
        tabId: sender.tab.id,
        title: "Click to enable ATT"
      });
      chrome.pageAction.setIcon({
        tabId: sender.tab.id,
        path: {
          "19": "att-logo-19a.png",
          "38": "att-logo-38a.png"
        }
      });
    }
  }
);

chrome.pageAction.onClicked.addListener(
  function(tab) {
    console.log('Tabb listeninger');
    chrome.tabs.sendMessage(tab.id, "toggle");
  }
);
