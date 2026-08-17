/* Assembles the topic data files into one syllabus and exposes lookup helpers. */
(function () {
  'use strict';

  var SPEC = {
    code: '4BI1',
    board: 'Pearson Edexcel',
    name: 'International GCSE Biology',
    papers: [
      { n: 1, time: '2 hours', marks: 110, weight: '61.1%' },
      { n: 2, time: '1 hour 15 minutes', marks: 70, weight: '38.9%' }
    ]
  };

  var TOPICS = [window.BIO_T1, window.BIO_T2, window.BIO_T3, window.BIO_T4, window.BIO_T5]
    .filter(Boolean);

  // back-link every sub to its topic
  TOPICS.forEach(function (t) {
    t.subs.forEach(function (s, i) {
      s.topicId = t.id;
      s.topicTitle = t.title;
      s.index = i;
      s.terms = s.terms || [];
      s.qs = s.qs || [];
      s.notes = s.notes || [];
      s.objectives = s.objectives || [];
    });
  });

  var ALL_SUBS = TOPICS.reduce(function (a, t) { return a.concat(t.subs); }, []);

  function topic(id) {
    for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].id === id) return TOPICS[i];
    return null;
  }
  function sub(id) {
    for (var i = 0; i < ALL_SUBS.length; i++) if (ALL_SUBS[i].id === id) return ALL_SUBS[i];
    return null;
  }
  function nextSub(id) {
    var i = ALL_SUBS.findIndex(function (s) { return s.id === id; });
    return i > -1 && i < ALL_SUBS.length - 1 ? ALL_SUBS[i + 1] : null;
  }
  function prevSub(id) {
    var i = ALL_SUBS.findIndex(function (s) { return s.id === id; });
    return i > 0 ? ALL_SUBS[i - 1] : null;
  }

  /* every key term, tagged with where it came from */
  function allTerms() {
    var out = [];
    ALL_SUBS.forEach(function (s) {
      s.terms.forEach(function (t) {
        out.push({ t: t.t, d: t.d, sub: s.id, subTitle: s.title, topicId: s.topicId });
      });
    });
    return out;
  }

  /* every question, tagged. scope = 'all' | topic id ('3') | sub id ('3b') */
  function questions(scope) {
    var out = [];
    ALL_SUBS.forEach(function (s) {
      if (scope && scope !== 'all' && s.id !== scope && s.topicId !== scope) return;
      s.qs.forEach(function (q, i) {
        out.push(Object.assign({}, q, {
          key: s.id + ':' + i, sub: s.id, subTitle: s.title, topicId: s.topicId
        }));
      });
    });
    return out;
  }

  function counts() {
    return {
      topics: TOPICS.length,
      subs: ALL_SUBS.length,
      terms: allTerms().length,
      questions: questions('all').length,
      practicals: (window.BIO_PRACTICALS || []).length
    };
  }

  /* plain text of a sub, used by search */
  function subText(s) {
    var bits = [s.id, s.title, s.topicTitle].concat(s.objectives);
    s.notes.forEach(function (b) {
      if (typeof b === 'string') { bits.push(b); return; }
      if (b.x) bits.push(Array.isArray(b.x) ? b.x.join(' ') : b.x);
      if (b.term) bits.push(b.term);
      if (b.head) bits.push(b.head.join(' '));
      if (b.rows) b.rows.forEach(function (r) { bits.push(r.join(' ')); });
    });
    s.terms.forEach(function (t) { bits.push(t.t + ' ' + t.d); });
    return bits.join(' • ');
  }

  window.SYL = {
    SPEC: SPEC, TOPICS: TOPICS, ALL_SUBS: ALL_SUBS,
    topic: topic, sub: sub, nextSub: nextSub, prevSub: prevSub,
    allTerms: allTerms, questions: questions, counts: counts, subText: subText
  };
})();
