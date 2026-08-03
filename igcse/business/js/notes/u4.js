/* Unit 4 — Operations management */

BS.addTopic({
  id: '4.1', unit: 4, title: 'Production of goods and services',
  syllabus: [
    'The meaning of production',
    'The difference between production and productivity, and how productivity can be increased',
    'The benefits and limitations of lean production and how it can be achieved',
    'The main methods of production: job, batch and flow',
    'How technology has changed production methods'
  ],
  sections: [
    {
      h: 'Production and productivity',
      body: [
        { defs: [
          ['Production', 'The process of converting inputs (land, labour, capital and enterprise) into outputs — goods and services.'],
          ['Productivity', 'A measure of the efficiency of the inputs used: output per worker, or output per machine, in a given period.'],
          ['Efficiency', 'Producing the required output at the lowest possible cost per unit.']
        ] },
        { formula: 'Labour productivity = total output ÷ number of employees' },
        { callout: { k: 'warn', b: 'Production is the **total amount** made. Productivity is **output per worker**. A factory can raise production by hiring more workers while productivity stays exactly the same. Mixing these two up is one of the most common Unit 4 errors.' } },
        { h3: 'How to increase productivity' },
        { table: { head: ['Method', 'Effect', 'Problem'], rows: [
          ['**Training** the workforce', 'Workers are more skilled, faster and make fewer mistakes', 'Expensive; trained staff may leave'],
          ['**Improved motivation** — bonuses, enrichment, teamworking', 'Workers put in more effort; see [[2.1]]', 'Financial incentives raise costs; may lower quality if rushed'],
          ['**Buying better technology / automation**', 'Machines work faster, longer and more consistently than people', 'Very high capital cost; redundancies damage morale; breakdowns halt production'],
          ['**Improved production methods** — lean production, better layout', 'Less waste and less wasted movement', 'Disruption while changes are made; retraining needed'],
          ['**Better working conditions**', 'Less fatigue and absence', 'Costs money and takes time to show results']
        ] } },
        { h3: 'Why higher productivity matters' },
        { list: [
          'Lower **cost per unit**, so higher profit margin or a lower price than rivals',
          'Fewer workers needed for the same output',
          'The business becomes more **competitive** internationally',
          'Higher profits allow more **investment**'
        ] }
      ]
    },
    {
      h: 'Methods of production',
      body: [
        { table: { head: ['', 'Job production', 'Batch production', 'Flow (mass) production'], rows: [
          ['What it is', 'One unique product made at a time, to the customer\'s order, and finished before the next starts', 'Groups of identical products made together; each stage is completed for the whole batch before the next begins', 'Large quantities of an identical product move continuously along a production line'],
          ['Examples', 'A wedding dress, a bridge, a hairdresser\'s appointment, custom software', 'Bread in a bakery, batches of a paint colour, classes of furniture', 'Cars, canned drinks, newspapers, breakfast cereal'],
          ['Advantages', 'Meets the customer\'s exact requirements; high quality and a high price can be charged; varied work motivates skilled staff', 'Some economies of scale; flexible — the product can be changed between batches; some variety for workers', 'Very low unit costs from huge economies of scale; fast; consistent quality; can be automated; low labour cost per unit'],
          ['Disadvantages', 'Very high unit costs; slow; skilled workers are expensive; hard to get economies of scale', 'Machines must be reset between batches, causing downtime; stocks of part-finished goods tie up money; less flexible than job', 'Very high set-up cost; extremely inflexible — the product cannot be varied; repetitive work demotivates staff; a breakdown at one point stops everything; large stocks needed']
        ] } },
        { callout: { k: 'tip', b: 'Choosing a method depends on: the **size of the market** (small/individual → job; large → flow), the **level of customisation** the customer wants, the **capital available**, and how **standardised** the product is.' } }
      ]
    },
    {
      h: 'Lean production',
      body: [
        '**Lean production** means producing goods and services with the minimum of waste — of time, materials, labour, space, energy and defects.',
        { h3: 'Methods of lean production' },
        { table: { head: ['Method', 'What it does'], rows: [
          ['**Just-in-time (JIT) inventory**', 'Materials arrive exactly when needed and finished goods are made to order, so almost no stock is held'],
          ['**Kaizen (continuous improvement)**', 'All employees suggest small, constant improvements to methods and layout; regular kaizen meetings'],
          ['**Cell production**', 'The production line is split into self-contained teams, each responsible for a complete unit of work — more motivating and more flexible'],
          ['**Total quality management**', 'Every employee is responsible for quality, so defects are prevented rather than found later — see [[4.3]]']
        ] } },
        { table: { head: ['Benefits of lean production', 'Limitations'], rows: [
          ['Less waste, so lower costs per unit', 'JIT leaves no buffer stock — one late delivery stops production'],
          ['Less money tied up in stock, improving cash flow and working capital', 'Requires reliable, nearby suppliers and excellent relationships'],
          ['Less storage space needed, cutting rent and insurance', 'No bulk-buying discounts on small, frequent deliveries'],
          ['Fewer defects and higher quality', 'Cannot cope with sudden surges in demand'],
          ['Faster response to changes in customer demand', 'Requires a well-trained, flexible, motivated workforce'],
          ['Employees are more involved and motivated (kaizen, cells)', 'Changing to lean production is disruptive and costly at first']
        ] } }
      ]
    },
    {
      h: 'Managing inventory',
      body: [
        { table: { head: ['Holding high stock levels', 'Holding low stock levels (JIT)'], rows: [
          ['Never run out — customer orders are always met', 'Less capital tied up, so better cash flow'],
          ['Bulk-buying discounts reduce the cost per unit', 'Lower storage, insurance and security costs'],
          ['Can cope with a sudden rise in demand or a supplier delay', 'Less waste from stock going out of date, being damaged or stolen'],
          ['Production is not interrupted', 'Space freed for production'],
          ['*But*: high storage costs, cash tied up, risk of damage, theft and obsolescence', '*But*: no safety margin; higher delivery costs; stock-outs lose sales and customers']
        ] } },
        { callout: { k: 'note', t: 'Buffer stock', b: 'A **buffer (minimum) stock** is the level kept in reserve in case of unexpected demand or supply problems. The **re-order level** is the stock level at which a new order is placed, calculated so that new stock arrives before the buffer is used up.' } }
      ]
    },
    {
      h: 'Technology in production',
      body: [
        { list: [
          '**CAD** (computer-aided design) — designing products on a computer; faster and cheaper to change a design',
          '**CAM** (computer-aided manufacture) — computers control the machines making the product',
          '**Robotics and automation** — machines do repetitive tasks continuously',
          '**Computerised stock control** — automatically reorders when stock hits the re-order level',
          '**EPOS** (electronic point of sale) — scans sales at the till and updates stock records instantly'
        ] },
        { table: { head: ['Advantages of new technology', 'Disadvantages'], rows: [
          ['Higher productivity — machines work 24 hours without breaks', 'Very high purchase and installation cost'],
          ['Consistent quality with fewer defects', 'Redundancies cause resistance, poor morale and redundancy payments'],
          ['Lower labour costs in the long run', 'Retraining staff is expensive and takes time'],
          ['Faster response to orders and quicker design changes', 'Breakdowns stop production completely'],
          ['Better information for managers to make decisions', 'Technology becomes obsolete quickly, needing further investment']
        ] } }
      ]
    }
  ],
  terms: ['production', 'productivity', 'job-production', 'batch-production', 'flow-production', 'lean-production', 'just-in-time', 'kaizen', 'cell-production', 'buffer-stock', 'automation', 'cad-cam'],
  tips: [
    'When recommending a production method, quote the **order size and level of customisation** from the case.',
    'JIT evaluation always turns on supplier reliability — check the case for delivery problems before recommending it.'
  ],
  traps: [
    'Confusing production with productivity.',
    'Saying flow production is "always cheapest" — it is only cheap at very high volumes.'
  ]
});

