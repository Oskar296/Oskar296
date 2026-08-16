/* Cambridge IGCSE Computer Science 0478 / 0984 - Paper 1: Computer Systems */

window.SYLLABUS_P1 = [
/* ==========================================================
   1. DATA REPRESENTATION
   ========================================================== */
{
  n: "1", title: "Data representation", em: "\u{1F522}", hue: 262, paper: 1,
  blurb: "Everything in a computer is a number, and every number is binary. Start here.",
  subs: [
  {
    id: "1.1", title: "Number systems",
    goals: [
      "Explain why computers use binary",
      "Convert between denary, binary and hexadecimal",
      "Add two binary numbers and spot an overflow",
      "Perform logical binary shifts and explain their effect",
      "Represent negative numbers using two's complement"
    ],
    notes: `
<h3>Why binary?</h3>
<p>A computer is built from transistors, and a transistor is really just a switch: it is either <b>on</b> or <b>off</b>. Two states means two symbols, so the natural number system is <b>base 2</b> (binary), using only 0 and 1. A single 0 or 1 is a <b>bit</b>; eight bits make a <b>byte</b>.</p>

<h3>Denary, binary, hex</h3>
<div class="table-wrap"><table>
<tr><th>System</th><th>Base</th><th>Digits</th><th>Used for</th></tr>
<tr><td>Denary</td><td>10</td><td>0 to 9</td><td>Human counting</td></tr>
<tr><td>Binary</td><td>2</td><td>0, 1</td><td>How the machine actually stores data</td></tr>
<tr><td>Hexadecimal</td><td>16</td><td>0 to 9 then A to F</td><td>A short, readable way to write binary</td></tr>
</table></div>

<h3>Binary to denary</h3>
<p>Write the place values above the bits and add up the columns that contain a 1.</p>
<pre>128  64  32  16   8   4   2   1
  1   0   0   1   1   0   1   0

128 + 16 + 8 + 2 = <b>154</b></pre>

<h3>Denary to binary</h3>
<p>Two reliable methods. Use whichever you can do without slipping.</p>
<p><b>Place value subtraction:</b> take the biggest place value that fits, write 1, subtract, repeat.</p>
<pre>200 - 128 = 72   -> 1 in the 128 column
 72 -  64 =  8   -> 1 in the 64 column
 8 does not fit in 32 or 16   -> 0, 0
  8 -   8 =  0   -> 1 in the 8 column
remaining columns are 0

200 = <b>1100 1000</b></pre>
<p><b>Repeated division by 2:</b> divide, record remainders, then read the remainders from the bottom upwards.</p>

<h3>Hexadecimal</h3>
<p>One hex digit is exactly <b>four bits (a nibble)</b>, which is what makes hex so useful. To convert binary to hex, split the binary into groups of four from the right and convert each group.</p>
<pre>1011 1110  ->  1011 = B ,  1110 = E  ->  <b>BE</b></pre>
<p>Going the other way, expand each hex digit into four bits. To get from hex to denary, multiply by place values 16 and 1 (for two digits): <code>2F = (2 x 16) + 15 = 47</code>.</p>

<div class="callout"><div class="ttl">Where hex is used</div>
<ul>
<li><b>MAC addresses</b> and <b>IPv6 addresses</b></li>
<li><b>HTML colour codes</b>, for example <code>#FF0080</code></li>
<li><b>Memory addresses</b> and machine code / assembly listings</li>
<li><b>Debugging</b> and error codes, where a long binary string would be unreadable</li>
</ul>
<p style="margin:6px 0 0">The exam answer to "why is hex used?" is: it is <b>shorter, easier for a human to read and less error prone</b> than binary, while still mapping directly onto binary.</p></div>

<h3>Binary addition</h3>
<p>Column rules: <code>0+0=0</code>, <code>0+1=1</code>, <code>1+1=0 carry 1</code>, <code>1+1+1=1 carry 1</code>.</p>
<pre>  0111 1100   (124)
+ 0001 0110   ( 22)
-----------
  1001 0010   (146)</pre>

<h3>Overflow</h3>
<p>An <b>overflow</b> happens when the result of a calculation needs more bits than the register or byte can hold. With 8 bits the largest unsigned value is <code>1111 1111 = 255</code>, so <code>200 + 100</code> cannot be stored. The carry out of the leftmost column is lost, so the stored answer is wrong.</p>
<div class="callout trap"><div class="ttl">Common mistake</div><p>Overflow is not "the number is too big for the screen". It is specifically that the result <b>needs more bits than are available</b>, so data is lost and the answer is incorrect.</p></div>

<h3>Logical binary shifts</h3>
<p>A <b>logical shift</b> moves every bit left or right by a given number of places. Bits shifted out of the end are lost, and <b>zeros are shifted in</b> at the other end.</p>
<ul>
<li><b>Left shift by n</b> multiplies by 2<sup>n</sup></li>
<li><b>Right shift by n</b> divides by 2<sup>n</sup> (whole number division)</li>
</ul>
<pre>0000 1101  (13)  shift left 2  ->  0011 0100  (52)   13 x 4
0000 1101  (13)  shift right 1 ->  0000 0110  ( 6)   13 / 2, remainder lost</pre>
<p>If a 1 is shifted out, <b>precision or value is lost</b> and the multiply/divide no longer gives the correct answer.</p>

<h3>Two's complement (negative numbers)</h3>
<p>The most significant bit becomes a <b>sign bit</b> with a negative place value of -128 in an 8-bit number. If that bit is 1, the number is negative.</p>
<pre>-128  64  32  16   8   4   2   1
   1   0   0   1   0   0   1   1

-128 + 16 + 2 + 1 = <b>-109</b></pre>
<p><b>To make a denary negative number:</b> write the positive value in binary, then <b>flip every bit and add 1</b>.</p>
<pre>  40  =  0010 1000
flip   =  1101 0111
add 1  =  1101 1000  =  <b>-40</b></pre>
<p>An 8-bit two's complement byte holds <b>-128 to +127</b>.</p>
`,
    terms: [
      ["Binary", "A base-2 number system that uses only the digits 0 and 1, matching the two states of a transistor."],
      ["Bit", "A single binary digit, 0 or 1. The smallest unit of data."],
      ["Nibble", "A group of 4 bits, which is exactly one hexadecimal digit."],
      ["Byte", "A group of 8 bits."],
      ["Hexadecimal", "A base-16 system using 0 to 9 and A to F, used as a short, readable way of writing binary."],
      ["Overflow", "When the result of a calculation needs more bits than the register can store, so data is lost and the result is incorrect."],
      ["Logical shift", "Moving all bits left or right a set number of places, filling the vacated positions with zeros. Bits shifted out are lost."],
      ["Two's complement", "A method of representing negative binary numbers where the most significant bit has a negative place value."],
      ["Most significant bit (MSB)", "The leftmost bit, which has the largest place value. In two's complement it acts as the sign bit."]
    ],
    tips: [
      "Always write the place value headings above your bits before converting. Almost every lost mark here is a slipped column.",
      "If a question says 8-bit, your answer must have exactly 8 bits. Pad with leading zeros.",
      "For 'flip and add 1', check your answer by converting back with the -128 column."
    ],
    tools: [["Number converter", "#/tool/convert"], ["Binary maths lab", "#/tool/binlab"], ["Speed drill", "#/tool/drill"]]
  },
  {
    id: "1.2", title: "Text, sound and images",
    goals: [
      "Explain how character sets represent text",
      "Compare ASCII and Unicode",
      "Describe how sound is sampled, and the effect of sample rate and resolution",
      "Describe how a bitmap image is stored, and the effect of resolution and colour depth"
    ],
    notes: `
<h3>Text</h3>
<p>A <b>character set</b> is an agreed list of characters with a unique binary code for each one. Without an agreed set, one machine's "A" would be another machine's random symbol.</p>
<div class="table-wrap"><table>
<tr><th></th><th>ASCII</th><th>Unicode</th></tr>
<tr><td>Bits per character</td><td>7 bits (extended ASCII uses 8)</td><td>16 bits or more</td></tr>
<tr><td>Number of characters</td><td>128 (256 extended)</td><td>Over 100,000</td></tr>
<tr><td>Covers</td><td>English letters, digits, punctuation, control codes</td><td>Nearly every world alphabet, plus emoji</td></tr>
<tr><td>File size</td><td>Smaller</td><td>Larger for the same text</td></tr>
</table></div>
<p>Useful facts: in ASCII the codes run in order, so <code>A = 65</code>, <code>B = 66</code>, and <code>a = 97</code>. Lower case is 32 more than upper case. Unicode's first 128 codes match ASCII, so it is backwards compatible.</p>

<h3>Sound</h3>
<p>Sound is naturally an <b>analogue</b> wave. To store it, the wave is <b>sampled</b>: its amplitude is measured at regular intervals and each measurement is stored as a binary number.</p>
<ul>
<li><b>Sample rate</b> is how many samples are taken per second, measured in hertz (Hz). Higher rate means the shape of the wave is captured more accurately.</li>
<li><b>Sample resolution (bit depth)</b> is the number of bits used for each sample. Higher resolution means the amplitude of each sample is recorded more precisely.</li>
</ul>
<p>Increasing either one gives <b>better sound quality but a larger file</b> and more processing time.</p>
<div class="callout"><div class="ttl">Sound file size</div>
<p><b>size (bits) = sample rate x sample resolution x length in seconds</b>. Multiply by 2 for stereo. Divide by 8 for bytes.</p></div>

<h3>Images (bitmaps)</h3>
<p>A <b>bitmap</b> is a grid of <b>pixels</b>. Each pixel stores a binary value for its colour.</p>
<ul>
<li><b>Image resolution</b> is the number of pixels, given as width x height, for example 1920 x 1080.</li>
<li><b>Colour depth</b> is the number of bits used per pixel. <code>n</code> bits gives 2<sup>n</sup> possible colours, so 8 bits gives 256 colours and 24 bits gives about 16.7 million.</li>
</ul>
<p>More pixels or more bits per pixel means <b>better image quality but a larger file</b>. If an image is enlarged beyond its resolution, the pixels become visible and the image looks blocky or "pixelated".</p>
<div class="callout"><div class="ttl">Image file size</div>
<p><b>size (bits) = width x height x colour depth</b>. Divide by 8 for bytes, then by 1024 for kibibytes.</p></div>

<h3>Worked example</h3>
<pre>An image is 800 x 600 pixels with a colour depth of 16 bits.

800 x 600 = 480,000 pixels
480,000 x 16 = 7,680,000 bits
7,680,000 / 8 = 960,000 bytes
960,000 / 1024 = <b>937.5 KiB</b></pre>
`,
    terms: [
      ["Character set", "An agreed list of characters, each with a unique binary code, so that text is understood by every device."],
      ["ASCII", "A 7-bit character set representing 128 characters, mainly English letters, digits and punctuation."],
      ["Unicode", "A character set using 16 or more bits per character, able to represent over 100,000 characters from most world languages."],
      ["Sampling", "Measuring the amplitude of an analogue sound wave at regular time intervals and storing each measurement in binary."],
      ["Sample rate", "The number of sound samples taken per second, measured in hertz."],
      ["Sample resolution", "The number of bits used to store each sound sample."],
      ["Pixel", "The smallest addressable element of a bitmap image, storing one colour value."],
      ["Image resolution", "The number of pixels in an image, usually written as width x height."],
      ["Colour depth", "The number of bits used to represent the colour of a single pixel."]
    ],
    tips: [
      "When a question asks for the effect of increasing sample rate or colour depth, always give BOTH sides: better quality AND larger file size.",
      "Watch the units. If the question wants kibibytes, divide by 8 then by 1024, and show that working.",
      "Do not confuse image resolution (pixel count) with colour depth (bits per pixel)."
    ],
    tools: [["File size calculator", "#/tool/filesize"], ["Character codes", "#/tool/charcodes"]]
  },
  {
    id: "1.3", title: "Data storage and compression",
    goals: [
      "Use and order the units of data storage",
      "Calculate the file size of an image or sound file",
      "Explain why files are compressed",
      "Compare lossy and lossless compression and choose the right one"
    ],
    notes: `
<h3>Units of data</h3>
<p>The syllabus uses the binary prefixes, where each step is <b>x 1024</b> (2<sup>10</sup>).</p>
<div class="table-wrap"><table>
<tr><th>Unit</th><th>Symbol</th><th>Equals</th></tr>
<tr><td>Bit</td><td>b</td><td>a single 0 or 1</td></tr>
<tr><td>Nibble</td><td></td><td>4 bits</td></tr>
<tr><td>Byte</td><td>B</td><td>8 bits</td></tr>
<tr><td>Kibibyte</td><td>KiB</td><td>1024 bytes</td></tr>
<tr><td>Mebibyte</td><td>MiB</td><td>1024 KiB</td></tr>
<tr><td>Gibibyte</td><td>GiB</td><td>1024 MiB</td></tr>
<tr><td>Tebibyte</td><td>TiB</td><td>1024 GiB</td></tr>
<tr><td>Pebibyte</td><td>PiB</td><td>1024 TiB</td></tr>
<tr><td>Exbibyte</td><td>EiB</td><td>1024 PiB</td></tr>
</table></div>

<h3>Why compress?</h3>
<ul>
<li>Files take up <b>less storage space</b></li>
<li>Files <b>download and upload faster</b>, using less bandwidth</li>
<li>Streaming works smoothly without buffering</li>
<li>Email attachment limits can be met</li>
</ul>

<h3>Lossless compression</h3>
<p>Reduces file size <b>without losing any data</b>. The original file can be reconstructed exactly. It works by recording repeated patterns rather than storing them over and over.</p>
<ul>
<li><b>Run length encoding (RLE)</b> replaces runs of identical data with one value plus a count. <code>WWWWWBBB</code> becomes <code>5W3B</code>.</li>
<li><b>Dictionary based</b> methods index repeated words or phrases and store the index instead.</li>
</ul>
<p>Used where every bit matters: <b>text documents, spreadsheets, program code, ZIP files, PNG images</b>.</p>

<h3>Lossy compression</h3>
<p>Permanently <b>removes data</b> that a human is unlikely to notice. The original file cannot be recovered, but the file is much smaller.</p>
<ul>
<li><b>Images (JPEG):</b> reduce colour depth, group similar nearby colours</li>
<li><b>Sound (MP3):</b> remove frequencies outside human hearing, and quieter sounds masked by louder ones at the same moment. Sample rate and resolution may also be reduced.</li>
<li><b>Video (MP4):</b> both of the above, plus only storing what changes between frames</li>
</ul>

<div class="callout tip"><div class="ttl">How to choose in an exam answer</div>
<p>If the data must be <b>perfectly intact</b> (text, code, a bank record, a legal document), you must use <b>lossless</b>. If a small quality drop is acceptable and small size matters more (music streaming, photos on a website), <b>lossy</b> is fine.</p></div>
`,
    terms: [
      ["Compression", "Reducing the size of a file so it uses less storage space and transmits faster."],
      ["Lossless compression", "Compression where no data is removed, so the original file can be restored exactly."],
      ["Lossy compression", "Compression that permanently removes data the user is unlikely to notice, giving a much smaller file that cannot be fully restored."],
      ["Run length encoding", "A lossless method that replaces a run of repeated identical values with a single value and a count."]
    ],
    tips: [
      "Never say lossy 'compresses more without any downside'. Always state that data is permanently lost.",
      "1 KiB is 1024 bytes, not 1000. Show the division in your working.",
      "For 'why compress', give a benefit tied to the scenario in the question, such as faster streaming or fitting an email limit."
    ],
    tools: [["File size calculator", "#/tool/filesize"]]
  }
]},

/* ==========================================================
   2. DATA TRANSMISSION
   ========================================================== */
{
  n: "2", title: "Data transmission", em: "\u{1F4E1}", hue: 200, paper: 1,
  blurb: "How bits get from A to B, how you know they arrived intact, and how you stop other people reading them.",
  subs: [
  {
    id: "2.1", title: "Types and methods of transmission",
    goals: [
      "Describe how data is broken into packets and what a packet contains",
      "Explain packet switching",
      "Compare serial and parallel, and simplex, half-duplex and full-duplex",
      "State the features and benefits of USB"
    ],
    notes: `
<h3>Packets</h3>
<p>Data sent over a network is split into <b>packets</b>: small, equal-sized chunks. Each packet has three parts.</p>
<div class="table-wrap"><table>
<tr><th>Part</th><th>Contains</th></tr>
<tr><td><b>Packet header</b></td><td>Sender's IP address, receiver's IP address, packet number in the sequence, and how many packets make up the whole message</td></tr>
<tr><td><b>Payload</b></td><td>The actual data, typically around 64 KiB</td></tr>
<tr><td><b>Trailer</b></td><td>A marker showing the end of the packet, and an error checking method such as a checksum or CRC</td></tr>
</table></div>

<h3>Packet switching</h3>
<p>Each packet travels <b>independently</b>, and routers choose the fastest available route for each one, so packets can take different paths and arrive out of order. At the destination they are <b>reordered using the packet numbers</b>, and any missing packet is requested again.</p>
<p><b>Benefits:</b> no single route is tied up, a broken or congested link can be routed around, and it is harder to intercept a whole message.<br>
<b>Drawbacks:</b> packets can arrive out of order or be delayed, so packet switching is less suited to real time streaming, and reassembly takes time.</p>

<h3>Serial vs parallel</h3>
<div class="table-wrap"><table>
<tr><th></th><th>Serial</th><th>Parallel</th></tr>
<tr><td>How</td><td>One bit at a time down a single wire</td><td>Several bits at once down multiple wires</td></tr>
<tr><td>Speed</td><td>Slower over short distances</td><td>Faster over short distances</td></tr>
<tr><td>Distance</td><td>Reliable over long distances</td><td>Short distances only</td></tr>
<tr><td>Reliability</td><td>Bits stay in order, fewer errors</td><td>Risk of <b>skew</b>: bits arrive at slightly different times. Also crosstalk between wires</td></tr>
<tr><td>Cost</td><td>Cheaper, fewer wires</td><td>More expensive</td></tr>
</table></div>

<h3>Direction of transmission</h3>
<ul>
<li><b>Simplex:</b> one direction only. Example: a computer sending data to a printer, or a TV broadcast.</li>
<li><b>Half-duplex:</b> both directions, but only one at a time. Example: a walkie-talkie.</li>
<li><b>Full-duplex:</b> both directions at the same time. Example: a phone call, or broadband.</li>
</ul>
<p>These combine with serial and parallel, so you can be asked about "half-duplex serial transmission", for example.</p>

<h3>USB (Universal Serial Bus)</h3>
<p>USB is an asynchronous <b>serial</b> connection. When a device is plugged in, the computer detects it, and the correct <b>device driver</b> is loaded automatically.</p>
<p><b>Advantages:</b> only fits one way so it cannot be connected incorrectly, universally supported industry standard, supports several transmission speeds, can charge or power devices, and is automatically detected.<br>
<b>Disadvantages:</b> the standard cable length is limited to about 5 m, and older USB standards have relatively slow transfer rates.</p>
`,
    terms: [
      ["Packet", "A small unit of data made up of a header, a payload and a trailer, used to send data across a network."],
      ["Packet header", "The part of a packet holding the sender and receiver IP addresses, the packet number and the total number of packets."],
      ["Payload", "The actual data being carried inside a packet."],
      ["Packet switching", "A method where packets travel independently along the best available route and are reassembled in order at the destination."],
      ["Serial transmission", "Sending data one bit at a time along a single wire."],
      ["Parallel transmission", "Sending several bits at the same time along multiple wires."],
      ["Skew", "An error in parallel transmission where bits sent together arrive at slightly different times."],
      ["Simplex", "Data transmission in one direction only."],
      ["Half-duplex", "Data transmission in both directions, but only one direction at a time."],
      ["Full-duplex", "Data transmission in both directions at the same time."]
    ],
    tips: [
      "For 'why is serial used instead of parallel over long distances', the mark is for skew or data corruption, not just 'it is better'.",
      "Name the direction type AND give an example device. Examiners reward the example.",
      "A packet trailer contains error checking, a header contains addresses. Do not swap them."
    ],
    tools: []
  },
  {
    id: "2.2", title: "Methods of error detection",
    goals: [
      "Explain why errors happen during transmission",
      "Describe parity checks, checksums, echo checks and check digits",
      "Describe an automatic repeat request (ARQ)",
      "Identify the limitations of each method"
    ],
    notes: `
<h3>Why errors happen</h3>
<p>Data can be corrupted during transmission by <b>interference</b>, <b>data loss due to a weak signal</b>, or packets arriving out of order or being lost. A single flipped bit can change the meaning of the data completely, so it must be detected.</p>

<h3>Parity check</h3>
<p>One bit in each byte is reserved as the <b>parity bit</b>. Sender and receiver agree on <b>even</b> or <b>odd</b> parity beforehand.</p>
<ul>
<li><b>Even parity:</b> the total number of 1s in the byte must be even</li>
<li><b>Odd parity:</b> the total number of 1s in the byte must be odd</li>
</ul>
<pre>Data to send: 0110111 , using even parity
Number of 1s = 5 (odd), so parity bit must be 1 to make it even
Byte sent:    <b>1</b>0110111</pre>
<p>The receiver counts the 1s. If the parity is wrong, an error is detected and the data is requested again.</p>
<div class="callout trap"><div class="ttl">Limitation you must know</div>
<p>If <b>two bits</b> change, the parity can still be correct, so the error is missed. Parity also cannot tell you <b>which</b> bit is wrong.</p></div>
<p>A <b>parity block check</b> fixes this partly: bytes are arranged in a block with a parity byte at the end, and parity is checked both across rows and down columns. Where a bad row crosses a bad column, the exact incorrect bit is located.</p>

<h3>Checksum</h3>
<p>The sender runs the data through an <b>algorithm</b> to produce a checksum value, which is sent with the data. The receiver runs the <b>same algorithm</b> on the data received and compares the two values. If they differ, an error occurred and a resend is requested.</p>

<h3>Echo check</h3>
<p>After receiving the data, the receiver <b>sends the data back</b> to the sender, which compares it with the original. If they differ, the data is resent.</p>
<p><b>Limitation:</b> if the returned copy is different, you do not know whether the error happened on the way there or on the way back. It also doubles the traffic and takes twice as long.</p>

<h3>Check digit</h3>
<p>An extra digit calculated from the other digits and placed at the <b>end</b> of a number, used for data <b>entry</b>, such as barcodes, ISBNs and bank account numbers. When the number is typed or scanned, the check digit is recalculated and compared.</p>
<p>It detects: an <b>incorrect digit</b>, a <b>transposition error</b> (two digits swapped), <b>omitted or extra digits</b>, and <b>phonetic errors</b> such as 13 and 30.</p>

<h3>Automatic Repeat reQuest (ARQ)</h3>
<p>ARQ uses acknowledgements and timeouts to guarantee delivery.</p>
<ol>
<li>The receiver uses an error detection method to check each packet.</li>
<li>If the data is correct, a <b>positive acknowledgement</b> is sent back.</li>
<li>If it is incorrect, a <b>negative acknowledgement</b> is sent and the data is retransmitted.</li>
<li>The sender starts a <b>timeout</b> when it sends. If no acknowledgement arrives before the timeout expires, the data is automatically sent again.</li>
<li>This repeats until the data is received correctly or a set limit of attempts is reached.</li>
</ol>
`,
    terms: [
      ["Parity bit", "An extra bit added to a byte so the total number of 1s matches the agreed even or odd parity."],
      ["Parity block check", "Checking parity across both rows and columns of a block of bytes so the exact incorrect bit can be located."],
      ["Checksum", "A value calculated from a block of data using an algorithm, sent with the data and recalculated by the receiver for comparison."],
      ["Echo check", "The receiver sends the data back to the sender, which compares it with what was originally sent."],
      ["Check digit", "An extra digit at the end of a number, calculated from the other digits, used to detect data entry errors."],
      ["Transposition error", "A data entry error where two digits are swapped, for example 43 typed as 34."],
      ["ARQ", "Automatic Repeat reQuest: acknowledgements and timeouts are used to make sure corrupted or missing data is resent."]
    ],
    tips: [
      "Parity questions almost always ask for the limitation. Learn: two bits changing cancels out, and it cannot identify which bit is wrong.",
      "A checksum is calculated by an algorithm at BOTH ends and compared. Say 'compared' to get the mark.",
      "Check digit = data entry. Parity, checksum, echo, ARQ = data transmission."
    ],
    tools: []
  },
  {
    id: "2.3", title: "Encryption",
    goals: [
      "Explain the purpose of encryption",
      "Describe symmetric encryption",
      "Describe asymmetric encryption using public and private keys",
      "Use the terms plaintext and ciphertext correctly"
    ],
    notes: `
<h3>The point of encryption</h3>
<p>Encryption <b>scrambles data so it is meaningless if intercepted</b>. It does not stop the data being stolen, and it does not stop hacking. It only makes stolen data useless without the key.</p>
<p><b>Plaintext</b> is the original readable data. An <b>encryption algorithm</b> and a <b>key</b> turn it into <b>ciphertext</b>, which is the scrambled version.</p>

<h3>Symmetric encryption</h3>
<p>The <b>same key</b> is used to encrypt and to decrypt. The key must be sent to the recipient so they can decrypt.</p>
<p><b>Weakness:</b> the key has to travel too, and if the key is intercepted the whole message can be read. This is called the key distribution problem.</p>
<p><b>Strength:</b> it is fast, so it works well for large amounts of data.</p>

<h3>Asymmetric encryption</h3>
<p>Uses a <b>key pair</b>: a <b>public key</b> that anyone can have, and a <b>private key</b> that is kept secret by the owner. The two are mathematically related.</p>
<ol>
<li>The sender obtains the receiver's <b>public key</b>.</li>
<li>The sender encrypts the message with that public key.</li>
<li>Only the receiver's matching <b>private key</b> can decrypt it.</li>
</ol>
<p>Because the private key is never transmitted, asymmetric encryption is more secure. It is slower than symmetric encryption, so in practice systems often use asymmetric encryption to exchange a symmetric key, then use the faster symmetric encryption for the data itself.</p>

<div class="callout tip"><div class="ttl">Exam phrasing that scores</div>
<p>"The data is encrypted using an algorithm and a key, so if it is intercepted it is <b>meaningless</b> and cannot be understood without the decryption key."</p></div>
`,
    terms: [
      ["Encryption", "Scrambling data using an algorithm and a key so that it is meaningless if intercepted."],
      ["Plaintext", "The original, readable data before encryption."],
      ["Ciphertext", "The scrambled, unreadable data produced by encryption."],
      ["Symmetric encryption", "Encryption where the same key is used to both encrypt and decrypt the data."],
      ["Asymmetric encryption", "Encryption using a public key to encrypt and a matching private key to decrypt."],
      ["Public key", "A key that is made freely available and used to encrypt data."],
      ["Private key", "A secret key, known only to its owner, used to decrypt data encrypted with the matching public key."]
    ],
    tips: [
      "Encryption prevents UNDERSTANDING, not interception. Writing 'it stops hackers stealing the data' loses the mark.",
      "In asymmetric encryption, you encrypt with the RECEIVER's public key. Getting the direction wrong is the most common error here."
    ],
    tools: []
  }
]},

/* ==========================================================
   3. HARDWARE
   ========================================================== */
{
  n: "3", title: "Hardware", em: "\u{1F5A5}", hue: 22, paper: 1,
  blurb: "The CPU, the devices plugged into it, where data lives and what puts a machine on a network.",
  subs: [
  {
    id: "3.1", title: "Computer architecture",
    goals: [
      "Describe the purpose of the CPU and the Von Neumann model",
      "State the purpose of the ALU, CU, registers and buses",
      "Describe the fetch, decode, execute cycle",
      "Explain how cores, cache and clock speed affect performance",
      "Describe embedded systems"
    ],
    notes: `
<h3>The CPU</h3>
<p>The <b>central processing unit</b> processes instructions and data, carrying out the fetch, decode, execute cycle. On most modern machines it is a single integrated circuit called a <b>microprocessor</b>.</p>

<h3>Von Neumann architecture</h3>
<p>The key idea is a <b>stored program</b> computer: both <b>instructions and data are held in the same memory</b> and travel along the same buses. Instructions are fetched and executed one at a time, in sequence.</p>

<h4>Components</h4>
<div class="table-wrap"><table>
<tr><th>Component</th><th>Purpose</th></tr>
<tr><td><b>ALU</b> Arithmetic Logic Unit</td><td>Performs all calculations and logical operations, such as add, subtract and comparisons</td></tr>
<tr><td><b>CU</b> Control Unit</td><td>Sends control signals to manage and coordinate all activity in the computer, and decodes instructions</td></tr>
<tr><td><b>Immediate Access Store</b></td><td>Memory that the CPU can access directly and very quickly</td></tr>
</table></div>

<h4>Registers</h4>
<p>A <b>register</b> is a tiny, extremely fast storage location inside the CPU that holds one value.</p>
<div class="table-wrap"><table>
<tr><th>Register</th><th>Holds</th></tr>
<tr><td><b>PC</b> Program Counter</td><td>The <b>address</b> of the next instruction to be fetched</td></tr>
<tr><td><b>MAR</b> Memory Address Register</td><td>The <b>address</b> of the memory location currently being read from or written to</td></tr>
<tr><td><b>MDR</b> Memory Data Register</td><td>The <b>data or instruction</b> just fetched from, or about to be written to, memory</td></tr>
<tr><td><b>CIR</b> Current Instruction Register</td><td>The instruction currently being decoded and executed</td></tr>
<tr><td><b>ACC</b> Accumulator</td><td>The result of calculations carried out by the ALU</td></tr>
</table></div>

<h4>Buses</h4>
<p>A <b>bus</b> is a set of parallel wires carrying data between components.</p>
<ul>
<li><b>Address bus:</b> carries addresses from the CPU to memory. It is <b>unidirectional</b>. Its width affects how many memory locations can be addressed.</li>
<li><b>Data bus:</b> carries data and instructions between the CPU and memory. It is <b>bidirectional</b>. Its width affects how much data moves at once.</li>
<li><b>Control bus:</b> carries control and timing signals, such as read and write. It is bidirectional.</li>
</ul>

<h3>The fetch, decode, execute cycle</h3>
<ol>
<li><b>Fetch:</b> the address in the <b>PC</b> is copied to the <b>MAR</b>. The PC is incremented by 1. The instruction at that address is fetched along the data bus into the <b>MDR</b>, then copied into the <b>CIR</b>.</li>
<li><b>Decode:</b> the <b>control unit</b> decodes the instruction in the CIR, working out what operation is needed and what data it applies to.</li>
<li><b>Execute:</b> the instruction is carried out. If it is a calculation, the <b>ALU</b> performs it and the result is stored in the <b>ACC</b>.</li>
</ol>
<p>The cycle then repeats with the next instruction.</p>

<h3>Performance factors</h3>
<div class="table-wrap"><table>
<tr><th>Factor</th><th>Effect</th></tr>
<tr><td><b>Clock speed</b> (Hz/GHz)</td><td>The number of FDE cycles per second. A higher clock speed means more instructions processed per second. Increasing it too far causes overheating.</td></tr>
<tr><td><b>Number of cores</b></td><td>Each core can fetch, decode and execute instructions independently, so several instructions can be processed at the same time. Software must be written to make use of multiple cores, so double the cores does not mean double the speed.</td></tr>
<tr><td><b>Cache size</b></td><td>Cache is very fast memory holding frequently used instructions and data. A bigger cache means fewer slow trips to RAM, so performance rises. Cache is expensive, so there is not much of it.</td></tr>
</table></div>

<h3>Instruction set</h3>
<p>The <b>instruction set</b> is the complete list of machine code commands a particular CPU can carry out. Software written for one instruction set will not run on a CPU with a different one.</p>

<h3>Embedded systems</h3>
<p>An <b>embedded system</b> is a combination of hardware and software designed to perform a <b>specific function</b> within a larger device. Examples: a washing machine, a set of traffic lights, a microwave, a car engine management system, a central heating controller.</p>
<p><b>Advantages:</b> small, low cost, low power, dedicated so it performs its task very reliably and quickly.<br>
<b>Disadvantages:</b> difficult to update or upgrade, hard for a user to repair or reprogram, and only performs the one task it was built for.</p>
`,
    terms: [
      ["CPU", "The central processing unit, which processes instructions and data by carrying out the fetch, decode, execute cycle."],
      ["Von Neumann architecture", "An architecture where both program instructions and data are stored in the same memory and use the same buses."],
      ["ALU", "The arithmetic logic unit, which performs all calculations and logical comparisons."],
      ["Control unit", "The component that decodes instructions and sends control signals to coordinate the whole computer."],
      ["Register", "A very small, very fast storage location inside the CPU holding a single value."],
      ["Program counter (PC)", "A register holding the address of the next instruction to be fetched."],
      ["MAR", "Memory address register: holds the address of the memory location currently being accessed."],
      ["MDR", "Memory data register: holds the data or instruction that has been fetched from, or is to be written to, memory."],
      ["CIR", "Current instruction register: holds the instruction currently being decoded and executed."],
      ["Accumulator", "A register that stores the result of calculations performed by the ALU."],
      ["Address bus", "A unidirectional bus carrying memory addresses from the CPU to memory."],
      ["Data bus", "A bidirectional bus carrying data and instructions between the CPU and memory."],
      ["Control bus", "A bidirectional bus carrying control and timing signals between components."],
      ["Cache", "Very fast memory inside or close to the CPU that stores frequently used instructions and data."],
      ["Core", "A processing unit within a CPU that can carry out its own fetch, decode, execute cycle."],
      ["Instruction set", "The complete set of machine code instructions that a particular CPU is able to carry out."],
      ["Embedded system", "Hardware and software built to perform one specific function inside a larger device."]
    ],
    tips: [
      "Learn the FDE cycle as a sequence of register transfers. 'PC to MAR, PC incremented, instruction to MDR, MDR to CIR, decode, execute' is worth full marks.",
      "The MAR always holds an ADDRESS, the MDR always holds DATA. This is the most tested distinction in topic 3.",
      "For multi-core, always add the caveat that software must be written to use the extra cores."
    ],
    tools: [["FDE cycle animator", "#/tool/fde"]]
  },
  {
    id: "3.2", title: "Input and output devices",
    goals: [
      "Describe how common input devices work and where they are used",
      "Describe how common output devices work and where they are used",
      "Explain the role of sensors and actuators"
    ],
    notes: `
<h3>Input devices</h3>
<div class="table-wrap"><table>
<tr><th>Device</th><th>How it works / where it is used</th></tr>
<tr><td><b>Barcode scanner</b></td><td>A light source is reflected off the black and white bars; the reflected light is measured and converted into a number. Used at supermarket checkouts and for stock control.</td></tr>
<tr><td><b>QR code scanner</b></td><td>A camera captures the 2D pattern of black and white squares, which stores far more data than a barcode, including URLs.</td></tr>
<tr><td><b>Digital camera</b></td><td>Light passes through the lens onto an image sensor made of a grid of light sensitive elements; the charge on each is converted to a binary value for a pixel.</td></tr>
<tr><td><b>Keyboard</b></td><td>Pressing a key completes a circuit; the key's code is looked up in a character map and sent to the computer.</td></tr>
<tr><td><b>Microphone</b></td><td>Sound waves vibrate a diaphragm; the vibrations create an electrical signal which is sampled and converted to binary.</td></tr>
<tr><td><b>Touch screen</b></td><td>Resistive (two layers pressed together), capacitive (a change in the screen's electrostatic field) or infrared.</td></tr>
</table></div>

<h3>Sensors</h3>
<p>A <b>sensor</b> is an input device that <b>measures a physical property of the environment continuously</b> and sends the readings to a microprocessor. Sensor readings are analogue, so an <b>analogue to digital converter (ADC)</b> is needed before a computer can use them.</p>
<div class="table-wrap"><table>
<tr><th>Sensor</th><th>Typical use</th></tr>
<tr><td>Temperature</td><td>Central heating, ovens, greenhouses</td></tr>
<tr><td>Light</td><td>Automatic headlights, street lights, greenhouse blinds</td></tr>
<tr><td>Pressure</td><td>Burglar alarms (pressure mats), car tyre monitoring</td></tr>
<tr><td>Motion / infrared</td><td>Security lighting, automatic doors</td></tr>
<tr><td>Humidity / moisture</td><td>Greenhouses, soil monitoring, weather stations</td></tr>
<tr><td>pH</td><td>Soil monitoring, chemical processing, pools</td></tr>
<tr><td>Gas</td><td>Pollution monitoring, safety systems</td></tr>
<tr><td>Proximity</td><td>Robotics, parking sensors</td></tr>
</table></div>

<h3>Output devices</h3>
<div class="table-wrap"><table>
<tr><th>Device</th><th>How it works / where it is used</th></tr>
<tr><td><b>Inkjet printer</b></td><td>Liquid ink is sprayed from a moving print head onto the paper. Good for high quality photos in small numbers.</td></tr>
<tr><td><b>Laser printer</b></td><td>A laser draws the page onto a charged drum; toner sticks to the charged areas and is fused onto the paper by heat. Fast, high volume, cheap per page.</td></tr>
<tr><td><b>3D printer</b></td><td>Builds a solid object layer by layer (additive manufacturing) from a CAD design, using materials such as plastic filament, resin or powdered metal. Used for prototypes, medical prosthetics and spare parts.</td></tr>
<tr><td><b>LCD screen</b></td><td>A layer of liquid crystals that block or pass light, requiring a backlight (usually LED).</td></tr>
<tr><td><b>LED / OLED screen</b></td><td>OLED uses organic layers that emit their own light, so no backlight is needed. Thinner, better contrast and true blacks, and a wider viewing angle.</td></tr>
<tr><td><b>Speaker</b></td><td>A digital to analogue converter turns binary into an electrical signal, which vibrates a cone to create sound waves.</td></tr>
<tr><td><b>Actuator</b></td><td>An output device that produces movement, such as a motor, pump, valve or buzzer. It is what a microprocessor uses to change something physical.</td></tr>
</table></div>

<div class="callout"><div class="ttl">ADC and DAC</div>
<p><b>ADC:</b> converts an analogue signal (from a sensor or microphone) into digital so the computer can process it.<br>
<b>DAC:</b> converts digital data into an analogue signal so it can drive an output device such as a speaker or a motor.</p></div>
`,
    terms: [
      ["Sensor", "An input device that continuously measures a physical property of the environment and sends the data to a microprocessor."],
      ["Actuator", "An output device that produces movement, such as a motor, valve or pump, in response to a signal."],
      ["ADC", "Analogue to digital converter: turns a continuous analogue signal into binary data the computer can process."],
      ["DAC", "Digital to analogue converter: turns binary data into an analogue signal that can drive an output device."],
      ["3D printer", "An output device that builds a solid object layer by layer from a digital design, also called additive manufacturing."]
    ],
    tips: [
      "If the question gives a scenario, name a sensor that actually fits it. A temperature sensor in a burglar alarm scores nothing.",
      "A sensor is an INPUT device. A common error is calling it an output because it is 'part of the alarm'.",
      "Remember an ADC is needed between any sensor and a microprocessor."
    ],
    tools: []
  },
  {
    id: "3.3", title: "Data storage",
    goals: [
      "Distinguish primary, secondary and off-line storage",
      "Compare RAM and ROM",
      "Describe magnetic, optical and solid state storage",
      "Explain virtual memory and cloud storage"
    ],
    notes: `
<h3>Primary storage</h3>
<p>Memory that the <b>CPU can access directly</b>. It is the fastest storage in the machine.</p>
<div class="table-wrap"><table>
<tr><th></th><th>RAM</th><th>ROM</th></tr>
<tr><td>Stands for</td><td>Random Access Memory</td><td>Read Only Memory</td></tr>
<tr><td>Volatile?</td><td><b>Volatile</b>: contents are lost when power is off</td><td><b>Non-volatile</b>: contents are kept without power</td></tr>
<tr><td>Can be written to?</td><td>Yes, read and write</td><td>Read only (cannot be changed by the user)</td></tr>
<tr><td>Stores</td><td>Data, files, parts of the OS and applications currently in use</td><td>The start-up instructions, such as the BIOS or boot loader</td></tr>
<tr><td>Size</td><td>Larger</td><td>Small</td></tr>
</table></div>

<h3>Secondary storage</h3>
<p><b>Non-volatile</b> storage that the CPU <b>cannot access directly</b>, used to hold files and software permanently.</p>

<h4>Magnetic (HDD, magnetic tape)</h4>
<p>Platters are coated in a magnetic material and divided into <b>tracks and sectors</b>. A read/write head magnetises tiny areas: one polarity means 1 and the other means 0. The platters spin at high speed.</p>
<p>Large capacity and low cost per gigabyte, but has <b>moving parts</b>, so it is slower, noisier, uses more power and is easily damaged if dropped.</p>

<h4>Optical (CD, DVD, Blu-ray)</h4>
<p>A laser burns <b>pits</b> into the reflective surface of the disc; the flat areas between them are <b>lands</b>. When reading, a laser is shone at the disc and the difference in reflection between a pit and a land is read as 1 or 0.</p>
<p>Cheap and portable, but low capacity, slow, and easily scratched.</p>

<h4>Solid state (SSD, USB flash drive, memory card)</h4>
<p>Uses <b>NAND flash memory</b>: transistors act as control gates and floating gates, and trapping electrons on the floating gate holds a 0 or 1 without power. There are <b>no moving parts</b>.</p>
<p>Very fast, silent, low power, durable and lightweight. More expensive per gigabyte, and has a limited number of read/write cycles before wearing out.</p>

<h3>Virtual memory</h3>
<p>When RAM is full, the operating system moves the data of programs not currently being used out of RAM and into a reserved area of the <b>hard disk called virtual memory</b>. This frees RAM for the active program, so more programs can run at once and the system does not crash when RAM runs out.</p>
<p>The exchange of pages between RAM and disk is called <b>paging</b> or swapping. Because secondary storage is much slower than RAM, heavy use of virtual memory causes <b>disk thrashing</b> and the computer slows down noticeably.</p>

<h3>Cloud storage</h3>
<p>Data is stored on <b>remote servers owned by a third party</b> and accessed over the internet. The provider is responsible for keeping the data available, usually by storing multiple copies on different servers (<b>data redundancy</b>).</p>
<p><b>Advantages:</b> files can be accessed from any device anywhere with an internet connection, storage can be scaled up easily, the provider handles backups and maintenance, and files are easy to share and collaborate on.<br>
<b>Disadvantages:</b> you need an internet connection, security and privacy depend on the provider, ongoing subscription costs, upload and download speeds are limited by bandwidth, and the provider could suffer a breach or go out of business.</p>
`,
    terms: [
      ["Primary storage", "Memory the CPU can access directly, such as RAM and ROM."],
      ["Secondary storage", "Non-volatile storage that the CPU cannot access directly, used to store files and software permanently."],
      ["Volatile", "Storage that loses its contents when the power is switched off."],
      ["RAM", "Random access memory: volatile primary storage that holds the data and programs currently in use."],
      ["ROM", "Read only memory: non-volatile primary storage holding start-up instructions such as the BIOS."],
      ["Magnetic storage", "Storage that records data by magnetising areas of a spinning platter or tape."],
      ["Optical storage", "Storage that uses a laser to read pits and lands burned into a reflective disc surface."],
      ["Solid state storage", "Storage using NAND flash memory with no moving parts, where electrons are trapped on a floating gate."],
      ["Virtual memory", "An area of secondary storage used as if it were RAM when RAM is full, by moving inactive pages out of RAM."],
      ["Cloud storage", "Storing data on remote servers owned by a third party and accessed over the internet."]
    ],
    tips: [
      "RAM is volatile, ROM is not. If you only remember one fact about storage, remember that one.",
      "For SSD advantages, say 'no moving parts' and then the consequence: faster, more durable, lower power, silent.",
      "Virtual memory questions want the sequence: RAM full, inactive pages moved to disk, RAM freed for the active program."
    ],
    tools: []
  },
  {
    id: "3.4", title: "Network hardware",
    goals: [
      "State the purpose of a NIC",
      "Explain MAC addresses and their structure",
      "Compare IPv4 and IPv6, public and private, static and dynamic IP addresses",
      "Describe the role of a router"
    ],
    notes: `
<h3>Network interface card (NIC)</h3>
<p>A <b>NIC</b> is the hardware that lets a device connect to a network. It may be wired or wireless (a WNIC). Each NIC is given a unique <b>MAC address</b> when it is manufactured.</p>

<h3>MAC address</h3>
<p>A <b>Media Access Control address</b> uniquely identifies a device on a network. It is set by the manufacturer and normally does not change, so it identifies the <b>hardware</b>.</p>
<p>It is 48 bits, written as <b>12 hexadecimal digits</b> in six pairs:</p>
<pre>00-1C-B3-4F-25-FE
|-----------|--------|
manufacturer   serial number
    (OUI)     of the device</pre>
<p>The first six digits are the <b>manufacturer's identifier</b>, the last six are the <b>serial number of the device</b>.</p>

<h3>IP address</h3>
<p>An <b>Internet Protocol address</b> is assigned to a device by the network, and identifies <b>where the device is on the network</b>. Unlike a MAC address it can change, for example when you move to a different network.</p>

<h4>IPv4 vs IPv6</h4>
<div class="table-wrap"><table>
<tr><th></th><th>IPv4</th><th>IPv6</th></tr>
<tr><td>Size</td><td>32 bits</td><td>128 bits</td></tr>
<tr><td>Written as</td><td>Four denary groups 0 to 255, separated by full stops: <code>192.168.0.14</code></td><td>Eight groups of four hex digits, separated by colons: <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></td></tr>
<tr><td>Number available</td><td>About 4 billion, which has run out</td><td>Vastly more, effectively unlimited</td></tr>
</table></div>

<h4>Public vs private</h4>
<ul>
<li><b>Public IP address:</b> unique across the whole internet, assigned by the ISP, allows the device to be reached from outside the local network.</li>
<li><b>Private IP address:</b> unique only within the local network, not routable on the internet, and reused on many different local networks. It is more secure because the device cannot be addressed directly from the internet.</li>
</ul>

<h4>Static vs dynamic</h4>
<ul>
<li><b>Static:</b> the address never changes. Needed for servers and websites so they can always be found. Easier to set up remote access, but more expensive and slightly less secure.</li>
<li><b>Dynamic:</b> a new address is assigned each time the device joins the network. Cheaper and allows addresses to be reused, but the address changing can break remote access.</li>
</ul>

<h3>Router</h3>
<p>A <b>router</b> connects different networks together and <b>forwards packets between them</b>. It reads the destination IP address in each packet header and uses a routing table to decide the best route. In a home, the router also assigns private IP addresses to devices and connects the LAN to the internet through the ISP.</p>
`,
    terms: [
      ["NIC", "Network interface card: the hardware that allows a device to connect to a network and which stores the MAC address."],
      ["MAC address", "A 48-bit address written as 12 hex digits, set by the manufacturer, that uniquely identifies a device's hardware on a network."],
      ["IP address", "An address assigned to a device by the network that identifies its location on the network and can change."],
      ["IPv4", "A 32-bit IP address written as four denary numbers between 0 and 255 separated by full stops."],
      ["IPv6", "A 128-bit IP address written as eight groups of four hexadecimal digits separated by colons."],
      ["Public IP address", "An IP address that is unique across the whole internet and can be reached from outside the local network."],
      ["Private IP address", "An IP address that is unique only within a local network and cannot be routed over the internet."],
      ["Router", "A device that connects networks together and forwards packets between them using their destination IP addresses."]
    ],
    tips: [
      "MAC = hardware, set by the manufacturer, does not change. IP = location on a network, assigned, can change.",
      "State the split of a MAC address (manufacturer ID then device serial number). It is a frequent 2 mark question.",
      "For 'why IPv6', say IPv4 addresses have run out and IPv6 provides far more addresses."
    ],
    tools: []
  }
]},

/* ==========================================================
   4. SOFTWARE
   ========================================================== */
{
  n: "4", title: "Software", em: "\u{1F9E9}", hue: 300, paper: 1,
  blurb: "System software, application software, and how human-readable code becomes machine code.",
  subs: [
  {
    id: "4.1", title: "Types of software and interrupts",
    goals: [
      "Distinguish system software and application software",
      "Describe the tasks of an operating system",
      "Explain the purpose of utility software, device drivers and firmware",
      "Describe what an interrupt is and how one is handled"
    ],
    notes: `
<h3>System software vs application software</h3>
<div class="table-wrap"><table>
<tr><th></th><th>System software</th><th>Application software</th></tr>
<tr><td>Purpose</td><td>Runs and manages the computer's hardware and provides a platform for other software</td><td>Lets the user perform a specific task</td></tr>
<tr><td>Examples</td><td>Operating system, utility programs, device drivers, compilers, linkers</td><td>Word processor, spreadsheet, web browser, photo editor, video game</td></tr>
<tr><td>Needed to run the machine?</td><td>Yes</td><td>No</td></tr>
</table></div>

<h3>The operating system</h3>
<p>The OS manages the hardware and provides an interface between the user and the computer. Its tasks include:</p>
<ul>
<li><b>Memory management</b>: allocating memory to programs and keeping them separate</li>
<li><b>File management</b>: naming, saving, moving, deleting files and managing directories</li>
<li><b>Peripheral and device management</b>: controlling input and output devices through drivers</li>
<li><b>Process/multitasking management</b>: scheduling which program uses the CPU and when</li>
<li><b>Security management</b>: user accounts, passwords, access rights, updates</li>
<li><b>Providing a user interface</b>: a GUI or a command line interface</li>
<li><b>Managing errors</b> and producing error messages</li>
</ul>

<h3>Utility software</h3>
<div class="table-wrap"><table>
<tr><th>Utility</th><th>What it does</th></tr>
<tr><td>Anti-virus / anti-malware</td><td>Scans files against a database of known malware signatures, quarantines or deletes threats, and runs in the background checking files as they are opened</td></tr>
<tr><td>Backup</td><td>Creates a copy of files, on a schedule, so data can be restored after loss or corruption</td></tr>
<tr><td>Disk defragmentation</td><td>Rearranges files stored in fragments so each file is in contiguous sectors, reducing head movement and speeding up access</td></tr>
<tr><td>Compression</td><td>Reduces file sizes so they use less storage and transmit faster</td></tr>
<tr><td>File management</td><td>Provides tools to copy, move, delete, search and organise files</td></tr>
<tr><td>Screensaver</td><td>Displays an image or animation after a period of inactivity, and may lock the machine</td></tr>
</table></div>

<h3>Device drivers</h3>
<p>A <b>device driver</b> is software that lets the operating system communicate with a piece of hardware. Each type of device needs its own driver, which translates the OS's general instructions into commands that specific device understands. Without the correct driver, the hardware will not work properly.</p>

<h3>Firmware and the bootstrap</h3>
<p><b>Firmware</b> is software stored permanently on a ROM chip that controls the hardware at a low level. When the computer is switched on, the <b>BIOS</b> runs from ROM, checks the hardware, and then the <b>bootstrap</b> loads the operating system from secondary storage into RAM.</p>

<h3>Interrupts</h3>
<p>An <b>interrupt</b> is a signal sent to the CPU by a device or program that requires immediate attention. It causes the CPU to pause what it is doing so the request can be dealt with.</p>
<h4>How an interrupt is handled</h4>
<ol>
<li>The interrupt signal is sent to the CPU.</li>
<li>At the end of the current FDE cycle, the CPU checks for interrupts.</li>
<li>The current job's contents (the register values) are <b>saved onto a stack</b>.</li>
<li>The CPU runs the appropriate <b>interrupt service routine (ISR)</b>.</li>
<li>When the ISR finishes, the saved values are <b>restored from the stack</b> and the original job continues from where it left off.</li>
</ol>
<p>Interrupts have <b>priorities</b>, so a higher priority interrupt can itself interrupt a lower priority one.</p>
<h4>Examples of interrupts</h4>
<ul>
<li><b>Hardware:</b> a key is pressed, the mouse is moved, a printer runs out of paper, a device is plugged in</li>
<li><b>Software:</b> division by zero, an error in a program, two programs trying to access the same memory</li>
<li><b>Timer:</b> a scheduled event, such as switching between tasks</li>
</ul>
`,
    terms: [
      ["System software", "Software that runs and manages the computer hardware and provides a platform for applications."],
      ["Application software", "Software that allows a user to carry out a specific task, such as writing a document."],
      ["Operating system", "System software that manages hardware, memory, files, processes, security and the user interface."],
      ["Utility software", "System software that performs a specific maintenance or housekeeping task, such as backup or defragmentation."],
      ["Device driver", "Software that allows the operating system to communicate with a specific piece of hardware."],
      ["Firmware", "Software stored permanently on a ROM chip that controls hardware at a low level, such as the BIOS."],
      ["Bootstrap", "The program that loads the operating system from secondary storage into RAM when the computer starts."],
      ["Interrupt", "A signal sent to the CPU by hardware or software that requires immediate attention, pausing the current task."],
      ["Interrupt service routine", "The specific program run by the CPU to deal with a particular interrupt."],
      ["Stack", "The area of memory used to store the register contents of the interrupted job so it can be resumed."]
    ],
    tips: [
      "For 'how is an interrupt handled', the marks are for: save current job to the stack, run the ISR, restore, continue. Include the stack.",
      "Defragmentation does not delete anything. It reorders file fragments so files are contiguous.",
      "A compiler is system software, not an application. This catches people out."
    ],
    tools: []
  },
  {
    id: "4.2", title: "Programming languages, translators and IDEs",
    goals: [
      "Compare high-level and low-level languages",
      "Explain the need for translators",
      "Compare compilers and interpreters",
      "Describe the common features of an IDE"
    ],
    notes: `
<h3>High-level vs low-level</h3>
<div class="table-wrap"><table>
<tr><th></th><th>High-level language</th><th>Low-level language</th></tr>
<tr><td>Looks like</td><td>English-like keywords, for example Python or Java</td><td>Assembly mnemonics such as <code>LDA</code>, <code>ADD</code>, <code>STO</code>, or raw machine code</td></tr>
<tr><td>Ease of use</td><td>Easier to read, write and debug</td><td>Difficult and slow to write, easy to make mistakes</td></tr>
<tr><td>Portability</td><td>Portable: runs on any machine with a suitable translator</td><td>Machine dependent: written for one specific instruction set</td></tr>
<tr><td>Control of hardware</td><td>Little direct control</td><td>Direct control of hardware and memory, so it can be more efficient</td></tr>
<tr><td>Used for</td><td>General purpose software</td><td>Device drivers, embedded systems, code where speed or memory really matters</td></tr>
</table></div>
<p>A computer can only actually execute <b>machine code</b> (binary), so all other languages must be <b>translated</b>.</p>

<h3>Translators</h3>
<div class="table-wrap"><table>
<tr><th></th><th>Compiler</th><th>Interpreter</th><th>Assembler</th></tr>
<tr><td>Translates</td><td>The whole program in one go</td><td>One line at a time, translating and executing as it goes</td><td>Assembly language into machine code, one to one</td></tr>
<tr><td>Output</td><td>An executable file that can be run again without the compiler</td><td>No executable is produced, so the interpreter is needed every time</td><td>An executable machine code file</td></tr>
<tr><td>Errors</td><td>Reports all errors at the end as a list, which can make debugging harder to start</td><td>Stops at the first error, so errors are easy to find one at a time</td><td>Reports errors in the assembly code</td></tr>
<tr><td>Speed</td><td>Runs faster once compiled</td><td>Runs slower because translation happens every time</td><td>Fast</td></tr>
<tr><td>Best for</td><td>Distributing finished software, protecting source code</td><td>Developing and testing, teaching</td><td>Assembly programs</td></tr>
</table></div>

<h3>IDE features</h3>
<p>An <b>integrated development environment</b> is software that provides everything needed to write, test and run a program in one place.</p>
<ul>
<li><b>Code editor</b> with line numbering, auto-indent, colour coded syntax and auto-complete</li>
<li><b>Error diagnostics and reports</b> that highlight the line and describe the problem</li>
<li><b>Run-time environment</b> so the program can be executed without leaving the IDE</li>
<li><b>Translator</b>, a built-in compiler or interpreter</li>
<li><b>Auto-documentation</b>, generating a summary of variables, procedures and comments</li>
<li><b>Debugging tools</b>: breakpoints to pause execution, single stepping through lines, and a variable watch window to see values change</li>
</ul>
<div class="callout tip"><div class="ttl">Exam favourite</div>
<p>"Describe two features of an IDE that help a programmer find errors." Best answers: <b>breakpoints</b> (pause the program at a chosen line to inspect it) and a <b>variable watch window</b> (see the value of a variable change as the program runs). Add what each one does, not just its name.</p></div>
`,
    terms: [
      ["High-level language", "A programming language close to human language, portable between machines, that must be translated before it can run."],
      ["Low-level language", "A language close to machine code, such as assembly, that gives direct control of hardware but is machine dependent."],
      ["Machine code", "Binary instructions that the CPU can execute directly."],
      ["Assembly language", "A low-level language using mnemonics that has a one to one relationship with machine code."],
      ["Compiler", "A translator that converts an entire high-level program into machine code in one go, producing an executable file."],
      ["Interpreter", "A translator that converts and executes a high-level program one line at a time, stopping at the first error."],
      ["Assembler", "A translator that converts assembly language into machine code."],
      ["IDE", "An integrated development environment: software providing an editor, translator, run-time environment and debugging tools in one package."],
      ["Breakpoint", "A marker set on a line of code that pauses execution there so variables can be inspected."]
    ],
    tips: [
      "The one-mark discriminator: a compiler produces an executable, an interpreter does not.",
      "Do not write 'an interpreter is slower'. Write 'the program runs more slowly because it must be translated line by line every time it is run'.",
      "Naming an IDE feature is half the mark. Always say what the feature does for the programmer."
    ],
    tools: []
  }
]},

/* ==========================================================
   5. THE INTERNET AND ITS USES
   ========================================================== */
{
  n: "5", title: "The internet and its uses", em: "\u{1F310}", hue: 190, paper: 1,
  blurb: "The web, digital currency and the full cyber security threat list with matching defences.",
  subs: [
  {
    id: "5.1", title: "The internet and the World Wide Web",
    goals: [
      "Distinguish the internet from the World Wide Web",
      "Describe the structure of a URL",
      "Explain HTTP, HTTPS and the role of the browser",
      "Explain what a DNS does, step by step",
      "Describe cookies and their uses"
    ],
    notes: `
<h3>Internet vs World Wide Web</h3>
<ul>
<li>The <b>internet</b> is the global <b>infrastructure</b>: the physical network of interconnected networks, cables, routers and protocols.</li>
<li>The <b>World Wide Web</b> is the <b>collection of websites and web pages</b> stored on web servers and accessed using that infrastructure.</li>
</ul>
<p>In one line: the internet is the roads, the web is the shops you drive to.</p>

<h3>URL</h3>
<pre>https://www.example.com/notes/binary.html
|___|   |______________|/|_______________|
protocol   domain name     path / file name</pre>
<p>The <b>protocol</b> is usually http or https, the <b>domain name</b> identifies the web server, and the <b>path and file name</b> identify the resource on that server.</p>

<h3>HTTP and HTTPS</h3>
<p><b>HTTP</b> (HyperText Transfer Protocol) is the set of rules for transferring web pages. <b>HTTPS</b> is the same but <b>encrypted</b>, using SSL/TLS, so intercepted data is meaningless. A padlock in the address bar and a <b>digital certificate</b> show the connection is secure.</p>

<h3>The web browser</h3>
<p>A browser <b>renders HTML</b> to display web pages. It also stores bookmarks and history, keeps multiple tabs open, manages cookies, and provides an address bar and navigation buttons. It sends requests to web servers and receives the HTML, CSS and JavaScript in reply.</p>

<h3>What the DNS does</h3>
<p>The <b>Domain Name System</b> translates a <b>domain name into an IP address</b>, because humans remember names but computers route by numbers.</p>
<ol>
<li>The user types a URL into the browser.</li>
<li>The browser sends the domain name to the nearest <b>DNS server</b>.</li>
<li>If that server has the matching IP address, it returns it to the browser.</li>
<li>If not, it passes the request on to another DNS server higher up, and so on until the IP address is found.</li>
<li>The IP address is returned to the browser, which sends a request straight to that web server.</li>
<li>The web server returns the page, and the browser renders it.</li>
<li>If no DNS server can find the domain, an error is returned.</li>
</ol>

<h3>Cookies</h3>
<p>A <b>cookie</b> is a small text file sent by a website and stored on the user's computer by the browser. It holds data about that user's visit.</p>
<ul>
<li><b>Session cookies</b> are held in memory and deleted when the browser closes. They are used for things like a shopping basket while you browse.</li>
<li><b>Persistent cookies</b> are stored on the hard disk and remain until they expire or are deleted. They are used to remember log-in details, preferences such as language, and to target advertising.</li>
</ul>
<p>Other uses: saving personal details, storing progress in an online game, and tracking which pages a user visits.</p>
`,
    terms: [
      ["Internet", "The global infrastructure of interconnected networks, cables, routers and protocols."],
      ["World Wide Web", "The collection of websites and web pages stored on web servers and accessed over the internet."],
      ["URL", "Uniform Resource Locator: the address of a resource, made of a protocol, a domain name and a path or file name."],
      ["HTTP", "HyperText Transfer Protocol: the set of rules for transferring web pages across the internet."],
      ["HTTPS", "HTTP with encryption using SSL/TLS, so that intercepted data cannot be understood."],
      ["Web browser", "Software that requests web pages and renders the HTML so the user can view them."],
      ["DNS", "Domain Name System: servers that translate a domain name into the IP address of the web server."],
      ["Cookie", "A small text file stored on a user's computer by the browser, holding data about their visit to a website."],
      ["Session cookie", "A cookie held in memory only and deleted when the browser is closed."],
      ["Persistent cookie", "A cookie stored on the hard disk that remains until it expires or is deleted."]
    ],
    tips: [
      "The DNS question is worth up to 6 marks and is almost always a sequence. Practise writing it as numbered steps.",
      "Never say the internet and the web are the same thing. One is infrastructure, one is content.",
      "For HTTPS, the mark is for encryption and the security certificate, not just 'it is safer'."
    ],
    tools: []
  },
  {
    id: "5.2", title: "Digital currency",
    goals: [
      "Explain what digital currency is",
      "Explain the process of blockchain and why it is used"
    ],
    notes: `
<h3>Digital currency</h3>
<p><b>Digital currency</b> exists only in electronic form. It has no physical notes or coins, and it is stored and transferred electronically. Ordinary bank balances are digital, but <b>cryptocurrency</b> goes further: it is <b>decentralised</b>, meaning it is not controlled by any single bank or government, and it uses cryptography to secure transactions.</p>
<p>The problem with a purely digital currency is <b>trust</b>: without a central bank keeping the record, how does anyone know a coin has not been spent twice? Blockchain is the answer.</p>

<h3>Blockchain</h3>
<p>A <b>blockchain</b> is a <b>digital ledger</b> of every transaction ever made in that currency. It is <b>duplicated across every computer in the network</b>, so everyone holds the same copy.</p>
<h4>How a transaction is added</h4>
<ol>
<li>A new transaction is requested and broadcast to the network.</li>
<li>The network of computers <b>validates</b> the transaction.</li>
<li>Once verified, the transaction is grouped with others into a <b>block</b>.</li>
<li>The block is given a <b>hash</b>, and it also stores the <b>hash of the previous block</b>, plus a timestamp.</li>
<li>The block is added to the end of the chain and the updated ledger is copied to every computer on the network.</li>
</ol>

<h3>Where digital currency is used</h3>
<ul>
<li><b>Online payments</b> without a bank acting as the middle man, and without card fees</li>
<li><b>Sending money abroad</b>, which is faster and cheaper than a bank transfer</li>
<li>Places where people have a phone but <b>no access to a bank account</b></li>
</ul>

<h3>Advantages and drawbacks</h3>
<div class="table-wrap"><table>
<tr><th>Advantages</th><th>Drawbacks</th></tr>
<tr><td>Transfers are fast and work across borders</td><td>The value can change very quickly, so what you hold may suddenly be worth much less</td></tr>
<tr><td>Lower transaction fees, with no bank in the middle</td><td>It only works with a device and an internet connection</td></tr>
<tr><td>Every transaction is recorded permanently and can be traced</td><td>If you lose the key to your wallet, the currency is gone for good</td></tr>
<tr><td>Not controlled by any single government or bank</td><td>No central authority to appeal to if something goes wrong</td></tr>
</table></div>

<div class="callout"><div class="ttl">Why this makes tampering obvious</div>
<p>Because each block contains the previous block's hash, changing any block changes its hash, which breaks the link to every block after it. An attacker would have to alter every following block on <b>the majority of copies across the whole network</b> at the same time, which is not realistic.</p></div>
`,
    terms: [
      ["Digital currency", "Currency that exists only in electronic form and has no physical notes or coins."],
      ["Cryptocurrency", "A decentralised digital currency that uses cryptography and a blockchain to secure and record transactions."],
      ["Blockchain", "A digital ledger of all transactions, duplicated across the whole network, where each block stores the hash of the previous block."],
      ["Block", "A group of verified transactions with a timestamp, its own hash, and the hash of the previous block."],
      ["Hash", "A value calculated from the contents of a block, which changes completely if the contents are altered."]
    ],
    tips: [
      "The marks in blockchain answers are for the CHAIN: each block holds the previous block's hash, so tampering breaks every block after it.",
      "Mention that the ledger is copied to every computer on the network. Decentralisation is the whole point."
    ],
    tools: []
  },
  {
    id: "5.3", title: "Cyber security",
    goals: [
      "Describe each cyber security threat and how it is carried out",
      "Distinguish the different types of malware",
      "Describe the methods used to keep data safe and how each one works"
    ],
    notes: `
<h3>The threats</h3>
<div class="table-wrap"><table>
<tr><th>Threat</th><th>How it works</th><th>Main defence</th></tr>
<tr><td><b>Brute force attack</b></td><td>Software repeatedly tries every possible combination of characters until the password is found</td><td>Strong long passwords, limit on log-in attempts, two-step verification</td></tr>
<tr><td><b>Data interception</b></td><td>A packet sniffer examines packets travelling across a network and steals the data inside them</td><td>Encryption, so intercepted data is meaningless; use a wired connection or WPA</td></tr>
<tr><td><b>DDoS attack</b></td><td>A distributed denial of service floods a server with so many requests from many machines that it cannot respond to legitimate users</td><td>Firewall, proxy server, malware checker to stop the machine joining a botnet</td></tr>
<tr><td><b>Hacking</b></td><td>Gaining unauthorised access to a computer system, leading to data being deleted, changed or stolen</td><td>Firewall, strong passwords, access levels, biometrics</td></tr>
<tr><td><b>Phishing</b></td><td>A fake email or message pretending to be from a legitimate company, with a link to a fake website that captures the user's details</td><td>Do not click unknown links, check spelling and tone of messages, anti-phishing filters, firewall</td></tr>
<tr><td><b>Pharming</b></td><td>Malicious code installed on a user's computer or on a DNS server <b>redirects the user to a fake website</b> without their knowledge, even if they type the correct address</td><td>Anti-malware, check the URL and the https certificate, firewall</td></tr>
<tr><td><b>Social engineering</b></td><td>Manipulating people into breaking security procedures, using fear, curiosity or urgency, for example a phone call pretending to be IT support</td><td>Staff training and awareness, verification procedures</td></tr>
</table></div>

<div class="callout"><div class="ttl">Phishing vs pharming</div>
<p><b>Phishing needs the user to act</b> by clicking a link in a message. <b>Pharming does not</b>: malicious code redirects the user even when they type the correct address themselves. This exact difference is a very common exam question.</p></div>

<h3>Malware</h3>
<div class="table-wrap"><table>
<tr><th>Type</th><th>What it does</th></tr>
<tr><td><b>Virus</b></td><td>Attaches itself to a host file or program and replicates when that file is opened, deleting or corrupting data. Needs a host and a user action to spread.</td></tr>
<tr><td><b>Worm</b></td><td>Replicates itself across a network <b>without needing a host file or any user action</b>, using up bandwidth and slowing systems.</td></tr>
<tr><td><b>Trojan horse</b></td><td>Disguised as a legitimate, useful program. When installed it releases other malware.</td></tr>
<tr><td><b>Spyware</b></td><td>Secretly records what the user does, most commonly through <b>key logging</b>, and sends the data back to the attacker.</td></tr>
<tr><td><b>Adware</b></td><td>Floods the user with unwanted adverts, may redirect the browser, and can hide spyware.</td></tr>
<tr><td><b>Ransomware</b></td><td>Encrypts the user's files and demands a payment for the decryption key.</td></tr>
</table></div>

<h3>Keeping data safe</h3>
<div class="table-wrap"><table>
<tr><th>Method</th><th>How it protects</th></tr>
<tr><td><b>Access levels</b></td><td>Different users get different rights (read only, read and write, no access), so people only see the data they need. Limits damage if an account is compromised.</td></tr>
<tr><td><b>Anti-malware</b></td><td>Scans files against a database of known malware signatures, quarantines or deletes anything found, and runs in the background. Must be kept up to date.</td></tr>
<tr><td><b>Authentication</b></td><td>Proves the user is who they say they are: passwords, biometrics, two-step verification.</td></tr>
<tr><td><b>Passwords</b></td><td>Should be long, mix character types, and be changed regularly. Protects against unauthorised access, and slows brute force attacks.</td></tr>
<tr><td><b>Biometrics</b></td><td>Uses a unique physical characteristic (fingerprint, retina, face, voice). Very hard to copy and impossible to forget or share.</td></tr>
<tr><td><b>Two-step verification</b></td><td>After the password, a one-time code is sent to a separate device, so a stolen password alone is not enough.</td></tr>
<tr><td><b>Automatic software updates</b></td><td>Patches known security weaknesses as soon as fixes are released, so attackers cannot exploit them.</td></tr>
<tr><td><b>Firewall</b></td><td>Monitors traffic entering and leaving the network, compares it against criteria, and blocks anything that fails. Keeps a log and can block specific IP addresses or applications.</td></tr>
<tr><td><b>Proxy server</b></td><td>Acts as an intermediary between the user and the web server, hiding the user's IP address, filtering traffic, blocking listed sites and caching pages to speed up access. Takes the hit in a DDoS attack.</td></tr>
<tr><td><b>Privacy settings</b></td><td>Control what personal data is shared, who can see it, and whether location or ad tracking is on.</td></tr>
<tr><td><b>SSL/TLS</b></td><td>Encrypts data sent between a browser and a web server, confirmed by a digital certificate and shown by https and a padlock.</td></tr>
<tr><td><b>Checking spelling and tone</b></td><td>Phishing messages often contain spelling mistakes, odd grammar or an unusual sense of urgency, which is a warning sign.</td></tr>
</table></div>
`,
    terms: [
      ["Brute force attack", "Repeatedly trying every possible combination of characters until a password is found."],
      ["Data interception", "Stealing data by using a packet sniffer to examine packets travelling across a network."],
      ["DDoS attack", "A distributed denial of service attack that floods a server with requests so it cannot serve legitimate users."],
      ["Hacking", "Gaining unauthorised access to a computer system."],
      ["Phishing", "Sending a fake message that appears legitimate, containing a link to a fake website that captures the user's details."],
      ["Pharming", "Malicious code that redirects a user to a fake website without their knowledge, even if the correct address is typed."],
      ["Social engineering", "Manipulating people into breaking normal security procedures, often using fear or urgency."],
      ["Virus", "Malware that attaches to a host file and replicates when that file is opened, corrupting or deleting data."],
      ["Worm", "Malware that replicates itself across a network without needing a host file or user action."],
      ["Trojan horse", "Malware disguised as legitimate software that releases other malware once installed."],
      ["Spyware", "Malware that secretly records user activity, often by key logging, and sends it to the attacker."],
      ["Ransomware", "Malware that encrypts a user's files and demands payment for the decryption key."],
      ["Firewall", "Hardware or software that monitors traffic entering and leaving a network and blocks anything failing its criteria."],
      ["Proxy server", "A server that acts as an intermediary between a user and a web server, hiding the user's IP address and filtering traffic."],
      ["Two-step verification", "Requiring a second one-time code sent to another device in addition to a password."],
      ["Biometrics", "Authentication using a unique physical characteristic such as a fingerprint or retina pattern."],
      ["Access levels", "Giving different users different rights to data so they can only see what they need."],
      ["SSL", "Secure Sockets Layer: a protocol that encrypts data sent between a browser and a web server."]
    ],
    tips: [
      "Every security question wants HOW the measure works, not just its name. 'A firewall' scores 0. 'A firewall monitors incoming and outgoing traffic and blocks anything that does not meet its criteria' scores.",
      "Learn the virus vs worm difference: a worm needs no host file and no user action.",
      "If a question gives a scenario, match the defence to the threat in that scenario rather than listing everything you know."
    ],
    tools: []
  }
]},

/* ==========================================================
   6. AUTOMATED AND EMERGING TECHNOLOGIES
   ========================================================== */
{
  n: "6", title: "Automated and emerging technologies", em: "\u{1F916}", hue: 96, paper: 1,
  blurb: "Sensor-microprocessor-actuator loops, robots, and what AI actually means in this syllabus.",
  subs: [
  {
    id: "6.1", title: "Automated systems",
    goals: [
      "Describe how sensors, a microprocessor and actuators work together",
      "Apply the sensor loop to a given scenario",
      "Give advantages and drawbacks of automated systems"
    ],
    notes: `
<h3>The universal loop</h3>
<p>Nearly every automated system question can be answered with the same five steps. Learn this shape and swap in the sensor and actuator from the scenario.</p>
<ol>
<li>The <b>sensor</b> continuously measures the physical property and sends readings to the microprocessor.</li>
<li>The reading is converted to digital by an <b>ADC</b> if needed.</li>
<li>The <b>microprocessor compares</b> the reading with a <b>stored pre-set value</b>.</li>
<li>If the reading is outside the acceptable range, the microprocessor sends a signal to an <b>actuator</b> to make a change.</li>
<li>The process <b>repeats continuously</b>, and no human intervention is needed.</li>
</ol>

<h4>Worked example: a greenhouse</h4>
<pre>Temperature and moisture sensors read the greenhouse conditions.
Readings pass through an ADC to the microprocessor.
The microprocessor compares each reading with its stored pre-set value.
If it is too hot, a signal opens the window using a motor (actuator).
If the soil is too dry, a signal opens a valve to water the plants.
The cycle repeats continuously.</pre>

<h3>Where automated systems are used</h3>
<div class="table-wrap"><table>
<tr><th>Setting</th><th>Sensors</th><th>Actuators / outputs</th></tr>
<tr><td>Central heating</td><td>Temperature</td><td>Boiler and valve</td></tr>
<tr><td>Greenhouse</td><td>Temperature, moisture, humidity, light</td><td>Window motor, water valve, heater, blinds</td></tr>
<tr><td>Traffic control</td><td>Infrared, induction loop</td><td>Traffic light signals</td></tr>
<tr><td>Car park barrier</td><td>Infrared, pressure</td><td>Motor to raise the barrier</td></tr>
<tr><td>Patient monitoring</td><td>Heart rate, temperature, blood pressure</td><td>Screen display, alarm to alert staff</td></tr>
<tr><td>Manufacturing</td><td>Proximity, pressure, light</td><td>Robot arms, conveyor motors</td></tr>
</table></div>

<h3>Advantages and disadvantages</h3>
<p><b>Advantages:</b> faster response than a human, works continuously with no breaks, more accurate and consistent, safer in dangerous environments, and cheaper to run over time.<br>
<b>Disadvantages:</b> expensive to set up and install, jobs may be lost, it needs maintenance by skilled technicians, and it can fail if a sensor develops a fault or the power is lost.</p>
`,
    terms: [
      ["Automated system", "A system that uses sensors, a microprocessor and actuators to monitor and control a process without human intervention."],
      ["Pre-set value", "A stored value that a microprocessor compares sensor readings against to decide whether to act."],
      ["Microprocessor", "An integrated circuit that processes the sensor data and decides what action to take."]
    ],
    tips: [
      "Use the same five step structure every time, then swap in the sensor and actuator from the question.",
      "Always include 'compares with a stored pre-set value' and 'the process repeats continuously'. These are reliable marks.",
      "Name a specific actuator, such as a motor or valve, rather than writing 'the system opens the window'."
    ],
    tools: []
  },
  {
    id: "6.2", title: "Robotics",
    goals: [
      "State the characteristics of a robot",
      "Describe the roles robots perform",
      "Give the advantages and disadvantages of using robots"
    ],
    notes: `
<h3>Characteristics of a robot</h3>
<ul>
<li>They have a <b>mechanical structure</b> or framework</li>
<li>They have <b>electrical components</b> such as motors and a power supply</li>
<li>They contain <b>programmable instructions</b>, so their behaviour can be changed</li>
<li>They use <b>sensors</b> to gather information about their surroundings</li>
<li>They use <b>actuators</b> such as motors to move</li>
<li>They can be <b>autonomous</b> (working alone) or <b>controlled by a human operator</b></li>
</ul>

<h3>Where robots are used</h3>
<ul>
<li><b>Factories:</b> welding, painting, packing, assembly lines</li>
<li><b>Warehouses:</b> moving stock, picking orders</li>
<li><b>Agriculture:</b> planting, harvesting, spraying, milking</li>
<li><b>Medicine:</b> assisting in surgery with high precision, dispensing drugs</li>
<li><b>Domestic:</b> robot vacuum cleaners, lawn mowers</li>
<li><b>Exploration and hazardous work:</b> deep sea, space, bomb disposal, nuclear sites</li>
</ul>

<h3>How a robot senses and acts</h3>
<p>A robot runs the same loop as any automated system. Its <b>sensors</b> measure the surroundings, the <b>microprocessor</b> compares those readings with stored values and decides what to do, and its <b>actuators</b> carry out the movement. A warehouse robot, for example, uses proximity sensors to detect a shelf, a microprocessor to work out that it has arrived, and motors to lower its lifting platform.</p>

<h3>Advantages</h3>
<ul>
<li>They can work <b>24 hours a day</b> without breaks, holidays or pay</li>
<li>Higher <b>productivity</b> and consistent, repeatable <b>accuracy</b></li>
<li>They can work in environments that are <b>dangerous to humans</b></li>
<li>Lower running costs in the long term, and less waste from mistakes</li>
</ul>

<h3>Disadvantages</h3>
<ul>
<li><b>High initial cost</b> to buy, install and program</li>
<li><b>Job losses</b> for people doing manual and repetitive work</li>
<li>They lack <b>flexibility</b>: a robot cannot easily switch to a different task and cannot deal with the unexpected</li>
<li>Skills can be <b>lost</b> from the workforce over time</li>
<li>Maintenance requires <b>specialist technicians</b>, and a breakdown can stop the entire line</li>
</ul>
`,
    terms: [
      ["Robot", "A machine with a mechanical structure, electrical components, sensors, actuators and programmable instructions that can carry out tasks."],
      ["Autonomous", "Able to operate without human control."]
    ],
    tips: [
      "'They do not need paying' is a valid mark, but pair it with something technical such as consistent accuracy.",
      "Lack of flexibility is the disadvantage most students forget. A robot only does what it is programmed to do."
    ],
    tools: []
  },
  {
    id: "6.3", title: "Artificial intelligence",
    goals: [
      "Define artificial intelligence and machine learning",
      "Describe the components of an expert system",
      "Give advantages and disadvantages of expert systems"
    ],
    notes: `
<h3>Artificial intelligence</h3>
<p><b>AI</b> is the simulation of human intelligence by a computer system: the machine gathers data, applies rules, and reaches conclusions or decisions in a way that mimics human reasoning.</p>
<p><b>Machine learning</b> is a type of AI where the system <b>improves its own performance automatically as it is given more data</b>, without being explicitly reprogrammed. Examples: recommendation systems, spam filters, image and speech recognition.</p>

<h3>Expert systems</h3>
<p>An <b>expert system</b> is designed to replicate the knowledge and decision-making of a human expert in a specific field, such as medical diagnosis, mineral prospecting, tax advice, chess or fault finding in machinery.</p>
<div class="table-wrap"><table>
<tr><th>Component</th><th>What it holds or does</th></tr>
<tr><td><b>Knowledge base</b></td><td>A large database of facts collected from human experts in that field</td></tr>
<tr><td><b>Rule base</b></td><td>A set of inference rules in the form IF ... THEN ... that the system reasons with</td></tr>
<tr><td><b>Inference engine</b></td><td>The problem solving part: it searches the knowledge base and applies the rules to reach a conclusion, acting like the brain of the system</td></tr>
<tr><td><b>Explanation system</b></td><td>Explains the reasoning behind the conclusion and gives the percentage probability of accuracy</td></tr>
<tr><td><b>User interface</b></td><td>Allows the user to answer questions and view the results, usually as a series of questions</td></tr>
</table></div>

<h4>How it is used</h4>
<ol>
<li>An interactive user interface asks the user a series of questions.</li>
<li>The answers are matched against the <b>knowledge base</b> by the <b>inference engine</b>.</li>
<li>The <b>rule base</b> is applied to narrow down the possibilities.</li>
<li>The system outputs its conclusion, together with a probability and an explanation of its reasoning.</li>
</ol>

<h3>Advantages and disadvantages</h3>
<p><b>Advantages:</b> high accuracy and consistency, expert knowledge available where no human expert exists, faster diagnosis, cheaper than employing several experts, and knowledge is never lost or forgotten.<br>
<b>Disadvantages:</b> expensive to set up and to maintain, it needs training to use properly, it lacks common sense and cannot deal with situations outside its knowledge base, and users may trust its conclusions without questioning them.</p>
`,
    terms: [
      ["Artificial intelligence", "The simulation of human intelligence by a computer, which gathers data, applies rules and reaches conclusions."],
      ["Machine learning", "A type of AI where the system automatically improves its performance as it is given more data."],
      ["Expert system", "A system that replicates the knowledge and decision making of a human expert in a specific field."],
      ["Knowledge base", "The database of facts within an expert system, collected from human experts."],
      ["Rule base", "The set of IF ... THEN ... inference rules used by an expert system."],
      ["Inference engine", "The part of an expert system that applies the rules to the knowledge base to reach a conclusion."],
      ["Explanation system", "The part of an expert system that explains its reasoning and states the probability of its conclusion."]
    ],
    tips: [
      "Learn the four or five components of an expert system by name. It is a guaranteed mark scheme list.",
      "The inference engine is the 'brain'. The knowledge base is the facts. Do not swap them."
    ],
    tools: []
  }
]}
];
