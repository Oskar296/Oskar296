/* Reference data: periodic table, IGCSE data sheet and flashcard decks. */

/* [symbol, name, relative atomic mass] indexed by proton number - 1.
   A dash means the element has no stable isotope with a listed Ar. */
window.ELEMENTS = [
  ["H", "Hydrogen", "1"], ["He", "Helium", "4"], ["Li", "Lithium", "7"], ["Be", "Beryllium", "9"],
  ["B", "Boron", "11"], ["C", "Carbon", "12"], ["N", "Nitrogen", "14"], ["O", "Oxygen", "16"],
  ["F", "Fluorine", "19"], ["Ne", "Neon", "20"], ["Na", "Sodium", "23"], ["Mg", "Magnesium", "24"],
  ["Al", "Aluminium", "27"], ["Si", "Silicon", "28"], ["P", "Phosphorus", "31"], ["S", "Sulfur", "32"],
  ["Cl", "Chlorine", "35.5"], ["Ar", "Argon", "40"], ["K", "Potassium", "39"], ["Ca", "Calcium", "40"],
  ["Sc", "Scandium", "45"], ["Ti", "Titanium", "48"], ["V", "Vanadium", "51"], ["Cr", "Chromium", "52"],
  ["Mn", "Manganese", "55"], ["Fe", "Iron", "56"], ["Co", "Cobalt", "59"], ["Ni", "Nickel", "59"],
  ["Cu", "Copper", "64"], ["Zn", "Zinc", "65"], ["Ga", "Gallium", "70"], ["Ge", "Germanium", "73"],
  ["As", "Arsenic", "75"], ["Se", "Selenium", "79"], ["Br", "Bromine", "80"], ["Kr", "Krypton", "84"],
  ["Rb", "Rubidium", "85"], ["Sr", "Strontium", "88"], ["Y", "Yttrium", "89"], ["Zr", "Zirconium", "91"],
  ["Nb", "Niobium", "93"], ["Mo", "Molybdenum", "96"], ["Tc", "Technetium", "-"], ["Ru", "Ruthenium", "101"],
  ["Rh", "Rhodium", "103"], ["Pd", "Palladium", "106"], ["Ag", "Silver", "108"], ["Cd", "Cadmium", "112"],
  ["In", "Indium", "115"], ["Sn", "Tin", "119"], ["Sb", "Antimony", "122"], ["Te", "Tellurium", "128"],
  ["I", "Iodine", "127"], ["Xe", "Xenon", "131"], ["Cs", "Caesium", "133"], ["Ba", "Barium", "137"],
  ["La", "Lanthanum", "139"], ["Ce", "Cerium", "140"], ["Pr", "Praseodymium", "141"], ["Nd", "Neodymium", "144"],
  ["Pm", "Promethium", "-"], ["Sm", "Samarium", "150"], ["Eu", "Europium", "152"], ["Gd", "Gadolinium", "157"],
  ["Tb", "Terbium", "159"], ["Dy", "Dysprosium", "163"], ["Ho", "Holmium", "165"], ["Er", "Erbium", "167"],
  ["Tm", "Thulium", "169"], ["Yb", "Ytterbium", "173"], ["Lu", "Lutetium", "175"], ["Hf", "Hafnium", "178"],
  ["Ta", "Tantalum", "181"], ["W", "Tungsten", "184"], ["Re", "Rhenium", "186"], ["Os", "Osmium", "190"],
  ["Ir", "Iridium", "192"], ["Pt", "Platinum", "195"], ["Au", "Gold", "197"], ["Hg", "Mercury", "201"],
  ["Tl", "Thallium", "204"], ["Pb", "Lead", "207"], ["Bi", "Bismuth", "209"], ["Po", "Polonium", "-"],
  ["At", "Astatine", "-"], ["Rn", "Radon", "-"], ["Fr", "Francium", "-"], ["Ra", "Radium", "-"],
  ["Ac", "Actinium", "-"], ["Th", "Thorium", "232"], ["Pa", "Protactinium", "231"], ["U", "Uranium", "238"],
  ["Np", "Neptunium", "-"], ["Pu", "Plutonium", "-"], ["Am", "Americium", "-"], ["Cm", "Curium", "-"],
  ["Bk", "Berkelium", "-"], ["Cf", "Californium", "-"], ["Es", "Einsteinium", "-"], ["Fm", "Fermium", "-"],
  ["Md", "Mendelevium", "-"], ["No", "Nobelium", "-"], ["Lr", "Lawrencium", "-"], ["Rf", "Rutherfordium", "-"],
  ["Db", "Dubnium", "-"], ["Sg", "Seaborgium", "-"], ["Bh", "Bohrium", "-"], ["Hs", "Hassium", "-"],
  ["Mt", "Meitnerium", "-"], ["Ds", "Darmstadtium", "-"], ["Rg", "Roentgenium", "-"], ["Cn", "Copernicium", "-"],
  ["Nh", "Nihonium", "-"], ["Fl", "Flerovium", "-"], ["Mc", "Moscovium", "-"], ["Lv", "Livermorium", "-"],
  ["Ts", "Tennessine", "-"], ["Og", "Oganesson", "-"]
];

