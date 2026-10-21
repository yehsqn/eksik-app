require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { client: db, initDb, isTurso } = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

const fs = require('fs');

// Auto Backup Directory & Engine Setup
const BACKUP_DIR = path.join(__dirname, 'data', 'backups');
if (!fs.existsSync(BACKUP_DIR)) {
    try {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    } catch (e) {
        console.error('Failed to create backup dir:', e);
    }
}

let lastBackupInfo = null;

function formatBackupReason(reason) {
    const map = {
        'startup': 'Sistem Başlangıcı',
        'hourly': 'Saatlik Otomatik',
        'change': 'Otomatik (Değişiklik)',
        'manual': 'Manuel Yedek',
        'pre-import': 'İçe Aktarma Öncesi Güvenlik',
        'pre-restore': 'Geri Yükleme Öncesi Güvenlik',
        'item-add': 'Ürün Eklendi',
        'item-update': 'Ürün Güncellendi',
        'item-delete': 'Ürün Silindi',
        'item-restore': 'Ürün Geri Alındı',
        'item-restore-all': 'Tümü Geri Alındı',
        'trash-empty': 'Çöp Temizlendi',
        'clear-completed': 'Tamamlananlar Arşivlendi',
        'supplier-add': 'Toptancı Eklendi',
        'supplier-update': 'Toptancı Güncellendi',
        'supplier-delete': 'Toptancı Silindi',
        'post-import': 'Yedek Yüklendi'
    };
    return map[reason] || reason;
}

function cleanOldBackups(maxKeep = 35) {
    try {
        if (!fs.existsSync(BACKUP_DIR)) return;
        const files = fs.readdirSync(BACKUP_DIR);
        const backupFiles = files
            .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
            .map(f => {
                const p = path.join(BACKUP_DIR, f);
                const stat = fs.statSync(p);
                return { filename: f, path: p, mtimeMs: stat.mtimeMs };
            })
            .sort((a, b) => b.mtimeMs - a.mtimeMs);

        if (backupFiles.length > maxKeep) {
            const toDelete = backupFiles.slice(maxKeep);
            toDelete.forEach(f => {
                try { fs.unlinkSync(f.path); } catch (e) {}
            });
        }
    } catch (e) {
        console.error('Clean backups error:', e);
    }
}

