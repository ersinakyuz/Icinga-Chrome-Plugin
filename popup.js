// content.js
var icingaURL = localStorage["icingaURL"];
if (icingaURL == null){
    icingaURL = "https://www.icinga.com/demo/monitoring/list/services?sort=service_severity&format=json";
}
var xhr = new XMLHttpRequest;
function getUrlParts(fullyQualifiedUrl) {
    var url = {},
        tempProtocol;
    var a = document.createElement('a');
    // if doesn't start with something like https:// it's not a url, but try to work around that
    if (fullyQualifiedUrl.indexOf('://') == -1) {
        tempProtocol = 'https://'
        a.href = tempProtocol + fullyQualifiedUrl
    } else
        a.href = fullyQualifiedUrl
    var parts = a.hostname.split('.')
    url.origin = tempProtocol ? "" : a.origin
    url.domain = a.hostname
    url.subdomain = parts[0]
    url.domainroot = ''
    url.domainpath = ''
    url.tld = '.' + parts[parts.length - 1]
    url.path = a.pathname.substring(1)
    url.query = a.search.substr(1)
    url.protocol = tempProtocol ? "" : a.protocol.substr(0, a.protocol.length - 1)
    url.port = tempProtocol ? "" : a.port ? a.port : a.protocol === 'http:' ? 80 : a.protocol === 'https:' ? 443 : a.port
    url.parts = parts
    url.segments = a.pathname === '/' ? [] : a.pathname.split('/').slice(1)
    url.params = url.query === '' ? [] : url.query.split('&')
    for (var j = 0; j < url.params.length; j++) {
        var param = url.params[j];
        var keyval = param.split('=');
        url.params[j] = {
            'key': keyval[0],
            'val': keyval[1]
        }
    }
    // domainroot
    if (parts.length > 2) {
        url.domainroot = parts[parts.length - 2] + '.' + parts[parts.length - 1];
        // check for country code top level domain
        if (parts[parts.length - 1].length == 2 && parts[parts.length - 1].length == 2)
            url.domainroot = parts[parts.length - 3] + '.' + url.domainroot;
    }
    // domainpath (domain+path without filenames)
    if (url.segments.length > 0) {
        var lastSegment = url.segments[url.segments.length - 1]
        var endsWithFile = lastSegment.indexOf('.') != -1
        if (endsWithFile) {
            var fileSegment = url.path.indexOf(lastSegment)
            var pathNoFile = url.path.substr(0, fileSegment - 1)
            url.domainpath = url.domain
            if (pathNoFile)
                url.domainpath = url.domainpath + '/' + pathNoFile
        } else
            url.domainpath = url.domain + '/' + url.path
    } else
        url.domainpath = url.domain
    return url
}

//if (icingaURL == null)
//    default_icingaURL="https://www.icinga.com/demo/monitoring/list/services?sort=service_severity&format=json";
//    icingaURL = default_icingaURL;
//}
xhr.open("GET", icingaURL, false);
try {
    xhr.send(null);
    if (xhr.status == 200) {
        //var data = xhr.responseXML;
        try {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            for (var lines in data) {
                var sunucu = data[lines].host_name;
                var hata = data[lines].service_output;
                var durum = data[lines].service_state;
                var servisadi = data[lines].service_display_name;
                var icingaroot = getUrlParts(icingaURL)["origin"]+"/"+getUrlParts(icingaURL)["segments"][0]+"/"+getUrlParts(icingaURL)["segments"][1];
                sunuculine = "<tr><td id='alert" + durum + "'>" +
                    "<a href='"+icingaroot+
                "/host/show?host="
                    + sunucu + "' target='_blank' title='" + hata + "'>" + sunucu + "</a><td>" + servisadi + "</td></tr></n>";
                document.write(sunuculine);
                document.write("\n");
            }
        }
        catch (e) {
            document.write("Please login to <b>NAGIOS/ICINGA!</b><br/>"+e);
            console.log("Please login to NAGIOS/ICINGA:" + e);

        }
    } else {
        document.write("Failed to load the data");
        console.log("Failed to load the data");
    }
}
catch (e) {
    document.write("Error getting URL:\n"+icingaURL);
}