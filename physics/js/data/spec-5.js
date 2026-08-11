SPEC.sections.push({
  id: 5,
  title: 'Solids, liquids and gases',
  colour: '#ff7d92',
  blurb: 'Density and pressure, the particle model and changes of state, specific heat capacity, the Kelvin scale and the gas laws. The Physics-only gas law calculations sit here.',
  topics: [

  { id:'5a', title:'Units', points:[
    { n:'5.1', t:'Use the following units: degree Celsius (°C), joule (J), kelvin (K), kilogram (kg), kilogram/metre³ (kg/m³), metre (m), metre²(m²), metre³ (m³), metre/second (m/s), newton (N), pascal (Pa).',
      note:'Pressure in Pa (which is N/m²), density in kg/m³. Convert cm³ to m³ by dividing by 1 000 000, and g/cm³ to kg/m³ by multiplying by 1000.' }
  ]},

  { id:'5b', title:'Density and pressure', points:[
    { n:'5.2', t:'Know and use the relationship between density, mass and volume.',
      eq:'density = mass ÷ volume   (ρ = m / V)',
      note:'Water has a density of 1000 kg/m³ (1 g/cm³). Anything less dense than water floats on it.' },
    { n:'5.3', t:'Practical: investigate the densities of solids and liquids.',
      cp:true,
      note:'Regular solid: measure mass on a balance, measure the sides with a ruler or vernier callipers and calculate the volume. Irregular solid: use a displacement can or a measuring cylinder, where the volume of water displaced equals the volume of the object. Liquid: weigh an empty measuring cylinder, add the liquid, weigh again, and subtract to get the mass.' },
    { n:'5.4', t:'Know and use the relationship between pressure, force and area.',
      eq:'pressure = force ÷ area   (p = F / A)',
      note:'Smaller area gives greater pressure — hence sharp knives and drawing pins. Larger area gives less pressure — hence snowshoes and wide tractor tyres. Area must be in m².' },
    { n:'5.5', t:'Understand that the pressure at a point in a gas or liquid at rest acts equally in all directions.',
      note:'This is why a balloon inflates evenly and why a submarine is squeezed from every side.' },
    { n:'5.6', t:'Know and use the relationship for pressure difference.',
      eq:'pressure difference = height × density × g   (p = h × ρ × g)',
      note:'Pressure in a liquid increases with depth and with density, but does not depend on the surface area or the shape of the container. This is why dam walls are thicker at the base.' }
  ]},

  { id:'5c', title:'Change of state', points:[
    { n:'5.7', t:'Understand the changes that occur when a solid melts to form a liquid, and when a liquid evaporates or boils to form a gas.',
      note:'Solid: particles closely packed in a fixed regular pattern, vibrating in place. Liquid: close together but able to move past each other, with no fixed shape. Gas: far apart, moving quickly in all directions, filling the container. Melting and boiling need energy input to break the forces between particles.' },
    { n:'5.8', t:'Describe the arrangement and motion of particles in solids, liquids and gases.',
      note:'Be ready to draw the three diagrams and describe both arrangement and motion, plus the relative spacing. Density order: solid > liquid ≫ gas.' },
    { n:'5.9', t:'Understand the significance of the temperature of a substance in terms of the motion of its particles.',
      note:'Temperature is a measure of the average kinetic energy of the particles. Hotter means faster-moving particles.' },
    { n:'5.10', t:'Understand that during a change of state the temperature stays constant while the energy supplied changes the arrangement of the particles.',
      note:'On a heating curve the flat sections are the changes of state. The energy goes into breaking the forces between particles, not into raising their kinetic energy, so the thermometer reading does not change.' },
    { n:'5.11', t:'Know and use the relationship between specific heat capacity, mass, temperature change and energy transferred.',
      eq:'change in thermal energy = mass × specific heat capacity × change in temperature   (ΔQ = m × c × ΔT)',
      note:'Specific heat capacity is the energy needed to raise 1 kg of a substance by 1 °C, in J/(kg °C). Water’s is very high at 4200, which is why it is used in central heating and why the sea warms slowly.' },
    { n:'5.12', t:'Practical: investigate the specific heat capacity of materials including water and some solids.',
      cp:true,
      note:'Use an immersion heater in an insulated metal block or beaker of water, with a joulemeter or with energy = power × time, and measure the temperature rise with a thermometer. Insulate to reduce energy lost to the surroundings, which is the main source of error and makes the measured value too high.' }
  ]},

  { id:'5d', title:'Ideal gas molecules', points:[
    { n:'5.13', t:'Understand that molecules in a gas have random motion and that they exert a force and hence a pressure on the walls of a container.', p2:true,
      note:'Gas molecules collide with the walls. Each collision changes the molecule’s momentum, so a force is exerted on the wall, and force over area gives pressure.' },
    { n:'5.14', t:'Understand why there is an absolute zero of temperature which is −273 °C.', p2:true,
      note:'As a gas is cooled its particles move more slowly, so pressure and volume fall. Extrapolating a pressure–temperature graph back to zero pressure gives −273 °C. At absolute zero particles have the minimum possible kinetic energy, and you cannot go colder.' },
    { n:'5.15', t:'Describe the Kelvin scale of temperature and be able to convert between the Kelvin and Celsius scales.', p2:true,
      eq:'T (K) = θ (°C) + 273',
      note:'Always convert to kelvin before using any gas law. 27 °C = 300 K. A negative kelvin answer is impossible.' },
    { n:'5.16', t:'Understand that an increase in temperature results in an increase in the average speed of gas molecules.', p2:true,
      note:'Faster molecules hit the walls harder and more often, so in a fixed container the pressure rises.' },
    { n:'5.17', t:'Know that the Kelvin temperature of a gas is proportional to the average kinetic energy of its molecules.', p2:true,
      note:'Double the kelvin temperature and you double the average kinetic energy. This is not true for the Celsius scale, which is why kelvin is used.' },
    { n:'5.18', t:'Describe the qualitative relationship between pressure and Kelvin temperature for a gas in a sealed container.', p2:true,
      note:'At constant volume, pressure is directly proportional to kelvin temperature. This explains why an aerosol can may explode if heated.' },
    { n:'5.19', t:'Use the relationship between the pressure and Kelvin temperature of a fixed mass of gas at constant volume.', p2:true,
      eq:'p₁ / T₁ = p₂ / T₂',
      note:'Temperatures in kelvin. Constant volume only.' },
    { n:'5.20', t:'Use the relationship between the pressure and volume of a fixed mass of gas at constant temperature.', p2:true,
      eq:'p₁ × V₁ = p₂ × V₂',
      note:'Boyle’s law. Squeeze a gas into half the volume at constant temperature and the pressure doubles, because the molecules hit the walls twice as often.' }
  ]}

]});
