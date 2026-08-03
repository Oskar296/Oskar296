/* Unit 3 — Marketing */

BS.addTopic({
  id: '3.1', unit: 3, title: 'Marketing, competition and the customer',
  syllabus: [
    'The role of marketing',
    'Market changes',
    'Concept of niche marketing and mass marketing',
    'How and why market segmentation is undertaken'
  ],
  sections: [
    {
      h: 'The role of marketing',
      body: [
        '**Marketing** is the management process of identifying, anticipating and satisfying customer requirements profitably.',
        { h3: 'The objectives of marketing' },
        { list: [
          '**Identify and satisfy** customer needs — otherwise nothing will sell',
          'Maintain or increase **market share**',
          'Develop a strong **brand image** so customers choose you over rivals',
          'Increase **sales revenue and profit**',
          'Target **new customers and new markets**',
          'Improve customer **loyalty** so people buy again'
        ] },
        { defs: [
          ['Market share', 'The percentage of total sales in a market held by one business or product.'],
          ['Consumer', 'The person who uses the product.'],
          ['Customer', 'The person who buys the product (not always the same person as the consumer).']
        ] },
        { formula: 'Market share (%) = (business’s sales ÷ total market sales) × 100\nTotal market size can be measured by value ($) or by volume (units)' },
        { callout: { k: 'eg', b: 'A company sells $4m of shoes in a market worth $50m. Market share = 4 ÷ 50 × 100 = **8%**.' } },
        { h3: 'Why a high market share matters' },
        { list: [
          'Higher sales revenue and, usually, higher profit',
          'Bulk buying and economies of scale, so lower unit costs — see [[4.2]]',
          'More power over suppliers and more shelf space from retailers',
          'A strong reputation makes the brand the "default" choice'
        ] }
      ]
    },
    {
      h: 'Why markets change',
      body: [
        { list: [
          '**Consumer tastes and fashion** change — businesses must adapt or lose sales',
          '**Technology** creates new products and kills old ones (streaming replaced DVDs)',
          '**Incomes** rise, so demand for luxury and branded goods grows',
          '**Ageing populations** in some countries change what is demanded',
          '**Globalisation** means competition from abroad and new markets to sell in — see [[6.3]]',
          '**Environmental and ethical concerns** push demand towards greener products — see [[6.2]]',
          '**E-commerce** — customers expect to buy online, at any hour, with fast delivery'
        ] },
        { callout: { k: 'tip', b: 'Businesses respond to market change by conducting market research, changing the marketing mix, developing new products, and using technology. Link the response to the *specific* change in the case study.' } }
      ]
    },
    {
      h: 'Mass marketing and niche marketing',
      body: [
        { table: { head: ['', 'Mass marketing', 'Niche marketing'], rows: [
          ['Target', 'The whole market, with one product for everyone', 'A small, specific segment of a larger market'],
          ['Example', 'A standard cola, basic washing powder', 'Gluten-free bakery, luxury watches, left-handed equipment'],
          ['Advantages', 'Huge potential sales; economies of scale so low unit costs; wide brand awareness; risk spread over many customers', 'Less competition; customers will pay higher prices for a specialist product; easier to target advertising, so lower marketing costs; strong customer loyalty'],
          ['Disadvantages', 'Very high competition; huge production and marketing costs; the product may not suit anyone perfectly', 'Small sales volume; few economies of scale so higher unit costs; all the risk is in one segment; if a big firm enters, the niche firm may not survive']
        ] } }
      ]
    },
    {
      h: 'Market segmentation',
      body: [
        '**Market segmentation** is dividing a market into groups of customers with similar characteristics, so that a product and marketing mix can be aimed at each group.',
        { table: { head: ['Basis of segmentation', 'Examples'], rows: [
          ['**Age**', 'Toys for children, cruises for retired people'],
          ['**Gender**', 'Cosmetics, magazines, clothing ranges'],
          ['**Income / socio-economic group**', 'Budget supermarkets vs luxury department stores'],
          ['**Geographical region**', 'Different products for hot and cold climates; regional food tastes'],
          ['**Lifestyle and interests**', 'Sports equipment, vegan food, gaming'],
          ['**Religion and culture**', 'Halal or kosher foods, festival products'],
          ['**Occupation / education**', 'Professional software, work clothing']
        ] } },
        { table: { head: ['Benefits of segmentation', 'Drawbacks'], rows: [
          ['Products can be designed to meet a group\'s needs exactly, raising sales', 'Research and developing several versions of a product is expensive'],
          ['Advertising can be targeted at the right group, so less money is wasted', 'Production runs are smaller, so fewer economies of scale'],
          ['Gaps in the market can be spotted and filled', 'The segment may be too small to be profitable'],
          ['Higher prices can often be charged to a well-targeted segment', 'Over-segmenting can confuse the brand image'],
          ['Helps a small firm compete by focusing where big firms are weak', 'Segments change over time — a segment can disappear']
        ] } }
      ]
    }
  ],
  terms: ['marketing', 'market-share', 'mass-marketing', 'niche-marketing', 'market-segmentation', 'consumer', 'brand'],
  tips: [
    'Market share questions often need a calculation *and* a comment — always say whether the share has risen or fallen and suggest why.',
    'Niche vs mass evaluation: judge on the **size of the firm** and the **level of competition** in the case.'
  ],
  traps: [
    'Saying segmentation *is* niche marketing. Segmentation is the method; niche marketing is one strategy that uses it.',
    'Confusing market share with market size or with sales revenue.'
  ]
});

