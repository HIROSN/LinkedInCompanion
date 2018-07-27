'use strict';

(function() {
  var isActive = true;

  var updateIcon = function(active) {
    if (active != isActive) {
      browser.runtime.sendMessage(active ? {
        'iconPath20': 'images/in20.png',
        'iconPath40': 'images/in40.png'
      } : {
        'iconPath20': 'images/inactive20.png',
        'iconPath40': 'images/inactive40.png'
      });

      isActive = active;
    }
  };

  var styleExpandedFooter = function(style) {
    var expandedFooter = document.getElementById('expanded-footer');

    if (expandedFooter && /\/\/.+\.linkedin\.com\/feed\//.test(document.location.href)) {
      expandedFooter.style = style || '';
    }

    return expandedFooter && expandedFooter.style;
  };

  var hideExpandedFooter = function() {
    if (!isActive) { return; }

    if (!styleExpandedFooter('display: none;')) {
      window.requestAnimationFrame(hideExpandedFooter);
    }

    window.setTimeout(function() {
      updateIcon(false);
      styleExpandedFooter(null);
    }, 1000);
  };

  if (/\/\/.+\.linkedin\.com\//.test(document.location.href)) {
    hideExpandedFooter();

    window.addEventListener('scroll', function() {
      if (!isActive) {
        updateIcon(true);
        hideExpandedFooter();
      }
    });
  } else {
    updateIcon(false);
  }
})();