/* Grid position (column 1-18, row 1-9) for a given proton number. */
window.elementPosition = function (z) {
  var shortCols = [1, 2, 13, 14, 15, 16, 17, 18];
  if (z === 1) return { c: 1, r: 1 };
  if (z === 2) return { c: 18, r: 1 };
  if (z <= 10) return { c: shortCols[z - 3], r: 2 };
  if (z <= 18) return { c: shortCols[z - 11], r: 3 };
  if (z <= 36) return { c: z - 18, r: 4 };
  if (z <= 54) return { c: z - 36, r: 5 };
  if (z <= 56) return { c: z - 54, r: 6 };
  if (z <= 71) return { c: z - 54, r: 8 };   /* lanthanides */
  if (z <= 86) return { c: z - 68, r: 6 };
  if (z <= 88) return { c: z - 86, r: 7 };
  if (z <= 103) return { c: z - 86, r: 9 };  /* actinides */
  return { c: z - 100, r: 7 };
};

window.elementCategory = function (z) {
  var alkali = [3, 11, 19, 37, 55, 87];
  var alkaline = [4, 12, 20, 38, 56, 88];
  var noble = [2, 10, 18, 36, 54, 86, 118];
  var halogen = [9, 17, 35, 53, 85, 117];
  var nonmetal = [1, 6, 7, 8, 15, 16, 34];
  var metalloid = [5, 14, 32, 33, 51, 52, 84];
  if (alkali.indexOf(z) > -1) return "alkali";
  if (alkaline.indexOf(z) > -1) return "alkaline";
  if (noble.indexOf(z) > -1) return "noble";
  if (halogen.indexOf(z) > -1) return "halogen";
  if (nonmetal.indexOf(z) > -1) return "nonmetal";
  if (metalloid.indexOf(z) > -1) return "metalloid";
  if (z >= 57 && z <= 71) return "lanthanide";
  if (z >= 89 && z <= 103) return "actinide";
  if ((z >= 21 && z <= 30) || (z >= 39 && z <= 48) || (z >= 72 && z <= 80) || (z >= 104 && z <= 112)) return "transition";
  return "post";
};