BS.addTopic({
  id: '4.2', unit: 4, title: 'Costs, scale of production and break-even analysis',
  syllabus: [
    'Identify and classify costs',
    'Use of cost data to help make simple cost-based decisions',
    'Concepts of and the difference between economies and diseconomies of scale',
    'Break-even analysis: drawing, interpreting and using break-even charts, calculation and limitations'
  ],
  sections: [
    {
      h: 'Classifying costs',
      body: [
        { defs: [
          ['Fixed costs', 'Costs that do **not** change with the level of output in the short run: rent, salaries of managers, insurance, loan interest, advertising. They must be paid even if output is zero.'],
          ['Variable costs', 'Costs that **change directly** with output: raw materials, components, packaging, piece-rate wages, power used by machines.'],
          ['Total costs', 'Fixed costs plus total variable costs.'],
          ['Average cost (unit cost)', 'The cost of producing one unit — total costs divided by output.'],
          ['Revenue', 'The money coming in from sales: selling price × quantity sold.'],
          ['Profit', 'Total revenue minus total costs.']
        ] },
        { formula: 'Total variable cost = variable cost per unit × output\nTotal cost      = fixed costs + total variable cost\nAverage cost    = total cost ÷ output\nTotal revenue   = price × quantity sold\nProfit          = total revenue − total cost' },
        { callout: { k: 'warn', b: 'A cost is only "fixed" **in the short run**. If output doubles and a second factory is rented, rent rises. And a manager\'s salary is fixed; a factory worker paid per unit is variable. Read the case study carefully — do not assume all wages are one or the other.' } },
        { h3: 'Using cost data to make decisions' },
        { list: [
          'Setting the **price** — the price must cover the cost per unit if the business is to make a profit (cost-plus pricing, see [[3.3]])',
          'Deciding whether to **accept an order** — if the price offered covers the variable cost and contributes to fixed costs, it may be worth taking',
          'Deciding whether to **stop making a product** — compare its revenue with its costs',
          'Deciding whether to **relocate or buy new machinery** — compare the cost saving with the cost of the change',
          'Setting **budgets** and monitoring whether costs are under control'
        ] }
      ]
    },
    {
      h: 'Economies of scale',
      body: [
        '**Economies of scale** are the factors that cause the **average cost per unit to fall** as a business grows and produces on a larger scale.',
        { table: { head: ['Type', 'How it lowers unit costs'], rows: [
          ['**Purchasing (bulk-buying)**', 'Large orders earn discounts from suppliers, so materials cost less per unit'],
          ['**Technical**', 'Large firms can afford specialised, faster machinery and use it fully; the machine\'s cost is spread over far more units'],
          ['**Financial**', 'Large firms are seen as lower risk, so banks lend to them at **lower interest rates** and in larger amounts'],
          ['**Marketing**', 'The cost of an advertising campaign or a delivery lorry is spread over far more units'],
          ['**Managerial**', 'Large firms can employ specialist managers (a marketing director, an accountant) whose salaries are spread over more output, and who are more efficient than one generalist'],
          ['**Risk-bearing**', 'A large firm can produce several products in several markets, so a fall in one does not threaten the whole business']
        ] } },
        { h3: 'Diseconomies of scale' },
        '**Diseconomies of scale** are the factors that cause the average cost per unit to **rise** when a business becomes too large.',
        { table: { head: ['Type', 'Why costs rise'], rows: [
          ['**Poor communication**', 'A long chain of command means messages are slow and distorted, so mistakes are made and decisions are delayed'],
          ['**Poor coordination**', 'Too many departments and sites to control; duplication of work and wasted resources'],
          ['**Low morale / motivation**', 'Workers feel like a small cog in a huge machine; absenteeism and turnover rise and productivity falls'],
          ['**Slow decision making**', 'Decisions pass through many layers of management, so the firm reacts slowly to the market']
        ] } },
        { callout: { k: 'tip', b: 'Draw or describe the **average cost curve**: it falls as output rises (economies of scale), reaches a minimum at the optimum output, then rises (diseconomies). Naming the minimum point as the most efficient level of output is a strong analysis mark.' } }
      ]
    },
    {
      h: 'Break-even analysis',
      body: [
        { defs: [
          ['Break-even point', 'The level of output at which total revenue exactly equals total costs — the business makes neither profit nor loss.'],
          ['Contribution per unit', 'Selling price per unit minus variable cost per unit. It is the amount each unit contributes towards paying the fixed costs, and then towards profit.'],
          ['Margin of safety', 'The amount by which current output exceeds the break-even output. It shows how far sales can fall before a loss is made.']
        ] },
        { formula: 'Contribution per unit = selling price per unit − variable cost per unit\n\nBreak-even output = fixed costs ÷ contribution per unit\n\nMargin of safety  = current output − break-even output\n\nProfit = (contribution per unit × units sold) − fixed costs' },
        { callout: { k: 'eg', b: 'Fixed costs $12,000. Selling price $20. Variable cost $8.\nContribution = $20 − $8 = **$12**.\nBreak-even = 12,000 ÷ 12 = **1,000 units**.\nIf the firm currently sells 1,500 units, margin of safety = **500 units**, and profit = (12 × 1,500) − 12,000 = **$6,000**.' } },
        { h3: 'Drawing a break-even chart' },
        { num: [
          'Output (units) on the **horizontal** axis; costs and revenue ($) on the **vertical** axis',
          '**Fixed costs**: a horizontal line at the level of the fixed costs',
          '**Total costs**: a straight line starting where the fixed cost line meets the vertical axis, sloping upward',
          '**Total revenue**: a straight line starting from the **origin (0,0)**, sloping upward more steeply',
          'The **break-even point** is where the total revenue and total cost lines cross. Read the output down to the horizontal axis',
          'Left of that point is the **loss** area; right of it is the **profit** area'
        ] },
        { callout: { k: 'warn', b: 'The total revenue line must start at the **origin** — at zero output there is zero revenue. The total cost line must start at the **fixed cost** level, not at zero. Getting these two starting points wrong is the most common charting error.' } },
        { h3: 'What changes the break-even point?' },
        { table: { head: ['Change', 'Effect on break-even output'], rows: [
          ['Fixed costs rise (higher rent)', '**Rises** — more units needed to cover the higher fixed costs'],
          ['Variable cost per unit rises (dearer materials)', '**Rises** — contribution per unit falls'],
          ['Selling price rises', '**Falls** — contribution per unit rises (but demand may fall)'],
          ['Selling price falls', '**Rises** — each unit contributes less']
        ] } },
        { h3: 'Uses and limitations of break-even analysis' },
        { table: { head: ['Uses', 'Limitations'], rows: [
          ['Shows the minimum output needed to avoid a loss', 'Assumes **all output is sold** — in reality some stock is unsold'],
          ['Shows the profit or loss at any level of output', 'Assumes costs and revenue rise in a **straight line** — it ignores bulk discounts and economies of scale'],
          ['Shows the effect of a change in price or costs before it is made', 'Assumes fixed costs stay fixed at **all** output levels — they usually step up'],
          ['Useful when applying for a bank loan as part of a business plan', 'The data is only a **forecast** — if the estimates are wrong, so is the chart'],
          ['Helps set targets and make quick "what-if" decisions', 'Only really works for a **single product**; most firms sell many']
        ] } }
      ]
    }
  ],
  terms: ['fixed-costs', 'variable-costs', 'total-costs', 'average-cost', 'revenue', 'contribution', 'break-even', 'margin-of-safety', 'economies-of-scale', 'diseconomies-of-scale'],
  tips: [
    'Show your working line by line in break-even calculations — method marks are given even if the final number is wrong.',
    'After calculating break-even, always **comment**: is it achievable given the market size in the case study?',
    'Use the Calculators tab of this app to check your practice answers.'
  ],
  traps: [
    'Dividing fixed costs by the selling price instead of by the contribution.',
    'Forgetting that variable costs must be *per unit* in the contribution formula.',
    'Saying break-even output is a level of *revenue* — it is a level of *output*.'
  ]
});

