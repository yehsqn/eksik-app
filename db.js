const { createClient } = require('@libsql/client');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

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

console.log(isTurso ? '☁️ Turso Bulut Veritabanına Bağlanıldı' : '💾 Yerel SQLite / LibSQL Veritabanı Aktif');

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
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            source TEXT DEFAULT 'web'
        )
    `);

    // Migration: add image column if table already existed without it
    try {
        await client.execute('ALTER TABLE items ADD COLUMN image TEXT DEFAULT ""');
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

    // Insert default admin user if none exists
    const users = await client.execute('SELECT * FROM users LIMIT 1');
    if (users.rows.length === 0) {
        await client.execute({
            sql: 'INSERT INTO users (id, username, password, role, createdAt) VALUES (?, ?, ?, ?, ?)',
            args: ['user_default_admin', 'admin', '123', 'admin', new Date().toISOString()]
        });
        console.log('👤 Varsayılan kullanıcı: admin / 123');
    }

    // Delete legacy seeded suppliers as requested by user ("toptancıları kaldır ekleme boş kalsın ben eklerim")
    try {
        await client.execute("DELETE FROM suppliers WHERE name IN ('Bizim Toptan', 'Metro Toptan', 'Özlem Gıda', 'Merkez Dağıtım', 'Kırtasiye Toptancısı')");
    } catch (e) {
        // ignore
    }
}

module.exports = {
    client,
    initDb,
    isTurso
};
