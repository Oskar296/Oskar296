/* The 2027-2029 syllabus structure: two papers of five topics each.
   Topics are composed from the prose in the content-*.js files, so the notes
   live in one place and this file only decides how they are filed. */
(function (G) {
  'use strict';

  var SPEC = [
    {
      id: '1',
      title: 'Physical geography',
      paper: 'Paper 1',
      blurb: 'Rivers, coasts, ecosystems, tectonic hazards and climate change.',
      topics: [
        { id: 'rivers', title: 'Changing river environments',
          blurb: 'Drainage basins, river processes, the landforms they build, and flood risk and its management.',
          from: [{ u: '2.2' }] },
        { id: 'coasts', title: 'Changing coastal environments',
          blurb: 'Waves and longshore drift, erosional and depositional landforms, coral and mangroves, and coastal defence.',
          from: [{ u: '2.3' }] },
        { id: 'ecosystems', title: 'Changing ecosystems',
          blurb: 'Equatorial and hot desert climates, rainforest and desert adaptation, deforestation and sustainable management.',
          from: [{ u: '2.5' }] },
        { id: 'tectonics', title: 'Tectonic hazards',
          blurb: 'Plate margins, earthquakes and volcanoes, why people live with the risk, and how the risk is reduced.',
          from: [{ u: '2.1' }] },
        { id: 'climate-change', title: 'Climate change',
          blurb: 'The enhanced greenhouse effect, the evidence, causes, impacts, and mitigation against adaptation.',
          from: [{ u: '2.4' }] }
      ]
    },
    {
      id: '2',
      title: 'Human geography',
      paper: 'Paper 2',
      blurb: 'Populations, settlements and cities, development, economic activity and resources.',
      topics: [
        { id: 'populations', title: 'Changing populations',
          blurb: 'Growth and the DTM, migration, population structure, and density and distribution.',
          from: [{ u: '1.1' }, { u: '1.2' }, { u: '1.3' }, { u: '1.4' }] },
        { id: 'towns-cities', title: 'Changing towns and cities',
          blurb: 'Settlement site and hierarchy, urban land use, urbanisation and squatter settlements.',
          from: [{ u: '1.5' }, { u: '1.6' }, { u: '1.7' }] },
        { id: 'development', title: 'Development',
          blurb: 'Measuring development, inequality within and between countries, employment sectors and globalisation.',
          from: [{ u: '3.1' }] },
        { id: 'economies', title: 'Changing economies',
          blurb: 'Farming systems and food shortages, industrial location, and the benefits and costs of tourism.',
          from: [{ u: '3.2' }, { u: '3.3' }, { u: '3.4' }] },
        { id: 'resources', title: 'Resource provision',
          blurb: 'Energy sources, water supply and demand, and the environmental risks of economic development.',
          /* Air pollution from the old 3.7 sits under Climate change instead. */
          from: [{ u: '3.5' }, { u: '3.6' }, { u: '3.7', except: ['Air pollution'] }] }
      ]
    }
  ];

  /* Sections deliberately dropped from their old home because a rewritten
     version lives elsewhere. Recorded explicitly so the content check can tell
     a deliberate replacement from an accidental loss. */
  G.superseded = [
    { unit: '3.7', section: 'Air pollution',
      replacedBy: { topic: 'climate-change', section: 'Air pollution and the atmosphere' } }
  ];

  function pickSections(src) {
    var unit = G.unit(src.u);
    if (!unit) return [];
    var out = unit.sections;
    if (src.only) out = out.filter(function (s) { return src.only.indexOf(s.h) >= 0; });
    if (src.except) out = out.filter(function (s) { return src.except.indexOf(s.h) < 0; });
    return out;
  }

  G.papers = SPEC.map(function (p) {
    return {
      id: p.id,
      title: p.title,
      paper: p.paper,
      blurb: p.blurb,
      topics: p.topics.map(function (t) {
        var extra = (G.extra && G.extra[t.id]) || [];
        var sourced = [];
        var covers = [];
        var cases = [];
        var units = [];

        t.from.forEach(function (src) {
          var unit = G.unit(src.u);
          if (!unit) return;
          units.push(src.u);
          sourced = sourced.concat(pickSections(src));
          covers = covers.concat(unit.objectives || []);
          (unit.cases || []).forEach(function (c) { if (cases.indexOf(c) < 0) cases.push(c); });
        });

        /* A case study can also name a topic directly, which is how the new
           topics get examples without inventing an old unit tag for them. */
        G.cases.forEach(function (c) {
          if ((c.topics || []).indexOf(t.id) >= 0 && cases.indexOf(c.id) < 0) cases.push(c.id);
        });

        return {
          id: t.id,
          title: t.title,
          blurb: t.blurb,
          paperId: p.id,
          paperTitle: p.title,
          sections: extra.concat(sourced),
          covers: covers,
          cases: cases,
          units: units
        };
      })
    };
  });

  G.allTopics = function () {
    var out = [];
    G.papers.forEach(function (p) { out = out.concat(p.topics); });
    return out;
  };

  G.topic = function (id) {
    return G.allTopics().filter(function (t) { return t.id === id; })[0] || null;
  };

  G.paper = function (id) {
    return G.papers.filter(function (p) { return p.id === id; })[0] || null;
  };

  /* Glossary entries and questions are still tagged with the old unit ids,
     which stay stable as the prose moves. These map them onto a topic. */
  var unitToTopic = {};
  G.allTopics().forEach(function (t) {
    t.units.forEach(function (u) { unitToTopic[u] = t.id; });
  });

  /* Accepts an old unit id or a topic id, so new content written after the
     restructure can be tagged with the topic directly. */
  G.topicForUnit = function (id) {
    if (unitToTopic[id]) return unitToTopic[id];
    return G.topic(id) ? id : null;
  };

  G.topicItems = function (topicId, list, key) {
    return list.filter(function (item) { return G.topicForUnit(item[key]) === topicId; });
  };

  /* Progress is stored per topic now, so the old per-unit keys are ignored. */
  G.topicDone = function (id) { return !!G.progress.done[id]; };

})(window.GEO);