async function createServerBackup(reason = 'auto') {
    try {
        const itemsRes = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        const supsRes = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        const settingsRes = await db.execute('SELECT * FROM settings');
        
        const settingsMap = {};
        settingsRes.rows.forEach(r => { settingsMap[r.key] = r.value; });

        const items = itemsRes.rows || [];
        const suppliers = supsRes.rows || [];

        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
        const filename = `backup-${dateStr}-${reason}.json`;
        const filePath = path.join(BACKUP_DIR, filename);

        const payload = {
            version: 1,
            app: 'Dükkan Eksik Takip',
            createdAt: now.toISOString(),
            dateFormatted: now.toLocaleString('tr-TR'),
            reason: reason,
            reasonLabel: formatBackupReason(reason),
            totalItems: items.length,
            activeItems: items.filter(i => i.status !== 'deleted').length,
            deletedItems: items.filter(i => i.status === 'deleted').length,
            suppliersCount: suppliers.length,
            suppliers: suppliers,
            settings: settingsMap,
            items: items
        };

        const jsonStr = JSON.stringify(payload, null, 2);
        
        // 1. Save to Disk (if writable)
        try {
            if (!fs.existsSync(BACKUP_DIR)) {
                fs.mkdirSync(BACKUP_DIR, { recursive: true });
            }
            fs.writeFileSync(filePath, jsonStr, 'utf8');
            const latestPath = path.join(BACKUP_DIR, 'auto-backup-latest.json');
            fs.writeFileSync(latestPath, jsonStr, 'utf8');
            cleanOldBackups(35);
        } catch (fsErr) {
            console.warn('Disk backup write notice:', fsErr.message);
        }

        const backupSize = Buffer.byteLength(jsonStr, 'utf8');

        // 2. Save to Turso Cloud Database (backups table) - Survives any cloud container restart!
        try {
            const backupId = 'bak_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
            await db.execute({
                sql: `INSERT INTO backups (id, filename, reason, reasonLabel, totalItems, activeItems, deletedItems, suppliersCount, size, data, createdAt)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    backupId,
                    filename,
                    reason,
                    payload.reasonLabel,
                    payload.totalItems,
                    payload.activeItems,
                    payload.deletedItems,
                    payload.suppliersCount,
                    backupSize,
                    jsonStr,
                    payload.createdAt
                ]
            });

            // Keep latest 35 backups in Turso DB
            await db.execute(`
                DELETE FROM backups WHERE id NOT IN (
                    SELECT id FROM backups ORDER BY createdAt DESC LIMIT 35
                )
            `);
        } catch (dbErr) {
            console.error('Turso cloud backup write error:', dbErr);
        }

        lastBackupInfo = {
            filename,
            createdAt: payload.createdAt,
            dateFormatted: payload.dateFormatted,
            reason: reason,
            reasonLabel: payload.reasonLabel,
            totalItems: payload.totalItems,
            activeItems: payload.activeItems,
            deletedItems: payload.deletedItems,
            suppliersCount: payload.suppliersCount,
            size: backupSize
        };

        if (io) {
            io.emit('backup:created', lastBackupInfo);
        }
        console.log(`🛡️ [Yedek] Otomatik yedek alındı (${formatBackupReason(reason)}): ${filename} (${items.length} ürün)`);

        return lastBackupInfo;
    } catch (err) {
        console.error('Server backup error:', err);
        return null;
    }
}


let autoBackupDebounceTimer = null;
function scheduleAutoBackup(reason = 'change') {
    if (autoBackupDebounceTimer) clearTimeout(autoBackupDebounceTimer);
    autoBackupDebounceTimer = setTimeout(async () => {
        try {
            await createServerBackup(reason);
        } catch (e) {
            console.error('Scheduled auto backup failed:', e);
        }
    }, 3500);
}

// ==========================================
// WEB PUSH NOTIFICATION ENGINE (VAPID)
// ==========================================
const webpush = require('web-push');

let vapidPublicKey = process.env.VAPID_PUBLIC_KEY || null;
let vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || null;

async function initVapidKeys() {
    try {
        if (!vapidPublicKey || !vapidPrivateKey) {
            const pubRes = await db.execute({ sql: "SELECT value FROM settings WHERE key = 'vapid_public_key' LIMIT 1", args: [] });
            const privRes = await db.execute({ sql: "SELECT value FROM settings WHERE key = 'vapid_private_key' LIMIT 1", args: [] });

            if (pubRes.rows && pubRes.rows.length > 0 && privRes.rows && privRes.rows.length > 0) {
                vapidPublicKey = pubRes.rows[0].value;
                vapidPrivateKey = privRes.rows[0].value;
            } else {
                const keys = webpush.generateVAPIDKeys();
                vapidPublicKey = keys.publicKey;
                vapidPrivateKey = keys.privateKey;

                await db.execute({
                    sql: "INSERT OR REPLACE INTO settings (key, value) VALUES ('vapid_public_key', ?)",
                    args: [vapidPublicKey]
                });
                await db.execute({
                    sql: "INSERT OR REPLACE INTO settings (key, value) VALUES ('vapid_private_key', ?)",
                    args: [vapidPrivateKey]
                });
            }
        }

        webpush.setVapidDetails(
            'mailto:admin@eksik-app.com',
            vapidPublicKey,
            vapidPrivateKey
        );
        console.log('📱 Web Push (VAPID) Bildirim Motoru Hazır');
    } catch (e) {
        console.error('VAPID initialization error:', e);
    }
}

async function sendPushNotificationToAll(payload) {
    try {
        if (!vapidPublicKey || !vapidPrivateKey) return;

        const subsRes = await db.execute('SELECT endpoint, p256dh, auth FROM push_subscriptions');
        const subscriptions = subsRes.rows || [];
        if (subscriptions.length === 0) return;

        const payloadStr = JSON.stringify(payload);

        const tasks = subscriptions.map(async (sub) => {
            const pushSub = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                }
            };

            try {
                await webpush.sendNotification(pushSub, payloadStr);
            } catch (err) {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await db.execute({
                        sql: 'DELETE FROM push_subscriptions WHERE endpoint = ?',
                        args: [sub.endpoint]
                    });
                    console.log('📱 Eski push aboneliği silindi:', String(sub.endpoint).slice(0, 30));
                } else {
                    console.error('Push bildirim hatası:', err.message);
                }
            }
        });

        await Promise.allSettled(tasks);
    } catch (e) {
        console.error('sendPushNotificationToAll error:', e);
    }
}

app.use(cors());
// 15MB limit for photo uploads directly to SQLite / Turso
app.use(express.json({ limit: '15mb' }));

app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});


// Helper to find the newest existing file among candidate paths
function findBestFile(filePaths) {
    let bestPath = null;
    let bestMtime = -1;
    for (const p of filePaths) {
        try {
            if (fs.existsSync(p)) {
                const stat = fs.statSync(p);
                if (stat.isFile() && stat.mtimeMs > bestMtime) {
                    bestMtime = stat.mtimeMs;
                    bestPath = p;
                }
            }
        } catch (e) { }
    }
    return bestPath;
}

// Explicit routes: whether files were uploaded directly to root or in public/
app.get(['/', '/index.html'], (req, res) => {
    const file = findBestFile([
        path.join(__dirname, 'public', 'index.html'),
        path.join(__dirname, 'index.html')
    ]);
    if (file) return res.sendFile(file);
    res.send('Dükkan Eksik Takip: index.html bulunamadı.');
});

app.get(['/js/app.js', '/app.js'], (req, res) => {
    const file = findBestFile([
        path.join(__dirname, 'public', 'js', 'app.js'),
        path.join(__dirname, 'js', 'app.js'),
        path.join(__dirname, 'app.js')
    ]);
    if (file) {
        res.setHeader('Content-Type', 'application/javascript');
        return res.sendFile(file);
    }
    res.status(404).send('app.js not found');
});

app.get(['/css/style.css', '/style.css'], (req, res) => {
    const file = findBestFile([
        path.join(__dirname, 'public', 'css', 'style.css'),
        path.join(__dirname, 'css', 'style.css'),
        path.join(__dirname, 'style.css')
    ]);
    if (file) {
        res.setHeader('Content-Type', 'text/css');
        return res.sendFile(file);
    }
    res.status(404).send('style.css not found');
});

['duplicate-detector.js', 'audio.js', 'speech.js', 'export.js', 'sw.js', 'manifest.json'].forEach(filename => {
    app.get([`/js/${filename}`, `/${filename}`], (req, res) => {
        const file = findBestFile([
            path.join(__dirname, 'public', 'js', filename),
            path.join(__dirname, 'public', filename),
            path.join(__dirname, 'js', filename),
            path.join(__dirname, filename)
        ]);
        if (file) {
            if (filename.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            if (filename.endsWith('.json')) res.setHeader('Content-Type', 'application/json');
            return res.sendFile(file);
        }
        res.status(404).send(`${filename} not found`);
    });
});

// App Logo, Favicon & Apple Touch Icons
app.get(['/images/logo.jpg', '/logo.jpg', '/apple-touch-icon.png', '/icon-192.png', '/favicon.ico', '/favicon.png'], (req, res) => {
    const file = findBestFile([
        path.join(__dirname, 'public', 'images', 'logo.jpg'),
        path.join(__dirname, 'images', 'logo.jpg'),
        path.join(__dirname, 'public', 'logo.jpg'),
        path.join(__dirname, 'logo.jpg')
    ]);
    if (file) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.sendFile(file);
    }
    res.status(404).send('Logo not found');
});

// Support both public/ directory and root directory for any assets
if (fs.existsSync(path.join(__dirname, 'public'))) {
    app.use(express.static(path.join(__dirname, 'public'), { etag: false, maxAge: 0 }));
}
app.use(express.static(__dirname, { etag: false, maxAge: 0 }));

// Authentication Helper
async function verifyUser(username, password) {
    const result = await db.execute({
        sql: 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1',
        args: [username, password]
    });
    return result.rows.length > 0 ? result.rows[0] : null;
}

// Auth API Endpoints
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Kullanıcı adı ve şifre zorunludur' });
    }

    try {
        const user = await verifyUser(username.trim(), password.trim());
        if (!user) {
            return res.status(401).json({ error: 'Hatalı kullanıcı adı veya şifre!' });
        }

        const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString('base64');
        res.json({
            success: true,
            token,
            username: user.username,
            role: user.role
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Giriş sırasında veritabanı hatası' });
    }
});

app.post('/api/auth/change-password', async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    if (!username || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Tüm alanları doldurunuz' });
    }

    try {
        const user = await verifyUser(username.trim(), currentPassword.trim());
        if (!user) {
            return res.status(401).json({ error: 'Mevcut şifreniz hatalı!' });
        }

        await db.execute({
            sql: 'UPDATE users SET password = ? WHERE id = ?',
            args: [newPassword.trim(), user.id]
        });

        res.json({ success: true, message: 'Şifreniz başarıyla güncellendi!' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Şifre güncellenemedi' });
    }
});

// App Info
app.get('/api/info', async (req, res) => {
    try {
        const countRes = await db.execute('SELECT COUNT(*) as total, SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending FROM items WHERE status != "deleted"');
        const row = countRes.rows[0] || {};

        res.json({
            port: PORT,
            isTurso,
            totalItems: Number(row.total || 0),
            pendingItems: Number(row.pending || 0)
        });
    } catch (err) {
        res.json({ port: PORT, isTurso, totalItems: 0, pendingItems: 0 });
    }
});

// Suppliers CRUD
app.get('/api/suppliers', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Get suppliers error:', err);
        res.status(500).json({ error: 'Toptancılar yüklenemedi' });
    }
});

app.post('/api/suppliers', async (req, res) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Toptancı adı zorunludur' });
    }

    const newSupplier = {
        id: 'sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: name.trim(),
        createdAt: new Date().toISOString()
    };

    try {
        await db.execute({
            sql: 'INSERT INTO suppliers (id, name, createdAt) VALUES (?, ?, ?)',
            args: [newSupplier.id, newSupplier.name, newSupplier.createdAt]
        });

        io.emit('supplier:added', newSupplier);
        scheduleAutoBackup('supplier-add');
        res.status(201).json(newSupplier);
    } catch (err) {
        console.error('Add supplier error:', err);
        res.status(400).json({ error: 'Bu toptancı zaten mevcut veya eklenemedi' });
    }
});

app.put('/api/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Toptancı adı zorunludur' });
    }

    const newName = name.trim();

    try {
        const existing = await db.execute({
            sql: 'SELECT * FROM suppliers WHERE id = ? LIMIT 1',
            args: [id]
        });

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: 'Toptancı bulunamadı' });
        }

        const oldName = existing.rows[0].name;

        await db.execute({
            sql: 'UPDATE suppliers SET name = ? WHERE id = ?',
            args: [newName, id]
        });

        // Also update any items assigned to the old supplier name
        if (oldName && oldName !== newName) {
            await db.execute({
                sql: 'UPDATE items SET supplier = ? WHERE supplier = ?',
                args: [newName, oldName]
            });
        }

        const updated = { id, name: newName, oldName };
        io.emit('supplier:updated', updated);
        scheduleAutoBackup('supplier-update');
        res.json(updated);
    } catch (err) {
        console.error('Update supplier error:', err);
        res.status(500).json({ error: 'Toptancı adı güncellenemedi' });
    }
});

app.delete('/api/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute({
            sql: 'DELETE FROM suppliers WHERE id = ?',
            args: [id]
        });

        io.emit('supplier:deleted', { id });
        scheduleAutoBackup('supplier-delete');
        res.json({ success: true, deletedId: id });
    } catch (err) {
        console.error('Delete supplier error:', err);
        res.status(500).json({ error: 'Toptancı silinemedi' });
    }
});


// Settings Endpoints (App icon, customization, etc.)
app.get('/api/settings', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM settings');
        const settings = {};
        result.rows.forEach(r => { settings[r.key] = r.value; });
        res.json(settings);
    } catch (err) {
        console.error('Get settings error:', err);
        res.status(500).json({ error: 'Ayarlar yüklenemedi' });
    }
});

app.post('/api/settings', async (req, res) => {
    const { key, value } = req.body;
    if (!key) {
        return res.status(400).json({ error: 'Ayar anahtarı zorunludur' });
    }

    try {
        await db.execute({
            sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
            args: [String(key), String(value || '')]
        });

        io.emit('setting:updated', { key, value });
        res.json({ success: true, key, value });
    } catch (err) {
        console.error('Save setting error:', err);
        res.status(500).json({ error: 'Ayar kaydedilemedi' });
    }
});

// Items Endpoints (Turso / SQLite)
app.get('/api/items', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Get items error:', err);
        res.status(500).json({ error: 'Ürünler yüklenemedi' });
    }
});

app.post('/api/items', async (req, res) => {
    const { name, quantity, supplier, urgency, notes, image, source } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Ürün adı zorunludur' });
    }

    const newItem = {
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        name: name.trim(),
        quantity: (quantity || '1 adet').trim(),
        category: 'Genel',
        supplier: supplier || 'Belirtilmedi',
        urgency: urgency || 'normal',
        status: 'pending',
        notes: (notes || '').trim(),
        image: image || '',
        barcode: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: source || 'web'
    };

    try {
        await db.execute({
            sql: `INSERT INTO items (id, name, quantity, category, supplier, urgency, status, notes, image, barcode, createdAt, updatedAt, source)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                newItem.id,
                newItem.name,
                newItem.quantity,
                newItem.category,
                newItem.supplier,
                newItem.urgency,
                newItem.status,
                newItem.notes,
                newItem.image,
                newItem.barcode,
                newItem.createdAt,
                newItem.updatedAt,
                newItem.source
            ]
        });

        io.emit('item:added', newItem);
        scheduleAutoBackup('item-add');

        // Send instant phone push notification to all registered phones
        sendPushNotificationToAll({
            title: '🛍️ Yeni Eksik Ürün!',
            body: `${newItem.name} (${newItem.quantity}) - ${newItem.supplier || 'Belirtilmedi'}`,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            image: newItem.image || undefined,
            tag: 'item-' + newItem.id,
            data: {
                url: '/',
                itemId: newItem.id
            }
        }).catch(err => console.error('Push send notice:', err));

        res.status(201).json(newItem);
    } catch (err) {
        console.error('Insert item error:', err);
        res.status(500).json({ error: 'Ürün kaydedilemedi' });
    }

});

