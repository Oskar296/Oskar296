/* Unit 2 — People in business */

BS.addTopic({
  id: '2.1', unit: 2, title: 'Motivating employees',
  syllabus: [
    'The importance of a well-motivated workforce',
    'Key motivational theories: Taylor, Maslow and Herzberg',
    'Methods of motivation: financial rewards',
    'Methods of motivation: non-financial rewards'
  ],
  sections: [
    {
      h: 'Why motivation matters',
      body: [
        '**Motivation** is the reason why an employee works, and how much effort they put in. A well-motivated workforce is a source of competitive advantage.',
        { table: { head: ['Benefits of a motivated workforce', 'Costs of a demotivated workforce'], rows: [
          ['Higher **productivity** — more output per worker per hour', 'Low output, missed deadlines'],
          ['Better **quality** and fewer mistakes', 'More faulty products, more customer complaints'],
          ['Lower **labour turnover**, saving recruitment and training costs', 'High turnover — constant recruiting and retraining'],
          ['Lower **absenteeism**', 'High absenteeism disrupts production'],
          ['Workers suggest **improvements** and accept change more readily', 'Resistance to change; possible industrial action'],
          ['Lower **unit costs**, so lower prices or higher profit', 'Higher unit costs and lower profit']
        ] } },
        { defs: [
          ['Labour turnover', 'The percentage of the workforce that leaves the business in a year.'],
          ['Productivity', 'Output per worker in a given period.'],
          ['Absenteeism', 'The percentage of the workforce absent from work over a period.']
        ] },
        { formula: 'Labour turnover (%) = (number of employees leaving ÷ average number employed) × 100\nLabour productivity  = total output ÷ number of employees' }
      ]
    },
    {
      h: 'Motivational theories',
      body: [
        { h3: 'F. W. Taylor — scientific management' },
        'Taylor believed workers are motivated **mainly by money**. He studied each job scientifically to find the fastest method, then paid workers according to how much they produced (**piece rate**).',
        { list: [
          '**Method**: break the job into simple tasks, time each one, train workers in the one best way, pay per unit produced',
          '**Strengths**: output and productivity rise sharply; costs per unit fall; simple to apply on a production line',
          '**Weaknesses**: ignores social needs and job satisfaction; workers become bored; quality can fall as workers rush; unsuitable for service or creative jobs where output is hard to measure'
        ] },
        { h3: 'Maslow — hierarchy of needs' },
        'Maslow argued that human needs form a **hierarchy**. Once a level is satisfied it no longer motivates, and the person moves up to the next level.',
        { table: { head: ['Level (bottom to top)', 'Need', 'How a business meets it'], rows: [
          ['5', '**Self-actualisation** — reaching full potential', 'Challenging work, promotion, scope to develop and be creative'],
          ['4', '**Esteem** — recognition and status', 'Praise, job titles, awards, recognition of achievement, promotion'],
          ['3', '**Social** — belonging and friendship', 'Teamwork, social events, communication, a sense of belonging'],
          ['2', '**Safety** — security and protection', 'Permanent contracts, job security, safe working conditions'],
          ['1', '**Physical** — food, shelter, warmth', 'Enough pay to buy the basics; rest breaks; reasonable hours']
        ] } },
        { callout: { k: 'warn', b: 'Not everyone follows the same order, and needs may overlap. Some people never reach the top level. Say so if a question asks you to evaluate Maslow.' } },
        { h3: 'Herzberg — two-factor theory' },
        'Herzberg separated the things that cause **satisfaction** from the things that cause **dissatisfaction**.',
        { table: { head: ['Motivators (satisfiers)', 'Hygiene factors (dissatisfiers)'], rows: [
          ['Achievement', 'Pay'],
          ['Recognition', 'Working conditions'],
          ['The work itself — interesting and meaningful', 'Company policy and administration'],
          ['Responsibility', 'Relationships with supervisors and colleagues'],
          ['Advancement and personal growth', 'Job security and status']
        ] } },
        'Herzberg\'s key point: hygiene factors must be right or workers become **dissatisfied**, but improving them does **not** motivate. Only motivators create real job satisfaction. He recommended **job enrichment**.',
        { callout: { k: 'tip', b: 'A strong evaluation line: Taylor says money motivates, Herzberg says money only *stops dissatisfaction*. Which applies depends on the job, the workers and their circumstances — low-paid workers in a factory may respond to pay; well-paid professionals usually respond to responsibility and recognition.' } }
      ]
    },
    {
      h: 'Financial methods of motivation',
      body: [
        { table: { head: ['Method', 'How it works', 'Advantages', 'Disadvantages'], rows: [
          ['**Wage (time rate)**', 'Paid per hour worked', 'Simple; workers paid for extra hours; suits jobs where output is hard to measure', 'No incentive to work harder — the slow and the fast are paid the same; needs supervision'],
          ['**Piece rate**', 'Paid per unit produced', 'Strong incentive to work fast; higher output', 'Quality may fall; unfair if machines break down; unsuitable for services'],
          ['**Salary**', 'Fixed annual amount, paid monthly', 'Secure income; easier to budget for both sides; suits professional staff', 'No direct link to effort; may be paid for unproductive time'],
          ['**Commission**', 'A percentage of the value of sales made', 'Strong incentive to sell; cost linked to revenue', 'Income is unstable; may lead to high-pressure selling that annoys customers'],
          ['**Bonus**', 'Extra payment for meeting a target', 'Rewards good performance; can be linked to team or company results', 'Can be seen as unfair; demotivating if the target is missed by a little'],
          ['**Profit sharing**', 'A share of company profit paid to employees', 'Workers feel part of the business and want it to succeed', 'Individual effort has little effect on total profit; nothing paid in a bad year'],
          ['**Performance-related pay**', 'Pay rise based on an appraisal of performance', 'Rewards individuals; identifies training needs', 'Appraisals can be subjective; damages teamwork and can create rivalry'],
          ['**Share ownership**', 'Employees receive or buy company shares', 'Workers gain if the company does well — long-term commitment', 'Only works for limited companies; share price may fall'],
          ['**Fringe benefits**', 'Non-cash extras: company car, health insurance, staff discount, pension, free meals', 'Attracts and keeps staff; often cheaper than a pay rise', 'Costly; some workers value them little; can be difficult to withdraw']
        ] } }
      ]
    },
    {
      h: 'Non-financial methods of motivation',
      body: [
        { table: { head: ['Method', 'What it means', 'Effect'], rows: [
          ['**Job rotation**', 'Workers regularly switch between different tasks of a similar level', 'Reduces boredom, builds a flexible workforce; but the tasks are still repetitive'],
          ['**Job enlargement**', 'Adding more tasks of a **similar level** to a job (horizontal loading)', 'More variety; but can feel like more work for the same pay'],
          ['**Job enrichment**', 'Adding tasks that require **more skill and responsibility** (vertical loading)', 'Herzberg\'s recommendation — real motivation from responsibility and achievement; needs training'],
          ['**Autonomy / empowerment**', 'Giving workers the authority to make decisions about their own work', 'Increases trust and job satisfaction; risk of poor decisions without training'],
          ['**Teamworking**', 'Organising staff into teams responsible for a complete unit of work', 'Meets Maslow\'s social needs; ideas shared; but weak members can hide in a team'],
          ['**Training and development**', 'Opportunities to gain new skills and qualifications', 'Meets esteem and self-actualisation needs; costly and trained staff may leave'],
          ['**Promotion opportunities**', 'A clear career path within the business', 'Strong incentive; but limited posts available and those passed over are demotivated'],
          ['**Praise and recognition**', 'Thanking staff, employee of the month, public recognition', 'Cheap and effective; loses impact if overused or seen as insincere'],
          ['**Good working conditions**', 'A safe, clean, pleasant workplace; flexible hours', 'Herzberg: prevents dissatisfaction rather than motivating']
        ] } },
        { callout: { k: 'warn', b: 'Do not confuse job **enlargement** (more tasks, same level) with job **enrichment** (more responsibility, higher level). This is one of the most commonly lost marks in Unit 2.' } }
      ]
    }
  ],
  terms: ['motivation', 'labour-turnover', 'productivity', 'piece-rate', 'time-rate', 'salary', 'commission', 'bonus', 'profit-sharing', 'performance-related-pay', 'fringe-benefits', 'job-rotation', 'job-enlargement', 'job-enrichment', 'empowerment', 'teamworking', 'taylor', 'maslow', 'herzberg'],
  tips: [
    'Recommend a method that fits the **type of worker** in the case study — piece rate for factory output, autonomy and enrichment for skilled professionals.',
    'Always mention the **cost** of a motivation method as the counter-argument; then judge whether the benefits outweigh it.'
  ],
  traps: [
    'Describing a theory without applying it to the business in the case.',
    'Saying "pay them more" as the only answer — Herzberg directly contradicts this.'
  ]
});

