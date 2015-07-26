var map, marker;

var initMap = function (coords) {

    var position = new google.maps.LatLng(coords.latitude, coords.longitude);

    var mapOptions = {
        center: position,
        zoom: 14,
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById('map'),
                                  mapOptions);

    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Location'
    });

    var polygon = [
        new google.maps.LatLng(1.3818448, 103.8458215),
        new google.maps.LatLng(1.3698315, 103.8499495),
        new google.maps.LatLng(1.3700791, 103.8657575),
        new google.maps.LatLng(1.3874309, 103.8696721),
        new google.maps.LatLng(1.3818448, 103.8458215)
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

var getGeo = function () {
    $.get('/api', function (data) {
        initMap(data);
        keepPolling();
    });
};

var keepPolling = function () {
    $.get('/api', function (data) {
        var position = new google.maps.LatLng(data.latitude, data.longitude);

        marker.setMap(null);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Location'
        });

        setTimeout(keepPolling, 2000);
    });
}

google.maps.event.addDomListener(window, 'load', getGeo);
