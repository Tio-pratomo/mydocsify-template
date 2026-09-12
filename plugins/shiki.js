/**
 * Docsify Shiki Plugin (custom, kompatibel Docsify v5)
 *
 * Menggantikan docsify-shiki pihak ketiga yang masih memakai signature
 * renderer lama code(code, lang) sehingga menghasilkan "[object Object]"
 * di Docsify v5 (marked baru memanggil code({ text, lang })).
 *
 * - Dual theme: github-light + github-dark (otomatis ikut prefers-color-scheme)
 * - Tanpa WASM: memakai JavaScript regex engine (lebih ringan)
 * - Selalu ada fallback aman: konten kode TIDAK PERNAH hilang
 *
 * File ini adalah ES module dan memakai top-level await. Module script
 * dieksekusi sebelum DOMContentLoaded, sedangkan Docsify boot setelah
 * DOMContentLoaded, sehingga renderer terdaftar tepat waktu.
 */

import { createHighlighterCore } from 'https://esm.sh/shiki@1/core';
import { createJavaScriptRegexEngine } from 'https://esm.sh/shiki@1/engine/javascript';

// --- Themes ---
import githubLight from 'https://esm.sh/@shikijs/themes@1/github-light';
import githubDark from 'https://esm.sh/@shikijs/themes@1/github-dark';

// --- Languages (tambah/kurangi sesuai kebutuhan) ---
import bash from 'https://esm.sh/@shikijs/langs@1/bash';
import python from 'https://esm.sh/@shikijs/langs@1/python';
import java from 'https://esm.sh/@shikijs/langs@1/java';
import json from 'https://esm.sh/@shikijs/langs@1/json';
import markdown from 'https://esm.sh/@shikijs/langs@1/markdown';
import yaml from 'https://esm.sh/@shikijs/langs@1/yaml';
import php from 'https://esm.sh/@shikijs/langs@1/php';
import go from 'https://esm.sh/@shikijs/langs@1/go';
import typescript from 'https://esm.sh/@shikijs/langs@1/typescript';
import javascript from 'https://esm.sh/@shikijs/langs@1/javascript';

const THEME_LIGHT = githubLight.name || 'github-light';
const THEME_DARK = githubDark.name || 'github-dark';

let highlighter = null;
try {
  highlighter = await createHighlighterCore({
    themes: [githubLight, githubDark],
    langs: [
      bash,
      python,
      java,
      json,
      markdown,
      yaml,
      php,
      go,
      typescript,
      javascript,
    ],
    engine: createJavaScriptRegexEngine(),
  });
} catch (err) {
  console.warn('[shiki] Gagal inisialisasi highlighter:', err);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Bersihkan nama bahasa untuk dipakai di atribut HTML
function sanitizeLang(lang) {
  const clean = String(lang || 'text')
    .toLowerCase()
    .replace(/[^a-z0-9+#-]/g, '');
  return clean || 'text';
}

function renderCode(code, lang) {
  const displayLang = sanitizeLang(lang);

  if (highlighter) {
    try {
      const loaded =
        typeof highlighter.getLoadedLanguages === 'function'
          ? highlighter.getLoadedLanguages()
          : [];
      const useLang = loaded.includes(displayLang) ? displayLang : 'text';
      const html = highlighter.codeToHtml(code, {
        lang: useLang,
        themes: { light: THEME_LIGHT, dark: THEME_DARK },
      });
      // Sisipkan data-lang untuk label bahasa (dipakai CSS docsify)
      return html.replace('<pre', `<pre data-lang="${displayLang}"`);
    } catch (err) {
      console.warn('[shiki] Highlight gagal, pakai fallback:', err);
    }
  }

  // Fallback aman: kode polos tapi SELALU tampil
  return (
    `<pre data-lang="${displayLang}">` +
    `<code class="lang-${displayLang}">${escapeHtml(code)}</code></pre>`
  );
}

/**
 * Renderer docsify v5: marked baru memanggil code(token) dengan
 * token = { text, lang, ... }. Tetap dukung signature lama
 * code(code, lang) untuk jaga-jaga.
 */
function codeRenderer(token, infostring) {
  let text;
  let lang;
  if (token && typeof token === 'object' && typeof token.text === 'string') {
    text = token.text;
    lang = token.lang;
  } else {
    text = String(token ?? '');
    lang = infostring;
  }
  return renderCode(text, lang);
}

// Daftarkan renderer ke konfigurasi docsify (sebelum docsify boot)
window.$docsify = window.$docsify || {};
const existing = window.$docsify.markdown || {};
window.$docsify.markdown = {
  ...existing,
  renderer: {
    ...(existing.renderer || {}),
    code: codeRenderer,
  },
};
