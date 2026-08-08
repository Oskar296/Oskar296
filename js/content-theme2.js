/* Theme 2 — The natural environment (Cambridge IGCSE Geography 0460) */
GEO.themes.push({
  id: '2',
  title: 'The natural environment',
  blurb: 'Plate tectonics and hazards, river and coastal systems, weather measurement, and two contrasting climates.',
  units: [

  /* ------------------------------------------------------------------ 2.1 */
  {
    id: '2.1',
    title: 'Earthquakes and volcanoes',
    objectives: [
      'Describe the main types and features of volcanoes and earthquakes',
      'Describe and explain the distribution of earthquakes and volcanoes',
      'Describe the causes of earthquakes and volcanic eruptions and their effects on people and the environment',
      'Demonstrate an understanding of opportunities presented by earthquake and volcanic zones and the reasons why people live there',
      'Demonstrate an understanding that hazard risk can be reduced by prediction, building design and preparation'
    ],
    cases: ['haiti-2010', 'eyjafjallajokull-2010', 'pinatubo-1991'],
    sections: [
      {
        h: 'The structure of the Earth',
        blocks: [
          { table: {
            head: ['Layer', 'Description'],
            rows: [
              ['Inner core', 'Solid iron and nickel, around 5500 °C, kept solid by immense pressure'],
              ['Outer core', 'Liquid iron and nickel'],
              ['Mantle', 'Semi-molten rock; convection currents here drive plate movement'],
              ['Crust', 'A thin, rigid outer shell broken into tectonic plates']
            ]
          } },
          { table: {
            head: ['', 'Continental crust', 'Oceanic crust'],
            rows: [
              ['Thickness', '30 to 70 km', '6 to 10 km'],
              ['Density', 'Lower', 'Higher'],
              ['Rock type', 'Granitic', 'Basaltic'],
              ['Age', 'Very old, over 1500 million years in places', 'Young, under 200 million years'],
              ['Can it be destroyed?', 'No, it is too buoyant to subduct', 'Yes, it subducts and is recycled']
            ]
          } },
          { p: 'Plates move because of **convection currents** in the mantle: heat from the core makes hot rock rise, spread out beneath the crust and drag the plates with it, then cool and sink. At a destructive margin the weight of the sinking slab also pulls the plate along.' }
        ]
      },
      {
        h: 'The four plate margins',
        blocks: [
          { table: {
            head: ['Margin', 'Movement', 'Landforms', 'Hazards', 'Example'],
            rows: [
              ['Constructive (divergent)', 'Plates move apart; magma rises to fill the gap and makes new crust', 'Mid-ocean ridge, rift valley, shield volcanoes', 'Gentle eruptions, shallow and weak earthquakes', 'Mid-Atlantic Ridge, Iceland'],
              ['Destructive (convergent)', 'Oceanic plate subducts beneath continental plate because it is denser', 'Ocean trench, fold mountains, composite volcanoes', 'Violent explosive eruptions, powerful earthquakes', 'Nazca beneath South American: the Andes'],
              ['Collision', 'Two continental plates meet; neither subducts, so rock is crumpled upwards', 'Fold mountains, no volcanoes', 'Strong earthquakes only', 'Indian into Eurasian: the Himalayas'],
              ['Conservative (transform)', 'Plates slide past one another; crust is neither made nor destroyed', 'Fault lines, offset streams', 'Earthquakes, sometimes severe; no volcanoes', 'San Andreas Fault, California']
            ]
          } },
          { tip: 'Two marks are regularly thrown away here. Collision and conservative margins produce **no volcanoes**. And a destructive margin subducts the oceanic plate because it is **denser**, not because it is thinner.' }
        ]
      },
      {
        h: 'Distribution',
        blocks: [
          { p: 'Earthquakes and volcanoes are not scattered randomly. They form narrow belts that follow plate margins.' },
          { ul: [
            'The **Pacific Ring of Fire** encircles the Pacific Ocean: the west coast of the Americas, Japan, the Philippines, Indonesia and New Zealand. It holds roughly three quarters of the world\'s active volcanoes',
            'A belt runs through the **Mediterranean and across Asia** to the Himalayas',
            'A line of volcanic and seismic activity follows the **mid-ocean ridges**, especially the Mid-Atlantic Ridge',
            'A few volcanoes sit far from any margin, above **hot spots**, such as Hawaii'
          ] }
        ]
      },
      {
        h: 'Volcanoes',
        blocks: [
          { table: {
            head: ['', 'Shield volcano', 'Composite (strato) volcano'],
            rows: [
              ['Margin', 'Constructive, or a hot spot', 'Destructive'],
              ['Lava', 'Basaltic: runny, low silica, very hot', 'Andesitic: viscous, high silica, cooler'],
              ['Shape', 'Wide base, gentle slopes, low height', 'Steep, symmetrical cone'],
              ['Structure', 'Layers of lava only', 'Alternating layers of ash and lava'],
              ['Eruption', 'Frequent and gentle (effusive)', 'Infrequent and violent (explosive)'],
              ['Example', 'Mauna Loa, Hawaii', 'Mount Fuji, Japan']
            ]
          } },
          { defs: [
            ['Magma chamber', 'The reservoir of molten rock beneath the volcano.'],
            ['Vent', 'The pipe through which magma travels to the surface.'],
            ['Crater', 'The bowl-shaped hollow at the top of the vent.'],
            ['Pyroclastic flow', 'A fast-moving cloud of superheated gas, ash and rock; the deadliest volcanic hazard.'],
            ['Lahar', 'A mudflow of volcanic ash mixed with water from rain or melted snow.']
          ] },
          { p: 'Volcanoes are classified as **active** (has erupted recently and is expected to again), **dormant** (has not erupted for a long time but could) or **extinct** (will not erupt again).' }
        ]
      },
      {
        h: 'Earthquakes',
        blocks: [
          { defs: [
            ['Focus', 'The point underground where the earthquake starts and the rock first breaks. Also called the hypocentre.'],
            ['Epicentre', 'The point on the surface directly above the focus, where shaking is usually strongest.'],
            ['Seismic waves', 'The energy released, which travels outwards from the focus and shakes the ground.'],
            ['Richter scale', 'Measures magnitude, the energy released. It is logarithmic, so each whole number is about 30 times more energy.'],
            ['Mercalli scale', 'Measures intensity: the observed effects on people and buildings, from I to XII.']
          ] },
          { p: 'A **shallow** focus produces more surface damage than a deep one of the same magnitude, because the energy has less rock to travel through.' },
          { h3: 'Primary and secondary effects' },
          { table: {
            head: ['Primary (immediate, caused by the shaking itself)', 'Secondary (follow on afterwards)'],
            rows: [
              ['Buildings, bridges and roads collapse', 'Fires from fractured gas pipes and broken electricity cables'],
              ['People killed or injured by falling masonry', 'Tsunami if the epicentre is beneath the sea bed'],
              ['Water, gas and power lines fracture', 'Landslides and rockfalls on steep slopes'],
              ['Ground cracks and ruptures', 'Disease from contaminated water and lack of sanitation'],
              ['', 'Homelessness, unemployment and lost trade']
            ]
          } }
        ]
      },
      {
        h: 'Why do people live in hazardous areas?',
        blocks: [
          { ul: [
            '**Fertile soils**: weathered volcanic ash and lava produce rich soils ideal for coffee, vines and rice',
            '**Geothermal energy**: Iceland heats most of its homes and generates electricity from volcanic heat',
            '**Minerals**: volcanic areas yield sulphur, copper, gold, silver and diamonds',
            '**Tourism**: volcanoes and hot springs attract visitors, creating jobs in hotels, guiding and transport',
            'Eruptions and quakes are **rare**, so people judge the risk as low compared with the daily benefits',
            'Family, land, home and work are already there, and many people are **too poor to move**',
            'People trust that **prediction and building regulations** will protect them'
          ] }
        ]
      },
      {
        h: 'Reducing the risk',
        blocks: [
          { h3: 'Prediction and monitoring' },
          { ul: [
            'Seismometers record small tremors that often build up before an eruption',
            'Tiltmeters and GPS detect the ground bulging as magma rises',
            'Gas sensors detect rising sulphur dioxide emissions',
            'Thermal imaging from satellites shows ground heating',
            'Earthquakes remain very difficult to predict; seismic gaps and past records only show where one is *likely*'
          ] },
          { h3: 'Building design' },
          { ul: [
            'Deep foundations anchored into bedrock',
            'Steel cross-bracing and a reinforced concrete frame so the building flexes rather than snaps',
            'Rubber shock absorbers or base isolators between the building and its foundations',
            'A counterweight or damper near the roof that sways against the motion',
            'Automatic shut-off valves on gas mains to prevent fires'
          ] },
          { h3: 'Preparation and planning' },
          { ul: [
            'Regular earthquake drills in schools and offices, as in Japan',
            'Emergency kits with water, food, a torch and a radio',
            'Land use zoning to keep housing off the most unstable ground and out of lahar valleys',
            'Emergency services trained and equipped, with rescue plans rehearsed',
            'Evacuation routes signposted, and lahar diversion channels built around volcanoes'
          ] },
          { tip: 'A strong evaluation notes that wealth matters more than technology. Japan and Haiti both had major earthquakes; the difference in deaths came from building quality, planning and emergency services, not from the size of the quake.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 2.2 */
  {
    id: '2.2',
    title: 'Rivers',
    objectives: [
      'Explain the main hydrological characteristics and processes which operate within rivers and drainage basins',
      'Demonstrate an understanding of the work of a river in eroding, transporting and depositing',
      'Describe and explain the formation of the landforms associated with these processes',
      'Demonstrate an understanding of the opportunities and hazards presented by rivers, and their management'
    ],
    cases: ['bangladesh-floods', 'three-gorges'],
    sections: [
      {
        h: 'The drainage basin',
        blocks: [
          { defs: [
            ['Drainage basin', 'The area of land drained by a river and its tributaries.'],
            ['Watershed', 'The boundary of a drainage basin, usually a ridge of high land.'],
            ['Source', 'Where a river begins.'],
            ['Mouth', 'Where a river enters the sea or a lake.'],
            ['Tributary', 'A smaller river or stream joining a larger one.'],
            ['Confluence', 'The point where two rivers meet.']
          ] },
          { h3: 'Movement of water through the basin' },
          { ul: [
            '**Precipitation** falls onto the basin',
            '**Interception** by leaves and branches delays some of it',
            '**Infiltration**: water soaks into the soil',
            '**Percolation**: water moves deeper into the underlying rock',
            '**Throughflow**: water moves sideways through the soil to the channel',
            '**Surface runoff (overland flow)**: water flows across the surface, fastest of all',
            '**Groundwater flow**: the slowest route to the river',
            '**Evaporation** and **transpiration** return water to the atmosphere'
          ] },
          { tip: 'Flood risk rises whenever water reaches the channel faster. Impermeable rock, saturated or frozen soil, steep slopes, deforestation and tarmac all shift water from slow throughflow into fast surface runoff.' }
        ]
      },
      {
        h: 'Erosion, transport and deposition',
        blocks: [
          { h3: 'Four processes of erosion' },
          { defs: [
            ['Hydraulic action', 'The sheer force of moving water forces air into cracks in the bank and bed, weakening the rock.'],
            ['Abrasion (corrasion)', 'The load carried by the river is scraped against the bed and banks, wearing them away.'],
            ['Attrition', 'Rocks in the load collide with each other and break into smaller, rounder, smoother pieces.'],
            ['Solution (corrosion)', 'Slightly acidic water dissolves soluble rock such as limestone and chalk.']
          ] },
          { h3: 'Four processes of transport' },
          { defs: [
            ['Traction', 'The largest boulders are rolled along the bed.'],
            ['Saltation', 'Pebbles and sand are bounced along the bed.'],
            ['Suspension', 'Fine silt and clay are carried within the flow, making the water look cloudy.'],
            ['Solution', 'Dissolved minerals are carried invisibly.']
          ] },
          { p: '**Deposition** happens whenever the river loses energy and can no longer carry its load: as discharge drops after a flood, where the gradient flattens, on the inside of a meander, or where the river meets the sea.' }
        ]
      },
      {
        h: 'The long profile',
        blocks: [
          { table: {
            head: ['', 'Upper course', 'Middle course', 'Lower course'],
            rows: [
              ['Gradient', 'Steep', 'Gentler', 'Very gentle, almost flat'],
              ['Valley shape', 'Narrow, steep-sided V-shape', 'Wider, with a small floodplain', 'Very wide and flat'],
              ['Channel', 'Narrow, shallow, rocky, turbulent', 'Wider and deeper', 'Widest and deepest'],
              ['Dominant erosion', 'Vertical (downwards)', 'Lateral (sideways)', 'Little erosion; deposition dominates'],
              ['Load', 'Large, angular boulders', 'Smaller, rounder pebbles', 'Fine silt and clay'],
              ['Landforms', 'Interlocking spurs, waterfalls, rapids, gorges', 'Meanders, ox-bow lakes', 'Floodplain, levées, delta or estuary']
            ]
          } },
          { p: 'Velocity is often **higher in the lower course**, which surprises people. Although the gradient is gentler, the channel is much smoother and deeper, so there is far less friction.' }
        ]
      },
      {
        h: 'Landforms you must be able to sequence',
        blocks: [
          { h3: 'Waterfall and gorge' },
          { ol: [
            'A band of hard, resistant rock lies over softer rock',
            'The softer rock downstream is eroded faster by hydraulic action and abrasion',
            'A step forms, and falling water erodes a deep **plunge pool** at its base',
            'Splashback undercuts the soft rock, leaving an **overhang** of hard rock',
            'Unsupported, the overhang eventually collapses into the plunge pool',
            'The rock pieces swirl and deepen the pool, and the waterfall **retreats upstream**',
            'Repeated retreat leaves a steep-sided **gorge** downstream'
          ] },
          { h3: 'Meander and ox-bow lake' },
          { ol: [
            'The current swings towards the **outside** of a bend, where water is deepest and fastest',
            'Erosion by hydraulic action and abrasion undercuts the bank, forming a steep **river cliff**',
            'On the **inside** the water is shallow and slow, so deposition builds a gently sloping **slip-off slope**',
            'The meander migrates sideways and the neck between two bends narrows',
            'During a flood the river cuts straight through the neck, taking the shorter, steeper route',
            'Deposition seals off the old bend, leaving a horseshoe-shaped **ox-bow lake** which slowly dries out'
          ] },
          { h3: 'Floodplain and levées' },
          { ol: [
            'When the river floods, water spreads across the flat valley floor',
            'Friction with the land slows it, so it deposits its load as **alluvium**',
            'The coarsest material is dropped first, right beside the channel, building raised banks called **levées**',
            'Finer silt is carried further and settles across the floodplain, making it very fertile',
            'Repeated floods raise and widen the floodplain, while lateral erosion by meanders widens the valley'
          ] },
          { h3: 'Delta' },
          { ol: [
            'A river carrying a heavy load meets a sea or lake and loses velocity',
            'Salt water makes fine clay particles clump together and sink, a process called **flocculation**',
            'Deposition builds up faster than currents and tides can remove it',
            'The channel splits into smaller **distributaries** as it is blocked by its own sediment',
            'Layers build outwards to form an **arcuate** delta (the Nile), a **bird\'s foot** delta (the Mississippi) or a **cuspate** delta'
          ] }
        ]
      },
      {
        h: 'Opportunities and hazards',
        blocks: [
          { h3: 'Why people settle beside rivers' },
          { ul: [
            'Water supply for drinking, industry and irrigation',
            'Fertile alluvial soils on the floodplain for farming',
            'Flat land that is easy and cheap to build on',
            'Transport route for trade, and a site for ports at bridging points',
            'Hydroelectric power where the valley is steep and narrow',
            'Fishing, recreation and tourism'
          ] },
          { h3: 'Causes of flooding' },
          { table: {
            head: ['Physical causes', 'Human causes'],
            rows: [
              ['Prolonged or very heavy rainfall, including monsoon and cyclones', 'Deforestation reduces interception and increases runoff'],
              ['Rapid snowmelt in spring', 'Urbanisation covers ground with tarmac and concrete'],
              ['Impermeable rock such as granite or clay', 'Drains and gutters deliver water to the river quickly'],
              ['Soil already saturated or frozen hard', 'Building on the floodplain removes natural storage'],
              ['Steep slopes speeding up runoff', 'Overgrazing compacts soil and reduces infiltration'],
              ['A circular basin, so tributaries arrive together', 'Dam failure or poorly maintained embankments']
            ]
          } },
          { h3: 'Management' },
          { table: {
            head: ['Hard engineering', 'Soft engineering'],
            rows: [
              ['Dams and reservoirs store floodwater and generate power, but are expensive and displace people', 'Afforestation increases interception and is cheap, but takes years to work'],
              ['Levées and flood walls raise the bank, but shift the problem downstream and fail catastrophically', 'Floodplain zoning keeps housing off the highest risk land, but cannot move existing homes'],
              ['Channel straightening and dredging speed water away, but increase flood risk downstream', 'Washlands and wetland restoration store water naturally and add habitat, but need land'],
              ['Flood relief channels divert water past a town, but are costly', 'Flood warning systems save lives cheaply, but do not protect property']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 2.3 */
  {
    id: '2.3',
    title: 'Coasts',
    objectives: [
      'Demonstrate an understanding of the work of the sea and wind in eroding, transporting and depositing',
      'Describe and explain the formation of the landforms associated with these processes',
      'Describe coral reefs and mangrove swamps and the conditions required for their development',
      'Demonstrate an understanding of the opportunities and hazards presented by coastal areas, and their management'
    ],
    cases: ['great-barrier-reef', 'holderness-coast'],
    sections: [
      {
        h: 'Waves',
        blocks: [
          { p: 'Waves are formed by wind dragging across the sea surface. Their size depends on wind speed, how long the wind blows for, and the **fetch**, the distance of open water the wind has crossed.' },
          { table: {
            head: ['', 'Constructive waves', 'Destructive waves'],
            rows: [
              ['Height', 'Low', 'High'],
              ['Wavelength', 'Long', 'Short'],
              ['Frequency', '6 to 8 per minute', '10 to 14 per minute'],
              ['Swash', 'Strong: carries material up the beach', 'Weak'],
              ['Backwash', 'Weak', 'Strong: drags material back out to sea'],
              ['Net effect', 'Builds up the beach', 'Erodes the beach']
            ]
          } }
        ]
      },
      {
        h: 'Processes',
        blocks: [
          { p: 'The four erosion processes are the same as in a river: **hydraulic action** (waves compress air into cracks), **abrasion** (rock is thrown against the cliff), **attrition** (rocks knock together and become rounder and smaller) and **solution** (chemical dissolving of limestone and chalk).' },
          { h3: 'Longshore drift' },
          { ol: [
            'The prevailing wind drives waves onto the beach at an angle',
            'The **swash** carries sand and shingle up the beach at that same angle',
            'Gravity pulls the **backwash** straight back down the steepest line, at right angles to the shore',
            'Each wave therefore moves material a little further along the beach in a zig-zag',
            'Over time large quantities of sediment travel along the coast'
          ] },
          { p: 'This is why groynes are built: they trap sediment moving along the shore and keep a beach in place, though they starve the beach further along the coast.' }
        ]
      },
      {
        h: 'Erosional landforms',
        blocks: [
          { h3: 'Headlands and bays' },
          { p: 'Where bands of hard and soft rock meet the coast at right angles, a **discordant** coastline forms. The softer rock, such as clay, erodes faster to form a **bay** with a beach; the resistant rock, such as chalk or limestone, is left protruding as a **headland**. Wave energy is then concentrated on the headland by refraction, so it is attacked most.' },
          { h3: 'Cave, arch, stack, stump' },
          { ol: [
            'Waves attack a line of weakness such as a joint or fault in a headland',
            'Hydraulic action and abrasion widen it into a **cave**',
            'The cave is cut right through the headland to form an **arch**',
            'Weathering attacks the roof from above while waves undercut the sides',
            'The unsupported roof collapses, leaving an isolated pillar called a **stack**',
            'The stack is undercut at its base and collapses, leaving a **stump** visible at low tide'
          ] },
          { h3: 'Wave-cut platform' },
          { ol: [
            'Waves erode a **wave-cut notch** at the base of the cliff, between high and low tide',
            'The notch deepens until the overhanging cliff above is unsupported',
            'The cliff collapses and retreats inland',
            'Repeated over time, this leaves a gently sloping rocky **wave-cut platform** exposed at low tide'
          ] }
        ]
      },
      {
        h: 'Depositional landforms',
        blocks: [
          { defs: [
            ['Beach', 'An accumulation of sand or shingle between the high and low water marks, built by constructive waves.'],
            ['Spit', 'A long ridge of sand or shingle joined to the land at one end, formed where the coastline changes direction and longshore drift continues out across a bay or estuary. The end is often curved into a recurved hook by a second wind direction, and sheltered water behind it collects mud and becomes a salt marsh.'],
            ['Bar', 'A spit that has grown all the way across a bay, trapping a lagoon behind it.'],
            ['Tombolo', 'A spit that joins the mainland to an island.'],
            ['Sand dunes', 'Ridges of wind-blown sand above the high tide line, stabilised by marram grass whose long roots bind the sand.']
          ] }
        ]
      },
      {
        h: 'Coral reefs and mangroves',
        blocks: [
          { h3: 'Conditions coral needs' },
          { ul: [
            'Warm water, roughly 23 to 29 °C, so reefs lie between about 30° north and 30° south',
            'Shallow water, generally less than 25 m deep, so sunlight reaches the algae living in the coral',
            'Clear water free of sediment, which would block light and smother the polyps',
            'Salty, well-oxygenated water with plenty of movement',
            'Away from river mouths, because fresh water and silt kill coral'
          ] },
          { p: 'Reef types: a **fringing** reef grows against the shore; a **barrier** reef is separated from land by a lagoon; an **atoll** is a ring of coral around a lagoon where a volcanic island has subsided.' },
          { h3: 'Threats to coral' },
          { ul: [
            'Rising sea temperatures cause **bleaching**: stressed coral expels its algae, loses colour and dies if the stress continues',
            'Ocean acidification from dissolved carbon dioxide makes it harder to build skeletons',
            'Sediment washed off deforested or built-up land smothers the polyps',
            'Sewage and fertiliser runoff cause algal growth that shades the reef',
            'Damage from anchors, divers, coral collecting and dynamite or cyanide fishing',
            'Crown-of-thorns starfish outbreaks eat living coral'
          ] },
          { h3: 'Mangroves' },
          { p: 'Mangroves are salt-tolerant trees growing on sheltered tropical coasts and in estuaries, with stilt roots that anchor them in soft mud and breathing roots that reach above the waterline. They protect the coast by absorbing wave energy and reducing storm surge damage, trap sediment, and act as a nursery for fish and prawns. They are cleared for prawn farms, fuelwood, timber and tourist development.' }
        ]
      },
      {
        h: 'Coastal management',
        blocks: [
          { table: {
            head: ['Method', 'How it works', 'Evaluation'],
            rows: [
              ['Sea wall', 'Concrete wall, often curved, reflects wave energy', 'Effective and reassuring, but very expensive and ugly, and reflected waves scour the beach'],
              ['Groynes', 'Timber or rock fences trap sediment moving by longshore drift', 'Cheap and builds a wide protective beach, but starves the coast downdrift'],
              ['Rock armour (rip rap)', 'Large boulders piled at the cliff foot absorb wave energy', 'Relatively cheap and easy to build, but looks unnatural and can shift in storms'],
              ['Gabions', 'Wire cages of rocks placed at the cliff base', 'Very cheap, but the cages rust and last only a few years'],
              ['Beach nourishment', 'Sand is dredged and added to the beach', 'Looks natural and keeps tourism, but must be repeated regularly'],
              ['Managed retreat', 'Low-value land is allowed to flood and become salt marsh', 'Cheap and creates habitat that absorbs wave energy, but land and property are lost'],
              ['Dune regeneration', 'Marram grass planted and boardwalks laid to stop trampling', 'Cheap and natural, but takes time and needs public cooperation']
            ]
          } }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 2.4 */
  {
    id: '2.4',
    title: 'Weather',
    objectives: [
      'Describe how weather data are collected',
      'Make calculations using information from weather instruments',
      'Use and interpret graphs and other diagrams showing weather and climate data'
    ],
    cases: [],
    sections: [
      {
        h: 'Weather and climate',
        blocks: [
          { defs: [
            ['Weather', 'The state of the atmosphere at a particular place and time: temperature, rainfall, wind, cloud, humidity and pressure.'],
            ['Climate', 'The average weather conditions of a place, worked out over a long period, usually at least 30 years.']
          ] }
        ]
      },
      {
        h: 'Instruments',
        blocks: [
          { table: {
            head: ['Instrument', 'Measures', 'Units', 'Notes'],
            rows: [
              ['Maximum-minimum thermometer', 'Highest and lowest temperature', '°C', 'Kept in a Stevenson screen; reset with a magnet'],
              ['Rain gauge', 'Precipitation', 'mm', 'Sunk into the ground with the rim 30 cm above, away from trees and buildings'],
              ['Barometer', 'Air pressure', 'millibars (mb)', 'Falling pressure suggests wet, windy weather approaching'],
              ['Anemometer', 'Wind speed', 'km/h or knots', 'Cups spin faster in stronger wind; sited in the open, 10 m up'],
              ['Wind vane', 'Wind direction', 'Compass point', 'Wind is always named after where it comes **from**'],
              ['Wet and dry bulb thermometer (hygrometer)', 'Relative humidity', '%', 'The bigger the difference between the two readings, the drier the air'],
              ['Campbell-Stokes recorder', 'Sunshine hours', 'hours', 'A glass sphere burns a trace onto a card']
            ]
          } },
          { h3: 'The Stevenson screen' },
          { ul: [
            '**White** so it reflects sunlight rather than absorbing heat',
            '**Louvred** sides so air circulates freely but direct sun and rain are kept out',
            'Stands **1.25 m** above the ground, above heat radiating from the surface',
            'Placed over **grass**, not concrete, which would radiate extra heat',
            'The door faces **away from the midday sun** (north in the northern hemisphere) so sunlight never falls on the thermometers'
          ] },
          { h3: 'Calculations to practise' },
          { ul: [
            'Mean (average) temperature = (maximum + minimum) divided by 2',
            'Diurnal (daily) temperature range = maximum minus minimum',
            'Annual temperature range = mean temperature of the hottest month minus that of the coldest month',
            'Total annual rainfall = the twelve monthly totals added together'
          ] }
        ]
      },
      {
        h: 'Cloud and rainfall',
        blocks: [
          { p: 'Cloud cover is measured in **oktas**, or eighths of the sky covered, from 0 for clear to 8 for completely overcast.' },
          { table: {
            head: ['Cloud', 'Height', 'Appearance', 'Weather'],
            rows: [
              ['Cirrus', 'High', 'Thin, wispy, feathery ice crystals', 'Fair now, but a change may be coming'],
              ['Cumulus', 'Low to middle', 'Fluffy, cotton wool heaps with flat bases', 'Fair weather'],
              ['Cumulonimbus', 'Low base, towering to great height', 'Huge, dark, anvil-shaped', 'Heavy showers, thunder and lightning'],
              ['Stratus', 'Low', 'Flat, featureless grey sheet', 'Dull, drizzle, poor visibility']
            ]
          } },
          { h3: 'Three types of rainfall' },
          { ul: [
            '**Relief (orographic)**: moist air is forced to rise over hills or mountains, cools, condenses and rains on the windward side; the sheltered leeward side lies in a dry **rain shadow**',
            '**Convectional**: strong surface heating makes air rise rapidly, cool and condense into cumulonimbus, giving heavy afternoon thunderstorms; typical of equatorial regions and of summer in temperate areas',
            '**Frontal**: warm, less dense air is forced to rise over colder, denser air along a front, cooling and condensing to give steady rain'
          ] }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ 2.5 */
  {
    id: '2.5',
    title: 'Climate and natural vegetation',
    objectives: [
      'Describe and explain the main characteristics of the climate and natural vegetation of two ecosystems',
      'Describe the causes and effects of deforestation of tropical rainforest'
    ],
    cases: ['amazon-deforestation'],
    sections: [
      {
        h: 'Equatorial climate',
        blocks: [
          { ul: [
            'Hot all year, around **26 to 28 °C** every month',
            'A very small annual temperature range, often under **3 °C**, because the sun is overhead all year',
            'A larger daily range than annual range',
            'High rainfall, generally over **2000 mm** a year, with rain in every month and no dry season',
            'Mostly **convectional** rain: mornings are clear and hot, cumulonimbus builds through the day, and heavy thunderstorms fall in the afternoon',
            'Very high humidity, often above 80%, with little wind'
          ] },
          { p: 'Found within roughly 5° of the Equator: the Amazon basin, the Congo basin, Indonesia and Malaysia.' }
        ]
      },
      {
        h: 'Tropical rainforest',
        blocks: [
          { h3: 'Structure' },
          { ul: [
            '**Emergent layer**: isolated giants up to 50 m rising above the rest',
            '**Canopy**: a continuous roof of leaves at 30 to 40 m that absorbs most of the light and holds most of the wildlife',
            '**Under-canopy**: younger trees waiting for a gap to open',
            '**Shrub layer**: shrubs and saplings in deep shade',
            '**Ground layer**: dark and surprisingly open; leaf litter decays within weeks'
          ] },
          { h3: 'Adaptations' },
          { ul: [
            '**Buttress roots** support very tall trees in thin soil',
            '**Drip tips** on leaves shed heavy rain quickly so fungi cannot grow',
            'A **waxy leaf surface** helps water run off',
            '**Lianas** climb existing trunks to reach the light without building their own',
            '**Epiphytes** grow on branches high up, taking moisture from the air',
            'Trees are **evergreen**, shedding leaves throughout the year, because there is no dry season',
            'Shallow, wide-spreading roots capture nutrients from the thin surface layer'
          ] },
          { p: 'Nutrients are held in the **vegetation, not the soil**. Rapid decomposition in the heat and humidity returns them straight to living plants. This is why clearing the forest is so damaging: once the trees are gone, heavy rain leaches the thin soil within a few years.' }
        ]
      },
      {
        h: 'Deforestation',
        blocks: [
          { h3: 'Causes' },
          { ul: [
            'Cattle ranching, the largest single cause in the Amazon',
            'Commercial farming of soya beans and oil palm',
            'Subsistence farmers clearing plots by slash and burn',
            'Logging for hardwoods such as mahogany and teak',
            'Mining for iron ore, bauxite, gold and copper',
            'Road building, which opens the interior to everyone else',
            'Reservoirs flooded behind hydroelectric dams',
            'Population growth and government resettlement schemes'
          ] },
          { h3: 'Effects' },
          { table: {
            head: ['Environmental', 'Social and economic'],
            rows: [
              ['Soil erosion once roots no longer bind the soil', 'Indigenous peoples lose land, homes and traditional way of life'],
              ['Nutrients leached out, so land becomes infertile in a few years', 'Conflict between settlers, ranchers and indigenous groups'],
              ['Loss of biodiversity, including undiscovered medicinal plants', 'Jobs and export earnings from timber, minerals and beef'],
              ['Less transpiration, so local rainfall falls and the climate dries', 'Roads and power improve access for remote communities'],
              ['Carbon dioxide released by burning adds to global warming', 'Profits often go to large companies rather than local people'],
              ['Rivers silt up, raising flood risk downstream', 'Loss of income from forest products and ecotourism']
            ]
          } },
          { h3: 'Sustainable management' },
          { ul: [
            'Selective logging: only mature trees are felled, leaving the canopy largely intact',
            'Replanting to replace what is cut',
            'Agroforestry: growing crops among trees',
            'National parks and protected reserves, with monitoring by satellite',
            'Ecotourism, which gives the forest a value while it is still standing',
            'Debt-for-nature swaps, where debt is written off in exchange for conservation'
          ] }
        ]
      },
      {
        h: 'Hot desert climate and vegetation',
        blocks: [
          { ul: [
            'Very hot days, often over **40 °C** in summer, with clear skies and intense insolation',
            'Cold nights, sometimes near freezing, because there is no cloud to trap outgoing heat',
            'A very large **diurnal temperature range**, which can exceed 20 °C',
            'Very low rainfall, usually under **250 mm** a year, and extremely unreliable',
            'Rain arrives as rare, intense downpours that cause flash floods',
            'Very low humidity and high evaporation'
          ] },
          { p: 'Found around 20° to 30° north and south, where dry air descends: the Sahara, the Arabian desert, the Atacama, the Kalahari and central Australia.' },
          { h3: 'Plant adaptations (xerophytes)' },
          { ul: [
            'Cacti store water in thick, fleshy **succulent** stems',
            'Leaves reduced to **spines**, cutting water loss and deterring animals',
            'A thick **waxy cuticle** reduces transpiration',
            'Widespread **shallow roots** catch surface water quickly after a storm',
            'Very long **tap roots**, as in the acacia, reach groundwater far below',
            'Stomata open only at night, when the air is cooler and evaporation is lower',
            '**Ephemerals** stay dormant as seeds for years, then germinate, flower and set seed within weeks of rain'
          ] }
        ]
      }
    ]
  }

  ]
});
