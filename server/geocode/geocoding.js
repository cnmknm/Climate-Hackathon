//Google API Key
const api_key = AIzaSyDfQVi5YHKDZmPdwbMUXKMWRzCwfcdDhms

//Convert zip code/address to latitude and longitude 
function convertZipToCoord(address) {
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key
    fetch(api, {
        method: 'get'
    }).then(function (response) {
        var coord = response[0].reuslts.geomery.location
        return coord //this is a {lat, lng}. so when parsing these, use coord.lat and coord.lng
    }).catch(function (err) {
        alert("there is an error ", err)
    })
};

function convertcoordtoZip(lat, lng) {
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + api_key
    fetch(api, {
        method: 'get'
    }).then(function (response) {
        var zip = response[0].results.address_components[7].long_name
        return zip //this is a string of sentence of full address
    }).catch(function (err) {
        alert("there is an error ", err)
    })
};

function geoFindme() {

    const status = document.querySelector('#status'); //after the form submit button, we need something like: <p id = "status"></p>

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return ({ "lat": latitude, "lng": longitude }) //it's returned as JSON format
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
//code to add when clicking on the submit button: document.querySelector('#find-me').addEventListener('click', geoFindMe);


export { convertZipToCoord, convertcoordtoZip, geoFindme };