// Code for the View Region page.
var map, infoWindow, locationInaccuracy, currentPos, regionPolygon, center;
var calculatedData = {area:undefined,
                     perimeter:undefined};

var testLatLng = [];

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

var regionIndex = localStorage.getItem(APP_PREFIX + "-selectedRegion");
var regionInstance = JSON.parse(localStorage.getItem(`${APP_PREFIX}.Region${regionIndex}`));

regionInstance._cornerLocations.push(regionInstance._cornerLocations[0]);

var areaRef = document.getElementById("area");
var perimeterRef = document.getElementById("perimeter");

function onloadFunctionViewRegion() {
    if (regionIndex !== null) {
        // If a region index was specified, show name in header bar title. This
        // is just to demonstrate navigation.  You should set the page header bar
        // title to an appropriate description of the region being displayed.
        document.getElementById("headerBarTitle").textContent = regionInstance._nickname;
        
        areaRef.textContent = calculatedData.area;
        perimeterRef.textContent = calculatedData.perimeter;
    }
}

function togglePosts() {
    //localStorage.clear();
}

function centerOnRegion() {
    
}

function initMap() {
    // Initialise map, centred on the first point of the polygon.        
    map = new google.maps.Map(document.getElementById('map'), {
        center: regionInstance._cornerLocations[0],
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        zoom: 16    
    });
    
    // Initialize the region polygon.
    regionPolygon = new google.maps.Polygon({
        path: regionInstance._cornerLocations,
        geodesic: true,
        strokeColor: '#800080',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#800080',
        fillOpacity: 0.40
    });
    //console.log(regionInstance._cornerLocations);
    regionPolygon.setMap(map);
    
    for (var i in regionInstance._cornerLocations) {
		testLatLng[i] = new google.maps.LatLng(regionInstance._cornerLocations[i]);
    }
    
    calculatedData.area = google.maps.geometry.spherical.computeArea(testLatLng).toFixed(4);
    calculatedData.perimeter = google.maps.geometry.spherical.computeLength(testLatLng).toFixed(4);
    
    //console.log(calculatedData.area);
    //console.log(calculatedData.perimeter);
}
