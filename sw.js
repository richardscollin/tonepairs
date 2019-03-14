const cacheName = "tone-0.0.2";
self.addEventListener('install', event => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    console.log("opened cache");
    await cache.addAll([
        "index.html",
        "components/x-banner.js",
        "components/flash-card.js",
        "components/utils.js",
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
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
