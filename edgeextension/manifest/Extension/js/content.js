(function() {
  var isActive = true,
  updateIcon = function(active) {
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
  },
  hideExpandedFooter = function() {
    if (!isActive) { return; }
    var expandedFooter = document.getElementById('expanded-footer');

    if (expandedFooter && /\/\/.+\.linkedin\.com\/feed\//.test(document.location.href)) {
      expandedFooter.style = 'display: none;';
    } else {
      window.requestAnimationFrame(hideExpandedFooter);
    }
    window.setTimeout(function() { updateIcon(false); }, 1000);
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
