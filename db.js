const { createClient } = require('@libsql/client');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

function hashPassword(plain) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derived = crypto.scryptSync(String(plain), salt, 64).toString('hex');
    return `scrypt$${salt}$${derived}`;
}

function verifyPassword(plain, stored) {
    const storedStr = String(stored || '');
    const plainStr = String(plain || '');
    if (storedStr.startsWith('scrypt$')) {
        const parts = storedStr.split('$');
        if (parts.length !== 3) return { valid: false, needsMigration: false };
        const [, salt, keyHex] = parts;
        try {
            const expectedBuf = Buffer.from(keyHex, 'hex');
            const actualBuf = crypto.scryptSync(plainStr, salt, expectedBuf.length);
            if (expectedBuf.length !== actualBuf.length) {
                return { valid: false, needsMigration: false };
            }
            return { valid: crypto.timingSafeEqual(expectedBuf, actualBuf), needsMigration: false };
        } catch (e) {
            return { valid: false, needsMigration: false };
        }
    }
    const a = Buffer.from(plainStr, 'utf8');
    const b = Buffer.from(storedStr, 'utf8');
    const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
    return { valid, needsMigration: valid };
}

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Turso or Local SQLite Configuration
const isTurso = !!process.env.TURSO_DATABASE_URL;

const dbConfig = isTurso
    ? {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    }
    : {
        url: `file:${path.join(DATA_DIR, 'dukkan.db').replace(/\\/g, '/')}`
    };

const client = createClient(dbConfig);

console.log(isTurso ? 'Sistem Aktif' : 'Sistem Yerel');

// "Şeffaf  Silikon " ve "şeffaf silikon" aynı ürün sayılsın
function normalizeNameKey(name) {
    return String(name || '').toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ').trim();
}

// Initialize Tables
async function initDb() {
    await client.execute(`
        CREATE TABLE IF NOT EXISTS items (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            quantity TEXT DEFAULT '1 adet',
            category TEXT DEFAULT 'Genel',
            supplier TEXT DEFAULT 'Belirtilmedi',
            urgency TEXT DEFAULT 'normal',
            status TEXT DEFAULT 'pending',
            notes TEXT DEFAULT '',
            image TEXT DEFAULT '',
            barcode TEXT DEFAULT '',
            addedBy TEXT DEFAULT '',
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            source TEXT DEFAULT 'web'
        )
    `);

    // Migration: add image & addedBy columns if table already existed without them
    try {
        await client.execute("ALTER TABLE items ADD COLUMN image TEXT DEFAULT ''");
    } catch (e) {
        // Column already exists, safe to ignore
    }
    try {
        await client.execute("ALTER TABLE items ADD COLUMN addedBy TEXT DEFAULT ''");
    } catch (e) {
        // Column already exists, safe to ignore
    }

    await client.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            createdAt TEXT NOT NULL
        )
    `);

    await client.execute(`
        CREATE TABLE IF NOT EXISTS suppliers (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            createdAt TEXT NOT NULL
        )
    `);

    await client.execute(`
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    `);

    await client.execute(`
        CREATE TABLE IF NOT EXISTS backups (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            reason TEXT NOT NULL,
            reasonLabel TEXT DEFAULT '',
            totalItems INTEGER DEFAULT 0,
            activeItems INTEGER DEFAULT 0,
            deletedItems INTEGER DEFAULT 0,
            suppliersCount INTEGER DEFAULT 0,
            size INTEGER DEFAULT 0,
            data TEXT NOT NULL,
            createdAt TEXT NOT NULL
        )
    `);

    await client.execute(`
        CREATE TABLE IF NOT EXISTS push_subscriptions (
            endpoint TEXT PRIMARY KEY,
            p256dh TEXT NOT NULL,
            auth TEXT NOT NULL,
            userAgent TEXT DEFAULT '',
            createdAt TEXT NOT NULL
        )
    `);


    // Kalıcı eksik geçmişi (istatistik & hatırlatma için) — ürün silinse bile kayıt kalır
    await client.execute(`
        CREATE TABLE IF NOT EXISTS item_events (
            id TEXT PRIMARY KEY,
            itemId TEXT NOT NULL,
            name TEXT NOT NULL,
            nameKey TEXT NOT NULL,
            supplier TEXT DEFAULT 'Belirtilmedi',
            urgency TEXT DEFAULT 'normal',
            createdAt TEXT NOT NULL
        )
    `);
    await client.execute('CREATE INDEX IF NOT EXISTS idx_item_events_item ON item_events (itemId)');

    // Sohbet tarzı ortak notlar
    await client.execute(`
        CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            author TEXT DEFAULT '',
            createdAt TEXT NOT NULL
        )
    `);

    // Mevcut ürünleri geçmişe bir kez aktar (aynı id tekrar eklenmez)
    try {
        const missing = await client.execute(
            "SELECT id, name, supplier, urgency, createdAt FROM items WHERE ('evt_' || id) NOT IN (SELECT id FROM item_events)"
        );
        if (missing.rows.length > 0) {
            await client.batch(missing.rows.map(r => ({
                sql: 'INSERT OR IGNORE INTO item_events (id, itemId, name, nameKey, supplier, urgency, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                args: ['evt_' + r.id, r.id, r.name, normalizeNameKey(r.name), r.supplier || 'Belirtilmedi', r.urgency || 'normal', r.createdAt]
            })), 'write');
            console.log(`📊 ${missing.rows.length} ürün eksik geçmişine aktarıldı`);
        }
    } catch (e) {
        console.error('Eksik geçmişi aktarma hatası:', e.message);
    }

    // Insert default admin user if none exists, and migrate any legacy plaintext passwords
    const users = await client.execute('SELECT id, password FROM users');
    if (users.rows.length === 0) {
        await client.execute({
            sql: 'INSERT INTO users (id, username, password, role, createdAt) VALUES (?, ?, ?, ?, ?)',
            args: ['user_default_admin', 'admin', hashPassword('123'), 'admin', new Date().toISOString()]
        });
        console.log('👤 Varsayılan kullanıcı oluşturuldu');
    } else {
        let migratedCount = 0;
        for (const u of users.rows) {
            const pwdStr = String(u.password || '');
            if (!pwdStr.startsWith('scrypt$')) {
                await client.execute({
                    sql: 'UPDATE users SET password = ? WHERE id = ?',
                    args: [hashPassword(pwdStr), u.id]
                });
                migratedCount++;
            }
        }
        if (migratedCount > 0) {
            console.log(`🔐 ${migratedCount} kullanıcı şifresi güvenli hash formatına yükseltildi`);
        }
    }

    // Insert default initial suppliers if empty
    const sups = await client.execute('SELECT COUNT(*) as count FROM suppliers');
    if (sups.rows[0].count === 0 || sups.rows[0].count === 0n) {
        const defaultSups = ['Çelebi', 'Özen', 'Kardelen', 'Özyurt', 'Hacıyatmaz'];
        for (const s of defaultSups) {
            await client.execute({
                sql: 'INSERT OR IGNORE INTO suppliers (id, name, createdAt) VALUES (?, ?, ?)',
                args: ['sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4), s, new Date().toISOString()]
            });
        }
    }

    // Ensure default HKC app name & logo setting
    try {
        await client.execute({
            sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('app_name', 'HKC')",
            args: []
        });
        await client.execute({
            sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('app_icon', ?)",
            args: [JSON.stringify({ icon: '/images/logo.jpg', isImage: true })]
        });
    } catch (e) { }
}

module.exports = {
    client,
    initDb,
    isTurso,
    normalizeNameKey,
    hashPassword,
    verifyPassword
};
