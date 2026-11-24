// Crisp Inline SVG Icons (matched to HKC Ultra Deluxe Design System)
const UI_ICONS = {
    check: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    edit: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    camera: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    trash: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    building: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>',
    clock: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    smartphone: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
    monitor: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
    note: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
    undo: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>',
    x: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    shield: '<svg class="ui-icon ui-icon-md" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>',
    sparkles: '<svg class="ui-icon ui-icon-lg" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    download: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    refresh: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
    bell: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    bellOff: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',
    volume: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    volumeX: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>',
    cloud: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
    database: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
    message: '<svg class="ui-icon ui-icon-md" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    save: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    package: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    wifiOff: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/></svg>',
    plus: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    user: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    hourglass: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>',
    chevronDown: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    checkSquare: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="3"/><path d="m9 12 2 2 4-4"/></svg>',
    square: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="3"/></svg>',
    layers: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    sliders: '<svg class="ui-icon ui-icon-sm" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>'
};

// Main Application Logic - Turso / LibSQL, Suppliers Management & Photo Support
class App {
    constructor() {
        this.items = [];
        this.suppliers = [];
        this.currentUser = localStorage.getItem('dukkan_username') || 'admin';
        this.authToken = localStorage.getItem('dukkan_token') || null;
        this.theme = localStorage.getItem('hkc_theme') || 'dark';

        this.filterStatus = 'all';
        this.activeSupplier = 'all';
        this.searchQuery = '';
        this.currentView = 'list'; // 'list' | 'bySupplier'

        this.socket = null;
        this.pendingDuplicateItem = null;
        this.selectedAddPhoto = ''; // Base64 data URL for new item
        this.targetPhotoItemId = null; // Used when attaching photo to an existing item card

        this.isPillsEditMode = false;
        this.selectedPillEmoji = '🔩';
        this.quickItems = [];
        this.loadQuickPills();

        this.pendingDeleteId = null;
        this.pendingDeleteTimer = null;
        this.pendingImportData = null;
        this.editingItemId = null;
        this.editingItemPhoto = '';
        this.appName = localStorage.getItem('dukkan_app_name') || 'HKC';
        const savedIcon = localStorage.getItem('dukkan_app_icon');
        if (!savedIcon || savedIcon === '⚡') {
            this.appIcon = '/images/logo.jpg';
            this.appIconIsImage = true;
        } else {
            this.appIcon = savedIcon;
            this.appIconIsImage = localStorage.getItem('dukkan_app_icon_is_image') === '1';
        }
        this.tempIconValue = this.appIcon;
        this.tempIconIsImage = this.appIconIsImage;
        this.isPushSubscribed = false;
        this.swRegistration = null;

        // Çevrimdışı eklenen ürünler ve değişiklikler (bağlantı gelince sunucuya gönderilir)
        this.offlineQueue = this.readJsonStorage('dukkan_offline_queue', []);
        this.offlineMutations = this.readJsonStorage('dukkan_offline_mutations', []);
        this.pendingItemRequests = new Set();
        this.isFlushingQueue = false;
        this.isHandlingUnauthorized = false;

        // Daraltılmış toptancı grupları (akordeon)
        this.collapsedSuppliers = new Set(this.readJsonStorage('dukkan_collapsed_suppliers', []));

        // Toplu işlem modu ve seçim durumu
        this.isBulkMode = false;
        this.selectedIds = new Set();

        // Ürün adı otomatik tamamlama durumu
        this.autocompleteMatches = [];
        this.autocompleteIndex = -1;

        // Özel dropdown bileşenleri
        this.customSelectInstances = [];
        // Eksik geçmişi (istatistik & hatırlatma); çevrimdışı da çalışsın diye saklanır
        this.events = this.readJsonStorage('dukkan_events_cache', []);
        this.reminderSnoozes = this.readJsonStorage('dukkan_reminder_snoozes', {});
        this.statsRange = 'weekly';
        // Notlar (sohbet tarzı)
        this.notes = [];
        this.notesLastSeen = Number(localStorage.getItem('dukkan_notes_last_seen') || 0);
        // Tek hesabı birden fazla kişi kullandığı için ad bu telefonda saklanır
        this.deviceName = localStorage.getItem('dukkan_device_name') || '';

        this.init();
    }

    async init() {
        this.applyAppIcon(this.appIcon, this.appIconIsImage);
        this.applyAppName(this.appName);
        this.initTheme();
        this.initAuth();
        this.initEventListeners();
        this.initCustomSelects();
        this.initAutocomplete();
        this.initUnitQuickChips();
        this.initBulkHandlers();
        this.initPhotoHandlers();
        this.renderQuickPills();
        this.loadPublicBranding();
        this.initPushNotifications();

        this.initOfflineHandlers();
        this.initNotes();

        if (this.isAuthenticated()) {
            this.showAppScreen();
            this.initSocket();
            await this.flushOfflineQueue();
            await this.loadSuppliers();
            await this.loadInitialData();
            await this.loadSettings();
            await this.loadServerInfo();
            this.loadEvents();
            this.loadNotes();
        } else {
            this.showLoginScreen();
        }
    }

    async apiFetch(url, options = {}) {
        const headers = { ...(options.headers || {}) };
        if (this.authToken && !headers.Authorization) {
            headers.Authorization = `Bearer ${this.authToken}`;
        }
        const res = await fetch(url, { ...options, headers });
        if (res.status === 401) {
            this.handleUnauthorized();
        }
        return res;
    }

    handleUnauthorized() {
        if (this.isHandlingUnauthorized) return;
        this.isHandlingUnauthorized = true;
        localStorage.removeItem('dukkan_token');
        localStorage.removeItem('dukkan_username');
        this.authToken = null;
        this.isBulkMode = false;
        if (this.selectedIds) this.selectedIds.clear();
        if (typeof this.updateBulkBarUI === 'function') this.updateBulkBarUI();
        if (this.socket) {
            try { this.socket.disconnect(); } catch (e) {}
            this.socket = null;
        }
        this.showLoginScreen();
        this.showToast('⚠️ Oturum süresi doldu veya geçersiz, lütfen tekrar giriş yapın');
    }

    async loadPublicBranding() {
        try {
            const res = await fetch('/api/public/branding');
            if (!res.ok) return;
            const branding = await res.json();
            if (branding.app_icon) {
                this.handleReceivedIconSetting(branding.app_icon);
            }
            if (branding.app_name) {
                this.handleReceivedNameSetting(branding.app_name);
            }
        } catch (err) {
            // Çevrimdışıyken localStorage değerleri kullanılır
        }
    }

    saveItemsCache(items = this.items) {
        if (!Array.isArray(items)) return;
        try {
            localStorage.setItem('dukkan_items_cache', JSON.stringify(items));
        } catch (err) {
            // Fotoğraflar 5MB kotasını aşarsa fotoğrafsız önbelleğe düş
            try {
                const lite = items.map(item => {
                    if (!item || !item.image) return item;
                    const { image, ...rest } = item;
                    return { ...rest, image: '' };
                });
                localStorage.setItem('dukkan_items_cache', JSON.stringify(lite));
            } catch (e2) {
                console.warn('Çevrimdışı ürün önbelleği kaydedilemedi:', e2);
            }
        }
    }

    enqueueOfflineMutation(entry) {
        if (!entry || !entry.type) return;
        if (entry.type === 'updateItem') {
            const last = this.offlineMutations[this.offlineMutations.length - 1];
            if (last && last.type === 'updateItem' && last.id === entry.id) {
                last.data = { ...last.data, ...entry.data };
                last.updatedAt = entry.updatedAt || Date.now();
            } else {
                this.offlineMutations.push({
                    ...entry,
                    queuedAt: Date.now()
                });
            }
        } else {
            this.offlineMutations.push({
                ...entry,
                queuedAt: Date.now()
            });
        }
        this.writeJsonStorage('dukkan_offline_mutations', this.offlineMutations);
        this.saveItemsCache();
        this.refreshConnectionBadge();
    }

    trackItemRequest(promise) {
        if (!promise || typeof promise.then !== 'function') return promise;
        this.pendingItemRequests.add(promise);
        const cleanup = () => this.pendingItemRequests.delete(promise);
        promise.then(cleanup, cleanup);
        return promise;
    }

    async waitForPendingItemRequests() {
        if (!this.pendingItemRequests || this.pendingItemRequests.size === 0) return;
        await Promise.allSettled(Array.from(this.pendingItemRequests));
    }

    applyPendingOfflineMutations() {
        if (!Array.isArray(this.offlineMutations) || this.offlineMutations.length === 0) return;
        for (const mut of this.offlineMutations) {
            if (!mut || !mut.type) continue;
            if (mut.type === 'updateItem') {
                const item = this.items.find(i => i.id === mut.id);
                if (item && mut.data) Object.assign(item, mut.data);
            } else if (mut.type === 'softDelete') {
                const item = this.items.find(i => i.id === mut.id);
                if (item) item.status = 'deleted';
            } else if (mut.type === 'permanentDelete') {
                this.items = this.items.filter(i => i.id !== mut.id);
                if (this.selectedIds) this.selectedIds.delete(mut.id);
            } else if (mut.type === 'emptyTrash') {
                this.items = this.items.filter(i => i.status !== 'deleted');
            } else if (mut.type === 'restore') {
                const item = this.items.find(i => i.id === mut.id);
                if (item) item.status = mut.status || 'pending';
            } else if (mut.type === 'restoreAll') {
                this.items.forEach(i => {
                    if (i.status === 'deleted') i.status = 'pending';
                });
            } else if (mut.type === 'clearCompleted') {
                this.items.forEach(i => {
                    if (i.status === 'completed') i.status = 'deleted';
                });
            } else if (mut.type === 'bulkUpdate' && mut.payload && Array.isArray(mut.payload.ids) && mut.payload.updates) {
                const idSet = new Set(mut.payload.ids);
                this.items.forEach(i => {
                    if (idSet.has(i.id)) Object.assign(i, mut.payload.updates);
                });
            }
        }
    }

    readJsonStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    writeJsonStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Yerel kayıt hatası:', e);
            return false;
        }
    }

    // ==========================================
    // ÇEVRİMDIŞI ÇALIŞMA (Offline Queue)
    // ==========================================
    initOfflineHandlers() {
        window.addEventListener('online', () => {
            this.refreshConnectionBadge();
            if (this.socket && !this.socket.connected) this.socket.connect();
            this.flushOfflineQueue();
        });
        window.addEventListener('offline', () => {
            this.refreshConnectionBadge();
        });
        this.refreshConnectionBadge();
    }

    refreshConnectionBadge() {
        const queued = (this.offlineQueue ? this.offlineQueue.length : 0)
            + (this.offlineMutations ? this.offlineMutations.length : 0);
        const serverReachable = this.socket && this.socket.connected;
        if (!navigator.onLine) {
            this.updateConnectionStatus(false, queued ? `Çevrimdışı · ${queued} bekliyor` : 'Çevrimdışı');
        } else if (queued) {
            this.updateConnectionStatus(false, serverReachable ? `Gönderiliyor · ${queued}` : `Bağlantı yok · ${queued} bekliyor`);
        } else if (serverReachable) {
            this.updateConnectionStatus(true, 'Canlı Bağlı');
        }
    }

    queueOfflineItem(itemData) {
        const entry = {
            tempId: 'offline_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            data: itemData,
            queuedAt: new Date().toISOString()
        };
        this.offlineQueue.push(entry);
        if (!this.writeJsonStorage('dukkan_offline_queue', this.offlineQueue) && itemData.image) {
            // Telefon hafızası doluysa fotoğrafsız sakla
            entry.data = { ...itemData, image: '' };
            this.writeJsonStorage('dukkan_offline_queue', this.offlineQueue);
            this.showToast('📴 Fotoğraf çok büyük, ürün fotoğrafsız saklandı');
        }
        this.refreshConnectionBadge();
        this.render();
        this.showToast(`📴 İnternet yok — "${itemData.name}" saklandı, bağlantı gelince gönderilecek`);
    }

    cancelOfflineItem(tempId) {
        this.offlineQueue = this.offlineQueue.filter(q => q.tempId !== tempId);
        this.writeJsonStorage('dukkan_offline_queue', this.offlineQueue);
        this.refreshConnectionBadge();
        this.render();
    }

    async flushOfflineQueue() {
        const hasAdds = this.offlineQueue && this.offlineQueue.length > 0;
        const hasMuts = this.offlineMutations && this.offlineMutations.length > 0;
        if (this.isFlushingQueue || (!hasAdds && !hasMuts) || !navigator.onLine || !this.isAuthenticated()) return;
        this.isFlushingQueue = true;
        let sent = 0;
        let syncedMutations = 0;
        try {
            while (this.offlineQueue.length) {
                const entry = this.offlineQueue[0];
                const res = await this.apiFetch('/api/items', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(entry.data)
                });
                if (res.status === 503 || res.status === 401) break; // hâlâ çevrimdışı veya yetkisiz
                if (res.ok) {
                    const saved = await res.json();
                    if (!this.items.find(i => i.id === saved.id)) this.items.unshift(saved);
                    sent++;
                }
                // Başarılı ya da sunucu reddetti (ör. boş ad): kuyruktan çıkar ki takılı kalmasın
                this.offlineQueue.shift();
                this.writeJsonStorage('dukkan_offline_queue', this.offlineQueue);
            }

            while (this.offlineMutations.length) {
                const mut = this.offlineMutations[0];
                let res;
                if (mut.type === 'updateItem') {
                    res = await this.apiFetch(`/api/items/${encodeURIComponent(mut.id)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(mut.data)
                    });
                } else if (mut.type === 'softDelete') {
                    res = await this.apiFetch(`/api/items/${encodeURIComponent(mut.id)}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ deletedBy: mut.deletedBy || 'Admin' })
                    });
                } else if (mut.type === 'permanentDelete') {
                    res = await this.apiFetch(`/api/items/${encodeURIComponent(mut.id)}?permanent=true`, {
                        method: 'DELETE'
                    });
                } else if (mut.type === 'emptyTrash') {
                    res = await this.apiFetch('/api/items/trash/empty', {
                        method: 'DELETE'
                    });
                } else if (mut.type === 'restore') {
                    res = await this.apiFetch(`/api/items/${encodeURIComponent(mut.id)}/restore`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: mut.status || 'pending' })
                    });
                } else if (mut.type === 'restoreAll') {
                    res = await this.apiFetch('/api/items/restore-all', {
                        method: 'POST'
                    });
                } else if (mut.type === 'clearCompleted') {
                    res = await this.apiFetch('/api/items/clear-completed', {
                        method: 'POST'
                    });
                } else if (mut.type === 'bulkUpdate') {
                    res = await this.apiFetch('/api/items/bulk-update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(mut.payload)
                    });
                } else {
                    res = { ok: false, status: 400 };
                }

                if (res.status === 503 || res.status === 401 || res.status >= 500) break;
                if (res.ok) syncedMutations++;
                this.offlineMutations.shift();
                this.writeJsonStorage('dukkan_offline_mutations', this.offlineMutations);
            }
        } catch (e) {
            console.warn('Çevrimdışı kuyruk gönderilemedi, sonra tekrar denenecek:', e);
        } finally {
            this.isFlushingQueue = false;
            this.saveItemsCache();
            this.refreshConnectionBadge();
            this.render();
            if (sent || syncedMutations) {
                const total = sent + syncedMutations;
                this.showToast(`✅ Çevrimdışı bekleyen ${total} işlem senkronize edildi`);
            }
        }
    }

    getOfflineItems() {
        return this.offlineQueue.map(q => ({
            ...q.data,
            id: q.tempId,
            status: 'pending',
            createdAt: q.queuedAt,
            offline: true
        }));
    }

    // ==========================================
    // NOTLAR (sohbet tarzı ortak not defteri)
    // ==========================================
    initNotes() {
        const form = document.getElementById('notes-form');
        const input = document.getElementById('notes-input');
        if (!form || !input) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendNote();
        });
        // Enter gönderir, Shift+Enter yeni satır
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                e.preventDefault();
                this.sendNote();
            }
        });
        input.addEventListener('input', () => this.autoGrowNoteInput());

        const nameForm = document.getElementById('notes-name-form');
        if (nameForm) {
            nameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveDeviceName();
            });
        }
    }

    saveDeviceName() {
        const input = document.getElementById('notes-name-input');
        const name = input ? input.value.trim().replace(/\s+/g, ' ').slice(0, 40) : '';
        if (!name) {
            if (input) input.focus();
            return;
        }
        this.deviceName = name;
        this.isEditingDeviceName = false;
        localStorage.setItem('dukkan_device_name', name);
        this.renderNotesIdentity();
        this.renderNotes();
        this.updateNotesBadge();
        const noteInput = document.getElementById('notes-input');
        if (noteInput) noteInput.focus();
        this.showToast(`👋 Merhaba ${name}! Bu telefon seni hatırlayacak.`);
    }

    changeDeviceName() {
        const input = document.getElementById('notes-name-input');
        if (input) input.value = this.deviceName;
        this.isEditingDeviceName = true;
        this.renderNotesIdentity();
        if (input) {
            input.focus();
            input.select();
        }
    }

    renderNotesIdentity() {
        const identity = document.getElementById('notes-identity');
        const nameForm = document.getElementById('notes-name-form');
        const composer = document.getElementById('notes-form');
        const hasName = !!this.deviceName && !this.isEditingDeviceName;
        if (nameForm) nameForm.style.display = hasName ? 'none' : '';
        if (composer) composer.style.display = hasName ? '' : 'none';
        if (identity) {
            identity.innerHTML = hasName
                ? `<span><strong>${this.escapeHtml(this.deviceName)}</strong> olarak yazıyorsun</span>
                   <button type="button" class="note-delete" onclick="window.app.changeDeviceName()">Değiştir</button>`
                : '';
            identity.style.display = hasName ? '' : 'none';
        }
    }

    isMyNote(note) {
        return !!this.deviceName && note.author === this.deviceName;
    }

    autoGrowNoteInput() {
        const input = document.getElementById('notes-input');
        if (!input) return;
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 140) + 'px';
    }

    async loadNotes() {
        try {
            const res = await this.apiFetch('/api/notes');
            if (!res.ok) return;
            this.notes = await res.json();
            this.renderNotes();
            this.updateNotesBadge();
        } catch (e) {
            // Çevrimdışı: notlar bağlantı gelince yüklenir
        }
    }

    openNotesModal() {
        this.isEditingDeviceName = false;
        this.openModal('notes-modal');
        this.renderNotesIdentity();
        this.renderNotes();
        this.markNotesSeen();
        this.loadNotes();
        const input = document.getElementById(this.deviceName ? 'notes-input' : 'notes-name-input');
        if (input && (window.innerWidth >= 768 || !this.deviceName)) input.focus();
    }

    markNotesSeen() {
        const last = this.notes.length ? new Date(this.notes[this.notes.length - 1].createdAt).getTime() : Date.now();
        this.notesLastSeen = Math.max(this.notesLastSeen, last);
        localStorage.setItem('dukkan_notes_last_seen', String(this.notesLastSeen));
        this.updateNotesBadge();
    }

    updateNotesBadge() {
        const badge = document.getElementById('notes-unread-badge');
        if (!badge) return;
        const unread = this.notes.filter(n =>
            !this.isMyNote(n) && new Date(n.createdAt).getTime() > this.notesLastSeen
        ).length;
        badge.textContent = unread > 9 ? '9+' : String(unread);
        badge.style.display = unread ? '' : 'none';
    }

    async sendNote() {
        const input = document.getElementById('notes-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        if (!this.deviceName) {
            this.renderNotesIdentity();
            return;
        }
        if (!navigator.onLine) {
            this.showToast('📴 İnternet yok — not bağlantı gelince gönderilebilir');
            return;
        }
        input.value = '';
        this.autoGrowNoteInput();
        try {
            const res = await this.apiFetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, author: this.deviceName })
            });
            if (!res.ok) throw new Error('Not kaydedilemedi');
            const note = await res.json();
            if (!this.notes.find(n => n.id === note.id)) this.notes.push(note);
            this.renderNotes();
            this.markNotesSeen();
        } catch (e) {
            input.value = text;
            this.showToast('Not gönderilemedi, tekrar deneyin.');
        }
    }

    deleteNote(id) {
        this.openConfirmModal({
            icon: '🗑️',
            title: 'Notu sil',
            desc: 'Bu not herkes için silinecek. Emin misiniz?',
            onConfirm: async () => {
                try {
                    const res = await this.apiFetch(`/api/notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
                    if (!res.ok) throw new Error('Not silinemedi');
                    this.notes = this.notes.filter(n => n.id !== id);
                    this.renderNotes();
                } catch (e) {
                    this.showToast('Not silinemedi.');
                }
            }
        });
    }

    renderNotes() {
        const list = document.getElementById('notes-list');
        if (!list) return;
        if (!this.notes.length) {
            list.innerHTML = `
                <div class="notes-empty">
                    <div class="notes-empty-icon">${UI_ICONS.message}</div>
                    <p>Henüz not yok. Toptancı bilgisi, hatırlatma ya da ekiple paylaşmak istediğin her şeyi buraya yazabilirsin.</p>
                </div>
            `;
            return;
        }

        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        let lastDay = '';
        let html = '';
        this.notes.forEach(n => {
            const d = new Date(n.createdAt);
            const dayKey = d.toDateString();
            if (dayKey !== lastDay) {
                lastDay = dayKey;
                const label = dayKey === today ? 'Bugün'
                    : dayKey === yesterday ? 'Dün'
                    : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                html += `<div class="notes-day"><span>${label}</span></div>`;
            }
            const mine = this.isMyNote(n);
            const initials = (n.author || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toLocaleUpperCase('tr-TR') || '?';
            html += `
                <div class="note-row ${mine ? 'mine' : ''}">
                    ${!mine ? `<div class="note-avatar" aria-hidden="true">${this.escapeHtml(initials)}</div>` : ''}
                    <div class="note-bubble">
                        ${!mine && n.author ? `<span class="note-author">${this.escapeHtml(n.author)}</span>` : ''}
                        <div class="note-text">${this.escapeHtml(n.text)}</div>
                        <div class="note-meta">
                            <span>${this.formatTime(n.createdAt)}</span>
                            ${mine ? `<button type="button" class="note-delete" title="Notu sil" onclick="window.app.deleteNote('${n.id}')">Sil</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
        list.innerHTML = html;
        if (nearBottom || !list.dataset.rendered) list.scrollTop = list.scrollHeight;
        list.dataset.rendered = '1';
    }

    // ==========================================
    // EKSİK GEÇMİŞİ, İSTATİSTİK & HATIRLATMA
    // ==========================================
    async loadEvents() {
        try {
            const res = await this.apiFetch('/api/stats/events');
            if (!res.ok) return;
            this.events = await res.json();
            this.writeJsonStorage('dukkan_events_cache', this.events);
            this.renderReminders();
            const statsModal = document.getElementById('stats-modal');
            if (statsModal && statsModal.classList.contains('active')) this.renderStatsPage();
        } catch (e) {
            // Çevrimdışı: önbellekteki geçmiş kullanılır
        }
    }

    nameKey(name) {
        return String(name || '').toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ').trim();
    }

    // Pazartesi 00:00 (yerel saat)
    startOfWeek(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const day = (d.getDay() + 6) % 7;
        d.setDate(d.getDate() - day);
        return d;
    }

    // Ürün bazında geçmiş: aynı gün birden fazla eklenme tek "bitti" sayılır
    getProductHistory() {
        const map = new Map();
        this.events.forEach(ev => {
            const key = ev.nameKey || this.nameKey(ev.name);
            if (!key) return;
            if (!map.has(key)) map.set(key, { key, name: ev.name, count: 0, days: [] });
            const p = map.get(key);
            p.count++;
            p.name = ev.name; // en son kullanılan yazılış
            const day = new Date(ev.createdAt);
            day.setHours(0, 0, 0, 0);
            const t = day.getTime();
            if (!p.days.length || p.days[p.days.length - 1] !== t) p.days.push(t);
        });
        return [...map.values()];
    }

    getReminders() {
        const DAY = 24 * 60 * 60 * 1000;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const activeKeys = new Set(
            [...this.items, ...this.getOfflineItems()]
                .filter(i => i.status === 'pending' || i.status === 'ordered')
                .map(i => this.nameKey(i.name))
        );

        const reminders = [];
        this.getProductHistory().forEach(p => {
            if (p.days.length < 3 || activeKeys.has(p.key)) return;
            const snoozedUntil = this.reminderSnoozes[p.key];
            if (snoozedUntil && snoozedUntil > Date.now()) return;

            // Son 6 aralığın ortancası = ürünün tipik bitme süresi
            const gaps = [];
            for (let i = 1; i < p.days.length; i++) gaps.push((p.days[i] - p.days[i - 1]) / DAY);
            const recent = gaps.slice(-6).sort((a, b) => a - b);
            const cycle = recent[Math.floor(recent.length / 2)];
            if (cycle < 2 || cycle > 45) return;

            const daysSince = Math.round((today.getTime() - p.days[p.days.length - 1]) / DAY);
            // Süresi geldi ama çok da eskimedi (satışı bırakılmış ürünleri hatırlatma)
            if (daysSince < cycle || daysSince > cycle * 4) return;

            reminders.push({ key: p.key, name: p.name, cycle, daysSince, overdue: daysSince / cycle });
        });
        return reminders.sort((a, b) => b.overdue - a.overdue).slice(0, 5);
    }

    describeCycle(days) {
        if (days <= 8 && days >= 6) return 'her hafta';
        if (days < 6) return `${Math.round(days)} günde bir`;
        if (days >= 12 && days <= 17) return '2 haftada bir';
        if (days >= 26 && days <= 35) return 'her ay';
        return `yaklaşık ${Math.round(days)} günde bir`;
    }

    renderReminders() {
        const box = document.getElementById('reminders-card');
        const list = document.getElementById('reminders-list');
        if (!box || !list) return;
        const reminders = this.getReminders();
        if (!reminders.length) {
            box.style.display = 'none';
            return;
        }
        box.style.display = '';
        list.innerHTML = reminders.map(r => {
            const sinceText = r.daysSince >= 7 && r.daysSince % 7 === 0
                ? `${r.daysSince / 7} haftadır`
                : `${r.daysSince} gündür`;
            const safeName = this.escapeHtml(r.name);
            const jsKey = encodeURIComponent(r.key);
            return `
                <div class="reminder-row">
                    <div class="reminder-text">
                        <strong>${safeName}</strong>
                        <span>Genelde ${this.describeCycle(r.cycle)} bitiyor, ${sinceText} eklenmedi. Kontrol et.</span>
                    </div>
                    <div class="reminder-actions">
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.app.addFromReminder('${jsKey}')">Ekle</button>
                        <button type="button" class="btn btn-secondary btn-sm" title="Stokta var, bu dönem hatırlatma" onclick="window.app.snoozeReminder('${jsKey}')">Var</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    addFromReminder(encodedKey) {
        const key = decodeURIComponent(encodedKey);
        const r = this.getReminders().find(x => x.key === key);
        if (!r) return;
        this.fillQuickItem(r.name, '1 adet');
        const nameInput = document.getElementById('input-name');
        if (nameInput) nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    snoozeReminder(encodedKey) {
        const key = decodeURIComponent(encodedKey);
        const r = this.getReminders().find(x => x.key === key);
        const DAY = 24 * 60 * 60 * 1000;
        // Stokta var: bir sonraki döngüye kadar sus
        const days = r ? Math.max(3, Math.round(r.cycle)) : 7;
        this.reminderSnoozes[key] = Date.now() + days * DAY;
        this.writeJsonStorage('dukkan_reminder_snoozes', this.reminderSnoozes);
        this.renderReminders();
        this.showToast(`👍 ${days} gün sonra tekrar hatırlatılacak`);
    }

    openStatsModal() {
        this.renderStatsPage();
        this.openModal('stats-modal');
        this.loadEvents();
    }

    setStatsRange(range) {
        this.statsRange = range;
        this.renderStatsPage();
    }

    computeStats() {
        const now = new Date();
        const thisWeek = this.startOfWeek(now);

        const weeks = [];
        for (let i = 7; i >= 0; i--) {
            const start = new Date(thisWeek);
            start.setDate(start.getDate() - i * 7);
            const end = new Date(start);
            end.setDate(end.getDate() + 7);
            const label = start.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
            weeks.push({ start, end, label, count: 0, current: i === 0 });
        }
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
            const label = start.toLocaleDateString('tr-TR', { month: 'short' });
            months.push({ start, end, label, count: 0, current: i === 0 });
        }

        const supplierCounts = {};
        let unassigned = 0;
        this.events.forEach(ev => {
            const t = new Date(ev.createdAt);
            const w = weeks.find(b => t >= b.start && t < b.end);
            if (w) w.count++;
            const m = months.find(b => t >= b.start && t < b.end);
            if (m) m.count++;
            const sup = ev.supplier || 'Belirtilmedi';
            if (sup === 'Belirtilmedi') unassigned++;
            else supplierCounts[sup] = (supplierCounts[sup] || 0) + 1;
        });

        const topProducts = this.getProductHistory()
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'tr'))
            .slice(0, 8);
        const topSuppliers = Object.entries(supplierCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);

        return {
            weeks,
            months,
            thisWeekCount: weeks[7].count,
            lastWeekCount: weeks[6].count,
            thisMonthCount: months[5].count,
            lastMonthCount: months[4].count,
            total: this.events.length,
            since: this.events.length ? new Date(this.events[0].createdAt) : null,
            topProducts,
            topSuppliers,
            unassigned
        };
    }

    formatDelta(current, previous) {
        if (!previous) return current ? '<span class="stats-delta">ilk veri</span>' : '';
        const diff = current - previous;
        if (diff === 0) return '<span class="stats-delta">öncekiyle aynı</span>';
        const pct = Math.round(Math.abs(diff) / previous * 100);
        return `<span class="stats-delta ${diff > 0 ? 'up' : 'down'}">${diff > 0 ? '▲' : '▼'} %${pct}</span>`;
    }

    renderColumnChart(buckets) {
        const max = Math.max(1, ...buckets.map(b => b.count));
        return `
            <div class="col-chart" role="img" aria-label="${buckets.map(b => `${b.label}: ${b.count}`).join(', ')}">
                ${buckets.map(b => `
                    <div class="col-chart-col ${b.current ? 'current' : ''}" tabindex="0" data-tip="${this.escapeHtml(b.label)}: ${b.count} eksik">
                        <span class="col-chart-value">${b.current || b.count === max ? b.count : ''}</span>
                        <div class="col-chart-track">
                            <div class="col-chart-bar" style="height: ${b.count ? Math.max(4, (b.count / max) * 100) : 0}%"></div>
                        </div>
                        <span class="col-chart-label">${this.escapeHtml(b.label)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderBarList(rows, unit) {
        if (!rows.length) return '<p class="stats-empty">Henüz yeterli veri yok.</p>';
        const max = Math.max(1, ...rows.map(r => r.count));
        return `
            <div class="bar-list">
                ${rows.map((r, idx) => `
                    <div class="bar-list-row" tabindex="0" data-tip="${this.escapeHtml(r.name)}: ${r.count} ${unit}">
                        <span class="bar-list-rank">${idx + 1}</span>
                        <div class="bar-list-body">
                            <div class="bar-list-head">
                                <span class="bar-list-name">${this.escapeHtml(r.name)}</span>
                                <span class="bar-list-count">${r.count}</span>
                            </div>
                            <div class="bar-list-track"><div class="bar-list-fill" style="width: ${(r.count / max) * 100}%"></div></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderStatsPage() {
        const body = document.getElementById('stats-modal-body');
        if (!body) return;
        if (!this.events.length) {
            body.innerHTML = '<p class="stats-empty">Henüz istatistik için kayıt yok. Ürün ekledikçe burası dolacak.</p>';
            return;
        }
        const s = this.computeStats();
        const isWeekly = this.statsRange === 'weekly';
        const sinceText = s.since ? s.since.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

        body.innerHTML = `
            <div class="stats-kpis">
                <div class="stats-kpi">
                    <span class="stats-kpi-label">Bu hafta</span>
                    <span class="stats-kpi-value">${s.thisWeekCount}</span>
                    <span class="stats-kpi-sub">Geçen hafta ${s.lastWeekCount} ${this.formatDelta(s.thisWeekCount, s.lastWeekCount)}</span>
                </div>
                <div class="stats-kpi">
                    <span class="stats-kpi-label">Bu ay</span>
                    <span class="stats-kpi-value">${s.thisMonthCount}</span>
                    <span class="stats-kpi-sub">Geçen ay ${s.lastMonthCount} ${this.formatDelta(s.thisMonthCount, s.lastMonthCount)}</span>
                </div>
                <div class="stats-kpi">
                    <span class="stats-kpi-label">Toplam kayıt</span>
                    <span class="stats-kpi-value">${s.total}</span>
                    <span class="stats-kpi-sub">İlk kayıt: ${sinceText}</span>
                </div>
            </div>

            <section class="stats-section">
                <div class="stats-section-head">
                    <h3>${isWeekly ? 'Haftalık eksik sayısı' : 'Aylık eksik sayısı'}</h3>
                    <div class="tab-pills stats-range">
                        <button type="button" class="tab-pill ${isWeekly ? 'active' : ''}" onclick="window.app.setStatsRange('weekly')">Haftalık</button>
                        <button type="button" class="tab-pill ${!isWeekly ? 'active' : ''}" onclick="window.app.setStatsRange('monthly')">Aylık</button>
                    </div>
                </div>
                ${this.renderColumnChart(isWeekly ? s.weeks : s.months)}
                <p class="stats-note">${isWeekly ? 'Son 8 hafta, haftalar pazartesi başlar.' : 'Son 6 ay.'} Parlak sütun içinde bulunduğumuz ${isWeekly ? 'hafta' : 'ay'}.</p>
            </section>

            <div class="stats-two-col">
                <section class="stats-section">
                    <div class="stats-section-head"><h3>En çok biten ürünler</h3></div>
                    ${this.renderBarList(s.topProducts, 'kez eksik')}
                </section>
                <section class="stats-section">
                    <div class="stats-section-head"><h3>En çok sipariş verilen toptancılar</h3></div>
                    ${this.renderBarList(s.topSuppliers, 'ürün')}
                    ${s.unassigned ? `<p class="stats-note">${s.unassigned} kayıtta toptancı seçilmemiş, sayılmadı.</p>` : ''}
                </section>
            </div>
        `;
    }

    isAuthenticated() {
        return typeof this.authToken === 'string' && this.authToken.includes('.');
    }

    showLoginScreen() {
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('main-app-container').style.display = 'none';
    }

    showAppScreen() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-app-container').style.display = 'block';
        const userDisplay = document.getElementById('display-username');
        if (userDisplay) userDisplay.textContent = this.currentUser;
        const avatarEl = document.getElementById('display-user-avatar');
        if (avatarEl) avatarEl.textContent = (this.currentUser || 'A').trim().charAt(0).toLocaleUpperCase('tr-TR');
    }

    initAuth() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin();
            });
        }

        const pwdToggleBtn = document.getElementById('btn-toggle-login-pwd');
        const loginPwdInput = document.getElementById('login-password');
        if (pwdToggleBtn && loginPwdInput) {
            pwdToggleBtn.addEventListener('click', () => {
                const isPwd = loginPwdInput.type === 'password';
                loginPwdInput.type = isPwd ? 'text' : 'password';
                pwdToggleBtn.setAttribute('aria-pressed', isPwd ? 'true' : 'false');
            });
        }

        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('dukkan_token');
                localStorage.removeItem('dukkan_username');
                this.authToken = null;
                this.isBulkMode = false;
                if (this.selectedIds) this.selectedIds.clear();
                if (typeof this.updateBulkBarUI === 'function') this.updateBulkBarUI();
                if (this.socket) {
                    try { this.socket.disconnect(); } catch (e) {}
                    this.socket = null;
                }
                this.showLoginScreen();
                this.showToast('Çıkış yapıldı');
            });
        }

        const userSettingsBtn = document.getElementById('btn-open-user-settings');
        if (userSettingsBtn) {
            userSettingsBtn.addEventListener('click', () => {
                this.openAdminModal();
            });
        }

        const formAppName = document.getElementById('form-change-app-name');
        if (formAppName) {
            formAppName.addEventListener('submit', async (e) => {
                e.preventDefault();
                const input = document.getElementById('input-app-name');
                if (input && input.value.trim()) {
                    await this.saveAppName(input.value.trim());
                }
            });
        }

        const pwdForm = document.getElementById('change-password-form');
        if (pwdForm) {
            pwdForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleChangePassword();
            });
        }
    }

    async handleLogin() {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const errorDiv = document.getElementById('login-error');

        errorDiv.style.display = 'none';

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                this.authToken = data.token;
                this.currentUser = data.username;
                localStorage.setItem('dukkan_token', data.token);
                localStorage.setItem('dukkan_username', data.username);

                this.isHandlingUnauthorized = false;
                this.showAppScreen();
                this.initSocket();
                await this.flushOfflineQueue();
                await this.loadSuppliers();
                await this.loadInitialData();
                await this.loadSettings();
                await this.loadServerInfo();
                this.loadEvents();
                this.loadNotes();
                this.showToast(`Hoş geldiniz, ${data.username}!`);
            } else {
                errorDiv.textContent = data.error || 'Giriş yapılamadı!';
                errorDiv.style.display = 'block';
            }
        } catch (err) {
            errorDiv.textContent = 'Sunucuya bağlanılamadı.';
            errorDiv.style.display = 'block';
        }
    }

    async handleChangePassword() {
        const curr = document.getElementById('input-curr-pwd').value;
        const next = document.getElementById('input-new-pwd').value;
        const msg = document.getElementById('pwd-change-msg');

        try {
            const res = await this.apiFetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.currentUser,
                    currentPassword: curr,
                    newPassword: next
                })
            });

            const data = await res.json();
            if (res.ok) {
                msg.textContent = 'Şifreniz başarıyla güncellendi!';
                msg.className = 'pwd-change-msg is-success';
                msg.style.display = 'block';
                setTimeout(() => {
                    this.closeAllModals();
                    msg.style.display = 'none';
                }, 1500);
            } else {
                msg.textContent = data.error || 'Şifre güncellenemedi.';
                msg.className = 'pwd-change-msg is-error';
                msg.style.display = 'block';
            }
        } catch (e) {
            msg.textContent = 'Sunucu hatası.';
            msg.className = 'pwd-change-msg is-error';
            msg.style.display = 'block';
        }
    }

    initTheme() {
        localStorage.removeItem('theme_mode');
        document.body.classList.remove('light-theme');
        const saved = localStorage.getItem('hkc_theme') || 'dark';
        this.applyTheme(saved, false);

        [document.getElementById('btn-theme-toggle'), document.getElementById('btn-login-theme-toggle')].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.toggleTheme());
            }
        });
    }

    applyTheme(theme, persist = true) {
        const resolved = theme === 'light' ? 'light' : 'dark';
        this.theme = resolved;
        document.documentElement.setAttribute('data-theme', resolved);
        const metaTheme = document.getElementById('meta-theme-color');
        if (metaTheme) {
            metaTheme.setAttribute('content', resolved === 'light' ? '#f1f5fa' : '#060b14');
        }
        const label = resolved === 'light' ? 'Koyu Temaya Geç' : 'Açık Temaya Geç';
        [document.getElementById('btn-theme-toggle'), document.getElementById('btn-login-theme-toggle')].forEach(btn => {
            if (btn) {
                btn.title = label;
                btn.setAttribute('aria-label', label);
            }
        });
        if (persist) {
            localStorage.setItem('hkc_theme', resolved);
        }
    }

    toggleTheme() {
        const next = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(next, true);
        this.showToast(next === 'light' ? 'Açık tema etkinleştirildi' : 'Koyu tema etkinleştirildi');
    }

    fillQuickItem(name, qty) {
        const nameInput = document.getElementById('input-name');
        const qtyInput = document.getElementById('input-quantity');
        if (nameInput) {
            nameInput.value = name;
            nameInput.focus();
        }
        if (qtyInput) {
            qtyInput.value = qty || '1 kutu';
        }
        this.showToast(`Seçildi: ${name} (${qty || '1 kutu'})`);
    }

    // Quick Selection Pills Dynamic Manager
    getDefaultQuickItems() {
        return [
            { id: '1', name: '4x50 Sunta Vidası', qty: '10 kutu', emoji: '🔩' },
            { id: '2', name: 'Şeffaf Silikon', qty: '1 koli', emoji: '🧴' },
            { id: '3', name: '115mm Taşlama Taşı', qty: '25 adet', emoji: '⚙️' },
            { id: '4', name: 'Teflon Bant', qty: '10 adet', emoji: '🩹' },
            { id: '5', name: 'Koli Bandı 45x100', qty: '1 koli', emoji: '📦' },
            { id: '6', name: 'Beyaz Akrilik Mastik', qty: '1 koli', emoji: '🧱' },
            { id: '7', name: '8mm Plastik Dübel', qty: '5 paket', emoji: '📍' },
            { id: '8', name: 'Poliüretan Köpük 750ml', qty: '1 koli', emoji: '🧼' },
            { id: '9', name: 'WD-40 Pas Sökücü 400ml', qty: '6 adet', emoji: '🛢️' },
            { id: '10', name: 'Siyah Elektrik Bandı', qty: '10 adet', emoji: '🔌' },
            { id: '11', name: 'Dekupaj Testere Ucu', qty: '5 paket', emoji: '🪚' },
            { id: '12', name: 'Hızlı Yapıştırıcı (MDF Kit)', qty: '1 koli', emoji: '⚡' }
        ];
    }

    loadQuickPills() {
        try {
            const saved = localStorage.getItem('dukkan_quick_items');
            if (saved) {
                this.quickItems = JSON.parse(saved);
            } else {
                this.quickItems = this.getDefaultQuickItems();
                this.saveQuickPills();
            }
        } catch (e) {
            this.quickItems = this.getDefaultQuickItems();
        }
    }

    saveQuickPills() {
        try {
            localStorage.setItem('dukkan_quick_items', JSON.stringify(this.quickItems));
        } catch (e) {
            console.warn('Quick pills kaydedilemedi:', e);
        }
        if (this.isAuthenticated() && navigator.onLine) {
            this.apiFetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: 'quick_items',
                    value: JSON.stringify(this.quickItems)
                })
            }).catch(() => {});
        }
    }

    handleReceivedQuickItemsSetting(rawValue) {
        if (typeof rawValue !== 'string') return;
        try {
            const parsed = JSON.parse(rawValue);
            if (!Array.isArray(parsed)) return;
            const cleaned = parsed.map(v => String(v || '').trim()).filter(Boolean);
            this.quickItems = cleaned;
            localStorage.setItem('dukkan_quick_items', JSON.stringify(cleaned));
            this.renderQuickPills();
        } catch (e) {
            console.warn('Hızlı ürün ayarları çözümlenemedi:', e);
        }
    }

    renderQuickPills() {
        const container = document.getElementById('hardware-quick-pills-container');
        if (!container) return;

        if (!this.quickItems || this.quickItems.length === 0) {
            container.innerHTML = `
                <div style="color:var(--text-muted); font-size:0.8rem; padding:0.4rem 0;">
                    Kayıtlı hızlı seçenek kalmadı. 
                    <button type="button" class="btn btn-secondary btn-xs" onclick="window.app.restoreDefaultQuickPills()" style="margin-left:0.5rem;">Varsayılanları Yükle</button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.quickItems.map(item => `
            <div class="quick-pill-item ${this.isPillsEditMode ? 'edit-mode' : ''}" id="pill-${item.id}">
                <button type="button" class="quick-pill-btn" onclick="window.app.handleQuickPillClick('${item.id}')" title="${item.name} (${item.qty})">
                    <span>${item.emoji || '⚡'}</span>
                    <span>${this.escapeHtml(item.name)}</span>
                </button>
                <button type="button" class="quick-pill-delete-btn" title="Bu seçeneği kaldır" onclick="window.app.deleteQuickPill('${item.id}', event)">✕</button>
            </div>
        `).join('');
    }

    handleQuickPillClick(id) {
        if (this.isPillsEditMode) {
            this.deleteQuickPill(id);
            return;
        }
        const item = (this.quickItems || []).find(q => q.id === id);
        if (item) {
            this.fillQuickItem(item.name, item.qty);
        }
    }

    togglePillsEditMode() {
        this.isPillsEditMode = !this.isPillsEditMode;
        const icon = document.getElementById('edit-pills-icon');
        const text = document.getElementById('edit-pills-text');
        const btn = document.getElementById('btn-toggle-edit-pills');

        if (this.isPillsEditMode) {
            if (icon) icon.innerHTML = UI_ICONS.check;
            if (text) text.textContent = 'Tamamla';
            if (btn) btn.classList.add('active');
            this.showToast('Çıkarmak istediğiniz hızlı seçeneğin üzerindeki ✕ butonuna dokunun');
        } else {
            if (icon) icon.innerHTML = UI_ICONS.trash;
            if (text) text.textContent = 'Çıkar / Düzenle';
            if (btn) btn.classList.remove('active');
        }

        this.renderQuickPills();
    }

    deleteQuickPill(id, event) {
        if (event) event.stopPropagation();
        const found = (this.quickItems || []).find(q => q.id === id);
        this.quickItems = (this.quickItems || []).filter(q => q.id !== id);
        this.saveQuickPills();
        this.renderQuickPills();
        this.showToast(`Çıkarıldı: ${found ? found.name : 'Seçenek'}`);
    }

    openAddQuickPillModal() {
        const nameInput = document.getElementById('new-pill-name');
        const qtyInput = document.getElementById('new-pill-qty');
        if (nameInput) nameInput.value = '';
        if (qtyInput) qtyInput.value = '1 kutu';
        this.selectedPillEmoji = '🔩';
        this.updateEmojiPickerUI();
        this.openModal('add-quick-pill-modal');
        if (nameInput) setTimeout(() => nameInput.focus(), 150);
    }

    updateEmojiPickerUI() {
        document.querySelectorAll('.emoji-opt-btn').forEach(btn => {
            if (btn.dataset.emoji === this.selectedPillEmoji) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    handleAddQuickPill(e) {
        if (e) e.preventDefault();
        const nameInput = document.getElementById('new-pill-name');
        const qtyInput = document.getElementById('new-pill-qty');
        const name = nameInput ? nameInput.value.trim() : '';
        const qty = qtyInput ? qtyInput.value.trim() || '1 kutu' : '1 kutu';

        if (!name) return;

        const newItem = {
            id: Date.now().toString(),
            name: name,
            qty: qty,
            emoji: this.selectedPillEmoji || '⚡'
        };

        if (!this.quickItems) this.quickItems = [];
        this.quickItems.push(newItem);
        this.saveQuickPills();
        this.renderQuickPills();
        this.closeAllModals();
        this.showToast(`Hızlı Seçeneklere Eklendi: ${name}`);
    }

    restoreDefaultQuickPills() {
        this.quickItems = this.getDefaultQuickItems();
        this.saveQuickPills();
        this.renderQuickPills();
        this.showToast('Varsayılan hırdavat seçenekleri geri yüklendi');
    }

    // Socket.IO
    initSocket() {
        if (this.socket) return;
        if (typeof io !== 'undefined') {
            // Depoda/çekmeyen yerde uzun kopmalar olabilir: denemeyi hiç bırakma
            this.socket = io({
                auth: { token: this.authToken },
                reconnectionDelay: 1000,
                reconnectionDelayMax: 10000,
                reconnectionAttempts: Infinity
            });

            this.socket.on('connect', () => {
                this.updateConnectionStatus(true, 'Canlı Bağlı');
                this.flushOfflineQueue();
            });

            this.socket.on('connect_error', (err) => {
                const msg = err && err.message ? err.message : '';
                if (/AUTH_REQUIRED|Yetkisiz/i.test(msg)) {
                    this.handleUnauthorized();
                } else {
                    this.updateConnectionStatus(false, navigator.onLine ? 'Bağlantı Hatası' : 'Çevrimdışı');
                }
            });

            this.socket.on('disconnect', () => {
                this.updateConnectionStatus(false, navigator.onLine ? 'Bağlantı Kesildi' : 'Çevrimdışı');
            });

            this.socket.on('init', (data) => {
                if (data.items) {
                    this.items = data.items;
                    this.applyPendingOfflineMutations();
                    this.saveItemsCache(this.items);
                    this.render();
                }
                if (data.suppliers) {
                    this.suppliers = data.suppliers;
                    this.writeJsonStorage('dukkan_suppliers_cache', this.suppliers);
                    this.populateSupplierSelects();
                }
                if (data.settings && data.settings.app_icon) {
                    this.handleReceivedIconSetting(data.settings.app_icon);
                }
                if (data.settings && data.settings.app_name) {
                    this.handleReceivedNameSetting(data.settings.app_name);
                }
                if (data.settings && data.settings.quick_items) {
                    this.handleReceivedQuickItemsSetting(data.settings.quick_items);
                }
                if (data.lastBackup) {
                    this.updateLastBackupDisplay(data.lastBackup);
                } else {
                    this.fetchAndDisplayLastBackup();
                }
            });

            this.socket.on('setting:updated', (data) => {
                if (data.key === 'app_icon') {
                    this.handleReceivedIconSetting(data.value);
                }
                if (data.key === 'app_name') {
                    this.handleReceivedNameSetting(data.value);
                }
                if (data.key === 'quick_items') {
                    this.handleReceivedQuickItemsSetting(data.value);
                }
            });

            this.socket.on('backup:created', (data) => {
                this.updateLastBackupDisplay(data);
                const listModal = document.getElementById('server-backups-modal');
                if (listModal && listModal.classList.contains('active')) {
                    this.renderServerBackups();
                }
            });

            this.socket.on('item:added', (newItem) => {
                const existingIdx = this.items.findIndex(i => i.id === newItem.id);
                if (!this.events.find(ev => ev.itemId === newItem.id)) {
                    this.events.push({
                        itemId: newItem.id,
                        name: newItem.name,
                        nameKey: this.nameKey(newItem.name),
                        supplier: newItem.supplier,
                        urgency: newItem.urgency,
                        createdAt: newItem.createdAt
                    });
                    this.writeJsonStorage('dukkan_events_cache', this.events);
                }
                if (existingIdx === -1) {
                    this.items.unshift(newItem);
                    this.saveItemsCache();
                    if (newItem.urgency === 'critical' || newItem.urgency === 'urgent') {
                        window.soundManager.playUrgent();
                    } else {
                        window.soundManager.playNewItem();
                    }
                    this.render();
                    this.showToast(`Yeni Eksik: ${newItem.name} (${newItem.quantity})`);
                }
            });

            this.socket.on('item:updated', (updatedItem) => {
                const idx = this.items.findIndex(i => i.id === updatedItem.id);
                if (idx !== -1) {
                    this.items[idx] = updatedItem;
                } else {
                    this.items.unshift(updatedItem);
                }
                this.saveItemsCache();
                this.render();
            });

            this.socket.on('item:soft-deleted', (data) => {
                const targetId = data.id || (data.item && data.item.id);
                const idx = this.items.findIndex(i => i.id === targetId);
                if (idx !== -1) {
                    this.items[idx].status = 'deleted';
                    if (data.item) {
                        this.items[idx] = { ...this.items[idx], ...data.item };
                    }
                    this.saveItemsCache();
                    this.render();
                }
            });

            this.socket.on('item:deleted', (data) => {
                const targetId = typeof data === 'object' ? data.id : data;
                this.items = this.items.filter(i => i.id !== targetId);
                if (this.selectedIds) this.selectedIds.delete(targetId);
                this.saveItemsCache();
                if (window.soundManager && window.soundManager.playDelete) {
                    window.soundManager.playDelete();
                }
                this.render();
            });

            this.socket.on('items:bulk-updated', (data) => {
                if (data && Array.isArray(data.ids) && data.updates) {
                    const idSet = new Set(data.ids);
                    this.items.forEach(item => {
                        if (idSet.has(item.id)) {
                            Object.assign(item, data.updates);
                            if (data.updatedAt) item.updatedAt = data.updatedAt;
                        }
                    });
                    if (data.updates.status === 'deleted' && this.selectedIds) {
                        data.ids.forEach(id => this.selectedIds.delete(id));
                    }
                    this.saveItemsCache();
                    this.render();
                } else if (Array.isArray(data)) {
                    data.forEach(u => {
                        const idx = this.items.findIndex(i => i.id === u.id);
                        if (idx !== -1) this.items[idx] = u;
                        else this.items.unshift(u);
                    });
                    this.saveItemsCache();
                    this.render();
                }
            });

            this.socket.on('items:bulk-deleted', () => {
                this.items.forEach(i => {
                    if (i.status === 'completed') i.status = 'deleted';
                });
                this.saveItemsCache();
                this.render();
            });

            this.socket.on('items:all-restored', () => {
                this.items.forEach(i => {
                    if (i.status === 'deleted') i.status = 'pending';
                });
                this.saveItemsCache();
                this.render();
            });

            this.socket.on('items:trash-emptied', () => {
                this.items = this.items.filter(i => i.status !== 'deleted');
                this.saveItemsCache();
                this.render();
            });

            this.socket.on('backup:imported', (data) => {
                if (data.items) {
                    this.items = data.items;
                    this.saveItemsCache();
                }
                if (data.suppliers) {
                    this.suppliers = data.suppliers;
                    this.writeJsonStorage('dukkan_suppliers_cache', this.suppliers);
                    this.populateSupplierSelects();
                }
                this.render();
                if (window.soundManager && window.soundManager.playCompleted) {
                    window.soundManager.playCompleted();
                }
                this.showToast('📥 Canlı yedek senkronizasyonu tamamlandı!');
            });

            this.socket.on('supplier:added', (newSup) => {
                if (!this.suppliers.find(s => s.id === newSup.id)) {
                    this.suppliers.push(newSup);
                    this.populateSupplierSelects();
                    this.renderSuppliersModal();
                }
            });

            this.socket.on('supplier:deleted', (data) => {
                this.suppliers = this.suppliers.filter(s => s.id !== data.id);
                this.populateSupplierSelects();
                this.renderSuppliersModal();
            });

            this.socket.on('supplier:updated', (data) => {
                const sup = this.suppliers.find(s => s.id === data.id);
                if (sup) {
                    sup.name = data.name;
                }
                if (data.oldName && data.name) {
                    this.items.forEach(i => {
                        if (i.supplier === data.oldName) i.supplier = data.name;
                    });
                }
                this.populateSupplierSelects();
                this.renderSuppliersModal();
                this.render();
            });

            this.socket.on('note:added', (note) => {
                if (this.notes.find(n => n.id === note.id)) return;
                this.notes.push(note);
                this.renderNotes();
                const modal = document.getElementById('notes-modal');
                const isOpen = modal && modal.classList.contains('active');
                if (isOpen) {
                    this.markNotesSeen();
                } else if (!this.isMyNote(note)) {
                    this.updateNotesBadge();
                    if (window.soundManager && window.soundManager.playNewItem) window.soundManager.playNewItem();
                    this.showToast(`💬 ${note.author || 'Yeni not'}: ${note.text.slice(0, 60)}`);
                }
            });

            this.socket.on('note:deleted', (data) => {
                this.notes = this.notes.filter(n => n.id !== data.id);
                this.renderNotes();
                this.updateNotesBadge();
            });

            this.socket.on('supplier:all-deleted', () => {
                this.suppliers = [];
                this.populateSupplierSelects();
                this.renderSuppliersModal();
            });
        }
    }

    updateConnectionStatus(isLive, label) {
        const badge = document.getElementById('connection-badge');
        const text = document.getElementById('connection-text');
        if (badge && text) {
            text.textContent = label;
            badge.classList.toggle('is-offline', !isLive);
        }
    }

    // Load Data
    async loadInitialData() {
        try {
            const res = await this.apiFetch('/api/items');
            if (res.ok) {
                this.items = await res.json();
                this.applyPendingOfflineMutations();
                this.saveItemsCache(this.items);
                this.render();
                return;
            }
            if (res.status === 401) return;
        } catch (err) {
            console.warn('API yükleme hatası, önbellek kontrol ediliyor:', err);
        }

        const cached = this.readJsonStorage('dukkan_items_cache', null);
        if (Array.isArray(cached)) {
            this.items = cached;
            this.applyPendingOfflineMutations();
            this.render();
            this.showToast('📦 Çevrimdışı önbellekten liste yüklendi');
        }
    }

    async loadSuppliers() {
        try {
            const res = await this.apiFetch('/api/suppliers');
            if (res.ok) {
                this.suppliers = await res.json();
                this.writeJsonStorage('dukkan_suppliers_cache', this.suppliers);
                this.populateSupplierSelects();
                return;
            }
            if (res.status === 401) return;
        } catch (err) {
            console.warn('Toptancı yükleme hatası, önbellek kontrol ediliyor:', err);
        }

        const cachedSuppliers = this.readJsonStorage('dukkan_suppliers_cache', null);
        if (Array.isArray(cachedSuppliers)) {
            this.suppliers = cachedSuppliers;
            this.populateSupplierSelects();
        }
    }

    populateSupplierSelects() {
        const inputSup = document.getElementById('input-supplier');
        const filterSup = document.getElementById('filter-supplier');
        const bulkSup = document.getElementById('bulk-supplier-select');

        if (inputSup) {
            const prevInput = inputSup.value;
            inputSup.innerHTML = `<option value="Belirtilmedi">Toptancı Seçiniz (Opsiyonel)</option>` +
                this.suppliers.map(s => `<option value="${this.escapeHtml(s.name)}">${this.escapeHtml(s.name)}</option>`).join('');
            if (prevInput && Array.from(inputSup.options).some(o => o.value === prevInput)) {
                inputSup.value = prevInput;
            }
        }

        if (filterSup) {
            const prevFilter = filterSup.value;
            filterSup.innerHTML = `<option value="all">Tüm Toptancılar</option>` +
                this.suppliers.map(s => `<option value="${this.escapeHtml(s.name)}">${this.escapeHtml(s.name)}</option>`).join('');
            if (prevFilter && Array.from(filterSup.options).some(o => o.value === prevFilter)) {
                filterSup.value = prevFilter;
            }
        }

        if (bulkSup) {
            const prevBulk = bulkSup.value;
            bulkSup.innerHTML = `<option value="">Toptancı Seç...</option>` +
                `<option value="Belirtilmedi">Belirtilmedi (Temizle)</option>` +
                this.suppliers.map(s => `<option value="${this.escapeHtml(s.name)}">${this.escapeHtml(s.name)}</option>`).join('');
            if (prevBulk && Array.from(bulkSup.options).some(o => o.value === prevBulk)) {
                bulkSup.value = prevBulk;
            }
        }

        if (typeof this.syncAllCustomSelects === 'function') {
            this.syncAllCustomSelects();
        }
    }

    async loadServerInfo() {
        try {
            const res = await this.apiFetch('/api/info');
            if (res.ok) {
                const info = await res.json();
                const dbIndicator = document.getElementById('header-db-indicator');
                if (dbIndicator) {
                    dbIndicator.innerHTML = info.isTurso
                        ? `${UI_ICONS.cloud} <span>Turso Bulut Veritabanı</span>`
                        : `${UI_ICONS.database} <span>Yerel SQLite / LibSQL</span>`;
                }
            }
        } catch (e) {
            console.warn('Sunucu bilgisi alınamadı:', e);
        }
    }

    // Suppliers Management
    renderSuppliersModal() {
        const container = document.getElementById('suppliers-list-container');
        if (!container) return;

        if (this.suppliers.length === 0) {
            container.innerHTML = '<div class="suppliers-empty-box">Kayıtlı toptancı bulunmuyor. Yukarıdan istediğiniz toptancıyı ekleyebilirsiniz.</div>';
            return;
        }

        const itemsHtml = this.suppliers.map(sup => `
            <div class="supplier-manage-item" id="sup-row-${sup.id}">
                <span class="sup-name" id="sup-name-${sup.id}">${UI_ICONS.building} <span>${this.escapeHtml(sup.name)}</span></span>
                <div class="sup-actions" id="sup-actions-${sup.id}">
                    <button type="button" class="btn btn-secondary btn-xs" title="Toptancı Adını Güncelle" onclick="window.app.startEditSupplier('${sup.id}')">
                        ${UI_ICONS.edit} <span>Düzenle</span>
                    </button>
                    <button type="button" class="btn btn-danger btn-xs" title="Toptancıyı Sil" onclick="window.app.deleteSupplier('${sup.id}')">
                        ${UI_ICONS.trash} <span>Sil</span>
                    </button>
                </div>
            </div>
        `).join('');

        const clearAllHtml = `
            <div class="suppliers-clear-wrap">
                <button type="button" class="btn btn-danger btn-sm btn-full-center" onclick="window.app.clearAllSuppliers()">
                    ${UI_ICONS.trash}
                    <span>Tüm Toptancıları Temizle (Boş Bırak)</span>
                </button>
            </div>
        `;

        container.innerHTML = itemsHtml + clearAllHtml;
    }

    startEditSupplier(id) {
        const sup = this.suppliers.find(s => s.id === id);
        if (!sup) return;

        const row = document.getElementById(`sup-row-${id}`);
        if (!row) return;

        row.innerHTML = `
            <form class="supplier-edit-form" onsubmit="event.preventDefault(); window.app.saveEditSupplier('${id}');">
                <input type="text" id="sup-edit-input-${id}" value="${this.escapeHtml(sup.name)}" required autocomplete="off">
                <button type="submit" class="btn btn-primary btn-xs">${UI_ICONS.save} <span>Kaydet</span></button>
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.app.renderSuppliersModal()">${UI_ICONS.x}</button>
            </form>
        `;

        const input = document.getElementById(`sup-edit-input-${id}`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    async saveEditSupplier(id) {
        const input = document.getElementById(`sup-edit-input-${id}`);
        if (!input) return;
        const newName = input.value.trim();
        if (!newName) return;

        const sup = this.suppliers.find(s => s.id === id);
        if (!sup) return;

        const oldName = sup.name;
        if (oldName === newName) {
            this.renderSuppliersModal();
            return;
        }

        // Optimistic UI update
        sup.name = newName;
        if (oldName) {
            this.items.forEach(i => {
                if (i.supplier === oldName) i.supplier = newName;
            });
        }
        this.populateSupplierSelects();
        this.renderSuppliersModal();
        this.render();
        this.showToast(`✅ Toptancı güncellendi: ${newName}`);

        try {
            const res = await this.apiFetch(`/api/suppliers/${encodeURIComponent(id)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });

            if (!res.ok) {
                const err = await res.json();
                this.showToast(err.error || 'Güncelleme başarısız');
            }
        } catch (e) {
            console.error('Toptancı güncelleme hatası:', e);
            this.showToast('Bağlantı hatası');
        }
    }

    async handleAddSupplier(name) {
        if (!name || !name.trim()) return;

        try {
            const res = await this.apiFetch('/api/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() })
            });

            if (res.ok) {
                const created = await res.json();
                if (!this.suppliers.find(s => s.id === created.id)) {
                    this.suppliers.push(created);
                    this.populateSupplierSelects();
                    this.renderSuppliersModal();
                }
                const input = document.getElementById('new-supplier-name');
                if (input) input.value = '';
                this.showToast(`Toptancı Eklendi: ${created.name}`);
            } else {
                const err = await res.json();
                this.showToast(err.error || 'Toptancı eklenemedi.');
            }
        } catch (e) {
            this.showToast('Sunucu hatası.');
        }
    }

    async deleteSupplier(id, name) {
        const found = this.suppliers.find(s => s.id === id);
        const resolvedName = name || (found ? found.name : 'Toptancı');
        // Optimistic removal for instant UI feedback
        this.suppliers = this.suppliers.filter(s => s.id !== id && s.name !== resolvedName);
        this.populateSupplierSelects();
        this.renderSuppliersModal();
        this.showToast(`Toptancı Silindi: ${resolvedName}`);

        try {
            await this.apiFetch(`/api/suppliers/${encodeURIComponent(id)}`, { method: 'DELETE' });
        } catch (e) {
            console.error('Silme hatası:', e);
        }
    }

    async clearAllSuppliers() {
        this.suppliers = [];
        this.populateSupplierSelects();
        this.renderSuppliersModal();
        this.showToast('Tüm toptancılar temizlendi');

        try {
            await this.apiFetch('/api/suppliers', { method: 'DELETE' });
        } catch (e) {
            console.error('Temizleme hatası:', e);
        }
    }

    // Photo Handling (Compression & Attachments)
    initPhotoHandlers() {
        const triggerBtn = document.getElementById('btn-trigger-photo');
        const fileInput = document.getElementById('input-photo');
        const previewContainer = document.getElementById('add-photo-preview-container');
        const previewImg = document.getElementById('add-photo-preview-img');
        const removePhotoBtn = document.getElementById('btn-remove-selected-photo');

        if (triggerBtn && fileInput) {
            triggerBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const compressed = await this.compressImage(file);
                this.selectedAddPhoto = compressed;
                if (previewImg) previewImg.src = compressed;
                if (previewContainer) previewContainer.style.display = 'flex';
                triggerBtn.classList.add('btn-primary');
                triggerBtn.classList.remove('btn-secondary');
            });
        }

        if (removePhotoBtn) {
            removePhotoBtn.addEventListener('click', () => {
                this.selectedAddPhoto = '';
                if (fileInput) fileInput.value = '';
                if (previewContainer) previewContainer.style.display = 'none';
                if (triggerBtn) {
                    triggerBtn.classList.remove('btn-primary');
                    triggerBtn.classList.add('btn-secondary');
                }
            });
        }

        // Hidden input for attaching/updating photo directly from an item card
        const cardFileInput = document.getElementById('item-card-photo-input');
        if (cardFileInput) {
            cardFileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file || !this.targetPhotoItemId) return;

                const compressed = await this.compressImage(file);
                const itemId = this.targetPhotoItemId;
                this.targetPhotoItemId = null;
                cardFileInput.value = '';

                await this.updateItemDetails(itemId, { image: compressed });
                this.showToast('Ürüne fotoğraf eklendi!');
                window.soundManager.playCompleted();
            });
        }
    }

    triggerCardPhotoUpload(itemId) {
        this.targetPhotoItemId = itemId;
        const cardFileInput = document.getElementById('item-card-photo-input');
        if (cardFileInput) cardFileInput.click();
    }

    // Client-side Image Compression (max 800px, 0.7 quality -> ~40-80KB)
    compressImage(file, maxDimension = 800, quality = 0.7) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxDimension) {
                            height = Math.round((height * maxDimension) / width);
                            width = maxDimension;
                        }
                    } else {
                        if (height > maxDimension) {
                            width = Math.round((width * maxDimension) / height);
                            height = maxDimension;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(dataUrl);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    openLightbox(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item || !item.image) return;

        const modal = document.getElementById('image-lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const title = document.getElementById('lightbox-title');

        if (img) img.src = item.image;
        if (title) title.textContent = `${item.name} (${item.quantity})`;

        this.openModal('image-lightbox-modal');
    }

    // Event Listeners
    initEventListeners() {
        const form = document.getElementById('quick-add-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.checkAndAddItem();
            });
        }

        // Duplicate Modal Buttons
        const btnDupUpdate = document.getElementById('btn-dup-update-qty');
        const btnDupForce = document.getElementById('btn-dup-force-add');
        const btnDupCancel = document.getElementById('btn-dup-cancel');

        if (btnDupUpdate) btnDupUpdate.addEventListener('click', () => this.resolveDuplicateUpdateQty());
        if (btnDupForce) btnDupForce.addEventListener('click', () => this.resolveDuplicateForceAdd());
        if (btnDupCancel) {
            btnDupCancel.addEventListener('click', () => {
                this.closeAllModals();
                this.pendingDuplicateItem = null;
            });
        }

        // Suppliers Modal Open
        const btnOpenSuppliers = document.getElementById('btn-open-suppliers');
        if (btnOpenSuppliers) {
            btnOpenSuppliers.addEventListener('click', () => {
                this.renderSuppliersModal();
                this.openModal('suppliers-modal');
            });
        }

        const addSupForm = document.getElementById('add-supplier-form');
        if (addSupForm) {
            addSupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('new-supplier-name').value;
                this.handleAddSupplier(name);
            });
        }

        // Voice Recognition
        const voiceBtn = document.getElementById('btn-voice-input');
        const voiceFab = document.getElementById('fab-voice');
        if (voiceBtn) voiceBtn.addEventListener('click', () => this.startVoiceInput());
        if (voiceFab) voiceFab.addEventListener('click', () => this.startVoiceInput());

        // Search & Clear Search Button
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('btn-clear-search');
        const updateSearchClearBtn = () => {
            if (clearSearchBtn && searchInput) {
                clearSearchBtn.style.display = searchInput.value ? 'inline-flex' : 'none';
            }
        };
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                updateSearchClearBtn();
                this.render();
            });
        }
        if (clearSearchBtn && searchInput) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.searchQuery = '';
                updateSearchClearBtn();
                this.render();
                searchInput.focus();
            });
        }

        // Interactive KPI Stat Cards Filter
        document.querySelectorAll('.stat-card[data-stat-filter]').forEach(card => {
            const triggerStatFilter = () => {
                const target = card.dataset.statFilter;
                const nextFilter = (this.filterStatus === target && target !== 'all') ? 'all' : target;
                this.setFilter(nextFilter);
            };
            card.addEventListener('click', triggerStatFilter);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerStatFilter();
                }
            });
        });

        // Filters
        const statusFilter = document.getElementById('filter-status');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.setFilter(e.target.value);
            });
        }

        const supFilter = document.getElementById('filter-supplier');
        if (supFilter) {
            supFilter.addEventListener('change', (e) => {
                this.activeSupplier = e.target.value;
                this.render();
            });
        }

        // Tab Views (Tüm Liste / Toptancıya Göre) — scoped to toolbar
        document.querySelectorAll('.toolbar-bar .tab-pill[data-view]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toolbar-bar .tab-pill[data-view]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                this.render();
            });
        });

        // Copy to Clipboard
        const btnCopy = document.getElementById('btn-copy-list');
        if (btnCopy) {
            btnCopy.addEventListener('click', () => this.copyListToClipboard());
        }

        // Quick Filter Chips
        document.querySelectorAll('.chip-filter').forEach(chip => {
            chip.addEventListener('click', () => {
                this.setFilter(chip.dataset.filter);
            });
        });

        // PDF Export & Print
        const btnPdf = document.getElementById('btn-export-pdf');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                window.exportManager.printOrderSheet(this.items, this.appName || 'HKC');
            });
        }

        // JSON Full Security Backup
        const btnBackup = document.getElementById('btn-export-backup');
        if (btnBackup) {
            btnBackup.addEventListener('click', () => {
                this.exportBackupJson();
            });
        }

        // Backup File Import Trigger
        const btnImportTrigger = document.getElementById('btn-import-backup-trigger');
        const backupFileInput = document.getElementById('backup-file-input');
        if (btnImportTrigger && backupFileInput) {
            btnImportTrigger.addEventListener('click', () => {
                backupFileInput.value = '';
                backupFileInput.click();
            });

            backupFileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    this.handleBackupFileSelect(file);
                }
            });
        }

        // Confirm Backup Import Button
        const btnConfirmImport = document.getElementById('btn-confirm-import-backup');
        if (btnConfirmImport) {
            btnConfirmImport.addEventListener('click', () => {
                this.executeBackupImport();
            });
        }

        // Instant Server Backup Trigger (Admin modal & Backups modal)
        const btnInstant1 = document.getElementById('btn-trigger-instant-backup');
        if (btnInstant1) {
            btnInstant1.addEventListener('click', () => this.triggerInstantBackup());
        }
        const btnInstant2 = document.getElementById('btn-modal-instant-backup');
        if (btnInstant2) {
            btnInstant2.addEventListener('click', () => this.triggerInstantBackup());
        }

        // Open Server Backups Modal
        const btnOpenBackups = document.getElementById('btn-open-server-backups');
        if (btnOpenBackups) {
            btnOpenBackups.addEventListener('click', () => this.openServerBackupsModal());
        }

        // Refresh Backups List Button
        const btnRefreshBackups = document.getElementById('btn-refresh-backups-list');
        if (btnRefreshBackups) {
            btnRefreshBackups.addEventListener('click', () => this.renderServerBackups());
        }

        // Clear completed
        const btnClear = document.getElementById('btn-clear-completed');
        if (btnClear) {
            btnClear.addEventListener('click', () => this.clearCompletedItems());
        }

        // Sound Mute Toggle
        const btnMute = document.getElementById('btn-toggle-sound');
        if (btnMute) {
            this.updateSoundButtonUI();
            btnMute.addEventListener('click', () => {
                const isMuted = window.soundManager.toggleMute();
                this.updateSoundButtonUI();
                this.showToast(isMuted ? 'Sesler Kapatıldı' : 'Sesler Açıldı');
            });
        }

        // Phone Push Notifications Toggle & Test
        const btnTogglePush = document.getElementById('btn-toggle-push');
        if (btnTogglePush) {
            btnTogglePush.addEventListener('click', () => this.togglePushNotifications());
        }

        const btnQuickPush = document.getElementById('btn-quick-push-toggle');
        if (btnQuickPush) {
            btnQuickPush.addEventListener('click', () => this.togglePushNotifications());
        }

        const btnTestPush = document.getElementById('btn-test-push');
        if (btnTestPush) {
            btnTestPush.addEventListener('click', () => this.sendTestPushNotification());
        }


        // Quick Pills Controls
        const btnAddPill = document.getElementById('btn-open-add-pill');
        if (btnAddPill) {
            btnAddPill.addEventListener('click', () => this.openAddQuickPillModal());
        }

        const btnEditPills = document.getElementById('btn-toggle-edit-pills');
        if (btnEditPills) {
            btnEditPills.addEventListener('click', () => this.togglePillsEditMode());
        }

        const formAddPill = document.getElementById('add-quick-pill-form');
        if (formAddPill) {
            formAddPill.addEventListener('submit', (e) => this.handleAddQuickPill(e));
        }

        const emojiGrid = document.getElementById('pill-emoji-grid');
        if (emojiGrid) {
            emojiGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.emoji-opt-btn');
                if (btn && btn.dataset.emoji) {
                    this.selectedPillEmoji = btn.dataset.emoji;
                    this.updateEmojiPickerUI();
                }
            });
        }

        // Close buttons
        
        // Edit Item Form
        const editForm = document.getElementById('edit-item-form');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEditItem();
            });
        }

        // Photo Controls inside Edit Item Modal
        const btnEditPhoto = document.getElementById('btn-edit-change-photo');
        const editPhotoInput = document.getElementById('edit-photo-file-input');
        const btnRemoveEditPhoto = document.getElementById('btn-edit-remove-photo');

        if (btnEditPhoto && editPhotoInput) {
            btnEditPhoto.addEventListener('click', () => editPhotoInput.click());
            editPhotoInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                    const compressed = await this.compressImage(file);
                    this.editingItemPhoto = compressed;
                    this.updateEditPhotoUI();
                } catch (err) {
                    console.error('Fotoğraf işleme hatası:', err);
                }
                editPhotoInput.value = '';
            });
        }

        if (btnRemoveEditPhoto) {
            btnRemoveEditPhoto.addEventListener('click', () => {
                this.editingItemPhoto = '';
                this.updateEditPhotoUI();
            });
        }

        // App Icon Customization triggers
        const brandHeader = document.getElementById('app-brand-icon');
        if (brandHeader) {
            brandHeader.addEventListener('click', () => this.openAppIconModal());
        }

        const loginBrand = document.getElementById('login-brand-icon');
        if (loginBrand) {
            loginBrand.addEventListener('click', () => this.openAppIconModal());
        }

        const btnIconSettings = document.getElementById('btn-open-icon-from-settings');
        if (btnIconSettings) {
            btnIconSettings.addEventListener('click', () => {
                this.closeAllModals();
                this.openAppIconModal();
            });
        }

        // Preset Icon Grid
        document.querySelectorAll('#app-preset-icons-grid .emoji-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#app-preset-icons-grid .emoji-opt-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.tempIconValue = btn.dataset.icon;
                this.tempIconIsImage = false;
                const customInput = document.getElementById('custom-icon-text-input');
                if (customInput) customInput.value = '';
                this.updateIconModalPreview();
            });
        });

        // Custom Icon / Emoji Text Input
        const customIconInput = document.getElementById('custom-icon-text-input');
        if (customIconInput) {
            customIconInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val) {
                    document.querySelectorAll('#app-preset-icons-grid .emoji-opt-btn').forEach(b => b.classList.remove('active'));
                    this.tempIconValue = val;
                    this.tempIconIsImage = false;
                    this.updateIconModalPreview();
                }
            });
        }

        // Custom Logo File Upload
        const btnUploadLogo = document.getElementById('btn-upload-custom-logo');
        const logoFileInput = document.getElementById('custom-logo-file-input');
        const btnClearLogo = document.getElementById('btn-clear-custom-logo');

        if (btnUploadLogo && logoFileInput) {
            btnUploadLogo.addEventListener('click', () => logoFileInput.click());
            logoFileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                    const compressed = await this.compressImage(file, 256, 0.85);
                    this.tempIconValue = compressed;
                    this.tempIconIsImage = true;
                    this.updateIconModalPreview();
                } catch (err) {
                    console.error('Logo yükleme hatası:', err);
                }
                logoFileInput.value = '';
            });
        }

        if (btnClearLogo) {
            btnClearLogo.addEventListener('click', () => {
                this.tempIconValue = '⚡';
                this.tempIconIsImage = false;
                this.updateIconModalPreview();
            });
        }

        // Save App Icon
        const btnSaveIcon = document.getElementById('btn-save-app-icon');
        if (btnSaveIcon) {
            btnSaveIcon.addEventListener('click', () => this.saveAppIcon());
        }

        document.querySelectorAll('.btn-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Backdrop click & Escape key to close modals cleanly
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeAllModals();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.querySelector('.modal-overlay.active')) {
                this.closeAllModals();
            }
        });
    }

    setFilter(filterKey) {
        this.filterStatus = filterKey || 'all';
        if (this.filterStatus === 'trash' && this.isBulkMode && typeof this.toggleBulkMode === 'function') {
            this.toggleBulkMode(false);
        }
        document.querySelectorAll('.chip-filter').forEach(c => {
            c.classList.toggle('active', c.dataset.filter === this.filterStatus);
        });
        const filterDropdown = document.getElementById('filter-status');
        if (filterDropdown) {
            filterDropdown.value = ['all', 'pending', 'ordered', 'completed', 'trash'].includes(this.filterStatus)
                ? this.filterStatus
                : 'all';
        }
        if (typeof this.syncAllCustomSelects === 'function') {
            this.syncAllCustomSelects();
        }
        this.render();
    }

    // Smart Duplicate Check & Item Submission
    checkAndAddItem() {
        const nameInput = document.getElementById('input-name');
        const qtyInput = document.getElementById('input-quantity');
        const supInput = document.getElementById('input-supplier');
        const urgInput = document.getElementById('input-urgency');
        const notesInput = document.getElementById('input-notes');

        const name = nameInput.value.trim();
        if (!name) {
            nameInput.focus();
            return;
        }

        this.closeAutocomplete();

        const authorName = (this.deviceName && this.deviceName.trim()) || this.currentUser || 'Admin';

        const candidateItem = {
            name: name,
            quantity: qtyInput.value.trim() || '1 adet',
            category: 'Genel',
            supplier: supInput ? supInput.value : 'Belirtilmedi',
            urgency: urgInput ? urgInput.value : 'normal',
            notes: notesInput ? notesInput.value.trim() : '',
            addedBy: authorName,
            image: this.selectedAddPhoto || '',
            source: window.innerWidth < 768 ? 'phone' : 'pc'
        };

        // Smart Duplicate Check
        const duplicateMatch = window.DuplicateDetector.findSimilarItem(candidateItem.name, this.items);

        if (duplicateMatch) {
            this.pendingDuplicateItem = {
                candidate: candidateItem,
                existing: duplicateMatch.item
            };

            const modalNew = document.getElementById('dup-new-name');
            const modalExist = document.getElementById('dup-existing-name');
            const modalQty = document.getElementById('dup-existing-qty');
            const modalStatus = document.getElementById('dup-existing-status');

            if (modalNew) modalNew.textContent = `"${candidateItem.name}" (${candidateItem.quantity})`;
            if (modalExist) modalExist.textContent = duplicateMatch.item.name;
            if (modalQty) modalQty.textContent = duplicateMatch.item.quantity;
            if (modalStatus) {
                const statusMap = { 
                    pending: 'Bekliyor', 
                    ordered: 'Sipariş Edildi', 
                    completed: 'Alındı',
                    deleted: '🗑️ Silinenler (Çöp Kutusu)'
                };
                modalStatus.textContent = statusMap[duplicateMatch.item.status] || duplicateMatch.item.status;
            }

            const btnUpdateQty = document.getElementById('btn-dup-update-qty');
            if (btnUpdateQty) {
                if (duplicateMatch.item.status === 'deleted') {
                    btnUpdateQty.innerHTML = `${UI_ICONS.undo} <span>Silinenlerden Geri Yükle ve Listeye Ekle</span>`;
                } else {
                    btnUpdateQty.innerHTML = `${UI_ICONS.plus} <span>Mevcut Ürünün Miktarını Güncelle / Artır</span>`;
                }
            }

            window.soundManager.playUrgent();
            this.openModal('duplicate-modal');
            return;
        }

        this.saveNewItem(candidateItem);
        this.resetAddForm();
    }

    async resolveDuplicateUpdateQty() {
        if (!this.pendingDuplicateItem) return;
        const { candidate, existing } = this.pendingDuplicateItem;

        const isDeleted = existing.status === 'deleted';
        const updatedQty = isDeleted ? (candidate.quantity || existing.quantity) : `${existing.quantity} + ${candidate.quantity}`;

        this.closeAllModals();
        this.pendingDuplicateItem = null;
        this.resetAddForm();

        const updates = {
            quantity: updatedQty,
            status: 'pending', // Re-activate back to list
            notes: (existing.notes ? existing.notes + ' | ' : '') + `Eklenen: ${candidate.quantity}` + (candidate.notes ? ` (${candidate.notes})` : '')
        };

        // If candidate had a photo and existing didn't, attach it!
        if (candidate.image && !existing.image) {
            updates.image = candidate.image;
        }

        await this.updateItemDetails(existing.id, updates);
        this.showToast(isDeleted ? `↩️ Silinenlerden Geri Yüklendi: ${existing.name}` : `Miktar Güncellendi: ${existing.name} -> ${updatedQty}`);
        window.soundManager.playCompleted();

        const card = document.getElementById(`card-${existing.id}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('card-flash-highlight');
            setTimeout(() => { card.classList.remove('card-flash-highlight'); }, 1500);
        }
    }

    async resolveDuplicateForceAdd() {
        if (!this.pendingDuplicateItem) return;
        const { candidate } = this.pendingDuplicateItem;

        this.closeAllModals();
        this.pendingDuplicateItem = null;
        this.resetAddForm();

        await this.saveNewItem(candidate);
    }

    resetAddForm() {
        const nameInput = document.getElementById('input-name');
        const qtyInput = document.getElementById('input-quantity');
        const notesInput = document.getElementById('input-notes');
        if (nameInput) {
            nameInput.value = '';
            nameInput.focus();
        }
        if (qtyInput) qtyInput.value = '1 kutu';
        if (notesInput) notesInput.value = '';
        this.closeAutocomplete();
        this.syncActiveUnitChip();
        if (typeof this.syncAllCustomSelects === 'function') {
            this.syncAllCustomSelects();
        }

        // Clear photo
        this.selectedAddPhoto = '';
        const previewContainer = document.getElementById('add-photo-preview-container');
        const triggerBtn = document.getElementById('btn-trigger-photo');
        if (previewContainer) previewContainer.style.display = 'none';
        if (triggerBtn) {
            triggerBtn.classList.remove('btn-primary');
            triggerBtn.classList.add('btn-secondary');
        }
    }

    async saveNewItem(itemData) {
        if (!navigator.onLine) {
            this.queueOfflineItem(itemData);
            return;
        }
        try {
            const res = await this.apiFetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });

            if (res.status === 401) return;
            if (res.status === 503) {
                // Service worker: sunucuya ulaşılamadı
                this.queueOfflineItem(itemData);
                return;
            }
            if (!res.ok) {
                throw new Error('Kayıt hatası');
            }
        } catch (e) {
            if (e instanceof TypeError) {
                // Ağ hatası (internet koptu): kaybetme, sırada beklet
                this.queueOfflineItem(itemData);
                return;
            }
            console.error('Ekleme hatası:', e);
            this.showToast('Ürün eklenemedi.');
        }
    }

    async updateStatus(id, newStatus) {
        await this.updateItemDetails(id, { status: newStatus });
        if (newStatus === 'completed') {
            window.soundManager.playCompleted();
        }
    }

    async updateItemDetails(id, updates) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            Object.assign(item, updates, { updatedAt: new Date().toISOString() });
            this.saveItemsCache();
            this.render();
        }

        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'updateItem', id, data: updates });
            this.showToast('📴 İnternet yok — güncelleme sıraya alındı');
            return;
        }

        try {
            const res = await this.apiFetch(`/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'updateItem', id, data: updates });
                this.showToast('📴 Sunucuya ulaşılamadı — güncelleme sıraya alındı');
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'updateItem', id, data: updates });
                this.showToast('📴 Bağlantı kesildi — güncelleme sıraya alındı');
                return;
            }
            console.error('Güncelleme hatası:', e);
        }
    }

    openConfirmModal({ icon = '⚠️', title = 'Onay Gerekiyor', desc = 'Bu işlemi yapmak istediğinize emin misiniz?', onConfirm }) {
        const modal = document.getElementById('confirm-dialog-modal');
        const iconEl = document.getElementById('confirm-modal-icon');
        const titleEl = document.getElementById('confirm-modal-title');
        const descEl = document.getElementById('confirm-modal-desc');
        const btnOk = document.getElementById('confirm-modal-btn-ok');
        const btnCancel = document.getElementById('confirm-modal-btn-cancel');

        if (!modal || !btnOk) {
            if (window.confirm(desc)) {
                if (typeof onConfirm === 'function') onConfirm();
            }
            return;
        }

        if (iconEl) iconEl.textContent = icon;
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;

        const cleanup = () => {
            this.closeAllModals();
            if (btnOk) btnOk.onclick = null;
            if (btnCancel) btnCancel.onclick = null;
        };

        if (btnCancel) btnCancel.onclick = () => cleanup();
        if (btnOk) {
            btnOk.onclick = () => {
                cleanup();
                if (typeof onConfirm === 'function') onConfirm();
            };
        }

        this.openModal('confirm-dialog-modal');
    }

    // Direct 1-Click Delete (Moves item to Silinenler with floating Undo Toast)
    deleteItem(id, event) {
        if (event) {
            try {
                event.stopPropagation();
                event.preventDefault();
            } catch (e) {}
        }
        return this.executeSoftDelete(id);
    }

    // Alias for compatibility
    requestDeleteItem(id, event) {
        return this.deleteItem(id, event);
    }

    // Delete item directly from the Edit Modal
    deleteEditingItem() {
        if (!this.editingItemId) return;
        const id = this.editingItemId;
        this.closeAllModals();
        this.executeSoftDelete(id);
    }

    // Soft Delete (Item moves to Çöp Kutusu, NEVER lost)
    async executeSoftDelete(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        const oldStatus = item.status || 'pending';
        const oldUpdatedAt = item.updatedAt;
        const deletedBy = (this.deviceName && this.deviceName.trim()) || this.currentUser || 'Admin';
        item.status = 'deleted';
        item.updatedAt = new Date().toISOString();

        if (window.soundManager && window.soundManager.playDelete) {
            window.soundManager.playDelete();
        }
        this.saveItemsCache();
        this.render();

        // Show floating Undo toast for 6.5s
        this.showUndoToast(item, oldStatus);

        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'softDelete', id, deletedBy });
            return;
        }

        try {
            const res = await this.trackItemRequest(this.apiFetch(`/api/items/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deletedBy }),
                keepalive: true
            }));
            if (res.status === 401) return;
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'softDelete', id, deletedBy });
                return;
            }
            if (!res.ok) {
                throw new Error(`Soft delete failed (${res.status})`);
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'softDelete', id, deletedBy });
                return;
            }
            console.error('Silme hatası:', e);
            item.status = oldStatus;
            item.updatedAt = oldUpdatedAt;
            document.querySelectorAll('.toast-undo-container').forEach(t => t.remove());
            this.saveItemsCache();
            this.render();
            this.showToast('❌ Ürün silinemedi, lütfen tekrar deneyin.');
        }
    }

    // Floating Undo Toast (1-click restore)
    showUndoToast(item, previousStatus = 'pending') {
        document.querySelectorAll('.toast-undo-container').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'toast-undo-container';
        toast.innerHTML = `
            <span><strong>${this.escapeHtml(item.name)}</strong> silindi.</span>
            <button type="button" class="toast-undo-btn" id="btn-undo-delete">${UI_ICONS.undo} <span>Geri Al</span></button>
        `;

        document.body.appendChild(toast);

        const undoBtn = toast.querySelector('#btn-undo-delete');
        if (undoBtn) {
            undoBtn.onclick = (e) => {
                e.stopPropagation();
                toast.remove();
                this.restoreItem(item.id, previousStatus);
            };
        }

        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.35s ease';
                setTimeout(() => toast.remove(), 350);
            }
        }, 6500);
    }

    // Restore item from Çöp Kutusu back to active
    async restoreItem(id, targetStatus = 'pending') {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        const oldStatus = item.status;
        const oldUpdatedAt = item.updatedAt;
        const resolvedStatus = targetStatus || 'pending';

        item.status = resolvedStatus;
        item.updatedAt = new Date().toISOString();

        if (window.soundManager && window.soundManager.playCompleted) {
            window.soundManager.playCompleted();
        }
        this.saveItemsCache();
        this.render();
        this.showToast(`↩️ Geri Yüklendi: ${item.name}`);

        await this.waitForPendingItemRequests();

        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'restore', id, status: resolvedStatus });
            return;
        }

        try {
            const res = await this.trackItemRequest(this.apiFetch(`/api/items/${encodeURIComponent(id)}/restore`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: resolvedStatus }),
                keepalive: true
            }));
            if (res.status === 401) return;
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'restore', id, status: resolvedStatus });
                return;
            }
            if (!res.ok) {
                throw new Error(`Restore failed (${res.status})`);
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'restore', id, status: resolvedStatus });
                return;
            }
            console.error('Geri yükleme hatası:', e);
            item.status = oldStatus;
            item.updatedAt = oldUpdatedAt;
            this.saveItemsCache();
            this.render();
            this.showToast('❌ Ürün geri yüklenemedi, lütfen tekrar deneyin.');
        }
    }

    // Restore All Deleted Items in 1 click
    async restoreAllDeleted() {
        const deletedItems = this.items.filter(i => i.status === 'deleted');
        if (deletedItems.length === 0) {
            this.showToast('Çöp kutusunda geri yüklenecek ürün yok.');
            return;
        }

        const snapshots = deletedItems.map(i => ({ id: i.id, status: i.status, updatedAt: i.updatedAt }));
        const now = new Date().toISOString();
        deletedItems.forEach(i => {
            i.status = 'pending';
            i.updatedAt = now;
        });

        if (window.soundManager && window.soundManager.playCompleted) {
            window.soundManager.playCompleted();
        }
        this.saveItemsCache();
        this.render();

        await this.waitForPendingItemRequests();

        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'restoreAll' });
            this.showToast(`📴 İnternet yok — ${deletedItems.length} ürünü geri yükleme sıraya alındı`);
            return;
        }

        try {
            const res = await this.trackItemRequest(this.apiFetch('/api/items/restore-all', {
                method: 'POST',
                keepalive: true
            }));
            if (res.status === 401) return;
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'restoreAll' });
                this.showToast(`📴 Sunucuya ulaşılamadı — ${deletedItems.length} ürünü geri yükleme sıraya alındı`);
                return;
            }
            if (!res.ok) {
                throw new Error(`Restore all failed (${res.status})`);
            }
            this.showToast(`✅ ${deletedItems.length} ürün listeye geri yüklendi!`);
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'restoreAll' });
                this.showToast(`📴 Bağlantı kesildi — ${deletedItems.length} ürünü geri yükleme sıraya alındı`);
                return;
            }
            console.error('Toplu geri yükleme hatası:', e);
            const snapMap = new Map(snapshots.map(s => [s.id, s]));
            this.items.forEach(i => {
                const snap = snapMap.get(i.id);
                if (snap) {
                    i.status = snap.status;
                    i.updatedAt = snap.updatedAt;
                }
            });
            this.saveItemsCache();
            this.render();
            this.showToast('❌ Ürünler geri yüklenemedi, lütfen tekrar deneyin.');
        }
    }

    // Empty Trash (permanently deletes ONLY soft-deleted items)
    emptyTrash() {
        const trashCount = this.items.filter(i => i.status === 'deleted').length;
        if (trashCount === 0) {
            this.showToast('Çöp kutusu zaten boş.');
            return;
        }

        this.openConfirmModal({
            icon: '🧹',
            title: 'Çöp Kutusunu Boşalt',
            desc: `Çöp kutusundaki ${trashCount} adet ürün kalıcı olarak silinecek. Bu işlem geri alınamaz! Kalıcı olarak silinsin mi?`,
            onConfirm: async () => {
                const trashedSnapshot = this.items.filter(i => i.status === 'deleted').map(i => ({ ...i }));
                this.items = this.items.filter(i => i.status !== 'deleted');
                this.saveItemsCache();
                this.render();

                await this.waitForPendingItemRequests();

                if (!navigator.onLine) {
                    this.enqueueOfflineMutation({ type: 'emptyTrash' });
                    this.showToast('📴 İnternet yok — çöp kutusu temizleme sıraya alındı');
                    return;
                }

                try {
                    const res = await this.trackItemRequest(this.apiFetch('/api/items/trash/empty', {
                        method: 'DELETE',
                        keepalive: true
                    }));
                    if (res.status === 401) return;
                    if (res.status === 503) {
                        this.enqueueOfflineMutation({ type: 'emptyTrash' });
                        this.showToast('📴 Sunucuya ulaşılamadı — çöp kutusu temizleme sıraya alındı');
                        return;
                    }
                    if (!res.ok) {
                        throw new Error(`Empty trash failed (${res.status})`);
                    }
                    this.showToast('Çöp kutusu tamamen boşaltıldı.');
                } catch (e) {
                    if (e instanceof TypeError) {
                        this.enqueueOfflineMutation({ type: 'emptyTrash' });
                        this.showToast('📴 Bağlantı kesildi — çöp kutusu temizleme sıraya alındı');
                        return;
                    }
                    console.error('Çöp boşaltma hatası:', e);
                    const existingIds = new Set(this.items.map(i => i.id));
                    trashedSnapshot.forEach(s => {
                        if (!existingIds.has(s.id)) this.items.push(s);
                    });
                    this.saveItemsCache();
                    this.render();
                    this.showToast('❌ Çöp kutusu temizlenemedi, lütfen tekrar deneyin.');
                }
            }
        });
    }

    // Permanently Delete single item (only when in trash)
    permanentDeleteItem(id) {
        const item = this.items.find(i => i.id === id);
        const name = item ? item.name : 'Ürün';

        this.openConfirmModal({
            icon: '❌',
            title: 'Kalıcı Olarak Sil',
            desc: `"${name}" ürünü veritabanından kalıcı olarak silinecektir. Emin misiniz?`,
            onConfirm: async () => {
                const removedIndex = this.items.findIndex(i => i.id === id);
                const removedItem = removedIndex !== -1 ? { ...this.items[removedIndex] } : (item ? { ...item } : null);
                this.items = this.items.filter(i => i.id !== id);
                if (this.selectedIds) this.selectedIds.delete(id);
                this.saveItemsCache();
                if (window.soundManager && window.soundManager.playDelete) {
                    window.soundManager.playDelete();
                }
                this.render();

                await this.waitForPendingItemRequests();

                if (!navigator.onLine) {
                    this.enqueueOfflineMutation({ type: 'permanentDelete', id });
                    this.showToast(`📴 İnternet yok — kalıcı silme sıraya alındı: ${name}`);
                    return;
                }

                try {
                    const res = await this.trackItemRequest(this.apiFetch(`/api/items/${encodeURIComponent(id)}?permanent=true`, {
                        method: 'DELETE',
                        keepalive: true
                    }));
                    if (res.status === 401) return;
                    if (res.status === 503) {
                        this.enqueueOfflineMutation({ type: 'permanentDelete', id });
                        this.showToast(`📴 Sunucuya ulaşılamadı — kalıcı silme sıraya alındı: ${name}`);
                        return;
                    }
                    if (!res.ok) {
                        throw new Error(`Permanent delete failed (${res.status})`);
                    }
                    this.showToast(`Kalıcı olarak silindi: ${name}`);
                } catch (e) {
                    if (e instanceof TypeError) {
                        this.enqueueOfflineMutation({ type: 'permanentDelete', id });
                        this.showToast(`📴 Bağlantı kesildi — kalıcı silme sıraya alındı: ${name}`);
                        return;
                    }
                    console.error('Kalıcı silme hatası:', e);
                    if (removedItem && !this.items.some(i => i.id === id)) {
                        const insertAt = removedIndex >= 0 && removedIndex <= this.items.length ? removedIndex : 0;
                        this.items.splice(insertAt, 0, removedItem);
                    }
                    this.saveItemsCache();
                    this.render();
                    this.showToast('❌ Kalıcı silme başarısız oldu, lütfen tekrar deneyin.');
                }
            }
        });
    }

    // Full Security Backup (Downloads JSON file containing all items)
    exportBackupJson() {
        const data = {
            exportDate: new Date().toISOString(),
            app: 'App - Dükkan Eksik Takip',
            totalItems: this.items.length,
            activeItems: this.items.filter(i => i.status !== 'deleted').length,
            deletedItems: this.items.filter(i => i.status === 'deleted').length,
            suppliers: this.suppliers,
            items: this.items
        };

        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `eksik-app-yedek-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast(`💾 ${this.items.length} ürünün tam güvenlik yedeği indirildi!`);
    }

    // Handle Backup File Select (Parse and preview before importing)
    handleBackupFileSelect(file) {
        if (!file.name.endsWith('.json')) {
            this.showToast('Lütfen geçerli bir .json yedek dosyası seçin.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = JSON.parse(e.target.result);
                let items = [];
                let suppliers = [];

                if (Array.isArray(content)) {
                    items = content;
                } else if (content && typeof content === 'object') {
                    items = content.items || [];
                    suppliers = content.suppliers || [];
                }

                if (!Array.isArray(items) || items.length === 0) {
                    this.showToast('Yedek dosyasında içe aktarılacak ürün bulunamadı.');
                    return;
                }

                this.pendingImportData = {
                    fileName: file.name,
                    items,
                    suppliers
                };

                const nameEl = document.getElementById('import-file-name');
                const summaryEl = document.getElementById('import-summary-text');
                if (nameEl) nameEl.textContent = `📁 ${file.name}`;
                if (summaryEl) {
                    summaryEl.textContent = `${items.length} adet ürün ve ${suppliers.length} toptancı tespit edildi.`;
                }

                this.openModal('import-backup-modal');
            } catch (err) {
                console.error('Yedek okuma hatası:', err);
                this.showToast('Yedek dosyası okunamadı veya JSON formatı bozuk.');
            }
        };
        reader.readAsText(file);
    }

    // Execute Backup Import to Turso / SQLite
    async executeBackupImport() {
        if (!this.pendingImportData) return;

        const modeRadio = document.querySelector('input[name="import-mode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'merge';

        const payload = {
            items: this.pendingImportData.items,
            suppliers: this.pendingImportData.suppliers,
            mode: mode
        };

        const btnConfirm = document.getElementById('btn-confirm-import-backup');
        if (btnConfirm) {
            btnConfirm.disabled = true;
            btnConfirm.innerHTML = `${UI_ICONS.refresh}<span>Yükleniyor...</span>`;
        }

        try {
            const res = await this.apiFetch('/api/backup/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                this.closeAllModals();
                this.showToast(`${data.importedItemsCount} ürün başarıyla içe aktarıldı!`);
                if (window.soundManager && window.soundManager.playCompleted) {
                    window.soundManager.playCompleted();
                }
                await this.loadInitialData();
                await this.loadSuppliers();
            } else {
                this.showToast(data.error || 'İçe aktarma başarısız oldu.');
            }
        } catch (err) {
            console.error('Import error:', err);
            this.showToast('Sunucuya bağlanırken hata oluştu.');
        } finally {
            if (btnConfirm) {
                btnConfirm.disabled = false;
                btnConfirm.innerHTML = `${UI_ICONS.download}<span>Yedeği Şimdi Yükle</span>`;
            }
            this.pendingImportData = null;
        }
    }

    // Update last backup display badge in Admin modal
    updateLastBackupDisplay(backup) {
        const badge = document.getElementById('admin-last-backup-badge');
        if (!badge) return;
        if (!backup) {
            badge.textContent = 'Henüz yedek yok';
            return;
        }

        const dateStr = backup.dateFormatted || (backup.createdAt ? new Date(backup.createdAt).toLocaleString('tr-TR') : 'Bilinmiyor');
        const reason = backup.reasonLabel || backup.reason || 'Otomatik';
        badge.textContent = `${dateStr} (${reason} - ${backup.totalItems || 0} ürün)`;
    }

    async fetchAndDisplayLastBackup() {
        try {
            const res = await this.apiFetch('/api/backups');
            if (res.ok) {
                const data = await res.json();
                if (data.lastBackup) {
                    this.updateLastBackupDisplay(data.lastBackup);
                } else if (data.backups && data.backups.length > 0) {
                    this.updateLastBackupDisplay(data.backups[0]);
                }
            }
        } catch (e) {}
    }

    // Trigger instant server-side snapshot
    async triggerInstantBackup() {
        const btn1 = document.getElementById('btn-trigger-instant-backup');
        const btn2 = document.getElementById('btn-modal-instant-backup');

        const setButtons = (loading) => {
            if (btn1) {
                btn1.disabled = loading;
                const strong = btn1.querySelector('.tool-text strong');
                if (strong) strong.textContent = loading ? 'Yedekleniyor...' : 'Şimdi Yedek Al';
            }
            if (btn2) {
                btn2.disabled = loading;
                btn2.innerHTML = loading
                    ? `${UI_ICONS.refresh} <span>Yedekleniyor...</span>`
                    : `${UI_ICONS.save} <span>Şimdi Yeni Yedek Al</span>`;
            }
        };

        setButtons(true);
        try {
            const res = await this.apiFetch('/api/backups/create', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                this.showToast(`${data.backup ? data.backup.totalItems : this.items.length} ürünün anlık yedeği sunucuya başarıyla kaydedildi!`);
                if (data.backup) {
                    this.updateLastBackupDisplay(data.backup);
                }
                const modal = document.getElementById('server-backups-modal');
                if (modal && modal.classList.contains('active')) {
                    this.renderServerBackups();
                }
            } else {
                this.showToast('Yedek alınamadı.');
            }
        } catch (e) {
            console.error('Manual backup error:', e);
            this.showToast('Sunucu bağlantı hatası.');
        } finally {
            setButtons(false);
        }
    }

    openServerBackupsModal() {
        this.openModal('server-backups-modal');
        this.renderServerBackups();
    }

    async renderServerBackups() {
        const container = document.getElementById('server-backups-list');
        if (!container) return;

        container.innerHTML = `<div class="backups-empty-state">Yedekler sunucudan çekiliyor...</div>`;

        try {
            const res = await this.apiFetch('/api/backups');
            if (!res.ok) {
                container.innerHTML = `<div class="backups-empty-state" style="color: var(--status-critical);">Yedekler yüklenemedi.</div>`;
                return;
            }

            const data = await res.json();
            const backups = data.backups || [];

            if (data.lastBackup) {
                this.updateLastBackupDisplay(data.lastBackup);
            }

            if (backups.length === 0) {
                container.innerHTML = `
                    <div class="backups-empty-state">
                        <div style="margin-bottom: 0.5rem; color: var(--accent-cyan);">${UI_ICONS.shield}</div>
                        <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">Henüz Yedek Kaydı Yok</div>
                        <div>"Şimdi Yeni Yedek Al" butonuna basarak ilk güvenli yedeğinizi hemen alabilirsiniz.</div>
                    </div>
                `;
                return;
            }

            let html = '';
            backups.forEach((b, idx) => {
                const isLatest = idx === 0;
                const formattedSize = b.size > 1024 ? `${(b.size / 1024).toFixed(1)} KB` : `${b.size} B`;
                const dateDisplay = b.dateFormatted || (b.createdAt ? new Date(b.createdAt).toLocaleString('tr-TR') : b.filename);
                const reasonBadge = b.reasonLabel || b.reason;

                html += `
                    <div class="backup-item-card ${isLatest ? 'is-latest' : ''}">
                        <div class="backup-item-top">
                            <div>
                                <div class="backup-item-title-row">
                                    <strong class="backup-item-date">${this.escapeHtml(dateDisplay)}</strong>
                                    ${isLatest ? '<span class="backup-badge-latest">EN SON YEDEK</span>' : ''}
                                    <span class="backup-badge-reason">${this.escapeHtml(reasonBadge)}</span>
                                </div>
                                <div class="backup-meta-row">
                                    <span>${UI_ICONS.package} <strong>${b.totalItems}</strong> Ürün</span>
                                    <span>${UI_ICONS.building} <strong>${b.suppliersCount || 0}</strong> Toptancı</span>
                                    <span>${formattedSize}</span>
                                </div>
                            </div>

                            <div class="backup-item-actions">
                                <button type="button" class="btn btn-secondary btn-xs" title="JSON Dosyasını Bilgisayara İndir" onclick="window.app.downloadServerBackup('${this.escapeHtml(b.filename)}')">
                                    ${UI_ICONS.download} <span>İndir</span>
                                </button>
                                <button type="button" class="btn btn-primary btn-xs" title="Dükkan Verilerini Bu Tarihe Geri Döndür" onclick="window.app.confirmRestoreServerBackup('${this.escapeHtml(b.filename)}', '${this.escapeHtml(dateDisplay)}', ${b.totalItems})">
                                    ${UI_ICONS.refresh} <span>Geri Yükle</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        } catch (e) {
            console.error('Render backups error:', e);
            container.innerHTML = `<div class="backups-empty-state" style="color: var(--status-critical);">Yedekler listelenirken hata oluştu.</div>`;
        }
    }

    confirmRestoreServerBackup(filename, dateDisplay, totalItems) {
        this.openConfirmModal({
            icon: '🔄',
            title: 'Yedekten Geri Yükle',
            desc: `⚠️ DİKKAT: Dükkan verileriniz "${dateDisplay}" tarihindeki yedek durumuna döndürülecektir (${totalItems} adet ürün).\n\nMevcut listenizin güvenlik yedeği otomatik olarak alınacaktır. Geri yüklemeyi onaylıyor musunuz?`,
            onConfirm: () => {
                this.executeRestoreServerBackup(filename);
            }
        });
    }

    async downloadServerBackup(filename) {
        try {
            const res = await this.apiFetch(`/api/backups/download/${encodeURIComponent(filename)}`);
            if (!res.ok) {
                this.showToast('Yedek dosyası indirilemedi.');
                return;
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (e) {
            console.error('Yedek indirme hatası:', e);
            this.showToast('Yedek indirilemedi.');
        }
    }

    async executeRestoreServerBackup(filename) {
        this.showToast('⏳ Yedek geri yükleniyor...');
        try {
            const res = await this.apiFetch(`/api/backups/${encodeURIComponent(filename)}/restore`, {
                method: 'POST'
            });

            const data = await res.json();
            if (res.ok && data.success) {
                this.closeAllModals();
                this.showToast(`✅ ${data.totalItems} ürün başarıyla geri yüklendi!`);
                if (window.soundManager && window.soundManager.playCompleted) {
                    window.soundManager.playCompleted();
                }
                await this.loadInitialData();
                await this.loadSuppliers();
            } else {
                this.showToast(data.error || 'Geri yükleme başarısız oldu.');
            }
        } catch (e) {
            console.error('Execute restore error:', e);
            this.showToast('Geri yükleme sırasında hata oluştu.');
        }
    }

    // Client-side emergency snapshot in LocalStorage
    saveOfflineBackup() {
        try {
            if (this.items && this.items.length > 0) {
                localStorage.setItem('eksik_offline_auto_backup', JSON.stringify({
                    date: new Date().toISOString(),
                    itemsCount: this.items.length,
                    items: this.items,
                    suppliers: this.suppliers
                }));
            }
        } catch (e) {}
    }

    async clearCompletedItems() {
        const completedItems = this.items.filter(i => i.status === 'completed');
        const completedCount = completedItems.length;
        if (completedCount === 0) {
            this.showToast('Temizlenecek tamamlanmış ürün bulunmuyor.');
            return;
        }

        const snapshots = completedItems.map(i => ({ id: i.id, status: i.status, updatedAt: i.updatedAt }));
        const now = new Date().toISOString();
        // Soft-delete completed items so they are safe in Çöp Kutusu!
        completedItems.forEach(i => {
            i.status = 'deleted';
            i.updatedAt = now;
        });
        this.saveItemsCache();
        this.render();

        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'clearCompleted' });
            this.showToast(`📴 İnternet yok — ${completedCount} tamamlanan ürünü taşıma sıraya alındı`);
            return;
        }

        try {
            const res = await this.trackItemRequest(this.apiFetch('/api/items/clear-completed', {
                method: 'POST',
                keepalive: true
            }));
            if (res.status === 401) return;
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'clearCompleted' });
                this.showToast(`📴 Sunucuya ulaşılamadı — ${completedCount} tamamlanan ürünü taşıma sıraya alındı`);
                return;
            }
            if (!res.ok) {
                throw new Error(`Clear completed failed (${res.status})`);
            }
            this.showToast(`${completedCount} tamamlanmış ürün çöp kutusuna taşındı (güvende).`);
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'clearCompleted' });
                this.showToast(`📴 Bağlantı kesildi — ${completedCount} tamamlanan ürünü taşıma sıraya alındı`);
                return;
            }
            console.error('Temizleme hatası:', e);
            const snapMap = new Map(snapshots.map(s => [s.id, s]));
            this.items.forEach(i => {
                const snap = snapMap.get(i.id);
                if (snap) {
                    i.status = snap.status;
                    i.updatedAt = snap.updatedAt;
                }
            });
            this.saveItemsCache();
            this.render();
            this.showToast('❌ Tamamlananlar temizlenemedi, lütfen tekrar deneyin.');
        }
    }

    // ==========================================
    // WEB PUSH NOTIFICATION CLIENT ENGINE
    // ==========================================
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    async initPushNotifications() {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.log('Push bildirimleri bu tarayıcıda doğrudan desteklenmiyor.');
            this.updatePushUI(false);
            return;
        }

        try {
            this.swRegistration = await navigator.serviceWorker.ready;
            const subscription = await this.swRegistration.pushManager.getSubscription();
            this.isPushSubscribed = !(subscription === null);
            this.updatePushUI(true);
        } catch (error) {
            console.error('Push bildirim servisi başlatma hatası:', error);
            this.updatePushUI(false);
        }
    }

    updatePushUI(supported = true) {
        const badge = document.getElementById('push-status-badge');
        const btnText = document.getElementById('push-btn-text');
        const btnIcon = document.getElementById('push-btn-icon');
        const quickBtn = document.getElementById('btn-quick-push-toggle');
        const quickIcon = document.getElementById('quick-push-icon');
        const quickLabel = document.getElementById('quick-push-label');
        const hint = document.getElementById('push-info-hint');

        if (!supported) {
            if (badge) {
                badge.textContent = 'Desteklenmiyor';
                badge.className = 'admin-status-pill is-muted';
            }
            if (btnText) btnText.textContent = 'Tarayıcı Desteklemiyor';
            if (btnIcon) btnIcon.innerHTML = UI_ICONS.bellOff;
            if (quickIcon) quickIcon.innerHTML = UI_ICONS.bellOff;
            if (quickLabel) quickLabel.textContent = 'Desteklenmiyor';
            if (quickBtn) quickBtn.classList.remove('is-active', 'is-denied');
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '<em>iPhone kullanıyorsanız Safari\'de "Paylaş &gt; Ana Ekrana Ekle" yaparak telefon bildirimlerini açabilirsiniz.</em>';
            }
            return;
        }

        if (Notification.permission === 'denied') {
            if (badge) {
                badge.textContent = 'Engellendi';
                badge.className = 'admin-status-pill is-danger';
            }
            if (btnText) btnText.textContent = 'Bildirim İzni Engellenmiş';
            if (btnIcon) btnIcon.innerHTML = UI_ICONS.bellOff;
            if (quickIcon) quickIcon.innerHTML = UI_ICONS.bellOff;
            if (quickLabel) quickLabel.textContent = 'Engellendi';
            if (quickBtn) {
                quickBtn.classList.remove('is-active');
                quickBtn.classList.add('is-denied');
            }
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '<em>Bildirim izni engellenmiş. Tarayıcı adres çubuğundaki kilit simgesine dokunup Bildirimlere İzin Verin.</em>';
            }
            return;
        }

        if (this.isPushSubscribed) {
            if (badge) {
                badge.textContent = 'Açık (Aktif)';
                badge.className = 'admin-status-pill is-active';
            }
            if (btnText) btnText.textContent = 'Bu Telefonda Bildirimleri Kapat';
            if (btnIcon) btnIcon.innerHTML = UI_ICONS.bellOff;
            if (quickIcon) quickIcon.innerHTML = UI_ICONS.bell;
            if (quickLabel) quickLabel.textContent = 'Bildirim Açık';
            if (quickBtn) {
                quickBtn.classList.remove('is-denied');
                quickBtn.classList.add('is-active');
            }
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '<em>Bu telefonda bildirimler aktif! Başka biri yeni ürün eklediğinde telefonunuza sesli/titreşimli bildirim gelecektir.</em>';
            }
        } else {
            if (badge) {
                badge.textContent = 'Kapalı';
                badge.className = 'admin-status-pill is-muted';
            }
            if (btnText) btnText.textContent = 'Bu Telefonda Bildirimleri Aç';
            if (btnIcon) btnIcon.innerHTML = UI_ICONS.bell;
            if (quickIcon) quickIcon.innerHTML = UI_ICONS.bellOff;
            if (quickLabel) quickLabel.textContent = 'Bildirim Aç';
            if (quickBtn) quickBtn.classList.remove('is-active', 'is-denied');
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '<em>Yeni ürünler eklendiğinde telefonunuzun çalması için "Bildirimleri Aç" butonuna dokunun.</em>';
            }
        }
    }

    async togglePushNotifications() {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            this.showToast('Bu tarayıcı Web Push bildirimlerini desteklemiyor (iOS için Ana Ekrana Ekleyin).');
            return;
        }

        const btn = document.getElementById('btn-toggle-push');
        if (btn) btn.disabled = true;

        try {
            if (this.isPushSubscribed) {
                // Unsubscribe
                const sub = await this.swRegistration.pushManager.getSubscription();
                if (sub) {
                    await this.apiFetch('/api/push/unsubscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ endpoint: sub.endpoint })
                    });
                    await sub.unsubscribe();
                }
                this.isPushSubscribed = false;
                this.updatePushUI(true);
                this.showToast('🔕 Bu telefonda bildirimler kapatıldı.');
            } else {
                // Request Permission
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    this.showToast('⚠️ Bildirim izni verilmedi.');
                    this.updatePushUI(true);
                    return;
                }

                // Get VAPID public key
                const keyRes = await this.apiFetch('/api/push/public-key');
                if (!keyRes.ok) {
                    throw new Error('Push sunucusu anahtarı alınamadı');
                }
                const { publicKey } = await keyRes.json();
                const applicationServerKey = this.urlBase64ToUint8Array(publicKey);

                // Subscribe via PushManager
                const sub = await this.swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                });

                // Send to backend
                const subRes = await this.apiFetch('/api/push/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        subscription: sub.toJSON(),
                        userAgent: navigator.userAgent
                    })
                });

                if (subRes.ok) {
                    this.isPushSubscribed = true;
                    this.updatePushUI(true);
                    this.showToast('🔔 Harika! Telefon bildirimleri açıldı.');
                    
                    // Trigger a test notification automatically
                    setTimeout(() => {
                        this.apiFetch('/api/push/test', { method: 'POST' }).catch(() => {});
                    }, 500);
                } else {
                    throw new Error('Abonelik sunucuya kaydedilemedi');
                }
            }
        } catch (err) {
            console.error('Toggle push error:', err);
            this.showToast('Bildirim ayarı değiştirilemedi: ' + err.message);
            this.updatePushUI(true);
        } finally {
            if (btn) btn.disabled = false;
        }
    }

    async sendTestPushNotification() {
        if (!this.isPushSubscribed) {
            this.showToast('Lütfen önce "Bildirimleri Aç" butonuna basarak bu telefonda bildirimleri aktif edin.');
            return;
        }

        const btn = document.getElementById('btn-test-push');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Gönderiliyor...';
        }

        try {
            const res = await this.apiFetch('/api/push/test', { method: 'POST' });
            if (res.ok) {
                this.showToast('Test bildirimi telefonunuza gönderildi! Üst bildirim çubuğunu kontrol edin.');
            } else {
                this.showToast('Test bildirimi gönderilemedi.');
            }
        } catch (e) {
            this.showToast('Sunucu bağlantı hatası.');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `${UI_ICONS.bell}<span>Test Bildirimi Gönder</span>`;
            }
        }
    }

    startVoiceInput() {
        const voiceModal = document.getElementById('voice-modal');
        const voiceText = document.getElementById('voice-transcript-text');
        const voiceActions = document.getElementById('voice-modal-actions');
        const btnRetry = document.getElementById('btn-voice-retry');
        const btnKeyboard = document.getElementById('btn-voice-keyboard');

        if (voiceActions) voiceActions.style.display = 'none';
        this.openModal('voice-modal');
        if (voiceText) voiceText.textContent = 'Dinleniyor... (Örn: "10 kutu 4x50 sunta vidası")';

        const micBtn = document.getElementById('btn-voice-input');
        if (micBtn) micBtn.classList.add('listening');

        // Bind Retry & Keyboard buttons
        if (btnRetry) {
            btnRetry.onclick = () => {
                this.startVoiceInput();
            };
        }
        if (btnKeyboard) {
            btnKeyboard.onclick = () => {
                this.closeAllModals();
                const nameInput = document.getElementById('input-name');
                if (nameInput) {
                    nameInput.focus();
                    this.showToast('💡 Klavyedeki 🎤 mikrofon tuşuna basarak sesle yazabilirsiniz.');
                }
            };
        }

        window.speechManager.start(
            (parsed, rawText) => {
                if (voiceText) voiceText.textContent = `Algılandı: "${rawText}"`;

                const nameInput = document.getElementById('input-name');
                const qtyInput = document.getElementById('input-quantity');
                const urgInput = document.getElementById('input-urgency');

                if (nameInput) nameInput.value = parsed.name;
                if (qtyInput && parsed.quantity) qtyInput.value = parsed.quantity;
                if (urgInput && parsed.urgency) urgInput.value = parsed.urgency;
                this.syncActiveUnitChip();
                if (typeof this.syncAllCustomSelects === 'function') {
                    this.syncAllCustomSelects();
                }

                setTimeout(() => {
                    this.closeAllModals();
                    if (micBtn) micBtn.classList.remove('listening');
                    this.checkAndAddItem();
                }, 900);
            },
            (errorMsg, rawCode) => {
                if (voiceText) voiceText.innerHTML = `<span class="voice-transcript-error">${this.escapeHtml(errorMsg)}</span>`;
                if (micBtn) micBtn.classList.remove('listening');
                if (voiceActions) voiceActions.style.display = 'flex';
            },
            (isListening) => {
                if (!isListening && micBtn) micBtn.classList.remove('listening');
            }
        );
    }

    openModal(modalId) {
        document.querySelectorAll('.modal-overlay').forEach(m => {
            if (m.id !== modalId && m.id !== 'confirm-dialog-modal') {
                m.classList.remove('active');
            }
        });
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    openAdminModal() {
        const nameInput = document.getElementById('input-app-name');
        if (nameInput) nameInput.value = this.appName || 'HKC';
        this.updateSoundButtonUI();
        this.updatePushUI(!!('serviceWorker' in navigator && 'PushManager' in window));
        this.fetchAndDisplayLastBackup();
        this.openModal('password-modal');
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        document.body.classList.remove('modal-open');
        window.speechManager.stop();
    }

    showToast(message) {
        document.querySelectorAll('.app-toast').forEach(t => t.remove());
        const toast = document.createElement('div');
        toast.className = 'app-toast';
        toast.innerHTML = `<span class="app-toast-dot"></span><span>${this.escapeHtml(message)}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            if (!document.body.contains(toast)) return;
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2600);
    }

    getFilteredItems() {
        const source = this.filterStatus === 'trash' ? this.items : [...this.getOfflineItems().reverse(), ...this.items];
        return source.filter(item => {
            // Trash view shows ONLY deleted items
            if (this.filterStatus === 'trash') {
                if (item.status !== 'deleted') return false;
            } else {
                // All other views NEVER show deleted items
                if (item.status === 'deleted') return false;

                if (this.filterStatus !== 'all') {
                    if (this.filterStatus === 'critical') {
                        if (item.urgency !== 'critical' || item.status === 'completed') return false;
                    } else if (this.filterStatus === 'urgent') {
                        if (item.urgency !== 'urgent' || item.status === 'completed') return false;
                    } else if (this.filterStatus === 'priority') {
                        if ((item.urgency !== 'critical' && item.urgency !== 'urgent') || item.status === 'completed') return false;
                    } else if (item.status !== this.filterStatus) {
                        return false;
                    }
                }
            }

            if (this.activeSupplier !== 'all' && item.supplier !== this.activeSupplier) {
                return false;
            }
            if (this.searchQuery) {
                const search = this.searchQuery;
                const matchName = item.name.toLowerCase().includes(search);
                const matchNotes = (item.notes || '').toLowerCase().includes(search);
                const matchSupplier = (item.supplier || '').toLowerCase().includes(search);
                if (!matchName && !matchNotes && !matchSupplier) {
                    return false;
                }
            }
            return true;
        });
    }

    renderStats() {
        const activeItems = this.items.filter(i => i.status !== 'deleted');
        const total = activeItems.length;
        const pending = activeItems.filter(i => i.status === 'pending').length;
        const urgent = activeItems.filter(i => (i.urgency === 'critical' || i.urgency === 'urgent') && i.status !== 'completed').length;
        const completed = activeItems.filter(i => i.status === 'completed').length;
        const ordered = activeItems.filter(i => i.status === 'ordered').length;
        const critical = activeItems.filter(i => i.urgency === 'critical' && i.status !== 'completed').length;
        const urgentOnly = activeItems.filter(i => i.urgency === 'urgent' && i.status !== 'completed').length;
        const trashCount = this.items.filter(i => i.status === 'deleted').length;

        const statTotal = document.getElementById('stat-total');
        const statPending = document.getElementById('stat-pending');
        const statUrgent = document.getElementById('stat-urgent');
        const statCompleted = document.getElementById('stat-completed');

        if (statTotal) statTotal.textContent = total;
        if (statPending) statPending.textContent = pending;
        if (statUrgent) statUrgent.textContent = urgent;
        if (statCompleted) statCompleted.textContent = completed;

        const subTotal = document.getElementById('stat-total-sub');
        const subPending = document.getElementById('stat-pending-sub');
        const subUrgent = document.getElementById('stat-urgent-sub');
        const subCompleted = document.getElementById('stat-completed-sub');

        if (subTotal) subTotal.textContent = `${ordered} siparişte · ${pending} bekliyor`;
        if (subPending) subPending.textContent = pending ? 'Tedarik bekliyor' : 'Bekleyen yok';
        if (subUrgent) subUrgent.textContent = `${critical} yok satan · ${urgentOnly} acil`;
        if (subCompleted) subCompleted.textContent = total ? `%${Math.round((completed / total) * 100)} karşılandı` : 'Liste hazır';

        document.querySelectorAll('.stat-card[data-stat-filter]').forEach(card => {
            const key = card.dataset.statFilter;
            const active = (key === this.filterStatus) ||
                (key === 'priority' && (this.filterStatus === 'critical' || this.filterStatus === 'urgent'));
            card.classList.toggle('is-active-filter', active && (this.filterStatus !== 'all' || key === 'all'));
        });

        // Segmented Progress Bar
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const orderedPercent = total > 0 ? Math.round((ordered / total) * 100) : 0;
        const fillBar = document.getElementById('progress-fill-bar');
        const fillOrdered = document.getElementById('progress-fill-ordered');
        const breakdown = document.getElementById('progress-breakdown');
        const percentText = document.getElementById('progress-percent-text');
        if (fillBar) fillBar.style.width = `${percent}%`;
        if (fillOrdered) fillOrdered.style.width = `${orderedPercent}%`;
        if (breakdown) breakdown.textContent = `${completed} alındı · ${ordered} siparişte · ${pending} bekliyor`;
        if (percentText) percentText.textContent = `%${percent} Tamamlandı (${completed}/${total})`;

        // Quick Chips Count Badges
        const chipTotal = document.getElementById('chip-total');
        const chipCrit = document.getElementById('chip-critical');
        const chipUrg = document.getElementById('chip-urgent');
        const chipPend = document.getElementById('chip-pending');
        const chipOrd = document.getElementById('chip-ordered');
        const chipComp = document.getElementById('chip-completed');
        const chipTrash = document.getElementById('chip-trash');

        if (chipTotal) chipTotal.textContent = total;
        if (chipCrit) chipCrit.textContent = critical;
        if (chipUrg) chipUrg.textContent = urgentOnly;
        if (chipPend) chipPend.textContent = pending;
        if (chipOrd) chipOrd.textContent = ordered;
        if (chipComp) chipComp.textContent = completed;
        if (chipTrash) chipTrash.textContent = trashCount;
    }

    // ==========================================
    // CUSTOM SELECT DROPDOWNS (ZERO DOUBLE ARROWS)
    // ==========================================
    initCustomSelects() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            if (!select || select.dataset.hkcEnhanced === '1') return;
            select.dataset.hkcEnhanced = '1';

            const wrapper = document.createElement('div');
            wrapper.className = 'hkc-select-wrapper';
            if (select.id) wrapper.dataset.for = select.id;

            const parent = select.parentNode;
            if (!parent) return;
            parent.insertBefore(wrapper, select);
            wrapper.appendChild(select);
            select.classList.add('hkc-native-select');
            select.tabIndex = -1;
            select.setAttribute('aria-hidden', 'true');

            const trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.className = 'hkc-select-trigger';
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', 'false');

            const valueEl = document.createElement('span');
            valueEl.className = 'hkc-select-value';

            const chevronEl = document.createElement('span');
            chevronEl.className = 'hkc-select-chevron';
            chevronEl.setAttribute('aria-hidden', 'true');
            chevronEl.innerHTML = UI_ICONS.chevronDown;

            trigger.appendChild(valueEl);
            trigger.appendChild(chevronEl);

            const menu = document.createElement('div');
            menu.className = 'hkc-select-menu';
            menu.setAttribute('role', 'listbox');

            wrapper.appendChild(trigger);
            wrapper.appendChild(menu);

            const entry = { select, wrapper, trigger, valueEl, menu };
            this.customSelectInstances.push(entry);

            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const wasOpen = wrapper.classList.contains('is-open');
                this.closeAllCustomSelects();
                if (!wasOpen) {
                    const rect = trigger.getBoundingClientRect();
                    const inBottomBar = !!wrapper.closest('#bulk-action-bar');
                    const notEnoughBelow = (rect.bottom + 260 > window.innerHeight) && rect.top > 180;
                    wrapper.classList.toggle('is-dropup', inBottomBar || notEnoughBelow);
                    wrapper.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });

            menu.addEventListener('click', (e) => {
                const optBtn = e.target.closest('.hkc-select-option');
                if (!optBtn) return;
                e.preventDefault();
                e.stopPropagation();
                const val = optBtn.dataset.value ?? '';
                if (select.value !== val) {
                    select.value = val;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
                this.syncCustomSelect(select);
                this.closeAllCustomSelects();
                trigger.focus();
            });

            select.addEventListener('change', () => {
                this.syncCustomSelect(select);
            });

            this.syncCustomSelect(select);
        });

        if (!this._customSelectDocBound) {
            this._customSelectDocBound = true;
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.hkc-select-wrapper')) {
                    this.closeAllCustomSelects();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.querySelector('.hkc-select-wrapper.is-open')) {
                    e.stopPropagation();
                    this.closeAllCustomSelects();
                }
            }, true);
        }
    }

    closeAllCustomSelects() {
        (this.customSelectInstances || []).forEach(({ wrapper, trigger }) => {
            wrapper.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        });
    }

    syncCustomSelect(select) {
        if (!select) return;
        const entry = (this.customSelectInstances || []).find(item => item.select === select);
        if (!entry) return;
        const { valueEl, menu } = entry;
        const options = Array.from(select.options || []);
        const selectedOption = options[select.selectedIndex] || options.find(o => o.value === select.value) || options[0];
        valueEl.textContent = selectedOption ? selectedOption.textContent.trim() : 'Seçiniz';

        menu.innerHTML = options.map(opt => {
            const isSelected = opt.value === select.value;
            return `
                <button type="button" class="hkc-select-option ${isSelected ? 'is-selected' : ''}" role="option" aria-selected="${isSelected}" data-value="${this.escapeHtml(opt.value)}">
                    <span class="hkc-select-option-label">${this.escapeHtml(opt.textContent.trim())}</span>
                    <span class="hkc-select-option-check" aria-hidden="true">${UI_ICONS.check}</span>
                </button>
            `;
        }).join('');
    }

    syncAllCustomSelects() {
        (this.customSelectInstances || []).forEach(({ select }) => this.syncCustomSelect(select));
    }

    // ==========================================
    // PRODUCT NAME AUTOCOMPLETE & UNIT CHIPS
    // ==========================================
    initAutocomplete() {
        const input = document.getElementById('input-name');
        const listEl = document.getElementById('name-autocomplete-list');
        if (!input || !listEl) return;

        input.addEventListener('input', () => {
            this.autocompleteIndex = -1;
            this.renderAutocomplete();
        });

        input.addEventListener('focus', () => {
            if (input.value.trim().length >= 1) {
                this.renderAutocomplete();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (!listEl || listEl.style.display === 'none' || !this.autocompleteMatches.length) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.autocompleteIndex = (this.autocompleteIndex + 1) % this.autocompleteMatches.length;
                this.renderAutocomplete();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.autocompleteIndex = (this.autocompleteIndex - 1 + this.autocompleteMatches.length) % this.autocompleteMatches.length;
                this.renderAutocomplete();
            } else if (e.key === 'Enter' && this.autocompleteIndex >= 0) {
                e.preventDefault();
                this.selectAutocompleteSuggestion(this.autocompleteIndex);
            } else if (e.key === 'Escape') {
                this.closeAutocomplete();
            }
        });

        listEl.addEventListener('mousedown', (e) => {
            const btn = e.target.closest('.autocomplete-item');
            if (!btn) return;
            e.preventDefault();
            const idx = Number(btn.dataset.index);
            if (!Number.isNaN(idx)) {
                this.selectAutocompleteSuggestion(idx);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.autocomplete-field')) {
                this.closeAutocomplete();
            }
        });
    }

    getAutocompleteSuggestions(rawQuery) {
        const q = this.nameKey(rawQuery);
        if (!q) return [];

        const catalog = new Map();
        const touchEntry = (name, meta = {}) => {
            const key = this.nameKey(name);
            if (!key) return;
            if (!catalog.has(key)) {
                catalog.set(key, {
                    name: String(name).trim(),
                    key,
                    supplier: 'Belirtilmedi',
                    quantity: '',
                    urgency: 'normal',
                    count: 0,
                    lastTime: 0,
                    seenIds: new Set()
                });
            }
            const rec = catalog.get(key);
            if (meta.itemId) {
                if (!rec.seenIds.has(meta.itemId)) {
                    rec.seenIds.add(meta.itemId);
                    rec.count += 1;
                }
            } else if (meta.fromQuick && rec.count === 0) {
                rec.count = 1;
            }
            const ts = meta.createdAt ? new Date(meta.createdAt).getTime() : 0;
            if (ts >= rec.lastTime) {
                rec.lastTime = ts;
                if (name) rec.name = String(name).trim();
                if (meta.supplier && meta.supplier !== 'Belirtilmedi') rec.supplier = meta.supplier;
                if (meta.quantity) rec.quantity = meta.quantity;
                if (meta.urgency) rec.urgency = meta.urgency;
            } else {
                if (rec.supplier === 'Belirtilmedi' && meta.supplier && meta.supplier !== 'Belirtilmedi') {
                    rec.supplier = meta.supplier;
                }
                if (!rec.quantity && meta.quantity) rec.quantity = meta.quantity;
            }
        };

        (this.events || []).forEach(ev => {
            touchEntry(ev.name, {
                itemId: ev.itemId,
                supplier: ev.supplier,
                urgency: ev.urgency,
                createdAt: ev.createdAt
            });
        });

        (this.items || []).forEach(item => {
            touchEntry(item.name, {
                itemId: item.id,
                supplier: item.supplier,
                quantity: item.quantity,
                urgency: item.urgency,
                createdAt: item.updatedAt || item.createdAt
            });
        });

        (this.quickItems || []).forEach(label => {
            const clean = String(label || '').replace(/^[^\p{L}\p{N}]+/u, '').trim();
            if (clean) touchEntry(clean, { fromQuick: true });
        });

        const matches = [];
        catalog.forEach(entry => {
            if (!entry.key.includes(q)) return;
            const startsWith = entry.key.startsWith(q) ? 1 : 0;
            const wordMatch = entry.key.split(/\s+/).some(w => w.startsWith(q)) ? 1 : 0;
            matches.push({ ...entry, score: startsWith * 2 + wordMatch });
        });

        matches.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.count !== a.count) return b.count - a.count;
            return b.lastTime - a.lastTime;
        });

        return matches.slice(0, 7);
    }

    renderAutocomplete() {
        const input = document.getElementById('input-name');
        const listEl = document.getElementById('name-autocomplete-list');
        if (!input || !listEl) return;

        const suggestions = this.getAutocompleteSuggestions(input.value);
        this.autocompleteMatches = suggestions;

        if (!suggestions.length) {
            listEl.style.display = 'none';
            listEl.innerHTML = '';
            return;
        }

        if (this.autocompleteIndex >= suggestions.length) {
            this.autocompleteIndex = 0;
        }

        listEl.innerHTML = suggestions.map((s, idx) => {
            const metaParts = [];
            if (s.supplier && s.supplier !== 'Belirtilmedi') metaParts.push(s.supplier);
            if (s.quantity) metaParts.push(s.quantity);
            const metaText = metaParts.join(' · ') || 'Geçmiş kayıt';
            return `
                <button type="button" class="autocomplete-item ${idx === this.autocompleteIndex ? 'is-active' : ''}" role="option" data-index="${idx}">
                    <span class="autocomplete-item-main">
                        <span class="autocomplete-item-name">${this.escapeHtml(s.name)}</span>
                        <span class="autocomplete-item-meta">${this.escapeHtml(metaText)}</span>
                    </span>
                    ${s.count > 1 ? `<span class="autocomplete-count-pill">${s.count}×</span>` : ''}
                </button>
            `;
        }).join('');

        listEl.style.display = 'block';
    }

    selectAutocompleteSuggestion(index) {
        const item = this.autocompleteMatches[index];
        if (!item) return;

        const nameInput = document.getElementById('input-name');
        const qtyInput = document.getElementById('input-quantity');
        const supSelect = document.getElementById('input-supplier');

        if (nameInput) nameInput.value = item.name;
        if (supSelect && item.supplier && item.supplier !== 'Belirtilmedi') {
            if (Array.from(supSelect.options).some(o => o.value === item.supplier)) {
                supSelect.value = item.supplier;
            }
        }
        if (qtyInput && item.quantity && (!qtyInput.value.trim() || qtyInput.value.trim() === '1 kutu' || qtyInput.value.trim() === '1 adet')) {
            qtyInput.value = item.quantity;
        }

        this.syncActiveUnitChip();
        this.syncAllCustomSelects();
        this.closeAutocomplete();
    }

    closeAutocomplete() {
        this.autocompleteMatches = [];
        this.autocompleteIndex = -1;
        const listEl = document.getElementById('name-autocomplete-list');
        if (listEl) {
            listEl.style.display = 'none';
            listEl.innerHTML = '';
        }
    }

    initUnitQuickChips() {
        const container = document.getElementById('unit-quick-chips');
        const qtyInput = document.getElementById('input-quantity');
        if (!container || !qtyInput) return;

        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.unit-chip[data-unit]');
            if (!btn) return;
            const unit = btn.dataset.unit;
            const current = qtyInput.value.trim();
            const numMatch = current.match(/^(\d+(?:[.,]\d+)?)/);
            const countPart = numMatch ? numMatch[1] : '1';
            qtyInput.value = `${countPart} ${unit}`;
            this.syncActiveUnitChip();
        });

        qtyInput.addEventListener('input', () => {
            this.syncActiveUnitChip();
        });

        this.syncActiveUnitChip();
    }

    syncActiveUnitChip() {
        const qtyInput = document.getElementById('input-quantity');
        const chips = document.querySelectorAll('#unit-quick-chips .unit-chip[data-unit]');
        if (!qtyInput || !chips.length) return;

        const val = qtyInput.value.toLocaleLowerCase('tr-TR').trim();
        chips.forEach(chip => {
            const unit = (chip.dataset.unit || '').toLocaleLowerCase('tr-TR');
            const matched = new RegExp(`(^|\\s|\\d)${unit}$`).test(val);
            chip.classList.toggle('active', matched);
        });
    }

    // ==========================================
    // BULK SELECTION & ACTIONS
    // ==========================================
    initBulkHandlers() {
        const btnToggle = document.getElementById('btn-toggle-bulk');
        const btnSelectAll = document.getElementById('btn-bulk-select-all');
        const btnClearSel = document.getElementById('btn-bulk-clear-selection');
        const btnExit = document.getElementById('btn-bulk-exit');
        const btnCancel = document.getElementById('btn-bulk-cancel');
        const btnAssignSup = document.getElementById('btn-bulk-assign-supplier');
        const btnPending = document.getElementById('btn-bulk-pending');
        const btnOrdered = document.getElementById('btn-bulk-ordered');
        const btnCompleted = document.getElementById('btn-bulk-completed');
        const btnDelete = document.getElementById('btn-bulk-delete');

        if (btnToggle) btnToggle.addEventListener('click', () => this.toggleBulkMode());
        if (btnSelectAll) btnSelectAll.addEventListener('click', () => this.selectAllVisibleItems());
        if (btnClearSel) btnClearSel.addEventListener('click', () => this.clearBulkSelection());
        if (btnExit) btnExit.addEventListener('click', () => this.toggleBulkMode(false));
        if (btnCancel) btnCancel.addEventListener('click', () => this.toggleBulkMode(false));
        if (btnAssignSup) {
            btnAssignSup.addEventListener('click', () => {
                const supSel = document.getElementById('bulk-supplier-select');
                const sup = supSel ? supSel.value : '';
                if (!sup) {
                    this.showToast('Lütfen önce atanacak toptancıyı seçin.');
                    return;
                }
                this.executeBulkUpdate({ supplier: sup });
            });
        }
        if (btnPending) btnPending.addEventListener('click', () => this.executeBulkUpdate({ status: 'pending' }));
        if (btnOrdered) btnOrdered.addEventListener('click', () => this.executeBulkUpdate({ status: 'ordered' }));
        if (btnCompleted) btnCompleted.addEventListener('click', () => this.executeBulkUpdate({ status: 'completed' }));
        if (btnDelete) btnDelete.addEventListener('click', () => this.executeBulkUpdate({ status: 'deleted' }));
    }

    toggleBulkMode(forceState) {
        if (this.filterStatus === 'trash' && forceState !== false) {
            this.showToast('Çöp kutusunda toplu seçim devre dışıdır.');
            return;
        }
        this.isBulkMode = typeof forceState === 'boolean' ? forceState : !this.isBulkMode;
        if (!this.isBulkMode) {
            this.selectedIds.clear();
        }
        this.updateBulkBarUI();
        this.render();
    }

    toggleSelectItem(id) {
        if (!id) return;
        if (!this.isBulkMode) this.isBulkMode = true;
        if (this.selectedIds.has(id)) {
            this.selectedIds.delete(id);
        } else {
            this.selectedIds.add(id);
        }
        this.updateBulkBarUI();
        const card = document.getElementById(`card-${id}`);
        if (card) {
            const checked = this.selectedIds.has(id);
            card.classList.toggle('is-selected', checked);
            const box = card.querySelector('.bulk-checkbox-btn');
            if (box) {
                box.classList.toggle('is-checked', checked);
                box.innerHTML = checked ? UI_ICONS.check : '';
            }
        } else {
            this.render();
        }
    }

    handleCardBulkClick(id, event) {
        if (!this.isBulkMode) return;
        if (event && event.target.closest('button, a, input, select, .item-photo-thumb, .item-title')) {
            return;
        }
        this.toggleSelectItem(id);
    }

    selectAllVisibleItems() {
        const visible = this.getFilteredItems().filter(i => !i.offline && i.status !== 'deleted');
        visible.forEach(i => this.selectedIds.add(i.id));
        this.updateBulkBarUI();
        this.render();
    }

    clearBulkSelection() {
        this.selectedIds.clear();
        this.updateBulkBarUI();
        this.render();
    }

    updateBulkBarUI() {
        const toggleBtn = document.getElementById('btn-toggle-bulk');
        const strip = document.getElementById('bulk-select-strip');
        const bar = document.getElementById('bulk-action-bar');
        const stripCount = document.getElementById('bulk-strip-count');
        const barCount = document.getElementById('bulk-selected-count');

        const active = this.isBulkMode && this.filterStatus !== 'trash';
        const count = this.selectedIds ? this.selectedIds.size : 0;

        if (toggleBtn) toggleBtn.classList.toggle('active', active);
        if (strip) strip.style.display = active ? 'flex' : 'none';
        if (bar) bar.style.display = (active && count > 0) ? 'block' : 'none';
        if (stripCount) stripCount.textContent = count;
        if (barCount) barCount.textContent = count;
        document.body.classList.toggle('has-bulk-bar', active && count > 0);
    }

    async executeBulkUpdate(updates) {
        const ids = Array.from(this.selectedIds || []);
        if (!ids.length) {
            this.showToast('Lütfen en az bir ürün seçin.');
            return;
        }

        const now = new Date().toISOString();
        const idSet = new Set(ids);
        this.items.forEach(item => {
            if (idSet.has(item.id)) {
                Object.assign(item, updates, { updatedAt: now });
            }
        });
        this.saveItemsCache();

        if (updates.status === 'completed' && window.soundManager && window.soundManager.playCompleted) {
            window.soundManager.playCompleted();
        } else if (updates.status === 'deleted' && window.soundManager && window.soundManager.playDelete) {
            window.soundManager.playDelete();
        }

        const count = ids.length;
        this.selectedIds.clear();
        this.isBulkMode = false;
        this.updateBulkBarUI();
        this.render();

        const payload = { ids, updates };
        if (!navigator.onLine) {
            this.enqueueOfflineMutation({ type: 'bulkUpdate', payload });
            this.showToast(`📴 İnternet yok — ${count} ürün için toplu işlem sıraya alındı`);
            return;
        }

        try {
            const res = await this.trackItemRequest(this.apiFetch('/api/items/bulk-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            }));
            if (res.status === 503) {
                this.enqueueOfflineMutation({ type: 'bulkUpdate', payload });
                this.showToast(`📴 Sunucuya ulaşılamadı — ${count} ürün işlemi sıraya alındı`);
                return;
            }
            if (res.ok) {
                const msg = updates.supplier
                    ? `✅ ${count} ürüne toptancı atandı: ${updates.supplier}`
                    : updates.status === 'deleted'
                        ? `🗑️ ${count} ürün çöp kutusuna taşındı`
                        : `✅ ${count} ürün toplu olarak güncellendi`;
                this.showToast(msg);
            } else {
                const err = await res.json().catch(() => ({}));
                this.showToast(err.error || 'Toplu işlem tamamlanamadı.');
            }
        } catch (e) {
            if (e instanceof TypeError) {
                this.enqueueOfflineMutation({ type: 'bulkUpdate', payload });
                this.showToast(`📴 Bağlantı kesildi — ${count} ürün işlemi sıraya alındı`);
                return;
            }
            console.error('Bulk update error:', e);
            this.showToast('Toplu işlem sırasında hata oluştu.');
        }
    }

    // ==========================================
    // WAITING AGE & COLLAPSIBLE SUPPLIER ACCORDION
    // ==========================================
    getWaitingAgeBadge(item) {
        if (!item || item.status !== 'pending' || !item.createdAt) return '';
        const createdMs = new Date(item.createdAt).getTime();
        if (Number.isNaN(createdMs)) return '';
        const days = Math.floor((Date.now() - createdMs) / 86400000);
        if (days >= 10) {
            return `<span class="waiting-age-badge is-overdue" title="Bekleme süresi">${UI_ICONS.hourglass} ${days} gün bekliyor</span>`;
        }
        if (days >= 5) {
            return `<span class="waiting-age-badge is-warning" title="Bekleme süresi">${UI_ICONS.hourglass} ${days} gün bekliyor</span>`;
        }
        return '';
    }

    toggleSupplierGroup(encodedSupplier) {
        const supplier = decodeURIComponent(encodedSupplier || '');
        const key = this.nameKey(supplier);
        if (!key) return;
        if (this.collapsedSuppliers.has(key)) {
            this.collapsedSuppliers.delete(key);
        } else {
            this.collapsedSuppliers.add(key);
        }
        this.writeJsonStorage('dukkan_collapsed_suppliers', Array.from(this.collapsedSuppliers));
        this.render();
    }

    toggleAllSupplierGroups() {
        const filtered = this.getFilteredItems();
        const keys = [...new Set(filtered.map(i => this.nameKey(i.supplier || 'Belirtilmedi')))].filter(Boolean);
        const allCollapsed = keys.length > 0 && keys.every(k => this.collapsedSuppliers.has(k));
        if (allCollapsed) {
            keys.forEach(k => this.collapsedSuppliers.delete(k));
        } else {
            keys.forEach(k => this.collapsedSuppliers.add(k));
        }
        this.writeJsonStorage('dukkan_collapsed_suppliers', Array.from(this.collapsedSuppliers));
        this.render();
    }

    render() {
        this.saveOfflineBackup();
        this.renderStats();
        this.renderReminders();
        const container = document.getElementById('items-container');
        if (!container) return;

        const filtered = this.getFilteredItems();
        if (this.selectedIds && this.selectedIds.size > 0) {
            const validIds = new Set(this.items.filter(i => i.status !== 'deleted').map(i => i.id));
            Array.from(this.selectedIds).forEach(id => {
                if (!validIds.has(id)) this.selectedIds.delete(id);
            });
        }
        this.updateBulkBarUI();

        if (filtered.length === 0) {
            if (this.filterStatus === 'trash') {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">${UI_ICONS.shield}</div>
                        <h3>Silinen Ürün Yok</h3>
                        <p>Silinmiş herhangi bir ürün bulunmuyor. Tüm ürünleriniz ana listede güvende!</p>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">${UI_ICONS.sparkles}</div>
                        <h3>Eksik Ürün Bulunamadı</h3>
                        <p>Harika! Listede filtrelere uyan bir eksik yok veya tüm siparişler tamamlandı.</p>
                    </div>
                `;
            }
            return;
        }

        if (this.currentView === 'bySupplier') {
            this.renderBySupplier(filtered, container);
        } else {
            this.renderListView(filtered, container);
        }
    }

    renderListView(items, container) {
        let bannerHtml = '';
        if (this.filterStatus === 'trash') {
            const trashCount = items.length;
            bannerHtml = `
                <div class="trash-banner">
                    <div class="trash-banner-info">
                        <div class="trash-banner-icon">${UI_ICONS.shield}</div>
                        <div>
                            <div class="trash-banner-title">Silinenler &amp; Çöp Kutusu (${trashCount} Ürün)</div>
                            <div class="trash-banner-desc">Sildiğiniz hiçbir ürün kaybolmaz! Buradan dilediğiniz zaman tek tıkla geri yükleyebilir veya kalıcı olarak silebilirsiniz.</div>
                        </div>
                    </div>
                    <div class="trash-banner-actions">
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.app.restoreAllDeleted()" ${trashCount === 0 ? 'disabled' : ''}>
                            ${UI_ICONS.undo}
                            <span>Tümünü Geri Yükle</span>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="window.app.emptyTrash()" ${trashCount === 0 ? 'disabled' : ''}>
                            ${UI_ICONS.trash}
                            <span>Silinenleri Kalıcı Temizle</span>
                        </button>
                    </div>
                </div>
            `;
        }
        container.innerHTML = bannerHtml + items.map(item => this.createItemCardHtml(item)).join('');
    }

    renderBySupplier(items, container) {
        const groups = {};
        items.forEach(item => {
            const sup = item.supplier || 'Belirtilmedi';
            if (!groups[sup]) groups[sup] = [];
            groups[sup].push(item);
        });

        const suppliersList = Object.keys(groups);
        const allCollapsed = suppliersList.length > 0 && suppliersList.every(sup => this.collapsedSuppliers.has(this.nameKey(sup)));

        let html = `
            <div class="supplier-accordion-controls">
                <span class="supplier-accordion-summary">${suppliersList.length} Toptancı Grubu · ${items.length} Kalem</span>
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.app.toggleAllSupplierGroups()">
                    ${UI_ICONS.layers} <span>${allCollapsed ? 'Tümünü Aç' : 'Tümünü Daralt'}</span>
                </button>
            </div>
        `;

        suppliersList.forEach(supplier => {
            const groupItems = groups[supplier];
            const supKey = this.nameKey(supplier);
            const isCollapsed = this.collapsedSuppliers.has(supKey);
            const urgentCount = groupItems.filter(i => i.status !== 'completed' && i.status !== 'deleted' && (i.urgency === 'critical' || i.urgency === 'urgent')).length;
            const initial = (supplier || 'T').trim().charAt(0).toLocaleUpperCase('tr-TR') || 'T';
            const encodedSup = encodeURIComponent(supplier);
            html += `
                <div class="supplier-group-card ${isCollapsed ? 'is-collapsed' : ''}">
                    <div class="supplier-group-header is-clickable" onclick="window.app.toggleSupplierGroup('${encodedSup}')" role="button" tabindex="0" aria-expanded="${!isCollapsed}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.app.toggleSupplierGroup('${encodedSup}')}">
                        <div class="supplier-group-info">
                            <span class="supplier-avatar-chip" aria-hidden="true">${this.escapeHtml(initial)}</span>
                            <span class="supplier-name">${this.escapeHtml(supplier)}</span>
                            <span class="supplier-count-badge">${groupItems.length} Çeşit</span>
                        </div>
                        <div class="supplier-group-right">
                            ${urgentCount > 0 ? `<span class="supplier-urgent-pill">${urgentCount} Acil</span>` : ''}
                            <span class="supplier-chevron" aria-hidden="true">${UI_ICONS.chevronDown}</span>
                        </div>
                    </div>
                    <div class="supplier-group-items">
                        ${groupItems.map(item => this.createItemCardHtml(item)).join('')}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    createItemCardHtml(item) {
        // Çevrimdışı eklenmiş, henüz sunucuya gitmemiş ürün
        if (item.offline) {
            return `
                <div class="item-card offline-card" id="card-${item.id}">
                    <div class="card-body-top">
                        <div class="item-main-info" style="width: 100%;">
                            <div class="item-title-row">
                                <span class="item-title">${this.escapeHtml(item.name)}</span>
                                <span class="item-qty-badge">${this.escapeHtml(item.quantity)}</span>
                                <span class="urgency-badge offline">Gönderilmeyi bekliyor</span>
                            </div>
                            <div class="item-meta-row">
                                <span class="meta-tag supplier">${UI_ICONS.building} ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                                <span class="meta-tag time">${UI_ICONS.clock} ${this.formatDateTime(item.createdAt)}</span>
                                ${item.addedBy ? `<span class="meta-tag author" title="Ekleyen">${UI_ICONS.user} ${this.escapeHtml(item.addedBy)}</span>` : ''}
                                <span class="meta-tag">${UI_ICONS.wifiOff} Çevrimdışı eklendi</span>
                            </div>
                            ${item.notes ? `<div class="item-note-text">${UI_ICONS.note} ${this.escapeHtml(item.notes)}</div>` : ''}
                        </div>
                    </div>
                    <div class="card-body-bottom">
                        <span class="offline-card-hint">İnternet gelince otomatik gönderilecek</span>
                        <div class="item-actions">
                            <button type="button" class="btn btn-danger btn-sm" onclick="event.stopPropagation(); window.app.cancelOfflineItem('${item.id}')">İptal</button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Special Trash Card if item is soft-deleted
        if (item.status === 'deleted') {
            return `
                <div class="item-card trash-card" id="card-${item.id}">
                    <div class="card-body-top">
                        <div class="item-main-info" style="width: 100%;">
                            <div class="item-title-row">
                                <span class="urgency-badge deleted">Silinenlerde</span>
                                <h3 class="item-title">${this.escapeHtml(item.name)}</h3>
                            </div>
                            <div class="item-meta-row">
                                <span class="meta-tag quantity">${UI_ICONS.package} ${this.escapeHtml(item.quantity || '1 adet')}</span>
                                <span class="meta-tag supplier">${UI_ICONS.building} ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                                <span class="meta-tag time">${UI_ICONS.clock} ${this.formatDateTime(item.updatedAt || item.createdAt)}</span>
                                ${item.addedBy ? `<span class="meta-tag author" title="Ekleyen">${UI_ICONS.user} ${this.escapeHtml(item.addedBy)}</span>` : ''}
                            </div>
                            ${item.notes ? `<div class="item-note-text">${UI_ICONS.note} ${this.escapeHtml(item.notes)}</div>` : ''}
                        </div>
                    </div>

                    <div class="card-body-bottom trash-card-bottom">
                        <span class="trash-card-hint">${UI_ICONS.shield} Silinenler listesinde güvende</span>
                        <div class="item-actions">
                            <button type="button" class="btn btn-primary btn-sm" title="Listeye Geri Yükle" onclick="event.stopPropagation(); window.app.restoreItem('${item.id}')">
                                ${UI_ICONS.undo} <span>Geri Yükle</span>
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" title="Kalıcı Olarak Sil" onclick="event.stopPropagation(); window.app.permanentDeleteItem('${item.id}')">
                                ${UI_ICONS.trash} <span>Kalıcı Sil</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        const urgencyClass = item.urgency === 'critical' ? 'critical' : (item.urgency === 'urgent' ? 'urgent' : 'normal');
        const urgencyLabels = { critical: 'Yok Satıyor', urgent: 'Acil', normal: 'Normal' };
        const isCompleted = item.status === 'completed';
        const hasPhoto = !!item.image;
        const isBulkActive = this.isBulkMode && this.filterStatus !== 'trash';
        const isSelected = isBulkActive && this.selectedIds && this.selectedIds.has(item.id);
        const waitingBadge = this.getWaitingAgeBadge(item);

        return `
            <div class="item-card ${urgencyClass} ${isCompleted ? 'completed' : ''} ${hasPhoto ? 'item-card-with-photo' : ''} ${isBulkActive ? 'bulk-selectable' : ''} ${isSelected ? 'is-selected' : ''}" id="card-${item.id}" ${isBulkActive ? `onclick="window.app.handleCardBulkClick('${item.id}', event)"` : ''}>
                <div class="card-body-top">
                    ${isBulkActive ? `
                        <button type="button" class="bulk-checkbox-btn ${isSelected ? 'is-checked' : ''}" title="Seç / Kaldır" aria-label="Ürünü Seç" onclick="event.stopPropagation(); window.app.toggleSelectItem('${item.id}')">
                            ${isSelected ? UI_ICONS.check : ''}
                        </button>
                    ` : ''}
                    <button type="button" class="status-toggle-btn" title="${isCompleted ? 'Tekrar Bekliyor Yap' : 'Alındı / Tamamlandı Olarak İşaretle'}" onclick="window.app.updateStatus('${item.id}', '${isCompleted ? 'pending' : 'completed'}')">
                        ${UI_ICONS.check}
                    </button>

                    ${hasPhoto ? `
                        <img src="${item.image}" class="item-photo-thumb" title="Büyük Fotoğrafı Gör" onclick="window.app.openLightbox('${item.id}')">
                    ` : ''}

                    <div class="item-main-info">
                        <div class="item-title-row">
                            <span class="item-title" title="Düzenlemek için tıklayın" onclick="event.stopPropagation(); window.app.openEditItemModal('${item.id}')">${this.escapeHtml(item.name)}</span>
                            <div class="qty-control-group">
                                <button type="button" class="btn-qty-step" title="Miktarı 1 Azalt" onclick="window.app.quickAdjustQuantity('${item.id}', -1)">−</button>
                                <span class="item-qty-badge">${this.escapeHtml(item.quantity)}</span>
                                <button type="button" class="btn-qty-step" title="Miktarı 1 Artır" onclick="window.app.quickAdjustQuantity('${item.id}', 1)">+</button>
                            </div>
                            <span class="urgency-badge ${urgencyClass}">${urgencyLabels[item.urgency] || 'Normal'}</span>
                            ${waitingBadge}
                        </div>
                        <div class="item-meta-row">
                            <span class="meta-tag supplier">${UI_ICONS.building} ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                            <span class="meta-tag time">${UI_ICONS.clock} ${this.formatDateTime(item.createdAt)}</span>
                            ${item.addedBy ? `<span class="meta-tag author" title="Ekleyen">${UI_ICONS.user} ${this.escapeHtml(item.addedBy)}</span>` : ''}
                            ${item.source === 'phone' ? `<span class="meta-tag" title="Telefondan Eklendi">${UI_ICONS.smartphone} Mobil</span>` : `<span class="meta-tag" title="Bilgisayardan Eklendi">${UI_ICONS.monitor} PC</span>`}
                        </div>
                        ${item.notes ? `<div class="item-note-text">${UI_ICONS.note} ${this.escapeHtml(item.notes)}</div>` : ''}
                    </div>
                </div>

                <div class="card-body-bottom">
                    <div class="status-pill-group">
                        <button type="button" class="status-pill-btn ${item.status === 'pending' ? 'active pending' : ''}" onclick="window.app.updateStatus('${item.id}', 'pending')">Bekliyor</button>
                        <button type="button" class="status-pill-btn ${item.status === 'ordered' ? 'active ordered' : ''}" onclick="window.app.updateStatus('${item.id}', 'ordered')">Sipariş Edildi</button>
                        <button type="button" class="status-pill-btn ${item.status === 'completed' ? 'active completed' : ''}" onclick="window.app.updateStatus('${item.id}', 'completed')">Alındı</button>
                    </div>

                    <div class="item-actions">
                        <button type="button" class="btn btn-secondary btn-icon-only" title="Ürünü Düzenle" onclick="event.stopPropagation(); window.app.openEditItemModal('${item.id}')">
                            ${UI_ICONS.edit}
                        </button>
                        <button type="button" class="btn btn-secondary btn-icon-only" title="Fotoğraf Ekle / Değiştir" onclick="event.stopPropagation(); window.app.triggerCardPhotoUpload('${item.id}')">
                            ${UI_ICONS.camera}
                        </button>
                        <button type="button"
                                id="delete-btn-${item.id}"
                                class="btn btn-danger btn-icon-only"
                                title="Sil"
                                onclick="event.stopPropagation(); window.app.deleteItem('${item.id}', event)">
                            ${UI_ICONS.trash}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async quickAdjustQuantity(id, delta) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        const currQty = item.quantity || '1 adet';
        const match = currQty.match(/^(\d+)(.*)$/);

        let newQty = currQty;
        if (match) {
            const num = parseInt(match[1], 10);
            const unit = match[2];
            const nextNum = Math.max(1, num + delta);
            newQty = `${nextNum}${unit}`;
        } else {
            newQty = delta > 0 ? `${currQty} + 1` : currQty;
        }

        await this.updateItemDetails(id, { quantity: newQty });
        this.showToast(`${item.name}: ${currQty} ➔ ${newQty}`);
        window.soundManager.playNewItem();
    }

    async copyListToClipboard() {
        const pendingItems = this.items.filter(i => i.status !== 'completed' && i.status !== 'deleted');
        if (pendingItems.length === 0) {
            this.showToast('Kopyalanacak bekleyen eksik ürün bulunmuyor.');
            return;
        }

        const dateStr = new Date().toLocaleDateString('tr-TR');
        const label = (this.appName || 'HKC').toLocaleUpperCase('tr-TR');
        let text = `${label} - EKSİK & SİPARİŞ LİSTESİ (${dateStr})\n\n`;

        pendingItems.forEach((item, idx) => {
            const urgTag = item.urgency === 'critical' ? ' [YOK SATAN]' : (item.urgency === 'urgent' ? ' [ACİL]' : '');
            text += `${idx + 1}. ${item.name} - ${item.quantity}${urgTag}${item.supplier && item.supplier !== 'Belirtilmedi' ? ' (' + item.supplier + ')' : ''}\n`;
        });

        try {
            await navigator.clipboard.writeText(text);
            this.showToast(`${pendingItems.length} eksik panoya kopyalandı!`);
            window.soundManager.playCompleted();
        } catch (e) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            this.showToast(`${pendingItems.length} eksik panoya kopyalandı!`);
        }
    }

    
    openEditItemModal(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        this.editingItemId = itemId;
        this.editingItemPhoto = item.image || '';

        const supSelect = document.getElementById('edit-item-supplier');
        if (supSelect) {
            supSelect.innerHTML = '<option value="Belirtilmedi">Belirtilmedi</option>' +
                this.suppliers.map(s => '<option value="' + this.escapeHtml(s.name) + '">' + this.escapeHtml(s.name) + '</option>').join('');
            supSelect.value = item.supplier || 'Belirtilmedi';
        }

        const idEl = document.getElementById('edit-item-id');
        const nameEl = document.getElementById('edit-item-name');
        const qtyEl = document.getElementById('edit-item-quantity');
        const urgEl = document.getElementById('edit-item-urgency');
        const statEl = document.getElementById('edit-item-status');
        const notesEl = document.getElementById('edit-item-notes');

        if (idEl) idEl.value = item.id;
        if (nameEl) nameEl.value = item.name || '';
        if (qtyEl) qtyEl.value = item.quantity || '1 adet';
        if (urgEl) urgEl.value = item.urgency || 'normal';
        if (statEl) statEl.value = item.status || 'pending';
        if (notesEl) notesEl.value = item.notes || '';
        if (typeof this.syncAllCustomSelects === 'function') {
            this.syncAllCustomSelects();
        }

        this.updateEditPhotoUI();
        this.openModal('edit-item-modal');
        if (nameEl) setTimeout(() => nameEl.focus(), 100);
    }

    updateEditPhotoUI() {
        const preview = document.getElementById('edit-photo-preview');
        const text = document.getElementById('edit-photo-text');
        const removeBtn = document.getElementById('btn-edit-remove-photo');
        const changeBtn = document.getElementById('btn-edit-change-photo');

        if (this.editingItemPhoto) {
            if (preview) {
                preview.src = this.editingItemPhoto;
                preview.style.display = 'block';
            }
            if (text) text.textContent = 'Fotoğraf eklendi';
            if (removeBtn) removeBtn.style.display = 'inline-flex';
            if (changeBtn) changeBtn.textContent = 'Değiştir';
        } else {
            if (preview) {
                preview.src = '';
                preview.style.display = 'none';
            }
            if (text) text.textContent = 'Fotoğraf yok';
            if (removeBtn) removeBtn.style.display = 'none';
            if (changeBtn) changeBtn.textContent = 'Fotoğraf Ekle';
        }
    }

    async saveEditItem() {
        if (!this.editingItemId) return;

        const nameInput = document.getElementById('edit-item-name');
        const qtyInput = document.getElementById('edit-item-quantity');
        const supInput = document.getElementById('edit-item-supplier');
        const urgInput = document.getElementById('edit-item-urgency');
        const statInput = document.getElementById('edit-item-status');
        const notesInput = document.getElementById('edit-item-notes');

        const name = nameInput ? nameInput.value.trim() : '';
        const quantity = qtyInput ? qtyInput.value.trim() : '1 adet';
        const supplier = supInput ? supInput.value : 'Belirtilmedi';
        const urgency = urgInput ? urgInput.value : 'normal';
        const status = statInput ? statInput.value : 'pending';
        const notes = notesInput ? notesInput.value.trim() : '';

        if (!name) {
            this.showToast('Ürün adı boş bırakılamaz.');
            if (nameInput) nameInput.focus();
            return;
        }

        const updates = {
            name,
            quantity: quantity || '1 adet',
            supplier,
            urgency,
            status,
            notes,
            image: this.editingItemPhoto
        };

        const itemId = this.editingItemId;
        this.closeAllModals();
        this.editingItemId = null;
        this.editingItemPhoto = '';

        await this.updateItemDetails(itemId, updates);
        this.showToast('Ürün Güncellendi: ' + name);
    }

    handleReceivedIconSetting(rawVal) {
        if (!rawVal) return;
        try {
            const parsed = JSON.parse(rawVal);
            this.applyAppIcon(parsed.icon, parsed.isImage);
            localStorage.setItem('dukkan_app_icon', parsed.icon);
            localStorage.setItem('dukkan_app_icon_is_image', parsed.isImage ? '1' : '0');
        } catch (e) {
            this.applyAppIcon(rawVal, false);
            localStorage.setItem('dukkan_app_icon', rawVal);
            localStorage.setItem('dukkan_app_icon_is_image', '0');
        }
    }

    async loadSettings() {
        try {
            const res = await this.apiFetch('/api/settings');
            if (res.ok) {
                const settings = await res.json();
                if (settings.app_icon) {
                    this.handleReceivedIconSetting(settings.app_icon);
                }
                if (settings.app_name) {
                    this.handleReceivedNameSetting(settings.app_name);
                }
                if (settings.quick_items) {
                    this.handleReceivedQuickItemsSetting(settings.quick_items);
                }
            }
        } catch (err) {
            console.warn('Ayarlar yüklenemedi:', err);
        }
    }

    applyAppName(name) {
        const appName = (name || 'HKC').trim();
        this.appName = appName;

        const titleText = document.getElementById('app-title-text');
        if (titleText) titleText.textContent = appName;

        const loginTitle = document.getElementById('login-title-text');
        if (loginTitle) loginTitle.textContent = appName;

        const printTitle = document.getElementById('print-app-title');
        if (printTitle) printTitle.textContent = `${appName.toLocaleUpperCase('tr-TR')} - EKSİK LİSTESİ`;

        const inputAppName = document.getElementById('input-app-name');
        if (inputAppName && document.activeElement !== inputAppName) {
            inputAppName.value = appName;
        }

        const iconPreviewTitle = document.getElementById('icon-preview-app-title');
        if (iconPreviewTitle) iconPreviewTitle.textContent = appName;

        document.title = appName;
        localStorage.setItem('dukkan_app_name', appName);
    }

    handleReceivedNameSetting(rawVal) {
        if (!rawVal) return;
        this.applyAppName(rawVal);
    }

    async saveAppName(newName) {
        if (!newName || !newName.trim()) return;
        const name = newName.trim();
        this.applyAppName(name);

        try {
            const res = await this.apiFetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'app_name', value: name })
            });

            if (res.ok) {
                this.showToast(`✅ Uygulama adı güncellendi: ${name}`);
            } else {
                this.showToast('Uygulama adı kaydedilemedi');
            }
        } catch (err) {
            console.error('Uygulama adı kaydetme hatası:', err);
            this.showToast('Bağlantı hatası');
        }
    }

    updateSoundButtonUI() {
        const soundIcon = document.getElementById('sound-tool-icon');
        const soundTitle = document.getElementById('sound-tool-title');
        const soundSub = document.getElementById('sound-tool-subtitle');
        const isMuted = window.soundManager && window.soundManager.muted;

        if (soundIcon) soundIcon.innerHTML = isMuted ? UI_ICONS.volumeX : UI_ICONS.volume;
        if (soundTitle) soundTitle.textContent = isMuted ? 'Sesler Kapalı' : 'Ses Bildirimleri';
        if (soundSub) soundSub.textContent = isMuted ? 'Açmak için tıklayın' : 'Açık (Sessize al)';
    }

    applyAppIcon(iconValue, isImage = false) {
        this.appIcon = iconValue || '⚡';
        this.appIconIsImage = !!isImage;

        const brandIcon = document.getElementById('app-brand-icon');
        const loginIcon = document.getElementById('login-brand-icon');
        const previewBox = document.getElementById('icon-preview-box');

        const renderContent = (container) => {
            if (!container) return;
            if (this.appIconIsImage) {
                container.innerHTML = '<img src="' + this.appIcon + '" alt="Logo">';
            } else {
                container.textContent = this.appIcon;
            }
        };

        renderContent(brandIcon);
        renderContent(loginIcon);
        renderContent(previewBox);

        this.updateFavicon(this.appIcon, this.appIconIsImage);
    }

    updateFavicon(iconValue, isImage) {
        let faviconUrl = '';
        if (isImage) {
            faviconUrl = iconValue;
        } else {
            const char = iconValue || '⚡';
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="%230f294a"/><text x="50" y="68" font-size="56" text-anchor="middle">' + char + '</text></svg>';
            faviconUrl = 'data:image/svg+xml,' + encodeURIComponent(svg);
        }
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = faviconUrl;
    }

    openAppIconModal() {
        this.tempIconValue = this.appIcon;
        this.tempIconIsImage = this.appIconIsImage;

        const customInput = document.getElementById('custom-icon-text-input');
        if (customInput) {
            customInput.value = this.tempIconIsImage ? '' : (this.tempIconValue === '⚡' ? '' : this.tempIconValue);
        }

        document.querySelectorAll('#app-preset-icons-grid .emoji-opt-btn').forEach(btn => {
            if (!this.tempIconIsImage && btn.dataset.icon === this.tempIconValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        this.updateIconModalPreview();
        this.openModal('app-icon-modal');
    }

    updateIconModalPreview() {
        const preview = document.getElementById('icon-preview-box');
        const clearBtn = document.getElementById('btn-clear-custom-logo');
        const caption = document.getElementById('icon-preview-caption');

        if (preview) {
            if (this.tempIconIsImage) {
                preview.innerHTML = '<img src="' + this.tempIconValue + '" alt="Logo">';
            } else {
                preview.textContent = this.tempIconValue || '⚡';
            }
        }

        if (clearBtn) {
            clearBtn.style.display = this.tempIconIsImage ? 'inline-flex' : 'none';
        }

        if (caption) {
            caption.textContent = this.tempIconIsImage ? 'Yüklenen Özel Logo' : ('Seçilen İkon: ' + (this.tempIconValue || '⚡'));
        }
    }

    async saveAppIcon() {
        const val = this.tempIconValue || '⚡';
        const isImg = this.tempIconIsImage || false;

        this.applyAppIcon(val, isImg);
        localStorage.setItem('dukkan_app_icon', val);
        localStorage.setItem('dukkan_app_icon_is_image', isImg ? '1' : '0');

        this.closeAllModals();
        this.showToast('Uygulama ikonu başarıyla güncellendi!');

        try {
            await this.apiFetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: 'app_icon',
                    value: JSON.stringify({ icon: val, isImage: isImg })
                })
            });
        } catch (e) {
            console.warn('Sunucuya ikon kaydedilemedi:', e);
        }
    }

    formatTime(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }

    formatDateTime(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        if (Number.isNaN(d.getTime())) return '';
        const date = d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const time = d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        return `${date} · ${time}`;
    }

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

