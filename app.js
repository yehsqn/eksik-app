// Main Application Logic - Turso / LibSQL, Suppliers Management & Photo Support
class App {
    constructor() {
        this.items = [];
        this.suppliers = [];
        this.currentUser = localStorage.getItem('dukkan_username') || 'admin';
        this.authToken = localStorage.getItem('dukkan_token') || null;

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

        this.init();
    }

    async init() {
        this.applyAppIcon(this.appIcon, this.appIconIsImage);
        this.applyAppName(this.appName);
        this.initTheme();
        this.initAuth();
        this.initEventListeners();
        this.initPhotoHandlers();
        this.renderQuickPills();
        this.loadSettings();
        this.initPushNotifications();

        if (this.isAuthenticated()) {
            this.showAppScreen();
            this.initSocket();
            await this.loadSuppliers();
            await this.loadInitialData();
            await this.loadServerInfo();
        } else {
            this.showLoginScreen();
        }
    }

    isAuthenticated() {
        return !!this.authToken;
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
    }

    initAuth() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin();
            });
        }

        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('dukkan_token');
                localStorage.removeItem('dukkan_username');
                this.authToken = null;
                this.showLoginScreen();
                this.showToast('Çıkış yapıldı');
            });
        }

        const userSettingsBtn = document.getElementById('btn-open-user-settings');
        if (userSettingsBtn) {
            userSettingsBtn.addEventListener('click', () => {
                const nameInput = document.getElementById('input-app-name');
                if (nameInput) nameInput.value = this.appName || 'App';
                this.updateSoundButtonUI();
                this.openModal('password-modal');
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

                this.showAppScreen();
                this.initSocket();
                await this.loadSuppliers();
                await this.loadInitialData();
                await this.loadServerInfo();
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
            const res = await fetch('/api/auth/change-password', {
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
                msg.style.display = 'block';
                msg.style.background = 'rgba(16, 185, 129, 0.2)';
                msg.style.color = '#34d399';
                setTimeout(() => {
                    this.closeAllModals();
                    msg.style.display = 'none';
                }, 1500);
            } else {
                msg.textContent = data.error || 'Şifre güncellenemedi.';
                msg.style.display = 'block';
                msg.style.background = 'rgba(239, 68, 68, 0.2)';
                msg.style.color = '#f87171';
            }
        } catch (e) {
            msg.textContent = 'Sunucu hatası.';
            msg.style.display = 'block';
        }
    }

    initTheme() {
        localStorage.setItem('theme_mode', 'dark');
        document.body.classList.remove('light-theme');
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
            if (icon) icon.textContent = '✓';
            if (text) text.textContent = 'Tamamla';
            if (btn) btn.classList.add('active');
            this.showToast('Çıkarmak istediğiniz hızlı seçeneğin üzerindeki ✕ butonuna dokunun');
        } else {
            if (icon) icon.textContent = '🗑️';
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
            this.socket = io({ reconnectionDelay: 1000, reconnectionAttempts: 10 });

            this.socket.on('connect', () => {
                this.updateConnectionStatus(true, 'Canlı Bağlı');
            });

            this.socket.on('disconnect', () => {
                this.updateConnectionStatus(false, 'Bağlantı Kesildi');
            });

            this.socket.on('init', (data) => {
                if (data.items) {
                    this.items = data.items;
                    this.render();
                }
                if (data.suppliers) {
                    this.suppliers = data.suppliers;
                    this.populateSupplierSelects();
                }
                if (data.settings && data.settings.app_icon) {
                    this.handleReceivedIconSetting(data.settings.app_icon);
                }
                if (data.settings && data.settings.app_name) {
                    this.handleReceivedNameSetting(data.settings.app_name);
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
                if (existingIdx === -1) {
                    this.items.unshift(newItem);
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
                    this.render();
                }
            });

            this.socket.on('item:deleted', (data) => {
                const targetId = typeof data === 'object' ? data.id : data;
                this.items = this.items.filter(i => i.id !== targetId);
                if (window.soundManager && window.soundManager.playDelete) {
                    window.soundManager.playDelete();
                }
                this.render();
            });

            this.socket.on('items:bulk-deleted', () => {
                this.items.forEach(i => {
                    if (i.status === 'completed') i.status = 'deleted';
                });
                this.render();
            });

            this.socket.on('items:all-restored', () => {
                this.items.forEach(i => {
                    if (i.status === 'deleted') i.status = 'pending';
                });
                this.render();
            });

            this.socket.on('items:trash-emptied', () => {
                this.items = this.items.filter(i => i.status !== 'deleted');
                this.render();
            });

            this.socket.on('backup:imported', (data) => {
                if (data.items) this.items = data.items;
                if (data.suppliers) {
                    this.suppliers = data.suppliers;
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
            if (isLive) {
                badge.className = 'badge-live';
                badge.style.background = '';
                badge.style.color = '';
            } else {
                badge.className = 'badge-live';
                badge.style.background = 'rgba(239, 68, 68, 0.15)';
                badge.style.color = '#ef4444';
            }
        }
    }

    // Load Data
    async loadInitialData() {
        try {
            const res = await fetch('/api/items');
            if (res.ok) {
                this.items = await res.json();
                this.render();
            }
        } catch (err) {
            console.warn('API yükleme hatası:', err);
        }
    }

    async loadSuppliers() {
        try {
            const res = await fetch('/api/suppliers');
            if (res.ok) {
                this.suppliers = await res.json();
                this.populateSupplierSelects();
            }
        } catch (err) {
            console.warn('Toptancı yükleme hatası:', err);
        }
    }

    populateSupplierSelects() {
        const inputSup = document.getElementById('input-supplier');
        const filterSup = document.getElementById('filter-supplier');

        if (inputSup) {
            inputSup.innerHTML = `<option value="Belirtilmedi">Toptancı Seçiniz (Opsiyonel)</option>` +
                this.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
        }

        if (filterSup) {
            filterSup.innerHTML = `<option value="all">Tüm Toptancılar</option>` +
                this.suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
        }
    }

    async loadServerInfo() {
        try {
            const res = await fetch('/api/info');
            if (res.ok) {
                const info = await res.json();
                const dbIndicator = document.getElementById('header-db-indicator');
                if (dbIndicator) {
                    dbIndicator.textContent = info.isTurso ? '☁️ Turso Bulut Veritabanı' : '💾 Yerel SQLite / LibSQL';
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
            container.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem; padding:0.75rem; text-align:center;">Kayıtlı toptancı bulunmuyor. Yukarıdan istediğiniz toptancıyı ekleyebilirsiniz.</div>';
            return;
        }

        const itemsHtml = this.suppliers.map(sup => `
            <div class="supplier-manage-item" id="sup-row-${sup.id}">
                <span class="sup-name" id="sup-name-${sup.id}" style="font-weight:600; font-size:0.9rem; color:var(--text-primary); flex:1; overflow:hidden; text-overflow:ellipsis; margin-right:0.5rem;">🏢 ${this.escapeHtml(sup.name)}</span>
                <div class="sup-actions" id="sup-actions-${sup.id}" style="display:flex; gap:0.4rem; align-items:center; flex-shrink:0;">
                    <button type="button" class="btn btn-secondary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;" title="Toptancı Adını Güncelle" onclick="window.app.startEditSupplier('${sup.id}')">
                        ✏️ Düzenle
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" style="padding:0.25rem 0.6rem; font-size:0.8rem;" title="Toptancıyı Sil" onclick="window.app.deleteSupplier('${sup.id}', '${this.escapeHtml(sup.name)}')">
                        Sil 🗑️
                    </button>
                </div>
            </div>
        `).join('');

        const clearAllHtml = `
            <div style="margin-top: 0.85rem; padding-top: 0.65rem; border-top: 1px dashed rgba(255,255,255,0.12);">
                <button type="button" class="btn btn-danger btn-sm" style="width: 100%; justify-content: center; padding: 0.55rem;" onclick="window.app.clearAllSuppliers()">
                    🗑️ Tüm Toptancıları Temizle (Boş Bırak)
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
            <form onsubmit="event.preventDefault(); window.app.saveEditSupplier('${id}');" style="display:flex; gap:0.4rem; width:100%; align-items:center;">
                <input type="text" id="sup-edit-input-${id}" value="${this.escapeHtml(sup.name)}" required style="flex:1; padding:0.35rem 0.65rem; font-size:0.85rem;" autocomplete="off">
                <button type="submit" class="btn btn-primary btn-sm" style="padding:0.35rem 0.65rem; font-size:0.8rem; font-weight:700;">💾 Kaydet</button>
                <button type="button" class="btn btn-secondary btn-sm" style="padding:0.35rem 0.55rem; font-size:0.8rem;" onclick="window.app.renderSuppliersModal()">✕</button>
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
            const res = await fetch(`/api/suppliers/${encodeURIComponent(id)}`, {
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
            const res = await fetch('/api/suppliers', {
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
        // Optimistic removal for instant UI feedback
        this.suppliers = this.suppliers.filter(s => s.id !== id && s.name !== name);
        this.populateSupplierSelects();
        this.renderSuppliersModal();
        this.showToast(`Toptancı Silindi: ${name}`);

        try {
            await fetch(`/api/suppliers/${encodeURIComponent(id)}`, { method: 'DELETE' });
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
            await fetch('/api/suppliers', { method: 'DELETE' });
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

        // Search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.render();
            });
        }

        // Filters
        const statusFilter = document.getElementById('filter-status');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filterStatus = e.target.value;
                document.querySelectorAll('.chip-filter').forEach(c => {
                    c.classList.toggle('active', c.dataset.filter === this.filterStatus);
                });
                this.render();
            });
        }

        const supFilter = document.getElementById('filter-supplier');
        if (supFilter) {
            supFilter.addEventListener('change', (e) => {
                this.activeSupplier = e.target.value;
                this.render();
            });
        }

        // Tab Views (Tüm Liste / Toptancıya Göre)
        document.querySelectorAll('.tab-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
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
                document.querySelectorAll('.chip-filter').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.filterStatus = chip.dataset.filter;
                
                // Sync with dropdown filter if applicable
                const filterDropdown = document.getElementById('filter-status');
                if (filterDropdown && ['all', 'pending', 'ordered', 'completed', 'trash'].includes(this.filterStatus)) {
                    filterDropdown.value = this.filterStatus;
                } else if (filterDropdown) {
                    filterDropdown.value = 'all';
                }

                this.render();
            });
        });

        // PDF Export & Print
        const btnPdf = document.getElementById('btn-export-pdf');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                window.exportManager.printOrderSheet(this.items, 'App');
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
    }

    // Smart Duplicate Check & Item Submission
    checkAndAddItem() {
        const nameInput = document.getElementById('input-name');
        const qtyInput = document.getElementById('input-quantity');
        const supInput = document.getElementById('input-supplier');
        const urgInput = document.getElementById('input-urgency');

        const name = nameInput.value.trim();
        if (!name) {
            nameInput.focus();
            return;
        }

        const candidateItem = {
            name: name,
            quantity: qtyInput.value.trim() || '1 adet',
            category: 'Genel',
            supplier: supInput ? supInput.value : 'Belirtilmedi',
            urgency: urgInput ? urgInput.value : 'normal',
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
                    btnUpdateQty.innerHTML = '<span>↩️</span> <span>Silinenlerden Geri Yükle ve Listeye Ekle</span>';
                } else {
                    btnUpdateQty.innerHTML = '<span>➕</span> <span>Mevcut Ürünün Miktarını Güncelle / Artır</span>';
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
            notes: (existing.notes ? existing.notes + ' | ' : '') + `Eklenen: ${candidate.quantity}`
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
            card.style.transition = 'background 0.5s ease';
            card.style.background = 'rgba(79, 70, 229, 0.4)';
            setTimeout(() => { card.style.background = ''; }, 1500);
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
        if (nameInput) {
            nameInput.value = '';
            nameInput.focus();
        }
        if (qtyInput) qtyInput.value = '1 adet';

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
        try {
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });

            if (!res.ok) {
                throw new Error('Kayıt hatası');
            }
        } catch (e) {
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
            Object.assign(item, updates);
            this.render();
        }

        try {
            await fetch(`/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
        } catch (e) {
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
        item.status = 'deleted';
        item.updatedAt = new Date().toISOString();

        if (window.soundManager && window.soundManager.playDelete) {
            window.soundManager.playDelete();
        }
        this.render();

        // Show floating Undo toast for 6.5s
        this.showUndoToast(item, oldStatus);

        try {
            await fetch(`/api/items/${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error('Silme hatası:', e);
        }
    }

    // Floating Undo Toast (1-click restore)
    showUndoToast(item, previousStatus = 'pending') {
        document.querySelectorAll('.toast-undo-container').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'toast-undo-container';
        toast.innerHTML = `
            <span>🗑️ <strong>${this.escapeHtml(item.name)}</strong> silindi.</span>
            <button type="button" class="toast-undo-btn" id="btn-undo-delete">↩️ Geri Al</button>
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

        item.status = targetStatus || 'pending';
        item.updatedAt = new Date().toISOString();

        if (window.soundManager && window.soundManager.playCompleted) {
            window.soundManager.playCompleted();
        }
        this.render();
        this.showToast(`↩️ Geri Yüklendi: ${item.name}`);

        try {
            await fetch(`/api/items/${id}/restore`, { method: 'POST' });
        } catch (e) {
            console.error('Geri yükleme hatası:', e);
        }
    }

    // Restore All Deleted Items in 1 click
    async restoreAllDeleted() {
        const deletedItems = this.items.filter(i => i.status === 'deleted');
        if (deletedItems.length === 0) {
            this.showToast('Çöp kutusunda geri yüklenecek ürün yok.');
            return;
        }

        deletedItems.forEach(i => {
            i.status = 'pending';
            i.updatedAt = new Date().toISOString();
        });

        if (window.soundManager && window.soundManager.playCompleted) {
            window.soundManager.playCompleted();
        }
        this.render();
        this.showToast(`✅ ${deletedItems.length} ürün listeye geri yüklendi!`);

        try {
            await fetch('/api/items/restore-all', { method: 'POST' });
        } catch (e) {
            console.error('Toplu geri yükleme hatası:', e);
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
                this.items = this.items.filter(i => i.status !== 'deleted');
                this.render();
                this.showToast('Çöp kutusu tamamen boşaltıldı.');
                try {
                    await fetch('/api/items/trash/empty', { method: 'DELETE' });
                } catch (e) {
                    console.error('Çöp boşaltma hatası:', e);
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
                this.items = this.items.filter(i => i.id !== id);
                if (window.soundManager && window.soundManager.playDelete) {
                    window.soundManager.playDelete();
                }
                this.render();
                this.showToast(`Kalıcı olarak silindi: ${name}`);

                try {
                    await fetch(`/api/items/${id}?permanent=true`, { method: 'DELETE' });
                } catch (e) {
                    console.error('Kalıcı silme hatası:', e);
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
            btnConfirm.innerHTML = '<span>⏳</span><span>Yükleniyor...</span>';
        }

        try {
            const res = await fetch('/api/backup/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.success) {
                this.closeAllModals();
                this.showToast(`✅ ${data.importedItemsCount} ürün başarıyla içe aktarıldı!`);
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
                btnConfirm.innerHTML = '<span>📥</span><span>Yedeği Şimdi Yükle</span>';
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
            const res = await fetch('/api/backups');
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
            [btn1, btn2].forEach(btn => {
                if (btn) {
                    btn.disabled = loading;
                    btn.innerHTML = loading
                        ? '<span>⏳</span><span>Yedekleniyor...</span>'
                        : '<span>💾</span><span>Şimdi Yedek Al</span>';
                }
            });
        };

        setButtons(true);
        try {
            const res = await fetch('/api/backups/create', { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                this.showToast(`🛡️ ${data.backup ? data.backup.totalItems : this.items.length} ürünün anlık yedeği sunucuya başarıyla kaydedildi!`);
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

        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #94a3b8; font-size: 0.88rem;">
                ⏳ Yedekler sunucudan çekiliyor...
            </div>
        `;

        try {
            const res = await fetch('/api/backups');
            if (!res.ok) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #f87171; font-size: 0.88rem;">
                        ⚠️ Yedekler yüklenemedi.
                    </div>
                `;
                return;
            }

            const data = await res.json();
            const backups = data.backups || [];

            if (data.lastBackup) {
                this.updateLastBackupDisplay(data.lastBackup);
            }

            if (backups.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2.5rem 1rem; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛡️</div>
                        <div style="font-weight: 700; color: #f8fafc; margin-bottom: 0.35rem;">Henüz Yedek Kaydı Yok</div>
                        <div style="font-size: 0.82rem;">"Şimdi Yeni Yedek Al" butonuna basarak ilk güvenli yedeğinizi hemen alabilirsiniz.</div>
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
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem 0.9rem; background: ${isLatest ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.03)'}; border: 1px solid ${isLatest ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.08)'}; border-radius: var(--radius-sm); transition: all 0.2s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                                    <strong style="font-size: 0.9rem; color: #f8fafc;">📅 ${dateDisplay}</strong>
                                    ${isLatest ? '<span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.68rem; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 800;">EN SON YEDEK</span>' : ''}
                                    <span style="background: rgba(255, 255, 255, 0.08); color: #cbd5e1; font-size: 0.7rem; padding: 0.15rem 0.45rem; border-radius: 4px;">${this.escapeHtml(reasonBadge)}</span>
                                </div>
                                <div style="display: flex; gap: 0.6rem; margin-top: 0.3rem; font-size: 0.78rem; color: #94a3b8; flex-wrap: wrap;">
                                    <span>📦 <strong>${b.totalItems}</strong> Ürün</span>
                                    <span>🏢 <strong>${b.suppliersCount || 0}</strong> Toptancı</span>
                                    <span>💾 ${formattedSize}</span>
                                </div>
                            </div>

                            <div style="display: flex; gap: 0.45rem; align-items: center; flex-shrink: 0;">
                                <a href="/api/backups/download/${encodeURIComponent(b.filename)}" download class="btn btn-secondary btn-sm" style="padding: 0.35rem 0.65rem; font-size: 0.78rem; text-decoration: none;" title="JSON Dosyasını Bilgisayara İndir">
                                    📥 İndir
                                </a>
                                <button type="button" class="btn btn-primary btn-sm" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 700; background: linear-gradient(135deg, #4f46e5, #7c3aed);" title="Dükkan Verilerini Bu Tarihe Geri Döndür" onclick="window.app.confirmRestoreServerBackup('${this.escapeHtml(b.filename)}', '${this.escapeHtml(dateDisplay)}', ${b.totalItems})">
                                    🔄 Geri Yükle
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        } catch (e) {
            console.error('Render backups error:', e);
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #f87171; font-size: 0.88rem;">
                    ⚠️ Yedekler listelenirken hata oluştu.
                </div>
            `;
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

    async executeRestoreServerBackup(filename) {
        this.showToast('⏳ Yedek geri yükleniyor...');
        try {
            const res = await fetch(`/api/backups/${encodeURIComponent(filename)}/restore`, {
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

        const completedCount = this.items.filter(i => i.status === 'completed').length;
        if (completedCount === 0) {
            this.showToast('Temizlenecek tamamlanmış ürün bulunmuyor.');
            return;
        }

        // Soft-delete completed items so they are safe in Çöp Kutusu!
        this.items.forEach(i => {
            if (i.status === 'completed') i.status = 'deleted';
        });
        this.render();
        this.showToast(`${completedCount} tamamlanmış ürün çöp kutusuna taşındı (güvende).`);

        try {
            await fetch('/api/items/clear-completed', { method: 'POST' });
        } catch (e) {
            console.error('Temizleme hatası:', e);
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
        const quickIcon = document.getElementById('quick-push-icon');
        const quickLabel = document.getElementById('quick-push-label');
        const hint = document.getElementById('push-info-hint');

        if (!supported) {
            if (badge) {
                badge.textContent = '⚪ Desteklenmiyor';
                badge.style.background = 'rgba(148, 163, 184, 0.15)';
                badge.style.color = '#94a3b8';
            }
            if (btnText) btnText.textContent = 'Tarayıcı Desteklemiyor';
            if (quickLabel) quickLabel.textContent = 'Desteklenmiyor';
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '💡 <em>iPhone kullanıyorsanız Safari\'de "Paylaş > Ana Ekrana Ekle" yaparak telefon bildirimlerini açabilirsiniz.</em>';
            }
            return;
        }

        if (Notification.permission === 'denied') {
            if (badge) {
                badge.textContent = '🔴 Engellendi';
                badge.style.background = 'rgba(239, 68, 68, 0.15)';
                badge.style.color = '#f87171';
            }
            if (btnText) btnText.textContent = 'Bildirim İzni Engellenmiş';
            if (quickLabel) quickLabel.textContent = 'Engellendi';
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '⚠️ <em>Bildirim izni engellenmiş. Tarayıcı adres çubuğundaki kilit simgesine dokunup Bildirimlere İzin Verin.</em>';
            }
            return;
        }

        if (this.isPushSubscribed) {
            if (badge) {
                badge.textContent = '🟢 Açık (Aktif)';
                badge.style.background = 'rgba(16, 185, 129, 0.15)';
                badge.style.color = '#34d399';
            }
            if (btnText) btnText.textContent = 'Bu Telefonda Bildirimleri Kapat';
            if (btnIcon) btnIcon.textContent = '🔕';
            if (quickIcon) quickIcon.textContent = '🔔';
            if (quickLabel) quickLabel.textContent = 'Bildirim Açık';
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '✅ <em>Bu telefonda bildirimler aktif! Başka biri yeni ürün eklediğinde telefonunuza sesli/titreşimli bildirim gelecektir.</em>';
            }
        } else {
            if (badge) {
                badge.textContent = '⚪ Kapalı';
                badge.style.background = 'rgba(148, 163, 184, 0.15)';
                badge.style.color = '#94a3b8';
            }
            if (btnText) btnText.textContent = 'Bu Telefonda Bildirimleri Aç';
            if (btnIcon) btnIcon.textContent = '🔔';
            if (quickIcon) quickIcon.textContent = '🔕';
            if (quickLabel) quickLabel.textContent = 'Bildirim Aç';
            if (hint) {
                hint.style.display = 'block';
                hint.innerHTML = '💡 <em>Yeni ürünler eklendiğinde telefonunuzun çalması için "Bildirimleri Aç" butonuna dokunun.</em>';
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
                    await fetch('/api/push/unsubscribe', {
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
                const keyRes = await fetch('/api/push/public-key');
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
                const subRes = await fetch('/api/push/subscribe', {
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
                        fetch('/api/push/test', { method: 'POST' }).catch(() => {});
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
            btn.textContent = '⏳ Gönderiliyor...';
        }

        try {
            const res = await fetch('/api/push/test', { method: 'POST' });
            if (res.ok) {
                this.showToast('🧪 Test bildirimi telefonunuza gönderildi! Üst bildirim çubuğunu kontrol edin.');
            } else {
                this.showToast('Test bildirimi gönderilemedi.');
            }
        } catch (e) {
            this.showToast('Sunucu bağlantı hatası.');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span>🧪</span><span>Test Bildirimi Gönder</span>';
            }
        }
    }

    startVoiceInput() {

        const voiceModal = document.getElementById('voice-modal');
        const voiceText = document.getElementById('voice-transcript-text');
        this.openModal('voice-modal');
        if (voiceText) voiceText.textContent = 'Dinleniyor... (Örn: "10 kutu sunta vidası")';

        const micBtn = document.getElementById('btn-voice-input');
        if (micBtn) micBtn.classList.add('listening');

        window.speechManager.start(
            (parsed, rawText) => {
                if (voiceText) voiceText.textContent = `Algılandı: "${rawText}"`;

                const nameInput = document.getElementById('input-name');
                const qtyInput = document.getElementById('input-quantity');
                const urgInput = document.getElementById('input-urgency');

                if (nameInput) nameInput.value = parsed.name;
                if (qtyInput && parsed.quantity) qtyInput.value = parsed.quantity;
                if (urgInput && parsed.urgency) urgInput.value = parsed.urgency;

                setTimeout(() => {
                    this.closeAllModals();
                    if (micBtn) micBtn.classList.remove('listening');
                    this.checkAndAddItem();
                }, 900);
            },
            (errorMsg) => {
                if (voiceText) voiceText.textContent = errorMsg;
                if (micBtn) micBtn.classList.remove('listening');
                setTimeout(() => this.closeAllModals(), 2000);
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
        if (modal) modal.classList.add('active');
    }

    openAdminModal() {
        const nameInput = document.getElementById('input-app-name');
        if (nameInput) nameInput.value = this.appName || 'App';
        this.updateSoundButtonUI();
        this.updatePushUI(!!('serviceWorker' in navigator && 'PushManager' in window));
        this.fetchAndDisplayLastBackup();
        this.openModal('password-modal');
    }



    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        window.speechManager.stop();
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.65rem 1.25rem;
            border-radius: 9999px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            font-size: 0.875rem;
            font-weight: 600;
            z-index: 200;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    getFilteredItems() {
        return this.items.filter(item => {
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

        // Progress Bar
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const fillBar = document.getElementById('progress-fill-bar');
        const percentText = document.getElementById('progress-percent-text');
        if (fillBar) fillBar.style.width = `${percent}%`;
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

    render() {
        this.saveOfflineBackup();
        this.renderStats();
        const container = document.getElementById('items-container');
        if (!container) return;

        const filtered = this.getFilteredItems();

        if (filtered.length === 0) {
            if (this.filterStatus === 'trash') {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🛡️</div>
                        <h3 style="font-weight:700; margin-bottom:0.35rem;">Silinen Ürün Yok</h3>
                        <p style="font-size:0.875rem;">Silinmiş herhangi bir ürün bulunmuyor. Tüm ürünleriniz ana listede güvende!</p>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">✨</div>
                        <h3 style="font-weight:700; margin-bottom:0.35rem;">Eksik Ürün Bulunamadı</h3>
                        <p style="font-size:0.875rem;">Harika! Listede filtrelere uyan bir eksik yok veya tüm siparişler tamamlandı.</p>
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
                        <span style="font-size: 1.8rem;">🛡️</span>
                        <div>
                            <div class="trash-banner-title">Silinenler & Çöp Kutusu (${trashCount} Ürün)</div>
                            <div class="trash-banner-desc">Sildiğiniz hiçbir ürün kaybolmaz! Buradan dilediğiniz zaman tek tıkla geri yükleyebilir veya kalıcı olarak silebilirsiniz.</div>
                        </div>
                    </div>
                    <div class="trash-banner-actions">
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.app.restoreAllDeleted()" ${trashCount === 0 ? 'disabled' : ''}>
                            <span>↩️</span>
                            <span>Tümünü Geri Yükle</span>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="window.app.emptyTrash()" ${trashCount === 0 ? 'disabled' : ''}>
                            <span>🧹</span>
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

        let html = '';
        Object.keys(groups).forEach(supplier => {
            const groupItems = groups[supplier];
            html += `
                <div class="supplier-group-card">
                    <div class="supplier-group-header">
                        <div class="supplier-group-info">
                            <span class="supplier-name">👤 ${supplier}</span>
                            <span class="supplier-count-badge">${groupItems.length} Çeşit</span>
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
        // Special Trash Card if item is soft-deleted
        if (item.status === 'deleted') {
            return `
                <div class="item-card" id="card-${item.id}" style="opacity: 0.9; border-color: rgba(239, 68, 68, 0.35);">
                    <div class="card-body-top">
                        <div class="item-main-info" style="width: 100%;">
                            <div class="item-title-row">
                                <span class="urgency-badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171;">🗑️ Silinenlerde</span>
                                <h3 class="item-title" style="text-decoration: line-through; color: #94a3b8;">${this.escapeHtml(item.name)}</h3>
                            </div>
                            <div class="item-meta-row">
                                <span class="meta-tag quantity">📦 ${this.escapeHtml(item.quantity || '1 adet')}</span>
                                <span class="meta-tag supplier">🏢 ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                                <span class="meta-tag time">🕒 ${this.formatTime(item.updatedAt || item.createdAt)}</span>
                            </div>
                            ${item.notes ? `<div class="item-note-text">📝 ${this.escapeHtml(item.notes)}</div>` : ''}
                        </div>
                    </div>

                    <div class="card-body-bottom" style="border-top: 1px solid rgba(239, 68, 68, 0.15); padding-top: 0.6rem;">
                        <span style="font-size: 0.78rem; color: #94a3b8;">🛡️ Silinenler listesinde güvende</span>
                        <div class="item-actions">
                            <button type="button" class="btn btn-primary btn-sm" style="padding: 0.35rem 0.75rem; font-weight: 700;" title="Listeye Geri Yükle" onclick="event.stopPropagation(); window.app.restoreItem('${item.id}')">
                                ↩️ Geri Yükle
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" style="padding: 0.35rem 0.65rem;" title="Kalıcı Olarak Sil" onclick="event.stopPropagation(); window.app.permanentDeleteItem('${item.id}')">
                                ❌ Kalıcı Sil
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

        return `
            <div class="item-card ${urgencyClass} ${isCompleted ? 'completed' : ''} ${hasPhoto ? 'item-card-with-photo' : ''}" id="card-${item.id}">
                <div class="card-body-top">
                    <button class="status-toggle-btn" title="${isCompleted ? 'Tekrar Bekliyor Yap' : 'Alındı / Tamamlandı Olarak İşaretle'}" onclick="window.app.updateStatus('${item.id}', '${isCompleted ? 'pending' : 'completed'}')">
                        ✓
                    </button>

                    ${hasPhoto ? `
                        <img src="${item.image}" class="item-photo-thumb" title="Büyük Fotoğrafı Gör" onclick="window.app.openLightbox('${item.id}')">
                    ` : ''}

                    <div class="item-main-info">
                        <div class="item-title-row">
                            <span class="item-title" title="Düzenlemek için tıklayın" style="cursor: pointer;" onclick="event.stopPropagation(); window.app.openEditItemModal('${item.id}')">${this.escapeHtml(item.name)}</span>
                            <div class="qty-control-group">
                                <button type="button" class="btn-qty-step" title="Miktarı 1 Azalt" onclick="window.app.quickAdjustQuantity('${item.id}', -1)">−</button>
                                <span class="item-qty-badge">${this.escapeHtml(item.quantity)}</span>
                                <button type="button" class="btn-qty-step" title="Miktarı 1 Artır" onclick="window.app.quickAdjustQuantity('${item.id}', 1)">+</button>
                            </div>
                            <span class="urgency-badge ${urgencyClass}">${urgencyLabels[item.urgency] || 'Normal'}</span>
                        </div>
                        <div class="item-meta-row">
                            <span class="meta-tag supplier">🏢 ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                            <span class="meta-tag time">🕒 ${this.formatTime(item.createdAt)}</span>
                            ${item.source === 'phone' ? '<span class="meta-tag" title="Telefondan Eklendi">📱 Mobil</span>' : '<span class="meta-tag" title="Bilgisayardan Eklendi">💻 PC</span>'}
                        </div>
                        ${item.notes ? `<div class="item-note-text">📝 ${this.escapeHtml(item.notes)}</div>` : ''}
                    </div>
                </div>

                <div class="card-body-bottom">
                    <div class="status-pill-group">
                        <button class="status-pill-btn ${item.status === 'pending' ? 'active pending' : ''}" onclick="window.app.updateStatus('${item.id}', 'pending')">Bekliyor</button>
                        <button class="status-pill-btn ${item.status === 'ordered' ? 'active ordered' : ''}" onclick="window.app.updateStatus('${item.id}', 'ordered')">Sipariş Edildi</button>
                        <button class="status-pill-btn ${item.status === 'completed' ? 'active completed' : ''}" onclick="window.app.updateStatus('${item.id}', 'completed')">Alındı</button>
                    </div>

                    <div class="item-actions">
                        <button type="button" class="btn btn-secondary btn-icon-only" title="Ürünü Düzenle" onclick="event.stopPropagation(); window.app.openEditItemModal('${item.id}')">
                            ✏️
                        </button>
                        <button type="button" class="btn btn-secondary btn-icon-only" title="Fotoğraf Ekle / Değiştir" onclick="event.stopPropagation(); window.app.triggerCardPhotoUpload('${item.id}')">
                            📷
                        </button>
                        <button type="button" 
                                id="delete-btn-${item.id}"
                                class="btn btn-danger btn-icon-only" 
                                title="Sil" 
                                onclick="event.stopPropagation(); window.app.deleteItem('${item.id}', event)">
                            🗑️
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
        const pendingItems = this.items.filter(i => i.status !== 'completed');
        if (pendingItems.length === 0) {
            this.showToast('Kopyalanacak bekleyen eksik ürün bulunmuyor.');
            return;
        }

        const dateStr = new Date().toLocaleDateString('tr-TR');
        let text = `📦 APP - EKSİK & SİPARİŞ LİSTESİ (${dateStr})\n\n`;

        pendingItems.forEach((item, idx) => {
            const urgTag = item.urgency === 'critical' ? ' [YOK SATAN]' : (item.urgency === 'urgent' ? ' [ACİL]' : '');
            text += `${idx + 1}. ${item.name} - ${item.quantity}${urgTag}${item.supplier && item.supplier !== 'Belirtilmedi' ? ' (' + item.supplier + ')' : ''}\n`;
        });

        try {
            await navigator.clipboard.writeText(text);
            this.showToast(`📋 ${pendingItems.length} eksik panoya kopyalandı!`);
            window.soundManager.playCompleted();
        } catch (e) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            this.showToast(`📋 ${pendingItems.length} eksik panoya kopyalandı!`);
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
            if (changeBtn) changeBtn.textContent = '📷 Değiştir';
        } else {
            if (preview) {
                preview.src = '';
                preview.style.display = 'none';
            }
            if (text) text.textContent = 'Fotoğraf yok';
            if (removeBtn) removeBtn.style.display = 'none';
            if (changeBtn) changeBtn.textContent = '📷 Fotoğraf Ekle';
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
            alert('Ürün adı boş bırakılamaz.');
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
            const res = await fetch('/api/settings');
            if (res.ok) {
                const settings = await res.json();
                if (settings.app_icon) {
                    this.handleReceivedIconSetting(settings.app_icon);
                }
                if (settings.app_name) {
                    this.handleReceivedNameSetting(settings.app_name);
                }
            }
        } catch (err) {
            console.warn('Ayarlar yüklenemedi:', err);
        }
    }

    applyAppName(name) {
        const appName = (name || 'App').trim();
        this.appName = appName;

        const titleText = document.getElementById('app-title-text');
        if (titleText) titleText.textContent = appName;

        const loginTitle = document.getElementById('login-title-text');
        if (loginTitle) loginTitle.textContent = appName;

        const printTitle = document.getElementById('print-app-title');
        if (printTitle) printTitle.textContent = appName.toUpperCase() + ' - SİPARİŞ LİSTESİ';

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
            const res = await fetch('/api/settings', {
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

        if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔔';
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
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="%236366f1"/><text x="50" y="68" font-size="56" text-anchor="middle">' + char + '</text></svg>';
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
            await fetch('/api/settings', {
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