BS.addTopic({
  id: '3.2', unit: 3, title: 'Market research',
  syllabus: [
    'The role of market research and methods used',
    'Presentation and use of market research results'
  ],
  sections: [
    {
      h: 'Why businesses do market research',
      body: [
        '**Market research** is the collection, recording and analysis of data about customers, competitors and the market.',
        { list: [
          'Find out **who** the customers are and **what** they want',
          'Identify **gaps in the market** and new opportunities',
          'Test a **new product** before spending heavily on launching it',
          'Find out about **competitors** — their products, prices and share',
          'Discover **why** sales are falling',
          'Decide the right **price, promotion and place** for the product',
          'Reduce the **risk** of failure — the main reason of all'
        ] },
        { defs: [
          ['Primary (field) research', 'Collecting new, original data first hand for a specific purpose.'],
          ['Secondary (desk) research', 'Using data that already exists, collected by someone else for another purpose.']
        ] }
      ]
    },
    {
      h: 'Primary research methods',
      body: [
        { table: { head: ['Method', 'How it works', 'Advantages', 'Disadvantages'], rows: [
          ['**Questionnaire / survey**', 'A set of questions asked in person, by post, phone or online', 'Large amounts of specific data; can be quantitative and qualitative; cheap online', 'Time-consuming to design and analyse; low response rates; people may not answer honestly; leading questions bias results'],
          ['**Interview**', 'A trained interviewer questions a respondent in detail', 'Detailed, in-depth answers; questions can be clarified; body language observed', 'Expensive and slow; interviewer bias; small sample only'],
          ['**Focus group**', 'A small group discusses a product with a researcher', 'Rich, detailed opinions; reactions to new ideas can be seen', 'Expensive; a dominant member can sway the group; the sample is small and may be unrepresentative'],
          ['**Observation**', 'Watching and recording customer behaviour in a store, or counting traffic', 'Cheap; shows what people actually do rather than what they say', 'Does not explain *why* people behave that way; no data on opinions'],
          ['**Test marketing**', 'Selling the product in a limited region before a full launch', 'Real sales data; problems found before an expensive national launch', 'Slow; competitors see the product early; the test region may be unrepresentative'],
          ['**Consumer panel**', 'A group of consumers gives feedback repeatedly over time', 'Shows how views change; detailed data', 'Members may become untypical; cost of paying them']
        ] } },
        { defs: [
          ['Sample', 'The group of people questioned, chosen to represent the whole target market.'],
          ['Random sampling', 'Everyone in the population has an equal chance of being chosen — unbiased but may not represent all segments.'],
          ['Quota sampling', 'The sample is split into segments (e.g. by age) and a set number is chosen from each — more representative but the interviewer chooses who, which can bias the result.']
        ] },
        { callout: { k: 'tip', b: 'The bigger the sample, the more **reliable** the results — but the more **expensive** and slower the research. That trade-off is a ready-made evaluation point.' } }
      ]
    },
    {
      h: 'Secondary research sources',
      body: [
        { list: [
          '**Internal data** — the business\'s own sales records, customer database, accounts and staff feedback',
          '**Government statistics** — population, income, employment, industry data',
          '**Trade and industry publications** and market research reports (e.g. Mintel)',
          '**Competitors\' websites, catalogues and published accounts**',
          '**Newspapers, magazines and online articles**',
          '**Trade associations and chambers of commerce**'
        ] },
        { table: { head: ['', 'Primary research', 'Secondary research'], rows: [
          ['Cost', 'Expensive', 'Cheap or free'],
          ['Speed', 'Slow to collect', 'Available immediately'],
          ['Relevance', 'Exactly what the business needs — asks its own questions', 'Collected for someone else\'s purpose, so may not fit'],
          ['Up to date?', 'Yes — collected now', 'May be out of date'],
          ['Available to rivals?', 'No — confidential and exclusive', 'Yes — competitors can see the same data'],
          ['Bias', 'Can be biased by poor question design or a small sample', 'Bias depends on the original source — may be unknown']
        ] } },
        { callout: { k: 'note', b: 'Most businesses start with **secondary** research because it is cheap and fast, then use **primary** research to fill the gaps with data specific to them.' } }
      ]
    },
    {
      h: 'Qualitative and quantitative data',
      body: [
        { defs: [
          ['Quantitative data', 'Data that can be measured and expressed as numbers — "62% of customers buy weekly". Easy to analyse and compare, but does not explain why.'],
          ['Qualitative data', 'Data about opinions, attitudes and reasons — "customers said the packaging looked cheap". Explains motives, but is hard to analyse and can be subjective.']
        ] }
      ]
    },
    {
      h: 'Presenting and using results',
      body: [
        { table: { head: ['Presentation', 'Best for'], rows: [
          ['**Bar chart**', 'Comparing the size of separate categories, e.g. sales by product'],
          ['**Pie chart**', 'Showing proportions of a whole, e.g. market share'],
          ['**Line graph**', 'Showing a trend over time, e.g. monthly sales'],
          ['**Pictogram**', 'Simple visual comparisons for a general audience'],
          ['**Table**', 'Exact figures that need to be read precisely']
        ] } },
        { h3: 'Limitations of market research' },
        { list: [
          'The **sample may be too small** or unrepresentative',
          'Respondents may not tell the truth, or say what they think the researcher wants to hear',
          '**Leading or biased questions** distort answers',
          'Data becomes **out of date** quickly in fast-changing markets',
          'What people *say* they will buy is not always what they *do* buy',
          'Research is **expensive** and small firms may not be able to afford enough of it'
        ] },
        { callout: { k: 'warn', b: 'Never say market research "guarantees" success. It **reduces risk** — it does not remove it. Examiners reward that qualification.' } }
      ]
    }
  ],
  terms: ['market-research', 'primary-research', 'secondary-research', 'questionnaire', 'focus-group', 'sample', 'quantitative-data', 'qualitative-data', 'test-marketing'],
  tips: [
    'Recommend primary research when the business needs **specific, current, exclusive** data — and secondary when it has little money or time.',
    'Interpreting a chart is a common Paper 1 skill: state the trend, quote a figure, then explain what the business should do about it.'
  ],
  traps: [
    'Calling the business\'s own sales records "primary research" — they already exist, so they are secondary (internal) data.',
    'Describing a method without saying why it suits this business.'
  ]
});

