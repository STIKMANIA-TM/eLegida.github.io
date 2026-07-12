const CACHE_NAME = 'elegida-v1';
const urlsToCache = ['/', '/index.html', '/catalogo.html', '/css/style.css', '/js/config.js', '/js/utils.js', '/js/cart.js', '/js/products.js'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => caches.match('/index.html'))
  );
});