/* Topic 2, second half: gas exchange, transport, excretion, coordination. */
window.BIO_T2.subs = window.BIO_T2.subs.concat([

  /* ================================================== 2h */
  {
    id: '2h',
    title: 'Gas exchange in flowering plants',
    objectives: [
      'Explain how net gas exchange in a plant changes between day and night',
      'Describe the role of stomata and guard cells',
      'Interpret experiments using hydrogencarbonate indicator'
    ],
    notes: [
      { t: 'p', x: 'Plants respire all the time, like every living thing. They also photosynthesise, but only in the light. What you can measure going in and out of a leaf is the **net** result of the two processes together.' },
      {
        t: 'table',
        head: ['Conditions', 'What is happening', 'Net gas exchange'],
        rows: [
          ['Darkness', 'Respiration only', 'Oxygen taken in, carbon dioxide given out'],
          ['Dim light', 'Both, at similar rates', 'No net exchange — the **compensation point**'],
          ['Bright light', 'Photosynthesis much faster than respiration', 'Carbon dioxide taken in, oxygen given out']
        ]
      },
      { t: 'note', k: 'warn', x: 'A very common error is writing that plants "respire at night and photosynthesise in the day". Plants respire **24 hours a day**. In daylight, photosynthesis is simply faster, so it masks respiration.' },
      { t: 'h', x: 'How gases get in and out' },
      {
        t: 'ul', x: [
          'Gases diffuse through the **stomata**, mostly on the lower surface of the leaf',
          'Each stoma is opened and closed by a pair of **guard cells**. In light they take in water, become turgid and bend apart, opening the pore',
          'At night, and when the plant is short of water, the guard cells become flaccid and the stoma closes, which cuts water loss',
          'Inside the leaf, gases move through the large air spaces of the spongy mesophyll, which gives a big internal surface area',
          'The leaf is thin, so the diffusion distance to any cell is short'
        ]
      },
      { t: 'h', x: 'Hydrogencarbonate indicator experiments' },
      { t: 'p', x: 'Hydrogencarbonate indicator is **red** in equilibrium with normal air. More carbon dioxide turns it **yellow**; less turns it **purple**.' },
      {
        t: 'table',
        head: ['Tube', 'Contents', 'Result', 'Why'],
        rows: [
          ['A', 'Leaf in bright light', 'Purple', 'Photosynthesis is faster than respiration, so CO₂ is removed'],
          ['B', 'Leaf wrapped in foil (dark)', 'Yellow', 'Only respiration, so CO₂ is added'],
          ['C', 'Leaf behind muslin (dim light)', 'Stays red', 'Photosynthesis and respiration are balanced'],
          ['D', 'No leaf (control)', 'Stays red', 'Shows the colour change is caused by the leaf']
        ]
      },
      { t: 'note', k: 'exam', x: 'Always name the control and say what it shows. Tubes must also be sealed with a bung, and all left for the same time at the same temperature.' },
      { t: 'note', k: 'link', x: 'The same stomata that let carbon dioxide in also let water vapour out — that is transpiration, in **2j**. The plant is always trading water loss against carbon dioxide supply.' }
    ],
    terms: [
      { t: 'Net gas exchange', d: 'The overall movement of gases into or out of a plant, which is the combined result of respiration and photosynthesis.' },
      { t: 'Compensation point', d: 'The light intensity at which photosynthesis and respiration happen at exactly the same rate, so there is no net gas exchange.' },
      { t: 'Guard cells', d: 'The pair of cells either side of a stoma that open and close it by changing turgor.' }
    ],
    qs: [
      { t: 'mcq', q: 'At night, the net gas exchange of a leaf is:', o: ['CO₂ in, O₂ out', 'O₂ in, CO₂ out', 'No exchange', 'Only water vapour out'], a: 1, e: 'Without light there is no photosynthesis, so only respiration happens: oxygen in, carbon dioxide out.' },
      { t: 'mcq', q: 'A leaf is sealed in a tube of hydrogencarbonate indicator in bright light. The indicator turns purple. This shows:', o: ['Carbon dioxide has increased', 'Carbon dioxide has decreased', 'Oxygen has decreased', 'Nothing has changed'], a: 1, e: 'Purple means less carbon dioxide, because photosynthesis is using it faster than respiration produces it.' },
      { t: 'mcq', q: 'Stomata close when a plant is short of water. The advantage is:', o: ['More carbon dioxide enters', 'Less water is lost by evaporation', 'Photosynthesis speeds up', 'More oxygen enters'], a: 1, e: 'Closing the pore cuts water loss, though it also stops carbon dioxide entering, which slows photosynthesis.' },
      { t: 'saq', q: 'Explain why a plant gives out oxygen during the day but takes in oxygen at night.', m: 4, ms: ['The plant respires all the time, using oxygen and producing carbon dioxide;', 'in the light the plant also photosynthesises, using carbon dioxide and producing oxygen;', 'in bright light photosynthesis is faster than respiration, so there is a net release of oxygen;', 'at night there is no photosynthesis, so only respiration occurs and oxygen is taken in.'] },
      { t: 'saq', q: 'Describe how you would use hydrogencarbonate indicator to show that a leaf in the dark releases carbon dioxide, including a control.', m: 5, ms: ['Place a leaf in a sealed test tube containing hydrogencarbonate indicator, not touching the liquid;', 'wrap the tube in aluminium foil so no light reaches it;', 'set up an identical sealed tube with indicator and foil but no leaf, as a control;', 'leave both for the same time at the same temperature;', 'the indicator in the tube with the leaf turns yellow, showing carbon dioxide has increased;', 'the control stays red, showing the change was caused by the leaf.'] }
    ]
  },

  /* ================================================== 2i */
  {
    id: '2i',
    title: 'Gas exchange in humans',
    objectives: [
      'Name the structures of the thorax and give their functions',
      'Explain how the ribs, intercostal muscles and diaphragm produce ventilation',
      'Explain how an alveolus is adapted for gas exchange',
      'Compare inspired and expired air, and explain the effect of exercise'
    ],
    notes: [
      { t: 'h', x: 'The parts of the thorax' },
      {
        t: 'table',
        head: ['Structure', 'Function'],
        rows: [
          ['Trachea', 'Carries air to the lungs. Held open by C-shaped rings of cartilage so it cannot collapse.'],
          ['Bronchi', 'One to each lung; branch off the trachea.'],
          ['Bronchioles', 'Fine branches that carry air to the alveoli.'],
          ['Alveoli', 'Tiny air sacs where gas exchange with the blood happens.'],
          ['Ribs', 'Protect the lungs and heart, and move to change the volume of the thorax.'],
          ['Intercostal muscles', 'Between the ribs; contract to pull the ribcage up and out.'],
          ['Diaphragm', 'A sheet of muscle below the lungs; flattens when it contracts.'],
          ['Pleural membranes', 'Two thin membranes with fluid between them, so the lungs slide smoothly against the chest wall.']
        ]
      },
      { t: 'p', x: 'The airways are lined with **goblet cells** that make mucus to trap dust and bacteria, and **ciliated cells** whose cilia beat to sweep the mucus up to the throat, where it is swallowed.' },
      { t: 'h', x: 'Ventilation' },
      {
        t: 'table',
        head: ['', 'Breathing in (inspiration)', 'Breathing out (expiration)'],
        rows: [
          ['Intercostal muscles', 'Contract', 'Relax'],
          ['Ribcage', 'Moves up and out', 'Moves down and in'],
          ['Diaphragm', 'Contracts and flattens', 'Relaxes and domes upward'],
          ['Volume of thorax', 'Increases', 'Decreases'],
          ['Pressure in thorax', 'Decreases, below atmospheric', 'Increases, above atmospheric'],
          ['Air', 'Flows in', 'Flows out']
        ]
      },
      { t: 'note', k: 'exam', x: 'Always give the chain in order: **muscles → volume → pressure → air movement**. Answers that jump straight from "diaphragm contracts" to "air rushes in" lose the pressure mark.' },
      { t: 'h', x: 'The alveoli' },
      { t: 'fig', id: 'alveolus', cap: 'Gas exchange between an alveolus and a capillary.' },
      {
        t: 'table',
        head: ['Adaptation', 'Why it helps'],
        rows: [
          ['Millions of alveoli', 'A very large total surface area, around 70 m²'],
          ['Wall only one cell thick, and the capillary wall too', 'A very short diffusion distance'],
          ['Moist lining', 'Gases dissolve before diffusing across'],
          ['Dense capillary network', 'Blood constantly carries oxygen away and brings carbon dioxide, keeping a steep concentration gradient'],
          ['Ventilation', 'Fresh air keeps the oxygen concentration in the alveolus high']
        ]
      },
      { t: 'h', x: 'Inspired and expired air' },
      {
        t: 'table',
        head: ['Gas', 'Inspired air', 'Expired air', 'Why'],
        rows: [
          ['Oxygen', 'about 21%', 'about 16%', 'Some diffuses into the blood for respiration'],
          ['Carbon dioxide', 'about 0.04%', 'about 4%', 'Produced by respiration and diffuses out of the blood'],
          ['Nitrogen', 'about 78%', 'about 78%', 'Not used by the body'],
          ['Water vapour', 'Variable', 'Saturated', 'Evaporates from the moist alveolar surfaces'],
          ['Temperature', 'Variable', 'Warmed to body temperature', 'Heat from the body warms the air']
        ]
      },
      { t: 'note', k: 'prac', x: 'You can compare the two using limewater: breathing out through a tube into limewater turns it milky much faster than drawing room air through it.' },
      { t: 'h', x: 'Exercise' },
      {
        t: 'ul', x: [
          'Muscles respire faster, so they need more oxygen and produce more carbon dioxide',
          'The extra CO₂ is detected, and **breathing rate and depth increase** so more oxygen is taken in and more CO₂ removed',
          '**Heart rate increases** so blood is pumped to the muscles faster, keeping the diffusion gradients steep',
          'If oxygen still cannot be supplied fast enough, muscles also respire anaerobically and build up an oxygen debt'
        ]
      }
    ],
    terms: [
      { t: 'Ventilation', d: 'The movement of air into and out of the lungs; breathing.' },
      { t: 'Alveolus', d: 'A tiny air sac in the lung where gas exchange takes place.' },
      { t: 'Diaphragm', d: 'A sheet of muscle below the lungs that flattens on contraction to increase the volume of the thorax.' },
      { t: 'Intercostal muscles', d: 'Muscles between the ribs that move the ribcage during breathing.' },
      { t: 'Trachea', d: 'The windpipe; held open by rings of cartilage.' },
      { t: 'Bronchiole', d: 'A fine airway branching from a bronchus, leading to the alveoli.' },
      { t: 'Goblet cell', d: 'A cell in the airway lining that secretes mucus to trap dust and microorganisms.' },
      { t: 'Ciliated cell', d: 'A cell with hair-like cilia that beat to move mucus up and out of the airways.' }
    ],
    qs: [
      { t: 'mcq', q: 'During inspiration, the diaphragm:', o: ['Relaxes and moves up', 'Contracts and flattens', 'Contracts and domes upward', 'Does not move'], a: 1, e: 'A contracting diaphragm flattens, which increases thorax volume and lowers the pressure so air flows in.' },
      { t: 'mcq', q: 'Which change causes air to flow into the lungs?', o: ['Pressure in the thorax rises above atmospheric', 'Pressure in the thorax falls below atmospheric', 'Volume of the thorax decreases', 'The alveoli contract'], a: 1, e: 'Air always moves from higher to lower pressure. Increasing thorax volume lowers the pressure inside.' },
      { t: 'mcq', q: 'Which feature of alveoli maintains a steep concentration gradient for oxygen?', o: ['Their moist lining', 'Their thin walls', 'The constant blood flow through the capillaries', 'Their large number'], a: 2, e: 'Blood flow removes oxygen as fast as it arrives, so the concentration in the blood stays lower than in the alveolus.' },
      { t: 'mcq', q: 'Expired air contains about 16% oxygen rather than 0%. Why?', o: ['The lungs cannot absorb all the oxygen in one breath', 'Oxygen is produced in the lungs', 'Nitrogen is converted to oxygen', 'Alveoli release oxygen'], a: 0, e: 'Only some of the oxygen has time to diffuse into the blood before the air is breathed out again.' },
      { t: 'mcq', q: 'Cilia in the trachea are important because they:', o: ['Absorb oxygen', 'Move mucus containing trapped dust and bacteria away from the lungs', 'Produce mucus', 'Warm the air'], a: 1, e: 'Goblet cells make the mucus; ciliated cells sweep it up to the throat to be swallowed.' },
      { t: 'saq', q: 'Describe how the body brings about expiration.', m: 4, ms: ['The intercostal muscles relax, so the ribcage moves down and in;', 'the diaphragm relaxes and returns to its domed shape;', 'the volume of the thorax decreases;', 'so the pressure inside rises above atmospheric pressure;', 'and air flows out of the lungs.'] },
      { t: 'saq', q: 'Explain three ways in which an alveolus is adapted for efficient gas exchange.', m: 6, ms: ['There are millions of alveoli, giving a very large surface area;', 'so many molecules can diffuse across at the same time;', 'the alveolus wall is one cell thick, as is the capillary wall;', 'so the diffusion distance is very short and diffusion is fast;', 'there is a dense network of capillaries with constant blood flow;', 'so oxygen is carried away and the concentration gradient stays steep.'] },
      { t: 'saq', q: 'Explain why breathing rate and depth increase during exercise and stay high for a time afterwards.', m: 4, ms: ['Muscles respire faster during exercise, so they need more oxygen and produce more carbon dioxide;', 'increased breathing rate and depth take in more oxygen and remove more carbon dioxide;', 'if oxygen cannot be supplied fast enough, muscles respire anaerobically and lactic acid builds up;', 'breathing stays deep and fast afterwards to supply extra oxygen to break down the lactic acid — repaying the oxygen debt.'] }
    ]
  },

  /* ================================================== 2j */
  {
    id: '2j',
    title: 'Transport in plants',
    objectives: [
      'Describe the structure and function of xylem and phloem',
      'Explain how root hair cells absorb water and mineral ions',
      'Define transpiration and explain the factors that affect its rate',
      'Describe how a potometer is used'
    ],
    notes: [
      {
        t: 'table',
        head: ['', 'Xylem', 'Phloem'],
        rows: [
          ['Carries', 'Water and dissolved mineral ions', 'Sucrose and amino acids (dissolved food)'],
          ['Direction', 'Upwards only, from roots to leaves', 'Both ways, from leaves to wherever it is needed or stored'],
          ['Cells', 'Dead, hollow tubes with no end walls, strengthened with lignin', 'Living cells with perforated sieve plates, supported by companion cells'],
          ['Process', 'Transpiration stream — driven by evaporation', 'Translocation — needs energy'],
          ['Extra job', 'Supports the plant', '—']
        ]
      },
      { t: 'p', x: 'In a root the vascular bundle is in the centre; in a stem the bundles form a ring near the outside; in a leaf they make up the veins. Xylem is always on the inner side of a bundle, phloem on the outer side.' },
      { t: 'h', x: 'Taking water in' },
      {
        t: 'ul', x: [
          'Soil water is a more dilute solution than the cytoplasm of a root hair cell, so water enters by **osmosis**',
          'Root hair cells have a **long narrow extension**, giving a very large surface area',
          'Mineral ions are usually more concentrated inside the cell than in the soil, so they enter by **active transport**, which needs energy from respiration — root hair cells have many mitochondria',
          'Water then passes from cell to cell across the root and into the xylem'
        ]
      },
      { t: 'h', x: 'Transpiration' },
      { t: 'def', term: 'Transpiration', x: 'The evaporation of water from the surfaces of the mesophyll cells inside a leaf, followed by the diffusion of that water vapour out through the stomata.' },
      { t: 'p', x: 'As water evaporates from the leaves it pulls a continuous column of water up the xylem behind it. This is the **transpiration stream**. It also delivers mineral ions and keeps cells turgid, which supports the plant, and evaporation cools the leaf.' },
      {
        t: 'table',
        head: ['Factor', 'Effect on rate', 'Why'],
        rows: [
          ['Higher temperature', 'Increases', 'Water molecules have more energy, so they evaporate and diffuse faster'],
          ['Windier', 'Increases', 'Water vapour is blown away, keeping a steep diffusion gradient at the stomata'],
          ['Drier air (low humidity)', 'Increases', 'Steeper concentration gradient of water vapour between leaf and air'],
          ['Brighter light', 'Increases', 'Stomata open for photosynthesis, so more water vapour escapes'],
          ['Less water in the soil', 'Decreases', 'Guard cells lose turgor and stomata close']
        ]
      },
      { t: 'note', k: 'prac', x: 'A **potometer** measures the rate at which a shoot takes up water, which is used as a measure of transpiration rate. You time how far an air bubble travels along a capillary tube. Set it up under water and cut the stem at an angle under water, so no air enters the xylem. See the practicals page.' },
      { t: 'note', k: 'warn', x: 'A potometer measures water **uptake**, not transpiration directly. A small amount of the water taken up is used in photosynthesis and to keep cells turgid.' },
      { t: 'p', x: 'If a plant loses water faster than it can take it up, its cells become flaccid and it **wilts**. Wilting is partly protective: the drooping leaves reduce the surface area facing the sun, and the stomata close.' }
    ],
    terms: [
      { t: 'Xylem', d: 'Dead, hollow, lignified tubes that carry water and mineral ions up from the roots, and support the plant.' },
      { t: 'Phloem', d: 'Living tubes with sieve plates that carry sucrose and amino acids around the plant.' },
      { t: 'Translocation', d: 'The movement of sucrose and amino acids in the phloem, from where they are made to where they are used or stored.' },
      { t: 'Transpiration', d: 'The evaporation of water from the leaf mesophyll followed by diffusion of water vapour out through the stomata.' },
      { t: 'Transpiration stream', d: 'The continuous flow of water from the roots, up the xylem, to the leaves.' },
      { t: 'Root hair cell', d: 'A root cell with a long extension that gives a large surface area for absorbing water and mineral ions.' },
      { t: 'Potometer', d: 'Apparatus that measures the rate of water uptake by a leafy shoot, used as a measure of transpiration.' },
      { t: 'Lignin', d: 'The substance that strengthens and waterproofs xylem walls.' },
      { t: 'Wilting', d: 'Drooping of a plant when its cells lose turgor because water is lost faster than it is taken up.' }
    ],
    qs: [
      { t: 'mcq', q: 'Which statement about xylem is correct?', o: ['It carries sucrose to the roots', 'It is made of living cells with sieve plates', 'It carries water upwards in dead, hollow tubes', 'It moves substances in both directions'], a: 2, e: 'Xylem cells are dead, hollow and strengthened with lignin, and carry water and minerals upwards only.' },
      { t: 'mcq', q: 'A plant is moved from a still, humid room to a warm, windy place. The rate of transpiration will:', o: ['Decrease', 'Stay the same', 'Increase', 'Stop'], a: 2, e: 'Warmth speeds evaporation, wind removes water vapour and dry air steepens the gradient, so all three increase transpiration.' },
      { t: 'mcq', q: 'How do mineral ions enter a root hair cell from soil water that is more dilute than the cell contents?', o: ['Osmosis', 'Diffusion', 'Active transport', 'Transpiration'], a: 2, e: 'Movement against the concentration gradient requires active transport, which uses energy from respiration.' },
      { t: 'mcq', q: 'Why is a potometer stem cut under water?', o: ['To keep the leaves wet', 'To stop air bubbles entering the xylem and breaking the water column', 'To make the shoot photosynthesise', 'To dissolve the lignin'], a: 1, e: 'An air lock in the xylem would stop water moving up and the readings would be useless.' },
      { t: 'mcq', q: 'Petroleum jelly is smeared on the lower surface of a leaf in a transpiration experiment. The rate of water loss falls sharply because:', o: ['Water cannot enter the leaf', 'Most stomata are on the lower surface and are now blocked', 'Photosynthesis has stopped', 'The cuticle has been removed'], a: 1, e: 'Most stomata are on the lower surface, so blocking them removes the main route for water vapour to escape.' },
      { t: 'saq', q: 'Describe two differences between xylem and phloem.', m: 2, ms: ['Xylem carries water and mineral ions, phloem carries sucrose and amino acids;', 'xylem moves substances upwards only, phloem moves them in both directions;', 'xylem is made of dead hollow cells strengthened with lignin, phloem is made of living cells with sieve plates.'] },
      { t: 'saq', q: 'Explain how a root hair cell is adapted to absorb water and mineral ions.', m: 4, ms: ['It has a long narrow extension, which gives a large surface area;', 'so more water can enter by osmosis in a given time;', 'the cell sap is more concentrated than the soil water, so there is a water concentration gradient into the cell;', 'it contains many mitochondria to release energy by respiration;', 'which is used for active transport of mineral ions against their concentration gradient.'] },
      { t: 'saq', q: 'Explain why the rate of transpiration increases on a hot, windy day.', m: 4, ms: ['Higher temperature gives water molecules more kinetic energy, so evaporation from the mesophyll cells is faster;', 'and diffusion of water vapour out of the stomata is faster;', 'wind blows away the water vapour that collects outside the stomata;', 'which maintains a steep concentration gradient of water vapour between the leaf and the air.'] },
      { t: 'saq', q: 'Other than losing water, give two ways in which the transpiration stream is useful to a plant.', m: 2, ms: ['It transports mineral ions from the soil up to the leaves;', 'it keeps cells supplied with water so they stay turgid, supporting the plant;', 'evaporation from the leaves cools the plant;', 'it delivers water needed for photosynthesis.'] }
    ]
  },

  /* ================================================== 2k */
  {
    id: '2k',
    title: 'Transport in humans',
    objectives: [
      'Explain why humans need a transport system, and describe double circulation',
      'Name the components of blood and give the function of each',
      'Relate the structure of arteries, veins and capillaries to their functions',
      'Describe the structure of the heart and the path of blood through it',
      'Describe coronary heart disease, its risk factors and how it can be reduced',
      'Describe how the immune system defends the body'
    ],
    notes: [
      { t: 'p', x: 'Humans are large and have a small surface area to volume ratio, and most cells are far from the outside. Diffusion alone would be far too slow, so a circulatory system carries substances to and from every cell.' },
      { t: 'h', x: 'Double circulation' },
      { t: 'p', x: 'Blood passes through the heart **twice** for every circuit of the body: once through the right side to the lungs (the pulmonary circuit), and once through the left side to the rest of the body (the systemic circuit).' },
      { t: 'note', k: 'exam', x: 'The advantage: blood can be re-pressurised after the lungs, so it travels round the body quickly and at high pressure. A fish, with a single circulation, loses pressure at the gills and delivers oxygen more slowly.' },
      { t: 'h', x: 'Blood' },
      {
        t: 'table',
        head: ['Component', 'Structure', 'Function'],
        rows: [
          ['Plasma', 'A straw-coloured liquid, mostly water', 'Transports dissolved carbon dioxide, glucose, amino acids, urea, hormones, heat and the blood cells'],
          ['Red blood cells', 'Biconcave discs with no nucleus, full of haemoglobin', 'Carry oxygen: haemoglobin + oxygen → oxyhaemoglobin in the lungs, which splits again in the tissues'],
          ['White blood cells — phagocytes', 'Lobed nucleus, flexible', 'Engulf and digest pathogens (phagocytosis)'],
          ['White blood cells — lymphocytes', 'Large round nucleus', 'Produce antibodies against specific antigens'],
          ['Platelets', 'Cell fragments', 'Trigger blood clotting, which seals wounds and keeps pathogens out']
        ]
      },
      { t: 'h', x: 'Blood vessels' },
      {
        t: 'table',
        head: ['', 'Artery', 'Vein', 'Capillary'],
        rows: [
          ['Carries blood', 'Away from the heart', 'Towards the heart', 'Through tissues, linking arteries to veins'],
          ['Pressure', 'High', 'Low', 'Falling'],
          ['Wall', 'Thick, with muscle and elastic fibres', 'Thin', 'One cell thick'],
          ['Lumen', 'Narrow', 'Wide', 'Very narrow — one red blood cell wide'],
          ['Valves', 'No (except at the heart exits)', 'Yes, to stop backflow', 'No'],
          ['Special feature', 'Elastic walls stretch and recoil, giving a pulse', 'Squeezed by nearby muscles to push blood back to the heart', 'Leaky, thin wall for exchange with the tissues']
        ]
      },
      { t: 'note', k: 'warn', x: 'Arteries carry blood **away** from the heart, and that is what defines them — not whether the blood is oxygenated. The pulmonary artery carries deoxygenated blood, and the pulmonary vein carries oxygenated blood.' },
      { t: 'h', x: 'The heart' },
      { t: 'fig', id: 'heart', cap: 'The heart, drawn as you look at someone facing you — so their right side appears on your left.' },
      {
        t: 'ol', x: [
          'Deoxygenated blood from the body enters the **right atrium** through the **vena cava**',
          'The right atrium contracts and pushes blood into the **right ventricle**',
          'The right ventricle contracts and pushes blood out through the **pulmonary artery** to the lungs',
          'Oxygenated blood returns from the lungs in the **pulmonary vein** to the **left atrium**',
          'The left atrium contracts and pushes blood into the **left ventricle**',
          'The left ventricle contracts and pushes blood out through the **aorta** to the whole body'
        ]
      },
      {
        t: 'ul', x: [
          'The **left ventricle wall is much thicker** than the right, because it must generate enough pressure to push blood all round the body, while the right only pumps to the lungs next door',
          'The **septum** keeps oxygenated and deoxygenated blood apart',
          '**Atrioventricular valves** stop blood flowing back into the atria; **semilunar valves** stop it flowing back from the arteries',
          'The **coronary arteries** branch off the aorta and supply the heart muscle itself with oxygen and glucose'
        ]
      },
      { t: 'p', x: 'During exercise heart rate rises so that oxygen and glucose reach the muscles faster and carbon dioxide is removed faster. Adrenaline also increases heart rate.' },
      { t: 'h', x: 'Coronary heart disease' },
      {
        t: 'ul', x: [
          'Fatty deposits build up inside the **coronary arteries**, narrowing them and reducing blood flow to the heart muscle',
          'The heart muscle gets less oxygen, which causes chest pain (angina). If a clot blocks the artery completely, that area of muscle dies — a heart attack',
          '**Risk factors:** a diet high in saturated fat and salt, smoking, lack of exercise, being overweight, stress, high blood pressure, age, and family history',
          '**Reducing the risk:** eat less saturated fat and salt, stop smoking, exercise regularly, keep to a healthy weight'
        ]
      },
      { t: 'h', x: 'Defence against disease' },
      {
        t: 'ol', x: [
          '**Barriers first** — skin, blood clotting, mucus and cilia in the airways, and stomach acid stop most pathogens getting in',
          '**Phagocytosis** — a phagocyte moves towards a pathogen, engulfs it, and digests it with enzymes',
          '**Antibodies** — each pathogen carries **antigens** on its surface. A lymphocyte with the matching shape produces **antibodies** that lock onto those antigens, clumping the pathogens together and marking them for destruction',
          '**Memory cells** — after an infection, some lymphocytes remain. If the same pathogen returns they produce antibodies much faster and in greater numbers, so you do not become ill. This is immunity',
          '**Vaccination** uses this: a harmless or dead form of the pathogen is introduced, so memory cells are made without the disease'
        ]
      }
    ],
    terms: [
      { t: 'Double circulation', d: 'A system in which blood passes through the heart twice for each complete circuit of the body.' },
      { t: 'Plasma', d: 'The liquid part of blood, which transports dissolved substances, heat and blood cells.' },
      { t: 'Haemoglobin', d: 'The red protein in red blood cells that binds oxygen to form oxyhaemoglobin.' },
      { t: 'Oxyhaemoglobin', d: 'The compound formed when haemoglobin binds oxygen in the lungs; it splits again in respiring tissues.' },
      { t: 'Phagocyte', d: 'A white blood cell that engulfs and digests pathogens.' },
      { t: 'Lymphocyte', d: 'A white blood cell that produces antibodies.' },
      { t: 'Antigen', d: 'A molecule on the surface of a cell or pathogen that the immune system recognises as foreign.' },
      { t: 'Antibody', d: 'A protein made by lymphocytes that binds to a specific antigen and helps destroy the pathogen.' },
      { t: 'Platelet', d: 'A cell fragment in blood that triggers clotting.' },
      { t: 'Artery', d: 'A thick-walled vessel carrying blood away from the heart at high pressure.' },
      { t: 'Vein', d: 'A thin-walled vessel with valves, carrying blood back to the heart at low pressure.' },
      { t: 'Capillary', d: 'A vessel one cell thick where exchange between blood and tissues happens.' },
      { t: 'Coronary artery', d: 'An artery that supplies the heart muscle itself with blood.' },
      { t: 'Coronary heart disease', d: 'Narrowing of the coronary arteries by fatty deposits, reducing blood supply to the heart muscle.' },
      { t: 'Vaccination', d: 'Introducing a harmless form of a pathogen so that memory cells are produced, giving immunity without the disease.' }
    ],
    qs: [
      { t: 'mcq', q: 'Which vessel carries oxygenated blood from the lungs to the heart?', o: ['Pulmonary artery', 'Pulmonary vein', 'Vena cava', 'Aorta'], a: 1, e: 'It is a vein because it carries blood towards the heart, and it is one of the few veins carrying oxygenated blood.' },
      { t: 'mcq', q: 'Why is the wall of the left ventricle thicker than that of the right ventricle?', o: ['It holds more blood', 'It must pump blood at high enough pressure to reach the whole body', 'It contains valves', 'It receives blood from the lungs'], a: 1, e: 'The right ventricle only pumps to the lungs; the left has to pump all round the body, so it needs more muscle.' },
      { t: 'mcq', q: 'Which blood component transports carbon dioxide, glucose and urea?', o: ['Red blood cells', 'Platelets', 'Plasma', 'Lymphocytes'], a: 2, e: 'Plasma carries dissolved substances. Red cells specialise in oxygen.' },
      { t: 'mcq', q: 'Valves are found in veins because:', o: ['Blood pressure in veins is low, so backflow must be prevented', 'Veins carry deoxygenated blood', 'Veins are close to the skin', 'Veins have thick walls'], a: 0, e: 'With low pressure, blood could flow backwards; valves make sure it only travels towards the heart.' },
      { t: 'mcq', q: 'A person is immune to measles after having it once because:', o: ['Their skin is thicker', 'Antibodies from the first infection last forever', 'Memory lymphocytes make antibodies rapidly if the pathogen returns', 'Phagocytes recognise the virus'], a: 2, e: 'Memory cells respond faster and in greater numbers on a second exposure, so the pathogen is destroyed before symptoms develop.' },
      { t: 'mcq', q: 'Which is a risk factor for coronary heart disease?', o: ['A diet high in fibre', 'Regular exercise', 'Smoking', 'Drinking water'], a: 2, e: 'Smoking, a diet high in saturated fat and salt, being overweight, stress and inactivity all increase the risk.' },
      { t: 'saq', q: 'Describe the path taken by a red blood cell from the vena cava until it leaves the heart in the aorta.', m: 5, ms: ['Enters the right atrium from the vena cava;', 'passes through the atrioventricular valve into the right ventricle;', 'is pumped through the pulmonary artery to the lungs, where it picks up oxygen;', 'returns through the pulmonary vein to the left atrium;', 'passes into the left ventricle;', 'and is pumped out through the aorta.'] },
      { t: 'saq', q: 'Explain how the structure of a capillary suits its function.', m: 3, ms: ['Its wall is only one cell thick, so the diffusion distance for oxygen and glucose into the tissues is very short;', 'its lumen is very narrow, so red blood cells are squeezed close to the wall and travel slowly, giving more time for exchange;', 'capillaries form a dense network, giving a large surface area and reaching close to every cell.'] },
      { t: 'saq', q: 'Explain how a phagocyte and a lymphocyte each defend the body against a bacterial infection.', m: 4, ms: ['A phagocyte moves towards the bacterium and engulfs it;', 'and digests it using enzymes;', 'a lymphocyte recognises the antigens on the surface of the bacterium;', 'and produces specific antibodies that bind to those antigens, clumping the bacteria together so they are destroyed more easily.'] },
      { t: 'saq', q: 'Describe the causes of coronary heart disease and suggest three lifestyle changes that reduce the risk.', m: 5, ms: ['Fatty deposits build up in the walls of the coronary arteries;', 'the arteries become narrower, so less blood, and therefore less oxygen and glucose, reaches the heart muscle;', 'this causes chest pain, and if a clot blocks the artery a heart attack;', 'reduce saturated fat and salt in the diet;', 'stop smoking;', 'exercise regularly / keep to a healthy body mass.'] },
      { t: 'saq', q: 'Explain the advantage of a double circulation over a single circulation.', m: 3, ms: ['Blood passes through the heart twice per circuit;', 'so it can be pumped again after leaving the lungs, restoring the pressure that was lost in the lung capillaries;', 'this means blood travels round the body faster and delivers oxygen and glucose to respiring cells more quickly.'] }
    ]
  },

  /* ================================================== 2l */
  {
    id: '2l',
    title: 'Excretion in plants and humans',
    objectives: [
      'State the excretory products of a plant and of a human, and the organ that removes each',
      'Describe the structure of the urinary system and of a nephron',
      'Explain ultrafiltration and selective reabsorption',
      'Explain how the body controls the water content of the blood using ADH'
    ],
    notes: [
      { t: 'h', x: 'Excretion in flowering plants' },
      {
        t: 'ul', x: [
          'Carbon dioxide from respiration, and oxygen from photosynthesis, are waste products at different times of day. Both diffuse out through the **stomata**',
          'Excess water is lost as water vapour through the stomata during transpiration',
          'Some plants store waste products in leaves that are then shed'
        ]
      },
      { t: 'h', x: 'Excretion in humans' },
      {
        t: 'table',
        head: ['Organ', 'Excretory product', 'Where it comes from'],
        rows: [
          ['Lungs', 'Carbon dioxide (and water vapour)', 'Respiration in cells'],
          ['Kidneys', 'Urea, excess water and excess mineral ions', 'Urea from the breakdown of excess amino acids in the liver'],
          ['Skin', 'Sweat: water, salts and a little urea', 'Mainly a by-product of cooling']
        ]
      },
      { t: 'def', term: 'Deamination', x: 'The removal of the nitrogen-containing part of excess amino acids in the liver. The nitrogen part is converted to urea, which is excreted by the kidneys; the rest can be used in respiration or stored.' },
      { t: 'note', k: 'exam', x: 'Excess amino acids cannot be stored, so they must be broken down. That is why protein in the diet leads to urea in the urine.' },
      { t: 'h', x: 'The urinary system' },
      {
        t: 'ul', x: [
          '**Renal artery** — brings blood containing urea to the kidney at high pressure',
          '**Kidney** — filters the blood; the outer **cortex** and inner **medulla** contain about a million **nephrons**',
          '**Renal vein** — carries filtered blood away, with much less urea',
          '**Ureter** — carries urine from each kidney to the bladder',
          '**Bladder** — stores urine; **urethra** — carries urine out of the body'
        ]
      },
      { t: 'fig', id: 'nephron', cap: 'A nephron. Filtration happens at the top, then useful substances are taken back.' },
      { t: 'h', x: 'Ultrafiltration' },
      {
        t: 'ul', x: [
          'Blood enters the glomerulus through a **wide** afferent arteriole and leaves through a **narrow** efferent arteriole, which creates high pressure',
          'This forces small molecules — water, glucose, mineral ions and urea — out of the capillary and into the Bowman\'s capsule',
          'Blood cells and large **plasma proteins** are too big to pass through, so they stay in the blood',
          'The liquid formed is called the **filtrate**'
        ]
      },
      { t: 'h', x: 'Selective reabsorption' },
      {
        t: 'ul', x: [
          '**All the glucose** is reabsorbed back into the blood in the first convoluted tubule, by active transport',
          '**Some water** is reabsorbed along the tubule and the loop of Henlé, and **some mineral ions** according to what the body needs',
          '**Urea is not reabsorbed** — it stays in the tubule',
          'What is left flows through the collecting duct to the ureter. This is **urine**: water, urea and excess ions'
        ]
      },
      { t: 'note', k: 'warn', x: 'Glucose in the urine is not normal. It suggests the blood glucose level was so high that the kidney could not reabsorb it all — a common sign of untreated diabetes.' },
      { t: 'h', x: 'Controlling water content' },
      {
        t: 'ol', x: [
          'If the blood becomes **too concentrated** (you have sweated a lot or not drunk enough), the brain releases more **ADH** (antidiuretic hormone)',
          'ADH makes the walls of the collecting ducts more permeable to water, so **more water is reabsorbed** into the blood',
          'A small volume of concentrated urine is produced, and the blood returns to normal',
          'If the blood is **too dilute**, less ADH is released, less water is reabsorbed, and a large volume of dilute urine is produced'
        ]
      },
      { t: 'note', k: 'link', x: 'This is a **negative feedback** loop and part of homeostasis — see **2n**.' }
    ],
    terms: [
      { t: 'Urea', d: 'The waste product made in the liver from excess amino acids, excreted by the kidneys.' },
      { t: 'Deamination', d: 'Breaking down excess amino acids in the liver, producing urea.' },
      { t: 'Nephron', d: 'The microscopic filtering unit of the kidney.' },
      { t: 'Ultrafiltration', d: 'Filtering the blood under high pressure in the glomerulus, so small molecules pass into the Bowman\'s capsule while cells and proteins stay behind.' },
      { t: 'Selective reabsorption', d: 'Taking useful substances — all the glucose, some water and some ions — back from the filtrate into the blood.' },
      { t: 'Filtrate', d: 'The liquid formed in the Bowman\'s capsule after ultrafiltration.' },
      { t: 'Urine', d: 'The liquid leaving the kidney: water, urea and excess mineral ions.' },
      { t: 'ADH', d: 'Antidiuretic hormone; it makes the collecting ducts more permeable so more water is reabsorbed into the blood.' },
      { t: 'Osmoregulation', d: 'Control of the water content of the body.' }
    ],
    qs: [
      { t: 'mcq', q: 'Where is urea made?', o: ['The kidneys', 'The liver', 'The bladder', 'The small intestine'], a: 1, e: 'The liver deaminates excess amino acids to make urea. The kidneys only remove it from the blood.' },
      { t: 'mcq', q: 'Which substance is present in the filtrate in the Bowman\'s capsule but NOT in normal urine?', o: ['Water', 'Urea', 'Glucose', 'Mineral ions'], a: 2, e: 'All the glucose is reabsorbed by active transport, so healthy urine contains none.' },
      { t: 'mcq', q: 'Why do plasma proteins stay in the blood during ultrafiltration?', o: ['They are actively transported back', 'Their molecules are too large to pass through the capillary wall', 'They dissolve in fat', 'They are reabsorbed in the loop of Henlé'], a: 1, e: 'Only small molecules are forced out. Proteins and blood cells are too large.' },
      { t: 'mcq', q: 'On a hot day, after little to drink, a person produces:', o: ['A large volume of dilute urine', 'A small volume of concentrated urine', 'No urine at all', 'Urine containing glucose'], a: 1, e: 'The blood is concentrated, so more ADH is released, more water is reabsorbed, and less, more concentrated urine is made.' },
      { t: 'mcq', q: 'A plant excretes carbon dioxide mainly:', o: ['Through the roots', 'Through the stomata', 'In the phloem', 'In its sap'], a: 1, e: 'Gases diffuse in and out through the stomata.' },
      { t: 'saq', q: 'Describe the process of ultrafiltration in the kidney.', m: 4, ms: ['Blood arrives at the glomerulus through a wide afferent arteriole and leaves through a narrower efferent arteriole;', 'this creates high pressure in the glomerular capillaries;', 'small molecules — water, glucose, mineral ions and urea — are forced out into the Bowman\'s capsule;', 'blood cells and large plasma proteins are too big to pass through and remain in the blood.'] },
      { t: 'saq', q: 'Explain how the kidney responds when the water content of the blood falls too low.', m: 4, ms: ['The change is detected in the brain / hypothalamus;', 'more ADH is released into the blood from the pituitary gland;', 'ADH makes the collecting ducts more permeable to water;', 'so more water is reabsorbed from the filtrate back into the blood;', 'a smaller volume of more concentrated urine is produced.'] },
      { t: 'saq', q: 'A urine sample contains glucose and protein. Suggest what each finding might indicate.', m: 3, ms: ['Glucose suggests the blood glucose concentration was too high for all of it to be reabsorbed, which is a sign of untreated diabetes;', 'protein should never pass through the glomerulus because the molecules are too large;', 'so protein in the urine suggests the filtering membrane is damaged.'] },
      { t: 'saq', q: 'Explain why eating a large amount of protein leads to more urea in the urine.', m: 3, ms: ['Excess amino acids cannot be stored in the body;', 'they are broken down in the liver by deamination;', 'the nitrogen-containing part is converted into urea, which is carried in the blood to the kidneys and excreted in the urine.'] }
    ]
  },

  /* ================================================== 2m */
  {
    id: '2m',
    title: 'Coordination and response: the nervous system',
    objectives: [
      'Compare nervous and hormonal coordination',
      'Describe the reflex arc and explain how a synapse works',
      'Label the eye and explain the pupil reflex and accommodation',
      'Describe tropisms and explain the role of auxin'
    ],
    notes: [
      {
        t: 'table',
        head: ['', 'Nervous system', 'Hormonal system'],
        rows: [
          ['Signal', 'Electrical impulse along neurones', 'Chemical hormone in the blood'],
          ['Speed', 'Very fast', 'Slower'],
          ['Duration of effect', 'Short-lived', 'Often long-lasting'],
          ['Target', 'Precise — one muscle or gland', 'Widespread — any cell with the right receptor']
        ]
      },
      { t: 'h', x: 'The nervous system' },
      {
        t: 'ul', x: [
          'The **central nervous system (CNS)** is the brain and spinal cord',
          'The **peripheral nervous system** is all the nerves connecting the CNS to the rest of the body',
          '**Sensory neurones** carry impulses from receptors to the CNS; **motor neurones** carry impulses from the CNS to effectors; **relay neurones** connect them inside the CNS',
          'A **receptor** detects a stimulus. An **effector** is a muscle or gland that produces the response'
        ]
      },
      { t: 'h', x: 'The reflex arc' },
      { t: 'fig', id: 'reflex', cap: 'A reflex arc. The impulse does not have to reach the brain, so the response is fast and automatic.' },
      { t: 'p', x: 'A **reflex action** is a rapid, automatic response that does not involve conscious thought. It protects the body — pulling your hand off something hot, blinking, or the pupil reflex.' },
      { t: 'eq', label: 'Learn this sequence', x: 'stimulus → receptor → sensory neurone → relay neurone → motor neurone → effector → response' },
      { t: 'h', x: 'Synapses' },
      {
        t: 'ol', x: [
          'A synapse is the tiny gap between two neurones',
          'The electrical impulse arrives at the end of the first neurone and triggers the release of a chemical **neurotransmitter**',
          'The neurotransmitter diffuses across the gap',
          'It binds to receptor molecules on the next neurone and starts a new electrical impulse'
        ]
      },
      { t: 'note', k: 'exam', x: 'Because the transmitter is only released on one side and the receptors are only on the other, impulses can travel **one way only** across a synapse.' },
      { t: 'h', x: 'The eye' },
      {
        t: 'table',
        head: ['Part', 'Function'],
        rows: [
          ['Cornea', 'Transparent front of the eye; does most of the focusing by refracting light'],
          ['Iris', 'The coloured muscular ring that controls how much light enters'],
          ['Pupil', 'The hole in the middle of the iris that light passes through'],
          ['Lens', 'Changes shape to fine-focus light onto the retina'],
          ['Ciliary muscles and suspensory ligaments', 'Change the shape of the lens'],
          ['Retina', 'Contains the light receptors: rods (dim light, black and white) and cones (colour, bright light)'],
          ['Fovea', 'The part of the retina with the most cones, giving the sharpest colour vision'],
          ['Optic nerve', 'Carries impulses from the retina to the brain'],
          ['Blind spot', 'Where the optic nerve leaves the retina; no receptors, so no image is formed here'],
          ['Sclera', 'The tough white outer coat that protects the eye']
        ]
      },
      { t: 'h', x: 'The pupil reflex' },
      {
        t: 'table',
        head: ['Light', 'Circular muscles of iris', 'Radial muscles of iris', 'Pupil'],
        rows: [
          ['Bright', 'Contract', 'Relax', 'Gets smaller, so less light enters and the retina is not damaged'],
          ['Dim', 'Relax', 'Contract', 'Gets wider, so more light enters and you can see']
        ]
      },
      { t: 'h', x: 'Accommodation' },
      {
        t: 'table',
        head: ['Looking at', 'Ciliary muscles', 'Suspensory ligaments', 'Lens'],
        rows: [
          ['A near object', 'Contract', 'Slacken', 'Becomes fatter and more curved, refracting light more'],
          ['A distant object', 'Relax', 'Pulled tight', 'Becomes thinner and less curved, refracting light less']
        ]
      },
      { t: 'note', k: 'warn', x: 'The ciliary muscles **contract for near objects**. It feels backwards, because a contracting muscle usually pulls something tight — here, contracting makes the ring smaller so the ligaments go slack.' },
      { t: 'h', x: 'Tropisms in plants' },
      { t: 'def', term: 'Tropism', x: 'A growth response of a plant in which the direction of growth depends on the direction of the stimulus.' },
      {
        t: 'ul', x: [
          '**Positive phototropism** — shoots grow towards light, so leaves get more light for photosynthesis',
          '**Positive gravitropism** — roots grow downwards, in the direction of gravity, anchoring the plant and finding water',
          '**Negative gravitropism** — shoots grow upwards, away from gravity'
        ]
      },
      {
        t: 'ol', x: [
          '**Auxin** is a plant hormone made in the tip of a shoot',
          'When light comes from one side, auxin moves to the **shaded** side',
          'Auxin makes cells **elongate**',
          'The shaded side grows longer than the lit side, so the shoot bends towards the light'
        ]
      },
      { t: 'note', k: 'exam', x: 'In roots, auxin has the opposite effect — it *inhibits* elongation, so the side with more auxin grows less and the root bends downwards.' }
    ],
    terms: [
      { t: 'Receptor', d: 'A cell or organ that detects a stimulus.' },
      { t: 'Effector', d: 'A muscle or gland that carries out a response.' },
      { t: 'Reflex action', d: 'A rapid, automatic response to a stimulus that does not involve conscious thought.' },
      { t: 'Synapse', d: 'The junction between two neurones, where a chemical neurotransmitter carries the signal across a gap.' },
      { t: 'Neurotransmitter', d: 'The chemical released at a synapse that diffuses across and starts an impulse in the next neurone.' },
      { t: 'Sensory neurone', d: 'A neurone carrying impulses from a receptor to the CNS.' },
      { t: 'Motor neurone', d: 'A neurone carrying impulses from the CNS to an effector.' },
      { t: 'Relay neurone', d: 'A neurone in the CNS that connects sensory and motor neurones.' },
      { t: 'Central nervous system', d: 'The brain and the spinal cord.' },
      { t: 'Accommodation', d: 'The change in the shape of the lens that focuses light from objects at different distances.' },
      { t: 'Retina', d: 'The light-sensitive layer at the back of the eye, containing rods and cones.' },
      { t: 'Rods and cones', d: 'Light receptors in the retina: rods work in dim light and see no colour; cones need bright light and detect colour.' },
      { t: 'Tropism', d: 'A directional growth response of a plant to a stimulus.' },
      { t: 'Auxin', d: 'A plant hormone made in shoot tips that causes cell elongation in shoots.' },
      { t: 'Phototropism', d: 'A growth response to light; shoots are positively phototropic.' },
      { t: 'Gravitropism', d: 'A growth response to gravity; roots are positively gravitropic and shoots negatively gravitropic.' }
    ],
    qs: [
      { t: 'mcq', q: 'What is the correct order of a reflex arc?', o: ['Receptor → motor neurone → relay → sensory neurone → effector', 'Stimulus → receptor → sensory → relay → motor → effector → response', 'Stimulus → effector → relay → receptor → response', 'Receptor → brain → effector → response'], a: 1, e: 'The relay neurone in the spinal cord allows the response without waiting for the brain, which makes it fast.' },
      { t: 'mcq', q: 'How does an impulse cross a synapse?', o: ['As an electrical spark', 'A neurotransmitter diffuses across the gap and binds to receptors', 'The neurones touch and pass it directly', 'Through the blood'], a: 1, e: 'The chemical is released on one side and detected on the other, which is also why transmission is one-way.' },
      { t: 'mcq', q: 'In bright light, the circular muscles of the iris contract. The result is:', o: ['A wider pupil, letting in more light', 'A narrower pupil, letting in less light', 'A fatter lens', 'A thinner cornea'], a: 1, e: 'Narrowing the pupil protects the retina from damage by bright light.' },
      { t: 'mcq', q: 'When you look at a nearby object, the lens:', o: ['Becomes thinner as the ciliary muscles relax', 'Becomes fatter as the ciliary muscles contract', 'Does not change', 'Moves forwards'], a: 1, e: 'Contracting ciliary muscles slacken the suspensory ligaments, so the elastic lens becomes fatter and refracts light more.' },
      { t: 'mcq', q: 'A shoot bends towards light because auxin:', o: ['Is destroyed by light on the shaded side', 'Accumulates on the shaded side and makes those cells elongate more', 'Accumulates on the lit side and makes those cells elongate', 'Stops cells dividing on the shaded side'], a: 1, e: 'More auxin on the shaded side means more elongation there, so that side grows longer and the shoot bends towards the light.' },
      { t: 'mcq', q: 'Which is an advantage of hormonal rather than nervous coordination?', o: ['It is faster', 'The effect lasts longer and can affect many organs at once', 'It is more precise', 'It uses no energy'], a: 1, e: 'Hormones travel in the blood to every cell with the right receptor, and their effects are longer-lasting.' },
      { t: 'saq', q: 'Explain why a reflex action is faster than a voluntary action.', m: 3, ms: ['The impulse travels through a relay neurone in the spinal cord rather than to the brain;', 'so the pathway is shorter and fewer synapses have to be crossed;', 'synapses slow transmission because the neurotransmitter has to diffuse across the gap;', 'no conscious decision is needed, so the response is automatic.'] },
      { t: 'saq', q: 'Describe how the eye changes when a person walks from a dark room into bright sunlight.', m: 4, ms: ['The bright light is detected by receptors in the retina;', 'the circular muscles of the iris contract and the radial muscles relax;', 'the pupil becomes smaller;', 'so less light enters the eye and the retina is protected from damage;', 'this is a reflex action, so it happens automatically.'] },
      { t: 'saq', q: 'A shoot is lit from one side. Explain, in terms of auxin, why it grows towards the light.', m: 4, ms: ['Auxin is produced in the tip of the shoot;', 'it moves to the shaded side of the shoot;', 'auxin causes cells to elongate;', 'so the cells on the shaded side grow longer than those on the lit side;', 'making the shoot bend towards the light. This is positive phototropism.'] },
      { t: 'saq', q: 'Give three differences between nervous and hormonal coordination.', m: 3, ms: ['Nervous uses electrical impulses along neurones, hormonal uses chemicals in the blood;', 'nervous responses are much faster;', 'nervous effects are short-lived, hormonal effects usually last longer;', 'nervous responses act on a precise target, hormones can affect many organs at once.'] }
    ]
  },

  /* ================================================== 2n */
  {
    id: '2n',
    title: 'Hormones and homeostasis',
    objectives: [
      'Name the main hormones, where they are made and what they do',
      'Explain the effects of adrenaline and insulin',
      'Explain how body temperature is controlled',
      'Explain how blood glucose concentration is controlled, and what happens in diabetes'
    ],
    notes: [
      { t: 'def', term: 'Hormone', x: 'A chemical messenger, made by a gland, that travels in the blood and changes the activity of one or more target organs.' },
      {
        t: 'table',
        head: ['Hormone', 'Made in', 'Main effects'],
        rows: [
          ['Adrenaline', 'Adrenal glands', 'Prepares the body for action: raises heart rate and breathing rate, raises blood glucose, widens the pupils, sends more blood to the muscles'],
          ['Insulin', 'Pancreas', '**Lowers** blood glucose: makes the liver and muscles take up glucose and store it as glycogen'],
          ['Glucagon', 'Pancreas', '**Raises** blood glucose: makes the liver convert glycogen back into glucose'],
          ['ADH', 'Pituitary gland', 'Increases water reabsorption in the kidney collecting ducts'],
          ['Testosterone', 'Testes', 'Male secondary sexual characteristics and sperm production'],
          ['Oestrogen', 'Ovaries', 'Female secondary sexual characteristics; repairs the uterus lining in the menstrual cycle'],
          ['Progesterone', 'Ovaries', 'Maintains the uterus lining during the second half of the cycle and in pregnancy']
        ]
      },
      { t: 'h', x: 'Homeostasis' },
      { t: 'def', term: 'Homeostasis', x: 'The maintenance of a constant internal environment, so that cells and enzymes always work in near-ideal conditions.' },
      { t: 'p', x: 'Homeostasis works by **negative feedback**: a change away from the normal level triggers a response that cancels the change out and brings the level back.' },
      { t: 'h', x: 'Temperature control' },
      { t: 'p', x: 'Core body temperature is kept at about 37 °C, the optimum for the body\'s enzymes. Too hot and enzymes are denatured; too cold and reactions are too slow.' },
      {
        t: 'table',
        head: ['Too hot', 'Too cold'],
        rows: [
          ['**Sweating** — sweat evaporates from the skin, and the energy needed for evaporation is taken from the body, cooling it', 'Sweating stops'],
          ['**Vasodilation** — arterioles near the skin widen, so more blood flows near the surface and more heat is lost by radiation', '**Vasoconstriction** — arterioles near the skin narrow, so less blood flows near the surface and less heat is lost'],
          ['Hairs lie flat, so no insulating layer of air is trapped', 'Hairs stand up, trapping a layer of air that insulates'],
          ['Less activity', '**Shivering** — muscles contract rapidly, and respiration in the muscles releases heat']
        ]
      },
      { t: 'note', k: 'warn', x: 'Blood vessels do not "move" towards or away from the skin surface — say that the arterioles supplying the skin capillaries **dilate** or **constrict** to change how much blood flows near the surface.' },
      { t: 'h', x: 'Controlling blood glucose' },
      {
        t: 'ol', x: [
          'After a meal, blood glucose **rises**. The pancreas detects this and releases **insulin**',
          'Insulin makes liver and muscle cells take up glucose from the blood and store it as **glycogen**, so blood glucose falls back to normal',
          'Between meals or during exercise, blood glucose **falls**. The pancreas releases **glucagon**',
          'Glucagon makes the liver convert stored glycogen back into glucose and release it, so blood glucose rises back to normal'
        ]
      },
      { t: 'note', k: 'tip', x: 'Two similar words: **glycogen** is the storage molecule; **glucagon** is the hormone. Insulin **in**structs cells to take glucose **in**.' },
      { t: 'h', x: 'Diabetes' },
      {
        t: 'ul', x: [
          'In **type 1 diabetes** the pancreas does not produce enough insulin, so blood glucose rises dangerously high after eating',
          'Signs include glucose in the urine, feeling thirsty and passing a lot of urine, and tiredness',
          'It is treated with injections of insulin, matched to meals and exercise, along with a controlled diet',
          '**Type 2 diabetes** develops when body cells stop responding properly to insulin; obesity and inactivity increase the risk, and it is often managed by diet, weight loss and exercise'
        ]
      },
      { t: 'note', k: 'link', x: 'The insulin used to treat diabetes is now made by genetically modified bacteria — see **5c**.' }
    ],
    terms: [
      { t: 'Hormone', d: 'A chemical messenger made by a gland and carried in the blood to a target organ.' },
      { t: 'Adrenaline', d: 'The hormone from the adrenal glands that prepares the body for action, raising heart rate, breathing rate and blood glucose.' },
      { t: 'Insulin', d: 'The hormone from the pancreas that lowers blood glucose by making the liver and muscles store it as glycogen.' },
      { t: 'Glucagon', d: 'The hormone from the pancreas that raises blood glucose by making the liver convert glycogen into glucose.' },
      { t: 'Homeostasis', d: 'Maintaining a constant internal environment so cells work in ideal conditions.' },
      { t: 'Negative feedback', d: 'A control mechanism in which a change from the normal level triggers a response that reverses the change.' },
      { t: 'Vasodilation', d: 'Widening of the arterioles supplying the skin, so more heat is lost.' },
      { t: 'Vasoconstriction', d: 'Narrowing of the arterioles supplying the skin, so less heat is lost.' },
      { t: 'Glycogen', d: 'The storage carbohydrate made from glucose in the liver and muscles.' },
      { t: 'Diabetes', d: 'A condition in which blood glucose cannot be controlled properly, because too little insulin is made or cells stop responding to it.' }
    ],
    qs: [
      { t: 'mcq', q: 'Which hormone lowers blood glucose concentration?', o: ['Glucagon', 'Adrenaline', 'Insulin', 'ADH'], a: 2, e: 'Insulin makes the liver and muscles take glucose out of the blood and store it as glycogen.' },
      { t: 'mcq', q: 'Vasoconstriction of the arterioles supplying the skin helps the body to:', o: ['Lose heat', 'Conserve heat', 'Sweat more', 'Cool the blood'], a: 1, e: 'Less blood flows near the surface, so less heat is radiated away.' },
      { t: 'mcq', q: 'Which is a response to being too hot?', o: ['Shivering', 'Hairs standing up', 'Sweating', 'Vasoconstriction'], a: 2, e: 'Sweat evaporates and takes heat energy from the body. The other three conserve or generate heat.' },
      { t: 'mcq', q: 'Adrenaline is released when a person is frightened. It causes:', o: ['A lower heart rate', 'More glucose to be released into the blood', 'Reduced breathing rate', 'Pupils to narrow'], a: 1, e: 'Adrenaline prepares the body for action: more glucose, faster heart and breathing rate, wider pupils, more blood to the muscles.' },
      { t: 'mcq', q: 'A person with untreated type 1 diabetes has glucose in their urine because:', o: ['The kidneys make glucose', 'Blood glucose is so high that not all of it can be reabsorbed in the kidney', 'Insulin is filtered into the urine', 'The liver stores too much glycogen'], a: 1, e: 'Normally all glucose is reabsorbed. If blood glucose is very high, the reabsorption mechanism cannot cope and some passes into the urine.' },
      { t: 'saq', q: 'Explain how the body responds when blood glucose concentration rises after a meal.', m: 4, ms: ['The rise is detected by the pancreas;', 'which releases insulin into the blood;', 'insulin makes liver and muscle cells take up glucose from the blood;', 'and convert it into glycogen for storage;', 'so blood glucose concentration falls back to normal — an example of negative feedback.'] },
      { t: 'saq', q: 'Describe three ways the body reduces heat loss when it is cold.', m: 3, ms: ['Vasoconstriction — arterioles supplying the skin narrow, so less blood flows near the surface and less heat is radiated;', 'hairs stand up, trapping a layer of insulating air next to the skin;', 'sweating stops, so no heat is lost by evaporation;', 'shivering — rapid muscle contractions release heat from respiration.'] },
      { t: 'saq', q: 'Explain why keeping body temperature close to 37 °C is important.', m: 3, ms: ['37 °C is the optimum temperature for the body\'s enzymes;', 'if the temperature is too high the enzymes are denatured, so reactions stop;', 'if it is too low the reactions become too slow to keep the body working.'] },
      { t: 'saq', q: 'Explain what is meant by negative feedback, using the control of body water content as an example.', m: 4, ms: ['Negative feedback means a change away from the normal level triggers a response that reverses that change;', 'if the blood becomes too concentrated, more ADH is released;', 'more water is reabsorbed in the kidney collecting ducts, so the blood becomes more dilute again;', 'when the level returns to normal, less ADH is released, so the response is switched off.'] }
    ]
  }
]);