app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, status, quantity, notes, urgency, supplier, image } = req.body;

    try {
        const existing = await db.execute({
            sql: 'SELECT * FROM items WHERE id = ? LIMIT 1',
            args: [id]
        });

        if (existing.rows.length === 0) {
            return res.status(404).json({ error: 'Ürün bulunamadı' });
        }

        const current = existing.rows[0];
        const updated = {
            ...current,
            name: (name !== undefined && name.trim()) ? name.trim() : current.name,
            status: status !== undefined ? status : current.status,
            quantity: quantity !== undefined ? quantity : current.quantity,
            notes: notes !== undefined ? notes : current.notes,
            urgency: urgency !== undefined ? urgency : current.urgency,
            supplier: supplier !== undefined ? supplier : current.supplier,
            image: image !== undefined ? image : (current.image || ''),
            category: 'Genel',
            updatedAt: new Date().toISOString()
        };

        await db.execute({
            sql: `UPDATE items SET name = ?, status = ?, quantity = ?, notes = ?, urgency = ?, supplier = ?, image = ?, updatedAt = ? WHERE id = ?`,
            args: [
                updated.name,
                updated.status,
                updated.quantity,
                updated.notes,
                updated.urgency,
                updated.supplier,
                updated.image,
                updated.updatedAt,
                id
            ]
        });

        io.emit('item:updated', updated);
        scheduleAutoBackup('item-update');
        res.json(updated);
    } catch (err) {
        console.error('Update item error:', err);
        res.status(500).json({ error: 'Güncelleme başarısız' });
    }
});

