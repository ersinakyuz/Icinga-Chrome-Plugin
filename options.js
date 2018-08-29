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
    default_icingaURL="https://icinga/icingaweb2/monitoring/list/services?_host_department=IcingaServisYonetimi&_host_environment=PROD&service_state!=0&service_state!=99&service!=Check%20Pending%20Reboot%20&service!=Check%20Service&service!=Linux%20Service%20Check%20By%20Snmp&service!=Check%20File%20Size&service!=Arcsight%20Audit%20Policy&service!=Linux%20Centrify%20Check%20By%20Snmp&service!=Check%20Uptime&service!=Linux%20Uptime%20Check%20By%20Snmp&service!=Check%20Zpool&service!=Linux%20Cluster%20Check%20By%20Snmp&service!=Check%20Event%20ID%20System&_host_dc=DC1&service_acknowledged=0&service_in_downtime=0&host_in_downtime=0&limit=500&sort=service_severity&format=json";
    default_alertinterval="1";
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
    default_icingaURL="https://icinga/icingaweb2/monitoring/list/services?_host_department=IcingaServisYonetimi&_host_environment=PROD&service_state!=0&service_state!=99&service!=Check%20Pending%20Reboot%20&service!=Check%20Service&service!=Linux%20Service%20Check%20By%20Snmp&service!=Check%20File%20Size&service!=Arcsight%20Audit%20Policy&service!=Linux%20Centrify%20Check%20By%20Snmp&service!=Check%20Uptime&service!=Linux%20Uptime%20Check%20By%20Snmp&service!=Check%20Zpool&service!=Linux%20Cluster%20Check%20By%20Snmp&service!=Check%20Event%20ID%20System&_host_dc=DC1&service_acknowledged=0&service_in_downtime=0&host_in_downtime=0&limit=500&sort=service_severity&format=json";
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
