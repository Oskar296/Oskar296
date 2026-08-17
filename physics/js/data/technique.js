/* Exam technique reference: command words, calculation method, graph skills,
   unit conversions and the traps that cost the most marks. */
window.TECHNIQUE = {

  commands: [
    { w:'State', m:'Give a short factual answer. No explanation needed and no marks for adding one.', e:'"State the unit of momentum." → kg m/s' },
    { w:'Give', m:'The same as state. One short piece of information.', e:'"Give one use of gamma radiation." → sterilising surgical instruments' },
    { w:'Name', m:'Identify something using the correct technical term.', e:'"Name the force that keeps a planet in orbit." → gravitational force' },
    { w:'Describe', m:'Say what happens, in the right order. No reasons required.', e:'"Describe what happens to the needle as the magnet is pushed in." → it deflects to one side' },
    { w:'Explain', m:'Say why it happens. Every explain mark needs a reason — look for "because", "so" and "therefore" in your own answer.', e:'"Explain why the resistance of a filament lamp increases." → the filament heats up, so the ions vibrate more, so electrons collide more often' },
    { w:'Calculate', m:'Work out a numerical answer. Always show the equation, the substitution and the final answer with a unit.', e:'Three lines, every time. You can earn marks even when the final number is wrong.' },
    { w:'Determine', m:'Like calculate, but you usually have to extract the data yourself, often from a graph.', e:'"Determine the acceleration from the graph." → draw a triangle, take the gradient' },
    { w:'Compare', m:'Write about both things, and make the link explicit. Use "whereas" or "but".', e:'"Alpha is stopped by paper, whereas gamma needs thick lead."' },
    { w:'Suggest', m:'Apply what you know to an unfamiliar situation. There is often more than one acceptable answer.', e:'"Suggest why the readings varied." → the count rate is random, so repeats differ' },
    { w:'Predict', m:'Say what will happen, based on a pattern or a relationship you have been given.', e:'Look for the trend in the data and continue it.' },
    { w:'Evaluate', m:'Give advantages and disadvantages, then reach a conclusion. The conclusion is usually worth a mark on its own.', e:'"Evaluate the use of wind power." → advantages, disadvantages, then a judgement' },
    { w:'Suggest an improvement', m:'Name a specific change to the method and say what error it reduces.', e:'"Use light gates instead of a stopwatch, to remove reaction-time error."' },
    { w:'Show that', m:'Work towards the value given in the question, and quote your answer to more figures than the question does.', e:'"Show that the speed is about 7 m/s." → end with 7.33 m/s, not "about 7"' },
    { w:'Sketch', m:'Draw the correct shape with the axes labelled. Accurate plotting is not required, but the shape must be right.', e:'A filament lamp I–V graph: an S-shaped curve through the origin' }
  ],

  calcSteps: [
    { t:'Write the equation first', d:'Even if you get stuck straight afterwards, the equation usually earns a mark. Write it in symbols exactly as it appears on the Equations tab.' },
    { t:'Convert every quantity to SI units', d:'Minutes to seconds, km to m, g to kg, cm³ to m³, kHz to Hz, °C to K for any gas law. Do this before you substitute, not after.' },
    { t:'Rearrange before you substitute', d:'It is far easier to make the unknown the subject while the letters are still letters. Numbers make rearranging harder, not easier.' },
    { t:'Substitute and show it', d:'Write the line with the numbers in it. This is the substitution mark and it survives an arithmetic slip.' },
    { t:'Give the answer with a unit', d:'A number with no unit usually loses the final mark. Check the unit matches the quantity you were asked for.' },
    { t:'Sanity check', d:'Is a car really travelling at 3000 m/s? Is the efficiency above 100%? Is the refractive index below 1? If so, something has gone wrong — say so if you cannot fix it.' },
    { t:'Significant figures', d:'Match the least precise value in the question, usually 2 or 3 s.f. Never round part-way through a multi-step calculation.' }
  ],

  graphs: [
    { t:'Distance–time graph', d:'Gradient = speed. Flat means stationary. Curving upwards means accelerating. For the speed at an instant, draw a tangent and take its gradient.' },
    { t:'Velocity–time graph', d:'Gradient = acceleration. Area under the line = distance travelled. A flat line means constant velocity, not stationary.' },
    { t:'Force–extension graph', d:'The straight portion through the origin obeys Hooke\'s law. Gradient = spring constant. The point where it starts to curve is the limit of proportionality.' },
    { t:'Current–voltage graph', d:'Gradient = 1/resistance. A straight line through the origin means constant resistance. A flattening curve means resistance is increasing.' },
    { t:'Taking a gradient', d:'Use a triangle spanning at least half the line, read the corners off gridlines, and show the triangle on the graph. Small triangles lose accuracy marks.' },
    { t:'Drawing a line of best fit', d:'A smooth single line with roughly equal numbers of points either side. Do not join the dots, and do not force it through the origin unless the physics requires it.' },
    { t:'Plotting points', d:'Use sensible scales that fill at least half the grid, label both axes with the quantity and its unit, and mark points with a small neat cross.' }
  ],

  units: [
    { f:'kilometres (km)', t:'metres (m)', h:'× 1000' },
    { f:'centimetres (cm)', t:'metres (m)', h:'÷ 100' },
    { f:'millimetres (mm)', t:'metres (m)', h:'÷ 1000' },
    { f:'grams (g)', t:'kilograms (kg)', h:'÷ 1000' },
    { f:'tonnes (t)', t:'kilograms (kg)', h:'× 1000' },
    { f:'minutes', t:'seconds (s)', h:'× 60' },
    { f:'hours', t:'seconds (s)', h:'× 3600' },
    { f:'km/h', t:'m/s', h:'÷ 3.6' },
    { f:'cm² ', t:'m²', h:'÷ 10 000' },
    { f:'cm³', t:'m³', h:'÷ 1 000 000' },
    { f:'g/cm³', t:'kg/m³', h:'× 1000' },
    { f:'milliamps (mA)', t:'amps (A)', h:'÷ 1000' },
    { f:'kilowatts (kW)', t:'watts (W)', h:'× 1000' },
    { f:'megawatts (MW)', t:'watts (W)', h:'× 1 000 000' },
    { f:'kilohertz (kHz)', t:'hertz (Hz)', h:'× 1000' },
    { f:'megahertz (MHz)', t:'hertz (Hz)', h:'× 1 000 000' },
    { f:'degrees Celsius (°C)', t:'kelvin (K)', h:'+ 273' },
    { f:'kilojoules (kJ)', t:'joules (J)', h:'× 1000' }
  ],

  sixMark: [
    'Read the question twice and underline the command word and the context.',
    'Spend a minute planning: jot four or five bullet points in the margin before you write anything.',
    'Write in continuous prose, in a logical order. Six-mark questions carry marks for how well the answer is organised, not just for the facts.',
    'Use the technical vocabulary — resultant force, dissipated, ionising, induced, terminal velocity. Everyday words rarely score.',
    'If the question says "explain", make sure most sentences contain a reason.',
    'If it says "evaluate" or "discuss", cover both sides and finish with a clear conclusion.',
    'Refer to the specific context in the question, not a generic textbook answer.',
    'Aim for roughly six or seven clear points. Length alone earns nothing.'
  ],

  traps: [
    { t:'Confusing mass and weight', d:'Mass is in kg and never changes. Weight is a force in N and depends on g. "The astronaut’s mass on the Moon" is still the Earth value.' },
    { t:'Reading the wrong graph type', d:'Check the y-axis label before you say "gradient is speed". Distance–time and velocity–time graphs can look identical.' },
    { t:'Forgetting to square or square-root', d:'KE = ½mv² needs the square. v² = u² + 2as needs the square root at the end.' },
    { t:'Not converting time to seconds', d:'Any answer in joules or watts needs the time in seconds.' },
    { t:'Measuring angles from the surface', d:'All angles in optics are measured from the normal, which is at 90° to the surface.' },
    { t:'Using Celsius in a gas law', d:'p₁/T₁ = p₂/T₂ and any temperature-proportionality argument require kelvin.' },
    { t:'Saying energy is "lost"', d:'Energy is dissipated or transferred to the surroundings. It is never destroyed.' },
    { t:'Saying forces "cancel out and it stops"', d:'At terminal velocity the resultant force is zero, so the object keeps moving at constant velocity.' },
    { t:'Mixing up moderator and control rods', d:'The moderator slows neutrons down. The control rods absorb them.' },
    { t:'Forgetting background radiation', d:'Subtract the background count rate before any half-life calculation.' },
    { t:'Protons moving in electrostatics', d:'Only electrons move. A positive charge means electrons have been removed.' },
    { t:'Ionising vs penetrating', d:'Alpha is the most ionising but the least penetrating. Gamma is the reverse.' }
  ]
};
