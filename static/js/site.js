/*!
 * Global JavaScript by @zjhzxhz
 *
 * Copyright 2015 Contributors
 * Released under the GPL v3 license
 * http://opensource.org/licenses/GPL-3.0
 */
/* String Protorype Extension */
String.prototype.format = function() {
    var newStr = this, i = 0;
    while (/%s/.test(newStr)) {
        newStr = newStr.replace("%s", arguments[i++])
    }
    return newStr;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

if( !String.prototype.trim ) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };
}

$('#sidebar-toggle').click(function() {
    var isSidebarShown = $('#sidebar').is(':visible');

    if ( isSidebarShown ) {
        $('#sidebar').css('display', 'none');
        $('#header').css('padding-left', 0);
        $('#content').css('margin-left', 0);
    } else {
        $('#sidebar').css('display', 'block');
        $('#header').css('padding-left', 250);
        $('#content').css('margin-left', 250);
    }
});

$('li.nav-item-has-children > a').click(function() {
    var navItem       = $(this).parent(),
        isSubNavShown = $('ul.sub-nav', navItem).is(':visible');

    if ( isSubNavShown ) {
        $('i.fa-caret-down', navItem).addClass('fa-caret-right');
        $('i.fa-caret-down', navItem).removeClass('fa-caret-down');
        $('ul.sub-nav', navItem).slideUp(120);
    } else {
        $('i.fa-caret-right', navItem).addClass('fa-caret-down');
        $('i.fa-caret-right', navItem).removeClass('fa-caret-right');
        $('ul.sub-nav', navItem).slideDown(120);
    }
});

function initMap(mapDomId, options) {
    var element    = document.getElementById(mapDomId);
    var mapTypeIds = [];
    for(var type in google.maps.MapTypeId) {
        mapTypeIds.push(google.maps.MapTypeId[type]);
    }
    mapTypeIds.push("LocalGmap");

    var map = new google.maps.Map(element, options);
    map.mapTypes.set("LocalGmap", new google.maps.ImageMapType({
        getTileUrl: getLocalTileImgSrc,
        tileSize: new google.maps.Size(256, 256),
        name: "LocalGmap",
        maxZoom: 15
    }));
    return map;
}

function setUpMap(map) {
    google.maps.event.addListener(map, 'click', function(point) {
        var marker = new google.maps.Marker({
            position: point.latLng,
            map: map
        });

        google.maps.event.addListener(marker, 'dblclick', function() {
            marker.setMap(null);
        });

        google.maps.event.addListener(marker, 'click', function() {
            new google.maps.InfoWindow({
                content: 'lat: ' + point.latLng.lat() + '<br>lng:' + point.latLng.lng()
            }).open(map, marker);
        });
    });
}