window.BIO_T3 = {
  id: '3',
  title: 'Reproduction and inheritance',
  blurb: 'Sexual and asexual reproduction in plants and humans, then DNA, cell division, genetic crosses, variation and natural selection.',
  subs: [

    /* ================================================== 3a */
    {
      id: '3a',
      title: 'Reproduction in flowering plants',
      objectives: [
        'Compare sexual and asexual reproduction',
        'Label a flower and give the function of each part',
        'Compare insect and wind pollination',
        'Describe fertilisation, seed structure and the conditions needed for germination'
      ],
      notes: [
        {
          t: 'table',
          head: ['', 'Sexual reproduction', 'Asexual reproduction'],
          rows: [
            ['Gametes', 'Two gametes fuse', 'No gametes'],
            ['Parents', 'Usually two', 'One'],
            ['Offspring', 'Genetically different from parents and each other', 'Genetically identical clones'],
            ['Variation', 'Yes — an advantage if conditions change', 'None, unless a mutation occurs'],
            ['Speed', 'Slower', 'Fast, and no need to find a mate'],
            ['Example', 'Flowering plants making seeds', 'Strawberry runners, potato tubers, bulbs, spider plant plantlets']
          ]
        },
        { t: 'note', k: 'exam', x: 'The classic comparison answer: variation from sexual reproduction means some offspring may survive a change in the environment or a new disease, while a whole field of identical clones could all be wiped out at once.' },
        { t: 'h', x: 'The flower' },
        { t: 'fig', id: 'flower', cap: 'An insect-pollinated flower cut in half.' },
        { t: 'h', x: 'Pollination' },
        { t: 'def', term: 'Pollination', x: 'The transfer of pollen from an anther to a stigma.' },
        {
          t: 'table',
          head: ['Feature', 'Insect-pollinated', 'Wind-pollinated'],
          rows: [
            ['Petals', 'Large, brightly coloured, scented', 'Small, green or dull, often no petals'],
            ['Nectaries', 'Present, to attract insects', 'Absent'],
            ['Anthers', 'Inside the flower, so insects brush against them', 'Hanging outside, so pollen is blown away'],
            ['Stigma', 'Sticky, inside the flower', 'Large and feathery, hanging outside to catch pollen from the air'],
            ['Pollen', 'Sticky or spiky, in small amounts, so it clings to insects', 'Smooth, light and in huge amounts, so it is carried far by wind']
          ]
        },
        { t: 'p', x: '**Self-pollination** is pollen landing on a stigma of the same plant; **cross-pollination** is pollen reaching a different plant of the same species. Cross-pollination produces more variation.' },
        { t: 'h', x: 'Fertilisation' },
        {
          t: 'ol', x: [
            'A pollen grain lands on the stigma and grows a **pollen tube** down through the style',
            'The tube grows towards the ovule and enters it through a small hole, the **micropyle**',
            'The male nucleus travels down the tube and **fuses with the female nucleus** in the ovule — this is fertilisation',
            'The fertilised ovule becomes the **seed**, and the ovary becomes the **fruit**'
          ]
        },
        { t: 'note', k: 'warn', x: 'Pollination and fertilisation are not the same. Pollination is just the transfer of pollen; fertilisation is the fusion of the two nuclei that happens afterwards.' },
        { t: 'h', x: 'The seed' },
        {
          t: 'table',
          head: ['Part', 'Function'],
          rows: [
            ['Testa', 'The tough seed coat, which protects the seed'],
            ['Micropyle', 'The small hole where the pollen tube entered; water enters here at germination'],
            ['Cotyledon', 'Contains the food store (usually starch) for the growing seedling'],
            ['Plumule', 'The embryonic shoot'],
            ['Radicle', 'The embryonic root']
          ]
        },
        { t: 'h', x: 'Germination' },
        { t: 'p', x: 'Seeds need three conditions to germinate:' },
        {
          t: 'ul', x: [
            '**Water** — to activate the enzymes and to allow the seed to swell and split the testa',
            '**Oxygen** — for aerobic respiration to release the energy for growth',
            '**A suitable temperature** — so the enzymes work at a reasonable rate'
          ]
        },
        { t: 'note', k: 'exam', x: 'Light is **not** needed for germination — the food store in the cotyledon supplies everything until the shoot reaches the surface.' },
        { t: 'note', k: 'prac', x: 'The four-tube germination experiment is a core practical. See the practicals page.' }
      ],
      terms: [
        { t: 'Sexual reproduction', d: 'Reproduction involving the fusion of two gametes, producing genetically varied offspring.' },
        { t: 'Asexual reproduction', d: 'Reproduction from one parent with no gametes, producing genetically identical offspring (clones).' },
        { t: 'Gamete', d: 'A sex cell, with half the normal number of chromosomes.' },
        { t: 'Stamen', d: 'The male part of a flower: anther plus filament.' },
        { t: 'Anther', d: 'The part of a flower that makes pollen grains.' },
        { t: 'Stigma', d: 'The sticky top of the carpel where pollen lands.' },
        { t: 'Ovule', d: 'The structure in the ovary containing the female gamete; it becomes the seed.' },
        { t: 'Pollination', d: 'The transfer of pollen from an anther to a stigma.' },
        { t: 'Fertilisation', d: 'The fusion of a male nucleus with a female nucleus to form a zygote.' },
        { t: 'Pollen tube', d: 'The tube that grows from a pollen grain down the style to carry the male nucleus to the ovule.' },
        { t: 'Micropyle', d: 'The small hole in a seed through which the pollen tube entered and water enters at germination.' },
        { t: 'Testa', d: 'The tough protective coat of a seed.' },
        { t: 'Cotyledon', d: 'The seed leaf, which contains the food store for the germinating seedling.' },
        { t: 'Plumule', d: 'The embryonic shoot of a seed.' },
        { t: 'Radicle', d: 'The embryonic root of a seed.' },
        { t: 'Germination', d: 'The start of growth of a seed into a seedling, needing water, oxygen and a suitable temperature.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which part of a flower becomes the fruit?', o: ['The ovule', 'The ovary', 'The stigma', 'The anther'], a: 1, e: 'The ovary becomes the fruit and the ovules inside it become the seeds.' },
        { t: 'mcq', q: 'A flower has small green petals, feathery stigmas hanging outside, and produces huge amounts of smooth, light pollen. It is:', o: ['Insect-pollinated', 'Wind-pollinated', 'Self-pollinating only', 'Not pollinated'], a: 1, e: 'Feathery exposed stigmas and large amounts of light pollen are the classic wind-pollination features.' },
        { t: 'mcq', q: 'Which condition is NOT needed for a seed to germinate?', o: ['Water', 'Oxygen', 'Light', 'A suitable temperature'], a: 2, e: 'The cotyledon supplies food until the shoot reaches the light, so germination itself needs no light.' },
        { t: 'mcq', q: 'An advantage of asexual reproduction to a plant is that:', o: ['It produces variation', 'Offspring are well adapted to changing conditions', 'It is fast and needs no pollinator or mate', 'It uses less energy than photosynthesis'], a: 2, e: 'Asexual reproduction is quick and reliable when conditions are already good, because no pollination is needed.' },
        { t: 'mcq', q: 'What happens immediately after a pollen grain lands on a suitable stigma?', o: ['The ovary swells into a fruit', 'A pollen tube grows down the style', 'The seed germinates', 'The petals fall off'], a: 1, e: 'The pollen tube carries the male nucleus down to the ovule so fertilisation can happen.' },
        { t: 'saq', q: 'Describe three ways an insect-pollinated flower differs from a wind-pollinated flower.', m: 3, ms: ['Insect-pollinated flowers have large, brightly coloured, scented petals; wind-pollinated flowers have small dull ones or none;', 'insect-pollinated flowers have nectaries; wind-pollinated flowers do not;', 'insect-pollinated anthers and stigmas are inside the flower; in wind-pollinated flowers they hang outside;', 'insect-pollinated pollen is sticky or spiky and produced in small amounts; wind-pollinated pollen is smooth, light and produced in large amounts.'] },
        { t: 'saq', q: 'Describe what happens from pollination to fertilisation in a flowering plant.', m: 4, ms: ['A pollen grain lands on the stigma;', 'it grows a pollen tube down through the style towards the ovary;', 'the tube enters the ovule through the micropyle;', 'the male nucleus travels down the tube and fuses with the female nucleus in the ovule.'] },
        { t: 'saq', q: 'Explain why water and oxygen are needed for a seed to germinate.', m: 4, ms: ['Water activates the enzymes in the seed / allows reactions to happen in solution;', 'water also makes the seed swell so the testa splits;', 'oxygen is needed for aerobic respiration;', 'respiration releases the energy required for growth of the plumule and radicle.'] },
        { t: 'saq', q: 'A grower produces strawberry plants from runners rather than from seed. Give one advantage and one disadvantage of this.', m: 2, ms: ['Advantage: all the offspring are genetically identical to the parent, so a plant with good fruit produces plants with the same good fruit / it is fast and needs no pollination;', 'disadvantage: there is no genetic variation, so if a disease or a change in conditions affects one plant it could destroy the whole crop.'] }
      ]
    },

    /* ================================================== 3b */
    {
      id: '3b',
      title: 'Reproduction in humans',
      objectives: [
        'Name the parts of the male and female reproductive systems and their functions',
        'Describe the adaptations of the sperm and egg cells',
        'Describe fertilisation, implantation and the role of the placenta',
        'Describe the menstrual cycle and the roles of oestrogen and progesterone',
        'State the effects of testosterone and oestrogen at puberty'
      ],
      notes: [
        { t: 'h', x: 'The reproductive systems' },
        {
          t: 'table',
          head: ['Male part', 'Function'],
          rows: [
            ['Testis', 'Produces sperm and the hormone testosterone'],
            ['Scrotum', 'Holds the testes outside the body, slightly cooler, which sperm production needs'],
            ['Sperm duct', 'Carries sperm from the testis to the urethra'],
            ['Prostate gland', 'Adds fluid containing nutrients to make semen'],
            ['Urethra', 'Carries semen (and at other times urine) out through the penis'],
            ['Penis', 'Places semen inside the vagina']
          ]
        },
        {
          t: 'table',
          head: ['Female part', 'Function'],
          rows: [
            ['Ovary', 'Contains the egg cells and releases one each month; makes oestrogen and progesterone'],
            ['Oviduct (fallopian tube)', 'Carries the egg to the uterus; **fertilisation happens here**'],
            ['Uterus', 'Muscular organ where the embryo implants and develops'],
            ['Cervix', 'The ring of muscle at the entrance to the uterus'],
            ['Vagina', 'Receives the penis and is the birth canal']
          ]
        },
        { t: 'h', x: 'The gametes' },
        {
          t: 'table',
          head: ['', 'Sperm cell', 'Egg cell'],
          rows: [
            ['Size', 'Very small', 'Much larger'],
            ['Number', 'Millions released at once', 'Usually one per month'],
            ['Movement', 'Swims using a tail', 'Cannot move itself; wafted by cilia in the oviduct'],
            ['Adaptations', 'Tail for swimming; many mitochondria for energy; enzymes in the head (acrosome) to digest through the egg membrane', 'Large food store (yolk) for the embryo; a membrane that changes after fertilisation so no other sperm can enter']
          ]
        },
        { t: 'h', x: 'From fertilisation to birth' },
        {
          t: 'ol', x: [
            '**Fertilisation** — a sperm nucleus fuses with the egg nucleus in the oviduct, forming a **zygote**',
            'The zygote divides by **mitosis** to form a ball of cells, the **embryo**',
            '**Implantation** — the embryo sinks into the thick lining of the uterus',
            'The **placenta** develops and the embryo becomes a **fetus** once the organs have formed'
          ]
        },
        {
          t: 'ul', x: [
            'The **placenta** has a very large surface area of villi in close contact with the mother\'s blood, and a very thin barrier between the two blood supplies',
            'Oxygen, glucose, amino acids, water, minerals and antibodies pass from mother to fetus; carbon dioxide and urea pass from fetus to mother — all by diffusion, down concentration gradients',
            'The two blood supplies never mix. This keeps the mother\'s higher blood pressure from damaging the fetus, and stops some pathogens crossing',
            'The **umbilical cord** connects the fetus to the placenta',
            'The **amniotic fluid** in the amniotic sac cushions the fetus against knocks and keeps its temperature steady'
          ]
        },
        { t: 'note', k: 'warn', x: 'Alcohol, nicotine and some other drugs are small enough to cross the placenta and can harm the developing fetus.' },
        { t: 'h', x: 'The menstrual cycle' },
        { t: 'p', x: 'A cycle of about 28 days that prepares the uterus for a possible pregnancy.' },
        {
          t: 'table',
          head: ['Days (approx.)', 'What happens'],
          rows: [
            ['1–5', 'Menstruation — the uterus lining breaks down and is lost'],
            ['5–14', 'Oestrogen from the ovary makes the uterus lining thicken and repair; an egg matures'],
            ['14', '**Ovulation** — an egg is released from the ovary into the oviduct'],
            ['14–28', 'Progesterone maintains the thick lining, ready for implantation'],
            ['28', 'If there is no fertilisation, progesterone falls, the lining breaks down and the cycle starts again']
          ]
        },
        { t: 'p', x: 'If the egg is fertilised and implants, progesterone stays high, the lining is maintained and menstruation does not happen.' },
        { t: 'h', x: 'Puberty' },
        {
          t: 'table',
          head: ['Hormone', 'Made in', 'Secondary sexual characteristics'],
          rows: [
            ['Testosterone', 'Testes', 'Deeper voice, facial and body hair, broader shoulders and more muscle, sperm production begins'],
            ['Oestrogen', 'Ovaries', 'Breasts develop, hips widen, body hair grows, menstrual cycle begins']
          ]
        }
      ],
      terms: [
        { t: 'Zygote', d: 'The single cell formed when a sperm nucleus fuses with an egg nucleus.' },
        { t: 'Embryo', d: 'The ball of cells formed as the zygote divides, before the organs have formed.' },
        { t: 'Fetus', d: 'The developing baby once its organs have formed.' },
        { t: 'Implantation', d: 'When the embryo sinks into the lining of the uterus.' },
        { t: 'Placenta', d: 'The organ that exchanges substances between the mother\'s blood and the fetus\'s blood without the two mixing.' },
        { t: 'Umbilical cord', d: 'The cord carrying blood between the fetus and the placenta.' },
        { t: 'Amniotic fluid', d: 'The fluid in the amniotic sac that cushions and protects the fetus.' },
        { t: 'Ovulation', d: 'The release of an egg from the ovary, about day 14 of the menstrual cycle.' },
        { t: 'Menstruation', d: 'The loss of the uterus lining at the start of the menstrual cycle.' },
        { t: 'Oestrogen', d: 'The hormone that repairs and thickens the uterus lining and causes female secondary sexual characteristics.' },
        { t: 'Progesterone', d: 'The hormone that maintains the thickened uterus lining in the second half of the cycle and during pregnancy.' },
        { t: 'Testosterone', d: 'The hormone from the testes that causes male secondary sexual characteristics and sperm production.' },
        { t: 'Secondary sexual characteristics', d: 'The physical features that develop at puberty under the control of sex hormones.' }
      ],
      qs: [
        { t: 'mcq', q: 'Where does fertilisation normally take place in a human?', o: ['The ovary', 'The oviduct', 'The uterus', 'The vagina'], a: 1, e: 'The sperm swims up to meet the egg in the oviduct; the fertilised egg then travels to the uterus to implant.' },
        { t: 'mcq', q: 'Which substance passes from the fetus to the mother across the placenta?', o: ['Oxygen', 'Glucose', 'Urea', 'Amino acids'], a: 2, e: 'Waste products — carbon dioxide and urea — pass to the mother\'s blood; food and oxygen pass the other way.' },
        { t: 'mcq', q: 'Why does a sperm cell contain many mitochondria?', o: ['To store food for the embryo', 'To release energy for swimming', 'To digest the egg membrane', 'To carry the genetic material'], a: 1, e: 'Aerobic respiration in the mitochondria releases the energy needed to move the tail.' },
        { t: 'mcq', q: 'What is the role of progesterone in the menstrual cycle?', o: ['It causes ovulation', 'It maintains the thickened uterus lining', 'It breaks down the lining', 'It repairs the lining after menstruation'], a: 1, e: 'Oestrogen repairs and thickens the lining; progesterone maintains it after ovulation. If progesterone falls, the lining breaks down.' },
        { t: 'mcq', q: 'The mother\'s blood and the fetus\'s blood do not mix. One reason this matters is that:', o: ['The mother\'s higher blood pressure could damage fetal vessels', 'The fetus would get too much oxygen', 'Diffusion could not happen', 'The placenta would grow too large'], a: 0, e: 'Keeping the supplies separate protects the fetus from the mother\'s blood pressure and stops some pathogens and blood group differences causing harm.' },
        { t: 'saq', q: 'Describe three ways in which a sperm cell is adapted to its function.', m: 3, ms: ['It has a tail/flagellum so it can swim to the egg;', 'it contains many mitochondria to release the energy needed for swimming;', 'it has enzymes in the head to digest through the membrane of the egg;', 'it is small and streamlined so it can move quickly.'] },
        { t: 'saq', q: 'Explain how the placenta is adapted for exchanging substances between mother and fetus.', m: 4, ms: ['It has villi giving a very large surface area for exchange;', 'the barrier between the two blood supplies is very thin, so the diffusion distance is short;', 'the mother\'s blood flows close to the fetal capillaries, maintaining steep concentration gradients;', 'so oxygen and glucose diffuse into the fetal blood and carbon dioxide and urea diffuse out.'] },
        { t: 'saq', q: 'Describe what happens in the menstrual cycle between day 5 and day 14.', m: 4, ms: ['An egg matures in an ovary;', 'oestrogen is released by the ovary;', 'oestrogen causes the lining of the uterus to repair and thicken;', 'at about day 14 ovulation occurs and the egg is released into the oviduct.'] },
        { t: 'saq', q: 'Explain why the lining of the uterus breaks down if the egg is not fertilised.', m: 3, ms: ['If there is no fertilisation the egg does not implant;', 'the level of progesterone falls;', 'progesterone is needed to maintain the thickened lining, so without it the lining breaks down and is lost as menstruation.'] }
      ]
    },

    /* ================================================== 3c */
    {
      id: '3c',
      title: 'Chromosomes, DNA and cell division',
      objectives: [
        'Explain the relationship between the nucleus, chromosomes, genes and DNA',
        'Describe the structure of DNA and the base pairing rule',
        'Outline how a protein is made from a gene',
        'Compare mitosis and meiosis and state where each is used'
      ],
      notes: [
        { t: 'fig', id: 'dna', cap: 'From gene to protein.' },
        { t: 'h', x: 'The hierarchy' },
        {
          t: 'ul', x: [
            'The **nucleus** of a body cell contains **chromosomes**',
            'A **chromosome** is one very long molecule of **DNA**',
            'A **gene** is a short length of DNA that codes for one protein',
            'A **genome** is the entire set of genetic material of an organism',
            'Chromosomes come in pairs. Humans have 23 pairs, 46 in total, in every body cell'
          ]
        },
        { t: 'h', x: 'DNA' },
        {
          t: 'ul', x: [
            'DNA is a **double helix** — two strands twisted around each other',
            'The strands are held together by pairs of **bases**',
            'There are four bases: **A, T, C and G**',
            '**A always pairs with T**, and **C always pairs with G** — the complementary base pairing rule',
            'The order of the bases along a gene is the code for the order of the amino acids in a protein'
          ]
        },
        { t: 'note', k: 'exam', x: 'If one strand reads A-T-G-C-C-A, the other strand must read T-A-C-G-G-T. Questions asking you to complete a strand are free marks — just apply A–T and C–G.' },
        { t: 'h', x: 'Making a protein' },
        {
          t: 'ol', x: [
            'The DNA in the nucleus is too large to leave it, so a copy of the gene is made as a molecule of **mRNA**',
            'The mRNA passes out of the nucleus to a **ribosome** in the cytoplasm',
            'The ribosome reads the bases **three at a time**; each triplet codes for one amino acid',
            'The amino acids are joined in that order to build the protein, which then folds into its specific shape'
          ]
        },
        { t: 'p', x: 'The shape a protein folds into is what allows it to do its job — which is why the order of bases, and so the order of amino acids, matters so much.' },
        { t: 'h', x: 'Mitosis and meiosis' },
        { t: 'def', term: 'Mitosis', x: 'Cell division that produces two genetically identical daughter cells, each with the same number of chromosomes as the parent cell. Used for growth, repair of damaged tissue, replacement of worn-out cells, and asexual reproduction.' },
        { t: 'def', term: 'Meiosis', x: 'Cell division that produces four genetically different daughter cells, each with half the number of chromosomes. It is used only to make gametes.' },
        {
          t: 'table',
          head: ['', 'Mitosis', 'Meiosis'],
          rows: [
            ['Number of divisions', 'One', 'Two'],
            ['Daughter cells', 'Two', 'Four'],
            ['Chromosome number', 'Same as parent (diploid)', 'Halved (haploid)'],
            ['Genetically', 'Identical to the parent and each other', 'All different'],
            ['Where it happens', 'All over the body', 'Only in the ovaries and testes (or anthers and ovules)'],
            ['Purpose', 'Growth, repair, replacement, asexual reproduction', 'Producing gametes for sexual reproduction']
          ]
        },
        { t: 'p', x: 'Gametes must be **haploid** so that when two of them fuse, the zygote has the full **diploid** number again. Without meiosis the chromosome number would double every generation.' },
        { t: 'note', k: 'tip', x: 'Meiosis produces variation in two ways: the chromosomes of each pair are shuffled independently into the gametes, and which sperm fertilises which egg is random. That is why siblings are not identical.' }
      ],
      terms: [
        { t: 'Chromosome', d: 'A long molecule of DNA in the nucleus, carrying many genes.' },
        { t: 'Gene', d: 'A section of DNA that codes for one protein.' },
        { t: 'DNA', d: 'The molecule that carries genetic information; a double helix of two strands held together by paired bases.' },
        { t: 'Genome', d: 'The entire set of genetic material of an organism.' },
        { t: 'Base pairing', d: 'The rule that A always pairs with T and C always pairs with G in DNA.' },
        { t: 'mRNA', d: 'The molecule that carries a copy of a gene out of the nucleus to a ribosome.' },
        { t: 'Diploid', d: 'A cell with two of each type of chromosome; in humans, 46.' },
        { t: 'Haploid', d: 'A cell with one of each type of chromosome; in humans, 23. Gametes are haploid.' },
        { t: 'Mitosis', d: 'Cell division producing two genetically identical diploid cells, for growth, repair and asexual reproduction.' },
        { t: 'Meiosis', d: 'Cell division producing four genetically different haploid cells, used to make gametes.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which base always pairs with cytosine?', o: ['Adenine', 'Thymine', 'Guanine', 'Uracil'], a: 2, e: 'C pairs with G, and A pairs with T.' },
        { t: 'mcq', q: 'A human body cell contains 46 chromosomes. How many are in a human sperm cell?', o: ['92', '46', '23', '2'], a: 2, e: 'Gametes are haploid, made by meiosis, so they have half the number. Fertilisation restores 46.' },
        { t: 'mcq', q: 'Which process produces genetically identical cells?', o: ['Meiosis', 'Mitosis', 'Fertilisation', 'Mutation'], a: 1, e: 'Mitosis copies the chromosomes exactly, so the daughter cells are clones of the parent cell.' },
        { t: 'mcq', q: 'A gene is best described as:', o: ['A whole chromosome', 'A section of DNA that codes for a protein', 'A pair of chromosomes', 'The nucleus of a cell'], a: 1, e: 'Chromosomes carry many genes; each gene codes for one protein.' },
        { t: 'mcq', q: 'Why is a copy of a gene made as mRNA rather than the DNA leaving the nucleus?', o: ['DNA is too large to leave the nucleus', 'DNA cannot be read by ribosomes', 'mRNA contains more information', 'The nucleus destroys DNA'], a: 0, e: 'DNA molecules are far too big to pass through the nuclear pores, so a short mRNA copy is made instead.' },
        { t: 'saq', q: 'One strand of DNA has the base sequence T-A-C-G-G-A-T. Write the sequence of the complementary strand.', m: 2, ms: ['A-T-G-C-C-T-A;', 'showing correct use of A–T and C–G pairing throughout.'] },
        { t: 'saq', q: 'Describe how the information in a gene is used to make a protein.', m: 4, ms: ['A copy of the gene is made as messenger RNA in the nucleus;', 'the mRNA leaves the nucleus and attaches to a ribosome in the cytoplasm;', 'the ribosome reads the bases in threes, and each triplet codes for one amino acid;', 'the amino acids are joined together in that order, and the chain folds into the protein\'s specific shape.'] },
        { t: 'saq', q: 'Explain why gametes must be produced by meiosis rather than mitosis.', m: 3, ms: ['Meiosis halves the chromosome number, so gametes are haploid;', 'when two gametes fuse at fertilisation the diploid number is restored;', 'if gametes were made by mitosis they would be diploid and the chromosome number would double every generation.'] },
        { t: 'saq', q: 'Give three differences between mitosis and meiosis.', m: 3, ms: ['Mitosis produces two daughter cells, meiosis produces four;', 'mitosis keeps the chromosome number the same, meiosis halves it;', 'mitosis produces genetically identical cells, meiosis produces genetically different ones;', 'mitosis happens throughout the body, meiosis only in the reproductive organs.'] }
      ]
    },

    /* ================================================== 3d */
    {
      id: '3d',
      title: 'Inheritance and genetic diagrams',
      objectives: [
        'Use the terms allele, dominant, recessive, homozygous, heterozygous, genotype and phenotype correctly',
        'Complete monohybrid crosses and Punnett squares, and predict ratios',
        'Explain codominance',
        'Explain how sex is determined, and interpret family pedigrees'
      ],
      notes: [
        {
          t: 'table',
          head: ['Term', 'Meaning'],
          rows: [
            ['Allele', 'A different version of the same gene, e.g. the allele for brown eyes and the allele for blue eyes'],
            ['Dominant', 'An allele that shows in the phenotype even when only one copy is present. Written as a capital letter'],
            ['Recessive', 'An allele that only shows in the phenotype when two copies are present. Written as a lower-case letter'],
            ['Homozygous', 'Both alleles the same, e.g. **BB** or **bb**'],
            ['Heterozygous', 'Two different alleles, e.g. **Bb**'],
            ['Genotype', 'The alleles an organism has, e.g. Bb'],
            ['Phenotype', 'The characteristics you can observe, e.g. brown eyes'],
            ['Carrier', 'An individual who is heterozygous for a recessive condition — they do not have it, but can pass it on']
          ]
        },
        { t: 'note', k: 'warn', x: 'Always use the same letter for both alleles of one gene, and choose a letter whose capital looks clearly different from its lower case. **B/b** is fine; **S/s** and **C/c** are risky in handwriting.' },
        { t: 'h', x: 'A monohybrid cross, step by step' },
        { t: 'p', x: 'Two heterozygous brown-eyed parents. B = brown (dominant), b = blue (recessive).' },
        {
          t: 'ol', x: [
            'Write the **parents\' genotypes**: Bb × Bb',
            'Write the **gametes**: each parent can make B or b',
            'Draw a **Punnett square** and fill in every combination',
            'Read off the **offspring genotypes** and work out the phenotypes',
            'Give the **ratio**'
          ]
        },
        {
          t: 'table',
          head: ['', 'B', 'b'],
          rows: [
            ['**B**', 'BB — brown', 'Bb — brown'],
            ['**b**', 'Bb — brown', 'bb — blue']
          ]
        },
        { t: 'p', x: 'Genotype ratio 1 BB : 2 Bb : 1 bb. Phenotype ratio **3 brown : 1 blue**, so there is a 25% chance of a blue-eyed child at each birth.' },
        { t: 'note', k: 'exam', x: 'A ratio is a *probability*, not a promise. Two parents who both carry a recessive allele could have four children with the condition, or none. Say "a 1 in 4 chance for each child".' },
        { t: 'h', x: 'Common crosses to recognise' },
        {
          t: 'table',
          head: ['Cross', 'Offspring phenotype ratio'],
          rows: [
            ['Bb × Bb', '3 dominant : 1 recessive'],
            ['Bb × bb', '1 dominant : 1 recessive'],
            ['BB × bb', 'All dominant (all heterozygous)'],
            ['bb × bb', 'All recessive']
          ]
        },
        { t: 'h', x: 'Codominance' },
        { t: 'p', x: 'Sometimes neither allele is dominant, and a heterozygote shows **both** characteristics. In snapdragons, a red-flowered plant (C^R C^R) crossed with a white one (C^W C^W) gives all pink flowers (C^R C^W). Crossing two pink plants gives 1 red : 2 pink : 1 white.' },
        { t: 'p', x: 'Human blood groups are another example: the alleles for A and B are codominant with each other, and both are dominant to O. Someone with the alleles for A and B has blood group AB.' },
        { t: 'h', x: 'Sex determination' },
        {
          t: 'ul', x: [
            'Females have two **X** chromosomes: **XX**. Males have one X and one Y: **XY**',
            'All eggs carry an X. Half of sperm carry an X and half carry a Y',
            'So it is the sperm that determines the sex of the child, and the ratio is 1 male : 1 female — a 50% chance each time'
          ]
        },
        {
          t: 'table',
          head: ['', 'X (egg)', 'X (egg)'],
          rows: [
            ['**X** (sperm)', 'XX — female', 'XX — female'],
            ['**Y** (sperm)', 'XY — male', 'XY — male']
          ]
        },
        { t: 'h', x: 'Family pedigrees' },
        {
          t: 'ul', x: [
            'Circles are female, squares are male. Shaded shapes have the condition',
            'If two unaffected parents have an affected child, the condition must be **recessive** and both parents must be **carriers**',
            'If an affected child has an unaffected parent, the allele cannot be dominant',
            'Work out any genotype you can be certain of first, e.g. anyone showing a recessive condition must be homozygous recessive, then work backwards'
          ]
        }
      ],
      terms: [
        { t: 'Allele', d: 'A different version of the same gene.' },
        { t: 'Dominant allele', d: 'An allele that shows in the phenotype even when only one copy is present.' },
        { t: 'Recessive allele', d: 'An allele that only shows in the phenotype when two copies are present.' },
        { t: 'Homozygous', d: 'Having two identical alleles of a gene.' },
        { t: 'Heterozygous', d: 'Having two different alleles of a gene.' },
        { t: 'Genotype', d: 'The combination of alleles an organism has.' },
        { t: 'Phenotype', d: 'The observable characteristics of an organism.' },
        { t: 'Carrier', d: 'A heterozygous individual who does not show a recessive condition but can pass the allele on.' },
        { t: 'Codominance', d: 'When both alleles of a gene are expressed in a heterozygote, so both characteristics show.' },
        { t: 'Punnett square', d: 'A grid used to work out all the possible combinations of gametes in a genetic cross.' },
        { t: 'Monohybrid cross', d: 'A genetic cross that follows the inheritance of a single gene.' }
      ],
      qs: [
        { t: 'mcq', q: 'Two heterozygous parents (Tt × Tt) have children. What proportion are expected to show the recessive phenotype?', o: ['0', '1 in 4', '1 in 2', '3 in 4'], a: 1, e: 'The Punnett square gives 1 TT : 2 Tt : 1 tt, so a 1 in 4 chance of the recessive phenotype.' },
        { t: 'mcq', q: 'An organism with the genotype Aa is described as:', o: ['Homozygous dominant', 'Homozygous recessive', 'Heterozygous', 'Codominant'], a: 2, e: 'Two different alleles means heterozygous.' },
        { t: 'mcq', q: 'Two unaffected parents have a child with a genetic condition. This shows the condition is:', o: ['Dominant', 'Recessive, and both parents are carriers', 'Sex-linked and on the Y chromosome', 'Caused by the environment'], a: 1, e: 'A dominant allele would have shown in at least one parent, so it must be recessive and both parents must carry one copy.' },
        { t: 'mcq', q: 'What determines the sex of a human baby?', o: ['Whether the egg carries X or Y', 'Whether the sperm carries X or Y', 'The mother\'s hormones', 'The number of chromosomes'], a: 1, e: 'All eggs carry X. The sperm carries either X or Y, so the sperm decides.' },
        { t: 'mcq', q: 'A red-flowered snapdragon crossed with a white-flowered one gives all pink offspring. This is an example of:', o: ['A dominant allele', 'Codominance', 'A mutation', 'Sex linkage'], a: 1, e: 'Neither allele masks the other, so the heterozygote shows a blend of both characteristics.' },
        { t: 'saq', q: 'A plant that is homozygous for tall (TT) is crossed with a short plant (tt). Draw the cross and give the genotype and phenotype of the offspring.', m: 3, ms: ['Parents TT × tt; gametes all T and all t;', 'all offspring are Tt / heterozygous;', 'all offspring are tall, because T is dominant.'] },
        { t: 'saq', q: 'Cystic fibrosis is caused by a recessive allele f. Two parents are both carriers. Use a genetic diagram to show the chance that their child has cystic fibrosis.', m: 4, ms: ['Parents\' genotypes are Ff × Ff;', 'gametes: F and f from each parent;', 'Punnett square giving FF, Ff, Ff, ff;', 'ff has cystic fibrosis, so there is a 1 in 4 (25%) chance for each child.'] },
        { t: 'saq', q: 'Explain the difference between genotype and phenotype.', m: 2, ms: ['Genotype is the combination of alleles an organism has, e.g. Bb;', 'phenotype is the observable characteristic that results, e.g. brown eyes;', 'two different genotypes (BB and Bb) can give the same phenotype.'] },
        { t: 'saq', q: 'Explain why roughly equal numbers of boys and girls are born.', m: 3, ms: ['All eggs carry an X chromosome;', 'half of sperm carry an X and half carry a Y, produced in equal numbers by meiosis;', 'so there is an equal chance of an X or a Y sperm fertilising the egg, giving XX (female) or XY (male) in a 1 : 1 ratio.'] }
      ]
    },

    /* ================================================== 3e */
    {
      id: '3e',
      title: 'Variation, mutation and natural selection',
      objectives: [
        'Distinguish genetic and environmental causes of variation',
        'Distinguish continuous and discontinuous variation',
        'Define mutation and describe how the mutation rate can be increased',
        'Explain evolution by natural selection, using antibiotic resistance as an example'
      ],
      notes: [
        { t: 'h', x: 'Causes of variation' },
        {
          t: 'table',
          head: ['Genetic variation', 'Environmental variation'],
          rows: [
            ['Caused by the alleles inherited from the parents', 'Caused by the conditions an organism lives in'],
            ['Eye colour, blood group, natural hair colour, sex', 'A scar, a plant grown in the shade being taller and paler, a language you speak'],
            ['Can be passed on to offspring', 'Cannot be passed on']
          ]
        },
        { t: 'p', x: 'Many characteristics, such as height and body mass, are affected by **both** — genes set a range and the environment decides where in that range you end up.' },
        { t: 'h', x: 'Continuous and discontinuous variation' },
        {
          t: 'table',
          head: ['', 'Continuous', 'Discontinuous'],
          rows: [
            ['Values', 'Any value in a range', 'A small number of distinct categories'],
            ['Controlled by', 'Many genes, and usually the environment as well', 'A single gene or a small number of genes'],
            ['Examples', 'Height, body mass, leaf length', 'Blood group, sex, tongue rolling, seed shape'],
            ['Graph', 'A histogram, usually a bell-shaped curve', 'A bar chart with separate bars']
          ]
        },
        { t: 'h', x: 'Mutation' },
        { t: 'def', term: 'Mutation', x: 'A random change in the base sequence of DNA. It may change the protein that the gene codes for.' },
        {
          t: 'ul', x: [
            'Most mutations have **no effect**; some are **harmful**; very occasionally one is **beneficial**',
            'Mutations happen naturally, but the rate is increased by **ionising radiation** — X-rays, gamma rays, ultraviolet — and by **chemical mutagens** such as those in tobacco smoke',
            'A mutation in a gamete can be inherited; a mutation in a body cell cannot, though it may lead to cancer',
            'Mutation is the original source of all new alleles, and so of all genetic variation'
          ]
        },
        { t: 'h', x: 'Natural selection' },
        {
          t: 'ol', x: [
            'Individuals in a population show **variation**, caused by mutations and by sexual reproduction',
            'Organisms produce **more offspring than can survive**, so there is **competition** for food, space, mates and other resources',
            'Individuals with characteristics best suited to the environment are **more likely to survive** — "survival of the fittest"',
            'The survivors **reproduce** and pass on the alleles for those advantageous characteristics',
            'Over many generations the advantageous alleles become more common in the population, and the species **evolves**'
          ]
        },
        { t: 'def', term: 'Evolution', x: 'The change in the inherited characteristics of a population over time, through natural selection, which may result in the formation of new species.' },
        { t: 'h', x: 'Antibiotic resistance — the example examiners use most' },
        {
          t: 'ol', x: [
            'In a large population of bacteria, a **random mutation** gives one bacterium resistance to an antibiotic',
            'When the antibiotic is used, the non-resistant bacteria are killed',
            'The resistant bacterium **survives** and has no competition',
            'It reproduces rapidly, passing the resistance allele on to all its offspring',
            'Soon the whole population is resistant and that antibiotic no longer works — for example MRSA'
          ]
        },
        { t: 'note', k: 'warn', x: 'The mutation is **not** caused by the antibiotic. It happens at random first; the antibiotic then selects for it. Writing that bacteria "become resistant because they are exposed to antibiotics" loses the mark.' },
        { t: 'note', k: 'exam', x: 'To slow resistance developing: only prescribe antibiotics when they are genuinely needed, and always finish the whole course so that no partly-resistant bacteria survive.' }
      ],
      terms: [
        { t: 'Variation', d: 'Differences between individuals of the same species.' },
        { t: 'Genetic variation', d: 'Variation caused by differences in the alleles inherited; it can be passed on.' },
        { t: 'Environmental variation', d: 'Variation caused by the conditions an organism has lived in; it cannot be passed on.' },
        { t: 'Continuous variation', d: 'Variation with any value in a range, controlled by many genes and the environment, e.g. height.' },
        { t: 'Discontinuous variation', d: 'Variation with distinct categories and no in-between values, controlled by one or few genes, e.g. blood group.' },
        { t: 'Mutation', d: 'A random change in the base sequence of DNA.' },
        { t: 'Mutagen', d: 'Something that increases the rate of mutation, such as ionising radiation or certain chemicals.' },
        { t: 'Natural selection', d: 'The process by which individuals with characteristics best suited to their environment survive, reproduce and pass on their alleles.' },
        { t: 'Evolution', d: 'A change in the inherited characteristics of a population over many generations.' },
        { t: 'Antibiotic resistance', d: 'The ability of bacteria to survive an antibiotic, which spreads through a population by natural selection.' }
      ],
      qs: [
        { t: 'mcq', q: 'Which is an example of discontinuous variation?', o: ['Height', 'Body mass', 'Blood group', 'Leaf length'], a: 2, e: 'Blood group falls into distinct categories with nothing in between, and is controlled by a single gene.' },
        { t: 'mcq', q: 'A mutation is:', o: ['A change caused by the environment', 'A random change in the base sequence of DNA', 'The fusion of two gametes', 'The same as natural selection'], a: 1, e: 'Mutations are random changes to DNA and are the original source of all new alleles.' },
        { t: 'mcq', q: 'Which characteristic is caused only by the environment?', o: ['Eye colour', 'A scar from an injury', 'Blood group', 'Sex'], a: 1, e: 'A scar cannot be inherited. The other three are determined entirely by alleles.' },
        { t: 'mcq', q: 'Bacteria become resistant to an antibiotic because:', o: ['The antibiotic causes them to mutate', 'Resistant bacteria arise by random mutation and then survive to reproduce', 'They learn to survive it', 'They stop reproducing'], a: 1, e: 'The mutation comes first and is random; the antibiotic then acts as the selection pressure.' },
        { t: 'mcq', q: 'Which increases the rate of mutation?', o: ['A high-protein diet', 'Ionising radiation such as X-rays', 'Regular exercise', 'Sexual reproduction'], a: 1, e: 'Ionising radiation and chemical mutagens such as those in tobacco smoke both raise the mutation rate.' },
        { t: 'saq', q: 'Explain the difference between continuous and discontinuous variation, giving one example of each.', m: 4, ms: ['Continuous variation can take any value within a range, e.g. height;', 'it is controlled by many genes and is usually affected by the environment as well;', 'discontinuous variation falls into distinct categories with no intermediates, e.g. blood group;', 'it is controlled by a single gene or a small number of genes and is not affected by the environment.'] },
        { t: 'saq', q: 'Explain how a population of insects can become resistant to an insecticide.', m: 5, ms: ['There is variation in the population, caused by random mutation;', 'a few insects happen to have an allele giving resistance to the insecticide;', 'when the insecticide is used, the non-resistant insects are killed;', 'the resistant insects survive and reproduce;', 'they pass the resistance allele on to their offspring;', 'over several generations the proportion of resistant insects increases until most of the population is resistant.'] },
        { t: 'saq', q: 'Two identical twins are brought up in different countries. Explain why they may end up with different body masses.', m: 3, ms: ['Identical twins have the same genotype / the same alleles;', 'body mass is affected by the environment as well as by genes, so it shows continuous variation;', 'differences in diet and exercise mean the twins can have different body masses despite identical genes.'] },
        { t: 'saq', q: 'Explain why patients are told to complete a full course of antibiotics.', m: 3, ms: ['Stopping early leaves some bacteria alive;', 'the ones most likely to survive are those with some resistance;', 'they then reproduce and pass on the resistance allele, so a fully resistant population can develop.'] }
      ]
    }
  ]
};
