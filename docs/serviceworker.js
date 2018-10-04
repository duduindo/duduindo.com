
const CACHE_NAME = 'duduindo-cache-v1';
const CACHED_URLS = [
  // HTML
  '/offline.html',

  // CSS
  '/css/style.css',

  // JS
  '/js/polyfill.js',
  '/js/script.js',
  '/js/sidebar.js',

  // Images
  '/images/duduindo-profile-photo.png',
];


// --------------------------
//  Install
// --------------------------
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_URLS))
  );
});


// --------------------------
//  Fetch
// --------------------------
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);
  const isThisDomain = location.host === requestURL.host;
  const isStatics = requestURL.pathname.match(/^\/(js|css|images)\//);
  const hasCachedUrl = CACHED_URLS.includes(requestURL.href) || CACHED_URLS.includes(requestURL.pathname);

  // HTML - Return offline
  if (isThisDomain && !isStatics) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          } else if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
      })
    );
  }
  // Statics - Handle requests for files cached during installation
  else if (isThisDomain && isStatics && hasCachedUrl) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request);
        });
      })
    );
  }
});


// --------------------------
//  Activate
// --------------------------
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHE_NAME !== cacheName && cacheName.startsWith('duduindo-cache')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
