function save_options() {
    var alertinterval = document.getElementById('alertinterval').value;
    var icingaURL = document.getElementById('icingaURL').value;
    var show_alert = document.getElementById('show_alert').value;

    localStorage["icingaURL"]=icingaURL;
    localStorage["alertinterval"]=alertinterval;
    localStorage["show_alert"]=show_alert;

    chrome.storage.sync.set({
        alertinterval: alertinterval,
        icingaURL: icingaURL
    }, function() {
// Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 950);
    });
}
function default_options() {
    default_icingaURL="https://www.icinga.com/demo/monitoring/list/services?sort=service_severity&format=json";
    default_alertinterval="60";
    default_show_alert="1"

    localStorage["icingaURL"]=default_icingaURL;
    localStorage["alertinterval"]=default_alertinterval;
    localStorage["show_alert"]=default_show_alert;

    chrome.storage.sync.set({
        alertinterval: default_alertinterval,
        icingaURL: default_icingaURL,
        show_alert: default_show_alert
    }, function() {
// Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Default values restored.';
        document.getElementById('alertinterval').value = default_alertinterval;
        document.getElementById('icingaURL').value = default_icingaURL;
        document.getElementById('show_alert').value = default_show_alert;

        setTimeout(function() {
            status.textContent = '';
        }, 950);
    });
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    default_icingaURL="https://www.icinga.com/demo/monitoring/list/services?sort=service_severity&format=json"
    default_alertinterval="1";
    var alertinterval = localStorage["alertinterval"];
    var icingaURL = localStorage["icingaURL"];
    var show_alert = localStorage["show_alert"]

    if (alertinterval == undefined) {
        alertinterval = default_alertinterval;
    };
    if (icingaURL == undefined) {
        icingaURL = default_icingaURL;
    };
    chrome.storage.sync.get({
        alertinterval: alertinterval,
        icingaURL:icingaURL
    }, function(items) {
        document.getElementById('alertinterval').value = alertinterval;
        document.getElementById('icingaURL').value = icingaURL;
        document.getElementById('show_alert').value = show_alert;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('default').addEventListener('click', default_options);
chrome.extension.getBackgroundPage().updateSetting();
