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

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Location'
    });

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

    google.maps.event.addListener(map, 'click', function(e) {
        var result;
        if (google.maps.geometry.poly.containsLocation(e.latLng, geofence)) {
            result = 'red';
        } else {
            result = 'green';
        }

        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: result,
            fillOpacity: .2,
            strokeColor: 'white',
            strokeWeight: .5,
            scale: 10
        };

        new google.maps.Marker({
            position: e.latLng,
            map: map,
            icon: circle
        })
    });

};

var getGeo = function () {
    $.get('/api', function (data) {
        console.log(data);
        initMap(data);
    });
};

google.maps.event.addDomListener(window, 'load', getGeo);
