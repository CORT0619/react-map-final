self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('maps-final').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        '../src/App.css',
        '../src/App.js',
        '../src/index.css',
        '../src/index.js',
        '../src/MapContainer.js',
        '../src/SearchPage.js'
      ]);
    })
  );
})