BS.addTopic({
  id: '2.2', unit: 2, title: 'Organisation and management',
  syllabus: [
    'Simple organisational structures',
    'The roles, responsibilities and inter-relationships of people in organisations',
    'The role of management',
    'Leadership styles',
    'Trade unions'
  ],
  sections: [
    {
      h: 'Organisation charts',
      body: [
        'An **organisational structure** shows how a business arranges its people: who does what job, who reports to whom, and how communication should flow. It is usually drawn as an **organisation chart**.',
        { defs: [
          ['Hierarchy', 'The levels of management in a business, from the most senior at the top to the least senior at the bottom.'],
          ['Chain of command', 'The path down which instructions and authority pass, from the top of the hierarchy to the bottom.'],
          ['Span of control', 'The number of subordinates directly reporting to one manager.'],
          ['Delegation', 'Giving a subordinate the authority to carry out a task, while the manager keeps overall responsibility.'],
          ['Line manager', 'A manager with direct authority over the staff below them in the chain of command.'],
          ['Subordinate', 'An employee working under the control of a manager.']
        ] },
        { h3: 'Tall vs flat structures' },
        { table: { head: ['', 'Tall structure', 'Flat structure'], rows: [
          ['Levels of hierarchy', 'Many', 'Few'],
          ['Span of control', 'Narrow', 'Wide'],
          ['Chain of command', 'Long', 'Short'],
          ['Communication', 'Slow — messages pass through many levels and can be distorted', 'Fast and accurate — fewer levels to pass through'],
          ['Supervision', 'Close — managers control small teams well', 'Less close — managers may be stretched'],
          ['Promotion', 'Many opportunities, small steps', 'Few opportunities'],
          ['Cost', 'High — many managers to pay', 'Lower management costs'],
          ['Decisions', 'Slow, but well controlled', 'Fast, and staff are more empowered']
        ] } },
        { defs: [['Delayering', 'Removing one or more levels of the hierarchy, usually of middle management, to make the structure flatter.']] },
        { table: { head: ['Benefits of delayering', 'Drawbacks of delayering'], rows: [
          ['Lower wage costs — fewer managers', 'Redundancy payments cost money in the short run'],
          ['Faster, less distorted communication', 'Remaining managers have a wider span of control and are overworked'],
          ['Staff feel more involved and empowered', 'Fear of job losses damages motivation and loyalty'],
          ['Quicker decision making', 'Loss of experienced managers and their knowledge']
        ] } }
      ]
    },
    {
      h: 'Delegation',
      body: [
        { table: { head: ['Advantages to the manager', 'Advantages to the subordinate', 'Drawbacks'], rows: [
          ['Frees time for more important strategic work', 'More interesting and varied work — motivating (Herzberg)', 'The manager keeps responsibility if the task goes wrong'],
          ['Shows trust in the team, improving relationships', 'Develops skills, preparing them for promotion', 'The subordinate may not have the skills or training'],
          ['Decisions are made by the people closest to the problem', 'Feels trusted and valued — meets esteem needs', 'Some managers cannot let go, and delegate only trivial work']
        ] } }
      ]
    },
    {
      h: 'The functions of management',
      body: [
        'Henri Fayol identified five functions of management:',
        { num: [
          '**Planning** — setting objectives and deciding how to achieve them, looking to the future',
          '**Organising** — arranging the resources, people and tasks needed to carry out the plan',
          '**Coordinating** — making sure all departments and individuals work together towards the same goal',
          '**Commanding (directing)** — instructing, guiding and supervising staff so the work gets done',
          '**Controlling** — measuring actual performance against the plan and taking corrective action'
        ] },
        { callout: { k: 'note', t: 'Why managers matter', b: 'Without managers there is no direction, no coordination between departments, no one to motivate staff and no one to take decisions when things go wrong. Poor management is one of the most common causes of business failure — see [[1.3]].' } }
      ]
    },
    {
      h: 'Leadership styles',
      body: [
        { table: { head: ['Style', 'How it works', 'Advantages', 'Disadvantages', 'Best used when'], rows: [
          ['**Autocratic**', 'The leader makes all decisions alone and tells staff what to do; one-way communication', 'Fast decisions; clear direction; good control', 'No staff input; demotivating; staff do not develop; ideas are lost', 'A crisis or emergency; unskilled or new staff; the armed forces'],
          ['**Democratic**', 'The leader discusses decisions with staff and takes their views into account', 'Staff feel valued and motivated; better decisions from more ideas; change is accepted', 'Slow — consultation takes time; unpopular decisions are hard; needs skilled staff', 'Skilled, experienced staff; creative work; when commitment matters'],
          ['**Laissez-faire**', 'The leader sets broad goals then leaves staff to get on with it with little interference', 'Highly motivating for creative, self-driven professionals; encourages initiative', 'Lack of direction; work may not be coordinated; deadlines missed', 'Research teams, designers, highly skilled specialists']
        ] } },
        { callout: { k: 'tip', b: 'There is no single "best" style. The right style depends on the **task** (routine or creative), the **staff** (experienced or new), the **time available** (urgent or not) and the **business culture**. Say this in evaluation answers.' } }
      ]
    },
    {
      h: 'Trade unions',
      body: [
        'A **trade union** is an organisation of workers that negotiates with employers on behalf of its members.',
        { h3: 'What unions do for members' },
        { list: [
          'Negotiate **pay and working conditions** (collective bargaining)',
          'Improve **health and safety** at work',
          'Provide **legal advice and representation** in disputes and disciplinary cases',
          'Press for better **job security**, training and pensions',
          'Offer member benefits such as insurance and discounts'
        ] },
        { table: { head: ['Advantages to employees', 'Disadvantages to employees'], rows: [
          ['Greater bargaining power together than alone', 'Membership fees must be paid'],
          ['Support and representation in disputes', 'Strike action means lost pay'],
          ['Improved pay, conditions and safety', 'Union decisions may not suit every individual']
        ] } },
        { table: { head: ['Advantages to the employer', 'Disadvantages to the employer'], rows: [
          ['Negotiating with one union representative is quicker than with hundreds of workers', 'Industrial action — strikes, overtime bans, go-slows — stops production'],
          ['Unions help communicate management decisions to the workforce', 'Union demands raise wage costs'],
          ['Better conditions can raise motivation and productivity', 'Resistance to changes in working practices'],
          ['Unions can help enforce discipline and safety rules', 'Negotiations take management time']
        ] } },
        { defs: [['Collective bargaining', 'Negotiations between a trade union and an employer over pay and conditions on behalf of all the union\'s members.']] }
      ]
    }
  ],
  terms: ['organisational-structure', 'hierarchy', 'chain-of-command', 'span-of-control', 'delegation', 'delayering', 'autocratic', 'democratic', 'laissez-faire', 'trade-union', 'collective-bargaining'],
  tips: [
    'Span of control and chain of command move in opposite directions: a **wider** span means a **shorter** chain.',
    'When asked to draw or interpret a chart, count levels carefully — the number of *levels* is the hierarchy, not the number of people.'
  ],
  traps: [
    'Confusing span of control with chain of command.',
    'Saying autocratic leadership is always bad — it is the right style in a crisis.'
  ]
});

