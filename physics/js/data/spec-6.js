SPEC.sections.push({
  id: 6,
  title: 'Magnetism and electromagnetism',
  colour: '#ff5ec7',
  blurb: 'Magnetic fields, electromagnets, the motor effect and Fleming’s left-hand rule, electromagnetic induction, generators and transformers. Practise the two hand rules until they are automatic.',
  topics: [

  { id:'6a', title:'Units', points:[
    { n:'6.1', t:'Use the following units: ampere (A), volt (V), watt (W).',
      note:'Transformer questions combine these three, so keep P = I × V to hand.' }
  ]},

  { id:'6b', title:'Magnetism', points:[
    { n:'6.2', t:'Understand that magnets repel and attract other magnets, and attract magnetic substances.',
      note:'Like poles repel, unlike poles attract. Only repulsion proves that something is a magnet, because a magnet also attracts unmagnetised magnetic material.' },
    { n:'6.3', t:'Describe the properties of magnetically hard and soft materials.',
      note:'Magnetically soft (iron): easily magnetised and easily demagnetised, so it is used for electromagnet and transformer cores. Magnetically hard (steel): harder to magnetise but keeps its magnetism, so it is used for permanent magnets.' },
    { n:'6.4', t:'Understand the term magnetic field line.',
      note:'A field line shows the direction of the force on a north pole at that point. Lines go from north to south outside the magnet, never cross, and are closer together where the field is stronger.' },
    { n:'6.5', t:'Know that magnetism is induced in some materials when they are placed in a magnetic field.',
      note:'A nearby magnet induces poles in a piece of iron — the closest end becomes the opposite pole, so it is attracted. This is how a chain of paper clips hangs from a magnet.' },
    { n:'6.6', t:'Practical: investigate the magnetic field pattern for a permanent bar magnet and between two bar magnets.',
      cp:true,
      note:'Use a plotting compass around the magnet, marking the direction at each position and joining the dots, or sprinkle iron filings over paper on top of the magnet. Between unlike poles the lines run straight across; between like poles there is a neutral point where the fields cancel.' },
    { n:'6.7', t:'Describe how to use two permanent magnets to produce a uniform magnetic field pattern.',
      note:'Place a north pole facing a south pole with a gap between them. The field between the poles is uniform: evenly spaced parallel lines running from N to S.' }
  ]},

  { id:'6c', title:'Electromagnetism', points:[
    { n:'6.8', t:'Understand that an electric current in a conductor produces a magnetic field round it.',
      note:'The field around a straight wire is a set of concentric circles. Use the right-hand grip rule: thumb points along the conventional current, fingers curl in the direction of the field.' },
    { n:'6.9', t:'Describe the construction of electromagnets.',
      note:'A coil (solenoid) of insulated wire wound round a soft iron core. The field of a solenoid looks like that of a bar magnet. Strength increases with more turns, more current, or a soft iron core. An electromagnet can be switched off, which a permanent magnet cannot.' },
    { n:'6.10', t:'Sketch and recognise magnetic field patterns for a straight wire, a flat circular coil and a solenoid, and know how the field is affected by the magnitude and direction of the current.',
      note:'Reverse the current and the field reverses. Increase the current and the field gets stronger, so the lines are drawn closer together.' },
    { n:'6.11', t:'Understand that a force is exerted on a current-carrying wire in a magnetic field, and how this leads to the turning effect in an electric motor.',
      note:'This is the motor effect. In a d.c. motor the two sides of the coil carry current in opposite directions, so they feel forces in opposite directions and the coil rotates. A split-ring commutator reverses the current every half turn to keep it spinning the same way.' },
    { n:'6.12', t:'Use the left-hand rule to predict the direction of the resulting force when a wire carries a current perpendicular to a magnetic field.',
      note:'Fleming’s left-hand rule, using your left hand: First finger = Field (N to S), seCond finger = Current (conventional, + to −), thuMb = Motion (force). The force is zero when the wire is parallel to the field.' },
    { n:'6.13', t:'Describe how the force on a current-carrying conductor in a magnetic field changes with the magnitude and direction of the field and the current.',
      note:'Force increases with a stronger field or a larger current. Reversing either one reverses the force; reversing both leaves it unchanged.' },
    { n:'6.14', t:'Know and use the relationship between force, magnetic flux density, current and length.', p2:true,
      eq:'force = magnetic flux density × current × length   (F = B × I × l)',
      note:'B is measured in tesla (T), l is the length of wire in the field in metres. Valid when the wire is at 90° to the field.' },
    { n:'6.15', t:'Explain how a loudspeaker works.', p2:true,
      note:'An a.c. signal passes through a coil attached to the cone and sitting in a permanent magnetic field. The motor effect pushes the coil back and forth as the current reverses, the cone vibrates, and it makes sound waves in the air at the same frequency as the signal.' }
  ]},

  { id:'6d', title:'Electromagnetic induction', points:[
    { n:'6.16', t:'Know that a voltage is induced in a conductor or a coil when it moves through a magnetic field or when a magnetic field changes through it, and describe the factors which affect the size of the induced voltage.',
      note:'The generator effect. There must be relative movement or a changing field — a stationary magnet in a stationary coil induces nothing. Bigger voltage from: faster movement, a stronger magnet, more turns on the coil, or a larger area. Reversing the direction of motion reverses the voltage.' },
    { n:'6.17', t:'Practical: investigate electromagnetic induction.',
      cp:true,
      note:'Move a bar magnet in and out of a coil connected to a sensitive centre-zero galvanometer. The needle deflects while moving and returns to zero when still, and deflects the other way when the magnet is pulled out or the poles are swapped.' },
    { n:'6.18', t:'Describe the generation of electricity by the rotation of a magnet within a coil of wire and of a coil of wire within a magnetic field, and describe the factors which affect the size of the induced voltage.',
      note:'An a.c. generator uses slip rings so the output alternates. The output trace on an oscilloscope has a larger amplitude and a higher frequency if the coil spins faster.' },
    { n:'6.19', t:'Describe the structure of a transformer, and understand that a transformer changes the size of an alternating voltage.',
      note:'A primary coil and a secondary coil wound on a soft iron core. The a.c. in the primary creates a changing magnetic field in the core, which induces an alternating voltage in the secondary. Transformers only work with a.c., because d.c. gives a steady field with no change to induce a voltage.' },
    { n:'6.20', t:'Know and use the relationship between input (primary) and output (secondary) voltages and the turns ratio for a transformer.',
      eq:'V_p / V_s = n_p / n_s',
      note:'Step-up: more turns on the secondary, so a higher output voltage. Step-down: fewer turns on the secondary. Keep primary quantities on the same side of the equation.' },
    { n:'6.21', t:'Know and use the relationship for 100% efficiency in a transformer.',
      eq:'V_p × I_p = V_s × I_s',
      note:'Power in equals power out for an ideal transformer, so when the voltage is stepped up the current is stepped down by the same factor.' },
    { n:'6.22', t:'Understand why, in the National Grid, electricity is transmitted at high voltage.',
      note:'High voltage means low current for the same power. Energy wasted heating the cables is I²R, so halving the current cuts the losses to a quarter. That makes transmission far more efficient.' }
  ]}

]});
