// Service Worker simples para registrar o aplicativo (PWA) de forma nativa offline/online usando o logo com extensão dupla
const CACHE_NAME = 'feirabnh-cache-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'logo.jpg.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso!');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Erro de cache no service worker:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
