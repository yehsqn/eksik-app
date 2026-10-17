# 🛍️ Dükkan Eksik Takip (Web & Turso Sürümü)

Dükkanınızdaki eksik ürünleri telefondan veya bilgisayardan anlık kaydedebileceğiniz, **Turso (LibSQL)** bulut veritabanı destekli, **fotoğraf ekleme** ve **toptancı yönetimi** özelliklerine sahip web uygulaması.

---

## 🔐 Giriş Bilgileri
- **Kullanıcı Adı:** `admin`
- **Şifre:** `123`
*(Sağ üstteki kullanıcı butonundan şifrenizi dilediğiniz zaman değiştirebilirsiniz).*

---

## 🌟 Yapılan Son Güncellemeler

1. **📦 Sade Kategori:** "Gıda", "Temizlik" vb. kategori seçimi tamamen kaldırıldı; her şey otomatik ve pratik olarak tek çatıda toplanıyor.
2. **🏢 Toptancı Ekleme & Silme (Toptancı Yönetimi):**
   - Üst menüdeki **"Toptancıları Yönet"** butonuna basarak dilediğiniz toptancıyı tek tıkla ekleyebilir veya silebilirsiniz.
   - Eklenen toptancılar anında açılır menülere ve filtreleme sekmelerine yansır.
3. **📷 Fotoğraf Çekme / Ekleme Özelliği:**
   - **Ürün Eklerken:** Hızlı ekleme formundaki **"📷 Fotoğraf"** butonuna basarak telefonunuzun kamerasıyla ürünün veya rafın fotoğrafını çekebilir ya da galeriden seçebilirsiniz.
   - **Ekledikten Sonra:** Listedeki herhangi bir ürünün sağındaki **📷** butonuna basarak sonradan da fotoğraf ekleyebilir veya değiştirebilirsiniz.
   - **Büyük Görüntüleme:** Ürün kartındaki fotoğrafa tıkladığınızda büyük boyutta net olarak açılır.
   - Fotoğraflar yüklenirken otomatik olarak optimize edilip Turso veritabanında saklanır.
4. **🚫 Kaldırılanlar:**
   - Barkod okuyucu kaldırıldı.
   - QR kod butonları kaldırıldı (Uygulamayı web alan adınıza koyduğunuzda telefondan doğrudan linke girilmektedir).
   - WhatsApp butonları kaldırıldı.
5. **🧠 Akıllı Benzer Ürün Uyarısı:**
   - Listede *"Defter"* varken biri *"Defter 12 li"* yazarsa sistem uyarı verir:
     - *Mevcut olanın miktarını artır / güncelle*
     - *Yine de ayrı ekle*
     - *Vazgeç*