BS.addTopic({
  id: '2.3', unit: 2, title: 'Recruitment, selection and training of employees',
  syllabus: [
    'Methods of recruitment and selection',
    'The benefits and limitations of part-time and full-time employees',
    'Methods and benefits of training',
    'Why reducing the size of the workforce might be necessary',
    'Legal controls over employment issues and their impact on employers and employees'
  ],
  sections: [
    {
      h: 'The recruitment process',
      body: [
        { num: [
          'A **vacancy** arises — someone leaves, the business expands, or a new skill is needed',
          'Prepare a **job description** — the title, duties, responsibilities and who the post reports to',
          'Prepare a **person specification** — the qualifications, skills, experience and personal qualities the ideal candidate needs',
          'Advertise the post **internally** or **externally**',
          'Candidates apply with a **CV**, application form and letter of application',
          '**Shortlist** the best candidates by comparing applications with the person specification',
          '**Select** using interviews, tests and references',
          'Offer the post, then **induct** and train the new employee'
        ] }
      ]
    },
    {
      h: 'Internal vs external recruitment',
      body: [
        { table: { head: ['', 'Internal recruitment', 'External recruitment'], rows: [
          ['What it is', 'Filling the vacancy with someone already working for the business', 'Filling it with someone from outside'],
          ['Advantages', 'Cheaper and quicker — no advertising costs; the candidate already knows the business and its culture; the business knows their strengths and weaknesses; motivating as it shows promotion is possible; shorter induction needed', 'A larger pool of applicants; brings in new ideas, skills and experience; avoids resentment among existing staff; brings knowledge of competitors'],
          ['Disadvantages', 'No new ideas come in; creates another vacancy that still has to be filled; other staff may resent the promotion; smaller pool of candidates', 'Expensive to advertise and select; slower; the business does not know the person; longer induction; existing staff may be demotivated by being passed over']
        ] } },
        { h3: 'Methods of external advertising' },
        { list: [
          '**Local newspapers** — cheap, suitable for unskilled and semi-skilled local jobs',
          '**National newspapers and trade journals** — expensive, for senior or specialist posts',
          '**Online job boards and the company website** — cheap, wide reach, easy to apply',
          '**Social and professional networks** — targeted, low cost',
          '**Recruitment agencies / headhunters** — expensive but they shortlist for you; used for senior roles',
          '**Government job centres** — free, mainly for unskilled and semi-skilled work'
        ] }
      ]
    },
    {
      h: 'Selection methods',
      body: [
        { table: { head: ['Method', 'Strength', 'Weakness'], rows: [
          ['**Interview** (one-to-one or panel)', 'Cheap; tests communication and personality; two-way — the candidate learns about the job', 'Interviewees can prepare and mislead; interviewer bias; a good interviewee is not always a good worker'],
          ['**Aptitude / skills test**', 'Directly tests the skill the job needs', 'Only tests part of the job; nerves affect performance'],
          ['**Personality test**', 'Checks whether they fit the team and culture', 'Results can be unreliable and are easy to distort'],
          ['**Group tasks / assessment centres**', 'Shows teamwork and leadership in action', 'Time-consuming and expensive'],
          ['**References**', 'An independent view from a previous employer', 'Referees are chosen by the candidate, so are rarely negative'],
          ['**Trial / probation period**', 'The most reliable evidence — actual performance in the job', 'Slow; the business has already paid to train them']
        ] } }
      ]
    },
    {
      h: 'Part-time and full-time employment',
      body: [
        { table: { head: ['Part-time employees — advantages to the business', 'Part-time employees — disadvantages'], rows: [
          ['Flexibility — staff can be brought in only at busy times', 'More people to train, communicate with and manage'],
          ['Cheaper if fewer hours and fewer benefits are needed', 'Less commitment and loyalty to the business'],
          ['Easier to recruit — attracts parents, students, older workers', 'Harder to arrange meetings when staff are on different shifts'],
          ['Cover for absence and holidays', 'Higher labour turnover, so more recruitment cost'],
          ['A wider pool of applicants with useful skills', 'Customers may deal with a different person each visit']
        ] } },
        'Full-time employees give the business **continuity, loyalty and easier communication**, and training investment is more likely to be recovered — but they are a **fixed cost** that must be paid even in quiet periods.'
      ]
    },
    {
      h: 'Training',
      body: [
        { table: { head: ['Type', 'What it is', 'Advantages', 'Disadvantages'], rows: [
          ['**Induction**', 'Training given to a new employee when they start: the layout, the rules, health and safety, who\'s who', 'Settles the employee quickly; fewer early mistakes; safe working from day one', 'Time-consuming; the new employee is not productive during it'],
          ['**On-the-job**', 'Learning by doing the job, watching and being guided by an experienced worker', 'Cheap — no external trainer; the employee is still producing; training is specific to the business', 'The trainer\'s bad habits are passed on; the trainer produces less while teaching; poor-quality output while learning'],
          ['**Off-the-job**', 'Training away from the workplace — a college course, a specialist trainer, an external centre', 'Taught by experts; a wide range of skills and qualifications; no workplace distractions', 'Expensive; the worker produces nothing while away; skills may be general rather than firm-specific; trained workers can leave for a rival']
        ] } },
        { h3: 'Why businesses train' },
        { list: [
          'Higher **productivity** and better **quality** of output',
          'Fewer accidents and less waste',
          'Workers can be **flexible** and cover several jobs',
          'Employees feel valued — **motivation** rises (Maslow: esteem and self-actualisation)',
          'The business can adopt **new technology and methods**',
          'Lower labour turnover — good training helps retain staff'
        ] },
        { callout: { k: 'warn', b: 'The main risk of training is that a newly trained worker is more attractive to competitors and **leaves for a higher salary**, wasting the investment. Businesses reduce this by improving pay, promotion prospects and job satisfaction alongside training.' } }
      ]
    },
    {
      h: 'Workforce planning and reducing the workforce',
      body: [
        { defs: [
          ['Redundancy', 'Ending a job because the job itself is no longer needed. The employee has done nothing wrong and is normally entitled to a redundancy payment.'],
          ['Dismissal', 'Ending a contract because the employee has broken it — poor performance, misconduct, theft.'],
          ['Unfair dismissal', 'Ending a contract for a reason the law does not allow, or without following a fair procedure.'],
          ['Natural wastage', 'Reducing the workforce by not replacing employees who leave or retire.']
        ] },
        { h3: 'Why a business might need to reduce its workforce' },
        { list: [
          'Falling **demand** or a recession means less output is needed',
          '**Automation** — machines replace workers',
          'A **merger or takeover** creates duplicate roles',
          '**Relocation** of production to a cheaper country',
          'Cost cutting to **survive** or to restore profitability',
          'The business is **closing** a factory, branch or product line'
        ] },
        { callout: { k: 'tip', b: 'Natural wastage and voluntary redundancy are usually better than compulsory redundancy: they cost less in payments and do far less damage to the motivation of the staff who remain.' } }
      ]
    },
    {
      h: 'Legal controls over employment',
      body: [
        { table: { head: ['Area of law', 'What it typically requires', 'Impact on the business'], rows: [
          ['**Contract of employment**', 'A written statement of job title, pay, hours, holidays and notice period', 'Reduces disputes, but adds paperwork'],
          ['**Unfair dismissal**', 'Employees can only be dismissed for a fair reason and with a fair procedure', 'The business must keep records and follow procedures; higher administration cost'],
          ['**Discrimination**', 'No discrimination on the grounds of gender, race, religion, age or disability in recruitment, pay or promotion', 'A wider pool of talent and a better reputation; but training and monitoring cost money'],
          ['**Health and safety**', 'Safe equipment, protective clothing, training, breaks, safe temperature and hygiene', 'Fewer accidents and less absence, higher motivation; but equipment and training are expensive'],
          ['**Minimum wage**', 'A legal wage floor per hour', 'Raises wage costs, which may lead to job cuts or higher prices; but reduces poverty, cuts labour turnover and raises motivation'],
          ['**Working hours**', 'Limits on maximum weekly hours and rules on rest breaks', 'Less fatigue and fewer mistakes; may require hiring extra staff']
        ] } },
        { callout: { k: 'note', b: 'Legal controls raise a business\'s costs, but they also protect it: a safe, fairly treated workforce is more motivated, more productive and less likely to leave — and the business avoids fines and damaging publicity.' } }
      ]
    }
  ],
  terms: ['job-description', 'person-specification', 'internal-recruitment', 'external-recruitment', 'induction-training', 'on-the-job-training', 'off-the-job-training', 'redundancy', 'dismissal', 'natural-wastage', 'minimum-wage', 'part-time-employee'],
  tips: [
    'For "which recruitment method?" answers, link to the **type of job**: senior/specialist favours external and agencies; routine junior roles favour internal or local advertising.',
    'Training answers score well if you name the training type *and* say how it solves the specific problem in the case study.'
  ],
  traps: [
    'Mixing up job description (the job) with person specification (the person).',
    'Confusing redundancy with dismissal.'
  ]
});

