// background.js
var alertinterval = localStorage["alertinterval"];
var icingaURL = localStorage["icingaURL"];
var show_alert = localStorage["show_alert"];
if(show_alert==""){
    show_alert=1;
}

var pollInterval = 1000 * 3; // 1 minute, in milliseconds
var timerId;

function startRequest() {
    updateBadge();
    timerId = window.setTimeout(startRequest, pollInterval);
}
function stopRequest() {
    window.clearTimeout(timerId);
}

function showError() {
    chrome.storage.sync.get(['alertinterval', 'icingaURL','show_alert'], function(items) {
    });

    var xhr = new XMLHttpRequest;
    var NagiosURL = "https://icinga/icingaweb2/monitoring/list/services?_host_department=IcingaServisYonetimi&_host_environment=PROD&service_state!=0&service_state!=99&service!=Check%20Pending%20Reboot%20&service!=Check%20Service&service!=Linux%20Service%20Check%20By%20Snmp&service!=Check%20File%20Size&service!=Arcsight%20Audit%20Policy&service!=Linux%20Centrify%20Check%20By%20Snmp&service!=Check%20Uptime&service!=Linux%20Uptime%20Check%20By%20Snmp&service!=Check%20Zpool&service!=Linux%20Cluster%20Check%20By%20Snmp&service!=Check%20Event%20ID%20System&_host_dc=DC1&service_acknowledged=0&service_in_downtime=0&host_in_downtime=0&limit=500&sort=service_severity&format=json"
    xhr.open("GET", NagiosURL, false);
    xhr.send(null);

    if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        for (var lines in data) {
            var sunucu = data[lines].host_name;
            var hata = data[lines].service_output+"\n\nAlert Interval: "+alertinterval+" sec.";
            var durum = data[lines].service_state;
            var servisadi = data[lines].service_display_name;
            if (durum == 2) {
                sunuculine = durum + " - " + sunucu + " - " + servisadi;
                document.write(sunuculine);
                document.write("\n");
                //hata="<div style=\"background-color:powderblue;\">"+hata+"</div>";
                var notification = new Notification(sunucu, {icon: 'icon.png', body: hata, tag: "CRITICAL!"})
                notification.onshow = function () {
                    setTimeout(notification.close, 15000)
                }
            }
        }

    } else {
        document.body.innerHTML("Failed to load the data");
    }
}
if(show_alert==1) {
    setInterval(showError, alertinterval * 1 * 1000)
}