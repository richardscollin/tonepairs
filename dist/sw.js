const cacheName = "tone-0.0.2";
self.addEventListener('install', event => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    console.log("cache opened");
    await cache.addAll([
        "index.html",
        "hsk-v2.json"
    ]);
    console.log("added all");
  };
  event.waitUntil(preCache());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log(event.request.url);
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