BS.addTopic({
  id: '2.4', unit: 2, title: 'Internal and external communication',
  syllabus: [
    'Why effective communication is important and the methods used to achieve it',
    'Demonstrate and understand communication barriers'
  ],
  sections: [
    {
      h: 'The communication process',
      body: [
        { formula: 'SENDER  →  MESSAGE  →  MEDIUM (the method)  →  RECEIVER  →  FEEDBACK' },
        'Communication is only **effective** when the message is received, understood and acted on — which is why **feedback** matters. Without feedback the sender cannot know whether the message got through.',
        { defs: [
          ['Internal communication', 'Communication between people inside the same business.'],
          ['External communication', 'Communication between the business and people or organisations outside it — customers, suppliers, government, banks.'],
          ['One-way communication', 'The receiver has no opportunity to reply, e.g. a notice on a noticeboard.'],
          ['Two-way communication', 'The receiver can respond and give feedback, e.g. a meeting or phone call.']
        ] },
        { callout: { k: 'note', b: 'Two-way communication is usually better: the sender knows the message was understood, the receiver feels involved and motivated, and problems are picked up quickly.' } }
      ]
    },
    {
      h: 'Methods of communication',
      body: [
        { h3: 'Verbal (oral)' },
        { table: { head: ['Method', 'Advantages', 'Disadvantages'], rows: [
          ['One-to-one talk', 'Immediate feedback; personal; body language adds meaning', 'No written record; can be forgotten or denied'],
          ['Team / department meeting', 'Everyone hears the same message; ideas can be discussed', 'Time-consuming; expensive if staff stop work; quiet staff may not speak'],
          ['Telephone call', 'Fast over long distances; immediate feedback', 'No visual contact or written record; can interrupt'],
          ['Video conference', 'Face-to-face across countries; saves travel time and cost', 'Needs reliable technology; time-zone problems'],
          ['Presentation to large group', 'Reaches many people at once; visual aids aid understanding', 'Limited feedback from a large audience']
        ] } },
        { h3: 'Written' },
        { table: { head: ['Method', 'Advantages', 'Disadvantages'], rows: [
          ['Letter', 'Formal, permanent record; suitable for confidential or legal matters', 'Slow; no immediate feedback; postage cost'],
          ['Email', 'Fast; cheap; reaches many people at once; attachments; a record is kept', 'Overload means messages are ignored; tone is easily misread; needs internet access'],
          ['Memo / internal note', 'Quick internal record; can be circulated widely', 'One-way; may not be read'],
          ['Notice board', 'Cheap; permanent; reaches everyone who passes', 'No feedback; may be ignored or out of date'],
          ['Report', 'Detailed information for decision making; permanent', 'Takes a long time to write and read'],
          ['Text / instant messaging', 'Very fast; informal; good for urgent short messages', 'Too informal for serious matters; length limits; no depth']
        ] } },
        { h3: 'Visual' },
        { list: [
          'Charts, graphs, diagrams and photographs — make **complex data easy to grasp** and are more interesting than text',
          'Films and videos — good for training and for showing processes',
          'Weakness: visual methods can be **misinterpreted**, give **no feedback** and often need a written or spoken explanation'
        ] },
        { callout: { k: 'tip', b: 'Choosing the right method depends on: the **speed** needed, the **cost**, whether a **written record** is required, whether the message is **confidential**, how **complex** it is, how **many** people must receive it, and whether **feedback** is needed.' } }
      ]
    },
    {
      h: 'Barriers to effective communication',
      body: [
        { table: { head: ['Barrier', 'Example', 'How to overcome it'], rows: [
          ['**Sender problems**', 'Unclear, too long, technical jargon, wrong language', 'Keep messages short and simple; avoid jargon; check before sending'],
          ['**Wrong medium**', 'A complex report given verbally; bad news given by group email', 'Match the method to the message'],
          ['**Receiver problems**', 'Not listening, not interested, does not trust the sender', 'Use two-way methods; ask for feedback; build trust'],
          ['**Physical noise / distance**', 'A noisy factory floor; staff in different countries', 'Move to a quiet room; use video conferencing'],
          ['**Technology failure**', 'Server down, email in the spam folder, weak signal', 'Have a back-up method; confirm receipt'],
          ['**Too long a chain of command**', 'The message is distorted or delayed as it passes down many levels', 'Delayer the structure; communicate directly with staff'],
          ['**Communication overload**', 'Too many emails, so important messages are missed', 'Send fewer, better-targeted messages'],
          ['**No feedback**', 'One-way methods mean the sender never knows if it was understood', 'Use two-way methods; require a reply']
        ] } },
        { h3: 'Consequences of poor communication' },
        { list: [
          'Wrong or incomplete work — wasted time and materials',
          'Missed deadlines and unhappy customers',
          'Low **motivation** — staff feel uninformed and undervalued',
          'Poor decisions made on out-of-date or wrong information',
          'Rumours spread; resistance to change',
          'Higher costs and lower profits'
        ] }
      ]
    }
  ],
  terms: ['communication', 'feedback', 'internal-communication', 'external-communication', 'one-way-communication', 'two-way-communication', 'communication-barrier'],
  tips: [
    'When recommending a method, name it *and* justify it against the case: urgency, cost, record needed, number of receivers.',
    'A barrier answer needs the barrier, the **effect on the business**, and a realistic solution.'
  ],
  traps: [
    'Listing methods without saying which is best for the situation given.',
    'Treating "external communication" as advertising only — it also covers suppliers, banks and government.'
  ]
});
