/* Inline SVG diagrams for the concepts that are hard to learn from prose alone.
   Colours come from CSS custom properties so both themes work; `points` lists the
   spec references each diagram is attached to. */
window.DIAGRAMS = [

{ id:'dt-graphs', s:1, points:['1.2'], title:'Distance–time graphs',
  caption:'Gradient = speed. Flat means stationary; a curve getting steeper means speeding up.',
  svg:
  '<svg viewBox="0 0 400 240" class="dg">' +
    '<line class="ax" x1="46" y1="200" x2="376" y2="200"/><line class="ax" x1="46" y1="20" x2="46" y2="200"/>' +
    '<text class="lab" x="200" y="230">time</text>' +
    '<text class="lab" x="14" y="115" transform="rotate(-90 14 115)">distance</text>' +
    '<line class="c1" x1="46" y1="150" x2="150" y2="150"/>' +
    '<line class="c2" x1="46" y1="190" x2="200" y2="60"/>' +
    '<path class="c3" d="M46 195 Q 230 195 330 40"/>' +
    '<text class="k c1t" x="156" y="146">stationary</text>' +
    '<text class="k c2t" x="206" y="60">constant speed</text>' +
    '<text class="k c3t" x="248" y="176">accelerating</text>' +
  '</svg>' },

{ id:'vt-graph', s:1, points:['1.6','1.7','1.8'], title:'Velocity–time graph',
  caption:'Gradient = acceleration. Area under the line = distance travelled.',
  svg:
  '<svg viewBox="0 0 400 240" class="dg">' +
    '<path class="fill" d="M46 200 L146 80 L266 80 L326 200 Z"/>' +
    '<line class="ax" x1="46" y1="200" x2="376" y2="200"/><line class="ax" x1="46" y1="20" x2="46" y2="200"/>' +
    '<text class="lab" x="200" y="230">time</text>' +
    '<text class="lab" x="14" y="115" transform="rotate(-90 14 115)">velocity</text>' +
    '<polyline class="c2" points="46,200 146,80 266,80 326,200"/>' +
    '<line class="dash" x1="46" y1="80" x2="146" y2="80"/>' +
    '<line class="dash" x1="146" y1="80" x2="146" y2="200"/>' +
    '<text class="k c2t" x="52" y="60">gradient = acceleration</text>' +
    '<text class="k" x="150" y="150">area = distance</text>' +
    '<text class="k dim" x="270" y="60">constant velocity</text>' +
  '</svg>' },

{ id:'hooke', s:1, points:['1.22','1.23'], title:'Force–extension graph',
  caption:'Straight through the origin means Hooke’s law holds. Where it curves is the limit of proportionality.',
  svg:
  '<svg viewBox="0 0 400 240" class="dg">' +
    '<line class="ax" x1="46" y1="200" x2="376" y2="200"/><line class="ax" x1="46" y1="20" x2="46" y2="200"/>' +
    '<text class="lab" x="200" y="230">extension</text>' +
    '<text class="lab" x="14" y="110" transform="rotate(-90 14 110)">force</text>' +
    '<line class="c2" x1="46" y1="200" x2="250" y2="60"/>' +
    '<path class="c2" d="M250 60 Q 310 30 350 26" fill="none"/>' +
    '<circle class="pt" cx="250" cy="60" r="4.5"/>' +
    '<line class="dash" x1="250" y1="60" x2="250" y2="200"/>' +
    '<text class="k" x="256" y="52">limit of proportionality</text>' +
    '<text class="k c2t" x="80" y="140">gradient = spring constant k</text>' +
  '</svg>' },

{ id:'iv', s:2, points:['2.10'], title:'Current–voltage characteristics',
  caption:'Resistor: straight line. Filament lamp: S-curve that flattens as it heats. Diode: conducts one way only.',
  svg:
  '<svg viewBox="0 0 420 170" class="dg">' +
    '<g transform="translate(10,0)">' +
      '<line class="ax" x1="10" y1="75" x2="120" y2="75"/><line class="ax" x1="65" y1="15" x2="65" y2="135"/>' +
      '<line class="c2" x1="20" y1="120" x2="110" y2="30"/>' +
      '<text class="k mid" x="65" y="158">resistor</text>' +
    '</g>' +
    '<g transform="translate(150,0)">' +
      '<line class="ax" x1="10" y1="75" x2="120" y2="75"/><line class="ax" x1="65" y1="15" x2="65" y2="135"/>' +
      '<path class="c2" d="M18 128 Q 50 118 65 75 Q 80 32 112 22"/>' +
      '<text class="k mid" x="65" y="158">filament lamp</text>' +
    '</g>' +
    '<g transform="translate(290,0)">' +
      '<line class="ax" x1="10" y1="75" x2="120" y2="75"/><line class="ax" x1="65" y1="15" x2="65" y2="135"/>' +
      '<path class="c2" d="M18 75 L82 75 Q 96 74 104 22"/>' +
      '<text class="k mid" x="65" y="158">diode</text>' +
    '</g>' +
  '</svg>' },

{ id:'circuits', s:2, points:['2.8','2.18','2.19'], title:'Series and parallel',
  caption:'Series: same current everywhere, voltages add. Parallel: same voltage across each branch, currents add.',
  svg:
  '<svg viewBox="0 0 420 200" class="dg">' +
    '<g transform="translate(6,6)">' +
      '<rect class="wire" x="20" y="20" width="160" height="110" rx="6"/>' +
      '<line class="cell" x1="94" y1="14" x2="94" y2="26"/><line class="cell2" x1="106" y1="8" x2="106" y2="32"/>' +
      '<rect class="comp" x="42" y="112" width="34" height="17" rx="2"/>' +
      '<rect class="comp" x="124" y="112" width="34" height="17" rx="2"/>' +
      '<text class="k mid" x="100" y="160">series</text>' +
      '<text class="k dim mid" x="100" y="176">I same · V splits</text>' +
    '</g>' +
    '<g transform="translate(226,6)">' +
      '<rect class="wire" x="20" y="20" width="160" height="110" rx="6"/>' +
      '<line class="cell" x1="94" y1="14" x2="94" y2="26"/><line class="cell2" x1="106" y1="8" x2="106" y2="32"/>' +
      '<line class="wire" x1="70" y1="20" x2="70" y2="130"/>' +
      '<line class="wire" x1="130" y1="20" x2="130" y2="130"/>' +
      '<rect class="comp" x="53" y="66" width="34" height="17" rx="2"/>' +
      '<rect class="comp" x="113" y="66" width="34" height="17" rx="2"/>' +
      '<text class="k mid" x="100" y="160">parallel</text>' +
      '<text class="k dim mid" x="100" y="176">V same · I splits</text>' +
    '</g>' +
  '</svg>' },

{ id:'wave-types', s:3, points:['3.2','3.3'], title:'Transverse and longitudinal waves',
  caption:'Transverse: vibrations at 90° to energy transfer. Longitudinal: vibrations along it, giving compressions and rarefactions.',
  svg:
  '<svg viewBox="0 0 420 220" class="dg">' +
    '<path class="c2" d="M20 60 Q 45 10 70 60 T 120 60 T 170 60 T 220 60 T 270 60 T 320 60 T 370 60"/>' +
    '<line class="dash" x1="20" y1="60" x2="370" y2="60"/>' +
    '<line class="arw" x1="45" y1="60" x2="45" y2="24"/>' +
    '<text class="k" x="52" y="30">amplitude</text>' +
    '<line class="arw" x1="70" y1="88" x2="170" y2="88"/>' +
    '<text class="k" x="98" y="104">wavelength</text>' +
    '<text class="k mid" x="195" y="128">transverse</text>' +
    (function () {
      var out = '', x, i;
      for (i = 0; i < 46; i++) {
        x = 20 + i * 7.8 + 16 * Math.sin(i / 46 * Math.PI * 6);
        out += '<line class="tick" x1="' + x.toFixed(1) + '" y1="152" x2="' + x.toFixed(1) + '" y2="190"/>';
      }
      return out;
    })() +
    '<text class="k mid" x="195" y="212">longitudinal · compressions and rarefactions</text>' +
  '</svg>' },

{ id:'em-spectrum', s:3, points:['3.11','3.12','3.13'], title:'The electromagnetic spectrum',
  caption:'All travel at 3 × 10⁸ m/s in a vacuum. Wavelength falls and frequency rises left to right.',
  svg:
  '<svg viewBox="0 0 440 150" class="dg">' +
    (function () {
      var names = ['radio', 'micro', 'infra', 'vis', 'UV', 'X-ray', 'gamma'];
      var cols = ['#ff7d92', '#ffa46a', '#ffcf6a', '#7effc0', '#5ef2d6', '#8ab4ff', '#b79bff'];
      var out = '';
      names.forEach(function (n, i) {
        out += '<rect x="' + (16 + i * 58) + '" y="34" width="54" height="40" rx="4" fill="' + cols[i] + '" opacity="0.72"/>' +
               '<text class="k mid dark" x="' + (43 + i * 58) + '" y="59">' + n + '</text>';
      });
      return out;
    })() +
    '<line class="arw" x1="16" y1="94" x2="424" y2="94"/>' +
    '<text class="k" x="16" y="114">long wavelength</text>' +
    '<text class="k end" x="424" y="114">short wavelength</text>' +
    '<text class="k" x="16" y="130">low frequency</text>' +
    '<text class="k end" x="424" y="130">high frequency · more ionising</text>' +
  '</svg>' },

{ id:'refraction', s:3, points:['3.19','3.20'], title:'Refraction at a boundary',
  caption:'Entering a denser medium the ray slows and bends towards the normal. Angles are always measured from the normal.',
  svg:
  '<svg viewBox="0 0 400 240" class="dg">' +
    '<rect class="block" x="30" y="120" width="340" height="100"/>' +
    '<line class="bnd" x1="30" y1="120" x2="370" y2="120"/>' +
    '<line class="dash" x1="200" y1="24" x2="200" y2="216"/>' +
    '<line class="ray" x1="90" y1="30" x2="200" y2="120"/>' +
    '<line class="ray" x1="200" y1="120" x2="250" y2="212"/>' +
    '<path class="arc" d="M200 84 A 36 36 0 0 0 172 98"/>' +
    '<path class="arc" d="M200 162 A 42 42 0 0 0 218 158"/>' +
    '<text class="k" x="168" y="80">i</text>' +
    '<text class="k" x="210" y="172">r</text>' +
    '<text class="k dim" x="300" y="40">air (less dense)</text>' +
    '<text class="k dim" x="300" y="200">glass (denser)</text>' +
    '<text class="k dim" x="206" y="20">normal</text>' +
  '</svg>' },

{ id:'tir', s:3, points:['3.22','3.23','3.24'], title:'Critical angle and total internal reflection',
  caption:'Below c the ray refracts out. At c it grazes along the boundary. Above c it is all reflected back inside.',
  svg:
  '<svg viewBox="0 0 420 222" class="dg">' +
    '<rect class="block" x="14" y="14" width="392" height="96"/>' +
    '<line class="bnd" x1="14" y1="110" x2="406" y2="110"/>' +
    '<g transform="translate(0,0)">' +
      '<line class="dash" x1="80" y1="40" x2="80" y2="176"/>' +
      '<line class="ray" x1="47" y1="40" x2="80" y2="110"/>' +
      '<line class="ray" x1="80" y1="110" x2="129" y2="170"/>' +
      '<text class="k mid" x="80" y="196">i &lt; c</text>' +'<text class="k mid dim" x="80" y="212">refracts out</text>' +
    '</g>' +
    '<g transform="translate(130,0)">' +
      '<line class="dash" x1="80" y1="40" x2="80" y2="176"/>' +
      '<line class="ray" x1="26" y1="50" x2="80" y2="110"/>' +
      '<line class="ray" x1="80" y1="110" x2="152" y2="110"/>' +
      '<text class="k mid" x="80" y="196">i = c</text>' +'<text class="k mid dim" x="80" y="212">grazes at 90°</text>' +
    '</g>' +
    '<g transform="translate(258,0)">' +
      '<line class="dash" x1="80" y1="40" x2="80" y2="176"/>' +
      '<line class="ray" x1="12" y1="66" x2="80" y2="110"/>' +
      '<line class="ray" x1="80" y1="110" x2="148" y2="66"/>' +
      '<text class="k mid" x="80" y="196">i &gt; c</text>' +'<text class="k mid dim" x="80" y="212">all reflected inside</text>' +
    '</g>' +
  '</svg>' },

{ id:'sankey', s:4, points:['4.10','4.11'], title:'Sankey diagram',
  caption:'Arrow width is proportional to energy. Total in must equal total out.',
  svg:
  '<svg viewBox="0 0 420 200" class="dg">' +
    '<path class="sank-in" d="M20 40 L200 40 L200 96 L20 96 Z"/>' +
    '<path class="sank-use" d="M200 40 L392 40 L392 54 L200 54 Z"/>' +
    '<path class="sank-waste" d="M200 54 L282 54 L282 178 L240 178 L240 96 L200 96 Z"/>' +
    '<text class="k dark" x="34" y="74">input 100 J</text>' +
    '<text class="k" x="300" y="34">useful 25 J</text>' +
    '<text class="k" x="292" y="140">wasted 75 J</text>' +
  '</svg>' },

{ id:'states', s:5, points:['5.7','5.8'], title:'Solids, liquids and gases',
  caption:'Solid: fixed regular pattern, vibrating in place. Liquid: close but able to move past each other. Gas: far apart, fast and random.',
  svg:
  '<svg viewBox="0 0 420 170" class="dg">' +
    (function () {
      var out = '', i, j, x, y;
      for (i = 0; i < 4; i++) for (j = 0; j < 4; j++)
        out += '<circle class="mol" cx="' + (32 + j * 22) + '" cy="' + (36 + i * 22) + '" r="8"/>';
      for (i = 0; i < 14; i++) {
        x = 168 + (i % 4) * 22 + (Math.sin(i * 2.7) * 7);
        y = 36 + Math.floor(i / 4) * 23 + (Math.cos(i * 1.9) * 6);
        out += '<circle class="mol" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="8"/>';
      }
      for (i = 0; i < 8; i++) {
        x = 300 + ((i * 47) % 100);
        y = 26 + ((i * 71) % 96);
        out += '<circle class="mol" cx="' + x + '" cy="' + y + '" r="8"/>' +
               '<line class="arw" x1="' + (x + 9) + '" y1="' + y + '" x2="' + (x + 22) + '" y2="' + (y - 8) + '"/>';
      }
      return out;
    })() +
    '<text class="k mid" x="65" y="158">solid</text>' +
    '<text class="k mid" x="205" y="158">liquid</text>' +
    '<text class="k mid" x="350" y="158">gas</text>' +
  '</svg>' },

{ id:'field-patterns', s:6, points:['6.4','6.6','6.8','6.10'], title:'Magnetic field patterns',
  caption:'Lines run N to S outside the magnet, never cross, and are closest together where the field is strongest.',
  svg:
  '<svg viewBox="0 0 420 190" class="dg">' +
    '<g transform="translate(0,10)">' +
      '<rect class="magN" x="34" y="62" width="46" height="30"/><rect class="magS" x="80" y="62" width="46" height="30"/>' +
      '<text class="k mid dark" x="57" y="82">N</text><text class="k mid dark" x="103" y="82">S</text>' +
      '<path class="fl" d="M80 62 Q 80 8 24 40 Q 8 52 30 77"/>' +
      '<path class="fl" d="M80 92 Q 80 146 24 114 Q 8 102 30 77"/>' +
      '<path class="fl" d="M80 62 Q 80 14 136 44 Q 152 56 130 77"/>' +
      '<path class="fl" d="M80 92 Q 80 140 136 110 Q 152 98 130 77"/>' +
      '<text class="k mid" x="80" y="172">bar magnet</text>' +
    '</g>' +
    '<g transform="translate(206,10)">' +
      '<line class="wire2" x1="90" y1="18" x2="90" y2="136"/>' +
      '<circle class="fl" cx="90" cy="77" r="24"/><circle class="fl" cx="90" cy="77" r="40"/><circle class="fl" cx="90" cy="77" r="56"/>' +
      '<text class="k mid" x="90" y="172">straight wire · right-hand grip</text>' +
    '</g>' +
  '</svg>' },

{ id:'lhr', s:6, points:['6.11','6.12'], title:'Fleming’s left-hand rule',
  caption:'Left hand. First finger = Field (N to S), seCond finger = Current, thuMb = Motion.',
  svg:
  '<svg viewBox="0 0 400 190" class="dg">' +
    '<line class="arw2" x1="180" y1="120" x2="180" y2="30"/>' +
    '<text class="k mid" x="180" y="22">thuMb — Motion (force)</text>' +
    '<line class="arw2" x1="180" y1="120" x2="352" y2="120"/>' +
    '<text class="k end" x="352" y="140">First finger — Field</text>' +
    '<line class="arw2" x1="180" y1="120" x2="72" y2="172"/>' +
    '<text class="k" x="14" y="186">seCond finger — Current</text>' +
    '<circle class="pt" cx="180" cy="120" r="5"/>' +
  '</svg>' },

{ id:'transformer', s:6, points:['6.19','6.20','6.21'], title:'Transformer',
  caption:'More turns on the secondary steps the voltage up. For an ideal transformer, power in = power out.',
  svg:
  '<svg viewBox="0 0 400 190" class="dg">' +
    '<rect class="core" x="150" y="30" width="100" height="120"/>' +
    '<rect class="core-in" x="172" y="52" width="56" height="76"/>' +
    (function () {
      var out = '', i;
      for (i = 0; i < 4; i++) out += '<path class="coil" d="M150 ' + (48 + i * 22) + ' q -30 -11 -30 11 q 0 22 30 11"/>';
      for (i = 0; i < 7; i++) out += '<path class="coil2" d="M250 ' + (40 + i * 15) + ' q 30 -7.5 30 7.5 q 0 15 -30 7.5"/>';
      return out;
    })() +
    '<text class="k mid" x="82" y="26">primary</text>' +
    '<text class="k mid" x="82" y="170">n_p turns</text>' +
    '<text class="k mid" x="316" y="26">secondary</text>' +
    '<text class="k mid" x="316" y="170">n_s turns</text>' +
    '<text class="k mid dim" x="200" y="182">soft iron core</text>' +
  '</svg>' },

{ id:'penetration', s:7, points:['7.6'], title:'Penetrating power of radiation',
  caption:'Ionising power is the reverse: alpha is the most ionising, gamma the least.',
  svg:
  '<svg viewBox="0 0 420 190" class="dg">' +
    '<rect class="absorb" x="120" y="26" width="16" height="130"/><text class="k mid" x="128" y="176">paper</text>' +
    '<rect class="absorb" x="230" y="26" width="20" height="130"/><text class="k mid" x="240" y="176">aluminium</text>' +
    '<rect class="absorb" x="340" y="26" width="34" height="130"/><text class="k mid" x="357" y="176">lead</text>' +
    '<line class="ray-a" x1="20" y1="55" x2="120" y2="55"/><text class="k" x="22" y="46">alpha</text>' +
    '<line class="ray-b" x1="20" y1="95" x2="230" y2="95"/><text class="k" x="22" y="86">beta</text>' +
    '<line class="ray-g" x1="20" y1="135" x2="392" y2="135"/><text class="k" x="22" y="126">gamma</text>' +
  '</svg>' },

{ id:'half-life', s:7, points:['7.12','7.13'], title:'Half-life decay curve',
  caption:'Each half-life halves the activity. Read the time to fall from any value to half of it.',
  svg:
  '<svg viewBox="0 0 400 240" class="dg">' +
    '<line class="ax" x1="52" y1="200" x2="376" y2="200"/><line class="ax" x1="52" y1="20" x2="52" y2="200"/>' +
    '<text class="lab" x="210" y="230">time (half-lives)</text>' +
    '<text class="lab" x="16" y="112" transform="rotate(-90 16 112)">activity</text>' +
    '<path class="c2" d="M52 30 Q 92 78 132 115 Q 172 141 212 158 Q 252 170 292 179 Q 332 186 372 190"/>' +
    '<line class="dash" x1="52" y1="115" x2="132" y2="115"/><line class="dash" x1="132" y1="115" x2="132" y2="200"/>' +
    '<line class="dash" x1="52" y1="158" x2="212" y2="158"/><line class="dash" x1="212" y1="158" x2="212" y2="200"/>' +
    '<text class="k" x="20" y="34">100%</text><text class="k" x="24" y="119">50%</text><text class="k" x="24" y="162">25%</text>' +
    '<text class="k mid" x="132" y="216">1</text><text class="k mid" x="212" y="216">2</text><text class="k mid" x="292" y="216">3</text>' +
  '</svg>' },

{ id:'star-cycle', s:8, points:['8.10','8.11'], title:'Life cycle of a star',
  caption:'The path after the main sequence depends entirely on the star’s mass.',
  svg:
  '<svg viewBox="0 0 500 220" class="dg">' +
    '<g class="flow">' +
      '<rect x="6" y="84" width="72" height="34" rx="6"/><text class="k mid" x="42" y="105">nebula</text>' +
      '<rect x="94" y="84" width="80" height="34" rx="6"/><text class="k mid" x="134" y="105">protostar</text>' +
      '<rect x="190" y="84" width="84" height="34" rx="6"/><text class="k mid" x="232" y="100">main</text><text class="k mid" x="232" y="112">sequence</text>' +
      '<rect x="298" y="26" width="78" height="34" rx="6"/><text class="k mid" x="337" y="47">red giant</text>' +
      '<rect x="298" y="142" width="78" height="34" rx="6"/><text class="k mid" x="337" y="157">red</text><text class="k mid" x="337" y="169">supergiant</text>' +
      '<rect x="396" y="26" width="82" height="34" rx="6"/><text class="k mid" x="437" y="42">white</text><text class="k mid" x="437" y="54">dwarf</text>' +
      '<rect x="396" y="142" width="82" height="34" rx="6"/><text class="k mid" x="437" y="163">supernova</text>' +
    '</g>' +
    '<line class="arw" x1="80" y1="101" x2="92" y2="101"/><line class="arw" x1="176" y1="101" x2="188" y2="101"/>' +
    '<path class="arw" d="M276 96 L286 96 L286 43 L294 43"/>' +
    '<path class="arw" d="M276 106 L286 106 L286 159 L294 159"/>' +
    '<line class="arw" x1="378" y1="43" x2="392" y2="43"/><line class="arw" x1="378" y1="159" x2="392" y2="159"/>' +
    '<text class="k dim" x="292" y="78">low mass</text>' +
    '<text class="k dim" x="292" y="132">high mass</text>' +
    '<text class="k dim mid" x="437" y="196">then a neutron star,</text>' +
    '<text class="k dim mid" x="437" y="209">or a black hole</text>' +
  '</svg>' }

];
