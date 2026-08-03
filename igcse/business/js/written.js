/* written.js — exam-style written questions with mark schemes for self-marking.
   { id, u, tp, marks, cmd, stem?, q, scheme:[...], model, watch? }
   scheme entries are the creditable points; the student ticks what they hit.  */

BS.written = [

/* ================= UNIT 1 ================= */
{
  id: 'w101', u: 1, tp: '1.1', marks: 2, cmd: 'Define',
  q: 'Define the term **opportunity cost**.',
  scheme: [
    'The next best alternative given up / forgone (1)',
    'When a choice or decision is made, because resources are scarce (1)'
  ],
  model: 'Opportunity cost is the next best alternative that is given up when a choice is made. For example, if a bakery spends $8,000 on a new oven, the opportunity cost is the delivery van it could have bought instead.',
  watch: 'Do not write "the cost of the item". Opportunity cost is the *alternative*, not the money.'
},
{
  id: 'w102', u: 1, tp: '1.1', marks: 4, cmd: 'Explain',
  stem: 'Kofi makes handmade leather bags. He buys leather, thread and buckles for $18 per bag and sells each bag for $75.',
  q: 'Explain **two** ways Kofi could increase the added value of his bags. (4)',
  scheme: [
    'Raise the selling price (1) — customers pay more while material costs are unchanged, so the gap widens (1)',
    'Find cheaper suppliers / buy materials in bulk (1) — lowers the bought-in cost, so added value per bag rises (1)',
    'Improve the product — better design, personalisation, a lining (1) — justifies a higher price (1)',
    'Build a brand / promote the handmade quality (1) — customers will pay a premium for a recognised name (1)',
    'Better service or packaging — gift wrapping, fast delivery (1) — customers pay more for the experience (1)'
  ],
  model: 'Kofi could raise his selling price above $75. Because the cost of the leather and buckles stays at $18, every dollar of extra price is an extra dollar of added value. Alternatively he could buy his leather in bulk from a single supplier at a discount. This lowers the bought-in cost below $18, which widens the gap between price and materials and so raises added value per bag.',
  watch: 'Two developed points, not four listed ones. Each point needs "which means…" to earn the second mark.'
},
{
  id: 'w103', u: 1, tp: '1.3', marks: 6, cmd: 'Analyse',
  stem: 'Nadia owns a chain of 12 coffee shops. She is considering taking over a small chain of 5 competing shops in a neighbouring city.',
  q: 'Analyse **two** benefits to Nadia\'s business of this takeover. (6)',
  scheme: [
    'Removes a competitor (1) — so Nadia gains their customers and market share (1) — which raises revenue and gives more control over prices (1)',
    'Instant growth (1) — 5 shops immediately rather than years of organic growth (1) — faster than opening new sites one at a time (1)',
    'Economies of scale (1) — bulk buying of coffee beans and cups for 17 shops (1) — lowers cost per unit and raises the profit margin (1)',
    'Access to a new geographical market (1) — spreads risk across two cities (1) — a downturn in one city no longer threatens the whole business (1)',
    'Acquires trained staff, existing customers and known locations (1) — no need to recruit and build a reputation from nothing (1)'
  ],
  model: 'One benefit is that the takeover removes a direct competitor. Nadia gains the five shops\' existing customers rather than competing for them, so her market share in the region rises. With less local competition she has more freedom to set prices without losing custom, which should raise revenue and profit.\n\nA second benefit is economies of scale. Buying coffee, milk and packaging for 17 shops instead of 12 means larger orders and bulk-buying discounts from suppliers. This lowers the cost per cup, so Nadia either widens her profit margin or can undercut remaining rivals on price.',
  watch: 'A 6-mark "analyse" needs chains of at least three links. Stopping at "she gains market share" leaves marks on the table — say what that *does* for the business.'
},
{
  id: 'w104', u: 1, tp: '1.4', marks: 6, cmd: 'Explain',
  stem: 'Two friends run a successful gardening business as a partnership. They want to expand and are considering forming a private limited company.',
  q: 'Explain **two** advantages to them of forming a private limited company. (6)',
  scheme: [
    'Limited liability (1) — they can only lose what they invested, personal assets such as their homes are protected (1) — so they can take the risk of expanding without fear of losing everything (1)',
    'Easier to raise capital (1) — shares can be sold to family and friends (1) — funds the expansion without taking on debt and interest (1)',
    'Separate legal identity / continuity (1) — the business continues if an owner dies or leaves (1) — reassures customers, suppliers and lenders (1)',
    'Banks lend more readily to an incorporated business (1) — it is seen as lower risk and more permanent (1) — so larger loans on better terms (1)'
  ],
  model: 'The main advantage is limited liability. As a partnership the two friends are personally responsible for all business debts, so if the expansion failed they could lose their homes and savings. As a private limited company their loss is capped at what they have invested, which makes it far less risky to commit to expansion.\n\nSecondly, a company can raise capital by selling shares to family and friends. This provides money for the expansion without the interest payments and fixed repayment schedule of a bank loan, so cash flow is less strained during the period before the new work generates income.',
  watch: 'Do not say limited liability means "the company has limited debts" — it limits the *owners\'* losses.'
},
{
  id: 'w105', u: 1, tp: '1.5', marks: 6, cmd: 'Evaluate',
  stem: 'A large supermarket chain plans to open a new store on the edge of a small town. It will employ 90 local people, but a busy road will be widened and three small local shops expect to lose trade.',
  q: 'Do you think the local community will benefit from the new store? Justify your answer. (6)',
  scheme: [
    'Benefit: 90 jobs created (1) — reduces local unemployment and raises household incomes (1)',
    'Benefit: lower prices and more choice for local shoppers (1) — no need to travel to a larger town (1)',
    'Benefit: more spending in the town and possible local supplier contracts (1)',
    'Drawback: three small shops may close (1) — job losses and loss of the town\'s character (1)',
    'Drawback: more traffic, noise and congestion from the widened road (1) — worse for nearby residents (1)',
    'Judgement: a supported decision that weighs the two sides and states what it depends on (up to 2)'
  ],
  model: 'The community will gain 90 jobs, which is significant in a small town and will reduce unemployment and raise local incomes. Shoppers will also benefit from lower prices and more choice without travelling.\n\nHowever, three small shops expect to lose trade and may close, costing jobs and eroding the character of the town centre. Residents near the widened road will face more traffic and noise.\n\nOverall I think the community will benefit on balance, because 90 new jobs is a far larger number than the handful likely to be lost at three small shops, and every household in the town gains from lower prices. This depends on whether the supermarket actually recruits locally rather than transferring staff in, and on whether the small shops can survive by specialising in what the supermarket does not sell.',
  watch: 'You must **decide**. "It depends" with no decision cannot reach the top band.'
},

/* ================= UNIT 2 ================= */
{
  id: 'w201', u: 2, tp: '2.1', marks: 2, cmd: 'Calculate',
  stem: 'A hotel employed an average of 250 staff last year. 45 of them left during the year.',
  q: 'Calculate the hotel\'s labour turnover. Show your working. (2)',
  scheme: [
    'Correct method: (45 ÷ 250) × 100 (1)',
    'Correct answer: 18% (1)'
  ],
  model: 'Labour turnover = (number leaving ÷ average number employed) × 100\n= (45 ÷ 250) × 100\n= **18%**',
  watch: 'Always show the formula line. If the arithmetic slips you still get the method mark. And do not forget the % sign.'
},
{
  id: 'w202', u: 2, tp: '2.1', marks: 6, cmd: 'Recommend',
  stem: 'A call centre has labour turnover of 38% and staff describe the work as repetitive. The manager wants to pay a bonus for the number of calls handled per hour.',
  q: 'Recommend whether a bonus based on calls handled is the best way to reduce labour turnover. Justify your answer. (6)',
  scheme: [
    'For: a financial incentive may raise effort and pay, addressing Taylor\'s view that money motivates (1) — higher pay may persuade some staff to stay (1)',
    'Against: Herzberg — pay is a hygiene factor, it removes dissatisfaction but does not motivate (1) — so it will not fix the underlying boredom (1)',
    'Against: rewarding call volume encourages rushing, so call quality and customer satisfaction fall (1)',
    'Alternative: job rotation, job enrichment, teamworking or empowerment tackle the repetitiveness directly (1)',
    'Alternative: training and a clear promotion path meet esteem and self-actualisation needs (Maslow) (1)',
    'Judgement: a supported recommendation naming a better option and saying what it depends on (up to 2)'
  ],
  model: 'A bonus would raise pay, and Taylor argued that money is the main motivator, so some staff may stay for the higher earnings.\n\nHowever, the stated problem is that the work is *repetitive*, not that it is badly paid. Herzberg classed pay as a hygiene factor: raising it stops people being dissatisfied but does not create satisfaction, so the boredom driving the 38% turnover would remain. Worse, paying per call handled encourages staff to rush, so call quality and customer satisfaction would probably fall.\n\nI would therefore not recommend the bonus as the main solution. Job rotation between different call types, combined with empowerment to resolve customer problems without escalating them, tackles the repetitiveness directly and gives staff the responsibility Herzberg identified as a true motivator. A bonus could still be used, but tied to customer satisfaction rather than call volume. This depends on whether the call centre can afford the training time that rotation and empowerment require.',
  watch: 'Notice the question gives you the cause (repetitive work). Your recommendation must address *that* cause, not a generic one.'
},
{
  id: 'w203', u: 2, tp: '2.2', marks: 4, cmd: 'Explain',
  stem: 'A manufacturer is removing one layer of middle management from its structure.',
  q: 'Explain **two** effects of this delayering on the business. (4)',
  scheme: [
    'Lower costs (1) — fewer managers\' salaries to pay, so overheads fall (1)',
    'Faster communication (1) — messages pass through fewer levels so are quicker and less distorted (1)',
    'Wider span of control (1) — remaining managers supervise more people and may be overstretched (1)',
    'Lower morale / fear of job losses (1) — remaining staff worry they are next, so motivation falls (1)',
    'Loss of experience (1) — the departing managers take knowledge with them (1)'
  ],
  model: 'Delayering will reduce the wage bill because there are fewer managers to pay, lowering overheads and raising profit. It will also widen the span of control of the remaining managers, who now supervise more subordinates directly and may become overstretched, meaning less close supervision of each worker.',
  watch: 'A balanced pair — one benefit, one drawback — is safest unless the question specifies.'
},
{
  id: 'w204', u: 2, tp: '2.3', marks: 6, cmd: 'Analyse',
  stem: 'A restaurant chain is opening a new branch and must recruit a branch manager.',
  q: 'Analyse the advantages to the business of recruiting the branch manager **internally**. (6)',
  scheme: [
    'The candidate is already known (1) — their strengths, weaknesses and reliability have been observed (1) — so there is less risk of a bad appointment (1)',
    'Cheaper and faster (1) — no advertising or agency fees, shorter process (1) — the new branch can open sooner (1)',
    'They already know the business (1) — the menu, systems, standards and culture (1) — so induction is shorter and they are productive immediately (1)',
    'Motivating for all staff (1) — shows promotion is possible from within (1) — improves retention and effort across the chain (1)'
  ],
  model: 'The strongest advantage is that the business already knows the candidate. It has observed their reliability, their handling of customers and their leadership over months or years, rather than relying on an interview lasting an hour. This substantially reduces the risk of appointing someone unsuitable to run a whole branch, where a poor manager could damage the chain\'s reputation.\n\nSecondly, an internal appointment is cheaper and faster: no advertising or recruitment agency fees, and no lengthy external process. That matters here because the new branch has an opening date, and delay means lost revenue.\n\nFinally, the candidate already understands the menu, systems and service standards, so induction is much shorter and they can be effective from day one, whereas an external manager would need weeks to learn the chain\'s way of working.',
  watch: 'The question says "advantages" only — do not spend half your answer on drawbacks. Save the balance for the judgement sentence if there is one.'
},
{
  id: 'w205', u: 2, tp: '2.4', marks: 4, cmd: 'Explain',
  stem: 'A manager sends an important change to safety procedures to all 200 factory workers by email. Two weeks later most workers are still using the old procedure.',
  q: 'Explain **two** reasons why this communication may have failed. (4)',
  scheme: [
    'Wrong medium for the message (1) — a safety change is important and needs a briefing or training, not an email that can be ignored (1)',
    'No feedback (1) — email is effectively one-way, so the manager had no way of knowing whether it was read or understood (1)',
    'Communication overload (1) — workers receive many emails, so an important one is missed among them (1)',
    'Access (1) — factory workers may not check email regularly, or have no computer at their workstation (1)',
    'Message unclear / too technical (1) — workers did not understand what to change (1)'
  ],
  model: 'The manager chose the wrong medium. A change to safety procedures is important and needs demonstrating, so a team briefing or training session would have been appropriate; an email is easily skimmed or ignored. Secondly, email is essentially one-way communication, so there was no feedback. The manager had no way of knowing whether the message had been read or understood until two weeks had passed and the old procedure was still in use.',
  watch: 'Link each barrier to *this* situation. "Noise" is a barrier, but it does not explain an unread email.'
},

/* ================= UNIT 3 ================= */
{
  id: 'w301', u: 3, tp: '3.2', marks: 6, cmd: 'Recommend',
  stem: 'Amara is opening a small vegan bakery in a town where none exists. She has a budget of $500 for market research.',
  q: 'Recommend whether Amara should use primary or secondary research. Justify your answer. (6)',
  scheme: [
    'Secondary: cheap or free, fits the small budget (1) — government data on population and diet trends already exists (1)',
    'Secondary drawback: not specific to her town or her products, may be out of date, and competitors can see it too (1)',
    'Primary: a questionnaire or focus group answers *her* questions about *her* town (1) — she can test whether local people would actually buy vegan baked goods and at what price (1)',
    'Primary drawback: costs money and takes time, and $500 limits the sample size, so results may be unreliable (1)',
    'Judgement: a supported recommendation, ideally using both in sequence, with a condition (up to 2)'
  ],
  model: 'Secondary research is cheap and immediate. Amara could use government population data and published reports on the growth of veganism to check whether the trend supports her idea, spending almost nothing of her $500. But this data is national, not about her town, and it will not tell her whether local people specifically would buy vegan cakes or what they would pay.\n\nPrimary research would answer exactly that. A questionnaire outside the town\'s supermarket would give her data on local demand, preferred products and acceptable prices — information no competitor has. The problem is that $500 limits how large a sample she can gather, and a small sample may not represent the town.\n\nI recommend she does both, starting with secondary research to confirm the trend at almost no cost, then spending the $500 on a local questionnaire. This gives her the specific local evidence she needs before committing to a lease. It depends on her getting a large enough sample — at least a few hundred responses — for the results to be reliable.',
  watch: 'The best answers here use *both* in sequence and explain the order. That is a genuine evaluation point.'
},
{
  id: 'w302', u: 3, tp: '3.3', marks: 2, cmd: 'Identify',
  q: 'Identify **two** elements of the marketing mix other than price. (2)',
  scheme: ['Product (1)', 'Place (1)', 'Promotion (1)'],
  model: 'Product and promotion.',
  watch: 'An "identify" question wants naming only. Writing a paragraph earns nothing extra and costs you time.'
},
{
  id: 'w303', u: 3, tp: '3.3', marks: 6, cmd: 'Recommend',
  stem: 'A technology company is launching the world\'s first folding e-reader. No competitor has anything similar, but rivals are expected to copy it within 18 months. Development cost $4 million.',
  q: 'Recommend a pricing method for the launch. Justify your answer. (6)',
  scheme: [
    'Price skimming: set a high launch price (1) — no substitutes exist so demand is price inelastic among early adopters (1) — recovers the $4m development cost quickly before rivals arrive (1)',
    'A high price also signals quality and innovation, supporting the brand (1)',
    'Against skimming: sales volume is low, and early buyers feel cheated when the price falls (1)',
    'Penetration pricing rejected: with no competitors there is no need to buy market share cheaply, and it would not recover $4m (1)',
    'Cost-plus rejected: ignores what customers will pay for a unique product (1)',
    'Judgement: named method, justified from the case, with a condition (up to 2)'
  ],
  model: 'I would recommend price skimming. Because no competitor has a folding e-reader, there are no substitutes, so demand among early adopters — the people who must have the newest technology — will be price inelastic. A high launch price therefore reduces quantity only slightly while generating a large margin on each unit, which is essential given the $4 million development cost that must be recovered.\n\nSkimming also fits the 18-month window. The company can charge a premium while it has the market to itself, then cut the price as rivals appear, keeping sales going as the product matures.\n\nPenetration pricing would be wrong here: its purpose is to win share from competitors, and there are none to win it from. It would also make recovering $4 million far slower.\n\nThe risk is that early buyers resent the later price cuts, and that sales volume is low at first. This depends on how quickly rivals actually arrive — if a competitor launches in six months rather than eighteen, the skimming window closes early and the company will not recover its costs.',
  watch: 'Name the method explicitly and reject at least one alternative using a fact from the case.'
},
{
  id: 'w304', u: 3, tp: '3.3', marks: 4, cmd: 'Explain',
  stem: 'Sales of a chocolate bar launched eight years ago have been flat for two years and are now starting to fall.',
  q: 'Explain **two** extension strategies the business could use. (4)',
  scheme: [
    'New flavours or a limited edition (1) — attracts existing customers to buy again and draws new ones (1)',
    'New packaging / restyling (1) — makes the product look modern and stand out on the shelf again (1)',
    'New advertising campaign aimed at a different age group (1) — reaches customers who do not currently buy it (1)',
    'Sell in new markets, including exporting (1) — new customers where the product is not yet mature (1)',
    'Price reduction or multipack offers (1) — encourages trial and larger purchases (1)',
    'Find a new use — baking, ice cream flavour (1) — creates demand from a different occasion (1)'
  ],
  model: 'The business could launch new flavours or a limited edition. This gives existing customers a reason to buy again and attracts people who found the original flavour uninteresting, lifting sales without developing a new product from scratch.\n\nIt could also export to countries where the bar is not yet sold. The product is mature in its home market but would be at the introduction stage abroad, so there is fresh demand available.',
  watch: 'The product is at **maturity/early decline** — say so. Naming the stage is often worth a mark.'
},
{
  id: 'w305', u: 3, tp: '3.1', marks: 6, cmd: 'Analyse',
  stem: 'A small firm makes climbing equipment for left-handed climbers, a segment ignored by the large manufacturers.',
  q: 'Analyse the benefits to this firm of niche marketing. (6)',
  scheme: [
    'Little or no competition (1) — large firms ignore the segment (1) — so the firm can charge a higher price and keep a strong margin (1)',
    'Customers are loyal (1) — nobody else meets their specific need (1) — repeat purchases and word-of-mouth reduce marketing costs (1)',
    'Marketing can be tightly targeted (1) — advertise in climbing magazines and forums rather than to the mass market (1) — far less wasted spending, which matters for a small firm (1)',
    'A small firm can survive against much larger rivals (1) — it does not need economies of scale to compete in a segment big firms will not enter (1)'
  ],
  model: 'The greatest benefit is the absence of competition. Because the large manufacturers ignore left-handed climbers, this firm is close to the only supplier, so demand is relatively price inelastic and it can charge a premium without losing customers to a cheaper rival. That protects its profit margin despite producing in small volumes with high unit costs.\n\nSecondly, customers in a neglected niche are unusually loyal, since no one else meets their need. This means repeat purchases and strong word-of-mouth within the climbing community, so the firm spends far less on winning each new customer.\n\nFinally, marketing can be precisely targeted at climbing magazines, clubs and online forums rather than expensive mass advertising. For a small firm with a limited budget, almost none of the marketing spend is wasted on people who will never buy.',
  watch: 'The question asks only for benefits. Mention the small volume only if you use it to *strengthen* a benefit, as the model does.'
},

/* ================= UNIT 4 ================= */
{
  id: 'w401', u: 4, tp: '4.2', marks: 4, cmd: 'Calculate',
  stem: 'A furniture workshop has fixed costs of $18,000 per year. Each table sells for $260 and costs $110 in materials and direct labour.',
  q: 'Calculate (a) the contribution per table and (b) the break-even output. Show your working. (4)',
  scheme: [
    '(a) Method: selling price − variable cost = 260 − 110 (1)',
    '(a) Answer: $150 (1)',
    '(b) Method: fixed costs ÷ contribution = 18,000 ÷ 150 (1)',
    '(b) Answer: 120 tables (1)'
  ],
  model: '(a) Contribution per unit = selling price − variable cost per unit\n= $260 − $110 = **$150**\n\n(b) Break-even output = fixed costs ÷ contribution per unit\n= $18,000 ÷ $150 = **120 tables**',
  watch: 'Divide by the **contribution**, not by the selling price. That single error is the most common in the whole syllabus.'
},
{
  id: 'w402', u: 4, tp: '4.2', marks: 6, cmd: 'Analyse',
  stem: 'Using the workshop above (fixed costs $18,000, price $260, variable cost $110), the owner currently sells 200 tables a year. A landlord increase will raise fixed costs to $24,000.',
  q: 'Analyse the effect of the rent increase on the workshop. (6)',
  scheme: [
    'New break-even = 24,000 ÷ 150 = 160 tables (1) — up from 120 (1)',
    'Margin of safety falls from 80 tables (200 − 120) to 40 tables (200 − 160) (1)',
    'The workshop is now far more vulnerable — sales can only fall 20% before a loss is made, instead of 40% (1)',
    'Profit falls from (150 × 200) − 18,000 = $12,000 to (150 × 200) − 24,000 = $6,000 (1)',
    'Consequence / response: must raise price, cut variable costs, sell more, or relocate (1)'
  ],
  model: 'The break-even output rises from 120 tables ($18,000 ÷ $150) to 160 tables ($24,000 ÷ $150), because contribution per table is unchanged at $150 but there are now more fixed costs to cover.\n\nSince the workshop sells 200 tables, its margin of safety falls from 80 tables to just 40. In percentage terms sales could previously fall 40% before a loss was made; now they can only fall 20%. The business is therefore considerably more vulnerable to a downturn.\n\nProfit halves, from (150 × 200) − 18,000 = $12,000 to (150 × 200) − 24,000 = $6,000. To restore the old profit the owner would need to sell 280 tables, raise the price, or find cheaper materials — otherwise relocating to cheaper premises may be the better option.',
  watch: 'Calculate *both* the old and new figures. The analysis marks come from the comparison, not from one number.'
},
{
  id: 'w403', u: 4, tp: '4.1', marks: 6, cmd: 'Recommend',
  stem: 'A bakery currently uses batch production to make bread. It has won a contract to supply 8,000 identical loaves a day to a supermarket chain. It has limited capital.',
  q: 'Recommend whether the bakery should switch to flow production. Justify your answer. (6)',
  scheme: [
    'For: 8,000 identical loaves daily is exactly what flow production suits (1) — large economies of scale cut the cost per loaf sharply (1) — essential on a supermarket contract with thin margins (1)',
    'For: consistent quality and no downtime resetting machines between batches (1)',
    'Against: very high set-up cost, and the bakery has limited capital (1)',
    'Against: flow production is inflexible — the bakery could no longer easily make its other varieties (1)',
    'Against: total dependence on one customer; if the contract ends, the specialised line is worthless (1)',
    'Judgement: supported decision with a condition (up to 2)'
  ],
  model: 'Flow production suits this contract well. 8,000 identical loaves a day is exactly the high-volume, standardised output flow production is designed for, and the economies of scale would cut the cost per loaf substantially — important because supermarket contracts usually carry thin margins. Quality would also be more consistent, and no time would be lost resetting machines between batches.\n\nHowever, flow production requires a very large capital investment, and the case states the bakery\'s capital is limited. It is also highly inflexible: a dedicated bread line could not easily produce the bakery\'s other varieties, so it would be putting almost everything into one customer. If the supermarket did not renew the contract, the bakery would be left with expensive equipment it cannot use.\n\nI would recommend switching only if the bakery can secure a long contract — three years or more — and can finance the equipment without over-borrowing. Otherwise it should expand its existing batch capacity, which is cheaper and keeps its flexibility, even though unit costs stay higher.',
  watch: 'The case gives you two constraints — limited capital and a single customer. A top answer uses both.'
},
{
  id: 'w404', u: 4, tp: '4.3', marks: 4, cmd: 'Explain',
  q: 'Explain the difference between **quality control** and **quality assurance**. (4)',
  scheme: [
    'Quality control: inspecting/checking products at the end of production (1) — to find and remove faults before they reach the customer (1)',
    'Quality assurance: standards agreed and checked at every stage throughout production (1) — so faults are prevented rather than found, and every worker is responsible for quality (1)'
  ],
  model: 'Quality control means inspecting the finished product at the end of the production process, using inspectors to find faulty items and remove them before they reach the customer. The fault has already been made, so the materials and labour are wasted.\n\nQuality assurance means agreeing quality standards at every stage of the process and making every employee responsible for checking their own work. Faults are therefore prevented rather than detected, which cuts waste and reworking, though it requires training all staff.',
  watch: 'Use the verbs: control **finds** faults, assurance **prevents** them. That contrast is the answer.'
},

/* ================= UNIT 5 ================= */
{
  id: 'w501', u: 5, tp: '5.1', marks: 6, cmd: 'Recommend',
  stem: 'A private limited company that has traded profitably for six years needs $200,000 to buy a second delivery lorry and expand its warehouse. It already has a bank loan and the owners want to keep control within the family.',
  q: 'Recommend the most suitable source of finance. Justify your answer. (6)',
  scheme: [
    'Retained profit: the business is profitable (1) — no interest, no repayment, no loss of control (1) — but six years of profit may not cover $200,000 and it reduces the owners\' income (1)',
    'Bank loan: matches the long life of the assets (1) — but the firm already has borrowing, so more debt raises interest costs and risk, and the bank may refuse (1)',
    'Share issue rejected: dilutes ownership, and the owners explicitly want to keep control in the family (1)',
    'Leasing or hire purchase for the lorry: no large initial outlay, spreads the cost (1) — but costs more in total (1)',
    'Judgement: named source, justified from the case, with a condition (up to 2)'
  ],
  model: 'A share issue should be rejected immediately: the case states the owners want to keep control within the family, and selling shares to outsiders would dilute exactly that.\n\nRetained profit is attractive because the company has traded profitably for six years and it carries no interest, no repayment schedule and no loss of control. However, $200,000 is a large sum and six years of retained profit may not cover it, particularly if the owners have been drawing dividends.\n\nI would recommend a combination: lease or hire-purchase the lorry, and fund the warehouse extension from retained profit. Leasing avoids a large initial outlay and spreads the cost over the lorry\'s working life, and it does not add to the existing bank borrowing, which is important since further debt would raise interest costs and the bank may be reluctant given the loan already outstanding. This depends on how much retained profit has actually accumulated — if it is well below the warehouse cost, a second loan may be unavoidable.',
  watch: 'The case tells you two things — existing borrowing and a desire to keep control. Both must appear in a top answer.'
},
{
  id: 'w502', u: 5, tp: '5.2', marks: 6, cmd: 'Explain',
  stem: 'A furniture retailer reports a profit of $90,000 for the year, but cannot pay its suppliers this month.',
  q: 'Explain how a business can be profitable and still be unable to pay its bills. (6)',
  scheme: [
    'Profit is not cash (1) — revenue is recorded when the sale is made, not when the money arrives (1)',
    'Sales made on credit (1) — customers may take 60–90 days to pay, so the profit exists on paper but the cash has not arrived (1)',
    'Meanwhile outflows are immediate (1) — wages weekly, suppliers on 30 days, rent monthly (1)',
    'Cash may have been spent on non-current assets or inventory (1) — which does not reduce profit but does drain cash (1)',
    'Overtrading — expanding too fast without enough working capital (1)',
    'Consequence: suppliers stop delivering, the business may be forced to close despite being profitable (1)'
  ],
  model: 'Profit and cash are not the same thing. Profit is calculated when a sale is *made*, whereas cash only arrives when the customer actually *pays*. A furniture retailer selling on credit may record a $90,000 profit for sofas delivered in the year while much of that money is still owed by customers on 60- or 90-day terms.\n\nAt the same time the retailer\'s outflows are immediate: wages must be paid weekly, rent monthly and suppliers within 30 days. So money leaves faster than it comes in.\n\nCash may also have been tied up in ways that do not reduce profit — buying a delivery van, or building up showroom inventory. Both drain the bank account without appearing as costs in the income statement.\n\nThe consequence is serious: if suppliers are not paid they will stop delivering, and a profitable business can be forced to close. This is why cash-flow forecasting matters as much as profit.',
  watch: 'This is one of the most frequently examined ideas in Unit 5. Learn the "profit is recorded at the sale, cash arrives later" line.'
},
{
  id: 'w503', u: 5, tp: '5.5', marks: 4, cmd: 'Calculate',
  stem: 'A business reports: revenue $800,000; cost of sales $520,000; expenses $180,000; capital employed $625,000.',
  q: 'Calculate (a) the gross profit margin and (b) the return on capital employed. Show your working. (4)',
  scheme: [
    '(a) Gross profit = 800,000 − 520,000 = $280,000, then (280,000 ÷ 800,000) × 100 (1)',
    '(a) Answer: 35% (1)',
    '(b) Profit = 280,000 − 180,000 = $100,000, then (100,000 ÷ 625,000) × 100 (1)',
    '(b) Answer: 16% (1)'
  ],
  model: '(a) Gross profit = $800,000 − $520,000 = $280,000\nGross profit margin = (280,000 ÷ 800,000) × 100 = **35%**\n\n(b) Profit = $280,000 − $180,000 = $100,000\nROCE = (100,000 ÷ 625,000) × 100 = **16%**',
  watch: 'Gross profit margin uses **gross** profit; ROCE uses profit **after** expenses. Mixing them up loses both marks.'
},
{
  id: 'w504', u: 5, tp: '5.5', marks: 6, cmd: 'Analyse',
  stem: 'A retailer\'s current ratio has fallen from 1.9 : 1 to 1.1 : 1 over two years, while its acid test ratio has fallen from 1.0 : 1 to 0.4 : 1. Inventory has risen sharply.',
  q: 'Analyse what these figures suggest about the business. (6)',
  scheme: [
    'Current ratio has fallen below the 1.5–2 : 1 guide (1) — current assets barely cover current liabilities (1) — little cushion if creditors demand payment (1)',
    'Acid test at 0.4 : 1 is far below the 1 : 1 guide (1) — excluding inventory, the business has only 40c of liquid assets per $1 owed (1)',
    'The gap between the two ratios shows inventory makes up most current assets (1) — stock is not selling (1) — cash is tied up in unsold goods (1)',
    'Risk of insolvency: suppliers may refuse further credit and the business could be forced to close even if profitable (1)',
    'Actions: clear old stock at a discount, reduce ordering, collect from debtors faster, convert overdraft to a long-term loan (1)'
  ],
  model: 'Both ratios have deteriorated sharply. The current ratio has fallen from a healthy 1.9 : 1 to 1.1 : 1, so current assets now barely cover current liabilities — there is almost no cushion if creditors demand payment.\n\nThe acid test is more alarming still, at 0.4 : 1 against a guide of about 1 : 1. Excluding inventory, the retailer holds only 40 cents of liquid assets for every dollar it owes in the short term.\n\nThe widening gap between the two ratios is the key finding: it shows that inventory now makes up most of the current assets. Combined with the statement that inventory has risen sharply, this strongly suggests stock is not selling. Cash that should be in the bank is tied up in unsold goods.\n\nThe consequence is a serious risk of insolvency. If suppliers withdraw credit the retailer could be forced to close even while trading profitably. It should clear old stock at a discount, cut its ordering, and chase trade receivables to convert stock and debts back into cash.',
  watch: 'The *gap between* the two ratios is the analysis. Anyone can say "the ratios have fallen" — say what the difference between them reveals.'
},

/* ================= UNIT 6 ================= */
{
  id: 'w601', u: 6, tp: '6.1', marks: 6, cmd: 'Analyse',
  stem: 'A company that sells expensive fitted kitchens on credit operates in an economy where the central bank has just raised interest rates sharply.',
  q: 'Analyse the likely effects of the interest rate rise on this business. (6)',
  scheme: [
    'Consumers with mortgages have less disposable income (1) — kitchens are a luxury / income-elastic purchase (1) — demand falls sharply (1)',
    'The product is bought on credit (1) — borrowing to buy a kitchen now costs more (1) — so customers postpone purchases, hitting this firm harder than most (1)',
    'The company\'s own borrowing costs rise (1) — existing loans and overdraft cost more, squeezing profit (1)',
    'Investment and expansion plans postponed (1) — borrowing to expand is dearer and demand is falling (1)',
    'Saving becomes more attractive, so consumers spend less (1)',
    'Currency may appreciate, harming any export sales (1)'
  ],
  model: 'This business is unusually exposed. Higher interest rates raise mortgage repayments, so households have less disposable income, and a fitted kitchen is a luxury that can easily be postponed. Demand will fall sharply, more than it would for a business selling necessities.\n\nThe damage is compounded because the kitchens are sold *on credit*. Customers borrowing to fund the purchase now face higher repayments, making the effective price of a kitchen much higher. Many will simply delay for a year or two, so orders could fall steeply.\n\nThe company\'s own costs also rise. Any existing loans or overdraft become more expensive to service, squeezing profit at exactly the moment revenue is falling — a dangerous combination for cash flow.\n\nFinally, any planned expansion will probably be postponed, since borrowing to invest is now dearer and the market is contracting.',
  watch: 'Two facts in the stem — expensive (luxury) and sold on credit — each drive a separate chain. Use both.'
},
{
  id: 'w602', u: 6, tp: '6.3', marks: 2, cmd: 'Define',
  q: 'Define the term **multinational company**. (2)',
  scheme: [
    'A business with its headquarters in one country (1)',
    'That produces or has operations in two or more countries (1)'
  ],
  model: 'A multinational company is a business with its headquarters in one country that produces or operates in two or more other countries. For example, a car manufacturer based in Japan with assembly plants in Mexico and Poland.',
  watch: '"A big company that trades abroad" is not enough — exporting alone does not make a firm multinational. It must *operate* in more than one country.'
},
{
  id: 'w603', u: 6, tp: '6.3', marks: 6, cmd: 'Evaluate',
  stem: 'A UK furniture manufacturer sells 65% of its output to customers in Europe and buys 30% of its timber from Scandinavia. The pound has depreciated by 12%.',
  q: 'Evaluate the overall impact of the depreciation on this business. (6)',
  scheme: [
    'Exports (65%): a weaker pound makes UK goods cheaper abroad (1) — more price competitive, so export sales and revenue should rise (1) — or it can hold the foreign price and widen its margin instead (1)',
    'Imports (30% of timber): imported timber now costs about 12% more in pounds (1) — variable costs rise, squeezing contribution per unit (1)',
    'Comparison: exports at 65% of output outweigh imported inputs at 30% of one material (1)',
    'Condition: depends on whether European demand is price elastic enough to convert cheaper prices into extra volume (1)',
    'Condition: depends on how long the depreciation lasts, and whether local timber could replace imports (1)',
    'Judgement: a clear overall decision, supported (up to 2)'
  ],
  model: 'The depreciation cuts both ways for this firm, so the size of each effect matters.\n\nOn exports, which are 65% of output, a 12% weaker pound makes the furniture around 12% cheaper for European buyers without the firm changing its price in pounds. It becomes markedly more price competitive against German and Italian rivals, so export volumes and revenue should rise. Alternatively it could hold the euro price and take a wider margin on every sale.\n\nAgainst that, 30% of its timber comes from Scandinavia and now costs about 12% more in pounds. This raises variable costs and squeezes contribution per unit on every item it makes.\n\nOn balance the effect should be positive, because the benefit applies to 65% of total output while the cost applies to only part of one input. Even after the higher timber cost, the firm should be better off.\n\nThis depends on two things. First, European demand must be price elastic enough for the cheaper price to generate real extra volume — if buyers are loyal to their existing suppliers, the firm gains margin but not sales. Second, if the weakness persists, the firm should look for UK timber suppliers to reduce its exposure.',
  watch: 'Always weigh the *proportions*. "It helps exports but hurts imports" without comparing 65% and 30% is a mid-band answer.'
},
{
  id: 'w604', u: 6, tp: '6.2', marks: 6, cmd: 'Evaluate',
  stem: 'A clothing retailer is considering switching entirely to organic cotton and recyclable packaging. This would raise its costs by 9%. Its customers are mainly price-conscious young people.',
  q: 'Do you think the retailer should make this change? Justify your answer. (6)',
  scheme: [
    'For: improved reputation and brand image (1) — attracts environmentally aware customers and generates publicity (1)',
    'For: gets ahead of future environmental regulation, avoiding a costly rush later (1)',
    'For: attracts and retains staff and ethical investors (1)',
    'Against: 9% cost rise must be absorbed (cutting margin) or passed on (raising price) (1)',
    'Against: customers are price-conscious, so a price rise would lose sales to cheaper rivals (1)',
    'Judgement: a decision that engages with the price-conscious customer base, with a condition (up to 2)'
  ],
  model: 'There is a real commercial case for the change. Organic cotton and recyclable packaging would improve the retailer\'s reputation, attract environmentally aware shoppers and generate free publicity, and it would put the business ahead of environmental regulation that is tightening in most countries — avoiding a more expensive scramble later.\n\nThe difficulty is the 9% cost increase set against a price-conscious customer base. The retailer must either absorb it, cutting its profit margin, or pass it on, in which case young shoppers who buy largely on price are likely to switch to cheaper rivals. That is a serious risk when the case explicitly says price is what these customers care about.\n\nI would recommend a partial switch rather than an immediate full one: change the packaging first, which is the cheaper half and the most visible to customers, and move to organic cotton on a premium range only. This captures much of the reputational benefit at a fraction of the cost increase.\n\nWhether a full switch is right later depends on whether these particular customers will actually pay more for sustainability — market research should test that before the retailer commits 9% of its cost base.',
  watch: 'The stem plants a conflict — green credentials versus price-conscious customers. The examiner wants you to resolve it, not ignore it.'
}
];
