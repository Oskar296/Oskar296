/* Exam technique, map and graph skills, and Paper 4 fieldwork. */

GEO.skills = [

  {
    id: 'papers',
    title: 'The papers',
    blurb: 'What each paper asks for and how the marks are split.',
    sections: [
      {
        h: 'Structure of the qualification',
        blocks: [
          { p: 'This site follows the syllabus for **examination in 2027, 2028 and 2029**. It is a substantial rewrite of the previous version, so older textbooks and past papers are organised differently.' },
          { table: {
            head: ['Paper', 'Length', 'Marks', 'What it is'],
            rows: [
              ['1 Physical geography', '1 h 45', '75', 'Rivers, coasts, ecosystems, tectonic hazards and climate change'],
              ['2 Human geography', '1 h 45', '75', 'Populations, towns and cities, development, economies and resource provision'],
              ['3 Coursework', '—', '—', 'A school-assessed fieldwork investigation. Taken instead of Paper 4.'],
              ['4 Alternative to Coursework', '—', '—', 'A written paper testing fieldwork skills without doing fieldwork. Taken instead of Paper 3.']
            ]
          } },
          { p: 'All candidates take **three components**: Paper 1, Paper 2, and then either Paper 3 or Paper 4.' },
          { h3: 'What changed from the old syllabus' },
          { ul: [
            'The three themes (Population and settlement, The natural environment, Economic development) are gone, replaced by **ten topics**',
            'Papers 1 and 2 are now split **physical / human**, rather than one themes paper and one skills paper',
            'The separate **Geographical Skills paper has been removed**. Map, graph and data skills are still worth learning, because they are examined within the two content papers',
            '**Climate change is new content**, and sustainability runs more strongly through the whole syllabus'
          ] },
          { tip: 'Cambridge revises syllabuses periodically and the detail below was assembled without access to the official PDF. Check paper timings, marks and the sub-topic breakdown against the syllabus document for your own exam year before relying on them.' }
        ]
      },
      {
        h: 'How marks are actually earned',
        blocks: [
          { ul: [
            'The **number of marks tells you how many points to make**. A 4-mark question wants four developed points, not one point written four ways.',
            'Case study questions carry named-example marks. A generic answer with no place names is capped, however good the geography.',
            'Where a question says *using evidence from Fig. 2*, marks depend on quoting figures, place names or grid references from that figure.',
            'Extended answers are usually marked in levels. To reach the top level you need detail, a named example, and a clear structure, not just more sentences.',
            'Statistics are worth memorising in small numbers: two or three figures per case study is plenty and is what lifts an answer above the middle band.'
          ] }
        ]
      }
    ]
  },

  {
    id: 'command-words',
    title: 'Command words',
    blurb: 'What each instruction is actually asking you to do.',
    sections: [
      {
        h: 'The command words that matter most',
        blocks: [
          { table: {
            head: ['Command word', 'What it wants', 'What loses marks'],
            rows: [
              ['**Describe**', 'Say what you can see: the pattern, the trend, the figures. No reasons needed.', 'Explaining instead. You get no credit for reasons in a describe question.'],
              ['**Explain** / **Give reasons for**', 'Say **why**. Every point needs a because, so that, or which means.', 'Describing. A list of features with no causes scores almost nothing.'],
              ['**Suggest**', 'Give a plausible reason for something you have not been taught directly. Apply your knowledge to the resource.', 'Saying "I do not know". A sensible geographical guess is credited.'],
              ['**Compare**', 'Talk about both things in the same sentence, using comparative words: higher, steeper, more than.', 'Writing a paragraph on each separately with no linking words.'],
              ['**Contrast**', 'State the differences only.', 'Listing similarities.'],
              ['**Identify / Name / State**', 'One or two words. No explanation wanted.', 'Writing a paragraph and wasting time.'],
              ['**Define**', 'Give the precise meaning, with units where they apply.', 'Giving an example instead of a definition.'],
              ['**To what extent** / **How far do you agree**', 'Argue both sides, then reach a judgement and justify it.', 'Giving only one side, or giving both sides with no conclusion.'],
              ['**Evaluate**', 'Weigh up strengths against weaknesses and decide how successful something is.', 'Listing advantages and disadvantages without a verdict.'],
              ['**Using evidence from Fig. X**', 'Quote directly from the resource: figures, names, grid references.', 'Answering purely from memory and ignoring the figure.']
            ]
          } },
          { tip: 'Underline the command word and the number of marks before you write. Most lost marks in this subject come from answering a different question to the one asked.' }
        ]
      },
      {
        h: 'A structure for extended answers',
        blocks: [
          { ol: [
            'Name the place in the first sentence, with the country. "In Dharavi, Mumbai, India..."',
            'Make a point.',
            'Develop it with a figure, a date or a specific detail.',
            'Link it back to the question wording.',
            'Repeat for three or four points, covering both sides if the question demands it.',
            'Finish with a judgement if the command word asks for one.'
          ] },
          { p: 'This is often taught as **point, evidence, explain**. The evidence step is the one candidates skip, and it is the one that separates the top band from the middle.' }
        ]
      }
    ]
  },

  {
    id: 'maps',
    title: 'Map skills',
    blurb: 'Grid references, scale, direction, contours and cross-sections.',
    sections: [
      {
        h: 'Grid references',
        blocks: [
          { p: 'Always read **eastings first, then northings**: along the corridor, then up the stairs. Eastings are the numbers along the top and bottom; northings run up the sides.' },
          { ol: [
            '**Four-figure** reference identifies a whole grid square, normally one kilometre across. Take the easting of the line on the **left** of the square, then the northing of the line at the **bottom**. Square 3421 means easting 34, northing 21.',
            '**Six-figure** reference identifies a point to the nearest 100 m. Take the four-figure reference, then estimate tenths across and up. A point four tenths across and seven tenths up square 3421 is 344217.'
          ] },
          { tip: 'Never put a comma or a space in a grid reference, and never reverse the order. Writing 217344 instead of 344217 loses the mark outright.' }
        ]
      },
      {
        h: 'Scale and distance',
        blocks: [
          { table: {
            head: ['Scale', 'Grid square', 'On the map', 'Common use'],
            rows: [
              ['1:25 000', '1 km', '4 cm = 1 km', 'Detailed walking maps; individual field boundaries shown'],
              ['1:50 000', '1 km', '2 cm = 1 km', 'The usual exam extract; covers a wider area']
            ]
          } },
          { ul: [
            'For a **straight-line** distance, measure in centimetres with a ruler and convert using the scale.',
            'For a **curved** distance such as a road or river, lay the straight edge of a piece of paper along it, marking each bend and pivoting the paper, then measure the total length against the scale line.',
            'Always give the unit, and round sensibly. An answer of "3.5 km" is expected; "3.4972 km" suggests you have misunderstood the precision available.'
          ] }
        ]
      },
      {
        h: 'Direction',
        blocks: [
          { p: 'Direction is given **from** the first place **to** the second, so read the question carefully. Use the eight or sixteen compass points unless a bearing is asked for.' },
          { p: 'A **bearing** is measured clockwise from north in degrees, always written with three figures: 045°, 135°, 270°.' },
          { p: 'Remember that grid north on the map and magnetic north differ slightly, which the map margin states.' }
        ]
      },
      {
        h: 'Contours and relief',
        blocks: [
          { defs: [
            ['Contour', 'A line joining all points of equal height above sea level.'],
            ['Contour interval', 'The height difference between one contour and the next, stated in the key, often 10 m.'],
            ['Spot height', 'A dot with a number giving the exact height at that point.'],
            ['Triangulation pillar', 'A small triangle with a height, marking a surveyed summit.']
          ] },
          { ul: [
            'Contours **close together** mean a **steep** slope; **far apart** means a **gentle** slope',
            'Evenly spaced contours mean a uniform slope',
            'Contours spaced widely at the top and narrowly at the bottom show a **convex** slope',
            'Contours narrow at the top and wide at the bottom show a **concave** slope',
            'Contours forming a **V pointing uphill** mark a valley, with a river usually in the bottom',
            'Contours forming a **V pointing downhill** mark a spur',
            'Concentric closed rings mark a **hill**, and a flat-topped area with steep sides is a **plateau**',
            'An **escarpment** has a steep scarp slope on one side and a gentle dip slope on the other',
            'A dip in a ridge between two summits is a **col**'
          ] },
          { h3: 'Describing relief for marks' },
          { p: 'A full answer covers **height, steepness and the shape of the land**, with figures quoted from the map. For example: "The land in the north-east is high, rising above 320 m at the triangulation pillar in 3418. Slopes are steep, with contours very close together on the western side. The south-west is low and flat, below 60 m, and is crossed by a wide river valley."' }
        ]
      },
      {
        h: 'Cross-sections',
        blocks: [
          { ol: [
            'Lay the straight edge of a strip of paper between the two given points',
            'Mark the start and end, then mark and label every contour the edge crosses, plus rivers and roads if asked',
            'Draw axes: horizontal distance to the map scale, vertical height covering the range of values',
            'Transfer each mark from the paper to the correct height and plot a dot',
            'Join the dots with a smooth curve, not straight lines between points',
            'Label the axes with units, and annotate features such as the river and the summit'
          ] },
          { p: 'The vertical scale is nearly always exaggerated compared with the horizontal, which makes slopes look steeper than they are. Say so if asked to comment.' }
        ]
      },
      {
        h: 'Reading human features from a map',
        blocks: [
          { ul: [
            '**Settlement shape**: nucleated (clustered), linear (strung along a road or valley) or dispersed (scattered farms)',
            '**Site evidence**: a settlement inside a meander suggests a defensive site; at a crossing point suggests a bridging point; on a spring line suggests a wet point site',
            '**Function**: a large church, market square and converging roads suggest a market town; a pier, marina and caravan sites suggest a resort',
            '**Communications**: count roads and railways, note where routes converge, and look for gaps and passes through high ground',
            '**Land use**: contours plus symbols tell you whether land is forested, marshy, arable or built up'
          ] },
          { tip: 'When asked for evidence, always give a grid reference with each point. "There is a tourist function, shown by the campsite at 3619 and the picnic site at 3520" earns far more than a general statement.' }
        ]
      }
    ]
  },

  {
    id: 'graphs',
    title: 'Graphs and data',
    blurb: 'Choosing the right graph, describing trends and doing the calculations.',
    sections: [
      {
        h: 'Which graph for which data',
        blocks: [
          { table: {
            head: ['Graph', 'Use it for', 'Example'],
            rows: [
              ['Line graph', 'Continuous change over time', 'Population growth, temperature through the year'],
              ['Bar graph', 'Comparing separate categories', 'Rainfall by month, employment by sector'],
              ['Histogram', 'Continuous data grouped into classes, with bars touching', 'Pebble sizes on a beach'],
              ['Pie chart', 'Proportions of a whole', 'Employment structure, energy mix'],
              ['Scatter graph', 'Looking for a relationship between two variables', 'GNI per capita against life expectancy'],
              ['Isoline map', 'Joining points of equal value', 'Contours, isotherms, isobars'],
              ['Choropleth map', 'Shading areas by density or rate', 'Population density by region'],
              ['Flow line', 'Movement, with line width showing volume', 'Traffic flows, migration'],
              ['Located bar', 'Bars drawn at the place they refer to', 'Rainfall at several weather stations'],
              ['Kite diagram', 'Species abundance across a transect', 'Plants across a sand dune'],
              ['Population pyramid', 'Age and sex structure', 'Comparing a youthful and an ageing country'],
              ['Rose diagram', 'Directional data', 'Wind direction frequency']
            ]
          } }
        ]
      },
      {
        h: 'Describing a trend',
        blocks: [
          { ol: [
            'State the **overall trend** first: rising, falling, fluctuating, or steady.',
            'Quote **figures with units** at the start and the end, and give the change between them.',
            'Identify the **highest and lowest** values and when they occurred.',
            'Point out any **anomaly** or sudden change, and note where the rate of change alters.',
            'If two lines are shown, compare them directly.'
          ] },
          { p: 'A model sentence: "Rainfall rises steadily from 25 mm in January to a peak of 210 mm in July, an increase of 185 mm, then falls sharply to 40 mm by December. The exception is a small dip to 90 mm in May."' }
        ]
      },
      {
        h: 'Calculations you should be able to do',
        blocks: [
          { ul: [
            '**Mean**: add the values and divide by how many there are',
            '**Median**: put the values in order and take the middle one; with an even number, take the mean of the middle two',
            '**Mode**: the value that occurs most often',
            '**Range**: highest value minus lowest value',
            '**Interquartile range**: the value a quarter of the way up minus the value three quarters of the way up, which ignores extreme outliers',
            '**Percentage**: part divided by total, multiplied by 100',
            '**Percentage change**: (new minus old) divided by old, multiplied by 100',
            '**Density**: total divided by area',
            '**Pie chart angle**: percentage divided by 100, multiplied by 360'
          ] },
          { tip: 'Show your working. If the final number is wrong but the method is right, method marks are still available.' }
        ]
      },
      {
        h: 'Reading photographs',
        blocks: [
          { ul: [
            'Divide the photo into **foreground, middle ground and background**, and describe systematically rather than jumping about',
            'Use compass directions or left, centre and right consistently',
            'For a landscape, comment on relief, vegetation, water and any evidence of human activity',
            'For an urban photo, comment on building height, age, density, condition, land use and traffic',
            'Look for evidence of **processes**: a wave-cut notch, slumping, litter, erosion beside a path, scaffolding, for-sale boards',
            'If asked to draw a labelled sketch, keep the outline simple and spend your effort on accurate **labels and annotations**, which carry the marks'
          ] }
        ]
      }
    ]
  },

  {
    id: 'fieldwork',
    title: 'Fieldwork (Paper 4)',
    blurb: 'Hypotheses, sampling, data collection methods and evaluation.',
    sections: [
      {
        h: 'The shape of an investigation',
        blocks: [
          { ol: [
            'Write a **hypothesis**: a statement that can be tested and proved right or wrong, such as "River velocity increases downstream."',
            'Plan the **data collection**: what, where, when, how often, and with what equipment.',
            'Carry out a **risk assessment**.',
            'Collect **primary data** yourself in the field, and gather **secondary data** from maps, census figures and records.',
            'Present the data using appropriate graphs and maps.',
            'Analyse and describe the results, using figures.',
            '**Conclude** by stating whether the hypothesis is supported, partly supported or rejected, with evidence.',
            '**Evaluate**: what limited the results and how would you improve the method.'
          ] },
          { defs: [
            ['Primary data', 'Data you collect yourself, first hand, in the field.'],
            ['Secondary data', 'Data collected by somebody else, such as census statistics, maps, old photographs or rainfall records.']
          ] }
        ]
      },
      {
        h: 'Sampling',
        blocks: [
          { p: 'You cannot measure everything, so you take a sample. The method must be justified.' },
          { table: {
            head: ['Method', 'How', 'Strength', 'Weakness'],
            rows: [
              ['Random', 'Sites chosen by random numbers', 'No bias from the researcher', 'May cluster and miss part of the area'],
              ['Systematic', 'At regular intervals, such as every 50 m', 'Even coverage and easy to organise', 'Can miss a pattern that repeats at the same interval'],
              ['Stratified', 'The area is divided into groups and each is sampled in proportion to its size', 'Represents all parts of a varied area', 'You need to know the make-up of the area beforehand']
            ]
          } },
          { p: 'A larger sample gives more reliable results but takes longer. Say this explicitly in an evaluation question.' }
        ]
      },
      {
        h: 'River fieldwork',
        blocks: [
          { table: {
            head: ['Measurement', 'Method', 'Watch out for'],
            rows: [
              ['Channel width', 'Tape measure from bank to bank at the water surface', 'Keep the tape taut and horizontal'],
              ['Depth', 'Metre rule at regular intervals across the channel, then take a mean', 'Push the rule to the bed, not into soft silt; do not press down'],
              ['Velocity', 'Time a float over a set distance, repeat three times and take a mean, or use a flow meter', 'The float catches the wind; a flow meter is more accurate'],
              ['Bedload size', 'Measure the long axis of pebbles chosen randomly with callipers', 'Avoid picking the biggest ones by eye, which biases the sample'],
              ['Bedload shape', 'Power\'s roundness index, comparing each pebble against a chart', 'It is subjective, so the same person should judge all of them'],
              ['Gradient', 'Clinometer between two ranging poles a fixed distance apart', 'Poles must be vertical and read at the same height']
            ]
          } },
          { p: 'From width and depth you can calculate **cross-sectional area**, and area multiplied by velocity gives **discharge** in cubic metres per second.' }
        ]
      },
      {
        h: 'Coastal fieldwork',
        blocks: [
          { ul: [
            '**Beach profile**: two ranging poles and a clinometer, measuring the angle of each section of slope from the sea to the back of the beach',
            '**Sediment size and roundness**: callipers and a roundness chart, sampled at intervals up the beach or along it',
            '**Longshore drift**: time a floating object over a set distance parallel to the shore, or measure the difference in beach height on either side of a groyne',
            '**Wave frequency**: count the waves breaking in one minute, repeated several times',
            '**Land use and management survey**: map the defences present and assess their condition'
          ] }
        ]
      },
      {
        h: 'Urban and settlement fieldwork',
        blocks: [
          { ul: [
            '**Land use mapping**: colour a base map by category to show zones',
            '**Pedestrian and traffic counts**: count for a fixed time at fixed points, repeated at the same times of day',
            '**Environmental quality survey**: a bipolar scale, scoring factors such as litter, noise, greenery and building condition from -3 to +3',
            '**Questionnaires**: closed questions are quick to analyse, open questions give more detail; keep them short and ask a range of people',
            '**Building height, age and condition** surveys along a transect from the centre outwards',
            '**Sphere of influence**: ask shoppers their postcode or home town and plot the results',
            '**Pedestrian counts and land values** to locate the peak land value intersection in the CBD'
          ] }
        ]
      },
      {
        h: 'Evaluation: the marks people leave behind',
        blocks: [
          { p: 'Evaluation questions ask what was **wrong** with the method and how you would **improve** it. Give a specific problem, say why it matters, then give a matching improvement.' },
          { ul: [
            'The sample was small, so results may not be representative. Improvement: measure at more sites.',
            'Data were collected on one day in one season, so they may be unusual. Improvement: repeat at different times of year.',
            'Measurements such as pebble roundness are subjective. Improvement: one person judges all of them, or use a photograph and chart.',
            'Weather on the day, such as heavy rain, affected river discharge or pedestrian counts. Improvement: repeat in typical conditions.',
            'Questionnaire respondents were all in one place at one time, so age groups were unbalanced. Improvement: sample at several times and locations.',
            'Equipment error: a float blown by wind, a tape sagging, a rule pushed into silt. Improvement: use a flow meter, keep the tape taut, take repeat readings.'
          ] },
          { tip: 'A conclusion must answer the hypothesis directly and use figures. "The hypothesis is partly supported: velocity rose from 0.21 to 0.48 m/s between sites 1 and 5, but fell at site 3, where the channel widened."' }
        ]
      }
    ]
  }

];
