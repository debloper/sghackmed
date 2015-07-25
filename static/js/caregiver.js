var map;

var initMap = function (coords) {

    var position = {
        lat: parseFloat(coords.latitude),
        lng: parseFloat(coords.longitude)
    };

    var mapOptions = {
        center: position,
        zoom: 15,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById('map'),
                                  mapOptions);

    var polygon = [
        new google.maps.LatLng(1.3818448,103.8458215),
        new google.maps.LatLng(1.3698315,103.8499495),
        new google.maps.LatLng(1.3700791,103.8657575),
        new google.maps.LatLng(1.3874309,103.8696721),
        new google.maps.LatLng(1.3818448,103.8458215)
    ];

    var geofence = new google.maps.Polygon({
        paths: polygon,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.25
    });

    geofence.setMap(map);

};

var keepPolling = function () {

    $.get('/api', function (data) {
        var position = {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude)
        };

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Location'
        });
    });

    window.setTimeout(keepPolling, 2000);
};

var getGeo = function () {
    $.get('/api', function (data) {
        initMap(data);
        keepPolling();
    });
};

google.maps.event.addDomListener(window, 'load', getGeo);
