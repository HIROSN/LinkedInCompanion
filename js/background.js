browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    browser.browserAction.setIcon({
      path: {
        '20': request.iconPath20,
        '40': request.iconPath40
      },
      tabId: sender.tab.id
    });
  }
);
