/* Turns note blocks into HTML, plus a few shared UI helpers. */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* very small inline formatter: **bold**, *italic*, `code` */
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<i>$2</i>');
  }

  var NOTE_TITLE = {
    tip: 'Remember', exam: 'In the exam', warn: 'Common mistake',
    link: 'Links to', prac: 'Practical'
  };

  function block(b) {
    if (typeof b === 'string') return '<p>' + inline(b) + '</p>';
    switch (b.t) {
      case 'h':
        return '<h2>' + inline(b.x) + '</h2>';
      case 'h3':
        return '<h3>' + inline(b.x) + '</h3>';
      case 'p':
        return '<p>' + inline(b.x) + '</p>';
      case 'ul':
        return '<ul>' + b.x.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ul>';
      case 'ol':
        return '<ol>' + b.x.map(function (i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</ol>';
      case 'table':
        return '<div class="tablewrap"><table><thead><tr>' +
          b.head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          b.rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') +
          '</tbody></table></div>';
      case 'eq':
        return '<div class="eq">' + (b.label ? '<b>' + esc(b.label) + '</b>' : '') +
          (Array.isArray(b.x) ? b.x.map(inline).join('<br/>') : inline(b.x)) + '</div>';
      case 'note':
        return '<div class="callout ' + esc(b.k || 'tip') + '">' +
          '<div class="ct">' + esc(b.title || NOTE_TITLE[b.k] || 'Note') + '</div>' +
          (Array.isArray(b.x) ? b.x.map(function (p) { return '<p>' + inline(p) + '</p>'; }).join('')
            : '<p>' + inline(b.x) + '</p>') + '</div>';
      case 'def':
        return '<div class="defbox"><b>' + inline(b.term) + '</b> — ' + inline(b.x) + '</div>';
      case 'fig':
        var svg = (window.DIAGRAMS || {})[b.id];
        if (!svg) return '';
        return '<figure class="figure">' + svg +
          (b.cap ? '<figcaption>' + inline(b.cap) + '</figcaption>' : '') + '</figure>';
      default:
        return '';
    }
  }

  function blocks(list) { return (list || []).map(block).join(''); }

  function bar(pct) {
    return '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>';
  }

  function objectives(list) {
    if (!list || !list.length) return '';
    return '<ul class="obj">' + list.map(function (o) { return '<li><span>' + inline(o) + '</span></li>'; }).join('') + '</ul>';
  }

  function terms(list) {
    if (!list || !list.length) return '';
    return '<div class="terms">' + list.map(function (t) {
      return '<div class="term"><b>' + inline(t.t) + '</b><span>' + inline(t.d) + '</span></div>';
    }).join('') + '</div>';
  }

  window.R = { esc: esc, inline: inline, block: block, blocks: blocks, bar: bar, objectives: objectives, terms: terms };
})();
