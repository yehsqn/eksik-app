//  Web Push & Background Service Worker
// Çevrimdışı çalışma: uygulama dosyaları ve son liste önbellekte tutulur
const CACHE_NAME = 'eksik-app-v1';
const APP_SHELL = [
    '/',
    '/css/style.css',
    '/js/app.js',
    '/js/duplicate-detector.js',
    '/js/audio.js',
    '/js/speech.js',
    '/js/export.js',
    '/socket.io/socket.io.js',
    '/images/logo.jpg',
    '/manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => Promise.all(APP_SHELL.map(url => cache.add(url).catch(() => {}))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Önce internet, olmazsa önbellek. Yazma istekleri ve canlı bağlantı (socket.io) önbelleğe alınmaz.
self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
    if (!isSameOrigin && !isFont) return;
    if (isSameOrigin && url.pathname.startsWith('/socket.io/') && url.pathname !== '/socket.io/socket.io.js') return;
    if (isSameOrigin && (url.pathname.startsWith('/api/push') || url.pathname.startsWith('/api/backups'))) return;

    event.respondWith(
        fetch(req)
            .then(res => {
                if (res && (res.ok || res.type === 'opaque')) {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
                }
                return res;
            })
            .catch(async () => {
                const cached = await caches.match(req) || await caches.match(req, { ignoreSearch: true });
                if (cached) return cached;
                if (req.mode === 'navigate') {
                    const shell = await caches.match('/');
                    if (shell) return shell;
                }
                return new Response(JSON.stringify({ error: 'offline' }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' }
                });
            })
    );
});

// Web Push Notification Listener
self.addEventListener('push', (event) => {
    let data = {
        title: '🛍️ Yeni Eksik Ürün!',
        body: 'Listeye yeni bir eksik ürün eklendi.',
        icon: '/img/icon-192.png',
        badge: '/img/icon-192.png',
        tag: 'eksik-item-' + Date.now(),
        data: { url: '/' }
    };

    if (event.data) {
        try {
            const parsed = event.data.json();
            data = Object.assign(data, parsed);
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: data.icon || '/img/icon-192.png',
        badge: data.badge || '/img/icon-192.png',
        tag: data.tag || 'eksik-app-notification',
        renotify: true,
        vibrate: [250, 100, 250, 100, 250],
        data: data.data || { url: '/' },
        actions: [
            { action: 'open', title: '👀 Listeyi Aç' }
        ]
    };

    if (data.image) {
        options.image = data.image;
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification Click Action
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let client of windowClients) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