/* ---------------- Data sheet ---------------- */
window.DATASHEET = [
  {
    title: "Tests for cations",
    note: "Add aqueous sodium hydroxide, then repeat with aqueous ammonia.",
    cols: ["Ion", "With sodium hydroxide", "With ammonia"],
    rows: [
      ["Ammonium, NH4+", "Ammonia gas given off on warming, turns damp red litmus blue", "No reaction"],
      ["Calcium, Ca2+", "White precipitate, insoluble in excess", "No precipitate, or very slight white precipitate"],
      ["Chromium(III), Cr3+", "Green precipitate, soluble in excess giving a green solution", "Green precipitate, insoluble in excess"],
      ["Copper(II), Cu2+", "Light blue precipitate, insoluble in excess", "Light blue precipitate, soluble in excess giving a dark blue solution"],
      ["Iron(II), Fe2+", "Green precipitate, insoluble in excess", "Green precipitate, insoluble in excess"],
      ["Iron(III), Fe3+", "Red-brown precipitate, insoluble in excess", "Red-brown precipitate, insoluble in excess"],
      ["Zinc, Zn2+", "White precipitate, soluble in excess giving a colourless solution", "White precipitate, soluble in excess giving a colourless solution"]
    ]
  },
  {
    title: "Flame tests",
    note: "Dip a clean wire in the sample and hold it in a blue Bunsen flame.",
    cols: ["Ion", "Flame colour"],
    rows: [
      ["Lithium, Li+", "Red"],
      ["Sodium, Na+", "Yellow"],
      ["Potassium, K+", "Lilac"],
      ["Copper(II), Cu2+", "Blue-green"]
    ]
  },
  {
    title: "Tests for anions",
    note: "Acidify first where stated, to stop other ions giving a false positive.",
    cols: ["Ion", "Test", "Result"],
    rows: [
      ["Carbonate, CO3 2-", "Add dilute acid", "Effervescence, carbon dioxide turns limewater milky"],
      ["Chloride, Cl-", "Acidify with dilute nitric acid, add aqueous silver nitrate", "White precipitate"],
      ["Bromide, Br-", "Acidify with dilute nitric acid, add aqueous silver nitrate", "Cream precipitate"],
      ["Iodide, I-", "Acidify with dilute nitric acid, add aqueous silver nitrate", "Yellow precipitate"],
      ["Nitrate, NO3-", "Add aqueous sodium hydroxide and aluminium foil, then warm", "Ammonia gas given off, turns damp red litmus blue"],
      ["Sulfate, SO4 2-", "Acidify with dilute nitric acid, add aqueous barium nitrate", "White precipitate"],
      ["Sulfite, SO3 2-", "Add acidified aqueous potassium manganate(VII)", "Solution changes from purple to colourless"]
    ]
  },
  {
    title: "Tests for gases",
    note: "",
    cols: ["Gas", "Test and result"],
    rows: [
      ["Ammonia, NH3", "Turns damp red litmus paper blue"],
      ["Carbon dioxide, CO2", "Turns limewater milky"],
      ["Chlorine, Cl2", "Bleaches damp litmus paper"],
      ["Hydrogen, H2", "Lighted splint gives a squeaky pop"],
      ["Oxygen, O2", "Relights a glowing splint"],
      ["Sulfur dioxide, SO2", "Turns acidified aqueous potassium manganate(VII) from purple to colourless"]
    ]
  },
  {
    title: "Colours of indicators",
    note: "",
    cols: ["Indicator", "In acid", "In alkali"],
    rows: [
      ["Litmus", "Red", "Blue"],
      ["Methyl orange", "Red", "Yellow"],
      ["Thymolphthalein", "Colourless", "Blue"],
      ["Universal indicator", "Red at pH 1 to orange or yellow near pH 6", "Blue to purple above pH 8"]
    ]
  },
  {
    title: "Solubility rules",
    note: "Learn the exceptions, they are what questions are built on.",
    cols: ["Type of salt", "Rule"],
    rows: [
      ["Sodium, potassium, ammonium", "All soluble"],
      ["Nitrates", "All soluble"],
      ["Chlorides", "Soluble except silver chloride and lead(II) chloride"],
      ["Sulfates", "Soluble except barium, calcium and lead(II) sulfate"],
      ["Carbonates", "Insoluble except sodium, potassium and ammonium carbonate"],
      ["Hydroxides", "Insoluble except sodium, potassium and ammonium hydroxide, calcium hydroxide is slightly soluble"]
    ]
  },
  {
    title: "Reactivity series",
    note: "Most reactive at the top. Carbon and hydrogen are included for comparison.",
    cols: ["Metal", "Reaction with water", "Extraction method"],
    rows: [
      ["Potassium", "Violent with cold water", "Electrolysis"],
      ["Sodium", "Violent with cold water", "Electrolysis"],
      ["Calcium", "Reacts with cold water", "Electrolysis"],
      ["Magnesium", "Very slow with cold water, reacts with steam", "Electrolysis"],
      ["Aluminium", "Protected by its oxide layer", "Electrolysis"],
      ["(Carbon)", "-", "-"],
      ["Zinc", "Reacts with steam", "Reduction with carbon"],
      ["Iron", "Reacts with steam, reversibly", "Reduction with carbon"],
      ["(Hydrogen)", "-", "-"],
      ["Copper", "No reaction", "Found native or roasted from its ore"],
      ["Silver", "No reaction", "Found native"],
      ["Gold", "No reaction", "Found native"]
    ]
  },
  {
    title: "Formulae to memorise",
    note: "Every calculation in Paper 4 comes from this list.",
    cols: ["Quantity", "Relationship"],
    rows: [
      ["Moles from mass", "n = m / M"],
      ["Moles from gas volume at rtp", "n = volume in dm3 / 24"],
      ["Moles from solution", "n = c x V, with V in dm3"],
      ["Concentration", "c = n / V in mol/dm3, or mass / volume in g/dm3"],
      ["Converting concentration", "concentration in g/dm3 = concentration in mol/dm3 x M"],
      ["Percentage yield", "actual yield / theoretical yield x 100"],
      ["Percentage purity", "mass of pure product / mass of impure sample x 100"],
      ["Percentage composition", "mass of element in formula / Mr x 100"],
      ["Enthalpy change from bond energies", "delta H = bonds broken - bonds made"],
      ["Rf value", "distance moved by the spot / distance moved by the solvent front"],
      ["Relative atomic mass from isotopes", "sum of (abundance x mass) / 100"],
      ["Avogadro constant", "6.02 x 10^23 particles per mole"]
    ]
  },
  {
    title: "Industrial processes",
    note: "",
    cols: ["Process", "Conditions", "Equation"],
    rows: [
      ["Haber process", "450 degrees Celsius, 200 atmospheres, iron catalyst", "N2 + 3H2 gives 2NH3"],
      ["Contact process", "450 degrees Celsius, 2 atmospheres, vanadium(V) oxide catalyst", "2SO2 + O2 gives 2SO3"],
      ["Blast furnace, reduction", "Hot air blast, coke, limestone", "Fe2O3 + 3CO gives 2Fe + 3CO2"],
      ["Blast furnace, slag", "Limestone decomposes, then removes sand", "CaCO3 gives CaO + CO2, then CaO + SiO2 gives CaSiO3"],
      ["Aluminium extraction", "Molten aluminium oxide in cryolite, carbon electrodes", "Cathode: Al3+ + 3e- gives Al. Anode: 2O2- gives O2 + 4e-"],
      ["Cracking", "600 to 700 degrees Celsius, silica or alumina catalyst", "C10H22 gives C8H18 + C2H4"],
      ["Fermentation", "Yeast, 25 to 35 degrees Celsius, no oxygen", "C6H12O6 gives 2C2H5OH + 2CO2"],
      ["Hydration of ethene", "300 degrees Celsius, 60 atmospheres, phosphoric acid catalyst", "C2H4 + H2O gives C2H5OH"]
    ]
  }
];

