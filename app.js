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
        this.editingItemId = null;
        this.editingItemPhoto = '';
        this.appIcon = localStorage.getItem('dukkan_app_icon') || '⚡';
        this.appIconIsImage = localStorage.getItem('dukkan_app_icon_is_image') === '1';
        this.tempIconValue = this.appIcon;
        this.tempIconIsImage = this.appIconIsImage;

        this.init();
    }

    async init() {
        this.applyAppIcon(this.appIcon, this.appIconIsImage);
        this.initTheme();
        this.initAuth();
        this.initEventListeners();
        this.initPhotoHandlers();
        this.loadSettings();

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
                if (confirm('Oturumu kapatmak istediğinize emin misiniz?')) {
                    localStorage.removeItem('dukkan_token');
                    localStorage.removeItem('dukkan_username');
                    this.authToken = null;
                    this.showLoginScreen();
                }
            });
        }

        const userSettingsBtn = document.getElementById('btn-open-user-settings');
        if (userSettingsBtn) {
            userSettingsBtn.addEventListener('click', () => {
                this.openModal('password-modal');
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
        const savedTheme = localStorage.getItem('theme_mode') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) themeBtn.textContent = '🌙';
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme_mode', isLight ? 'light' : 'dark');
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) themeBtn.textContent = isLight ? '🌙' : '☀️';
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
            });

            this.socket.on('setting:updated', (data) => {
                if (data.key === 'app_icon') {
                    this.handleReceivedIconSetting(data.value);
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
                    this.render();
                }
            });

            this.socket.on('item:deleted', (data) => {
                this.items = this.items.filter(i => i.id !== data.id);
                window.soundManager.playDelete();
                this.render();
            });

            this.socket.on('items:bulk-deleted', () => {
                this.items = this.items.filter(i => i.status !== 'completed');
                this.render();
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
            container.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem; padding:0.5rem;">Kayıtlı toptancı bulunmuyor. Yukarıdan ekleyebilirsiniz.</div>';
            return;
        }

        container.innerHTML = this.suppliers.map(sup => `
            <div class="supplier-manage-item">
                <span style="font-weight:600; font-size:0.9rem;">👤 ${this.escapeHtml(sup.name)}</span>
                <button class="btn btn-danger btn-sm" style="padding:0.25rem 0.5rem;" title="Toptancıyı Sil" onclick="window.app.deleteSupplier('${sup.id}', '${this.escapeHtml(sup.name)}')">
                    Sil 🗑️
                </button>
            </div>
        `).join('');
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
                alert(err.error || 'Toptancı eklenemedi.');
            }
        } catch (e) {
            alert('Sunucu hatası.');
        }
    }

    async deleteSupplier(id, name) {
        if (!confirm(`"${name}" toptancısını silmek istediğinize emin misiniz?`)) return;

        try {
            const res = await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
            if (res.ok) {
                this.suppliers = this.suppliers.filter(s => s.id !== id);
                this.populateSupplierSelects();
                this.renderSuppliersModal();
                this.showToast(`Toptancı Silindi: ${name}`);
            }
        } catch (e) {
            alert('Silme hatası.');
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

        // PDF Export & Print
        const btnPdf = document.getElementById('btn-export-pdf');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                window.exportManager.printOrderSheet(this.items, 'Dükkan');
            });
        }

        // Clear completed
        const btnClear = document.getElementById('btn-clear-completed');
        if (btnClear) {
            btnClear.addEventListener('click', () => this.clearCompletedItems());
        }

        // Sound Mute Toggle
        const btnMute = document.getElementById('btn-toggle-sound');
        if (btnMute) {
            btnMute.textContent = window.soundManager.muted ? '🔇' : '🔔';
            btnMute.addEventListener('click', () => {
                const isMuted = window.soundManager.toggleMute();
                btnMute.textContent = isMuted ? '🔇' : '🔔';
                this.showToast(isMuted ? 'Sesler Kapatıldı' : 'Sesler Açıldı');
            });
        }

        // Theme Toggle
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

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

        // Close buttons
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
                const statusMap = { pending: 'Bekliyor', ordered: 'Sipariş Edildi', completed: 'Alındı' };
                modalStatus.textContent = statusMap[duplicateMatch.item.status] || duplicateMatch.item.status;
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

        const updatedQty = `${existing.quantity} + ${candidate.quantity}`;

        this.closeAllModals();
        this.pendingDuplicateItem = null;
        this.resetAddForm();

        const updates = {
            quantity: updatedQty,
            notes: (existing.notes ? existing.notes + ' | ' : '') + `Eklenen: ${candidate.quantity}`
        };

        // If candidate had a photo and existing didn't, attach it!
        if (candidate.image && !existing.image) {
            updates.image = candidate.image;
        }

        await this.updateItemDetails(existing.id, updates);
        this.showToast(`Miktar Güncellendi: ${existing.name} -> ${updatedQty}`);
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
            alert('Ürün eklenemedi.');
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

    async deleteItem(id) {
        if (!confirm('Bu ürünü listeden silmek istediğinize emin misiniz?')) return;

        this.items = this.items.filter(i => i.id !== id);
        window.soundManager.playDelete();
        this.render();

        try {
            await fetch(`/api/items/${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error('Silme hatası:', e);
        }
    }

    async clearCompletedItems() {
        const completedCount = this.items.filter(i => i.status === 'completed').length;
        if (completedCount === 0) {
            alert('Temizlenecek tamamlanmış ürün bulunmuyor.');
            return;
        }

        if (!confirm(`${completedCount} adet tamamlanmış ürün listeden kalıcı olarak temizlensin mi?`)) return;

        this.items = this.items.filter(i => i.status !== 'completed');
        this.render();

        try {
            await fetch('/api/items/clear-completed', { method: 'POST' });
        } catch (e) {
            console.error('Temizleme hatası:', e);
        }
    }

    startVoiceInput() {
        const voiceModal = document.getElementById('voice-modal');
        const voiceText = document.getElementById('voice-transcript-text');
        this.openModal('voice-modal');
        if (voiceText) voiceText.textContent = 'Dinleniyor... (Örn: "12 li defter")';

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

    openEditItemModal(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        this.editingItemId = itemId;
        this.editingItemPhoto = item.image || '';

        // Populate suppliers in edit modal select
        const supSelect = document.getElementById('edit-item-supplier');
        if (supSelect) {
            supSelect.innerHTML = `<option value="Belirtilmedi">Belirtilmedi</option>` +
                this.suppliers.map(s => `<option value="${this.escapeHtml(s.name)}">${this.escapeHtml(s.name)}</option>`).join('');
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
        if (nameEl) {
            setTimeout(() => nameEl.focus(), 100);
        }
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
        this.showToast(`Ürün Güncellendi: ${name}`);
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
            }
        } catch (err) {
            console.warn('Ayarlar yüklenemedi:', err);
        }
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
                container.innerHTML = `<img src="${this.appIcon}" alt="Logo">`;
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
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%234f46e5'/><text x='50' y='68' font-size='56' text-anchor='middle'>${char}</text></svg>`;
            faviconUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
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

        // Highlight preset if matching
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
                preview.innerHTML = `<img src="${this.tempIconValue}" alt="Logo">`;
            } else {
                preview.textContent = this.tempIconValue || '⚡';
            }
        }

        if (clearBtn) {
            clearBtn.style.display = this.tempIconIsImage ? 'inline-flex' : 'none';
        }

        if (caption) {
            caption.textContent = this.tempIconIsImage ? 'Yüklenen Özel Logo' : `Seçilen İkon: ${this.tempIconValue || '⚡'}`;
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

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
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
            if (this.filterStatus !== 'all' && item.status !== this.filterStatus) {
                return false;
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
        const total = this.items.length;
        const pending = this.items.filter(i => i.status === 'pending').length;
        const urgent = this.items.filter(i => (i.urgency === 'critical' || i.urgency === 'urgent') && i.status !== 'completed').length;
        const completed = this.items.filter(i => i.status === 'completed').length;

        const statTotal = document.getElementById('stat-total');
        const statPending = document.getElementById('stat-pending');
        const statUrgent = document.getElementById('stat-urgent');
        const statCompleted = document.getElementById('stat-completed');

        if (statTotal) statTotal.textContent = total;
        if (statPending) statPending.textContent = pending;
        if (statUrgent) statUrgent.textContent = urgent;
        if (statCompleted) statCompleted.textContent = completed;
    }

    render() {
        this.renderStats();
        const container = document.getElementById('items-container');
        if (!container) return;

        const filtered = this.getFilteredItems();

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">✨</div>
                    <h3 style="font-weight:700; margin-bottom:0.35rem;">Eksik Ürün Bulunamadı</h3>
                    <p style="font-size:0.875rem;">Harika! Listede filtrelere uyan bir eksik yok veya tüm siparişler tamamlandı.</p>
                </div>
            `;
            return;
        }

        if (this.currentView === 'bySupplier') {
            this.renderBySupplier(filtered, container);
        } else {
            this.renderListView(filtered, container);
        }
    }

    renderListView(items, container) {
        container.innerHTML = items.map(item => this.createItemCardHtml(item)).join('');
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
        const urgencyClass = item.urgency === 'critical' ? 'critical' : (item.urgency === 'urgent' ? 'urgent' : 'normal');
        const urgencyLabels = { critical: 'Yok Satıyor', urgent: 'Acil', normal: 'Normal' };
        const isCompleted = item.status === 'completed';

        const hasPhoto = !!item.image;

        return `
            <div class="item-card ${urgencyClass} ${isCompleted ? 'completed' : ''} ${hasPhoto ? 'item-card-with-photo' : ''}" id="card-${item.id}">
                <button class="status-toggle-btn" title="${isCompleted ? 'Tekrar Bekliyor Yap' : 'Alındı / Tamamlandı Olarak İşaretle'}" onclick="window.app.updateStatus('${item.id}', '${isCompleted ? 'pending' : 'completed'}')">
                    ✓
                </button>

                ${hasPhoto ? `
                    <img src="${item.image}" class="item-photo-thumb" title="Büyük Fotoğrafı Gör" onclick="window.app.openLightbox('${item.id}')">
                ` : ''}

                <div class="item-main-info">
                    <div class="item-title-row">
                        <span class="item-title" title="Düzenlemek için tıklayın" onclick="window.app.openEditItemModal('${item.id}')">${this.escapeHtml(item.name)}</span>
                        <span class="item-qty-badge">${this.escapeHtml(item.quantity)}</span>
                        <span class="urgency-badge ${urgencyClass}">${urgencyLabels[item.urgency] || 'Normal'}</span>
                    </div>
                    <div class="item-meta-row">
                        <span class="meta-tag supplier">🏢 ${this.escapeHtml(item.supplier || 'Belirtilmedi')}</span>
                        <span class="meta-tag time">🕒 ${this.formatTime(item.createdAt)}</span>
                        ${item.source === 'phone' ? '<span class="meta-tag" title="Telefondan Eklendi">📱 Mobil</span>' : '<span class="meta-tag" title="Bilgisayardan Eklendi">💻 PC</span>'}
                    </div>
                    ${item.notes ? `<div class="item-note-text">📝 ${this.escapeHtml(item.notes)}</div>` : ''}
                </div>

                <div class="status-pill-group">
                    <button class="status-pill-btn ${item.status === 'pending' ? 'active pending' : ''}" onclick="window.app.updateStatus('${item.id}', 'pending')">Bekliyor</button>
                    <button class="status-pill-btn ${item.status === 'ordered' ? 'active ordered' : ''}" onclick="window.app.updateStatus('${item.id}', 'ordered')">Sipariş Edildi</button>
                    <button class="status-pill-btn ${item.status === 'completed' ? 'active completed' : ''}" onclick="window.app.updateStatus('${item.id}', 'completed')">Alındı</button>
                </div>

                <div class="item-actions">
                    <button class="btn btn-secondary btn-icon-only" title="Ürünü Düzenle" onclick="window.app.openEditItemModal('${item.id}')">
                        ✏️
                    </button>
                    <button class="btn btn-secondary btn-icon-only" title="Fotoğraf Ekle / Değiştir" onclick="window.app.triggerCardPhotoUpload('${item.id}')">
                        📷
                    </button>
                    <button class="btn btn-danger btn-icon-only" title="Sil" onclick="window.app.deleteItem('${item.id}')">
                        🗑️
                    </button>
                </div>
            </div>
        `;
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
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {});
    }
});
