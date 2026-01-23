# 🍽️ Dijital Restoran Menü ve Sipariş Sistemi

![Proje Durumu](https://img.shields.io/badge/Durum-Tamamland%C4%B1-success)
![Dil](https://img.shields.io/badge/Dil-JavaScript-yellow)
![Framework](https://img.shields.io/badge/Stil-Bootstrap5-blue)

Restoranlar için tasarlanmış modern, duyarlı ve etkileşimli bir dijital menü uygulaması. Bu Tek Sayfalı Uygulama (SPA), müşterilerin menüyü incelemesine, kategoriye göre filtreleme yapmasına, ürün aramasına, sepetlerini yönetmesine ve kolay erişim için QR kod oluşturmasına olanak tanır.

## 🔗 Canlı Demo

🚀 **[Canlı projeyi görüntülemek için buraya tıklayın](https://erenmente.github.io/yemek-sepeti-js/)**

---

## ✨ Özellikler

### 🛒 Dinamik Alışveriş Sepeti

- **Ekle/Çıkar:** Kullanıcılar ürünleri kolayca sepete ekleyebilir ve tek bir tıklamayla çıkarabilir.
- **Kalıcı Depolama:** Sepet durumunu kaydetmek için **LocalStorage** kullanır. Sayfa yenilense veya tarayıcı kapatılsa bile sepet verileri korunur.
- **Gerçek Zamanlı Hesaplama:** Ürünler eklendikçe veya çıkarıldıkça toplam fiyatı otomatik olarak hesaplar.

### 🔍 Arama ve Filtreleme

- **Anlık Arama:** Kullanıcı yazdıkça menü öğelerini gerçek zamanlı olarak filtreleyen duyarlı bir arama çubuğu.
- **Kategori Filtreleme:** Daha iyi bir kullanıcı deneyimi için sekme tabanlı filtreleme (örneğin, Ana Yemekler, Çorbalar, Tatlılar).

### 📱 QR Kod Oluşturma

- **Dinamik QR:** `qrcode.js` kullanarak mevcut sayfa URL'si için benzersiz bir QR kod oluşturur.
- **Yüksek Kaliteli İndirme:** QR kodunu, restoran masalarına yerleştirilmek üzere yazdırılmaya hazır yüksek çözünürlüklü bir PNG olarak indirme özelliği içerir.

### 🎨 UI/UX Geliştirmeleri

- **SweetAlert2 Entegrasyonu:** Standart tarayıcı uyarıları, doğrulama ve başarı mesajları için güzel, animasyonlu ve duyarlı pencerelerle değiştirildi.
- **Duyarlı Tasarım:** **Bootstrap 5** ile oluşturulmuş tam duyarlı düzen, mobil, tablet ve masaüstünde mükemmel çalışmasını sağlar.

---

## 🛠️ Kullanılan Teknolojiler

- **HTML5** - Semantik yapı.
- **CSS3 & Bootstrap 5** - Stil ve duyarlı ızgara sistemi.
- **JavaScript (ES6+)** - Mantık, DOM manipülasyonu ve LocalStorage yönetimi.
- **JSON** - Backend verilerini simüle etme (menü öğelerini saklama).
- **SweetAlert2** - Estetik uyarılar ve modallar için.
- **QRCode.js** - İstemci tarafı QR kodları oluşturmak için.

---

## 📂 Proje Yapısı

```text
├── index.html        # Ana HTML yapısı
├── script.js         # Ana JavaScript mantığı (Fetch, Sepet, Filtreleme)
├── style.css         # Özel CSS dosyası
├── data.json         # Menü veri kaynağı
├── img/              # Yemek görselleri klasörü
└── README.md         # Proje dokümantasyonu
```

## 🚀 Yerel Olarak Nasıl Çalıştırılır?

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/erenmente/yemek-sepeti-js.git
   ```

2. **Projeyi açın**
   Klasörü kod editörünüzde (VS Code, IntelliJ vb.) açın.

3. **Uygulamayı çalıştırın**
   `index.html` dosyasını doğrudan tarayıcınızda açabilirsiniz.
   > **Not:** En iyi deneyim için (JSON verilerini çekerken CORS sorunlarını önlemek amacıyla) "Live Server" eklentisini kullanmanız önerilir.

---

## 👤 Yazar

**Eren Mente**

Fırat Üniversitesi Yazılım Mühendisliği Öğrencisi

GitHub: [@erenmente](https://github.com/erenmente)

Telif Hakkı © 2025. Tüm hakları saklıdır.
