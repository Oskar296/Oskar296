/* The core practicals named in the 4PH1 specification. */
window.PRACTICALS = [
  { s:1, ref:'1.4', title:'Investigating the motion of everyday objects',
    aim:'Find how the speed of a trolley or ball changes as it moves.',
    method:[
      'Set up a ramp with a runway and mark equal distances along it with tape.',
      'Release the trolley from rest at the same starting point each time.',
      'Time the trolley to each mark using light gates, or a stopwatch if light gates are not available.',
      'Repeat each timing three times and take a mean.',
      'Plot distance on the y-axis against time on the x-axis, and find speed from the gradient.'
    ],
    vars:'Independent: distance travelled. Dependent: time taken. Control: ramp angle, release point, same trolley.',
    errors:'Human reaction time makes stopwatch readings unreliable — light gates remove this. Friction on the runway is hard to keep constant.' },

  { s:1, ref:'1.21', title:'Investigating the forces on falling objects',
    aim:'Show that an object falling through air reaches a terminal velocity.',
    method:[
      'Stack paper cake cases and drop them from a fixed height.',
      'Time the fall over the lower section of the drop, where the velocity has become constant.',
      'Repeat with 1, 2, 3, 4 and 5 cases stacked together, which increases weight without much change in shape.',
      'Calculate terminal velocity = distance ÷ time for each, and plot terminal velocity against number of cases.'
    ],
    vars:'Independent: number of cases (weight). Dependent: terminal velocity. Control: drop height, shape, same room with no draughts.',
    errors:'Cases may not fall straight down. Reaction-time error on the stopwatch; drop from a greater height to reduce its effect.' },

  { s:1, ref:'1.22', title:'Investigating force and extension (Hooke’s law)',
    aim:'Find how the extension of a spring varies with the force applied.',
    method:[
      'Clamp the spring at the top with a ruler fixed vertically beside it.',
      'Record the unstretched length with no masses attached.',
      'Add a 100 g mass (about 1 N) and record the new length.',
      'Repeat, adding one mass at a time, up to at least six readings.',
      'Extension = stretched length − original length. Plot force on the y-axis against extension on the x-axis.'
    ],
    vars:'Independent: force added. Dependent: extension. Control: same spring, same starting position.',
    errors:'Read the ruler at eye level to avoid parallax error. Do not exceed the limit of proportionality, or the spring will not return to its original length. Wear eye protection and put a mat under the masses.' },

  { s:2, ref:'2.10', title:'Investigating current–voltage characteristics',
    aim:'Find how current varies with voltage for a resistor, a filament lamp and a diode.',
    method:[
      'Connect the component in series with an ammeter, a power supply and a variable resistor.',
      'Connect a voltmeter in parallel across the component.',
      'Vary the variable resistor and record pairs of current and voltage readings.',
      'Reverse the connections to the supply to get negative values as well.',
      'Plot current on the y-axis against voltage on the x-axis.'
    ],
    vars:'Independent: voltage. Dependent: current. Control: the component, and its temperature where possible.',
    errors:'Current heats the component and changes its resistance — switch off between readings to keep the resistor cool. Expect a straight line for the resistor, an S-curve for the lamp, and conduction in one direction only for the diode.' },

  { s:2, ref:'2.23', title:'Charging insulating materials by friction',
    aim:'Show that insulators can be charged by rubbing, and investigate the forces between charges.',
    method:[
      'Rub a polythene rod with a dry cloth and suspend it in a cradle or on a watch glass.',
      'Rub a second polythene rod and bring it close to the suspended one — they repel.',
      'Rub an acetate rod and bring it close — it attracts the polythene.',
      'Test the charged rod against small pieces of paper and a thin stream of water.'
    ],
    vars:'Independent: material of the rod. Dependent: attraction or repulsion observed.',
    errors:'Damp air lets charge leak away, so the effect is weak on humid days. Use dry apparatus and a dry room.' },

  { s:3, ref:'3.19', title:'Refraction through a rectangular glass block',
    aim:'Measure the angles of incidence and refraction and find the refractive index of glass.',
    method:[
      'Place the block on plain paper and draw round it.',
      'Draw a normal at the point where the ray will enter.',
      'Shine a ray box beam at a chosen angle of incidence and mark the incoming ray and the emerging ray with crosses.',
      'Remove the block and join the crosses to reveal the path inside the glass.',
      'Measure i and r from the normal with a protractor, and repeat for at least five angles.',
      'Calculate n = sin i / sin r each time and take a mean, or plot sin i against sin r and take the gradient.'
    ],
    vars:'Independent: angle of incidence. Dependent: angle of refraction. Control: same block, same face.',
    errors:'Use a sharp pencil and a narrow beam — a thick ray line adds uncertainty. Do not move the block once it is outlined. Work in a dimly lit room so the ray is easy to see.' },

  { s:3, ref:'3.28', title:'Measuring the speed of sound in air',
    aim:'Determine the speed of sound in air.',
    method:[
      'Method 1: two students stand a measured distance apart (at least 100 m). One bangs cymbals, the other starts a stopwatch on seeing the bang and stops it on hearing it. Speed = distance ÷ time.',
      'Method 2: connect two microphones a measured distance apart to a fast timer. Make a sharp sound; the timer records the delay between the two microphones.',
      'Method 3: measure the time for an echo to return from a wall a known distance away, remembering the sound travels there and back.',
      'Repeat several times and take a mean.'
    ],
    vars:'Independent: distance. Dependent: time. Control: same air temperature, no strong wind.',
    errors:'Reaction time dominates method 1 — use a long distance and many repeats. Methods 2 and 3 are far more precise because they remove the human timer.' },

  { s:4, ref:'4.8', title:'Investigating thermal energy transfer',
    aim:'Compare conduction, convection and radiation.',
    method:[
      'Conduction: attach pins to rods of copper, iron, brass and glass with wax, heat one end of each equally, and note the order in which the pins fall.',
      'Convection: drop a crystal of potassium manganate(VII) into a beaker of water and heat one side gently to make the convection current visible.',
      'Radiation: fill a Leslie cube with hot water and hold an infrared detector the same distance from each face — matt black, shiny black, matt white and shiny silver.'
    ],
    vars:'Radiation experiment — Independent: surface type. Dependent: infrared detected. Control: distance from the face, water temperature.',
    errors:'Keep the detector at exactly the same distance each time, since intensity falls sharply with distance. Let the cube reach a steady temperature before taking readings.' },

  { s:5, ref:'5.3', title:'Investigating density',
    aim:'Determine the density of solids and liquids.',
    method:[
      'Regular solid: measure mass on a balance, measure the dimensions with a ruler or vernier callipers, and calculate the volume.',
      'Irregular solid: measure mass, then lower it into a displacement can or a partly filled measuring cylinder; the volume of water displaced is the volume of the object.',
      'Liquid: measure the mass of an empty measuring cylinder, add a known volume of liquid, measure again, and subtract to find the mass of the liquid.',
      'Calculate density = mass ÷ volume in every case.'
    ],
    vars:'Independent: the material. Dependent: density calculated.',
    errors:'Read the measuring cylinder at the bottom of the meniscus, at eye level. Dry the object before weighing it. Air bubbles clinging to an irregular solid make the volume read too high.' },

  { s:5, ref:'5.12', title:'Investigating specific heat capacity',
    aim:'Find the specific heat capacity of water and of a metal block.',
    method:[
      'Measure the mass of the block or the water.',
      'Insert an immersion heater and a thermometer into the block or beaker, adding a drop of oil to the thermometer hole for good thermal contact.',
      'Record the starting temperature, switch on and start a stopwatch.',
      'Record the temperature at regular intervals, and find the energy supplied from energy = power × time.',
      'Use c = ΔQ ÷ (m × ΔT), or plot temperature against energy supplied and use the gradient.'
    ],
    vars:'Independent: energy supplied. Dependent: temperature rise. Control: mass, insulation, same heater.',
    errors:'Energy is lost to the surroundings, which makes the measured specific heat capacity too high — lag the block with insulation to reduce this. The heater and container also absorb energy.' },

  { s:6, ref:'6.6', title:'Investigating magnetic field patterns',
    aim:'Plot the field around a bar magnet and between two magnets.',
    method:[
      'Place a bar magnet on plain paper and draw round it.',
      'Put a plotting compass near one pole, mark dots at each end of the needle, move the compass so it starts where the last dot was, and repeat.',
      'Join the dots into a smooth line with an arrow from N to S. Repeat from several starting points.',
      'Alternatively, cover the magnet with paper and sprinkle iron filings, tapping gently.',
      'Repeat with two magnets N-to-S, then N-to-N, to compare the patterns.'
    ],
    vars:'Independent: arrangement of the magnets. Dependent: shape of the field pattern.',
    errors:'Keep other magnets and iron objects well away. The Earth’s field affects the compass, which shows up as a neutral point in the wrong place.' },

  { s:6, ref:'6.17', title:'Investigating electromagnetic induction',
    aim:'Show that a changing magnetic field induces a voltage, and find what affects its size.',
    method:[
      'Connect a coil of wire to a sensitive centre-zero galvanometer or a voltmeter.',
      'Move a bar magnet into the coil and note the deflection; hold it still and note there is none.',
      'Pull it out and note the deflection reverses.',
      'Repeat moving the magnet faster, using a stronger magnet, and using a coil with more turns.'
    ],
    vars:'Independent: speed of movement, magnet strength, number of turns. Dependent: size of induced voltage.',
    errors:'Movement by hand is not consistent — hard to keep the speed the same between trials. Use a data logger to capture the peak reading.' }
];
