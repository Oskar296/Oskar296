/* Unit 1 — Understanding business activity */

BS.addTopic({
  id: '1.1', unit: 1, title: 'Business activity',
  syllabus: [
    'The concepts of needs, wants, scarcity and opportunity cost',
    'The importance of specialisation',
    'The purpose of business activity',
    'The concept of added value and how it can be increased'
  ],
  sections: [
    {
      h: 'Needs, wants and scarcity',
      body: [
        'Every economy faces the same basic problem: people\'s wants are unlimited but the resources available to satisfy them are limited. This is **scarcity**, and it is the reason businesses exist at all.',
        { defs: [
          ['Needs', 'Goods and services essential for survival: food, water, shelter, clothing, warmth. Without them a person cannot live.'],
          ['Wants', 'Goods and services people would *like* to have but can survive without: a phone, a holiday, branded trainers. Wants are unlimited.'],
          ['Scarcity', 'There are not enough resources to produce everything people want, so choices must be made.'],
          ['Opportunity cost', 'The next best alternative given up when a choice is made.']
        ] },
        'Because of scarcity, every decision has an **opportunity cost**. A business with $50,000 that spends it on new machinery gives up the chance to spend it on a marketing campaign — the campaign is the opportunity cost.',
        { callout: { k: 'warn', b: 'Opportunity cost is *not* "the money you spent". It is the **best alternative you gave up**. Always name a specific alternative in your answer: "the opportunity cost of buying the delivery van is the new oven the bakery could have bought instead."' } }
      ]
    },
    {
      h: 'Factors of production',
      body: [
        'Businesses combine four scarce resources, called the factors of production, to make goods and services.',
        { table: { head: ['Factor', 'What it is', 'Reward'], rows: [
          ['Land', 'All natural resources: the site, water, oil, minerals, crops', 'Rent'],
          ['Labour', 'The physical and mental effort of workers', 'Wages / salaries'],
          ['Capital', 'Man-made resources used to produce: machinery, vehicles, tools, buildings, finance', 'Interest'],
          ['Enterprise', 'The person who takes the risk, organises the other three factors and makes decisions', 'Profit']
        ] } }
      ]
    },
    {
      h: 'Specialisation and the division of labour',
      body: [
        '**Specialisation** means people, businesses or countries concentrating on what they do best. Inside a business this becomes the **division of labour**, where production is split into separate tasks and each worker repeats one of them.',
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Workers become quicker and more skilled at their one task, so output per worker rises', 'Repeating one task is boring, so motivation, quality and effort fall'],
          ['Less time wasted moving between tasks and tools', 'Higher labour turnover and absenteeism as workers get fed up'],
          ['Training is cheaper and faster because each worker learns less', 'If one worker is absent or one stage stops, the whole line can stop'],
          ['Quality improves and unit costs fall as skill builds up', 'Workers become less flexible — they can only do one job']
        ] } },
        { callout: { k: 'eg', b: 'A car factory: one team fits the doors, another sprays the body, another installs the electronics. Each team is far faster at its own stage than one worker building the whole car, so more cars are produced per day.' } }
      ]
    },
    {
      h: 'The purpose of business activity',
      body: [
        'A **business** is any organisation that combines the factors of production to make goods or provide services that satisfy people\'s needs and wants.',
        { list: [
          'It identifies the needs and wants of customers',
          'It buys in the resources (**inputs**) needed to satisfy them',
          'It transforms those inputs into **outputs** — goods or services',
          'It sells the output, usually to make a **profit** for the owners'
        ] },
        { formula: 'INPUTS  →  PROCESS (transformation)  →  OUTPUTS\nraw materials, labour,     manufacturing,        finished goods\nmachines, land             assembling, serving   and services' }
      ]
    },
    {
      h: 'Added value',
      body: [
        '**Added value** is the difference between the selling price of a product and the cost of the bought-in materials and components used to make it.',
        { formula: 'Added value = Selling price − Cost of bought-in materials and components' },
        { callout: { k: 'eg', b: 'A sandwich shop buys bread, cheese and salad for $1.20 and sells the sandwich for $4.50. Added value = $4.50 − $1.20 = **$3.30** per sandwich.' } },
        { callout: { k: 'warn', b: 'Added value is **not profit**. Added value still has to cover all the other costs — wages, rent, electricity, marketing. Profit is what is left after *all* costs. Saying "added value is another word for profit" loses marks.' } },
        { h3: 'Why added value matters' },
        { list: [
          'It is the money available to pay the business\'s other running costs',
          'Whatever is left after those costs is profit for the owners',
          'The more value a business adds, the more it can afford to invest and grow'
        ] },
        { h3: 'How a business can increase added value' },
        { table: { head: ['Method', 'How it works', 'Risk'], rows: [
          ['Raise the selling price', 'Charge more without raising material costs', 'Customers may buy from cheaper rivals unless the product is genuinely better'],
          ['Reduce the cost of materials', 'Find a cheaper supplier, buy in bulk, waste less', 'Cheaper materials may reduce quality and damage the brand'],
          ['Improve the product', 'Better design, features, materials or after-sales service justify a higher price', 'Improvements cost money, so added value may not rise'],
          ['Branding and promotion', 'A strong brand makes customers willing to pay a premium', 'Advertising is an extra cost'],
          ['Better customer service / convenience', 'Fast delivery, personalisation, a nicer environment', 'Needs more staff or training']
        ] } }
      ]
    }
  ],
  terms: ['needs', 'wants', 'scarcity', 'opportunity-cost', 'factors-of-production', 'specialisation', 'division-of-labour', 'added-value'],
  tips: [
    'If a question says "calculate the added value", subtract only the **bought-in materials** — not wages, not rent.',
    'For a 2-mark "define" question give the definition plus a short example. The example is often the second mark.',
    'Opportunity cost questions almost always want a named alternative from the case study, not a general definition.'
  ],
  traps: [
    'Confusing added value with profit.',
    'Saying opportunity cost is "the cost of the item".',
    'Listing division-of-labour advantages without linking them to lower costs or higher output.'
  ]
});

