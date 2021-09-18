
//Google API Key
const api_key = "AIzaSyDfQVi5YHKDZmPdwbMUXKMWRzCwfcdDhms";
const { MongoClient } = require('mongodb');

//Convert zip code/address to latitude and longitude 
function convertZipToCoord(address) {
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key
    fetch(api, {
        method: 'get'
    }).then(function (response) {
        var coord = response.results[0].geomery.location
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
        var zip = response.results[0].address_components[7].long_name
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

};
//code to add when clicking on the submit button: document.querySelector('#find-me').addEventListener('click', geoFindMe);

//client needs to be connecting to mongodb
function match(location, filter, distance) {
    const uri = "mongodb://localhost:27017/exchangesandbox";
    const client = new MongoClient(uri)
    try {
        client.connect();
        const result = client.db("exchangesandbox").collection("events").aggregate({
            $geoNear: {
                near: location,
                distanceField: "dist.calculated",
                maxDistance: distance,
                query: { filter }, //filter needs to be in JSON format
                includeLocs: "dist.location",
                spherical: true
            }
        })
    } finally {
        client.close();
        return result
    }
};

export { convertZipToCoord, convertcoordtoZip, geoFindme, match };