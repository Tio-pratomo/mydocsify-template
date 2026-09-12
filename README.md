# 📚 Template Dokumentasi Docsify v5

Bikin web dokumentasi **tanpa ribet**. Kamu cukup menulis file teks biasa (Markdown), template ini yang mengubahnya jadi website dokumentasi yang rapi, bisa dicari, dan enak dibaca — lengkap dengan mode gelap otomatis! 🌙

> **Cocok untuk siapa?** Siapa saja yang mau bikin dokumentasi: catatan belajar, panduan project, tutorial, sampai dokumentasi API. Tidak perlu bisa coding web.

---

## ✨ Yang Kamu Dapat

| Fitur | Artinya buat kamu |
|-------|-------------------|
| 🎨 Tampilan modern & rapi | Web dokumentasimu langsung bagus tanpa diatur-atur |
| 🌙 Mode gelap otomatis | Ikut pengaturan HP/laptop pembaca (terang/gelap) |
| 🔍 Kotak pencarian | Pembaca bisa mencari isi semua halaman (bahasa Indonesia) |
| 📑 Sidebar lipat-buka | Daftar isi bisa dilipat per kelompok biar rapi |
| 💻 Kode berwarna | Contoh kode Python, JS, PHP, dll tampil berwarna + ada tombol salin |
| 📢 Kotak peringatan | Kotak info/tips/peringatan gaya GitHub, tinggal ketik |
| 📁 Tree folder | Tampilkan struktur folder project dengan rapi |
| 🔎 Klik gambar = zoom | Gambar bisa diklik untuk diperbesar |
| 📱 Responsif | Enak dibaca di HP maupun laptop |

---

## 🧰 Persiapan (sekali saja)

Kamu butuh 2 hal:

1. **Browser** (Chrome / Edge / Firefox — apa saja boleh)
2. **Cara menjalankan web lokal**, pilih salah satu:
   - **Paling mudah:** extension **Live Server** di VS Code (klik kanan file `index.html` → *Open with Live Server*)
   - **Atau:** install Docsify CLI sekali saja:
     ```bash
     npm i docsify-cli -g
     ```

> ⚠️ **Penting:** file `index.html` **tidak bisa** dibuka dengan klik dua kali (akan kosong/error). Harus dijalankan lewat Live Server atau `docsify serve`. Ini bukan bug — memang cara kerja Docsify.

---

## 🚀 Cara Menjalankan

**Dengan Live Server (disarankan buat pemula):**

1. Buka folder template ini di VS Code
2. Install extension **Live Server** (cari di tab Extensions)
3. Klik kanan file `index.html` → **Open with Live Server**
4. Browser terbuka otomatis. Selesai! 🎉
5. Setiap kamu menyimpan file Markdown, browser refresh sendiri

**Dengan Docsify CLI:**

```bash
cd folder-template-ini
docsify serve
```

Lalu buka `http://localhost:3000` di browser.

---

## ➕ Cara Menambah Halaman Baru (paling sering dipakai)

Misalnya kamu mau bikin halaman **"Panduan Instalasi"**. Ikuti 2 langkah ini:

### Langkah 1 — Bikin file Markdown baru

Buat file baru bernama `instalasi.md` di folder template, lalu isi dengan tulisanmu:

```markdown
# Panduan Instalasi

Ikuti langkah berikut untuk memasang aplikasi.

## Syarat

- Windows 10 / macOS / Linux
- Koneksi internet

## Langkah-langkah

1. Download aplikasinya
2. Jalankan file installer
3. Klik Next sampai selesai
```

> 💡 **Aturan nama file:** huruf kecil semua, tanpa spasi. Spasi diganti strip, contoh: `panduan-instalasi.md`.

### Langkah 2 — Daftarkan di sidebar

Buka file `_sidebar.md`, tambahkan satu baris link ke file barumu:

```markdown
- [Home](/)
- [Panduan Instalasi](/instalasi.md)
- [About](/about.md)
```

Simpan. Selesai! Halaman barumu langsung muncul di sidebar. ✅

### Mengelompokkan menu sidebar

Kalau halamanmu sudah banyak, kelompokkan biar rapi:

```markdown
- [Home](/)

- **Panduan**
  - [Instalasi](/instalasi.md)
  - [Penggunaan](/penggunaan.md)

- **Referensi**
  - [API](/api.md)
  - [FAQ](/faq.md)
```

Baris yang diawali `- **`...`**` jadi judul kelompok (otomatis bisa dilipat-buka oleh pembaca).

---

## ✍️ Dasar Menulis Markdown (5 menit belajar)

Markdown itu cara menulis format (tebal, judul, list) pakai teks biasa. Ini yang paling sering dipakai:

