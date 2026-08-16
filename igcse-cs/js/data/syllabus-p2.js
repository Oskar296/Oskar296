/* Cambridge IGCSE Computer Science 0478 / 0984 - Paper 2: Algorithms, Programming and Logic */

window.SYLLABUS_P2 = [
/* ==========================================================
   7. ALGORITHM DESIGN AND PROBLEM-SOLVING
   ========================================================== */
{
  n: "7", title: "Algorithm design and problem-solving", em: "\u{1F9E0}", hue: 40, paper: 2,
  blurb: "Break the problem down, draw it, trace it, then break it on purpose with your own test data.",
  subs: [
  {
    id: "7.1", title: "The program development life cycle",
    goals: [
      "Describe analysis, design, coding and testing",
      "Explain abstraction and decomposition",
      "Choose suitable test data and explain why it is used"
    ],
    notes: `
<h3>The four stages</h3>
<div class="table-wrap"><table>
<tr><th>Stage</th><th>What happens</th></tr>
<tr><td><b>Analysis</b></td><td>The problem is investigated and defined. Involves <b>abstraction</b>, <b>decomposition</b> and identifying the requirements.</td></tr>
<tr><td><b>Design</b></td><td>The solution is planned using <b>structure diagrams</b>, <b>flowcharts</b> and <b>pseudocode</b>. No code is written yet.</td></tr>
<tr><td><b>Coding</b></td><td>The design is written as program code in a chosen language, then iterative testing removes errors as you go.</td></tr>
<tr><td><b>Testing</b></td><td>The finished program is run with carefully chosen test data to prove it works and to find remaining errors.</td></tr>
</table></div>

<h3>Abstraction and decomposition</h3>
<ul>
<li><b>Abstraction</b> means keeping only the details that matter for the problem and <b>removing everything else</b>. A train map keeps the order of stations and drops the real distances.</li>
<li><b>Decomposition</b> means breaking a problem into <b>smaller sub-problems</b> that can each be solved separately, then combined.</li>
</ul>
<p>Decomposition asks four questions of the problem: what are the <b>inputs</b>, what <b>processing</b> is needed, what are the <b>outputs</b>, and what <b>storage</b> is required.</p>

<h3>Types of error</h3>
<div class="table-wrap"><table>
<tr><th>Error</th><th>Meaning</th><th>Example</th></tr>
<tr><td><b>Syntax error</b></td><td>The code breaks the rules of the language, so it will not run at all</td><td>A missing bracket, or <code>PRNT "hello"</code></td></tr>
<tr><td><b>Logic error</b></td><td>The program runs, but produces the wrong result</td><td>Using <code>+</code> where <code>*</code> was meant, or a loop that runs one time too many</td></tr>
<tr><td><b>Run-time error</b></td><td>The program crashes while it is running</td><td>Dividing by zero, or reading past the end of an array</td></tr>
</table></div>

<h3>Test data</h3>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Meaning</th><th>Example for "enter a mark from 0 to 100"</th></tr>
<tr><td><b>Normal</b></td><td>Sensible data that should be accepted</td><td>45, 78</td></tr>
<tr><td><b>Abnormal / erroneous</b></td><td>Data that should be rejected</td><td>-5, 150, "hello", a blank entry</td></tr>
<tr><td><b>Extreme</b></td><td>The largest and smallest values that are still accepted</td><td>0 and 100</td></tr>
<tr><td><b>Boundary</b></td><td>The values on <b>each side</b> of the limit, one accepted and one rejected</td><td>0 and -1, then 100 and 101</td></tr>
</table></div>
<div class="callout trap"><div class="ttl">Extreme vs boundary</div>
<p>Extreme data is a <b>single accepted value</b> at the limit. Boundary data comes in <b>pairs</b>: the last accepted value and the first rejected value. If the question says boundary, give two values per limit.</p></div>
`,
    terms: [
      ["Abstraction", "Keeping only the details that are relevant to the problem and removing everything else."],
      ["Decomposition", "Breaking a problem down into smaller sub-problems that can be solved individually."],
      ["Syntax error", "An error that breaks the rules of the programming language, preventing the program from running."],
      ["Logic error", "An error where the program runs but gives an incorrect result."],
      ["Run-time error", "An error that causes the program to crash while it is running."],
      ["Normal data", "Sensible test data that the program should accept."],
      ["Abnormal data", "Test data that the program should reject, such as the wrong type or out of range."],
      ["Extreme data", "The largest and smallest values that a program should still accept."],
      ["Boundary data", "Pairs of values either side of a limit, one that should be accepted and one that should be rejected."]
    ],
    tips: [
      "If a question asks for boundary data you must give two values per boundary. One value only gets half the marks.",
      "Learn one clean definition each for abstraction and decomposition. They come up almost every series."
    ],
    tools: []
  },
  {
    id: "7.2", title: "Flowcharts, pseudocode and structure diagrams",
    goals: [
      "Use the correct flowchart symbols",
      "Read and write standard pseudocode",
      "Interpret a structure diagram"
    ],
    notes: `
<h3>Flowchart symbols</h3>
<div class="table-wrap"><table>
<tr><th>Symbol</th><th>Name</th><th>Used for</th></tr>
<tr><td>Rounded rectangle</td><td>Terminator</td><td>BEGIN and END</td></tr>
<tr><td>Parallelogram</td><td>Input / output</td><td>INPUT and OUTPUT</td></tr>
<tr><td>Rectangle</td><td>Process</td><td>A calculation or an assignment</td></tr>
<tr><td>Diamond</td><td>Decision</td><td>A condition, with Yes and No branches</td></tr>
<tr><td>Arrow</td><td>Flow line</td><td>The direction of flow</td></tr>
</table></div>
<div class="callout trap"><div class="ttl">Marks lost here</div>
<p>Every decision diamond must have <b>both branches labelled</b> Yes and No (or True and False). Unlabelled branches lose the mark even if the logic is right.</p></div>

<h3>The pseudocode you are expected to use</h3>
<div class="callout trap"><div class="ttl">Write pseudocode, not Python</div>
<p>On Paper 2, any answer involving code must be written in <b>pseudocode</b>. A solution written in a programming language <b>scores no marks</b>. The only exception is the 15 mark scenario question at the end of the paper, where you may use pseudocode or Python, Visual Basic or Java. Learn this notation properly, because for most of the paper it is the only notation that counts.</p></div>

<pre><span class="cm">// declaration and assignment</span>
<span class="kw">DECLARE</span> Count : INTEGER
<span class="kw">CONSTANT</span> VAT = 0.2
Count &#8592; 0

<span class="cm">// input and output</span>
<span class="kw">INPUT</span> Name
<span class="kw">OUTPUT</span> <span class="st">"Hello "</span>, Name

<span class="cm">// selection</span>
<span class="kw">IF</span> Score &gt;= 50
  <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="st">"Pass"</span>
  <span class="kw">ELSE</span>
    <span class="kw">OUTPUT</span> <span class="st">"Fail"</span>
<span class="kw">ENDIF</span>

<span class="kw">CASE OF</span> Choice
  1 : <span class="kw">OUTPUT</span> <span class="st">"One"</span>
  2 : <span class="kw">OUTPUT</span> <span class="st">"Two"</span>
  <span class="kw">OTHERWISE OUTPUT</span> <span class="st">"Invalid"</span>
<span class="kw">ENDCASE</span>

<span class="cm">// iteration</span>
<span class="kw">FOR</span> i &#8592; 1 <span class="kw">TO</span> 10
  <span class="kw">OUTPUT</span> i
<span class="kw">NEXT</span> i

<span class="kw">WHILE</span> Total &lt; 100 <span class="kw">DO</span>
  Total &#8592; Total + 10
<span class="kw">ENDWHILE</span>

<span class="kw">REPEAT</span>
  <span class="kw">INPUT</span> Password
<span class="kw">UNTIL</span> Password = <span class="st">"letmein"</span></pre>

<h3>Structure diagrams</h3>
<p>A <b>structure diagram</b> shows a system broken into its sub-systems in a hierarchy, like a family tree. The whole system sits at the top, and each level below shows the parts it decomposes into. It shows <b>what</b> the parts are, not the order they run in, which is what a flowchart shows.</p>
`,
    terms: [
      ["Flowchart", "A diagram that shows the steps of an algorithm using standard symbols joined by flow lines."],
      ["Pseudocode", "A structured, language-independent way of writing an algorithm using English-like keywords."],
      ["Structure diagram", "A hierarchical diagram showing a system broken down into its sub-systems."]
    ],
    tips: [
      "Answers involving code must be in pseudocode. The only place a programming language is accepted is the 15 mark scenario question.",
      "In a FOR loop, the counter is set automatically. Do not add your own 'Count = Count + 1' inside it.",
      "WHILE tests the condition BEFORE the loop body, so it may run zero times. REPEAT tests AFTER, so it always runs at least once.",
      "Match every IF with an ENDIF and every WHILE with an ENDWHILE. Examiners look for the closing keyword."
    ],
    tools: []
  },
  {
    id: "7.3", title: "Explaining and refining algorithms",
    goals: [
      "Complete a trace table for a given algorithm",
      "Identify and correct errors in an algorithm",
      "Suggest and justify improvements"
    ],
    notes: `
<h3>Trace tables</h3>
<p>A <b>trace table</b> records the value of every variable each time it changes, plus anything that is output. It is how you find a logic error without running the code, and it is a guaranteed question on Paper 2.</p>

<h4>Method that does not go wrong</h4>
<ol>
<li>Draw one column per variable named in the question, plus an OUTPUT column.</li>
<li>Work through the algorithm <b>one line at a time</b>. Do not skip ahead.</li>
<li>Write a new value on a <b>new row</b> only when that variable actually changes. Leave the other cells blank.</li>
<li>Check the loop condition <b>every single pass</b>, even when the answer feels obvious.</li>
<li>Anything the algorithm outputs goes in the OUTPUT column on the row where it happens.</li>
</ol>

<h4>Worked example</h4>
<pre>Total &#8592; 0
<span class="kw">FOR</span> i &#8592; 1 <span class="kw">TO</span> 4
  Total &#8592; Total + i
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Total</pre>
<div class="table-wrap"><table class="mono">
<tr><th>i</th><th>Total</th><th>OUTPUT</th></tr>
<tr><td></td><td>0</td><td></td></tr>
<tr><td>1</td><td>1</td><td></td></tr>
<tr><td>2</td><td>3</td><td></td></tr>
<tr><td>3</td><td>6</td><td></td></tr>
<tr><td>4</td><td>10</td><td>10</td></tr>
</table></div>

<h3>Finding errors in an algorithm</h3>
<p>Common planted errors to look for:</p>
<ul>
<li>A loop that runs <b>one time too many or too few</b>, an "off by one" error</li>
<li>A counter or total <b>not initialised</b> to zero before the loop</li>
<li><code>&gt;</code> used where <code>&gt;=</code> was needed, so the boundary value is handled wrongly</li>
<li>The total <b>divided inside the loop</b> instead of after it</li>
<li>Output placed inside a loop when it should be after it</li>
<li>A variable updated in the wrong order, so an old value is used</li>
</ul>

<h3>Refining an algorithm</h3>
<p>Improvements you can usually justify: adding <b>validation</b> so bad input is rejected, adding a <b>totalling or counting</b> variable, replacing repeated code with a <b>loop</b>, replacing separate variables with an <b>array</b>, splitting long code into <b>procedures or functions</b>, and adding <b>comments and meaningful identifier names</b> so the code is easier to maintain.</p>
`,
    terms: [
      ["Trace table", "A table used to record the value of each variable and any output as an algorithm is stepped through."],
      ["Dry run", "Working through an algorithm by hand, usually with a trace table, to check that it works."]
    ],
    tips: [
      "Only write a value on a row when the variable changes. Repeating unchanged values across every row loses marks.",
      "Trace the loop condition on the final pass too. That is where the marks are usually placed.",
      "If the trace produces an answer you did not expect, that is often the point of the question. Trust the trace, not your instinct."
    ],
    tools: [["Trace table trainer", "#/tool/trace"]]
  },
  {
    id: "7.4", title: "Producing algorithms",
    goals: [
      "Write an algorithm from a written description",
      "Use validation and verification correctly",
      "Use totalling, counting and searching in an algorithm"
    ],
    notes: `
<h3>Standard building blocks</h3>
<p>Most Paper 2 algorithm questions are built from these. Learn them as patterns.</p>

<h4>Totalling and counting</h4>
<pre>Total &#8592; 0
Count &#8592; 0
<span class="kw">REPEAT</span>
  <span class="kw">INPUT</span> Value
  <span class="kw">IF</span> Value &lt;&gt; -1
    <span class="kw">THEN</span>
      Total &#8592; Total + Value   <span class="cm">// totalling</span>
      Count &#8592; Count + 1       <span class="cm">// counting</span>
  <span class="kw">ENDIF</span>
<span class="kw">UNTIL</span> Value = -1
<span class="kw">OUTPUT</span> <span class="st">"Average is "</span>, Total / Count</pre>
<p>The <code>-1</code> here is a <b>rogue value</b> (also called a sentinel or flag): a value outside the valid range used to stop the loop.</p>

<h4>Finding the largest and smallest</h4>
<pre>Highest &#8592; 0
Lowest &#8592; 1000
<span class="kw">FOR</span> i &#8592; 1 <span class="kw">TO</span> 20
  <span class="kw">INPUT</span> Value
  <span class="kw">IF</span> Value &gt; Highest <span class="kw">THEN</span> Highest &#8592; Value <span class="kw">ENDIF</span>
  <span class="kw">IF</span> Value &lt; Lowest  <span class="kw">THEN</span> Lowest  &#8592; Value <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i</pre>

<h4>Linear search</h4>
<pre>Found &#8592; FALSE
i &#8592; 1
<span class="kw">WHILE</span> i &lt;= 10 <span class="kw">AND</span> Found = FALSE <span class="kw">DO</span>
  <span class="kw">IF</span> List[i] = SearchItem <span class="kw">THEN</span> Found &#8592; TRUE <span class="kw">ENDIF</span>
  i &#8592; i + 1
<span class="kw">ENDWHILE</span></pre>

<h3>Validation</h3>
<p><b>Validation</b> is an automatic check by the computer that data is <b>sensible and within acceptable limits</b>. It cannot check the data is actually correct.</p>
<div class="table-wrap"><table>
<tr><th>Check</th><th>What it tests</th></tr>
<tr><td>Range check</td><td>The value is between an upper and lower limit</td></tr>
<tr><td>Length check</td><td>The data has an exact or minimum number of characters</td></tr>
<tr><td>Type check</td><td>The data is the right data type, for example an integer</td></tr>
<tr><td>Presence check</td><td>Data has actually been entered and the field is not blank</td></tr>
<tr><td>Format check</td><td>The data follows a required pattern, such as dd/mm/yyyy</td></tr>
<tr><td>Check digit</td><td>A digit calculated from the others detects entry errors in a long number</td></tr>
</table></div>

<h3>Verification</h3>
<p><b>Verification</b> checks that data has been <b>accurately copied or entered</b>, matching the original source.</p>
<ul>
<li><b>Double entry:</b> the data is entered twice and the two versions are compared, for example a new password.</li>
<li><b>Visual check:</b> the person entering the data reads it back against the original document. This is not the same as proofreading for meaning.</li>
</ul>

<div class="callout tip"><div class="ttl">One line that separates them</div>
<p>Validation asks "is this <b>reasonable</b>?" Verification asks "is this <b>what was actually given to me</b>?" A birthday of 31/02/2010 fails validation. A correctly typed but wrong birthday passes both, which is why neither guarantees correct data.</p></div>
`,
    terms: [
      ["Validation", "An automatic check by the computer that data entered is sensible and within acceptable limits."],
      ["Verification", "A check that data has been accurately copied or entered, matching the original source."],
      ["Range check", "A validation check that data falls between a given lower and upper limit."],
      ["Presence check", "A validation check that data has actually been entered."],
      ["Format check", "A validation check that data follows a required pattern."],
      ["Double entry", "A verification method where data is entered twice and the two entries are compared."],
      ["Rogue value", "A value outside the range of normal data, used to signal the end of input and stop a loop."],
      ["Linear search", "Checking each item of a list in turn until the required item is found or the end is reached."]
    ],
    tips: [
      "A validation check must be named AND explained for full marks. 'Range check, so the value must be between 1 and 10'.",
      "Validation does not prove data is correct, only that it is plausible. Say this if asked to evaluate it.",
      "Initialise your total and counter to 0 before the loop. It is the most commonly dropped mark in the whole paper."
    ],
    tools: [["Trace table trainer", "#/tool/trace"]]
  }
]},

/* ==========================================================
   8. PROGRAMMING
   ========================================================== */
{
  n: "8", title: "Programming", em: "\u{1F4BB}", hue: 160, paper: 2,
  blurb: "Data types, the three programming constructs, arrays, subroutines and file handling.",
  subs: [
  {
    id: "8.1", title: "Programming concepts",
    goals: [
      "Use the correct data types",
      "Use sequence, selection and iteration",
      "Use arithmetic, logical and Boolean operators",
      "Use string handling and library routines",
      "Write and call procedures and functions, passing parameters"
    ],
    notes: `
<h3>Data types</h3>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Holds</th><th>Example</th></tr>
<tr><td><b>INTEGER</b></td><td>A whole number, positive or negative</td><td>42, -7</td></tr>
<tr><td><b>REAL</b></td><td>A number with a decimal part</td><td>3.75, -0.5</td></tr>
<tr><td><b>CHAR</b></td><td>A single character</td><td>'A'</td></tr>
<tr><td><b>STRING</b></td><td>A sequence of characters</td><td>"Hello world"</td></tr>
<tr><td><b>BOOLEAN</b></td><td>One of two values</td><td>TRUE, FALSE</td></tr>
</table></div>

<h3>Variables and constants</h3>
<ul>
<li>A <b>variable</b> is a named storage location whose value <b>can change</b> while the program runs.</li>
<li>A <b>constant</b> is a named value that is set once and <b>cannot change</b>. Use one for a value like VAT or Pi: it makes the program easier to read and means a change only has to be made in one place.</li>
</ul>

<h3>The three basic constructs</h3>
<ul>
<li><b>Sequence:</b> statements run one after another in order.</li>
<li><b>Selection:</b> a choice is made using IF or CASE.</li>
<li><b>Iteration:</b> statements repeat using a loop.</li>
</ul>

<h4>The three loops</h4>
<div class="table-wrap"><table>
<tr><th>Loop</th><th>Type</th><th>Use when</th></tr>
<tr><td><b>FOR ... NEXT</b></td><td>Count controlled</td><td>You know exactly how many times to repeat</td></tr>
<tr><td><b>WHILE ... ENDWHILE</b></td><td>Pre-condition</td><td>You do not know the number of repeats, and it may need to run <b>zero</b> times</td></tr>
<tr><td><b>REPEAT ... UNTIL</b></td><td>Post-condition</td><td>You do not know the number of repeats, but it must run <b>at least once</b></td></tr>
</table></div>

<h3>Operators</h3>
<p><b>Arithmetic:</b> <code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>^</code> and the library routines <code>DIV</code> (whole number part of a division) and <code>MOD</code> (remainder).</p>
<pre>17 DIV 5 = 3      17 MOD 5 = 2</pre>
<p><b>Comparison:</b> <code>=</code> <code>&lt;&gt;</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code><br>
<b>Boolean:</b> <code>AND</code> (both must be true), <code>OR</code> (at least one true), <code>NOT</code> (reverses).</p>
<div class="callout tip"><div class="ttl">MOD is worth knowing cold</div>
<p><code>Number MOD 2 = 0</code> tests for an even number. <code>Number MOD n = 0</code> tests whether Number divides exactly by n. These come up constantly.</p></div>

<h3>String handling</h3>
<div class="table-wrap"><table>
<tr><th>Routine</th><th>Does</th><th>Example</th></tr>
<tr><td><code>LENGTH(s)</code></td><td>Number of characters</td><td>LENGTH("Hello") = 5</td></tr>
<tr><td><code>SUBSTRING(s, start, len)</code></td><td>Part of a string</td><td>SUBSTRING("Computer", 1, 3) = "Com"</td></tr>
<tr><td><code>UCASE(s)</code> / <code>LCASE(s)</code></td><td>Convert case</td><td>UCASE("abc") = "ABC"</td></tr>
</table></div>
<p>Converting an input to upper case before comparing it is the standard way to accept both "Yes" and "yes".</p>

<h3>Library routines</h3>
<ul>
<li><code>ROUND(number, places)</code> rounds to a number of decimal places</li>
<li><code>RANDOM()</code> generates a random number</li>
<li><code>DIV</code> and <code>MOD</code> as above</li>
</ul>

<h3>Procedures and functions</h3>
<div class="table-wrap"><table>
<tr><th></th><th>Procedure</th><th>Function</th></tr>
<tr><td>Returns a value?</td><td>No</td><td><b>Yes</b></td></tr>
<tr><td>How it is called</td><td><code>CALL Greet("Sam")</code></td><td>Used inside an expression: <code>x &#8592; Cube(3)</code></td></tr>
</table></div>
<pre><span class="kw">PROCEDURE</span> Greet(Name : STRING)
  <span class="kw">OUTPUT</span> <span class="st">"Hello "</span>, Name
<span class="kw">ENDPROCEDURE</span>

<span class="kw">FUNCTION</span> Cube(n : INTEGER) <span class="kw">RETURNS</span> INTEGER
  <span class="kw">RETURN</span> n * n * n
<span class="kw">ENDFUNCTION</span></pre>
<p>A <b>parameter</b> is the variable listed in the definition. An <b>argument</b> is the actual value passed in when it is called.</p>
<p><b>Why use subroutines?</b> The code is written once and reused many times, the program is easier to read and to test, work can be split between programmers, and a change only needs to be made in one place.</p>

<h3>Local and global variables</h3>
<ul>
<li>A <b>local</b> variable exists only inside the subroutine where it is declared. It is safer because it cannot be changed by accident elsewhere, and it frees memory when the subroutine ends.</li>
<li>A <b>global</b> variable can be used anywhere in the program. It is convenient for data many parts need, but it risks being changed accidentally and uses memory the whole time the program runs.</li>
</ul>
`,
    terms: [
      ["Variable", "A named storage location whose value can change while the program is running."],
      ["Constant", "A named value that is set once and cannot be changed while the program runs."],
      ["Sequence", "Program statements carried out one after another in order."],
      ["Selection", "Choosing between different paths through a program using IF or CASE."],
      ["Iteration", "Repeating a set of statements using a loop."],
      ["Count-controlled loop", "A loop such as FOR that repeats a known number of times."],
      ["Pre-condition loop", "A loop such as WHILE that tests its condition before the body runs, so it may run zero times."],
      ["Post-condition loop", "A loop such as REPEAT UNTIL that tests its condition after the body, so it always runs at least once."],
      ["Procedure", "A named subroutine that carries out a task but does not return a value."],
      ["Function", "A named subroutine that carries out a task and returns a single value."],
      ["Parameter", "A variable listed in a subroutine definition that receives a value when the subroutine is called."],
      ["Local variable", "A variable that can only be used inside the subroutine in which it is declared."],
      ["Global variable", "A variable that can be used anywhere in the program."],
      ["MOD", "An operator that gives the remainder after a whole number division."],
      ["DIV", "An operator that gives the whole number part of a division, ignoring the remainder."]
    ],
    tips: [
      "If the number of repeats is known, use FOR. If it might need zero repeats, use WHILE. If it must run once, use REPEAT.",
      "A function RETURNS a value, a procedure does not. Almost every subroutine question tests this one distinction.",
      "Declare your variables with the correct data type at the start. Free marks in the code writing question."
    ],
    tools: [["Trace table trainer", "#/tool/trace"]]
  },
  {
    id: "8.2", title: "Arrays",
    goals: [
      "Declare and use one-dimensional arrays",
      "Declare and use two-dimensional arrays",
      "Use a loop to read through or write to an array"
    ],
    notes: `
<h3>Why arrays</h3>
<p>An <b>array</b> is a data structure holding many values of the <b>same data type</b> under <b>one identifier</b>. Each value is reached by its <b>index</b>. Without arrays you would need 30 separate variables for 30 marks, and you could not loop through them.</p>

<h3>One-dimensional arrays</h3>
<pre><span class="kw">DECLARE</span> Names : <span class="kw">ARRAY</span>[1:5] <span class="kw">OF</span> STRING

Names[1] &#8592; <span class="st">"Ada"</span>
Names[2] &#8592; <span class="st">"Alan"</span>

<span class="cm">// write to every element</span>
<span class="kw">FOR</span> i &#8592; 1 <span class="kw">TO</span> 5
  <span class="kw">INPUT</span> Names[i]
<span class="kw">NEXT</span> i

<span class="cm">// read every element</span>
<span class="kw">FOR</span> i &#8592; 1 <span class="kw">TO</span> 5
  <span class="kw">OUTPUT</span> Names[i]
<span class="kw">NEXT</span> i</pre>

<h3>Two-dimensional arrays</h3>
<p>A 2D array is a table with <b>rows and columns</b>, written <code>Array[row, column]</code>. It needs <b>nested loops</b>: the outer loop moves down the rows and the inner loop moves across the columns.</p>
<pre><span class="kw">DECLARE</span> Marks : <span class="kw">ARRAY</span>[1:3, 1:4] <span class="kw">OF</span> INTEGER

<span class="kw">FOR</span> Row &#8592; 1 <span class="kw">TO</span> 3
  <span class="kw">FOR</span> Col &#8592; 1 <span class="kw">TO</span> 4
    <span class="kw">INPUT</span> Marks[Row, Col]
  <span class="kw">NEXT</span> Col
<span class="kw">NEXT</span> Row</pre>

<h4>Totalling one row of a 2D array</h4>
<pre>Total &#8592; 0
<span class="kw">FOR</span> Col &#8592; 1 <span class="kw">TO</span> 4
  Total &#8592; Total + Marks[2, Col]
<span class="kw">NEXT</span> Col
<span class="kw">OUTPUT</span> <span class="st">"Student 2 total: "</span>, Total</pre>

<div class="callout trap"><div class="ttl">Index traps</div>
<p>Cambridge pseudocode arrays usually start at <b>1</b>, but Python lists start at <b>0</b>. Read the declaration in the question and match it. Going past the last index causes a run-time error.</p></div>
`,
    terms: [
      ["Array", "A data structure that stores multiple values of the same data type under one identifier, each accessed by an index."],
      ["Index", "The position number used to access a particular element of an array."],
      ["One-dimensional array", "An array of elements arranged in a single list."],
      ["Two-dimensional array", "An array arranged in rows and columns, accessed with two indexes."],
      ["Nested loop", "A loop placed inside another loop, needed to work through a two-dimensional array."]
    ],
    tips: [
      "Use the loop counter as the index. Writing Names[i] inside a FOR loop is what the mark scheme wants.",
      "For a 2D array, the outer loop is rows and the inner loop is columns. Say which is which in your answer.",
      "Check whether the question's array starts at 0 or 1 before you write any indexes."
    ],
    tools: []
  },
  {
    id: "8.3", title: "File handling",
    goals: [
      "Explain why data is stored in a file",
      "Open, read from, write to and close a text file"
    ],
    notes: `
<h3>Why use a file?</h3>
<p>Variables and arrays are held in RAM, which is <b>volatile</b>, so their contents are lost when the program ends. Writing to a <b>file</b> stores the data on secondary storage <b>permanently</b>, so it can be read back the next time the program runs.</p>

<h3>Writing to a file</h3>
<pre><span class="kw">OPENFILE</span> <span class="st">"Scores.txt"</span> <span class="kw">FOR WRITE</span>
<span class="kw">WRITEFILE</span> <span class="st">"Scores.txt"</span>, Name
<span class="kw">CLOSEFILE</span> <span class="st">"Scores.txt"</span></pre>
<p><b>FOR WRITE</b> creates a new file, or <b>overwrites</b> an existing one. <b>FOR APPEND</b> adds to the end of an existing file without destroying what is there.</p>

<h3>Reading from a file</h3>
<pre><span class="kw">OPENFILE</span> <span class="st">"Scores.txt"</span> <span class="kw">FOR READ</span>
<span class="kw">WHILE NOT</span> EOF(<span class="st">"Scores.txt"</span>) <span class="kw">DO</span>
  <span class="kw">READFILE</span> <span class="st">"Scores.txt"</span>, LineOfText
  <span class="kw">OUTPUT</span> LineOfText
<span class="kw">ENDWHILE</span>
<span class="kw">CLOSEFILE</span> <span class="st">"Scores.txt"</span></pre>
<p><code>EOF</code> means end of file. Looping until EOF is how you read a file of unknown length.</p>

<div class="callout trap"><div class="ttl">Always close the file</div>
<p>Forgetting <code>CLOSEFILE</code> is a standard dropped mark. It also risks data not being written properly and the file being locked.</p></div>
`,
    terms: [
      ["File", "A named collection of data stored permanently on secondary storage."],
      ["EOF", "End of file: a marker showing that the end of the file has been reached."],
      ["Append", "Adding data to the end of an existing file without overwriting the current contents."]
    ],
    tips: [
      "Open, use, close. Every file question expects all three, in that order.",
      "FOR WRITE overwrites the whole file. If the question says 'add a record', use FOR APPEND."
    ],
    tools: []
  }
]},

/* ==========================================================
   9. DATABASES
   ========================================================== */
{
  n: "9", title: "Databases", em: "\u{1F5C3}", hue: 268, paper: 2,
  blurb: "Single-table databases, data types, primary keys and enough SQL to answer any question in the paper.",
  subs: [
  {
    id: "9.1", title: "Single-table databases and SQL",
    goals: [
      "Define record, field, table and primary key",
      "Choose appropriate data types for fields",
      "Write SQL using SELECT, FROM, WHERE, ORDER BY, SUM and COUNT"
    ],
    notes: `
<h3>Structure</h3>
<ul>
<li>A <b>table</b> is a set of data about one type of thing, arranged in rows and columns.</li>
<li>A <b>record</b> is one row: all the data about a single item.</li>
<li>A <b>field</b> is one column: one item of data held about every record.</li>
<li>The <b>primary key</b> is a field that <b>uniquely identifies each record</b>. No two records may share it, and it cannot be left empty.</li>
</ul>

<h3>Database data types</h3>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Holds</th><th>Good for</th></tr>
<tr><td>Text / alphanumeric</td><td>Letters, digits and symbols</td><td>Names, addresses, phone numbers, product codes</td></tr>
<tr><td>Character</td><td>A single character</td><td>A grade such as A, a size code M</td></tr>
<tr><td>Boolean</td><td>True or false, yes or no</td><td>InStock, MemberActive</td></tr>
<tr><td>Integer</td><td>Whole numbers</td><td>Quantity, number of pages</td></tr>
<tr><td>Real</td><td>Decimal numbers</td><td>Price, weight</td></tr>
<tr><td>Date/time</td><td>A date or a time</td><td>DateOfBirth, OrderDate</td></tr>
</table></div>
<div class="callout trap"><div class="ttl">Classic trap</div>
<p>A <b>phone number is text, not a number</b>. It can begin with 0, may contain spaces or a +, and you never do arithmetic with it. The same applies to product codes and postcodes.</p></div>

<h3>SQL</h3>
<div class="table-wrap"><table>
<tr><th>Keyword</th><th>Purpose</th></tr>
<tr><td><code>SELECT</code></td><td>Chooses which fields to display. <code>*</code> means all fields.</td></tr>
<tr><td><code>FROM</code></td><td>States which table to use</td></tr>
<tr><td><code>WHERE</code></td><td>Filters to the records matching a condition</td></tr>
<tr><td><code>ORDER BY</code></td><td>Sorts the results, <code>ASC</code> ascending or <code>DESC</code> descending</td></tr>
<tr><td><code>SUM()</code></td><td>Adds up all the values in a numeric field</td></tr>
<tr><td><code>COUNT()</code></td><td>Counts the number of records</td></tr>
</table></div>

<h4>Examples</h4>
<pre><span class="kw">SELECT</span> Title, Price
<span class="kw">FROM</span> Stock
<span class="kw">WHERE</span> Price &lt; 10.00
<span class="kw">ORDER BY</span> Price <span class="kw">DESC</span>;

<span class="kw">SELECT</span> <span class="kw">COUNT</span>(*)
<span class="kw">FROM</span> Stock
<span class="kw">WHERE</span> InStock = TRUE;

<span class="kw">SELECT</span> <span class="kw">SUM</span>(Price)
<span class="kw">FROM</span> Stock
<span class="kw">WHERE</span> Category = <span class="st">'Fiction'</span>;</pre>

<h4>Conditions in WHERE</h4>
<ul>
<li>Text values go in <b>single quotes</b>: <code>WHERE Category = 'Fiction'</code></li>
<li>Numbers and Booleans do not: <code>WHERE Price &gt;= 5</code></li>
<li>Combine with <code>AND</code> and <code>OR</code>: <code>WHERE Price &lt; 10 AND InStock = TRUE</code></li>
<li><code>LIKE</code> matches a pattern: <code>WHERE Title LIKE 'The%'</code></li>
</ul>
<p>End every SQL statement with a <b>semicolon</b>.</p>
`,
    terms: [
      ["Table", "A collection of related data about one type of thing, arranged as records and fields."],
      ["Record", "One row of a table, holding all the data about a single item."],
      ["Field", "One column of a table, holding one item of data for every record."],
      ["Primary key", "A field that uniquely identifies each record in a table."],
      ["SQL", "Structured Query Language: the language used to search and manipulate data in a database."],
      ["Query", "A request to a database that returns the records matching given criteria."]
    ],
    tips: [
      "The order is always SELECT, FROM, WHERE, ORDER BY. Writing them out of order loses marks.",
      "Put text in single quotes, leave numbers bare, and finish with a semicolon.",
      "If a question asks you to justify a primary key, say it is unique for every record and is never left blank."
    ],
    tools: [["SQL lab", "#/tool/sql"]]
  }
]},

/* ==========================================================
   10. BOOLEAN LOGIC
   ========================================================== */
{
  n: "10", title: "Boolean logic", em: "⚡", hue: 52, paper: 2,
  blurb: "Six gates, their truth tables, and turning a written scenario into a logic circuit.",
  subs: [
  {
    id: "10.1", title: "Logic gates, circuits and truth tables",
    goals: [
      "Recognise the six logic gates and their symbols",
      "Write the truth table for each gate",
      "Produce a truth table from a logic circuit or expression",
      "Produce a logic circuit or expression from a written problem"
    ],
    notes: `
<h3>The six gates</h3>
<div class="table-wrap"><table>
<tr><th>Gate</th><th>Output is 1 when</th><th>Expression</th></tr>
<tr><td><b>NOT</b></td><td>The input is 0. It reverses the input.</td><td>NOT A</td></tr>
<tr><td><b>AND</b></td><td><b>Both</b> inputs are 1</td><td>A AND B</td></tr>
<tr><td><b>OR</b></td><td><b>At least one</b> input is 1</td><td>A OR B</td></tr>
<tr><td><b>NAND</b></td><td><b>Not both</b> inputs are 1. It is AND then NOT.</td><td>NOT (A AND B)</td></tr>
<tr><td><b>NOR</b></td><td><b>Both</b> inputs are 0. It is OR then NOT.</td><td>NOT (A OR B)</td></tr>
<tr><td><b>XOR</b></td><td>The inputs are <b>different</b></td><td>A XOR B</td></tr>
</table></div>

<h3>Truth tables for two inputs</h3>
<div class="table-wrap"><table class="mono">
<tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
</table></div>
<p>Notice that NAND is the exact opposite of AND, and NOR is the exact opposite of OR. If you know AND and OR, you get two more gates for free.</p>

<h3>Building the input columns</h3>
<p>With <b>n</b> inputs there are <b>2<sup>n</sup></b> rows, so three inputs need 8 rows. Fill them in a fixed pattern so you never miss a combination:</p>
<ul>
<li>Column A: four 0s then four 1s</li>
<li>Column B: two 0s, two 1s, repeated</li>
<li>Column C: alternate 0, 1</li>
</ul>

<h3>Working through a circuit</h3>
<p>Do not try to jump to the answer. Add a <b>column for every intermediate gate output</b>, left to right, then combine them at the end.</p>
<pre>X = (A AND B) OR (NOT C)</pre>
<div class="table-wrap"><table class="mono">
<tr><th>A</th><th>B</th><th>C</th><th>A AND B</th><th>NOT C</th><th>X</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
</table></div>

<h3>Turning a scenario into logic</h3>
<p>Exam scenarios read like: "An alarm sounds (X = 1) if the temperature is above 30 (A = 1) <b>and</b> the door is open (B = 1), <b>or</b> if the manual switch is pressed (C = 1)."</p>
<ol>
<li>Underline each condition and note which letter it is.</li>
<li>Note whether the condition is true at 1 or at 0. "Is <b>not</b> pressed" means you need a <b>NOT</b>.</li>
<li>Join conditions with AND when <b>both</b> are needed, OR when <b>either</b> will do.</li>
<li>Use brackets to group the parts that belong together.</li>
</ol>
<pre>X = (A AND B) OR C</pre>
<div class="callout tip"><div class="ttl">Reading the wording</div>
<p>"and" means AND. "or" means OR. "not", "unless", "is off", "is closed" usually mean a NOT. "either ... but not both" means XOR.</p></div>
`,
    terms: [
      ["Logic gate", "An electronic component that produces an output based on its inputs following a set logical rule."],
      ["NOT gate", "A gate with one input whose output is the opposite of that input."],
      ["AND gate", "A gate whose output is 1 only when both inputs are 1."],
      ["OR gate", "A gate whose output is 1 when at least one input is 1."],
      ["NAND gate", "A gate whose output is 0 only when both inputs are 1, the opposite of AND."],
      ["NOR gate", "A gate whose output is 1 only when both inputs are 0, the opposite of OR."],
      ["XOR gate", "A gate whose output is 1 only when the inputs are different."],
      ["Truth table", "A table listing every possible combination of inputs to a logic circuit and the resulting output."],
      ["Logic expression", "A written statement of a logic circuit using the gate names and brackets, for example X = (A AND B) OR NOT C."]
    ],
    tips: [
      "Always add intermediate columns for each gate. Trying to do a three-gate circuit in your head is where the marks vanish.",
      "Fill the input columns in the standard pattern (4/4, 2/2, 1/1) so every combination appears exactly once.",
      "NAND is not 'NOT then AND'. It is AND then NOT. The same for NOR."
    ],
    tools: [["Logic lab", "#/tool/logic"]]
  }
]}
];
