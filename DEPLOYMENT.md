# 🌐 Uygulamayı Web'e (İnternete) Yükleme Rehberi (Ücretsiz)

Bu uygulamayı internete yüklediğinizde, telefonunuzdan veya bilgisayarınızdan **aynı web linkine girerek** 7/24 dükkan eksiklerinizi canlı yönetebilirsiniz.

En kolay ve en stabil yöntem **Render.com** (tamamen ücretsizdir):

---

## 1. Adım: Turso Veritabanı Açma (1 Dakika)
Verilerinizin internette kalıcı olması için Turso kullanıyoruz:
1. [turso.tech](https://turso.tech) sitesine girip **Sign Up** (ücretsiz üye ol) deyin.
2. **Create Database** butonuna basıp bir isim verin (örn: `dukkan-db`).
3. Açılan sayfadan şu iki bilgiyi kopyalayın:
   - **Database URL** (örn: `libsql://dukkan-db-kullaniciadi.turso.io`)
   - **Database Token** (Show Token / Create Token diyerek alın)

---

## 2. Adım: Projeyi GitHub'a Yükleme
Masaüstündeki bu klasörü GitHub hesabınıza yükleyin:
```bash
git init
git add .
git commit -m "Dukkan Eksik Takip ilk surum"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/eksik-app.git
git push -u origin main
```

---

## 3. Adım: Render.com'da Yayına Alma (Tek Tık)
1. [render.com](https://render.com) adresine gidin (GitHub ile ücretsiz giriş yapın).
2. **New +** > **Web Service** seçin.
3. GitHub'daki `eksik-app` reponuzu seçip **Connect** deyin.
4. Ayarları şöyle yapın:
   - **Name:** `dukkan-eksik` (veya istediğiniz bir isim)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free ($0)
5. Aşağıdaki **Environment Variables (Ortam Değişkenleri)** bölümüne 1. adımdaki Turso bilgilerinizi ekleyin:
   - `TURSO_DATABASE_URL` = `libsql://dukkan-db-...turso.io`
   - `TURSO_AUTH_TOKEN` = `sizin_turso_tokeniniz`
6. **Create Web Service** butonuna basın!

🎉 **Tebrikler!** 1-2 dakika içinde size özel ücretsiz bir link verilir:
👉 `https://dukkan-eksik.onrender.com`

Artık bu linki hem telefonunuza hem dükkandaki bilgisayara yer imi / ana ekran olarak ekleyebilirsiniz.
Giriş: `admin` / `123`