```markdown
# Judul Besar
## Judul Sedang
### Judul Kecil

**teks tebal** dan *teks miring*

- list biasa
- item kedua

1. list bernomor
2. item kedua

[teks link](https://contoh.com)

![keterangan gambar](gambar/foto.png)

`kode pendek` di dalam kalimat
```

**Blok kode** (untuk contoh kode program) — pakai 3 backtick + nama bahasa:

````markdown
```python
def sapa(nama):
    print(f"Halo, {nama}!")
```
````

Hasilnya: kode tampil berwarna sesuai bahasanya + ada **tombol salin** otomatis. Bahasa yang didukung: `python`, `javascript`, `typescript`, `java`, `php`, `go`, `bash`, `json`, `yaml`, `markdown`.

---

## 📢 Kotak Info / Tips / Peringatan

Tinggal ketik seperti ini di file Markdown-mu:

```markdown
> [!NOTE]
> Ini catatan biasa.

> [!TIP]
> Ini tips yang membantu.

> [!WARNING]
> Ini peringatan, hati-hati ya.

> [!CAUTION]
> Ini bahaya, jangan dilakukan!

> [!IMPORTANT]
> Ini penting banget, jangan dilewatkan.
```

Masing-masing otomatis tampil sebagai kotak berwarna dengan ikonnya. 🎨

---

## 📁 Menampilkan Struktur Folder

Kalau dokumentasimu perlu menunjukkan susunan file project, pakai ini:

```html
<div class="foldertree" data-title="Struktur Project">
- src/
  - main.js
  - components/
    - Header.js
    - Footer.js
- package.json
- README.md
</div>
```

Aturannya sederhana:

- Baris yang diakhiri `/` dianggap **folder** (contoh: `src/`)
- Selain itu dianggap **file**
- **2 spasi** = masuk 1 tingkat ke dalam
- Pembaca bisa **klik folder** untuk melipat/membukanya

---

## 🎨 Ganti Nama & Warna Situs

**Ganti nama situs** — buka `index.html`, cari bagian ini:

```js
window.$docsify = {
  name: "Dokumentasi Lengkap",  // <-- ganti dengan namamu
  ...
};
```

**Ganti warna utama** — buka `style.css`, cari bagian paling atas:

```css
:root {
  --theme-color: #42b983;  /* <-- ganti warna sesukamu */
}
```

Gunakan kode warna hex (contoh: `#007bff` biru, `#e74c3c` merah). Bisa ambil dari situs seperti htmlcolorcodes.com.

---

## 🗂️ Isi Folder Template

| File / Folder | Gunanya | Perlu diutak-atik? |
|---------------|---------|--------------------|
| `index.html` | Pengaturan situs (nama, plugin) | Jarang — hanya ganti nama |
| `home.md` | Halaman pembuka situs | ✅ Ya, isi sesukamu |
| `_sidebar.md` | Daftar menu sidebar | ✅ Ya, tiap tambah halaman |
| `about.md` | Contoh halaman | Boleh dihapus/diganti |
| `example-page.md` | Contoh semua fitur | Buat contekan, boleh dihapus |
| `style.css` | Warna & tampilan | Kalau mau ganti warna |
| `plugins/` | Plugin buatan template | Jangan diubah (kecuali paham) |
| `.nojekyll` | Syarat GitHub Pages | Jangan dihapus |

> Mau halaman pembuka yang berbeda? Ganti `homepage: "home.md"` di `index.html` dengan nama file lain, misalnya `homepage: "README.md"`.

---

## 🌐 Cara Publish ke Internet (GitHub Pages, gratis)

1. Upload folder ini ke repository GitHub (atau pakai tombol **Use this template** di halaman repo template)
2. Di GitHub, buka **Settings → Pages**
3. Pada *Source*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Tunggu ±1 menit. Situsmu online di `https://username.github.io/nama-repo/` 🎉

File `.nojekyll` di template ini memang disiapkan agar langkah di atas langsung jalan.

---

## ❓ Kalau Ada Masalah

| Gejala | Solusi |
|--------|--------|
| Halaman kosong saat file diklik dua kali | Wajib dibuka lewat Live Server / `docsify serve`, bukan klik dua kali |
| Perubahan tidak muncul | Hard refresh: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac) |
| Halaman baru tidak muncul di sidebar | Pastikan sudah didaftarkan di `_sidebar.md` dan nama file persis sama |
| Link sidebar error 404 | Cek ejaan nama file (huruf besar/kecil berpengaruh) |
| Kode tidak berwarna | Pastikan nama bahasa setelah \`\`\` benar, mis. ` ```python ` bukan ` ```py ` |

---

Selamat menulis dokumentasi! Kalau template ini membantu, kasih ⭐ di reponya ya. 😊
