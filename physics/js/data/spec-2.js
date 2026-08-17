SPEC.sections.push({
  id: 2,
  title: 'Electricity',
  colour: '#ffcf6a',
  blurb: 'Mains safety, power and energy, circuits, current and voltage rules, resistance, and the current–voltage behaviour of components. Heavy on circuit reasoning and on the V = I × R family of calculations.',
  topics: [

  { id:'2a', title:'Units', points:[
    { n:'2.1', t:'Use the following units: ampere (A), coulomb (C), joule (J), ohm (Ω), second (s), volt (V), watt (W).',
      note:'Current in A, charge in C, energy in J, resistance in Ω, potential difference in V, power in W. Watch for mA (÷1000) and kW (×1000).' }
  ]},

  { id:'2b', title:'Mains electricity', points:[
    { n:'2.2', t:'Understand and identify the hazards of electricity including frayed cables, long cables, damaged plugs, water around sockets, and pushing metal objects into sockets.',
      note:'Each hazard question wants the hazard plus why it is dangerous: exposed live wire → electric shock; water → water conducts, completing a circuit through the person; overloaded socket → overheating and fire.' },
    { n:'2.3', t:'Understand the uses of insulation, double insulation, earthing, fuses and circuit breakers in a range of domestic appliances.',
      note:'Earth wire gives a low-resistance path to ground if the live wire touches a metal case, so a large current flows and the fuse blows, cutting the supply. Double-insulated appliances have plastic cases and need no earth wire. Circuit breakers do the same job as fuses but switch off faster and can be reset.' },
    { n:'2.4', t:'Understand that a current in a resistor results in the electrical transfer of energy and an increase in temperature, and how this can be used in a variety of domestic contexts.',
      note:'Electrons collide with the ions in the metal lattice, transferring energy to the thermal store. Useful in kettles, toasters, hair dryers, filament lamps and fuses; wasteful in cables and computers.' },
    { n:'2.5', t:'Know and use the relationship between power, current and voltage, and apply the relationship to the selection of appropriate fuses.',
      eq:'power = current × voltage   (P = I × V)',
      note:'To choose a fuse: work out the normal operating current with I = P ÷ V, then pick the next fuse rating above it (usually 3 A, 5 A or 13 A).' },
    { n:'2.6', t:'Use the relationship between energy transferred, current, voltage and time.',
      eq:'energy transferred = current × voltage × time   (E = I × V × t)',
      note:'Time must be in seconds for the answer to be in joules. This is just P = IV multiplied by time.' },
    { n:'2.7', t:'Understand the difference between mains electricity being alternating current (a.c.) and direct current (d.c.) supplied by a cell or battery.',
      note:'d.c. flows in one direction only; a.c. constantly reverses direction. UK mains is about 230 V at 50 Hz. On an oscilloscope, d.c. is a flat horizontal line and a.c. is a wave.' }
  ]},

  { id:'2c', title:'Energy and potential difference in circuits', points:[
    { n:'2.8', t:'Explain why a series or parallel circuit is more appropriate for particular applications, including domestic lighting.',
      note:'Series: one switch controls everything, and if one lamp breaks they all go out. Parallel: each branch gets the full supply voltage, components can be switched separately, and one failure does not affect the rest — which is why house lighting is wired in parallel.' },
    { n:'2.9', t:'Understand that the current in a series circuit depends on the applied voltage and the number and nature of other components.',
      note:'Adding more resistors in series increases total resistance, so current falls. Adding resistors in parallel decreases total resistance, so total current rises.' },
    { n:'2.10', t:'Describe how current varies with voltage in wires, resistors, metal filament lamps and diodes, and how this can be investigated.',
      cp:true,
      note:'Resistor at constant temperature: straight line through origin (constant resistance). Filament lamp: S-shaped curve that flattens, because the filament heats up and resistance increases. Diode: no current until the forward voltage is reached, and almost no current in reverse.' },
    { n:'2.11', t:'Describe the qualitative effect of changing resistance on the current in a circuit.',
      note:'For a fixed supply voltage, more resistance means less current. A variable resistor is used to change the current in an experiment.' },
    { n:'2.12', t:'Describe the qualitative variation of resistance of light-dependent resistors (LDRs) with illumination and of thermistors with temperature.',
      note:'LDR: brighter light → lower resistance. Thermistor: higher temperature → lower resistance. Both are used as sensors in potential divider circuits, for example in a fire alarm or a street light.' },
    { n:'2.13', t:'Know that lamps and LEDs can be used to indicate the presence of a current in a circuit.',
      note:'LEDs use much less power than filament lamps and only conduct one way round.' },
    { n:'2.14', t:'Know and use the relationship between voltage, current and resistance.',
      eq:'voltage = current × resistance   (V = I × R)',
      note:'The single most used equation in this section. Rearranged: I = V ÷ R and R = V ÷ I.' },
    { n:'2.15', t:'Understand that current is the rate of flow of charge.',
      note:'One amp is one coulomb of charge passing a point per second.' },
    { n:'2.16', t:'Know and use the relationship between charge, current and time.',
      eq:'charge = current × time   (Q = I × t)',
      note:'Time in seconds, charge in coulombs.' },
    { n:'2.17', t:'Know that electric current in solid metallic conductors is a flow of negatively charged electrons.',
      note:'Conventional current is drawn from + to −, but the electrons actually drift from − to +. Say "delocalised" or "free" electrons.' },
    { n:'2.18', t:'Understand that the current in a series circuit is the same everywhere, and that the current from the source is the sum of the currents in the separate branches of a parallel circuit.',
      note:'Series: I is the same at every point. Parallel: currents split at a junction and add back together, so I_total = I₁ + I₂.' },
    { n:'2.19', t:'Know that the voltage across components in parallel is the same, and that the sum of the voltages across components in series is the supply voltage.',
      note:'Series: V_supply = V₁ + V₂ + … Parallel: every branch has the full supply voltage across it.' },
    { n:'2.20', t:'Know that voltage is the energy transferred per unit charge passed and that the volt is a joule per coulomb.',
      eq:'energy transferred = charge × voltage   (E = Q × V)',
      note:'One volt means one joule of energy transferred per coulomb of charge. A 12 V supply gives 12 J to every coulomb.' },
    { n:'2.21', t:'Know how to connect and use an ammeter and a voltmeter.',
      note:'Ammeter in series with the component, and it has very low resistance. Voltmeter in parallel across the component, and it has very high resistance so it draws almost no current.' }
  ]},

  { id:'2d', title:'Electric charge', points:[
    { n:'2.22', t:'Identify common materials which are electrical conductors or insulators, including metals and plastics.',
      note:'Conductors (metals, graphite) have free electrons. Insulators (plastic, rubber, glass) do not, so charge stays where it is put.' },
    { n:'2.23', t:'Practical: investigate how insulating materials can be charged by friction.',
      cp:true,
      note:'Rub a polythene rod with a dry cloth and it gains electrons, becoming negative; rub an acetate rod and it loses electrons, becoming positive. Only electrons move — never say protons moved.' },
    { n:'2.24', t:'Explain that charging by friction involves a transfer of electrons.',
      note:'Friction rubs electrons from one material onto the other. The one that gains electrons is negative, the one that loses them is positive by an equal amount.' },
    { n:'2.25', t:'Explain that objects with like charges repel and objects with unlike charges attract.',
      note:'Like repels like; opposite charges attract. A charged object also attracts an uncharged one by inducing a separation of charge in it.' },
    { n:'2.26', t:'Explain electrostatic phenomena in terms of the movement of electrons.',
      note:'Common contexts: a balloon sticking to a wall, dust clinging to a screen, sparks when getting out of a car, crackling clothes. Explain all of them by electron transfer plus attraction or repulsion.' },
    { n:'2.27', t:'Explain the potential dangers of electrostatic charges, e.g. when fuelling aircraft and tankers.',
      note:'Charge builds up as fuel flows through a pipe. If enough builds up, a spark jumps and can ignite the fuel vapour, causing an explosion. Prevented by earthing the tanker with a bonding wire so charge flows safely away.' },
    { n:'2.28', t:'Explain some uses of electrostatic charges, e.g. in photocopiers and inkjet printers.',
      note:'Inkjet printer: droplets are charged then deflected by charged plates to land in the right place. Photocopier: a charged drum attracts oppositely charged toner powder in the pattern of the image.' }
  ]}

]});
