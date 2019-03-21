const cacheName = "tone-0.0.5";
const cacheFiles = [
  "./",
  "index.html",
  "hsk-v2.json",
  "favicon.ico"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(cacheFiles))
    .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log(`using cache: ${cacheName} - ${event.request.url}`)
        return cachedResponse;
      }

      console.log(`fetching: ${event.request.url}`)
      return caches.open(cacheName).then(cache => {
        return fetch(event.request).then(response => {
          return cache.put(event.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  );
});
