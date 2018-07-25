'use strict';

(function() {
  browser.runtime.onMessage.addListener(
    function (request, sender) {
      browser.browserAction.setIcon({
        path: {
          '20': request.iconPath20,
          '40': request.iconPath40
        },
        tabId: sender.tab.id
      });
    }
  );

  browser.browserAction.onClicked.addListener(function(tab) {
    browser.tabs.update(tab.id, { url: 'https://www.linkedin.com/' });
  });
})();
