const api_key = AIzaSyDfQVi5YHKDZmPdwbMUXKMWRzCwfcdDhms

function convertZipToCoord(address) {
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key
    fetch(api, {
        method: 'get'
    }).then(function (response) {
        var coord = response.reuslt.geomery.location
        return coord
    }).catch(function (err) {
        alert("there is an error ", err)
    });
}