BS.addTopic({
  id: '1.2', unit: 1, title: 'Classification of businesses',
  syllabus: [
    'The basis of business classification: primary, secondary and tertiary sectors',
    'Reasons for the changing importance of business classification',
    'The differences between the private and public sectors'
  ],
  sections: [
    {
      h: 'The three sectors',
      body: [
        { table: { head: ['Sector', 'Activity', 'Examples'], rows: [
          ['**Primary**', 'Extracting natural resources from the earth or sea', 'Farming, fishing, mining, oil extraction, forestry'],
          ['**Secondary**', 'Manufacturing and processing raw materials into finished or semi-finished goods; construction', 'Car assembly, baking, steel making, house building'],
          ['**Tertiary**', 'Providing services to businesses and consumers', 'Retailing, banking, insurance, transport, hotels, hairdressing, education']
        ] } },
        { callout: { k: 'tip', b: 'To classify a business, ask *what does it actually do to the product?* A company that grows coffee beans is primary; one that roasts and packs them is secondary; a coffee shop that serves the drink is tertiary.' } }
      ]
    },
    {
      h: 'Changing sector importance',
      body: [
        { defs: [
          ['De-industrialisation', 'The decline in the importance of the secondary (manufacturing) sector in an economy, and the growth of the tertiary sector.'],
          ['Industrialisation', 'The growing importance of the secondary sector — typical of a developing economy.']
        ] },
        { h3: 'Why the secondary sector declines in richer countries' },
        { list: [
          'Manufacturing moves to countries with **lower labour costs**',
          'Automation and machinery mean **fewer workers** are needed for the same output',
          'As incomes rise, people spend proportionally more on **services** — travel, eating out, entertainment, healthcare',
          'Some raw materials **run out**, closing primary industries'
        ] },
        { h3: 'Why industrialisation happens in developing countries' },
        { list: [
          'Higher output raises **living standards** and GDP',
          'Manufacturing creates **jobs**, reducing unemployment',
          'It cuts **imports** of manufactured goods and raises exports, improving the balance of payments',
          'It attracts **multinational investment** and new technology'
        ] }
      ]
    },
    {
      h: 'Private sector vs public sector',
      body: [
        { table: { head: ['', 'Private sector', 'Public sector'], rows: [
          ['Owned by', 'Individuals and shareholders', 'The government / state'],
          ['Main objective', 'Profit, survival, growth', 'Provide an essential service to everyone, often at low or no cost'],
          ['Funded by', 'Owners\' capital, loans, retained profit, share issues', 'Taxation and government borrowing'],
          ['Examples', 'A sole trader shop, a supermarket chain, a bank', 'State schools, public hospitals, the army, some rail and postal services']
        ] } },
        { defs: [
          ['Mixed economy', 'An economy with both a private sector and a public sector. Almost every real economy is mixed.'],
          ['Free-market economy', 'Almost all resources are owned and allocated by the private sector.'],
          ['Planned (command) economy', 'The government owns and allocates almost all resources.'],
          ['Privatisation', 'Selling a public-sector business to the private sector.'],
          ['Nationalisation', 'The government taking a private-sector business into public ownership.']
        ] }
      ]
    }
  ],
  terms: ['primary-sector', 'secondary-sector', 'tertiary-sector', 'de-industrialisation', 'private-sector', 'public-sector', 'mixed-economy', 'privatisation'],
  tips: [
    'Public sector does **not** mean "public limited company". A plc is private sector — the shares are just sold to the public.',
    'When asked why a sector is growing, link the reason to the case-study country\'s stage of development.'
  ],
  traps: [
    'Calling a public limited company "public sector".',
    'Putting construction in the primary sector — it is secondary.'
  ]
});

