// export function load_google_maps() {
//   return new Promise(function(resolve, reject) {
//     // define the global callback that will run when google maps is loaded
//     window.resolveGoogleMapsPromise = function() {
//       // resolve the google object
//       resolve(window.google);
//       // delete the global callback to tidy up since it is no longer needed
//       delete window.resolveGoogleMapsPromise;
//     }
//     // Now, Load the Google Maps API
//     const script = document.createElement("script");
//     const API_KEY = 'AIzaSyDwisjv_Ak2JqMQn7KmiK5KCpfbXlz0yPE';
//     script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
//     script.async = true;
//     document.body.appendChild(script);
//   });
// }

// export function _parseJSON(response) {
//   return response.text().then(function(text) {
//     return text ? JSON.parse(text) : {}
//   })
// }

// export function getYelpPlaces() {
//   const clientID = 'AuNBtRo7wM6nw3pM24xrsA';
//   const API_KEY = 'N6LfdAk_C3iPq8O99O3b2NfTTtn6Y9Y-f_NEPC_zM1vbvTovSCkxLGB5GjmS0gbYW1qy0Cxl7n2j6BoJM8EwKoKuzn1iOdhkhNgaLS9D5OiAb6uv1IMXMso7mvjoW3Yx';
//   const searchTerm = 'food';
//   const lat = 41.9027835;
//   const lng = 12.4963655;
//   let url = `https://api.yelp.com/v3/businesses/search?term=${searchTerm}&latitude=${lat}&longitude=${lng}`;
  
//   return fetch(url, {
//     method: 'GET',
//     mode: 'no-cors',
//     credentials: 'same-origin',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//       'Authorization': 'Bearer ' + API_KEY
//     }
//   })
//   .then((response) => {
//     response.text()
//     .then((text) => _parseJSON)
//   })
//   .then((json) => {
//     console.log(json)
//   })
//     .catch(err => console.log('err ', err));
// }

export function getFoursquarePlaces() {
  const lat = 41.9027835;
  const lng = 12.4963655;
  const query = 'topPicks';
  const clientID = 'ZEVJV1LJZ3Z1UJCFHHFGDQ45YHOUCNUAKJYU1YZCCLBRMXPW';
  const clientSecret = 'TBEX4JAWXTE2SKVNZ3IT4KQJXL2ZKIHZ4HREIZDYMWO5QZXL';
  const url = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&ll=${lat},${lng}&section=${query}`;

  return fetch(url)
    .then(response => response && response.status === 200 ? response.json() : '')
    .catch(() => alert('An error occurred. Please try again later.'));
}