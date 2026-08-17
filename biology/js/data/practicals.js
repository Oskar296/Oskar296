/* Core practical work named in the specification. */
window.BIO_PRACTICALS = [

  {
    title: 'Food tests: starch, reducing sugar, protein and fat',
    topic: '2c',
    body: [
      { t: 'p', x: 'Grind the food with a little distilled water to make a solution or suspension, then split it between four tubes.' },
      {
        t: 'table',
        head: ['Test', 'Method', 'Positive result'],
        rows: [
          ['Starch', 'Add a few drops of iodine solution to the sample', 'Orange-brown → blue-black'],
          ['Reducing sugar', 'Add an equal volume of Benedict\'s solution and heat in a water bath at about 80 °C for 5 minutes', 'Blue → green → yellow → brick-red precipitate'],
          ['Protein', 'Add Biuret solution (or sodium hydroxide followed by a few drops of copper sulfate)', 'Blue → purple/lilac'],
          ['Fat', 'Add ethanol, shake, then pour the mixture into a tube of distilled water', 'A cloudy white emulsion appears']
        ]
      },
      { t: 'note', k: 'exam', x: 'Points examiners look for: use a water bath rather than a naked flame for Benedict\'s (ethanol and some samples are flammable); run a negative control with distilled water; and note that the final Benedict\'s colour indicates roughly how much sugar is present.' }
    ]
  },

  {
    title: 'The effect of temperature or pH on amylase activity',
    topic: '2c',
    body: [
      { t: 'h3', x: 'Method' },
      {
        t: 'ol', x: [
          'Put drops of iodine solution in each well of a spotting tile',
          'Put 2 cm³ of starch solution and 2 cm³ of amylase in separate tubes in a water bath at the chosen temperature, and leave them for 5 minutes to reach that temperature',
          'Mix them and start a stopwatch',
          'Every 30 seconds, take a drop of the mixture and add it to a well of iodine',
          'When the iodine stays orange-brown, all the starch has been digested. Record the time',
          'Repeat at a range of temperatures (for example 10, 20, 30, 40, 50 and 60 °C), or with buffer solutions at a range of pH values'
        ]
      },
      {
        t: 'table',
        head: ['Variable type', 'In this experiment'],
        rows: [
          ['Independent', 'Temperature (or pH)'],
          ['Dependent', 'Time taken for the starch to disappear'],
          ['Control variables', 'Volume and concentration of amylase, volume and concentration of starch, pH (if testing temperature), the same spotting-tile intervals']
        ]
      },
      { t: 'h3', x: 'Results' },
      { t: 'p', x: 'The rate of reaction is **1 ÷ time**. Plotting rate against temperature gives a curve that peaks at the optimum and then falls steeply as the enzyme is denatured.' },
      { t: 'note', k: 'warn', x: 'Leaving the tubes in the water bath before mixing matters — if you mix them cold, the reaction starts at the wrong temperature and the result is not valid.' }
    ]
  },

  {
    title: 'Osmosis in potato tissue',
    topic: '2d',
    body: [
      { t: 'h3', x: 'Method' },
      {
        t: 'ol', x: [
          'Cut cylinders of potato with a cork borer, all the same diameter, and cut them to the same length',
          'Blot each one dry and record its mass',
          'Place one cylinder in each of a range of sucrose concentrations (for example 0.0, 0.2, 0.4, 0.6, 0.8 and 1.0 mol/dm³)',
          'Leave for the same time, usually 30 minutes or longer',
          'Remove, blot dry in the same way, and record the new mass',
          'Calculate the **percentage change in mass** for each'
        ]
      },
      { t: 'eq', label: 'Percentage change in mass', x: '(final mass − initial mass) ÷ initial mass × 100' },
      { t: 'h3', x: 'Results' },
      {
        t: 'ul', x: [
          'In dilute solutions the potato **gains** mass — water enters by osmosis and the cells become turgid',
          'In concentrated solutions it **loses** mass — water leaves and the cells become flaccid or plasmolysed',
          'Where the line crosses zero on the graph, the sucrose solution has the same concentration as the potato cell sap, so there is no net movement'
        ]
      },
      { t: 'note', k: 'exam', x: 'Percentage change is used rather than the raw change so that cylinders of slightly different starting mass can be compared fairly. Blotting each cylinder the same way removes surface water that would otherwise add mass.' }
    ]
  },

  {
    title: 'Testing a leaf for starch, and what photosynthesis needs',
    topic: '2e',
    body: [
      { t: 'h3', x: 'Testing a leaf for starch' },
      {
        t: 'ol', x: [
          'Boil the leaf in water for about a minute — this kills it and breaks down the cell membranes',
          'Turn off the Bunsen burner. Heat the leaf in ethanol in a water bath to remove the chlorophyll, so the colour change is visible',
          'Dip the brittle leaf in hot water to soften it',
          'Spread it on a white tile and add iodine solution',
          'Blue-black means starch is present, so photosynthesis has taken place'
        ]
      },
      { t: 'note', k: 'warn', x: 'Ethanol is highly flammable, so it must be heated in a water bath with the Bunsen turned off, never over a flame.' },
      { t: 'h3', x: 'Showing what photosynthesis needs' },
      { t: 'p', x: 'In each case the plant is **destarched** first, by leaving it in the dark for 24 to 48 hours, so any starch found afterwards must be new.' },
      {
        t: 'table',
        head: ['Factor being tested', 'Set-up', 'Result'],
        rows: [
          ['Light', 'Cover part of a leaf with black paper or foil, then leave the plant in light', 'Only the uncovered part turns blue-black'],
          ['Chlorophyll', 'Use a variegated leaf, with green and white areas', 'Only the green parts turn blue-black'],
          ['Carbon dioxide', 'Enclose one leaf in a flask with soda lime to absorb CO₂, and another with sodium hydrogencarbonate solution as the control', 'Only the leaf supplied with CO₂ turns blue-black']
        ]
      }
    ]
  },

  {
    title: 'The effect of light intensity on the rate of photosynthesis',
    topic: '2e',
    body: [
      { t: 'h3', x: 'Method' },
      {
        t: 'ol', x: [
          'Place a piece of pondweed such as *Elodea*, cut end upwards, in a beaker of sodium hydrogencarbonate solution, which supplies carbon dioxide',
          'Put a lamp at a measured distance from the beaker and leave for a few minutes to settle',
          'Count the bubbles of oxygen released in one minute, or collect the gas in a syringe and measure its volume',
          'Repeat at several distances, for example 10, 20, 30, 40 and 50 cm',
          'Repeat each distance three times and take a mean'
        ]
      },
      {
        t: 'table',
        head: ['Variable type', 'In this experiment'],
        rows: [
          ['Independent', 'Light intensity, changed by moving the lamp'],
          ['Dependent', 'Number of bubbles per minute, or volume of oxygen collected'],
          ['Control variables', 'Temperature, carbon dioxide concentration, the same piece of pondweed, the same time interval']
        ]
      },
      { t: 'h3', x: 'Results' },
      { t: 'p', x: 'The rate rises as the lamp is moved closer, then levels off when another factor, usually carbon dioxide concentration or temperature, becomes limiting.' },
      { t: 'note', k: 'exam', x: 'Two standard improvements: put a heat shield — a beaker or tank of water — between the lamp and the plant so that temperature stays constant, and measure the volume of gas rather than counting bubbles, because bubbles vary in size.' },
      { t: 'p', x: 'Light intensity is proportional to **1 ÷ distance²**, so halving the distance gives four times the intensity.' }
    ]
  },

  {
    title: 'Showing that respiration produces carbon dioxide and heat',
    topic: '2g',
    body: [
      { t: 'h3', x: 'Carbon dioxide' },
      {
        t: 'ol', x: [
          'Place germinating seeds in a sealed tube above a small volume of hydrogencarbonate indicator, or connected by tubing to limewater',
          'Set up an identical apparatus with dead, boiled seeds as a control',
          'Both sets of seeds are disinfected first, so that microorganisms on their surfaces do not respire and affect the result',
          'Wrap both tubes in foil, so that any photosynthesis is excluded',
          'Leave for the same time and compare'
        ]
      },
      { t: 'p', x: 'The indicator turns from red to yellow, or the limewater turns milky, only with the living seeds.' },
      { t: 'h3', x: 'Heat' },
      {
        t: 'ol', x: [
          'Put living germinating seeds in one vacuum flask and dead boiled seeds in another',
          'Disinfect both sets of seeds',
          'Plug the necks with cotton wool, which lets air in but slows heat loss',
          'Insert a thermometer into each and invert the flasks so the seeds surround the bulb',
          'Record the temperature each day for several days'
        ]
      },
      { t: 'p', x: 'The temperature rises only in the flask with living seeds, because respiration releases heat energy.' }
    ]
  },

  {
    title: 'Investigating transpiration with a potometer',
    topic: '2j',
    body: [
      { t: 'h3', x: 'Setting up' },
      {
        t: 'ol', x: [
          'Cut a leafy shoot **under water**, at an angle, so that no air enters the xylem',
          'Assemble the potometer under water and fit the shoot into the rubber bung, keeping everything airtight — smear the joints with petroleum jelly',
          'Lift the capillary tube out of the water for a moment to introduce a single air bubble',
          'Leave the apparatus to equilibrate for a few minutes',
          'Record the distance the bubble moves along the scale in a set time, for example 5 minutes'
        ]
      },
      { t: 'h3', x: 'Changing the conditions' },
      {
        t: 'table',
        head: ['Condition', 'How to create it', 'Expected effect on rate'],
        rows: [
          ['Wind', 'Use a fan at a set distance', 'Increases — water vapour is removed, keeping a steep gradient'],
          ['Humidity', 'Enclose the shoot in a clear plastic bag', 'Decreases — the air outside the leaf becomes saturated'],
          ['Temperature', 'Move the apparatus to a warmer room', 'Increases — faster evaporation and diffusion'],
          ['Light', 'Use a lamp, or a dark cupboard', 'Brighter light opens the stomata, so the rate increases']
        ]
      },
      { t: 'note', k: 'warn', x: 'A potometer measures **water uptake**, which is slightly greater than transpiration because a little water is used in photosynthesis and to keep cells turgid. Reset the bubble to the start using the reservoir tap between readings.' }
    ]
  },

  {
    title: 'The conditions needed for germination',
    topic: '3a',
    body: [
      { t: 'h3', x: 'Method' },
      { t: 'p', x: 'Set up four boiling tubes, each with the same number of cress or bean seeds on cotton wool, and leave for about a week.' },
      {
        t: 'table',
        head: ['Tube', 'Set-up', 'Conditions', 'Result'],
        rows: [
          ['A', 'Damp cotton wool, room temperature, open to the air', 'Water, oxygen, warmth', '**Germinates** — the control with everything present'],
          ['B', 'Dry cotton wool, room temperature, open to the air', 'No water', 'Does not germinate'],
          ['C', 'Damp cotton wool, boiled and cooled water covered with a layer of oil', 'No oxygen', 'Does not germinate'],
          ['D', 'Damp cotton wool, placed in a refrigerator', 'Too cold', 'Does not germinate, or germinates very slowly']
        ]
      },
      { t: 'note', k: 'exam', x: 'The boiled water in tube C removes dissolved oxygen and the oil layer stops more dissolving back in. Only one variable is changed in each tube, so each result can be attributed to that one factor. Tubes A and D also test whether light is needed if one is placed in the dark.' }
    ]
  },

  {
    title: 'The effect of light and gravity on seedling growth',
    topic: '2m',
    body: [
      { t: 'h3', x: 'Phototropism' },
      {
        t: 'ol', x: [
          'Grow cress seedlings in three identical dishes on damp cotton wool',
          'Leave one in all-round light, put one in a box with a slit on one side, and put one in complete darkness',
          'Leave for several days and record the direction of growth'
        ]
      },
      { t: 'p', x: 'The seedlings lit from one side bend towards the light; those in all-round light grow straight; those in the dark grow tall, spindly and pale as they search for light.' },
      { t: 'h3', x: 'Gravitropism' },
      {
        t: 'ol', x: [
          'Germinate bean seeds on damp cotton wool in a petri dish, with the seeds pointing in different directions',
          'Keep the dish in the dark, so light cannot influence the result',
          'A control dish is fixed to a slowly rotating clinostat, so gravity acts equally on all sides'
        ]
      },
      { t: 'p', x: 'Whatever direction the seed points, the root grows downwards (positive gravitropism) and the shoot upwards (negative gravitropism). On the clinostat, growth stays straight.' }
    ]
  },

  {
    title: 'Using quadrats to sample a habitat',
    topic: '4a',
    body: [
      { t: 'h3', x: 'Estimating population size' },
      {
        t: 'ol', x: [
          'Lay two tape measures at right angles along the edges of the area to make a grid',
          'Use a random number generator to produce coordinates, and place the quadrat there — this avoids bias',
          'Count the individuals of the species inside, or estimate percentage cover. Agree a rule for plants on the boundary, e.g. count only those touching the top and left edges',
          'Repeat at least ten times',
          'Calculate the mean per quadrat, then scale up to the whole area'
        ]
      },
      { t: 'eq', label: 'Estimated population', x: 'mean number per quadrat × (total area ÷ area of one quadrat)' },
      { t: 'h3', x: 'Studying distribution along a gradient' },
      { t: 'p', x: 'Lay a tape in a straight line from one habitat into the other — for example from open ground into woodland — and place quadrats at regular intervals. Record the species present and also the abiotic factors, such as light intensity with a light meter, so the distribution can be linked to a cause.' },
      { t: 'note', k: 'exam', x: 'Sources of error worth naming: too few quadrats, sampling that was not truly random, miscounting plants on the boundary, and estimating percentage cover by eye. Improvements: more quadrats, random coordinates, and the same person estimating every time.' }
    ]
  },

  {
    title: 'The effect of exercise on heart rate and breathing rate',
    topic: '2i',
    body: [
      {
        t: 'ol', x: [
          'Measure resting pulse rate by counting beats at the wrist or neck for 60 seconds, and resting breathing rate by counting breaths for 60 seconds',
          'Exercise for a set time and at a set intensity, for example step-ups at a fixed rate for 3 minutes',
          'Measure pulse and breathing rate immediately afterwards',
          'Keep measuring every minute until they return to resting values, and record the recovery time',
          'Repeat for several people, or repeat three times and take a mean'
        ]
      },
      { t: 'p', x: 'Both rates rise with exercise so that more oxygen and glucose reach the muscles and more carbon dioxide is removed. A person who is fitter has a lower resting rate and returns to it faster, because their heart and lungs are more efficient.' },
      { t: 'note', k: 'exam', x: 'Control variables: the same type and intensity of exercise, the same length of rest before starting, and the same method of counting. Give any ethical points if asked — a participant should stop if they feel unwell.' }
    ]
  }
];
