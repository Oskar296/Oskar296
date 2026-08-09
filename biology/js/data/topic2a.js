window.BIO_T2 = {
  id: '2',
  title: 'Structures and functions in living organisms',
  blurb: 'The biggest topic by far: cells, molecules and enzymes, transport across membranes, then nutrition, respiration, gas exchange, transport, excretion and coordination in both plants and humans.',
  subs: [

    /* ================================================== 2a */
    {
      id: '2a',
      title: 'Level of organisation',
      objectives: [
        'Put organelles, cells, tissues, organs and organ systems in order of size',
        'Define each level and give a plant and an animal example of each'
      ],
      notes: [
        { t: 'p', x: 'Living things are built up in layers. Each level is made of the level below it.' },
        {
          t: 'table',
          head: ['Level', 'Definition', 'Animal example', 'Plant example'],
          rows: [
            ['Organelle', 'A structure inside a cell with its own job', 'Mitochondrion, nucleus', 'Chloroplast, vacuole'],
            ['Cell', 'The basic building block of all living organisms', 'Red blood cell, neurone', 'Palisade cell, root hair cell'],
            ['Tissue', 'A group of cells with similar structure working together to do a particular job', 'Muscle tissue, epithelial tissue', 'Palisade mesophyll, xylem'],
            ['Organ', 'A group of different tissues working together to perform a function', 'Heart, stomach, lung', 'Leaf, root, flower'],
            ['Organ system', 'A group of organs with related functions working together', 'Digestive system, circulatory system', 'Shoot system, root system'],
            ['Organism', 'A whole individual living thing', 'A human', 'A maize plant']
          ]
        },
        { t: 'note', k: 'exam', x: 'A leaf is an **organ**, not a tissue — it contains palisade mesophyll, spongy mesophyll, epidermis and xylem, which are all different tissues.' },
        { t: 'h', x: 'Why it works this way' },
        { t: 'p', x: 'Splitting jobs between specialised cells is more efficient than every cell doing everything. A red blood cell that has lost its nucleus can pack in more haemoglobin; a root hair cell with a long extension can absorb far more water. This is **cell differentiation**.' }
      ],
      terms: [
        { t: 'Organelle', d: 'A structure inside a cell that carries out a particular function, e.g. a mitochondrion.' },
        { t: 'Tissue', d: 'A group of cells with similar structure and function, working together.' },
        { t: 'Organ', d: 'A group of different tissues working together to perform a specific function.' },
        { t: 'Organ system', d: 'A group of organs with related functions working together to perform a body process.' },
        { t: 'Differentiation', d: 'The process by which a cell becomes specialised for a particular job.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which list is in order from smallest to largest?', o: ['Cell, organelle, tissue, organ', 'Organelle, cell, tissue, organ', 'Tissue, cell, organ, organelle', 'Organelle, tissue, cell, organ'], a: 1, e: 'Organelles sit inside cells, cells make tissues, tissues make organs, organs make systems.' },
        { t: 'mcq', q: 'Xylem is best described as:', o: ['An organelle', 'A cell', 'A tissue', 'An organ'], a: 2, e: 'Xylem is many similar cells working together to transport water, so it is a tissue. The leaf and the root that contain it are organs.' },
        { t: 'saq', q: 'Define the term "organ" and give one plant example and one animal example.', m: 3, ms: ['An organ is a group of different tissues working together to carry out a particular function;', 'plant example: leaf, root, flower or stem;', 'animal example: heart, stomach, lung or kidney.'] },
        { t: 'saq', q: 'Explain the advantage of having specialised cells rather than cells that all do the same job.', m: 2, ms: ['Each cell can be adapted in structure to do one job very efficiently;', 'e.g. a red blood cell loses its nucleus to carry more haemoglobin, or a root hair cell has a long extension for a large surface area;', 'so the whole organism works more efficiently than if every cell did everything.'] }
      ]
    },

    /* ================================================== 2b */
    {
      id: '2b',
      title: 'Cell structure',
      objectives: [
        'Label an animal cell and a plant cell and give the function of every structure',
        'State the differences between plant and animal cells',
        'Explain how the structure of a specialised cell fits its job'
      ],
      notes: [
        { t: 'fig', id: 'cells', cap: 'A generalised animal cell and plant cell. Plant cells have everything an animal cell has, plus three extras.' },
        { t: 'h', x: 'The four structures in every cell' },
        {
          t: 'table',
          head: ['Structure', 'Function'],
          rows: [
            ['Nucleus', 'Contains the chromosomes, made of DNA. Controls the cell\'s activities and carries the instructions for making proteins.'],
            ['Cytoplasm', 'A jelly-like liquid where most of the chemical reactions of the cell happen. Contains the organelles.'],
            ['Cell membrane', 'A partially permeable layer that controls which substances move into and out of the cell.'],
            ['Mitochondria', 'Where aerobic respiration happens, releasing energy from glucose. Cells that need a lot of energy, like muscle and sperm cells, have many.'],
            ['Ribosomes', 'Where proteins are made (protein synthesis).']
          ]
        },
        { t: 'h', x: 'The three plant-only extras' },
        {
          t: 'table',
          head: ['Structure', 'Function'],
          rows: [
            ['Cell wall', 'Made of cellulose. Fully permeable. Gives the cell strength and stops it bursting when water enters by osmosis.'],
            ['Permanent vacuole', 'A large sac filled with cell sap. When full it pushes out on the wall, keeping the cell turgid, which supports the plant.'],
            ['Chloroplasts', 'Contain the green pigment chlorophyll, which absorbs light energy for photosynthesis.']
          ]
        },
        { t: 'note', k: 'warn', x: 'Not every plant cell has chloroplasts. Root cells are underground with no light, so they have none. Every plant cell does have a cell wall.' },
        { t: 'h', x: 'Plant against animal cells' },
        {
          t: 'table',
          head: ['', 'Plant cell', 'Animal cell'],
          rows: [
            ['Cell wall', 'Present, cellulose', 'Absent'],
            ['Chloroplasts', 'Often present', 'Never'],
            ['Vacuole', 'One large permanent vacuole', 'Small, temporary vacuoles if any'],
            ['Shape', 'Fixed, usually regular and box-like', 'Varied, often rounded'],
            ['Carbohydrate store', 'Starch grains', 'Glycogen granules']
          ]
        },
        { t: 'h', x: 'Specialised cells worth knowing' },
        {
          t: 'table',
          head: ['Cell', 'Adaptation', 'Why it helps'],
          rows: [
            ['Red blood cell', 'No nucleus, biconcave disc, full of haemoglobin', 'More room for haemoglobin and a larger surface area for absorbing oxygen'],
            ['Root hair cell', 'Long thin extension, no chloroplasts, thin wall', 'Huge surface area for absorbing water by osmosis and mineral ions by active transport'],
            ['Palisade mesophyll cell', 'Tall column packed with chloroplasts, near the leaf surface', 'Absorbs as much light as possible for photosynthesis'],
            ['Sperm cell', 'Tail (flagellum), many mitochondria, enzymes in the head', 'Swims to the egg, has energy for the journey, digests through the egg membrane'],
            ['Ciliated epithelial cell', 'Hair-like cilia that beat', 'Sweeps mucus and trapped dirt up and out of the airways'],
            ['Neurone', 'Very long, with branched endings', 'Carries electrical impulses over long distances and connects to many other cells']
          ]
        },
        { t: 'note', k: 'exam', x: 'When asked to *explain* an adaptation, always link structure to function: "the root hair cell has a long narrow extension, **which gives a large surface area**, **so** more water can be absorbed by osmosis in a given time".' }
      ],
      terms: [
        { t: 'Nucleus', d: 'The organelle containing the chromosomes; it controls the cell and holds the instructions for making proteins.' },
        { t: 'Cytoplasm', d: 'Jelly-like material inside the cell where most chemical reactions happen.' },
        { t: 'Cell membrane', d: 'A partially permeable barrier that controls what enters and leaves the cell.' },
        { t: 'Mitochondrion', d: 'The organelle where aerobic respiration takes place, releasing energy.' },
        { t: 'Ribosome', d: 'The tiny organelle where proteins are made.' },
        { t: 'Cell wall', d: 'A rigid, fully permeable layer of cellulose outside a plant cell membrane; supports the cell and stops it bursting.' },
        { t: 'Chloroplast', d: 'A plant organelle containing chlorophyll, where photosynthesis happens.' },
        { t: 'Chlorophyll', d: 'The green pigment inside chloroplasts that absorbs light energy.' },
        { t: 'Permanent vacuole', d: 'A large fluid-filled sac in a plant cell containing cell sap, which keeps the cell turgid.' },
        { t: 'Turgid', d: 'A plant cell that is firm because its vacuole is full of water and pushes against the cell wall.' },
        { t: 'Partially permeable', d: 'Letting some substances through but not others.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which structure controls what enters and leaves a cell?', o: ['Cell wall', 'Cell membrane', 'Cytoplasm', 'Vacuole'], a: 1, e: 'The cell membrane is partially permeable, so it controls movement in and out. The cell wall is fully permeable and only gives support.' },
        { t: 'mcq', q: 'A cell has a cell wall, a nucleus and a vacuole but no chloroplasts. It is most likely:', o: ['A bacterium', 'A root cell of a plant', 'A palisade cell', 'A red blood cell'], a: 1, e: 'It has a nucleus so it is not a bacterium, and a cell wall so it is not an animal cell. Root cells get no light, so they have no chloroplasts.' },
        { t: 'mcq', q: 'Muscle cells contain many more mitochondria than fat cells. This is because muscle cells:', o: ['Store more glucose', 'Need to release more energy by respiration', 'Have no nucleus', 'Are larger'], a: 1, e: 'Mitochondria are the site of aerobic respiration, so cells doing a lot of work contain lots of them.' },
        { t: 'mcq', q: 'Which is found in a plant cell but never in an animal cell?', o: ['Mitochondria', 'Ribosomes', 'Cellulose cell wall', 'Cell membrane'], a: 2, e: 'The cellulose cell wall, chloroplasts and the large permanent vacuole are the three plant-only structures.' },
        { t: 'saq', q: 'Describe three ways in which a palisade mesophyll cell is adapted for photosynthesis.', m: 3, ms: ['Packed with many chloroplasts, to absorb as much light as possible;', 'tall / column-shaped, so more chloroplasts fit into the same area of leaf surface;', 'positioned near the top of the leaf, where light intensity is greatest;', 'thin cell wall so carbon dioxide diffuses in quickly.'] },
        { t: 'saq', q: 'Give three structural differences between a plant cell and an animal cell.', m: 3, ms: ['A plant cell has a cellulose cell wall, an animal cell does not;', 'a plant cell may have chloroplasts, an animal cell never does;', 'a plant cell has one large permanent vacuole, an animal cell has none or only small temporary ones;', 'plant cells have a fixed regular shape, animal cells do not.'] },
        { t: 'saq', q: 'Explain how a red blood cell is adapted to carry oxygen.', m: 3, ms: ['It has no nucleus, so there is more room for haemoglobin;', 'it is a biconcave disc, which gives a large surface area to volume ratio for absorbing oxygen quickly;', 'it is packed with haemoglobin, which binds oxygen to form oxyhaemoglobin;', 'it is small and flexible so it can squeeze through capillaries.'] },
        { t: 'saq', q: 'A student says "the cell wall controls what goes into a plant cell". Explain why this is wrong.', m: 2, ms: ['The cell wall is fully permeable, so it lets everything through;', 'it is the cell membrane, which is partially permeable, that controls what enters and leaves;', 'the wall\'s job is support and stopping the cell bursting.'] }
      ]
    },

    /* ================================================== 2c */
    {
      id: '2c',
      title: 'Biological molecules and enzymes',
      objectives: [
        'Name the elements in carbohydrates, proteins and lipids, and the small units each is built from',
        'Carry out and describe the four food tests and their colour changes',
        'Explain enzyme action using the active site and the lock-and-key model',
        'Describe and explain the effect of temperature and pH on enzyme activity'
      ],
      notes: [
        { t: 'h', x: 'The three main food groups' },
        {
          t: 'table',
          head: ['Molecule', 'Elements', 'Built from', 'Examples'],
          rows: [
            ['Carbohydrate', 'Carbon, hydrogen, oxygen', 'Simple sugars such as glucose', 'Starch, glycogen and cellulose are long chains of glucose; maltose and sucrose are two sugars joined'],
            ['Protein', 'Carbon, hydrogen, oxygen, nitrogen (and sulfur in some)', 'Amino acids', 'Enzymes, haemoglobin, antibodies, keratin'],
            ['Lipid (fat or oil)', 'Carbon, hydrogen, oxygen', 'Three fatty acids joined to one glycerol', 'Butter, olive oil, the fat under your skin']
          ]
        },
        { t: 'note', k: 'tip', x: 'Nitrogen is the giveaway for protein. If a molecule contains nitrogen it cannot be a carbohydrate or a lipid.' },
        { t: 'p', x: 'The order of amino acids in a protein decides how the chain folds, and the folded shape decides what the protein does. Change the order and you change the protein.' },
        { t: 'h', x: 'Food tests' },
        {
          t: 'table',
          head: ['Test for', 'Reagent and method', 'Positive result'],
          rows: [
            ['Starch', 'Add a few drops of iodine solution', 'Orange-brown → **blue-black**'],
            ['Reducing sugar (e.g. glucose)', 'Add Benedict\'s solution and heat in a water bath at about 80 °C', 'Blue → green → yellow → **brick-red** precipitate'],
            ['Protein', 'Add Biuret solution (or sodium hydroxide then copper sulfate)', 'Blue → **purple / lilac**'],
            ['Fat', 'Shake with ethanol, then pour the mixture into water', 'A **cloudy white emulsion** forms']
          ]
        },
        { t: 'note', k: 'exam', x: 'With Benedict\'s, the *final* colour tells you roughly how much sugar there is: green is a little, brick-red is a lot. That is why it is described as semi-quantitative.' },
        { t: 'h', x: 'Enzymes' },
        { t: 'def', term: 'Enzyme', x: 'A biological catalyst: a protein that speeds up the rate of a chemical reaction without being changed or used up itself.' },
        {
          t: 'ul', x: [
            'Enzymes are proteins folded into a precise shape',
            'The **active site** is the part of the enzyme the substrate fits into',
            'Each enzyme works on one substrate only — this is **specificity** — because only that substrate is the right shape for the active site',
            'This is the **lock-and-key model**: the substrate is the key, the active site is the lock'
          ]
        },
        { t: 'eq', label: 'Enzyme action', x: 'substrate + enzyme → enzyme–substrate complex → products + unchanged enzyme' },
        { t: 'h', x: 'Temperature' },
        {
          t: 'ul', x: [
            'As temperature rises, molecules move faster, so there are more successful collisions between enzyme and substrate. The rate goes **up**.',
            'At the **optimum temperature** the rate is highest — about 37 °C for most human enzymes.',
            'Above the optimum, the bonds holding the enzyme\'s shape break. The active site changes shape, the substrate no longer fits, and the enzyme is **denatured**. The rate falls sharply to zero.'
          ]
        },
        { t: 'note', k: 'warn', x: 'Never write that an enzyme is "killed" at high temperature. Enzymes are molecules, not living things. They are **denatured**, and it is permanent.' },
        { t: 'h', x: 'pH' },
        {
          t: 'ul', x: [
            'Each enzyme has an optimum pH. Move away from it in either direction and the rate drops.',
            'Far from the optimum, the enzyme is denatured — the active site changes shape again.',
            'Pepsin, the protease in the stomach, has an optimum of about pH 2. Amylase in the mouth and small intestine works best around pH 7 to 8.'
          ]
        },
        {
          t: 'table',
          head: ['Change', 'Effect on rate', 'Reason'],
          rows: [
            ['Temperature raised towards optimum', 'Increases', 'More kinetic energy, more enzyme–substrate collisions'],
            ['Temperature raised above optimum', 'Falls to zero', 'Active site changes shape — denatured'],
            ['pH moved away from optimum', 'Falls', 'Active site changes shape — denatured'],
            ['Substrate concentration raised', 'Increases, then levels off', 'Eventually every active site is occupied, so enzymes become the limiting factor'],
            ['Enzyme concentration raised', 'Increases (if substrate is plentiful)', 'More active sites available']
          ]
        },
        { t: 'note', k: 'prac', x: 'See **Core practicals** for the amylase and starch investigation and the food tests.' }
      ],
      terms: [
        { t: 'Enzyme', d: 'A protein that acts as a biological catalyst, speeding up a reaction without being used up.' },
        { t: 'Catalyst', d: 'A substance that speeds up a chemical reaction without being changed itself.' },
        { t: 'Substrate', d: 'The molecule an enzyme acts on.' },
        { t: 'Active site', d: 'The part of an enzyme where the substrate binds; its shape is complementary to the substrate.' },
        { t: 'Lock-and-key model', d: 'The model explaining enzyme specificity: only a substrate of the right shape fits the active site.' },
        { t: 'Denatured', d: 'When an enzyme\'s shape, and so its active site, is permanently changed by high temperature or extreme pH, so the substrate no longer fits.' },
        { t: 'Optimum temperature', d: 'The temperature at which an enzyme works fastest.' },
        { t: 'Amino acid', d: 'The small unit that proteins are built from.' },
        { t: 'Glycerol and fatty acids', d: 'The units a lipid is built from: one glycerol joined to three fatty acids.' },
        { t: 'Simple sugar', d: 'A single sugar unit such as glucose; carbohydrates are built from these.' },
        { t: 'Reducing sugar', d: 'A sugar such as glucose or maltose that gives a brick-red precipitate with Benedict\'s solution on heating.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which elements are always found in a protein but never in a carbohydrate?', o: ['Carbon', 'Nitrogen', 'Oxygen', 'Hydrogen'], a: 1, e: 'Carbohydrates and lipids contain only carbon, hydrogen and oxygen. Proteins also contain nitrogen, and some contain sulfur.' },
        { t: 'mcq', q: 'A food sample turns Benedict\'s solution brick-red on heating and turns iodine blue-black. The sample contains:', o: ['Protein and fat', 'Reducing sugar and starch', 'Starch only', 'Reducing sugar and protein'], a: 1, e: 'Brick-red with Benedict\'s means reducing sugar; blue-black with iodine means starch.' },
        { t: 'mcq', q: 'Why does an enzyme stop working above its optimum temperature?', o: ['The enzyme is killed', 'The substrate is denatured', 'The active site changes shape so the substrate no longer fits', 'The enzyme is used up in the reaction'], a: 2, e: 'Heat breaks the bonds holding the enzyme in shape. The active site is no longer complementary to the substrate, so no enzyme–substrate complexes form.' },
        { t: 'mcq', q: 'Pepsin works in the stomach at about pH 2. What happens to pepsin if it is placed in a solution at pH 8?', o: ['It works faster', 'It works at the same rate', 'Its rate falls because it is denatured', 'It changes into a different enzyme'], a: 2, e: 'Moving far from the optimum pH changes the shape of the active site, so the rate falls towards zero.' },
        { t: 'mcq', q: 'An enzyme that breaks down starch has no effect on protein. This is because:', o: ['Protein molecules are too small', 'The active site of the enzyme only fits starch', 'Protein is not a food', 'The enzyme is denatured by protein'], a: 1, e: 'Enzymes are specific. Only a substrate with a complementary shape can enter the active site.' },
        { t: 'saq', q: 'Describe how you would test a food sample for starch and for protein, giving the result in each case.', m: 4, ms: ['Starch: add a few drops of iodine solution to the sample;', 'a positive result is a colour change from orange-brown to blue-black;', 'protein: add Biuret solution to the sample;', 'a positive result is a colour change from blue to purple/lilac.'] },
        { t: 'saq', q: 'Explain, using the lock-and-key model, why an enzyme will only catalyse one reaction.', m: 3, ms: ['Each enzyme has an active site with a specific shape;', 'only a substrate with a complementary shape can fit into it, like a key in a lock;', 'so an enzyme–substrate complex only forms with that one substrate, and only that reaction is catalysed.'] },
        { t: 'saq', q: 'Explain the shape of a graph of enzyme activity against temperature between 0 °C and 60 °C.', m: 5, ms: ['From 0 °C the rate increases as temperature rises;', 'because molecules have more kinetic energy and there are more collisions between enzyme and substrate / more enzyme–substrate complexes form;', 'the rate peaks at the optimum temperature (about 37 °C for human enzymes);', 'above the optimum the rate falls steeply;', 'because the enzyme is denatured — the active site changes shape so the substrate no longer fits;', 'at high temperature the rate reaches zero, and this is permanent.'] },
        { t: 'saq', q: 'Starch, glycogen and cellulose are all built from the same small unit. Name the unit, and name the elements found in all three.', m: 2, ms: ['The unit is glucose / a simple sugar;', 'the elements are carbon, hydrogen and oxygen.'] }
      ]
    },

    /* ================================================== 2d */
    {
      id: '2d',
      title: 'Movement of substances into and out of cells',
      objectives: [
        'Define diffusion, osmosis and active transport, and say how they differ',
        'Explain the factors that affect the rate of movement',
        'Explain the importance of a large surface area to volume ratio',
        'Describe what happens to plant and animal cells in different solutions'
      ],
      notes: [
        {
          t: 'table',
          head: ['', 'Diffusion', 'Osmosis', 'Active transport'],
          rows: [
            ['What moves', 'Any dissolved substance or gas', 'Water only', 'Dissolved substances (usually ions)'],
            ['Direction', 'High to low concentration', 'From a dilute solution to a concentrated solution', '**Against** the gradient: low to high concentration'],
            ['Membrane needed?', 'No', 'Yes — partially permeable', 'Yes, with carrier proteins'],
            ['Energy from respiration?', 'No', 'No', '**Yes**'],
            ['Example', 'Oxygen into a red blood cell', 'Water into a root hair cell', 'Mineral ions into a root hair cell; glucose from the gut into the blood when the gut concentration is low']
          ]
        },
        { t: 'def', term: 'Diffusion', x: 'The net movement of particles from an area of higher concentration to an area of lower concentration, down a concentration gradient, as a result of their random movement.' },
        { t: 'def', term: 'Osmosis', x: 'The net movement of water molecules from a region of higher water concentration (a dilute solution) to a region of lower water concentration (a concentrated solution), through a partially permeable membrane.' },
        { t: 'def', term: 'Active transport', x: 'The movement of particles through a cell membrane from a region of lower concentration to a region of higher concentration, using energy released by respiration.' },
        { t: 'note', k: 'exam', x: 'The word **net** matters. Particles move in both directions all the time; diffusion and osmosis describe the overall movement.' },
        { t: 'h', x: 'What changes the rate' },
        {
          t: 'table',
          head: ['Factor', 'Effect on rate', 'Why'],
          rows: [
            ['Steeper concentration gradient', 'Faster', 'Bigger difference in the number of particles on each side'],
            ['Higher temperature', 'Faster', 'Particles have more kinetic energy and move faster'],
            ['Larger surface area', 'Faster', 'More area for particles to cross at once'],
            ['Shorter distance / thinner membrane', 'Faster', 'Particles have less far to travel'],
            ['Smaller particles', 'Faster', 'Small molecules move more easily through the membrane']
          ]
        },
        { t: 'h', x: 'Surface area to volume ratio' },
        { t: 'p', x: 'As an organism gets bigger, its volume grows faster than its surface area. A large organism therefore has a **small surface area to volume ratio**, and simple diffusion across its outside surface cannot supply all its cells fast enough. That is why large organisms need exchange surfaces such as lungs, gills, villi and root hairs, and a transport system to carry substances around.' },
        {
          t: 'table',
          head: ['Cube side', 'Surface area', 'Volume', 'SA : V'],
          rows: [
            ['1 cm', '6 cm²', '1 cm³', '6 : 1'],
            ['2 cm', '24 cm²', '8 cm³', '3 : 1'],
            ['4 cm', '96 cm²', '64 cm³', '1.5 : 1']
          ]
        },
        { t: 'note', k: 'tip', x: 'Every good exchange surface in biology has the same four features: **large surface area**, **thin** (short diffusion distance), **moist**, and a **steep concentration gradient** maintained by blood flow or ventilation. Learn those four and you can answer about alveoli, villi, gills, root hairs and leaves.' },
        { t: 'h', x: 'Cells in different solutions' },
        {
          t: 'table',
          head: ['Solution outside', 'Plant cell', 'Animal cell'],
          rows: [
            ['Dilute (more water outside)', 'Water enters by osmosis, vacuole swells, cell becomes **turgid**. The cell wall stops it bursting.', 'Water enters, the cell swells and may burst (**lysis**) — there is no wall.'],
            ['Same concentration', 'No net movement; the cell becomes flaccid over time', 'No net change'],
            ['Concentrated (less water outside)', 'Water leaves, the vacuole shrinks, the cell becomes **flaccid**; if a lot leaves, the membrane pulls away from the wall — **plasmolysis**', 'Water leaves and the cell shrinks and **crenates**']
          ]
        },
        { t: 'p', x: 'Turgor is what holds a non-woody plant up. When a plant loses more water than it takes in, the cells become flaccid and the plant **wilts**.' },
        { t: 'note', k: 'prac', x: 'The potato-in-sucrose osmosis experiment is a core practical. See the practicals page.' }
      ],
      terms: [
        { t: 'Diffusion', d: 'Net movement of particles from a higher to a lower concentration, down a concentration gradient, from their random movement.' },
        { t: 'Osmosis', d: 'Net movement of water from a dilute solution to a concentrated solution through a partially permeable membrane.' },
        { t: 'Active transport', d: 'Movement of particles against a concentration gradient using energy from respiration.' },
        { t: 'Concentration gradient', d: 'The difference in concentration between two areas.' },
        { t: 'Turgid', d: 'A plant cell full of water, pushing out against its cell wall; this supports the plant.' },
        { t: 'Flaccid', d: 'A plant cell that has lost water, so it no longer pushes against the wall.' },
        { t: 'Plasmolysis', d: 'When a plant cell loses so much water that the cell membrane pulls away from the cell wall.' },
        { t: 'Lysis', d: 'The bursting of an animal cell when too much water enters by osmosis.' },
        { t: 'Surface area to volume ratio', d: 'Surface area divided by volume. It gets smaller as an organism gets bigger, which is why large organisms need exchange surfaces and transport systems.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which process needs energy from respiration?', o: ['Diffusion', 'Osmosis', 'Active transport', 'All three'], a: 2, e: 'Only active transport needs energy, because it moves substances against the concentration gradient using carrier proteins.' },
        { t: 'mcq', q: 'A plant cell is placed in a very concentrated sugar solution. What happens?', o: ['It bursts', 'Water leaves and the membrane pulls away from the wall', 'Water enters and it becomes turgid', 'Nothing, because of the cell wall'], a: 1, e: 'Water leaves by osmosis, the vacuole shrinks and the cell plasmolyses. The wall stops the cell changing shape much, but it cannot stop water leaving.' },
        { t: 'mcq', q: 'Root hair cells take up mineral ions from soil even though the concentration in the soil is lower than inside the cell. This must be by:', o: ['Osmosis', 'Diffusion', 'Active transport', 'Transpiration'], a: 2, e: 'Movement against the gradient is only possible by active transport, which uses energy from respiration.' },
        { t: 'mcq', q: 'Which change would slow down the rate of diffusion of oxygen into a cell?', o: ['Raising the temperature', 'Increasing the surface area of the membrane', 'Reducing the difference in oxygen concentration across the membrane', 'Making the membrane thinner'], a: 2, e: 'A shallower concentration gradient means a slower net movement. The other three all speed diffusion up.' },
        { t: 'mcq', q: 'A cube of agar 1 cm on each side and one 3 cm on each side are placed in dye. Which is true?', o: ['The larger cube is dyed through faster', 'The smaller cube is dyed through faster, because of its larger surface area to volume ratio', 'Both take the same time', 'Neither will be dyed through'], a: 1, e: 'The smaller cube has a larger surface area to volume ratio, so the dye has a shorter distance to travel relative to the volume it must fill.' },
        { t: 'saq', q: 'Define osmosis.', m: 3, ms: ['The net movement of water molecules;', 'from a region of higher water concentration (dilute solution) to a region of lower water concentration (concentrated solution);', 'through a partially permeable membrane.'] },
        { t: 'saq', q: 'Explain why a large multicellular organism needs a transport system but a single-celled organism such as Amoeba does not.', m: 4, ms: ['Amoeba has a large surface area to volume ratio;', 'so diffusion across its surface is fast enough to supply all of its cytoplasm, and the distances are short;', 'a large organism has a small surface area to volume ratio;', 'and its inner cells are far from the surface, so diffusion alone would be far too slow;', 'so it needs exchange surfaces and a transport system to carry substances to every cell.'] },
        { t: 'saq', q: 'A student puts a piece of potato in distilled water. After 30 minutes the potato is heavier and firmer. Explain why.', m: 4, ms: ['The potato cells contain a concentrated solution / have a lower water concentration than distilled water;', 'water moves into the cells by osmosis;', 'through the partially permeable cell membrane;', 'the cells become turgid, so the potato is firmer, and the extra water increases its mass.'] },
        { t: 'saq', q: 'Give four features that make a good exchange surface, such as an alveolus.', m: 4, ms: ['A large surface area;', 'a thin surface / short diffusion distance;', 'a moist surface, so gases dissolve;', 'a steep concentration gradient, maintained by ventilation and blood flow.'] }
      ]
    },

    /* ================================================== 2e */
    {
      id: '2e',
      title: 'Nutrition in flowering plants',
      objectives: [
        'Give the word and balanced chemical equation for photosynthesis',
        'Explain limiting factors and interpret graphs of them',
        'Relate the structure of a leaf to its job',
        'State why plants need nitrate and magnesium ions, and the effects of deficiency'
      ],
      notes: [
        { t: 'def', term: 'Photosynthesis', x: 'The process by which plants make their own food. Light energy, absorbed by chlorophyll, is used to convert carbon dioxide and water into glucose and oxygen. It is how energy enters almost every food chain on Earth.' },
        { t: 'eq', label: 'Word equation', x: 'carbon dioxide + water  —(light energy, chlorophyll)→  glucose + oxygen' },
        { t: 'eq', label: 'Balanced equation', x: '6CO₂ + 6H₂O  →  C₆H₁₂O₆ + 6O₂' },
        { t: 'h', x: 'What the plant does with the glucose' },
        {
          t: 'ul', x: [
            'Used straight away in **respiration** to release energy',
            'Converted to **starch** for storage — insoluble, so it does not affect osmosis',
            'Converted to **cellulose** to build cell walls',
            'Converted to **sucrose** for transport in the phloem',
            'Combined with **nitrate ions** to make amino acids, and then proteins',
            'Used to make fats and oils for storage in seeds'
          ]
        },
        { t: 'h', x: 'Limiting factors' },
        { t: 'def', term: 'Limiting factor', x: 'The factor in shortest supply, which stops the rate of a process increasing any further. For photosynthesis the three are light intensity, carbon dioxide concentration and temperature.' },
        {
          t: 'ul', x: [
            '**Light intensity** — as it rises the rate rises, until something else becomes limiting and the graph levels off',
            '**Carbon dioxide concentration** — the same shape; CO₂ is often the limiting factor on a bright day',
            '**Temperature** — the rate rises to an optimum, then falls sharply as the enzymes controlling photosynthesis are denatured'
          ]
        },
        { t: 'note', k: 'exam', x: 'For a graph that rises then flattens, the standard answer is: "At first, light intensity is the limiting factor, so the rate increases as it rises. After point X the graph levels off, so light is no longer limiting — carbon dioxide concentration or temperature must be limiting instead."' },
        { t: 'note', k: 'link', x: 'Growers use limiting factors on purpose. Glasshouses raise the temperature, paraffin heaters add carbon dioxide as well as heat, and lamps extend the day. See topic **5a**.' },
        { t: 'h', x: 'The leaf' },
        { t: 'fig', id: 'leaf', cap: 'Cross-section through a leaf. Every feature is an adaptation for photosynthesis or gas exchange.' },
        {
          t: 'table',
          head: ['Feature', 'Adaptation'],
          rows: [
            ['Broad and flat', 'Large surface area to absorb light and carbon dioxide'],
            ['Thin', 'Short diffusion distance for gases, and light reaches all cells'],
            ['Waxy cuticle', 'Transparent so light passes through; waterproof so less water is lost'],
            ['Palisade cells at the top', 'Packed with chloroplasts where the light is brightest'],
            ['Air spaces in the spongy mesophyll', 'Large internal surface area for gas exchange'],
            ['Stomata, mostly on the lower surface', 'Let carbon dioxide in and oxygen out; on the shaded lower surface, so less water evaporates'],
            ['Network of veins', 'Xylem delivers water, phloem removes sucrose, and the veins support the leaf']
          ]
        },
        { t: 'h', x: 'Mineral ions' },
        {
          t: 'table',
          head: ['Ion', 'What it is used for', 'Deficiency symptom'],
          rows: [
            ['Nitrate', 'Making amino acids, and so proteins, for growth', 'Stunted growth and older leaves turn yellow'],
            ['Magnesium', 'Making chlorophyll', 'Yellow leaves (chlorosis), because chlorophyll cannot be made']
          ]
        },
        { t: 'note', k: 'warn', x: 'Plants absorb nitrate as an **ion from the soil** by active transport, not from the air. Only nitrogen-fixing bacteria can use nitrogen gas.' },
        { t: 'note', k: 'prac', x: 'Core practicals: testing a leaf for starch, the variegated-leaf and destarching experiments, and measuring the rate of photosynthesis in pondweed.' }
      ],
      terms: [
        { t: 'Photosynthesis', d: 'The process in which light energy absorbed by chlorophyll converts carbon dioxide and water into glucose and oxygen.' },
        { t: 'Limiting factor', d: 'The factor in shortest supply that prevents the rate of a process increasing further.' },
        { t: 'Chlorosis', d: 'Yellowing of the leaves, caused by a lack of chlorophyll, e.g. from magnesium deficiency.' },
        { t: 'Palisade mesophyll', d: 'The layer of tall, chloroplast-packed cells near the top of a leaf; most photosynthesis happens here.' },
        { t: 'Spongy mesophyll', d: 'Loosely packed leaf cells with large air spaces between them for gas exchange.' },
        { t: 'Stoma (plural stomata)', d: 'A pore in the leaf epidermis, opened and closed by two guard cells, through which gases enter and leave.' },
        { t: 'Guard cell', d: 'One of a pair of cells that change shape to open or close a stoma.' },
        { t: 'Cuticle', d: 'The waxy, waterproof, transparent layer covering a leaf.' },
        { t: 'Nitrate ions', d: 'Absorbed from the soil and used by plants to make amino acids and proteins.' },
        { t: 'Magnesium ions', d: 'Absorbed from the soil and needed to make chlorophyll.' }
      ],
      qs: [
        { t: 'mcq', q: 'What is the balanced equation for photosynthesis?', o: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', '6CO₂ + 6O₂ → C₆H₁₂O₆ + 6H₂O', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂'], a: 1, e: 'Carbon dioxide and water in, glucose and oxygen out. Option A is aerobic respiration and option D is anaerobic respiration in yeast.' },
        { t: 'mcq', q: 'A plant has yellow leaves and normal-sized growth. Which mineral is most likely to be short?', o: ['Nitrate', 'Magnesium', 'Calcium', 'Iron'], a: 1, e: 'Magnesium is needed to make chlorophyll, so a shortage causes yellowing. Nitrate deficiency causes stunted growth as well as yellowing of older leaves.' },
        { t: 'mcq', q: 'On a graph of photosynthesis rate against light intensity, the line rises then becomes horizontal. The horizontal part shows that:', o: ['Light intensity is limiting', 'The plant has stopped respiring', 'Some other factor, such as CO₂ or temperature, is now limiting', 'The chlorophyll has been used up'], a: 2, e: 'Once the line is flat, adding light makes no difference, so light is no longer the limiting factor.' },
        { t: 'mcq', q: 'Why is glucose converted to starch for storage in a plant?', o: ['Starch contains more energy', 'Starch is insoluble, so it does not affect osmosis', 'Starch can be transported in the phloem', 'Starch is made of amino acids'], a: 1, e: 'Being insoluble, starch does not change the water concentration of the cell, so it does not draw water in by osmosis.' },
        { t: 'mcq', q: 'Most stomata are on the lower surface of a leaf. The advantage of this is:', o: ['More light reaches the guard cells', 'Less water is lost, because the lower surface is cooler and shaded', 'Carbon dioxide is more concentrated below the leaf', 'It stops insects landing'], a: 1, e: 'The shaded lower surface is cooler, so evaporation, and hence water loss through the stomata, is reduced.' },
        { t: 'saq', q: 'Describe three ways a leaf is adapted for photosynthesis.', m: 3, ms: ['Broad and flat, giving a large surface area to absorb light;', 'thin, so carbon dioxide has a short diffusion distance to the cells;', 'palisade cells packed with chloroplasts near the upper surface, to absorb the most light;', 'many stomata to let carbon dioxide in;', 'air spaces in the spongy mesophyll for gas exchange;', 'veins containing xylem to bring water.'] },
        { t: 'saq', q: 'A grower increases the carbon dioxide concentration in a glasshouse but the rate of photosynthesis does not change. Suggest why, and say what the grower should do.', m: 3, ms: ['Carbon dioxide was not the limiting factor;', 'another factor, such as light intensity or temperature, was limiting;', 'the grower should increase the light intensity (lamps) or the temperature (heater) as well.'] },
        { t: 'saq', q: 'Give four uses a plant makes of the glucose produced in photosynthesis.', m: 4, ms: ['Respiration, to release energy;', 'converted to starch for storage;', 'converted to cellulose for cell walls;', 'converted to sucrose for transport in the phloem;', 'combined with nitrate ions to make amino acids and proteins;', 'converted to fats and oils for storage in seeds.'] },
        { t: 'saq', q: 'Explain why the rate of photosynthesis falls at temperatures above about 45 °C.', m: 3, ms: ['Photosynthesis is controlled by enzymes;', 'above the optimum temperature the enzymes are denatured;', 'the active site changes shape, so substrates no longer fit and the reactions stop.'] }
      ]
    },

    /* ================================================== 2f */
    {
      id: '2f',
      title: 'Nutrition in humans',
      objectives: [
        'Name the components of a balanced diet, with sources, functions and deficiency effects',
        'Explain why energy requirements vary between people',
        'Identify the parts of the alimentary canal and describe what each does',
        'Describe digestion by amylase, protease and lipase, and the role of bile',
        'Explain how the villi are adapted for absorption'
      ],
      notes: [
        { t: 'h', x: 'A balanced diet' },
        {
          t: 'table',
          head: ['Component', 'Good sources', 'Why the body needs it', 'Deficiency'],
          rows: [
            ['Carbohydrate', 'Bread, rice, pasta, potatoes', 'The main source of energy', 'Tiredness, lack of energy'],
            ['Protein', 'Meat, fish, eggs, beans', 'Growth and repair of tissues; making enzymes', 'Poor growth, weak muscles'],
            ['Lipid (fat)', 'Butter, oils, nuts', 'Energy store, insulation, making cell membranes', 'Feeling cold, lack of energy stores'],
            ['Vitamin A', 'Liver, carrots, fish oils', 'Making the light-sensitive pigment in the retina; healthy skin', 'Poor night vision'],
            ['Vitamin C', 'Citrus fruit, peppers', 'Healthy skin, gums and connective tissue', 'Scurvy — bleeding gums, poor wound healing'],
            ['Vitamin D', 'Oily fish, eggs, made in skin in sunlight', 'Helps the body absorb calcium', 'Rickets in children, soft bones'],
            ['Calcium', 'Milk, cheese, green vegetables', 'Strong bones and teeth; needed for blood clotting and muscles', 'Weak bones and teeth'],
            ['Iron', 'Red meat, liver, spinach', 'Making haemoglobin in red blood cells', 'Anaemia — tiredness, pale skin'],
            ['Water', 'Drinks and most foods', 'Most of the body is water; reactions happen in solution and it transports substances', 'Dehydration'],
            ['Dietary fibre', 'Wholegrains, fruit, vegetables', 'Gives the gut muscles something to grip so peristalsis works', 'Constipation']
          ]
        },
        { t: 'h', x: 'Why energy needs differ' },
        {
          t: 'ul', x: [
            '**Age** — children and teenagers need a lot of energy and protein for growth; needs fall in old age',
            '**Activity** — a manual worker or athlete uses far more energy than someone at a desk',
            '**Pregnancy and breastfeeding** — extra energy, protein, calcium and iron are needed for the developing baby',
            '**Sex and body size** — larger bodies and more muscle need more energy'
          ]
        },
        { t: 'h', x: 'The alimentary canal' },
        { t: 'fig', id: 'gut', cap: 'The human digestive system. Food passes through the canal; the liver and pancreas are glands that empty into it.' },
        { t: 'p', x: 'Digestion happens in stages, and it happens in the right order because each region has its own conditions and enzymes.' },
        {
          t: 'ol', x: [
            '**Mouth** — teeth break food into smaller pieces, increasing the surface area for enzymes. Salivary glands add amylase, which starts breaking starch into maltose. The tongue rolls the food into a bolus.',
            '**Oesophagus** — no digestion here; **peristalsis** pushes the bolus to the stomach.',
            '**Stomach** — muscular walls churn the food. Glands release protease (pepsin) and hydrochloric acid, giving about pH 2. The acid gives pepsin its optimum pH and kills most bacteria in the food.',
            '**Small intestine — duodenum** — bile from the liver and enzymes from the pancreas arrive. Amylase, protease and lipase finish digestion.',
            '**Small intestine — ileum** — the soluble products are absorbed into the blood through the villi.',
            '**Large intestine (colon)** — water is absorbed from the remaining material.',
            '**Rectum and anus** — faeces are stored, then egested.'
          ]
        },
        { t: 'def', term: 'Peristalsis', x: 'Waves of contraction of the circular muscles behind the food, which squeeze the food along the alimentary canal. The muscle in front relaxes so the tube widens ahead of the food.' },
        { t: 'h', x: 'The digestive enzymes' },
        {
          t: 'table',
          head: ['Enzyme', 'Made in', 'Works on', 'Products'],
          rows: [
            ['Amylase (a carbohydrase)', 'Salivary glands, pancreas', 'Starch', 'Maltose, then glucose (by maltase in the small intestine)'],
            ['Protease (pepsin in the stomach)', 'Stomach, pancreas', 'Protein', 'Amino acids'],
            ['Lipase', 'Pancreas, small intestine', 'Lipids (fats and oils)', 'Fatty acids and glycerol']
          ]
        },
        { t: 'h', x: 'Bile' },
        {
          t: 'ul', x: [
            'Made in the **liver**, stored in the **gall bladder**, released into the **duodenum**',
            'It contains no enzymes',
            '**Alkaline**, so it neutralises the acid arriving from the stomach and gives the intestinal enzymes their optimum pH',
            '**Emulsifies** fats: it breaks large fat droplets into many tiny ones, which greatly increases the surface area for lipase to work on, so digestion is faster'
          ]
        },
        { t: 'note', k: 'warn', x: 'Emulsification is a *physical* change, not digestion. Bile does not break any chemical bonds.' },
        { t: 'h', x: 'Absorption in the ileum' },
        {
          t: 'ul', x: [
            'The ileum wall is folded and covered in millions of finger-like **villi**, each covered in **microvilli** — a huge surface area, around 200 m²',
            'The wall of a villus is **one cell thick**, so the diffusion distance is very short',
            'Each villus has a dense network of **capillaries**, which carry absorbed glucose and amino acids away and keep the concentration gradient steep',
            'Each villus has a **lacteal** in the centre, which absorbs fatty acids and glycerol into the lymph',
            'The ileum is very long, giving food a long time in contact with the absorbing surface'
          ]
        },
        { t: 'note', k: 'link', x: 'Absorbed glucose and amino acids go straight to the **liver** in the hepatic portal vein. The liver stores excess glucose as glycogen and breaks down excess amino acids in **deamination**, producing urea — see **2l**.' }
      ],
      terms: [
        { t: 'Balanced diet', d: 'A diet containing all the food groups in the right proportions to meet the body\'s needs.' },
        { t: 'Digestion', d: 'The breakdown of large insoluble food molecules into small soluble ones that can be absorbed into the blood.' },
        { t: 'Ingestion', d: 'Taking food into the body through the mouth.' },
        { t: 'Absorption', d: 'The movement of small digested food molecules through the wall of the intestine into the blood.' },
        { t: 'Assimilation', d: 'The use of absorbed food molecules by the body\'s cells to become part of the body.' },
        { t: 'Peristalsis', d: 'Waves of muscle contraction that push food along the alimentary canal.' },
        { t: 'Bile', d: 'An alkaline liquid made in the liver and stored in the gall bladder; it neutralises stomach acid and emulsifies fats.' },
        { t: 'Emulsification', d: 'Breaking large fat droplets into many small ones to increase the surface area for lipase.' },
        { t: 'Villus (plural villi)', d: 'A finger-like projection of the ileum wall that greatly increases the surface area for absorption.' },
        { t: 'Lacteal', d: 'The vessel in the centre of a villus that absorbs the products of fat digestion.' },
        { t: 'Amylase', d: 'The enzyme that breaks starch down into maltose.' },
        { t: 'Protease', d: 'An enzyme that breaks proteins down into amino acids.' },
        { t: 'Lipase', d: 'The enzyme that breaks lipids down into fatty acids and glycerol.' }
      ],
      qs: [
        { t: 'mcq', q: 'What are the products of protein digestion?', o: ['Glucose', 'Amino acids', 'Fatty acids and glycerol', 'Maltose'], a: 1, e: 'Proteases break proteins into amino acids, which are absorbed and used to build the body\'s own proteins.' },
        { t: 'mcq', q: 'What is the role of hydrochloric acid in the stomach?', o: ['To digest protein directly', 'To give protease its optimum pH and to kill bacteria', 'To neutralise bile', 'To emulsify fats'], a: 1, e: 'The acid gives about pH 2, the optimum for pepsin, and kills most bacteria swallowed with the food.' },
        { t: 'mcq', q: 'Bile helps fat digestion because it:', o: ['Contains lipase', 'Breaks fats into fatty acids and glycerol', 'Emulsifies fats, increasing their surface area for lipase', 'Makes the duodenum acidic'], a: 2, e: 'Bile contains no enzymes. It emulsifies fat into small droplets, giving lipase a much larger surface area to work on.' },
        { t: 'mcq', q: 'Which feature of a villus reduces the diffusion distance for absorption?', o: ['Its finger-like shape', 'Its wall being one cell thick', 'Its lacteal', 'Its length'], a: 1, e: 'A one-cell-thick wall means glucose and amino acids only have to cross a very short distance to reach the blood.' },
        { t: 'mcq', q: 'A person with a diet low in iron is likely to develop:', o: ['Rickets', 'Scurvy', 'Anaemia', 'Constipation'], a: 2, e: 'Iron is needed to make haemoglobin. Without enough of it, less oxygen is carried, causing tiredness and pale skin.' },
        { t: 'mcq', q: 'Dietary fibre is important because it:', o: ['Provides energy', 'Is digested into glucose', 'Gives the gut muscles material to push against during peristalsis', 'Is absorbed by the villi'], a: 2, e: 'Fibre is not digested or absorbed. It adds bulk so peristalsis can move material through the gut, preventing constipation.' },
        { t: 'saq', q: 'Describe the process of peristalsis.', m: 3, ms: ['The circular muscles in the gut wall contract behind the ball of food;', 'and relax in front of it, so the tube widens ahead;', 'this produces a wave of contraction that squeezes the food along the alimentary canal.'] },
        { t: 'saq', q: 'Explain three ways in which the ileum is adapted for absorbing digested food.', m: 6, ms: ['It is covered in villi and microvilli;', 'which give a very large surface area, so more molecules can be absorbed at once;', 'the villus wall is only one cell thick;', 'so the diffusion distance into the blood is short;', 'each villus has a good blood supply / dense capillary network;', 'which carries absorbed molecules away, keeping a steep concentration gradient;', '(also: it is very long, so food is in contact with the surface for a long time).'] },
        { t: 'saq', q: 'Explain why food must be digested before it can be used by the body.', m: 3, ms: ['Food molecules such as starch and protein are large and insoluble;', 'so they cannot pass through the wall of the intestine into the blood;', 'digestion breaks them into small soluble molecules such as glucose and amino acids, which can be absorbed.'] },
        { t: 'saq', q: 'A pregnant woman is advised to eat more calcium and iron. Explain why.', m: 3, ms: ['Calcium is needed for the developing baby\'s bones and teeth;', 'if she does not eat enough, calcium may be taken from her own bones;', 'iron is needed to make haemoglobin for the baby\'s red blood cells / for her own increased blood volume, and to prevent anaemia.'] }
      ]
    },

    /* ================================================== 2g */
    {
      id: '2g',
      title: 'Respiration',
      objectives: [
        'Write the word and balanced equations for aerobic respiration',
        'Write the equations for anaerobic respiration in animals and in plants and yeast',
        'Compare aerobic and anaerobic respiration',
        'Explain oxygen debt',
        'Describe experiments showing that respiration releases carbon dioxide and heat'
      ],
      notes: [
        { t: 'def', term: 'Respiration', x: 'The chemical reactions in cells that break down nutrient molecules to release energy for metabolism. It happens in every living cell, all the time.' },
        { t: 'p', x: 'The energy released is used for muscle contraction, active transport, making large molecules from small ones, cell division, and keeping mammals and birds warm.' },
        { t: 'h', x: 'Aerobic respiration' },
        { t: 'eq', label: 'Word equation', x: 'glucose + oxygen → carbon dioxide + water (+ energy released)' },
        { t: 'eq', label: 'Balanced equation', x: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O' },
        { t: 'p', x: 'Aerobic respiration happens in the **mitochondria** and releases a large amount of energy from each glucose molecule.' },
        { t: 'h', x: 'Anaerobic respiration' },
        { t: 'p', x: 'When oxygen runs short, cells can still release some energy from glucose, but far less, and the products are different in animals and in plants and yeast.' },
        { t: 'eq', label: 'In animals (e.g. hard-working muscle)', x: 'glucose → lactic acid (+ a little energy released)' },
        { t: 'eq', label: 'In plants and yeast (fermentation)', x: 'glucose → ethanol + carbon dioxide (+ a little energy released)' },
        {
          t: 'table',
          head: ['', 'Aerobic', 'Anaerobic'],
          rows: [
            ['Oxygen needed', 'Yes', 'No'],
            ['Energy released per glucose', 'A lot', 'Much less — glucose is only partly broken down'],
            ['Products in animals', 'Carbon dioxide and water', 'Lactic acid'],
            ['Products in plants and yeast', 'Carbon dioxide and water', 'Ethanol and carbon dioxide'],
            ['Where', 'Mitochondria', 'Cytoplasm'],
            ['Can it continue for long?', 'Yes', 'No — the products build up and become toxic']
          ]
        },
        { t: 'h', x: 'Oxygen debt' },
        {
          t: 'ul', x: [
            'During hard exercise the heart and lungs cannot deliver oxygen fast enough, so muscles respire anaerobically as well as aerobically',
            'Lactic acid builds up, causing muscle fatigue and cramp',
            'The extra oxygen needed afterwards to break the lactic acid down is the **oxygen debt**',
            'That is why you keep breathing deeply and quickly for several minutes after you stop; the lactic acid is carried to the liver and broken down'
          ]
        },
        { t: 'note', k: 'link', x: 'Anaerobic respiration in yeast is the basis of bread and beer making — see **5a**.' },
        { t: 'h', x: 'Showing that respiration is happening' },
        {
          t: 'table',
          head: ['What you are showing', 'Method', 'Result'],
          rows: [
            ['Carbon dioxide is produced', 'Germinating seeds (or small invertebrates) in a sealed tube connected to hydrogencarbonate indicator or limewater', 'Indicator turns from red to yellow; limewater turns milky'],
            ['Heat is released', 'Two vacuum flasks, one with living germinating seeds and one with dead boiled seeds, both disinfected, each with a thermometer', 'The temperature rises in the flask with living seeds only'],
            ['Oxygen is used up', 'Living organisms in a sealed respirometer with soda lime to absorb CO₂, and a dye drop in a capillary tube', 'The drop moves towards the organisms as the volume of gas falls']
          ]
        },
        { t: 'note', k: 'exam', x: 'Every one of these experiments needs a **control** with dead or boiled organisms, to show that the result is caused by living respiring cells and not by anything else. Seeds are also disinfected so that microorganisms respiring on them do not affect the result.' }
      ],
      terms: [
        { t: 'Aerobic respiration', d: 'The release of a relatively large amount of energy by breaking down glucose using oxygen, producing carbon dioxide and water.' },
        { t: 'Anaerobic respiration', d: 'The release of a relatively small amount of energy by breaking down glucose without oxygen.' },
        { t: 'Lactic acid', d: 'The product of anaerobic respiration in animal cells; it causes muscle fatigue and must be broken down later.' },
        { t: 'Oxygen debt', d: 'The extra oxygen the body needs after exercise to break down the lactic acid that built up.' },
        { t: 'Fermentation', d: 'Anaerobic respiration in yeast, producing ethanol and carbon dioxide.' },
        { t: 'Respirometer', d: 'Apparatus used to measure the rate of oxygen uptake by living organisms.' },
        { t: 'Hydrogencarbonate indicator', d: 'A solution that is red in normal air, turns yellow when carbon dioxide increases and purple when it decreases.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which are the products of anaerobic respiration in a human muscle cell?', o: ['Carbon dioxide and water', 'Ethanol and carbon dioxide', 'Lactic acid', 'Glucose and oxygen'], a: 2, e: 'Animals produce lactic acid. Ethanol and carbon dioxide come from yeast and plants.' },
        { t: 'mcq', q: 'Which statement about anaerobic respiration is correct?', o: ['It releases more energy per glucose than aerobic respiration', 'It happens in the mitochondria', 'It releases less energy because glucose is only partly broken down', 'It produces water'], a: 2, e: 'Glucose is not fully broken down, so much less energy is released. It happens in the cytoplasm.' },
        { t: 'mcq', q: 'Why does a runner continue to breathe deeply for several minutes after a race?', o: ['To cool down', 'To repay the oxygen debt by breaking down lactic acid', 'To absorb more glucose', 'To remove ethanol'], a: 1, e: 'Extra oxygen is needed to break down the lactic acid that built up during anaerobic respiration.' },
        { t: 'mcq', q: 'In an experiment on germinating seeds, a control flask contains boiled seeds. Why?', o: ['Boiled seeds respire more slowly', 'To show any temperature rise is caused by living respiring cells', 'To absorb carbon dioxide', 'To keep the flask sterile'], a: 1, e: 'The dead seeds cannot respire, so if the temperature only rises in the living flask, respiration must be the cause.' },
        { t: 'mcq', q: 'Hydrogencarbonate indicator around germinating seeds turns from red to yellow. This shows that:', o: ['Oxygen has increased', 'Carbon dioxide has increased', 'The seeds are photosynthesising', 'The pH has risen'], a: 1, e: 'Yellow means more carbon dioxide, which is the waste product of respiration.' },
        { t: 'saq', q: 'Write the balanced chemical equation for aerobic respiration and state where in the cell it occurs.', m: 3, ms: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O;', 'correct balancing;', 'it takes place in the mitochondria.'] },
        { t: 'saq', q: 'Compare aerobic and anaerobic respiration in humans.', m: 4, ms: ['Aerobic respiration uses oxygen, anaerobic does not;', 'aerobic releases much more energy per glucose molecule, because glucose is completely broken down;', 'aerobic produces carbon dioxide and water, anaerobic produces lactic acid;', 'aerobic occurs in the mitochondria, anaerobic in the cytoplasm;', 'anaerobic cannot continue for long because lactic acid builds up and causes fatigue.'] },
        { t: 'saq', q: 'Describe an experiment to show that germinating seeds release heat energy.', m: 5, ms: ['Set up two vacuum flasks, one with living germinating seeds and one with dead boiled seeds as a control;', 'disinfect both sets of seeds so that microorganisms do not respire and affect the results;', 'plug the necks with cotton wool so air can enter but heat is not lost quickly;', 'insert a thermometer into each and record the temperature at the start and every day for several days;', 'the temperature rises in the flask with living seeds but not in the control;', 'showing that respiration in living cells releases heat energy.'] },
        { t: 'saq', q: 'Explain why energy from respiration is needed even when a person is asleep.', m: 3, ms: ['Energy is needed for active transport across cell membranes;', 'for building large molecules such as proteins from small ones;', 'for cell division and repair;', 'for muscle contraction, e.g. the heart and breathing muscles;', 'and to maintain body temperature.'] }
      ]
    }
  ]
};
