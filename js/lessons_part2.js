/* Curriculum Part 2: Chords/Extensions, Voice Leading, Modes/Scales, Advanced Harmony & CAGED */
(function () {
  const L = (MT.LESSONS = MT.LESSONS || {});

  L.chord_symbols = {
    id: 'chord_symbols',
    badge: 'basis',
    title: { de: 'Akkordsymbole sicher lesen', en: 'Reading Chord Symbols' },
    units: [
      {
        title: { de: 'Die Bauanleitung von links nach rechts', en: 'Anatomy from Left to Right' },
        body: {
          de: `<p>Ein Akkordsymbol liest du immer in derselben Reihenfolge:</p>
               <p><b>Grundton</b> (C) → <b>Qualität</b> (m, °, +, sus) → <b>Septime</b> (7, maj7) → <b>Extension</b> (9, 11, 13) → <b>Alteration</b> (♭5, ♯9) → <b>Basston</b> (/E).</p>
               <ul>
                 <li>Eine <b>7 ohne Zusatz</b> meint immer die <b>kleine Septime</b> (Dominantseptakkord). Erst <code>maj</code> macht die Septime groß!</li>
                 <li>Zahlen ab <b>9</b> enthalten die Septime automatisch mit (<code>C9</code> = C7 + 9). Nur <code>add9</code> lässt die Septime weg.</li>
                 <li>Ein <b>Schrägstrich (Slash)</b> nennt den tiefsten Ton: <code>C/E</code> = C-Dur mit E im Bass.</li>
               </ul>
               <div class="callout"><strong>Goldene Regel: Jede Ziffer zählt in der Durtonleiter des Grundtons!</strong>
               Alle Ziffern im Akkordsymbol (<code>2, 4, 6, 9, 11, 13</code>) orientieren sich <b>immer an der Durtonleiter des jeweiligen Grundtons</b> – <b>auch bei Moll-Akkorden!</b> (Nur das <code>m</code> senkt die Terz auf <code>♭3</code>, und die bloße <code>7</code> meint historisch die kleine Septime <code>♭7</code>.)<br>
               <b>Klassisches Beispiel <code>Fm6</code>:</b> Ein <code>Fm6</code> besteht aus f-Moll (<code>F – A♭ – C</code>) plus der <b>großen Sexte aus F-Dur (<code>D</code>)</b> – <em>nicht</em> der kleinen Sexte <code>D♭</code> aus f-Moll! Wollte man <code>D♭</code>, müsste ausdrücklich <code>Fm(♭6)</code> stehen.</div>`,
          en: `<p>Always read a chord symbol from left to right:</p>
               <p><b>Root</b> (C) → <b>Quality</b> (m, °, +, sus) → <b>Seventh</b> (7, maj7) → <b>Extension</b> (9, 11, 13) → <b>Alteration</b> (♭5, ♯9) → <b>Bass note</b> (/E).</p>
               <ul>
                 <li>A plain <b>7</b> always means the <b>minor seventh</b>. Only <code>maj</code> makes the seventh major!</li>
                 <li>Numbers from <b>9</b> upward automatically include the 7th (<code>C9</code> = C7 + 9); <code>add9</code> omits the 7th.</li>
                 <li>A <b>slash</b> specifies the bass note: <code>C/E</code> = C major with E in the bass.</li>
               </ul>
               <div class="callout"><strong>Golden rule: Every number counts from the root’s major scale!</strong>
               All numbers in a chord symbol (<code>2, 4, 6, 9, 11, 13</code>) are <b>always measured from the major scale of the chord’s root</b> — <b>even on minor chords!</b> (Only <code>m</code> lowers the 3rd to <code>♭3</code>, and a plain <code>7</code> is the one historical exception meaning <code>♭7</code>.)<br>
               <b>Classic trap — <code>Fm6</code>:</b> An <code>Fm6</code> takes the F minor triad (<code>F – A♭ – C</code>) plus the <b>major 6th from F major (<code>D</code>)</b> — <em>not</em> the minor 6th <code>D♭</code>! For a minor 6th you would explicitly write <code>Fm(♭6)</code>.</div>`
        },
        widget: 'chord_table',
        examples: [
          {
            title: { de: 'Gleicher Grundton, sechs Klangfarben', en: 'Same root, six chord colors' },
            toks: 'I Imaj7 I7 i7 iø I°7',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Cmaj7 – C7 – Cm7 – Cø – C°7: Beobachte im Live-View, wie sich Schritt für Schritt einzelne Töne nach unten verschieben.',
              en: 'C – Cmaj7 – C7 – Cm7 – Cø – C°7: Watch single notes shift downward step by step in the Live View.'
            }
          }
        ]
      },
      {
        title: { de: 'm7♭5 (halbvermindert) vs. °7 (vollvermindert)', en: 'Half-Diminished (ø) vs. Fully Diminished (°7)' },
        body: {
          de: `<p>Diese beiden Symbole werden oft verwechselt – dabei unterscheidet sie nur ein einziger Halbton, aber ihr <b>Einsatzgebiet in der Praxis</b> ist ganz verschieden:</p>
               <ul>
                 <li><b>Halbvermindert (<code>Cm7♭5</code> / <code>Cø</code>):</b> <code>1 – ♭3 – ♭5 – ♭7</code> (C – E♭ – G♭ – [B♭]). Ein verminderter Dreiklang + <em>kleine</em> Septime.<br>
                 <b>Wann einsetzen?</b> Vor allem als <b>Subdominante / 2. Stufe in Moll-<code>ii–V–i</code>-Verbindungen</b> (<code>iiø → V7 → i</code>) und bei <b>Zwischenkadenzen zu Moll-Zielen</b> (z. B. <code>iiø/vi – V7/vi → vi</code>, also <code>[Bø7] – E7 → Am</code>) sowie auf der 7. Stufe in Dur (<code>viiø</code>). Klingt weich-melancholisch und bereitet die Dominante elegant vor.</li>
                 <li><b>Vollvermindert (<code>C°7</code>):</b> <code>1 – ♭3 – ♭5 – ♭♭7</code> (C – E♭ – G♭ – [B♭♭], klingt wie A). Vier kleine Terzen aufeinander (3+3+3+3 HT) – <b>völlig symmetrisch</b>!<br>
                 <b>Wann einsetzen?</b>
                 <ul>
                   <li><b>Chromatische Durchgangsakkorde:</b> zwischen zwei Stufen im Bass (z. B. <code>I – ♯I°7 – ii</code>, <code>IV – ♯IV°7 – I⁶₄</code> im Gospel, Blues &amp; Jazz).</li>
                   <li><b>Dominant-Würzung (<code>V7♭9</code>):</b> Ein <code>°7</code> auf der Terz einer Dominante ergibt exakt einen grundtonlosen <b><code>V7♭9</code></b> (z. B. <code>[B°7]</code> = <code>G7♭9</code> ohne G)!</li>
                   <li><b>Symmetrie-Trick:</b> Jede Umkehrung ist wieder derselbe Akkord (<code>C°7 = E♭°7 = F♯°7 = A°7</code>) – perfekt, um überraschend in entfernte Tonarten zu modulieren!</li>
                 </ul></li>
               </ul>`,
          en: `<p>These two symbols are easy to mix up, yet they differ by just one semitone — and serve very different <b>practical roles</b>:</p>
               <ul>
                 <li><b>Half-diminished (<code>Cm7♭5</code> / <code>Cø</code>):</b> <code>1 – ♭3 – ♭5 – ♭7</code> (C – E♭ – G♭ – B♭). Diminished triad + <em>minor</em> seventh.<br>
                 <b>When to use it:</b> Primarily as the <b>pre-dominant <code>iiø</code> in minor <code>ii–V–i</code> progressions</b> (<code>iiø → V7 → i</code>), in <b>secondary ii–Vs targeting minor chords</b> (<code>iiø/vi – V7/vi → vi</code>, e.g. <code>Bø7 – E7 → Am</code>), and on degree 7 in major (<code>viiø</code>).</li>
                 <li><b>Fully diminished (<code>C°7</code>):</b> <code>1 – ♭3 – ♭5 – ♭♭7</code> (C – E♭ – G♭ – B♭♭, sounds like A). Four minor thirds stacked (3+3+3+3 st) — <b>completely symmetrical</b>!<br>
                 <b>When to use it:</b>
                 <ul>
                   <li><b>Chromatic passing chords:</b> bridging bass steps (<code>I – ♯I°7 – ii</code>, <code>IV – ♯IV°7 – I⁶₄</code> in gospel, blues &amp; jazz).</li>
                   <li><b>Dominant seasoning (<code>V7♭9</code>):</b> Playing <code>°7</code> on the 3rd of a dominant yields an instant rootless <b><code>V7♭9</code></b> (<code>B°7</code> = <code>G7♭9</code> without G)!</li>
                   <li><b>Symmetrical modulation:</b> Every inversion is the exact same chord (<code>C°7 = E♭°7 = F♯°7 = A°7</code>), letting you pivot smoothly into distant keys!</li>
                 </ul></li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Moll-7 → Halbvermindert → Vollvermindert', en: 'Minor 7 → Half-diminished → Fully diminished' },
            toks: 'i7 iø I°7',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'Cm7 → Cø (Quinte fällt) → C°7 (auch Septime fällt): Höre, wie die Spannung stufenweise zunimmt.',
              en: 'Cm7 → Cø (fifth drops) → C°7 (seventh drops too): Hear the tension rise step by step.'
            }
          }
        ],
        check: {
          q: { de: 'Worin unterscheiden sich C9 und Cadd9?', en: 'What is the difference between C9 and Cadd9?' },
          opts: [
            { de: 'C9 enthält zusätzlich die kleine Septime ([B♭]), Cadd9 lässt sie weg', en: 'C9 includes the minor seventh (B♭); Cadd9 omits it' },
            { de: 'Cadd9 ist immer Moll', en: 'Cadd9 is always minor' },
            { de: 'Es gibt keinen Unterschied', en: 'There is no difference' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! C9 = C–E–G–[B♭]–D (Dominantklang), Cadd9 = C–E–G–D (klarer Pop-Dreiklang mit 9).',
            en: 'Correct! C9 = C–E–G–B♭–D (dominant), while Cadd9 = C–E–G–D (clean pop triad + 9).'
          }
        }
      }
    ]
  };

  L.extensions = {
    id: 'extensions',
    badge: 'jazz',
    title: { de: 'Vierklänge, Extensions & Hendrix-Akkord', en: 'Seventh Chords, Extensions & Hendrix Chord' },
    units: [
      {
        title: { de: 'Die Vierklang-Regel in Dur', en: 'Diatonic Seventh Chords in Major' },
        body: {
          de: `<p>Stapelst du auf jeden Dreiklang der Durtonleiter noch eine weitere Terz (die Septime), gilt in jeder Durtonart:</p>
               <ul>
                 <li><b>I & IV = maj7</b> (weich, schwebend)</li>
                 <li><b>ii, iii, vi = m7</b> (warm, jazzig)</li>
                 <li><b>V = 7</b> (Dominantsept – der einzige Akkord mit Dur-Terz + kleiner Septime!)</li>
                 <li><b>vii = m7♭5 (ø)</b> (halbvermindert)</li>
               </ul>`,
          en: `<p>Adding one more diatonic third (the 7th) to each major-scale triad always produces:</p>
               <ul>
                 <li><b>I & IV = maj7</b> (warm, lush)</li>
                 <li><b>ii, iii, vi = m7</b> (smooth, jazzy)</li>
                 <li><b>V = 7</b> (dominant 7th — the only chord with major 3rd + minor 7th!)</li>
                 <li><b>vii = m7♭5 (ø)</b> (half-diminished)</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Alle sieben Stufen-Vierklänge in Dur', en: 'All seven diatonic seventh chords' },
            toks: 'Imaj7 ii7 iii7 IVmaj7 V7 vi7 viiø',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'Cmaj7 – Dm7 – Em7 – Fmaj7 – G7 – Am7 – [Bø7]: Höre die vier verschiedenen Vierklangstypen.',
              en: 'Cmaj7 – Dm7 – Em7 – Fmaj7 – G7 – Am7 – Bø7: Hear all four diatonic seventh-chord qualities.'
            }
          }
        ]
      },
      {
        title: { de: 'Extensions (9, 11, 13) & der Hendrix-Akkord', en: 'Extensions (9, 11, 13) & the Hendrix Chord' },
        body: {
          de: `<p><b>Extensions (9, 11, 13)</b> verleihen Akkorden Farbe, ohne ihre harmonische Funktion zu verändern. Wie immer bei Akkordsymbolen zählen alle Ziffern <b>in der Durtonleiter des Akkord-Grundtons</b> – ein <code>Cm9</code> oder <code>Cm13</code> nutzt also stets die große 9 (D) bzw. große 13/6 (A), solange kein <code>♭</code> davorsteht:</p>
               <ul>
                 <li><b>Cmaj9</b> (I, IV): weich und modern · Achtung: eine reine 11 reibt an der Dur-Terz (lieber ♯11!).</li>
                 <li><b>Cm9</b> (ii, vi): samtiger Moll-Klang · auf iii meidet man die ♭9.</li>
                 <li><b>C9 / C13</b> (V): strahlender Jazz-Dominantklang · alterierte Töne (<b>♭9, ♯9, ♯5, ♭13</b>) steigern die Spannung extrem.</li>
               </ul>
               <div class="callout tip"><strong>Praxisregel: Weniger ist mehr (Clustering vermeiden!)</strong>
               Bei 9er-, 11er- oder 13er-Akkorden spielt man am Klavier oder auf der Gitarre <b>fast nie alle 5–7 Töne gleichzeitig</b> – zu viele enge Nachbartöne auf einem Haufen („Clustering“) klingen schnell matschig!
               <ul>
                 <li><b>Zuerst weglassen:</b> die reine <b>Quinte (5)</b> – sie trägt am wenigsten zur Klangfarbe bei.</li>
                 <li><b>Im Bandspiel / mit Bass:</b> oft auch den <b>Grundton in der rechten Hand</b> weglassen (die linke Hand oder der Bassist spielt ihn ohnehin).</li>
                 <li><b>Unverzichtbar bleiben:</b> <b>Terz (3)</b> und <b>Septime (7)</b> (die „Guide Tones“) plus die gewünschte <b>Extension</b> (9, 11 oder 13)!</li>
               </ul></div>
               <div class="callout song"><strong>Der Hendrix-Akkord (7♯9)</strong>
               Bekannt aus <em>„Purple Haze“</em> (Jimi Hendrix): <code>E7♯9</code> enthält gleichzeitig die <b>Dur-Terz (G♯)</b> und die <b>♯9 (G)</b>, die wie eine Moll-Terz klingt! Diese Reibung zwischen Dur und Moll erzeugt den legendären Blues-Rock-Biss.</div>`,
          en: `<p><b>Extensions (9, 11, 13)</b> add color without changing chord function. As always in chord symbols, every number is counted from the <b>major scale of the chord’s root</b> — so <code>Cm9</code> and <code>Cm13</code> always use the major 9th (D) and major 13th/6th (A) unless a <code>♭</code> is explicitly written:</p>
               <ul>
                 <li><b>Cmaj9</b> (I, IV): lush and modern · avoid natural 11 against a major 3rd (use ♯11 instead).</li>
                 <li><b>Cm9</b> (ii, vi): silky minor color.</li>
                 <li><b>C9 / C13</b> (V): bright jazz dominant · altered tones (<b>♭9, ♯9, ♯5, ♭13</b>) crank up tension.</li>
               </ul>
               <div class="callout tip"><strong>Real-world rule: Less is more (avoid clustering!)</strong>
               On piano or guitar, you <b>almost never play all 5–7 notes</b> of a 9th, 11th, or 13th chord at once — too many adjacent notes clump together (“clustering”) and sound muddy!
               <ul>
                 <li><b>Drop first:</b> the perfect <b>5th</b> (it adds the least color).</li>
                 <li><b>With a bass player / left-hand bass:</b> drop the <b>root in the right hand</b> as well.</li>
                 <li><b>Always keep:</b> the <b>3rd</b> and <b>7th</b> (“guide tones”) plus your featured <b>extension</b> (9, 11, or 13)!</li>
               </ul></div>
               <div class="callout song"><strong>The Hendrix Chord (7♯9)</strong>
               Famous from <em>“Purple Haze”</em>: <code>E7♯9</code> stacks both the <b>major third (G♯)</b> and the <b>♯9 (G, sounds like a minor third)</b>! That major-vs-minor clash creates its gritty blues-rock bite.</div>`
        },
        examples: [
          {
            title: { de: 'Dominante wird Schicht für Schicht dichter', en: 'Layering tension on the dominant' },
            toks: 'V7:2 V9:2 V13:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'G7 → G9 → G13 → Cmaj7: Dieselbe Funktion, immer reichere Klangfarbe (achte im Stufen-Modus darauf, welche Töne weggelassen werden!).', en: 'G7 → G9 → G13 → Cmaj7: Same dominant function, richer color layer by layer (switch to Degrees mode to see which tones are kept!).' }
          },
          {
            title: { de: 'Alterierte Dominanten im Jazz: V7♭9 & V7♯5', en: 'Altered jazz dominants: V7♭9 & V7♯5' },
            toks: 'ii7:1 V7b9:1 Imaj7:2 ii7:1 V+7:1 Imaj7:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7♭9 – Cmaj7, dann Dm7 – G7♯5 – Cmaj7: Vergleiche die verminderte ♭9-Spannung mit der schwebenden übermäßigen ♯5-Spannung!', en: 'Dm7 – G7♭9 – Cmaj7, then Dm7 – G7♯5 – Cmaj7: Compare the dark diminished ♭9 tension against the lifted augmented ♯5 tension!' }
          },
          {
            title: { de: 'Neunklänge in einer Kadenz', en: 'Ninth chords in a progression' },
            toks: 'Imaj9:2 vi9:2 ii9:1 V9:1 Imaj9:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Im Live-View siehst du den Grundton im Bass (gelb) und die farbigen Extensions oben in der rechten Hand (blau).', en: 'Watch the amber root in the bass clef and the colorful extensions in the right hand.' }
          },
          {
            title: { de: 'Hendrix-Akkord: I7♯9 – ♭III – IV', en: 'Hendrix chord: I7♯9 – ♭III – IV' },
            toks: 'I7#9:4 bIII:2 IV:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C7♯9 – E♭ – F: Enthält Dur-Terz und ♯9 (klingt wie Moll-Terz) gleichzeitig – der legendäre „Purple Haze“-Biss!', en: 'C7♯9 – E♭ – F: Combines major 3rd and ♯9 (sounds like minor 3rd) at once — the iconic “Purple Haze” bite!' }
          }
        ]
      }
    ]
  };

  L.sus_add_six = {
    id: 'sus_add_six',
    badge: 'pop',
    title: { de: 'Sus-, Add- und Sixth-Akkorde', en: 'Sus, Add and Sixth Chords' },
    units: [
      {
        title: { de: 'Schwebende Spannung ohne Terz (sus2 & sus4)', en: 'Floating Without a Third (sus2 & sus4)' },
        body: {
          de: `<p><b>sus</b> (<em>suspended</em> = aufgehängt) <b>ersetzt die Terz</b> durch die Sekunde (<code>sus2</code>: 1–2–5) oder die Quarte (<code>sus4</code>: 1–4–5). Ohne Terz ist der Akkord weder Dur noch Moll – offen, luftig und gespannt.</p>
               <p>Die Quarte in <b>sus4</b> wirkt wie ein Vorhalt und löst sich klassischerweise einen Halbton abwärts in die Dur-Terz auf (<code>Csus4 → C</code>: F → E). Sehr beliebt ist <code>Vsus4 → V7 → I</code>.</p>
               <p><b>add9</b> fügt einem Dreiklang die 9 hinzu (ohne Septime: C–E–G–D, typischer Akustik-Pop-Sound). <b>6</b> ergänzt die <b>große Sexte</b> (C–E–G–A: warmer, ruhiger Schlussklang).</p>
               <div class="callout tip"><strong>Wichtig bei Moll-6 (<code>m6</code>, z. B. <code>Fm6</code>): Immer die Dur-Sexte!</strong>
               Da Akkordsymbole Ziffern grundsätzlich aus der <b>Durtonleiter des Grundtons</b> abzählen, nimmt auch ein <b><code>Fm6</code></b> die <b>große Sexte aus F-Dur (<code>D</code>)</b> → <code>F – A♭ – C – D</code> (und <em>nicht</em> das <code>D♭</code> aus f-Moll)! Genau diese große Sexte über dem Moll-Dreiklang erzeugt den edlen Jazz-, Film- und Gospel-Klang.</div>
               <div class="callout song"><strong>Hör-Anker</strong><code>sus4 → Dur</code>: <em>Pinball Wizard</em> (The Who), <em>Crazy Little Thing Called Love</em> (Queen) · <code>add9</code>: <em>Every Breath You Take</em>, <em>Wonderwall</em>.</div>`,
          en: `<p><b>sus</b> (<em>suspended</em>) <b>replaces the third</b> with the 2nd (<code>sus2</code>: 1–2–5) or 4th (<code>sus4</code>: 1–4–5). Without a third, the chord is neither major nor minor — open and suspended.</p>
               <p>The 4th in <b>sus4</b> typically resolves down a semitone into the major third (<code>Csus4 → C</code>: F → E). <code>Vsus4 → V7 → I</code> is a timeless pre-ending move.</p>
               <p><b>add9</b> adds a 9th to a plain triad (no 7th: crisp pop shimmer). <b>6</b> adds the <b>major 6th</b> (warm, relaxed ending chord).</p>
               <div class="callout tip"><strong>Watch out on minor 6th chords (<code>m6</code>, e.g. <code>Fm6</code>): Always the major 6th!</strong>
               Because chord-symbol numbers always count from the <b>root’s major scale</b>, an <b><code>Fm6</code></b> adds the <b>major 6th from F major (<code>D</code>)</b> → <code>F – A♭ – C – D</code> (<em>not</em> the minor 6th <code>D♭</code>)! That bright major 6th over a minor triad is what gives <code>m6</code> its lush jazz, film, and gospel color.</div>
               <div class="callout song"><strong>Song anchors</strong><code>sus4 → major</code>: <em>Pinball Wizard</em>, <em>Crazy Little Thing Called Love</em> · <code>add9</code>: <em>Every Breath You Take</em>, <em>Wonderwall</em>.</div>`
        },
        examples: [
          {
            title: { de: 'Sus-Spannung & Auflösung', en: 'Sus tension & resolution' },
            toks: 'I:2 Isus4:1 I:2 Isus2:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Csus4 – C – Csus2 – C: Höre, wie F nach E drängt, während D über C frei schwebt.', en: 'C – Csus4 – C – Csus2 – C: Hear F pull down to E while D floats freely over C.' }
          },
          {
            title: { de: 'Vsus4 vor dem Schluss', en: 'Vsus4 before the ending' },
            toks: 'I:2 IV:2 Vsus4:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – Gsus4 – G7 – C: Die Dominante baut ihre Spannung in zwei eleganten Schritten auf.', en: 'C – F – Gsus4 – G7 – C: The dominant builds its tension in two smooth steps.' }
          },
          {
            title: { de: 'Dur-Dreiklang veredelt: 6, add9, maj9', en: 'Coloring a major triad: 6, add9, maj9' },
            toks: 'I I6 Iadd9 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Vier Nuancen derselben Tonika: schlicht → warm (6) → poppig (add9) → weich/jazzig (maj9).', en: 'Four shades of the same tonic: plain → warm (6) → pop (add9) → lush jazz (maj9).' }
          }
        ]
      }
    ]
  };

  L.voice_leading = {
    id: 'voice_leading',
    badge: 'pop',
    title: { de: 'Stimmführung & Basslinien (Slash-Chords)', en: 'Voice Leading & Bass Lines (Slash Chords)' },
    units: [
      {
        title: { de: 'Das Geheimnis eleganter Begleitung', en: 'The Secret to Smooth Accompaniment' },
        body: {
          de: `<p>Warum klingen dieselben vier Akkorde bei einem Profi sofort nach einem echten Song, während sie bei Anfängern oft „abgehackt“ wirken? Die Antwort heißt <b>Stimmführung (Voice Leading)</b>:</p>
               <ol>
                 <li><b>Gemeinsame Töne liegen lassen:</b> C-Dur (C–E–G) und Am (A–C–E) teilen C und E – bewege nur das G einen Schritt zum A!</li>
                 <li><b>Kürzeste Wege wählen:</b> Jeder Ton wandert möglichst nur einen Halb- oder Ganzton weiter.</li>
                 <li><b>Melodischer Bass (Slash-Chords):</b> Wenn du einzelne Akkorde in der <b>1. oder 3. Umkehrung</b> spielst, entsteht eine singbare, stufenweise Basslinie!</li>
               </ol>
               <div class="callout song"><strong>Der klassische „Bass-Walkdown“ in unzähligen Balladen</strong>
               <code>C – G/[B] – Am – Am7/G – F – C/E – Dm7 – G7</code><br>
               Der Bass läuft einfach die ganze Durtonleiter abwärts: <b>C → [B] → A → G → F → E → D → G</b>! (z. B. <em>Piano Man</em>, <em>A Whiter Shade of Pale</em>, <em>Canon in D</em>, <em>When I Was Your Man</em>).</div>`,
          en: `<p>Why do the exact same four chords sound polished in a pro's hands yet choppy for a beginner? The answer is <b>Voice Leading</b>:</p>
               <ol>
                 <li><b>Keep common tones:</b> C major (C–E–G) and Am (A–C–E) share C and E — just move G up one step to A!</li>
                 <li><b>Take the shortest path:</b> Move other voices by a half or whole step whenever possible.</li>
                 <li><b>Melodic bass lines (Slash Chords):</b> Using <b>1st or 3rd inversions</b> turns a jumpy bass into a singing stepwise line!</li>
               </ol>
               <div class="callout song"><strong>The iconic descending bass walkdown</strong>
               <code>C – G/B – Am – Am7/G – F – C/E – Dm7 – G7</code><br>
               The bass simply walks straight down the major scale: <b>C → B → A → G → F → E → D → G</b>! (Heard in <em>Piano Man</em>, <em>A Whiter Shade of Pale</em>, <em>Let It Be</em>).</div>`
        },
        examples: [
          {
            title: { de: 'Stufenweise absteigender Bass (Balladen-Klassiker)', en: 'Stepwise descending bass (ballad classic)' },
            toks: 'I:2 V^1:2 vi:2 vi7^3:2 IV:2 I^1:2 ii7:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – G/[B] – Am – Am7/G – F – C/E – Dm7 – G7 – C: Verfolge im Live-View den gelben Basston – er läuft Ton für Ton die Leiter abwärts! Schalte unten auch zwischen den Start-Umkehrungen um und höre, wie sich die Melodiewirkung oben verändert.',
              en: 'C – G/B – Am – Am7/G – F – C/E – Dm7 – G7 – C: Watch the amber bass note walk smoothly down the entire scale! Also switch starting inversions below to hear how the top melody transforms.'
            }
          },
          {
            title: { de: 'Aufsteigender Bass zum Zielakkord', en: 'Ascending bass line' },
            toks: 'I:2 I^1:1 IV:2 V^1:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – C/E – F – G/[B] – C: Die 1. Umkehrung C/E leitet schrittweise ins F, und G/[B] zieht über den Leitton im Bass zurück nach C.',
              en: 'C – C/E – F – G/B – C: 1st inversion C/E leads stepwise into F, and G/B pulls right up into C.'
            }
          }
        ],
        check: {
          q: { de: 'Welcher Akkord verbindet C und Am mit einer stufenweise absteigenden Basslinie (C → ? → A)?', en: 'Which chord connects C and Am with a smooth stepwise descending bass (C → ? → A)?' },
          opts: [
            { de: 'G/[B] (V in 1. Umkehrung)', en: 'G/B (V in 1st inversion)' },
            { de: 'F (IV in Grundstellung)', en: 'F (IV in root position)' },
            { de: 'Dm (ii in Grundstellung)', en: 'Dm (ii in root position)' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! G/[B] legt die Terz [B] in den Bass – so entsteht die fließende Linie C → [B] → A.',
            en: 'Spot on! G/B puts the third B in the bass, creating the smooth C → B → A line.'
          }
        }
      }
    ]
  };

  L.modes = {
    id: 'modes',
    badge: 'jazz',
    title: { de: 'Modi (Kirchentonarten)', en: 'Modes (Church Modes)' },
    units: [
      {
        title: { de: 'Gleiche Töne, neuer Grundton – der Merkton entscheidet', en: 'Same Notes, New Root — Focus on the Characteristic Note' },
        body: {
          de: `<p>Ein <b>Modus</b> entsteht, wenn du eine Durtonleiter auf einer anderen Stufe startest (genau wie a-Moll = C-Dur ab dem 6. Ton). Viel wichtiger für die Praxis ist aber die <b>Zahlenformel gemessen an Dur</b> – welcher <em>eine</em> Ton (der <b>Merkton</b>) verändert die Stimmung? Klicke einfach auf <b>▶</b>, um jeden Modus direkt ab deiner gewählten Tonart anzuhören!</p>
               <ul style="list-style:none;padding-left:0">
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="0" style="margin-right:6px">▶</button><b>Ionisch (= Dur):</b> <code>1 2 3 4 5 6 7</code> → hell, stabil</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="1" style="margin-right:6px">▶</button><b>Dorisch:</b> <code>1 2 ♭3 4 5 <b>6</b> ♭7</code> (Moll + <b>große Sexte 6</b>) → cool, jazzig, hoffnungsvoll</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="2" style="margin-right:6px">▶</button><b>Phrygisch:</b> <code>1 <b>♭2</b> ♭3 4 5 ♭6 ♭7</code> (Moll + <b>kleine Sekunde ♭2</b>) → spanisch, mystisch, dunkel</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="3" style="margin-right:6px">▶</button><b>Lydisch:</b> <code>1 2 3 <b>♯4</b> 5 6 7</code> (Dur + <b>übermäßige Quarte ♯4</b>) → schwebend, träumerisch, Filmmusik</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="4" style="margin-right:6px">▶</button><b>Mixolydisch:</b> <code>1 2 3 4 5 6 <b>♭7</b></code> (Dur + <b>kleine Septime ♭7</b>) → rockig, bluesig, erdig</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="5" style="margin-right:6px">▶</button><b>Äolisch (= nat. Moll):</b> <code>1 2 ♭3 4 5 ♭6 ♭7</code> → melancholisch, klassisch</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="6" style="margin-right:6px">▶</button><b>Lokrisch:</b> <code>1 <b>♭2</b> ♭3 4 <b>♭5</b> ♭6 ♭7</code> (Moll + <b>♭2 &amp; ♭5</b>) → sehr instabil, düster</li>
               </ul>`,
          en: `<p>A <b>mode</b> starts a major scale on a different degree (just like A minor = C major from degree 6). Even more useful is its <b>degree formula measured against major</b> — spotting the single <b>characteristic note</b>! Click <b>▶</b> to hear each mode directly from your selected key:</p>
               <ul style="list-style:none;padding-left:0">
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="0" style="margin-right:6px">▶</button><b>Ionian (= Major):</b> <code>1 2 3 4 5 6 7</code> → bright, stable</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="1" style="margin-right:6px">▶</button><b>Dorian:</b> <code>1 2 ♭3 4 5 <b>6</b> ♭7</code> (Minor + <b>major 6th</b>) → cool, jazzy, hopeful</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="2" style="margin-right:6px">▶</button><b>Phrygian:</b> <code>1 <b>♭2</b> ♭3 4 5 ♭6 ♭7</code> (Minor + <b>minor 2nd ♭2</b>) → Spanish, dark, mysterious</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="3" style="margin-right:6px">▶</button><b>Lydian:</b> <code>1 2 3 <b>♯4</b> 5 6 7</code> (Major + <b>raised 4th ♯4</b>) → floating, dreamy, cinematic</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="4" style="margin-right:6px">▶</button><b>Mixolydian:</b> <code>1 2 3 4 5 6 <b>♭7</b></code> (Major + <b>minor 7th ♭7</b>) → rocky, bluesy, groovy</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="5" style="margin-right:6px">▶</button><b>Aeolian (= nat. Minor):</b> <code>1 2 ♭3 4 5 ♭6 ♭7</code> → melancholic, classic minor</li>
                 <li style="margin:6px 0"><button class="btn sm" data-play-mode-idx="6" style="margin-right:6px">▶</button><b>Locrian:</b> <code>1 <b>♭2</b> ♭3 4 <b>♭5</b> ♭6 ♭7</code> (Minor + <b>♭2 &amp; ♭5</b>) → unstable, tense</li>
               </ul>`
        },
        widget: 'scales_modes'
      },
      {
        title: { de: 'Modale Vamps & Zusammenhang mit der Ionischen Dur-Stammtonleiter', en: 'Modal Vamps & How They Map to the Parent Major Scale' },
        transposeBody: true,
        body: {
          de: `<p>Modale Musik vermeidet klassische Leitton-Kadenzen zur Dur-Tonika und pendelt stattdessen zwischen dem <b>modalen Grundakkord</b> und dem <b>Akkord mit dem Merkton</b> (ein „Vamp“).</p>
               <div class="callout tip"><strong>Der große Aha-Moment: Modaler Vamp vs. Ionische Stamm-Durtonleiter!</strong>
               Jeder modale Vamp nutzt exakt dieselben Töne wie eine <b>verwandte Durtonleiter (Ionisch)</b> – nur dass wir eine andere Stufe als „Zuhause“ behandeln! So siehst du sofort, warum man z. B. für <b>C-Dorisch</b> einfach die <b>[B♭]-Durtonleiter (1 Ganzton tiefer!)</b> spielen kann:
               <div style="overflow-x:auto;margin-top:8px"><table class="data-tbl">
                 <tr><th>Modus</th><th>Modaler Vamp</th><th>Stufen in Stamm-Dur (Ionisch)</th><th>Abstand zur Stamm-Durtonart</th></tr>
                 <tr><td><b>Dorisch</b></td><td><code>i7 – IV7</code> (Cm7 – F7)</td><td>entspricht <b><code>ii7 – V7</code></b></td><td>1 Ganzton tiefer ([B♭]-Dur)</td></tr>
                 <tr><td><b>Phrygisch</b></td><td><code>i – ♭II</code> (Cm – D♭)</td><td>entspricht <b><code>iii – IV</code></b></td><td>1 gr. Terz tiefer (A♭-Dur)</td></tr>
                 <tr><td><b>Lydisch</b></td><td><code>I – II</code> (C – D)</td><td>entspricht <b><code>IV – V</code></b></td><td>1 Quarte tiefer / Quinte höher (G-Dur)</td></tr>
                 <tr><td><b>Mixolydisch</b></td><td><code>I – ♭VII – IV</code> (C – [B♭] – F)</td><td>entspricht <b><code>V – IV – I</code></b></td><td>1 Quinte tiefer / Quarte höher (F-Dur)</td></tr>
                 <tr><td><b>Lokrisch</b></td><td><code>iø – ♭II</code> (Cø – D♭)</td><td>entspricht <b><code>viiø – I</code></b></td><td>1 Halbton höher (D♭-Dur)</td></tr>
               </table></div>
               <b>Merke:</b> Bei <code>Dorisch i7 – IV7</code> spielst du also klanglich ein <code>ii7 – V7</code> aus der Durtonart einen Ganzton tiefer – löst es aber <b>nie</b> zur Dur-I auf, sondern ruhst dich auf der <code>ii7</code> aus!</div>
               <div class="callout song"><strong>Bekannte Hör-Anker</strong>
               • <b>Dorisch (i7 – IV7):</b> <em>So What</em> (Miles Davis), <em>Oye Como Va</em>, <em>Scarborough Fair</em><br>
               • <b>Lydisch (I – II):</b> <em>The Simpsons</em>-Titelmelodie, <em>E.T. / Flying Theme</em> (John Williams)<br>
               • <b>Mixolydisch (I – ♭VII – IV):</b> <em>Sweet Home Alabama</em>, <em>Norwegian Wood</em>, <em>Clocks</em></div>`,
          en: `<p>Modal harmony avoids pulling back to the parent major tonic; instead it grooves between the <b>modal home chord</b> and the <b>characteristic-note chord</b> (a “vamp”).</p>
               <div class="callout tip"><strong>The Big Aha Moment: Modal Vamp vs. Parent Ionian Major Scale!</strong>
               Every modal vamp uses the exact notes of a <b>parent major (Ionian) scale</b> — we simply treat a different degree as “home”! That explains why for <b>C Dorian</b> you can literally use the <b>B♭ major scale (one whole step down!)</b>:
               <div style="overflow-x:auto;margin-top:8px"><table class="data-tbl">
                 <tr><th>Mode</th><th>Modal Vamp</th><th>Degrees in Parent Major (Ionian)</th><th>Parent Major Key</th></tr>
                 <tr><td><b>Dorian</b></td><td><code>i7 – IV7</code> (Cm7 – F7)</td><td>equals <b><code>ii7 – V7</code></b></td><td>1 whole tone down (B♭ major)</td></tr>
                 <tr><td><b>Phrygian</b></td><td><code>i – ♭II</code> (Cm – D♭)</td><td>equals <b><code>iii – IV</code></b></td><td>major 3rd down (A♭ major)</td></tr>
                 <tr><td><b>Lydian</b></td><td><code>I – II</code> (C – D)</td><td>equals <b><code>IV – V</code></b></td><td>4th down / 5th up (G major)</td></tr>
                 <tr><td><b>Mixolydian</b></td><td><code>I – ♭VII – IV</code> (C – B♭ – F)</td><td>equals <b><code>V – IV – I</code></b></td><td>5th down / 4th up (F major)</td></tr>
                 <tr><td><b>Locrian</b></td><td><code>iø – ♭II</code> (Cø – D♭)</td><td>equals <b><code>viiø – I</code></b></td><td>1 semitone up (D♭ major)</td></tr>
               </table></div>
               <b>Key insight:</b> In <code>Dorian i7 – IV7</code> you are literally looping <code>ii7 – V7</code> from the major key a whole step below — never resolving to its I, making <code>ii7</code> feel like home!</div>
               <div class="callout song"><strong>Famous song anchors</strong>
               • <b>Dorian (i7 – IV7):</b> <em>So What</em> (Miles Davis), <em>Oye Como Va</em>, <em>Scarborough Fair</em><br>
               • <b>Lydian (I – II):</b> <em>The Simpsons</em> theme, <em>E.T. Flying Theme</em><br>
               • <b>Mixolydian (I – ♭VII – IV):</b> <em>Sweet Home Alabama</em>, <em>Norwegian Wood</em>, <em>Clocks</em></div>`
        },
        examples: [
          {
            title: { de: 'Dorisch: i7 – IV7', en: 'Dorian: i7 – IV7' },
            toks: 'i7 IV7',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm7 – F7 (Töne aus [B♭]-Dur): Der Dur-Akkord IV7 enthält die große Sexte A (Merkton). Cool statt traurig!', en: 'Cm7 – F7 (notes of B♭ major): Major IV7 spotlights the characteristic major 6th (A).' }
          },
          {
            title: { de: 'Phrygisch: i – ♭II', en: 'Phrygian: i – ♭II' },
            toks: 'i bII',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm – D♭ (Töne aus A♭-Dur): Der Halbtonschritt nach oben (♭2) liefert sofort das spanische Flair.', en: 'Cm – D♭ (notes of A♭ major): The half-step lift (♭2) creates instant Spanish drama.' }
          },
          {
            title: { de: 'Lydisch: I – II', en: 'Lydian: I – II' },
            toks: 'I II',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – D (Töne aus G-Dur): Im D-Dur-Akkord leuchtet die erhöhte Quarte F♯ – schwebend und filmisch.', en: 'C – D (notes of G major): The D major chord highlights the glowing ♯4 (F♯).' }
          },
          {
            title: { de: 'Mixolydisch: I – ♭VII – IV – I', en: 'Mixolydian: I – ♭VII – IV – I' },
            toks: 'I bVII IV I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – [B♭] – F – C (Töne aus F-Dur): Der Dur-Akkord auf der kleinen Septime ist das Herz des Classic Rock.', en: 'C – B♭ – F – C (notes of F major): The major chord on ♭7 is pure classic rock.' }
          },
          {
            title: { de: 'Lokrisch: iø – ♭II', en: 'Locrian: iø – ♭II' },
            toks: 'iø bII',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cø – D♭ (Töne aus D♭-Dur): Der halbverminderte Grundakkord wirkt rastlos und geheimnisvoll.', en: 'Cø – D♭ (notes of D♭ major): The half-diminished home chord feels restless and eerie.' }
          }
        ]
      }
    ]
  };

  L.exotic_scales = {
    id: 'exotic_scales',
    badge: 'jazz',
    title: { de: 'Pentatonik, Blues & Skalen weltweit', en: 'Pentatonic, Blues & World Scales' },
    units: [
      {
        title: { de: 'Pentatonik, Blues & globale Klangfarben entdecken', en: 'Explore Pentatonic, Blues & Global Scales' },
        body: {
          de: `<p>Neben Dur, Moll und den Kirchentonarten gibt es eine riesige Welt an Tonleitern:</p>
               <ul>
                 <li><b>Pentatonik (5 Töne):</b> Keine Halbton-Reibungen – <b>Moll-Pentatonik</b> (<code>1 ♭3 4 5 ♭7</code>) trägt Rock & Blues, <b>Dur-Pentatonik</b> (<code>1 2 3 5 6</code>) klingt offen und folkig. Japanische Pentatoniken (<b>Hirajoshi, In-Sen, Kumoi, Yo</b>) nutzen gezielte Halbtonschritte für eine ganz eigene Poesie.</li>
                 <li><b>Bluesskala:</b> Moll-Pentatonik + <b>Blue Note (♭5)</b> – passt über alle drei Akkorde eines 12-Takt-Blues!</li>
                 <li><b>Phrygisch-Dominant (5. Stufe harmonisch Moll):</b> <code>1 ♭2 3 4 5 ♭6 ♭7</code> – Flamenco, Klezmer (Freygish) & Naher Osten.</li>
                 <li><b>Doppelharmonisch / Ungarisch Moll / Raga Todi / Pelog:</b> Faszinierende Melodiewelten aus dem arabischen Raum, Balkan, Indien und Java.</li>
                 <li><b>Symmetrische &amp; Jazz-Skalen:</b> <b>Ganzton</b> (6 Töne, Debussy, schwebend), <b>Vermindert / Oktatonisch</b> (8 Töne G–H), <b>Bebop Dominant</b> (8 Töne), <b>Alteriert</b> &amp; <b>Lydisch Dominant</b> (Modern Jazz).</li>
               </ul>
               <div class="callout"><strong>Warum kommen bei manchen Skalen Ziffern oder Stammton-Buchstaben doppelt vor?</strong>
               Unser westliches Notensystem hat genau <b>7 Stammtöne / Ziffern (<code>1–7</code>)</b>, weil Dur und Moll 7 Töne besitzen. Exotische und Jazz-Skalen können aber <b>weniger</b> (5 Töne wie Pentatonik/Hirajoshi, 6 Töne wie Blues/Ganzton) oder <b>mehr als 7 Töne</b> haben (z. B. <b>8 Töne</b> bei <em>Vermindert</em> oder <em>Bebop Dominant</em>)! Sobald eine Skala mehr als 7 Töne enthält (oder eine chromatische „Blue Note“ einschiebt), muss zwangsläufig eine Ziffer doppelt vorkommen – z. B. <code>♭7</code> und <code>7</code> bei <em>Bebop Dominant</em> oder <code>♭5</code> und <code>5</code> bei der <em>Bluesskala</em>! Im Notenbild erkennt man das am Auflösungszeichen (<code>♮</code>).</div>`,
          en: `<p>Beyond major, minor, and the church modes lies a rich universe of scales:</p>
               <ul>
                 <li><b>Pentatonic (5 notes):</b> Zero half-step friction — <b>minor pentatonic</b> powers rock and blues, <b>major pentatonic</b> sounds bright and folk-like. Japanese pentatonics (<b>Hirajoshi, In-Sen, Kumoi, Yo</b>) weave in haunting half-steps.</li>
                 <li><b>Blues scale:</b> Minor pentatonic + <b>blue note (♭5)</b> — works across all chords of a 12-bar blues.</li>
                 <li><b>Phrygian dominant (5th mode of harmonic minor):</b> <code>1 ♭2 3 4 5 ♭6 ♭7</code> — Flamenco, Klezmer, and Middle Eastern music.</li>
                 <li><b>Double harmonic / Hungarian minor / Raga Todi / Pelog:</b> Iconic melodic colors from the Middle East, Balkans, India, and Java.</li>
                 <li><b>Symmetrical &amp; Jazz scales:</b> <b>Whole-tone</b> (6 notes, Debussy), <b>Diminished / Octatonic</b> (8-note W–H), <b>Bebop Dominant</b> (8 notes), <b>Altered</b> &amp; <b>Lydian dominant</b>.</li>
               </ul>
               <div class="callout"><strong>Why do some scales repeat a degree number or letter name?</strong>
               Western notation has <b>7 letter names / scale degrees (<code>1–7</code>)</b> because major and minor have 7 notes. World and jazz scales, however, can have <b>fewer</b> (5-note pentatonics, 6-note blues/whole-tone) or <b>more than 7 notes</b> (such as <b>8-note</b> <em>Diminished</em> or <em>Bebop Dominant</em>)! Whenever a scale has 8 notes (or inserts a chromatic passing/blue note), at least one degree number must appear twice — e.g. both <code>♭7</code> and <code>7</code> in <em>Bebop Dominant</em>, or <code>♭5</code> and <code>5</code> in the <em>Blues scale</em>, clarified in notation with a natural sign (<code>♮</code>).</div>`
        },
        widget: 'scales_world'
      },
      {
        title: { de: 'Passende Akkordfarben zum Anhören', en: 'Matching Chord Colors to Hear' },
        body: {
          de: `<p>Bei siebenstufigen Skalen (z. B. Neapolitanisch Moll, Persisch, Alteriert, Lydisch Dominant) zeigt dir das Skalen-Widget automatisch die passenden Stufenakkorde. Bei 5-, 6- und 8-tönigen Skalen kombiniert man die Skala mit charakteristischen Akkordfolgen:</p>`,
          en: `<p>For seven-note scales (e.g. Neapolitan minor, Persian, Altered, Lydian dominant), the widget above automatically computes diatonic chords. For 5-, 6-, and 8-note scales, pair them with characteristic progressions:</p>`
        },
        examples: [
          {
            title: { de: 'Blues-Kern (I7 – IV7 – V7)', en: 'Blues core (I7 – IV7 – V7)' },
            toks: 'I7:2 IV7:2 I7:4 V7:2 IV7:2 I7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C7 – F7 – C7 – G7 – F7 – C7: Darüber funktionieren C-Moll-Pentatonik und C-Bluesskala.', en: 'C7 – F7 – C7 – G7 – F7 – C7: C minor pentatonic and C blues scale fit over the entire sequence.' }
          },
          {
            title: { de: 'Flamenco-Wendung (Phrygisch-Dominant)', en: 'Flamenco turn (Phrygian dominant)' },
            toks: 'I bII I bVII',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – D♭ – C – [B♭]: Dur-Tonika mit der dramatischen kleinen Sekunde direkt darüber.', en: 'C – D♭ – C – B♭: Major tonic with the dramatic minor second right above it.' }
          },
          {
            title: { de: 'Ganzton-Welt (Übermäßige Dreiklänge)', en: 'Whole-tone world (augmented triads)' },
            toks: 'I+ II+ III+ #IV+',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C+ – D+ – E+ – F♯+: Schwerelos und traumhaft, ohne klares tonales Zentrum.', en: 'C+ – D+ – E+ – F♯+: Weightless and dreamlike, without a fixed tonal pull.' }
          },
          {
            title: { de: 'Verminderte Symmetrie', en: 'Diminished symmetry' },
            toks: 'I°7 bIII°7 bV°7 VI°7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C°7 = E♭°7 = G♭°7 = A°7: Vier Namen, exakt dieselben vier Töne alle 3 Halbtöne!', en: 'C°7 = E♭°7 = G♭°7 = A°7: Four names, the exact same four pitches every 3 semitones!' }
          }
        ]
      }
    ]
  };

  L.ii_v_i_maj = {
    id: 'ii_v_i_maj',
    badge: 'jazz',
    title: { de: 'ii–V–I in Dur & Turnaround', en: 'ii–V–I in Major & Turnaround' },
    units: [
      {
        title: { de: 'Der Herzschlag des Jazz', en: 'The Heartbeat of Jazz' },
        body: {
          de: `<p>Die <b>ii–V–I-Verbindung</b> (in C: <code>Dm7 – G7 – Cmaj7</code>) ist die wichtigste Kadenz im Jazz und modernen Pop. Warum klingt sie so geschmeidig?</p>
               <ul>
                 <li><b>Quintfall im Bass:</b> D → G → C (jeder Grundton fällt eine Quinte).</li>
                 <li><b>Leittonlinien (Guide Tones = Terz & Septime):</b> Von Dm7 zu G7 bleibt <b>F</b> liegen, <b>C fällt nach [B]</b>. Von G7 zu Cmaj7 bleibt <b>[B]</b> liegen, <b>F fällt nach E</b>. Minimale Halbtonbewegungen!</li>
               </ul>
               <div class="callout tip"><strong>Was ist ein „Turnaround“?</strong>
               Ein <b>Turnaround</b> (wörtlich „Umkehr / Rückführung“) ist eine kurze Akkordfolge in den <b>letzten 1–2 Takten</b> eines Formteils (z. B. Takt 11–12 im Blues oder Takt 7–8 im Jazz-Standard). Statt auf der Tonika <code>I</code> einfach stehenzubleiben, „dreht“ der Turnaround die Harmonie um und baut über <b><code>I – vi – ii – V</code></b> (oder <code>I – VI7 – ii – V</code> / <code>iii – VI7 – ii – V</code>) neue Spannung auf, die nahtlos zurück in Takt 1 führt!</div>
               <div class="callout tip"><strong>Denk-Trick für Jazz-Standards</strong>
               Wenn dir in einem Song plötzlich ein <code>ii–V</code> aus einer fremden Tonart begegnet (z. B. <code>Gm7 – C7 → F</code> mitten in C-Dur), stelle dir den <b>Zielakkord kurzzeitig einfach als neue I</b> (bzw. bei Moll-Zielen wie <code>Am</code> als neue <b>i / vi-Tonika</b>) vor! Dann hast du das gewohnte <code>ii–V–I</code>-Muster sofort im Kopf – genau das vertiefen wir in der nächsten Lektion.</div>
               <div class="callout song"><strong>Hör-Anker</strong><em>Autumn Leaves</em>, <em>Fly Me to the Moon</em>, <em>Sunday Morning</em> (Maroon 5).</div>`,
          en: `<p>The <b>ii–V–I progression</b> (in C: <code>Dm7 – G7 – Cmaj7</code>) is the cornerstone of jazz and modern pop. Why does it feel so effortless?</p>
               <ul>
                 <li><b>Falling fifths in the bass:</b> D → G → C.</li>
                 <li><b>Guide-tone lines (3rds & 7ths):</b> From Dm7 to G7, <b>F</b> stays while <b>C drops to B</b>. From G7 to Cmaj7, <b>B</b> stays while <b>F drops to E</b>. Minimal half-step motion!</li>
               </ul>
               <div class="callout tip"><strong>What is a “Turnaround”?</strong>
               A <b>turnaround</b> is a short chord progression in the <b>final 1–2 bars</b> of a chorus or section (e.g. bars 11–12 of a blues or bars 7–8 of a jazz standard). Instead of resting passively on <code>I</code>, it “turns the form around” via <b><code>I – vi – ii – V</code></b> (or <code>I – VI7 – ii – V</code> / <code>iii – VI7 – ii – V</code>), creating fresh momentum that launches cleanly back to bar 1!</div>
               <div class="callout tip"><strong>Pro mental shortcut</strong>
               Whenever a jazz standard throws a non-diatonic <code>ii–V</code> at you (like <code>Gm7 – C7 → F</code> inside C major), simply imagine the <b>target chord as a temporary I</b> (or a temporary minor tonic <b>i / vi</b> for minor targets like <code>Am</code>)! Instantly the same familiar <code>ii–V–I</code> shape applies.</div>
               <div class="callout song"><strong>Song anchors</strong><em>Autumn Leaves</em>, <em>Fly Me to the Moon</em>, <em>Sunday Morning</em> (Maroon 5).</div>`
        },
        examples: [
          {
            title: { de: 'ii–V–I Grundform', en: 'Basic ii–V–I' },
            toks: 'ii7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7 – Cmaj7: Beobachte im Live-View (mit Stimmführung!), wie sich oben immer nur ein Ton bewegt.', en: 'Dm7 – G7 – Cmaj7: Watch the Live View (Voice Leading) — only one upper note moves at a time!' }
          },
          {
            title: { de: 'Mit Neunklängen veredelt', en: 'Enriched with ninths' },
            toks: 'ii9:2 V9:2 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm9 – G9 – Cmaj9: Sofort moderner, weicher Club-Jazz-Sound.', en: 'Dm9 – G9 – Cmaj9: Instant smooth modern jazz warmth.' }
          },
          {
            title: { de: 'Der Jazz-Turnaround: I – vi – ii – V', en: 'The jazz turnaround: I – vi – ii – V' },
            toks: 'Imaj7 vi7 ii7 V7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Am7 – Dm7 – G7: Führt nahtlos zurück an den Anfang – perfekt zum Loopen im Übungstool!', en: 'Cmaj7 – Am7 – Dm7 – G7: Cycles smoothly back to the top — great for looping in the Practice Tool!' }
          }
        ]
      }
    ]
  };

  L.ii_v_chains = {
    id: 'ii_v_chains',
    badge: 'jazz',
    title: { de: 'Zwischenkadenzen (ii–V auf jede Stufe)', en: 'Secondary ii–V Chains' },
    units: [
      {
        title: { de: 'Zwischenkadenzen in Dur: ii–V auf jede Zielstufe', en: 'Secondary ii–Vs in Major: Targeting Every Degree' },
        transposeBody: true,
        body: {
          de: `<p>Du kannst vor <b>jeden beliebigen Zielakkord</b> eines Songs dessen eigenes kleines <code>ii–V</code> schalten („Zwischenkadenz“). <b>Der Trick dabei:</b> Du stellst dir den Zielakkord für einen kurzen Moment als deine neue <b>I</b> (bei einem Dur-Ziel) bzw. als Moll-Tonika <b>i</b> (bei einem Moll-Ziel) vor und baust davor sein reguläres <code>ii–V</code>:</p>
               <ul>
                 <li><b>Dur-Ziele (<code>IV</code>, <code>V</code>):</b> bekommen ein <b>Dur-ii–V</b> mit <code>m7 – 7</code> → zu <code>IV</code>: <code>Gm7 – C7 → Fmaj7</code> · zu <code>V</code>: <code>Am7 – D7 → G7</code>!</li>
                 <li><b>Moll-Ziele (<code>ii</code>, <code>iii</code>, <code>vi</code>):</b> bekommen ein <b>Moll-ii–V</b> mit <b>halbvermindertem <code>iiø</code></b> (im Jazz oft auch weicher mit <code>m7</code>) → zu <code>ii</code>: <code>Eø7 – A7 → Dm7</code> · zu <code>iii</code>: <code>F♯ø7 – [B7] → Em7</code> · zu <code>vi</code>: <code>[Bø7] – E7 → Am7</code>!</li>
               </ul>`,
          en: `<p>You can place a mini <code>ii–V</code> in front of <b>any target chord</b> in a song. <b>The mental trick:</b> briefly treat the target chord as your temporary <b>I</b> (for major targets) or temporary minor tonic <b>i</b> (for minor targets), and play its regular <code>ii–V</code> right before it:</p>
               <ul>
                 <li><b>Major targets (<code>IV</code>, <code>V</code>):</b> take a <b>major ii–V</b> (<code>m7 – 7</code>) → to <code>IV</code>: <code>Gm7 – C7 → Fmaj7</code> · to <code>V</code>: <code>Am7 – D7 → G7</code>!</li>
                 <li><b>Minor targets (<code>ii</code>, <code>iii</code>, <code>vi</code>):</b> take a <b>minor ii–V</b> with <b>half-diminished <code>iiø</code></b> (or softer <code>m7</code> in jazz) → to <code>ii</code>: <code>Eø7 – A7 → Dm7</code> · to <code>iii</code>: <code>F♯ø7 – B7 → Em7</code> · to <code>vi</code>: <code>Bø7 – E7 → Am7</code>!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vorher: schlichtes I → IV → V → I', en: 'Before: plain I → IV → V → I' },
            toks: 'Imaj7 IVmaj7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Fmaj7 – G7 – Cmaj7: Sauber, aber direkt.', en: 'Cmaj7 – Fmaj7 – G7 – Cmaj7: Clean and direct.' }
          },
          {
            title: { de: 'Ziel IV (Dur): ii7/IV – V7/IV → IVmaj7', en: 'Target IV (major): ii7/IV – V7/IV → IVmaj7' },
            toks: 'Imaj7:2 ii7/IV:1 V7/IV:1 IVmaj7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Gm7 – C7 – Fmaj7 – G7 – Cmaj7: Gm7 – C7 schiebt elegant in Richtung Fmaj7.', en: 'Cmaj7 – Gm7 – C7 – Fmaj7 – G7 – Cmaj7: Gm7 – C7 smoothly launches into Fmaj7.' }
          },
          {
            title: { de: 'Ziel V (Dur): ii7/V – V7/V → V7', en: 'Target V (major): ii7/V – V7/V → V7' },
            toks: 'Imaj7:2 ii7/V:1 V7/V:1 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Am7 – D7 – G7 – Cmaj7: Die Dominante G7 bekommt ihr eigenes ii–V (Am7 – D7) vorgeschaltet!', en: 'Cmaj7 – Am7 – D7 – G7 – Cmaj7: The dominant G7 is prepared by its own ii–V (Am7 – D7)!' }
          },
          {
            title: { de: 'Ziel iii (Moll): iiø/iii – V7/iii → iii7', en: 'Target iii (minor): iiø/iii – V7/iii → iii7' },
            toks: 'Imaj7:2 iiø/iii:1 V7/iii:1 iii7:2 ii7:1 V7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – F♯ø7 – [B7] – Em7 – Dm7 – G7 – Cmaj7: Edle Jazz-Wendung zur 3. Stufe Em7, dann chromatisch abwärts ins ii–V–I.', en: 'Cmaj7 – F♯ø7 – B7 – Em7 – Dm7 – G7 – Cmaj7: Lush minor ii–V into degree iii (Em7), stepping down into ii–V–I.' }
          },
          {
            title: { de: 'Ziel vi (Moll): iiø/vi – V7/vi → vi7', en: 'Target vi (minor): iiø/vi – V7/vi → vi7' },
            toks: 'Imaj7:2 iiø/vi:1 V7/vi:1 vi7:2 ii7:1 V7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – [Bø7] – E7 – Am7 – Dm7 – G7 – Cmaj7: Erst ein Moll-ii–V nach Am7, dann das große ii–V–I nach C.', en: 'Cmaj7 – Bø7 – E7 – Am7 – Dm7 – G7 – Cmaj7: A minor ii–V into Am7, followed by the main ii–V–I to C.' }
          },
          {
            title: { de: 'Ziel ii (Moll) & Quintfall-Kette: iiø/ii – V7/ii → ii7 – V7 – I', en: 'Target ii (minor) & chain: iiø/ii – V7/ii → ii7 – V7 – I' },
            toks: 'Imaj7:2 iiø/ii:1 V7/ii:1 ii7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Eø7 – A7 – Dm7 – G7 – Cmaj7: Mit halbvermindertem Eø7 wirkt der Weg nach Dm7 besonders melancholisch-jazzig.', en: 'Cmaj7 – Eø7 – A7 – Dm7 – G7 – Cmaj7: Half-diminished Eø7 gives the approach into Dm7 a bittersweet jazz color.' }
          },
          {
            title: { de: 'Kette (heller mit m7): Em7 – A7 – Dm7 – G7 – Cmaj7', en: 'Bright chain (with m7): Em7 – A7 – Dm7 – G7 – Cmaj7' },
            toks: 'ii7/ii:1 V7/ii:1 ii7:1 V7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Em7 – A7 – Dm7 – G7 – Cmaj7: Zwei aufeinanderfolgende ii–V-Paare im reinen Quintfall E → A → D → G → C.', en: 'Em7 – A7 – Dm7 – G7 – Cmaj7: Two back-to-back ii–V pairs falling in pure fifths E → A → D → G → C.' }
          }
        ]
      },
      {
        title: { de: 'Zwischenkadenzen in Moll (z. B. nach iv, ♭III, ♭VI & V)', en: 'Secondary ii–Vs in Minor (Targeting iv, ♭III, ♭VI & V)' },
        transposeBody: true,
        minorBody: true,
        body: {
          de: `<p>Auch in einer <b>Moll-Tonart</b> (z. B. in c-Moll) funktioniert exakt dasselbe Prinzip – schau einfach, ob dein Zielakkord <b>Dur oder Moll</b> ist:</p>
               <ul>
                 <li><b>Zur Moll-Subdominante <code>iv</code> (Fm):</b> Moll-Ziel → bekommt ein <b>Moll-ii–V</b>: <code>iiø/iv – V7/iv → iv7</code> (<code>Gø7 – C7 → Fm7</code>).</li>
                 <li><b>Zur Dur-Parallele <code>♭III</code> (E♭):</b> Dur-Ziel → bekommt ein <b>Dur-ii–V</b>: <code>ii7/♭III – V7/♭III → ♭IIImaj7</code> (<code>Fm7 – [B♭7] → E♭maj7</code>) – das Herzstück von <em>Autumn Leaves</em> &amp; <em>Fly Me to the Moon</em>!</li>
                 <li><b>Zur <code>♭VI</code> (A♭):</b> Dur-Ziel → bekommt ein <b>Dur-ii–V</b>: <code>ii7/♭VI – V7/♭VI → ♭VImaj7</code> (<code>[B♭m7] – E♭7 → A♭maj7</code>).</li>
                 <li><b>Zur Dominante <code>V</code> (G7):</b> bekommt <code>ii7/V – V7/V → V7</code> (<code>Am7 – D7 → G7</code>) vor der Auflösung zurück nach <code>i</code>!</li>
               </ul>
               <div class="callout song"><strong>Hör-Anker in Moll</strong><em>Autumn Leaves</em>, <em>Blue Bossa</em> (wechselt elegant über ein sekundäres ii–V in eine neue Klangwelt!), <em>Softly, as in a Morning Sunrise</em>, <em>Beautiful Love</em>.</div>`,
          en: `<p>In a <b>minor key</b>, the exact same rule applies — just check whether your target chord is <b>major or minor</b>:</p>
               <ul>
                 <li><b>To minor subdominant <code>iv</code> (Fm):</b> minor target → <b>minor ii–V</b>: <code>iiø/iv – V7/iv → iv7</code> (<code>Gø7 – C7 → Fm7</code>).</li>
                 <li><b>To relative major <code>♭III</code> (E♭):</b> major target → <b>major ii–V</b>: <code>ii7/♭III – V7/♭III → ♭IIImaj7</code> (<code>Fm7 – B♭7 → E♭maj7</code>) — the signature lift in <em>Autumn Leaves</em> &amp; <em>Fly Me to the Moon</em>!</li>
                 <li><b>To <code>♭VI</code> (A♭):</b> major target → <b>major ii–V</b>: <code>ii7/♭VI – V7/♭VI → ♭VImaj7</code> (<code>B♭m7 – E♭7 → A♭maj7</code>).</li>
                 <li><b>To dominant <code>V</code> (G7):</b> prepared via <code>ii7/V – V7/V → V7</code> (<code>Am7 – D7 → G7</code>) before resolving home to <code>i</code>!</li>
               </ul>
               <div class="callout song"><strong>Minor jazz anchors</strong><em>Autumn Leaves</em>, <em>Blue Bossa</em>, <em>Softly, as in a Morning Sunrise</em>, <em>Beautiful Love</em>.</div>`
        },
        examples: [
          {
            title: { de: 'In Moll · Ziel iv (Moll): iiø/iv – V7/iv → iv7', en: 'In minor · Target iv (minor): iiø/iv – V7/iv → iv7' },
            toks: 'i7:2 iiø/iv:1 V7/iv:1 iv7:2 iiø:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm7 – Gø7 – C7 – Fm7 – Dø7 – G7 – Cm: Das Moll-ii–V (Gø7 – C7) zieht unwiderstehlich in die Subdominante iv7 (Fm7).', en: 'Cm7 – Gø7 – C7 – Fm7 – Dø7 – G7 – Cm: The minor ii–V (Gø7 – C7) pulls straight into minor iv7 (Fm7).' }
          },
          {
            title: { de: 'In Moll · Ziel ♭III (Dur-Parallele!): ii7/♭III – V7/♭III → ♭IIImaj7', en: 'In minor · Target ♭III (relative major!): ii7/♭III – V7/♭III → ♭IIImaj7' },
            toks: 'i7:2 ii7/bIII:1 V7/bIII:1 bIIImaj7:2 iiø:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm7 – Fm7 – [B♭7] – E♭maj7 – Dø7 – G7 – Cm: Kurzer Sonnenstrahl in die Dur-Parallele (E♭maj7), dann über iiø – V7 zurück nach Moll!', en: 'Cm7 – Fm7 – B♭7 – E♭maj7 – Dø7 – G7 – Cm: A bright ray of sunlight into the relative major (E♭maj7), then iiø – V7 home to minor!' }
          },
          {
            title: { de: 'In Moll · Ziel ♭VI (Dur): ii7/♭VI – V7/♭VI → ♭VImaj7', en: 'In minor · Target ♭VI (major): ii7/♭VI – V7/♭VI → ♭VImaj7' },
            toks: 'i7:2 ii7/bVI:1 V7/bVI:1 bVImaj7:2 iiø:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm7 – [B♭m7] – E♭7 – A♭maj7 – Dø7 – G7 – Cm: Warmes Dur-ii–V auf die dramatische ♭VI-Stufe (A♭maj7), danach klassischer Moll-Schluss.', en: 'Cm7 – B♭m7 – E♭7 – A♭maj7 – Dø7 – G7 – Cm: Lush major ii–V into dramatic ♭VImaj7, closing via minor iiø – V7 – i.' }
          },
          {
            title: { de: 'In Moll · Ziel V (Doppel-ii–V): ii7/V – V7/V → V7 → i', en: 'In minor · Target V (double ii–V): ii7/V – V7/V → V7 → i' },
            toks: 'i7:2 ii7/V:1 V7/V:1 V7:2 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm7 – Am7 – D7 – G7 – Cm: Hebt die Energie mit zwei Dominanten im Quintfall (D7 → G7) spannungsvoll in die Tonika.', en: 'Cm7 – Am7 – D7 – G7 – Cm: Builds energetic momentum with chained fifths (D7 → G7) into i.' }
          },
          {
            title: { de: 'Große Moll-Jazz-Kette: i → iv → ♭III → iiø – V7 – i', en: 'Full minor jazz chain: i → iv → ♭III → iiø – V7 – i' },
            toks: 'i7:2 iiø/iv:1 V7/iv:1 iv7:2 V7/bIII:2 bIIImaj7:2 iiø:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm7 – Gø7 – C7 – Fm7 – [B♭7] – E♭maj7 – Dø7 – G7 – Cm: Verbindet ein sekundäres Moll-ii–V nach iv7 direkt mit dem Ausflug in die Dur-Parallele ♭III und zurück nach i!', en: 'Cm7 – Gø7 – C7 – Fm7 – B♭7 – E♭maj7 – Dø7 – G7 – Cm: Connects a secondary minor ii–V to iv7 directly into the relative major ♭III and back home!' }
          }
        ],
        check: {
          q: { de: 'Du bist in a-Moll und möchtest den Zielakkord Cmaj7 (♭III, Dur) mit einer Zwischenkadenz vorbereiten. Welche passt?', en: 'You are in A minor and want to prepare Cmaj7 (♭III, major) with a secondary ii–V. Which one fits?' },
          opts: [
            { de: 'Dm7 – G7 (Dur-ii–V zu C)', en: 'Dm7 – G7 (major ii–V to C)' },
            { de: 'Eø7 – A7 (Moll-ii–V zu Dm)', en: 'Eø7 – A7 (minor ii–V to Dm)' },
            { de: 'F♯ø7 – B7 (Moll-ii–V zu Em)', en: 'F♯ø7 – B7 (minor ii–V to Em)' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! Da Cmaj7 ein Dur-Ziel ist, stellst du dir kurz C als neue I vor – sein ii–V lautet Dm7 – G7.',
            en: 'Spot on! Since Cmaj7 is a major target, imagine C briefly as I — its ii–V is Dm7 – G7.'
          }
        }
      }
    ]
  };

  L.ii_v_i_min = {
    id: 'ii_v_i_min',
    badge: 'jazz',
    title: { de: 'ii–V–i in Moll', en: 'ii–V–i in Minor' },
    units: [
      {
        title: { de: 'Halbvermindert + Leitton-Dominante', en: 'Half-Diminished + Leading-Tone Dominant' },
        transposeBody: true,
        minorBody: true,
        body: {
          de: `<p>In Moll verändert sich die 2. Stufe: Statt <code>ii7</code> steht hier der <b>halbverminderte Akkord <code>iiø</code></b> (in c-Moll: <code>Dø7 = D – F – A♭ – C</code>). Die Dominante <code>V7</code> (<code>G7</code>) stammt aus harmonisch Moll und bringt den Leitton [B] mit.</p>
               <p><b>Geschmeidige Stimmführung:</b> Von <code>Dø7</code> zu <code>G7</code> bleiben D und F liegen, während A♭ → G und C → [B] je einen Halbton fallen. Von <code>G7</code> zu <code>Cm</code> bleibt G liegen, [B] steigt nach C und F fällt nach E♭!</p>`,
          en: `<p>In minor, degree 2 becomes <b>half-diminished <code>iiø</code></b> (in C minor: <code>Dø7 = D – F – A♭ – C</code>), while <code>V7</code> (<code>G7</code>) comes from harmonic minor with its leading tone B.</p>
               <p><b>Smooth voice leading:</b> From <code>Dø7</code> to <code>G7</code>, D and F hold while A♭ → G and C → B each drop a semitone. From <code>G7</code> to <code>Cm</code>, G holds while B rises to C and F drops to E♭!</p>`
        },
        examples: [
          {
            title: { de: 'ii–V–i in Moll (Grundform)', en: 'Minor ii–V–i (basic)' },
            toks: 'iiø:2 V7:2 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Dø7 – G7 – Cm: Der klassische Moll-Jazz-Schluss.', en: 'Dø7 – G7 – Cm: The signature minor jazz cadence.' }
          },
          {
            title: { de: 'Weicher Schluss mit i7 oder i6', en: 'Softer ending on i7 or i6' },
            toks: 'iiø:2 V7:2 i6:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Dø7 – G7 – Cm6: Die große Sexte (A) im Schlussakkord klingt herrlich edel und filmisch.', en: 'Dø7 – G7 – Cm6: The major 6th (A) on the tonic sounds rich and cinematic.' }
          }
        ]
      }
    ]
  };

  L.secondary_dom = {
    id: 'secondary_dom',
    badge: 'pop',
    title: { de: 'Sekundärdominanten (Zwischendominanten)', en: 'Secondary Dominants' },
    units: [
      {
        title: { de: 'Jeder Akkord kann kurz wie eine Tonika wirken', en: 'Making Any Chord Feel Like Home for a Moment' },
        body: {
          de: `<p>In C-Dur zieht <code>G7</code> (V7) nach C. Genau dieselbe Zugkraft kannst du vor <b>jeden anderen Dur- oder Moll-Akkord</b> der Tonart setzen: Baue einfach einen <b>Dominantseptakkord genau eine reine Quinte über deinem Zielakkord</b>!</p>
               <p>Schreibweise: <b><code>V7/vi</code></b> („Fünf-Sieben von sechs“). In C-Dur ist das Ziel <code>vi = Am</code>, eine Quinte darüber liegt <code>E</code> → <b>E7</b> (E–G♯–[B]–D). Das tonartfremde <b>G♯</b> ist der neue Leitton zu A!</p>
               <div class="callout song"><strong>Hör-Anker</strong><code>I – V7/vi – vi</code>: <em>Yesterday</em> (Beatles), <em>Creep</em> (Radiohead: <code>I – V/vi – IV – iv</code>), <em>Sitting on the Dock of the Bay</em>.</div>`,
          en: `<p>In C major, <code>G7</code> pulls toward C. You can create that exact same magnetic pull toward <b>any other major or minor chord</b> in the key: build a <b>dominant 7th chord a perfect fifth above your target</b>!</p>
               <p>Notation: <b><code>V7/vi</code></b> (“five-seven of six”). In C, target <code>vi = Am</code>, a fifth above is <code>E</code> → <b>E7</b> (E–G♯–B–D). The non-diatonic <b>G♯</b> becomes a temporary leading tone to A!</p>
               <div class="callout song"><strong>Song anchors</strong><code>I – V7/vi – vi</code>: <em>Yesterday</em> (Beatles), <em>Creep</em> (Radiohead), <em>(Sittin' On) The Dock of the Bay</em>.</div>`
        },
        widget: 'sec_dom_table',
        examples: [
          {
            title: { de: 'Pop-Klassiker: V7/vi → vi', en: 'Pop classic: V7/vi → vi' },
            toks: 'I:2 V7/vi:2 vi:2 IV:1 V7:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E7 – Am – F – G7 – C: E7 verleiht dem Wechsel ins Am sofort emotionale Spannung.', en: 'C – E7 – Am – F – G7 – C: E7 adds instant emotional pull into Am.' }
          },
          {
            title: { de: 'Leitton im Bass (1. Umkehrung)', en: 'Leading tone in the bass (1st inversion)' },
            toks: 'I:2 V7/vi^1:1 vi:2 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E7/G♯ – Am – G7 – C: Der Leitton G♯ liegt direkt im Bass und steigt halbtonweise nach A.', en: 'C – E7/G♯ – Am – G7 – C: The leading tone G♯ sits right in the bass and climbs a half-step to A.' }
          },
          {
            title: { de: 'Doppeldominante: V7/V → V7 → I', en: 'Double dominant: V7/V → V7 → I' },
            toks: 'I:2 IV:2 V7/V:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – D7 – G7 – C: Zwei Dominanten im Quintfall hintereinander.', en: 'C – F – D7 – G7 – C: Two dominants chained in falling fifths.' }
          },
          {
            title: { de: 'Kette von Sekundärdominanten', en: 'Chain of secondary dominants' },
            toks: 'I:2 V7/vi:1 V7/ii:1 V7/V:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E7 – A7 – D7 – G7 – C: Jede Dominante löst in die nächste – der klassische Ragtime-/Jazz-Motor.', en: 'C – E7 – A7 – D7 – G7 – C: Every dominant resolves into the next — a classic ragtime & jazz engine.' }
          }
        ]
      }
    ]
  };

  L.dim_passing = {
    id: 'dim_passing',
    badge: 'jazz',
    title: { de: 'Verminderte Durchgangsakkorde', en: 'Diminished Passing Chords' },
    units: [
      {
        title: { de: 'Chromatische Brücken im Bass', en: 'Chromatic Bridges in the Bass' },
        body: {
          de: `<p>Ein <b>verminderter Durchgangsakkord</b> füllt einen Ganztonschritt zwischen zwei Stufenakkorden mit einem <b>Halbtonschritt</b> im Bass aus – z. B. zwischen I und ii: <code>C → C♯° → Dm</code>.</p>
               <p><b>Warum klingt das so vertraut?</b> <code>C♯°7</code> (C♯–E–G–[B♭]) enthält genau die oberen Töne eines <code>A7♭9</code> (= <code>V7/ii</code> ohne Grundton)! Ein aufsteigender verminderter Akkord wirkt also wie eine getarnte Sekundärdominante.</p>`,
          en: `<p>A <b>diminished passing chord</b> bridges a whole-step gap between two diatonic chords with a smooth <b>semitone</b> in the bass — e.g. <code>C → C♯° → Dm</code>.</p>
               <p><b>Why does it feel so natural?</b> <code>C♯°7</code> (C♯–E–G–B♭) is literally an <code>A7♭9</code> (= <code>V7/ii</code>) without its root! Ascending diminished chords act like disguised secondary dominants.</p>`
        },
        examples: [
          {
            title: { de: 'Zum Vergleich: ohne Durchgangsakkord', en: 'Compare: without passing chord' },
            toks: 'I:2 ii:1 V7:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Dm – G7 – C: Die schlichte Grundversion.', en: 'C – Dm – G7 – C: The plain version.' }
          },
          {
            title: { de: 'Aufwärts: I – ♯I° – ii', en: 'Ascending: I – ♯I° – ii' },
            toks: 'I:2 #I°:1 ii:2 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C♯° – Dm – G7 – C: Der Bass klettert chromatisch C → C♯ → D.', en: 'C – C♯° – Dm – G7 – C: Chromatic bass climb C → C♯ → D.' }
          },
          {
            title: { de: 'Aufwärts zur Dominante: IV – ♯IV° – V', en: 'Ascending to V: IV – ♯IV° – V' },
            toks: 'I:2 IV:2 #IV°:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – F♯° – G7 – C: Typisch für Gospel, Blues und Jazz-Balladen (Bass F → F♯ → G).', en: 'C – F – F♯° – G7 – C: Classic gospel, blues, and jazz-ballad lift (bass F → F♯ → G).' }
          },
          {
            title: { de: 'Abwärts: iii – ♭III° – ii', en: 'Descending: iii – ♭III° – ii' },
            toks: 'I:2 iii:1 bIII°:1 ii:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Em – E♭° – Dm – G7 – C: Eleganter chromatischer Fall im Bass (E → E♭ → D).', en: 'C – Em – E♭° – Dm – G7 – C: Smooth chromatic descent (E → E♭ → D).' }
          }
        ]
      }
    ]
  };

  L.tritone_sub = {
    id: 'tritone_sub',
    badge: 'jazz',
    title: { de: 'Tritonus-Substitution', en: 'Tritone Substitution' },
    units: [
      {
        title: { de: 'Terz und Septime tauschen die Rollen', en: 'Third and Seventh Swap Roles' },
        body: {
          de: `<p>Die treibende Kraft jedes Dominantseptakkords steckt im <b>Tritonus</b> zwischen Terz und Septime: In <code>G7</code> sind das <b>[B]</b> (Terz) und <b>F</b> (Septime).</p>
               <p>Baust du nun einen Dominantseptakkord genau einen <b>Tritonus (6 Halbtöne) entfernt</b> – also <b><code>D♭7</code></b> (D♭ – <b>F</b> – A♭ – <b>C♭</b> [= [B]]) – tauchen <b>exakt dieselben beiden Spannungstöne</b> wieder auf, nur mit vertauschten Rollen! F ist jetzt die Terz, [B]/C♭ die Septime.</p>
               <p><b>Ergebnis:</b> Du kannst <code>V7</code> durch <code>♭II7</code> ersetzen – und der Bass fällt plötzlich ultra-geschmeidig in Halbtonschritten: <b>D → D♭ → C</b>!</p>`,
          en: `<p>The driving tension of any dominant 7th chord lives in the <b>tritone</b> between its 3rd and 7th: in <code>G7</code>, that is <b>B</b> (3rd) and <b>F</b> (7th).</p>
               <p>Build another dominant 7th exactly a <b>tritone (6 semitones) away</b> — <b><code>D♭7</code></b> (D♭ – <b>F</b> – A♭ – <b>C♭</b> [= B]) — and the <b>exact same two tension notes</b> appear with swapped roles!</p>
               <p><b>Result:</b> Replace <code>V7</code> with <code>♭II7</code> to get a silky chromatic bass descent: <b>D → D♭ → C</b>!</p>`
        },
        examples: [
          {
            title: { de: 'Vorher: Original ii7 – V7 – Imaj7', en: 'Before: Original ii7 – V7 – Imaj7' },
            toks: 'ii7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7 – Cmaj7: Klassischer Quintfall im Bass (D → G → C).', en: 'Dm7 – G7 – Cmaj7: Classic fifths in the bass (D → G → C).' }
          },
          {
            title: { de: 'Nachher: V7 ersetzt durch ♭II7', en: 'After: V7 replaced by ♭II7' },
            toks: 'ii7:2 bII7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – D♭7 – Cmaj7: Chromatisch fallender Bass (D → D♭ → C), oben bleiben F und [B] erhalten!', en: 'Dm7 – D♭7 – Cmaj7: Chromatic bass walkdown (D → D♭ → C) while F and B stay in place!' }
          },
          {
            title: { de: 'Im Turnaround + ersetzte Zwischendominante', en: 'Double tritone-sub turnaround' },
            toks: 'Imaj7:1 bIII7:1 ii7:1 bII7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – E♭7 – Dm7 – D♭7 – Cmaj7: E♭7 ersetzt A7 (V7/ii), D♭7 ersetzt G7 – der Bass gleitet E♭ → D → D♭ → C!', en: 'Cmaj7 – E♭7 – Dm7 – D♭7 – Cmaj7: E♭7 replaces A7, D♭7 replaces G7 — bass glides E♭ → D → D♭ → C!' }
          }
        ],
        check: {
          q: { de: 'Welcher Akkord ist die Tritonus-Substitution von G7 in C-Dur?', en: 'Which chord is the tritone substitution for G7 in C major?' },
          opts: [
            { de: 'D♭7 (♭II7)', en: 'D♭7 (♭II7)' },
            { de: 'F7 (IV7)', en: 'F7 (IV7)' },
            { de: 'E7 (V7/vi)', en: 'E7 (V7/vi)' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! D♭ liegt genau 6 Halbtöne (einen Tritonus) von G entfernt und teilt die Töne F und [B]/C♭.',
            en: 'Correct! D♭ sits 6 semitones (a tritone) from G and shares the guide tones F and B/C♭.'
          }
        }
      },
      {
        title: { de: 'Jazz-Gitarren-Klassiker: Die Shell-Voicing-Kette (Tritonus-Walkdown)', en: 'Jazz Guitar Classic: The Shell-Voicing Tritone Walkdown' },
        body: key => {
          const T = MT.theory;
          const kName = T.noteName(key);
          const mk = tok => T.parseChord(tok, key, 'maj');
          const cV = mk('V7'), cSub1 = mk('bII7'), cI7 = mk('I7'), cIV7 = mk('IV7');
          const cIII7 = mk('III7'), cSub2 = mk('bVII7'), cVI7 = mk('VI7'), cII7 = mk('II7'), cHome = mk('Imaj7');
          const gt = c => {
            const sp = T.spellChord(c);
            return `${T.fmtNote(sp[(c.root + 4) % 12])} – ${T.fmtNote(sp[(c.root + 10) % 12])}`;
          };
          // Exact guitar neck frets on strings E-A-D-G (A-string root f0 in 8..19 so f0-8 >= 0 in all 12 keys!)
          let f0 = ((key + 7) - 9 + 24) % 12;
          if (f0 < 8) f0 += 12;
          const tabLine = `<code>${cV.name}</code> (x-${f0}-<b>${f0 - 1}-${f0}</b>) → <code>${cSub1.name}</code> (${f0 - 1}-x-<b>${f0 - 1}-${f0}</b>) → <code>${cI7.name}</code> (${f0 - 2}-x-<b>${f0 - 2}-${f0 - 1}</b>) → <code>${cIV7.name}</code> (x-${f0 - 2}-<b>${f0 - 3}-${f0 - 2}</b>) → <code>${cIII7.name}</code> (x-${f0 - 3}-<b>${f0 - 4}-${f0 - 3}</b>) → <code>${cSub2.name}</code> (${f0 - 4}-x-<b>${f0 - 4}-${f0 - 3}</b>) → <code>${cVI7.name}</code> (${f0 - 5}-x-<b>${f0 - 5}-${f0 - 4}</b>) → <code>${cII7.name}</code> (x-${f0 - 5}-<b>${f0 - 6}-${f0 - 5}</b>) → <code>${cSub1.name}</code> (x-${f0 - 6}-<b>${f0 - 7}-${f0 - 6}</b>) → <code>${cHome.name}</code> (x-${f0 - 7}-${f0 - 8}-${f0 - 6})`;
          return {
            de: `<p>Ein absoluter Lieblings-Trick auf der <b>Jazz-Gitarre</b> (und genauso genial am Klavier!) kombiniert <b>Shell-Septakkorde</b> – also schlanke 3-Ton-Griffe aus <b>Grundton + Terz (3) + kleine Septime (♭7)</b> ohne Quinte – mit einem wiederkehrenden <b>Bassmuster aus Quintfall &amp; Tritonus-Substitution</b>:</p>
                 <p style="font-size:1.02rem"><b>Bass-Muster:</b> <code>Tritonus ↓</code> → <code>HT ↓</code> → <code>Quarte ↑</code> → <code>HT ↓</code> → <code>Tritonus ↓</code> → <code>HT ↓</code> → <code>Quarte ↑</code> → <code>HT ↓</code> …</p>
                 <div style="overflow-x:auto"><table class="data-tbl">
                   <tr><th>Stufe</th><th>Akkord (${kName}-Dur)</th><th>Bass-Sprung</th><th>Shell (3 &amp; ♭7)</th><th>Was passiert?</th></tr>
                   <tr><td><code>V7</code></td><td><b>${cV.name}</b></td><td>Start</td><td>${gt(cV)}</td><td>Ausgangs-Shell</td></tr>
                   <tr><td><code>♭II7</code></td><td><b>${cSub1.name}</b></td><td><b>Tritonus ↓</b> (−6 HT)</td><td>${gt(cSub1)}</td><td><b>Shell bleibt exakt liegen!</b> (Tritonus-Sub)</td></tr>
                   <tr><td><code>I7</code></td><td><b>${cI7.name}</b></td><td><b>HT ↓</b> (−1 HT)</td><td>${gt(cI7)}</td><td>Beide Shell-Töne fallen 1 Bund / 1 HT</td></tr>
                   <tr><td><code>IV7</code></td><td><b>${cIV7.name}</b></td><td><b>Quarte ↑</b> (+5 HT)</td><td>${gt(cIV7)}</td><td>Beide Shell-Töne fallen 1 Bund / 1 HT</td></tr>
                   <tr><td><code>III7</code></td><td><b>${cIII7.name}</b></td><td><b>HT ↓</b> (−1 HT)</td><td>${gt(cIII7)}</td><td>Beide Shell-Töne fallen 1 Bund / 1 HT</td></tr>
                   <tr><td><code>♭VII7</code></td><td><b>${cSub2.name}</b></td><td><b>Tritonus ↓</b> (−6 HT)</td><td>${gt(cSub2)}</td><td><b>Shell bleibt exakt liegen!</b> (Tritonus-Sub)</td></tr>
                   <tr><td><code>VI7</code></td><td><b>${cVI7.name}</b></td><td><b>HT ↓</b> (−1 HT)</td><td>${gt(cVI7)}</td><td>Beide Shell-Töne fallen 1 Bund / 1 HT</td></tr>
                   <tr><td><code>II7</code></td><td><b>${cII7.name}</b></td><td><b>Quarte ↑</b> (+5 HT)</td><td>${gt(cII7)}</td><td>Beide Shell-Töne fallen 1 Bund / 1 HT</td></tr>
                   <tr><td><code>♭II7</code></td><td><b>${cSub1.name}</b></td><td><b>HT ↓</b> (−1 HT)</td><td>${gt(cSub1)}</td><td>Beide Shell-Töne fallen 1 HT → löst in <b>${cHome.name}</b>!</td></tr>
                 </table></div>
                 <div class="callout tip"><strong>Warum lieben Jazz-Gitarristen dieses Muster am Griffbrett?</strong>
                 Du greifst die <b>Shell-Töne (3 &amp; ♭7)</b> dauerhaft auf der <b>D- und G-Saite</b>, während der Bass abwechselnd auf der <b>A- und tiefen E-Saite</b> springt! Exakte Bünde in <b>${kName}-Dur</b> (Saiten E–A–D–G, fett = D &amp; G):<br>
                 ${tabLine}<br>
                 Die beiden Führungsstimmen (D- &amp; G-Saite) gleiten völlig mühelos <b>Bund für Bund chromatisch abwärts</b> – und bei jedem Tritonus-Sprung bleiben sie wie festgenagelt stehen!</div>`,
            en: `<p>A beloved <b>jazz guitar</b> staple (and just as slick on piano!) pairs <b>shell seventh chords</b> — lean 3-note grips using only <b>root + 3rd + ♭7</b> (no 5th!) — with a repeating <b>bass pattern combining falling fifths and tritone substitutions</b>:</p>
                 <p style="font-size:1.02rem"><b>Bass pattern:</b> <code>Tritone ↓</code> → <code>Half-step ↓</code> → <code>4th ↑</code> → <code>Half-step ↓</code> → <code>Tritone ↓</code> → <code>Half-step ↓</code> → <code>4th ↑</code> → <code>Half-step ↓</code> …</p>
                 <div style="overflow-x:auto"><table class="data-tbl">
                   <tr><th>Degree</th><th>Chord (${kName} major)</th><th>Bass Motion</th><th>Shell (3 &amp; ♭7)</th><th>Voice Leading</th></tr>
                   <tr><td><code>V7</code></td><td><b>${cV.name}</b></td><td>Start</td><td>${gt(cV)}</td><td>Starting shell</td></tr>
                   <tr><td><code>♭II7</code></td><td><b>${cSub1.name}</b></td><td><b>Tritone ↓</b> (−6 st)</td><td>${gt(cSub1)}</td><td><b>Shell stays completely still!</b> (Tritone sub)</td></tr>
                   <tr><td><code>I7</code></td><td><b>${cI7.name}</b></td><td><b>Half-step ↓</b> (−1 st)</td><td>${gt(cI7)}</td><td>Both guide tones drop 1 fret</td></tr>
                   <tr><td><code>IV7</code></td><td><b>${cIV7.name}</b></td><td><b>4th ↑</b> (+5 st)</td><td>${gt(cIV7)}</td><td>Both guide tones drop 1 fret</td></tr>
                   <tr><td><code>III7</code></td><td><b>${cIII7.name}</b></td><td><b>Half-step ↓</b> (−1 st)</td><td>${gt(cIII7)}</td><td>Both guide tones drop 1 fret</td></tr>
                   <tr><td><code>♭VII7</code></td><td><b>${cSub2.name}</b></td><td><b>Tritone ↓</b> (−6 st)</td><td>${gt(cSub2)}</td><td><b>Shell stays completely still!</b> (Tritone sub)</td></tr>
                   <tr><td><code>VI7</code></td><td><b>${cVI7.name}</b></td><td><b>Half-step ↓</b> (−1 st)</td><td>${gt(cVI7)}</td><td>Both guide tones drop 1 fret</td></tr>
                   <tr><td><code>II7</code></td><td><b>${cII7.name}</b></td><td><b>4th ↑</b> (+5 st)</td><td>${gt(cII7)}</td><td>Both guide tones drop 1 fret</td></tr>
                   <tr><td><code>♭II7</code></td><td><b>${cSub1.name}</b></td><td><b>Half-step ↓</b> (−1 st)</td><td>${gt(cSub1)}</td><td>Both guide tones drop 1 fret → resolves to <b>${cHome.name}</b>!</td></tr>
                 </table></div>
                 <div class="callout tip"><strong>Why jazz guitarists adore this fretboard exercise</strong>
                 Keep the <b>shell guide tones (3 &amp; ♭7)</b> on the <b>D and G strings</b> while the bass alternates smoothly between the <b>A and low E strings</b>! Exact frets in <b>${kName} major</b> (strings E–A–D–G, bold = D &amp; G):<br>
                 ${tabLine}<br>
                 Your guide-tone fingers simply glide <b>fret by fret down the neck</b> — freezing in place on every tritone drop!</div>`
          };
        },
        examples: [
          {
            title: { de: 'Kompletter Jazz-Gitarren Shell-Walkdown (Tritonus↓ – HT↓ – Quarte↑ – HT↓)', en: 'Full Jazz Guitar Shell Walkdown (Tritone↓ – HT↓ – 4th↑ – HT↓)' },
            toks: 'V7:2 bII7:2 I7:2 IV7:2 III7:2 bVII7:2 VI7:2 II7:2 bII7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'G7 – D♭7 – C7 – F7 – E7 – [B♭7] – A7 – D7 – D♭7 – Cmaj7: Verfolge im Live-View (Stimmführung!) die beiden Guide Tones – sie bleiben bei G7→D♭7 und E7→[B♭7] stehen und fallen dazwischen stetig halbtonweise abwärts!', en: 'G7 – D♭7 – C7 – F7 – E7 – B♭7 – A7 – D7 – D♭7 – Cmaj7: Watch the guide tones in Live View (Voice Leading!) — they hold steady on G7→D♭7 and E7→B♭7 and glide down by semitones everywhere else!' }
          },
          {
            title: { de: 'Kompakter Schluss-Turnaround aus der Kette (III7 – ♭VII7 – VI7 – II7 – ♭II7 – I)', en: 'Compact turnaround excerpt (III7 – ♭VII7 – VI7 – II7 – ♭II7 – I)' },
            toks: 'III7:2 bVII7:2 VI7:2 II7:2 bII7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'E7 – [B♭7] – A7 – D7 – D♭7 – Cmaj7: Sofort einsatzbereit als elegante Jazz-Bridge oder Schlusswendung!', en: 'E7 – B♭7 – A7 – D7 – D♭7 – Cmaj7: Ready to drop straight into a jazz bridge or ending!' }
          }
        ]
      }
    ]
  };

  L.modal_interchange = {
    id: 'modal_interchange',
    badge: 'pop',
    title: { de: 'Modaler Tausch (Leihakkorde)', en: 'Modal Interchange (Borrowed Chords)' },
    units: [
      {
        title: { de: 'Farbtupfer aus dem gleichnamigen Moll', en: 'Borrowing Colors from Parallel Minor' },
        body: {
          de: `<p>Beim <b>modalen Tausch</b> bleibst du in deiner Dur-Tonart (z. B. C-Dur), leihst dir aber einzelne Akkorde aus dem <b>gleichnamigen Moll</b> (c-Moll) aus. Das sorgt für Gänsehaut-Momente zwischen Licht und Schatten:</p>
               <ul>
                 <li><b><code>iv</code> (Fm):</b> Die Moll-Subdominante – wehmütig, sehnsüchtig (oft direkt nach <code>IV</code>!).</li>
                 <li><b><code>♭VI</code> (A♭):</b> Weit, episch, magisch.</li>
                 <li><b><code>♭VII</code> ([B♭]):</b> Kraftvoll, rockig, führt ohne Leitton zur Tonika.</li>
                 <li><b><code>♭III</code> (E♭):</b> Dunkles, kerniges Dur.</li>
               </ul>
               <div class="callout song"><strong>Hör-Anker aus Pop & Film</strong>
               • <code>IV → iv → I</code>: <em>Creep</em> (Radiohead), <em>In My Life</em> (Beatles), <em>Wake Me Up When September Ends</em><br>
               • <code>♭VI – ♭VII – I</code> („Heldenkadenz“): <em>Herr der Ringe – Fellowship Theme</em> (2. Teil: <code>IV – ♭VI – ♭VII – I</code>), <em>Super Mario Fanfare</em>, <em>With a Little Help from My Friends</em>, unzählige Film-Trailer!</div>`,
          en: `<p>With <b>modal interchange</b> you stay in your major key (e.g. C major) while borrowing chords from the <b>parallel minor</b> (C minor) for instant emotional depth:</p>
               <ul>
                 <li><b><code>iv</code> (Fm):</b> Minor subdominant — nostalgic, bittersweet (often right after <code>IV</code>!).</li>
                 <li><b><code>♭VI</code> (A♭):</b> Wide, cinematic, wondrous.</li>
                 <li><b><code>♭VII</code> (B♭):</b> Bold, rock-flavored lift into the tonic.</li>
                 <li><b><code>♭III</code> (E♭):</b> Dark, heroic major.</li>
               </ul>
               <div class="callout song"><strong>Song anchors</strong>
               • <code>IV → iv → I</code>: <em>Creep</em> (Radiohead), <em>In My Life</em> (Beatles)<br>
               • <code>♭VI – ♭VII – I</code> (“Hero cadence”): <em>Lord of the Rings – Fellowship Theme</em> (2nd half: <code>IV – ♭VI – ♭VII – I</code>), <em>Super Mario fanfare</em>, <em>With a Little Help from My Friends</em>, epic film scores!</div>`
        },
        examples: [
          {
            title: { de: 'Moll-Subdominante: I – IV – iv – I', en: 'Minor subdominant: I – IV – iv – I' },
            toks: 'I IV iv I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – Fm – C: Achte auf die fallende Linie A → A♭ → G – pure Nostalgie!', en: 'C – F – Fm – C: Hear the bittersweet line A → A♭ → G!' }
          },
          {
            title: { de: 'Heldenkadenz: I – ♭VI – ♭VII – I', en: 'Hero cadence: I – ♭VI – ♭VII – I' },
            toks: 'I:2 bVI:1 bVII:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – A♭ – [B♭] – C: Episch, triumphierend und aus Rock & Filmmusik nicht wegzudenken.', en: 'C – A♭ – B♭ – C: Epic and triumphant — a staple of rock and film music.' }
          },
          {
            title: { de: 'Ganze Schatten-Kette: I – iv – ♭VI – ♭VII – I', en: 'Full borrowed chain: I – iv – ♭VI – ♭VII – I' },
            toks: 'I:2 iv:2 bVI:1 bVII:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Fm – A♭ – [B♭] – C: Erst dunkel einfärben, dann strahlend nach C-Dur zurückkehren.', en: 'C – Fm – A♭ – B♭ – C: Deep shadow followed by a bright return home.' }
          }
        ]
      }
    ]
  };

  L.backdoor_cadence = {
    id: 'backdoor_cadence',
    badge: 'jazz',
    title: { de: 'Die Backdoor-Kadenz (iv7 – ♭VII7 – I)', en: 'The Backdoor Cadence (iv7 – ♭VII7 – I)' },
    units: [
      {
        title: { de: 'Die samtige Hintertür zur Tonika', en: 'The Smooth Backdoor Return Home' },
        transposeBody: true,
        body: {
          de: `<p>Statt durch die „Vordertür“ (<code>ii7 – V7 → Imaj7</code>) kannst du eine Dur-Tonika auch durch die elegante <b>Hintertür („Backdoor“)</b> erreichen: <b><code>iv7 – ♭VII7 → Imaj7</code></b> (in C-Dur: <code>Fm7 – [B♭7] → Cmaj7</code>).</p>
               <p><b>Warum klingt das so überraschend warm und doch schlüssig?</b></p>
               <ul>
                 <li>Die Akkorde stammen aus dem <b>Modalen Tausch</b> (Moll-Subdominante <code>iv7</code> + Dominantseptakkord auf der kleinen Septime <code>♭VII7</code>).</li>
                 <li>Im Bass steigt <code>[B♭] → C</code> um einen ganzen Ton – kein harter Leitton-Druck, sondern ein sanftes Hineingleiten!</li>
                 <li>Oben steckt ein kleiner Zaubertrick: Die Töne <code>D – F – A♭</code> in <code>[B♭7]</code> ziehen halbtonweise in <code>E – G</code> bzw. <code>C</code>!</li>
               </ul>
               <div class="callout song"><strong>Hör-Anker</strong><em>There Will Never Be Another You</em>, <em>Stella by Starlight</em>, <em>Lady Madonna</em> (Beatles), <em>Isn't She Lovely</em> (Stevie Wonder) und unzählige R&amp;B- / Neo-Soul-Songs!</div>`,
          en: `<p>Instead of entering through the “front door” (<code>ii7 – V7 → Imaj7</code>), you can resolve into a major tonic through the lush <b>Backdoor cadence</b>: <b><code>iv7 – ♭VII7 → Imaj7</code></b> (in C major: <code>Fm7 – B♭7 → Cmaj7</code>).</p>
               <p><b>Why does it sound so warm yet conclusive?</b></p>
               <ul>
                 <li>Both chords borrow color from <b>modal interchange</b> (minor subdominant <code>iv7</code> + dominant 7th on <code>♭VII7</code>).</li>
                 <li>The bass steps up a whole tone (<code>B♭ → C</code>) for a relaxed, soulful lift instead of a sharp leading-tone snap.</li>
               </ul>
               <div class="callout song"><strong>Song anchors</strong><em>There Will Never Be Another You</em>, <em>Stella by Starlight</em>, <em>Lady Madonna</em> (Beatles), R&amp;B &amp; Neo-Soul classics!</div>`
        },
        examples: [
          {
            title: { de: 'Klassische Backdoor-Kadenz: I – iv7 – ♭VII7 – I', en: 'Classic backdoor cadence: I – iv7 – ♭VII7 – I' },
            toks: 'Imaj7:2 iv7:1 bVII7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Fm7 – [B♭7] – Cmaj7: Vergleiche dieses samtige Hineingleiten mit dem gewohnten G7 → C!', en: 'Cmaj7 – Fm7 – B♭7 – Cmaj7: Compare this velvety landing with a standard G7 → C!' }
          },
          {
            title: { de: 'Mit Dur-Subdominante davor: IV → iv7 → ♭VII7 → I', en: 'With major IV first: IV → iv7 → ♭VII7 → I' },
            toks: 'Imaj7:2 IVmaj7:2 iv7:1 bVII7:1 Imaj7:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Fmaj7 – Fm7 – [B♭7] – Cmaj7: Erst hell auf IV, dann der melancholische Schatten iv7 und die warme Backdoor-Auflösung.', en: 'Cmaj7 – Fmaj7 – Fm7 – B♭7 – Cmaj7: Bright IV melts into minor iv7 and resolves through the backdoor.' }
          }
        ]
      }
    ]
  };

  L.line_cliches = {
    id: 'line_cliches',
    badge: 'pop',
    title: { de: 'Line Clichés (Wandernde Innenstimmen)', en: 'Line Clichés (Chromatic Moving Inner Lines)' },
    units: [
      {
        title: { de: 'Ein Akkord bleibt – ein einziger Ton erzählt die Geschichte', en: 'One Chord Stays — One Single Moving Note Tells the Story' },
        transposeBody: true,
        body: {
          de: `<p>Ein <b>Line Cliché</b> ist einer der wirkungsvollsten Tricks im Songwriting: Der Grundakkord (und oft der Bass) bleibt stehen, während <b>eine einzige Innenstimme chromatisch Halbton für Halbton wandert</b>!</p>
               <ul>
                 <li><b>Moll-Line-Cliché (fallend):</b> <code>i – i(maj7) – i7 – i6</code> (z. B. <code>Am – Am(maj7) – Am7 – Am6</code>) – die Linie fällt chromatisch: <b>A → G♯ → G → F♯</b>!</li>
                 <li><b>Dur-Line-Cliché (fallend):</b> <code>I – Imaj7 – I7 – IV</code> (z. B. <code>C – Cmaj7 – C7 – F</code>) – die Linie fällt <b>C → [B] → [B♭] → A</b> direkt in die Terz der Subdominante!</li>
                 <li><b>Dur-Line-Cliché (steigend):</b> <code>I – I+ – I6 – I7</code> – die Quinte klettert <b>G → G♯ → A → [B♭]</b>!</li>
               </ul>
               <div class="callout song"><strong>Weltberühmte Hör-Anker</strong>
               • <b>Dur fallend (<code>I – Imaj7 – I7 – IV</code>):</b> <em>Can't Take My Eyes Off You</em> (Frankie Valli), <em>My Way</em> (Frank Sinatra), <em>Something</em> (Beatles)!<br>
               • <b>Moll fallend (<code>i – i(maj7) – i7 – i6</code>):</b> <em>Stairway to Heaven</em> (Led Zeppelin), <em>My Funny Valentine</em>, <em>In a Sentimental Mood</em>, <em>James Bond</em>-Thema!</div>`,
          en: `<p>A <b>line cliché</b> is one of songwriting's most iconic devices: the chord (and often the bass) stays grounded while <b>a single inner voice glides chromatically semitone by semitone</b>!</p>
               <ul>
                 <li><b>Minor descending cliché:</b> <code>i – i(maj7) – i7 – i6</code> (e.g. <code>Am – Am(maj7) – Am7 – Am6</code>) — one voice walks down: <b>A → G♯ → G → F♯</b>!</li>
                 <li><b>Major descending cliché:</b> <code>I – Imaj7 – I7 – IV</code> — the line falls <b>C → B → B♭ → A</b> straight into the 3rd of IV!</li>
                 <li><b>Major ascending cliché:</b> <code>I – I+ – I6 – I7</code> — the fifth climbs <b>G → G♯ → A → B♭</b>!</li>
               </ul>
               <div class="callout song"><strong>Iconic song anchors</strong>
               • <b>Major descending (<code>I – Imaj7 – I7 – IV</code>):</b> <em>Can't Take My Eyes Off You</em>, <em>My Way</em> (Frank Sinatra), <em>Something</em> (Beatles)!<br>
               • <b>Minor descending (<code>i – i(maj7) – i7 – i6</code>):</b> <em>Stairway to Heaven</em>, <em>My Funny Valentine</em>, <em>James Bond</em> theme!</div>`
        },
        examples: [
          {
            title: { de: 'Dur-Cliché („Can’t Take My Eyes Off You“ / „My Way“)', en: 'Major cliché (“Can’t Take My Eyes Off You” / “My Way”)' },
            toks: 'I:2 Imaj7:2 I7:2 IV:2 iv:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Cmaj7 – C7 – F – Fm – C: Verfolge die fallende Linie C → [B] → [B♭] → A → A♭ → G – Gänsehaut pur!', en: 'C – Cmaj7 – C7 – F – Fm – C: Follow the falling line C → B → B♭ → A → A♭ → G!' }
          },
          {
            title: { de: 'Moll-Cliché („Stairway“ / „My Funny Valentine“)', en: 'Minor cliché (“Stairway” / “My Funny Valentine”)' },
            toks: 'i imaj7 i7 i6',
            mode: 'min',
            transpose: true,
            desc: { de: 'Cm – Cm(maj7) – Cm7 – Cm6: Der Grundton bleibt im Bass, oben gleitet die Stimme C → [B] → [B♭] → A abwärts.', en: 'Cm – Cm(maj7) – Cm7 – Cm6: The bass holds while an inner line glides C → B → B♭ → A.' }
          },
          {
            title: { de: 'Aufsteigendes Dur-Cliché: I – I+ – I6 – I7', en: 'Ascending major cliché: I – I+ – I6 – I7' },
            toks: 'I:2 I+:2 I6:2 I7:2 IV:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C+ – C6 – C7 – F: Die Quinte steigt chromatisch G → G♯ → A → [B♭] und mündet in F.', en: 'C – C+ – C6 – C7 – F: The fifth climbs chromatically G → G♯ → A → B♭ into F.' }
          }
        ]
      }
    ]
  };

  L.jazz_blues = {
    id: 'jazz_blues',
    badge: 'jazz',
    title: { de: 'Vom Blues zum Jazz-Blues', en: 'From Blues to Jazz Blues' },
    units: [
      {
        title: { de: 'Basis: 12-Takt-Blues, Quick Change & #IV°7', en: 'Foundation: 12-Bar Blues, Quick Change & #IV°7' },
        transposeBody: true,
        body: {
          de: `<p>Der klassische <b>12-Takt-Blues</b> kommt mit nur drei Akkorden aus: <code>I7</code>, <code>IV7</code> und <code>V7</code> (in C: <code>C7</code>, <code>F7</code>, <code>G7</code>). Alle drei tragen eine <b>kleine Septime</b> – das verleiht dem Blues seinen rauen, erdigen Grundklang.</p>
               <p>Bevor wir komplett in den Jazz abbiegen, machen schon <b>zwei kleine Handgriffe</b> die Form sofort lebendiger:</p>
               <ul>
                 <li><b>Quick Change (Takt 2):</b> Statt 4 Takte auf <code>I7</code> zu bleiben, springt Takt 2 kurz auf <code>IV7</code> und kehrt in Takt 3 zurück zu <code>I7</code>.</li>
                 <li><b>Verminderter Durchgangsakkord in Takt 6 (<code>♯IV°7</code>):</b> Nach <code>IV7</code> (Takt 5) schiebt sich <code>F♯°7</code> dazwischen und zieht im Bass chromatisch hoch nach <code>C7/G</code> (<code>F → F♯ → G</code>)!</li>
               </ul>`,
          en: `<p>The classic <b>12-bar blues</b> uses just three chords: <code>I7</code>, <code>IV7</code>, and <code>V7</code> (in C: <code>C7</code>, <code>F7</code>, <code>G7</code>). All three are dominant 7th chords, giving the blues its gritty, earthy bite.</p>
               <p>Before diving into full jazz harmony, just <b>two simple upgrades</b> bring the 12-bar form alive:</p>
               <ul>
                 <li><b>Quick Change (bar 2):</b> Instead of sitting on <code>I7</code> for four bars, bar 2 hops briefly to <code>IV7</code> before returning to <code>I7</code> in bar 3.</li>
                 <li><b>Diminished passing chord in bar 6 (<code>♯IV°7</code>):</b> After <code>IV7</code> (bar 5), <code>F♯°7</code> bridges chromatically up into <code>C7/G</code> (<code>F → F♯ → G</code>)!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vorher: Klassischer 12-Takt-Blues (3 Akkorde)', en: 'Before: Classic 12-bar blues (3 chords)' },
            toks: 'I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 V7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Das 12-taktige Ur-Gerüst: 4 Takte I7, 2 Takte IV7, 2 Takte I7, dann V7 – IV7 – I7 – V7.', en: 'The original 12-bar blueprint: 4 bars I7, 2 bars IV7, 2 bars I7, then V7 – IV7 – I7 – V7.' }
          },
          {
            title: { de: 'Schritt 1: Mit Quick Change (Takt 2) & ♯IV°7-Durchgang (Takt 6)', en: 'Step 1: With Quick Change (bar 2) & ♯IV°7 passing chord (bar 6)' },
            toks: 'I7 IV7 I7 I7 IV7 #IV°7 I7^2 I7 V7 IV7 I7 V7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C7 – F7 – C7 – C7 | F7 – F♯°7 – C7/G – C7 | G7 – F7 – C7 – G7: Spüre sofort den chromatischen Schub in Takt 5–7 (F → F♯ → G)!', en: 'C7 – F7 – C7 – C7 | F7 – F♯°7 – C7/G – C7 | G7 – F7 – C7 – G7: Hear the chromatic lift across bars 5–7 (F → F♯ → G)!' }
          }
        ]
      },
      {
        title: { de: 'Der Jazz-Blues: Sekundärdominanten, ii–V & Turnaround', en: 'Full Jazz Blues: Secondary Dominants, ii–V & Turnaround' },
        transposeBody: true,
        body: {
          de: `<p>Im <b>Jazz-Blues</b> (<em>Billie’s Bounce</em>, <em>Now’s the Time</em>, <em>Tenor Madness</em>) verbinden wir die drei Blues-Säulen mit allem, was wir zuvor gelernt haben – <b>Zwischenkadenzen, Sekundärdominanten, verminderten Durchgängen und Tritonus-Substitutionen</b>:</p>
               <ol>
                 <li><b>Takt 4 (<code>ii7/IV – V7/IV</code>):</b> Vor der <code>IV7</code> (Takt 5) schalten wir ihr eigenes <code>ii–V</code> (<code>Gm7 – C7 → F7</code>) – F7 fühlt sich kurz wie eine neue I an!</li>
                 <li><b>Takt 6 (<code>♯IV°7</code>):</b> Verminderter Durchgangsakkord nach <code>IV7</code> (<code>F7 → F♯°7 → C7</code>).</li>
                 <li><b>Takt 8 (<code>V7/ii</code>, gern als <code>V7♭9/ii</code>):</b> Die Sekundärdominante <code>A7</code> (oder <code>A7♭9</code>) zielt direkt auf <code>ii7</code> (<code>Dm7</code>) in Takt 9!</li>
                 <li><b>Takt 9–12 (<code>ii7 – V7 – Turnaround</code>):</b> Statt <code>V7 – IV7</code> steht ein echtes Jazz-<code>ii7 – V7</code> (<code>Dm7 – G7</code>), gefolgt vom <b>Turnaround</b> <code>C7 – A7 – Dm7 – G7</code> (oder chromatisch mit Tritonus-Sub: <code>C7 – E♭7 – Dm7 – D♭7</code>)!</li>
               </ol>
               <div class="callout tip"><strong>Der versteckte Doppel-<code>ii–V–I</code>-Trick im Turnaround (<code>VI7</code> &amp; <code>3–6–2–5–1</code>)!</strong>
               Warum steht im Jazz-Blues-Schluss auf der 6. Stufe ein Dur-Dominantakkord <b><code>VI7</code></b> (<code>A7</code> statt <code>Am7</code>)? Weil <code>A7</code> die Dominante (<code>V7/ii</code>) zu <code>Dm7</code> ist! Ersetzt man im Turnaround die <code>I</code> (<code>C</code>) noch durch ihren engen Stellvertreter <b><code>iii7</code></b> (<code>Em7</code> – teilt 3 Töne mit Cmaj7!), entsteht die berühmte <b><code>3 – 6 – 2 – 5 – 1</code>-Kette</b> (<code>Em7 – A7 – Dm7 – G7 – C</code>):<br>
               • <b><code>Em7 – A7 → Dm7</code></b> ist selbst schon eine komplette <b><code>ii–V–I</code> auf das Ziel <code>ii</code> (Dm7)</b>!<br>
               • Direkt anschließend folgt <b><code>Dm7 – G7 → C</code></b> – die <b><code>ii–V–I</code> zurück nach <code>I</code></b>!</div>`,
          en: `<p>In a <b>Jazz Blues</b> (<em>Billie’s Bounce</em>, <em>Now’s the Time</em>, <em>Tenor Madness</em>), we connect the three blues pillars using <b>secondary ii–Vs, secondary dominants, diminished passing chords, and tritone subs</b>:</p>
               <ol>
                 <li><b>Bar 4 (<code>ii7/IV – V7/IV</code>):</b> Prepare <code>IV7</code> (bar 5) with its own <code>ii–V</code> (<code>Gm7 – C7 → F7</code>)!</li>
                 <li><b>Bar 6 (<code>♯IV°7</code>):</b> Diminished passing chord out of <code>IV7</code> (<code>F7 → F♯°7 → C7</code>).</li>
                 <li><b>Bar 8 (<code>V7/ii</code> or <code>V7♭9/ii</code>):</b> Secondary dominant <code>A7</code> (or <code>A7♭9</code>) drives straight into <code>ii7</code> (<code>Dm7</code>) in bar 9!</li>
                 <li><b>Bars 9–12 (<code>ii7 – V7 – Turnaround</code>):</b> Replace <code>V7 – IV7</code> with a smooth <code>ii7 – V7</code> (<code>Dm7 – G7</code>) and finish with the <b>turnaround</b> <code>C7 – A7 – Dm7 – G7</code> (or tritone-sub <code>C7 – E♭7 – Dm7 – D♭7</code>)!</li>
               </ol>
               <div class="callout tip"><strong>The hidden double <code>ii–V–I</code> inside the turnaround (<code>VI7</code> &amp; <code>3–6–2–5–1</code>)!</strong>
               Why does the Jazz Blues turnaround turn degree 6 into a dominant <b><code>VI7</code></b> (<code>A7</code> instead of <code>Am7</code>)? Because <code>A7</code> is <code>V7/ii</code> pulling into <code>Dm7</code>! And if you substitute <b><code>iii7</code></b> (<code>Em7</code>, sharing 3 notes with Cmaj7) for <code>I</code>, you get the iconic <b><code>3 – 6 – 2 – 5 – 1</code></b> turnaround (<code>Em7 – A7 – Dm7 – G7 – C</code>):<br>
               • <b><code>Em7 – A7 → Dm7</code></b> is itself a complete <b><code>ii–V–I</code> targeting <code>ii</code> (Dm7)</b>!<br>
               • Immediately followed by <b><code>Dm7 – G7 → C</code></b> — the main <b><code>ii–V–I</code> home to <code>I</code></b>!</div>`
        },
        examples: [
          {
            title: { de: 'Nachher: Kompletter 12-Takt-Jazz-Blues (mit Takt-Längen)', en: 'After: Complete 12-bar Jazz Blues (with real timing)' },
            toks: 'I7:2 IV7:2 I7:2 ii7/IV:1 V7/IV:1 IV7:2 #IV°7:2 I7:2 V7b9/ii:2 ii7:2 V7:2 I7:1 V7/ii:1 ii7:1 V7:1',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C7 | F7 | C7 | Gm7 C7 | F7 | F♯°7 | C7 | A7♭9 | Dm7 | G7 | C7 A7 | Dm7 G7: Alle Bausteine greifen wie Zahnräder ineinander! (Auch als fertiges Preset im Übungstool.)', en: 'C7 | F7 | C7 | Gm7 C7 | F7 | F♯°7 | C7 | A7♭9 | Dm7 | G7 | C7 A7 | Dm7 G7: Every jazz device locks together! (Also available as a preset in the Practice Tool.)' }
          },
          {
            title: { de: 'Turnaround als Doppel-ii–V–I: 3 – 6 – 2 – 5 – 1 (iii7 – VI7 – ii7 – V7 – I)', en: 'Turnaround as double ii–V–I: 3 – 6 – 2 – 5 – 1 (iii7 – VI7 – ii7 – V7 – I)' },
            toks: 'I7:2 iii7:1 V7/ii:1 ii7:1 V7:1 I7:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C7 – Em7 – A7 – Dm7 – G7 – C7: Em7 – A7 – Dm7 ist ein ii–V–I auf die 2. Stufe, gefolgt von Dm7 – G7 – C7 zurück zur I!', en: 'C7 – Em7 – A7 – Dm7 – G7 – C7: Em7 – A7 – Dm7 is a ii–V–I into degree ii, immediately followed by Dm7 – G7 – C7 home!' }
          },
          {
            title: { de: 'Jazz-Blues-Schluss (Takt 9–12) mit Tritonus-Substitution', en: 'Jazz blues ending (bars 9–12) with tritone substitution' },
            toks: 'ii7:2 V7:2 I7:1 bIII7:1 ii7:1 bII7:1 I7:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7 – C7 – E♭7 – Dm7 – D♭7 – C7: E♭7 ersetzt A7 (V7/ii), D♭7 ersetzt G7 (V7) – der Bass fällt chromatisch E♭ → D → D♭ → C!', en: 'Dm7 – G7 – C7 – E♭7 – Dm7 – D♭7 – C7: E♭7 subs for A7 and D♭7 subs for G7 — smooth chromatic bass E♭ → D → D♭ → C!' }
          }
        ],
        check: {
          q: { de: 'Welcher Akkord schiebt sich im Jazz-Blues in Takt 8 direkt vor die ii7 (Dm7) in Takt 9?', en: 'Which chord appears in bar 8 of a jazz blues to lead into ii7 (Dm7) in bar 9?' },
          opts: [
            { de: 'V7/ii (Sekundärdominante zu ii, z. B. A7 / A7♭9)', en: 'V7/ii (secondary dominant of ii, e.g. A7 / A7♭9)' },
            { de: 'IVmaj7 (Subdominante)', en: 'IVmaj7 (subdominant)' },
            { de: '♭II (Neapolitaner)', en: '♭II (Neapolitan)' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! V7/ii (oft mit ♭9 für extra Spannung!) zieht im Quintfall direkt in den ii7-Akkord von Takt 9.',
            en: 'Spot on! V7/ii (often with a ♭9 for extra tension) drops a fifth straight into ii7 in bar 9.'
          }
        }
      }
    ]
  };

  L.gospel_harmony = {
    id: 'gospel_harmony',
    badge: 'pop',
    title: { de: 'Gospel-Harmonik & Passing Chords', en: 'Gospel Harmony & Passing Chords' },
    units: [
      {
        title: { de: 'Das Gospel-Fundament: Wärme, IV/V & die 7–3–6–2–5–1-Wendung', en: 'Gospel Foundations: Warmth, IV/V & the 7–3–6–2–5–1 Move' },
        transposeBody: true,
        body: {
          de: `<p><b>Gospel-Harmonik</b> klingt auf den ersten Blick oft enorm komplex – dabei entsteht sie fast immer aus <b>ganz schlichten Grundfolgen</b> (<code>I – IV – V – I</code> oder <code>I – vi – ii – V – I</code>), in deren Lücken gezielt <b>Vorhalte, Sekundärdominanten, Umkehrungen und Passing Chords</b> eingesetzt werden:</p>
               <ul>
                 <li><b>Der Gospel-Vorhalt <code>IV/V → V → I</code></b> (z. B. <code>F/G → G → C</code>): Klingt sofort breit, warm und feierlich (entspricht <code>G9sus4</code>).</li>
                 <li><b>Die berühmte <code>7–3–6–2–5–1</code>-Kette:</b> <code>viiø – V7/vi – vi7 – ii7 – V9 – Imaj9</code> (in C: <code>[Bø7] – E7 – Am7 – Dm7 – G9 – Cmaj9</code>). Erst ein Moll-<code>ii–V</code> zur 6. Stufe (<code>vi</code>), und von dort im Quintfall nach Hause!</li>
                 <li><b>Das „Church Amen“ (<code>IV → iv6 → I</code>):</b> Veredelt den schlichten Plagalschluss durch die Moll-Subdominante mit großer Sexte (<code>Fm6 → C</code>).</li>
               </ul>`,
          en: `<p><b>Gospel harmony</b> can look intimidating at first glance — yet it almost always grows out of <b>simple diatonic skeletons</b> (<code>I – IV – V – I</code> or <code>I – vi – ii – V – I</code>) enriched with <b>slash voicings, secondary dominants, inversions, and passing chords</b>:</p>
               <ul>
                 <li><b>The signature <code>IV/V → V → I</code> cadence</b> (e.g. <code>F/G → G → C</code>): Warm, broad, and uplifting (functions as <code>G9sus4</code>).</li>
                 <li><b>The iconic <code>7–3–6–2–5–1</code> cycle:</b> <code>viiø – V7/vi – vi7 – ii7 – V9 – Imaj9</code> (in C: <code>Bø7 – E7 – Am7 – Dm7 – G9 – Cmaj9</code>) — a minor <code>ii–V</code> to <code>vi</code> followed by a falling-fifths trip home!</li>
                 <li><b>The “Church Amen” (<code>IV → iv6 → I</code>):</b> Elevates the plain plagal cadence with the lush minor subdominant <code>Fm6 → C</code>.</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vorher: Schlichte Gospel-Grundfolge (I – IV – vi – V – I)', en: 'Before: Simple gospel foundation (I – IV – vi – V – I)' },
            toks: 'I IV vi V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – Am – G – C: Das schlichte Ausgangsgerüst – direkt darunter siehst du, wie daraus Schritt für Schritt die berühmte 7–3–6–2–5–1 entsteht!', en: 'C – F – Am – G – C: The clean starting skeleton — right below, watch how it transforms step by step into the iconic 7–3–6–2–5–1!' }
          },
          {
            title: { de: 'Nachher: Das Gospel-Herzstück (7–3–6–2–5–1)', en: 'After: The Gospel staple (7–3–6–2–5–1)' },
            toks: 'I:2 viiø:1 V7b9/vi:1 vi7:2 ii7:1 V9:1 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – [Bø7] – E7♭9 – Am7 – Dm7 – G9 – Cmaj9 · So entsteht’s aus Vorher: Statt direkt zu vi (Am) zu springen, schalten wir sein eigenes Moll-ii–V davor ([Bø7] – E7♭9 → Am7). Vor die Dominante V kommt noch ii7 (Dm7), und V9 → Imaj9 färben den Schluss warm ein!', en: 'C – Bø7 – E7♭9 – Am7 – Dm7 – G9 – Cmaj9 · How it grows from Before: Before vi (Am) we insert its own minor ii–V (Bø7 – E7♭9 → Am7), add ii7 (Dm7) before V, and enrich the resolution with V9 → Imaj9!' }
          },
          {
            title: { de: 'Gospel-Amen (Plagalschluss veredelt): I – V7/IV⁶ – IV – iv6 – I⁶₄ – IV/V – I', en: 'Gospel “Amen” (elevated plagal cadence): I – V7/IV⁶ – IV – iv6 – I⁶₄ – IV/V – I' },
            toks: 'I V7/IV^1 IV iv6 I^2 IV@V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C7/E – F – Fm6 – C/G – F/G – C · So entsteht’s aus dem schlichten „I – IV – I“: Vor IV schiebt sich C7/E (Bass E→F), hinter IV färbt Modal Interchange zu Fm6 (A→A♭→G), und C/G → F/G dehnen die Auflösung feierlich aus!', en: 'C – C7/E – F – Fm6 – C/G – F/G – C · How it grows from plain “I – IV – I”: C7/E leads stepwise into F (bass E→F), Fm6 adds bittersweet modal interchange (A→A♭→G), and C/G → F/G stretches the warm landing!' }
          }
        ]
      },
      {
        title: { de: 'Gospel Walk-Up & Walk-Down (Spannungsaufbau über I → IV → I/V → V)', en: 'Gospel Walk-Up & Walk-Down (Building Tension via I → IV → I/V → V)' },
        transposeBody: true,
        body: {
          de: `<p>Das Markenzeichen moderner Gospel-Pianisten und Organisten sind <b>chromatische Walk-Ups (Aufstieg)</b> und <b>Walk-Downs (Abstieg)</b>. Beide Varianten beruhen auf demselben einfachen Spannungsgerüst <b><code>I → IV → I/V (Quartsext) → V → I</code></b>, erreichen den Dominanten-Vorhalt <code>I/V</code> aber aus entgegengesetzten Richtungen:</p>
               <ul>
                 <li><b>Aufsteigender Walk-Up (<code>C → E → F → F♯ → G → G♯ → A → D → G → C</code>):</b> Steigt über <code>I7/III</code> (<code>C7/E</code>) und <code>♯IV°7</code> (<code>F♯°7</code>) auf <code>I/V</code> (<code>C/G</code>), <b>lässt sich dann aber bewusst mehr Zeit mit der Auflösung</b> – klettert über <code>♯V°7</code> (<code>G♯°7</code>) weiter nach <code>vi7</code> (<code>Am7</code>) und spannt über <code>ii7 – IV/V – V7</code> noch einen großen Bogen vor dem Ziel <code>I</code>!</li>
                 <li><b>Absteigender chromatischer Walk-Down (<code>C → [B♭] → A → A♭ → G → G → C</code>):</b> Fällt vom Grundton über <code>I7/♭VII</code> (<code>C7/[B♭]</code>), <code>IV/VI</code> (<code>F/A</code>) und den Gänsehaut-Wechsel zur Moll-Subdominante <code>iv/♭VI</code> (<code>Fm/A♭</code>) halbtonweise direkt in <code>I/V</code> (<code>C/G</code>) und löst kompakt über <code>V → I</code> auf!</li>
                 <li><b>Diatonischer Leiter-Walk-Down (<code>C → [B] → A → G → F → E → D → G → C</code>):</b> Alternativ läuft der Bass auch die komplette Durtonleiter über Umkehrungen abwärts (<code>V⁶ = G/[B]</code>, <code>V7/IV⁶₄ = C7/G</code>, <code>I⁶ = C/E</code>).</li>
               </ul>`,
          en: `<p>The trademark of gospel pianists and organists is the <b>chromatic Walk-Up</b> and <b>Walk-Down</b>. Both grow out of the exact same simple tension arc <b><code>I → IV → I/V (six-four) → V → I</code></b>, approaching the dominant suspension <code>I/V</code> from opposite directions:</p>
               <ul>
                 <li><b>Ascending Walk-Up (<code>C → E → F → F♯ → G → G♯ → A → D → G → C</code>):</b> Climbs via <code>I7/III</code> (<code>C7/E</code>) and <code>♯IV°7</code> (<code>F♯°7</code>) into <code>I/V</code> (<code>C/G</code>), then <b>deliberately delays the resolution</b> — climbing further via <code>♯V°7</code> (<code>G♯°7</code>) into <code>vi7</code> (<code>Am7</code>) and unfolding through <code>ii7 – IV/V – V7 → I</code>!</li>
                 <li><b>Descending Chromatic Walk-Down (<code>C → B♭ → A → A♭ → G → G → C</code>):</b> Drops smoothly from the root through <code>I7/♭VII</code> (<code>C7/B♭</code>), <code>IV/VI</code> (<code>F/A</code>), and the bittersweet minor subdominant <code>iv/♭VI</code> (<code>Fm/A♭</code>) by half-steps straight into <code>I/V</code> (<code>C/G</code>) and resolves directly via <code>V → I</code>!</li>
                 <li><b>Diatonic Scale Walk-Down (<code>C → B → A → G → F → E → D → G → C</code>):</b> Alternatively, walk down the entire major scale in the bass using inversions (<code>V⁶ = G/B</code>, <code>V7/IV⁶₄ = C7/G</code>, <code>I⁶ = C/E</code>).</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vorher: Das gemeinsame Spannungsgerüst (I – IV – I/V – V – I)', en: 'Before: The shared tension skeleton (I – IV – I/V – V – I)' },
            toks: 'I IV I^2 V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – C/G – G – C: Das schlichte Grundgerüst – I → IV → I/V baut gezielt Spannung auf die Dominante V auf. Direkt darunter siehst du die aufsteigende und absteigende Gospel-Ausarbeitung!', en: 'C – F – C/G – G – C: The bare tension arc — I → IV → I/V builds steadily toward V. Right below, hear both the ascending and descending gospel versions!' }
          },
          {
            title: { de: 'Nachher (Aufsteigend): Walk-Up mit ausgedehnter Auflösung', en: 'After (Ascending): Walk-Up with extended resolution' },
            toks: 'I I7^1 IV #IV°7 I^2 #V°7 vi7 ii7 IV@V V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C7/E – F – F♯°7 – C/G – G♯°7 – Am7 – Dm7 – F/G – G7 – C · So entsteht’s aus „I – IV – I/V – V – I“: Zwischen I→IV schiebt sich I7/III (C7/E), zwischen IV→I/V kommt ♯IV°7 (F♯°7); statt sofort aufzulösen, klettert der Bass über ♯V°7 (G♯°7) weiter zu vi7 und nimmt sich über ii7 – IV/V – V7 viel Zeit bis zur Heimkehr auf I!', en: 'C – C7/E – F – F♯°7 – C/G – G♯°7 – Am7 – Dm7 – F/G – G7 – C · How it grows from “I – IV – I/V – V – I”: Insert I7/III (C7/E) before IV and ♯IV°7 before I/V; instead of resolving right away, climb further via ♯V°7 into vi7 and savor the long arc ii7 – IV/V – V7 → I!' }
          },
          {
            title: { de: 'Nachher (Absteigend): Chromatischer Walk-Down mit Moll-iv/♭VI', en: 'After (Descending): Chromatic Walk-Down with minor iv/♭VI' },
            toks: 'I I7^3 IV^1 iv^1 I^2 V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C7/[B♭] – F/A – Fm/A♭ – C/G – G – C · So entsteht’s aus „I – IV – I/V – V – I“: I7/♭VII (3. Umkehrung C7/[B♭]) leitet in die 1. Umkehrung von IV (F/A), Modal Interchange färbt sie zu iv/♭VI (Fm/A♭) ein – und der Bass gleitet herzzerreißend chromatisch C → [B♭] → A → A♭ → G direkt in I/V → V → I!', en: 'C – C7/B♭ – F/A – Fm/A♭ – C/G – G – C · How it grows from “I – IV – I/V – V – I”: I7/♭VII (3rd inversion C7/B♭) pulls into 1st-inversion IV (F/A), modal interchange darkens it to iv/♭VI (Fm/A♭), and the bass glides chromatically C → B♭ → A → A♭ → G straight into I/V → V → I!' }
          },
          {
            title: { de: 'Alternative: Diatonischer Leiter-Walk-Down (ganze Durtonleiter abwärts)', en: 'Alternative: Diatonic Scale Walk-Down (full major scale descending)' },
            toks: 'I V^1 vi7 V7/IV^2 IV I^1 ii7 IV@V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G/[B] – Am7 – C7/G – F – C/E – Dm7 – F/G – C · So entsteht’s aus „I – vi – IV – ii – V – I“: Mit den Umkehrungen G/[B], C7/G und C/E läuft der Bass die gesamte Durtonleiter C→[B]→A→G→F→E→D→G→C abwärts!', en: 'C – G/B – Am7 – C7/G – F – C/E – Dm7 – F/G – C · How it grows from “I – vi – IV – ii – V – I”: Inversions G/B, C7/G, and C/E turn the bass into a smooth descending major scale C→B→A→G→F→E→D→G→C!' }
          }
        ],
        check: {
          q: { de: 'Welcher verminderte Durchgangsakkord verbindet im Gospel-Walk-Up die 5. Stufe (G bzw. C/G) chromatisch mit der 6. Stufe (Am7)?', en: 'Which diminished passing chord chromatically connects G (or C/G) up into Am7 in a gospel walk-up?' },
          opts: [
            { de: '♯V°7 (z. B. G♯°7 – Bass steigt G → G♯ → A)', en: '♯V°7 (e.g. G♯°7 — bass climbs G → G♯ → A)' },
            { de: '♭II (Neapolitaner)', en: '♭II (Neapolitan)' },
            { de: 'Isus2', en: 'Isus2' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! G♯°7 (klingt wie ein E7♭9 ohne E!) zieht chromatisch von G über G♯ direkt nach Am7.',
            en: 'Correct! G♯°7 (essentially a rootless E7♭9) pulls chromatically from G through G♯ straight into Am7.'
          }
        }
      },
      {
        title: { de: 'Weitere Gospel-Klassiker: 5–1–4, Chromatik & Praise-Schluss', en: 'More Gospel Staples: 5–1–4, Chromatic Walkdown & Praise Ending' },
        transposeBody: true,
        body: {
          de: `<p>Neben Walk-Up und Walk-Down begegnen dir im modernen Gospel und Neo-Soul drei weitere unverzichtbare Bausteine – alle leicht aus einer simplen <code>I – IV – V – I</code> oder <code>I – iii – ii – V – I</code> abgeleitet:</p>
               <ul>
                 <li><b>Der „5–1–4“-Übergang zur <code>IV</code>:</b> Vor die <code>IV</code> (<code>F</code>) setzt man ihr eigenes <code>ii–V</code> (<code>Gm7 – C7 → F</code>) – gemessen in der Grundtonart stehen die Basstöne auf den Stufen <b>5 – 1 – 4</b> (<code>G → C → F</code>)!</li>
                 <li><b>Chromatischer <code>3–♭3–2–♭2–1</code>-Walkdown:</b> Füllt den Weg von <code>iii7</code> (<code>Em7</code>) über <code>ii7</code> (<code>Dm7</code>) nach <code>I</code> komplett chromatisch mit <code>♭iii7</code> (<code>E♭m7</code>) und der Tritonus-Substitution <code>♭II7</code> (<code>D♭7</code>)!</li>
                 <li><b>Gospel-Praise- / „Shout“-Schluss (<code>♭VImaj7 – ♭VII9 – Imaj9</code>):</b> Statt brav über <code>V7</code> zu enden, hebt der Chor mit zwei Leihakkorden aus dem gleichnamigen Moll triumphierend in die Tonika ab!</li>
               </ul>`,
          en: `<p>Beyond walk-ups and walk-downs, modern gospel and neo-soul lean on three more signature moves — each derived straight from a plain <code>I – IV – V – I</code> or <code>I – iii – ii – V – I</code>:</p>
               <ul>
                 <li><b>The “5–1–4” approach to <code>IV</code>:</b> Precede <code>IV</code> (<code>F</code>) with its own <code>ii–V</code> (<code>Gm7 – C7 → F</code>) — relative to the home key, the roots land on degrees <b>5 – 1 – 4</b> (<code>G → C → F</code>)!</li>
                 <li><b>Chromatic <code>3–♭3–2–♭2–1</code> Walkdown:</b> Connects <code>iii7</code> (<code>Em7</code>) through <code>ii7</code> (<code>Dm7</code>) home to <code>I</code> using passing <code>♭iii7</code> (<code>E♭m7</code>) and tritone sub <code>♭II7</code> (<code>D♭7</code>)!</li>
                 <li><b>Gospel Praise / “Shout” Ending (<code>♭VImaj7 – ♭VII9 – Imaj9</code>):</b> Instead of a routine <code>V7 → I</code>, the choir soars home through two triumphant modal-interchange chords!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Der „5–1–4“-Gospel-Einstieg: I – ii7/IV – V7/IV – IV – ♯IV°7 – I⁶₄ – ii7 – IV/V – I', en: 'The “5–1–4” Gospel move: I – ii7/IV – V7/IV – IV – ♯IV°7 – I⁶₄ – ii7 – IV/V – I' },
            toks: 'I ii7/IV V7/IV IV #IV°7 I^2 ii7 IV@V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Gm7 – C7 – F – F♯°7 – C/G – Dm7 – F/G – C · So entsteht’s aus „I – IV – V – I“: Vor IV schiebt sich ihr eigenes ii–V (Gm7–C7 = Stufen 5–1–4!), nach IV folgt der klassische Walk-Up F♯°7 → C/G und der weiche Abschluss Dm7 – F/G → C!', en: 'C – Gm7 – C7 – F – F♯°7 – C/G – Dm7 – F/G – C · How it grows from “I – IV – V – I”: Precede IV with its own ii–V (Gm7–C7 = 5–1–4!), climb out via F♯°7 → C/G, and finish warmly with Dm7 – F/G → C!' }
          },
          {
            title: { de: 'Chromatischer Gospel-Walkdown (3 – ♭3 – 2 – ♭2 – 1)', en: 'Chromatic Gospel Walkdown (3 – ♭3 – 2 – ♭2 – 1)' },
            toks: 'Imaj9 iii7 biii7 ii7 bII7 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj9 – Em7 – E♭m7 – Dm7 – D♭7 – Cmaj9 · So entsteht’s aus „I – iii – ii – V – I“: Zwischen iii7 (Em7) und ii7 (Dm7) gleitet E♭m7 als chromatische Brücke, und V7 (G7) wird durch die Tritonus-Sub D♭7 ersetzt – der Bass fällt lückenlos E→E♭→D→D♭→C!', en: 'Cmaj9 – Em7 – E♭m7 – Dm7 – D♭7 – Cmaj9 · How it grows from “I – iii – ii – V – I”: Slip E♭m7 between Em7 and Dm7, and replace G7 with its tritone sub D♭7 — an unbroken chromatic bass slide E→E♭→D→D♭→C!' }
          },
          {
            title: { de: 'Gospel Praise / „Shout“-Schluss (Walk-Up + ♭VImaj7 – ♭VII9 – Imaj9)', en: 'Gospel Praise / “Shout” Ending (Walk-Up + ♭VImaj7 – ♭VII9 – Imaj9)' },
            toks: 'I V7/IV^1 IV #IV°7 I^2 bVImaj7 bVII9 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C7/E – F – F♯°7 – C/G – A♭maj7 – [B♭9] – Cmaj9 · So entsteht’s aus „I – IV – V – I“: Der erste Teil ist der vertraute Walk-Up (C → C7/E → F → F♯°7 → C/G), doch statt gewöhnlichem G7 krönen die beiden Modal-Interchange-Akkorde A♭maj7 → [B♭9] den triumphalen Schluss!', en: 'C – C7/E – F – F♯°7 – C/G – A♭maj7 – B♭9 – Cmaj9 · How it grows from “I – IV – V – I”: After the familiar walk-up (C → C7/E → F → F♯°7 → C/G), swap plain G7 for the soaring modal-interchange lift A♭maj7 → B♭9 → Cmaj9!' }
          }
        ]
      }
    ]
  };

  L.chromatic_mediants = {
    id: 'chromatic_mediants',
    badge: 'klassik',
    title: { de: 'Chromatische Medianten & Filmmusik (inkl. I–♭V)', en: 'Chromatic Mediants & Film Harmony (incl. I–♭V)' },
    units: [
      {
        title: { de: 'Magische Terzsprünge in der Filmwelt', en: 'Magical Third-Moves in Film Scores' },
        transposeBody: true,
        body: {
          de: `<p>Warum klingen Soundtracks wie <em>Star Wars</em>, <em>Herr der Ringe</em>, <em>Batman</em> oder <em>Inception</em> sofort episch, heldenhaft oder unheimlich? Ihr Lieblingswerkzeug sind <b>chromatische Medianten</b>: Zwei Akkorde desselben Geschlechts (Dur → Dur oder Moll → Moll), deren Grundtöne eine <b>große oder kleine Terz</b> auseinanderliegen!</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Verbindung</th><th>Beispiel (ab C)</th><th>Gem. Ton</th><th>Wirkung &amp; berühmte Film-Beispiele</th></tr>
                 <tr><td><b><code>i → ♭vi</code></b></td><td><code>Cm → A♭m</code></td><td>E♭ (D♯)</td><td>Düster, bedrohlich, machtvoll → <em><b>Star Wars: Imperial March</b></em> (John Williams), Wagners <em>Tarnhelm</em>-Motiv</td></tr>
                 <tr><td><b><code>I → ♭III</code></b></td><td><code>C → E♭</code></td><td>G</td><td>Abenteuerlich, episch-mysteriös → <em><b>Herr der Ringe (Fellowship Theme)</b></em>, <em>Batman</em>, <em>Fluch der Karibik</em></td></tr>
                 <tr><td><b><code>I → ♭VI</code></b></td><td><code>C → A♭</code></td><td>C</td><td>Heroisch, gewaltig, grenzenlose Weite → <em><b>Herr der Ringe (Fellowship Theme)</b></em>, <em>Star Wars</em>, <em>Superman</em>, <em>Inception</em></td></tr>
                 <tr><td><b><code>I → III</code></b></td><td><code>C → E</code></td><td>E</td><td>Plötzlich aufgehendes Licht, Staunen → <em><b>E.T.</b></em>, <em>Zurück in die Zukunft</em>, <em>Radiohead – Creep</em></td></tr>
                 <tr><td><b><code>I → VI</code></b></td><td><code>C → A</code></td><td>E</td><td>Warmes Aufleuchten, magischer Szenenwechsel → <em><b>Jurassic Park</b></em>, <em>Harry Potter</em></td></tr>
               </table></div>
               <div class="callout tip"><strong>Das Geheimnis hinter der Magie</strong>
               Obwohl der Zielakkord gar nicht zur Tonart gehört, verankert <b>genau ein gemeinsamer Ton</b> (wie ein Scharnier) beide Klangwelten nahtlos, während die anderen beiden Stimmen nur um einen Halb- oder Ganzton kippen!</div>`,
          en: `<p>Why do film scores like <em>Star Wars</em>, <em>Lord of the Rings</em>, <em>Batman</em>, and <em>Inception</em> feel instantly heroic, magical, or ominous? Their signature tool is <b>chromatic mediants</b>: two chords of the same quality (major → major or minor → minor) whose roots sit a <b>major or minor third apart</b>!</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Progression</th><th>Example (from C)</th><th>Shared Tone</th><th>Mood &amp; Iconic Film References</th></tr>
                 <tr><td><b><code>i → ♭vi</code></b></td><td><code>Cm → A♭m</code></td><td>E♭ (D♯)</td><td>Dark, menacing, imperial → <em><b>Star Wars: Imperial March</b></em> (John Williams), Wagner’s <em>Tarnhelm</em></td></tr>
                 <tr><td><b><code>I → ♭III</code></b></td><td><code>C → E♭</code></td><td>G</td><td>Adventurous, mythic, mysterious → <em><b>Lord of the Rings (Fellowship Theme)</b></em>, <em>Batman</em>, <em>Pirates of the Caribbean</em></td></tr>
                 <tr><td><b><code>I → ♭VI</code></b></td><td><code>C → A♭</code></td><td>C</td><td>Heroic, vast, soaring → <em><b>Lord of the Rings (Fellowship Theme)</b></em>, <em>Star Wars</em>, <em>Superman</em>, <em>Inception</em></td></tr>
                 <tr><td><b><code>I → III</code></b></td><td><code>C → E</code></td><td>E</td><td>Radiant lift, wonder, sunrise → <em><b>E.T.</b></em>, <em>Back to the Future</em>, <em>Radiohead – Creep</em></td></tr>
                 <tr><td><b><code>I → VI</code></b></td><td><code>C → A</code></td><td>E</td><td>Warm glow, magical scene shift → <em><b>Jurassic Park</b></em>, <em>Harry Potter</em></td></tr>
               </table></div>
               <div class="callout tip"><strong>The secret behind the magic</strong>
               Even though the new chord comes from outside the key, <b>one shared common tone</b> acts as a pivot hinge while the remaining voices glide smoothly by a half or whole step!</div>`
        },
        examples: [
          {
            title: { de: 'Star Wars – Imperial March: i – ♭vi (4-Takt-Hauptmotiv)', en: 'Star Wars – Imperial March: i – ♭vi (4-bar main theme)' },
            toks: 'i:3 bvi:1 i:1 bvi:1 i:2 i:3 bvi:1 bvi:2 i:2',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm – A♭m im Original-Marschrhythmus (4 Takte): Die gesamte düstere Hauptsequenz lebt fast ausschließlich vom Großterz-Mediant-Wechsel i ↔ ♭vi (über den gemeinsamen Ton E♭)!', en: 'Cm – A♭m in the signature 4-bar march rhythm: Nearly the entire ominous main theme runs on the single major-third chromatic mediant shift i ↔ ♭vi (pivoting on shared tone E♭)!' }
          },
          {
            title: { de: 'Herr der Ringe – Fellowship Theme: I – ♭III – I – ♭VI – ♭III – IV – ♭VI – ♭VII – I', en: 'Lord of the Rings – Fellowship Theme: I – ♭III – I – ♭VI – ♭III – IV – ♭VI – ♭VII – I' },
            toks: 'I:2 bIII:2 I:4 bVI:2 bIII:2 IV:2 bVI:1 bVII:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E♭ – C – A♭ – E♭ – F – A♭ – [B♭] – C: Der 1. Teil (I–♭III–I–♭VI–♭III) zeigt beide chromatischen Medianten in voller Pracht; der 2. Teil (IV–♭VI–♭VII–I) ist gleichzeitig ein Paradebeispiel für Modal Interchange (Leihakkorde ♭VI und ♭VII aus dem gleichnamigen Moll als Heldenkadenz)!', en: 'C – E♭ – C – A♭ – E♭ – F – A♭ – B♭ – C: The 1st half (I–♭III–I–♭VI–♭III) showcases both chromatic mediants, while the 2nd half (IV–♭VI–♭VII–I) is a textbook Modal Interchange move (borrowing ♭VI and ♭VII from parallel minor for the heroic cadence)!' }
          },
          {
            title: { de: 'Heldenhaft & Staunen (Star Wars / E.T.): I – ♭VI – I – III', en: 'Heroic & wondrous (Star Wars / E.T.): I – ♭VI – I – III' },
            toks: 'I:2 bVI:2 I:2 III:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – A♭ – C – E: Vergleiche die weite, heldenhafte ♭VI mit dem strahlend aufgehenden Licht von III! Probiere auch verschiedene Start-Umkehrungen.', en: 'C – A♭ – C – E: Compare vast heroic ♭VI with the radiant lift of III! Try switching starting inversions too.' }
          }
        ]
      },
      {
        title: { de: '0 gemeinsame Töne: Die „Gottes“-Progression (I–♭V) & Hexatonische Pole', en: 'Zero Common Tones: The “God” Progression (I–♭V) & Hexatonic Poles' },
        transposeBody: true,
        body: {
          de: `<p>Was passiert, wenn wir noch einen Schritt weiter gehen als bei den Medianten – und zwei Akkorde kombinieren, die <b>keinen einzigen gemeinsamen Ton</b> besitzen? Genau dort entstehen die eindrucksvollsten Momente der modernen Filmmusik:</p>
               <ul>
                 <li><b>Die „Gottes“- / Tritonus-Progression (<code>I – ♭V</code> in Dur, <code>i – ♭v</code> in Moll):</b><br>
                 Zwei Dreiklänge im exakten <b>Tritonus-Abstand (6 Halbtöne)</b> – die beiden am weitesten voneinander entfernten Pole im Quintenzirkel (z. B. <code>C → G♭</code> oder <code>Cm → G♭m</code>)!<br>
                 • <b>In Dur (<code>I – ♭V</code>):</b> Erzeugt überirdische Größe, kosmische Weite, Ehrfurcht und das Gefühl von etwas Unfassbarem / Göttlichem (z. B. <em>Interstellar</em>, <em>Doctor Strange</em>, <em>Batman 1989</em>, Sci-Fi-Offenbarungen).<br>
                 • <b>In Moll (<code>i – ♭v</code>):</b> Klingt bodenlos, fremdartig und bedrohlich (z. B. <em>Herr der Ringe – Mordor / Mount Doom</em>, dunkler Sci-Fi).<br>
                 • <b>Stimmführungs-Trick:</b> Obwohl die Akkorde am Quintenzirkel maximale Gegensätze sind, liegen ihre Töne auf der Klaviatur winzig nah beieinander: <code>C → D♭</code> (+1 HT), <code>E → G♭</code> (+2 HT), <code>G → G♭</code> (−1 HT) – bzw. <code>C → [B♭]</code>, <code>E → D♭</code>, <code>G → G♭</code>!</li>
                 <li><b>Hexatonische Pole (<code>I – ♭vi</code> oder <code>i – III</code>, z. B. <code>C → A♭m</code> / <code>Cm → E</code>):</b><br>
                 Ebenfalls <b>0 gemeinsame Töne</b>, aber hier bewegt sich <b>jede der drei Stimmen exakt 1 Halbton</b> (<code>C → [B]</code>, <code>E → E♭</code>, <code>G → A♭</code>)! Durch dieses extrem enge, fast unmerkliche Kippen entsteht ein unheimlicher, schwebender Gänsehaut-Effekt (<em>Star Wars – Emperor’s Theme</em>, <em>Herr der Ringe – Der Eine Ring</em>).</li>
               </ul>`,
          en: `<p>What happens when we go beyond chromatic mediants and pair two chords that share <b>zero common tones</b>? That is where cinema’s most awe-inspiring and eerie harmonic moments live:</p>
               <ul>
                 <li><b>The “God” / Tritone Progression (<code>I – ♭V</code> in major, <code>i – ♭v</code> in minor):</b><br>
                 Two triads a <b>tritone (6 semitones)</b> apart — exact opposites on the Circle of Fifths (e.g. <code>C → G♭</code> or <code>Cm → G♭m</code>)!<br>
                 • <b>In Major (<code>I – ♭V</code>):</b> Evokes cosmic vastness, awe, divine or otherworldly presence (<em>Interstellar</em>, <em>Doctor Strange</em>, <em>Batman 1989</em>, sci-fi wonder).<br>
                 • <b>In Minor (<code>i – ♭v</code>):</b> Sounds abyssal, alien, and ominous (<em>Lord of the Rings – Mordor / Mount Doom</em>, dark sci-fi).<br>
                 • <b>Voice-leading surprise:</b> Despite sitting opposite each other on the Circle of Fifths, their notes sit just 1–2 semitones apart on the keyboard!</li>
                 <li><b>Hexatonic Poles (<code>I – ♭vi</code> or <code>i – III</code>, e.g. <code>C → A♭m</code> / <code>Cm → E</code>):</b><br>
                 Also <b>zero common tones</b>, yet <b>every single voice moves by exactly 1 semitone</b> (<code>C → B</code>, <code>E → E♭</code>, <code>G → A♭</code>)! This razor-thin chromatic shift creates instant spine-tingling eeriness (<em>Star Wars – Emperor’s Theme</em>, <em>Lord of the Rings – The One Ring</em>).</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Die „Gottes“-Progression (Tritonus): I – ♭V – I', en: 'The “God” / Tritone Progression: I – ♭V – I' },
            toks: 'I:3 bV:3 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G♭ – C: Maximaler Abstand im Quintenzirkel, 0 gemeinsame Töne – spüre diese überirdische, kosmische Weite! (Tipp: Spiele es auch mit Klang „Streicher“ oder „Warmes Pad“!)', en: 'C – G♭ – C: Exact opposite poles on the Circle of Fifths, zero common tones — feel the cosmic awe! (Tip: Try Strings or Warm Pad!)' }
          },
          {
            title: { de: 'Dunkle Tritonus-Progression (Mordor-Vibe): i – ♭v – i', en: 'Dark tritone progression (Mordor vibe): i – ♭v – i' },
            toks: 'i:3 bv:3 i:4',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm – G♭m – Cm: Dieselbe Tritonus-Distanz in Moll – sofort fremdartig, düster und abgründig.', en: 'Cm – G♭m – Cm: The same tritone distance in minor — instant alien dread and abyssal depth.' }
          },
          {
            title: { de: 'Hexatonischer Pol (Gänsehaut / Der Eine Ring): I – ♭vi – I', en: 'Hexatonic pole (Eerie / The One Ring): I – ♭vi – I' },
            toks: 'I:3 bvi:3 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – A♭m – C: Achte im Live-View (Stimmführung) darauf, wie alle 3 Töne exakt einen einzigen Halbton rücken (C→[B], E→E♭, G→A♭)!', en: 'C – A♭m – C: Watch in Voice-Leading mode how all 3 notes shift by exactly one semitone (C→B, E→E♭, G→A♭)!' }
          }
        ],
        check: {
          q: { de: 'Was macht die „Gottes“-Progression (I – ♭V, z. B. C – G♭) harmonisch so besonders?', en: 'What makes the “God” progression (I – ♭V, e.g. C – G♭) harmonically so distinctive?' },
          opts: [
            { de: 'Beide Akkorde liegen sich im Quintenzirkel exakt gegenüber (Tritonus) und teilen keinen einzigen gemeinsamen Ton', en: 'Both chords sit directly opposite each other on the Circle of Fifths (a tritone apart) with zero common tones' },
            { de: 'Sie teilen genau zwei gemeinsame Töne wie Parallelakkorde', en: 'They share two common tones like relative chords' },
            { de: 'Es handelt sich um eine klassische Plagalkadenz', en: 'It is a standard plagal cadence' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! 6 Halbtöne Abstand, 0 gemeinsame Töne – maximale harmonische Fremdheit bei kleinster Fingerbewegung im Voicing.',
            en: 'Spot on! Six semitones apart, zero common tones — maximum harmonic polarity with tight chromatic voice leading.'
          }
        }
      }
    ]
  };

  L.pedal_upper = {
    id: 'pedal_upper',
    badge: 'jazz',
    title: { de: 'Orgelpunkt & Upper-Structure-Voicings', en: 'Pedal Point & Upper-Structure Slash Chords' },
    units: [
      {
        title: { de: 'Ein Basston bleibt liegen – oben wandert die Harmonie', en: 'One Held Bass Note — Moving Harmony Above' },
        transposeBody: true,
        body: {
          de: `<p>Beim <b>Orgelpunkt (Pedal Point)</b> hält der Bass einen einzigen Ton fest (meist die <b>Tonika I</b> oder die <b>Dominante V</b>), während die Akkorde darüber munter wechseln. Das baut enorme Ruhe (auf I) oder knisternde Erwartung (auf V) auf!</p>
               <div class="callout tip"><strong>Die Profi-Abkürzung zu edlen Voicings (Upper Structures)</strong>
               Statt komplizierte 9er- oder 11er-Griffe auswendig zu lernen, spiele einfach einen <b>simplen Dur-Dreiklang in der rechten Hand über einem anderen Basston</b>:
               <ul>
                 <li><b><code>♭VII / I</code> (z. B. [B♭]/C):</b> ergibt sofort einen luxuriösen <b>C9sus4</b>-Akkord (Pop, Gospel, Soul)!</li>
                 <li><b><code>II / I</code> (z. B. D/C):</b> ergibt sofort einen schwebenden <b>Cmaj7♯11</b> (Lydisch / Filmmusik)!</li>
                 <li><b><code>IV / V</code> (z. B. F/G):</b> ergibt sofort den beliebten Pop-Balladen-Vorhalt <b>G9sus4</b> (<em>„Jump“</em>, <em>„Sailing“</em>)!</li>
               </ul>
               Im Übungstool kannst du jeden Orgelpunkt-Bass mit <code>@</code> schreiben (z. B. <code>IV@I</code> oder <code>bVII@I</code>)!</div>`,
          en: `<p>With a <b>pedal point</b>, the bass holds a single sustained note (usually <b>I</b> or <b>V</b>) while chords move freely above it — creating grounded calm (on I) or electric anticipation (on V)!</p>
               <div class="callout tip"><strong>The pro shortcut to lush voicings (Upper Structures)</strong>
               Instead of memorizing dense 9th/11th grips, simply play a <b>plain major triad in the right hand over a different bass note</b>:
               <ul>
                 <li><b><code>♭VII / I</code> (e.g. B♭/C):</b> instant soulful <b>C9sus4</b> (pop, gospel, R&amp;B)!</li>
                 <li><b><code>II / I</code> (e.g. D/C):</b> instant floating <b>Cmaj7♯11</b> (Lydian / film score)!</li>
                 <li><b><code>IV / V</code> (e.g. F/G):</b> instant ballad dominant <b>G9sus4</b>!</li>
               </ul>
               In the Practice Tool you can write any pedal bass using <code>@</code> (e.g. <code>IV@I</code> or <code>bVII@I</code>)!</div>`
        },
        examples: [
          {
            title: { de: 'Tonika-Orgelpunkt: I – IV/I – V/I – I', en: 'Tonic pedal point: I – IV/I – V/I – I' },
            toks: 'I IV@I V@I I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F/C – G/C – C: Der Bass hält C stur fest, während oben die ganze Kadenz abläuft („Jump“-Intro-Feeling!).', en: 'C – F/C – G/C – C: The bass anchors on C while the entire cadence unfolds above!' }
          },
          {
            title: { de: 'Upper-Structure-Zauber: ♭VII/I & II/I', en: 'Upper-structure magic: ♭VII/I & II/I' },
            toks: 'I bVII@I II@I I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – [B♭]/C (C9sus4!) – D/C (lydisches Cmaj7♯11!) – C: Kinderleichte Dreiklänge in der rechten Hand, sofort moderner Profi-Klang!', en: 'C – B♭/C (C9sus4!) – D/C (Lydian Cmaj7♯11!) – C: Simple right-hand triads creating instant modern richness!' }
          },
          {
            title: { de: 'Pop-Balladen-Schluss: IV/V → V → I', en: 'Pop ballad cadence: IV/V → V → I' },
            toks: 'I:2 vi:2 IV@V:1 V:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Am – F/G – G – C: F/G (G9sus4) löst sich butterweich über G nach C auf.', en: 'C – Am – F/G – G – C: F/G (G9sus4) glides smoothly through G into C.' }
          }
        ]
      }
    ]
  };

  L.modulation = {
    id: 'modulation',
    badge: 'pop',
    title: { de: 'Modulationstechniken (Tonartwechsel)', en: 'Modulation Techniques (Changing Key)' },
    units: [
      {
        title: { de: 'Drei Wege in eine neue Tonart', en: 'Three Classic Ways to Change Key' },
        transposeBody: true,
        body: {
          de: `<p>Ein geschickter <b>Tonartwechsel (Modulation)</b> hebt einen Song plötzlich auf eine neue Energie-Ebene. Drei Techniken begegnen dir überall:</p>
               <ol>
                 <li><b>Pivot-Akkord (weicher Übergang):</b> Du nutzt einen Akkord, der in <em>beiden</em> Tonarten vorkommt (z. B. <code>Am</code> = vi in C-Dur, gleichzeitig ii in G-Dur) und gehst über das neue <code>V7 → I</code> (<code>D7 → G</code>) nahtlos in die neue Tonart!</li>
                 <li><b>Direkte Rückung („Truck Driver’s Gear Change“):</b> Im letzten Refrain eines Popsongs springt die gesamte Harmonie ohne Vorwarnung einen <b>Halb- oder Ganzton höher</b> (z. B. <em>Livin’ on a Prayer</em>, <em>Love on Top</em>, <em>My Heart Will Go On</em>) – oft kurz vorbereitet durch die neue Dominante!</li>
                 <li><b>Enharmonische Modulation über symmetrische Akkorde (<code>°7</code> &amp; <code>+</code>):</b>
                   <ul>
                     <li><b>Vollvermindert (<code>°7</code>):</b> Weil <code>C♯°7 = E°7 = G°7 = [B♭°7]</code> völlig symmetrisch ist (3+3+3+3 HT), kann jeder seiner 4 Töne als Leitton in eine <em>andere</em> Tonart auflösen – so springst du mit einem einzigen Akkord in 4 weit entfernte Tonarten!</li>
                     <li><b>Übermäßig (<code>+</code>):</b> Genauso symmetrisch funktioniert der übermäßige Dreiklang (4+4+4 HT): <code>C+ = E+ = A♭+</code>! Er kann als übermäßige Dominante (<code>V+</code>) in <b>3 verschiedene Tonarten</b> auflösen – je nachdem, welchen Ton du liegen lässt, landest du von <code>C+</code> aus nahtlos in <b>F-Dur</b> (<code>IV</code>), <b>A-Dur</b> (<code>VI</code>, über <code>E+</code>) oder <b>D♭-Dur</b> (<code>♭II</code>, über <code>A♭+</code>)!</li>
                   </ul>
                 </li>
               </ol>`,
          en: `<p>A well-placed <b>modulation (key change)</b> lifts a song onto a whole new emotional level. Three essential techniques appear everywhere:</p>
               <ol>
                 <li><b>Pivot-chord modulation (smooth):</b> Use a chord shared by <em>both</em> keys (e.g. <code>Am</code> = vi in C major AND ii in G major), then resolve via the new <code>V7 → I</code> (<code>D7 → G</code>)!</li>
                 <li><b>Direct modulation (“Truck Driver’s Gear Change”):</b> For the final chorus, jump straight up a <b>semitone or whole tone</b> (<em>Livin’ on a Prayer</em>, <em>Love on Top</em>, <em>My Heart Will Go On</em>), optionally preceded by the new V7!</li>
                 <li><b>Enharmonic modulation via symmetrical chords (<code>°7</code> &amp; <code>+</code>):</b>
                   <ul>
                     <li><b>Fully diminished (<code>°7</code>):</b> Because <code>C♯°7 = E°7 = G°7 = B♭°7</code> is symmetrical (3+3+3+3 st), any of its 4 notes can act as a leading tone into a completely distant key!</li>
                     <li><b>Augmented (<code>+</code>):</b> The augmented triad works the exact same symmetrical magic (4+4+4 st): <code>C+ = E+ = A♭+</code>! Acting as an augmented dominant (<code>V+</code>), a single <code>C+</code> pivots effortlessly into <b>3 different keys</b> — <b>F major</b> (<code>IV</code>), <b>A major</b> (<code>VI</code>, heard as <code>E+</code>), or <b>D♭ major</b> (<code>♭II</code>, heard as <code>A♭+</code>)!</li>
                   </ul>
                 </li>
               </ol>`
        },
        examples: [
          {
            title: { de: 'Pivot-Modulation: C-Dur → G-Dur (über Am)', en: 'Pivot modulation: C major → G major (via Am)' },
            toks: 'I:2 IV:2 vi:2 V7/V:2 V:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – Am (Pivot: vi in C = ii in G!) – D7 (neues V7) – G (neue Tonika!).', en: 'C – F – Am (pivot: vi in C = ii in G!) – D7 (new V7) – G (new tonic!).' }
          },
          {
            title: { de: 'Pop-Refrain-Rückung (+1 Ganzton über neue V7)', en: 'Pop chorus lift (+1 whole tone via new V7)' },
            toks: 'I:2 V:2 vi:2 IV:2 V7/II:2 II:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G – Am – F – A7 (neue Dominante!) – D (plötzlicher Energieschub einen Ganzton höher!).', en: 'C – G – Am – F – A7 (new dominant!) – D (instant energy boost a whole tone higher!).' }
          },
          {
            title: { de: 'Symmetrie-Überraschung über °7 in eine entfernte Tonart', en: 'Symmetrical surprise modulation via °7 to a distant key' },
            toks: 'I:2 #I°7:2 bVI:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C♯°7 (= G°7!) – A♭: Statt nach Dm aufzulösen, nutzt man das G in C♯°7 als Leitton nach A♭-Dur!', en: 'C – C♯°7 (= G°7!) – A♭: Instead of resolving to Dm, the G inside C♯°7 pulls straight into A♭ major!' }
          },
          {
            title: { de: 'Symmetrie-Überraschung über + (Übermäßig): I – I+ (= III+!) – VI', en: 'Symmetrical surprise via + (Augmented): I – I+ (= III+!) – VI' },
            toks: 'I:2 I+:2 VI:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C+ (= E+ = V+ von A!) – A: Der Ton E bleibt liegen, C→C♯ und G♯→A steigen je einen Halbton – magische Rückung nach A-Dur!', en: 'C – C+ (= E+ = V+ of A!) – A: E stays anchored while C→C♯ and G♯→A step up a semitone — seamless lift into A major!' }
          },
          {
            title: { de: 'Dasselbe I+ in die Gegenrichtung: I – I+ (= ♭VI+!) – ♭II', en: 'The exact same I+ to another distant key: I – I+ (= ♭VI+!) – ♭II' },
            toks: 'I:2 I+:2 bII:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C+ (= A♭+ = V+ von D♭!) – D♭: Derselbe Akkord C+ wird als A♭+ umgedeutet – G♯/A♭ bleibt liegen, C→D♭ und E→F öffnen D♭-Dur!', en: 'C – C+ (= A♭+ = V+ of D♭!) – D♭: Reinterpreting the exact same C+ as A♭+ anchors G♯/A♭ while C→D♭ and E→F open D♭ major!' }
          }
        ]
      }
    ]
  };

  L.neapolitan = {
    id: 'neapolitan',
    badge: 'klassik',
    title: { de: 'Neapolitaner & übermäßige Sextakkorde', en: 'Neapolitan & Augmented Sixth Chords' },
    units: [
      {
        title: { de: 'Der Neapolitanische Sextakkord (♭II⁶)', en: 'The Neapolitan Sixth Chord (♭II⁶)' },
        minorBody: true,
        body: key => {
          const T = MT.theory;
          const t = T.fmtNote(T.spellInKey(key, 0, 0));
          const b2 = T.fmtNote(T.spellInKey(key, 1, 1));
          const f4 = T.fmtNote(T.spellInKey(key, 5, 3));
          const b6 = T.fmtNote(T.spellInKey(key, 8, 5));
          const g5 = T.fmtNote(T.spellInKey(key, 7, 4));
          return {
            de: `<p>In der klassischen Harmonik (Beethoven, Schubert, Chopin) sorgt der <b>Neapolitaner</b> für dramatische Tiefe: Es ist ein <b>Dur-Dreiklang auf der erniedrigten 2. Stufe (<code>♭II</code>)</b> in Moll (in <b>${t}-Moll</b>: <code>${b2} – ${f4} – ${b6}</code>).</p>
                 <p>Er ersetzt die Subdominante und steht fast immer in der <b>1. Umkehrung (<code>♭II⁶</code> = Terz ${f4} im Bass: <code>${b2}/${f4}</code>)</b>, weil der Bass so genau wie bei der normalen Subdominante <code>iv</code> auf der 4. Stufe steht und flüssig zur Dominante <code>${g5}</code> (oft über <code>${t}m/${g5}</code> = <code>i⁶₄</code>) fortschreitet!</p>`,
            en: `<p>In classical harmony (Beethoven, Schubert, Chopin), the <b>Neapolitan</b> delivers dramatic color: a <b>major triad on the lowered 2nd degree (<code>♭II</code>)</b> in minor (in <b>${t} minor</b>: <code>${b2} – ${f4} – ${b6}</code>).</p>
                 <p>It substitutes for the subdominant and almost always appears in <b>1st inversion (<code>♭II⁶</code>, third ${f4} in the bass: <code>${b2}/${f4}</code>)</b> so the bass walks smoothly from degree 4 to dominant <code>${g5}</code> (often via <code>${t}m/${g5}</code> = <code>i⁶₄</code>).</p>`
          };
        },
        examples: [
          {
            title: { de: 'Neapolitanischer Sextakkord + i⁶₄', en: 'Neapolitan sixth + cadential i⁶₄' },
            toks: 'i:2 bII^1:2 i^2:1 V7:1 i:2',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – D♭/F – Cm/G – G7 – Cm: Beachte die klassische Basslinie C – F – G – G – C.', en: 'Cm – D♭/F – Cm/G – G7 – Cm: Hear the classic bass line C – F – G – G – C.' }
          },
          {
            title: { de: 'Zum Vergleich: Neapolitaner in Grundstellung', en: 'Compare: Neapolitan in root position' },
            toks: 'i bII V7 i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – D♭ – G7 – Cm: Mit D♭ im Bass klingt der Sprung deutlich härter und direkter.', en: 'Cm – D♭ – G7 – Cm: With D♭ in the bass the leap feels much starker.' }
          }
        ]
      },
      {
        title: { de: 'Italienische, Französische & Deutsche übermäßige Sexte', en: 'Italian, French & German Augmented Sixths' },
        minorBody: true,
        body: key => {
          const T = MT.theory;
          const t = T.fmtNote(T.spellInKey(key, 0, 0));
          const d2 = T.fmtNote(T.spellInKey(key, 2, 1));
          const b3 = T.fmtNote(T.spellInKey(key, 3, 2));
          const s4 = T.fmtNote(T.spellInKey(key, 6, 3));
          const g5 = T.fmtNote(T.spellInKey(key, 7, 4));
          const b6 = T.fmtNote(T.spellInKey(key, 8, 5));
          const b5 = T.fmtNote(T.spellInKey(key, 6, 4));
          return {
            de: `<p>Drei berühmte klassische Spannungsakkorde auf der <b>erniedrigten 6. Stufe</b> (in <b>${t}-Moll</b>: <b>${b6}</b>) teilen ein gemeinsames Merkmal: die <b>übermäßige Sexte ${b6}–${s4}</b>, die sich beidseitig im Halbtonschritt nach außen in die Oktave <b>${g5}–${g5}</b> (Dominante V) öffnet!</p>
                 <ul>
                   <li><b>Italienische Sexte (<code>it+6</code>):</b> 3 Töne → <code>${b6} – ${t} – ${s4}</code> (schlank und direkt).</li>
                   <li><b>Französische Sexte (<code>fr+6</code>):</b> 4 Töne → <code>${b6} – ${t} – ${d2} – ${s4}</code>. Die zusätzliche 2. Stufe (${d2}) bildet eine übermäßige Quarte über ${b6} – zwei Tritonus-Intervalle gleichzeitig geben ihr den schimmernden, ganztonartigen Klang!</li>
                   <li><b>Deutsche Sexte (<code>dt+6</code>):</b> 4 Töne → <code>${b6} – ${t} – ${b3} – ${s4}</code>. Klingt klanglich genau wie ein Dominantseptakkord (${b6}7), wird aber mit <b>${s4} statt ${b5}</b> notiert, weil ${s4} nach ${g5} aufwärts strebt! Um Quintparallelen zu vermeiden, geht sie meist über <code>i⁶₄</code> (${t}m/${g5}) in V.</li>
                 </ul>`,
            en: `<p>Three celebrated classical pre-dominant chords built on <b>♭6</b> (in <b>${t} minor</b>: <b>${b6}</b>) share the signature <b>augmented sixth ${b6}–${s4}</b>, expanding outward by semitones into the octave <b>${g5}–${g5}</b> on the dominant V:</p>
                 <ul>
                   <li><b>Italian sixth (<code>it+6</code>):</b> 3 notes → <code>${b6} – ${t} – ${s4}</code>.</li>
                   <li><b>French sixth (<code>fr+6</code>):</b> 4 notes → <code>${b6} – ${t} – ${d2} – ${s4}</code>. Adding degree 2 (${d2}) creates an augmented fourth above ${b6} — two interlocking tritones with a luminous whole-tone shimmer!</li>
                   <li><b>German sixth (<code>ger+6</code>):</b> 4 notes → <code>${b6} – ${t} – ${b3} – ${s4}</code>. Sounds enharmonically like ${b6}7, but spells <b>${s4} (not ${b5})</b> because ${s4} resolves upward to ${g5}! Usually moves through <code>i⁶₄</code> (${t}m/${g5}) to avoid parallel fifths.</li>
                 </ul>`
          };
        },
        examples: [
          {
            title: { de: 'Italienische Sexte (♭VIit+6)', en: 'Italian sixth (♭VIit+6)' },
            toks: 'i bVIit6 V i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – A♭it+6 (A♭–C–F♯) – G – Cm: A♭ fällt nach G, F♯ steigt nach G!', en: 'Cm – A♭it+6 (A♭–C–F♯) – G – Cm: A♭ drops to G while F♯ rises to G!' }
          },
          {
            title: { de: 'Französische Sexte (♭VIfr+6)', en: 'French sixth (♭VIfr+6)' },
            toks: 'i bVIfr6 V i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – A♭fr+6 (A♭–C–D–F♯) – G – Cm: Der Ton D bleibt beim Übergang zu G-Dur einfach liegen.', en: 'Cm – A♭fr+6 (A♭–C–D–F♯) – G – Cm: The note D holds smoothly as a common tone into G major.' }
          },
          {
            title: { de: 'Deutsche Sexte über i⁶₄ (♭VIdt+6)', en: 'German sixth via i⁶₄ (♭VIger+6)' },
            toks: 'i:2 bVIger6:2 i^2:1 V7:1 i:2',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – A♭dt+6 (A♭–C–E♭–F♯) – Cm/G – G7 – Cm: Achte im Live-View auf die korrekte Notation mit F♯ statt G♭!', en: 'Cm – A♭ger+6 (A♭–C–E♭–F♯) – Cm/G – G7 – Cm: Notice the proper F♯ spelling in the staff!' }
          }
        ]
      }
    ]
  };

  L.rhythm_royal = {
    id: 'rhythm_royal',
    badge: 'jazz',
    title: { de: 'Rhythm Changes & Royal Road (Jazz & J-Pop/Anime)', en: 'Rhythm Changes & Royal Road (Jazz & J-Pop/Anime)' },
    units: [
      {
        title: { de: 'Rhythm Changes: Turnaround-A-Teil & Dominanten-Bridge', en: 'Rhythm Changes: Turnaround A-Section & Dominant Bridge' },
        transposeBody: true,
        body: {
          de: `<p>Nach dem 12-Takt-Blues sind die <b>Rhythm Changes</b> (aus George Gershwins <em>„I Got Rhythm“</em>, 1930) die zweitwichtigste Form im Jazz (<em>Oleo</em>, <em>Anthropology</em>, <em>The Flintstones</em>):</p>
               <ul>
                 <li><b>A-Teil (Turnaround-Motor):</b> Dreht sich um die endlose <code>I – vi7 – ii7 – V7</code>-Kette (oft veredelt mit <code>iii7 – VI7 – ii7 – V7</code> oder verminderten Durchgängen <code>I – ♯I°7 – ii7 – ♯II°7 – iii7</code>).</li>
                 <li><b>B-Teil (Die berühmte Dominanten-Bridge):</b> Vier reine <b>Dominantseptakkorde im Quintfall</b>: <code><b>III7 → VI7 → II7 → V7</b></code> (in C-Dur: <code>E7 → A7 → D7 → G7</code>)! Jede Dominante ist die <code>V7</code> der nächsten – ein unaufhaltsamer Sog über 8 Takte zurück zur <code>I</code>!</li>
               </ul>`,
          en: `<p>Right alongside the 12-bar blues, <b>Rhythm Changes</b> (from George Gershwin’s <em>“I Got Rhythm”</em>, 1930) is the second great standard form of jazz (<em>Oleo</em>, <em>Anthropology</em>, <em>The Flintstones</em>):</p>
               <ul>
                 <li><b>A-Section (Turnaround engine):</b> Built on the rolling <code>I – vi7 – ii7 – V7</code> turnaround (often upgraded with <code>iii7 – VI7 – ii7 – V7</code> or diminished passing chords).</li>
                 <li><b>B-Section (The iconic Dominant Bridge):</b> Four pure <b>dominant 7ths falling in fifths</b>: <code><b>III7 → VI7 → II7 → V7</b></code> (in C: <code>E7 → A7 → D7 → G7</code>)! Each dominant resolves directly into the next — eight bars of pure forward pull back to <code>I</code>!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Rhythm Changes: A-Teil + Dominanten-Bridge (III7–VI7–II7–V7)', en: 'Rhythm Changes: A-section + Dominant Bridge (III7–VI7–II7–V7)' },
            toks: 'I:1 vi7:1 ii7:1 V7:1 III7:2 VI7:2 II7:2 V7:2 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Am7 – Dm7 – G7 | E7 – A7 – D7 – G7 | C: Spüre den kraftvollen Quintfall-Sog der vier Dominanten in der Bridge!', en: 'C – Am7 – Dm7 – G7 | E7 – A7 – D7 – G7 | C: Feel the unstoppable falling-fifths pull of the four bridge dominants!' }
          },
          {
            title: { de: 'Bridge mit jazzigen ii–V-Paaren aufgelockert', en: 'Bridge dressed up with mini ii–V pairs' },
            toks: 'viiø:1 III7:1 iii7:1 VI7:1 vi7:1 II7:1 ii7:1 V7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Jeder Bridge-Dominante wird ihr eigenes ii vorgeschaltet – derselbe Quintfall, noch geschmeidiger!', en: 'Each bridge dominant gets its own ii chord — the exact same falling-fifths backbone, extra silky!' }
          }
        ]
      },
      {
        title: { de: 'Die „Royal Road“-Progression (IVmaj7 – V7 – iii7 – vi7)', en: 'The “Royal Road” Progression (IVmaj7 – V7 – iii7 – vi7)' },
        transposeBody: true,
        body: {
          de: `<p>Im japanischen Pop (J-Pop), in <b>Anime-Openings</b>, Videospiel-Soundtracks (<em>Final Fantasy</em>, <em>Nintendo</em>) und modernen Balladen regiert eine extrem emotionale Formel namens <b>Ōdō Shinkō („Royal Road“)</b>:</p>
               <p style="font-size:1.05rem"><b><code>IVmaj7 → V7 → iii7 → vi7</code></b> (in C-Dur: <code>Fmaj7 → G7 → Em7 → Am7</code>)</p>
               <ul>
                 <li><b>Warum klingt sie so sehnsüchtig-hoffnungsvoll?</b> Sie startet auf der offenen <code>IVmaj7</code> (statt stabil auf <code>I</code>), strebt über <code>V7</code> nach oben – löst aber <em>nicht</em> einfach auf <code>I</code> auf, sondern gleitet über die weiche <code>iii7</code> in das emotionale Ziel <code>vi7</code> (oder dramatisiert über die Sekundärdominante <b><code>V7/vi</code></b> = <code>E7 → Am7</code>)!</li>
                 <li><b>Typischer Abschluss:</b> Im zweiten Durchgang folgt oft <code>ii7 – V7 – Imaj7</code> oder ein süß-melancholisches <code>iv6 → Imaj7</code>.</li>
               </ul>`,
          en: `<p>Across J-Pop, <b>anime themes</b>, video game scores (<em>Final Fantasy</em>, <em>Nintendo</em>), and modern ballads, one irresistibly emotional loop reigns supreme — the <b>Ōdō Shinkō (“Royal Road”)</b>:</p>
               <p style="font-size:1.05rem"><b><code>IVmaj7 → V7 → iii7 → vi7</code></b> (in C: <code>Fmaj7 → G7 → Em7 → Am7</code>)</p>
               <ul>
                 <li><b>Why does it feel so bittersweet and soaring?</b> Starting on lush <code>IVmaj7</code> builds instant lift, <code>V7</code> climbs with yearning, and instead of landing flatly on <code>I</code> it glides through tender <code>iii7</code> into <code>vi7</code> (often intensified by <b><code>V7/vi</code></b> = <code>E7 → Am7</code>)!</li>
                 <li><b>Classic payoff:</b> The second half typically resolves via <code>ii7 – V7 – Imaj7</code> or bittersweet <code>iv6 → Imaj7</code>.</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Klassische Royal Road: IVmaj7 – V7 – iii7 – vi7', en: 'Classic Royal Road: IVmaj7 – V7 – iii7 – vi7' },
            toks: 'IVmaj7:2 V7:2 iii7:2 vi7:2 IVmaj7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Fmaj7 – G7 – Em7 – Am7 | Fmaj7 – G7 – Cmaj7: Sofort erkennbares Anime-/J-Pop- und Balladen-Feeling!', en: 'Fmaj7 – G7 – Em7 – Am7 | Fmaj7 – G7 – Cmaj7: Instant anime/J-Pop and modern ballad magic!' }
          },
          {
            title: { de: 'Dramatische Royal Road (mit V7/vi & Moll-iv6)', en: 'Dramatic Royal Road (with V7/vi & minor iv6)' },
            toks: 'IVmaj7:2 V7:2 iii7:1 V7/vi:1 vi7:2 ii7:1 V7:1 iv6:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Fmaj7 – G7 – Em7 – E7 – Am7 – Dm7 – G7 – Fm6 – Cmaj7: E7 zieht extra stark in Am7, und Fm6 veredelt den Schluss.', en: 'Fmaj7 – G7 – Em7 – E7 – Am7 – Dm7 – G7 – Fm6 – Cmaj7: E7 intensifies the pull into Am7, and Fm6 melts into home.' }
          }
        ]
      }
    ]
  };

  L.coltrane_changes = {
    id: 'coltrane_changes',
    badge: 'jazz',
    title: { de: 'Coltrane Changes (Giant Steps & Großterz-Symmetrie)', en: 'Coltrane Changes (Giant Steps & Major-Third Symmetry)' },
    units: [
      {
        title: { de: 'Das symmetrische Tonarten-Dreieck (Großterz-Zyklus)', en: 'The Symmetrical Key Triangle (Major-Third Cycle)' },
        transposeBody: true,
        body: {
          de: `<p>1959 revolutionierte John Coltrane mit <em>„Giant Steps“</em> die Jazz-Harmonik. Seine geniale Idee verbindet zwei Welten, die du bereits kennst – <b><code>V7 → I</code></b> und <b>Großterz-Symmetrie</b> (wie beim übermäßigen Dreiklang!):</p>
               <ol>
                 <li>Teile die 12 Töne der Oktave in <b>3 exakt gleich weit entfernte Tonarten im Großterz-Abstand</b> (4 + 4 + 4 Halbtöne):<br>
                 In C-Dur bilden <b><code>C → A♭ → E → C</code></b> ein gleichseitiges Dreieck im Quintenzirkel!</li>
                 <li>Schalte vor jede neue Tonika blitzschnell ihre <b>eigene Dominante <code>V7</code></b>:<br>
                 <code><b>Cmaj7</b> → (E♭7) → <b>A♭maj7</b> → ([B7]) → <b>Emaj7</b> → (G7) → <b>Cmaj7</b></code>!</li>
               </ol>
               <div class="callout tip"><strong>Der „Countdown“-Trick: Eine normale <code>ii–V–I</code> durch Coltrane Changes ersetzen!</strong>
               Statt <code>Dm7 → G7 → Cmaj7</code> schickt Coltrane die Harmonie kurz über die beiden anderen Ecken des Dreiecks (<code>A♭maj7</code> und <code>Emaj7</code>) und landet am Ende punktgenau auf <code>Cmaj7</code>!</div>`,
          en: `<p>In 1959 John Coltrane revolutionized jazz harmony with <em>“Giant Steps”</em>. His breakthrough unites two ideas you already know — <b><code>V7 → I</code></b> and <b>major-third symmetry</b> (just like an augmented triad!):</p>
               <ol>
                 <li>Divide the 12-tone octave into <b>3 equally spaced keys a major third apart</b> (4 + 4 + 4 semitones):<br>
                 From C major, <b><code>C → A♭ → E → C</code></b> forms an equilateral triangle inside the Circle of Fifths!</li>
                 <li>Precede each tonal center with its <b>own lightning-fast <code>V7</code></b>:<br>
                 <code><b>Cmaj7</b> → (E♭7) → <b>A♭maj7</b> → (B7) → <b>Emaj7</b> → (G7) → <b>Cmaj7</b></code>!</li>
               </ol>
               <div class="callout tip"><strong>The “Countdown” trick: Substituting a standard <code>ii–V–I</code>!</strong>
               Instead of plain <code>Dm7 → G7 → Cmaj7</code>, Coltrane detours rapidly through the other two corners of the triangle (<code>A♭maj7</code> and <code>Emaj7</code>) before landing right on <code>Cmaj7</code>!</div>`
        },
        examples: [
          {
            title: { de: 'Der Giant-Steps-Zyklus (3 Tonarten im Großterz-Dreieck)', en: 'The Giant Steps cycle (3 keys a major third apart)' },
            toks: 'Imaj7:2 bIII7:2 bVImaj7:2 VII7:2 IIImaj7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – E♭7 – A♭maj7 – [B7] – Emaj7 – G7 – Cmaj7: Drei gleichberechtigte Toniken (C, A♭, E), jeweils durch ihre V7 angesteuert!', en: 'Cmaj7 – E♭7 – A♭maj7 – B7 – Emaj7 – G7 – Cmaj7: Three symmetrical tonic centers (C, A♭, E), each launched by its own V7!' }
          },
          {
            title: { de: 'Vorher vs. Nachher: Countdown-Reharmonisierung einer ii–V–I', en: 'Before vs. After: Countdown reharmonization of a ii–V–I' },
            toks: 'ii7:2 bIII7:2 bVImaj7:2 VII7:2 IIImaj7:2 V7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – E♭7 – A♭maj7 – [B7] – Emaj7 – G7 – Cmaj7: Beginnt wie eine normale ii–V–I (Dm7), fliegt durch alle 3 Großterz-Zentren und landet sicher auf Cmaj7!', en: 'Dm7 – E♭7 – A♭maj7 – B7 – Emaj7 – G7 – Cmaj7: Starts on normal ii7, cycles all 3 major-third keys, and lands cleanly on Cmaj7!' }
          }
        ],
        check: {
          q: { de: 'In welchem Intervallabstand liegen die drei Tonarten eines Coltrane-Changes-Zyklus (z. B. C – A♭ – E)?', en: 'What interval separates the three tonal centers of a Coltrane Changes cycle (e.g. C – A♭ – E)?' },
          opts: [
            { de: 'Große Terzen (je 4 Halbtöne – symmetrisches Dreieck)', en: 'Major thirds (4 semitones each — a symmetrical triangle)' },
            { de: 'Reine Quinten (je 7 Halbtöne)', en: 'Perfect fifths (7 semitones each)' },
            { de: 'Ganztöne (je 2 Halbtöne)', en: 'Whole tones (2 semitones each)' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! Drei große Terzen (4 + 4 + 4 = 12 HT) schließen die Oktave exakt symmetrisch – genau wie der übermäßige Dreiklang!',
            en: 'Correct! Three major thirds (4 + 4 + 4 = 12 semitones) divide the octave symmetrically — just like an augmented triad!'
          }
        }
      }
    ]
  };

  L.negative_harmony = {
    id: 'negative_harmony',
    badge: 'jazz',
    title: { de: 'Negative Harmonie (Spiegelharmonik)', en: 'Negative Harmony (Mirror Harmony)' },
    units: [
      {
        title: { de: 'Akkorde spiegeln: Warum aus G7 plötzlich Fm6 wird', en: 'Mirroring Chords: Why G7 Turns Into Fm6' },
        transposeBody: true,
        body: {
          de: `<p><b>Negative Harmonie</b> (theoretisch beschrieben von Ernst Levy, berühmt gemacht durch Jacob Collier) ist eine verblüffend elegante Spiegelung aller Töne an einer festen <b>Spiegelachse genau zwischen Grundton (1) und Quinte (5)</b> – in C-Dur liegt diese Achse zwischen <b>E und E♭</b> (bzw. zwischen C und G im Quintenzirkel)!</p>
               <p>Spiegelt man jeden Ton eines Akkords über diese Achse (<code>C↔G</code>, <code>D↔F</code>, <code>E↔E♭</code>, <code>A↔[B♭]</code>, <code>[B]↔A♭</code>), passiert Erstaunliches:</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Positiv (Original in C)</th><th>Töne</th><th>Gespiegelt (Negativ)</th><th>Ergebnis-Akkord</th></tr>
                 <tr><td><b><code>I</code> (C)</b></td><td>C – E – G</td><td>G – E♭ – C → bleibt Tonika</td><td><b><code>i / I</code></b> (Anker!)</td></tr>
                 <tr><td><b><code>V7</code> (G7)</b></td><td>G – [B] – D – F</td><td>C – A♭ – F – D</td><td><b><code>iv6</code> (Fm6!)</b></td></tr>
                 <tr><td><b><code>ii7</code> (Dm7)</b></td><td>D – F – A – C</td><td>F – D – [B♭] – G</td><td><b><code>♭VII6</code> / <code>♭VII7</code> ([B♭7])</b></td></tr>
                 <tr><td><b><code>IV</code> (F)</b></td><td>F – A – C</td><td>D – [B♭] – G</td><td><b><code>v</code> (Gm)</b></td></tr>
                 <tr><td><b><code>vi</code> (Am)</b></td><td>A – C – E</td><td>[B♭] – G – E♭</td><td><b><code>♭III</code> (E♭)</b></td></tr>
               </table></div>
               <div class="callout tip"><strong>Das große Aha-Erlebnis</strong>
               Negative Harmonie erklärt, warum <b>Modal Interchange</b> und die <b>Backdoor-Kadenz</b> so organisch nach Hause ziehen! Die „gespiegelte Dominante“ <code>iv6</code> (<code>Fm6</code>) enthält exakt denselben Leitton-Sog wie <code>G7</code> – nur nicht <em>aufwärts</em> (<code>[B]→C</code>), sondern warm <em>abwärts</em> (<code>A♭→G</code>)!</div>`,
          en: `<p><b>Negative Harmony</b> (theorized by Ernst Levy and popularized by Jacob Collier) mirrors every pitch across a fixed <b>axis sitting right between root (1) and fifth (5)</b> — in C major, that axis runs between <b>E and E♭</b> (equivalently between C and G on the Circle of Fifths)!</p>
               <p>Flip every note of a chord across that axis (<code>C↔G</code>, <code>D↔F</code>, <code>E↔E♭</code>, <code>A↔B♭</code>, <code>B↔A♭</code>) and watch what happens:</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Positive (Original in C)</th><th>Notes</th><th>Mirrored (Negative)</th><th>Resulting Chord</th></tr>
                 <tr><td><b><code>I</code> (C)</b></td><td>C – E – G</td><td>G – E♭ – C → anchor</td><td><b><code>i / I</code></b> (home!)</td></tr>
                 <tr><td><b><code>V7</code> (G7)</b></td><td>G – B – D – F</td><td>C – A♭ – F – D</td><td><b><code>iv6</code> (Fm6!)</b></td></tr>
                 <tr><td><b><code>ii7</code> (Dm7)</b></td><td>D – F – A – C</td><td>F – D – B♭ – G</td><td><b><code>♭VII6</code> / <code>♭VII7</code> (B♭7)</b></td></tr>
                 <tr><td><b><code>IV</code> (F)</b></td><td>F – A – C</td><td>D – B♭ – G</td><td><b><code>v</code> (Gm)</b></td></tr>
                 <tr><td><b><code>vi</code> (Am)</b></td><td>A – C – E</td><td>B♭ – G – E♭</td><td><b><code>♭III</code> (E♭)</b></td></tr>
               </table></div>
               <div class="callout tip"><strong>The Big Aha Moment</strong>
               Negative harmony reveals <em>why</em> <b>Modal Interchange</b> and the <b>Backdoor Cadence</b> pull home so naturally! The “mirror dominant” <code>iv6</code> (<code>Fm6</code>) carries the exact gravitational pull of <code>G7</code> — just resolving warmly <em>downward</em> (<code>A♭→G</code>) instead of upward (<code>B→C</code>)!</div>`
        },
        examples: [
          {
            title: { de: 'Vorher (Positiv): Klassische Kadenz I – vi – ii7 – V7 – I', en: 'Before (Positive): Classic cadence I – vi – ii7 – V7 – I' },
            toks: 'I:2 vi:2 ii7:2 V7:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Am – Dm7 – G7 – C: Helle, vorwärtsdrängende Standard-Kadenz.', en: 'C – Am – Dm7 – G7 – C: Bright, forward-driving standard cadence.' }
          },
          {
            title: { de: 'Nachher (Negativ gespiegelt): I – ♭III – ♭VII7 – iv6 – I', en: 'After (Negative mirror): I – ♭III – ♭VII7 – iv6 – I' },
            toks: 'I:2 bIII:2 bVII7:2 iv6:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E♭ – [B♭7] – Fm6 – C: Jeder einzelne Akkord ist das exakte Spiegelbild von oben – plötzlich warm, filmisch, nostalgisch!', en: 'C – E♭ – B♭7 – Fm6 – C: Every single chord is the exact mirror of above — instantly warm, lush, and nostalgic!' }
          },
          {
            title: { de: 'Direktvergleich am Schluss: V7 → I vs. iv6 → I', en: 'Direct ending comparison: V7 → I vs. iv6 → I' },
            toks: 'I:2 V7:2 I:2 iv6:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G7 – C (aufstrebender Leitton [B]→C) vs. C – Fm6 – C (weicher Abwärts-Leitton A♭→G)!', en: 'C – G7 – C (upward leading tone B→C) vs. C – Fm6 – C (warm downward pull A♭→G)!' }
          }
        ],
        check: {
          q: { de: 'Welcher Akkord entsteht in C-Dur, wenn man die Dominante G7 (V7) negativ spiegelt?', en: 'In C major, which chord is the negative-harmony mirror of the dominant G7 (V7)?' },
          opts: [
            { de: 'Fm6 (iv6 – Moll-Subdominante mit großer Sexte)', en: 'Fm6 (iv6 — minor subdominant with major 6th)' },
            { de: 'D7 (V7/V)', en: 'D7 (V7/V)' },
            { de: 'Em7 (iii7)', en: 'Em7 (iii7)' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! G–[B]–D–F spiegelt sich tonweise zu C–A♭–F–D = Fm6 (iv6) – deshalb löst sich Fm6 so samtig nach C auf!',
            en: 'Spot on! G–B–D–F mirrors note-for-note into C–A♭–F–D = Fm6 (iv6), explaining its velvety pull back to C!'
          }
        }
      }
    ]
  };

  L.planing_structures = {
    id: 'planing_structures',
    badge: 'jazz',
    title: { de: 'Parallelverschiebung (Planing) & Konstante Strukturen', en: 'Parallel Planing & Constant Structures' },
    units: [
      {
        title: { de: 'Farbflächen statt Funktionszwang (Impressionismus, Fusion & Neo-Soul)', en: 'Shifting Color Blocks (Impressionism, Fusion & Neo-Soul)' },
        transposeBody: true,
        body: {
          de: `<p>Normalerweise ordnet jede Akkordfolge sich einer Tonart unter (Tonika → Subdominante → Dominante). Beim <b>Planing (Parallelverschiebung)</b> brichst du diese Regel ganz bewusst – und verschiebst einen schönen Akkordgriff einfach <b>parallel wie einen Block</b> über die Klaviatur oder das Griffbrett!</p>
               <ul>
                 <li><b>Diatonisches Planing:</b> Die Form bleibt gleich, passt sich aber den Tönen der Tonleiter an (z. B. <code>Imaj7 – ii7 – iii7 – IVmaj7</code>: schwebend, sanft, wie <em>Debussy</em> oder <em>Coldplay</em>).</li>
                 <li><b>Chromatisches Planing / Konstante Strukturen:</b> <b>Exakt derselbe Akkordtyp</b> (z. B. nur <code>maj7</code>, nur <code>m9</code> oder nur <code>sus4</code>) wandert völlig frei über beliebige Grundtöne (z. B. <code>Cmaj7 → E♭maj7 → D♭maj7 → Cmaj7</code> oder <code>Dm9 → E♭m9 → Fm9</code>)!</li>
               </ul>
               <div class="callout song"><strong>Warum funktioniert das ohne Kadenz?</strong>
               Weil dein Ohr die <b>unveränderte Klangfarbe (konstante Struktur)</b> als roten Faden erkennt, während sich der Raum dahinter wie ein Gemälde verschiebt! Berühmt aus <em>Claude Debussy</em>, <em>Herbie Hancock („Maiden Voyage“)</em>, <em>Neo-Soul (D’Angelo, Robert Glasper)</em> und <em>Lo-Fi Beats</em>.</div>`,
          en: `<p>Traditional harmony organizes chords around tonic, subdominant, and dominant. With <b>Planing (parallel voice movement)</b> you deliberately break free — sliding a lush chord shape <b>in parallel blocks</b> across the keyboard or fretboard!</p>
               <ul>
                 <li><b>Diatonic Planing:</b> The shape glides step-by-step while conforming to the key’s scale (e.g. <code>Imaj7 – ii7 – iii7 – IVmaj7</code>: warm, flowing).</li>
                 <li><b>Chromatic Planing / Constant Structures:</b> The <b>exact same chord quality</b> (all <code>maj7</code>, all <code>m9</code>, or all <code>sus4</code>) moves freely across non-diatonic roots (e.g. <code>Cmaj7 → E♭maj7 → D♭maj7 → Cmaj7</code> or <code>Dm9 → E♭m9 → Fm9</code>)!</li>
               </ul>
               <div class="callout song"><strong>Why does it work without a cadence?</strong>
               Because the ear locks onto the <b>unchanging chord quality (constant structure)</b> as an anchor while the harmonic color floats like a painting! Iconic in <em>Debussy</em>, <em>Herbie Hancock (“Maiden Voyage”)</em>, <em>Neo-Soul (Robert Glasper)</em>, and <em>Lo-Fi</em>.</div>`
        },
        examples: [
          {
            title: { de: 'Konstante Strukturen (maj7-Farbflächen): Cmaj7 – E♭maj7 – D♭maj7 – Cmaj7', en: 'Constant structures (maj7 color blocks): Cmaj7 – E♭maj7 – D♭maj7 – Cmaj7' },
            toks: 'Imaj7:2 bIIImaj7:2 bIImaj7:2 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Vier reine maj7-Klänge ohne funktionale Dominante – schwebend, modern, wie Jazz-Fusion und Film-Atmosphäre!', en: 'Four pure maj7 colors with zero dominant pull — floating, cinematic, and modern!' }
          },
          {
            title: { de: 'Neo-Soul / Lo-Fi m9-Planing: i9 – ♭ii9 – ♭iii9 – iv9', en: 'Neo-Soul / Lo-Fi m9 planing: i9 – ♭ii9 – ♭iii9 – iv9' },
            toks: 'i9:2 bii9:2 biii9:2 iv9:2 i9:4',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm9 – D♭m9 – E♭m9 – Fm9 – Cm9: Derselbe samtige m9-Griff gleitet parallel über die Klaviatur (Tipp: Klang „E-Piano / Rhodes“!).', en: 'Cm9 – D♭m9 – E♭m9 – Fm9 – Cm9: One silky m9 shape gliding smoothly in parallel (try Electric Piano / Rhodes!).' }
          },
          {
            title: { de: 'Diatonisches Planing (weicher Aufstieg): Imaj7 – ii7 – iii7 – IVmaj7', en: 'Diatonic planing (gentle climb): Imaj7 – ii7 – iii7 – IVmaj7' },
            toks: 'Imaj7:2 ii7:2 iii7:2 IVmaj7:2 iii7:1 ii7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Dm7 – Em7 – Fmaj7 – Em7 – Dm7 – Cmaj7: Alle Stimmen wandern sanft parallel innerhalb der Tonleiter.', en: 'Cmaj7 – Dm7 – Em7 – Fmaj7 – Em7 – Dm7 – Cmaj7: All voices glide gently in parallel inside the key.' }
          }
        ]
      }
    ]
  };

  L.quartal_harmony = {
    id: 'quartal_harmony',
    badge: 'jazz',
    title: { de: 'Quartal-Harmonik & So-What-Voicings', en: 'Quartal Harmony & So-What Voicings' },
    units: [
      {
        title: { de: 'Quarten statt Terzen stapeln – offen, modern, schwebend', en: 'Stacking Fourths Instead of Thirds — Open & Modern' },
        transposeBody: true,
        body: {
          de: `<p>Fast alle Akkorde bisher basierten auf <b>Terzschichtung</b> (<code>1 – 3 – 5 – 7</code>). Wenn du statt Terzen einfach <b>reine Quarten</b> übereinander stapelst (<b>Quartal-Harmonik</b>), öffnet sich sofort eine völlig andere, glasklare Klangwelt:</p>
               <ul>
                 <li><b>Reiner Quart-Dreiklang (<code>(4)</code> = <code>1 – 4 – ♭7</code>, z. B. <code>C – F – [B♭]</code>):</b> Keine Terz → weder klar Dur noch Moll! Klingt luftig, weit und geheimnisvoll (<em>Debussy</em>, <em>McCoy Tyner</em>, <em>Studio Ghibli</em>, <em>Zelda</em>).</li>
                 <li><b>Das legendäre „So-What“-Voicing (<code>m11</code> = 3 Quarten + 1 große Terz oben!):</b><br>
                 Berühmt gemacht durch Bill Evans auf Miles Davis’ <em>„So What“</em> (1959)! Auf <code>Cm11</code> stapelst du von unten nach oben: <b><code>C – F – [B♭] – E♭ – G</code></b> (Quarte + Quarte + Quarte + gr. Terz). Alle 5 Töne gehören zur dorischen Skala – das perfekte moderne Moll-Voicing!</li>
               </ul>
               <div class="callout tip"><strong>Probiere es im Live-View aus!</strong>
               Klicke unten auf einen <code>(4)</code>- oder <code>m11</code>-Akkord und schau auf die Klaviatur und ins Notensystem: Du siehst sofort die <b>gleichmäßigen, weiten Quart-Abstände</b> statt enger Terzen!</div>`,
          en: `<p>Almost every chord so far stacked <b>thirds</b> (<code>1 – 3 – 5 – 7</code>). Stack <b>perfect fourths</b> instead (<b>Quartal Harmony</b>) and an unmistakably modern, wide-open sound world appears:</p>
               <ul>
                 <li><b>Pure Quartal Triad (<code>(4)</code> = <code>1 – 4 – ♭7</code>, e.g. <code>C – F – B♭</code>):</b> No 3rd — neither clearly major nor minor! Airy, open, and cinematic (<em>Debussy</em>, <em>McCoy Tyner</em>, <em>Studio Ghibli</em>, <em>Zelda</em>).</li>
                 <li><b>The iconic “So What” Voicing (<code>m11</code> = 3 perfect fourths + 1 major third on top!):</b><br>
                 Immortalized by Bill Evans on Miles Davis’s <em>“So What”</em> (1959)! On <code>Cm11</code>, stack bottom-to-top: <b><code>C – F – B♭ – E♭ – G</code></b> (P4 + P4 + P4 + M3). Every note belongs to Dorian — the ultimate cool modern minor voicing!</li>
               </ul>
               <div class="callout tip"><strong>Inspect it in the Live View!</strong>
               Click any <code>(4)</code> or <code>m11</code> chord below and look at the piano and grand staff: you can literally see the <b>wide, even fourth intervals</b> instead of cramped thirds!</div>`
        },
        examples: [
          {
            title: { de: 'Direktvergleich: Terz-Moll (Cm7) vs. So-What-Quartal (Cm11)', en: 'Direct comparison: Tertian (Cm7) vs. So-What Quartal (Cm11)' },
            toks: 'i7:3 i11:3 i7:3 i11:3',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm7 (enge Terzen) vs. Cm11 (3 Quarten + gr. Terz: C–F–[B♭]–E♭–G): Höre, wie der Akkord plötzlich „aufgeht“ und modern atmet!', en: 'Cm7 (close thirds) vs. Cm11 (3 fourths + M3: C–F–B♭–E♭–G): Hear how the harmony suddenly opens up and breathes!' }
          },
          {
            title: { de: 'So-What-Vamp (Miles Davis): i11 → ♭ii11 → i11', en: 'So What Vamp (Miles Davis): i11 → ♭ii11 → i11' },
            toks: 'i11:4 bii11:4 i11:4',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm11 → D♭m11 → Cm11: Der legendäre Halbton-Sprung des gesamten So-What-Voicings aus dem Modal Jazz!', en: 'Cm11 → D♭m11 → Cm11: The legendary half-step shift of the entire So What voicing from modal jazz!' }
          },
          {
            title: { de: 'Modales Quart-Planing (McCoy Tyner / Ghibli-Vibe)', en: 'Modal quartal planing (McCoy Tyner / Ghibli vibe)' },
            toks: 'Iq4:2 IIq4:2 IIIq4:2 IVq4:2 IIIq4:2 IIq4:2 Iq4:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Reine 3-tönige Quart-Stapel (1–4–♭7) gleiten auf und ab – schwebend, offen und zeitlos modern.', en: 'Pure 3-note quartal stacks (1–4–♭7) gliding up and down — airy, open, and timelessly modern.' }
          }
        ],
        check: {
          q: { de: 'Wie ist das berühmte „So-What“-Voicing (z. B. Cm11) von unten nach oben aufgebaut?', en: 'How is the famous “So What” voicing (e.g. Cm11) stacked from bottom to top?' },
          opts: [
            { de: 'Drei reine Quarten übereinander + eine große Terz ganz oben', en: 'Three perfect fourths stacked + one major third on top' },
            { de: 'Vier kleine Terzen übereinander', en: 'Four minor thirds stacked' },
            { de: 'Nur Grundton und Quinte im Bass', en: 'Just root and fifth in the bass' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! 3 reine Quarten + 1 große Terz oben (z. B. C–F–[B♭]–E♭–G) ergeben genau die Töne 1–11–♭7–♭3–5.',
            en: 'Correct! Three perfect fourths + one major third on top (e.g. C–F–B♭–E♭–G) spell 1–11–♭7–♭3–5.'
          }
        }
      }
    ]
  };

  L.counterpoint = {
    id: 'counterpoint',
    badge: 'klassik',
    title: { de: 'Kontrapunkt & Stimmbewegungen', en: 'Counterpoint & Voice Motion' },
    units: [
      {
        title: { de: 'Gegenbewegung, Seitenbewegung & das Geheimnis der Parallelen', en: 'Contrary Motion, Oblique Motion & Parallel Fifths Explained' },
        transposeBody: true,
        body: {
          de: `<p><b>Kontrapunkt</b> (lat. <em>punctus contra punctum</em> = „Note gegen Note“) bedeutet, dass Bass und Oberstimme wie <b>zwei eigenständige Melodien</b> zusammenspielen, statt nur als starrer Block hin und her zu springen. Dafür gibt es genau <b>vier Bewegungsarten</b>:</p>
               <ol>
                 <li><b>Gegenbewegung (Königsdisziplin!):</b> Eine Stimme steigt, die andere fällt (z. B. Bass fällt <code>C → [B] → A</code>, während die Melodie steigt <code>E → G → A</code>). Klingt sofort voll, eigenständig und edel – bei Bach genauso wie bei den Beatles!</li>
                 <li><b>Seitenbewegung:</b> Eine Stimme bleibt liegen (Orgelpunkt / gemeinsamer Ton), die andere bewegt sich. Sorgt für Ruhe und Spannung zugleich.</li>
                 <li><b>Parallelbewegung (Terzen &amp; Sexten):</b> Beide Stimmen ziehen im gleichen Abstand mit – weich und sanglich (klassisches Duett).</li>
                 <li><b>Warum meidet die Klassik Quint- und Oktavparallelen?</b> Reine Quinten und Oktaven sind akustisch so stark verschmolzen, dass zwei Stimmen, die parallel in Quinten oder Oktaven laufen, sofort <b>ihre Eigenständigkeit verlieren</b> und wie eine einzige verstärkte Stimme klingen! Im <b>Rock &amp; Metal (Powerchords!)</b> oder beim <b>Planing</b> nutzt man genau diesen „Wand-Effekt“ bewusst – im Chorsatz oder bei feiner Klavierbegleitung zerstört er jedoch die Mehrstimmigkeit.</li>
               </ol>`,
          en: `<p><b>Counterpoint</b> (Latin <em>punctus contra punctum</em> = “note against note”) means bass and melody behave like <b>two independent singing lines</b> rather than one stiff block. There are exactly <b>four types of voice motion</b>:</p>
               <ol>
                 <li><b>Contrary motion (the gold standard!):</b> One voice rises while the other falls (e.g. bass walks down <code>C → B → A</code> while the melody climbs <code>E → G → A</code>). Instantly rich and independent — from Bach to The Beatles!</li>
                 <li><b>Oblique motion:</b> One voice holds still (pedal or common tone) while the other moves — combining stability with tension.</li>
                 <li><b>Parallel motion (3rds &amp; 6ths):</b> Both voices move together by the same interval — warm, vocal duet sound.</li>
                 <li><b>Why does classical harmony avoid parallel fifths &amp; octaves?</b> Perfect 5ths and octaves blend so tightly acoustically that two voices moving in parallel 5ths/octaves <b>fuse into one thicker voice</b> and lose independence! In <b>Rock &amp; Metal (power chords!)</b> or <b>Planing</b> that fused “wall of sound” is the exact point — whereas in choir writing or refined piano accompaniment it collapses independent lines.</li>
               </ol>`
        },
        examples: [
          {
            title: { de: 'Gegenbewegung in Aktion (Bass fällt stufenweise, Oberstimmen atmen dagegen)', en: 'Contrary motion in action (stepwise falling bass vs. rising upper voice)' },
            toks: 'I:2 V^1:2 vi:2 I^1:2 IV:2 I^2:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G/[B] – Am – C/E – F – C/G – G7 – C: Achte im Live-View (Klaviersystem!) auf die unabhängige, melodiöse Basslinie gegenüber der rechten Hand.', en: 'C – G/B – Am – C/E – F – C/G – G7 – C: Watch the grand staff in Live View — see how the bass line sings independently against the right hand!' }
          },
          {
            title: { de: 'Seitenbewegung (Bass hält I fest, Harmonie wandert darüber)', en: 'Oblique motion (held bass I while harmony moves above)' },
            toks: 'I:2 ii@I:2 I^1@I:2 IV@I:2 V@I:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Dm/C – C – F/C – G/C – C: Die Unterstimme steht felsenfest auf C, während oben eine klare Melodielinie aufsteigt.', en: 'C – Dm/C – C – F/C – G/C – C: The bass anchors rock-steady on C while the upper harmony rises smoothly.' }
          }
        ]
      }
    ]
  };

  L.reharmonization = {
    id: 'reharmonization',
    badge: 'jazz',
    title: { de: 'Reharmonisierung (Werkstatt: 1 Song in 4 Welten)', en: 'Reharmonization (Workshop: 1 Song in 4 Worlds)' },
    units: [
      {
        title: { de: '5 Praxis-Hebel: So verwandelst du jede einfache Akkordfolge', en: '5 Practical Levers to Transform Any Simple Progression' },
        transposeBody: true,
        body: {
          de: `<p><b>Reharmonisierung</b> ist die Königsdisziplin, in der <b>alle Werkzeuge dieses Trainers zusammenlaufen</b>: Du behältst das Grundgerüst (oder die Melodie) eines einfachen Songs, tauscht aber die Akkorde darunter aus – und wechselst sofort Stimmung und Stil!</p>
               <div class="callout tip"><strong>Die 5 schnellsten Reharmonisations-Hebel</strong>
               <ol style="margin:6px 0 4px 18px;padding:0">
                 <li><b>Funktions-Stellvertreter:</b> Ersetze <code>I</code> durch <code>iii7</code> oder <code>vi7</code> (teilen je 2–3 gemeinsame Töne!), <code>IV</code> durch <code>ii7</code>.</li>
                 <li><b>Melodischer Bass (Slash-Chords):</b> Umkehrungen (<code>V⁶</code>, <code>I⁶</code>, <code>IV/V</code>) verbinden Akkorde stufenweise.</li>
                 <li><b>Zwischen-<code>ii–V</code> &amp; Sekundärdominanten:</b> Schalte vor wichtige Zielakkorde (<code>vi</code>, <code>IV</code>, <code>ii</code>) ihr eigenes <code>V7</code> oder <code>ii–V</code>.</li>
                 <li><b>Tritonus-Substitution:</b> Tausche <code>V7</code> gegen <code>♭II7</code> für chromatischen Halbton-Bass (<code>D → D♭ → C</code>).</li>
                 <li><b>Farbwechsel (Modal Interchange, Negative Harmonie, Medianten):</b> <code>iv6</code>, <code>♭VII7</code>, <code>♭VImaj7</code> oder <code>III7</code> verwandeln schlichten Pop in Kino oder Neo-Soul!</li>
               </ol></div>
               <p>Höre unten <b>genau dieselbe 4-Takt-Basis (<code>I – vi – IV – V – I</code>)</b> in <b>vier komplett verschiedenen Klangwelten</b> direkt nacheinander an:</p>`,
          en: `<p><b>Reharmonization</b> is the capstone craft where <b>every tool in this trainer comes together</b>: you keep the skeleton (or melody) of a simple song, swap out the harmony underneath — and transform its entire emotional world!</p>
               <div class="callout tip"><strong>The 5 Fastest Reharmonization Levers</strong>
               <ol style="margin:6px 0 4px 18px;padding:0">
                 <li><b>Functional substitutes:</b> Swap <code>I</code> with <code>iii7</code> or <code>vi7</code> (sharing 2–3 common tones), or <code>IV</code> with <code>ii7</code>.</li>
                 <li><b>Melodic bass (Slash chords):</b> Use inversions (<code>V⁶</code>, <code>I⁶</code>, <code>IV/V</code>) to make the bass sing stepwise.</li>
                 <li><b>Secondary <code>ii–V</code>s &amp; Dominants:</b> Insert a target’s own <code>V7</code> or <code>ii–V</code> right before <code>vi</code>, <code>IV</code>, or <code>ii</code>.</li>
                 <li><b>Tritone substitution:</b> Swap <code>V7</code> for <code>♭II7</code> for silky chromatic bass (<code>D → D♭ → C</code>).</li>
                 <li><b>Color shifts (Modal Interchange, Negative Harmony, Mediants):</b> <code>iv6</code>, <code>♭VII7</code>, <code>♭VImaj7</code>, or <code>III7</code> turn plain pop into cinema or Neo-Soul!</li>
               </ol></div>
               <p>Listen to the <b>exact same 4-bar skeleton (<code>I – vi – IV – V – I</code>)</b> transformed into <b>four completely different worlds</b> below:</p>`
        },
        examples: [
          {
            title: { de: 'Welt 1 – Basis (Schlichter Pop): I – vi – IV – V – I', en: 'World 1 — Basic (Plain Pop): I – vi – IV – V – I' },
            toks: 'I:2 vi:2 IV:2 V:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Am – F – G – C: Unser schlichtes Ausgangsgerüst (50er-Kadenz).', en: 'C – Am – F – G – C: Our clean starting skeleton (50s progression).' }
          },
          {
            title: { de: 'Welt 2 – Ballade & Gospel (Slash-Bass + V7/IV + IV/V)', en: 'World 2 — Ballad & Gospel (Slash bass + V7/IV + IV/V)' },
            toks: 'I:2 V^1:1 vi7:2 V7/IV^1:1 IVmaj7:2 IV@V:1 V7:1 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G/[B] – Am7 – C7/E – Fmaj7 – F/G – G7 – Cmaj9: Dieselben Zielakkorde, verbunden durch singende Bass-Übergänge und warmes F/G!', en: 'C – G/B – Am7 – C7/E – Fmaj7 – F/G – G7 – Cmaj9: Same landmarks, glued together by singing bass lines and warm F/G!' }
          },
          {
            title: { de: 'Welt 3 – Jazz (Zwischen-ii–Vs + Tritonus-Sub ♭II7)', en: 'World 3 — Jazz (Secondary ii–Vs + Tritone Sub ♭II7)' },
            toks: 'Imaj7:2 viiø:1 V7b9/vi:1 vi7:2 ii7/IV:1 V7/IV:1 IVmaj7:2 bII7:2 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – [Bø7] – E7♭9 – Am7 – Gm7 – C7 – Fmaj7 – D♭7 – Cmaj9: Jedes Ziel bekommt sein eigenes ii–V, und D♭7 ersetzt G7 chromatisch!', en: 'Cmaj7 – Bø7 – E7♭9 – Am7 – Gm7 – C7 – Fmaj7 – D♭7 – Cmaj9: Each target gets its own ii–V, and D♭7 replaces G7 chromatically!' }
          },
          {
            title: { de: 'Welt 4 – Filmmusik & Neo-Soul (Medianten + Negative Harmonie)', en: 'World 4 — Cinema & Neo-Soul (Mediants + Negative Harmony)' },
            toks: 'Imaj9:2 III7:2 bVImaj7:2 iv6:1 bVII7:1 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj9 – E7 – A♭maj7 – Fm6 – [B♭7] – Cmaj9: Chromatischer Sprung nach A♭maj7 und warme Backdoor-/Negativ-Auflösung (Fm6 – [B♭7] → Cmaj9)!', en: 'Cmaj9 – E7 – A♭maj7 – Fm6 – B♭7 – Cmaj9: Chromatic leap to A♭maj7 and velvety negative/backdoor resolution home!' }
          }
        ],
        check: {
          q: { de: 'Welche zwei Akkorde teilen besonders viele gemeinsame Töne mit Imaj7 (C–E–G–[B]) und eignen sich daher als sofortige Stellvertreter?', en: 'Which two chords share the most common tones with Imaj7 (C–E–G–B) and work as instant substitutes?' },
          opts: [
            { de: 'iii7 (Em7: E–G–[B]–D) und vi7 (Am7: A–C–E–G)', en: 'iii7 (Em7: E–G–B–D) and vi7 (Am7: A–C–E–G)' },
            { de: '♭V (G♭) und ♭II (D♭)', en: '♭V (G♭) and ♭II (D♭)' },
            { de: 'II7 (D7) und V7 (G7)', en: 'II7 (D7) and V7 (G7)' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! Sowohl Em7 (iii7) als auch Am7 (vi7) teilen exakt 3 von 4 Tönen mit Cmaj7 – die schnellste Reharmonisierung überhaupt!',
            en: 'Spot on! Both Em7 (iii7) and Am7 (vi7) share 3 out of 4 notes with Cmaj7 — the cleanest substitute in harmony!'
          }
        }
      }
    ]
  };

  L.neosoul_grooves = {
    id: 'neosoul_grooves',
    badge: 'jazz',
    title: { de: 'Neo-Soul Grundlagen (Tom Misch, D’Angelo & Robert Glasper)', en: 'Neo-Soul Foundations (Tom Misch, D’Angelo & Robert Glasper)' },
    units: [
      {
        title: { de: 'Der warme Neo-Soul-Sound: m9, m11, maj9 & weiche Dominanten', en: 'The Warm Neo-Soul Sound: m9, m11, maj9 & Soft Dominants' },
        transposeBody: true,
        body: {
          de: `<p>Warum klingen Songs von <b>Tom Misch</b>, <b>D’Angelo</b>, <b>Erykah Badu</b> oder <b>Frank Ocean</b> sofort entspannt, warm und „teuer“? Neo-Soul nimmt vertraute Pop-/Gospel-Folgen und wendet vier goldene Regeln an:</p>
               <ol>
                 <li><b>Keine nackten Dreiklänge:</b> Fast jeder Moll-Akkord wird zum samtigen <b><code>m9</code></b> oder offenen <b><code>m11</code></b> (Quart-Voicing!), jeder Dur-Akkord zum schwebenden <b><code>maj9</code></b>.</li>
                 <li><b>Keine harte Schulbuch-<code>V7</code>:</b> Statt grellem <code>G7</code> nutzt Neo-Soul weiche <b><code>IV/V</code> (<code>F/G</code> = G9sus4)</b>, würzige <b><code>V13</code></b>, alterierte <b><code>V7♯5</code></b> oder die samtige <b>Backdoor-Auflösung (<code>iv6 / ♭VII7</code>)</b>.</li>
                 <li><b>Schwebende Schleifen („Never-Landing“):</b> Viele Neo-Soul-Grooves ruhen gar nicht auf <code>I</code>, sondern kreisen endlos um <code>ii9</code>, <code>vi9</code> oder <code>IVmaj9</code>!</li>
                 <li><b>Klang-Tipp:</b> Stelle unten in der Live-View-Leiste unbedingt auf <b>🎹 E-Piano (Rhodes)</b> oder <b>🎸 Akustikgitarre</b> um – genau dort lebt dieser Sound!</li>
               </ol>`,
          en: `<p>Why do tracks by <b>Tom Misch</b>, <b>D’Angelo</b>, <b>Erykah Badu</b>, and <b>Frank Ocean</b> sound effortlessly lush and velvety? Neo-Soul takes familiar pop/gospel shapes and applies four golden rules:</p>
               <ol>
                 <li><b>No bare triads:</b> Almost every minor chord becomes a silky <b><code>m9</code></b> or open quartal <b><code>m11</code></b>; major chords blossom into floating <b><code>maj9</code></b>.</li>
                 <li><b>No harsh textbook <code>V7</code>:</b> Replace stark <code>G7</code> with lush <b><code>IV/V</code> (<code>F/G</code> = G9sus4)</b>, rich <b><code>V13</code></b>, altered <b><code>V7♯5</code></b>, or a velvety <b>Backdoor move (<code>iv6 / ♭VII7</code>)</b>.</li>
                 <li><b>Floating loops (“never landing”):</b> Many grooves intentionally avoid resting on <code>I</code>, circling endlessly around <code>ii9</code>, <code>vi9</code>, or <code>IVmaj9</code>!</li>
                 <li><b>Sound tip:</b> Switch the Live View bar below to <b>🎹 Electric Piano (Rhodes)</b> or <b>🎸 Acoustic Guitar</b> — that’s where Neo-Soul shines!</li>
               </ol>`
        },
        examples: [
          {
            title: { de: 'Vorher: Schlichte Pop-Moll-Folge (vi – IV – ii – V)', en: 'Before: Plain pop progression (vi – IV – ii – V)' },
            toks: 'vi IV ii V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Am – F – Dm – G: Das einfache 4-Akkord-Gerüst – direkt darunter verwandeln wir genau diese vier Akkorde in einen echten Tom-Misch-Groove!', en: 'Am – F – Dm – G: The plain 4-chord skeleton — right below, watch these exact four chords transform into a Tom Misch groove!' }
          },
          {
            title: { de: 'Nachher (Tom Misch Style): vi9 – IVmaj9 – ii11 – V7♯5', en: 'After (Tom Misch Style): vi9 – IVmaj9 – ii11 – V7♯5' },
            toks: 'vi9 IVmaj9 ii11 V+7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Am9 – Fmaj9 – Dm11 – G7♯5 · So entsteht’s aus Vorher: vi wird zu Am9, IV zu Fmaj9, ii zum offenen Quart-Voicing Dm11, und G bekommt die übermäßige ♯5 (G7♯5) als sinnlichen Neo-Soul-Zug zurück zu Am9!', en: 'Am9 – Fmaj9 – Dm11 – G7♯5 · How it grows from Before: Upgrade vi to Am9, IV to Fmaj9, ii to open quartal Dm11, and color G with ♯5 (G7♯5) to pull smoothly back into Am9!' }
          },
          {
            title: { de: 'D’Angelo / Erykah-Badu-Vamp: ii9 – V13 – Imaj9 – VI7♯5', en: 'D’Angelo / Erykah Badu vamp: ii9 – V13 – Imaj9 – VI7♯5' },
            toks: 'ii9 V13 Imaj9 VI+7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm9 – G13 – Cmaj9 – A7♯5: Klassischer R&B-Loop – der alterierte Sekundärdominant-Akkord A7♯5 (mit dem Ton F!) zieht unwiderstehlich warm zurück in Dm9.', en: 'Dm9 – G13 – Cmaj9 – A7♯5: Timeless R&B loop — altered A7♯5 (highlighting the note F!) pulls irresistibly back into Dm9.' }
          },
          {
            title: { de: 'Schwebender Lo-Fi-/R&B-Loop (ohne I): IVmaj9 – iii9 – ii11 – IV/V', en: 'Floating Lo-Fi / R&B loop (no I): IVmaj9 – iii9 – ii11 – IV/V' },
            toks: 'IVmaj9 iii9 ii11 IV@V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Fmaj9 – Em9 – Dm11 – F/G: Weicher Stufen-Abstieg über 9er- und 11er-Klänge – F/G (G9sus4) löst statt auf C direkt wieder schwebend auf Fmaj9 auf!', en: 'Fmaj9 – Em9 – Dm11 – F/G: Smooth stepwise descent through 9th & 11th colors — F/G (G9sus4) glides right back into floating Fmaj9!' }
          }
        ]
      },
      {
        title: { de: 'Der „Robert-Glasper-Move“: Chromatisches Planing & Non-Diatonic Inseln', en: 'The “Robert Glasper Move”: Chromatic Planing & Non-Diatonic Islands' },
        transposeBody: true,
        body: {
          de: `<p><b>Robert Glasper</b> (<em>Black Radio</em>, <em>Afro Blue</em>, <em>J Dilla</em>-Ästhetik) verbindet <b>Gospel-Wärme</b>, <b>Quartal-Voicings</b> und <b>Parallelverschiebung (Planing)</b> zu unverwechselbaren Klangwolken:</p>
               <ul>
                 <li><b>Chromatisches <code>m9</code>-Abgleiten:</b> Statt brav in der Tonleiter zu bleiben, gleitet der gesamte <code>m9</code>-Griff halbtonweise abwärts (<code>vi9 → ♭vi9 → v9 → IVmaj9</code>, in C: <code>Am9 → A♭m9 → Gm9 → Fmaj9</code>)!</li>
                 <li><b>Schwebende <code>maj9</code>-Inseln (Konstante Strukturen + Medianten):</b> Von einem dunklen <code>m11</code> springt Glasper in weit entfernte, aber butterweich geführte <code>maj9</code>-Akkorde (z. B. <code>Cm11 → A♭maj9 → E♭maj9 → D♭maj9</code>) – die Terzen- &amp; Nonen-Reibung erzeugt pure Hypnose!</li>
               </ul>`,
          en: `<p><b>Robert Glasper</b> (<em>Black Radio</em>, <em>Afro Blue</em>, <em>J Dilla</em> aesthetic) fuses <b>gospel warmth</b>, <b>quartal voicings</b>, and <b>parallel planing</b> into unmistakable modern harmonic clouds:</p>
               <ul>
                 <li><b>Chromatic <code>m9</code> slide:</b> Rather than staying strictly diatonic, slide the entire <code>m9</code> grip down by half-steps (<code>vi9 → ♭vi9 → v9 → IVmaj9</code>, in C: <code>Am9 → A♭m9 → Gm9 → Fmaj9</code>)!</li>
                 <li><b>Floating <code>maj9</code> islands (Constant Structures + Mediants):</b> Leap from a deep <code>m11</code> into distant yet velvety <code>maj9</code> islands (e.g. <code>Cm11 → A♭maj9 → E♭maj9 → D♭maj9</code>) — hypnotic, weightless modern soul!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Glasper-Chromatik: vi9 – ♭vi9 – v9 – IVmaj9 – IV/V', en: 'Glasper chromatic slide: vi9 – ♭vi9 – v9 – IVmaj9 – IV/V' },
            toks: 'vi9 bvi9 v9 IVmaj9 IV@V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Am9 – A♭m9 – Gm9 – Fmaj9 – F/G · So entsteht’s aus „vi – IV – V“: Zwischen Am9 und Fmaj9 rutscht derselbe m9-Griff chromatisch über A♭m9 und Gm9 hinab – purer Robert-Glasper-/Erykah-Badu-Vibe!', en: 'Am9 – A♭m9 – Gm9 – Fmaj9 – F/G · How it grows from “vi – IV – V”: Between Am9 and Fmaj9, slide the exact m9 shape down chromatically through A♭m9 and Gm9 — pure Glasper / Badu soul!' }
          },
          {
            title: { de: 'Robert-Glasper-Klangflächen: i11 – ♭VImaj9 – ♭IIImaj9 – ♭IImaj9', en: 'Robert Glasper color clouds: i11 – ♭VImaj9 – ♭IIImaj9 – ♭IImaj9' },
            toks: 'i11 bVImaj9 bIIImaj9 bIImaj9',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm11 – A♭maj9 – E♭maj9 – D♭maj9: Offenes So-What-Voicing trifft auf drei schwebende maj9-Inseln – die phrygische ♭IImaj9 (D♭maj9) zieht geheimnisvoll zurück nach Cm11!', en: 'Cm11 – A♭maj9 – E♭maj9 – D♭maj9: Open So-What minor meets three floating maj9 islands — Phrygian ♭IImaj9 (D♭maj9) pulls mysteriously back into Cm11!' }
          },
          {
            title: { de: 'Gospel trifft Neo-Soul: IVmaj9 – ♯IV°7 – I⁶₄ – VI7♯5 – ii11 – ♭II7 – Imaj9', en: 'Gospel meets Neo-Soul: IVmaj9 – ♯IV°7 – I⁶₄ – VI7♯5 – ii11 – ♭II7 – Imaj9' },
            toks: 'IVmaj9 #IV°7 I^2 VI+7 ii11 bII7 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Fmaj9 – F♯°7 – C/G – A7♯5 – Dm11 – D♭7 – Cmaj9: Verbindet den Gospel-Walk-Up (F → F♯ → G) mit alterierter VI7♯5, quartalem Dm11 und Tritonus-Sub D♭7!', en: 'Fmaj9 – F♯°7 – C/G – A7♯5 – Dm11 – D♭7 – Cmaj9: Blends the Gospel climb (F → F♯ → G) with altered A7♯5, quartal Dm11, and tritone sub D♭7!' }
          }
        ],
        check: {
          q: { de: 'Welche Akkord-Kombination verleiht dem Neo-Soul (z. B. Tom Misch / Robert Glasper) seinen typisch weichen, schwebenden Charakter?', en: 'Which chord palette gives Neo-Soul (e.g. Tom Misch / Robert Glasper) its signature silky, floating sound?' },
          opts: [
            { de: 'm9-, m11- und maj9-Voicings kombiniert mit weichen Vorhalten (IV/V) und alterierten Dominanten (7♯5)', en: 'm9, m11, and maj9 voicings paired with soft suspensions (IV/V) and altered dominants (7♯5)' },
            { de: 'Ausschließlich Powerchords ohne Terzen', en: 'Only power chords with no thirds' },
            { de: 'Nur Dur-Dreiklänge in Grundstellung (I – IV – V)', en: 'Only root-position major triads (I – IV – V)' }
          ],
          ans: 0,
          exp: {
            de: 'Genau! 9er- und 11er-Extensions plus sanfte Dominanten (IV/V, 7♯5, ♭II7) vermeiden jede „harte“ Schulbuch-Kante.',
            en: 'Spot on! 9th/11th colors plus smooth dominants (IV/V, 7♯5, ♭II7) keep the harmony warm and velvety.'
          }
        }
      }
    ]
  };

  L.neosoul_exotic = {
    id: 'neosoul_exotic',
    badge: 'jazz',
    title: { de: 'Exotische Groove- & Fusion-Sounds (Hiatus Kaiyote, Stevie Wonder & Snarky Puppy)', en: 'Exotic Groove & Fusion Sounds (Hiatus Kaiyote, Stevie Wonder & Snarky Puppy)' },
    units: [
      {
        title: { de: 'Geheimwaffen für „unirdische“ Farben: maj7♯5, m(maj7), 7♯9→7♭9 & Lydisch', en: 'Secret Weapons for Otherworldly Color: maj7♯5, m(maj7), 7♯9→7♭9 & Lydian' },
        transposeBody: true,
        body: {
          de: `<p>Wenn moderner Neo-Soul, Future-Soul und Jazz-Fusion (<b>Hiatus Kaiyote</b>, <b>Thundercat</b>, <b>Snarky Puppy</b>, <b>Jacob Collier</b>, <b>Stevie Wonder</b>) plötzlich traumhaft, psychedelisch oder außerirdisch klingen, stecken dahinter vier ganz konkrete Akkord-Geheimwaffen:</p>
               <ul>
                 <li><b><code>maj7♯5</code> (z. B. <code>Cmaj7♯5</code> = C – E – G♯ – [B]):</b> Ein E-Dur-Dreiklang über einem C-Bass! Stammt aus der 3. Stufe von <em>melodisch Moll</em> – klingt gleichzeitig lichtdurchflutet und verzaubert (Stevie Wonder, Robert Glasper, Studio Ghibli).</li>
                 <li><b><code>m(maj7)</code> (z. B. <code>Cm(maj7)</code> = C – E♭ – G – [B]):</b> Moll-Dreiklang mit großer Septime – filmisch, rätselhaft, „Noir-Soul“ (auch aus harmonisch/melodisch Moll).</li>
                 <li><b>Die „J-Dilla / R&amp;B“-Dominant-Reibung (<code>V7♯9 → V7♭9 → Imaj9</code>):</b> Erst beißt die <code>♯9</code> (Hendrix-Spannung!), kippt dann 2 Halbtöne tiefer auf <code>♭9</code> und schmilzt butterweich in die Quinte von <code>Imaj9</code>!</li>
                 <li><b>Lydisches Glitzern (<code>II/I</code> = <code>D/C</code>) + Medianten-<code>maj9</code>:</b> Ein einfacher Dur-Dreiklang einen Ganzton über dem Bass erzeugt sofort den schwerelosen <code>maj7♯11</code>-Fusion-Glanz!</li>
               </ul>`,
          en: `<p>When Future-Soul and modern Jazz-Fusion (<b>Hiatus Kaiyote</b>, <b>Thundercat</b>, <b>Snarky Puppy</b>, <b>Jacob Collier</b>, <b>Stevie Wonder</b>) suddenly sound psychedelic, dreamy, or otherworldly, four specific secret weapons are doing the heavy lifting:</p>
               <ul>
                 <li><b><code>maj7♯5</code> (e.g. <code>Cmaj7♯5</code> = C – E – G♯ – B):</b> An E major triad floating over a C bass! Born from degree 3 of <em>melodic minor</em> — radiant yet enchanted (Stevie Wonder, Glasper, Studio Ghibli).</li>
                 <li><b><code>m(maj7)</code> (e.g. <code>Cm(maj7)</code> = C – E♭ – G – B):</b> Minor triad + major seventh — mysterious, noir-soul drama.</li>
                 <li><b>The “J Dilla / R&amp;B” dominant squeeze (<code>V7♯9 → V7♭9 → Imaj9</code>):</b> First the gritty <code>♯9</code> bites, then drops to dark <code>♭9</code>, melting into the 5th of <code>Imaj9</code>!</li>
                 <li><b>Lydian shimmer (<code>II/I</code> = <code>D/C</code>) + Mediant <code>maj9</code>:</b> A plain major triad one whole step above the bass delivers instant weightless <code>maj7♯11</code> fusion glow!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Der magische maj7♯5-Wechsel (Stevie Wonder / Glasper Style)', en: 'The magical maj7♯5 shift (Stevie Wonder / Glasper style)' },
            toks: 'Imaj9 Imaj7#5 IVmaj9 iv6 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj9 – Cmaj7♯5 – Fmaj9 – Fm6 – Cmaj9 · So entsteht’s aus „I – IV – iv – I“: Zwischen Cmaj9 und Fmaj9 heben wir nur die Quinte G um 1 Halbton auf G♯ (Cmaj7♯5) – die Linie G → G♯ → A → A♭ → G erzeugt pure Gänsehaut!', en: 'Cmaj9 – Cmaj7♯5 – Fmaj9 – Fm6 – Cmaj9 · How it grows from “I – IV – iv – I”: Raise just the 5th G up to G♯ (Cmaj7♯5) before Fmaj9 — creating the mesmerizing inner line G → G♯ → A → A♭ → G!' }
          },
          {
            title: { de: 'R&B / Tom-Misch-Dominant-Würze: ii11 – V7♯9 – V7♭9 – Imaj9', en: 'R&B / Tom Misch dominant spice: ii11 – V7♯9 – V7♭9 – Imaj9' },
            toks: 'ii11:2 V7#9:1 V7b9:1 Imaj9:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm11 – G7♯9 – G7♭9 – Cmaj9 · So entsteht’s aus „ii – V – I“: G7 spaltet sich in 7♯9 → 7♭9 auf – höre die fallende Spannungslinie A♯ → A♭ → G in die Cmaj9!', en: 'Dm11 – G7♯9 – G7♭9 – Cmaj9 · How it grows from “ii – V – I”: Split G7 into 7♯9 → 7♭9 — hear the descending tension line A♯ → A♭ → G melt into Cmaj9!' }
          },
          {
            title: { de: 'Psychedelic Soul (Hiatus Kaiyote / Thundercat): i11 – i(maj7) – ♭VImaj9 – V7♯9 – i11', en: 'Psychedelic Soul (Hiatus Kaiyote / Thundercat): i11 – i(maj7) – ♭VImaj9 – V7♯9 – i11' },
            toks: 'i11 imaj7 bVImaj9 V7#9 i11',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm11 – Cm(maj7) – A♭maj9 – G7♯9 – Cm11: Geheimnisvolles Kippen von weichem Quart-Moll (Cm11) ins schillernde Cm(maj7), weiter zur warmen ♭VImaj9 und mit bissigem G7♯9 zurück!', en: 'Cm11 – Cm(maj7) – A♭maj9 – G7♯9 – Cm11: Hypnotic shift from cool quartal Cm11 into Noir Cm(maj7), blooming into A♭maj9 and snapping back via gritty G7♯9!' }
          },
          {
            title: { de: 'Modern Fusion / Lydian Dream: Imaj9 – II/I – ♭VImaj9 – ♭IIImaj9 – Imaj9', en: 'Modern Fusion / Lydian Dream: Imaj9 – II/I – ♭VImaj9 – ♭IIImaj9 – Imaj9' },
            toks: 'Imaj9 II@I bVImaj9 bIIImaj9 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj9 – D/C (Cmaj7♯11!) – A♭maj9 – E♭maj9 – Cmaj9: Verbindet lydischen Orgelpunkt-Glanz (D/C) mit chromatischen Medianten als konstante maj9-Klangflächen (Snarky-Puppy-/Jacob-Collier-Ästhetik)!', en: 'Cmaj9 – D/C (Cmaj7♯11!) – A♭maj9 – E♭maj9 – Cmaj9: Fuses Lydian pedal shimmer (D/C) with chromatic-mediant maj9 clouds (Snarky Puppy / Jacob Collier aesthetic)!' }
          }
        ]
      },
      {
        title: { de: 'Traum-Grooves zum Eintauchen: J Dilla, Moonchild, Erykah Badu & Cory Henry', en: 'Dream Grooves to Explore: J Dilla, Moonchild, Erykah Badu & Cory Henry' },
        transposeBody: true,
        body: {
          de: `<p>Hier sind fünf weitere unverwechselbare <b>Neo-Soul- &amp; Future-Soul-Progressionen</b>, die genau zeigen, wie <b>Chromatik, Medianten, Quart-Voicings und Backdoor-Tricks</b> im modernen R&amp;B und Fusion verschmelzen (Tipp: unbedingt mit <b>🎹 E-Piano / Rhodes</b> oder <b>☁️ Warmes Pad</b> anhören!):</p>
               <ul>
                 <li><b>Halbton-Schweben (Moonchild / FKJ / J Dilla):</b> Ein quartales <code>ii11</code> pendelt im Halbtonabstand zu <code>♭IImaj9</code> und <code>♭IIImaj9</code> – oben bleiben fast alle Töne als Scharnier liegen!</li>
                 <li><b>Dunkle <code>m9</code>-Medianten (Erykah Badu / Glasper):</b> <code>i9 → ♭vi9 → ♭vii9 → iv9</code> verbindet die düstere <em>Imperial-March</em>-Mediantbewegung (<code>i → ♭vi</code>) mit samtigen 9er-Akkorden – plötzlich nicht mehr bedrohlich, sondern purer Late-Night-Soul!</li>
                 <li><b>Trugschluss ins Licht (Cory Henry / Jacob Collier):</b> Eine vertraute <code>ii9 – V7♭9</code> löst nicht nach <code>I</code> auf, sondern bricht überraschend in <code>♭IIImaj9 → ♭VImaj9</code> auf und gleitet über <code>IV/V</code> heim!</li>
               </ul>`,
          en: `<p>Here are five more signature <b>Neo-Soul &amp; Future-Soul progressions</b> showing how <b>chromatic voice leading, mediants, quartal stacks, and backdoor cadences</b> fuse in modern R&amp;B (tip: switch to <b>🎹 Electric Piano / Rhodes</b> or <b>☁️ Warm Pad</b>!):</p>
               <ul>
                 <li><b>Half-step hover (Moonchild / FKJ / J Dilla):</b> Quartal <code>ii11</code> floats a semitone away to <code>♭IImaj9</code> and <code>♭IIImaj9</code> while shared upper tones anchor the groove!</li>
                 <li><b>Velvety <code>m9</code> mediants (Erykah Badu / Glasper):</b> <code>i9 → ♭vi9 → ♭vii9 → iv9</code> wraps the dark <em>Imperial March</em> mediant move (<code>i → ♭vi</code>) in lush 9th chords — transforming dread into pure late-night soul!</li>
                 <li><b>Deceptive burst of light (Cory Henry / Jacob Collier):</b> A familiar <code>ii9 – V7♭9</code> skips <code>I</code> and blooms unexpectedly into <code>♭IIImaj9 → ♭VImaj9</code> before gliding home via <code>IV/V</code>!</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Moonchild / FKJ / J-Dilla-Hover: ii11 – ♭IImaj9 – ii11 – ♭IIImaj9', en: 'Moonchild / FKJ / J Dilla hover: ii11 – ♭IImaj9 – ii11 – ♭IIImaj9' },
            toks: 'ii11 bIImaj9 ii11 bIIImaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm11 – D♭maj9 – Dm11 – E♭maj9: Der Bass pendelt nur 1 Halbton unter und über D, während gemeinsame Töne (F, C, G) oben wie Wolken stehen bleiben – pure Late-Night-Hypnose!', en: 'Dm11 – D♭maj9 – Dm11 – E♭maj9: The bass drifts just a semitone below and above D while shared tones (F, C, G) float overhead — pure late-night Rhodes magic!' }
          },
          {
            title: { de: 'Erykah-Badu / Glasper m9-Medianten: i9 – ♭vi9 – ♭vii9 – iv9', en: 'Erykah Badu / Glasper m9 mediants: i9 – ♭vi9 – ♭vii9 – iv9' },
            toks: 'i9 bvi9 bvii9 iv9',
            mode: 'min',
            sameTonic: true,
            transpose: true,
            desc: { de: 'Cm9 – A♭m9 – [B♭m9] – Fm9: Vier samtige m9-Klänge im Großterz-Mediant-Wechsel (Cm9 → A♭m9 teilt E♭ und [B♭]!) – dunkel, schwerelos und sofort ikonisch.', en: 'Cm9 – A♭m9 – B♭m9 – Fm9: Four silky m9 chords launching via a chromatic mediant (Cm9 → A♭m9 shares E♭ and B♭!) — dark, weightless, and unmistakable.' }
          },
          {
            title: { de: 'Cory-Henry / Jacob-Collier-Aufhellung: ii9 – V7♭9 – ♭IIImaj9 – ♭VImaj9 – IV/V – Imaj9', en: 'Cory Henry / Jacob Collier deceptive lift: ii9 – V7♭9 – ♭IIImaj9 – ♭VImaj9 – IV/V – Imaj9' },
            toks: 'ii9 V7b9 bIIImaj9 bVImaj9 IV@V Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm9 – G7♭9 – E♭maj9 – A♭maj9 – F/G – Cmaj9 · So entsteht’s aus „ii – V – I“: Statt direkt auf Cmaj9 zu landen, öffnet sich nach G7♭9 eine überraschende Medianten-Schleife (E♭maj9 → A♭maj9), die erst über Gospel-F/G nach Hause schwebt!', en: 'Dm9 – G7♭9 – E♭maj9 – A♭maj9 – F/G – Cmaj9 · How it grows from “ii – V – I”: Instead of landing straight on Cmaj9, G7♭9 blooms into a surprise mediant detour (E♭maj9 → A♭maj9) before gliding home via F/G!' }
          },
          {
            title: { de: 'Tom-Misch / Jordan-Rakei-Loop (Turnaround + Backdoor): Imaj9 – VI7♯9 – ii9 – V13 – iv6 – ♭VII13', en: 'Tom Misch / Jordan Rakei loop (Turnaround + Backdoor): Imaj9 – VI7♯9 – ii9 – V13 – iv6 – ♭VII13' },
            toks: 'Imaj9 VI7#9 ii9 V13 iv6 bVII13',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj9 – A7♯9 – Dm9 – G13 – Fm6 – [B♭13]: Verbindet den klassischen Jazz-Turnaround mit der warmen Backdoor-Auflösung (Fm6 – [B♭13] → zurück auf Cmaj9)!', en: 'Cmaj9 – A7♯9 – Dm9 – G13 – Fm6 – B♭13: Pairs a classic jazz turnaround with the lush backdoor return (Fm6 – B♭13 → back to Cmaj9)!' }
          },
          {
            title: { de: 'Kiefer / Herbie-Hancock-Quartal-Traum: I(4) – ♭VII(4) – ♭VI(4) – ♭VII(4) – II/I – Imaj9', en: 'Kiefer / Herbie Hancock quartal dream: I(4) – ♭VII(4) – ♭VI(4) – ♭VII(4) – II/I – Imaj9' },
            toks: 'Iq4 bVIIq4 bVIq4 bVIIq4 II@I Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C(4) – [B♭](4) – A♭(4) – [B♭](4) – D/C – Cmaj9: Reine Quart-Stapel gleiten ab- und aufwärts, blühen im lydischen D/C (Cmaj7♯11) auf und ruhen schließlich auf Cmaj9 aus.', en: 'C(4) – B♭(4) – A♭(4) – B♭(4) – D/C – Cmaj9: Pure quartal stacks glide down and back up, bloom through Lydian D/C (Cmaj7♯11), and settle warmly into Cmaj9.' }
          }
        ]
      }
    ]
  };

  L.caged = {
    id: 'caged',
    badge: 'gitarre',
    title: { de: 'Das CAGED-System (Gitarre)', en: 'The CAGED System (Guitar)' },
    units: [
      {
        title: { de: 'Fünf Formen – das ganze Griffbrett im Griff', en: 'Five Shapes Across the Entire Fretboard' },
        body: {
          de: `<p>Jeder Dur-Akkord lässt sich auf der Gitarre mit <b>fünf bekannten offenen Griffformen</b> verschieben: <b>C – A – G – E – D</b>. Am Hals schließen sie nahtlos aneinander an – immer in exakt dieser Reihenfolge!</p>
               <div class="callout tip"><strong>Praxis-Tipp für echte Gitarrenhände</strong>
               Die <b>E-Form</b> und die <b>A-Form</b> sind die klassischen Voll-Barré-Griffe. Die volle 6-Saiten-<b>G-Form</b> (und teils die C-Form) ist als kompletter Barré anatomisch sehr unbequem – Gitarristen greifen davon im Spielalltag fast immer nur <b>3 bis 4 Saiten</b> als kompakte Dreiklänge!</div>`,
          en: `<p>Every major chord maps across the guitar neck using <b>five familiar open shapes</b>: <b>C – A – G – E – D</b>. They connect seamlessly up the neck in that exact order!</p>
               <div class="callout tip"><strong>Real-world playing tip</strong>
               The <b>E-shape</b> and <b>A-shape</b> are standard full barre chords. The full 6-string <b>G-shape</b> (and often C-shape) is awkward as a full barre — guitarists almost always grab a comfortable <b>3- or 4-string subset</b> (triads) from it!</div>`
        },
        widget: 'caged'
      },
      {
        title: { de: 'Dreiklangsgruppen (Triads) & Umkehrungen auf den hohen Saiten', en: 'Triad Shapes & Inversions on the Top Strings' },
        body: {
          de: `<p>Schau dir die Stufen auf den <b>drei hohen Saiten (G – [B] – e)</b> an – dort stecken direkt alle drei Dreiklangs-Umkehrungen:</p>
               <ul>
                 <li><b>A-Form:</b> <code>1 – 3 – 5</code> (Grundstellung)</li>
                 <li><b>E-Form:</b> <code>3 – 5 – 1</code> (1. Umkehrung)</li>
                 <li><b>C-Form & D-Form:</b> <code>5 – 1 – 3</code> (2. Umkehrung, in D eine Oktave höher)</li>
               </ul>
               <p class="hint">Die G-Form hat auf G–[B]–e die Töne <code>1 – 3 – 1</code> (ohne Quinte) – deshalb greift man für vollständige Dreiklänge dort die Saiten D–G–[B] (<code>5 – 1 – 3</code>).</p>`,
          en: `<p>Look at the <b>top three strings (G – B – e)</b> — they give you every triad inversion cleanly:</p>
               <ul>
                 <li><b>A-shape:</b> <code>1 – 3 – 5</code> (root position)</li>
                 <li><b>E-shape:</b> <code>3 – 5 – 1</code> (1st inversion)</li>
                 <li><b>C-shape & D-shape:</b> <code>5 – 1 – 3</code> (2nd inversion)</li>
               </ul>
               <p class="hint">The G-shape puts <code>1 – 3 – 1</code> on G–B–e (no fifth), so for a full triad use strings D–G–B (<code>5 – 1 – 3</code>).</p>`
        },
        examples: [
          {
            title: { de: 'Dreiklang in drei Lagen (Umkehrungen)', en: 'Triad in three inversions' },
            toks: 'I I^1 I^2 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Beobachte im Live-View (Gitarre + Griffvariante 1–5), wie sich der Griff je nach Basston verschiebt.', en: 'Watch the Live View guitar diagram (try Grip variants 1–5) shift with each bass note.' }
          },
          {
            title: { de: 'Kadenz in einer Griffbrettlage', en: 'Cadence in one fretboard position' },
            toks: 'I IV V I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Mit Stimmführungs-Voicing bleiben die Akkordgriffe dicht beieinander am Hals.', en: 'Voice-leading keeps the grips close together along the neck.' }
          }
        ]
      }
    ]
  };

  // Automatically transpose key-dependent lesson explanations across all 12 keys
  [
    'chord_symbols', 'extensions', 'sus_add_six', 'voice_leading',
    'ii_v_i_maj', 'ii_v_chains', 'ii_v_i_min', 'secondary_dom',
    'dim_passing', 'tritone_sub', 'modal_interchange',
    'backdoor_cadence', 'line_cliches', 'jazz_blues', 'rhythm_royal',
    'gospel_harmony', 'coltrane_changes', 'negative_harmony',
    'chromatic_mediants', 'planing_structures', 'quartal_harmony',
    'pedal_upper', 'neosoul_grooves', 'neosoul_exotic',
    'counterpoint', 'modulation', 'reharmonization'
  ].forEach(id => {
    if (L[id] && L[id].units) {
      L[id].units.forEach(u => {
        if (typeof u.body !== 'function') u.transposeBody = true;
      });
    }
  });
})();