BS.addTopic({
  id: '1.3', unit: 1, title: 'Enterprise, business growth and size',
  syllabus: [
    'Characteristics of successful entrepreneurs and the contents of a business plan',
    'Why and how governments support business start-ups',
    'The methods and problems of measuring business size',
    'Why some businesses grow and others stay small; internal and external growth',
    'Why some businesses fail'
  ],
  sections: [
    {
      h: 'Entrepreneurs',
      body: [
        'An **entrepreneur** is a person who organises the other factors of production and takes the financial risk of starting and running a business.',
        { h3: 'Characteristics of a successful entrepreneur' },
        { list: [
          '**Risk taker** — willing to lose their own money if the idea fails',
          '**Innovative / creative** — spots gaps in the market and thinks of new ideas',
          '**Hard-working and determined** — long hours, does not give up after setbacks',
          '**Self-confident** — believes in the idea and can persuade banks and investors',
          '**Effective communicator** — sells the idea to customers, staff and lenders',
          '**Good at organising and planning** — manages money, people and time'
        ] },
        { h3: 'Benefits and drawbacks of being an entrepreneur' },
        { table: { head: ['Benefits', 'Drawbacks'], rows: [
          ['Independence — be your own boss and make your own decisions', 'Risk of losing your savings if the business fails'],
          ['Keep all the profit', 'Long, unsociable hours and stress'],
          ['Job satisfaction from building something of your own', 'No guaranteed income, no paid holiday or sick pay'],
          ['Can choose hours and location', 'Raising the start-up capital is difficult']
        ] } }
      ]
    },
    {
      h: 'The business plan',
      body: [
        'A **business plan** is a written document describing the business, its objectives, strategies, target market and financial forecasts.',
        { h3: 'Typical contents' },
        { list: [
          'Description of the business and its **products / services**',
          'The **owners** and key personnel and their experience',
          '**Market research** findings: the target market, customers and competitors',
          '**Marketing plan** — the marketing mix to be used',
          '**Location** and premises',
          '**Finance**: how much is needed, where it will come from, cash-flow forecast, forecast income statement, break-even'
        ] },
        { h3: 'Why a business plan helps' },
        { list: [
          'Banks and investors will usually **not lend without one** — it shows the idea has been thought through',
          'It forces the entrepreneur to **research** the market before spending money',
          'It sets **targets** so performance can be measured later',
          'It reduces the **risk** of failure by identifying problems early'
        ] }
      ]
    },
    {
      h: 'Government support for start-ups',
      body: [
        { h3: 'Why governments help new businesses' },
        { list: [
          'They create **jobs** and reduce unemployment',
          'They increase **output and GDP**, raising living standards',
          'They increase **choice and competition** for consumers',
          'Some grow into large firms that **export**, improving the balance of payments',
          'More business activity means more **tax revenue**'
        ] },
        { h3: 'How governments help' },
        { list: [
          '**Grants and subsidies** — money that does not have to be repaid',
          '**Low-interest loans** and loan guarantees to banks',
          '**Tax breaks** — lower corporation tax or a tax-free start-up period',
          '**Enterprise zones** — cheap rent or reduced business rates in certain areas',
          '**Training and advice** — free courses, mentoring and business support centres',
          '**Reduced regulation** — simpler paperwork for very small firms'
        ] }
      ]
    },
    {
      h: 'Measuring business size',
      body: [
        { table: { head: ['Method', 'Limitation'], rows: [
          ['**Number of employees**', 'A capital-intensive firm (an oil refinery) has few workers but is huge; a labour-intensive one (a cleaning firm) has many but is small'],
          ['**Value of output**', 'High output value does not mean high sales or profit — stock may be unsold'],
          ['**Value of sales (revenue)**', 'Good for comparing similar firms, but a jeweller selling a few rings has high revenue and few units'],
          ['**Capital employed**', 'Total value of capital invested; a capital-intensive firm looks bigger than a labour-intensive one of the same importance'],
          ['**Market share**', 'Useful, but depends on how narrowly the market is defined']
        ] } },
        { callout: { k: 'tip', b: 'Whenever a question asks about measuring size, say that **no single measure is reliable** and that you should use **more than one**. That comparison point is often the evaluation mark.' } },
        { callout: { k: 'warn', b: 'Profit is a **poor** measure of size. A small business can be very profitable and a huge business can make a loss.' } }
      ]
    },
    {
      h: 'Why businesses grow — and why some stay small',
      body: [
        { h3: 'Reasons owners want to grow' },
        { list: [
          'Higher **profits** for the owners',
          'Larger **market share**, giving more power over prices and suppliers',
          'Lower average costs from **economies of scale** — see [[4.2]]',
          'Spreading **risk** across more products and markets',
          'Status and **rewards** for managers'
        ] },
        { h3: 'Internal (organic) growth' },
        'The business expands by increasing its own output — opening new branches, launching new products, selling in new countries.',
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Slower, so easier to manage and control', 'Slow — rivals may grow faster'],
          ['Can be financed from retained profit, avoiding debt', 'Needs finance that a small firm may not have'],
          ['Existing culture and management style are kept', 'Does not remove a competitor from the market']
        ] } },
        { h3: 'External growth: integration' },
        { table: { head: ['Type', 'Meaning', 'Main benefit'], rows: [
          ['**Horizontal integration**', 'Joining with a firm in the **same industry at the same stage** (two car makers)', 'Removes a competitor, raises market share, gains their customers, economies of scale'],
          ['**Forward vertical integration**', 'Joining with a firm at the **next stage** — nearer the customer (a farm buying a supermarket)', 'Guaranteed outlet for products; control of quality and price at point of sale; profit of the retailer'],
          ['**Backward vertical integration**', 'Joining with a firm at the **previous stage** — nearer the raw materials (a baker buying a flour mill)', 'Guaranteed supply, controlled input costs and quality; can restrict supply to rivals'],
          ['**Conglomerate (diversification)**', 'Joining with a firm in a **completely different industry**', 'Spreads risk — a fall in one market does not sink the whole group']
        ] } },
        { defs: [
          ['Merger', 'Two businesses agree to join together to form one new business.'],
          ['Takeover (acquisition)', 'One business buys more than 50% of the shares of another and takes control, sometimes against its wishes.']
        ] },
        { h3: 'Problems of growth' },
        { list: [
          '**Diseconomies of scale** — poor communication, slow decisions, low motivation in a large firm',
          'Clash of **management styles and cultures** after a merger',
          '**Overtrading**: expanding too fast without enough working capital, causing cash-flow problems',
          'Government may block a takeover that creates a **monopoly**',
          'Job losses after integration damage **staff morale**'
        ] },
        { h3: 'Why some businesses stay small' },
        { list: [
          'The **market is small** or is a niche — e.g. handmade wedding cakes',
          'The owner **wants to stay small** to keep control and avoid stress',
          'Lack of **finance** to expand',
          'Customers value a **personal service** that would be lost if the firm grew',
          'Some industries need little capital, so new small firms keep entering'
        ] }
      ]
    },
    {
      h: 'Why businesses fail',
      body: [
        { list: [
          '**Poor cash flow** — the most common cause. Profitable firms still fail if they cannot pay bills on time',
          '**Lack of management skill or experience** in finance, marketing or people',
          '**Poor market research** — the product nobody wanted',
          'Failure to **change** with the market, technology or fashion',
          '**Over-borrowing** — high interest payments in a downturn',
          '**Expanding too quickly** (overtrading)',
          '**External shocks** — recession, a new competitor, a rise in raw material prices'
        ] },
        { callout: { k: 'tip', b: 'New businesses fail more often than established ones because they have no reputation, no customer base, little finance and inexperienced managers. That comparison is worth stating explicitly.' } }
      ]
    }
  ],
  terms: ['entrepreneur', 'business-plan', 'internal-growth', 'external-growth', 'horizontal-integration', 'vertical-integration', 'conglomerate', 'merger', 'takeover', 'capital-employed', 'market-share'],
  tips: [
    'For "should this business grow?" evaluation, weigh economies of scale and market share against diseconomies, cash-flow strain and loss of control — then decide *for this business*.',
    'Learn one clear example of each type of integration; examiners want the direction (forward/backward) named correctly.'
  ],
  traps: [
    'Mixing up forward and backward vertical integration. Backward = back towards the raw materials.',
    'Saying a business failed because "it made a loss" without explaining why.'
  ]
});

