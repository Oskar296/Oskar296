SPEC.sections.push({
  id: 7,
  title: 'Radioactivity and particles',
  colour: '#57e6a8',
  blurb: 'Atomic structure, background radiation, the three types of ionising radiation, nuclear equations, half-life, safety and uses, plus fission and fusion. Nuclear equations are free marks once you can balance them.',
  topics: [

  { id:'7a', title:'Units', points:[
    { n:'7.1', t:'Use the following unit: becquerel (Bq).',
      note:'1 Bq = one nuclear decay per second. Activity is measured in Bq, and count rate is what a detector actually records.' }
  ]},

  { id:'7b', title:'Radioactivity', points:[
    { n:'7.2', t:'Describe the structure of an atom in terms of protons, neutrons and electrons, and use symbols such as ¹⁴₆C to describe particular nuclei.',
      note:'Protons and neutrons are in the nucleus; electrons orbit in shells. In the notation, the top number is the mass number A (protons + neutrons) and the bottom number is the atomic number Z (protons). Neutrons = A − Z.' },
    { n:'7.3', t:'Know the terms atomic (proton) number, mass (nucleon) number and isotope.',
      note:'Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. They behave identically chemically but can differ in nuclear stability.' },
    { n:'7.4', t:'Know that atoms may be represented in terms of their atomic and mass numbers and the relative masses and charges of protons, neutrons and electrons.',
      note:'Proton: relative mass 1, charge +1. Neutron: relative mass 1, charge 0. Electron: relative mass 1/1836 (effectively 0), charge −1. A neutral atom has equal numbers of protons and electrons.' },
    { n:'7.5', t:'Describe the results of Geiger and Marsden’s alpha particle scattering experiment and the evidence this provided for the nuclear atom.',
      note:'Most alpha particles passed straight through gold foil, so the atom is mostly empty space. A few were deflected through large angles and a very small number bounced back, so the positive charge and nearly all the mass are concentrated in a tiny dense nucleus.' },
    { n:'7.6', t:'Describe the nature of alpha and beta particles and gamma rays, and recall that they may be distinguished in terms of penetrating power and ability to ionise.',
      note:'Alpha: a helium nucleus, 2 protons + 2 neutrons, charge +2, strongly ionising, stopped by paper or a few cm of air. Beta: a fast electron from the nucleus, charge −1, moderately ionising, stopped by a few mm of aluminium. Gamma: an EM wave, no charge or mass, weakly ionising, reduced but never fully stopped by thick lead or concrete. Ionising power and penetrating power are opposites.' },
    { n:'7.7', t:'Describe the effects on the atomic and mass numbers of a nucleus of the emission of each of the three main types of radiation.',
      note:'Alpha decay: mass number −4, atomic number −2. Beta decay: mass number unchanged, atomic number +1 (a neutron turns into a proton and an electron). Gamma emission: neither number changes, the nucleus just loses energy.' },
    { n:'7.8', t:'Understand how to complete balanced nuclear equations in terms of mass and atomic numbers.',
      note:'The totals of the top numbers must match on both sides, and so must the totals of the bottom numbers. Alpha particle: ⁴₂He (or ⁴₂α). Beta particle: ⁰₋₁e (or ⁰₋₁β).' },
    { n:'7.9', t:'Understand how the emission of nuclear radiation can cause a change in the nucleus.',
      note:'Decay happens because the nucleus is unstable; emitting radiation moves it towards a more stable configuration. Alpha and beta decay change the element, gamma emission does not.' },
    { n:'7.10', t:'Describe the sources of background radiation.',
      note:'Natural: radon gas from rocks (the largest contributor in most places), rocks and soil, cosmic rays from space, food and drink. Artificial: medical X-rays and scans, nuclear industry and weapons fallout. Always subtract the background count rate before doing half-life work.' },
    { n:'7.11', t:'Know that radioactive decay is a random process and that the activity of a source decreases over a period of time.',
      note:'You cannot predict which nucleus will decay or when, only the probability. That is why count rates fluctuate and why repeat readings matter.' },
    { n:'7.12', t:'Know the definition of the term half-life and understand that it is different for different radioactive isotopes.',
      note:'Half-life is the average time taken for half the undecayed nuclei in a sample to decay, or for the activity to fall to half its original value. Half-lives range from fractions of a second to billions of years.' },
    { n:'7.13', t:'Use the concept of half-life to carry out simple calculations on activity, including graphical methods.',
      note:'Each half-life halves the activity: 100 → 50 → 25 → 12.5. To find a half-life from a graph, read off the time taken to drop from any value to half that value and repeat at a couple of places, then take a mean.' },
    { n:'7.14', t:'Describe the dangers of ionising radiation, including damage to cells and tissue, and the problems arising from the disposal of radioactive waste.',
      note:'Ionising radiation damages or kills cells, and can mutate DNA leading to cancer. Alpha is most dangerous inside the body because it is strongly ionising over a short range; beta and gamma are the bigger risk from outside because they penetrate the skin. High-level waste stays dangerous for thousands of years and has to be sealed and stored deep underground.' },
    { n:'7.15', t:'Explain the precautions taken to ensure the safe handling and storage of radioactive materials, and the safe management of radioactive waste.',
      note:'Handle with tongs or robotic arms, keep sources in lead-lined containers, point them away from people, limit exposure time, keep your distance, and use lead aprons, screens and monitoring badges.' },
    { n:'7.16', t:'Describe the uses of radioactivity in industry and medicine.',
      note:'Medical tracers (gamma, short half-life), radiotherapy for cancer (gamma), sterilising instruments and food (gamma), smoke alarms (alpha), thickness monitoring in a paper or foil mill (beta), leak detection in pipes (gamma tracer), and carbon dating of once-living material.' }
  ]},

  { id:'7c', title:'Fission and fusion', points:[
    { n:'7.17', t:'Describe the process of nuclear fission.', p2:true,
      note:'A slow-moving neutron is absorbed by a large unstable nucleus such as uranium-235, which splits into two smaller daughter nuclei, releasing two or three more neutrons and a large amount of energy.' },
    { n:'7.18', t:'Describe how a chain reaction is set up and controlled in a nuclear reactor.', p2:true,
      note:'The released neutrons go on to cause further fissions, giving a chain reaction. Control rods (boron or cadmium) absorb neutrons to keep the rate steady, and a moderator (graphite or water) slows the fast neutrons down so they are more likely to be absorbed and cause fission.' },
    { n:'7.19', t:'Describe the role of shielding around a nuclear reactor.', p2:true,
      note:'Thick concrete and steel absorb the radiation escaping from the core so workers and the public are not exposed.' },
    { n:'7.20', t:'Explain the difference between nuclear fusion and nuclear fission.', p2:true,
      note:'Fission splits a large nucleus into smaller ones. Fusion joins two small nuclei (such as hydrogen isotopes) into a larger one, releasing energy. Both convert a small amount of mass into a large amount of energy.' },
    { n:'7.21', t:'Describe nuclear fusion as the creation of larger nuclei from smaller nuclei, resulting in a loss of mass and a release of energy, and know that fusion is the energy source for stars.', p2:true,
      note:'In the Sun, hydrogen nuclei fuse into helium. The mass of the product is slightly less than the mass of the reactants, and that lost mass is released as energy.' },
    { n:'7.22', t:'Explain why nuclear fusion does not happen at low temperatures and pressures, due to electrostatic repulsion of protons.', p2:true,
      note:'Both nuclei are positive, so they repel each other. Only at extremely high temperature and pressure do they move fast enough to overcome that repulsion and get close enough to fuse — which is why a fusion power station on Earth is so hard to build.' }
  ]}

]});