BS.addTopic({
  id: '4.3', unit: 4, title: 'Achieving quality production',
  syllabus: [
    'Why quality is important and how quality production might be achieved',
    'The concepts of quality control and quality assurance'
  ],
  sections: [
    {
      h: 'Why quality matters',
      body: [
        '**Quality** means producing a good or service that meets customers\' expectations — it is fit for purpose, reliable and safe.',
        { list: [
          'A good **reputation** and brand image, so customers return and recommend the business',
          'Fewer **returns, refunds, repairs and complaints**, all of which cost money',
          'A **higher price** can be charged for a product known to be reliable',
          'A **competitive advantage** over rivals of similar price',
          'Avoids expensive **product recalls** and legal action for unsafe goods',
          'Easier to **launch new products** under a trusted brand name'
        ] },
        { callout: { k: 'warn', b: 'Poor quality is expensive: wasted materials, wasted labour, reworking, compensation, lost customers and long-term damage to the brand. This is why prevention is cheaper than inspection.' } }
      ]
    },
    {
      h: 'Quality control vs quality assurance',
      body: [
        { table: { head: ['', 'Quality control (QC)', 'Quality assurance (QA)'], rows: [
          ['What it is', 'Checking and inspecting products **at the end** of the production process (and at key stages) to find faults', 'Checking quality **throughout** the process, with agreed standards at every stage, so faults are prevented'],
          ['Who does it', 'A separate team of quality **inspectors**', '**Every employee** is responsible for the quality of their own work'],
          ['When', 'After production', 'Before and during production'],
          ['Advantages', 'Faulty goods do not reach the customer; needs little training of ordinary staff; problems are identified', 'Faults are prevented, so far less waste and reworking; workers feel responsible and are more motivated; fewer inspectors needed; builds a quality reputation with customers'],
          ['Disadvantages', 'Expensive — inspectors must be paid; faults are found only after money has been spent making the item; the whole batch may be wasted; workers do not feel responsible for quality', 'Expensive and time-consuming to introduce; all staff need training; only works if every worker takes it seriously']
        ] } },
        { defs: [
          ['Total quality management (TQM)', 'A quality assurance approach where quality is the responsibility of every employee, at every stage, aiming for zero defects and continuous improvement. Each worker treats the next stage in the process as their "internal customer".']
        ] },
        { table: { head: ['Benefits of TQM', 'Drawbacks'], rows: [
          ['Aims for zero defects, so waste and reworking almost disappear', 'Expensive and slow to introduce — extensive training is needed'],
          ['No need for a separate inspection department', 'Requires total commitment from every employee; one weak link breaks it'],
          ['Motivates staff by giving them responsibility for quality', 'Can create a lot of paperwork and meetings'],
          ['Strong reputation for quality supports a higher price', 'Benefits take a long time to appear']
        ] } },
        { callout: { k: 'tip', b: 'A complete answer on improving quality names the **method** (QA/TQM/training/better materials/better machines), the **benefit**, and the **cost** — then judges whether a business of this size can afford it.' } }
      ]
    }
  ],
  terms: ['quality', 'quality-control', 'quality-assurance', 'tqm'],
  tips: [
    'Quality control finds faults; quality assurance prevents them. Use those two verbs and the difference is clear.',
    'Link quality to [[4.1]] lean production — TQM is one of the lean production methods.'
  ],
  traps: [
    'Saying quality assurance means "checking at the end" — that is quality control.',
    'Ignoring the cost and training implications of introducing TQM.'
  ]
});

