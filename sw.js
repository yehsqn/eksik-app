const CACHE_NAME = 'eksik-app-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/audio.js',
    '/js/speech.js',
    '/js/export.js',
    '/js/cloud.js',
    '/js/barcode.js',
    '/js/app.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS).catch(err => console.log('Cache add error:', err));
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((k) => {
                    if (k !== CACHE_NAME) return caches.delete(k);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // API calls bypass service worker cache
    if (e.request.url.includes('/api/') || e.request.url.includes('/socket.io/')) {
        return;
    }
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
