function startEmberApp (component, $body) {
  // get assets_path ...
  var assets_path = chrome.extension.getURL("assets/");

  // Has meta build data that is required
  var index_request = $.ajax({
    url: chrome.extension.getURL('index.html'),
    dataType: 'html',
  });

  // Prerequisite for other scripts
  var vendor_script_request = $.ajax({
    url: `${assets_path}vendor.js`,
    dataType: 'script',
    cache: true
  });

  $body.append(`<div class="${component}" data-component="${component}"></div>`);

  $.when(index_request, vendor_script_request).then( function(index_request) {
    var html = $.parseHTML(index_request[0])
    $('head').append(html[13]);

    var vendor_stylesheet = `<link rel="stylesheet" href="${assets_path}vendor.css">`;
    var att_stylesheet = `<link rel="stylesheet" href="${assets_path}all-the-time.css">`;
    var att_js = `<script src="${assets_path}all-the-time.js"></script>`;
    $body.append([vendor_stylesheet, att_stylesheet, att_js].join(''));
  });
}

(function(enabled) {
  $body = $('body')

  if (enabled) {
    // Adds att class to body for style purposes when active
    $body.addClass('att');

    // Add timesheet login component
    var timesheet_login = /timesheet\/?\??[a-zA-Z\\&\\=\.]*?$/i;
    if (timesheet_login.test(window.location.href)) {
      startEmberApp('login-form', $body)
    }

    // Add timesheet entry component
    var timesheet_entry = /AccountEmployeeTimeEntryPeriodView.aspx$/;
    if (timesheet_entry.test(window.location.href)) {
      startEmberApp('entry-form', $body)
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
    $body.find('form').show()

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