BS.addTopic({
  id: '4.4', unit: 4, title: 'Location decisions',
  syllabus: [
    'The main factors influencing the location and relocation decisions of a business',
    'The role of legal controls on location decisions',
    'The factors that a business must consider when deciding which country to locate operations in'
  ],
  sections: [
    {
      h: 'Factors affecting location',
      body: [
        { h3: 'Locating a manufacturing business' },
        { table: { head: ['Factor', 'Why it matters'], rows: [
          ['**Nearness to raw materials**', 'Cuts transport costs, especially for **bulk-reducing** industries where materials are heavy and bulky (steel, food processing)'],
          ['**Nearness to the market**', 'Cuts distribution costs, especially for **bulk-increasing** or fragile/perishable products (bottled drinks, bread)'],
          ['**Availability and cost of labour**', 'Enough workers with the right skills, at a wage the business can afford'],
          ['**Transport links**', 'Ports, motorways, airports and rail for bringing in materials and sending out goods'],
          ['**Cost of the site**', 'Land and rent are far cheaper outside city centres — a major cost for a large factory'],
          ['**Power and water supply**', 'Essential and expensive for heavy industry'],
          ['**Government incentives**', 'Grants, subsidies, tax breaks and cheap rent in areas of high unemployment'],
          ['**Room to expand**', 'Space to grow without another expensive move later'],
          ['**Safety and planning restrictions**', 'Chemical and nuclear plants must be sited away from housing']
        ] } },
        { h3: 'Locating a retail or service business' },
        { table: { head: ['Factor', 'Why it matters'], rows: [
          ['**Footfall / passing trade**', 'The number of potential customers who walk past — the single biggest factor for most shops'],
          ['**Nearness to competitors**', 'Sometimes an advantage (a shopping centre draws crowds), sometimes not (too many similar shops)'],
          ['**Customer parking and public transport**', 'Customers will not come if they cannot get there easily'],
          ['**Rent and local taxes**', 'Prime high-street sites are very expensive; the extra sales must justify it'],
          ['**Security**', 'Crime rates affect insurance and losses'],
          ['**Availability of suitable premises**', 'Size, layout and lease terms'],
          ['**E-commerce**', 'For an online retailer, physical location matters far less — a cheap warehouse near transport links is enough']
        ] } }
      ]
    },
    {
      h: 'Relocation',
      body: [
        { table: { head: ['Reasons to relocate', 'Problems of relocating'], rows: [
          ['The current site is too small to expand', 'Very expensive — new premises, moving equipment, redundancy payments'],
          ['Cheaper rent, wages or land elsewhere', 'Production stops during the move, so orders may be lost'],
          ['To be nearer a growing market or a new supplier', 'Skilled staff may refuse to move, so knowledge and experience are lost'],
          ['Government grants in another region', 'New staff must be recruited and trained'],
          ['The lease has expired or the building is unsuitable', 'Loyal local customers may be lost'],
          ['To reduce transport costs', 'Damage to the local community\'s goodwill and possible bad publicity']
        ] } }
      ]
    },
    {
      h: 'Legal controls on location',
      body: [
        { list: [
          '**Planning permission** — governments restrict what can be built and where, to protect residential areas, farmland and areas of natural beauty',
          '**Environmental laws** — restrictions on emissions, waste disposal and noise, which may rule out certain sites entirely — see [[6.2]]',
          '**Health and safety regulations** — hazardous industries must be located away from housing and schools',
          '**Enterprise / development zones** — governments *encourage* location in high-unemployment areas with grants, subsidies and reduced regulation'
        ] },
        { callout: { k: 'note', b: 'Legal controls can force a business into a **second-best, more expensive** location. But they also protect residents and the environment, and the incentives that come with development zones can make a cheaper site viable.' } }
      ]
    },
    {
      h: 'Locating in another country',
      body: [
        { table: { head: ['Factor', 'What to consider'], rows: [
          ['**Labour costs and skills**', 'Wages may be much lower, but is the workforce skilled and productive enough?'],
          ['**Nearness to the market**', 'Producing inside the country avoids transport costs and delivery delays'],
          ['**Avoiding tariffs and quotas**', 'Producing inside a trade bloc avoids import barriers on finished goods — see [[6.3]]'],
          ['**Government grants and tax rates**', 'Many governments offer generous incentives to attract foreign investment'],
          ['**Availability of raw materials**', 'Locating at the source cuts transport costs'],
          ['**Exchange rates**', 'A weak local currency makes costs cheap, but profits sent home are worth less'],
          ['**Political stability and legal system**', 'Risk of unrest, corruption, changing laws or assets being seized'],
          ['**Infrastructure**', 'Roads, ports, power supply and internet must be reliable'],
          ['**Language and culture**', 'Communication difficulties with local staff, customers and officials']
        ] } },
        { callout: { k: 'tip', b: 'A location answer scores highest when it **weighs** the factors: pick the two or three that matter most **for this type of business** (a heavy manufacturer weighs raw materials and transport; a coffee shop weighs footfall) and justify the choice, rather than listing all of them.' } }
      ]
    }
  ],
  terms: ['location', 'relocation', 'footfall', 'infrastructure', 'government-incentives', 'planning-permission'],
  tips: [
    'Sort your points by the **type of business** in the case: manufacturer, retailer or service.',
    'Cost is never the only factor — mention at least one non-cost factor such as skills, infrastructure or legal restrictions.'
  ],
  traps: [
    'Giving manufacturing factors for a retail business (or the reverse).',
    'Recommending relocation without weighing the cost of moving.'
  ]
});
