/* Revision Desk: draw the subject cards from what each app has saved, work out
   what is furthest behind, and move all six saves in and out of one file. */

(function () {
  'use strict';

  var DAY = 86400000;
  var THEME_KEY = 'revision-desk.theme';

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------------- theme ---------------- */

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  function toggleTheme() {
    var dark = matchMedia('(prefers-color-scheme: dark)').matches;
    var now = document.documentElement.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    var next = now === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode: theme lasts the visit */ }
  }
  applyTheme(storedTheme());

  /* ---------------- formatting ---------------- */

  function ago(ts) {
    if (!ts) return null;
    var d = Math.floor((Date.now() - ts) / DAY);
    if (d <= 0) return 'today';
    if (d === 1) return 'yesterday';
    if (d < 7) return d + ' days ago';
    if (d < 14) return 'last week';
    if (d < 60) return Math.round(d / 7) + ' weeks ago';
    return Math.round(d / 30) + ' months ago';
  }

  function pct(x) { return Math.round(x * 100) + '%'; }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }

  /* Days since the app was last touched. Apps that keep no dates return null. */
  function daysSince(ts) { return ts ? Math.floor((Date.now() - ts) / DAY) : null; }

  /* ---------------- what to revise next ----------------
     A subject needs attention when reviews have piled up, when it has been left
     alone for a while, or when the answers that have been given were mostly
     wrong. Subjects that were never opened come first: an empty subject is the
     biggest gap there is. */

  function needScore(s) {
    if (!s.started) return { score: 1000, why: 'nothing done here yet' };

    var score = 0, why = [];

    if (s.due) {
      score += Math.min(s.due, 40) * 2.5;
      why.push(plural(s.due, 'review') + ' due');
    }

    var d = daysSince(s.last);
    if (d !== null) {
      score += Math.min(d, 21) * 3;
      if (d >= 3) why.push('last opened ' + ago(s.last));
    }

    if (s.accuracy !== null && s.answered >= 8) {
      score += (1 - s.accuracy) * 60;
      if (s.accuracy < 0.7) why.push(pct(s.accuracy) + ' right so far');
    }

    if (s.answered < 20) {
      score += 25;
      if (!why.length) why.push('barely started');
    }

    return { score: score, why: why.slice(0, 2).join(' · ') || 'keep it warm' };
  }

  /* ---------------- rendering ---------------- */

  function renderTotals(rows) {
    var answered = 0, correct = 0, due = 0, streak = 0, open = 0;
    rows.forEach(function (r) {
      answered += r.stats.answered || 0;
      correct += r.stats.correct || 0;
      due += r.stats.due || 0;
      if (r.stats.streak) streak = Math.max(streak, r.stats.streak);
      if (r.stats.started) open++;
    });

    var acc = answered ? pct(correct / answered) : '—';
    var cells = [
      [open + '/' + rows.length, 'subjects started'],
      [answered.toLocaleString(), 'questions answered'],
      [acc, 'answered correctly'],
      [due || '0', 'reviews due now'],
      [streak ? plural(streak, 'day') : '—', 'best streak running']
    ];

    $('#totals').innerHTML = cells.map(function (c) {
      return '<div class="tot"><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div>';
    }).join('');

    var blocked = rows.some(function (r) { return r.stats.blocked; });
    if (blocked) {
      $('#totals').insertAdjacentHTML('afterend',
        '<p class="warn" style="margin-top:12px">This browser is blocking local storage, so progress cannot be read or saved.</p>');
    }
  }

  function renderNext(rows) {
    var ranked = rows.map(function (r) {
      return { row: r, need: needScore(r.stats) };
    }).sort(function (a, b) { return b.need.score - a.need.score; });

    var top = ranked[0];
    if (!top) return;

    var app = top.row.app;
    var anyProgress = rows.some(function (r) { return r.stats.started; });

    $('#next').hidden = false;
    $('#next').innerHTML =
      '<a class="next-card tinted" href="' + esc(app.path) + '" style="--hue:' + app.hue + '">' +
        '<span class="next-mark" aria-hidden="true">' + esc(app.glyph) + '</span>' +
        '<span class="next-body">' +
          '<span class="kicker">' + (anyProgress ? 'Revise next' : 'Start here') + '</span>' +
          '<b>' + esc(app.subject) + '</b>' +
          '<small>' + esc(top.need.why) + '</small>' +
        '</span>' +
        '<span class="next-go">Open ' + esc(app.name) + '</span>' +
      '</a>';
  }

  function cardStats(s) {
    /* Three numbers per card, chosen from what that app actually tracks. */
    var out = [];

    out.push({
      value: s.answered ? s.answered.toLocaleString() : '—',
      label: 'answered'
    });

    out.push({
      value: s.accuracy === null ? '—' : pct(s.accuracy),
      label: 'correct'
    });

    if (s.due !== null && s.due > 0) out.push({ value: s.due, label: s.due === 1 ? 'review due' : 'reviews due', hot: true });
    else if (s.streak !== null && s.streak > 0) out.push({ value: s.streak, label: 'day streak', hot: true });
    else if (s.notes.length) out.push({ value: s.notes[0].value, label: s.notes[0].label });
    else out.push({ value: '—', label: 'no progress yet' });

    return out;
  }

  function renderGrid(rows) {
    $('#grid').innerHTML = rows.map(function (r, i) {
      var app = r.app, s = r.stats;
      var stats = cardStats(s);
      var last = ago(s.last);
      var foot = s.started
        ? (last ? 'Last opened ' + last : 'In progress')
        : 'Not opened yet';

      return '' +
        '<a class="card tinted" href="' + esc(app.path) + '" style="--hue:' + app.hue + '" ' +
           'aria-label="' + esc(app.subject + ' — ' + app.name) + '">' +
          '<div class="card-head">' +
            '<span class="card-mark" aria-hidden="true">' + esc(app.glyph) + '</span>' +
            '<span class="card-title">' +
              '<b>' + esc(app.subject) + '</b>' +
              '<small>' + esc(app.name + ' · ' + app.board + ' ' + app.code) + '</small>' +
            '</span>' +
            '<span class="card-num" aria-hidden="true">' + (i + 1) + '</span>' +
          '</div>' +
          '<p class="card-blurb">' + esc(app.blurb) + '</p>' +
          '<div class="chips">' + app.chips.map(function (c) {
            return '<span class="chip">' + esc(c) + '</span>';
          }).join('') + '</div>' +
          '<div class="card-stats">' + stats.map(function (st) {
            return '<div class="stat' + (st.hot ? ' hot' : '') + '"><b>' + esc(st.value) + '</b>' +
              '<span>' + esc(st.label) + '</span></div>';
          }).join('') + '</div>' +
          '<div class="bar"><i style="width:' +
            (s.accuracy === null ? 0 : Math.round(s.accuracy * 100)) + '%"></i></div>' +
          '<div class="card-foot"><span>' + esc(foot) + '</span>' +
            '<span class="go">Open →</span></div>' +
        '</a>';
    }).join('');
  }

  function draw() {
    var rows = REGISTRY.all();
    renderTotals(rows);
    renderNext(rows);
    renderGrid(rows);
    return rows;
  }

  /* ---------------- backup and restore ---------------- */

  function readRaw(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function exportAll() {
    var payload = { format: 'revision-desk/backup', version: 1, exported: new Date().toISOString(), apps: {} };
    var kept = 0;

    REGISTRY.apps.forEach(function (app) {
      var raw = readRaw(app.key);
      if (raw === null) return;
      try {
        payload.apps[app.id] = { key: app.key, data: JSON.parse(raw) };
        kept++;
      } catch (e) { /* unreadable save: leave it out rather than ship junk */ }
    });

    if (!kept) return note('Nothing to back up yet — no subject has saved any progress in this browser.', 'bad');

    var name = 'revision-desk-' + new Date().toISOString().slice(0, 10) + '.json';
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);

    note('Saved ' + name + ' with ' + plural(kept, 'subject') + '.', 'ok');
  }

  function importFrom(file) {
    var reader = new FileReader();
    reader.onerror = function () { note('That file could not be read.', 'bad'); };
    reader.onload = function () {
      var payload;
      try { payload = JSON.parse(String(reader.result)); } catch (e) {
        return note('That is not a backup file — it is not valid JSON.', 'bad');
      }
      if (!payload || payload.format !== 'revision-desk/backup' || !payload.apps) {
        return note('That is not a Revision Desk backup.', 'bad');
      }

      /* Only restore subjects the desk knows about, and only into their own key. */
      var found = REGISTRY.apps.filter(function (app) {
        var entry = payload.apps[app.id];
        return entry && entry.data && typeof entry.data === 'object';
      });

      if (!found.length) return note('That backup holds no subjects the desk recognises.', 'bad');

      var names = found.map(function (a) { return a.subject; }).join(', ');
      var when = payload.exported ? new Date(payload.exported).toLocaleDateString() : 'an unknown date';
      if (!confirm('Replace the progress for ' + names + ' with the backup from ' + when + '?\n\nThis cannot be undone.')) {
        return note('Restore cancelled. Nothing changed.');
      }

      var done = 0, failed = [];
      found.forEach(function (app) {
        try {
          localStorage.setItem(app.key, JSON.stringify(payload.apps[app.id].data));
          done++;
        } catch (e) { failed.push(app.subject); }
      });

      draw();
      note(failed.length
        ? 'Restored ' + plural(done, 'subject') + '. Could not write: ' + failed.join(', ') + '.'
        : 'Restored ' + plural(done, 'subject') + '.', failed.length ? 'bad' : 'ok');
    };
    reader.readAsText(file);
  }

  function note(msg, kind) {
    var el = $('#sheetNote');
    el.textContent = msg || '';
    el.className = 'sheet-note' + (kind ? ' ' + kind : '');
  }

  function openSheet() {
    $('#sheet').hidden = false;
    note('');
    $('#sheetClose').focus();
  }
  function closeSheet() {
    $('#sheet').hidden = true;
    $('#backupBtn').focus();
  }

  /* ---------------- wiring ---------------- */

  var rows = draw();

  $('#themeBtn').addEventListener('click', toggleTheme);
  $('#backupBtn').addEventListener('click', openSheet);
  $('#sheetClose').addEventListener('click', closeSheet);
  $('#sheet').addEventListener('click', function (e) { if (e.target === $('#sheet')) closeSheet(); });
  $('#exportBtn').addEventListener('click', exportAll);
  $('#importBtn').addEventListener('click', function () { $('#importFile').click(); });
  $('#importFile').addEventListener('change', function () {
    if (this.files && this.files[0]) importFrom(this.files[0]);
    this.value = '';
  });

  document.querySelectorAll('[data-open-backup]').forEach(function (b) {
    b.addEventListener('click', openSheet);
  });

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === 'Escape' && !$('#sheet').hidden) { closeSheet(); return; }

    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key >= '1' && e.key <= String(rows.length)) {
      var app = rows[+e.key - 1].app;
      location.href = app.path;
    } else if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    }
  });

  /* Progress can change in another tab, or while this one sits in the
     background: redraw when the storage or the tab wakes up. */
  window.addEventListener('storage', function () { rows = draw(); });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) rows = draw();
  });
})();
