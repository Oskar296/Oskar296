EXAMQS.push(

{ s:5, title:'Density and pressure in a liquid', context:
  'A rectangular block of metal measures 0.20 m × 0.10 m × 0.05 m and has a mass of 7.9 kg.',
  parts:[
    { q:'Calculate the volume of the block.', marks:2,
      ms:['V = 0.20 × 0.10 × 0.05','= 1.0 × 10⁻³ m³'],
      tip:'Keep every length in metres and the volume comes out in m³ directly.' },
    { q:'Calculate the density of the metal.', marks:2,
      ms:['ρ = m / V = 7.9 / 1.0 × 10⁻³','= 7900 kg/m³'],
      tip:'A metal density of a few thousand kg/m³ is a good sanity check. Water is 1000.' },
    { q:'The block rests on its largest face. Calculate the pressure it exerts on the ground. (g = 10 N/kg)', marks:3,
      ms:['W = m × g = 7.9 × 10 = 79 N','A = 0.20 × 0.10 = 0.02 m²','p = F / A = 79 / 0.02 = 3950 Pa'],
      tip:'The force is the weight, not the mass. Largest face means smallest pressure.' },
    { q:'Calculate the pressure due to the water at a depth of 15 m in a lake. (density of water = 1000 kg/m³)', marks:2,
      ms:['p = h × ρ × g = 15 × 1000 × 10','= 150 000 Pa'],
      tip:'This is the pressure due to the water alone. If asked for total pressure, add atmospheric pressure on top.' }
  ]},

{ s:5, title:'Heating and specific heat capacity', context:
  'A 2.0 kg aluminium block is heated by a 50 W immersion heater. Its temperature rises from 20 °C to 45 °C in 15 minutes.',
  parts:[
    { q:'Calculate the energy supplied by the heater.', marks:3,
      ms:['t = 15 × 60 = 900 s','E = P × t = 50 × 900','= 45 000 J'],
      tip:'Convert minutes to seconds. This single step accounts for a huge share of dropped marks.' },
    { q:'Calculate the specific heat capacity of aluminium from these results.', marks:3,
      ms:['ΔT = 45 − 20 = 25 °C','c = ΔQ / (m × ΔT) = 45 000 / (2.0 × 25)','= 900 J/(kg °C)'],
      tip:'Use the temperature change, not the final temperature. Rearrange ΔQ = mcΔT carefully.' },
    { q:'The accepted value is lower than the value calculated. Explain why.', marks:2,
      ms:['Some energy is transferred to the surroundings rather than to the block',
          'So the measured energy supplied is greater than the energy actually gained by the block, making the calculated value too high'],
      tip:'Then give the improvement: lag the block with insulation. Examiners often add a mark for it.' },
    { q:'Explain, in terms of particles, why the temperature of water stays constant while it boils.', marks:3,
      ms:['The energy supplied is used to break the forces of attraction between the particles',
          'It is not used to increase the average kinetic energy of the particles',
          'Temperature is a measure of average kinetic energy, so the temperature does not change'],
      tip:'The chain "energy breaks bonds → kinetic energy unchanged → temperature unchanged" is the full three marks.' }
  ]},

{ s:5, title:'Gas laws and kinetic theory', context:
  'A sealed cylinder contains 0.030 m³ of gas at a pressure of 1.0 × 10⁵ Pa and a temperature of 27 °C.',
  parts:[
    { q:'The gas is compressed to 0.010 m³ at constant temperature. Calculate the new pressure.', marks:3,
      ms:['p₁V₁ = p₂V₂','1.0 × 10⁵ × 0.030 = p₂ × 0.010','p₂ = 3.0 × 10⁵ Pa'], p2:true,
      tip:'Boyle’s law. Volume down by a factor of 3, so pressure up by a factor of 3 — check your answer against that.' },
    { q:'Explain, in terms of molecules, why the pressure increases when the gas is compressed.', marks:3,
      ms:['The molecules are now in a smaller volume',
          'So they collide with the walls more frequently',
          'More collisions per second on each unit of area means a greater pressure'],
      tip:'Say "more often", not "harder". At constant temperature the molecules move at the same average speed.' },
    { q:'The cylinder is returned to 0.030 m³ and heated from 27 °C to 127 °C at constant volume. Calculate the new pressure.', marks:4,
      ms:['T₁ = 27 + 273 = 300 K, T₂ = 127 + 273 = 400 K','p₁/T₁ = p₂/T₂','1.0 × 10⁵ / 300 = p₂ / 400','p₂ = 1.33 × 10⁵ Pa'], p2:true,
      tip:'Convert to kelvin first — using Celsius here gives a wildly wrong answer and scores nothing.' },
    { q:'Explain what is meant by absolute zero.', marks:2,
      ms:['The lowest temperature possible, −273 °C or 0 K',
          'At this temperature the particles have the minimum possible kinetic energy'], p2:true,
      tip:'Give both the value and the meaning. One without the other is one mark.' }
  ]},

{ s:6, title:'The motor effect', context:
  'A straight wire of length 0.15 m lies at right angles to a magnetic field of flux density 0.20 T. A current of 3.0 A flows in the wire.',
  parts:[
    { q:'Calculate the force on the wire.', marks:2,
      ms:['F = B × I × l = 0.20 × 3.0 × 0.15','= 0.090 N'], p2:true,
      tip:'The equation only works when the wire is at 90° to the field. If the wire lies along the field, the force is zero.' },
    { q:'State two ways the force could be increased.', marks:2,
      ms:['Increase the current','Use a stronger magnetic field (or increase the length of wire in the field)'],
      tip:'Reversing the current or the field changes the direction, not the size. Read the question.' },
    { q:'Describe how to find the direction of the force.', marks:2,
      ms:['Use Fleming’s left-hand rule',
          'First finger points along the field from N to S, second finger along the conventional current, and the thumb then gives the direction of the force'],
      tip:'Left hand for the motor effect. Name the rule and describe it — both are creditworthy.' },
    { q:'Explain how a split-ring commutator keeps a d.c. motor turning in one direction.', marks:3,
      ms:['The two sides of the coil carry current in opposite directions, so the forces on them are opposite and the coil rotates',
          'Every half turn the commutator reverses the current in the coil',
          'So the force on each side always acts in the direction that keeps the coil turning the same way'],
      tip:'Without the commutator the coil would turn half a turn and then stop or oscillate. Saying that earns credit.' }
  ]},

{ s:6, title:'Transformers and the National Grid', context:
  'A transformer has 200 turns on its primary coil and 5000 turns on its secondary coil. The input is 230 V a.c.',
  parts:[
    { q:'Calculate the output voltage.', marks:3,
      ms:['V_p / V_s = n_p / n_s','230 / V_s = 200 / 5000','V_s = 5750 V'],
      tip:'More turns on the secondary means a step-up transformer, so expect a bigger output. Check your answer fits.' },
    { q:'The transformer is 100% efficient and the primary current is 2.0 A. Calculate the secondary current.', marks:3,
      ms:['V_p × I_p = V_s × I_s','230 × 2.0 = 5750 × I_s','I_s = 0.080 A'],
      tip:'Power in equals power out. Voltage up by 25 times means current down by 25 times.' },
    { q:'Explain why a transformer does not work with a direct current supply.', marks:3,
      ms:['A transformer needs a changing magnetic field in the core',
          'd.c. produces a magnetic field that is constant, so it does not change',
          'With no changing field there is no induced voltage in the secondary coil'],
      tip:'Every mark here is about change. Repeat the word deliberately.' },
    { q:'Explain why the core is made of soft iron.', marks:2,
      ms:['Soft iron is easily magnetised and demagnetised, so it follows the rapidly alternating field',
          'It also concentrates the magnetic field so that more of it links the secondary coil'],
      tip:'Contrast with steel, which is magnetically hard and would not keep up with the alternating field.' }
  ]},

{ s:6, title:'Electromagnetic induction', context:
  'A student pushes a bar magnet into a coil of wire connected to a sensitive centre-zero galvanometer.',
  parts:[
    { q:'Describe what the student observes as the magnet is pushed in, held still, and pulled out.', marks:3,
      ms:['Pushing in: the needle deflects to one side',
          'Held still: the needle reads zero',
          'Pulled out: the needle deflects the other way'],
      tip:'The reading is zero when stationary because nothing is changing — this is the mark most people miss.' },
    { q:'State three ways the size of the induced voltage could be increased.', marks:3,
      ms:['Move the magnet faster','Use a stronger magnet','Use a coil with more turns'],
      tip:'Three distinct changes. "Move it more" is too vague to score.' },
    { q:'Explain how an a.c. generator produces an alternating voltage.', marks:3,
      ms:['A coil is rotated in a magnetic field (or a magnet is rotated inside a coil)',
          'The magnetic field through the coil is constantly changing, so a voltage is induced',
          'The coil cuts the field lines in opposite directions each half turn, so the induced voltage reverses direction'],
      tip:'Slip rings keep the connection to the same end of the coil, which is why the output alternates.' }
  ]},

{ s:7, title:'Nuclear equations and radiation', context:
  'Radium-226 (²²⁶₈₈Ra) decays by alpha emission to form radon (Rn).',
  parts:[
    { q:'Complete the nuclear equation: ²²⁶₈₈Ra → ?Rn + ⁴₂He', marks:2,
      ms:['Mass number 226 − 4 = 222','Atomic number 88 − 2 = 86, giving ²²²₈₆Rn'],
      tip:'The top numbers must balance and so must the bottom ones. Check both before moving on.' },
    { q:'A different nucleus decays by beta emission. State the effect on its mass and atomic numbers.', marks:2,
      ms:['The mass number stays the same','The atomic number increases by 1'],
      tip:'A neutron turns into a proton and an electron. The nucleon count is unchanged.' },
    { q:'Compare alpha, beta and gamma radiation in terms of penetrating power.', marks:3,
      ms:['Alpha is stopped by paper or a few centimetres of air',
          'Beta is stopped by a few millimetres of aluminium',
          'Gamma is only reduced by thick lead or concrete and is never fully stopped'],
      tip:'Give the specific absorber for each. "Alpha is least penetrating" alone is worth one mark at most.' },
    { q:'Explain why an alpha emitter is particularly dangerous if it is swallowed.', marks:2,
      ms:['Alpha radiation is strongly ionising',
          'Inside the body there is no skin or air to absorb it, so it ionises and damages nearby cells directly'],
      tip:'Alpha is the most dangerous inside the body and the least dangerous outside. Know which way round the question is asking.' }
  ]},

{ s:7, title:'Half-life', context:
  'A sample of a radioactive isotope has an initial count rate of 640 counts per minute above background. After 24 hours the count rate has fallen to 40 counts per minute.',
  parts:[
    { q:'Calculate the half-life of the isotope.', marks:3,
      ms:['640 → 320 → 160 → 80 → 40 is 4 halvings','4 half-lives = 24 hours','half-life = 6 hours'],
      tip:'Halve repeatedly and count the steps. Showing the chain of numbers earns the working marks.' },
    { q:'Explain why the background count rate must be subtracted before this calculation.', marks:2,
      ms:['Background radiation is always present and is detected as well as the source',
          'Without subtracting it the measured count rate is too high, so the calculated half-life would be wrong'],
      tip:'Measure the background first with no source nearby, then subtract from every reading.' },
    { q:'Explain what is meant by saying radioactive decay is random.', marks:2,
      ms:['It is impossible to predict which nucleus will decay next, or when it will decay',
          'Only the probability of decay in a given time can be stated'],
      tip:'Random does not mean the half-life is unpredictable — the average behaviour of a large sample is very reliable.' },
    { q:'A tracer is needed to follow blood flow inside a patient. State the type of radiation and the half-life required, giving reasons.', marks:3,
      ms:['Gamma, because it is penetrating enough to pass out of the body and be detected outside',
          'A short half-life, of a few hours',
          'So the activity falls quickly and the patient is not exposed to radiation for longer than necessary'],
      tip:'Short but not too short — it must last long enough to complete the scan. Saying so is often worth the third mark.' }
  ]},

{ s:7, title:'Fission and fusion', context:
  'Nuclear power stations release energy by fission. Stars release energy by fusion.',
  parts:[
    { q:'Describe the process of nuclear fission.', marks:3,
      ms:['A neutron is absorbed by a large unstable nucleus such as uranium-235',
          'The nucleus splits into two smaller daughter nuclei',
          'Two or three neutrons are released, along with a large amount of energy'], p2:true,
      tip:'Name a fuel and mention the released neutrons — they are what makes the chain reaction possible.' },
    { q:'Explain the roles of the control rods and the moderator in a reactor.', marks:4,
      ms:['Control rods absorb neutrons','Lowering them further reduces the number of neutrons and slows the chain reaction, keeping it steady',
          'The moderator slows down the fast neutrons','Slow neutrons are more likely to be absorbed by uranium-235 and cause further fission'], p2:true,
      tip:'Do not swap these round. Rods absorb, moderator slows. It is the single most common confusion in this topic.' },
    { q:'Explain why nuclear fusion requires extremely high temperatures and pressures.', marks:3,
      ms:['Both nuclei are positively charged, so they repel each other electrostatically',
          'Very high temperatures give the nuclei enough kinetic energy to overcome this repulsion',
          'High pressure makes collisions frequent enough for fusion to occur at a useful rate'], p2:true,
      tip:'Mention electrostatic repulsion by name. That is the mark the question is really testing.' }
  ]},

{ s:8, title:'Orbits in the Solar System', context:
  'A satellite orbits the Earth at a radius of 7.2 × 10⁶ m from the centre of the Earth. It completes one orbit in 6100 s.',
  parts:[
    { q:'Calculate the orbital speed of the satellite.', marks:3,
      ms:['v = 2πr / T','= (2 × π × 7.2 × 10⁶) / 6100','= 7400 m/s (2 s.f.)'],
      tip:'2πr is the circumference of the orbit. Keep everything in metres and seconds.' },
    { q:'Explain why the satellite is accelerating even though its speed is constant.', marks:2,
      ms:['Its direction of motion is constantly changing, so its velocity is changing',
          'Acceleration is the rate of change of velocity, and velocity is a vector'],
      tip:'This hinges entirely on velocity being a vector. Say the word.' },
    { q:'Name the force that keeps the satellite in orbit and state its direction.', marks:2,
      ms:['Gravitational force (gravitational attraction of the Earth)','It acts towards the centre of the orbit, i.e. towards the centre of the Earth'],
      tip:'Towards the centre — always. There is no outward force acting on an orbiting body.' },
    { q:'Explain why a comet travels fastest when it is closest to the Sun.', marks:3,
      ms:['Its orbit is highly elliptical, so its distance from the Sun varies greatly',
          'Closer to the Sun the gravitational force on it is larger, so it accelerates',
          'Gravitational potential energy is transferred to kinetic energy as it moves inwards'],
      tip:'Either the force argument or the energy argument will do, but giving both makes the three marks safe.' }
  ]},

{ s:8, title:'The life cycle of stars', context:
  'Stars form from clouds of dust and gas and evolve differently depending on their mass.',
  parts:[
    { q:'Describe the stages in the life cycle of a star with a similar mass to the Sun.', marks:4,
      ms:['A nebula of dust and gas is pulled together by gravity to form a protostar',
          'When it is hot and dense enough, hydrogen fusion begins and it becomes a main sequence star',
          'When the hydrogen in the core runs out it expands into a red giant',
          'It sheds its outer layers, leaving a hot dense white dwarf that gradually cools'],
      tip:'Four stages, four marks. Learn the sequence as a list and write it in order.' },
    { q:'Explain why a main sequence star is stable for billions of years.', marks:2,
      ms:['The outward pressure produced by fusion in the core',
          'is balanced by the inward gravitational force, so the star neither expands nor collapses'],
      tip:'Name both forces and say they balance. "It is in equilibrium" alone is one mark.' },
    { q:'State how the life cycle of a star far more massive than the Sun differs after the red supergiant stage.', marks:2,
      ms:['It explodes as a supernova',
          'leaving behind a neutron star, or a black hole if the star was massive enough'],
      tip:'Supernovae are what scatter the heavy elements from which planets form — a useful extra sentence.' },
    { q:'A star is described as blue and very bright. State what this suggests about its temperature.', marks:1,
      ms:['It is very hot'],
      tip:'Blue is hot, red is cool. The opposite of the everyday colour association for taps.' }
  ]},

{ s:8, title:'Red shift and the Big Bang', context:
  'Light from distant galaxies is observed to be shifted towards the red end of the spectrum.',
  parts:[
    { q:'Explain what is meant by red shift.', marks:2,
      ms:['The observed wavelength of the light is longer than the wavelength emitted',
          'and the frequency is correspondingly lower, because the source is moving away from us'],
      tip:'Mention wavelength and direction of motion. This is the Doppler effect applied to light.' },
    { q:'Explain how red shift provides evidence that the Universe is expanding.', marks:3,
      ms:['Light from almost all distant galaxies is red shifted, so they are moving away from us',
          'The further away a galaxy is, the greater its red shift and so the faster it is receding',
          'This is what would be observed if space itself were expanding everywhere, with no galaxy at the centre'],
      tip:'The "further means faster" relationship is the key evidence — it rules out us simply sitting at the centre of an explosion.' },
    { q:'A galaxy is 4.0 × 10²⁴ m away. Calculate its speed of recession. (H₀ = 2.2 × 10⁻¹⁸ s⁻¹)', marks:2,
      ms:['v = H₀ × d = 2.2 × 10⁻¹⁸ × 4.0 × 10²⁴','= 8.8 × 10⁶ m/s'],
      tip:'Multiply the numbers and add the powers of ten. Practise this on your calculator before the exam.' },
    { q:'State one other piece of evidence supporting the Big Bang theory and explain it.', marks:2,
      ms:['Cosmic microwave background radiation',
          'It is detected coming from all directions in space and is the cooled remnant of the radiation from the hot early Universe, which only the Big Bang theory predicts'],
      tip:'CMB is the expected answer. Say it comes from every direction — that uniformity is the point.' }
  ]}

);
