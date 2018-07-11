// content.js
var xhr = new XMLHttpRequest;
var NagiosURL = "https://icinga/icingaweb2/monitoring/list/services?_host_department=IcingaServisYonetimi&_host_environment=PROD&service_state!=0&service_state!=99&service!=Check%20Pending%20Reboot%20&service!=Check%20Service&service!=Linux%20Service%20Check%20By%20Snmp&service!=Check%20File%20Size&service!=Arcsight%20Audit%20Policy&service!=Linux%20Centrify%20Check%20By%20Snmp&service!=Check%20Uptime&service!=Linux%20Uptime%20Check%20By%20Snmp&service!=Check%20Zpool&service!=Linux%20Cluster%20Check%20By%20Snmp&service!=Check%20Event%20ID%20System&_host_dc=DC1&service_acknowledged=0&service_in_downtime=0&host_in_downtime=0&limit=500&sort=service_severity&format=json"
xhr.open("GET", NagiosURL, false);
xhr.send(null);
if(xhr.status == 200){
    //var data = xhr.responseXML;
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    for(var lines in data){
        var sunucu = data[lines].host_name;
        var hata = data[lines].service_output;
        var durum = data[lines].service_state;
        var servisadi = data[lines].service_display_name
        //document.write(sunucu+`-`+hata);
        //sunuculine="<div id='alert"+durum+"'><a href='link' title='"+hata+"'>"+sunucu+"</a></div></n>";
        //sunuculine="<div display: table; float: left; id='alert"+durum+"'><a href='link' title='"+hata+"'>"+sunucu+"</a></div><div float: right;>"+servisadi+"</div></div></n>";
        sunuculine="<tr><td id='alert"+durum+"'><a href='link' title='"+hata+"'>"+sunucu+"</a><td>"+servisadi+"</td></tr></n>";
        document.write(sunuculine);
        document.write("\n");
        //document.getElementById('servers').innerHTML += "DURUM"
        //document.getElementById('servers').innerHTML += sunuculine;
    }
} else	{
    document.body.innerHTML("Failed to load the data");
}
