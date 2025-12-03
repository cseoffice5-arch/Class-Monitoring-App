const CACHE_NAME = 'class-monitor-v1';
const OFFLINE_URL = 'index.html';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // icons
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  // for navigation requests, attempt network first then fallback to cache
  if (req.mode === 'navigate') {
    evt.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // for other requests, try cache first
  evt.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});