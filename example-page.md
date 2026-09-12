# Contoh Halaman

Halaman ini mendemonstrasikan fitur-fitur yang tersedia di template Docsify v5.

## Code Block dengan Shiki

```python
def hello_world():
    """Fungsi sederhana untuk menyapa dunia."""
    print("Hello, World!")
    return True

if __name__ == "__main__":
    hello_world()
```

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("World"));
```

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## GitHub-Style Callouts

> [!NOTE]
> Ini adalah catatan penting yang perlu diperhatikan.

> [!TIP]
> Ini adalah tips yang bisa membantu Anda.

> [!WARNING]
> Ini adalah peringatan yang harus diwaspadai.

> [!CAUTION]
> Ini adalah peringatan keras tentang potensi masalah.

> [!IMPORTANT]
> Ini adalah informasi sangat penting yang tidak boleh diabaikan.

## Foldertree Component

Gunakan `<div class="foldertree">` untuk membuat tree view struktur folder:

<div class="foldertree" data-title="Project Structure">
- src/
  - main.js
  - utils.js
  - components/
    - Header.js
    - Footer.js
    - Sidebar.js
  - styles/
    - main.css
    - variables.css
- public/
  - index.html
  - favicon.ico
- package.json
- README.md
</div>

## Inline Code

Gunakan `backtick` untuk menandai kode inline seperti `npm install` atau `git commit`.

## Link

Kunjungi [docsify.js.org](https://docsify.js.org) untuk informasi lebih lanjut.

## Gambar dengan Zoom

Klik gambar untuk memperbesar (fitur zoom-image).

![Contoh Gambar](https://placehold.co/600x400 "Klik untuk zoom")

## Tabel

| Fitur      | Status | Keterangan                     |
| ---------- | ------ | ------------------------------ |
| Shiki      | ✅     | Syntax highlighting dual theme |
| Callouts   | ✅     | GitHub-style native            |
| Foldertree | ✅     | Custom component               |
| Dark Mode  | ✅     | Auto follow OS                 |
| Search     | ✅     | Full text search               |
