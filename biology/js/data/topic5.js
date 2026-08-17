window.BIO_T5 = {
  id: '5',
  title: 'Use of biological resources',
  blurb: 'How people use living organisms: growing more food, brewing and baking with microorganisms, fish farming, selective breeding, genetic modification and cloning.',
  subs: [

    /* ================================================== 5a */
    {
      id: '5a',
      title: 'Food production: crops, microorganisms and fish',
      objectives: [
        'Explain how glasshouses and polytunnels increase crop yield',
        'Explain the use of fertilisers and of biological and chemical pest control',
        'Describe the use of yeast in bread and beer, and of bacteria in yoghurt',
        'Describe how fish farming increases production'
      ],
      notes: [
        { t: 'h', x: 'Growing crops under cover' },
        { t: 'p', x: 'Glasshouses and polytunnels let a grower control the limiting factors of photosynthesis, so plants grow faster and the crop can be harvested all year.' },
        {
          t: 'table',
          head: ['What the grower controls', 'How', 'Why it raises yield'],
          rows: [
            ['Temperature', 'Trapped heat, plus heaters in winter; vents in summer', 'Enzymes controlling photosynthesis work faster, up to the optimum'],
            ['Carbon dioxide', 'Paraffin heaters or CO₂ from cylinders', 'CO₂ is often the limiting factor on a bright day'],
            ['Light', 'Lamps to extend the day length', 'More light energy for photosynthesis, so more glucose is made'],
            ['Water and minerals', 'Irrigation and added fertiliser', 'No shortage of raw materials for growth'],
            ['Pests and disease', 'Enclosed space keeps pests out and lets a grower use biological control effectively', 'Less of the crop is eaten or damaged']
          ]
        },
        { t: 'note', k: 'link', x: 'This is limiting factors from **2e** applied commercially. Growers only increase a factor while it is still the limiting one — otherwise the extra heating or lighting costs money for no extra yield.' },
        { t: 'h', x: 'Fertilisers' },
        {
          t: 'ul', x: [
            'Harvesting a crop removes mineral ions from the soil, because the plants are taken away instead of decaying in place',
            'Fertilisers replace **nitrates** (for amino acids and proteins), **phosphates** (for DNA and cell membranes), **potassium** (for enzymes in photosynthesis and respiration) and **magnesium** (for chlorophyll)',
            'The result is faster growth and a bigger yield',
            'Overuse causes **eutrophication** when the excess is leached into rivers and lakes — see **4d**'
          ]
        },
        { t: 'h', x: 'Pest control' },
        {
          t: 'table',
          head: ['', 'Chemical pesticides', 'Biological control'],
          rows: [
            ['How it works', 'Chemicals sprayed to kill the pest', 'A natural predator, parasite or disease of the pest is introduced'],
            ['Speed', 'Fast, and effective immediately', 'Slower — the predator population has to build up'],
            ['Advantages', 'Kills a large proportion of the pest quickly; easy to apply', 'No chemicals on the crop; no build-up along food chains; self-sustaining once established'],
            ['Disadvantages', 'May kill harmless or useful species; pests can become resistant; the chemical can build up along food chains and poison predators; may run off into water', 'Never removes the pest completely; the introduced species may itself become a pest, or attack other species']
          ]
        },
        { t: 'h', x: 'Microorganisms in food' },
        { t: 'p', x: '**Yeast** is a single-celled fungus that respires anaerobically, which is called fermentation:' },
        { t: 'eq', label: 'Fermentation in yeast', x: 'glucose → ethanol + carbon dioxide (+ energy released)' },
        {
          t: 'table',
          head: ['Product', 'What is used', 'Why it works'],
          rows: [
            ['Bread', 'Yeast mixed into dough and left in a warm place', 'The carbon dioxide produced is trapped as bubbles, so the dough rises. Baking kills the yeast and evaporates the ethanol'],
            ['Beer', 'Barley grains are germinated (malting) so amylase converts starch to maltose; the sugar solution is fermented by yeast in an anaerobic vessel; hops are added for flavour', 'Yeast produces ethanol from the sugars. Fermentation is anaerobic, so the yeast makes ethanol rather than just carbon dioxide and water'],
            ['Yoghurt', 'Milk is pasteurised, cooled, and *Lactobacillus* bacteria are added and kept warm', 'The bacteria ferment the milk sugar lactose into lactic acid, which lowers the pH, clots the milk protein and thickens it, and preserves it by stopping other bacteria growing']
          ]
        },
        { t: 'note', k: 'exam', x: 'In a fermenter, conditions are controlled: the right temperature (a water jacket removes the heat produced), the right pH, sterile conditions to keep contaminating microorganisms out, and a supply of nutrients. Paddles stir the mixture so the organisms stay in contact with the nutrients.' },
        { t: 'h', x: 'Fish farming' },
        {
          t: 'ul', x: [
            'Fish are kept in **cages or tanks**, which stops them using energy swimming long distances and keeps predators out',
            'They are fed **high-protein food** in controlled amounts, so they grow quickly and food is not wasted',
            'Different **age groups are kept separate**, so large fish do not eat small ones and each group gets the right food',
            'Water quality is monitored, and disease and parasites are controlled with treatments',
            'Selective breeding produces fast-growing fish',
            'Problems: waste and uneaten food cause eutrophication nearby, disease and parasites spread quickly in crowded conditions, and the food pellets are often made from wild-caught fish'
          ]
        },
        { t: 'note', k: 'link', x: 'Eating plants rather than meat feeds more people from the same land, because each trophic level loses about 90% of the energy — see **4b**.' }
      ],
      terms: [
        { t: 'Fertiliser', d: 'A substance added to soil to replace the mineral ions removed when crops are harvested.' },
        { t: 'Pesticide', d: 'A chemical used to kill organisms that damage crops.' },
        { t: 'Biological control', d: 'Controlling a pest by introducing a natural predator, parasite or pathogen of that pest.' },
        { t: 'Fermentation', d: 'Anaerobic respiration in yeast, producing ethanol and carbon dioxide.' },
        { t: 'Fermenter', d: 'A vessel in which microorganisms are grown under controlled conditions of temperature, pH, nutrients and sterility.' },
        { t: 'Malting', d: 'Germinating barley so that its amylase converts starch into maltose for brewing.' },
        { t: 'Pasteurisation', d: 'Heating milk to kill unwanted microorganisms before the culture is added.' },
        { t: 'Lactobacillus', d: 'The bacterium that ferments lactose in milk into lactic acid to make yoghurt.' },
        { t: 'Yield', d: 'The amount of useful product obtained from a crop or animal.' }
      ],
      qs: [
        { t: 'mcq', q: 'A grower burns paraffin heaters in a glasshouse. This increases yield because it provides:', o: ['Extra oxygen and light', 'Extra heat and carbon dioxide', 'Extra water and nitrate', 'Extra minerals'], a: 1, e: 'Burning paraffin releases both heat and carbon dioxide, two limiting factors of photosynthesis.' },
        { t: 'mcq', q: 'Which gas produced by yeast makes bread dough rise?', o: ['Oxygen', 'Ethanol vapour', 'Carbon dioxide', 'Nitrogen'], a: 2, e: 'Carbon dioxide from fermentation is trapped in the dough as bubbles.' },
        { t: 'mcq', q: 'Yoghurt thickens because Lactobacillus bacteria:', o: ['Digest the fat in milk', 'Produce lactic acid, which clots the milk protein', 'Produce ethanol', 'Release carbon dioxide'], a: 1, e: 'The bacteria ferment lactose into lactic acid, lowering the pH so the protein coagulates.' },
        { t: 'mcq', q: 'An advantage of biological control over chemical pesticides is that:', o: ['It removes the pest completely', 'It works faster', 'It does not build up along food chains', 'It is always cheaper'], a: 2, e: 'No chemical is added, so nothing accumulates in predators further up the chain. It is slower and never eliminates the pest entirely.' },
        { t: 'mcq', q: 'Why are fish of different ages kept in separate tanks on a fish farm?', o: ['To stop larger fish eating smaller ones and to feed each group correctly', 'To increase water temperature', 'To reduce the oxygen needed', 'To prevent selective breeding'], a: 0, e: 'Separating age groups avoids cannibalism and lets the farmer match the food type and amount to the size of the fish.' },
        { t: 'saq', q: 'Explain how growing tomatoes in a glasshouse increases the yield compared with growing them outside.', m: 5, ms: ['The temperature can be kept higher, so the enzymes controlling photosynthesis work faster;', 'carbon dioxide concentration can be increased, for example with a paraffin heater, removing it as a limiting factor;', 'lamps extend the hours of light, so photosynthesis continues for longer;', 'water and mineral ions can be supplied by irrigation and fertiliser so growth is not limited;', 'pests and disease can be excluded or controlled, so less of the crop is damaged;', 'so more glucose is made, more of it is converted into new plant material, and the yield rises.'] },
        { t: 'saq', q: 'Describe how beer is made from barley.', m: 4, ms: ['Barley grains are allowed to germinate, which is called malting;', 'amylase in the grains converts the starch into maltose, giving a sugar solution;', 'yeast is added and the mixture is kept in anaerobic conditions in a fermenter;', 'the yeast ferments the sugar into ethanol and carbon dioxide;', 'hops are added for flavour, and the liquid is filtered.'] },
        { t: 'saq', q: 'Give two advantages and two disadvantages of using chemical pesticides.', m: 4, ms: ['Advantages: they kill the pest quickly and effectively, so damage to the crop is reduced immediately; they are easy to apply over a large area;', 'disadvantages: they may kill harmless or useful organisms such as pollinators; pests can become resistant through natural selection; the chemical can accumulate along food chains and poison top predators; it can be washed into waterways.'] },
        { t: 'saq', q: 'Explain why the conditions in a fermenter must be kept sterile.', m: 2, ms: ['Other microorganisms would compete with the culture for nutrients, reducing the yield;', 'they could also produce unwanted or harmful products and spoil the batch.'] }
      ]
    },

    /* ================================================== 5b */
    {
      id: '5b',
      title: 'Selective breeding',
      objectives: [
        'Describe the process of selective breeding',
        'Give examples of what it is used for',
        'Discuss the disadvantages, including inbreeding'
      ],
      notes: [
        { t: 'def', term: 'Selective breeding', x: 'Choosing the individuals with the most useful characteristics and breeding them together, repeating this over many generations so that the desirable characteristic becomes more common and more pronounced. It is also called artificial selection.' },
        {
          t: 'ol', x: [
            'Choose the parents that show the desired characteristic most strongly',
            'Breed them together',
            'From the offspring, again select those with the best form of the characteristic',
            'Breed those together',
            'Repeat over many generations, and the characteristic steadily improves'
          ]
        },
        {
          t: 'table',
          head: ['Used to produce', 'Examples'],
          rows: [
            ['Higher-yielding crops', 'Wheat with more grain, larger fruit, faster-growing plants'],
            ['Disease resistance', 'Crop varieties resistant to a fungus; sheep resistant to parasites'],
            ['More productive animals', 'Cows that produce more milk, hens that lay more eggs, sheep with more wool or meat'],
            ['Useful features', 'Dogs bred for herding, guiding or scent; hardy plants that tolerate drought or cold']
          ]
        },
        { t: 'note', k: 'exam', x: 'Selective breeding is **not** genetic engineering. No genes are moved between organisms — the breeder only chooses which existing individuals reproduce. It is also slow, because it takes many generations.' },
        { t: 'h', x: 'The downside' },
        {
          t: 'ul', x: [
            'Selecting from a small group of "best" individuals over and over reduces **genetic variation** in the population',
            'Less variation means the population is more vulnerable: a new disease or a change in conditions could affect nearly all of them, because they are so genetically similar',
            'Closely related individuals are often bred together (**inbreeding**), which increases the chance of two copies of a harmful recessive allele coming together, so inherited defects become more common',
            'Some breeds develop health problems as a side effect of the feature being selected, for example dogs bred for a particular head shape that then have breathing difficulties'
          ]
        },
        { t: 'note', k: 'link', x: 'Compare with **natural selection** in **3e**. The mechanism is the same — some individuals reproduce and pass on their alleles — but here the *selection pressure* is a human decision instead of the environment.' }
      ],
      terms: [
        { t: 'Selective breeding', d: 'Choosing organisms with desirable characteristics and breeding them together over many generations; also called artificial selection.' },
        { t: 'Artificial selection', d: 'Another name for selective breeding, where humans rather than the environment decide which individuals reproduce.' },
        { t: 'Inbreeding', d: 'Breeding closely related individuals together, which increases the chance of harmful recessive alleles pairing up.' },
        { t: 'Genetic variation', d: 'The range of different alleles in a population; selective breeding reduces it.' }
      ],
      qs: [
        { t: 'mcq', q: 'Selective breeding involves:', o: ['Inserting genes from one species into another', 'Choosing which individuals are allowed to reproduce', 'Cloning an adult organism', 'Exposing organisms to radiation'], a: 1, e: 'The breeder selects the parents; no genes are transferred between organisms.' },
        { t: 'mcq', q: 'A major disadvantage of selective breeding is that it:', o: ['Increases genetic variation too much', 'Reduces genetic variation, making the population vulnerable to disease', 'Works too quickly to control', 'Produces sterile offspring'], a: 1, e: 'Breeding from a narrow group of individuals removes alleles from the population, so a new disease could affect nearly all of them.' },
        { t: 'mcq', q: 'Compared with genetic engineering, selective breeding is:', o: ['Faster and more precise', 'Slower and less precise, taking many generations', 'Only possible in plants', 'Unable to change any characteristic'], a: 1, e: 'It relies on existing variation and needs many generations, but it needs no laboratory techniques.' },
        { t: 'saq', q: 'Describe how a farmer could use selective breeding to produce cows that give more milk.', m: 4, ms: ['Choose the cows that produce the most milk and breed them with a bull from a high-yielding family;', 'from the offspring, select the females that produce the most milk;', 'breed these selected offspring together;', 'repeat the process over many generations, and the average milk yield of the herd increases.'] },
        { t: 'saq', q: 'Explain why inbreeding can be a problem in selectively bred populations.', m: 3, ms: ['Inbreeding means breeding closely related individuals, which are likely to carry the same alleles;', 'this increases the chance that an offspring inherits two copies of a harmful recessive allele;', 'so inherited disorders appear more often, and overall genetic variation falls.'] },
        { t: 'saq', q: 'Compare natural selection and selective breeding.', m: 3, ms: ['In both, only some individuals pass their alleles on, so the population changes over generations;', 'in natural selection the environment decides which individuals survive and reproduce;', 'in selective breeding a human chooses which individuals reproduce, based on characteristics useful to people rather than to survival.'] }
      ]
    },

    /* ================================================== 5c */
    {
      id: '5c',
      title: 'Genetic modification',
      objectives: [
        'Explain what a genetically modified organism is',
        'Describe how human insulin is produced by genetically modified bacteria',
        'Explain the roles of restriction enzymes, sticky ends, ligase and plasmid vectors',
        'Discuss the advantages and concerns around GM crops'
      ],
      notes: [
        { t: 'def', term: 'Genetic modification', x: 'Transferring a gene from one organism into the DNA of another, so that the second organism makes the protein coded for by that gene. Also called genetic engineering.' },
        { t: 'p', x: 'It works because the genetic code is **universal** — the same triplet of bases codes for the same amino acid in every organism, so a human gene can be read correctly by a bacterium.' },
        { t: 'h', x: 'Making human insulin — the standard example' },
        {
          t: 'ol', x: [
            'The **human insulin gene** is cut out of a human chromosome using a **restriction enzyme**',
            'The restriction enzyme cuts the DNA at a specific base sequence, leaving short unpaired ends called **sticky ends**',
            'A **plasmid** is taken from a bacterium and cut open with the **same restriction enzyme**, so it has matching sticky ends',
            'The insulin gene and the plasmid are mixed. The complementary sticky ends pair up, and the enzyme **DNA ligase** joins them permanently, forming a **recombinant plasmid**',
            'The recombinant plasmid is inserted back into a bacterium — the plasmid acts as a **vector**',
            'The bacterium is grown in a **fermenter** under ideal conditions, and reproduces rapidly, so every one of its offspring carries the insulin gene',
            'The bacteria produce human insulin, which is extracted and purified'
          ]
        },
        {
          t: 'table',
          head: ['Tool', 'Job'],
          rows: [
            ['Restriction enzyme', 'Cuts DNA at a specific base sequence, leaving sticky ends'],
            ['Sticky ends', 'Short unpaired sections of bases; complementary sticky ends pair up, which is what lets the two pieces of DNA join'],
            ['DNA ligase', 'Joins the sugar-phosphate backbones together to seal the pieces of DNA'],
            ['Plasmid', 'A small circle of bacterial DNA, used as a **vector** to carry the gene into a bacterium']
          ]
        },
        { t: 'note', k: 'exam', x: 'The same restriction enzyme must be used on both the gene and the plasmid, so that their sticky ends are complementary and can pair up. Say this explicitly — it is a mark.' },
        { t: 'p', x: 'Insulin made this way is identical to human insulin, can be produced in huge quantities and cheaply, is not taken from animals (so there are no religious or ethical objections about pig or cow insulin), and does not cause the allergic reactions animal insulin sometimes did.' },
        { t: 'h', x: 'GM crops' },
        {
          t: 'table',
          head: ['Advantages', 'Concerns'],
          rows: [
            ['Higher yields, so more food from the same land', 'Genes might spread to wild plants, for example herbicide resistance passing to weeds'],
            ['Herbicide resistance means weeds can be sprayed without harming the crop', 'Reduced biodiversity where a single variety is planted over huge areas'],
            ['Insect resistance means less pesticide is needed', 'Long-term effects on human health are not fully known'],
            ['Improved nutritional value, such as rice modified to contain beta-carotene, a source of vitamin A', 'Seed is often expensive and controlled by a few large companies, which can disadvantage small farmers'],
            ['Crops can be modified to tolerate drought or poor soil', 'Some people have ethical objections to moving genes between species']
          ]
        },
        { t: 'note', k: 'exam', x: 'For an evaluation question, give arguments on both sides and then finish with a short justified conclusion. Two-sided answers with no conclusion lose the final mark.' }
      ],
      terms: [
        { t: 'Genetic modification', d: 'Transferring a gene from one organism into another so that it makes the desired protein.' },
        { t: 'Transgenic organism', d: 'An organism containing a gene transferred from a different species.' },
        { t: 'Restriction enzyme', d: 'An enzyme that cuts DNA at a specific base sequence, leaving sticky ends.' },
        { t: 'Sticky ends', d: 'The short unpaired sections of bases left when a restriction enzyme cuts DNA; complementary sticky ends pair together.' },
        { t: 'DNA ligase', d: 'The enzyme that joins two pieces of DNA together.' },
        { t: 'Plasmid', d: 'A small circular piece of bacterial DNA, commonly used as a vector.' },
        { t: 'Vector', d: 'Something that carries a gene into a host cell, such as a plasmid or a virus.' },
        { t: 'Recombinant DNA', d: 'DNA made by joining together pieces from two different sources.' }
      ],
      qs: [
        { t: 'mcq', q: 'What is the role of a restriction enzyme in genetic engineering?', o: ['To join pieces of DNA together', 'To cut DNA at a specific base sequence', 'To copy the gene', 'To transport the gene into the cell'], a: 1, e: 'Restriction enzymes cut; ligase joins; the plasmid transports.' },
        { t: 'mcq', q: 'Why is the same restriction enzyme used to cut both the human gene and the plasmid?', o: ['To save money', 'So both have complementary sticky ends that can pair up', 'To kill the bacteria', 'To make the plasmid larger'], a: 1, e: 'The sticky ends must be complementary, otherwise the gene cannot be joined into the plasmid.' },
        { t: 'mcq', q: 'A plasmid used to carry a gene into a bacterium is called a:', o: ['Vector', 'Ligase', 'Clone', 'Gamete'], a: 0, e: 'A vector is anything that carries the gene into the host cell.' },
        { t: 'mcq', q: 'Genetic modification works across species because:', o: ['All organisms have plasmids', 'The genetic code is universal, so the same base triplets code for the same amino acids', 'Bacteria have no DNA of their own', 'Enzymes are the same in all organisms'], a: 1, e: 'A bacterium can read a human gene because the code means the same thing in both.' },
        { t: 'mcq', q: 'Which is a concern about growing herbicide-resistant GM crops?', o: ['The crop would grow too slowly', 'The resistance gene could spread to wild plants and create resistant weeds', 'Less food would be produced', 'The crop could not be eaten by animals'], a: 1, e: 'Cross-pollination with wild relatives could transfer the gene, making weeds harder to control.' },
        { t: 'saq', q: 'Describe how bacteria are genetically modified to produce human insulin.', m: 6, ms: ['A restriction enzyme is used to cut the insulin gene out of human DNA, leaving sticky ends;', 'a plasmid is removed from a bacterium and cut open with the same restriction enzyme, so it has complementary sticky ends;', 'the gene and the plasmid are mixed and the sticky ends pair up;', 'DNA ligase joins them together, forming a recombinant plasmid;', 'the plasmid is inserted into a bacterium, which acts as the host;', 'the bacteria are grown in a fermenter under controlled conditions and reproduce rapidly, producing insulin which is then extracted and purified.'] },
        { t: 'saq', q: 'Give three advantages of producing insulin from genetically modified bacteria rather than extracting it from animals.', m: 3, ms: ['It is identical to human insulin, so it is less likely to cause an allergic reaction;', 'very large amounts can be produced quickly and cheaply in fermenters;', 'no animals are killed, so there are no ethical or religious objections;', 'the supply does not depend on the number of animals slaughtered.'] },
        { t: 'saq', q: 'Discuss the arguments for and against growing genetically modified crops.', m: 6, ms: ['For: higher yields mean more food can be produced from the same area of land;', 'crops can be made resistant to insects, so less pesticide is used;', 'crops can be made herbicide resistant, or more nutritious, e.g. containing extra vitamin A;', 'against: genes such as herbicide resistance may spread to wild plants by cross-pollination;', 'growing a single variety over a large area reduces biodiversity;', 'long-term effects on health are not fully known, and seed costs can disadvantage small farmers;', 'a justified conclusion drawing the two sides together.'] }
      ]
    },

    /* ================================================== 5d */
    {
      id: '5d',
      title: 'Cloning',
      objectives: [
        'Describe micropropagation of plants using tissue culture',
        'Describe cloning animals by embryo transplant and by nuclear transfer',
        'Discuss the advantages and disadvantages of cloning'
      ],
      notes: [
        { t: 'def', term: 'Clone', x: 'An organism that is genetically identical to another. Clones can arise naturally, through asexual reproduction, or be produced artificially.' },
        { t: 'h', x: 'Micropropagation of plants' },
        {
          t: 'ol', x: [
            'A small piece of tissue, an **explant**, is cut from the parent plant, often from a fast-growing shoot tip',
            'It is **sterilised** so that no bacteria or fungi grow and outcompete the tissue',
            'It is placed on a **sterile nutrient agar** medium containing plant hormones (auxins), which make the cells divide by **mitosis** and form a mass of cells',
            'The mass is split up, and the pieces are transferred to a medium with different hormones to make them grow roots and shoots',
            'The plantlets are grown on and then planted out'
          ]
        },
        {
          t: 'table',
          head: ['Advantages', 'Disadvantages'],
          rows: [
            ['Thousands of identical plants can be produced quickly from one parent', 'All the plants are genetically identical, so a single disease could destroy the whole crop'],
            ['Every plant has the desired characteristics of the parent', 'Expensive and needs sterile laboratory conditions and trained staff'],
            ['It can be done at any time of year', 'Contamination by microorganisms can ruin an entire batch'],
            ['Plants that are hard to grow from seed can be reproduced, and rare species can be saved', 'No new variation, so the population cannot adapt to change']
          ]
        },
        { t: 'h', x: 'Cloning animals: embryo transplant' },
        {
          t: 'ol', x: [
            'A cow with the desired characteristics is fertilised by a chosen bull',
            'The early **embryo** is removed before its cells have specialised',
            'The embryo is **split** into several smaller groups of cells, each of which can grow into a complete animal',
            'The cloned embryos are **transplanted into host mothers**, which carry them to birth',
            'The offspring are genetically identical to one another, but not to the host mothers'
          ]
        },
        { t: 'h', x: 'Cloning animals: nuclear transfer' },
        {
          t: 'ol', x: [
            'The **nucleus is removed** from an unfertilised egg cell, leaving an enucleated egg',
            'A **nucleus from a body cell** of the adult to be cloned is inserted into that empty egg cell',
            'The cell is given a small **electric shock** to make it start dividing by mitosis',
            'The embryo that forms is implanted into the uterus of a **surrogate mother**',
            'The offspring is genetically identical to the adult that supplied the body cell nucleus. This is how Dolly the sheep was produced'
          ]
        },
        {
          t: 'table',
          head: ['Arguments for animal cloning', 'Arguments against'],
          rows: [
            ['Animals with useful characteristics, such as high milk yield or disease resistance, can be copied exactly', 'The success rate is low, and many embryos fail'],
            ['Genetically modified animals producing medicines can be multiplied', 'Cloned animals may have health problems or shorter lives'],
            ['Endangered species could be preserved', 'It reduces genetic variation, so a population is vulnerable to disease'],
            ['Research into cloned tissue may lead to medical treatments', 'Many people have ethical objections, especially about applying the technique to humans']
          ]
        },
        { t: 'note', k: 'link', x: 'Natural cloning happens all the time in plants — strawberry runners and potato tubers in **3a** — and identical twins are natural clones of each other.' }
      ],
      terms: [
        { t: 'Clone', d: 'An organism genetically identical to another.' },
        { t: 'Micropropagation', d: 'Producing many identical plants from small pieces of tissue grown on sterile nutrient medium; also called tissue culture.' },
        { t: 'Explant', d: 'The small piece of tissue taken from a parent plant for micropropagation.' },
        { t: 'Tissue culture', d: 'Growing cells or tissue on a sterile nutrient medium containing plant hormones.' },
        { t: 'Embryo transplant', d: 'Splitting an early embryo into several parts and implanting each into a host mother, producing identical offspring.' },
        { t: 'Nuclear transfer', d: 'Cloning by putting the nucleus of a body cell into an egg cell whose nucleus has been removed.' },
        { t: 'Surrogate mother', d: 'An animal that carries and gives birth to an embryo it is not genetically related to.' }
      ],
      qs: [
        { t: 'mcq', q: 'In micropropagation, why must the explant and equipment be sterilised?', o: ['To make the cells divide', 'To prevent bacteria and fungi growing and outcompeting the tissue', 'To remove the plant hormones', 'To harden the plant'], a: 1, e: 'The nutrient medium suits microorganisms as well as plant cells, so contamination would ruin the culture.' },
        { t: 'mcq', q: 'In nuclear transfer, what is inserted into the empty egg cell?', o: ['A sperm cell', 'A nucleus from a body cell of the animal being cloned', 'A plasmid', 'A whole embryo'], a: 1, e: 'The body-cell nucleus supplies the full set of genes, so the clone is identical to the nucleus donor.' },
        { t: 'mcq', q: 'A disadvantage shared by micropropagation and animal cloning is that:', o: ['They are very slow', 'They produce no genetic variation, so the population is vulnerable to disease', 'They only work in the summer', 'They need sexual reproduction'], a: 1, e: 'Identical organisms are all susceptible to the same diseases and the same environmental changes.' },
        { t: 'mcq', q: 'Which plant hormone is used in tissue culture to make cells divide and grow?', o: ['Insulin', 'Auxin', 'Oestrogen', 'Adrenaline'], a: 1, e: 'Auxins in the nutrient medium stimulate cell division and, in different balances, the growth of roots and shoots.' },
        { t: 'saq', q: 'Describe how a grower could produce a large number of identical plants from one parent plant.', m: 5, ms: ['Cut small pieces of tissue (explants) from the parent plant, often from a shoot tip;', 'sterilise them to kill any microorganisms;', 'place them on a sterile nutrient medium containing plant hormones;', 'the cells divide by mitosis to form a mass of cells, which is then divided up;', 'transfer the pieces to a medium that makes them grow roots and shoots, then plant the young plants out;', 'all the plants are genetically identical to the parent.'] },
        { t: 'saq', q: 'Describe the steps in cloning a sheep by nuclear transfer.', m: 5, ms: ['Remove the nucleus from an unfertilised egg cell taken from one sheep;', 'take a body cell from the sheep to be cloned and remove its nucleus;', 'insert that nucleus into the empty egg cell;', 'give the cell an electric shock so that it begins to divide by mitosis;', 'implant the resulting embryo into the uterus of a surrogate mother;', 'the lamb born is genetically identical to the sheep that supplied the body-cell nucleus.'] },
        { t: 'saq', q: 'Explain one advantage and one disadvantage of a farmer growing a field of cloned crop plants.', m: 4, ms: ['Advantage: every plant has the same desirable characteristics, such as high yield or good flavour, so the crop is uniform and easy to harvest and sell;', 'and large numbers can be produced quickly from one good parent;', 'disadvantage: the plants are genetically identical, so they have no variation;', 'if a disease or pest affects one plant it can destroy the whole crop.'] }
      ]
    }
  ]
};
