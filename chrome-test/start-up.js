(function(enabled) {
  if (enabled) {
    $body = $('body')
    // Adds att class to body for style purposes when active
    $body.addClass('att');

    // Add login component to doc for timesheet
    timesheet_login = /timesheet\/?\??[a-zA-Z\\&\\=\.]*?$/i;
    if (timesheet_login.test(window.location.href)) {
      assets_path = chrome.extension.getURL("assets/");

      // Add component to be displayed
      $body.append('<div class="login-form" data-component="login-form"></div>');

      // Has meta build data that is required
      index_request = $.ajax({
        url: chrome.extension.getURL('index.html'),
        dataType: 'html',
      });

      // Prerequisite for other scripts
      vendor_script_request = $.ajax({
        url: assets_path + 'vendor.js',
        dataType: 'script',
        cache: true
      });

      $.when(index_request, vendor_script_request).then( function(index_request) {
        html = $.parseHTML(index_request[0])
        $('head').append(html[13]);

        vendor_stylesheet = '<link rel="stylesheet" href="' + assets_path + 'vendor.css">';
        att_stylesheet = '<link rel="stylesheet" href="' + assets_path + 'all-the-time.css">';
        att_js = '<script src="' + assets_path + 'all-the-time.js"></script>';
        $body.append([vendor_stylesheet, att_stylesheet, att_js].join(''));
      });
    }

    // Turns on the pageAction icon via a message to background.js
    chrome.runtime.onMessage.addListener(
      function(request, sender) {
        if (request === "toggle" && !sender.tab) {
          window.sessionStorage.setItem("disable-att", true);
          window.location.reload();
        }
      }
    );

    chrome.runtime.sendMessage("enabled");
  } else {
    // Turns on the disabled icon via a message to background.js
    chrome.runtime.onMessage.addListener(
      function(request, sender) {
        if (request === "toggle" && !sender.tab) {
          window.sessionStorage.removeItem("disable-att");
          window.location.reload();
        }
      }
    );

    chrome.runtime.sendMessage("disabled");
  }
})(
  window.location.search.indexOf("att=0") < 0 &&
  !window.sessionStorage.getItem("disable-att") // Tests for disable settings
);
