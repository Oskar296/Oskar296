window.BIO_T4 = {
  id: '4',
  title: 'Ecology and the environment',
  blurb: 'How organisms fit into their surroundings: sampling populations, food chains and pyramids, the carbon and nitrogen cycles, and the damage humans do.',
  subs: [

    /* ================================================== 4a */
    {
      id: '4a',
      title: 'The organism in its environment',
      objectives: [
        'Use the terms population, community, habitat and ecosystem correctly',
        'Describe how to use quadrats to estimate population size',
        'Describe how to use a transect to study distribution',
        'Explain how abiotic and biotic factors affect where organisms live'
      ],
      notes: [
        {
          t: 'table',
          head: ['Term', 'Meaning'],
          rows: [
            ['Habitat', 'The place where an organism lives, e.g. a rock pool'],
            ['Population', 'All the organisms of **one species** living in a habitat at one time'],
            ['Community', 'All the populations of **different species** living in a habitat'],
            ['Ecosystem', 'A community of organisms together with the non-living parts of their environment, interacting as a unit'],
            ['Abiotic factor', 'A non-living factor: light intensity, temperature, water, oxygen, pH, soil type, wind'],
            ['Biotic factor', 'A living factor: food supply, predators, disease, competition']
          ]
        },
        { t: 'h', x: 'Estimating population size with quadrats' },
        { t: 'p', x: 'You cannot count every dandelion in a field, so you count a small sample and scale up.' },
        {
          t: 'ol', x: [
            'Place a quadrat of known area (often 0.25 m² or 1 m²) on the ground at a position chosen at **random** — for example, use a random number generator to give coordinates on a grid',
            'Count the number of the species inside the quadrat, or estimate its **percentage cover** for plants that are hard to count individually',
            'Repeat many times — at least ten — to reduce the effect of chance and make the mean more reliable',
            'Work out the mean number per quadrat',
            'Scale up: **estimated population = mean per quadrat × (total area ÷ area of one quadrat)**'
          ]
        },
        { t: 'eq', label: 'Worked example', x: 'Mean = 6 daisies per 0.25 m² quadrat, field = 800 m²\n6 ÷ 0.25 = 24 daisies per m²\n24 × 800 = 19 200 daisies' },
        { t: 'note', k: 'exam', x: 'Two marks that come up constantly: sampling must be **random** so the sample is not biased, and you must take **enough samples** so that the mean is representative. Say both.' },
        { t: 'h', x: 'Transects' },
        { t: 'p', x: 'When you want to know how a species is **distributed** across a changing environment — from the sea up a shore, or from open ground into the shade of a wood — you do not sample randomly. You lay a tape in a line (a **transect**) and place quadrats at regular intervals along it, recording the species and the abiotic factors at each point.' },
        { t: 'h', x: 'What decides where an organism lives' },
        {
          t: 'table',
          head: ['Factor', 'Example of its effect'],
          rows: [
            ['Light intensity', 'Plants on a woodland floor must tolerate shade, or flower early before the canopy closes'],
            ['Temperature', 'Sets the rate of enzyme-controlled reactions; extremes exclude most species'],
            ['Water availability', 'Desert plants have deep roots, thick cuticles and few stomata'],
            ['Soil pH and mineral content', 'Some plants cannot grow in acidic or nutrient-poor soil'],
            ['Predation', 'Heavy predation reduces prey numbers, which then reduces predator numbers'],
            ['Competition', 'Plants compete for light, water, space and minerals; animals for food, mates and territory'],
            ['Disease', 'An outbreak can reduce a population sharply']
          ]
        },
        { t: 'note', k: 'prac', x: 'Using quadrats to sample a habitat is a core practical — see the practicals page for the full method and the common sources of error.' }
      ],
      terms: [
        { t: 'Habitat', d: 'The place where an organism lives.' },
        { t: 'Population', d: 'All the organisms of one species living in a habitat at the same time.' },
        { t: 'Community', d: 'All the populations of different species living in a habitat.' },
        { t: 'Ecosystem', d: 'A community of organisms plus the non-living parts of their environment, interacting together.' },
        { t: 'Abiotic factor', d: 'A non-living factor in an environment, such as light, temperature or pH.' },
        { t: 'Biotic factor', d: 'A living factor in an environment, such as predation, competition or disease.' },
        { t: 'Quadrat', d: 'A square frame of known area used to sample the organisms in part of a habitat.' },
        { t: 'Transect', d: 'A line along which samples are taken at regular intervals, used to study how distribution changes.' },
        { t: 'Random sampling', d: 'Choosing sample positions by chance, so the results are not biased.' },
        { t: 'Percentage cover', d: 'The proportion of a quadrat covered by a species, used when individuals are hard to count.' }
      ],
      qs: [
        { t: 'mcq', q: 'All the rabbits living in a wood are best described as:', o: ['A community', 'A population', 'An ecosystem', 'A habitat'], a: 1, e: 'A population is all the individuals of one species. A community is all the different species together.' },
        { t: 'mcq', q: 'Which of these is an abiotic factor?', o: ['Competition for food', 'The number of predators', 'Soil pH', 'Disease'], a: 2, e: 'Abiotic means non-living, so pH, light, temperature and water availability all count.' },
        { t: 'mcq', q: 'A student uses 10 quadrats of 0.25 m² and counts a mean of 8 plants per quadrat. The field is 500 m². The estimated population is:', o: ['4000', '16 000', '1000', '2000'], a: 1, e: '8 ÷ 0.25 = 32 plants per m². 32 × 500 = 16 000.' },
        { t: 'mcq', q: 'Why must quadrat positions be chosen at random?', o: ['To save time', 'To avoid bias, so the sample represents the whole area', 'To make the quadrats easier to count', 'So the same area is not counted twice'], a: 1, e: 'If you place quadrats where the plants look good, the estimate will be far too high.' },
        { t: 'mcq', q: 'To find how the number of seaweed species changes from the low tide mark to the top of a rocky shore, you should use:', o: ['Random quadrats', 'A transect with quadrats at regular intervals', 'A single large quadrat', 'A pitfall trap'], a: 1, e: 'A transect studies distribution along an environmental gradient, so sampling must be systematic, not random.' },
        { t: 'saq', q: 'Describe how you would use quadrats to estimate the number of daisies in a school field.', m: 5, ms: ['Divide the field into a grid and use random numbers to select coordinates, so the sampling is random and unbiased;', 'place a quadrat of known area at each position;', 'count the number of daisies inside the quadrat, using a rule for plants on the boundary;', 'repeat at least ten times and calculate the mean number per quadrat;', 'multiply the mean by the total area of the field divided by the area of the quadrat.'] },
        { t: 'saq', q: 'Explain why taking more samples gives a more reliable estimate.', m: 2, ms: ['Organisms are not spread evenly, so any one quadrat may be unusually high or low;', 'taking more samples reduces the effect of chance and gives a mean that is closer to the true value.'] },
        { t: 'saq', q: 'Suggest two abiotic factors that could explain why fewer plants grow directly under a large tree.', m: 2, ms: ['Light intensity is lower, so there is less energy for photosynthesis;', 'the soil is drier because the tree canopy intercepts rain and the tree\'s roots take up water;', 'fewer mineral ions are available because the tree absorbs them.'] }
      ]
    },

    /* ================================================== 4b */
    {
      id: '4b',
      title: 'Feeding relationships',
      objectives: [
        'Interpret food chains, food webs and trophic levels',
        'Draw and interpret pyramids of number, biomass and energy',
        'Explain why energy is lost between trophic levels, and why food chains are short'
      ],
      notes: [
        { t: 'eq', label: 'A food chain shows the flow of energy', x: 'grass  →  rabbit  →  fox' },
        { t: 'p', x: 'The arrows show the direction the **energy** flows, which is from the organism being eaten to the one eating it.' },
        {
          t: 'table',
          head: ['Term', 'Meaning'],
          rows: [
            ['Producer', 'An organism that makes its own food by photosynthesis — almost always a green plant or alga. Producers are the first trophic level'],
            ['Consumer', 'An organism that eats other organisms'],
            ['Primary consumer', 'Eats producers — a herbivore'],
            ['Secondary consumer', 'Eats primary consumers — usually a carnivore'],
            ['Tertiary consumer', 'Eats secondary consumers'],
            ['Predator / prey', 'A predator hunts and eats other animals; the prey is the animal eaten'],
            ['Decomposer', 'Feeds on dead organisms and waste, releasing nutrients back into the soil — bacteria and fungi'],
            ['Trophic level', 'A feeding level in a food chain']
          ]
        },
        { t: 'p', x: 'A **food web** is several food chains linked together, which is a much more realistic picture, because most animals eat more than one thing. If one species is removed from a web, you can trace the effects: species that ate it decrease, species it ate increase, and its competitors may increase.' },
        { t: 'h', x: 'Pyramids' },
        {
          t: 'table',
          head: ['Pyramid of', 'Shows', 'Can it be an odd shape?'],
          rows: [
            ['Numbers', 'How many organisms are at each level', 'Yes — one oak tree feeding thousands of insects gives a very narrow bottom bar'],
            ['Biomass', 'The total dry mass of organisms at each level', 'Almost never — biomass always decreases up the chain'],
            ['Energy', 'The energy in each level, usually per m² per year', 'Never — it must always be a pyramid']
          ]
        },
        { t: 'note', k: 'exam', x: 'Draw pyramids to scale, with horizontal bars, the producer at the bottom, and each bar labelled with the organism. Do not draw a triangle outline and split it up.' },
        { t: 'h', x: 'Why energy is lost' },
        { t: 'p', x: 'Only about **10%** of the energy in one trophic level ends up in the next. The rest is lost because:' },
        {
          t: 'ul', x: [
            'Not all of the organism is eaten — roots, bones and fur are left',
            'Not all of what is eaten is digested; some passes out as **faeces**',
            'Energy is lost in **excretory products** such as urea',
            'Most of the energy released by **respiration** is used for movement and other life processes and is eventually lost to the surroundings as **heat**'
          ]
        },
        { t: 'note', k: 'tip', x: 'Because so much energy is lost at each step, food chains rarely have more than four or five links — there is not enough energy left to support another level.' },
        { t: 'note', k: 'link', x: 'The same logic explains why eating plants feeds more people than eating meat: each extra step in the chain wastes about 90% of the energy. See **5a**.' },
        { t: 'h', x: 'Energy efficiency calculations' },
        { t: 'eq', label: 'Percentage energy transfer', x: 'energy in the next level ÷ energy in the level below × 100' },
        { t: 'p', x: 'If a crop contains 20 000 kJ/m²/year and the cattle that eat it gain 1600 kJ/m²/year, the transfer is 1600 ÷ 20 000 × 100 = **8%**.' }
      ],
      terms: [
        { t: 'Producer', d: 'An organism that makes its own food by photosynthesis; the first trophic level.' },
        { t: 'Consumer', d: 'An organism that gets its energy by eating other organisms.' },
        { t: 'Herbivore', d: 'An animal that eats only plants; a primary consumer.' },
        { t: 'Carnivore', d: 'An animal that eats other animals.' },
        { t: 'Decomposer', d: 'A bacterium or fungus that feeds on dead material and waste, releasing nutrients back into the ecosystem.' },
        { t: 'Trophic level', d: 'A feeding level in a food chain.' },
        { t: 'Food web', d: 'Several interconnected food chains showing all the feeding relationships in a community.' },
        { t: 'Biomass', d: 'The total dry mass of living material.' },
        { t: 'Pyramid of biomass', d: 'A diagram showing the total dry mass at each trophic level, drawn to scale.' },
        { t: 'Pyramid of energy', d: 'A diagram showing the energy at each trophic level, usually per square metre per year.' }
      ],
      qs: [
        { t: 'mcq', q: 'In the food chain lettuce → slug → thrush → hawk, the thrush is a:', o: ['Producer', 'Primary consumer', 'Secondary consumer', 'Tertiary consumer'], a: 2, e: 'Lettuce is the producer, the slug is the primary consumer and the thrush, which eats the slug, is the secondary consumer.' },
        { t: 'mcq', q: 'What do the arrows in a food chain represent?', o: ['The direction animals move', 'The flow of energy from prey to predator', 'Which animal is bigger', 'The order of extinction'], a: 1, e: 'Arrows always point from the organism eaten to the organism eating it, following the energy.' },
        { t: 'mcq', q: 'A pyramid of numbers for oak tree → caterpillar → blue tit is an odd shape because:', o: ['Caterpillars are very large', 'One tree supports very many caterpillars, so the producer bar is narrow', 'Blue tits eat oak leaves', 'Energy is not lost'], a: 1, e: 'Pyramids of numbers ignore size, so a single huge producer gives a narrow bottom bar. A pyramid of biomass would be the normal shape.' },
        { t: 'mcq', q: 'About how much of the energy in one trophic level is passed to the next?', o: ['1%', '10%', '50%', '90%'], a: 1, e: 'Roughly 10%. The rest is lost in faeces, urine, uneaten parts and as heat from respiration.' },
        { t: 'mcq', q: 'Removing all the foxes from a food web would most likely cause:', o: ['Rabbit numbers to fall', 'Rabbit numbers to rise and grass to be eaten more heavily', 'Grass to increase immediately', 'No change at all'], a: 1, e: 'With the predator gone, the prey population grows, which increases grazing pressure on the producer.' },
        { t: 'saq', q: 'Explain why energy is lost between one trophic level and the next.', m: 4, ms: ['Not all of the organism is eaten — parts such as bones, fur or roots are left;', 'not all the food eaten is digested, so some energy is lost in faeces;', 'energy is lost in excretory products such as urea;', 'most of the energy released in respiration is used for movement and other processes and is lost to the surroundings as heat.'] },
        { t: 'saq', q: 'Explain why food chains rarely contain more than five organisms.', m: 3, ms: ['Only about 10% of the energy is transferred at each trophic level;', 'so after several levels there is very little energy left;', 'there is not enough energy remaining to support a further population of consumers.'] },
        { t: 'saq', q: 'A field of wheat contains 30 000 kJ/m²/year. The chickens that eat it gain 2400 kJ/m²/year. Calculate the percentage of energy transferred.', m: 2, ms: ['2400 ÷ 30 000 × 100;', '= 8%.'] },
        { t: 'saq', q: 'Explain the role of decomposers in an ecosystem.', m: 3, ms: ['Decomposers such as bacteria and fungi feed on dead organisms and waste material;', 'they secrete enzymes that break the material down;', 'this releases mineral ions such as nitrates back into the soil, where plants can absorb them again, and returns carbon dioxide to the air by respiration.'] }
      ]
    },

    /* ================================================== 4c */
    {
      id: '4c',
      title: 'Cycles within ecosystems',
      objectives: [
        'Describe the carbon cycle, including the role of respiration, photosynthesis, decomposition and combustion',
        'Describe the nitrogen cycle and the roles of the four types of bacteria'
      ],
      notes: [
        { t: 'h', x: 'The carbon cycle' },
        {
          t: 'table',
          head: ['Process', 'What it does to carbon'],
          rows: [
            ['Photosynthesis', '**Removes** CO₂ from the air and fixes the carbon into glucose and then into all the other compounds in a plant'],
            ['Respiration', '**Returns** CO₂ to the air, from plants, animals and microorganisms'],
            ['Feeding', 'Passes carbon compounds along food chains from producers to consumers'],
            ['Decomposition', 'Bacteria and fungi break down dead organisms and waste, respiring and releasing CO₂'],
            ['Combustion', 'Burning wood or fossil fuels **releases** CO₂ that has been locked up, sometimes for millions of years'],
            ['Fossilisation', 'Dead material that does not decompose fully can, over millions of years, become coal, oil or gas']
          ]
        },
        { t: 'note', k: 'exam', x: 'Photosynthesis is the only process that takes carbon dioxide *out* of the air. Everything else — respiration, decomposition, combustion — puts it back.' },
        { t: 'h', x: 'The nitrogen cycle' },
        { t: 'p', x: 'The air is 78% nitrogen gas, but plants and animals cannot use it in that form. Nitrogen has to be converted into compounds first, and bacteria do almost all of that work.' },
        {
          t: 'table',
          head: ['Bacteria', 'What they do'],
          rows: [
            ['**Nitrogen-fixing bacteria**', 'Convert nitrogen gas from the air into nitrogen compounds. Some live free in the soil; others live in **root nodules** of legumes such as peas, beans and clover, in a relationship that benefits both'],
            ['**Decomposers** (putrefying bacteria and fungi)', 'Break down proteins in dead organisms, urea and faeces into ammonia'],
            ['**Nitrifying bacteria**', 'Convert ammonia into nitrites, and nitrites into **nitrates** — the form plants absorb'],
            ['**Denitrifying bacteria**', 'Convert nitrates back into nitrogen gas. They live in waterlogged soil with little oxygen, and reduce soil fertility']
          ]
        },
        { t: 'eq', label: 'The core sequence', x: 'protein in dead organisms → ammonia → nitrite → nitrate → absorbed by plant roots → plant protein → eaten by animals → animal protein' },
        {
          t: 'ul', x: [
            'Plants absorb **nitrate ions** from the soil by active transport and use them, with glucose, to make amino acids and then proteins',
            'Animals get their nitrogen by **eating** plants or other animals',
            '**Lightning** also fixes a small amount of nitrogen from the air',
            'Farmers add nitrate **fertilisers**, or plant legumes and plough them in, to replace nitrogen removed when crops are harvested',
            'Ploughing and draining soil adds oxygen, which favours nitrifying bacteria and discourages denitrifying bacteria'
          ]
        },
        { t: 'note', k: 'tip', x: 'Learn the four bacteria as a list of jobs. "Nitrogen-**fixing**" fixes nitrogen gas into compounds; "**nitri**fying" makes nitrates; "**de**nitrifying" undoes that.' },
        { t: 'note', k: 'link', x: 'Decomposers need warmth, moisture and oxygen to work quickly — the same conditions that make a compost heap work. Their activity links directly to both cycles.' }
      ],
      terms: [
        { t: 'Carbon cycle', d: 'The circulation of carbon between the air, living organisms, the soil and fossil fuels.' },
        { t: 'Combustion', d: 'Burning; it releases carbon dioxide into the atmosphere.' },
        { t: 'Decomposition', d: 'The breakdown of dead organisms and waste by bacteria and fungi, releasing nutrients.' },
        { t: 'Nitrogen fixation', d: 'Converting nitrogen gas from the air into nitrogen compounds that organisms can use.' },
        { t: 'Nitrogen-fixing bacteria', d: 'Bacteria that convert atmospheric nitrogen into compounds; many live in the root nodules of legumes.' },
        { t: 'Nitrifying bacteria', d: 'Bacteria that convert ammonia into nitrites and then nitrates.' },
        { t: 'Denitrifying bacteria', d: 'Bacteria that convert nitrates back into nitrogen gas, reducing soil fertility.' },
        { t: 'Root nodule', d: 'A swelling on the root of a legume containing nitrogen-fixing bacteria.' },
        { t: 'Legume', d: 'A plant such as a pea, bean or clover, whose roots have nodules containing nitrogen-fixing bacteria.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which process removes carbon dioxide from the atmosphere?', o: ['Respiration', 'Combustion', 'Photosynthesis', 'Decomposition'], a: 2, e: 'Only photosynthesis takes CO₂ out. Respiration, burning and decay all put it back.' },
        { t: 'mcq', q: 'Which bacteria convert ammonia into nitrates?', o: ['Nitrogen-fixing', 'Nitrifying', 'Denitrifying', 'Putrefying'], a: 1, e: 'Nitrifying bacteria oxidise ammonia to nitrite and then to nitrate, the form plants can absorb.' },
        { t: 'mcq', q: 'Waterlogged soil is less fertile mainly because:', o: ['Plants cannot absorb water', 'Denitrifying bacteria thrive in low oxygen and convert nitrates to nitrogen gas', 'Nitrifying bacteria produce too much nitrate', 'Lightning cannot reach the soil'], a: 1, e: 'Denitrifying bacteria work in anaerobic conditions and remove nitrate from the soil.' },
        { t: 'mcq', q: 'Farmers sometimes grow clover and plough it into the field. This works because clover:', o: ['Absorbs carbon dioxide', 'Has root nodules containing nitrogen-fixing bacteria', 'Kills denitrifying bacteria', 'Contains a lot of water'], a: 1, e: 'The bacteria fix nitrogen into compounds, so ploughing the crop in adds nitrogen to the soil.' },
        { t: 'mcq', q: 'How do animals obtain the nitrogen they need?', o: ['By absorbing nitrogen gas from the air', 'From nitrates in water', 'By eating plants or other animals', 'From nitrogen-fixing bacteria in their lungs'], a: 2, e: 'Animals get nitrogen as protein in their food; only plants absorb nitrate directly.' },
        { t: 'saq', q: 'Describe how carbon in a dead animal can end up as carbon in a plant.', m: 4, ms: ['Decomposers such as bacteria and fungi break down the dead animal;', 'the decomposers respire, releasing carbon dioxide into the atmosphere;', 'the carbon dioxide is absorbed by a plant through its stomata;', 'and is used in photosynthesis to make glucose, which is converted into other plant compounds.'] },
        { t: 'saq', q: 'Explain why nitrogen in the air cannot be used directly by plants, and describe two ways it is made available to them.', m: 4, ms: ['Nitrogen gas is very unreactive, so plants cannot absorb or use it directly;', 'nitrogen-fixing bacteria, free-living in the soil or in the root nodules of legumes, convert nitrogen gas into nitrogen compounds;', 'lightning converts nitrogen in the air into nitrogen oxides, which dissolve in rain and reach the soil;', 'plants then absorb nitrates from the soil through their roots.'] },
        { t: 'saq', q: 'Explain the role of decomposers in the nitrogen cycle.', m: 3, ms: ['Decomposers break down proteins in dead organisms, and urea and faeces from animals;', 'converting them into ammonia in the soil;', 'nitrifying bacteria then convert the ammonia into nitrates, which plants can absorb.'] }
      ]
    },

    /* ================================================== 4d */
    {
      id: '4d',
      title: 'Human influences on the environment',
      objectives: [
        'Explain the greenhouse effect and the consequences of a rising global temperature',
        'Explain eutrophication step by step',
        'Explain how sulfur dioxide causes acid rain and its effects',
        'Describe the effects of deforestation'
      ],
      notes: [
        { t: 'h', x: 'The greenhouse effect and climate change' },
        {
          t: 'ul', x: [
            'Greenhouse gases in the atmosphere absorb heat energy radiated from the Earth\'s surface and re-radiate some of it back down, keeping the planet warm enough to live on',
            'The two you need are **carbon dioxide** and **methane**',
            'CO₂ has risen because of **burning fossil fuels** and **deforestation** — burning releases it, and cutting down trees removes what would have absorbed it',
            'Methane comes from **cattle** (digestion in the gut), **rice paddy fields** and **decaying rubbish in landfill**',
            'Higher concentrations trap more heat, so the average global temperature rises — this is **enhanced greenhouse effect**'
          ]
        },
        {
          t: 'ul', x: [
            '**Consequences:** ice caps and glaciers melt and sea water expands, so sea levels rise and low-lying land floods',
            'Changed rainfall patterns cause drought in some regions and flooding in others, so crop yields fall',
            'Species that cannot move or adapt fast enough lose their habitats, and some become extinct',
            'The distribution of species and of diseases changes as regions warm'
          ]
        },
        { t: 'h', x: 'Eutrophication' },
        { t: 'p', x: 'This is a favourite exam question, and it has to be told **in order**.' },
        {
          t: 'ol', x: [
            'Excess **nitrate fertiliser** is washed off fields (leaching) into a river or lake',
            'The extra nitrate makes **algae grow rapidly** at the surface — an algal bloom',
            'The layer of algae **blocks the light** reaching the plants below, so they cannot photosynthesise and they die',
            '**Decomposing bacteria** feed on the dead plants and algae and multiply rapidly',
            'The bacteria **respire aerobically**, using up the dissolved oxygen in the water',
            '**Fish and other aerobic organisms suffocate and die**'
          ]
        },
        { t: 'note', k: 'warn', x: 'The oxygen is used up by the **bacteria respiring**, not by the algae. Untreated sewage entering water causes the same sequence, because it is also rich in nitrogen compounds.' },
        { t: 'h', x: 'Acid rain' },
        {
          t: 'ul', x: [
            'Fossil fuels contain sulfur. Burning them releases **sulfur dioxide**; car engines also produce nitrogen oxides',
            'These gases dissolve in water in the clouds, forming dilute sulfuric and nitric acids, which fall as **acid rain**',
            '**Effects:** trees are damaged and lose their leaves; lakes and rivers become acidic so fish and invertebrates die; acidic soil releases toxic aluminium ions; limestone buildings and statues are eroded',
            'It is a cross-border problem — the gases blow a long way before falling as rain'
          ]
        },
        { t: 'h', x: 'Deforestation' },
        {
          t: 'table',
          head: ['Consequence', 'Explanation'],
          rows: [
            ['More carbon dioxide in the air', 'Fewer trees photosynthesising to absorb it, and burning the felled timber releases more'],
            ['Soil erosion', 'Roots no longer hold the soil together, and rain washes the topsoil away'],
            ['Leaching', 'Without roots taking up mineral ions, rain washes nutrients out of the soil, making it infertile'],
            ['Disturbance of the water cycle', 'Less transpiration means less water vapour in the air, so rainfall in the region can fall'],
            ['Loss of biodiversity', 'Habitats are destroyed, so species lose their homes and food and may become extinct']
          ]
        },
        { t: 'h', x: 'Other pollution' },
        {
          t: 'ul', x: [
            '**Untreated sewage** in rivers causes eutrophication and spreads disease',
            '**Carbon monoxide** from incomplete combustion binds to haemoglobin more strongly than oxygen does, reducing the blood\'s ability to carry oxygen'
          ]
        },
        { t: 'note', k: 'exam', x: 'When a question asks about "biological consequences" of pollution, write about organisms: which ones die, which ones increase, and why. A general answer about "harming the environment" scores nothing.' }
      ],
      terms: [
        { t: 'Greenhouse effect', d: 'The trapping of heat energy in the atmosphere by gases such as carbon dioxide and methane.' },
        { t: 'Greenhouse gas', d: 'A gas that absorbs and re-radiates heat energy, e.g. carbon dioxide or methane.' },
        { t: 'Eutrophication', d: 'The sequence in which excess nitrates cause algal growth, which blocks light, kills plants, and leads to bacteria using up the oxygen so fish die.' },
        { t: 'Algal bloom', d: 'Rapid growth of algae at the surface of water, caused by excess nutrients.' },
        { t: 'Leaching', d: 'The washing of soluble minerals such as nitrates out of the soil into water.' },
        { t: 'Acid rain', d: 'Rain made acidic by dissolved sulfur dioxide and nitrogen oxides from burning fossil fuels.' },
        { t: 'Deforestation', d: 'The large-scale cutting down of forests.' },
        { t: 'Soil erosion', d: 'The washing or blowing away of topsoil once plant roots no longer hold it in place.' },
        { t: 'Biodiversity', d: 'The variety of different species living in an area.' },
        { t: 'Carbon monoxide', d: 'A poisonous gas from incomplete combustion that binds to haemoglobin and reduces oxygen transport.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which pair are both greenhouse gases you need to know?', o: ['Oxygen and nitrogen', 'Carbon dioxide and methane', 'Sulfur dioxide and oxygen', 'Carbon monoxide and nitrogen'], a: 1, e: 'Carbon dioxide and methane are the two named in the specification. Sulfur dioxide causes acid rain instead.' },
        { t: 'mcq', q: 'In eutrophication, what uses up the oxygen in the water?', o: ['The algae', 'The fish', 'Aerobic bacteria decomposing dead material', 'The fertiliser'], a: 2, e: 'Decomposing bacteria multiply on the dead plants and algae and respire aerobically, removing the dissolved oxygen.' },
        { t: 'mcq', q: 'Acid rain is mainly caused by:', o: ['Carbon dioxide from respiration', 'Sulfur dioxide from burning fossil fuels', 'Methane from cattle', 'Nitrates from fertiliser'], a: 1, e: 'Sulfur dioxide, along with nitrogen oxides from vehicles, dissolves in cloud water to form acids.' },
        { t: 'mcq', q: 'Which is NOT a direct consequence of deforestation?', o: ['Soil erosion', 'Increased atmospheric carbon dioxide', 'Loss of habitats', 'Formation of acid rain'], a: 3, e: 'Acid rain comes from sulfur dioxide released by burning fossil fuels, not from cutting down trees.' },
        { t: 'mcq', q: 'Methane levels have risen partly because of:', o: ['More cattle farming and rice paddies', 'More photosynthesis', 'Increased use of fertiliser', 'Acid rain'], a: 0, e: 'Cattle produce methane during digestion, and it is also released from paddy fields and from decaying waste in landfill.' },
        { t: 'saq', q: 'Explain how excess fertiliser washed into a lake can lead to the death of fish.', m: 6, ms: ['Nitrates from the fertiliser are leached into the lake;', 'the extra nitrate causes algae to grow rapidly, forming an algal bloom on the surface;', 'the algae block light from reaching the plants below;', 'so those plants cannot photosynthesise and they die;', 'decomposing bacteria feed on the dead plants and algae and increase in number;', 'the bacteria respire aerobically and use up the dissolved oxygen;', 'so fish and other aerobic organisms suffocate and die.'] },
        { t: 'saq', q: 'Explain how deforestation increases the concentration of carbon dioxide in the atmosphere.', m: 3, ms: ['Fewer trees remain to absorb carbon dioxide by photosynthesis;', 'the felled trees are often burned, and combustion releases carbon dioxide;', 'decomposition of the remaining plant material by microorganisms also releases carbon dioxide through their respiration.'] },
        { t: 'saq', q: 'Describe three biological consequences of a rise in average global temperature.', m: 3, ms: ['Melting ice and expanding sea water raise sea levels, so low-lying habitats are flooded;', 'changed rainfall patterns cause drought or flooding, reducing crop yields;', 'species that cannot adapt or migrate fast enough lose their habitats and may become extinct;', 'the distribution of species, pests and diseases changes as regions warm.'] },
        { t: 'saq', q: 'Explain why acid rain caused by one country can damage forests in another.', m: 2, ms: ['Sulfur dioxide and nitrogen oxides are released into the atmosphere as gases;', 'they are carried long distances by wind before dissolving in cloud water and falling as acid rain in another country.'] }
      ]
    }
  ]
};
