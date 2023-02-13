self.addEventListener('install', (e) => {
   e.waitUntil(caches.open('SDcodeeditor').then((cache) => cache.addAll(['./editor.html','./ace.js','./ext-settings_menu.js','./pouchdb-7.3.0.min.js'])),);
});

self.addEventListener('activate', (e) => {
    console.log('activated new service-worker');
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return caches.open('SDcodeeditor').then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});