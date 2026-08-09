window.BIO_T1 = {
  id: '1',
  title: 'The nature and variety of living organisms',
  blurb: 'What makes something alive, and the five kingdoms plus viruses you are expected to recognise, describe and give named examples of.',
  subs: [

    /* ================================================== 1a */
    {
      id: '1a',
      title: 'Characteristics of living organisms',
      objectives: [
        'List the eight characteristics shared by all living organisms',
        'Explain what each characteristic means, using the right technical words',
        'Tell the difference between excretion and egestion, and between growth and movement of the whole organism'
      ],
      notes: [
        { t: 'p', x: 'Anything alive does all eight of these. Something that does only a few of them, like a virus or a car engine, is not classed as a living organism.' },
        {
          t: 'table',
          head: ['Characteristic', 'What it means'],
          rows: [
            ['Nutrition', 'Taking in nutrients — organic substances, mineral ions, and for animals also water — to provide energy, raw materials for growth, and materials for repair.'],
            ['Respiration', 'Chemical reactions in cells that break down nutrient molecules to release energy for use in the cell. It is *not* the same as breathing.'],
            ['Excretion', 'Removal of toxic waste made by the body\'s own reactions, plus substances in excess of requirements. Examples: carbon dioxide, urea, excess water and ions.'],
            ['Growth', 'A permanent increase in size and dry mass, caused by an increase in cell number, cell size, or both.'],
            ['Reproduction', 'Making more of the same kind of organism, either sexually or asexually.'],
            ['Sensitivity', 'Detecting changes in the surroundings (stimuli) and making responses to them.'],
            ['Movement', 'An action that changes the position or place of the whole organism or part of it. Plants move too, just slowly — shoots grow towards light.'],
            ['Control of internal conditions', 'Keeping the inside of the body steady: temperature, water content, blood glucose. In humans this is called homeostasis.']
          ]
        },
        {
          t: 'note', k: 'tip', x: 'The usual memory hook is **MRS GREN** — Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition. Edexcel adds **control of internal conditions** as an eighth, so learn MRS GREN + C.'
        },
        { t: 'h', x: 'Excretion is not egestion' },
        { t: 'p', x: 'This is one of the most reliable marks in the whole course, and one of the most commonly dropped.' },
        {
          t: 'table',
          head: ['Excretion', 'Egestion'],
          rows: [
            ['Getting rid of waste **made by the body\'s own chemical reactions**', 'Getting rid of undigested food that **never entered the body\'s cells**'],
            ['Carbon dioxide from respiration, urea from breaking down excess amino acids', 'Faeces passed out through the anus'],
            ['Removed by lungs, kidneys and skin', 'Removed by the alimentary canal']
          ]
        },
        { t: 'note', k: 'warn', x: 'Faeces are egested, not excreted. The only excretory part of faeces is the bile pigment from broken-down haemoglobin.' },
        { t: 'h', x: 'Growth means dry mass' },
        { t: 'p', x: 'A plant that takes up a lot of water gets heavier, but it has not grown. Growth is a *permanent* increase in size and dry mass, so measuring dry mass (mass after all water is driven off) is the fair way to measure it.' },
        { t: 'note', k: 'exam', x: 'If a question asks you to define a term, give the definition in full sentences with the key words. "Respiration is releasing energy" is not enough — say "chemical reactions in cells that break down nutrient molecules to release energy".' }
      ],
      terms: [
        { t: 'Nutrition', d: 'Taking in nutrients — organic substances and mineral ions — which provide energy, and raw materials for growth and repair.' },
        { t: 'Respiration', d: 'The chemical reactions in cells that break down nutrient molecules and release energy for metabolism.' },
        { t: 'Excretion', d: 'Removal from the body of the toxic waste products of metabolism, and substances in excess of requirements.' },
        { t: 'Egestion', d: 'Passing out of undigested food as faeces through the anus. Not the same as excretion.' },
        { t: 'Growth', d: 'A permanent increase in size and dry mass, by an increase in cell number, cell size, or both.' },
        { t: 'Sensitivity', d: 'The ability to detect and respond to changes in the internal or external environment.' },
        { t: 'Stimulus', d: 'A change in the environment that an organism can detect and respond to.' },
        { t: 'Homeostasis', d: 'Keeping a constant internal environment inside the body — temperature, water content and blood glucose.' },
        { t: 'Dry mass', d: 'The mass of an organism after all its water has been removed. Used to measure growth fairly.' },
        { t: 'Metabolism', d: 'All the chemical reactions taking place inside an organism.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which of these is an example of excretion?', o: ['Passing out faeces', 'Breathing out carbon dioxide', 'Sweating out excess salt after eating a salty meal', 'Losing a milk tooth'], a: 1, e: 'Carbon dioxide is made by respiration in the cells, so removing it is excretion. Faeces are egested. Excess salt from food never took part in a reaction, so removing it is closer to osmoregulation, but the safest exam example is carbon dioxide or urea.' },
        { t: 'mcq', q: 'A seedling is left in the dark for four days. Its shoot gets longer but its dry mass falls. Which statement is correct?', o: ['It has grown, because it got longer', 'It has not grown, because dry mass has fallen', 'It has grown because cells divided', 'Growth cannot be judged from dry mass'], a: 1, e: 'Growth is a permanent increase in size **and** dry mass. In the dark the seedling cannot photosynthesise, so it is using up its stored food in respiration and its dry mass falls.' },
        { t: 'mcq', q: 'Which characteristic is described as "chemical reactions in cells that break down nutrient molecules to release energy"?', o: ['Nutrition', 'Excretion', 'Respiration', 'Metabolism'], a: 2, e: 'That is the definition of respiration. Note it happens in cells, and it is not breathing.' },
        { t: 'mcq', q: 'A plant shoot bends towards a window. Which two characteristics of living organisms does this show?', o: ['Nutrition and growth', 'Sensitivity and movement', 'Excretion and respiration', 'Reproduction and sensitivity'], a: 1, e: 'The plant detects the light (sensitivity) and part of it changes position (movement). This particular response is called positive phototropism.' },
        { t: 'saq', q: 'State what is meant by excretion.', m: 2, ms: ['Removal of the toxic waste products of metabolism / of the body\'s own chemical reactions;', 'and of substances in excess of requirements;', 'e.g. carbon dioxide from respiration or urea from the breakdown of excess amino acids.'] },
        { t: 'saq', q: 'Explain why dry mass, rather than wet mass, is used when measuring the growth of a plant.', m: 3, ms: ['Wet mass includes water;', 'the amount of water in a plant changes from hour to hour / with the water available, and is not permanent growth;', 'dry mass measures the actual material made by the plant, so it is a fair measure of growth;', '(drawback: the plant has to be killed and dried, so different plants must be used each time).'] },
        { t: 'saq', q: 'Give three characteristics of living organisms other than movement and nutrition, and state what each one means.', m: 6, ms: ['Respiration — chemical reactions in cells that break down nutrient molecules to release energy;', 'Excretion — removal of the toxic waste products of metabolism and substances in excess of requirements;', 'Growth — a permanent increase in size and dry mass;', 'Reproduction — producing more of the same kind of organism;', 'Sensitivity — detecting and responding to changes in the environment;', 'Control of internal conditions — keeping temperature, water content and blood glucose steady.'] },
        { t: 'saq', q: 'A student says "a car is alive because it moves, uses fuel and gives off waste gases". Give two reasons why a car is not a living organism.', m: 2, ms: ['A car does not reproduce / cannot make more cars;', 'a car does not grow;', 'a car is not made of cells / does not respire (its fuel is burned, not broken down by enzymes in cells);', 'a car does not respond to stimuli by itself.'] }
      ]
    },

    /* ================================================== 1b */
    {
      id: '1b',
      title: 'Variety of living organisms',
      objectives: [
        'Describe the features of plants, animals, fungi, protoctists, bacteria and viruses',
        'Give a named example from each group, and say what it is used for or what it causes',
        'Explain why viruses are not classed as living organisms',
        'Define a pathogen and give an example from each of four groups'
      ],
      notes: [
        { t: 'p', x: 'You need the features **and** the named examples. Examiners often give a description and ask which group it belongs to, or ask for an example by name.' },
        { t: 'h', x: 'Plants' },
        {
          t: 'ul', x: [
            'Multicellular, with cells that contain **chloroplasts** and can photosynthesise',
            'Cell walls made of **cellulose**',
            'Store carbohydrate as **starch** or **sucrose**',
            'Examples: **maize** (a cereal), **peas** and **beans** (legumes)'
          ]
        },
        { t: 'h', x: 'Animals' },
        {
          t: 'ul', x: [
            'Multicellular, cells have **no chloroplasts** and **no cell wall**',
            'Cannot photosynthesise, so they feed on other organisms',
            'Usually have **nervous coordination** and can move from place to place',
            'Store carbohydrate as **glycogen**',
            'Examples: **mammals** such as humans, **insects** such as the housefly and the mosquito'
          ]
        },
        { t: 'h', x: 'Fungi' },
        {
          t: 'ul', x: [
            'Some are single-celled, like **yeast**. Others, like **Mucor**, have a body called a **mycelium** made of thread-like **hyphae**, containing many nuclei',
            'Cell walls made of **chitin**, not cellulose',
            'No chloroplasts, so they cannot photosynthesise',
            'Feed by **saprotrophic nutrition**: they secrete digestive enzymes onto dead material outside the body, then absorb the digested products',
            'Store carbohydrate as **glycogen**'
          ]
        },
        { t: 'def', term: 'Saprotroph', x: 'An organism that feeds on dead or decaying material by secreting enzymes onto it and absorbing the small soluble products. This is extracellular digestion — the digestion happens outside the organism.' },
        { t: 'h', x: 'Protoctists' },
        {
          t: 'ul', x: [
            'Microscopic and usually single-celled',
            'Some have features like animal cells, e.g. **Amoeba**, which lives in pond water',
            'Some have chloroplasts and are more like plant cells, e.g. **Chlorella**',
            'Some are pathogens, e.g. **Plasmodium**, which causes malaria'
          ]
        },
        { t: 'h', x: 'Bacteria' },
        {
          t: 'ul', x: [
            'Microscopic single-celled organisms with a **cell wall**, **cell membrane**, **cytoplasm** and **plasmids**',
            'They lack a nucleus — instead they have a **circular chromosome of DNA** loose in the cytoplasm',
            'Some can photosynthesise; most feed off other living or dead organisms',
            'Examples: **Lactobacillus bulgaricus**, a rod-shaped bacterium used to make yoghurt from milk; **Pneumococcus**, a spherical bacterium that causes pneumonia'
          ]
        },
        { t: 'h', x: 'Viruses' },
        {
          t: 'ul', x: [
            'Not made of cells, and much smaller than bacteria',
            'A **protein coat** surrounding either **DNA or RNA** — no cytoplasm, no nucleus, no organelles',
            'They can only reproduce **inside living host cells**, so they are all parasites',
            'Examples: the **tobacco mosaic virus**, which discolours tobacco leaves by stopping chloroplasts forming; the **influenza virus**, which causes flu; **HIV**, which causes AIDS'
          ]
        },
        { t: 'note', k: 'exam', x: 'Why are viruses not classed as living? They cannot carry out any of the characteristics of living organisms on their own — no respiration, no nutrition, no excretion, no growth — and they cannot reproduce without hijacking a host cell.' },
        { t: 'h', x: 'Pathogens' },
        { t: 'def', term: 'Pathogen', x: 'A microorganism that causes disease.' },
        {
          t: 'table',
          head: ['Group', 'Example pathogen', 'Disease'],
          rows: [
            ['Fungi', '*Pneumocystis*', 'A lung infection, mainly in people with damaged immune systems'],
            ['Bacteria', '*Pneumococcus*', 'Pneumonia'],
            ['Protoctists', '*Plasmodium*', 'Malaria'],
            ['Viruses', 'HIV, influenza virus, tobacco mosaic virus', 'AIDS, flu, mosaic disease in tobacco plants']
          ]
        },
        {
          t: 'table',
          head: ['Feature', 'Plant', 'Animal', 'Fungus', 'Bacterium'],
          rows: [
            ['Nucleus', 'yes', 'yes', 'yes', 'no'],
            ['Cell wall', 'cellulose', 'none', 'chitin', 'yes (not cellulose)'],
            ['Chloroplasts', 'yes', 'no', 'no', 'no (some photosynthesise without them)'],
            ['Carbohydrate store', 'starch / sucrose', 'glycogen', 'glycogen', '—'],
            ['Number of cells', 'many', 'many', 'one or many', 'one']
          ]
        }
      ],
      terms: [
        { t: 'Multicellular', d: 'Made of many cells.' },
        { t: 'Cellulose', d: 'The carbohydrate that plant cell walls are made from.' },
        { t: 'Chitin', d: 'The substance fungal cell walls are made from.' },
        { t: 'Mycelium', d: 'The body of a multicellular fungus, made of a network of thread-like hyphae.' },
        { t: 'Hyphae', d: 'The thread-like structures that make up a fungal mycelium; they contain many nuclei.' },
        { t: 'Saprotrophic nutrition', d: 'Feeding on dead material by secreting enzymes onto it outside the body and absorbing the digested products.' },
        { t: 'Glycogen', d: 'The carbohydrate storage molecule of animals and fungi.' },
        { t: 'Plasmid', d: 'A small circle of DNA in a bacterium, separate from the main circular chromosome.' },
        { t: 'Pathogen', d: 'A microorganism that causes disease.' },
        { t: 'Parasite', d: 'An organism that lives in or on another organism (the host) and causes it harm.' },
        { t: 'Amoeba', d: 'A single-celled protoctist found in pond water, with features like an animal cell.' },
        { t: 'Chlorella', d: 'A single-celled protoctist with chloroplasts, so it has features like a plant cell.' },
        { t: 'Plasmodium', d: 'The protoctist pathogen that causes malaria.' },
        { t: 'Lactobacillus bulgaricus', d: 'A rod-shaped bacterium used to turn milk into yoghurt.' },
        { t: 'Pneumococcus', d: 'A spherical bacterium that causes pneumonia.' },
        { t: 'Tobacco mosaic virus', d: 'A virus that discolours the leaves of tobacco plants by preventing chloroplasts forming.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which group contains organisms with cell walls made of chitin?', o: ['Plants', 'Fungi', 'Bacteria', 'Protoctists'], a: 1, e: 'Fungal cell walls are chitin. Plant walls are cellulose; bacterial walls are made of something different again; most protoctists have no wall.' },
        { t: 'mcq', q: 'An organism is single-celled, has no nucleus, and has a circular chromosome and plasmids. What is it?', o: ['A protoctist', 'A yeast', 'A bacterium', 'A virus'], a: 2, e: 'No nucleus plus a circular chromosome and plasmids identifies a bacterium. Yeast is a fungus, so it does have a nucleus.' },
        { t: 'mcq', q: 'Why can viruses only reproduce inside a host cell?', o: ['They need warmth', 'They have no cell structures of their own to copy their genetic material', 'They need oxygen from the host', 'They feed on the host\'s glucose'], a: 1, e: 'A virus is only a protein coat around DNA or RNA. It has no ribosomes, enzymes or cytoplasm, so it has to use the host cell\'s machinery.' },
        { t: 'mcq', q: 'Which pair correctly matches an organism to its carbohydrate store?', o: ['Human — starch', 'Maize — glycogen', 'Yeast — glycogen', 'Amoeba — cellulose'], a: 2, e: 'Fungi and animals store glycogen; plants store starch or sucrose. Cellulose is a structural molecule, not a store.' },
        { t: 'mcq', q: 'Mucor feeds by secreting enzymes onto bread and absorbing the products. This is called:', o: ['Parasitic nutrition', 'Autotrophic nutrition', 'Saprotrophic nutrition', 'Holozoic nutrition'], a: 2, e: 'Feeding on dead material by extracellular digestion is saprotrophic nutrition.' },
        { t: 'saq', q: 'Give three features that all plants share.', m: 3, ms: ['Multicellular;', 'cells contain chloroplasts / can photosynthesise;', 'cell walls made of cellulose;', 'store carbohydrate as starch or sucrose.'] },
        { t: 'saq', q: 'Describe the structure of a virus and explain why viruses are not usually classed as living organisms.', m: 4, ms: ['A virus is a protein coat surrounding genetic material, which is DNA or RNA;', 'it has no cytoplasm, nucleus or other cell structures / it is not a cell;', 'it cannot carry out respiration, nutrition, excretion or growth;', 'it can only reproduce inside a living host cell, using the host\'s machinery.'] },
        { t: 'saq', q: 'Name one pathogen from each of the following groups and state the disease it causes: bacteria, protoctists, viruses.', m: 3, ms: ['Bacteria: Pneumococcus — pneumonia;', 'Protoctists: Plasmodium — malaria;', 'Viruses: HIV — AIDS (or influenza virus — flu, or tobacco mosaic virus — mosaic disease in tobacco).'] },
        { t: 'saq', q: 'Yeast and Mucor are both fungi, but they look very different. Describe one difference in their structure and one feature they share.', m: 3, ms: ['Difference: yeast is single-celled, while Mucor is multicellular with a mycelium made of hyphae containing many nuclei;', 'shared: both have cell walls made of chitin;', 'shared: neither has chloroplasts, and both feed saprotrophically and store glycogen.'] }
      ]
    }
  ]
};