// Items Delete Endpoint (Supports Soft Delete to 'Silinenler' and Permanent Delete)
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const isPermanent = req.query.permanent === 'true';

    try {
        if (isPermanent) {
            // Kalıcı olarak veritabanından sil
            await db.execute({
                sql: 'DELETE FROM items WHERE id = ?',
                args: [id]
            });
            io.emit('item:deleted', { id, permanent: true });
            scheduleAutoBackup('item-delete');
            return res.json({ success: true, deletedId: id, permanent: true });
        }

        // Silinenler / Çöp Kutusuna taşı (Soft Delete)
        const now = new Date().toISOString();
        await db.execute({
            sql: 'UPDATE items SET status = "deleted", updatedAt = ? WHERE id = ?',
            args: [now, id]
        });

        const updatedRes = await db.execute({
            sql: 'SELECT * FROM items WHERE id = ? LIMIT 1',
            args: [id]
        });
        const updatedItem = (updatedRes.rows && updatedRes.rows[0]) || { id, status: 'deleted', updatedAt: now };

        io.emit('item:soft-deleted', { id, item: updatedItem });
        io.emit('item:updated', updatedItem);
        scheduleAutoBackup('item-delete');
        return res.json({ success: true, item: updatedItem, softDeleted: true });
    } catch (err) {
        console.error('Delete item error:', err);
        res.status(500).json({ error: 'Silme işlemi başarısız' });
    }
});