BS.addTopic({
  id: '1.4', unit: 1, title: 'Types of business organisation',
  syllabus: [
    'The main features of different forms of business organisation',
    'The concepts of risk, ownership and limited liability',
    'Recommending and justifying a suitable form of business organisation',
    'Business organisations in the public sector'
  ],
  sections: [
    {
      h: 'Unlimited and limited liability',
      body: [
        { defs: [
          ['Unlimited liability', 'The owner is personally responsible for all the debts of the business. If the business cannot pay, the owner\'s personal possessions — house, car, savings — can be taken to pay creditors.'],
          ['Limited liability', 'The owners can only lose the amount they invested in the business. Personal possessions are safe.'],
          ['Incorporated business', 'The business has a separate legal identity from its owners. It can own assets, sue and be sued in its own name. Limited companies are incorporated.'],
          ['Unincorporated business', 'No separate legal identity — the owner and the business are the same in law. Sole traders and most partnerships are unincorporated.']
        ] },
        { callout: { k: 'warn', b: 'Limited liability comes from **incorporation**, not from being big. A tiny one-person private limited company has limited liability; a huge partnership may not.' } }
      ]
    },
    {
      h: 'Sole trader',
      body: [
        'A business owned and controlled by **one person**, who may still employ others. It is the most common form of business.',
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Easy and cheap to set up — few legal formalities', '**Unlimited liability** — personal assets at risk'],
          ['The owner keeps **all** the profit', 'Difficult to raise finance; banks see sole traders as risky'],
          ['Complete control and quick decisions', 'Long hours, hard to take holidays or sick leave'],
          ['Close personal contact with customers and staff', '**No continuity** — the business legally ends if the owner dies'],
          ['Financial affairs stay private', 'Limited skills — one person must do everything'],
          ['', 'Few economies of scale, so higher unit costs than large rivals']
        ] } }
      ]
    },
    {
      h: 'Partnership',
      body: [
        'A business owned by **two or more partners** (usually up to 20) who share the capital, the decisions and the profit.',
        { defs: [['Partnership agreement (deed of partnership)', 'A legal document setting out how much capital each partner puts in, how profits and losses are shared, each partner\'s role and voting rights, and what happens if a partner leaves. It prevents disputes later.']] },
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['More capital than a sole trader can raise alone', '**Unlimited liability** for most partners'],
          ['Shared responsibility and workload — cover for illness and holidays', 'Profits must be **shared** between partners'],
          ['Partners bring different **skills** and experience', 'Decisions can be slow; partners may **disagree**'],
          ['Losses are shared, so less risk for each partner', 'One partner\'s mistake binds **all** the partners'],
          ['Still fairly easy to set up and financial affairs are private', 'No continuity — the partnership ends if a partner dies or leaves']
        ] } },
        { callout: { k: 'note', t: 'Limited partnership', b: 'Some countries allow a **sleeping (silent) partner** who invests capital and has limited liability but takes no part in running the business. At least one partner must still have unlimited liability.' } }
      ]
    },
    {
      h: 'Private limited company (Ltd)',
      body: [
        'An incorporated business whose shares are sold **privately**, usually to family, friends and employees, and cannot be sold without the agreement of the other shareholders.',
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['**Limited liability** protects the shareholders', 'Legal formalities to set up: Memorandum and Articles of Association'],
          ['More capital can be raised by selling shares', 'Shares **cannot be sold to the public**, limiting the capital raised'],
          ['Separate legal identity and **continuity** — it survives the death of an owner', 'Accounts must be filed and are less private than a sole trader\'s'],
          ['Original owners usually keep control of the shares', 'Shares are hard to sell, so investors may be put off'],
          ['Easier to borrow from banks than a sole trader', 'Some loss of control if new shareholders are brought in']
        ] } },
        { defs: [
          ['Memorandum of Association', 'States the company name, registered address, the amount of share capital and the purpose of the company.'],
          ['Articles of Association', 'The internal rules: directors\' powers and duties, how meetings and votes are run, how profits are shared.'],
          ['Certificate of Incorporation', 'The document that allows the company to legally start trading.']
        ] }
      ]
    },
    {
      h: 'Public limited company (plc)',
      body: [
        'An incorporated business that can sell its shares **to the general public** on a stock exchange.',
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Huge amounts of capital can be raised from the public', 'Very expensive to set up — legal fees, prospectus, underwriting'],
          ['**Limited liability** for all shareholders', 'Accounts must be **published**, so competitors can see them'],
          ['Shares are easily bought and sold, so investors are willing to buy', 'Risk of **takeover** — anyone can buy the shares'],
          ['Can achieve large **economies of scale**', 'Original owners can **lose control** as ownership is spread'],
          ['High status makes it easier to borrow and attract suppliers', 'Divorce of ownership and control: shareholders want short-term dividends, managers may want long-term growth']
        ] } },
        { callout: { k: 'note', t: 'Divorce of ownership and control', b: 'In a plc the **shareholders own** the company but **directors and managers run** it. Their objectives can conflict — shareholders often want quick dividends and a rising share price, while managers may prefer growth, higher salaries or safer strategies.' } }
      ]
    },
    {
      h: 'Other forms',
      body: [
        { defs: [
          ['Franchise', 'The **franchisor** lets a **franchisee** use its brand name, products and business format in return for an initial fee and a share of revenue. Examples: fast-food chains, hotels.'],
          ['Joint venture', 'Two or more businesses agree to start a new project **together**, sharing the cost, risk, expertise and profit — without a full merger.'],
          ['Social enterprise', 'A business with social, environmental or ethical aims as well as financial ones. Profits are largely reinvested into the social purpose.'],
          ['Public corporation', 'A business owned and run by the government, e.g. a state broadcaster or national rail operator.']
        ] },
        { h3: 'Franchising' },
        { table: { head: ['', 'Franchisee', 'Franchisor'], rows: [
          ['Advantages', 'Known brand and existing customers; less chance of failure; training, marketing and supplies provided; easier to get a bank loan', 'Rapid expansion with the franchisee\'s money; franchise fees and royalties; motivated local owner-managers'],
          ['Disadvantages', 'Must pay fees and a share of revenue; little freedom over products, prices or décor; reputation depends on other franchisees', 'Poor franchisee damages the whole brand; profits are shared; less direct control']
        ] } },
        { h3: 'Joint ventures' },
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Costs and risks are shared', 'Profits must be shared'],
          ['Each firm brings different expertise and local knowledge', 'Management styles and cultures may clash'],
          ['Faster entry into a new market than going alone', 'Disagreements over strategy can stall the project'],
          ['Avoids the cost and permanence of a full takeover', 'Damage to one partner\'s reputation affects the other']
        ] } },
        { h3: 'Public corporations' },
        { table: { head: ['Advantages', 'Disadvantages'], rows: [
          ['Essential services are provided to everyone, even where it is unprofitable', 'Subsidised losses are a burden on taxpayers'],
          ['Loss-making but important firms can be kept open, protecting jobs', 'No profit motive can mean inefficiency and waste'],
          ['Avoids a private monopoly exploiting consumers with high prices', 'Political interference can lead to poor commercial decisions'],
          ['Prices can be kept low for social reasons', 'Lack of competition can mean poor customer service']
        ] } }
      ]
    }
  ],
  terms: ['sole-trader', 'partnership', 'unlimited-liability', 'limited-liability', 'private-limited-company', 'public-limited-company', 'shareholder', 'dividend', 'franchise', 'joint-venture', 'public-corporation', 'incorporation', 'divorce-of-ownership-and-control'],
  tips: [
    'Recommendation questions ("which form should X choose?") need a **justified** choice: pick one, give two reasons **from the case study**, and say why the alternatives are worse for *this* business.',
    'Link limited liability to the ability to raise finance — investors are far more willing to buy shares when their loss is capped.'
  ],
  traps: [
    'Saying limited liability means "the company has limited debts". It limits the **owners\'** losses, not the company\'s debts.',
    'Claiming a plc "must sell shares to the public" — it *can*, it does not have to.',
    'Forgetting that a partnership normally has unlimited liability.'
  ]
});

