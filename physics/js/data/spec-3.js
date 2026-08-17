SPEC.sections.push({
  id: 3,
  title: 'Waves',
  colour: '#b79bff',
  blurb: 'Wave properties and the wave equation, the electromagnetic spectrum, reflection and refraction, total internal reflection, and sound. Lots of ray diagrams — practise drawing them with a ruler.',
  topics: [

  { id:'3a', title:'Units', points:[
    { n:'3.1', t:'Use the following units: degree (°), hertz (Hz), metre (m), metre/second (m/s), second (s).',
      note:'Frequency in Hz (waves per second), wavelength in m, wave speed in m/s, angles in degrees. Convert kHz and MHz to Hz before using v = f × λ.' }
  ]},

  { id:'3b', title:'Properties of waves', points:[
    { n:'3.2', t:'Explain the difference between longitudinal and transverse waves.',
      note:'Transverse: vibrations are perpendicular to the direction of energy transfer (light, all EM waves, water ripples, waves on a rope). Longitudinal: vibrations are parallel to the direction of energy transfer, giving compressions and rarefactions (sound, ultrasound, P-waves).' },
    { n:'3.3', t:'Know the definitions of amplitude, wavefront, frequency, wavelength and period of a wave.',
      note:'Amplitude: maximum displacement from the rest position. Wavelength: distance between two adjacent identical points, e.g. crest to crest. Frequency: number of complete waves passing a point per second. Period: time for one complete wave. Wavefront: a line joining points that are all in phase, e.g. a line of crests.' },
    { n:'3.4', t:'Know that waves transfer energy and information without transferring matter.',
      note:'The particles of the medium only oscillate about a fixed position; a floating cork on a water wave bobs up and down but does not travel along with the wave.' },
    { n:'3.5', t:'Know and use the relationship between the speed, frequency and wavelength of a wave.',
      eq:'wave speed = frequency × wavelength   (v = f × λ)',
      note:'The most used equation in this section. Check units: Hz × m gives m/s.' },
    { n:'3.6', t:'Use the relationship between frequency and time period.',
      eq:'frequency = 1 ÷ time period   (f = 1 / T)',
      note:'A 0.02 s period gives a frequency of 50 Hz. Also useful for reading periods off oscilloscope traces.' },
    { n:'3.7', t:'Use the above relationships in different contexts including sound waves and electromagnetic waves.',
      note:'All EM waves travel at 3 × 10⁸ m/s in a vacuum. Sound travels at about 340 m/s in air, faster in liquids and faster still in solids.' },
    { n:'3.8', t:'Understand that waves can be diffracted when they pass an edge or through a gap.',
      note:'Diffraction is the spreading out of waves through a gap or around an obstacle. Spreading is greatest when the gap size is about the same as the wavelength.' },
    { n:'3.9', t:'Understand that waves can be reflected and refracted at the boundary between two media.',
      note:'Reflection: the wave bounces back, angle of incidence = angle of reflection. Refraction: the wave changes speed and so changes direction when it enters a new medium at an angle.' },
    { n:'3.10', t:'Understand that waves can be refracted due to a change of speed, and that this may cause a change of direction.',
      note:'Entering a denser medium: the wave slows, the wavelength shortens, and the ray bends towards the normal. Leaving a denser medium: it speeds up and bends away from the normal. Frequency never changes during refraction.' }
  ]},

  { id:'3c', title:'The electromagnetic spectrum', points:[
    { n:'3.11', t:'Know that light is part of a continuous electromagnetic spectrum which includes radio, microwave, infrared, visible, ultraviolet, X-ray and gamma-ray radiations, and that all these waves travel at the same speed in free space.',
      note:'Order from longest wavelength / lowest frequency to shortest wavelength / highest frequency: Radio, Microwave, Infrared, Visible, Ultraviolet, X-ray, Gamma. All travel at 3 × 10⁸ m/s in a vacuum.' },
    { n:'3.12', t:'Identify the order of the electromagnetic spectrum in terms of decreasing wavelength and increasing frequency, including the colours of the visible spectrum.',
      note:'Visible spectrum from longest to shortest wavelength: red, orange, yellow, green, blue, indigo, violet. Red is next to infrared, violet is next to ultraviolet.' },
    { n:'3.13', t:'Explain some of the uses of electromagnetic radiations.',
      note:'Radio: broadcasting and communications. Microwave: cooking and satellite transmissions. Infrared: heaters, night-vision, remote controls, optical fibres. Visible: vision and photography. Ultraviolet: fluorescent lamps, security marking, sun beds. X-ray: seeing inside the body and inside objects such as luggage. Gamma: sterilising food and equipment, and treating cancer.' },
    { n:'3.14', t:'Explain the detrimental effects of excessive exposure of the human body to electromagnetic waves, and describe simple protective measures.',
      note:'Microwaves: internal heating of body tissue. Infrared: skin burns. Ultraviolet: skin cancer, damage to eyes, premature ageing. X-rays and gamma: ionising, so they can mutate DNA and cause cancer. Protection: sunscreen and sunglasses, lead aprons and screens, and limiting exposure time.' }
  ]},

  { id:'3d', title:'Light and sound', points:[
    { n:'3.15', t:'Know that light waves are transverse waves which can be reflected, refracted and diffracted.',
      note:'Light shows all wave behaviour, which is the evidence that it is a wave.' },
    { n:'3.16', t:'Use the law of reflection (the angle of incidence equals the angle of reflection).',
      note:'Both angles are measured from the normal, which is the dashed line at 90° to the surface — never from the surface itself.' },
    { n:'3.17', t:'Draw ray diagrams to illustrate reflection and refraction.',
      note:'Use a sharp pencil and a ruler, add an arrow to show the direction of travel, draw the normal as a dashed line, and label the angles.' },
    { n:'3.18', t:'Construct ray diagrams to illustrate the formation of an image by a plane mirror.',
      note:'The image in a plane mirror is virtual, upright, the same size as the object, laterally inverted, and as far behind the mirror as the object is in front. Draw the reflected rays as solid lines and extend them back behind the mirror as dashed lines to locate the image.' },
    { n:'3.19', t:'Describe experiments to investigate the refraction of light through rectangular blocks, including the measurement of the angles of incidence and refraction.',
      cp:true,
      note:'Draw round the block, shine a ray in, mark the entry and exit points with crosses, remove the block and join the crosses. Measure both angles from the normal with a protractor and repeat for several angles of incidence.' },
    { n:'3.20', t:'Know and use the relationship between refractive index, angle of incidence and angle of refraction.',
      eq:'refractive index = sin i ÷ sin r   (n = sin i / sin r)',
      note:'i is in air, r is in the denser medium. Refractive index has no units and is always greater than 1. Make sure your calculator is in degrees.' },
    { n:'3.21', t:'Describe an experiment to investigate the refractive index of glass using a glass block.',
      cp:true,
      note:'Measure pairs of i and r for several angles, then either work out n = sin i / sin r each time and take the mean, or plot sin i against sin r and take the gradient.' },
    { n:'3.22', t:'Describe the role of total internal reflection in transmitting information along optical fibres and in prisms.',
      note:'Light hits the boundary at more than the critical angle so it is totally internally reflected and stays inside the fibre, letting it carry data over long distances with little loss. Prisms use 45° total internal reflection in periscopes and binoculars.' },
    { n:'3.23', t:'Explain the meaning of critical angle c.',
      note:'The critical angle is the angle of incidence inside the denser medium at which the angle of refraction is exactly 90°. Below c the light mostly refracts out; above c it is all reflected back inside.' },
    { n:'3.24', t:'Know and use the relationship between critical angle and refractive index.',
      eq:'sin c = 1 ÷ n',
      note:'For glass with n = 1.5, sin c = 0.667 so c ≈ 42°. Total internal reflection needs light going from a denser to a less dense medium, at an angle greater than c.' },
    { n:'3.25', t:'Know that sound waves are longitudinal waves which can be reflected, refracted and diffracted.',
      note:'Sound needs a medium, so it cannot travel through a vacuum. Reflected sound is an echo.' },
    { n:'3.26', t:'Know the range of frequencies audible to humans is 20 Hz to 20 000 Hz.',
      note:'Above 20 000 Hz is ultrasound. The upper limit falls with age.' },
    { n:'3.27', t:'Understand how an oscilloscope and microphone can be used to display a sound wave.',
      note:'The microphone converts sound to an electrical signal that the oscilloscope displays as a transverse-looking trace. Bigger amplitude means louder; higher frequency (waves closer together) means higher pitch.' },
    { n:'3.28', t:'Describe an experiment to measure the speed of sound in air.',
      cp:true,
      note:'Two students stand a measured distance apart; one bangs cymbals, the other times from seeing the bang to hearing it, and speed = distance ÷ time. Better: use two microphones a fixed distance apart connected to a timer, which removes reaction-time error. Repeat and take a mean.' },
    { n:'3.29', t:'Understand how the pitch and loudness of a sound relate to the frequency and amplitude of the wave.',
      note:'Pitch depends on frequency; loudness depends on amplitude. Do not mix these up.' }
  ]}

]});
