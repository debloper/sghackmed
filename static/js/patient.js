var map, marker;

var initMap = function (coords) {

    var position = { lat: coords.latitude, lng: coords.longitude};

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

    $.post('/api', coords);

    google.maps.event.addListener(map, 'click', function(e) {
        marker.setMap(null);
        marker = new google.maps.Marker({
            position: e.latLng,
            map: map,
            title: 'Location'
        });
        $.post('/api', { latitude: e.latLng.A, longitude: e.latLng.F });
    });

};

var getGeo = function () {
    navigator.geolocation.getCurrentPosition ( function(position) {
        initMap(position.coords);
    }, function() {});
};

google.maps.event.addDomListener(window, 'load', getGeo);
