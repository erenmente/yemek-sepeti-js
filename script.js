// HTML'den gerekli yerleri seçiyoruz
const menuContainer = document.getElementById("menu-container");
const btnContainer = document.querySelector(".btn-container"); // Butonların geleceği yer

let menuVerisi = []; // Tüm menüyü burada hafızada tutacağız

// Eski: let sepet = [];
// Yeni: LocalStorage'da veri varsa onu al (Parse et), yoksa boş dizi başlat.
let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

// 1. Verileri Çekme (Garson Depoya Gidiyor)
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        menuVerisi = data; // Veriyi hafızaya al
        menuGoster(menuVerisi); // İlk açılışta hepsini göster
        butonlariOlustur(); // Kategorilere göre butonları yarat
        sepetiGuncelle(); // Eğer hafızada eski sepet varsa ekrana bas
    })
    .catch(error => console.error("Hata:", error));

// 2. Menüyü Ekrana Basan Fonksiyon (Raf Dizici)
function menuGoster(menuListesi) {
    let menuHTML = ""; // Önce boş bir metin oluşturuyoruz

    menuListesi.forEach(yemek => {
        menuHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${yemek.gorsel}" class="card-img-top" alt="${yemek.ad}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title fw-bold">${yemek.ad}</h5>
                            <span class="badge bg-success fs-6">${yemek.fiyat}</span>
                        </div>
                        <p class="card-text text-muted">${yemek.aciklama}</p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <small class="text-secondary border px-2 py-1 rounded">${yemek.kategori}</small>
                            <button class="btn btn-outline-danger btn-sm" onclick="sepeteEkle(${yemek.id})">
                                Sepete Ekle
                            </button>
                        </div>
                        </div>
                </div>
            </div>
        `;
    });

    // Hazırladığımız HTML'i sayfaya yapıştırıyoruz
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = menuHTML;
}

// 3. Butonları Oluşturan ve Filtreleme Yapan Fonksiyon
function butonlariOlustur() {
    // Menüdeki benzersiz kategorileri buluyoruz (Örn: Çorbalar, Tatlılar...)
    // 'Set' yapısı aynı ismin iki kere geçmesini engeller.
    const kategoriler = menuVerisi.reduce(
        (values, item) => {
            if (!values.includes(item.kategori)) {
                values.push(item.kategori);
            }
            return values;
        },
        ["Hepsi"] // Başlangıçta mutlaka "Hepsi" butonu olsun
    );

    // Her kategori için buton kodunu oluştur
    const categoryBtns = kategoriler.map(category => {
        return `<button class="btn btn-outline-dark me-2 filter-btn" data-id="${category}">${category}</button>`;
    }).join("");

    // Butonları HTML'e ekle
    btnContainer.innerHTML = categoryBtns;

    // --- BUTONLARA TIKLAMA ÖZELLİĞİ EKLEME ---
    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Tıklanan butonun kategorisini al (Örn: "Tatlılar")
            const category = e.currentTarget.dataset.id;

            // Filtreleme Mantığı
            const menuCategory = menuVerisi.filter(menuItem => menuItem.kategori === category);

            // Eğer "Hepsi" seçildiyse tüm listeyi, değilse filtrelenmiş listeyi gönder
            if (category === "Hepsi") {
                menuGoster(menuVerisi);
            } else {
                menuGoster(menuCategory);
            }
        });
    });
}
// 1. Arama çubuğunu seçiyoruz
const searchBar = document.getElementById("search-bar");

// 2. Kullanıcı her tuşa bastığında tetiklenecek olay
searchBar.addEventListener("input", (e) => {

    // Yazılan değeri al ve küçük harfe çevir (Case-insensitive olması için)
    const searchString = e.target.value.toLowerCase();

    // 3. Menü verisi içinde filtreleme yap
    const filteredMenu = menuVerisi.filter((yemek) => {
        // Yemeğin adını da küçük harfe çevirip içinde aranan kelime var mı bakıyoruz
        return yemek.ad.toLowerCase().includes(searchString);
    });

    // 4. Filtrelenen yeni listeyi ekrana bas
    menuGoster(filteredMenu);
});

// 1. Sepete Ekleme Fonksiyonu
function sepeteEkle(yemekId) {
    // a. ID'si gelen yemeği tüm menü içinde bul
    const secilenYemek = menuVerisi.find(yemek => yemek.id === yemekId);

    // b. Sepet dizisine bu yemeği ekle
    sepet.push(secilenYemek);

    // c. Sepet arayüzünü güncelle (Ekrana bas)
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const sepetListesi = document.getElementById("sepet-listesi");
    const sepetCount = document.getElementById("sepet-count");
    const toplamFiyatSpan = document.getElementById("toplam-fiyat");

    sepetListesi.innerHTML = "";
    let toplamFiyat = 0;

    // Sepet dizisini metne (JSON) çevirip 'sepet' adıyla tarayıcıya kaydet
    localStorage.setItem("sepet", JSON.stringify(sepet));

    // forEach içinde ikinci parametre 'index' (0, 1, 2...) sırayı verir
    sepet.forEach((yemek, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // HTML'i direkt yazıyoruz: İsim, Fiyat ve Sil Butonu
        li.innerHTML = `
            <span>${yemek.ad}</span>
            <div>
                <span class="badge bg-primary rounded-pill me-2">${yemek.fiyat}</span>
                <button class="btn btn-sm btn-danger" onclick="sepettenCikar(${index})">X</button>
            </div>
        `;

        sepetListesi.appendChild(li);
        toplamFiyat += parseInt(yemek.fiyat);
    });

    sepetCount.innerText = sepet.length;
    toplamFiyatSpan.innerText = toplamFiyat + " TL";
}

function sepettenCikar(index) {
    Swal.fire({
        title: 'Emin misiniz?',
        text: "Bu ürünü sepetten çıkarmak istediğinize emin misiniz?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33', // Sil butonu kırmızı olsun
        cancelButtonColor: '#3085d6', // İptal mavi olsun
        confirmButtonText: 'Evet, Sil!',
        cancelButtonText: 'Vazgeç'
    }).then((result) => {
        // Kullanıcı "Evet, Sil" butonuna basarsa result.isConfirmed true olur
        if (result.isConfirmed) {
            sepet.splice(index, 1);
            sepetiGuncelle();

            // Ufak bir bilgilendirme daha (Opsiyonel)
            Swal.fire(
                'Silindi!',
                'Ürün sepetinizden kaldırıldı.',
                'success'
            )
        }
    })
}

function siparisiTamamla() {
    // 1. Sepet boş mu kontrolü
    if (sepet.length === 0) {
        Swal.fire({
            title: 'Sepetiniz Boş!',
            text: 'Lütfen sipariş vermek için menüden ürün ekleyin.',
            icon: 'warning', // Ünlem ikonu çıkarır
            confirmButtonText: 'Tamam'
        });
    } else {
        // 2. Sipariş doluysa Başarılı mesajı
        const toplamTutar = document.getElementById("toplam-fiyat").innerText;

        Swal.fire({
            title: 'Siparişiniz Alındı! 🚀',
            text: `Toplam Tutar: ${toplamTutar}`,
            icon: 'success', // Yeşil tik ikonu çıkarır
            confirmButtonText: 'Harika!'
        });

        // 3. Sepeti sıfırla
        sepet = [];localStorage.removeItem("sepet"); // Hafızayı da temizle
        sepetiGuncelle();
    }
}

function qrKodGoster() {
    // SweetAlert ile popup açıyoruz
    Swal.fire({
        title: 'Bu Menüyü Paylaş',
        text: 'Müşterileriniz bu kodu okutarak menüye ulaşabilir.',
        // QR kodun içine yerleşeceği boş bir div oluşturuyoruz
        html: '<div id="qrcode" class="d-flex justify-content-center my-3"></div>',
        showConfirmButton: true,
        confirmButtonText: 'Kapat',
        
        // Popup açıldıktan HEMEN SONRA çalışacak kod
        didOpen: () => {
            // QR kod oluşturucu kütüphaneyi tetikliyoruz
            new QRCode(document.getElementById("qrcode"), {
                text: window.location.href, // O anki sayfanın linkini alır
                width: 150, // Genişlik
                height: 150 // Yükseklik
            });
        }
    });
}