// Restore single item from Silinenler back to active
app.post('/api/items/:id/restore', async (req, res) => {
    const { id } = req.params;
    const targetStatus = (req.body && req.body.status) || 'pending';
    const now = new Date().toISOString();

    try {
        await db.execute({
            sql: 'UPDATE items SET status = ?, updatedAt = ? WHERE id = ?',
            args: [targetStatus, now, id]
        });

        const updatedRes = await db.execute({
            sql: 'SELECT * FROM items WHERE id = ? LIMIT 1',
            args: [id]
        });
        const updatedItem = updatedRes.rows[0];

        io.emit('item:updated', updatedItem);
        scheduleAutoBackup('item-restore');
        res.json({ success: true, item: updatedItem });
    } catch (err) {
        console.error('Restore item error:', err);
        res.status(500).json({ error: 'Geri yükleme başarısız' });
    }
});

// Restore all items from Silinenler back to active
app.post('/api/items/restore-all', async (req, res) => {
    const now = new Date().toISOString();
    try {
        await db.execute({
            sql: 'UPDATE items SET status = "pending", updatedAt = ? WHERE status = "deleted"',
            args: [now]
        });
        io.emit('items:all-restored', {});
        scheduleAutoBackup('item-restore-all');
        res.json({ success: true });
    } catch (err) {
        console.error('Restore all error:', err);
        res.status(500).json({ error: 'Tümünü geri yükleme başarısız' });
    }
});

// Empty trash (Silinenleri kalıcı olarak temizle)
app.delete('/api/items/trash/empty', async (req, res) => {
    try {
        await db.execute('DELETE FROM items WHERE status = "deleted"');
        io.emit('items:trash-emptied', {});
        scheduleAutoBackup('trash-empty');
        res.json({ success: true });
    } catch (err) {
        console.error('Empty trash error:', err);
        res.status(500).json({ error: 'Çöp kutusu boşaltılamadı' });
    }
});

// Clear completed items (moves them to Silinenler safely)
app.post('/api/items/clear-completed', async (req, res) => {
    const now = new Date().toISOString();
    try {
        await db.execute({
            sql: 'UPDATE items SET status = "deleted", updatedAt = ? WHERE status = "completed"',
            args: [now]
        });
        io.emit('items:bulk-deleted', {});
        scheduleAutoBackup('clear-completed');
        res.json({ success: true });
    } catch (err) {
        console.error('Clear completed error:', err);
        res.status(500).json({ error: 'Temizleme başarısız' });
    }
});

