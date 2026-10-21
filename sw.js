// Dükkan Eksik Takip - Web Push & Background Service Worker
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
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
