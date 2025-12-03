const CACHE_NAME = 'class-monitor-v1';
const OFFLINE_URL = '/index.html';
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

// Install Service Worker and cache all assets
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate Service Worker and clean old caches if needed
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch handler: Network-first for navigation, Cache-first for other requests
self.addEventListener('fetch', (evt) => {
  const req = evt.request;

  // Navigation requests (HTML pages) – network first, fallback to cache
  if (req.mode === 'navigate') {
    evt.respondWith(
      fetch(req).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Other requests (CSS, JS, images) – cache first
  evt.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});