BS.addTopic({
  id: '3.3', unit: 3, title: 'The marketing mix',
  syllabus: [
    'Product: costs and benefits of developing new products; brand image; packaging; the product life cycle and extension strategies',
    'Price: the main pricing methods and their appropriateness; price elasticity of demand',
    'Place: the main channels of distribution and their advantages and disadvantages',
    'Promotion: aims, types, the need for cost-effectiveness',
    'Technology and the marketing mix: e-commerce, internet and social media marketing'
  ],
  sections: [
    {
      h: 'The four Ps',
      body: [
        'The **marketing mix** is the combination of **Product, Price, Place and Promotion** used to market a product. All four must work together and support each other.',
        { callout: { k: 'tip', b: 'The mix must be **consistent**. A luxury watch (product) sold at a premium price must be sold in exclusive shops (place) and advertised in glossy magazines (promotion). Selling it cheaply in a discount store would destroy the brand. Examiners reward this "the Ps must fit together" point.' } }
      ]
    },
    {
      h: 'PRODUCT',
      body: [
        { h3: 'Developing new products' },
        { table: { head: ['Benefits of new product development', 'Costs and risks'], rows: [
          ['Meets changing customer needs and keeps the business relevant', 'Research and development is very expensive'],
          ['Gives a competitive advantage and can allow a higher price', 'Most new products fail — money can be lost entirely'],
          ['Extends the product portfolio, spreading risk', 'Takes a long time from idea to launch'],
          ['Creates publicity and refreshes the brand', 'Diverts resources and management time from existing products'],
          ['Replaces products in decline', 'May cannibalise sales of the firm\'s existing products']
        ] } },
        { h3: 'Brand image' },
        'A **brand** is a name, symbol or design that identifies a product and distinguishes it from rivals. A strong brand allows the business to charge a **higher price**, builds **customer loyalty and repeat purchases**, makes it easier to **launch new products**, and helps products get **shelf space**. Building and defending a brand costs a great deal in advertising, and one scandal can destroy it.',
        { h3: 'Packaging' },
        { list: [
          '**Protects** the product in transit and storage, and keeps food fresh',
          'Makes the product **easy to transport, store and use**',
          '**Promotes** the product — colour, design and logo attract attention on the shelf',
          '**Informs** the customer — ingredients, instructions, safety warnings, legal information',
          'Weakness: packaging adds cost and creates **environmental waste** — see [[6.2]]'
        ] },
        { h3: 'The product life cycle' },
        { table: { head: ['Stage', 'Sales', 'Profit', 'Typical marketing'], rows: [
          ['**Development**', 'None — the product is being designed and tested', 'Negative — heavy R&D spending, no revenue', 'Market research, test marketing'],
          ['**Introduction**', 'Low and growing slowly', 'Negative or very low — high launch costs', 'Heavy informative advertising; price skimming or penetration pricing; limited distribution'],
          ['**Growth**', 'Rising quickly', 'Rising and turning positive', 'Persuasive advertising to build the brand; wider distribution; price may fall as competitors enter'],
          ['**Maturity**', 'At their highest but growth slows; the most competitive stage', 'Highest — development costs recovered, output high so unit costs low', 'Competitive/promotional pricing; brand-reminder advertising; extension strategies begin'],
          ['**Decline**', 'Falling', 'Falling, eventually a loss', 'Reduce promotion spending, cut price to clear stock, withdraw the product']
        ] } },
        { h3: 'Extension strategies' },
        'Extension strategies are used at **maturity or early decline** to lengthen the product\'s life and delay the fall in sales.',
        { list: [
          '**New versions or flavours** of the product',
          '**New packaging or restyling** to make it look modern',
          '**New advertising campaign** to reach a new audience',
          '**Selling into new markets**, including exporting',
          '**Finding new uses** for the product',
          '**Price reductions** or special offers',
          '**Improving the product** with new features or technology'
        ] },
        { callout: { k: 'note', t: 'Product portfolio', b: 'Businesses hold a **portfolio** of products at different life-cycle stages, so that profits from mature products fund the development of new ones and the decline of one product does not sink the business.' } }
      ]
    },
    {
      h: 'PRICE',
      body: [
        { table: { head: ['Pricing method', 'How it works', 'When to use it', 'Drawback'], rows: [
          ['**Cost-plus pricing**', 'Work out the cost per unit, then add a fixed percentage mark-up', 'Simple; used by retailers with many products', 'Ignores competitors\' prices and what customers will pay; needs accurate cost data'],
          ['**Penetration pricing**', 'Set a **low** price when entering a market to win customers quickly', 'New product entering a competitive market with close substitutes', 'Low profit margin at first; customers may expect the low price to continue'],
          ['**Price skimming**', 'Set a **high** price at launch, then lower it as competitors appear', 'Genuinely new, innovative, high-tech products with no substitutes', 'Only works while there is no competition; small sales volume; early buyers feel cheated when the price falls'],
          ['**Competitive pricing**', 'Set the price at or just below the price of rivals', 'Markets with many similar products', 'Low profit margins; the business is following rather than leading; must monitor rivals constantly'],
          ['**Promotional pricing**', 'A temporary low price to boost sales, clear stock or launch', 'Seasonal sales, clearing old stock, entering a new market', 'Reduces revenue; too frequent use damages the brand and trains customers to wait for offers'],
          ['**Psychological pricing**', 'Price just below a round number ($9.99) or high to signal quality', 'Consumer goods; luxury goods', 'Customers may see through it; awkward for cash handling'],
          ['**Price discrimination**', 'Charging different prices to different groups for the same product', 'Travel, cinemas, hotels — off-peak vs peak', 'Customers who pay more may feel it is unfair; needs the groups to be separable']
        ] } },
        { h3: 'Price elasticity of demand (PED)' },
        '**Price elasticity of demand** measures how much the quantity demanded responds to a change in price.',
        { formula: 'PED = % change in quantity demanded ÷ % change in price\n\n|PED| > 1  →  ELASTIC   — demand is very responsive to price\n|PED| < 1  →  INELASTIC — demand hardly responds to price' },
        { table: { head: ['', 'Price elastic demand', 'Price inelastic demand'], rows: [
          ['Meaning', 'A small price change causes a **large** change in quantity demanded', 'Even a large price change causes only a **small** change in quantity demanded'],
          ['Typical products', 'Products with many close substitutes; non-essentials; branded goods in competitive markets', 'Necessities; addictive products; products with few substitutes; strong brands with loyal customers'],
          ['To raise revenue', '**Lower** the price — the rise in quantity outweighs the lower price per unit', '**Raise** the price — quantity falls only slightly, so revenue rises'],
          ['Strategy', 'Compete on price; keep costs low', 'Focus on branding and quality rather than price']
        ] } },
        { callout: { k: 'eg', b: 'Price falls from $10 to $9 (a 10% fall) and quantity rises from 100 to 130 (a 30% rise). PED = 30 ÷ −10 = **−3**, so demand is **elastic**. Revenue rises from $1,000 to $1,170 — cutting the price was the right call.' } },
        { callout: { k: 'warn', b: 'PED is usually **negative** because price and quantity move in opposite directions. Examiners accept the number without the minus sign, but you must interpret the *size*: bigger than 1 means elastic.' } }
      ]
    },
    {
      h: 'PLACE — channels of distribution',
      body: [
        '**Place** means getting the product to the customer in the right place at the right time. The route is called the **channel of distribution**.',
        { table: { head: ['Channel', 'Route', 'Advantages', 'Disadvantages'], rows: [
          ['**Direct / zero-intermediary**', 'Producer → Consumer', 'All the profit stays with the producer; full control over price, image and service; direct customer feedback; lower final price possible', 'The producer must handle storage, delivery and selling; limited reach; expensive to run a website and logistics'],
          ['**One intermediary**', 'Producer → Retailer → Consumer', 'Retailers reach many customers and handle selling and display; suitable for large-volume products', 'The retailer takes a share of the profit; less control over how the product is displayed and priced'],
          ['**Two intermediaries**', 'Producer → Wholesaler → Retailer → Consumer', 'The wholesaler buys in bulk, breaks bulk, stores stock and pays the producer quickly; reaches many small retailers', 'Two profit margins taken, so a higher final price or lower producer margin; least control of all'],
          ['**Agents / brokers**', 'Producer → Agent → Retailer/Consumer', 'Useful when selling **abroad** — local knowledge, language and contacts; low set-up cost', 'Commission must be paid; the agent may also represent competitors']
        ] } },
        { callout: { k: 'tip', b: 'Choosing a channel depends on: the **type of product** (perishable, fragile, high value), the **market** (local or international), the **cost** of each channel, the **control** the business wants over its brand, and how **technically complex** the product is.' } }
      ]
    },
    {
      h: 'PROMOTION',
      body: [
        { h3: 'The aims of promotion' },
        { list: [
          'Create **awareness** of a new product or business',
          '**Inform** customers about features, prices and where to buy',
          '**Persuade** customers to buy rather than choose a competitor',
          '**Remind** existing customers so they buy again',
          'Improve or change the **brand image**',
          'Increase **sales and market share**'
        ] },
        { defs: [
          ['Informative advertising', 'Gives customers facts about the product — used at launch and for technical or safety information.'],
          ['Persuasive advertising', 'Tries to convince customers that they want or need the product, often using images and emotion rather than facts.']
        ] },
        { h3: 'Above-the-line: advertising through media' },
        { table: { head: ['Medium', 'Advantages', 'Disadvantages'], rows: [
          ['TV', 'Huge audience; sound, colour and movement demonstrate the product', 'Very expensive; viewers skip adverts; message is quickly forgotten'],
          ['Radio', 'Cheaper than TV; can target local areas and specific listeners', 'Sound only — cannot show the product; often background noise'],
          ['Newspapers and magazines', 'Long-lived — can be re-read and kept; magazines target segments precisely', 'Static and often black and white; national papers are expensive'],
          ['Billboards and posters', 'Seen repeatedly; cheap per viewing; good for local awareness', 'Very short message; easily ignored; can be vandalised'],
          ['Cinema', 'Captive, attentive audience; strong audio-visual impact', 'Limited and self-selecting audience; only seen once'],
          ['Internet display and search ads', 'Cheap; measurable; targeted by interest, age and location; global reach', 'Ad-blockers; customers ignore or distrust ads; needs internet access']
        ] } },
        { h3: 'Below-the-line: promotion not paid to media' },
        { table: { head: ['Method', 'How it works', 'Watch out for'], rows: [
          ['**BOGOF / special offers**', '"Buy one get one free" boosts short-term sales and clears stock', 'Cuts revenue per unit; may only bring forward sales'],
          ['**Discounts and money-off coupons**', 'Encourage trial and repeat purchase', 'Trains customers to wait for offers'],
          ['**Free samples / trials**', 'Lets customers try before buying — good for new products', 'Expensive; some takers never buy'],
          ['**Loyalty cards and points**', 'Rewards repeat purchase and collects valuable customer data', 'Costly to run; customers hold several competing cards'],
          ['**Competitions and prize draws**', 'Create excitement and collect customer details', 'Legal rules apply; may attract non-customers'],
          ['**Point-of-sale displays**', 'Eye-catching in-store displays drive impulse buying', 'Needs retailer cooperation and shelf space'],
          ['**Public relations and sponsorship**', 'Press releases, events, sponsoring a team — builds image cheaply', 'Little control over what the media says'],
          ['**Direct mail / email marketing**', 'Targeted at named customers; cheap per contact', 'Often treated as junk; low response rate'],
          ['**Personal selling**', 'A salesperson deals with the customer directly', 'Expensive per customer; suits high-value or technical products']
        ] } },
        { callout: { k: 'warn', t: 'Cost-effectiveness', b: 'The right promotion is the one where the **extra revenue generated exceeds the cost**. A small local business cannot justify TV advertising; social media or local newspapers give far more sales per dollar spent. Always weigh the cost against the size and budget of the business in the case.' } }
      ]
    },
    {
      h: 'Technology and the marketing mix',
      body: [
        { defs: [
          ['E-commerce', 'Buying and selling goods and services over the internet.'],
          ['M-commerce', 'Buying and selling through mobile devices.'],
          ['Viral marketing', 'Using social media so that users share the marketing message themselves, spreading it rapidly at little cost.']
        ] },
        { table: { head: ['Opportunities of e-commerce and social media', 'Problems'], rows: [
          ['Global reach — sell to customers anywhere', 'Set-up and maintenance costs of the website and systems'],
          ['Open 24 hours a day, 7 days a week', 'Customers cannot touch or try the product before buying'],
          ['Lower costs — no shops, fewer staff, so lower prices possible', 'Delivery and returns costs can be high'],
          ['Cheap, highly targeted advertising with measurable results', 'Intense price competition — customers compare prices instantly'],
          ['Customer data collected for personalised marketing', 'Security, fraud and data-protection concerns'],
          ['Direct two-way contact and instant feedback with customers', 'Negative comments and complaints spread very quickly and publicly'],
          ['Small businesses can compete with large ones online', 'Requires reliable internet access, which not all customers have']
        ] } },
        { callout: { k: 'note', b: 'Technology changes **all four Ps**: products become digital or app-based, prices can be changed instantly and personalised, place shifts to online distribution and home delivery, and promotion moves to social media, influencers and search advertising.' } }
      ]
    }
  ],
  terms: ['marketing-mix', 'product-life-cycle', 'extension-strategy', 'brand', 'packaging', 'cost-plus-pricing', 'penetration-pricing', 'price-skimming', 'competitive-pricing', 'promotional-pricing', 'psychological-pricing', 'price-elasticity-of-demand', 'channel-of-distribution', 'wholesaler', 'retailer', 'informative-advertising', 'persuasive-advertising', 'above-the-line', 'below-the-line', 'e-commerce', 'viral-marketing'],
  tips: [
    'Product life cycle questions: identify the stage from the **sales trend**, then recommend an action that fits that stage.',
    'For any "which pricing method?" question, check whether the product is **new**, **unique** and whether the market is **competitive** — those three facts decide the answer.',
    'PED is examined mainly through interpretation: elastic → cut price to raise revenue; inelastic → raise price to raise revenue.'
  ],
  traps: [
    'Drawing the product life cycle with profit and sales on the same line — they are different, and profit is negative during development.',
    'Confusing price skimming (high then low) with penetration (low then high).',
    'Saying an extension strategy is "advertising more" without a second, more specific method.'
  ]
});

