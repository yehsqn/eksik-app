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

app.use(cors());
// 15MB limit for photo uploads directly to SQLite / Turso
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// GitHub veya Render'a zip olarak yüklendiyse public.zip'i otomatik çıkart
const zipPath = path.join(__dirname, 'public.zip');
const stylePath = path.join(__dirname, 'public', 'css', 'style.css');

if (!fs.existsSync(stylePath) && fs.existsSync(zipPath)) {
    console.log('📦 public.zip bulundu, dosyalar çıkartılıyor...');
    try {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(__dirname, true);
        console.log('✅ adm-zip ile public klasörü başarıyla açıldı.');
    } catch (e) {
        try {
            const { execSync } = require('child_process');
            execSync(`unzip -o "${zipPath}" -d "${__dirname}"`, { stdio: 'inherit' });
            console.log('✅ unzip komutu ile public klasörü açıldı.');
        } catch (err2) {
            console.error('public.zip çıkartma hatası:', err2.message);
        }
    }
}

// Support both public/ directory and root directory if uploaded without public folder
if (fs.existsSync(path.join(__dirname, 'public'))) {
    app.use(express.static(path.join(__dirname, 'public')));
}
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    const publicIndex = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(publicIndex)) {
        return res.sendFile(publicIndex);
    }
    const rootIndex = path.join(__dirname, 'index.html');
    if (fs.existsSync(rootIndex)) {
        return res.sendFile(rootIndex);
    }
    res.send('Dükkan Eksik Takip: index.html bulunamadı.');
});

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
        const countRes = await db.execute('SELECT COUNT(*) as total, SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending FROM items');
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
        res.status(201).json(newSupplier);
    } catch (err) {
        console.error('Add supplier error:', err);
        res.status(400).json({ error: 'Bu toptancı zaten mevcut veya eklenemedi' });
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
        res.json({ success: true, deletedId: id });
    } catch (err) {
        console.error('Delete supplier error:', err);
        res.status(500).json({ error: 'Toptancı silinemedi' });
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
        res.status(201).json(newItem);
    } catch (err) {
        console.error('Insert item error:', err);
        res.status(500).json({ error: 'Ürün kaydedilemedi' });
    }
});

app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { status, quantity, notes, urgency, supplier, image } = req.body;

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
            sql: `UPDATE items SET status = ?, quantity = ?, notes = ?, urgency = ?, supplier = ?, image = ?, updatedAt = ? WHERE id = ?`,
            args: [
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
        res.json(updated);
    } catch (err) {
        console.error('Update item error:', err);
        res.status(500).json({ error: 'Güncelleme başarısız' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute({
            sql: 'DELETE FROM items WHERE id = ?',
            args: [id]
        });
        io.emit('item:deleted', { id });
        res.json({ success: true, deletedId: id });
    } catch (err) {
        console.error('Delete item error:', err);
        res.status(500).json({ error: 'Silme işlemi başarısız' });
    }
});

app.post('/api/items/clear-completed', async (req, res) => {
    try {
        await db.execute('DELETE FROM items WHERE status = "completed"');
        io.emit('items:bulk-deleted', {});
        res.json({ success: true });
    } catch (err) {
        console.error('Clear completed error:', err);
        res.status(500).json({ error: 'Temizleme başarısız' });
    }
});

// Socket.io connection handling
io.on('connection', async (socket) => {
    try {
        const itemsRes = await db.execute('SELECT * FROM items ORDER BY createdAt DESC');
        const supsRes = await db.execute('SELECT * FROM suppliers ORDER BY name ASC');
        socket.emit('init', {
            items: itemsRes.rows,
            suppliers: supsRes.rows
        });
    } catch (e) {
        socket.emit('init', { items: [], suppliers: [] });
    }
});

// Start Server
(async () => {
    try {
        await initDb();
        server.listen(PORT, async () => {
            console.log('====================================================');
            console.log('🛍️  DÜKKAN EKSİK TAKİP - WEB & TURSO HAZIR');
            console.log('====================================================');
            console.log(`🚀 Port: ${PORT}`);
            console.log(`🔐 Giriş: admin / 123`);
            console.log('====================================================\n');
        });
    } catch (err) {
        console.error('Sunucu başlatma hatası:', err);
    }
})();
