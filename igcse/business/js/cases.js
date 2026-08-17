/* cases.js — full Paper 2 style case studies.
   Each case has stimulus text, numbered appendices, and four 20-mark questions
   broken into parts, every part with a mark scheme.                          */

BS.cases = [

/* ==================================================================== */
{
  id: 'c1',
  title: 'Kayo Foods',
  tag: 'Manufacturing · growth · finance',
  blurb: 'A family sauce manufacturer with a supermarket contract on the table, a cash-flow squeeze and a decision about how to grow.',
  units: [1, 4, 5, 3],
  text: [
    '**Kayo Foods (KF)** is a private limited company that makes chilli sauces. It was started 11 years ago by Ada Kayo, who still owns 70% of the shares; her brother and two friends own the rest. KF employs 34 people at a single factory and uses **batch production**, making one sauce variety at a time in 400-litre batches.',
    'KF sells through independent food shops and delicatessens, and has built a strong reputation for quality. Its sauces sell for far more than the supermarket brands. Ada describes KF as "a niche business that does one thing properly".',
    'KF has been approached by **Verdano**, a national supermarket chain. Verdano wants 40,000 bottles a month of a single recipe, at a price of **$2.10 per bottle** — well below KF\'s usual selling price of $3.60. Ada calculates that meeting the order would mean switching that recipe to **flow production**, which requires new equipment costing **$450,000**.',
    'The contract would treble KF\'s output. Ada is worried: "Verdano would become 60% of our revenue. And we would be making a cheap product under our own name."',
    'KF already has a bank loan of $180,000 outstanding. Its accountant has warned that cash flow is tight — several delicatessen customers now take 75 days to pay, and KF pays its chilli growers within 14 days.',
    'Ada is considering three options:\n**Option A** — accept the Verdano contract and borrow to buy the equipment.\n**Option B** — reject Verdano and grow organically by adding two new sauces for the existing delicatessen market.\n**Option C** — accept Verdano but produce under a separate brand name so the KF name is not used on the cheaper product.'
  ],
  appendices: [
    {
      n: 1, title: 'Kayo Foods — extract from the income statement (year ended 31 March)',
      table: { head: ['$000', 'Last year', 'This year'], rows: [
        ['Revenue', '1,240', '1,310'],
        ['Cost of sales', '620', '694'],
        ['**Gross profit**', '**620**', '**616**'],
        ['Expenses', '430', '468'],
        ['**Profit**', '**190**', '**148**']
      ] }
    },
    {
      n: 2, title: 'Kayo Foods — extract from the statement of financial position (as at 31 March this year)',
      table: { head: ['$000', ''], rows: [
        ['Non-current assets', '540'],
        ['Inventory', '96'],
        ['Trade receivables', '214'],
        ['Cash', '11'],
        ['**Total current assets**', '**321**'],
        ['Trade payables', '148'],
        ['Overdraft', '92'],
        ['**Total current liabilities**', '**240**'],
        ['Non-current liabilities (bank loan)', '180'],
        ['Shareholders\' equity', '441']
      ] }
    },
    {
      n: 3, title: 'The Verdano contract — costings prepared by Ada',
      table: { head: ['', 'Current (delicatessen)', 'Proposed (Verdano)'], rows: [
        ['Selling price per bottle', '$3.60', '$2.10'],
        ['Variable cost per bottle', '$1.45', '$1.05'],
        ['Bottles per month', '9,000', '40,000'],
        ['Additional fixed costs per month', '—', '$28,000']
      ] }
    },
    {
      n: 4, title: 'Extracts from a staff meeting',
      quotes: [
        ['**Tomas, production supervisor**', '"Flow production means the line never stops. My team have made sauce by hand for nine years. They will hate standing at a conveyor, and half of them will leave."'],
        ['**Beatriz, sales manager**', '"Verdano would put us in 800 stores overnight. Nobody outside this region has heard of us. That is worth more than the margin we give up."'],
        ['**Ada Kayo, managing director**', '"If Verdano drops us in two years we are left with a $450,000 machine and no customer for it."']
      ]
    }
  ],
  questions: [
    {
      n: 1, total: 20, parts: [
        {
          marks: 2, cmd: 'Define',
          q: 'Define the term **private limited company**.',
          scheme: [
            'A business with a separate legal identity / incorporated, whose owners have limited liability (1)',
            'Shares are sold privately and cannot be offered to the general public (1)'
          ]
        },
        {
          marks: 6, cmd: 'Explain',
          q: 'Explain **two** benefits to Kayo Foods of being a private limited company rather than a partnership.',
          scheme: [
            'Limited liability (1) — Ada and the other shareholders can only lose what they invested, their homes are safe (1) — important given the $180,000 loan and the possible $450,000 borrowing (1)',
            'Can raise capital by selling shares (1) — the brother and two friends already own 30% (1) — funds growth without more debt (1)',
            'Continuity / separate legal identity (1) — the business survives if an owner leaves or dies (1) — reassures Verdano that KF can honour a long contract (1)',
            'Easier to borrow (1) — banks see an incorporated business as lower risk (1)'
          ]
        },
        {
          marks: 12, cmd: 'Recommend',
          q: 'Ada is considering Option A, B or C. Recommend which option Kayo Foods should choose. Justify your answer with reference to the case and the appendices.',
          scheme: [
            'Option A analysed: trebles output, Verdano contribution = $2.10 − $1.05 = $1.05 per bottle × 40,000 = $42,000 a month, less $28,000 extra fixed costs = **$14,000 a month extra profit** ($168,000 a year) (up to 3)',
            'Option A risks: 60% dependence on one customer; Ada\'s own point that the machine is worthless if Verdano leaves; $450,000 borrowing on top of $180,000 already outstanding, with cash already tight (up to 3)',
            'Option A risks: Tomas warns half the production team may leave — flow production destroys the craft work they value (up to 2)',
            'Option B analysed: protects the premium brand and the $2.15 contribution per bottle; no new borrowing; but growth is slow and the appendix shows profit already falling from $190k to $148k (up to 3)',
            'Option C analysed: captures Verdano\'s 800 stores while protecting the KF name — addresses Ada\'s brand concern directly; but costs of a second brand, and Beatriz\'s point about national awareness is lost if the KF name is not used (up to 3)',
            'Use of Appendix 1: gross margin has fallen from 50.0% to 47.0% and profit from $190k to $148k — standing still is not safe (up to 2)',
            'Use of Appendix 2: acid test = (321 − 96) ÷ 240 = 0.94 : 1, current ratio 1.34 : 1, cash only $11k — KF cannot fund $450,000 from its own resources (up to 2)',
            'Justified recommendation with a condition — e.g. Option C, contingent on a minimum contract length and on Verdano accepting a separate brand (up to 3)'
          ],
          model: 'The numbers favour taking the contract. Contribution on Verdano bottles is $2.10 − $1.05 = $1.05, and 40,000 bottles gives $42,000 a month. After the $28,000 of additional fixed costs that is $14,000 a month, or $168,000 a year of extra profit — more than KF\'s entire current profit of $148,000. Doing nothing is not safe either: Appendix 1 shows gross margin falling from 50% to 47% and profit falling from $190,000 to $148,000, so Option B alone leaves KF drifting downwards.\n\nBut the risks in Option A are real. Appendix 2 shows an acid test of just 0.94 : 1 and cash of only $11,000, against an existing loan of $180,000. Borrowing a further $450,000 on that position would be heavy, and receivables of $214,000 with delicatessens paying in 75 days means KF is already short of cash. Ada\'s own warning is the sharpest point: if Verdano walks away after two years, KF owns a $450,000 flow line with no customer for it. Tomas also warns that half the production team may leave, which would damage the premium range that still earns $2.15 a bottle.\n\nOption C resolves the central conflict. It captures Verdano\'s 800 stores and the $168,000 of extra profit, while a separate brand name protects the reputation that lets KF charge $3.60 in delicatessens. It answers Ada\'s objection directly without giving up Beatriz\'s distribution argument.\n\nI recommend **Option C**, with two conditions. First, KF should insist on a contract of at least three years, so the $450,000 investment is recovered before the dependency risk bites. Second, it should keep the handmade batch line running for the premium range, both to retain skilled staff like Tomas\'s team and to keep a business to fall back on. If Verdano refuses either a long contract or a separate brand, KF should take Option B instead and protect what it has.'
        }
      ]
    },
    {
      n: 2, total: 20, parts: [
        {
          marks: 2, cmd: 'Calculate',
          q: 'Using Appendix 3, calculate the **contribution per bottle** on the Verdano contract.',
          scheme: ['Method: selling price − variable cost = 2.10 − 1.05 (1)', 'Answer: $1.05 (1)']
        },
        {
          marks: 6, cmd: 'Calculate',
          q: 'Using Appendix 3, calculate (a) the monthly break-even output for the Verdano contract, and (b) the monthly profit or loss the contract would make at 40,000 bottles.',
          scheme: [
            '(a) Method: additional fixed costs ÷ contribution = 28,000 ÷ 1.05 (1)',
            '(a) Answer: 26,667 bottles (accept 26,666.7 or "about 26,700") (1)',
            '(a) Comment: this is below the 40,000 Verdano wants, so the contract breaks even comfortably (1)',
            '(b) Method: (1.05 × 40,000) − 28,000 (1)',
            '(b) Working: 42,000 − 28,000 (1)',
            '(b) Answer: $14,000 profit per month (1)'
          ]
        },
        {
          marks: 12, cmd: 'Evaluate',
          q: 'Ada says the Verdano price of $2.10 is "too low to be worth having". Using the appendices, evaluate whether she is right.',
          scheme: [
            'Against Ada: the contract still contributes $1.05 a bottle and $14,000 a month after its own fixed costs — that is real profit, not a loss (up to 3)',
            'Against Ada: $168,000 a year would more than double KF\'s current $148,000 profit (Appendix 1) (up to 2)',
            'Against Ada: volume brings economies of scale — bulk chilli purchasing should cut the variable cost below $1.05 over time (up to 2)',
            'For Ada: contribution per bottle falls from $2.15 to $1.05 — less than half (up to 2)',
            'For Ada: gross margin on Verdano is 50% versus 60% on delicatessen sales, so the average margin falls and Appendix 1 already shows margin under pressure (up to 2)',
            'For Ada: a $2.10 product under the KF name risks the premium positioning that supports the $3.60 price (up to 2)',
            'For Ada: the $450,000 equipment cost is not in the $28,000 monthly figure — loan interest and depreciation will reduce the $14,000 (up to 2)',
            'Judgement: a supported decision that distinguishes margin per bottle from total profit (up to 3)'
          ],
          model: 'Ada is right that the *margin* is much worse. Contribution falls from $2.15 a bottle on delicatessen sales to $1.05 on Verdano — less than half — and the gross margin drops from about 60% to 50%. Appendix 1 already shows margin under pressure, with gross profit falling from 50.0% to 47.0% of revenue, so accepting a lower-margin product makes that trend worse, not better.\n\nBut she is wrong that it is "not worth having". A lower margin on a much larger volume can still be far more profitable in total. The contract generates $42,000 of contribution a month against $28,000 of additional fixed costs, leaving $14,000 a month — $168,000 a year, which would more than double KF\'s current annual profit of $148,000. Break-even on the contract is only 26,667 bottles against an order of 40,000, so there is a margin of safety of over 13,000 bottles a month.\n\nTwo qualifications matter. First, the $28,000 does not appear to include interest and depreciation on the $450,000 equipment, so the true monthly figure is lower than $14,000. Second, trebling volume should bring purchasing economies of scale on chillies and bottles, pushing the $1.05 variable cost down over time and widening the margin again.\n\nOverall Ada is confusing margin with profit. The price is low, but the contract is clearly worth having in financial terms. Her stronger objection is not the $2.10 price at all — it is the 60% dependence on a single customer and the risk to the KF brand, and those are better solved by a separate brand name and a long contract than by rejecting the order.'
        }
      ]
    },
    {
      n: 3, total: 20, parts: [
        {
          marks: 2, cmd: 'Identify',
          q: 'Using Appendix 2, identify **two** current liabilities of Kayo Foods.',
          scheme: ['Trade payables $148,000 (1)', 'Overdraft $92,000 (1)']
        },
        {
          marks: 6, cmd: 'Analyse',
          q: 'Analyse the cash-flow problem described in the case and its likely consequences for Kayo Foods.',
          scheme: [
            'Delicatessens take 75 days to pay but growers are paid in 14 days (1) — a 61-day gap during which KF has paid out but not been paid (1) — cash leaves far faster than it arrives (1)',
            'Appendix 2 evidence: trade receivables $214,000 against cash of only $11,000 (1) — most of KF\'s money is sitting with customers, not in the bank (1)',
            'Overdraft of $92,000 is being used to bridge the gap (1) — expensive interest and repayable on demand (1)',
            'Consequence: KF may be unable to pay growers or wages on time (1) — suppliers could stop delivering, halting production (1)',
            'Consequence: KF cannot self-fund the $450,000 equipment and will struggle to borrow more (1)',
            'Consequence: a profitable business can still become insolvent (1)'
          ]
        },
        {
          marks: 12, cmd: 'Recommend',
          q: 'Recommend how Kayo Foods should solve its cash-flow problem. Justify your answer.',
          scheme: [
            'Reduce credit given to delicatessens from 75 days / offer early-payment discounts (1) — releases part of the $214,000 receivables (1) — but small delicatessens may switch to a competitor with easier terms (1)',
            'Debt factoring (1) — immediate cash against the $214,000 owed (1) — but the factor keeps a percentage, cutting an already falling profit (1)',
            'Negotiate longer credit from chilli growers than 14 days (1) — directly closes the 61-day gap (1) — but growers are small and may refuse or raise prices (1)',
            'Convert the $92,000 overdraft into a long-term loan (1) — cheaper interest and not repayable on demand (1) — but adds to the $180,000 already owed (1)',
            'Reduce inventory of $96,000 (1) — frees cash and cuts storage cost (1) — but risks stock-outs (1)',
            'Ada or the other shareholders inject more capital (1) — no interest, no repayment (1) — but they may not have it, and it dilutes control (1)',
            'Judgement: a prioritised recommendation, with the reason and a condition (up to 3)'
          ],
          model: 'The root cause is the 61-day gap between paying growers in 14 days and being paid in 75. Appendix 2 shows the result: $214,000 tied up in receivables against just $11,000 of cash, with a $92,000 overdraft bridging the difference.\n\nThe most direct fix is to attack the receivables. Offering delicatessens a 2% discount for payment within 30 days would release a large part of that $214,000 quickly. The cost is a small reduction in revenue, and some small shops may object — but KF has a strong reputation and a product they cannot easily substitute, which gives it more bargaining power than it is using.\n\nDebt factoring would release cash faster still, but the factor takes a percentage, and with profit already down from $190,000 to $148,000, KF cannot afford to give away margin permanently. It is a solution for a one-off crisis, not an ongoing policy.\n\nNegotiating longer credit from the chilli growers would close the gap from the other end at no cost, but the growers are small suppliers and are unlikely to agree; pushing them may raise prices or lose supply.\n\nI recommend a package, in priority order: first, offer the early-payment discount to shorten the 75-day terms, since it is free of interest and attacks the largest single number on the balance sheet. Second, convert the $92,000 overdraft into a long-term loan, which lowers the interest cost and removes the risk of the bank demanding repayment at the worst moment. KF should avoid factoring unless the discount fails.\n\nThis depends on how the delicatessens react. If a significant number refuse to pay earlier, KF will need factoring or fresh capital from Ada — and it should resolve the cash position before, not after, committing to a $450,000 machine.'
        }
      ]
    },
    {
      n: 4, total: 20, parts: [
        {
          marks: 2, cmd: 'Define',
          q: 'Define the term **flow production**.',
          scheme: [
            'Producing large quantities of an identical/standardised product (1)',
            'Continuously, moving along a production line (1)'
          ]
        },
        {
          marks: 6, cmd: 'Explain',
          q: 'Using Appendix 4, explain **two** problems Kayo Foods might face if it switches to flow production.',
          scheme: [
            'Demotivation and staff loss (1) — Tomas says his team have made sauce by hand for nine years and "half of them will leave" (1) — KF loses the skilled staff its premium range depends on, and faces recruitment and training costs (1)',
            'Inflexibility (1) — a flow line makes one recipe, so KF could not easily switch varieties as batch production allows (1) — it loses the ability to serve its varied delicatessen range from that line (1)',
            'Very high set-up cost (1) — $450,000 with cash of only $11,000 (1) — heavy borrowing on top of the existing $180,000 loan (1)',
            'Breakdown risk (1) — a fault at one point stops the entire line (1) — KF could fail to meet a 40,000-bottle monthly commitment (1)',
            'Loss of the handmade quality image (1) — which is what justifies the $3.60 price (1)'
          ]
        },
        {
          marks: 12, cmd: 'Evaluate',
          q: 'Beatriz says being stocked in 800 Verdano stores "is worth more than the margin we give up". Evaluate her view.',
          scheme: [
            'Supporting Beatriz: 800 stores gives national distribution KF could never afford to build itself; the case states nobody outside the region has heard of KF (up to 3)',
            'Supporting Beatriz: brand awareness from shelf presence may raise demand for the premium $3.60 range too (up to 2)',
            'Supporting Beatriz: volume brings economies of scale, lowering unit costs across the business (up to 2)',
            'Against Beatriz: the margin given up is over half the contribution per bottle, $2.15 down to $1.05 (up to 2)',
            'Against Beatriz: awareness gained is for a $2.10 product, which may *damage* rather than help the premium positioning (up to 3)',
            'Against Beatriz: the shelf space belongs to Verdano, not KF — it can be withdrawn, and 60% dependence gives Verdano the power to demand a lower price later (up to 3)',
            'Judgement: a supported decision, ideally noting that Option C separates the two effects (up to 3)'
          ],
          model: 'Beatriz has a strong point about distribution. The case states that nobody outside the region has heard of KF, and a firm with 34 employees and $11,000 of cash could never buy its way into 800 stores. Verdano hands KF national distribution overnight, and the resulting awareness could lift sales of the premium range as well as the contract volume. The extra volume also brings purchasing economies of scale that cut unit costs across the whole business.\n\nBut her argument has two weaknesses. First, the awareness gained is awareness of a **$2.10 product**. KF\'s premium position — and the $3.60 price and $2.15 contribution that go with it — rests on being a specialist, handmade sauce found in delicatessens. Being seen on a supermarket shelf at $2.10 may undermine exactly the thing Beatriz hopes it will build.\n\nSecond, the shelf space is not KF\'s asset; it is Verdano\'s, and it can be withdrawn. Once Verdano is 60% of revenue it holds all the bargaining power and can demand a lower price at renewal, which Ada recognises when she worries about being left with a $450,000 machine.\n\nBeatriz is right that distribution has value beyond the margin, and wrong to treat it as unambiguously worth more. The best answer is Option C: supplying Verdano under a separate brand captures the volume, the profit and the economies of scale, while leaving the KF name attached only to the premium product. That is only possible if Verdano agrees — many supermarkets want a recognised name on the shelf — so if it refuses, Ada\'s caution should outweigh Beatriz\'s optimism.'
        }
      ]
    }
  ]
},

/* ==================================================================== */
{
  id: 'c2',
  title: 'Sunla Tours',
  tag: 'Service · people · external influences',
  blurb: 'A tour operator hit by a currency swing, a motivation crisis and a decision about whether to go digital.',
  units: [2, 6, 3, 5],
  text: [
    '**Sunla Tours (ST)** is a public limited company operating coach holidays. It is based in a country whose currency is the **dinar**. ST employs 480 people: 180 drivers and tour guides, 220 in three call centres, and 80 in head office.',
    'ST sells two kinds of holiday. **Domestic tours** (60% of revenue) are sold to local customers in dinars. **Inbound tours** (40% of revenue) are sold to foreign visitors who pay in euros and dollars.',
    'Over the last year the dinar has **depreciated by 18%**. At the same time the government raised interest rates from 3% to 7% to control inflation, which reached 9%.',
    'ST\'s call centres have serious people problems. Labour turnover reached **41%** last year against an industry average of 24%. Staff are paid a fixed hourly wage and read from a script; an internal survey found that 78% described the work as "repetitive" and 64% said they had "no say in anything". Call centre manager Dan Oyelaran has proposed paying a bonus for every booking taken.',
    'Marketing director Priya Raman wants ST to move 70% of bookings to a new website and mobile app, costing **$1.2 million**. She argues this would cut call centre costs sharply. Dan disagrees: "Our customers are mostly over 60. They ring up because they want to talk to a person. Take that away and they will book with someone else."',
    'The board must decide whether to approve the $1.2 million app.'
  ],
  appendices: [
    {
      n: 1, title: 'Sunla Tours — key figures',
      table: { head: ['', 'Two years ago', 'Last year'], rows: [
        ['Revenue ($m)', '58.0', '61.4'],
        ['Profit ($m)', '5.8', '4.3'],
        ['Capital employed ($m)', '46.0', '48.0'],
        ['Call centre labour turnover', '29%', '41%'],
        ['Average cost per booking taken by phone', '$14.20', '$16.80'],
        ['Bookings taken online', '11%', '15%']
      ] }
    },
    {
      n: 2, title: 'Effect of the 18% dinar depreciation',
      table: { head: ['', 'Share of revenue', 'Effect'], rows: [
        ['Inbound tours (paid in euros/dollars)', '40%', 'Foreign visitors get 18% more dinars per euro, so ST\'s holidays are cheaper for them'],
        ['Domestic tours (paid in dinars)', '60%', 'No direct currency effect on price'],
        ['Imported fuel and foreign hotel bookings', '31% of total costs', 'Now cost about 18% more in dinars']
      ] }
    },
    {
      n: 3, title: 'Extract from the internal staff survey (220 call centre employees)',
      table: { head: ['Statement', '% agreeing'], rows: [
        ['"My work is repetitive"', '78%'],
        ['"I have no say in anything"', '64%'],
        ['"I am paid fairly for what I do"', '61%'],
        ['"I could be promoted here"', '12%'],
        ['"My manager listens to my ideas"', '19%']
      ] }
    },
    {
      n: 4, title: 'Cost of the proposed app',
      table: { head: ['', '$'], rows: [
        ['Development and launch (one-off)', '1,200,000'],
        ['Annual maintenance and updates', '190,000'],
        ['Estimated annual saving in call centre costs if 70% of bookings move online', '2,100,000'],
        ['Estimated redundancy payments', '840,000']
      ] }
    }
  ],
  questions: [
    {
      n: 1, total: 20, parts: [
        {
          marks: 2, cmd: 'Define',
          q: 'Define the term **labour turnover**.',
          scheme: [
            'The percentage of a business\'s workforce that leaves during a period, usually a year (1)',
            'Calculated as (number leaving ÷ average number employed) × 100 (1)'
          ]
        },
        {
          marks: 6, cmd: 'Analyse',
          q: 'Using Appendix 3, analyse **two** causes of Sunla Tours\' 41% call centre labour turnover.',
          scheme: [
            'Repetitive work — 78% agree (1) — reading from a script gives no variety (1) — Herzberg: the work itself is a motivator that is absent, so staff leave for more interesting jobs (1)',
            'No autonomy — 64% say they have no say (1) — no empowerment or control over their own work (1) — meets none of Maslow\'s esteem or self-actualisation needs (1)',
            'No promotion prospects — only 12% think they could be promoted (1) — nothing to work towards, so staff leave to progress elsewhere (1)',
            'Not being listened to — only 19% say their manager listens (1) — an autocratic style that ignores ideas (1) — staff feel undervalued (1)',
            'Note that pay is NOT the main cause — 61% say they are paid fairly (1) — so a pay-based solution addresses the wrong problem (1)'
          ]
        },
        {
          marks: 12, cmd: 'Evaluate',
          q: 'Dan proposes a bonus for every booking taken. Using Appendix 3, evaluate whether this will solve the turnover problem.',
          scheme: [
            'For: a financial incentive may raise effort and earnings, and Taylor argued money is the main motivator (up to 2)',
            'For: higher pay may persuade some staff to stay, reducing recruitment and training costs (up to 2)',
            'Against — the decisive point: 61% already say they are paid fairly, so pay is not the problem the survey identifies (up to 3)',
            'Against: Herzberg — pay is a hygiene factor; it prevents dissatisfaction but does not motivate, so the boredom driving turnover remains (up to 3)',
            'Against: rewarding booking *volume* encourages rushing, so service quality falls — dangerous when Dan himself says customers ring because they want to talk to a person (up to 3)',
            'Better alternatives: job rotation between tour types, empowerment to resolve complaints, teamworking, a promotion path (only 12% see one), acting on staff ideas (only 19% feel heard) (up to 4)',
            'Judgement: a supported decision naming a better solution, with a condition (up to 3)'
          ],
          model: 'A bonus would raise pay, and Taylor argued that money is the principal motivator, so some staff might stay for the higher earnings. Reducing turnover from 41% towards the 24% industry average would save significant recruitment and training cost.\n\nBut Appendix 3 undermines the proposal directly. **61% of staff already say they are paid fairly.** Pay is not what they are complaining about. What they complain about is that the work is repetitive (78%), that they have no say (64%), that they cannot be promoted (12%) and that nobody listens to them (19%). Dan\'s bonus addresses none of these. Herzberg\'s distinction is exactly on point: pay is a hygiene factor which stops people being dissatisfied but does not create satisfaction, so the boredom driving the 41% would remain.\n\nWorse, paying per booking rewards speed. Staff would rush calls to take more bookings, so service quality would fall — and Dan himself argues that ST\'s over-60 customers ring precisely because they want to talk to a person. The bonus could therefore damage the one advantage the call centre has.\n\nI would reject the proposal as the main solution. ST should instead rotate staff between different tour types to break the repetition, empower them to resolve complaints and vary from the script, and create a visible promotion path into team-leader roles — which currently only 12% believe exists. Acting on staff suggestions would also address the 19% figure at almost no cost.\n\nA bonus could still play a part, but it should be tied to **customer satisfaction** rather than booking volume, so it reinforces service quality instead of undermining it. This depends on ST being willing to invest in training, since empowerment without training simply produces poor decisions.'
        }
      ]
    },
    {
      n: 2, total: 20, parts: [
        {
          marks: 2, cmd: 'Define',
          q: 'Define the term **depreciation of a currency**.',
          scheme: [
            'A fall in the value of a currency against other currencies (1)',
            'So it buys less foreign currency; imports become dearer and exports cheaper (1)'
          ]
        },
        {
          marks: 6, cmd: 'Explain',
          q: 'Using Appendix 2, explain **two** effects of the dinar\'s depreciation on Sunla Tours.',
          scheme: [
            'Inbound tours become cheaper for foreign visitors (1) — 40% of revenue, and foreigners now get 18% more dinars per euro (1) — demand from abroad should rise, increasing revenue (1)',
            'Imported costs rise (1) — fuel and foreign hotel bookings are 31% of total costs and now cost about 18% more in dinars (1) — variable costs rise, squeezing the profit margin (1)',
            'Domestic tours (60% of revenue) are unaffected on price (1) — but their costs still rise through imported fuel (1)',
            'ST may face inflationary pressure overall (1) — contributing to the 9% inflation in the case (1)'
          ]
        },
        {
          marks: 12, cmd: 'Evaluate',
          q: 'Using the case and Appendix 2, evaluate whether the depreciation of the dinar is good or bad for Sunla Tours overall.',
          scheme: [
            'Positive: inbound tours are 40% of revenue and become 18% cheaper for foreign buyers — a large competitive gain that should raise volume and revenue (up to 3)',
            'Positive: ST can alternatively hold its foreign price and take a wider margin in dinars (up to 2)',
            'Negative: 31% of total costs are imported fuel and foreign hotels, now about 18% dearer — this hits BOTH tour types, including the 60% domestic business which gets no revenue benefit (up to 3)',
            'Key comparison: the benefit reaches only 40% of revenue while the cost increase reaches 31% of ALL costs, including on domestic tours (up to 3)',
            'Compounding factor: interest rates up from 3% to 7% and inflation at 9% cut domestic customers\' disposable income — holidays are a luxury, so domestic demand falls (up to 3)',
            'Appendix 1 evidence: profit already fell from $5.8m to $4.3m while revenue rose, showing costs rising faster than revenue (up to 2)',
            'Judgement: a supported overall decision that weighs the proportions (up to 3)'
          ],
          model: 'The depreciation clearly helps the inbound business. Inbound tours are 40% of revenue, and an 18% weaker dinar means foreign visitors get 18% more dinars for each euro, making a Sunla holiday markedly cheaper than a rival destination. ST could either win extra volume or hold its euro price and take a much wider margin in dinars.\n\nAgainst that, imported fuel and foreign hotel bookings are 31% of **total** costs and now cost about 18% more in dinars. The crucial point is the coverage: the revenue benefit applies to only 40% of the business, while the cost increase applies to the whole cost base — including the 60% domestic operation, which gets no offsetting price advantage at all. Domestic tours therefore face higher costs with no compensating gain.\n\nThe wider economic picture makes this worse. Interest rates have risen from 3% to 7% and inflation is at 9%, so domestic customers have less disposable income. Coach holidays are a luxury with income-elastic demand, so ST should expect its 60% domestic business to shrink at the same time its costs rise.\n\nAppendix 1 confirms the direction of travel: revenue rose from $58.0m to $61.4m but profit fell from $5.8m to $4.3m, so costs are already rising faster than revenue.\n\nOn balance I judge the depreciation to be **net negative** for ST, because the cost increase reaches every part of the business while the revenue benefit reaches under half of it, and because the same policy tightening that caused the depreciation is also cutting domestic demand. The sensible response is to push inbound sales hard while the currency advantage lasts, and to hedge or fix fuel and hotel contracts to limit the cost exposure.'
        }
      ]
    },
    {
      n: 3, total: 20, parts: [
        {
          marks: 4, cmd: 'Calculate',
          q: 'Using Appendix 1, calculate Sunla Tours\' return on capital employed for **each** of the two years shown.',
          scheme: [
            'Two years ago: method (5.8 ÷ 46.0) × 100 (1)',
            'Two years ago: answer 12.6% (1)',
            'Last year: method (4.3 ÷ 48.0) × 100 (1)',
            'Last year: answer 9.0% (accept 8.96%) (1)'
          ]
        },
        {
          marks: 4, cmd: 'Analyse',
          q: 'Analyse what the change in ROCE tells the shareholders of Sunla Tours.',
          scheme: [
            'ROCE has fallen from 12.6% to 9.0%, a fall of over a quarter (1)',
            'ST now earns only $9.00 profit for every $100 invested, against $12.60 before (1)',
            'Capital employed rose from $46m to $48m while profit fell — the extra investment is generating less, not more (1)',
            'Shareholders may see better returns elsewhere and sell, pushing the share price down; ST is a plc so this raises takeover risk (1)'
          ]
        },
        {
          marks: 12, cmd: 'Recommend',
          q: 'Recommend whether the board should approve Priya\'s $1.2 million app. Justify your answer using Appendix 4.',
          scheme: [
            'Financial case: annual saving $2,100,000 against $190,000 annual maintenance = $1,910,000 net a year (up to 3)',
            'Payback: one-off costs are $1,200,000 + $840,000 redundancy = $2,040,000, recovered in about 13 months of net savings (up to 3)',
            'Supporting evidence: cost per phone booking rose from $14.20 to $16.80, so the phone channel is getting more expensive each year (up to 2)',
            'Supporting evidence: ROCE has fallen to 9.0% and profit to $4.3m — ST needs a large cost saving (up to 2)',
            'Against — the decisive risk: online bookings are only 15% and rose just 4 points in a year; assuming 70% is a very large leap (up to 3)',
            'Against: Dan\'s point that customers are mostly over 60 and ring because they want to speak to a person — if they will not switch, the saving never appears and ST loses bookings entirely (up to 3)',
            'Against: 840,000 of redundancies damages morale in a workforce already at 41% turnover (up to 2)',
            'Recommendation with a condition — e.g. approve but phase it, keep the phone line, and test the 70% assumption first (up to 3)'
          ],
          model: 'The financial case looks strong. Appendix 4 shows an annual saving of $2,100,000 against $190,000 of maintenance, giving a net $1,910,000 a year. Against one-off costs of $1,200,000 development plus $840,000 redundancy — $2,040,000 in total — the investment pays back in about thirteen months. With ROCE down to 9.0% and profit down to $4.3m, ST badly needs a saving of that size, and the rising cost per phone booking ($14.20 to $16.80) means the phone channel gets more expensive every year it is left alone.\n\nBut the whole case rests on one assumption: that **70% of bookings move online**. Appendix 1 shows online bookings at just 15%, up only four percentage points in a year. Getting from 15% to 70% is a very large leap, and Dan\'s objection is serious rather than merely defensive: ST\'s customers are mostly over 60 and ring precisely because they want to speak to a person. If they will not switch, the $2,100,000 saving never appears — and if ST closes the phone lines to force them, it may lose the bookings entirely to a competitor that still answers the phone. The projected saving would then become a projected loss.\n\nThere is also a people risk. Making enough staff redundant to save $2.1m in a call centre already running at 41% turnover would damage morale among those who remain, at exactly the moment ST needs good service to defend its customer base.\n\nI recommend the board **approves the app but rejects the 70% target and the redundancies for now**. ST should build the app, promote it hard to customers who already book online, and keep the phone lines fully staffed for at least two booking seasons. If online bookings reach, say, 40%, the call centre can then be reduced through natural wastage rather than redundancy — which costs nothing, avoids the $840,000, and protects morale.\n\nThis depends on market research with ST\'s actual customers rather than an assumption. Priya should test whether over-60s will book a $2,000 holiday on a phone screen before the board bets $1.2 million on it.'
        }
      ]
    },
    {
      n: 4, total: 20, parts: [
        {
          marks: 2, cmd: 'Identify',
          q: 'Identify **two** market segments Sunla Tours could target.',
          scheme: [
            'By age — over-60s / retired people, its current main customers (1)',
            'By geography — domestic customers versus foreign inbound visitors (1)',
            'By income — budget versus luxury coach tours (1)',
            'By lifestyle or interest — walking, history or food tours (1)'
          ]
        },
        {
          marks: 6, cmd: 'Explain',
          q: 'Explain **two** ways Sunla Tours could use the marketing mix to increase inbound tour sales while the dinar is weak.',
          scheme: [
            'Price (1) — hold the dinar price so the euro price falls 18% automatically, or cut it further (1) — ST becomes far more competitive against rival destinations, raising volume (1)',
            'Promotion (1) — advertise abroad emphasising how cheap the destination now is (1) — reaches foreign visitors at the moment their money goes furthest (1)',
            'Place (1) — sell through foreign travel agents or an English-language website (1) — makes booking possible for visitors who cannot use a dinar phone line (1)',
            'Product (1) — design tours specifically for foreign visitors, with English-speaking guides and famous landmarks (1) — better matches what the inbound segment wants (1)',
            'Credit for noting the mix must be consistent, and that the window may close if the dinar recovers (1)'
          ]
        },
        {
          marks: 12, cmd: 'Evaluate',
          q: 'Sunla Tours could respond to falling profit either by cutting costs or by growing its inbound business. Evaluate which strategy the board should prioritise.',
          scheme: [
            'Cost cutting: Appendix 4 shows a possible $1.9m a year net saving from the app; cost per phone booking has risen to $16.80 (up to 3)',
            'Cost cutting: profit has fallen from $5.8m to $4.3m and ROCE from 12.6% to 9.0%, so savings feed straight to the bottom line (up to 2)',
            'Cost cutting risks: 41% turnover already, redundancies worsen morale; cutting service quality drives away the over-60 customers who are ST\'s core market (up to 3)',
            'Growth: the depreciation makes inbound tours 18% cheaper abroad, a competitive advantage ST did not have to pay for (up to 3)',
            'Growth: inbound is 40% of revenue and earns foreign currency, hedging ST against further dinar weakness (up to 2)',
            'Growth risks: 31% of costs are imported and now 18% dearer, so growth alone does not fix the cost base; domestic demand is falling because of 7% interest rates and 9% inflation (up to 3)',
            'Timing argument: the currency advantage is temporary and may reverse, whereas cost savings are permanent — or the reverse, that the window must be used now (up to 2)',
            'Judgement: a prioritised, supported decision with a condition (up to 3)'
          ],
          model: 'Both strategies have a genuine case, and the difference is largely about timing.\n\nCost cutting offers the larger and more certain gain. Appendix 4 points to a net saving of about $1.9m a year, against a profit that has fallen from $5.8m to $4.3m — a saving of that size would restore profit almost to its previous level, and ROCE with it. The cost per phone booking has risen from $14.20 to $16.80, so the problem gets worse every year it is ignored. Savings are also permanent, whereas exchange rates move.\n\nBut cost cutting attacks the part of ST that touches its customers. Turnover is already 41% against an industry average of 24%, and cutting call centre jobs would push it higher. Since Dan\'s over-60 customers ring because they want to speak to a person, saving money on the call centre risks losing the very bookings that generate the revenue. It is possible to cut $1.9m of cost and lose more than $1.9m of sales.\n\nGrowing inbound sales has the opposite profile: lower certainty, but no downside risk to the existing business. The 18% depreciation has handed ST a price advantage abroad that it did not have to pay for, and inbound tours also earn euros and dollars, which hedges ST against further dinar weakness. The limitation is that inbound is only 40% of revenue, and growth does nothing about the 31% of costs that are imported and now 18% dearer, or about domestic demand falling under 7% interest rates and 9% inflation.\n\nI would prioritise **growing the inbound business first**, for one reason above all: the currency advantage is temporary. If the dinar recovers, the opportunity disappears, whereas the call centre costs will still be there to cut next year. ST should push inbound marketing hard now, build the app to serve foreign customers who cannot use a dinar phone line, and take the cost savings gradually through natural wastage rather than redundancy.\n\nThis depends on how long the depreciation lasts and on whether foreign demand is price elastic enough to convert an 18% price advantage into real extra bookings. If inbound volumes have not risen within a season, the board should switch to the cost-cutting route.'
        }
      ]
    }
  ]
}
];
