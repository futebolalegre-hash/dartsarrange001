const CACHE_NAME = 'my-game-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './dartsicon.png'
];

// スマホにデータを保存する処理
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 電波がなくても、保存したデータを使ってゲームを動かす処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
