/* Service worker: cache everything on install so the app works offline.
   Bump CACHE when any file changes, so old copies are thrown away. */
var CACHE = 'bio4bi1-v1';

var FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/diagrams.js',
  './js/data/topic1.js',
  './js/data/topic2a.js',
  './js/data/topic2b.js',
  './js/data/topic3.js',
  './js/data/topic4.js',
  './js/data/topic5.js',
  './js/data/practicals.js',
  './js/data/exam.js',
  './js/syllabus.js',
  './js/store.js',
  './js/render.js',
  './js/views.js',
  './js/cards.js',
  './js/quiz.js',
  './js/mock.js',
  './js/app.js',
  './icon.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Cache first — the content is static, and offline is the point. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        // an offline navigation to any route still gets the shell
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        throw new Error('offline and not cached');
      });
    })
  );
});
