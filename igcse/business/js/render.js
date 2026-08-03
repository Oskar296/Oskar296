/* render.js — small helpers to turn note data into HTML */

var R = (function () {

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Inline markup allowed inside note text:
       **bold**  *italic*  `code`  [[3.3]] -> link to topic 3.3            */
  function inline(s) {
    var out = esc(s);
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    out = out.replace(/\[\[([\d.]+)\]\]/g, function (m, id) {
      var t = BS.topic(id);
      return '<a href="#/notes/' + id + '">' + id + (t ? ' ' + esc(t.title) : '') + '</a>';
    });
    return out;
  }

  function list(items, ordered) {
    var tag = ordered ? 'ol' : 'ul';
    return '<' + tag + '>' + items.map(function (i) {
      return '<li>' + inline(i) + '</li>';
    }).join('') + '</' + tag + '>';
  }

  function table(t) {
    var h = '<div class="twrap"><table><thead><tr>' +
      t.head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      t.rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>';
    return h;
  }

  var LABELS = { tip: 'Exam tip', warn: 'Common mistake', eg: 'Example', note: 'Note' };

  function callout(c) {
    var kind = c.k || 'note';
    var cls = kind === 'note' ? '' : ' ' + kind;
    var body = Array.isArray(c.b) ? c.b.map(function (p) { return '<p>' + inline(p) + '</p>'; }).join('')
      : '<p>' + inline(c.b) + '</p>';
    return '<div class="callout' + cls + '"><span class="clabel">' + esc(c.t || LABELS[kind] || 'Note') + '</span>' + body + '</div>';
  }

  /* A body is an array of: string | {list} | {num} | {table} | {callout} |
     {formula} | {h3} | {defs:[[term,def],...]}                            */
  function body(blocks) {
    if (!blocks) return '';
    return blocks.map(function (b) {
      if (typeof b === 'string') return '<p>' + inline(b) + '</p>';
      if (b.h3) return '<h3>' + inline(b.h3) + '</h3>';
      if (b.list) return list(b.list, false);
      if (b.num) return list(b.num, true);
      if (b.table) return table(b.table);
      if (b.callout) return callout(b.callout);
      if (b.formula) return '<div class="formula">' + esc(b.formula) + '</div>';
      if (b.diagram) return (typeof DIA !== 'undefined') ? DIA.render(b.diagram) : '';
      if (b.defs) {
        return '<div class="twrap"><table><tbody>' + b.defs.map(function (d) {
          return '<tr><th style="width:32%">' + inline(d[0]) + '</th><td>' + inline(d[1]) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      }
      return '';
    }).join('');
  }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function money(n, cur) {
    var neg = n < 0;
    var s = (Math.round(Math.abs(n) * 100) / 100).toFixed(2).replace(/\.00$/, '');
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '−' : '') + (cur || '$') + parts.join('.');
  }

  function pct(n) { return (Math.round(n * 10) / 10) + '%'; }

  return {
    esc: esc, inline: inline, body: body, table: table, list: list,
    callout: callout, shuffle: shuffle, money: money, pct: pct
  };
})();
