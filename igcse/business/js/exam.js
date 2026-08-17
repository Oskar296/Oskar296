/* exam.js — exam technique reference: papers, AOs, command words, mark ladders, drills */

BS.exam = {

  papers: [
    {
      name: 'Paper 1 — Short answer and data response',
      time: '1 hour 30 minutes',
      marks: '80 marks',
      weight: '50% of the qualification',
      shape: [
        'Four questions, each worth 20 marks.',
        'Each question starts from a short stimulus about a business and then asks a series of parts.',
        'Parts typically follow the pattern 2, 2, 4, 6 and 6 marks — short definitions and identifications first, then explanation, then a longer evaluative part.',
        'All questions are compulsory and every part of the syllabus can be tested.'
      ],
      aos: [
        ['AO1 Knowledge and understanding', '50%'],
        ['AO2 Application', '20%'],
        ['AO3 Analysis', '20%'],
        ['AO4 Evaluation', '10%']
      ],
      strategy: [
        'Roughly **1 mark per minute** with time left to check: about 20 minutes per question.',
        'Do not over-write the 2-mark parts. Two short sentences is enough; the marks are not there.',
        'The 6-mark parts carry the analysis and evaluation, so protect time for them.',
        'Use the business in the stimulus by **name** in every applied answer.'
      ]
    },
    {
      name: 'Paper 2 — Case study',
      time: '1 hour 30 minutes',
      marks: '80 marks',
      weight: '50% of the qualification',
      shape: [
        'One case study about a single business, with several appendices of data — accounts, charts, tables, quotes from managers.',
        'Four questions, each worth 20 marks, all based on that case.',
        'Parts typically follow the pattern 2, 6 and 12 marks, or 8 and 12.',
        'The 12-mark parts always require a **justified recommendation or judgement**.'
      ],
      aos: [
        ['AO1 Knowledge and understanding', '30%'],
        ['AO2 Application', '20%'],
        ['AO3 Analysis', '30%'],
        ['AO4 Evaluation', '20%']
      ],
      strategy: [
        'Spend the first **8–10 minutes reading** the case and the appendices before writing anything.',
        'Underline or note: what the business does, its size and legal form, its objectives, its problems, and any numbers.',
        'Every point must come **from the case**. A generic textbook answer cannot reach the top band on Paper 2.',
        'Analysis is weighted higher here than on Paper 1 — always develop points into consequences.',
        'On 12-markers, always **decide**. An answer that lists both sides and then sits on the fence loses the top evaluation marks.'
      ]
    }
  ],

  commandWords: [
    { w: 'Define', m: 'Give the exact meaning of a term.', how: 'One clear sentence, ideally with a short example. Typically 2 marks.' },
    { w: 'State / Identify / Give', m: 'Name something without explanation.', how: 'Just name it. Do not waste time explaining — no extra marks are available. Typically 1–2 marks.' },
    { w: 'Calculate', m: 'Work out a numerical answer.', how: 'Show the formula, then the working, then the answer with the correct unit ($, %, units, or a ratio). Method marks are given even if the final figure is wrong.' },
    { w: 'Outline', m: 'Set out the main points briefly.', how: 'Two or three short points, each with a few words of development. No evaluation needed.' },
    { w: 'Explain', m: 'Set out purposes or reasons and show why or how.', how: 'Point → because → consequence for the business. One developed chain per mark pair.' },
    { w: 'Analyse', m: 'Examine in detail to show meaning and identify the consequences.', how: 'Build a chain of reasoning at least three links long: cause → effect → effect on the business. This is where most marks are lost by stopping too early.' },
    { w: 'Consider / Discuss', m: 'Look at both sides of an issue.', how: 'Advantages and disadvantages, both applied to the business, then a short comparative comment.' },
    { w: 'Evaluate / Justify / Recommend / Do you think', m: 'Judge or decide, and support the decision with evidence.', how: 'Both sides, applied and analysed, then a clear decision with the reason it outweighs the alternative — and ideally what the decision depends on.' },
    { w: 'Suggest', m: 'Apply knowledge to produce a possible answer.', how: 'Give a realistic option for this specific business and say briefly why it fits.' },
    { w: 'Refer to / Using the information', m: 'You must quote or use the data given.', how: 'Quote a figure or a phrase from the case. Answers that ignore the data are capped.' }
  ],

  ladders: [
    {
      marks: '2 marks — define / state',
      steps: [
        'One sentence giving the meaning.',
        'Add a brief example or a second element if the term has two parts.',
        'Stop. Do not write a paragraph.'
      ],
      example: '**Define "added value".** Added value is the difference between the selling price of a product and the cost of the bought-in materials used to make it. For example, a sandwich sold for $4.50 using $1.20 of ingredients has $3.30 of added value.'
    },
    {
      marks: '4 marks — explain two points',
      steps: [
        'Give point 1, then develop it with "which means…" or "so that…".',
        'Give point 2, then develop it the same way.',
        'Two developed points = 4 marks. Four undeveloped points = 2 marks.'
      ],
      example: '**Explain two benefits of training.** Training raises productivity because workers become more skilled and make fewer mistakes, so output per worker rises and unit costs fall. Training also improves motivation because employees feel valued and can gain promotion, which lowers labour turnover and cuts recruitment costs.'
    },
    {
      marks: '6 marks — analyse / explain with judgement',
      steps: [
        'Two developed points, each analysed to a consequence for the business.',
        'Apply each point to the business named in the question.',
        'Finish with one sentence of judgement — which factor matters most and why.'
      ],
      example: 'Structure: Point → because → therefore for this business → (repeat) → overall, the more important is X because…'
    },
    {
      marks: '12 marks — evaluate / recommend / justify',
      steps: [
        '**Plan for two minutes.** Decide your recommendation before you start writing.',
        'Paragraph 1: the case **for**, applied to the business and analysed to a consequence.',
        'Paragraph 2: the case **against**, applied and analysed.',
        'Paragraph 3 (optional): a second option or a different stakeholder\'s view.',
        'Final paragraph: a **clear decision**, the main reason it outweighs the alternative, and what it depends on.'
      ],
      example: 'Ending template: *"Overall I recommend that [business] should [action], because [strongest reason, applied]. Although [counter-argument], this matters less here because [reason from the case]. This recommendation depends on [condition — e.g. whether demand is price elastic / whether the bank agrees to lend]."*'
    }
  ],

  peel: {
    title: 'The structure that earns the marks',
    rows: [
      ['**P — Point**', 'State the factor or argument clearly.', 'AO1'],
      ['**E — Explain / Evidence**', 'Say what it means and quote a fact or figure from the case.', 'AO1 + AO2'],
      ['**A — Analyse**', 'Chain it out: because of this… which means… therefore the business will…', 'AO3'],
      ['**L — Link / Judge**', 'Relate it back to the question and weigh it against the other side.', 'AO4']
    ]
  },

  mistakes: [
    'Writing a general textbook answer with no reference to the business in the question. Application marks are lost immediately.',
    'Listing points instead of developing them. Three undeveloped points score less than two developed ones.',
    'Not deciding on a 12-marker. "It depends on the situation" with no decision cannot reach the top band.',
    'Repeating the same point in different words to fill space.',
    'Ignoring the numbers in the appendices on Paper 2 — they are there to be used.',
    'Spending too long on 2-mark parts and running out of time on the 12-mark part.',
    'Forgetting units on calculations: $, %, units, or ": 1" for ratios.',
    'Answering the question you wish had been asked rather than the one on the paper. Underline the command word first.'
  ],

  formulae: [
    ['Added value', 'selling price − cost of bought-in materials', '1.1'],
    ['Market share', '(business sales ÷ total market sales) × 100', '3.1'],
    ['Labour turnover', '(number leaving ÷ average number employed) × 100', '2.1'],
    ['Labour productivity', 'total output ÷ number of employees', '2.1 / 4.1'],
    ['Price elasticity of demand', '% change in quantity demanded ÷ % change in price', '3.3'],
    ['Total revenue', 'price × quantity sold', '4.2'],
    ['Total costs', 'fixed costs + total variable costs', '4.2'],
    ['Average (unit) cost', 'total costs ÷ output', '4.2'],
    ['Contribution per unit', 'selling price − variable cost per unit', '4.2'],
    ['Break-even output', 'fixed costs ÷ contribution per unit', '4.2'],
    ['Margin of safety', 'current output − break-even output', '4.2'],
    ['Profit (from contribution)', '(contribution per unit × units sold) − fixed costs', '4.2'],
    ['Net cash flow', 'total cash inflows − total cash outflows', '5.2'],
    ['Closing balance', 'opening balance + net cash flow', '5.2'],
    ['Working capital', 'current assets − current liabilities', '5.2 / 5.4'],
    ['Gross profit', 'revenue − cost of sales', '5.3'],
    ['Profit', 'gross profit − expenses', '5.3'],
    ['Retained profit', 'profit after tax − dividends', '5.3'],
    ['Capital employed', 'shareholders\' equity + non-current liabilities', '5.4'],
    ['Gross profit margin', '(gross profit ÷ revenue) × 100', '5.5'],
    ['Profit margin', '(profit ÷ revenue) × 100', '5.5'],
    ['Return on capital employed', '(profit ÷ capital employed) × 100', '5.5'],
    ['Current ratio', 'current assets ÷ current liabilities', '5.5'],
    ['Acid test ratio', '(current assets − inventory) ÷ current liabilities', '5.5']
  ],

  drills: [
    {
      u: 1, tp: '1.4', marks: 12,
      q: 'Ravi runs a successful bakery as a sole trader with 6 employees. He wants to open three more branches but has limited savings. Do you think he should convert the business into a private limited company? Justify your answer.',
      plan: [
        '**For:** limited liability protects Ravi\'s house and savings — important because expansion to three branches is risky and needs borrowing.',
        '**For:** shares can be sold to family and friends to raise the capital he lacks; banks also lend more readily to an incorporated business with separate legal identity and continuity.',
        '**Against:** legal formalities and cost of incorporation; accounts must be filed, so less privacy than as a sole trader.',
        '**Against:** he must share profit and some control with the new shareholders, and decisions become slower.',
        '**Judgement:** recommend converting, because the finance and the liability protection are decisive when he has limited savings and is taking on a risky three-branch expansion. It depends on whether family are willing to buy shares — if not, a bank loan with a personal guarantee may be the only route, and the case for incorporation is weaker.'
      ]
    },
    {
      u: 2, tp: '2.1', marks: 12,
      q: 'A clothing factory has high labour turnover and rising numbers of faulty garments. The operations manager wants to introduce piece rate. Recommend whether piece rate is the best way to solve these problems.',
      plan: [
        '**For:** piece rate directly rewards output, so productivity should rise and unit costs fall (Taylor).',
        '**Against:** the factory\'s problem includes **quality** — piece rate encourages speed over care, so faulty garments would probably increase, not fall.',
        '**Against:** Herzberg argues pay is a hygiene factor: it stops dissatisfaction but does not motivate. High turnover suggests boredom and lack of recognition, which pay will not fix.',
        '**Alternative:** job rotation, cell production and teamworking address the boredom directly; training addresses the quality problem.',
        '**Judgement:** reject piece rate as the main solution. Recommend cell production plus training, with a quality-based bonus rather than a volume-based one, because the quality problem is the more expensive of the two and piece rate would worsen it.'
      ]
    },
    {
      u: 3, tp: '3.3', marks: 12,
      q: 'A small independent coffee shop faces a new national chain opening opposite. Recommend changes to its marketing mix.',
      plan: [
        '**Price:** it cannot win a price war against a chain with economies of scale — competing on price would destroy its margin. Better to hold price and add a loyalty card.',
        '**Product:** differentiate on what the chain cannot copy — locally roasted beans, homemade food, personal service, a distinctive atmosphere. This is niche marketing.',
        '**Promotion:** cheap, targeted local social media and community events, not expensive advertising the shop cannot afford.',
        '**Place:** extend to delivery apps and pre-order collection to defend convenience.',
        '**Judgement:** product differentiation is the priority, because price and place advantages belong to the chain. It depends on whether local customers value quality and personal service over speed and price — market research should confirm this first.'
      ]
    },
    {
      u: 4, tp: '4.2', marks: 12,
      q: 'A furniture manufacturer has fixed costs of $60,000 a year, a selling price of $250 and a variable cost of $150 per unit. It currently sells 800 units. Analyse the position and recommend whether it should cut the price to $220 to increase volume.',
      plan: [
        '**Now:** contribution = $100. Break-even = 60,000 ÷ 100 = **600 units**. Margin of safety = 800 − 600 = **200 units**. Profit = (100 × 800) − 60,000 = **$20,000**.',
        '**After the cut:** contribution = 220 − 150 = **$70**. Break-even = 60,000 ÷ 70 = **858 units** (rounded up).',
        '**Analysis:** the business must sell 858 units just to break even, up from 600. To match the current $20,000 profit it needs (60,000 + 20,000) ÷ 70 = **1,143 units** — a 43% rise in volume.',
        '**Judgement:** only cut the price if demand is price **elastic** enough to deliver a 43% volume increase, and if the factory has the capacity. Otherwise reject it. It depends on the PED evidence and on whether competitors would simply match the cut.'
      ]
    },
    {
      u: 5, tp: '5.2', marks: 12,
      q: 'A growing business is profitable but its cash-flow forecast shows a negative closing balance in three of the next six months. Recommend how it should deal with this.',
      plan: [
        '**Diagnose:** profit is not cash. The negative balances are likely caused by customers taking long credit while the business pays suppliers and wages quickly, plus spending on expansion.',
        '**Option 1 — overdraft:** fast and flexible, interest only on what is used. But high interest and repayable on demand.',
        '**Option 2 — reduce credit given to customers / offer early-payment discounts:** speeds up inflows at no interest cost, but customers may leave for competitors with easier terms.',
        '**Option 3 — negotiate longer trade credit or delay the equipment purchase:** free, and directly moves outflows to the strong months.',
        '**Judgement:** delay the non-urgent capital spending and negotiate longer supplier credit first, because these cost nothing; arrange an overdraft as a back-up for the remaining gap. Do not take a long-term loan for a short-term timing problem. It depends on whether suppliers will agree, which depends on the business\'s payment record.'
      ]
    },
    {
      u: 6, tp: '6.3', marks: 12,
      q: 'A manufacturer exports 70% of its output but imports 40% of its raw materials. Its currency has depreciated by 15%. Evaluate the overall impact on the business.',
      plan: [
        '**Exports (70%):** a weaker currency makes exports cheaper abroad, so the business becomes more price competitive, sales and revenue should rise, and it can hold its home-currency price and improve margins instead.',
        '**Imports (40% of materials):** imported materials now cost 15% more in home currency, raising variable costs and squeezing contribution per unit.',
        '**Net effect:** because exports (70% of output) outweigh imported inputs (40% of materials), the gain is likely to be larger than the loss — but only if demand abroad is price elastic enough to convert cheaper prices into extra volume.',
        '**Judgement:** overall positive in the short run. It depends on the elasticity of export demand, whether the depreciation lasts, and whether local suppliers could replace some imported materials. Recommend sourcing more locally to reduce exposure if the weakness persists.'
      ]
    }
  ]
};
