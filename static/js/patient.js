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

};

var getGeo = function () {
    navigator.geolocation.getCurrentPosition ( function(position) {
        console.log("Obtained position", position);
        initMap(position.coords);
    }, function() {});
};

google.maps.event.addDomListener(window, 'load', getGeo);
