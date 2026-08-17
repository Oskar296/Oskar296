SPEC.sections.push({
  id: 4,
  title: 'Energy resources and energy transfers',
  colour: '#7effc0',
  blurb: 'Energy stores and transfers, conduction, convection and radiation, work, power, efficiency and Sankey diagrams, and how electricity is generated from renewable and non-renewable resources.',
  topics: [

  { id:'4a', title:'Units', points:[
    { n:'4.1', t:'Use the following units: kilogram (kg), joule (J), metre (m), metre/second (m/s), metre/second² (m/s²), newton (N), second (s), watt (W).',
      note:'Energy and work in J, power in W (which is J/s). 1 kW = 1000 W, 1 MW = 1 000 000 W.' }
  ]},

  { id:'4b', title:'Energy transfer', points:[
    { n:'4.2', t:'Describe energy transfers involving energy stores: chemical, kinetic, gravitational, elastic, thermal, magnetic, electrostatic and nuclear.',
      note:'Describe a change as "energy is transferred from the X store to the Y store". Falling ball: gravitational to kinetic. Bow being drawn: chemical (in the archer) to elastic. Never write "heat energy" as a store — it is thermal.' },
    { n:'4.3', t:'Describe how energy transfers can be shown by mechanical working, electrical working, heating and radiation (by light or sound).',
      note:'These four are the pathways by which energy moves between stores.' },
    { n:'4.4', t:'Know and use the principle of conservation of energy.',
      note:'Energy cannot be created or destroyed, only transferred from one store to another. Energy that is not usefully transferred is dissipated to the surroundings, usually as thermal energy, and becomes less useful.' },
    { n:'4.5', t:'Describe how thermal energy transfer may take place by conduction, convection and radiation.',
      note:'Conduction: vibrating particles pass energy on by collisions, and in metals free electrons carry it much faster — mainly in solids. Convection: heated fluid expands, becomes less dense, rises, cools and sinks, setting up a convection current — only in liquids and gases. Radiation: infrared waves, and the only one that works through a vacuum.' },
    { n:'4.6', t:'Explain the role of convection in everyday phenomena.',
      note:'Sea breezes, hot-air balloons, radiators heating a room, and the freezer compartment at the top of a fridge so cold air sinks through it.' },
    { n:'4.7', t:'Explain how emission and absorption of radiation are related to surface and temperature.',
      note:'Matt black surfaces are the best emitters and best absorbers of infrared. Shiny silver surfaces are the worst emitters and best reflectors. Hotter objects emit more radiation, and emit it at shorter wavelengths.' },
    { n:'4.8', t:'Practical: investigate thermal energy transfer by conduction, convection and radiation.',
      cp:true,
      note:'Conduction: rods of different metals with wax-attached pins; the pin drops first on the best conductor. Convection: potassium manganate(VII) crystal in water, or smoke in a convection box. Radiation: Leslie cube filled with hot water with an infrared detector at a fixed distance from each face.' },
    { n:'4.9', t:'Explain ways of reducing unwanted energy transfer, such as insulation.',
      note:'Loft insulation and cavity wall insulation trap air, which is a poor conductor and cannot easily convect. Double glazing traps air or a vacuum between the panes. Draught excluders stop convection currents. Shiny foil behind a radiator reflects infrared back into the room.' },
    { n:'4.10', t:'Know and use the relationship between efficiency, useful energy output and total energy output.',
      eq:'efficiency = (useful energy output ÷ total energy input) × 100%',
      note:'The same formula works with power instead of energy. Efficiency can never be more than 100%; if yours is, you have swapped the numbers over.' },
    { n:'4.11', t:'Describe and use Sankey diagrams to represent energy transfers.',
      note:'The width of each arrow is proportional to the amount of energy. Input on the left, useful output going straight on, wasted energy branching downwards. Total in must equal total out.' }
  ]},

  { id:'4c', title:'Work and power', points:[
    { n:'4.12', t:'Know and use the relationship between work done, force and distance moved in the direction of the force.',
      eq:'work done = force × distance moved   (W = F × d)',
      note:'Work done in joules equals the energy transferred. The distance must be in the direction of the force — carrying a box horizontally does no work against gravity.' },
    { n:'4.13', t:'Know that work done is equal to energy transferred.',
      note:'1 joule of work is done when a force of 1 N moves an object 1 m in the direction of the force.' },
    { n:'4.14', t:'Know and use the relationship between gravitational potential energy, mass, gravitational field strength and height.',
      eq:'GPE = mass × gravitational field strength × height   (GPE = m × g × h)',
      note:'h is the vertical height gained, not the distance travelled along a slope.' },
    { n:'4.15', t:'Know and use the relationship between kinetic energy, mass and speed.',
      eq:'KE = ½ × mass × speed²   (KE = ½ m v²)',
      note:'Square the speed before multiplying. Doubling the speed gives four times the kinetic energy — which is exactly why braking distance grows so fast with speed.' },
    { n:'4.16', t:'Understand how conservation of energy produces a link between gravitational potential energy, kinetic energy and work.',
      note:'For a falling object with no air resistance, GPE lost = KE gained, so mgh = ½mv², which rearranges to v = √(2gh). The mass cancels, so all objects fall at the same rate in the absence of air resistance.' },
    { n:'4.17', t:'Describe power as the rate of transfer of energy or the rate of doing work.',
      note:'A more powerful device transfers the same energy in less time.' },
    { n:'4.18', t:'Know and use the relationship between power, work done (energy transferred) and time taken.',
      eq:'power = work done ÷ time taken   (P = W / t)',
      note:'1 watt = 1 joule per second. Time in seconds.' }
  ]},

  { id:'4d', title:'Energy resources and electricity generation', points:[
    { n:'4.19', t:'Describe the energy transfers involved in generating electricity using wind, water, geothermal resources, solar heating systems, solar cells, fossil fuels and nuclear power.',
      note:'Most stations: a fuel or flow turns a turbine, the turbine turns a generator, and the generator produces electricity. Solar cells are the exception — they transfer light directly to electricity with no turbine.' },
    { n:'4.20', t:'Describe the advantages and disadvantages of methods of large-scale electricity production from various renewable and non-renewable resources.',
      note:'Non-renewable (coal, oil, gas, nuclear): reliable, high output, available on demand, but fossil fuels release CO₂ and cause climate change, and nuclear produces radioactive waste with high decommissioning costs. Renewable (wind, solar, hydroelectric, tidal, wave, geothermal, biomass): no fuel cost and little or no CO₂ in use, but often unreliable, weather- or location-dependent, with high set-up cost and visual impact.' },
    { n:'4.21', t:'Know that energy from most of our resources originally came from the Sun.',
      note:'Fossil fuels store energy from ancient plants that photosynthesised. Wind and waves are driven by uneven solar heating of the atmosphere. Hydroelectricity relies on solar-driven evaporation. The exceptions are nuclear, geothermal and tidal (which comes from the Moon’s gravity).' },
    { n:'4.22', t:'Describe the National Grid and explain why electricity is transmitted at high voltage.',
      note:'Step-up transformers raise the voltage after the power station, which lowers the current for the same power. Lower current means much less energy wasted heating the cables, since power lost = I²R. Step-down transformers reduce the voltage again for safe use in homes.' }
  ]}

]});