// ==========================================
// AUTO BACKUP & RESTORE ENDPOINTS
// ==========================================

// Get list of all available backups (from Turso Cloud DB + Disk fallback)
app.get('/api/backups', async (req, res) => {
    try {
        let backupList = [];

        // 1. Check Turso Cloud Database
        try {
            const dbRes = await db.execute('SELECT id, filename, reason, reasonLabel, totalItems, activeItems, deletedItems, suppliersCount, size, createdAt FROM backups ORDER BY createdAt DESC LIMIT 35');
            if (dbRes.rows && dbRes.rows.length > 0) {
                backupList = dbRes.rows.map(r => ({
                    filename: r.filename,
                    size: Number(r.size || 0),
                    createdAt: r.createdAt,
                    dateFormatted: new Date(r.createdAt).toLocaleString('tr-TR'),
                    reason: r.reason || 'auto',
                    reasonLabel: r.reasonLabel || formatBackupReason(r.reason || 'auto'),
                    totalItems: Number(r.totalItems || 0),
                    activeItems: Number(r.activeItems || 0),
                    deletedItems: Number(r.deletedItems || 0),
                    suppliersCount: Number(r.suppliersCount || 0)
                }));
            }
        } catch (dbErr) {
            console.warn('Turso backups query notice:', dbErr.message);
        }

        // 2. If Turso DB had no backups yet, check disk
        if (backupList.length === 0 && fs.existsSync(BACKUP_DIR)) {
            const files = fs.readdirSync(BACKUP_DIR);
            for (const file of files) {
                if (file.startsWith('backup-') && file.endsWith('.json')) {
                    const fullPath = path.join(BACKUP_DIR, file);
                    try {
                        const stat = fs.statSync(fullPath);
                        const raw = fs.readFileSync(fullPath, 'utf8');
                        const content = JSON.parse(raw);
                        backupList.push({
                            filename: file,
                            size: stat.size,
                            createdAt: content.createdAt || stat.birthtime.toISOString(),
                            dateFormatted: content.dateFormatted || new Date(stat.mtimeMs).toLocaleString('tr-TR'),
                            reason: content.reason || 'auto',
                            reasonLabel: content.reasonLabel || formatBackupReason(content.reason || 'auto'),
                            totalItems: content.totalItems !== undefined ? content.totalItems : (content.items ? content.items.length : 0),
                            activeItems: content.activeItems !== undefined ? content.activeItems : 0,
                            deletedItems: content.deletedItems !== undefined ? content.deletedItems : 0,
                            suppliersCount: content.suppliersCount !== undefined ? content.suppliersCount : (content.suppliers ? content.suppliers.length : 0)
                        });
                    } catch (e) {
                        // skip corrupted file
                    }
                }
            }
            backupList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        res.json({
            lastBackup: lastBackupInfo,
            backups: backupList
        });
    } catch (err) {
        console.error('Get backups error:', err);
        res.status(500).json({ error: 'Yedekler listelenemedi' });
    }
});

// Trigger instant manual backup
app.post('/api/backups/create', async (req, res) => {
    try {
        const backup = await createServerBackup('manual');
        res.json({ success: true, backup });
    } catch (err) {
        console.error('Create manual backup error:', err);
        res.status(500).json({ error: 'Yedek alınamadı' });
    }
});

// Download a specific backup file (Disk + Turso Cloud fallback)
app.get('/api/backups/download/:filename', async (req, res) => {
    const rawFilename = path.basename(req.params.filename);
    const filePath = path.join(BACKUP_DIR, rawFilename);

    // 1. Try disk first
    if (fs.existsSync(filePath)) {
        return res.download(filePath, rawFilename);
    }

    // 2. If not on disk (e.g. cloud host ephemeral disk), retrieve from Turso Cloud
    try {
        const dbRes = await db.execute({
            sql: 'SELECT data FROM backups WHERE filename = ? LIMIT 1',
            args: [rawFilename]
        });

        if (dbRes.rows && dbRes.rows.length > 0 && dbRes.rows[0].data) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="${rawFilename}"`);
            return res.send(dbRes.rows[0].data);
        }
    } catch (e) {
        console.error('Turso backup download error:', e);
    }

    res.status(404).send('Yedek dosyası bulunamadı');
});

// Restore database from selected server backup file (Disk + Turso Cloud fallback)
app.post('/api/backups/:filename/restore', async (req, res) => {
    const rawFilename = path.basename(req.params.filename);
    const filePath = path.join(BACKUP_DIR, rawFilename);
    let content = null;

    if (fs.existsSync(filePath)) {
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {}
    }

    if (!content) {
        try {
            const dbRes = await db.execute({
                sql: 'SELECT data FROM backups WHERE filename = ? LIMIT 1',
                args: [rawFilename]
            });
            if (dbRes.rows && dbRes.rows.length > 0 && dbRes.rows[0].data) {
                content = JSON.parse(dbRes.rows[0].data);
            }
        } catch (e) {}
    }

    if (!content) {
        return res.status(404).json({ error: 'Yedek dosyası bulunamadı' });
    }

    try {
        const items = content.items || [];
        const suppliers = content.suppliers || [];
        const settings = content.settings || {};

        // Safety backup of current state before restoring
        await createServerBackup('pre-restore');


        // Replace all items
        await db.execute('DELETE FROM items');
        for (const item of items) {
            await db.execute({
                sql: `INSERT OR REPLACE INTO items (id, name, quantity, category, supplier, urgency, status, notes, image, barcode, createdAt, updatedAt, source)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    item.id || ('item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)),
                    item.name,
                    item.quantity || '1 adet',
                    item.category || 'Genel',
                    item.supplier || 'Belirtilmedi',
                    item.urgency || 'normal',
                    item.status || 'pending',
                    item.notes || '',
                    item.image || '',
                    item.barcode || '',
                    item.createdAt || new Date().toISOString(),
                    item.updatedAt || new Date().toISOString(),
                    item.source || 'backup-restore'
                ]
            });
        }

        // Restore suppliers
        if (Array.isArray(suppliers) && suppliers.length > 0) {
            for (const s of suppliers) {
                if (s && s.name) {
                    await db.execute({
                        sql: 'INSERT OR IGNORE INTO suppliers (id, name, createdAt) VALUES (?, ?, ?)',
                        args: [s.id || ('sup_' + Date.now()), s.name.trim(), s.createdAt || new Date().toISOString()]
                    });
                }
            }
        }

        // Restore settings if present
        if (settings && typeof settings === 'object') {
            for (const [k, v] of Object.entries(settings)) {
                await db.execute({
                    sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
                    args: [String(k), String(v || '')]
                });
            }
        }

        const itemsRes = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        const supsRes = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        const settingsRes = await db.execute('SELECT * FROM settings');
        const settingsMap = {};
        settingsRes.rows.forEach(r => { settingsMap[r.key] = r.value; });

        io.emit('init', {
            items: itemsRes.rows,
            suppliers: supsRes.rows,
            settings: settingsMap
        });

        res.json({
            success: true,
            message: `${items.length} ürün ve ${suppliers.length} toptancı başarıyla geri yüklendi`,
            totalItems: items.length
        });
    } catch (err) {
        console.error('Backup restore error:', err);
        res.status(500).json({ error: 'Geri yükleme sırasında hata oluştu: ' + err.message });
    }
});

