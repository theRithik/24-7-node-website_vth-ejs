window.onload = function(){
    var location = new google.maps.LatLng(16.5386487,80.6361366)

    var map = new google.maps.Map(document.getElementById('map-location'),{
       center:location,
       zoom:17
    })

    var marker = new google.maps.Marker({
        position:location,
        map:map,
        title:24*7
    })
    map.setMarker(marker);

} 