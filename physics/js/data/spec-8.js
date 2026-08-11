SPEC.sections.push({
  id: 8,
  title: 'Astrophysics',
  colour: '#8ab4ff',
  blurb: 'Gravity and orbits, orbital speed, the life cycle of stars, classifying stars, red shift and the Big Bang. Short section, and the definitions are very learnable.',
  topics: [

  { id:'8a', title:'Units', points:[
    { n:'8.1', t:'Use the following units: kilogram (kg), metre (m), metre/second (m/s), metre/second² (m/s²), newton (N), second (s), kilometre (km), newton per kilogram (N/kg).',
      note:'Astronomical distances are huge, so answers often need standard form. 1 km = 1000 m; 1 light-year is the distance light travels in a year.' }
  ]},

  { id:'8b', title:'Motion in the universe', points:[
    { n:'8.2', t:'Know that the Universe is made up of many galaxies and that our Solar System is in the Milky Way galaxy.',
      note:'Order of scale: moons orbit planets, planets orbit stars, stars sit in galaxies, galaxies group into clusters, and clusters make up the Universe.' },
    { n:'8.3', t:'Know the names of the eight planets in the Solar System in order from the Sun, and know that comets and asteroids are also part of the Solar System.',
      note:'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Asteroids mostly lie in a belt between Mars and Jupiter. Comets have highly elliptical orbits that bring them close to the Sun and take them far beyond the planets.' },
    { n:'8.4', t:'Understand the difference between a moon, a planet, a star and a galaxy.',
      note:'A star emits its own light because of fusion. A planet orbits a star and only reflects light. A moon is a natural satellite orbiting a planet. A galaxy is an enormous collection of stars held together by gravity.' },
    { n:'8.5', t:'Understand gravitational field strength g and recall that it is different on other bodies in the Solar System.',
      note:'g is the force of gravity per kilogram of mass, in N/kg. It is about 10 N/kg on Earth, about 1.6 on the Moon and about 25 on Jupiter. Larger mass and smaller radius both mean larger g.' },
    { n:'8.6', t:'Explain that gravitational force causes moons to orbit planets, the planets to orbit the Sun, artificial satellites to orbit the Earth, and comets to orbit the Sun.',
      note:'Gravity provides the centripetal force, always directed towards the centre of the orbit. Because the force is perpendicular to the velocity, the speed stays constant but the direction constantly changes — so an orbiting body is accelerating even at constant speed.' },
    { n:'8.7', t:'Understand that gravitational field strength varies and is different on other planets and stars, and that the orbital speed of a planet depends on its distance from the Sun.',
      note:'Planets closer to the Sun feel a stronger gravitational force, orbit faster and have shorter years. Mercury takes 88 days, Neptune about 165 years.' },
    { n:'8.8', t:'Use the relationship between orbital speed, orbital radius and time period.',
      eq:'orbital speed = (2 × π × orbital radius) ÷ time period   (v = 2πr / T)',
      note:'2πr is the circumference of the orbit and T is the time for one full orbit. Convert T to seconds — days × 24 × 3600.' },
    { n:'8.9', t:'Describe the changes in the orbital speed of a comet as it orbits the Sun.',
      note:'A comet’s orbit is highly elliptical. Close to the Sun the gravitational force is larger, so it speeds up and moves fastest at its closest point; far away the force is weaker and it moves slowly. In energy terms it converts gravitational potential energy to kinetic energy as it falls inwards.' }
  ]},

  { id:'8c', title:'Stellar evolution', points:[
    { n:'8.10', t:'Describe the evolution of stars of similar mass to the Sun through the following stages: nebula, star (main sequence), red giant, white dwarf.',
      note:'A nebula of dust and gas is pulled together by gravity into a protostar. When it is hot and dense enough, fusion starts and it becomes a main sequence star, stable because the outward pressure from fusion balances the inward pull of gravity. When the hydrogen runs out it swells into a red giant, then sheds its outer layers and leaves a hot dense white dwarf that slowly cools.' },
    { n:'8.11', t:'Describe how the evolution of stars with a mass far greater than that of the Sun is different, and may end in a supernova, forming a neutron star or a black hole.',
      note:'Massive star: nebula → protostar → main sequence → red supergiant → supernova (a huge explosion) → neutron star, or a black hole if the star was massive enough. Supernovae scatter the heavier elements that later planets are made from.' },
    { n:'8.12', t:'Describe the classification of stars in terms of their colour, temperature and luminosity.',
      note:'On a temperature–luminosity (Hertzsprung–Russell) diagram, main sequence stars run in a diagonal band from hot, bright, blue stars down to cool, dim, red ones. Red giants sit above the main sequence — cool but very bright because they are huge. White dwarfs sit below — hot but dim because they are tiny. Blue means hot, red means cool.' }
  ]},

  { id:'8d', title:'Cosmology', points:[
    { n:'8.13', t:'Describe the past evolution of the Universe and the main arguments in favour of the Big Bang.',
      note:'The Universe began about 13.8 billion years ago from an extremely hot, dense point and has been expanding and cooling ever since. The two key pieces of evidence are the red shift of distant galaxies and the cosmic microwave background radiation.' },
    { n:'8.14', t:'Describe evidence that supports the Big Bang theory, including red shift and cosmic microwave background radiation.',
      note:'Light from distant galaxies is shifted towards the red (longer wavelength, lower frequency) end of the spectrum, which shows they are moving away from us. CMB radiation fills the whole sky and is the cooled-down leftover heat of the early Universe, which only the Big Bang theory predicts.' },
    { n:'8.15', t:'Understand that the Universe is expanding and that this supports the Big Bang theory.',
      note:'Almost every galaxy is moving away from us, and the further away it is, the faster it recedes. That is what you would see if space itself is expanding everywhere — no galaxy is at the centre.' },
    { n:'8.16', t:'Explain the red shift of light from distant galaxies and how it provides evidence for an expanding Universe.',
      note:'This is the Doppler effect for light: a source moving away stretches the waves, so the wavelength increases and the frequency falls. Larger red shift means faster recession. The same effect makes a passing siren drop in pitch.' },
    { n:'8.17', t:'Use the relationship between the speed of recession of a galaxy, the Hubble constant and distance.',
      eq:'speed of recession = Hubble constant × distance   (v = H₀ × d)',
      note:'H₀ is roughly 2.2 × 10⁻¹⁸ per second. Keep distances in metres and speeds in m/s.' },
    { n:'8.18', t:'Describe how the Hubble constant can be used to estimate the age of the Universe.',
      note:'Age ≈ 1 / H₀. With H₀ ≈ 2.2 × 10⁻¹⁸ s⁻¹ this gives about 4.5 × 10¹⁷ s, which is roughly 14 billion years.' },
    { n:'8.19', t:'Describe uncertainties in the current models of the Universe, including the difficulty of measuring the Hubble constant.',
      note:'Measuring the distance to very distant galaxies is hard, so H₀ carries a large uncertainty, which makes the estimated age uncertain too. Current models also cannot explain dark matter or the observed accelerating expansion attributed to dark energy.' }
  ]}

]});
