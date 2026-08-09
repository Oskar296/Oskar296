/* Inline SVG diagrams. Each entry is raw HTML: an <svg> plus a numbered legend.
   Numbered pins on the drawing match the ordered list underneath. */
(function () {
  'use strict';

  var S = 'stroke="currentColor" fill="none"';

  /* numbered badge sitting directly on a structure */
  function pin(n, x, y) {
    return '<g><circle cx="' + x + '" cy="' + y + '" r="11" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.3"/>' +
      '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)" stroke="none">' + n + '</text></g>';
  }
  /* numbered badge sitting clear of the drawing, with a leader line to (tx,ty) */
  function pinL(n, x, y, tx, ty) {
    return '<line x1="' + x + '" y1="' + y + '" x2="' + tx + '" y2="' + ty + '" stroke="var(--accent)" stroke-width="1.1" opacity=".75"/>' + pin(n, x, y);
  }
  function label(x, y, text, anchor) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="11" fill="currentColor" stroke="none">' + text + '</text>';
  }
  function arrowDefs(id) {
    return '<defs><marker id="' + id + '" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">' +
      '<path d="M0 0 L9 4.5 L0 9 z" fill="currentColor" stroke="none"/></marker></defs>';
  }
  function legend(items) {
    return '<ol class="fig-legend">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
  }

  var D = {};

  /* ---------------- animal + plant cell ---------------- */
  D.cells =
    '<svg viewBox="0 0 660 330" role="img" aria-label="Animal cell and plant cell compared">' +
    '<text x="150" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" stroke="none">Animal cell</text>' +
    // animal cell
    '<ellipse cx="150" cy="170" rx="118" ry="95" ' + S + ' stroke-width="2.4"/>' +
    '<circle cx="150" cy="150" r="33" ' + S + ' stroke-width="1.6"/>' +
    '<circle cx="150" cy="150" r="10" fill="currentColor" opacity=".3" stroke="none"/>' +
    '<ellipse cx="86" cy="212" rx="21" ry="10" ' + S + ' transform="rotate(-22 86 212)"/>' +
    '<ellipse cx="222" cy="212" rx="21" ry="10" ' + S + ' transform="rotate(20 222 212)"/>' +
    '<g fill="currentColor" stroke="none"><circle cx="196" cy="108" r="3.6"/><circle cx="216" cy="126" r="3.6"/>' +
    '<circle cx="182" cy="132" r="3.6"/><circle cx="104" cy="118" r="3.6"/></g>' +
    pin(1, 150, 150) +
    pinL(2, 30, 92, 66, 118) +
    pin(3, 150, 236) +
    pinL(4, 34, 232, 70, 217) +
    pinL(5, 266, 72, 214, 120) +
    // plant cell
    '<text x="490" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" stroke="none">Plant cell</text>' +
    '<rect x="362" y="58" width="256" height="216" rx="6" ' + S + ' stroke-width="3.4"/>' +
    '<rect x="371" y="67" width="238" height="198" rx="4" ' + S + ' stroke-width="1.4"/>' +
    '<rect x="404" y="102" width="172" height="128" rx="16" ' + S + ' stroke-width="1.5"/>' +
    '<circle cx="466" cy="246" r="15" ' + S + ' stroke-width="1.6"/>' +
    '<circle cx="466" cy="246" r="5" fill="currentColor" opacity=".3" stroke="none"/>' +
    '<g ' + S + ' stroke-width="1.4">' +
    '<ellipse cx="387" cy="130" rx="9" ry="16" transform="rotate(-16 387 130)"/>' +
    '<ellipse cx="593" cy="160" rx="9" ry="16" transform="rotate(14 593 160)"/>' +
    '<ellipse cx="500" cy="84" rx="16" ry="9"/>' +
    '<ellipse cx="545" cy="248" rx="16" ry="9"/></g>' +
    pin(1, 466, 246) +
    pinL(6, 646, 40, 616, 60) +
    pin(7, 490, 166) +
    pinL(8, 610, 306, 552, 258) +
    '</svg>' +
    legend([
      '<b>Nucleus</b> — holds the chromosomes (DNA); controls the cell and its activities.',
      '<b>Cell membrane</b> — partially permeable; controls what enters and leaves.',
      '<b>Cytoplasm</b> — jelly where most chemical reactions happen.',
      '<b>Mitochondria</b> — site of aerobic respiration, releasing energy from glucose.',
      '<b>Ribosomes</b> — site of protein synthesis.',
      '<b>Cell wall</b> (plant only) — cellulose; supports the cell and stops it bursting.',
      '<b>Permanent vacuole</b> (plant only) — full of cell sap; keeps the cell turgid.',
      '<b>Chloroplasts</b> (plant only) — contain chlorophyll; absorb light for photosynthesis.'
    ]);

  /* ---------------- leaf cross-section ---------------- */
  D.leaf =
    '<svg viewBox="0 0 660 310" role="img" aria-label="Cross-section through a leaf">' +
    '<rect x="70" y="40" width="530" height="26" ' + S + ' stroke-width="1.6"/>' +
    label(335, 58, 'waxy cuticle + upper epidermis') +
    '<g ' + S + ' stroke-width="1.4">' +
    '<rect x="70" y="66" width="59" height="70"/><rect x="129" y="66" width="59" height="70"/><rect x="188" y="66" width="59" height="70"/>' +
    '<rect x="247" y="66" width="59" height="70"/><rect x="306" y="66" width="59" height="70"/><rect x="365" y="66" width="59" height="70"/>' +
    '<rect x="424" y="66" width="59" height="70"/><rect x="483" y="66" width="59" height="70"/><rect x="541" y="66" width="59" height="70"/></g>' +
    '<g fill="currentColor" opacity=".38" stroke="none">' +
    '<ellipse cx="90" cy="90" rx="7" ry="4"/><ellipse cx="108" cy="115" rx="7" ry="4"/><ellipse cx="152" cy="88" rx="7" ry="4"/>' +
    '<ellipse cx="212" cy="112" rx="7" ry="4"/><ellipse cx="272" cy="90" rx="7" ry="4"/><ellipse cx="330" cy="115" rx="7" ry="4"/>' +
    '<ellipse cx="390" cy="88" rx="7" ry="4"/><ellipse cx="448" cy="112" rx="7" ry="4"/><ellipse cx="508" cy="90" rx="7" ry="4"/>' +
    '<ellipse cx="566" cy="112" rx="7" ry="4"/></g>' +
    '<g ' + S + ' stroke-width="1.3">' +
    '<circle cx="100" cy="166" r="17"/><circle cx="145" cy="196" r="14"/><circle cx="193" cy="164" r="16"/>' +
    '<circle cx="246" cy="198" r="15"/><circle cx="412" cy="166" r="17"/><circle cx="460" cy="197" r="14"/>' +
    '<circle cx="510" cy="164" r="16"/><circle cx="562" cy="198" r="15"/><circle cx="358" cy="201" r="13"/></g>' +
    '<ellipse cx="316" cy="172" rx="42" ry="30" ' + S + ' stroke-width="1.6"/>' +
    '<circle cx="303" cy="164" r="9" ' + S + '/><circle cx="329" cy="181" r="9" ' + S + '/>' +
    '<rect x="70" y="228" width="530" height="24" ' + S + ' stroke-width="1.6"/>' +
    '<path d="M196 228 a16 12 0 0 0 30 0" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M438 252 a16 12 0 0 1 30 0" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M211 264 v20 M453 264 v20" ' + S + ' stroke-width="1.4" stroke-dasharray="4 3"/>' +
    label(332, 294, 'gases diffuse in and out') +
    pin(1, 44, 53) + pin(2, 44, 100) + pin(3, 44, 180) + pin(4, 316, 172) + pin(5, 44, 240) + pinL(6, 152, 268, 205, 244) +
    '</svg>' +
    legend([
      '<b>Waxy cuticle and upper epidermis</b> — transparent so light passes through; the wax cuts water loss.',
      '<b>Palisade mesophyll</b> — tall column cells packed with chloroplasts, right at the top where light is brightest.',
      '<b>Spongy mesophyll</b> — loosely packed with large air spaces, giving a big surface area for gas exchange.',
      '<b>Vascular bundle (vein)</b> — xylem (upper) brings water and mineral ions in, phloem (lower) carries sucrose away.',
      '<b>Lower epidermis</b> — thinner cuticle, and it contains most of the stomata.',
      '<b>Stoma with two guard cells</b> — opens in light to let CO₂ in and O₂ (and water vapour) out.'
    ]);

  /* ---------------- heart ---------------- */
  D.heart =
    '<svg viewBox="0 0 660 420" role="img" aria-label="Section through the human heart">' +
    arrowDefs('ahH') +
    // vessels
    '<path d="M78 132 H196" ' + S + ' stroke-width="15"/>' +
    '<path d="M78 300 H196" ' + S + ' stroke-width="15"/>' +
    '<path d="M470 132 H588" ' + S + ' stroke-width="15"/>' +
    '<path d="M470 300 H588" ' + S + ' stroke-width="15"/>' +
    '<path d="M110 152 h58" ' + S + ' stroke-width="2" marker-end="url(#ahH)"/>' +
    '<path d="M168 320 h-58" ' + S + ' stroke-width="2" marker-end="url(#ahH)"/>' +
    '<path d="M556 152 h-58" ' + S + ' stroke-width="2" marker-end="url(#ahH)"/>' +
    '<path d="M498 320 h58" ' + S + ' stroke-width="2" marker-end="url(#ahH)"/>' +
    // outline
    '<path d="M330 58 C 228 58 176 124 176 208 C 176 292 244 358 330 374 C 416 358 484 292 484 208 C 484 124 432 58 330 58 Z" ' + S + ' stroke-width="2.6"/>' +
    // thick left ventricle wall vs thin right
    '<path d="M180 220 C 186 292 250 348 328 366" ' + S + ' stroke-width="8" opacity=".22"/>' +
    '<path d="M480 220 C 474 292 410 348 332 366" ' + S + ' stroke-width="18" opacity=".22"/>' +
    // septum and chamber divisions
    '<path d="M330 70 V 370" ' + S + ' stroke-width="3"/>' +
    '<path d="M196 196 H 322 M338 196 H 466" ' + S + ' stroke-width="1.8"/>' +
    // valves
    '<path d="M244 196 l14 16 l14 -16" ' + S + ' stroke-width="2.2"/>' +
    '<path d="M388 196 l14 16 l14 -16" ' + S + ' stroke-width="2.2"/>' +
    label(258, 140, 'right atrium') + label(402, 140, 'left atrium') +
    label(256, 282, 'right ventricle') + label(404, 282, 'left ventricle') +
    pinL(1, 96, 96, 130, 124) +
    pinL(2, 96, 344, 130, 308) +
    pinL(3, 566, 96, 532, 124) +
    pinL(4, 566, 344, 532, 308) +
    pinL(5, 214, 240, 250, 206) +
    pinL(6, 446, 240, 410, 206) +
    pinL(7, 540, 240, 478, 250) +
    pinL(8, 330, 32, 330, 68) +
    '</svg>' +
    legend([
      '<b>Vena cava</b> — brings deoxygenated blood from the body into the right atrium.',
      '<b>Pulmonary artery</b> — carries deoxygenated blood from the right ventricle to the lungs.',
      '<b>Pulmonary vein</b> — brings oxygenated blood from the lungs into the left atrium.',
      '<b>Aorta</b> — carries oxygenated blood from the left ventricle to the whole body.',
      '<b>Right atrioventricular valve</b> — stops backflow into the right atrium when the ventricle contracts.',
      '<b>Left atrioventricular valve</b> — the same job on the left. Semilunar valves sit in the artery exits.',
      '<b>Thicker left ventricle wall</b> — more muscle, to push blood all round the body at high pressure.',
      '<b>Septum</b> — keeps oxygenated and deoxygenated blood completely separate (double circulation).'
    ]);

  /* ---------------- alveolus ---------------- */
  D.alveolus =
    '<svg viewBox="0 0 620 340" role="img" aria-label="Gas exchange at an alveolus">' +
    arrowDefs('ahA') +
    '<path d="M40 52 C 100 44 150 62 186 92" ' + S + ' stroke-width="10"/>' +
    label(96, 36, 'bronchiole', 'start') +
    // capillary wrapping the alveolus
    '<path d="M352 24 C 428 82 428 218 352 288" ' + S + ' stroke-width="30" opacity=".16"/>' +
    '<path d="M352 24 C 428 82 428 218 352 288" ' + S + ' stroke-width="1.5"/>' +
    '<g ' + S + ' stroke-width="1.4"><ellipse cx="386" cy="76" rx="10" ry="7"/><ellipse cx="398" cy="152" rx="10" ry="7"/><ellipse cx="382" cy="234" rx="10" ry="7"/></g>' +
    // alveoli
    '<circle cx="240" cy="150" r="92" ' + S + ' stroke-width="2.4"/>' +
    '<circle cx="146" cy="268" r="46" ' + S + ' stroke-width="2.2"/>' +
    '<circle cx="272" cy="286" r="38" ' + S + ' stroke-width="2.2"/>' +
    // gas arrows across the shared wall
    '<path d="M296 106 h72" ' + S + ' stroke-width="2.2" marker-end="url(#ahA)"/>' +
    '<path d="M368 196 h-72" ' + S + ' stroke-width="2.2" marker-end="url(#ahA)"/>' +
    label(332, 96, 'O₂') + label(332, 216, 'CO₂') +
    pin(1, 240, 150) +
    pinL(2, 500, 60, 412, 96) +
    pinL(3, 496, 244, 396, 232) +
    pinL(4, 132, 96, 172, 116) +
    pinL(5, 176, 214, 214, 192) +
    '</svg>' +
    legend([
      '<b>Alveolus</b> — millions of them give a huge surface area, about 70 m² in total.',
      '<b>Capillary</b> — blood flow keeps the concentration gradient steep by removing oxygen constantly.',
      '<b>Red blood cell</b> — carries the oxygen away as oxyhaemoglobin.',
      '<b>Wall one cell thick</b> — the alveolus and capillary walls together make a very short diffusion distance.',
      '<b>Moist lining</b> — gases dissolve first, which is required for diffusion across the surface.'
    ]);

  /* ---------------- nephron ---------------- */
  D.nephron =
    '<svg viewBox="0 0 660 360" role="img" aria-label="A nephron in the kidney">' +
    arrowDefs('ahN') +
    // arterioles
    '<path d="M22 78 H 74" ' + S + ' stroke-width="11"/>' +
    '<path d="M22 116 H 74" ' + S + ' stroke-width="5"/>' +
    // Bowman's capsule and glomerulus
    '<circle cx="118" cy="98" r="46" ' + S + ' stroke-width="2.4"/>' +
    '<path d="M118 74 c -20 6 -22 34 0 44 c 22 -10 20 -38 0 -44 M100 88 h36 M102 106 h32" ' + S + ' stroke-width="1.5"/>' +
    // proximal convoluted tubule
    '<path d="M164 98 c 22 -26 40 26 62 0 c 22 -26 40 26 62 0" ' + S + ' stroke-width="9"/>' +
    // loop of Henle
    '<path d="M288 98 V 250 a 32 32 0 0 0 64 0 V 98" ' + S + ' stroke-width="9"/>' +
    // distal convoluted tubule
    '<path d="M352 98 c 22 -26 40 26 62 0 c 20 -24 38 24 58 0" ' + S + ' stroke-width="9"/>' +
    // collecting duct
    '<path d="M472 98 V 306" ' + S + ' stroke-width="13"/>' +
    '<path d="M472 306 h 66" ' + S + ' stroke-width="2" marker-end="url(#ahN)"/>' +
    label(548, 310, 'to ureter → bladder', 'start') +
    pin(1, 118, 98) +
    pinL(2, 40, 32, 52, 70) +
    pinL(3, 190, 36, 152, 64) +
    pinL(4, 258, 40, 250, 84) +
    pinL(5, 320, 306, 320, 278) +
    pinL(6, 412, 40, 412, 84) +
    pinL(7, 542, 170, 480, 170) +
    '</svg>' +
    legend([
      '<b>Glomerulus</b> — a knot of capillaries under high pressure.',
      '<b>Afferent arteriole</b> (wide, in) and <b>efferent arteriole</b> (narrow, out) — the difference in width is what raises the pressure.',
      '<b>Bowman\'s capsule — ultrafiltration</b>: water, glucose, ions and urea are forced out. Blood cells and plasma proteins are too big and stay behind.',
      '<b>First (proximal) convoluted tubule — selective reabsorption</b>: all the glucose, plus some water and ions, are taken back into the blood.',
      '<b>Loop of Henlé</b> — more water is reabsorbed here.',
      '<b>Second (distal) convoluted tubule</b> — the balance of ions is fine-tuned.',
      '<b>Collecting duct</b> — final water adjustment, controlled by ADH. What is left is urine: water, urea and excess ions.'
    ]);

  /* ---------------- reflex arc ---------------- */
  D.reflex =
    '<svg viewBox="0 0 660 270" role="img" aria-label="The reflex arc">' +
    arrowDefs('ahR') +
    '<rect x="250" y="30" width="140" height="210" rx="18" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M272 58 q52 76 0 154 M368 58 q-52 76 0 154" ' + S + ' stroke-width="1.4" opacity=".45"/>' +
    '<circle cx="320" cy="135" r="32" ' + S + ' stroke-width="1.6"/>' +
    label(320, 139, 'relay') +
    '<circle cx="76" cy="62" r="28" ' + S + ' stroke-width="1.8"/>' + label(76, 66, 'skin') +
    '<circle cx="76" cy="214" r="28" ' + S + ' stroke-width="1.8"/>' + label(76, 218, 'muscle') +
    '<path d="M106 70 q80 22 148 46" ' + S + ' stroke-width="2.6" marker-end="url(#ahR)"/>' +
    '<path d="M250 178 q-80 26 -146 30" ' + S + ' stroke-width="2.6" marker-end="url(#ahR)"/>' +
    '<circle cx="288" cy="112" r="5" fill="currentColor" stroke="none"/>' +
    '<circle cx="288" cy="160" r="5" fill="currentColor" stroke="none"/>' +
    '<text x="424" y="74" font-size="12" font-weight="700" fill="currentColor" stroke="none">stimulus → receptor →</text>' +
    '<text x="424" y="96" font-size="12" font-weight="700" fill="currentColor" stroke="none">sensory neurone → relay →</text>' +
    '<text x="424" y="118" font-size="12" font-weight="700" fill="currentColor" stroke="none">motor neurone → effector →</text>' +
    '<text x="424" y="140" font-size="12" font-weight="700" fill="currentColor" stroke="none">response</text>' +
    pin(1, 76, 62) + pinL(2, 168, 62, 178, 88) + pinL(3, 234, 96, 280, 110) + pin(4, 320, 135) +
    pinL(5, 168, 226, 180, 202) + pin(6, 76, 214) +
    '</svg>' +
    legend([
      '<b>Receptor</b> in the skin detects the stimulus (heat, pressure).',
      '<b>Sensory neurone</b> carries the impulse to the spinal cord.',
      '<b>Synapse</b> — a tiny gap; the impulse crosses as a chemical neurotransmitter, which only travels one way.',
      '<b>Relay neurone</b> in the spinal cord passes the impulse straight across — the brain is not needed, so it is fast.',
      '<b>Motor neurone</b> carries the impulse out to the effector.',
      '<b>Effector</b> (a muscle or gland) produces the response, e.g. the arm pulls away.'
    ]);

  /* ---------------- digestive system ---------------- */
  D.gut =
    '<svg viewBox="0 0 620 430" role="img" aria-label="The human alimentary canal">' +
    // mouth and oesophagus
    '<ellipse cx="256" cy="40" rx="40" ry="24" ' + S + ' stroke-width="2"/>' +
    '<path d="M256 64 V 146" ' + S + ' stroke-width="11"/>' +
    // liver and gall bladder
    '<path d="M74 152 C 130 140 176 154 182 172 C 172 204 112 218 78 194 Z" ' + S + ' stroke-width="2"/>' +
    '<circle cx="150" cy="216" r="13" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M150 203 V 196" ' + S + ' stroke-width="1.5"/>' +
    // stomach
    '<path d="M258 146 C 200 154 176 202 202 234 C 232 268 292 250 296 208 C 298 182 282 164 258 146 Z" ' + S + ' stroke-width="2.2"/>' +
    // pancreas
    '<path d="M306 208 C 352 200 392 210 410 222 C 380 234 330 230 306 222 Z" ' + S + ' stroke-width="2"/>' +
    // large intestine frame
    '<path d="M392 356 V 272 H 192 V 356" ' + S + ' stroke-width="14" stroke-linejoin="round"/>' +
    '<path d="M192 356 C 200 386 240 396 286 392 V 416" ' + S + ' stroke-width="12"/>' +
    // small intestine coils inside the frame
    '<path d="M292 234 C 330 250 336 276 306 288 C 258 306 246 330 292 340 C 330 348 336 318 296 314 C 250 310 244 344 296 352 C 330 356 344 336 330 322" ' + S + ' stroke-width="8"/>' +
    pinL(1, 172, 34, 218, 40) +
    pinL(2, 190, 106, 250, 108) +
    pin(3, 240, 196) +
    pin(4, 122, 176) +
    pinL(5, 116, 252, 142, 226) +
    pinL(6, 460, 216, 412, 219) +
    pin(7, 246, 330) +
    pinL(8, 456, 300, 396, 300) +
    pinL(9, 212, 412, 274, 404) +
    '</svg>' +
    legend([
      '<b>Mouth</b> — teeth break food up mechanically; salivary amylase starts starch digestion.',
      '<b>Oesophagus</b> — peristalsis (waves of circular muscle) pushes the bolus down.',
      '<b>Stomach</b> — churns food; protease (pepsin) works in hydrochloric acid at about pH 2, which also kills bacteria.',
      '<b>Liver</b> — makes bile, which emulsifies fats and neutralises stomach acid.',
      '<b>Gall bladder</b> — stores bile and releases it into the duodenum.',
      '<b>Pancreas</b> — releases amylase, protease and lipase into the small intestine.',
      '<b>Small intestine</b> — the duodenum digests, the ileum absorbs through villi into the blood and lacteals.',
      '<b>Large intestine (colon)</b> — absorbs water from the remaining material.',
      '<b>Rectum and anus</b> — faeces are stored, then egested.'
    ]);

  /* ---------------- flower ---------------- */
  D.flower =
    '<svg viewBox="0 0 660 380" role="img" aria-label="Structure of an insect-pollinated flower">' +
    // petals
    '<path d="M296 292 C 224 306 152 280 128 236 C 182 206 262 234 296 292 Z" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M364 292 C 436 306 508 280 532 236 C 478 206 398 234 364 292 Z" ' + S + ' stroke-width="1.8"/>' +
    // sepals
    '<path d="M302 302 C 250 326 200 322 170 306" ' + S + ' stroke-width="1.8"/>' +
    '<path d="M358 302 C 410 326 460 322 490 306" ' + S + ' stroke-width="1.8"/>' +
    // stem
    '<path d="M330 302 V 356" ' + S + ' stroke-width="9"/>' +
    // ovary and ovules
    '<ellipse cx="330" cy="278" rx="36" ry="27" ' + S + ' stroke-width="2.2"/>' +
    '<circle cx="317" cy="281" r="5.5" fill="currentColor" opacity=".55" stroke="none"/>' +
    '<circle cx="342" cy="284" r="5.5" fill="currentColor" opacity=".55" stroke="none"/>' +
    // style and stigma
    '<path d="M330 251 V 156" ' + S + ' stroke-width="4"/>' +
    '<ellipse cx="330" cy="148" rx="19" ry="10" ' + S + ' stroke-width="2"/>' +
    // stamens
    '<path d="M296 284 C 256 250 246 196 250 158" ' + S + ' stroke-width="3"/>' +
    '<path d="M364 284 C 404 250 414 196 410 158" ' + S + ' stroke-width="3"/>' +
    '<ellipse cx="247" cy="146" rx="17" ry="10" ' + S + ' stroke-width="2" transform="rotate(-22 247 146)"/>' +
    '<ellipse cx="413" cy="146" rx="17" ry="10" ' + S + ' stroke-width="2" transform="rotate(22 413 146)"/>' +
    pinL(1, 330, 104, 330, 136) +
    pinL(2, 386, 196, 336, 198) +
    pin(3, 330, 272) +
    pinL(4, 262, 322, 312, 286) +
    pinL(5, 200, 108, 236, 136) +
    pinL(6, 208, 214, 252, 216) +
    pinL(7, 132, 300, 176, 268) +
    pinL(8, 152, 348, 208, 318) +
    '</svg>' +
    legend([
      '<b>Stigma</b> — sticky, so pollen grains land and hold on.',
      '<b>Style</b> — the pollen tube grows down through it to the ovary.',
      '<b>Ovary</b> — contains the ovules; it becomes the fruit after fertilisation.',
      '<b>Ovule</b> — contains the female gamete; it becomes the seed.',
      '<b>Anther</b> — makes and releases pollen grains (male gametes).',
      '<b>Filament</b> — holds the anther up. Anther + filament = <b>stamen</b>.',
      '<b>Petal</b> — large, bright and scented in insect-pollinated flowers, with nectaries at the base.',
      '<b>Sepal</b> — protected the flower while it was a bud.'
    ]);

  /* ---------------- DNA / protein synthesis ---------------- */
  D.dna =
    '<svg viewBox="0 0 620 300" role="img" aria-label="From gene to protein">' +
    arrowDefs('ahD') +
    '<path d="M62 40 C 112 70 112 110 62 140 C 12 170 12 210 62 240" ' + S + ' stroke-width="2.4"/>' +
    '<path d="M142 40 C 92 70 92 110 142 140 C 192 170 192 210 142 240" ' + S + ' stroke-width="2.4"/>' +
    '<g ' + S + ' stroke-width="1.4"><path d="M74 62 h56 M66 92 h72 M66 122 h72 M74 152 h56 M66 182 h72 M66 212 h72"/></g>' +
    label(102, 272, 'DNA in the nucleus') +
    '<path d="M198 140 h56" ' + S + ' stroke-width="2" marker-end="url(#ahD)"/>' +
    label(226, 126, 'copied') +
    '<path d="M274 140 H 384" ' + S + ' stroke-width="2.4"/>' +
    '<g ' + S + ' stroke-width="1.4"><path d="M286 130 v20 M304 130 v20 M322 130 v20 M340 130 v20 M358 130 v20 M376 130 v20"/></g>' +
    label(329, 174, 'mRNA') +
    '<ellipse cx="424" cy="140" rx="34" ry="26" ' + S + ' stroke-width="2"/>' +
    label(424, 190, 'ribosome') +
    '<g ' + S + ' stroke-width="1.6"><circle cx="492" cy="120" r="12"/><circle cx="518" cy="140" r="12"/><circle cx="544" cy="118" r="12"/><circle cx="570" cy="140" r="12"/></g>' +
    '<path d="M502 128 l8 6 M528 134 l8 -6 M554 126 l8 6" ' + S + ' stroke-width="1.4"/>' +
    label(531, 182, 'protein') +
    pinL(1, 102, 22, 102, 48) + pinL(2, 329, 100, 329, 128) + pin(3, 424, 140) + pinL(4, 531, 74, 531, 104) +
    '</svg>' +
    legend([
      '<b>Gene</b> — a length of DNA coding for one protein. DNA is a double helix of two strands; the bases pair A–T and C–G.',
      '<b>mRNA</b> — a copy of the gene made in the nucleus, small enough to leave through a nuclear pore.',
      '<b>Ribosome</b> — reads the mRNA three bases at a time; each triplet codes for one amino acid.',
      '<b>Protein</b> — the amino acids join in the coded order and the chain folds into a specific shape.'
    ]);

  window.DIAGRAMS = D;
})();
