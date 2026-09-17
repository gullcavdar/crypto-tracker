# 🚀 CryptoVault - Modern React Native Fintech Uygulaması

CryptoVault, **React Native** ve **Expo** kullanılarak geliştirilmiş, yüksek performanslı, güvenli ve üretime hazır (production-ready) bir kripto para takip ve portföy yönetim mobil uygulamasıdır. Katı **Clean Architecture** prensiplerini takip ederek sorumlulukları özel hook'lara, global store'lara ve modüler stil dosyalarına ayırır.

---

## ✨ Temel Özellikler

- **Canlı Piyasa Verileri:** **CoinGecko API** kullanarak gerçek zamanlı kripto para piyasa istatistiklerini, fiyatlarını ve 24 saatlik değişimlerini çeker.
- **İnteraktif SVG Grafikleri:** Fiyat performansına göre `react-native-svg` ile dinamik, renk kodlu trend görselleştirmesi sunar.
- **Portföy Takibi:** Kullanıcının elindeki varlıkları takip eder ve toplam portföy değerini canlı olarak hesaplar.
- **Güvenli Kimlik Doğrulama ve Oturum Yönetimi:** Global durum yönetimi için **Zustand** ve şifrelenmiş yerel veri saklama için **Expo SecureStore** kullanır.
- **Otomatik Giriş (Auto-Login):** Uygulama açılışında mevcut oturumları otomatik olarak algılayarak giriş ekranını atlar ve kullanıcıyı doğrudan karşılar.
- **Clean Code Mimarisi:** Mantık katmanları tamamen ayrılmıştır—API istekleri özel hook'larda tutulur, stiller modülerleştirilmiştir ve ekranlar yalnızca UI bileşenlerine odaklanır.

---

## 🛠️ Kullanılan Teknolojiler

- **Framework:** React Native (Expo SDK)
- **State Management (Durum Yönetimi):** Zustand
- **Yerel Depolama:** Expo SecureStore
- **Navigasyon:** React Navigation (Bottom Tabs & Native Stack)
- **Stil Mimarisi:** Modüler StyleSheet (`src/styles/`)
- **API:** CoinGecko Public REST API
- **İkonlar ve Görseller:** `@expo/vector-icons` & `react-native-svg`

<img width="414" height="828" alt="Simulator Screenshot - iPhone 11 - 2026-09-17 at 14 35 34" src="https://github.com/user-attachments/assets/9c799c44-8d1f-4426-9879-9c099dc675e3" />
<img width="414" height="828" alt="Simulator Screenshot - iPhone 11 - 2026-09-17 at 14 34 34" src="https://github.com/user-attachments/assets/0279570b-43ce-4105-b837-7739fe24dd0c" />
<img width="414" height="828" alt="Simulator Screenshot - iPhone 11 - 2026-09-17 at 14 34 31" src="https://github.com/user-attachments/assets/5d69a15f-f8bc-4cfb-9883-f99ea96ded3c" />
<img width="414" height="828" alt="Simulator Screenshot - iPhone 11 - 2026-09-17 at 14 34 29" src="https://github.com/user-attachments/assets/f7066c28-ea60-4982-ab13-03347aa09fa6" />
