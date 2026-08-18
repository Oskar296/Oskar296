/* Theme 1 — Population and settlement (Cambridge IGCSE Geography 0460) */
GEO.themes.push({
  id: '1',
  title: 'Population and settlement',
  blurb: 'How populations grow, move and are structured, and how settlements and cities are organised.',
  units: [

  /* ------------------------------------------------------------------ 1.1 */
  {
    id: '1.1',
    title: 'Population dynamics',
    objectives: [
      'Describe and give reasons for the rapid increase in the world population',
      'Show an understanding of over-population and under-population',
      'Understand the main causes of a change in population size',
      'Give reasons for contrasting rates of natural population change',
      'Describe and evaluate population policies'
    ],
    cases: ['china-one-child', 'niger-youthful'],
    sections: [
      {
        h: 'The measurements you must know',
        blocks: [
          { p: 'Every question in this unit is built out of the same handful of rates. Learn the units as well as the definitions, because an answer that drops "per 1000 people per year" loses the mark.' },
          { defs: [
            ['Birth rate', 'The number of live births per 1000 people per year.'],
            ['Death rate', 'The number of deaths per 1000 people per year.'],
            ['Natural increase', 'Birth rate minus death rate. Migration is not included.'],
            ['Population growth', 'Natural increase plus or minus net migration. This is the total change.'],
            ['Fertility rate', 'The average number of children born to a woman in her lifetime. About 2.1 is replacement level.'],
            ['Infant mortality rate', 'The number of deaths of children under one year old per 1000 live births.'],
            ['Life expectancy', 'The average number of years a person is expected to live from birth.']
          ] },
          { tip: 'Natural increase is often written as a percentage. Convert by dividing by 10: a birth rate of 34 and a death rate of 9 gives 25 per 1000, which is 2.5% per year.' }
        ]
      },
      {
        h: 'The population explosion',
        blocks: [
          { p: 'World population was roughly 1 billion in 1800 and passed 8 billion in November 2022. Growth was slow for most of human history, then became very rapid during the twentieth century. Plotted on a graph the curve is exponential: it rises gently, then steeply.' },
          { stats: [
            ['1 bn', 'reached around 1804'],
            ['2 bn', 'reached 1927, 123 years later'],
            ['6 bn', 'reached 1999'],
            ['8 bn', 'reached November 2022']
          ] },
          { p: 'The key point examiners look for is **why**: growth was not caused by people suddenly having more children. It was caused by **death rates falling while birth rates stayed high**. The gap between the two lines is the growth.' },
          { ul: [
            'Medical advances: vaccination, antibiotics, better maternal care',
            'Clean piped water and sewerage, which cut cholera, typhoid and diarrhoeal disease',
            'More reliable food supply through the Green Revolution, fertilisers and irrigation',
            'Better transport, so food and aid reach areas of shortage',
            'Fewer deaths from war and famine in many regions'
          ] },
          { p: 'Growth is now slowing. The global fertility rate has fallen from about 5 children per woman in 1960 to around 2.2 today, and the United Nations projects world population will peak later this century.' }
        ]
      },
      {
        h: 'The Demographic Transition Model',
        blocks: [
          { p: 'The DTM describes how birth and death rates change as a country develops. It is a model, so it shows a general pattern rather than the exact path of any one country.' },
          { table: {
            head: ['Stage', 'Birth rate', 'Death rate', 'Natural increase', 'Example'],
            rows: [
              ['1 High fluctuating', 'High', 'High', 'Very low, fluctuating', 'Remote communities only'],
              ['2 Early expanding', 'High', 'Falling rapidly', 'Very high', 'Niger, Afghanistan'],
              ['3 Late expanding', 'Falling rapidly', 'Low', 'High but slowing', 'India, Brazil, Mexico'],
              ['4 Low fluctuating', 'Low', 'Low', 'Low, fluctuating', 'UK, USA, Australia'],
              ['5 Natural decrease', 'Very low', 'Low, slowly rising', 'Negative', 'Japan, Germany, Italy']
            ]
          } },
          { tip: 'A very common question asks you to describe the shape of the graph at a named stage. Always talk about both lines and the gap between them, then name a country.' }
        ]
      },
      {
        h: 'Why birth rates differ',
        blocks: [
          { h3: 'Reasons for a high birth rate' },
          { ul: [
            'Little access to contraception or family planning advice',
            'High infant mortality, so parents have more children expecting some to die',
            'Children are needed as labour on family farms',
            'Children support parents in old age where there is no state pension',
            'Religious or cultural beliefs that encourage large families',
            'Early marriage and a long childbearing period',
            'Low levels of female education and limited paid work for women'
          ] },
          { h3: 'Reasons for a falling birth rate' },
          { ul: [
            'Contraception and family planning are widely available and accepted',
            'Girls stay in education longer and more women work, so children are delayed',
            'Infant mortality falls, so families no longer need to be large',
            'Urbanisation: in cities housing is cramped and children cost money rather than earning it',
            'State pensions remove the need for children as security in old age',
            'Government anti-natalist policies'
          ] },
          { h3: 'Reasons for a falling death rate' },
          { ul: [
            'Vaccination programmes and better primary healthcare',
            'Clean water supply and sanitation',
            'More and better food, so fewer people are malnourished',
            'Improved housing and living conditions',
            'Health education about hygiene, diet and disease'
          ] }
        ]
      },
      {
        h: 'Over-population and under-population',
        blocks: [
          { p: 'Both terms are about the **balance between people and resources**, not about population size on its own. A crowded country is not automatically over-populated.' },
          { defs: [
            ['Over-population', 'There are too many people for the resources and technology available, so standards of living fall.'],
            ['Under-population', 'There are too few people to use the resources available efficiently, so the country produces less than it could.'],
            ['Optimum population', 'The population that gives the highest standard of living, or output per person, with the resources available.']
          ] },
          { table: {
            head: ['', 'Over-population', 'Under-population'],
            rows: [
              ['Problems', 'Unemployment, food and water shortages, overcrowded housing, pressure on schools and hospitals, pollution, deforestation', 'Labour shortages, resources left unused, small home market, high cost of providing services over a large area'],
              ['Examples', 'Bangladesh, Niger, parts of Ethiopia', 'Australia, Canada, Mongolia'],
              ['Responses', 'Family planning, investment in education, food imports, emigration', 'Encourage immigration, pro-natalist incentives, mechanisation']
            ]
          } }
        ]
      },
      {
        h: 'Population policies',
        blocks: [
          { p: 'Governments try to change population growth in two directions.' },
          { defs: [
            ['Anti-natalist policy', 'Aims to reduce the birth rate. China ran the one-child policy from 1979 to 2015.'],
            ['Pro-natalist policy', 'Aims to raise the birth rate. France, Singapore, Japan and Hungary all offer incentives to have children.']
          ] },
          { p: 'Pro-natalist measures usually include longer paid parental leave, cash payments per child, subsidised childcare, tax reductions for larger families and free or cheap fertility treatment. They tend to work slowly and are expensive, because they are trying to change personal decisions about family size.' },
          { tip: 'When asked to *evaluate* a policy, you must give both the successes and the problems, then finish with a judgement. Marks are lost by listing effects without deciding whether the policy worked.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.2 */
  {
    id: '1.2',
    title: 'Migration',
    objectives: [
      'Explain and give reasons for population migration',
      'Demonstrate an understanding of the impacts of migration'
    ],
    cases: ['mexico-usa-migration', 'syria-refugees'],
    sections: [
      {
        h: 'Types of migration',
        blocks: [
          { p: 'Migration is the movement of people from one place to another to live, usually for a year or more. Be precise about the type, because the causes and effects are different.' },
          { defs: [
            ['Immigration', 'Movement into a country.'],
            ['Emigration', 'Movement out of a country.'],
            ['Net migration', 'Immigration minus emigration. A positive figure means the population is gained by migration.'],
            ['Internal migration', 'Movement within a country, such as rural to urban migration.'],
            ['International migration', 'Movement between countries.'],
            ['Voluntary migration', 'The migrant chooses to move, usually for work or a better quality of life.'],
            ['Forced migration', 'The migrant has no realistic choice: war, persecution, natural disaster or a development scheme.'],
            ['Refugee', 'Someone forced to leave their country to escape war, persecution or disaster.'],
            ['Asylum seeker', 'Someone who has applied for refugee status and is waiting for a decision.'],
            ['Economic migrant', 'Someone who moves voluntarily to find work or a higher income.']
          ] }
        ]
      },
      {
        h: 'Push and pull factors',
        blocks: [
          { p: 'Push factors drive people out of the source area. Pull factors attract them to the destination. Most migrations involve both at once.' },
          { table: {
            head: ['Push factors', 'Pull factors'],
            rows: [
              ['Unemployment or low wages', 'Jobs and higher wages'],
              ['Poor housing and services', 'Better schools, hospitals and housing'],
              ['Crop failure, drought or soil exhaustion', 'Reliable food supply'],
              ['War, persecution or political instability', 'Safety and political freedom'],
              ['Natural hazards such as flooding', 'Lower hazard risk'],
              ['Land shortage as farms are divided between children', 'Family and friends already there']
            ]
          } },
          { p: 'Between the two sit **obstacles**: the cost of the journey, distance, immigration laws and visas, language, and family ties. These explain why many migrants move only a short distance, or move in stages, known as *step migration*.' },
          { tip: 'Do not mix up the two lists. "Lack of jobs" is a push factor in the source area; "jobs available" is a pull factor in the destination. Write which area you are describing.' }
        ]
      },
      {
        h: 'Impacts of migration',
        blocks: [
          { h3: 'On the source (losing) country' },
          { table: {
            head: ['Advantages', 'Disadvantages'],
            rows: [
              ['Less pressure on jobs, housing, food and services', 'Loss of young working-age adults, so the population left behind ages'],
              ['Remittances sent home raise family incomes and can be spent on schooling', 'Brain drain: doctors, nurses, engineers and teachers leave'],
              ['Returning migrants bring new skills and savings', 'Farms and businesses are short of labour'],
              ['Unemployment falls', 'Families are separated, and children may be raised by grandparents']
            ]
          } },
          { h3: 'On the receiving (gaining) country' },
          { table: {
            head: ['Advantages', 'Disadvantages'],
            rows: [
              ['Fills labour shortages, often in jobs local people avoid', 'Pressure on housing, schools, healthcare and transport'],
              ['Migrants are mostly of working age and pay taxes', 'Racial tension and discrimination if integration is poor'],
              ['Cultural enrichment: food, music, language, festivals', 'Money sent abroad as remittances leaves the economy'],
              ['Helps offset an ageing population', 'Some local people believe wages are pushed down']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.3 */
  {
    id: '1.3',
    title: 'Population structure',
    objectives: [
      'Identify and give reasons for different types of population structure',
      'Describe the implications of different population structures'
    ],
    cases: ['japan-ageing', 'niger-youthful'],
    sections: [
      {
        h: 'Reading a population pyramid',
        blocks: [
          { p: 'A population pyramid shows the structure of a population by age and sex. Age groups run in five-year bands up the vertical axis, males on the left and females on the right. The horizontal axis shows either numbers or the percentage of the total population.' },
          { ul: [
            '**Wide base** means a high birth rate and a youthful population',
            '**Narrow base** means a low birth rate',
            '**Rapidly narrowing sides** mean a high death rate and short life expectancy',
            '**Straight, parallel sides** mean a low death rate through the working years',
            '**Wide top** means a long life expectancy and an ageing population',
            '**Indents or bulges** show a specific event: war losses, an epidemic, a baby boom or a wave of migration'
          ] },
          { tip: 'When describing a pyramid, always quote figures from the axes. "About 16% of males are aged 0 to 4" scores; "the base is wide" on its own often does not.' }
        ]
      },
      {
        h: 'Dependency',
        blocks: [
          { p: 'The population is split into three groups: young dependants aged 0 to 14, the economically active aged 15 to 64, and elderly dependants aged 65 and over.' },
          { defs: [
            ['Dependency ratio', 'The number of dependants compared with the working population, worked out as (young + elderly) divided by working age, multiplied by 100.']
          ] },
          { p: 'A ratio of 60 means there are 60 dependants for every 100 workers. A **high** ratio means a heavy burden on the working population, who pay the taxes that fund schools, pensions and healthcare.' }
        ]
      },
      {
        h: 'An ageing population',
        blocks: [
          { p: 'Caused by a falling birth rate combined with a rising life expectancy, so the proportion of over-65s grows. Typical of countries in stages 4 and 5 of the DTM.' },
          { table: {
            head: ['Problems', 'Opportunities'],
            rows: [
              ['Rising cost of state pensions', 'Grandparents provide free childcare, letting parents work'],
              ['Greater demand for healthcare and care homes', 'Older people volunteer in the community'],
              ['Shrinking workforce and skills shortages', 'The "grey pound": spending on travel, leisure and housing'],
              ['Higher taxes on a smaller working population', 'Experienced workers stay in the workforce longer'],
              ['Schools close as there are fewer children', 'Creates jobs in healthcare and care services']
            ]
          } },
          { h3: 'Government responses' },
          { ul: [
            'Raise the retirement age so people work and pay tax for longer',
            'Encourage immigration of working-age people',
            'Pro-natalist incentives to raise the birth rate',
            'Encourage private pensions to reduce the state bill',
            'Automation and robotics to replace missing workers'
          ] }
        ]
      },
      {
        h: 'A youthful population',
        blocks: [
          { p: 'Caused by a high birth rate and a falling death rate, so a large share of the population is under 15. Typical of stage 2 countries.' },
          { table: {
            head: ['Problems', 'Opportunities'],
            rows: [
              ['Not enough schools, teachers and clinics', 'A large future workforce'],
              ['High cost of education and child healthcare', 'Attracts investment through cheap, plentiful labour'],
              ['Enough jobs must be created as the bulge reaches working age', 'Low cost of caring for the elderly'],
              ['High dependency ratio now', 'A large future market for goods and services']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.4 */
  {
    id: '1.4',
    title: 'Population density and distribution',
    objectives: [
      'Describe the factors influencing the density and distribution of population'
    ],
    cases: [],
    sections: [
      {
        h: 'Density and distribution are not the same thing',
        blocks: [
          { defs: [
            ['Population density', 'The average number of people per square kilometre. It is a single figure for an area.'],
            ['Population distribution', 'The way people are spread out across an area. It is a pattern, described in words.']
          ] },
          { p: 'A country can have a low average density and still have very crowded places. Egypt has a low national density, but almost everyone lives on the narrow strip of land beside the Nile, so distribution is extremely uneven.' }
        ]
      },
      {
        h: 'Factors encouraging dense population',
        blocks: [
          { h3: 'Physical' },
          { ul: [
            'Flat or gently sloping land that is easy to build on and farm',
            'Deep, fertile soils such as alluvium on a floodplain or volcanic soils',
            'A reliable water supply from rivers or groundwater',
            'A temperate climate with enough rainfall and no extremes',
            'Natural resources such as coal, oil or minerals',
            'A sheltered coastline suitable for ports'
          ] },
          { h3: 'Human and economic' },
          { ul: [
            'Plenty of jobs in industry and services',
            'Good transport links by road, rail, sea and air',
            'Well-developed services: schools, hospitals, universities',
            'Political stability and safety',
            'Government investment and capital city status'
          ] },
          { p: 'Examples of densely populated areas: the Ganges valley in India and Bangladesh, eastern China, Java in Indonesia, western Europe and the north-east coast of the USA.' }
        ]
      },
      {
        h: 'Factors causing sparse population',
        blocks: [
          { ul: [
            'Mountainous, steep or high land: thin soils, cold, hard to build on, such as the Himalayas and the Andes',
            'Extreme cold: tundra and polar regions such as Greenland, northern Canada and Siberia',
            'Extreme aridity: deserts such as the Sahara, the Atacama and central Australia',
            'Dense tropical rainforest: poor soils once cleared, disease, difficult access, such as the Amazon basin',
            'Areas with disease, for example where malaria or sleeping sickness is common',
            'Very remote areas far from markets and transport',
            'Political instability, conflict or a high hazard risk'
          ] },
          { tip: 'For "describe the distribution" questions, use compass directions, name places, and quote densities from the key. Then look for the anomaly, because it usually carries a mark.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.5 */
  {
    id: '1.5',
    title: 'Settlements and service provision',
    objectives: [
      'Explain the patterns of settlement',
      'Describe and explain the factors which may influence the sites, growth and functions of settlements',
      'Give reasons for the hierarchy of settlements and services'
    ],
    cases: [],
    sections: [
      {
        h: 'Site and situation',
        blocks: [
          { defs: [
            ['Site', 'The actual land on which a settlement is built, described in terms of relief, water, soil and shelter.'],
            ['Situation', 'The position of a settlement in relation to the area around it, such as its links to other towns, routes and resources.'],
            ['Function', 'What a settlement mainly does: port, market town, mining town, resort, capital, dormitory town.']
          ] },
          { h3: 'Common site factors' },
          { ul: [
            '**Wet point site**: beside a reliable water supply, such as a spring line at the foot of a scarp slope',
            '**Dry point site**: on raised, drier ground above a marsh or floodplain to avoid flooding',
            '**Defensive site**: on a hill or inside a river meander, so attackers can be seen and repelled',
            '**Bridging point**: where a river is narrow or shallow enough to cross, so routes converge',
            '**Shelter**: in a valley or on the lee side of a hill, away from prevailing winds',
            '**Aspect**: on a south-facing slope in the northern hemisphere for warmth and sunlight',
            '**Resources**: near fuel, building stone, timber or fertile farmland'
          ] }
        ]
      },
      {
        h: 'Settlement patterns',
        blocks: [
          { defs: [
            ['Dispersed', 'Buildings scattered widely with gaps between them, typical of hill farming areas.'],
            ['Nucleated', 'Buildings clustered tightly together, often around a crossroads, green or church.'],
            ['Linear', 'Buildings strung out in a line along a road, river, valley floor or canal.']
          ] }
        ]
      },
      {
        h: 'The settlement hierarchy',
        blocks: [
          { p: 'Settlements can be ranked by population size, by the number of services they provide, or by their sphere of influence. The three usually agree.' },
          { table: {
            head: ['Rank', 'Settlement', 'Number of them', 'Services'],
            rows: [
              ['Lowest', 'Isolated dwelling', 'Very many', 'None'],
              ['', 'Hamlet', 'Many', 'Perhaps a phone box or postbox'],
              ['', 'Village', 'Fewer', 'Shop, primary school, pub, church'],
              ['', 'Town', 'Fewer still', 'Supermarkets, secondary school, bank, small hospital'],
              ['', 'City', 'Few', 'Department stores, university, general hospital, theatres'],
              ['Highest', 'Conurbation or megacity', 'Very few', 'Full range, including specialist and national services']
            ]
          } },
          { p: 'As you move up the hierarchy: settlements become **larger**, there are **fewer** of them, they are **further apart**, and they offer **more and higher order** services.' }
        ]
      },
      {
        h: 'Threshold, range and sphere of influence',
        blocks: [
          { defs: [
            ['Threshold population', 'The minimum number of people needed to make a service profitable enough to survive.'],
            ['Range', 'The maximum distance people are prepared to travel to use a service.'],
            ['Sphere of influence', 'The area served by a settlement or a service, also called its catchment area or urban field.']
          ] },
          { table: {
            head: ['', 'Low order service', 'High order service'],
            rows: [
              ['Examples', 'Newsagent, post box, primary school, bakery', 'Hospital, university, furniture store, football stadium'],
              ['Threshold', 'Low', 'High'],
              ['Range', 'Short', 'Long'],
              ['Frequency of use', 'Daily or weekly', 'Rarely, perhaps once a year'],
              ['Number of outlets', 'Many, spread out', 'Few, in large settlements only']
            ]
          } },
          { tip: 'A convincing explanation links the two ideas: a hospital needs a very large threshold population, so only a large city can support one, so people travel a long way to reach it, which gives it a large sphere of influence.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.6 */
  {
    id: '1.6',
    title: 'Urban settlements',
    objectives: [
      'Describe and give reasons for the characteristics of, and changes in, land use in urban areas',
      'Explain the problems of urban areas, their causes and possible solutions'
    ],
    cases: ['dharavi-mumbai'],
    sections: [
      {
        h: 'Urban land use zones',
        blocks: [
          { p: 'Cities are not uniform. Land use falls into zones because land is most expensive where it is most accessible, and different users can afford different amounts.' },
          { table: {
            head: ['Zone', 'Characteristics'],
            rows: [
              ['Central business district (CBD)', 'Shops, offices and banks; the highest land values, so buildings are tall to use the space; very accessible where routes meet; few residents; congestion and pedestrianised streets'],
              ['Inner city', 'Older terraced housing and former factories built in the industrial era; high density, often in poor repair; some cleared and rebuilt or gentrified'],
              ['Suburbs', 'Semi-detached and detached housing with gardens, built outwards as transport improved; lower density; local shopping parades'],
              ['Rural-urban fringe', 'Where the city meets the countryside; cheap land so it attracts superstores, business parks, golf courses, airports and new estates']
            ]
          } }
        ]
      },
      {
        h: 'Urban models',
        blocks: [
          { h3: 'Burgess concentric zone model' },
          { p: 'Rings around a central CBD, with housing quality improving outwards from the inner city to the suburbs. Based on early twentieth century Chicago.' },
          { h3: 'Hoyt sector model' },
          { p: 'Adds transport. Land use develops in wedges or sectors along main roads and railways out from the CBD, so industry follows a valley or rail line and higher-class housing forms its own sector away from it.' },
          { h3: 'A model for cities in lower income countries' },
          { p: 'The pattern is often reversed: the wealthiest housing lies close to the centre or along a main spine road, while the poorest live in **squatter settlements on the outskirts**. Moving outwards there is a zone of maturity with improved self-built housing, a zone of in-situ accretion still being upgraded, and then the newest squatter settlements at the edge.' },
          { tip: 'Models are generalisations. Marks are available for saying where a real city does not fit, for example because of a river, relief, an old city wall or planning laws.' }
        ]
      },
      {
        h: 'Urban problems and solutions',
        blocks: [
          { table: {
            head: ['Problem', 'Cause', 'Possible solutions'],
            rows: [
              ['Traffic congestion', 'Too many cars on roads built for fewer, and commuting into the CBD', 'Park and ride, congestion charging, bus lanes, ring roads, improved public transport, pedestrianisation'],
              ['Air pollution', 'Vehicle exhaust and industry, sometimes trapped by a temperature inversion', 'Low emission zones, cleaner fuels, electric buses, moving industry out of the city'],
              ['Housing shortage', 'Rapid in-migration and rising prices', 'Build on brownfield sites, high-density flats, affordable housing quotas, new towns'],
              ['Urban sprawl', 'Cities spreading onto farmland at the fringe', 'Green belts, brownfield first policies, higher densities'],
              ['Inner city decline', 'Factories closing, leaving derelict land and unemployment', 'Urban regeneration, retraining schemes, enterprise zones, waterfront redevelopment'],
              ['Waste and litter', 'High population density and high consumption', 'Recycling schemes, waste-to-energy plants, fines for fly-tipping']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 1.7 */
  {
    id: '1.7',
    title: 'Urbanisation',
    objectives: [
      'Identify and suggest reasons for rapid urban growth',
      'Describe the impacts of urban growth on both rural and urban areas, along with possible solutions to reduce the negative impacts'
    ],
    cases: ['dharavi-mumbai', 'mexico-usa-migration'],
    sections: [
      {
        h: 'What urbanisation is',
        blocks: [
          { defs: [
            ['Urbanisation', 'An increase in the proportion of a country\'s population living in towns and cities.'],
            ['Rural-urban migration', 'The movement of people from the countryside into towns and cities.'],
            ['Megacity', 'A city with more than 10 million inhabitants.'],
            ['Counter-urbanisation', 'The movement of people out of large cities to smaller towns and rural areas.']
          ] },
          { p: 'Over half the world now lives in urban areas. Growth is fastest in Africa and Asia, and slowest in Europe and North America, where most people already live in cities.' },
          { tip: 'Urbanisation is a *proportion*, not a total. A city can grow in size while the country is not urbanising, if the rural population grows just as fast.' }
        ]
      },
      {
        h: 'Two causes, not one',
        blocks: [
          { ol: [
            '**Rural-urban migration**, driven by rural push factors such as mechanisation of farming, land shortage, drought and lack of services, and urban pull factors such as jobs, wages, schools and hospitals.',
            '**High natural increase within the city**, because migrants are mostly young adults of childbearing age, so the city has a high birth rate and a low death rate.'
          ] },
          { p: 'Many answers mention only migration. Both causes are needed for full marks.' }
        ]
      },
      {
        h: 'Squatter settlements',
        blocks: [
          { p: 'Also called shanty towns, favelas in Brazil, bustees in India and barrios in parts of Latin America. They are settlements built illegally by residents on land they do not own, often on marginal sites: steep slopes, floodplains, beside railways or on rubbish tips.' },
          { h3: 'Problems' },
          { ul: [
            'Houses built from scrap wood, corrugated iron and plastic sheeting, so they are unsafe in storms, floods and landslides',
            'Little or no clean water, sewerage or electricity, so water-borne disease such as cholera and typhoid spreads',
            'Very high densities and overcrowding',
            'Few formal jobs, so most work in the informal sector with no contract, security or tax',
            'Limited schools and clinics, and sometimes high crime rates',
            'No legal land title, so residents can be evicted and will not invest in their homes'
          ] },
          { h3: 'Solutions' },
          { table: {
            head: ['Approach', 'What it involves', 'Evaluation'],
            rows: [
              ['Self-help schemes', 'Government supplies cheap materials and loans; residents provide the labour', 'Cheap and builds skills and pride, but slow and depends on residents having time'],
              ['Site and service', 'Land is laid out with water, sewerage and electricity before people build their own homes', 'Ensures basic services, but plots may be far from jobs in the centre'],
              ['In-situ upgrading', 'Existing settlements are improved: paved paths, drains, standpipes, legal land titles', 'Keeps communities and jobs together; land title encourages investment; but can be piecemeal'],
              ['Clearance and rehousing', 'Bulldozing and rebuilding as high-rise flats', 'Modern housing, but destroys communities and informal businesses, and rents are often unaffordable']
            ]
          } }
        ]
      },
      {
        h: 'Effects on rural areas',
        blocks: [
          { p: 'Urbanisation changes the countryside as well as the city.' },
          { ul: [
            'Rural depopulation, as young adults leave and the remaining population ages',
            'Farms lose labour, so land may be abandoned or left under-farmed',
            'Village services close because the threshold population is no longer reached',
            'Remittances sent home can raise incomes and pay for schooling',
            'Near large cities the opposite happens: counter-urbanisation brings commuters, house prices rise and villages become dormitory settlements'
          ] }
        ]
      }
    ]
  }

  ]
});
