/* Case studies. Figures are rounded and are the widely quoted ones; where
   sources genuinely disagree the range is given rather than a false precision. */

GEO.cases = [

{
  id: 'china-one-child',
  name: 'China\'s one-child policy',
  place: 'China',
  type: 'Population policy',
  units: ['1.1'],
  summary: 'The largest anti-natalist policy ever attempted, and a standard example of a policy that met its target and created new problems doing so.',
  stats: [
    ['1979', 'policy introduced'],
    ['2015', 'replaced by a two-child policy'],
    ['~1.6', 'fertility rate by the 2010s, from about 2.8'],
    ['~118', 'boys per 100 girls at birth at the peak, about 2005']
  ],
  sections: [
    { h: 'Why it was introduced', blocks: [
      { p: 'By the 1970s China\'s population was approaching 1 billion and growing fast. The government feared that food supply, housing and jobs could not keep pace, and that rapid growth would hold back economic development.' }
    ] },
    { h: 'How it worked', blocks: [
      { ul: [
        'Couples in urban areas were permitted one child',
        'Incentives for compliance: a "certificate of honour", priority housing, free education and healthcare for the child, longer maternity leave and a salary bonus',
        'Penalties for a second child: heavy fines, loss of benefits, and pressure at work',
        'Granny police monitored women in each neighbourhood and reported pregnancies',
        'Exemptions grew over time: ethnic minorities, rural couples whose first child was a girl, and later couples who were both only children'
      ] }
    ] },
    { h: 'Results', blocks: [
      { table: {
        head: ['Successes', 'Problems'],
        rows: [
          ['Fertility fell from about 2.8 to around 1.6', 'A skewed sex ratio: sons were preferred, leading to sex-selective abortion, abandonment of girls and, at the peak, about 118 boys born per 100 girls'],
          ['The government claims around 400 million births were prevented', 'Millions of men now cannot find a partner'],
          ['Slower growth helped raise income and food supply per person', 'The "4-2-1 problem": one child may have to support two parents and four grandparents'],
          ['Greater investment per child in education and health', 'A rapidly ageing population and a shrinking workforce'],
          ['', 'Coercion, including forced sterilisations and abortions, and unregistered "black" children with no access to schooling']
        ]
      } },
      { p: 'The 400 million claim is disputed. Chinese fertility was already falling steeply during the 1970s under the earlier "later, longer, fewer" campaign, so demographers argue much of the decline would have happened anyway as incomes and female education rose.' },
      { p: 'The policy was relaxed to two children in 2015 and three in 2021, but birth rates have kept falling because housing, childcare and education are expensive. China\'s population fell in 2022 for the first time since 1961.' }
    ] }
  ]
},

{
  id: 'niger-youthful',
  name: 'Niger: a youthful population',
  place: 'Niger, West Africa',
  type: 'Population structure',
  units: ['1.1', '1.3'],
  summary: 'The highest fertility rate in the world, giving a textbook stage 2 population pyramid with an extremely wide base.',
  stats: [
    ['~6.6', 'children per woman, among the world\'s highest'],
    ['~50%', 'of the population under 15'],
    ['~3.7%', 'annual population growth'],
    ['~26 m', 'population, roughly doubling every 20 years']
  ],
  sections: [
    { h: 'Why the birth rate is so high', blocks: [
      { ul: [
        'A mainly rural, agricultural society where children work on the land from a young age',
        'Very low female literacy and few opportunities for paid work outside the home',
        'Early marriage, giving a long childbearing period',
        'Low use of contraception, at around one woman in ten',
        'High infant mortality, so families have more children expecting some to die',
        'Cultural and religious value placed on large families',
        'No state pension, so children are the only security in old age'
      ] }
    ] },
    { h: 'Consequences', blocks: [
      { ul: [
        'A very high dependency ratio: half the population is too young to work',
        'Severe pressure on schools and clinics; many children do not complete primary education',
        'Food insecurity, made worse by drought and desertification in the Sahel',
        'Enough jobs must be created as this huge cohort reaches working age',
        'Land is subdivided between sons at each generation until plots are too small to live on',
        'In the longer term, a very large potential workforce and domestic market'
      ] }
    ] }
  ]
},

{
  id: 'japan-ageing',
  name: 'Japan: an ageing population',
  place: 'Japan',
  type: 'Population structure',
  units: ['1.1', '1.3'],
  summary: 'The most aged large population in the world, and the standard example of DTM stage 5.',
  stats: [
    ['~29%', 'of the population aged 65 or over'],
    ['~1.3', 'children per woman, far below replacement'],
    ['~84', 'years life expectancy, among the world\'s highest'],
    ['2010', 'the year population peaked, at about 128 million']
  ],
  sections: [
    { h: 'Causes', blocks: [
      { ul: [
        'Excellent healthcare and a healthy diet give a very long life expectancy',
        'Very high cost of housing and education makes children expensive',
        'Long working hours and a demanding corporate culture leave little time for family life',
        'More women in higher education and careers, so marriage and childbirth happen later',
        'Historically very low immigration, so few young migrants arrive to balance the structure'
      ] }
    ] },
    { h: 'Effects', blocks: [
      { ul: [
        'A shrinking workforce and labour shortages, especially in care work, construction and agriculture',
        'Rising pension and healthcare costs falling on fewer taxpayers',
        'Rural depopulation: millions of homes stand empty, and schools and shops have closed',
        'Population is falling by several hundred thousand a year'
      ] }
    ] },
    { h: 'Responses', blocks: [
      { ul: [
        'Raising the retirement age and encouraging people to keep working beyond 65',
        'Heavy investment in robotics and automation, including care robots for the elderly',
        'Improved childcare provision and parental leave to help women combine work and family',
        'A cautious opening to foreign workers through new skilled worker visas from 2019'
      ] }
    ] }
  ]
},

{
  id: 'mexico-usa-migration',
  name: 'Mexico to the USA',
  place: 'Mexico and the United States',
  type: 'International migration',
  units: ['1.2', '1.7'],
  summary: 'The classic voluntary economic migration between a lower income and a higher income country sharing a long land border.',
  stats: [
    ['~3,145 km', 'length of the border'],
    ['~10–11 m', 'Mexican-born people living in the USA'],
    ['~$60 bn', 'remittances sent to Mexico each year'],
    ['~19%', 'of the US population is Hispanic or Latino']
  ],
  sections: [
    { h: 'Push and pull', blocks: [
      { table: {
        head: ['Push factors in Mexico', 'Pull factors in the USA'],
        rows: [
          ['Wages roughly a fifth of US levels', 'Far higher wages, even in low-skilled work'],
          ['High unemployment and underemployment', 'Jobs in agriculture, construction, hotels and food service'],
          ['Rural poverty and small, unproductive farms', 'Better schools and healthcare for children'],
          ['Drug cartel violence in some states', 'Established Mexican communities and family already there'],
          ['Poor rural services', 'Perceived higher standard of living']
        ]
      } }
    ] },
    { h: 'Impacts', blocks: [
      { table: {
        head: ['Mexico', 'USA'],
        rows: [
          ['Remittances are one of the largest sources of foreign income and fund housing and schooling', 'Fills low-paid jobs that many US citizens will not take'],
          ['Reduced pressure on jobs and services', 'Migrants are mostly young and of working age, and pay taxes'],
          ['Loss of young, working-age adults, so some villages hold mainly women, children and the elderly', 'Strong cultural influence on food, music and language, especially in border states'],
          ['Brain drain of some skilled workers', 'Pressure on schools, healthcare and housing in border states'],
          ['Families separated for years at a time', 'Political tension over border security and undocumented migration']
        ]
      } },
      { p: 'Net migration from Mexico to the USA has been close to zero, and at times negative, since around 2010, as Mexican fertility fell and its economy grew. Recent border arrivals are increasingly from Central America and further afield rather than Mexico itself.' }
    ] }
  ]
},

{
  id: 'syria-refugees',
  name: 'Syrian refugee movement',
  place: 'Syria, neighbouring states and Europe',
  type: 'Forced migration',
  units: ['1.2'],
  summary: 'A large-scale forced migration caused by civil war, contrasting with voluntary economic migration.',
  stats: [
    ['2011', 'civil war began'],
    ['~6.8 m', 'refugees who left the country'],
    ['~6.7 m', 'people displaced inside Syria'],
    ['~3.2 m', 'hosted by Türkiye, the largest number']
  ],
  sections: [
    { h: 'Causes', blocks: [
      { p: 'Protests in 2011 escalated into civil war between government forces, opposition groups and later other armed factions. Civilians fled bombing of residential areas, sieges, chemical attacks, conscription, and the collapse of water, power, health and food supplies. This is **forced** migration: the alternative was death or imprisonment, not a lower wage.' }
    ] },
    { h: 'Where people went', blocks: [
      { ul: [
        'Türkiye took by far the largest number, mostly living in cities rather than camps',
        'Lebanon took the largest number relative to its size, at one point roughly one in five residents',
        'Jordan hosted several hundred thousand, including the Zaatari camp, which grew into a settlement of tens of thousands with its own market street',
        'Smaller numbers reached Europe, particularly Germany, peaking in the 2015 crisis when many crossed the Mediterranean in unsafe boats'
      ] }
    ] },
    { h: 'Impacts', blocks: [
      { ul: [
        'Host countries: severe pressure on schools, clinics, housing and water; competition for low-paid work pushed wages down; but refugees also added workers, consumers and new businesses',
        'Refugees: many children lost years of schooling; families depend on aid; legal right to work is restricted in several host countries',
        'Syria: loss of much of its skilled workforce, including doctors and engineers, which will slow reconstruction for decades',
        'Europe: political division over asylum policy, and strain on the countries of first arrival'
      ] },
      { p: 'Figures change as conditions change, and returns began after the fall of the Assad government at the end of 2024. Quote numbers as approximate.' }
    ] }
  ]
},

{
  id: 'dharavi-mumbai',
  name: 'Dharavi, Mumbai',
  place: 'Mumbai, India',
  type: 'Squatter settlement',
  units: ['1.6', '1.7'],
  summary: 'One of the largest and most productive informal settlements in Asia, and a test of every rehousing strategy.',
  stats: [
    ['~2.1 km²', 'area'],
    ['~700k–1 m', 'residents, estimates vary widely'],
    ['~$1 bn', 'estimated annual output of its informal economy'],
    ['~15,000', 'single-room factories and workshops']
  ],
  sections: [
    { h: 'Why it grew there', blocks: [
      { p: 'Dharavi grew on former marshland between two railway lines, close to the centre of Mumbai. Rural migrants arrived from across India seeking work and settled on land nobody else wanted. Its central position is exactly why residents resist being moved: work is within walking distance.' }
    ] },
    { h: 'Problems', blocks: [
      { ul: [
        'Extreme density, with families living and working in a single room',
        'Very few toilets per person, and open drains running between houses',
        'Water available only for a few hours a day from shared standpipes',
        'Disease spreads easily: typhoid, diarrhoea and respiratory illness',
        'Fire risk from cooking, illegal electricity connections and narrow lanes that emergency vehicles cannot enter',
        'Most work is informal, with no contract, safety rules or security',
        'Hazardous recycling work, including melting plastic and handling chemicals without protection'
      ] }
    ] },
    { h: 'Not just poverty', blocks: [
      { p: 'Dharavi is also a working industrial district. It recycles a large share of Mumbai\'s waste: plastic, aluminium, cardboard and electronics are sorted, cleaned and remade. It has established pottery, leather and textile trades, plus its own shops, schools and clinics. Literacy is relatively high and many residents have lived there for generations.' }
    ] },
    { h: 'Redevelopment and the argument about it', blocks: [
      { ul: [
        'The Dharavi Redevelopment Project has been proposed in various forms since 2004 and repeatedly delayed; a private developer took over the tender in the 2020s',
        'The model is to rehouse eligible residents in high-rise flats and sell the freed-up land commercially',
        'Supporters: proper sanitation, secure title, safer buildings',
        'Objections: flats of around 300 square feet cannot house the home industries that people earn from; eligibility cut-off dates exclude many residents; high-rise living breaks up ground-level community and trade networks; maintenance charges may be unaffordable',
        'Many argue that **in-situ upgrading**, improving drains, paths, water and land titles in place, would keep the economy intact'
      ] }
    ] }
  ]
},

{
  id: 'haiti-2010',
  name: 'Haiti earthquake, 2010',
  place: 'Haiti, Caribbean',
  type: 'Earthquake, lower income country',
  units: ['2.1'],
  summary: 'A moderate magnitude earthquake with catastrophic effects, showing that vulnerability matters more than magnitude.',
  stats: [
    ['7.0', 'magnitude'],
    ['13 km', 'focus depth: shallow'],
    ['12 Jan 2010', 'date'],
    ['~1.5 m', 'people made homeless']
  ],
  sections: [
    { h: 'Cause', blocks: [
      { p: 'Haiti sits on the **conservative margin** between the Caribbean and North American plates, along the Enriquillo-Plantain Garden fault. The plates had been locked, building strain, which released suddenly. The epicentre was about 25 km west of the capital, Port-au-Prince, and the focus was shallow at roughly 13 km, so the surface shaking was severe.' }
    ] },
    { h: 'Effects', blocks: [
      { p: 'Official Haitian figures put the death toll between about 220,000 and 316,000, though several independent studies suggest a considerably lower figure. Whichever is used, it was one of the deadliest earthquakes on record.' },
      { table: {
        head: ['Primary', 'Secondary'],
        rows: [
          ['Around 250,000 homes and 30,000 commercial buildings collapsed or were badly damaged', 'A cholera outbreak later in 2010 killed thousands more, spread through contaminated water'],
          ['The presidential palace, parliament and cathedral were destroyed', '1.5 million people were left homeless and lived in tented camps for years'],
          ['Hospitals and schools collapsed, killing staff and pupils', 'Aid was slow to arrive: the port was wrecked and the airport had a single runway'],
          ['Roads blocked by rubble', 'Looting and disorder in the days afterwards'],
          ['', 'Long-term unemployment and lost economic output']
        ]
      } }
    ] },
    { h: 'Why the damage was so severe', blocks: [
      { ul: [
        'Haiti was the poorest country in the Americas, with little money for safe construction',
        'Building codes were weak and barely enforced, so concrete buildings had too little reinforcement and collapsed as slabs',
        'Very high population density in Port-au-Prince, with many buildings on steep, unstable slopes',
        'No earthquake preparation, drills or public education, as the last major quake was over 200 years earlier',
        'Emergency services were themselves destroyed, and the government lost its own buildings and staff'
      ] },
      { tip: 'Compare with a similar magnitude quake in a wealthy country. Building standards, planning, preparation and emergency services explain the difference in deaths far better than the magnitude does.' }
    ] }
  ]
},

{
  id: 'eyjafjallajokull-2010',
  name: 'Eyjafjallajökull eruption, 2010',
  place: 'Iceland',
  type: 'Volcano, constructive margin',
  units: ['2.1'],
  summary: 'A small eruption with modest local effects but enormous global economic impact, because of where the ash went.',
  stats: [
    ['April 2010', 'eruption'],
    ['~8 days', 'of major European airspace closure'],
    ['~100,000', 'flights cancelled'],
    ['~10 m', 'passengers affected']
  ],
  sections: [
    { h: 'Cause', blocks: [
      { p: 'Iceland lies on the **Mid-Atlantic Ridge**, a constructive margin where the Eurasian and North American plates move apart and magma rises to fill the gap. Eyjafjallajökull sits beneath a glacier, and when magma met ice the water flashed to steam. That made the eruption far more explosive than a typical Icelandic one and shattered the magma into a very fine ash, which was then carried high into the atmosphere and blown south-east towards Europe by the jet stream.' }
    ] },
    { h: 'Effects', blocks: [
      { table: {
        head: ['Local (Iceland)', 'Global'],
        rows: [
          ['About 800 people evacuated', 'European airspace closed for around eight days, because ash melts inside jet engines and can stop them'],
          ['Meltwater floods, called jökulhlaups, damaged roads and bridges', 'Roughly 100,000 flights cancelled and 10 million passengers stranded'],
          ['Ash covered farmland; fluoride in the ash poisoned livestock that grazed it', 'Airlines lost an estimated $1.7 billion'],
          ['Homes and crops damaged', 'Kenyan flower growers destroyed unsold stock that could not be air-freighted to Europe'],
          ['Tourism rose afterwards as visitors came to see the volcano', 'Car factories in Europe halted as air-freighted components did not arrive']
        ]
      } },
      { p: 'This case is useful because it shows how a **small** eruption in a sparsely populated area can still cause worldwide disruption through interconnected economies.' }
    ] }
  ]
},

{
  id: 'pinatubo-1991',
  name: 'Mount Pinatubo, 1991',
  place: 'Luzon, Philippines',
  type: 'Volcano, destructive margin',
  units: ['2.1'],
  summary: 'A very large eruption where successful prediction and evacuation saved tens of thousands of lives.',
  stats: [
    ['15 June 1991', 'main eruption'],
    ['~800', 'deaths'],
    ['200,000+', 'people evacuated beforehand'],
    ['~0.5 °C', 'global cooling in the following year']
  ],
  sections: [
    { h: 'Cause', blocks: [
      { p: 'Pinatubo lies on a **destructive margin** where the Philippine plate is being subducted. The subducted oceanic crust melts, and the resulting viscous, gas-rich andesitic magma rose and erupted explosively. It was the second largest eruption of the twentieth century.' }
    ] },
    { h: 'Prediction and evacuation', blocks: [
      { p: 'The volcano had been dormant for around 500 years. From April 1991, scientists recorded swarms of small earthquakes, steam explosions, ground deformation and rising sulphur dioxide emissions. They produced hazard maps, ran an alert level system and showed local officials a documentary on pyroclastic flows to persuade them to act. Over 200,000 people were evacuated before the main eruption, and the US Air Force removed aircraft from Clark Air Base.' }
    ] },
    { h: 'Effects', blocks: [
      { ul: [
        'Around 800 people died, most crushed when roofs collapsed under wet ash: Typhoon Yunya struck at the same time and soaked the ash, roughly doubling its weight',
        'Pyroclastic flows and ash fall destroyed homes, crops and Clark Air Base, which was abandoned',
        '**Lahars** continued for years afterwards, as monsoon rain remobilised ash deposits and buried whole villages',
        'About 20 million tonnes of sulphur dioxide reached the stratosphere, forming a haze that reflected sunlight and cooled global average temperatures by roughly 0.5 °C for a year or two',
        'The indigenous Aeta people lost their homeland on the mountain slopes'
      ] },
      { tip: 'Use Pinatubo whenever a question asks whether prediction works. A far larger eruption than Haiti\'s earthquake was, in death toll, far less deadly, precisely because monitoring gave weeks of warning and the warnings were acted on.' }
    ] }
  ]
},

{
  id: 'bangladesh-floods',
  name: 'Flooding in Bangladesh',
  place: 'Bangladesh',
  type: 'River flooding',
  units: ['2.2'],
  summary: 'A country where flooding is both an annual necessity for farming and a recurring disaster.',
  stats: [
    ['~80%', 'of the country is floodplain or delta'],
    ['1998', 'the worst modern flood: about two thirds of the country under water'],
    ['~30 m', 'people made homeless in 1998'],
    ['3 rivers', 'the Ganges, Brahmaputra and Meghna converge here']
  ],
  sections: [
    { h: 'Physical causes', blocks: [
      { ul: [
        'The **monsoon** brings very heavy rain between June and September',
        'Snowmelt from the Himalayas peaks at the same time, so both sources arrive together',
        'The Ganges, Brahmaputra and Meghna converge in Bangladesh, concentrating an enormous discharge into one delta',
        'The land is extremely flat and low: much of the country is less than 10 m above sea level',
        'Tropical cyclones in the Bay of Bengal push storm surges up the delta',
        'The delta is subsiding, and sea level is rising'
      ] },
      { h3: 'Human causes' },
      { ul: [
        'Deforestation in Nepal and the Himalayan foothills reduces interception and increases runoff and silt',
        'Silt deposited in the river beds raises them, reducing channel capacity',
        'Poorly maintained embankments can fail, and trap water behind them once it has overtopped',
        'Urban growth in Dhaka has increased impermeable surfaces',
        'Wells and irrigation have caused ground subsidence in places'
      ] }
    ] },
    { h: 'Effects', blocks: [
      { table: {
        head: ['Negative', 'Positive'],
        rows: [
          ['Deaths by drowning, and later from water-borne disease', 'Silt deposited on the floodplain renews soil fertility, which is why the delta supports so many people'],
          ['Homes, roads, railways and bridges destroyed', 'Floodwater fills ponds and paddies used for rice and fish farming'],
          ['Rice crops lost, causing food shortages', 'Groundwater is recharged'],
          ['Contaminated water supplies spreading cholera and typhoid', ''],
          ['Millions temporarily homeless', '']
        ]
      } }
    ] },
    { h: 'Management', blocks: [
      { ul: [
        '**Embankments** along major rivers, though they are expensive to maintain and fail catastrophically',
        '**Flood shelters** on raised platforms, which have sharply cut deaths from cyclones',
        '**Early warning systems** using satellite and radio, giving villages hours or days of notice',
        '**Raised homes** on stilts or earth mounds, an appropriate low-cost technology',
        '**Afforestation** in the upper basin and mangrove replanting on the coast',
        'Controlled flooding, letting water onto farmland deliberately so it deposits silt where it is wanted'
      ] }
    ] }
  ]
},

{
  id: 'three-gorges',
  name: 'Three Gorges Dam',
  place: 'Yangtze River, China',
  type: 'River management and energy',
  units: ['2.2', '3.5'],
  summary: 'The largest power station in the world, and a standard example of the costs and benefits of hard engineering.',
  stats: [
    ['185 m', 'dam height'],
    ['22,500 MW', 'generating capacity, the largest in the world'],
    ['~600 km', 'length of the reservoir'],
    ['~1.3 m', 'people relocated']
  ],
  sections: [
    { h: 'Benefits', blocks: [
      { ul: [
        'Generates a very large amount of electricity without burning coal, cutting air pollution and carbon dioxide emissions',
        'Flood control on a river whose floods have historically killed hundreds of thousands of people',
        'Allows 10,000-tonne ocean-going ships to reach Chongqing, far inland, boosting trade',
        'Provides water for irrigation and for cities during dry periods',
        'Created construction jobs and stimulated the regional economy'
      ] }
    ] },
    { h: 'Costs', blocks: [
      { ul: [
        'Around 1.3 million people were relocated; 13 cities, 140 towns and over 1,300 villages were flooded',
        'Many resettled farmers were given poorer, steeper land, and compensation was often inadequate',
        'Over a thousand archaeological and cultural sites were submerged',
        'Silt is trapped behind the dam, so the fertile load no longer reaches the floodplain and delta downstream, and the reservoir slowly fills',
        'Coastal erosion has increased at the delta because sediment supply fell',
        'Habitat loss threatened species including the Yangtze river dolphin and Chinese sturgeon',
        'Reservoir water weight and level changes have been linked to increased landslides and small earthquakes along the valley sides',
        'Pollution now collects in the slow-moving reservoir instead of being flushed away'
      ] },
      { tip: 'This is the best case study for a "hard engineering: to what extent is it successful?" question, because the benefits and costs are both large and easy to quantify.' }
    ] }
  ]
},

{
  id: 'great-barrier-reef',
  name: 'The Great Barrier Reef',
  place: 'Queensland, Australia',
  type: 'Coral reef',
  units: ['2.3'],
  summary: 'The world\'s largest reef system, and the clearest example of a coastal ecosystem under multiple simultaneous threats.',
  stats: [
    ['~2,300 km', 'length'],
    ['~344,000 km²', 'area of the marine park'],
    ['~1,500', 'species of fish'],
    ['1981', 'listed as a World Heritage Site']
  ],
  sections: [
    { h: 'Why coral grows here', blocks: [
      { p: 'The reef lies off the Queensland coast between about 10° and 24° south, in shallow, warm, clear, well-oxygenated water on a continental shelf, with strong sunlight reaching the algae that live inside the coral polyps and supply most of their food.' }
    ] },
    { h: 'Value', blocks: [
      { ul: [
        'Tourism is worth several billion Australian dollars a year and supports tens of thousands of jobs',
        'Nursery grounds for commercial fish species',
        'Natural coastal protection: the reef absorbs wave energy before it reaches the shore',
        'Extremely high biodiversity, including corals, fish, turtles, dugongs and sharks'
      ] }
    ] },
    { h: 'Threats', blocks: [
      { ul: [
        '**Coral bleaching**: warmer sea temperatures stress the coral, which expels its algae, turns white and dies if the heat persists. Mass bleaching events have struck repeatedly since 1998 and have become more frequent',
        '**Ocean acidification** as seawater absorbs carbon dioxide, making it harder for coral to build skeletons',
        '**Runoff** of sediment, fertiliser and pesticide from sugar cane and cattle farming on the coast, which clouds the water and feeds algae',
        '**Crown-of-thorns starfish** outbreaks, encouraged by nutrient runoff, which eat living coral',
        '**Tropical cyclones** breaking up reef structure',
        '**Tourism damage**: anchors, boat groundings, divers standing on coral',
        '**Coastal development** and dredging for ports'
      ] }
    ] },
    { h: 'Management', blocks: [
      { ul: [
        'The Marine Park Authority **zones** the reef, with about a third designated no-take green zones where fishing is banned',
        'Permits and limits on tourist operators, with moorings provided so boats do not anchor on coral',
        'Water quality targets and payments to farmers to cut fertiliser and sediment runoff',
        'Vessels that cull crown-of-thorns starfish',
        'Coral nurseries and replanting trials, and research into heat-tolerant coral',
        'The underlying driver is global temperature, so local management alone cannot solve bleaching'
      ] }
    ] }
  ]
},

{
  id: 'holderness-coast',
  name: 'The Holderness coast',
  place: 'East Yorkshire, England',
  type: 'Coastal erosion and management',
  units: ['2.3'],
  summary: 'The fastest eroding coastline in Europe, and a clear demonstration that protecting one place can damage the next.',
  stats: [
    ['~1.8 m', 'average retreat per year'],
    ['61 km', 'length, Flamborough Head to Spurn Point'],
    ['~29', 'villages lost since Roman times'],
    ['~£2 m', 'cost of the Mappleton scheme, 1991']
  ],
  sections: [
    { h: 'Why erosion is so fast', blocks: [
      { ul: [
        'The cliffs are made of **boulder clay** (glacial till), which is soft, unconsolidated and easily eroded',
        'When saturated by rain the clay slumps, so cliffs retreat by mass movement as well as wave attack',
        'The coast faces north-east, exposed to a long **fetch** across the North Sea, so destructive waves are powerful',
        'Beaches are narrow, so they absorb little wave energy before waves reach the cliff',
        'Eroded clay breaks down into fine particles that are carried away in suspension rather than forming a protective beach'
      ] }
    ] },
    { h: 'Management and its consequences', blocks: [
      { ul: [
        'Larger settlements such as Hornsea and Withernsea are defended with sea walls, groynes and rock armour',
        'At **Mappleton**, two rock groynes and a revetment were built in 1991 to protect the village and the coast road',
        'The scheme worked: a beach built up and erosion at Mappleton virtually stopped',
        'But the groynes trapped sediment moving south by longshore drift, starving the coast immediately downdrift. Erosion at Cowden, just to the south, accelerated sharply, and farmland and property were lost there',
        'This effect is known as **terminal groyne syndrome**, and it is the classic example of the problem with hard engineering on a drift-aligned coast'
      ] },
      { p: 'Material eroded from Holderness is carried south and builds **Spurn Head**, a spit across the Humber estuary. Defending the cliffs therefore also threatens the spit\'s sediment supply.' },
      { p: 'Current shoreline management plans accept that most of the coast cannot be defended affordably, and designate long stretches for **managed retreat** or no active intervention, protecting only larger settlements. Property owners in undefended stretches receive little or no compensation, which is a source of continuing conflict.' }
    ] }
  ]
},

{
  id: 'amazon-deforestation',
  name: 'Amazon deforestation',
  place: 'Brazil and neighbouring states',
  type: 'Deforestation and sustainability',
  units: ['2.5', '3.7'],
  summary: 'The largest rainforest on Earth, cleared mainly for cattle, and the standard case for the causes and effects of deforestation.',
  stats: [
    ['~5.5 m km²', 'total rainforest area'],
    ['~60%', 'of it lies in Brazil'],
    ['~17–20%', 'already cleared'],
    ['~80%', 'of cleared land used for cattle pasture']
  ],
  sections: [
    { h: 'Causes', blocks: [
      { ul: [
        '**Cattle ranching**, by far the largest cause: cleared land is cheap and beef is exported',
        '**Commercial crops**, especially soya beans grown for animal feed',
        '**Logging** of hardwoods such as mahogany, both legal and illegal',
        '**Mining**, including the huge Carajás iron ore complex, plus bauxite and gold',
        '**Roads** such as the Trans-Amazonian Highway, which open the interior to everyone else and cause a fishbone pattern of clearance along them',
        '**Hydroelectric dams**, which flood large areas of forest',
        '**Subsistence farmers** practising slash and burn, often on land they were resettled onto'
      ] }
    ] },
    { h: 'Effects', blocks: [
      { ul: [
        'Soil is exposed and quickly eroded by heavy rain; nutrients are leached out within a few years, so cleared land is often abandoned',
        'Loss of biodiversity, including species not yet described and plants of potential medicinal value',
        'Reduced transpiration lowers local rainfall, and there is concern that beyond a threshold of clearance the forest could dry into savanna',
        'Burning releases large quantities of carbon dioxide, and the standing forest is a major carbon store',
        'Rivers silt up, increasing flood risk and harming fisheries',
        'Indigenous peoples such as the Yanomami and Kayapó lose land, and face disease and violent conflict with miners and ranchers',
        'Against this: exports of beef, soya, timber and minerals earn foreign currency, and roads and power bring access to remote regions'
      ] }
    ] },
    { h: 'Rates change with policy', blocks: [
      { p: 'Annual clearance peaked around 2004 at roughly 27,000 km², fell sharply through the 2000s as monitoring and enforcement improved, rose again from about 2019, then fell steeply again from 2023. This is worth knowing because it shows deforestation responds to **government policy and enforcement**, not only to economics.' }
    ] },
    { h: 'Sustainable management', blocks: [
      { ul: [
        'Satellite monitoring, so illegal clearance is detected quickly, combined with fines and seizure of cattle',
        'Protected national parks, and legally recognised indigenous territories, which have among the lowest clearance rates',
        'Selective logging and replanting rather than clear felling',
        'Agroforestry and harvesting forest products such as nuts, rubber and fruit, which pay while the forest stands',
        'Ecotourism',
        'International agreements and debt-for-nature swaps'
      ] }
    ] }
  ]
},

{
  id: 'green-revolution-india',
  name: 'The Green Revolution in India',
  place: 'India, especially Punjab and Haryana',
  type: 'Food production',
  units: ['3.2'],
  summary: 'A technological package that ended famine risk in India and widened rural inequality at the same time.',
  stats: [
    ['1960s', 'introduced'],
    ['~11 Mt', 'wheat production around 1960'],
    ['75 Mt+', 'wheat production in recent decades'],
    ['1970s–80s', 'India became self-sufficient in cereals']
  ],
  sections: [
    { h: 'What it involved', blocks: [
      { ul: [
        '**High-yielding varieties** of wheat and rice, bred to be short-stemmed so they carry a heavy head of grain without falling over',
        'Heavy use of **chemical fertiliser** and **pesticide**',
        'Reliable **irrigation**, from tube wells and canals',
        '**Mechanisation**: tractors, threshers and pumps',
        'Government support through subsidies, guaranteed prices and credit'
      ] }
    ] },
    { h: 'Successes', blocks: [
      { ul: [
        'Cereal yields rose dramatically, and India moved from importing grain to self-sufficiency',
        'Famine risk was greatly reduced for a rapidly growing population',
        'Farm incomes rose in the regions that adopted it',
        'Two or even three crops a year became possible with irrigation',
        'Surpluses could be stored and exported'
      ] }
    ] },
    { h: 'Problems', blocks: [
      { ul: [
        'The package is **expensive**, so wealthier farmers with larger holdings and access to credit benefited most, widening rural inequality',
        'Mechanisation reduced the need for labour, so landless workers lost jobs and migrated to cities',
        'Heavy irrigation lowered the water table sharply in Punjab, and caused **salinisation** where drainage was poor',
        'Fertiliser and pesticide runoff polluted rivers and groundwater',
        'A few varieties replaced many local ones, reducing genetic diversity and increasing vulnerability to a single pest or disease',
        'Pests developed resistance, so more pesticide was needed over time',
        'Benefits were regionally uneven, concentrated in areas that already had irrigation'
      ] }
    ] }
  ]
},

{
  id: 'high-tech-cambridge',
  name: 'Cambridge Science Park',
  place: 'Cambridge, England',
  type: 'High-technology industry',
  units: ['3.3'],
  summary: 'A footloose, knowledge-based cluster that shows how modern location factors differ from those of heavy industry.',
  stats: [
    ['1970', 'opened, by Trinity College'],
    ['~60 ha', 'site area'],
    ['100+', 'companies on site'],
    ['~7,000', 'people employed']
  ],
  sections: [
    { h: 'Why here', blocks: [
      { ul: [
        '**University links**: proximity to Cambridge University research departments allows collaboration, spin-out companies and shared laboratories',
        '**Skilled labour**: a steady supply of science and engineering graduates',
        '**Transport**: close to the M11 and A14, with rail to London and access to Stansted airport for international staff and air freight',
        '**Site**: a greenfield edge-of-city location with cheap land, room to expand and space for low-density landscaped buildings',
        '**Environment**: an attractive setting helps recruit and retain highly qualified staff who can work anywhere',
        '**Agglomeration**: firms cluster to share suppliers, specialist services, ideas and a labour pool, a process that has given the region the nickname "Silicon Fen"'
      ] }
    ] },
    { h: 'What this tells you about high-tech industry', blocks: [
      { p: 'None of the traditional heavy-industry factors apply. There are no bulky raw materials, no need for a coalfield, and no port. The products are small and valuable, so transport cost is trivial. The key input is **people**, so the location follows universities, housing quality and quick links to airports, not resources.' },
      { p: 'The downside is local: rapid growth has pushed Cambridge house prices far above the regional average and put pressure on roads and water supply, and the surrounding countryside has come under development pressure.' }
    ] }
  ]
},

{
  id: 'kenya-safari',
  name: 'Safari tourism in Kenya',
  place: 'Kenya, East Africa',
  type: 'Tourism in a lower income country',
  units: ['3.4'],
  summary: 'Wildlife tourism that earns essential foreign currency while placing real pressure on the ecosystem and on local people.',
  stats: [
    ['~2 m', 'international arrivals a year'],
    ['~10%', 'of Kenya\'s GDP'],
    ['~24', 'national parks and reserves'],
    ['Maasai Mara', 'the best known reserve']
  ],
  sections: [
    { h: 'Attractions', blocks: [
      { ul: [
        'Big game: lion, elephant, buffalo, leopard and rhino',
        'The annual wildebeest migration between the Serengeti and the Maasai Mara',
        'Spectacular scenery, from Mount Kenya to the Rift Valley lakes',
        'Coral reefs and beaches at Mombasa and Diani, allowing a combined safari and beach holiday',
        'Maasai culture, and a reliable warm climate'
      ] }
    ] },
    { h: 'Benefits', blocks: [
      { ul: [
        'Employment for many thousands directly in lodges, guiding, transport and craft sales, and indirectly in farming and construction',
        'Foreign currency to pay for imports and service debt',
        'Park entry fees fund conservation and anti-poaching patrols',
        'Wildlife is worth more alive than poached, which supports protection',
        'Improved roads, airstrips, water and power that residents also use',
        'The multiplier effect spreads income into the wider economy'
      ] }
    ] },
    { h: 'Problems', blocks: [
      { ul: [
        'Minibuses crowd around big cats, disturbing hunting and breeding, and driving off-road causes soil erosion and scars the grassland',
        'Lodges consume large amounts of water and generate waste in a semi-arid region',
        'The **Maasai** were moved off ancestral grazing land when parks were created, and often see little of the revenue',
        '**Leakage**: package holidays booked with foreign tour operators and airlines mean much of the money never reaches Kenya',
        'Jobs are seasonal and often low paid, while management posts may go to outsiders',
        'Very vulnerable to shocks: terrorism, disease outbreaks, drought and currency changes',
        'Culture becomes a staged performance for visitors'
      ] }
    ] },
    { h: 'Towards sustainability', blocks: [
      { ul: [
        '**Community conservancies**, where Maasai landowners lease land for wildlife and receive rent and a share of tourist income directly',
        'Limits on vehicle numbers and minimum distances from animals, enforced by guides',
        'Employing and training local people as guides, rangers and managers',
        'Small eco-lodges built from local materials, using solar power and recycling water',
        'Entry fees ring-fenced for conservation and for schools and clinics in surrounding communities'
      ] }
    ] }
  ]
},

{
  id: 'jamaica-tourism',
  name: 'Tourism in Jamaica',
  place: 'Jamaica, Caribbean',
  type: 'Tourism and leakage',
  units: ['3.4'],
  summary: 'A small island economy heavily dependent on tourism, and the clearest example of economic leakage.',
  stats: [
    ['~4 m', 'visitors a year, including cruise passengers'],
    ['~30%+', 'of GDP linked to tourism'],
    ['~1 in 4', 'jobs connected to tourism'],
    ['Montego Bay', 'the main resort area, with Negril and Ocho Rios']
  ],
  sections: [
    { h: 'Why tourists come', blocks: [
      { p: 'A warm tropical climate all year, white sand beaches, coral reefs for diving, waterfalls and mountains inland, and a strong cultural identity through reggae music and food. It is within easy flying distance of North America, and is a major cruise ship destination.' }
    ] },
    { h: 'Benefits', blocks: [
      { ul: [
        'Employment in hotels, restaurants, transport, guiding and crafts, in a country with limited alternatives',
        'Foreign currency earnings that fund imports',
        'Investment in airports, roads and water supply',
        'A market for local farmers and fishers supplying hotels',
        'Diversification away from dependence on bauxite and sugar'
      ] }
    ] },
    { h: 'Problems', blocks: [
      { ul: [
        '**Leakage** is severe: many resorts are all-inclusive and foreign owned, so guests eat, drink and buy on site and a large share of spending never reaches local businesses. Imported food and drink send more money abroad',
        'Cruise passengers spend comparatively little ashore but still add to congestion and reef damage',
        'Coastal ecosystems damaged: mangroves cleared for resorts, reefs harmed by anchors, sunscreen, sewage and divers',
        'Beach erosion where dunes and vegetation were removed for development',
        'Wages are low and work is seasonal, concentrated in the northern winter',
        'Local people can be excluded from beaches fenced off by resorts',
        'Water and electricity are diverted to hotels and pools in a country where supply can be unreliable',
        'Extremely vulnerable to hurricanes, recessions and disease outbreaks'
      ] }
    ] },
    { h: 'Responses', blocks: [
      { ul: [
        'Encouraging community tourism, guest houses and locally owned attractions to cut leakage',
        'Requiring hotels to source a minimum share of food locally',
        'Marine parks and mooring buoys to protect reefs',
        'Training and certification schemes so more Jamaicans reach management level',
        'Promoting inland and heritage attractions to spread visitors beyond the coastal strip'
      ] }
    ] }
  ]
}

];
