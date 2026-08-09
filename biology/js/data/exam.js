/* Exam technique reference. */
window.BIO_EXAM = {

  commands: [
    ['State / Give / Name', 'A short factual answer. No explanation needed, and you will not gain marks for adding one.'],
    ['Define', 'Give the meaning of the term, in full, using the technical words.'],
    ['Describe', 'Say what happens, in order. Facts and observations only — no reasons.'],
    ['Explain', 'Give the reason **why**. The word "because" should appear, or be implied, in every explain answer.'],
    ['Compare', 'Write about both things in the same sentence, using words like "whereas" or "but". Never describe one and then the other separately.'],
    ['Suggest', 'Apply what you know to an unfamiliar situation. There is often more than one acceptable answer.'],
    ['Calculate', 'Work out a number. Show your working, and give the unit and the right number of significant figures.'],
    ['Deduce / Determine', 'Use the data you are given to reach a conclusion, and refer to that data in your answer.'],
    ['Predict', 'Say what will happen, using a pattern in the data or a principle you know.'],
    ['Evaluate', 'Give points for and against, then finish with a justified conclusion.'],
    ['Identify', 'Pick out the correct item from information you are given.'],
    ['Complete', 'Fill in the table, diagram or equation as instructed.'],
    ['Draw / Plot', 'Use a sharp pencil, plot points accurately, and draw a line of best fit or join the points as instructed.']
  ],

  quickWins: [
    {
      t: 'ul', x: [
        '**Read the number of marks.** Three marks means three separate points, not one point written three ways.',
        '**Use the data.** If a graph or table is given, quote figures with units in your answer — examiners award marks for it.',
        '**Name things properly.** "The green bit" is worth nothing; "chloroplast" or "palisade mesophyll" is worth a mark.',
        '**Answer the command word.** Half the marks lost on explain questions are lost by describing instead.',
        '**Say which direction.** "Increases", "decreases", "faster", "higher" — never just "changes" or "is affected".',
        '**Do not contradict yourself.** A correct point followed by a wrong one in the same sentence usually cancels the mark.'
      ]
    }
  ],

  maths: [
    {
      t: 'table',
      head: ['Skill', 'How to do it'],
      rows: [
        ['Percentage', 'part ÷ whole × 100'],
        ['Percentage change', '(new − original) ÷ original × 100. A negative answer means a decrease — say so.'],
        ['Rate', 'amount ÷ time, e.g. bubbles per minute, or 1 ÷ time when you have timed a reaction to finish'],
        ['Magnification', 'image size ÷ actual size. Rearrange as actual = image ÷ magnification. Keep both in the same units — 1 mm = 1000 µm.'],
        ['Surface area : volume', 'Work out each, then divide. It falls as an object gets bigger.'],
        ['Energy transfer', 'energy in next level ÷ energy in level below × 100'],
        ['Population estimate', 'mean per quadrat × (total area ÷ quadrat area)'],
        ['Mean', 'Add the repeats and divide by how many, ignoring any obvious anomaly — and say you have ignored it.'],
        ['Ratios', 'Divide both numbers by the smaller one, then round to whole numbers, e.g. 3 : 1']
      ]
    },
    {
      t: 'note', k: 'exam', x: 'Graph marks are nearly free: label both axes with quantity **and** unit, choose a scale that uses more than half the grid, plot accurately with small crosses, and draw a smooth curve or a straight line of best fit — not dot-to-dot, unless told otherwise.'
    },
    {
      t: 'h', x: 'Investigation vocabulary'
    },
    {
      t: 'table',
      head: ['Term', 'Meaning'],
      rows: [
        ['Independent variable', 'The one you deliberately change'],
        ['Dependent variable', 'The one you measure'],
        ['Control variables', 'Everything else you keep the same, so the results are valid'],
        ['Control experiment', 'A parallel set-up with the factor being tested removed, to show the result is caused by that factor'],
        ['Repeatable', 'You get similar results when you repeat it yourself'],
        ['Reproducible', 'Someone else gets similar results with different equipment'],
        ['Anomaly', 'A result that does not fit the pattern; identify it, and repeat that reading if you can'],
        ['Valid', 'The experiment actually tests what it claims to, because only one variable was changed']
      ]
    }
  ],

  longAnswers: [
    { t: 'p', x: 'The longest questions on the paper are usually worth five or six marks and ask you to describe or explain a whole process. They are marked by counting the separate points you make, so structure matters more than style.' },
    {
      t: 'ol', x: [
        '**Plan in the margin.** Jot four to six key words before you write anything.',
        '**Write in a logical order.** For a process, follow it from start to finish. Numbered steps or short paragraphs are fine.',
        '**One point per sentence.** It makes each mark easy for the examiner to find.',
        '**Use the technical terms.** Osmosis, partially permeable, concentration gradient, denatured, active transport — these words *are* the marks.',
        '**Link cause to effect.** "The wall is one cell thick, **so** the diffusion distance is short, **so** oxygen diffuses quickly."',
        '**Check the command word again** before you move on.'
      ]
    },
    { t: 'note', k: 'tip', x: 'A useful habit: for any six-mark question, aim to write seven or eight distinct points. Extra correct points cost nothing, and they cover you if one of yours is wrong.' }
  ],

  pitfalls: [
    {
      t: 'table',
      head: ['Do not write', 'Write instead'],
      rows: [
        ['"The enzyme is killed"', '"The enzyme is denatured — the active site changes shape"'],
        ['"Respiration is breathing"', '"Respiration is the chemical reactions in cells that release energy from glucose"'],
        ['"Energy is produced" / "made"', '"Energy is released" or "transferred"'],
        ['"Plants respire at night and photosynthesise in the day"', '"Plants respire all the time; in the light photosynthesis is faster, so it masks respiration"'],
        ['"Bacteria become resistant because of the antibiotic"', '"A random mutation gave resistance; the antibiotic then killed the rest, so the resistant ones survived and reproduced"'],
        ['"Faeces are excreted"', '"Faeces are egested — they were never part of the body\'s metabolism"'],
        ['"Arteries carry oxygenated blood"', '"Arteries carry blood away from the heart — the pulmonary artery carries deoxygenated blood"'],
        ['"The blood vessels move to the surface"', '"The arterioles supplying the skin dilate, so more blood flows near the surface"'],
        ['"Osmosis is water moving to where there is less water"', '"Osmosis is the net movement of water from a dilute to a concentrated solution through a partially permeable membrane"'],
        ['"The organism wants to / tries to adapt"', '"Individuals with the advantageous allele were more likely to survive and reproduce"'],
        ['"Bile digests fat"', '"Bile emulsifies fat, increasing the surface area for lipase to work on"'],
        ['"Glucagon lowers blood glucose"', '"Insulin lowers blood glucose; glucagon raises it"']
      ]
    },
    { t: 'note', k: 'warn', x: 'Never write that something happens "so the organism can survive" as your whole answer. Explain the mechanism — that is where the marks are.' }
  ]
};
