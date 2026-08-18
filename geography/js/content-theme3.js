/* Theme 3 — Economic development (Cambridge IGCSE Geography 0460) */
GEO.themes.push({
  id: '3',
  title: 'Economic development',
  blurb: 'Measuring development, and the farming, industry, tourism, energy and water systems that shape it.',
  units: [

  /* ------------------------------------------------------------------ 3.1 */
  {
    id: '3.1',
    title: 'Development',
    objectives: [
      'Use a variety of indicators to assess the level of development of a country',
      'Identify and explain inequalities between and within countries',
      'Classify production into different sectors and give illustrations of each',
      'Describe and explain how the proportions employed in each sector vary according to the level of development',
      'Describe and explain the process of globalisation, and consider its impacts'
    ],
    cases: [],
    sections: [
      {
        h: 'Measuring development',
        blocks: [
          { defs: [
            ['Development', 'The use of resources to improve the standard of living and quality of life of a population.'],
            ['Standard of living', 'How well off a person is in material terms: income, housing, possessions. It can be measured.'],
            ['Quality of life', 'How satisfied a person is with life overall, including health, safety, freedom and environment. It is harder to measure.']
          ] },
          { h3: 'Economic indicators' },
          { ul: [
            '**GNI per capita**: the total income of a country divided by its population, usually in US dollars',
            'Percentage of the workforce employed in each sector',
            'Energy consumption per person'
          ] },
          { h3: 'Social indicators' },
          { ul: [
            'Life expectancy',
            'Infant mortality rate',
            'Adult literacy rate',
            'Number of people per doctor',
            'Percentage with access to clean water and sanitation',
            'Average daily calorie intake'
          ] },
          { h3: 'Composite indicators' },
          { p: 'The **Human Development Index (HDI)** combines life expectancy, education (mean and expected years of schooling) and GNI per capita into a single figure between 0 and 1. A higher score means greater development. It is preferred because it measures more than money alone.' }
        ]
      },
      {
        h: 'Why GNI per capita can mislead',
        blocks: [
          { ul: [
            'It is an **average**, so it hides enormous inequality between rich and poor within a country',
            'It ignores the **informal economy**, subsistence farming and unpaid work, which are a large share of activity in many lower income countries',
            'Exchange rates distort comparisons, so figures are often adjusted for **purchasing power parity**',
            'It says nothing about health, education, freedom, safety or the environment',
            'Countries with a single valuable resource, such as oil, can have a high figure but poor services',
            'Data may be out of date or unreliable, especially where there has been conflict'
          ] },
          { tip: 'A question asking why one indicator is "not a good measure of development" always wants the average-hides-inequality point plus at least one more. Give two or three distinct reasons.' }
        ]
      },
      {
        h: 'Employment sectors',
        blocks: [
          { table: {
            head: ['Sector', 'What it does', 'Examples'],
            rows: [
              ['Primary', 'Extracts raw materials from the land or sea', 'Farming, fishing, forestry, mining, quarrying'],
              ['Secondary', 'Manufactures raw materials into finished goods', 'Car assembly, steelmaking, food processing, construction'],
              ['Tertiary', 'Provides a service', 'Teaching, nursing, retail, transport, banking, tourism'],
              ['Quaternary', 'Research, information and high technology', 'Biotechnology research, software development, IT consultancy']
            ]
          } },
          { p: 'As a country develops, the primary sector shrinks as farming mechanises, the secondary sector grows and then falls as factories move overseas, and the tertiary sector grows steadily and becomes dominant. The quaternary sector appears only in the most developed economies.' },
          { table: {
            head: ['Level of development', 'Primary', 'Secondary', 'Tertiary'],
            rows: [
              ['Low income', 'Very high, often over 60%', 'Low', 'Low to moderate'],
              ['Middle income (emerging)', 'Falling', 'High and growing', 'Growing'],
              ['High income', 'Very low, often under 5%', 'Moderate and falling', 'Very high, often over 70%']
            ]
          } }
        ]
      },
      {
        h: 'Inequality within countries',
        blocks: [
          { p: 'Development is uneven inside a country as well as between countries. The **core** region attracts investment, jobs and migrants, while the **periphery** is left behind.' },
          { ul: [
            'The capital and major ports usually have the best transport, services and investment',
            'Mountainous, remote or drought-prone regions have poorer land and fewer jobs',
            'Investment concentrates where there is already infrastructure and a skilled workforce, a cycle that widens the gap',
            'Rural areas depend on primary industry, which pays less and is vulnerable to price changes',
            'Governments may respond with regional aid, new transport links, or by relocating government offices'
          ] }
        ]
      },
      {
        h: 'Globalisation',
        blocks: [
          { defs: [
            ['Globalisation', 'The growing connection and interdependence of countries through trade, investment, communications and the movement of people.'],
            ['Transnational corporation (TNC)', 'A company that operates in more than one country, usually with headquarters and research in one country and production in others.']
          ] },
          { p: 'Globalisation has accelerated because of container shipping and cheaper air freight, the internet and instant communication, the removal of trade barriers, and the search by companies for cheaper labour.' },
          { table: {
            head: ['Advantages for the host country', 'Disadvantages for the host country'],
            rows: [
              ['Creates jobs and reduces unemployment', 'Wages are low by the TNC\'s home standards, and conditions may be poor'],
              ['Brings investment, technology and training', 'Most profits are sent back to the home country'],
              ['Improves infrastructure such as roads and power', 'The TNC can close the plant and move if costs rise'],
              ['Boosts exports and tax revenue', 'Environmental and safety regulations may be weaker and exploited'],
              ['Multiplier effect as local suppliers grow', 'Skilled and management jobs often go to foreign staff']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.2 */
  {
    id: '3.2',
    title: 'Food production',
    objectives: [
      'Describe and explain the main features of an agricultural system',
      'Recognise the causes and effects of food shortages and describe possible solutions'
    ],
    cases: ['green-revolution-india'],
    sections: [
      {
        h: 'Farming as a system',
        blocks: [
          { table: {
            head: ['Inputs', 'Processes', 'Outputs'],
            rows: [
              ['**Physical**: rainfall, temperature, sunlight, soil, relief', 'Ploughing, sowing, weeding, irrigating', 'Crops such as wheat, rice, coffee'],
              ['**Human**: labour, capital, machinery, seed, fertiliser, pesticide, knowledge', 'Applying fertiliser and pesticide, harvesting', 'Animal products: meat, milk, wool, eggs'],
              ['', 'Rearing, feeding, milking, shearing', 'Profit, and waste such as slurry and stubble']
            ]
          } },
          { p: 'Profit is fed back into the system as capital for the next cycle, so farming is a **closed loop** as well as a chain.' }
        ]
      },
      {
        h: 'Classifying farms',
        blocks: [
          { defs: [
            ['Arable', 'Growing crops.'],
            ['Pastoral', 'Rearing animals.'],
            ['Mixed', 'Both crops and animals on the same farm.'],
            ['Subsistence', 'Producing food for the farmer\'s own family, with little or nothing left to sell.'],
            ['Commercial', 'Producing to sell for profit.'],
            ['Intensive', 'High inputs of labour or capital per hectare, giving high yields from a small area.'],
            ['Extensive', 'Low inputs spread over a very large area, giving a low yield per hectare but a large total.'],
            ['Sedentary', 'Farming the same land permanently.'],
            ['Nomadic', 'Moving with herds to find pasture and water.']
          ] }
        ]
      },
      {
        h: 'Factors affecting what is farmed where',
        blocks: [
          { h3: 'Physical' },
          { ul: [
            '**Temperature**: each crop needs a minimum growing season; wheat needs a warm ripening period',
            '**Rainfall**: amount, reliability and timing; rice needs standing water, wheat needs a dry harvest',
            '**Relief**: steep slopes cannot be ploughed and lose soil, so they are used for grazing; flat land suits arable',
            '**Altitude**: temperature falls with height, shortening the growing season',
            '**Aspect**: south-facing slopes in the northern hemisphere are warmer and sunnier',
            '**Soil**: depth, fertility, drainage and texture; alluvium and volcanic soils are the most productive'
          ] },
          { h3: 'Human and economic' },
          { ul: [
            'Distance to **market** and the cost of transport, especially for perishable produce',
            '**Capital** available for machinery, seed, fertiliser and irrigation',
            '**Labour** supply and its cost',
            '**Technology**: machinery, high-yielding varieties, greenhouses',
            '**Government policy**: subsidies, quotas, price guarantees, land reform',
            '**Land tenure**: whether the farmer owns the land or rents it affects long-term investment'
          ] }
        ]
      },
      {
        h: 'Food shortages',
        blocks: [
          { h3: 'Causes' },
          { table: {
            head: ['Physical', 'Human'],
            rows: [
              ['Drought and unreliable rainfall', 'War and conflict destroying crops and blocking aid'],
              ['Flooding that destroys standing crops', 'Poverty: people cannot afford food that is available'],
              ['Pests and disease, such as locusts', 'Rapid population growth outstripping food supply'],
              ['Soil erosion and declining fertility', 'Cash crops for export grown instead of food'],
              ['Tropical storms and hail', 'Poor roads and storage, so food rots before it is sold'],
              ['Desertification reducing farmland', 'Debt, so governments cannot invest in agriculture']
            ]
          } },
          { h3: 'Effects' },
          { ul: [
            'Malnutrition, and deficiency diseases such as kwashiorkor and rickets',
            'Weakened immunity, so ordinary illnesses become fatal, especially in children',
            'Famine and death in the most severe cases',
            'Children too hungry to concentrate, so education suffers',
            'Farmers eat the seed intended for next year, deepening the crisis',
            'Migration to towns or across borders, and sometimes conflict over remaining resources'
          ] },
          { h3: 'Solutions' },
          { table: {
            head: ['Solution', 'Evaluation'],
            rows: [
              ['**Green Revolution**: high-yielding varieties with fertiliser, pesticide and irrigation', 'Yields rose dramatically, but the package is expensive, so it favoured richer farmers, and it needs a lot of water'],
              ['**Irrigation** schemes and wells', 'Allows farming in dry areas and a second crop each year, but can cause salinisation and lower the water table'],
              ['**Appropriate technology**: hand pumps, drip irrigation, treadle pumps', 'Cheap, repairable locally and sustainable, but small-scale'],
              ['**Food aid**', 'Saves lives in an emergency, but long-term aid can undercut local farmers and create dependency'],
              ['**Land reform**', 'Gives farmers a reason to invest in their land, but is politically difficult'],
              ['**Genetically modified crops**', 'Can resist drought, pests and disease, but seed is costly and there are health and biodiversity concerns']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.3 */
  {
    id: '3.3',
    title: 'Industry',
    objectives: [
      'Demonstrate an understanding of an industrial system',
      'Describe and explain the factors influencing the distribution and location of factories and industrial zones'
    ],
    cases: ['high-tech-cambridge'],
    sections: [
      {
        h: 'Industry as a system',
        blocks: [
          { table: {
            head: ['Inputs', 'Processes', 'Outputs'],
            rows: [
              ['Raw materials or components', 'Assembly, machining, refining', 'Finished or semi-finished products'],
              ['Energy and water', 'Packaging and quality control', 'Profit'],
              ['Labour, capital, machinery, transport', 'Research and design', 'Waste, and pollution such as fumes and effluent']
            ]
          } }
        ]
      },
      {
        h: 'Location factors',
        blocks: [
          { table: {
            head: ['Factor', 'Why it matters'],
            rows: [
              ['Raw materials', 'Heavy or bulky materials that lose weight in processing pull industry towards the source, as steel did towards coalfields'],
              ['Power supply', 'Reliable electricity is essential; historically industry located on coalfields, and aluminium smelting still follows cheap hydroelectricity'],
              ['Labour', 'Cost, supply and skill. Assembly work seeks cheap labour; high technology seeks graduates near universities'],
              ['Transport', 'Access to motorways, ports, rail and airports; heavy goods go by sea or rail, high-value light goods by air'],
              ['Market', 'Perishable and bulk-gaining products, such as bottled drinks, locate near consumers'],
              ['Land', 'Large, flat, cheap sites with room to expand, which is why industry moved to the rural-urban fringe'],
              ['Capital', 'Money to build and equip the plant, from banks or the parent company'],
              ['Government policy', 'Grants, tax breaks, enterprise zones and planning permission can attract or block industry'],
              ['Agglomeration', 'Firms cluster to share suppliers, a skilled labour pool and ideas']
            ]
          } },
          { defs: [
            ['Footloose industry', 'An industry not tied to raw materials or a single market, so it can locate almost anywhere. High technology and electronics are typical.'],
            ['Science park', 'A planned estate of high-technology and research firms, usually near a university and a motorway, in a landscaped low-density setting.'],
            ['Industrial estate', 'A planned area of light industry and warehousing, usually on the edge of a town with good road access.']
          ] },
          { p: 'High-technology industry needs graduates, links with university research, a pleasant environment to attract staff, good transport for personnel and air freight, and room for landscaped, low-density buildings. Because the products are small and valuable, transport cost hardly matters.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.4 */
  {
    id: '3.4',
    title: 'Tourism',
    objectives: [
      'Describe and explain the growth of tourism in relation to the main attractions of the physical and human landscape',
      'Evaluate the benefits and disadvantages of tourism to receiving areas',
      'Demonstrate an understanding that careful management of tourism is required in order for it to be sustainable'
    ],
    cases: ['kenya-safari', 'jamaica-tourism'],
    sections: [
      {
        h: 'Why tourism has grown',
        blocks: [
          { ul: [
            'Higher **disposable incomes**, so families have money left after essentials',
            'Paid annual leave and shorter working weeks give people **more leisure time**',
            'Cheaper air travel, budget airlines and **package holidays**',
            'Faster, larger aircraft have put distant destinations within reach',
            'Online booking and comparison sites make independent travel easy',
            'Advertising, travel programmes and social media raise awareness of destinations',
            'People retire earlier and live longer, creating a large market of older travellers',
            'Improved political stability and easier visas in many countries',
            'Growth of new markets, especially outbound tourism from China and India'
          ] }
        ]
      },
      {
        h: 'What attracts tourists',
        blocks: [
          { table: {
            head: ['Physical attractions', 'Human attractions'],
            rows: [
              ['Warm, sunny, reliable climate', 'Historic buildings, castles and ruins'],
              ['Sandy beaches and clear, warm sea', 'Museums, galleries and religious sites'],
              ['Mountains for skiing, walking and climbing', 'Festivals, music and local food'],
              ['Spectacular scenery: waterfalls, canyons, coral reefs', 'Theme parks, shopping and nightlife'],
              ['Wildlife for safaris and diving', 'Major sporting events'],
              ['Snow, hot springs and volcanic landscapes', 'Good hotels, transport and safety']
            ]
          } }
        ]
      },
      {
        h: 'Benefits and problems',
        blocks: [
          { table: {
            head: ['Benefits', 'Problems'],
            rows: [
              ['Creates direct jobs in hotels, restaurants and transport, and indirect jobs in farming and construction', 'Many jobs are **seasonal**, low-paid and unskilled'],
              ['Earns valuable **foreign currency** to pay for imports and repay debt', '**Leakage**: profits from foreign-owned hotels and airlines leave the country'],
              ['The **multiplier effect** spreads income through the local economy', 'Prices, especially of housing and food, rise beyond what local people can pay'],
              ['Roads, airports, water and power are improved, which also serves residents', 'Footpath erosion, litter, damage to coral and disturbance of wildlife'],
              ['Historic sites, crafts and traditions are conserved because they earn money', 'Traditional culture becomes a staged performance, and young people copy visitors'],
              ['Wildlife is protected as it becomes more valuable alive than hunted', 'Farmland and mangroves lost to hotel building; water diverted to pools and golf courses'],
              ['Diversifies an economy away from a single crop or resource', 'Very vulnerable to recession, terrorism, disease outbreaks and changing fashion']
            ]
          } },
          { tip: 'For "to what extent" questions on tourism, structure the answer as benefits, then problems, then a judgement that depends on **how it is managed**. That final sentence is where the top band is earned.' }
        ]
      },
      {
        h: 'Sustainable tourism',
        blocks: [
          { defs: [
            ['Sustainable tourism', 'Tourism managed so that it benefits local people and protects the environment and culture for the future.'],
            ['Ecotourism', 'Small-scale tourism to natural areas that conserves the environment and directly benefits local communities.']
          ] },
          { ul: [
            'Limit visitor numbers, using permits and quotas at fragile sites',
            'Employ local people and buy local food and crafts so money stays in the area',
            'Build small, low-rise lodges from local materials, using solar power and recycling water',
            'Charge entry fees that fund conservation and community projects',
            'Educate visitors with guides and a code of conduct: stay on paths, do not touch coral, do not feed animals',
            'Use boardwalks and marked trails to concentrate wear on one route',
            'Restrict development in national parks and zone activity away from breeding grounds'
          ] }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.5 */
  {
    id: '3.5',
    title: 'Energy',
    objectives: [
      'Describe the importance of non-renewable fossil fuels, renewable energy supplies, nuclear power and fuelwood',
      'Evaluate the benefits and disadvantages of nuclear power and renewable energy sources'
    ],
    cases: ['three-gorges'],
    sections: [
      {
        h: 'Renewable and non-renewable',
        blocks: [
          { defs: [
            ['Non-renewable', 'A resource that is finite and will eventually run out: coal, oil, natural gas and the uranium used in nuclear power.'],
            ['Renewable', 'A resource that is replaced naturally and will not run out: hydroelectric, solar, wind, geothermal, tidal, wave and biomass.']
          ] },
          { p: 'Global energy demand keeps rising because of population growth, industrialisation in emerging economies, and higher living standards that bring cars, air conditioning and electrical appliances.' }
        ]
      },
      {
        h: 'Comparing the sources',
        blocks: [
          { table: {
            head: ['Source', 'Advantages', 'Disadvantages'],
            rows: [
              ['Coal', 'Plentiful reserves, cheap, easy to transport and store', 'Very high carbon dioxide and sulphur dioxide emissions, causing acid rain; mining scars the land and is dangerous'],
              ['Oil and gas', 'Efficient, easy to transport by pipeline and tanker, gas burns relatively cleanly', 'Finite; prices are volatile; spills devastate ecosystems; still emits carbon dioxide'],
              ['Nuclear', 'Huge output from a small amount of fuel, no carbon dioxide during generation, small land area, reliable', 'Radioactive waste stays dangerous for thousands of years; accidents such as Chernobyl and Fukushima; very high build and decommissioning costs'],
              ['Hydroelectric', 'Renewable, no emissions once built, reliable, reservoir also supplies water and controls floods', 'Dams are extremely expensive; flooding displaces people and drowns habitat; silt is trapped behind the dam'],
              ['Solar', 'Free fuel, no emissions, works off-grid in remote villages, panels can go on existing roofs', 'Only generates in daylight, output falls in cloud, high installation cost, needs a large area for a power station'],
              ['Wind', 'Free fuel, no emissions, land between turbines can still be farmed', 'Only works within a range of wind speeds, visual and noise impact, danger to birds, output is unpredictable'],
              ['Geothermal', 'Reliable day and night, very low emissions, small surface footprint', 'Only viable in volcanic areas; drilling is expensive; can release hydrogen sulphide'],
              ['Tidal and wave', 'Highly predictable, no emissions, very long lifespan', 'Very expensive, few suitable sites, damages estuary and coastal habitats'],
              ['Biomass and fuelwood', 'Uses waste, can be carbon neutral if replanted, cheap and available locally', 'Burning releases smoke and carbon dioxide; over-collection causes deforestation and soil erosion']
            ]
          } },
          { p: 'In many lower income countries **fuelwood** is still the main household energy source. Collecting it takes hours a day, usually done by women and children, which cuts into schooling, and over-collection strips the land of vegetation.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.6 */
  {
    id: '3.6',
    title: 'Water',
    objectives: [
      'Describe methods of water supply and the proportions of water used for agriculture, domestic and industrial purposes in countries at different levels of economic development',
      'Explain why there is a need for careful management of water supply'
    ],
    cases: [],
    sections: [
      {
        h: 'Sources of water',
        blocks: [
          { ul: [
            '**Surface water**: rivers, lakes and reservoirs behind dams',
            '**Groundwater**: aquifers reached by wells and boreholes',
            '**Desalination**: removing salt from seawater, used where fresh water is scarce and energy is cheap, as in the Gulf states',
            '**Rainwater harvesting**: collecting roof runoff in tanks',
            '**Water transfer schemes**: piping or channelling water from a wet region to a dry one'
          ] }
        ]
      },
      {
        h: 'How water is used',
        blocks: [
          { p: 'Globally, about **70%** of fresh water goes to agriculture, around 20% to industry and roughly 10% to domestic use, though the split varies sharply with development.' },
          { table: {
            head: ['', 'Lower income countries', 'Higher income countries'],
            rows: [
              ['Agriculture', 'Very high, often over 80%, largely irrigation', 'Lower, around 30 to 40%'],
              ['Industry', 'Low', 'High: cooling, processing and cleaning'],
              ['Domestic', 'Low per person; often a shared standpipe', 'High per person: showers, washing machines, gardens, pools']
            ]
          } }
        ]
      },
      {
        h: 'Why supplies must be managed',
        blocks: [
          { h3: 'Causes of shortage' },
          { ul: [
            'Low, seasonal or unreliable rainfall, and recurring drought',
            'Rapid population growth and urbanisation increasing demand',
            'Over-abstraction, so the water table falls and wells dry up',
            'Pollution from sewage, industry, fertiliser and pesticides making water unusable',
            'Leaking pipes wasting a large share of treated water',
            'Poverty, so there is no money for wells, pipes or treatment plants',
            'Climate change altering rainfall patterns and melting the glaciers that feed rivers',
            'Rivers shared between countries, so upstream use reduces downstream supply'
          ] },
          { h3: 'Effects of shortage' },
          { ul: [
            'Water-borne disease such as cholera, typhoid and diarrhoea from drinking dirty water',
            'Crop failure, lower yields and food shortage',
            'Hours each day spent walking to collect water, usually by women and girls, which reduces school attendance',
            'Industry restricted, so economic growth slows',
            'Conflict between farmers, cities and neighbouring countries',
            'Migration away from areas that can no longer support people'
          ] },
          { h3: 'Management' },
          { table: {
            head: ['Increasing supply', 'Reducing demand'],
            rows: [
              ['Dams and reservoirs', 'Metering and higher pricing to discourage waste'],
              ['Wells and boreholes into aquifers', 'Repairing leaking pipes'],
              ['Desalination plants', 'Drip irrigation instead of flooding fields'],
              ['Water transfer schemes between basins', 'Low-flush toilets and efficient appliances'],
              ['Rainwater harvesting from roofs', 'Recycling grey water for irrigation and industry'],
              ['Treating and reusing waste water', 'Education campaigns about conservation']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 3.7 */
  {
    id: '3.7',
    title: 'Environmental risks of economic development',
    objectives: [
      'Describe how economic development can lead to environmental risks',
      'Demonstrate an understanding of the need for sustainable development and management'
    ],
    cases: ['amazon-deforestation'],
    sections: [
      {
        h: 'Soil erosion and desertification',
        blocks: [
          { p: 'Soil erosion is the removal of topsoil by wind and water, usually after vegetation has been stripped away.' },
          { ul: [
            'Causes: deforestation, overgrazing, over-cultivation without fallow periods, ploughing up and down slopes, removing hedgerows, and drought',
            'Effects: lost fertility and falling yields, gullying, silting of rivers and reservoirs, dust storms, and eventually abandoned land',
            'Solutions: contour ploughing, terracing, planting shelter belts, crop rotation, adding organic matter, controlling herd sizes'
          ] },
          { defs: [
            ['Desertification', 'The process by which productive land turns into desert, usually at the edges of existing deserts, through a combination of drought and human pressure.']
          ] }
        ]
      },
      {
        h: 'Water pollution',
        blocks: [
          { ul: [
            'Sources: untreated sewage, industrial effluent, oil spills, agricultural fertiliser and pesticide runoff, and mining waste',
            '**Eutrophication**: nitrates and phosphates from fertiliser wash into rivers and lakes, causing algae to grow rapidly; when the algae die, bacteria decomposing them use up the dissolved oxygen, so fish and other life suffocate',
            'Effects: dead rivers, contaminated drinking water, disease, loss of fishing income, and toxins accumulating up the food chain'
          ] }
        ]
      },
      {
        h: 'Air pollution',
        blocks: [
          { table: {
            head: ['Problem', 'Cause', 'Effects'],
            rows: [
              ['Acid rain', 'Sulphur dioxide and nitrogen oxides from power stations and vehicles dissolve in cloud droplets', 'Kills trees and fish, acidifies lakes and soils, erodes limestone buildings; often falls hundreds of kilometres downwind, in another country'],
              ['Enhanced greenhouse effect', 'Carbon dioxide and methane from burning fossil fuels, deforestation and agriculture trap outgoing heat', 'Rising temperatures, melting ice, rising sea level, more extreme weather, shifting farming zones'],
              ['Photochemical smog', 'Vehicle exhaust reacting in strong sunlight, often trapped by a temperature inversion in a basin city', 'Breathing difficulties, asthma, eye irritation, reduced visibility'],
              ['Ozone depletion', 'CFCs released from old aerosols, refrigerants and foam', 'More ultraviolet radiation reaching the surface, increasing skin cancer and cataracts']
            ]
          } }
        ]
      },
      {
        h: 'Sustainable development',
        blocks: [
          { defs: [
            ['Sustainable development', 'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.']
          ] },
          { p: 'The idea balances three demands at once: economic growth, social wellbeing and protection of the environment. A scheme that raises incomes but destroys the resource it depends on is not sustainable.' },
          { ul: [
            'Renewable energy replacing fossil fuels',
            'Recycling and reducing waste, and designing products to last',
            'Selective logging and replanting rather than clear felling',
            'Fishing quotas and net mesh sizes that let young fish escape',
            'National parks and protected areas, with ecotourism funding them',
            'Appropriate technology that local people can afford, repair and maintain',
            'International agreements on emissions, trade in endangered species and pollution'
          ] },
          { tip: 'Sustainability answers are strongest when they name the trade-off. Say who gains, who loses, and over what timescale, rather than listing "good" solutions.' }
        ]
      }
    ]
  }

  ]
});