/* ---------------- Flashcards ---------------- */
window.FLASHCARDS = [
  { t: 1, f: "Kinetic particle theory: the three states", b: "Solid: regular, touching, vibrating in fixed positions. Liquid: random, touching, sliding past each other. Gas: random, far apart, fast in all directions." },
  { t: 1, f: "Diffusion", b: "The net movement of particles from a region of higher concentration to a region of lower concentration, caused by random particle motion." },
  { t: 1, f: "Effect of Mr on diffusion", b: "The lower the relative molecular mass, the faster the particles move at a given temperature, so the faster the gas diffuses." },
  { t: 1, f: "Why gases are compressible", b: "There are large spaces between the particles, so they can be pushed closer together. Particles themselves never change size." },

  { t: 2, f: "Element, compound, mixture", b: "Element: one type of atom. Compound: different elements chemically bonded in fixed proportions. Mixture: substances not chemically joined, easily separated." },
  { t: 2, f: "Relative mass and charge of subatomic particles", b: "Proton: mass 1, charge +1. Neutron: mass 1, charge 0. Electron: mass 1/1840, charge -1." },
  { t: 2, f: "Proton number and mass number", b: "Proton number is the number of protons and identifies the element. Mass number is the total number of protons and neutrons." },
  { t: 2, f: "Isotopes", b: "Atoms of the same element with the same proton number but different numbers of neutrons. They have identical chemical properties because their electron arrangements are the same." },
  { t: 2, f: "Ionic bond", b: "The strong electrostatic attraction between oppositely charged ions, formed when a metal transfers electrons to a non-metal." },
  { t: 2, f: "Covalent bond", b: "A shared pair of electrons between two atoms, allowing both to reach a noble gas electronic configuration." },
  { t: 2, f: "Why simple molecular substances have low boiling points", b: "The forces of attraction between the molecules are weak and need little energy to overcome. The covalent bonds inside the molecules are strong and are not broken." },
  { t: 2, f: "Graphite versus diamond", b: "Diamond: 4 bonds per carbon, rigid 3D lattice, hard, does not conduct. Graphite: 3 bonds per carbon, layers with weak forces between them, soft and conducts because of delocalised electrons." },
  { t: 2, f: "Metallic bonding", b: "A lattice of positive metal ions in a sea of delocalised electrons. The electrons carry charge, and layers of ions slide, so metals conduct and are malleable." },

  { t: 3, f: "Relative atomic mass", b: "The average mass of the isotopes of an element compared with 1/12th of the mass of an atom of carbon-12." },
  { t: 3, f: "The mole triangle", b: "n = m / M. Rearranged, m = n x M and M = m / n." },
  { t: 3, f: "Molar gas volume", b: "One mole of any gas occupies 24 dm3 at room temperature and pressure. n = volume in dm3 / 24." },
  { t: 3, f: "Concentration", b: "c = n / V with volume in dm3. To convert cm3 to dm3, divide by 1000." },
  { t: 3, f: "Empirical formula from percentages", b: "Divide each percentage by the Ar, then divide all the answers by the smallest, then scale to whole numbers." },
  { t: 3, f: "Percentage yield", b: "actual yield / theoretical yield x 100. It is always below 100 because of losses, side reactions and reversible reactions." },

  { t: 4, f: "Electrolysis", b: "The decomposition of an ionic compound, when molten or in aqueous solution, by the passage of electricity." },
  { t: 4, f: "Anode and cathode", b: "Anode is positive and attracts anions, where oxidation happens. Cathode is negative and attracts cations, where reduction happens." },
  { t: 4, f: "Predicting products in aqueous solution", b: "Cathode: the metal is formed only if it is less reactive than hydrogen, otherwise hydrogen is formed. Anode: the halogen is formed if the halide is concentrated, otherwise oxygen." },
  { t: 4, f: "Electroplating", b: "The object to be plated is the cathode, the plating metal is the anode, and the electrolyte contains ions of the plating metal." },
  { t: 4, f: "Hydrogen-oxygen fuel cell", b: "Hydrogen and oxygen react to produce electricity with water as the only chemical product. Efficient and clean at the point of use, but hydrogen is hard to store and transport." },

  { t: 5, f: "Exothermic and endothermic", b: "Exothermic: energy is transferred to the surroundings, temperature rises, delta H is negative. Endothermic: energy is taken in, temperature falls, delta H is positive." },
  { t: 5, f: "Bond breaking and making", b: "Breaking bonds takes in energy, so it is endothermic. Making bonds releases energy, so it is exothermic." },
  { t: 5, f: "Calculating delta H from bond energies", b: "delta H = total energy of bonds broken - total energy of bonds made. A negative answer means the reaction is exothermic." },
  { t: 5, f: "Activation energy", b: "The minimum energy that colliding particles must have for a reaction to occur. It is the height of the barrier on a reaction pathway diagram." },

  { t: 6, f: "The five factors affecting rate", b: "Concentration, pressure for gases, surface area, temperature and catalysts." },
  { t: 6, f: "Why temperature increases rate", b: "Particles move faster so collide more often, and a much greater proportion of collisions has energy above the activation energy." },
  { t: 6, f: "How a catalyst works", b: "It provides an alternative pathway with a lower activation energy, so a greater proportion of collisions is successful. It is unchanged at the end." },
  { t: 6, f: "Dynamic equilibrium", b: "In a closed system, the forward and reverse reactions occur at the same rate, so the concentrations of reactants and products stay constant." },
  { t: 6, f: "Shifting equilibrium", b: "Raising the temperature favours the endothermic direction. Raising the pressure favours the side with fewer gas molecules. Adding a reactant shifts it towards the products." },
  { t: 6, f: "Redox definitions", b: "Oxidation is loss of electrons, gain of oxygen, or an increase in oxidation number. Reduction is the opposite. OIL RIG." },
  { t: 6, f: "Testing for oxidising and reducing agents", b: "An oxidising agent turns colourless potassium iodide brown. A reducing agent turns purple acidified potassium manganate(VII) colourless." },

  { t: 7, f: "Acids and bases", b: "An acid produces H+ ions in solution and is a proton donor. A base accepts protons, and a soluble base is an alkali, producing OH- ions." },
  { t: 7, f: "The three reactions of acids", b: "Acid + metal gives salt + hydrogen. Acid + base gives salt + water. Acid + carbonate gives salt + water + carbon dioxide." },
  { t: 7, f: "Strong and weak acids", b: "A strong acid is fully dissociated into ions in solution, such as hydrochloric acid. A weak acid is only partially dissociated, such as ethanoic acid. This is different from concentration." },
  { t: 7, f: "Amphoteric oxides", b: "Oxides that react with both acids and alkalis, for example zinc oxide and aluminium oxide." },
  { t: 7, f: "Three routes to a salt", b: "Insoluble reactant plus acid, filter off the excess then crystallise. Titration for an acid with an alkali. Precipitation by mixing two soluble salts for an insoluble salt." },

  { t: 8, f: "Group I trends", b: "Down the group: reactivity increases, melting point decreases, density generally increases. They are soft metals that react with water to give an alkali and hydrogen." },
  { t: 8, f: "Group VII trends", b: "Down the group: reactivity decreases, colour darkens, density and melting point increase. Chlorine is a pale yellow-green gas, bromine a red-brown liquid, iodine a grey-black solid." },
  { t: 8, f: "Halogen displacement", b: "A more reactive halogen displaces a less reactive halide from solution, for example Cl2 + 2KBr gives 2KCl + Br2." },
  { t: 8, f: "Transition elements", b: "High density, high melting point, coloured compounds, variable oxidation numbers and they act as catalysts." },
  { t: 8, f: "Noble gases", b: "Monatomic and unreactive because they already have a full outer electron shell." },

  { t: 9, f: "Reactivity series", b: "Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold." },
  { t: 9, f: "Why alloys are harder", b: "The different sized atoms disrupt the regular layers of the pure metal, so the layers cannot slide over each other easily." },
  { t: 9, f: "Rusting", b: "Iron needs both oxygen and water to rust. Prevention: barrier methods such as paint, grease or plastic, plus galvanising and sacrificial protection." },
  { t: 9, f: "Sacrificial protection", b: "A more reactive metal such as zinc or magnesium is attached to iron. It loses electrons in preference to the iron, so the iron does not corrode." },
  { t: 9, f: "Choosing an extraction method", b: "Metals above carbon in the reactivity series are extracted by electrolysis. Metals below carbon are extracted by reduction with carbon." },
  { t: 9, f: "Blast furnace reactions", b: "C + O2 gives CO2. CO2 + C gives 2CO. Fe2O3 + 3CO gives 2Fe + 3CO2. CaCO3 gives CaO + CO2, then CaO + SiO2 gives CaSiO3 as slag." },

  { t: 10, f: "Test for water and test for purity", b: "Water turns anhydrous copper(II) sulfate from white to blue, and anhydrous cobalt(II) chloride from blue to pink. Purity is shown by a boiling point of exactly 100 and a freezing point of exactly 0 degrees Celsius." },
  { t: 10, f: "Water treatment", b: "Sedimentation and filtration remove solids, carbon removes tastes and odours, and chlorination kills microbes." },
  { t: 10, f: "Composition of clean dry air", b: "About 78 per cent nitrogen, 21 per cent oxygen, with the remainder noble gases and a small amount of carbon dioxide." },
  { t: 10, f: "Air pollutants", b: "Carbon monoxide is toxic and reduces oxygen transport in the blood. Sulfur dioxide and nitrogen oxides cause acid rain. Particulates harm the lungs. Carbon dioxide and methane are greenhouse gases." },
  { t: 10, f: "NPK fertilisers", b: "They supply nitrogen, phosphorus and potassium, the three elements plants need for healthy growth." },

  { t: 11, f: "General formulae", b: "Alkanes CnH2n+2, alkenes CnH2n, alcohols CnH2n+1OH, carboxylic acids CnH2n+1COOH." },
  { t: 11, f: "Homologous series", b: "A family of compounds with the same functional group and general formula, with each member differing by CH2, showing similar chemical properties and a gradual change in physical properties." },
  { t: 11, f: "Test for unsaturation", b: "Add aqueous bromine. An alkene decolourises it from orange to colourless. An alkane leaves it unchanged." },
  { t: 11, f: "Petroleum fractions", b: "From the top of the column downwards: refinery gas, gasoline, naphtha, kerosene, diesel oil, fuel oil, bitumen. Chain length, boiling point and viscosity all increase downwards." },
  { t: 11, f: "Cracking", b: "Breaking long-chain alkanes into shorter, more useful alkanes plus alkenes and hydrogen, using 600 to 700 degrees Celsius and a catalyst." },
  { t: 11, f: "Two ways to make ethanol", b: "Fermentation: glucose with yeast at 25 to 35 degrees Celsius without oxygen. Renewable but slow, batch process, dilute product. Hydration of ethene: 300 degrees Celsius, 60 atmospheres, phosphoric acid. Fast, continuous and pure, but uses a finite raw material." },
  { t: 11, f: "Addition versus condensation polymerisation", b: "Addition uses monomers with a C=C double bond and has only one product. Condensation joins monomers with two functional groups and loses a small molecule such as water each time." },

  { t: 12, f: "Titration method", b: "Pipette a fixed volume of one solution into a conical flask, add indicator, then add the other solution from a burette until the indicator changes colour permanently. Repeat until concordant results are obtained." },
  { t: 12, f: "Rf value", b: "Rf = distance moved by the spot / distance moved by the solvent front. It is always between 0 and 1 and has no units." },
  { t: 12, f: "Choosing a separation technique", b: "Filtration for an insoluble solid from a liquid. Crystallisation to recover a dissolved solid. Simple distillation to recover the solvent. Fractional distillation for miscible liquids with different boiling points." },
  { t: 12, f: "Purity from melting point", b: "A pure substance melts sharply at a fixed temperature. Impurities lower the melting point and spread it over a range." },
  { t: 12, f: "Sodium hydroxide cation tests", b: "Blue insoluble is copper(II). Green insoluble is iron(II). Red-brown is iron(III). White soluble in excess is zinc. White insoluble in excess is calcium. Green soluble in excess is chromium(III)." },
  { t: 12, f: "Silver nitrate halide colours", b: "White is chloride, cream is bromide, yellow is iodide. Acidify with dilute nitric acid first." }
];