BS.addTopic({
  id: '3.4', unit: 3, title: 'Marketing strategy',
  syllabus: [
    'Justify marketing strategies appropriate to a given situation',
    'The nature and impact of legal controls related to marketing',
    'The opportunities and problems of entering new foreign markets'
  ],
  sections: [
    {
      h: 'Building a marketing strategy',
      body: [
        'A **marketing strategy** is a plan that uses the marketing mix to achieve the business\'s marketing objectives. A good answer builds a strategy from the case study, not from a memorised list.',
        { num: [
          'State the **objective** — e.g. increase market share by 5% in two years',
          'Identify the **target market** using segmentation — see [[3.1]]',
          'Use **market research** to check what that segment wants — see [[3.2]]',
          'Design a **consistent marketing mix** for that segment — see [[3.3]]',
          'Check the **budget** — can the business afford it?',
          '**Monitor** sales and market share, and change the mix if results are poor'
        ] },
        { callout: { k: 'tip', b: 'For a 6-mark "recommend a marketing strategy" answer, name **two or three Ps**, explain how each specifically helps *this* business, note one risk or cost, then give a justified overall recommendation.' } }
      ]
    },
    {
      h: 'Legal controls on marketing',
      body: [
        { table: { head: ['Control', 'What it stops', 'Impact on the business'], rows: [
          ['**Misleading advertising**', 'False claims about what a product does, fake "was/now" prices, misleading images', 'Adverts must be checked before publication, adding cost and delay; but honest firms benefit as customers trust the market'],
          ['**Faulty and dangerous goods**', 'Selling goods that are unsafe or not of satisfactory quality', 'Higher quality-control and testing costs; refunds and recalls are expensive; but fewer complaints and a better reputation'],
          ['**Incorrect descriptions / labelling**', 'Wrong weight, wrong ingredients, false country of origin, misleading "organic" claims', 'Accurate labelling and packaging cost money; but builds consumer confidence'],
          ['**Consumer protection on price and credit**', 'Hidden charges, unclear interest rates', 'Must publish clear terms; may reduce impulse sales'],
          ['**Age and content restrictions**', 'Advertising alcohol, tobacco or gambling to children', 'Narrows the market and reduces sales in those industries'],
          ['**Data protection**', 'Misuse of customers\' personal data collected online', 'Systems and staff training cost money; a breach brings fines and lost trust']
        ] } },
        { callout: { k: 'note', b: 'Legal controls raise costs and restrict what a business can say — but they also create a **level playing field** and protect honest firms from rivals who would otherwise lie about their products.' } }
      ]
    },
    {
      h: 'Entering new foreign markets',
      body: [
        { h3: 'Opportunities' },
        { list: [
          'Access to **many more customers**, raising sales and profit',
          '**Spreads risk** — a downturn in the home market matters less',
          'Extends the **life cycle** of a product that is mature or declining at home',
          'Larger output brings **economies of scale**, cutting unit costs',
          'Escape from a **saturated or highly competitive** home market',
          'May avoid **tariffs and quotas** by producing inside the foreign country',
          'Access to **cheaper labour, materials or land**'
        ] },
        { h3: 'Problems' },
        { table: { head: ['Problem', 'How a business can reduce it'], rows: [
          ['**Cultural differences** — tastes, colours, religion, humour and brand names do not travel', 'Local market research; adapt the product and promotion; hire local staff'],
          ['**Language barriers** in packaging, advertising and negotiation', 'Use local agents and professional translation'],
          ['**Legal differences** — safety standards, labelling and advertising rules differ', 'Take local legal advice; use a joint venture with a local firm'],
          ['**Exchange rate changes** make prices and profits unpredictable — see [[6.3]]', 'Price in a stable currency; hedge; produce locally'],
          ['**Tariffs and quotas** raise prices or limit quantities', 'Set up production inside the country; trade with countries in a free-trade area'],
          ['**Established local competitors** with brand loyalty and local knowledge', 'Enter via a joint venture, franchise or takeover of a local firm'],
          ['**Distribution and transport costs** and delays over long distances', 'Use local warehouses and distributors'],
          ['**Political instability** or the risk of assets being seized', 'Research country risk; start with exporting rather than heavy investment']
        ] } },
        { h3: 'Ways of entering a foreign market' },
        { list: [
          '**Exporting** from the home country — lowest risk and cost, but high transport costs and tariffs',
          '**Licensing or franchising** to a local firm — fast, low cost, but shared profit and less control',
          '**Joint venture** with a local business — local knowledge and shared risk, but shared profit and possible disagreements',
          '**Setting up own operations abroad** (becoming a multinational) — full control and profit, but high cost and high risk'
        ] }
      ]
    }
  ],
  terms: ['marketing-strategy', 'misleading-advertising', 'consumer-protection', 'exporting', 'multinational-company'],
  tips: [
    'Marketing strategy answers must be **specific to the case**: name the segment, name the price level, name the promotion method.',
    'For entering foreign markets, always mention the **method of entry** as well as the opportunities and problems — it lifts the answer to evaluation.'
  ],
  traps: [
    'Writing a generic "advertise more, lower the price" strategy with no reference to the case study.',
    'Ignoring the cost of the strategy relative to the size of the business.'
  ]
});
