/* Climate change — new content in the 2027-2029 syllabus, with no direct
   equivalent in the outgoing three-theme structure. */
GEO.extra = GEO.extra || {};

GEO.extra['climate-change'] = [

  {
    h: 'The greenhouse effect',
    blocks: [
      { p: 'The greenhouse effect is **natural and necessary**. Without it the Earth\'s average surface temperature would be roughly -18 °C instead of about 15 °C, and the planet would be uninhabitable. Examiners are alert to answers that treat the greenhouse effect itself as the problem.' },
      { ol: [
        'Short-wave solar radiation passes through the atmosphere and warms the Earth\'s surface',
        'The warmed surface re-radiates energy back out as long-wave (infra-red) radiation',
        'Greenhouse gases in the atmosphere absorb some of this outgoing long-wave radiation',
        'They re-emit it in all directions, including back towards the surface, which keeps the lower atmosphere warm'
      ] },
      { p: 'The **enhanced greenhouse effect** is the problem: human activity has raised the concentration of greenhouse gases, so more outgoing heat is trapped and average temperatures rise.' },
      { table: {
        head: ['Greenhouse gas', 'Main human sources', 'Note'],
        rows: [
          ['Carbon dioxide (CO₂)', 'Burning coal, oil and gas; deforestation; cement manufacture', 'The largest contributor overall, because the quantities are so vast'],
          ['Methane (CH₄)', 'Cattle and rice paddies; landfill sites; leaks from gas and oil extraction', 'Far more powerful per molecule than CO₂, but shorter-lived in the atmosphere'],
          ['Nitrous oxide (N₂O)', 'Nitrogen fertilisers; vehicle exhausts', 'Long-lived and very powerful per molecule'],
          ['Halocarbons (CFCs and successors)', 'Old refrigerants, aerosols and foams', 'Being phased out under international agreement']
        ]
      } },
      { tip: 'Do not confuse the enhanced greenhouse effect with **ozone depletion**. They are different problems with different causes: ozone depletion lets more ultraviolet radiation in, and is caused mainly by CFCs. Mixing them up is one of the most commonly penalised errors on this topic.' }
    ]
  },

  {
    h: 'Evidence that the climate is changing',
    blocks: [
      { ul: [
        '**Instrumental temperature records** since the mid-1800s show global average surface temperature has risen by roughly 1.1 to 1.2 °C above pre-industrial levels',
        '**Ice cores** from Antarctica and Greenland trap ancient air bubbles, giving a direct record of past CO₂ concentration and temperature going back hundreds of thousands of years',
        '**Retreating glaciers and shrinking ice sheets**, measured by repeat photography and satellite',
        '**Declining Arctic sea ice extent**, especially at the September minimum',
        '**Rising sea level**, from both thermal expansion of warming water and meltwater added from land ice',
        '**Tree rings**: wider rings indicate warmer, wetter growing seasons, extending the record before thermometers',
        '**Pollen analysis** from peat and lake sediments shows which plants grew where, and therefore the climate at the time',
        '**Phenological records**: earlier flowering, earlier bird migration and later leaf fall'
      ] },
      { p: 'Climate has always changed naturally, so the argument rests on the **rate and the timing**: the recent rise is far faster than past natural swings and coincides closely with the rise in greenhouse gas concentrations since industrialisation.' }
    ]
  },

  {
    h: 'Causes: natural and human',
    blocks: [
      { h3: 'Natural causes' },
      { ul: [
        '**Milankovitch cycles**: long-term changes in the shape of Earth\'s orbit, the tilt of its axis and its wobble, which alter how much solar radiation reaches different latitudes and drive glacial and interglacial periods',
        '**Solar output** varies, including the roughly 11-year sunspot cycle',
        '**Volcanic eruptions** inject sulphur dioxide into the stratosphere, forming a haze that reflects sunlight and cools the planet for a year or two, as after Pinatubo in 1991',
        '**Ocean circulation** changes, such as El Niño and La Niña, which redistribute heat between ocean and atmosphere'
      ] },
      { h3: 'Human causes' },
      { ul: [
        'Burning **fossil fuels** for electricity, industry, heating and transport',
        '**Deforestation**, which both releases stored carbon when burned and removes the trees that would absorb CO₂',
        '**Agriculture**: methane from cattle and flooded rice paddies, and nitrous oxide from fertiliser',
        '**Industry**, particularly cement, steel and chemical manufacture',
        '**Waste**: decomposing landfill releases methane'
      ] },
      { tip: 'A strong answer states that natural factors alone cannot explain the recent warming, and that natural and human causes operate together, rather than treating it as a choice between the two.' }
    ]
  },

  {
    h: 'Impacts',
    blocks: [
      { table: {
        head: ['Physical', 'Ecological', 'Human'],
        rows: [
          ['Sea level rise from thermal expansion and melting land ice', 'Species ranges shift towards the poles and to higher altitudes', 'Low-lying land and small island states flooded or lost entirely'],
          ['More frequent and intense heatwaves', 'Coral bleaching as sea temperatures rise', 'Crop yields fall in already-hot regions, though some cool regions gain a longer growing season'],
          ['Changed rainfall patterns: some regions wetter, others drier', 'Ocean acidification harms shell-forming organisms', 'Water shortages where glaciers that feed rivers shrink'],
          ['More intense tropical storms as sea surface temperatures rise', 'Habitat loss, especially Arctic sea ice for polar bears and seals', 'Spread of tropical diseases such as malaria into new areas'],
          ['Increased drought and wildfire risk', 'Timing mismatches: plants flower before their pollinators emerge', 'Climate migration, and conflict over water and farmland'],
          ['Permafrost thaw, which releases further methane', 'Extinction risk for species that cannot move or adapt fast enough', 'Damage to coastal cities, ports and infrastructure']
        ]
      } },
      { p: 'Impacts are **unevenly distributed**. Lower income countries and small island developing states generally contribute least to emissions but are most exposed, and have least money to adapt. This unfairness is central to the international politics of the issue.' }
    ]
  },

  {
    h: 'Responses: mitigation',
    blocks: [
      { p: '**Mitigation** means reducing the causes: cutting greenhouse gas emissions or removing gases from the atmosphere.' },
      { table: {
        head: ['Strategy', 'Evaluation'],
        rows: [
          ['Switch to renewable energy: solar, wind, hydro, geothermal', 'Cuts emissions at the source, but needs large capital investment and output from wind and solar varies'],
          ['Nuclear power', 'Very large, reliable output with no CO₂ during generation, but high build cost, long-lived waste and public opposition'],
          ['Energy efficiency: insulation, LED lighting, efficient appliances', 'Cheap, quick and cuts bills as well as emissions, but savings are limited on their own'],
          ['Afforestation and reforestation', 'Absorbs CO₂ and adds habitat, but trees take decades to mature and can burn or be felled'],
          ['Electric vehicles and better public transport', 'Cuts urban air pollution too, but only helps if the electricity itself is low-carbon'],
          ['Carbon capture and storage', 'Allows continued fossil fuel use, but is expensive and not yet proven at large scale'],
          ['Carbon taxes and emissions trading', 'Makes polluting expensive so behaviour changes, but can raise costs for the poorest'],
          ['International agreements such as the Paris Agreement', 'Only a global response can work, but targets are voluntary and enforcement is weak']
        ]
      } }
    ]
  },

  {
    h: 'Responses: adaptation',
    blocks: [
      { p: '**Adaptation** means living with the changes that are already unavoidable. Both responses are needed: mitigation alone is too slow to prevent all impacts, and adaptation alone does nothing about the cause.' },
      { ul: [
        'Sea walls, tidal barriers and raised buildings in coastal cities',
        'Managed retreat from the most vulnerable stretches of coast',
        'Drought-resistant and heat-tolerant crop varieties',
        'More efficient irrigation, such as drip systems, and rainwater harvesting',
        'Improved flood warning systems and emergency planning',
        'Restoring mangroves and salt marsh as natural coastal buffers',
        'Redesigning cities for heat: shade, green roofs, more street trees',
        'Water transfer schemes and desalination where supplies become unreliable'
      ] },
      { tip: 'For "which is more effective" questions, the strongest line is that mitigation tackles the cause but needs global cooperation and acts slowly, while adaptation protects people now but is local, expensive and does not stop the problem worsening. Then judge.' }
    ]
  },

  {
    h: 'Air pollution and the atmosphere',
    blocks: [
      { table: {
        head: ['Problem', 'Cause', 'Effects'],
        rows: [
          ['Acid rain', 'Sulphur dioxide and nitrogen oxides from power stations and vehicles dissolve in cloud droplets', 'Kills trees and fish, acidifies lakes and soils, erodes limestone buildings; often falls hundreds of kilometres downwind, in another country'],
          ['Photochemical smog', 'Vehicle exhaust reacting in strong sunlight, often trapped by a temperature inversion in a basin city', 'Breathing difficulties, asthma, eye irritation, reduced visibility'],
          ['Ozone depletion', 'CFCs released from old aerosols, refrigerants and foam', 'More ultraviolet radiation reaching the surface, increasing skin cancer and cataracts']
        ]
      } },
      { p: 'Ozone depletion is worth knowing as the **counter-example**: the Montreal Protocol phased out CFCs, and the ozone layer is now recovering. It shows international agreement can work when the number of substances and industries involved is small.' }
    ]
  }

];
