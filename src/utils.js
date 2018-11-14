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