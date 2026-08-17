/* syllabus.js — for each sub-topic:
     outcomes  the numbered learning outcomes the syllabus lists (1.1.1, 1.1.2 …)
     technique how that topic is actually examined: typical question stems with
               their mark allocations, and what earns the marks

   Provenance: reconstructed from the published Cambridge IGCSE Business Studies
   0450 subject content. Cross-check against your own copy of the syllabus for
   your exam series — Cambridge is the only authority on the exact wording.     */

BS.spec = {

/* ==================== UNIT 1 ==================== */

'1.1': {
  outcomes: [
    { n: '1.1.1', t: 'The concepts of needs, wants, scarcity and opportunity cost', pts: [
      'The difference between needs and wants',
      'The economic problem: scarce resources against unlimited wants, creating the need to choose',
      'Opportunity cost as the next best alternative given up'
    ] },
    { n: '1.1.2', t: 'The importance of specialisation', pts: [
      'The meaning of specialisation and the division of labour',
      'The advantages and disadvantages of specialisation to a business'
    ] },
    { n: '1.1.3', t: 'The purpose of business activity', pts: [
      'What business activity involves: combining the factors of production to produce goods and services',
      'The factors of production — land, labour, capital and enterprise — and their rewards',
      'The difference between goods and services, and between consumer and capital goods'
    ] },
    { n: '1.1.4', t: 'The concept of added value and how it can be increased', pts: [
      'Added value as the difference between the selling price and the cost of bought-in materials',
      'Why added value matters, and that it is not the same as profit',
      'Methods a business can use to increase added value'
    ] }
  ],
  technique: {
    asked: 'Almost always the opening 2-mark definition on a paper, and a 4-mark "explain how X could increase added value". Added value is also a favourite calculation because so many candidates subtract wages by mistake.',
    stems: [
      ['Define the term *opportunity cost*.', 2],
      ['Calculate the added value per unit.', 2],
      ['Explain **two** ways this business could increase its added value.', 4],
      ['Explain **two** benefits to this business of the division of labour.', 4]
    ],
    earn: [
      'Naming a **specific alternative from the case** for opportunity cost, not a general definition.',
      'Subtracting **only bought-in materials** in an added-value calculation.',
      'Linking division of labour to a consequence — lower unit costs or higher output — rather than stopping at "workers get faster".'
    ]
  }
},

'1.2': {
  outcomes: [
    { n: '1.2.1', t: 'Business activity classified into primary, secondary and tertiary sectors', pts: [
      'The basis of the classification and examples of each sector',
      'Classifying a given business into the correct sector'
    ] },
    { n: '1.2.2', t: 'Reasons for the changing importance of business classification', pts: [
      'De-industrialisation and the reasons for it',
      'Why the importance of each sector differs between countries and changes over time'
    ] },
    { n: '1.2.3', t: 'The differences between the private and public sectors', pts: [
      'Ownership, objectives, sources of finance and examples of each',
      'The concept of a mixed economy'
    ] }
  ],
  technique: {
    asked: 'A reliable source of 1- and 2-mark identification marks, then a 6-mark question on why sector importance is changing in the case-study country. The private/public distinction turns up as a trap all over the paper.',
    stems: [
      ['Identify the sector in which this business operates.', 1],
      ['Explain **two** reasons why the secondary sector is declining in this country.', 4],
      ['Explain **two** differences between private-sector and public-sector businesses.', 4]
    ],
    earn: [
      'Tying the reason for sector change to the **stage of development** of the country in the case.',
      'Never calling a public limited company "public sector" — this single error appears in examiner reports every year.'
    ]
  }
},

'1.3': {
  outcomes: [
    { n: '1.3.1', t: 'Characteristics of successful entrepreneurs, business plans and government support', pts: [
      'The characteristics of successful entrepreneurs',
      'The contents of a business plan and how business plans assist entrepreneurs',
      'Why and how governments support business start-ups, e.g. grants, training schemes'
    ] },
    { n: '1.3.2', t: 'The methods and problems of measuring business size', pts: [
      'Measuring size by number of employees, value of output, value of sales and capital employed',
      'The limitations of each method, and why more than one should be used'
    ] },
    { n: '1.3.3', t: 'Why some businesses grow and others remain small', pts: [
      'The reasons owners may want to expand the business',
      'The reasons why some businesses stay small'
    ] },
    { n: '1.3.4', t: 'Different ways in which businesses can grow', pts: [
      'Internal (organic) growth and external growth',
      'Mergers and takeovers',
      'Horizontal, vertical (forward and backward) and conglomerate integration, with their benefits'
    ] },
    { n: '1.3.5', t: 'Problems linked to business growth and how they might be overcome', pts: [
      'Diseconomies of scale, poor communication, culture clashes and cash-flow strain',
      'Possible solutions to these problems'
    ] },
    { n: '1.3.6', t: 'Why some businesses fail', pts: [
      'Causes of business failure, e.g. poor cash flow, lack of management skill, changes in the market',
      'Why new businesses are at greater risk of failure than established ones'
    ] }
  ],
  technique: {
    asked: 'The biggest sub-topic in Unit 1 and a frequent source of 12-mark "should this business grow / which method of growth" questions. Integration types are examined as precise recall — the direction has to be right.',
    stems: [
      ['Identify **two** methods of measuring the size of a business.', 2],
      ['Explain **two** problems this business might face if it grows quickly.', 4],
      ['Analyse the benefits to this business of horizontal integration.', 6],
      ['Do you think this business should grow by taking over a competitor? Justify your answer.', 12]
    ],
    earn: [
      'Naming the **direction** correctly: backward vertical = towards the raw materials, forward = towards the customer.',
      'On a growth 12-marker, weighing economies of scale and market share **against** diseconomies, cash-flow strain and loss of control — then deciding for *this* business.',
      'Saying explicitly that **no single measure** of size is reliable and more than one should be used. That comparison is often the evaluation mark.'
    ]
  }
},

'1.4': {
  outcomes: [
    { n: '1.4.1', t: 'The main features of different forms of business organisation', pts: [
      'Sole traders, partnerships, private limited companies, public limited companies',
      'Franchises and joint ventures',
      'The advantages and disadvantages of each form'
    ] },
    { n: '1.4.2', t: 'The concepts of risk, ownership and limited liability', pts: [
      'The difference between unlimited and limited liability',
      'Unincorporated and incorporated businesses',
      'How the form of organisation affects the risk taken by the owners'
    ] },
    { n: '1.4.3', t: 'Recommend and justify a suitable form of business organisation', pts: [
      'Recommending a form of organisation to owners or management in a given situation, with justification'
    ] },
    { n: '1.4.4', t: 'Business organisations in the public sector', pts: [
      'The main features of public corporations',
      'Their objectives, and the advantages and disadvantages of public ownership'
    ] }
  ],
  technique: {
    asked: 'Outcome 1.4.3 is written as a *recommendation* skill, so this topic almost always produces a 12-mark "which form should they choose?" question. It is one of the most predictable questions on the paper.',
    stems: [
      ['Define the term *limited liability*.', 2],
      ['Explain **two** advantages to this business of becoming a private limited company.', 4],
      ['Explain **two** benefits to a franchisee of buying a franchise.', 6],
      ['Recommend whether these owners should form a private limited company. Justify your answer.', 12]
    ],
    earn: [
      'Saying limited liability protects the **owners\'** personal possessions, not that "the company has limited debts".',
      'On the recommendation, rejecting at least one alternative using a **fact from the case** — the size of the business, whether the owners want to keep control, how much finance is needed.',
      'Linking limited liability to the ability to **raise finance**: investors will buy shares when their loss is capped.'
    ]
  }
},

'1.5': {
  outcomes: [
    { n: '1.5.1', t: 'The need for business objectives and the importance of them', pts: [
      'What business objectives are and why businesses set them',
      'How objectives can change as a business develops'
    ] },
    { n: '1.5.2', t: 'The objectives of private-sector and public-sector enterprises', pts: [
      'Survival, profit, growth, market share and shareholder value',
      'The objectives of social enterprises: economic, social and environmental',
      'The objectives of public-sector organisations'
    ] },
    { n: '1.5.3', t: 'The role of stakeholder groups involved in business activity', pts: [
      'The main internal and external stakeholder groups and their objectives',
      'How the objectives of different stakeholder groups may conflict',
      'The impact of a business decision on different stakeholder groups'
    ] }
  ],
  technique: {
    asked: 'Stakeholders are the standard vehicle for "evaluate the impact of this decision" questions, because they force you to argue from more than one side. Expect at least one on every paper.',
    stems: [
      ['Identify **two** stakeholder groups of this business.', 2],
      ['Explain why the objectives of shareholders and employees might conflict.', 4],
      ['Do you think the local community will benefit from this decision? Justify your answer.', 12]
    ],
    earn: [
      'Naming each stakeholder **and** their specific objective — a name alone earns very little.',
      'On a 12-marker, taking two or three named stakeholders, showing positive *and* negative effects on each, then judging **which is affected most and why**.',
      'Recognising that objectives change: a start-up wants survival, an established firm wants profit or growth.'
    ]
  }
},

/* ==================== UNIT 2 ==================== */

'2.1': {
  outcomes: [
    { n: '2.1.1', t: 'The importance of a well-motivated workforce', pts: [
      'Why people work and what motivation means',
      'The benefits of a well-motivated workforce, e.g. higher labour productivity, lower absenteeism and labour turnover',
      'The concept of human needs, e.g. Maslow\'s hierarchy',
      'Key motivational theories: Taylor and Herzberg'
    ] },
    { n: '2.1.2', t: 'Methods of motivation', pts: [
      'Financial rewards: wage, salary, bonus, commission, profit sharing, fringe benefits',
      'Non-financial methods: job rotation, job enrichment, teamworking, training, opportunities for promotion',
      'Recommending and justifying appropriate methods of motivation in given circumstances'
    ] }
  ],
  technique: {
    asked: 'The syllabus explicitly asks you to **recommend and justify** a method, so the 12-marker here is usually "should they introduce X to solve their motivation problem?" The case will always plant the real cause — read for it before choosing.',
    stems: [
      ['Calculate the labour turnover of this business.', 2],
      ['Explain **two** benefits to this business of a well-motivated workforce.', 4],
      ['Explain the difference between job enlargement and job enrichment.', 4],
      ['Recommend a method of motivation for these employees. Justify your answer.', 12]
    ],
    earn: [
      'Diagnosing the **actual cause** in the case. If staff say the work is boring, a pay rise is the wrong answer — quote Herzberg to say why.',
      'Naming the theorist and using them as an argument, not as decoration: "Taylor would suggest… but Herzberg would counter that…".',
      'Costing the method: every motivation answer needs the cost as its counter-argument, then a judgement on whether the benefit outweighs it.'
    ]
  }
},

'2.2': {
  outcomes: [
    { n: '2.2.1', t: 'Draw, interpret and understand simple organisational charts', pts: [
      'Simple hierarchical structures: span of control, levels of hierarchy, chain of command',
      'The roles, responsibilities and inter-relationships of people in organisations',
      'The concept of delegation, and its advantages and disadvantages'
    ] },
    { n: '2.2.2', t: 'The role of management', pts: [
      'The functions of management: planning, organising, coordinating, commanding and controlling',
      'The importance of management to a business'
    ] },
    { n: '2.2.3', t: 'Leadership styles', pts: [
      'Autocratic, democratic and laissez-faire leadership',
      'Recommending and justifying an appropriate leadership style in a given situation'
    ] },
    { n: '2.2.4', t: 'Trade unions', pts: [
      'What a trade union is and why employees join',
      'The effects of trade union membership on employers and employees'
    ] }
  ],
  technique: {
    asked: '"Draw" is in the syllabus wording, so you can be asked to complete or amend an organisation chart. Otherwise expect precise-recall questions on span of control and chain of command, and a 12-marker on leadership style or delayering.',
    stems: [
      ['Define the term *span of control*.', 2],
      ['Using the chart, identify the number of levels of hierarchy.', 1],
      ['Explain **two** effects of delayering on this business.', 4],
      ['Recommend the most appropriate leadership style for this manager. Justify your answer.', 12]
    ],
    earn: [
      'Keeping span of control and chain of command apart: a **wider** span means a **shorter** chain.',
      'Saying no leadership style is best in itself — it depends on the task, the staff\'s experience, the time available and the culture. Then choosing one for *this* case.',
      'Counting **levels**, not people, when reading a chart.'
    ]
  }
},

'2.3': {
  outcomes: [
    { n: '2.3.1', t: 'Methods of recruitment and selection', pts: [
      'The main stages in recruitment and selection',
      'The difference between internal and external recruitment, with benefits and limitations',
      'The benefits and limitations of part-time and full-time employees',
      'Job descriptions and person specifications'
    ] },
    { n: '2.3.2', t: 'The importance of training and the methods of training', pts: [
      'Induction, on-the-job and off-the-job training',
      'The benefits and limitations of each method to the business and to employees'
    ] },
    { n: '2.3.3', t: 'Why reducing the size of the workforce might be necessary', pts: [
      'The difference between dismissal and redundancy',
      'Situations in which a business might need to reduce its workforce'
    ] },
    { n: '2.3.4', t: 'Legal controls over employment issues and their impact', pts: [
      'Legal controls over recruitment, contracts, unfair dismissal, discrimination, health and safety and minimum wage',
      'The impact of these controls on employers and employees'
    ] }
  ],
  technique: {
    asked: 'Reliably produces a 6-mark "analyse the benefits of internal / external recruitment" and a 12-marker on training. The recruit-versus-train choice is a classic evaluation.',
    stems: [
      ['Identify **two** items normally contained in a job description.', 2],
      ['Explain **two** advantages to this business of recruiting internally.', 4],
      ['Analyse the benefits to this business of training its employees.', 6],
      ['Do you think this business should invest in off-the-job training? Justify your answer.', 12]
    ],
    earn: [
      'Matching the method to the **type of job**: senior or specialist roles favour external recruitment; routine roles favour internal.',
      'Naming the risk that trained staff **leave for a competitor**, then saying how the business reduces it (better pay, promotion, job satisfaction).',
      'Keeping job description (the job) and person specification (the person) distinct.'
    ]
  }
},

'2.4': {
  outcomes: [
    { n: '2.4.1', t: 'Why effective communication is important and the methods used to achieve it', pts: [
      'The difference between internal and external communication',
      'One-way and two-way communication, and the role of feedback',
      'Verbal, written and visual methods, with their benefits and limitations',
      'Recommending an appropriate method for a given situation'
    ] },
    { n: '2.4.2', t: 'Communication barriers', pts: [
      'Barriers arising from the sender, the medium, the receiver and the message',
      'The consequences of ineffective communication',
      'How communication barriers can be reduced or removed'
    ] }
  ],
  technique: {
    asked: 'Usually a 4-mark "explain two barriers" plus a 6-mark "recommend a method". The examiner wants the method matched to the situation — urgency, cost, whether a written record is needed, how many people must receive it.',
    stems: [
      ['Identify **two** methods of internal communication.', 2],
      ['Explain **two** barriers to effective communication in this business.', 4],
      ['Recommend the most suitable method of communication for this message. Justify your answer.', 6]
    ],
    earn: [
      'For a barrier, giving the barrier, its **effect on the business**, and a realistic fix.',
      'Justifying a chosen method against the situation rather than listing every method you know.',
      'Remembering external communication includes suppliers, banks and government — not just advertising.'
    ]
  }
},

/* ==================== UNIT 3 ==================== */

'3.1': {
  outcomes: [
    { n: '3.1.1', t: 'The role of marketing', pts: [
      'Identifying and satisfying customer needs',
      'Maintaining and increasing sales and market share',
      'Building customer loyalty and brand image'
    ] },
    { n: '3.1.2', t: 'Market changes', pts: [
      'Why customer spending patterns and markets change',
      'How businesses respond to changing markets, including the use of technology'
    ] },
    { n: '3.1.3', t: 'The concepts of niche marketing and mass marketing', pts: [
      'The meaning of each, with examples',
      'The benefits and limitations of each approach'
    ] },
    { n: '3.1.4', t: 'How and why market segmentation is undertaken', pts: [
      'The main ways a market can be segmented',
      'The benefits and drawbacks of segmentation to a business'
    ] }
  ],
  technique: {
    asked: 'Market share appears as a calculation plus a comment — the comment is where the marks are. Niche versus mass is a standard 12-marker for a small business facing a large competitor.',
    stems: [
      ['Calculate this business\'s market share.', 2],
      ['Identify **two** ways a market can be segmented.', 2],
      ['Analyse the benefits to this business of niche marketing.', 6],
      ['Do you think this business should target a mass market? Justify your answer.', 12]
    ],
    earn: [
      'After a market-share calculation, saying whether it has **risen or fallen** and suggesting why.',
      'Judging niche versus mass on the **size of the firm** and the **level of competition** in the case.',
      'Not confusing segmentation (the method) with niche marketing (a strategy that uses it).'
    ]
  }
},

'3.2': {
  outcomes: [
    { n: '3.2.1', t: 'The role of market research and methods used', pts: [
      'Why market research is carried out and how it reduces risk',
      'Primary research methods and secondary research sources',
      'The benefits and limitations of each',
      'The need for, and the reliability of, sampling'
    ] },
    { n: '3.2.2', t: 'Presentation and use of market research results', pts: [
      'The difference between qualitative and quantitative data',
      'Interpreting simple market research data presented in tables, charts and graphs',
      'The limitations of market research data'
    ] }
  ],
  technique: {
    asked: 'Outcome 3.2.2 means data interpretation is guaranteed somewhere on the paper — a bar chart, pie chart or table you must read and act on. The 12-marker is usually primary versus secondary for a business with a stated budget.',
    stems: [
      ['Identify **two** methods of primary market research.', 2],
      ['Explain **two** limitations of this market research.', 4],
      ['Using Appendix 1, analyse what this data suggests about the business.', 6],
      ['Recommend whether this business should use primary or secondary research. Justify your answer.', 12]
    ],
    earn: [
      'Interpreting a chart in three moves: state the **trend**, quote a **figure**, say what the business should **do**.',
      'Never claiming research "guarantees" success — it **reduces** risk. Examiners reward that qualification.',
      'On the 12-marker, recommending **both in sequence** (cheap secondary first, then targeted primary) and explaining the order.'
    ]
  }
},

'3.3': {
  outcomes: [
    { n: '3.3.1', t: 'Product', pts: [
      'The costs and benefits of developing new products',
      'Brand image and its impact on sales and customer loyalty',
      'The role of packaging',
      'The product life cycle: the main stages and extension strategies, and how it affects marketing decisions'
    ] },
    { n: '3.3.2', t: 'Price', pts: [
      'The main pricing methods and their appropriateness in a given situation',
      'The concept of price elasticity of demand and its significance to pricing decisions'
    ] },
    { n: '3.3.3', t: 'Place', pts: [
      'The main channels of distribution, including the use of intermediaries',
      'The advantages and disadvantages of each, and their appropriateness in a given situation'
    ] },
    { n: '3.3.4', t: 'Promotion', pts: [
      'The aims of promotion',
      'Types of promotion, including advertising and sales promotion, and their appropriateness',
      'The need for cost-effectiveness in spending the marketing budget'
    ] },
    { n: '3.3.5', t: 'Technology and the marketing mix', pts: [
      'The use of e-commerce, the internet and social media in marketing',
      'The opportunities and threats of e-commerce to a business'
    ] }
  ],
  technique: {
    asked: 'The single most heavily examined sub-topic in the course — five separate outcomes, so expect it on both papers. You can be asked to draw or interpret a product life cycle diagram.',
    stems: [
      ['Identify **two** elements of the marketing mix.', 2],
      ['Identify the stage of the product life cycle this product has reached.', 2],
      ['Explain **two** extension strategies this business could use.', 4],
      ['Recommend a pricing method for this new product. Justify your answer.', 6],
      ['Do you think this business should sell online? Justify your answer.', 12]
    ],
    earn: [
      'Identifying the life-cycle stage from the **sales trend**, then recommending an action that fits that stage.',
      'Choosing a pricing method from three facts: is the product **new**, is it **unique**, is the market **competitive**?',
      'Saying explicitly that the four Ps must be **consistent** — a premium product needs a premium price, exclusive distribution and matching promotion.',
      'On PED: elastic → cut price to raise revenue; inelastic → raise price to raise revenue.'
    ]
  }
},

'3.4': {
  outcomes: [
    { n: '3.4.1', t: 'Justify marketing strategies appropriate to a given situation', pts: [
      'Recommending and justifying a marketing strategy using the marketing mix',
      'How the strategy should reflect the business\'s objectives and target market'
    ] },
    { n: '3.4.2', t: 'The nature and impact of legal controls related to marketing', pts: [
      'Controls on misleading advertising, faulty and dangerous goods and incorrect descriptions',
      'The impact of these controls on a business'
    ] },
    { n: '3.4.3', t: 'The opportunities and problems of entering new markets abroad', pts: [
      'The opportunities of selling in new foreign markets',
      'The problems, e.g. cultural differences, language, exchange rates, tariffs and local competition',
      'Ways of entering foreign markets, e.g. exporting, joint ventures, licensing and franchising'
    ] }
  ],
  technique: {
    asked: 'Outcome 3.4.1 is a *justify* skill, so this is 12-mark territory. Foreign-market questions want the method of entry named as well as the opportunities and problems.',
    stems: [
      ['Explain **two** problems this business might face when selling abroad.', 4],
      ['Recommend a marketing strategy for this new product. Justify your answer.', 12]
    ],
    earn: [
      'Being specific: **name** the segment, the price level and the promotion method. A generic "advertise more and lower the price" scores badly.',
      'Naming the **method of entry** — exporting, joint venture, franchising or setting up abroad — with a reason it suits this firm.',
      'Checking the strategy against the business\'s **budget**. A small firm cannot afford television advertising.'
    ]
  }
},

/* ==================== UNIT 4 ==================== */

'4.1': {
  outcomes: [
    { n: '4.1.1', t: 'The meaning of production', pts: [
      'Managing resources effectively to produce goods and services'
    ] },
    { n: '4.1.2', t: 'The difference between production and productivity', pts: [
      'The meaning of labour productivity and how it is measured',
      'The benefits of increased productivity and how it can be increased'
    ] },
    { n: '4.1.3', t: 'Lean production', pts: [
      'The main features of lean production and why waste should be reduced',
      'Just-in-time inventory control and kaizen',
      'The benefits and limitations of lean production',
      'The main costs and benefits of holding inventory'
    ] },
    { n: '4.1.4', t: 'The main methods of production', pts: [
      'Job, batch and flow production',
      'The advantages and disadvantages of each, and their appropriateness in a given situation',
      'Recommending and justifying a method for a given situation'
    ] },
    { n: '4.1.5', t: 'How technology has changed production methods', pts: [
      'The use of automation, CAD and CAM',
      'The benefits and limitations of new technology in production'
    ] }
  ],
  technique: {
    asked: 'The production/productivity distinction is examined as a precise-recall trap. The method-of-production recommendation is a standard 12-marker, and the case will always give you the order size and the level of customisation.',
    stems: [
      ['Calculate the labour productivity of this factory.', 2],
      ['Explain the difference between production and productivity.', 4],
      ['Explain **two** benefits to this business of just-in-time inventory control.', 6],
      ['Recommend whether this business should switch to flow production. Justify your answer.', 12]
    ],
    earn: [
      'Production is the **total** made; productivity is output **per worker**. Hiring more workers raises one and not the other.',
      'On JIT, checking the case for **supplier reliability** before recommending it — no buffer stock means one late delivery stops production.',
      'Choosing a production method from the **order size** and how **customised** the product is, plus the capital available.'
    ]
  }
},

'4.2': {
  outcomes: [
    { n: '4.2.1', t: 'Identify and classify costs', pts: [
      'Classifying costs using examples: fixed, variable, average and total costs',
      'Using cost data to help make simple cost-based decisions, e.g. whether to stop or continue production'
    ] },
    { n: '4.2.2', t: 'Economies and diseconomies of scale', pts: [
      'The concept of economies of scale with examples: purchasing, marketing, financial, managerial and technical',
      'The concept of diseconomies of scale with examples: poor communication, lack of commitment from employees, weak coordination'
    ] },
    { n: '4.2.3', t: 'Break-even analysis', pts: [
      'The concept of break-even',
      'Constructing, completing or amending a simple break-even chart',
      'Interpreting a given break-even chart and using it to analyse a situation',
      'Calculating break-even output from given data',
      'Defining, calculating and interpreting the margin of safety',
      'Using break-even analysis to help make simple business decisions, e.g. the impact of higher prices',
      'The limitations of break-even analysis'
    ] }
  ],
  technique: {
    asked: 'The most calculation-heavy sub-topic in the course, and outcome 4.2.3 lists seven separate skills — including **constructing and amending a chart**, so bring a ruler. Expect break-even on almost every paper.',
    stems: [
      ['Calculate the contribution per unit.', 2],
      ['Calculate the break-even output.', 2],
      ['Complete the break-even chart in Fig. 1.', 4],
      ['Calculate the margin of safety and explain what it shows.', 4],
      ['Analyse the effect on this business of the increase in fixed costs.', 6],
      ['Explain **two** limitations of break-even analysis.', 4]
    ],
    earn: [
      'Dividing fixed costs by the **contribution**, never by the selling price. This is the most common error in the whole syllabus.',
      'On a chart: total revenue starts at the **origin**, total costs start at the **fixed cost** level.',
      'Calculating **both** the old and new figures when something changes — the analysis marks come from the comparison.',
      'Always commenting after the number: is that break-even output achievable given the market in the case?'
    ]
  }
},

'4.3': {
  outcomes: [
    { n: '4.3.1', t: 'Why quality is important and how quality production might be achieved', pts: [
      'What quality means to a business and why it is important',
      'The concepts of quality control and quality assurance',
      'The advantages and disadvantages of each method',
      'The costs of poor-quality production'
    ] }
  ],
  technique: {
    asked: 'A small sub-topic with a single outcome, but the quality control versus quality assurance distinction is examined almost every series as a 4-mark "explain the difference".',
    stems: [
      ['Define the term *quality assurance*.', 2],
      ['Explain the difference between quality control and quality assurance.', 4],
      ['Do you think this business should introduce total quality management? Justify your answer.', 12]
    ],
    earn: [
      'Using the two verbs: quality control **finds** faults at the end; quality assurance **prevents** them throughout.',
      'Naming the cost of poor quality — wasted materials, reworking, refunds, lost customers, damaged reputation.',
      'On TQM, weighing the training cost and the time to see benefits against the saving from zero defects.'
    ]
  }
},

'4.4': {
  outcomes: [
    { n: '4.4.1', t: 'The main factors influencing the location and relocation decisions of a business', pts: [
      'Factors influencing the location of manufacturing businesses, retail businesses and services',
      'The reasons for and problems of relocation'
    ] },
    { n: '4.4.2', t: 'The role of legal controls on location decisions', pts: [
      'Planning permission, environmental restrictions and government incentives'
    ] },
    { n: '4.4.3', t: 'The factors a business must consider when locating abroad', pts: [
      'Reasons for locating operations in another country, e.g. lower costs, access to markets, avoiding trade barriers',
      'The problems of locating abroad'
    ] }
  ],
  technique: {
    asked: 'Answers are marked on whether your factors fit the **type** of business. Manufacturing factors written about a shop score almost nothing, so identify the business type in your first line.',
    stems: [
      ['Identify **two** factors affecting the location of this factory.', 2],
      ['Explain **two** problems this business might face if it relocates.', 4],
      ['Recommend which location this business should choose. Justify your answer.', 12]
    ],
    earn: [
      'Sorting factors by business type: manufacturers weigh raw materials and transport; retailers weigh footfall and parking.',
      'Picking the **two or three factors that matter most here** and justifying the ranking, instead of listing all of them.',
      'Including at least one non-cost factor — skills, infrastructure or legal restrictions.'
    ]
  }
},

/* ==================== UNIT 5 ==================== */

'5.1': {
  outcomes: [
    { n: '5.1.1', t: 'The need for business finance', pts: [
      'Why businesses need finance, e.g. start-up capital, expansion, working capital and cash-flow problems',
      'The difference between short-term and long-term finance needs'
    ] },
    { n: '5.1.2', t: 'The main sources of capital', pts: [
      'Internal sources: retained profit, sale of existing assets, sale of inventory, owner\'s savings',
      'External sources: overdraft, trade credit, bank loan, issue of shares, debentures, leasing, hire purchase, grants',
      'Short-term and long-term sources of finance',
      'The factors affecting the choice of source, and recommending a suitable source'
    ] }
  ],
  technique: {
    asked: 'The syllabus asks you to recommend a source, so this is another predictable 12-marker. The case always contains the two or three constraints that decide the answer — existing borrowing, legal form, whether the owners want to keep control.',
    stems: [
      ['Identify **two** internal sources of finance.', 2],
      ['Explain **two** advantages to this business of using retained profit.', 4],
      ['Recommend the most suitable source of finance for this expansion. Justify your answer.', 12]
    ],
    earn: [
      'Matching the **term of the finance to the term of the need** — never an overdraft for a factory or a ten-year loan for one month\'s wages.',
      'Comparing your choice with **at least one alternative** and saying why it is worse for this business.',
      'Checking the legal form: sole traders and partnerships cannot issue shares.'
    ]
  }
},

'5.2': {
  outcomes: [
    { n: '5.2.1', t: 'The importance of cash and of cash-flow forecasting', pts: [
      'The importance of cash to a business and the difference between cash and profit',
      'What a cash-flow forecast is and why businesses produce them',
      'Amending or completing a simple cash-flow forecast',
      'How a business can overcome short-term cash-flow problems'
    ] },
    { n: '5.2.2', t: 'Working capital', pts: [
      'The concept of working capital and why it is important',
      'How working capital is calculated'
    ] }
  ],
  technique: {
    asked: 'Outcome 5.2.1 says **amend or complete** a forecast, so expect a table with gaps to fill and a following question on what the figures mean. "Profitable but out of cash" is one of the most examined ideas in the course.',
    stems: [
      ['Complete the cash-flow forecast in Fig. 2.', 4],
      ['Calculate the closing balance for March.', 2],
      ['Explain how a business can be profitable and still run out of cash.', 6],
      ['Recommend how this business should solve its cash-flow problem. Justify your answer.', 12]
    ],
    earn: [
      'Working down the columns: total inflows, total outflows, net cash flow, then **opening + net = closing**.',
      'Using the rule that one month\'s closing balance is the next month\'s opening balance to fill in a missing figure.',
      'Not calling a negative closing balance "a loss" — it is a **liquidity** problem, not necessarily a loss.',
      'Prioritising the free solutions (delay outflows, chase debtors) above the ones that cost interest.'
    ]
  }
},

'5.3': {
  outcomes: [
    { n: '5.3.1', t: 'The main features of an income statement', pts: [
      'What an income statement shows and the period it covers',
      'Revenue, cost of sales, gross profit, expenses, profit and retained profit',
      'Interpreting a simple income statement'
    ] },
    { n: '5.3.2', t: 'The importance of profit and the use of income statements', pts: [
      'The difference between profit and cash',
      'Why profit is important to a business and how profit can be increased',
      'How income statements are used to measure and improve business performance'
    ] }
  ],
  technique: {
    asked: 'Usually appears as a partially completed statement with a figure or two missing, followed by an interpretation question. Knowing the order of the lines is worth easy marks.',
    stems: [
      ['Calculate the gross profit.', 2],
      ['Calculate the retained profit for the year.', 2],
      ['Explain **two** ways this business could increase its profit.', 4],
      ['Analyse what the income statement shows about this business\'s performance.', 6]
    ],
    earn: [
      'Getting the order right: expenses come **after** gross profit, not before.',
      'Diagnosing which line is the problem — a healthy gross profit with a weak final profit points straight at **overheads**.',
      'Naming a risk with each way of increasing profit: raising price may lose sales if demand is elastic.'
    ]
  }
},

'5.4': {
  outcomes: [
    { n: '5.4.1', t: 'The main classifications of assets and liabilities', pts: [
      'Non-current and current assets',
      'Current and non-current liabilities',
      'Shareholders\' equity, and what a statement of financial position shows'
    ] },
    { n: '5.4.2', t: 'Interpret a simple statement of financial position', pts: [
      'Making deductions about the performance and position of a business from a statement of financial position',
      'Identifying working capital and capital employed'
    ] }
  ],
  technique: {
    asked: 'Classification is examined as straight recall — "identify two current liabilities" is a common 2-marker taken directly from an appendix. The interpretation question wants a comparison, not a description.',
    stems: [
      ['Using Appendix 2, identify **two** current assets of this business.', 2],
      ['Calculate the working capital of this business.', 2],
      ['Analyse what the statement of financial position suggests about this business.', 6]
    ],
    earn: [
      'Learning the five classifications with one example each — inventory is a **current** asset, an overdraft is a **current** liability.',
      'Interpreting by comparison: "inventory rose from $40k to $60k while revenue was flat, so goods are not selling and cash is tied up".',
      'Remembering the statement is a snapshot **at one date**, not a record of a period, and that it does not show profit.'
    ]
  }
},

'5.5': {
  outcomes: [
    { n: '5.5.1', t: 'Interpret and use simple accounts', pts: [
      'Profitability ratios: gross profit margin, profit margin and return on capital employed',
      'Liquidity ratios: current ratio and acid test ratio',
      'Calculating and interpreting these ratios, and using them to assess business performance'
    ] },
    { n: '5.5.2', t: 'Why and how different stakeholder groups use accounts', pts: [
      'The interest each stakeholder group has in a business\'s accounts',
      'The limitations of using accounts and ratio analysis to judge performance'
    ] }
  ],
  technique: {
    asked: 'Five ratios, none of which are given to you in the exam. The calculation marks are the easy half; the marks most candidates miss are for the comparison and judgement that must follow.',
    stems: [
      ['Calculate the gross profit margin.', 2],
      ['Calculate the return on capital employed for each year.', 4],
      ['Analyse what the change in these ratios suggests about the business.', 6],
      ['Do you think this business is performing well? Justify your answer.', 12]
    ],
    earn: [
      'Showing formula → substitution → answer **with the right unit**: % for margins and ROCE, and ": 1" for liquidity ratios.',
      'Explaining the **gap between** gross profit margin and profit margin — that gap is overheads, and naming it is an analysis mark.',
      'Ending with a comparison (last year, or the competitor) and a judgement on what the business should do.',
      'Knowing the guides: current ratio about 1.5–2 : 1, acid test about 1 : 1.'
    ]
  }
},

/* ==================== UNIT 6 ==================== */

'6.1': {
  outcomes: [
    { n: '6.1.1', t: 'Government economic objectives', pts: [
      'Low inflation, low unemployment, economic growth and balance of payments stability',
      'The impact on businesses of the government not meeting these objectives'
    ] },
    { n: '6.1.2', t: 'How government control over the economy affects business activity', pts: [
      'Changes in taxes and government spending',
      'Changes in interest rates',
      'The impact of these changes on businesses and their stakeholders'
    ] },
    { n: '6.1.3', t: 'The impact of legal controls on business activity', pts: [
      'Legal controls over employment, consumer protection, the environment and location',
      'How businesses respond to these controls'
    ] }
  ],
  technique: {
    asked: 'Marked on whether you can trace a **chain**: policy → effect on consumers or costs → effect on this business. The middle step is where most candidates stop and lose the analysis marks.',
    stems: [
      ['Define the term *inflation*.', 2],
      ['Explain **two** effects of a rise in interest rates on this business.', 4],
      ['Analyse the likely impact of the recession on this business.', 6],
      ['Do you think the increase in taxation will damage this business? Justify your answer.', 12]
    ],
    earn: [
      'Asking first whether the business sells **luxuries or necessities** — it decides the whole answer on recessions and tax rises.',
      'Remembering higher interest rates hit twice: the firm\'s own borrowing costs **and** consumer demand.',
      'Keeping fiscal policy (tax and spending) apart from monetary policy (interest rates).'
    ]
  }
},

'6.2': {
  outcomes: [
    { n: '6.2.1', t: 'Environmental concerns as opportunities and constraints', pts: [
      'How business activity can impact on the environment',
      'The concept of sustainable development',
      'How and why business decisions may be influenced by environmental considerations',
      'Government responses: legal controls, taxes and pressure groups'
    ] },
    { n: '6.2.2', t: 'Ethical issues as opportunities and constraints', pts: [
      'The conflict a business may face between profit and ethical decisions',
      'How and why business decisions may be influenced by ethical considerations'
    ] }
  ],
  technique: {
    asked: 'The word the syllabus uses is "opportunities **and** constraints", which tells you the mark scheme expects both sides. A one-sided answer here is capped.',
    stems: [
      ['Define the term *sustainable development*.', 2],
      ['Explain **two** ways this business could reduce its impact on the environment.', 4],
      ['Do you think this business should switch to sustainable materials? Justify your answer.', 12]
    ],
    earn: [
      'Giving the **commercial** benefit as well as the moral one: reputation, customer loyalty, avoiding fines, lower energy costs.',
      'Naming a specific action — recyclable packaging, filters, local sourcing — not "be more environmentally friendly".',
      'Resolving the conflict the case plants, e.g. green credentials against a price-conscious customer base.'
    ]
  }
},

'6.3': {
  outcomes: [
    { n: '6.3.1', t: 'The importance of globalisation', pts: [
      'The concept of globalisation and the reasons for it',
      'The opportunities and threats of globalisation for businesses',
      'Why governments might introduce import tariffs and import quotas'
    ] },
    { n: '6.3.2', t: 'Reasons for the importance and growth of multinational companies (MNCs)', pts: [
      'The benefits to a business of becoming a multinational and the impact on its stakeholders',
      'The potential benefits to a country or economy where an MNC is located, e.g. jobs, exports, increased choice, investment',
      'The potential drawbacks to a country or economy where an MNC is located, e.g. reduced sales of local businesses, repatriation of profits'
    ] },
    { n: '6.3.3', t: 'The impact of exchange rate changes', pts: [
      'Depreciation and appreciation of an exchange rate',
      'How exchange rate changes can affect businesses as importers and exporters of products, e.g. prices, competitiveness, profitability'
    ] }
  ],
  technique: {
    asked: 'Outcome 6.3.2 splits the MNC question explicitly into benefits *and* drawbacks **to the host country** — so read whether the question asks about the company or the country. Exchange rates are examined as a calculation plus an evaluation.',
    stems: [
      ['Define the term *multinational company*.', 2],
      ['Calculate the price of this product in dollars after the exchange rate change.', 2],
      ['Explain **two** drawbacks to this country of the MNC locating there.', 4],
      ['Evaluate the impact of the depreciation on this business.', 12]
    ],
    earn: [
      'Writing **SPICED** at the top of the page: Strong Pound = Imports Cheap, Exports Dear.',
      'Identifying whether the firm is an **exporter, an importer, or both** before you answer — both is the strongest evaluation available.',
      'Weighing the **proportions**: "exports are 65% of output but imported materials only 31% of costs, so the net effect is positive".',
      'On MNCs, answering about the **country** when the question asks about the country, not about the company.'
    ]
  }
}

};

BS.specFor = function (id) { return BS.spec[id] || null; };