// Import from uploaded file/JSON (Browser manual upload)
app.post('/api/backup/import', async (req, res) => {
    try {
        const { items = [], suppliers = [], mode = 'merge' } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Yedek dosyasında ürün bulunamadı' });
        }

        // Safety backup of current state before importing
        await createServerBackup('pre-import');

        if (mode === 'replace') {
            await db.execute('DELETE FROM items');
        }

        for (const item of items) {
            await db.execute({
                sql: `INSERT OR REPLACE INTO items (id, name, quantity, category, supplier, urgency, status, notes, image, barcode, createdAt, updatedAt, source)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    item.id || ('item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)),
                    item.name,
                    item.quantity || '1 adet',
                    item.category || 'Genel',
                    item.supplier || 'Belirtilmedi',
                    item.urgency || 'normal',
                    item.status || 'pending',
                    item.notes || '',
                    item.image || '',
                    item.barcode || '',
                    item.createdAt || new Date().toISOString(),
                    item.updatedAt || new Date().toISOString(),
                    item.source || 'backup-import'
                ]
            });
        }

        if (Array.isArray(suppliers) && suppliers.length > 0) {
            for (const s of suppliers) {
                if (s && s.name) {
                    await db.execute({
                        sql: 'INSERT OR IGNORE INTO suppliers (id, name, createdAt) VALUES (?, ?, ?)',
                        args: [s.id || ('sup_' + Date.now()), s.name.trim(), s.createdAt || new Date().toISOString()]
                    });
                }
            }
        }

        scheduleAutoBackup('post-import');

        const itemsRes = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        const supsRes = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        const settingsRes = await db.execute('SELECT * FROM settings');
        const settingsMap = {};
        settingsRes.rows.forEach(r => { settingsMap[r.key] = r.value; });

        io.emit('init', {
            items: itemsRes.rows,
            suppliers: supsRes.rows,
            settings: settingsMap
        });

        res.json({
            success: true,
            importedItemsCount: items.length,
            suppliersCount: suppliers.length
        });
    } catch (err) {
        console.error('Backup import error:', err);
        res.status(500).json({ error: 'Yedek yükleme hatası: ' + err.message });
    }
});

// ==========================================
// WEB PUSH NOTIFICATION API ENDPOINTS
// ==========================================

// Get VAPID public key for frontend subscription
app.get('/api/push/public-key', (req, res) => {
    if (!vapidPublicKey) {
        return res.status(503).json({ error: 'Push bildirim anahtarı henüz hazır değil' });
    }
    res.json({ publicKey: vapidPublicKey });
});

// Save client subscription
app.post('/api/push/subscribe', async (req, res) => {
    try {
        const { subscription, userAgent } = req.body;
        if (!subscription || !subscription.endpoint || !subscription.keys) {
            return res.status(400).json({ error: 'Geçersiz abonelik verisi' });
        }

        const endpoint = subscription.endpoint;
        const p256dh = subscription.keys.p256dh;
        const auth = subscription.keys.auth;
        const ua = userAgent || req.headers['user-agent'] || '';
        const now = new Date().toISOString();

        await db.execute({
            sql: `INSERT OR REPLACE INTO push_subscriptions (endpoint, p256dh, auth, userAgent, createdAt)
                  VALUES (?, ?, ?, ?, ?)`,
            args: [endpoint, p256dh, auth, ua, now]
        });

        console.log('📱 Yeni telefon/cihaz bildirim aboneliği kaydedildi:', endpoint.slice(0, 35));
        res.json({ success: true, message: 'Bildirim aboneliği başarıyla kaydedildi' });
    } catch (e) {
        console.error('Push subscribe error:', e);
        res.status(500).json({ error: 'Abonelik kaydedilemedi' });
    }
});

// Remove client subscription
app.post('/api/push/unsubscribe', async (req, res) => {
    try {
        const { endpoint } = req.body;
        if (endpoint) {
            await db.execute({
                sql: 'DELETE FROM push_subscriptions WHERE endpoint = ?',
                args: [endpoint]
            });
            console.log('📱 Push aboneliği iptal edildi:', endpoint.slice(0, 35));
        }
        res.json({ success: true });
    } catch (e) {
        console.error('Push unsubscribe error:', e);
        res.status(500).json({ error: 'Abonelik silinemedi' });
    }
});

// Send a test notification to all subscribed phones
app.post('/api/push/test', async (req, res) => {
    try {
        await sendPushNotificationToAll({
            title: '🔔 Bildirim Testi Başarılı!',
            body: 'Tebrikler! Dükkana yeni ürün eklendiğinde telefonunuza anında bildirim gelecek.',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: 'test-' + Date.now(),
            data: { url: '/' }
        });
        res.json({ success: true, message: 'Test bildirimi gönderildi' });
    } catch (e) {
        res.status(500).json({ error: 'Test bildirimi gönderilemedi' });
    }
});

// Get push subscriptions status
app.get('/api/push/status', async (req, res) => {
    try {
        const countRes = await db.execute('SELECT COUNT(*) as count FROM push_subscriptions');
        const count = (countRes.rows[0] && Number(countRes.rows[0].count)) || 0;
        res.json({
            activeSubscribersCount: count,
            vapidReady: !!vapidPublicKey
        });
    } catch (e) {
        res.json({ activeSubscribersCount: 0, vapidReady: false });
    }
});

// Notification icon endpoint
app.get(['/icon-192.png', '/icon.svg', '/img/icon-192.png'], (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="#2563eb"/><text x="50" y="65" font-size="50" text-anchor="middle" fill="white">🛍️</text></svg>`);
});

// Socket.io connection handling
io.on('connection', async (socket) => {
    try {
        const itemsRes = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        const supsRes = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        const settingsRes = await db.execute('SELECT * FROM settings');
        const settingsMap = {};
        settingsRes.rows.forEach(r => { settingsMap[r.key] = r.value; });
        socket.emit('init', {
            items: itemsRes.rows,
            suppliers: supsRes.rows,
            settings: settingsMap,
            lastBackup: lastBackupInfo
        });
    } catch (e) {
        socket.emit('init', { items: [], suppliers: [], settings: {} });
    }
});

// Start Server
(async () => {
    try {
        await initDb();
        await initVapidKeys();

        // Automatic initial backup on startup
        setTimeout(async () => {
            try {
                await createServerBackup('startup');
            } catch (e) {
                console.error('Startup auto backup notice:', e.message);
            }
        }, 1500);

        // Hourly auto backup (every 60 minutes)
        setInterval(async () => {
            try {
                await createServerBackup('hourly');
            } catch (e) {
                console.error('Hourly auto backup notice:', e.message);
            }
        }, 60 * 60 * 1000);

        server.listen(PORT, async () => {
            console.log('====================================================');
            console.log('🛍️  DÜKKAN EKSİK TAKİP - WEB & TURSO HAZIR');
            console.log('====================================================');
            console.log(`🚀 Port: ${PORT}`);
            console.log(`🔐 Giriş: admin / 123`);
            console.log(`🛡️ Otomatik Yedekleme (Auto-Backup): 7/24 AKTİF`);
            console.log(`📱 Web Push Bildirim Servisi: 7/24 AKTİF`);
            console.log('====================================================\n');
        });
    } catch (err) {
        console.error('Sunucu başlatma hatası:', err);
    }
})();


