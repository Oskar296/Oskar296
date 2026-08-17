/* Exam-style structured questions with mark schemes.
   parts[]: q = question, marks = mark allocation, ms[] = mark scheme points,
   tip = what examiners are actually looking for. */
window.EXAMQS = window.EXAMQS || [];

EXAMQS.push(

{ s:1, title:'A journey on a velocity–time graph', context:
  'A cyclist starts from rest. She accelerates uniformly to 8 m/s in 10 s, travels at that speed for 30 s, then brakes uniformly and stops in a further 4 s.',
  parts:[
    { q:'Calculate the acceleration during the first 10 s.', marks:2,
      ms:['a = (v − u) / t = (8 − 0) / 10','= 0.8 m/s²'],
      tip:'One mark for the substitution, one for the answer with its unit. Write the equation first — it earns credit even if the arithmetic goes wrong.' },
    { q:'Calculate the total distance travelled.', marks:3,
      ms:['Acceleration phase: ½ × 10 × 8 = 40 m','Constant phase: 30 × 8 = 240 m','Braking phase: ½ × 4 × 8 = 16 m; total = 296 m'],
      tip:'Distance is the area under a velocity–time graph. Split it into a triangle, a rectangle and a triangle, then add.' },
    { q:'Calculate the deceleration during braking.', marks:2,
      ms:['a = (0 − 8) / 4','= −2 m/s² (a deceleration of 2 m/s²)'],
      tip:'A negative answer is correct here. Say "deceleration of 2 m/s²" or keep the minus sign — do not do both.' },
    { q:'The cyclist and her bike have a total mass of 75 kg. Calculate the braking force.', marks:2,
      ms:['F = m × a = 75 × 2','= 150 N'],
      tip:'Use the size of the deceleration. The force acts backwards, opposite to the motion.' }
  ]},

{ s:1, title:'Falling and terminal velocity', context:
  'A skydiver of mass 80 kg jumps from a plane. Take g = 10 N/kg.',
  parts:[
    { q:'Calculate her weight.', marks:2,
      ms:['W = m × g = 80 × 10','= 800 N'],
      tip:'Weight is a force in newtons. Mass stays 80 kg throughout.' },
    { q:'Explain, in terms of the forces acting, why she reaches a terminal velocity.', marks:4,
      ms:['At first weight is greater than air resistance, so there is a resultant force downwards and she accelerates',
          'As her speed increases, air resistance increases',
          'Eventually air resistance equals her weight',
          'The resultant force is now zero, so she stops accelerating and falls at a constant (terminal) velocity'],
      tip:'This is a classic 4-marker. Examiners want the sequence: unbalanced → drag grows → balanced → zero resultant → constant velocity. Never write that she "stops" — she is still falling.' },
    { q:'She opens her parachute. Describe and explain what happens to her velocity.', marks:3,
      ms:['Air resistance increases suddenly and becomes greater than her weight',
          'There is now a resultant force upwards, so she decelerates',
          'As she slows, air resistance falls until it again equals weight, giving a new, lower terminal velocity'],
      tip:'She decelerates — she does not move upwards. The forces re-balance at a slower speed.' }
  ]},

{ s:1, title:'Momentum in a collision', context:
  'A 1200 kg car travelling at 15 m/s collides with a stationary 800 kg car. The two vehicles lock together and move off along the same straight line.',
  parts:[
    { q:'Calculate the momentum of the moving car before the collision.', marks:2,
      ms:['p = m × v = 1200 × 15','= 18 000 kg m/s'], p2:true,
      tip:'Momentum units are kg m/s. There is no shortcut name for them.' },
    { q:'Calculate the velocity of the wreckage immediately after the collision.', marks:3,
      ms:['Total momentum before = total momentum after','18 000 = (1200 + 800) × v','v = 18 000 / 2000 = 9 m/s'], p2:true,
      tip:'State conservation of momentum explicitly — it is worth a mark. The stationary car contributes zero momentum before.' },
    { q:'Explain how a crumple zone reduces the force on the driver.', marks:3,
      ms:['The crumple zone increases the time taken for the momentum to change',
          'Force = change in momentum ÷ time',
          'For the same change in momentum, a longer time means a smaller force'], p2:true,
      tip:'You must quote the relationship. "It absorbs the impact" on its own scores nothing.' }
  ]},

{ s:1, title:'Moments and a balanced beam', context:
  'A uniform plank of weight 200 N and length 4.0 m rests on a pivot at its centre. A child of weight 300 N sits 1.2 m from the pivot on the left.',
  parts:[
    { q:'Calculate the moment of the child about the pivot.', marks:2,
      ms:['moment = force × perpendicular distance = 300 × 1.2','= 360 N m'],
      tip:'Units are N m, not N/m. The distance must be measured from the pivot.' },
    { q:'A second child sits on the right and the plank balances. She is 1.5 m from the pivot. Calculate her weight.', marks:3,
      ms:['Principle of moments: clockwise moment = anticlockwise moment','W × 1.5 = 360','W = 240 N'],
      tip:'The plank is uniform and pivoted at its centre, so its own weight acts through the pivot and has zero moment — ignore it.' },
    { q:'State what is meant by the centre of gravity of an object.', marks:1,
      ms:['The single point through which the whole weight of the object can be taken to act'],
      tip:'A one-line definition. Do not confuse it with the centre of the object, though for a uniform object they coincide.' }
  ]},

{ s:2, title:'A series and parallel circuit', context:
  'A 12 V battery is connected to a 4 Ω resistor in series with a parallel combination of two 6 Ω resistors.',
  parts:[
    { q:'Calculate the resistance of the two 6 Ω resistors in parallel.', marks:2,
      ms:['Two equal resistors in parallel give half the resistance of one','= 3 Ω'],
      tip:'For two identical resistors in parallel, halve the value. It is the fastest route and it is fully creditworthy.' },
    { q:'Calculate the current drawn from the battery.', marks:3,
      ms:['Total resistance = 4 + 3 = 7 Ω','I = V / R = 12 / 7','= 1.7 A (2 s.f.)'],
      tip:'Add series resistances first, then apply V = IR to the whole circuit.' },
    { q:'Calculate the voltage across the 4 Ω resistor.', marks:2,
      ms:['V = I × R = 1.7 × 4','= 6.9 V (allow 6.86 V)'],
      tip:'The current through a series component is the full circuit current. Carry your unrounded value through to avoid drift.' },
    { q:'Explain why household lighting circuits are wired in parallel rather than in series.', marks:3,
      ms:['Each lamp gets the full mains voltage so it operates at normal brightness',
          'If one lamp fails the others stay on, because each branch is a separate path',
          'Each lamp can be switched on and off independently'],
      tip:'Three distinct reasons for three marks. Do not repeat the same idea in different words.' }
  ]},

{ s:2, title:'Mains electricity and safety', context:
  'An electric kettle is rated at 2300 W and runs from a 230 V mains supply.',
  parts:[
    { q:'Calculate the current in the kettle when it is working normally.', marks:2,
      ms:['I = P / V = 2300 / 230','= 10 A'],
      tip:'Rearrange P = IV. Keep the numbers tidy — this one divides exactly.' },
    { q:'Fuses of 3 A, 5 A and 13 A are available. State which should be fitted and explain why.', marks:2,
      ms:['13 A','It is the next rating above the normal operating current of 10 A, so the fuse carries the working current without melting but still blows if a fault causes a larger current'],
      tip:'Always pick the next standard rating above the working current. A 5 A fuse would blow every time the kettle was used.' },
    { q:'Calculate the energy transferred when the kettle runs for 3 minutes.', marks:3,
      ms:['t = 3 × 60 = 180 s','E = P × t = 2300 × 180','= 414 000 J'],
      tip:'Convert minutes to seconds first. Forgetting this is one of the most common errors on the paper.' },
    { q:'The kettle has a metal case connected to the earth wire. Explain how this protects the user.', marks:3,
      ms:['If the live wire touches the metal case, the case would become live',
          'The earth wire provides a low-resistance path to the ground, so a very large current flows',
          'This melts the fuse, breaking the live connection and isolating the appliance'],
      tip:'The earth wire alone does not make it safe — it works together with the fuse. Say so.' }
  ]},

{ s:2, title:'Current–voltage characteristics', context:
  'A student investigates how the current through a filament lamp varies with the voltage across it.',
  parts:[
    { q:'Draw and describe the shape of the current–voltage graph obtained.', marks:2,
      ms:['An S-shaped curve passing through the origin','The gradient decreases as voltage increases (the curve flattens)'],
      tip:'Sketch it symmetrically through the origin — the lamp behaves the same way whichever direction the current flows.' },
    { q:'Explain the shape of the graph.', marks:3,
      ms:['As current increases, the filament gets hotter',
          'The metal ions vibrate more, so electrons collide with them more often',
          'The resistance therefore increases, so current rises less steeply than voltage'],
      tip:'Link temperature to ion vibration to collisions to resistance. "It heats up" alone is one mark at best.' },
    { q:'State how the resistance of a thermistor changes as its temperature rises, and give one use.', marks:2,
      ms:['The resistance decreases','Used as a temperature sensor, e.g. in a thermostat, fire alarm or oven controller'],
      tip:'Thermistor: temperature up, resistance down. LDR: light up, resistance down. Learn both together.' }
  ]},

{ s:3, title:'Wave properties and the wave equation', context:
  'A water wave has a wavelength of 2.5 m. Twelve complete waves pass a fixed post in 30 s.',
  parts:[
    { q:'Calculate the frequency of the wave.', marks:2,
      ms:['f = number of waves ÷ time = 12 / 30','= 0.4 Hz'],
      tip:'Frequency is waves per second. You can also get it from f = 1/T with T = 2.5 s.' },
    { q:'Calculate the speed of the wave.', marks:2,
      ms:['v = f × λ = 0.4 × 2.5','= 1.0 m/s'],
      tip:'Check the units multiply correctly: Hz × m = m/s.' },
    { q:'The waves pass into shallower water and slow down. State what happens to the frequency and to the wavelength.', marks:2,
      ms:['The frequency stays the same','The wavelength decreases'],
      tip:'Frequency is fixed by the source and never changes at a boundary. It is the wavelength that adjusts.' },
    { q:'Explain the difference between a transverse and a longitudinal wave, giving one example of each.', marks:3,
      ms:['Transverse: the oscillations are at right angles to the direction of energy transfer, e.g. light or water waves',
          'Longitudinal: the oscillations are parallel to the direction of energy transfer, e.g. sound',
          'Longitudinal waves consist of compressions and rarefactions'],
      tip:'Say "direction of energy transfer", not "direction the wave moves in" — the examiner wants the precise phrasing.' }
  ]},

{ s:3, title:'Refraction and total internal reflection', context:
  'A ray of light travels from air into a glass block. The angle of incidence is 40° and the angle of refraction is 25°.',
  parts:[
    { q:'Calculate the refractive index of the glass.', marks:3,
      ms:['n = sin i / sin r','= sin 40 / sin 25 = 0.643 / 0.423','= 1.52'],
      tip:'Refractive index has no unit and must come out greater than 1. If yours is below 1, you have the angles the wrong way round.' },
    { q:'Calculate the critical angle for this glass.', marks:3,
      ms:['sin c = 1 / n = 1 / 1.52','sin c = 0.658','c = 41°'],
      tip:'Remember the inverse sine at the end. Check your calculator is in degrees.' },
    { q:'Explain how light is carried along an optical fibre.', marks:3,
      ms:['Light strikes the boundary at an angle of incidence greater than the critical angle',
          'It is totally internally reflected rather than refracting out',
          'It repeatedly reflects along the fibre, so almost no light escapes and the signal travels a long distance'],
      tip:'Both conditions must be stated: going from denser to less dense, and above the critical angle.' },
    { q:'State one advantage of using optical fibres rather than copper cables for communication.', marks:1,
      ms:['They carry far more information / lose less signal over distance / are not affected by electrical interference'],
      tip:'Any one clear advantage will do. Keep it specific.' }
  ]},

{ s:3, title:'The electromagnetic spectrum', context:
  'The electromagnetic spectrum is a family of transverse waves that all travel at the same speed in a vacuum.',
  parts:[
    { q:'List the seven regions of the electromagnetic spectrum in order of increasing frequency.', marks:2,
      ms:['Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma','All seven in the correct order'],
      tip:'Make up a mnemonic and write the list out in the margin at the start of the exam.' },
    { q:'A radio wave has a frequency of 200 kHz. Calculate its wavelength. (speed of EM waves = 3 × 10⁸ m/s)', marks:3,
      ms:['f = 200 000 Hz','λ = v / f = 3 × 10⁸ / 2 × 10⁵','= 1500 m'],
      tip:'Convert kHz to Hz before substituting. Standard form keeps this tidy.' },
    { q:'Describe one use and one danger for each of ultraviolet and microwave radiation.', marks:4,
      ms:['UV use: fluorescent lamps, security marking or sun beds','UV danger: skin cancer, eye damage or premature skin ageing',
          'Microwave use: cooking food or satellite and mobile phone communication','Microwave danger: internal heating of body tissue'],
      tip:'Four separate marks — answer all four parts explicitly rather than writing one general paragraph.' }
  ]},

{ s:4, title:'Energy transfers on a slide', context:
  'A child of mass 30 kg slides down a slide of vertical height 2.5 m. She reaches the bottom at 5.0 m/s. Take g = 10 N/kg.',
  parts:[
    { q:'Calculate the gravitational potential energy she loses.', marks:2,
      ms:['GPE = m × g × h = 30 × 10 × 2.5','= 750 J'],
      tip:'h is the vertical height, not the length of the slide.' },
    { q:'Calculate her kinetic energy at the bottom.', marks:2,
      ms:['KE = ½ m v² = 0.5 × 30 × 5.0²','= 375 J'],
      tip:'Square the speed before multiplying. 0.5 × 30 × 25, not (0.5 × 30 × 5)².' },
    { q:'Explain why the two answers are different.', marks:2,
      ms:['Energy is transferred to the thermal store by friction between the child and the slide (and by air resistance)',
          'This energy is dissipated to the surroundings, so it is not transferred to the kinetic store'],
      tip:'Energy is never "lost" — it is dissipated or transferred to the surroundings. Use that wording.' },
    { q:'Calculate the efficiency of the slide in transferring GPE to KE.', marks:2,
      ms:['efficiency = (375 / 750) × 100','= 50%'],
      tip:'Useful output over total input. An answer above 100% means you divided the wrong way round.' }
  ]},

{ s:4, title:'Reducing heat loss from a house', context:
  'A homeowner wants to reduce the energy wasted from her house in winter.',
  parts:[
    { q:'Explain how loft insulation reduces energy transfer.', marks:3,
      ms:['The insulation traps pockets of air',
          'Air is a poor conductor, so conduction through the roof is reduced',
          'The trapped air cannot circulate, so convection currents are also reduced'],
      tip:'Two mechanisms, conduction and convection, both need naming for full marks.' },
    { q:'Explain why shiny foil placed behind a radiator helps.', marks:2,
      ms:['A shiny surface is a good reflector of infrared radiation',
          'It reflects the radiation back into the room instead of it being absorbed by the wall'],
      tip:'Radiation only. Foil does nothing useful for conduction or convection here.' },
    { q:'Describe how you would investigate which surface is the best emitter of infrared radiation.', marks:4,
      ms:['Fill a Leslie cube with hot water and place it on a mat',
          'Hold an infrared detector a fixed distance from one face and record the reading',
          'Repeat for the matt black, shiny black, matt white and shiny silver faces at the same distance',
          'Control the water temperature and the distance; matt black gives the highest reading'],
      tip:'The examiner is looking for the controlled variable — the same distance every time — as much as for the method.' }
  ]},

{ s:4, title:'Generating electricity', context:
  'A country is choosing between building a new gas-fired power station and a wind farm of the same output.',
  parts:[
    { q:'Describe the energy transfers in a gas-fired power station.', marks:3,
      ms:['Chemical energy in the gas is transferred to thermal energy by burning',
          'The thermal energy boils water to make steam, which turns a turbine (kinetic)',
          'The turbine drives a generator, which transfers energy electrically'],
      tip:'Follow the chain in order: chemical → thermal → kinetic → electrical.' },
    { q:'Give two advantages and two disadvantages of the wind farm compared with the gas station.', marks:4,
      ms:['Advantage: no fuel cost, and no carbon dioxide released in use',
          'Advantage: the resource is renewable and will not run out',
          'Disadvantage: output is unreliable because it depends on the wind',
          'Disadvantage: high set-up cost, visual impact and noise, and many turbines are needed for the same output'],
      tip:'Balanced evaluation questions want distinct points on both sides. Avoid vague answers like "it is better for the environment".' },
    { q:'Explain why electricity is transmitted across the National Grid at very high voltage.', marks:3,
      ms:['For a given power, a higher voltage means a smaller current',
          'Energy wasted heating the cables depends on the square of the current',
          'So a smaller current means far less energy dissipated, making transmission more efficient'],
      tip:'The step-up transformer raises voltage and lowers current. That current reduction is the whole point.' }
  ]}

);
