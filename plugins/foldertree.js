/**
 * Docsify Foldertree Plugin (v2 - fixed)
 *
 * Mengubah <div class="foldertree"> menjadi tree view yang bisa di-collapse.
 * Dijalankan ulang setiap halaman selesai dirender via hook.doneEach.
 *
 * Cara pakai di markdown:
 *
 * <div class="foldertree" data-title="Project Structure">
 * - src/
 *   - main.js
 *   - components/
 *     - Header.js
 * - package.json
 * </div>
 */
(function () {
  'use strict';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Ubah baris teks menjadi list item { depth, name, isFolder }
  function parseTreeLines(text) {
    var items = [];
    var lines = String(text).split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/\t/g, '  ');
      if (!line.trim()) continue;

      // Hitung indentasi (2 spasi = 1 level)
      var indent = 0;
      while (line.charAt(indent) === ' ') indent++;
      var depth = Math.floor(indent / 2);

      // Buang bullet "-"/"*" dan emoji opsional di depan
      var content = line.slice(indent).replace(/^[-*]\s*/, '');
      content = content.replace(/^[📁📂📄🗂]\s*/u, '').trim();
      if (!content) continue;

      var isFolder = /\/$/.test(content);
      var name = isFolder ? content.replace(/\/$/, '') : content;

      items.push({ depth: depth, name: name, isFolder: isFolder });
    }

    return items;
  }

  // Susun item datar menjadi struktur tree
  function toTree(items) {
    var root = [];
    var stack = [{ children: root, depth: -1 }];

    items.forEach(function (item) {
      while (stack.length > 1 && stack[stack.length - 1].depth >= item.depth) {
        stack.pop();
      }
      var node = { name: item.name, isFolder: item.isFolder, children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push({ children: node.children, depth: item.depth });
    });

    return root;
  }

  function renderNodes(nodes) {
    var html = '<ul>';
    nodes.forEach(function (node) {
      if (node.isFolder) {
        html +=
          '<li><span class="tree-folder">' +
          escapeHtml(node.name) +
          '</span>';
        if (node.children.length) html += renderNodes(node.children);
        html += '</li>';
      } else {
        html +=
          '<li><span class="tree-file">' +
          escapeHtml(node.name) +
          '</span></li>';
      }
    });
    return html + '</ul>';
  }

  function initOne(el) {
    if (el.hasAttribute('data-initialized')) return;
    el.setAttribute('data-initialized', 'true');

    var title = el.getAttribute('data-title') || 'File Structure';
    var tree = toTree(parseTreeLines(el.textContent || ''));

    el.innerHTML =
      '<div class="foldertree-title">' +
      escapeHtml(title) +
      '</div>' +
      renderNodes(tree);
  }

  function initAll() {
    var els = document.querySelectorAll(
      '.markdown-section div.foldertree:not([data-initialized])'
    );
    for (var i = 0; i < els.length; i++) initOne(els[i]);
  }

  // Toggle collapse saat folder diklik (event delegation, tahan pindah halaman)
  document.addEventListener('click', function (e) {
    var folder = e.target.closest
      ? e.target.closest('.foldertree .tree-folder')
      : null;
    if (!folder) return;
    var li = folder.parentElement;
    if (li) li.classList.toggle('collapsed');
  });

  // Registrasi plugin docsify
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat([
    function (hook) {
      // doneEach = DOM halaman sudah selesai dirender -> waktu yang tepat
      hook.doneEach(function () {
        initAll();
      });
    },
  ]);
})();