BS.addTopic({
  id: '1.5', unit: 1, title: 'Business objectives and stakeholder objectives',
  syllabus: [
    'The need for business objectives and the importance of them',
    'The objectives of private-sector and public-sector businesses',
    'The role of stakeholder groups involved in business activity',
    'The objectives of different stakeholder groups and how they may conflict'
  ],
  sections: [
    {
      h: 'Why businesses need objectives',
      body: [
        'An **objective** is a target or goal a business sets itself. Objectives give the business direction and a way of measuring success.',
        { list: [
          'They give everyone in the business a clear **sense of direction**',
          'Managers and employees can be **motivated** by working towards a target',
          'Performance can be **measured** against them at the end of the year',
          'They help managers **make decisions** — does this choice move us towards the objective?',
          'Banks and investors want to see clear objectives before lending'
        ] },
        { callout: { k: 'tip', b: 'Good objectives are **SMART**: Specific, Measurable, Achievable, Realistic and Time-bound. "Increase sales by 10% within 12 months" is SMART; "do better" is not.' } }
      ]
    },
    {
      h: 'Objectives of private-sector businesses',
      body: [
        { table: { head: ['Objective', 'Why', 'Typical of'], rows: [
          ['**Survival**', 'Staying in business is the first priority — no other objective matters if the firm closes', 'New start-ups; any firm in a recession or facing a strong new rival'],
          ['**Profit**', 'Reward for the owners\' risk; provides retained profit to reinvest', 'Almost all private-sector firms, especially once established'],
          ['**Growth**', 'Larger market share, economies of scale, more security, higher status for managers', 'Established firms with finance available'],
          ['**Market share**', 'More power over prices and suppliers; a stronger brand', 'Firms in competitive markets'],
          ['**Increasing shareholder value**', 'Rising share price and dividends keep shareholders investing', 'Public limited companies'],
          ['**Social / ethical objectives**', 'Reputation, customer loyalty, staff motivation, and doing the right thing', 'Social enterprises; increasingly, all firms']
        ] } },
        'Objectives **change over time**. A start-up aims to survive; once established it aims for profit; a large firm may aim for growth or market share; in a recession it may return to survival.'
      ]
    },
    {
      h: 'Objectives of social enterprises and the public sector',
      body: [
        'A **social enterprise** has three linked objectives, often called the **triple bottom line**:',
        { list: [
          '**Economic** — make a profit to reinvest in the business',
          '**Social** — provide jobs and support for disadvantaged groups',
          '**Environmental** — protect the environment'
        ] },
        'Public-sector organisations usually aim to provide a service to the whole population, meet financial targets set by government, keep costs and waste low, and improve the quality of service — rather than to maximise profit.'
      ]
    },
    {
      h: 'Stakeholders',
      body: [
        'A **stakeholder** is any person or group with an interest in the activities of a business. **Internal** stakeholders are inside the business; **external** stakeholders are outside it.',
        { table: { head: ['Stakeholder', 'Internal / external', 'Main objectives'], rows: [
          ['**Owners / shareholders**', 'Internal', 'Profit, dividends, rising share price, growth in the value of their investment'],
          ['**Employees**', 'Internal', 'Job security, good and rising pay, safe conditions, training, promotion'],
          ['**Managers**', 'Internal', 'High salaries and bonuses, status, job security, growth of the business'],
          ['**Customers**', 'External', 'Low prices, good quality, safe products, choice, good customer service'],
          ['**Suppliers**', 'External', 'Regular large orders, being paid **on time**, a long-term relationship'],
          ['**Banks / lenders**', 'External', 'The business stays liquid and profitable so the loan and interest are repaid'],
          ['**Government**', 'External', 'Jobs, tax revenue, obeying the law, exports, economic growth'],
          ['**The local community**', 'External', 'Jobs for local people, no pollution or congestion, support for local causes']
        ] } }
      ]
    },
    {
      h: 'Conflict between stakeholders',
      body: [
        'Stakeholders\' objectives often **conflict** because the business cannot satisfy everyone at once with limited resources.',
        { table: { head: ['Conflict', 'Why it happens'], rows: [
          ['Shareholders vs employees', 'Cutting wages or jobs raises profit and dividends but harms workers'],
          ['Shareholders vs managers', 'Managers may want long-term growth or higher salaries; shareholders want dividends now'],
          ['Customers vs shareholders', 'Lower prices please customers but reduce profit margins'],
          ['Business vs local community', 'A new factory brings jobs but also noise, traffic and pollution'],
          ['Suppliers vs the business', 'Delaying payment improves the business\'s cash flow but damages the supplier\'s'],
          ['Employees vs customers', 'Automation cuts costs and prices for customers but costs jobs']
        ] } },
        { callout: { k: 'tip', b: 'For an "evaluate the impact on stakeholders" question, take **two or three** named stakeholders from the case study, say how each is affected (positively and negatively), then judge **which is affected most and why**. Naming a stakeholder without linking to the case earns few marks.' } }
      ]
    }
  ],
  terms: ['objective', 'smart-objectives', 'stakeholder', 'social-enterprise', 'triple-bottom-line', 'profit-maximisation'],
  tips: [
    'Objectives change with circumstances — always check the case study for the stage the business is at.',
    'Employees are internal stakeholders; trade unions and customers are external.'
  ],
  traps: [
    'Listing stakeholders without their objectives.',
    'Saying "all businesses aim to maximise profit" — survival, growth and social aims are just as valid.'
  ]
});
