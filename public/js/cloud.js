// Cloud Sync Manager (Firebase Firestore & Remote Sync)
class CloudSyncManager {
    constructor() {
        this.firebaseApp = null;
        this.firestore = null;
        this.unsubscribe = null;
        this.isEnabled = false;
        this.cloudConfig = this.loadConfig();
    }

    loadConfig() {
        try {
            const saved = localStorage.getItem('firebase_cloud_config');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    }

    saveConfig(config) {
        this.cloudConfig = config;
        localStorage.setItem('firebase_cloud_config', JSON.stringify(config));
    }

    removeConfig() {
        this.cloudConfig = null;
        localStorage.removeItem('firebase_cloud_config');
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        this.isEnabled = false;
    }

    async initFirebase(onSyncItems) {
        if (!this.cloudConfig || !this.cloudConfig.apiKey || !this.cloudConfig.projectId) {
            return false;
        }

        try {
            // Check if firebase SDK is loaded
            if (typeof firebase === 'undefined') {
                console.warn('Firebase SDK henüz yüklenmedi.');
                return false;
            }

            if (!firebase.apps.length) {
                this.firebaseApp = firebase.initializeApp(this.cloudConfig);
            } else {
                this.firebaseApp = firebase.app();
            }

            this.firestore = firebase.firestore();
            this.isEnabled = true;

            // Setup real-time listener on 'missing_items' collection
            const collectionName = this.cloudConfig.collectionName || 'shop_missing_items';
            this.unsubscribe = this.firestore.collection(collectionName)
                .orderBy('createdAt', 'desc')
                .onSnapshot((snapshot) => {
                    const cloudItems = [];
                    snapshot.forEach((doc) => {
                        cloudItems.push({ id: doc.id, ...doc.data() });
                    });
                    if (onSyncItems) {
                        onSyncItems(cloudItems);
                    }
                }, (err) => {
                    console.error('Firebase Firestore dinleme hatası:', err);
                });

            return true;
        } catch (err) {
            console.error('Firebase başlatılamadı:', err);
            this.isEnabled = false;
            return false;
        }
    }

    async addItem(item) {
        if (!this.isEnabled || !this.firestore) return false;
        try {
            const collectionName = this.cloudConfig.collectionName || 'shop_missing_items';
            const { id, ...data } = item;
            await this.firestore.collection(collectionName).doc(id).set(data);
            return true;
        } catch (e) {
            console.error('Firebase ekleme hatası:', e);
            return false;
        }
    }

    async updateItem(id, updates) {
        if (!this.isEnabled || !this.firestore) return false;
        try {
            const collectionName = this.cloudConfig.collectionName || 'shop_missing_items';
            await this.firestore.collection(collectionName).doc(id).update(updates);
            return true;
        } catch (e) {
            console.error('Firebase güncelleme hatası:', e);
            return false;
        }
    }

    async deleteItem(id) {
        if (!this.isEnabled || !this.firestore) return false;
        try {
            const collectionName = this.cloudConfig.collectionName || 'shop_missing_items';
            await this.firestore.collection(collectionName).doc(id).delete();
            return true;
        } catch (e) {
            console.error('Firebase silme hatası:', e);
            return false;
        }
    }
}

window.cloudSyncManager = new CloudSyncManager();
