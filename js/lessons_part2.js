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
               </ul>`,
          en: `<p>Always read a chord symbol from left to right:</p>
               <p><b>Root</b> (C) → <b>Quality</b> (m, °, +, sus) → <b>Seventh</b> (7, maj7) → <b>Extension</b> (9, 11, 13) → <b>Alteration</b> (♭5, ♯9) → <b>Bass note</b> (/E).</p>
               <ul>
                 <li>A plain <b>7</b> always means the <b>minor seventh</b>. Only <code>maj</code> makes the seventh major!</li>
                 <li>Numbers from <b>9</b> upward automatically include the 7th (<code>C9</code> = C7 + 9); <code>add9</code> omits the 7th.</li>
                 <li>A <b>slash</b> specifies the bass note: <code>C/E</code> = C major with E in the bass.</li>
               </ul>`
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
          de: `<p>Diese beiden Symbole werden oft verwechselt – dabei unterscheidet sie nur ein einziger Halbton:</p>
               <ul>
                 <li><b>Halbvermindert (<code>Cm7♭5</code> / <code>Cø</code>):</b> <code>1 – ♭3 – ♭5 – ♭7</code> (C – E♭ – G♭ – [B♭]). Ein verminderter Dreiklang + <em>kleine</em> Septime. Typisch als iiø in Moll und viiø in Dur.</li>
                 <li><b>Vollvermindert (<code>C°7</code>):</b> <code>1 – ♭3 – ♭5 – ♭♭7</code> (C – E♭ – G♭ – [B♭♭], klingt wie A). Drei kleine Terzen aufeinander – völlig symmetrisch!</li>
               </ul>`,
          en: `<p>These two symbols are easy to mix up, yet they differ by just one semitone:</p>
               <ul>
                 <li><b>Half-diminished (<code>Cm7♭5</code> / <code>Cø</code>):</b> <code>1 – ♭3 – ♭5 – ♭7</code> (C – E♭ – G♭ – B♭). Diminished triad + <em>minor</em> seventh.</li>
                 <li><b>Fully diminished (<code>C°7</code>):</b> <code>1 – ♭3 – ♭5 – ♭♭7</code> (C – E♭ – G♭ – B♭♭, sounds like A). Three stacked minor thirds — completely symmetrical!</li>
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
          de: `<p><b>Extensions (9, 11, 13)</b> verleihen Akkorden Farbe, ohne ihre harmonische Funktion zu verändern:</p>
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
          en: `<p><b>Extensions (9, 11, 13)</b> add color without changing chord function:</p>
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
            toks: 'V7 V9 V13 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'G7 → G9 → G13 → Cmaj7: Dieselbe Funktion, immer reichere Klangfarbe (achte im Stufen-Modus darauf, welche Töne weggelassen werden!).', en: 'G7 → G9 → G13 → Cmaj7: Same dominant function, richer color layer by layer (switch to Degrees mode to see which tones are kept!).' }
          },
          {
            title: { de: 'Alterierte Dominanten im Jazz: V7♭9 & V7♯5', en: 'Altered jazz dominants: V7♭9 & V7♯5' },
            toks: 'ii7 V7b9 Imaj7 ii7 V+7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7♭9 – Cmaj7, dann Dm7 – G7♯5 – Cmaj7: Vergleiche die verminderte ♭9-Spannung mit der schwebenden übermäßigen ♯5-Spannung!', en: 'Dm7 – G7♭9 – Cmaj7, then Dm7 – G7♯5 – Cmaj7: Compare the dark diminished ♭9 tension against the lifted augmented ♯5 tension!' }
          },
          {
            title: { de: 'Neunklänge in einer Kadenz', en: 'Ninth chords in a progression' },
            toks: 'Imaj9 vi9 ii9 V9 Imaj9',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Im Live-View siehst du den Grundton im Bass (gelb) und die farbigen Extensions oben in der rechten Hand (blau).', en: 'Watch the amber root in the bass clef and the colorful extensions in the right hand.' }
          },
          {
            title: { de: 'Hendrix-Akkord: I7♯9 – ♭III – IV', en: 'Hendrix chord: I7♯9 – ♭III – IV' },
            toks: 'I7#9 bIII IV',
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
               <p><b>add9</b> fügt einem Dreiklang die 9 hinzu (ohne Septime: C–E–G–D, typischer Akustik-Pop-Sound). <b>6</b> ergänzt die große Sexte (C–E–G–A: warmer, ruhiger Schlussklang).</p>
               <div class="callout song"><strong>Hör-Anker</strong><code>sus4 → Dur</code>: <em>Pinball Wizard</em> (The Who), <em>Crazy Little Thing Called Love</em> (Queen) · <code>add9</code>: <em>Every Breath You Take</em>, <em>Wonderwall</em>.</div>`,
          en: `<p><b>sus</b> (<em>suspended</em>) <b>replaces the third</b> with the 2nd (<code>sus2</code>: 1–2–5) or 4th (<code>sus4</code>: 1–4–5). Without a third, the chord is neither major nor minor — open and suspended.</p>
               <p>The 4th in <b>sus4</b> typically resolves down a semitone into the major third (<code>Csus4 → C</code>: F → E). <code>Vsus4 → V7 → I</code> is a timeless pre-ending move.</p>
               <p><b>add9</b> adds a 9th to a plain triad (no 7th: crisp pop shimmer). <b>6</b> adds the major 6th (warm, relaxed ending chord).</p>
               <div class="callout song"><strong>Song anchors</strong><code>sus4 → major</code>: <em>Pinball Wizard</em>, <em>Crazy Little Thing Called Love</em> · <code>add9</code>: <em>Every Breath You Take</em>, <em>Wonderwall</em>.</div>`
        },
        examples: [
          {
            title: { de: 'Sus-Spannung & Auflösung', en: 'Sus tension & resolution' },
            toks: 'I Isus4 I Isus2 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Csus4 – C – Csus2 – C: Höre, wie F nach E drängt, während D über C frei schwebt.', en: 'C – Csus4 – C – Csus2 – C: Hear F pull down to E while D floats freely over C.' }
          },
          {
            title: { de: 'Vsus4 vor dem Schluss', en: 'Vsus4 before the ending' },
            toks: 'I IV Vsus4 V7 I',
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
            toks: 'I V^1 vi vi7^3 IV I^1 ii7 V7 I',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – G/[B] – Am – Am7/G – F – C/E – Dm7 – G7 – C: Verfolge im Live-View den gelben Basston – er läuft Ton für Ton die Leiter abwärts!',
              en: 'C – G/B – Am – Am7/G – F – C/E – Dm7 – G7 – C: Watch the amber bass note walk smoothly down the entire scale!'
            }
          },
          {
            title: { de: 'Aufsteigender Bass zum Zielakkord', en: 'Ascending bass line' },
            toks: 'I I^1 IV V^1 I',
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
          de: `<p>Ein <b>Modus</b> entsteht, wenn du eine Durtonleiter auf einer anderen Stufe startest (genau wie a-Moll = C-Dur ab dem 6. Ton). Viel wichtiger für die Praxis ist aber der <b>Vergleich mit Dur oder Moll</b> – welcher <em>eine</em> Ton (der <b>Merkton</b>) verändert die Stimmung?</p>
               <ul>
                 <li><b>Ionisch:</b> = normales Dur (<code>1 2 3 4 5 6 7</code>)</li>
                 <li><b>Dorisch:</b> Moll + <b>große Sexte (6)</b> → cool, jazzig, hoffnungsvoll</li>
                 <li><b>Phrygisch:</b> Moll + <b>kleine Sekunde (♭2)</b> → spanisch, mystisch, dunkel</li>
                 <li><b>Lydisch:</b> Dur + <b>übermäßige Quarte (♯4)</b> → schwebend, träumerisch, Filmmusik</li>
                 <li><b>Mixolydisch:</b> Dur + <b>kleine Septime (♭7)</b> → rockig, bluesig, erdig</li>
                 <li><b>Äolisch:</b> = natürliches Moll (<code>1 2 ♭3 4 5 ♭6 ♭7</code>)</li>
                 <li><b>Lokrisch:</b> Moll + <b>♭2 und ♭5</b> → sehr instabil, düster</li>
               </ul>`,
          en: `<p>A <b>mode</b> starts a major scale on a different degree (just like A minor = C major from degree 6). Even more useful is comparing each mode to plain major or minor to spot its <b>characteristic note</b>:</p>
               <ul>
                 <li><b>Ionian:</b> = Major (<code>1 2 3 4 5 6 7</code>)</li>
                 <li><b>Dorian:</b> Minor + <b>major 6th (6)</b> → cool, jazzy, hopeful</li>
                 <li><b>Phrygian:</b> Minor + <b>minor 2nd (♭2)</b> → Spanish, dark, mysterious</li>
                 <li><b>Lydian:</b> Major + <b>raised 4th (♯4)</b> → floating, dreamy, cinematic</li>
                 <li><b>Mixolydian:</b> Major + <b>minor 7th (♭7)</b> → rocky, bluesy, groovy</li>
                 <li><b>Aeolian:</b> = Natural minor (<code>1 2 ♭3 4 5 ♭6 ♭7</code>)</li>
                 <li><b>Locrian:</b> Minor + <b>♭2 and ♭5</b> → unstable, tense</li>
               </ul>`
        },
        widget: 'scales_modes'
      },
      {
        title: { de: 'Modale Vamps & Song-Anker', en: 'Modal Vamps & Song Anchors' },
        body: {
          de: `<p>Modale Musik vermeidet klassische Leitton-Kadenzen zur Dur-Tonika und pendelt stattdessen zwischen dem <b>Grundakkord</b> und dem <b>Akkord mit dem Merkton</b> (ein „Vamp“):</p>
               <div class="callout song"><strong>Bekannte Hör-Anker</strong>
               • <b>Dorisch (i7 – IV7):</b> <em>So What</em> (Miles Davis), <em>Oye Como Va</em>, <em>Scarborough Fair</em><br>
               • <b>Lydisch (I – II):</b> <em>The Simpsons</em>-Titelmelodie, <em>E.T. / Flying Theme</em> (John Williams)<br>
               • <b>Mixolydisch (I – ♭VII – IV):</b> <em>Sweet Home Alabama</em>, <em>Norwegian Wood</em>, <em>Clocks</em></div>`,
          en: `<p>Modal harmony avoids pulling back to the parent major tonic; instead it grooves between the <b>home chord</b> and the <b>characteristic-note chord</b> (a “vamp”):</p>
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
            transpose: true,
            desc: { de: 'Cm7 – F7 (Töne aus [B♭]-Dur): Der Dur-Akkord IV7 enthält die große Sexte A (Merkton). Cool statt traurig!', en: 'Cm7 – F7 (notes of B♭ major): Major IV7 spotlights the characteristic major 6th (A).' }
          },
          {
            title: { de: 'Phrygisch: i – ♭II', en: 'Phrygian: i – ♭II' },
            toks: 'i bII',
            mode: 'min',
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
                 <li><b>Symmetrische & Jazz-Skalen:</b> <b>Ganzton</b> (Debussy, schwebend), <b>Vermindert</b> (8 Töne G–H), <b>Alteriert</b> & <b>Lydisch Dominant</b> (Modern Jazz).</li>
               </ul>`,
          en: `<p>Beyond major, minor, and the church modes lies a rich universe of scales:</p>
               <ul>
                 <li><b>Pentatonic (5 notes):</b> Zero half-step friction — <b>minor pentatonic</b> powers rock and blues, <b>major pentatonic</b> sounds bright and folk-like. Japanese pentatonics (<b>Hirajoshi, In-Sen, Kumoi, Yo</b>) weave in haunting half-steps.</li>
                 <li><b>Blues scale:</b> Minor pentatonic + <b>blue note (♭5)</b> — works across all chords of a 12-bar blues.</li>
                 <li><b>Phrygian dominant (5th mode of harmonic minor):</b> <code>1 ♭2 3 4 5 ♭6 ♭7</code> — Flamenco, Klezmer, and Middle Eastern music.</li>
                 <li><b>Double harmonic / Hungarian minor / Raga Todi / Pelog:</b> Iconic melodic colors from the Middle East, Balkans, India, and Java.</li>
                 <li><b>Symmetrical & Jazz scales:</b> <b>Whole-tone</b> (Debussy), <b>Diminished</b> (8-note W–H), <b>Altered</b> & <b>Lydian dominant</b>.</li>
               </ul>`
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
            toks: 'I7 IV7 I7 V7 IV7 I7',
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
               <div class="callout tip"><strong>Denk-Trick für Jazz-Standards</strong>
               Wenn dir in einem Song plötzlich ein <code>ii–V</code> aus einer fremden Tonart begegnet (z. B. <code>Gm7 – C7 → F</code> mitten in C-Dur), stelle dir den <b>Zielakkord kurzzeitig einfach als neue I</b> (bzw. bei Moll-Zielen wie <code>Am</code> als neue <b>i / vi-Tonika</b>) vor! Dann hast du das gewohnte <code>ii–V–I</code>-Muster sofort im Kopf – genau das vertiefen wir in der nächsten Lektion.</div>
               <div class="callout song"><strong>Hör-Anker</strong><em>Autumn Leaves</em>, <em>Fly Me to the Moon</em>, <em>Sunday Morning</em> (Maroon 5).</div>`,
          en: `<p>The <b>ii–V–I progression</b> (in C: <code>Dm7 – G7 – Cmaj7</code>) is the cornerstone of jazz and modern pop. Why does it feel so effortless?</p>
               <ul>
                 <li><b>Falling fifths in the bass:</b> D → G → C.</li>
                 <li><b>Guide-tone lines (3rds & 7ths):</b> From Dm7 to G7, <b>F</b> stays while <b>C drops to B</b>. From G7 to Cmaj7, <b>B</b> stays while <b>F drops to E</b>. Minimal half-step motion!</li>
               </ul>
               <div class="callout tip"><strong>Pro mental shortcut</strong>
               Whenever a jazz standard throws a non-diatonic <code>ii–V</code> at you (like <code>Gm7 – C7 → F</code> inside C major), simply imagine the <b>target chord as a temporary I</b> (or a temporary minor tonic <b>i / vi</b> for minor targets like <code>Am</code>)! Instantly the same familiar <code>ii–V–I</code> shape applies.</div>
               <div class="callout song"><strong>Song anchors</strong><em>Autumn Leaves</em>, <em>Fly Me to the Moon</em>, <em>Sunday Morning</em> (Maroon 5).</div>`
        },
        examples: [
          {
            title: { de: 'ii–V–I Grundform', en: 'Basic ii–V–I' },
            toks: 'ii7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7 – Cmaj7: Beobachte im Live-View (mit Musikalisch-Voicing!), wie sich oben immer nur ein Ton bewegt.', en: 'Dm7 – G7 – Cmaj7: Watch the Live View (Musical voicing) — only one upper note moves at a time!' }
          },
          {
            title: { de: 'Mit Neunklängen veredelt', en: 'Enriched with ninths' },
            toks: 'ii9 V9 Imaj9',
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
        title: { de: 'Vorher & Nachher: Jeder Zielakkord bekommt sein eigenes ii–V', en: 'Before & After: Preparing Any Target Chord' },
        body: {
          de: `<p>Du kannst vor <b>jeden beliebigen Zielakkord</b> eines Songs dessen eigenes kleines <code>ii–V</code> schalten („Zwischenkadenz“). <b>Der Trick dabei:</b> Du stellst dir den Zielakkord für einen kurzen Moment als deine neue <b>I</b> (bei einem Dur-Ziel) bzw. als Moll-Tonika <b>i / vi</b> (bei einem Moll-Ziel) vor und baust davor einfach sein reguläres <code>ii–V</code>:</p>
               <ul>
                 <li><b>Dur-Ziel (z. B. IV = F oder V = G):</b> F wird kurz als neue <code>I</code> gedacht → <code>ii7/IV – V7/IV → IV</code> (Gm7 – C7 → F).</li>
                 <li><b>Moll-Ziel (z. B. vi = Am oder ii = Dm):</b> Am wird kurz als neue Moll-Tonika gedacht und bekommt deshalb ein <b>halbvermindertes iiø</b> → <code>iiø/vi – V7/vi → vi</code> ([Bø7] – E7 → Am).</li>
               </ul>`,
          en: `<p>You can place a mini <code>ii–V</code> in front of <b>any target chord</b> in a song. <b>The mental trick:</b> briefly treat the target chord as your temporary <b>I</b> (for major targets) or temporary minor tonic <b>i / vi</b> (for minor targets), and play its regular <code>ii–V</code> right before it:</p>
               <ul>
                 <li><b>Major target (e.g. IV = F or V = G):</b> Think of F briefly as <code>I</code> → <code>ii7/IV – V7/IV → IV</code> (Gm7 – C7 → F).</li>
                 <li><b>Minor target (e.g. vi = Am or ii = Dm):</b> Think of Am briefly as a minor tonic, so it gets a <b>half-diminished iiø</b> → <code>iiø/vi – V7/vi → vi</code> (Bø7 – E7 → Am).</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vorher: schlichtes I → IV', en: 'Before: plain I → IV' },
            toks: 'Imaj7 IVmaj7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Fmaj7 – G7 – Cmaj7: Sauber, aber direkt.', en: 'Cmaj7 – Fmaj7 – G7 – Cmaj7: Clean and direct.' }
          },
          {
            title: { de: 'Nachher: mit ii–V zu IV (Dur-Ziel)', en: 'After: with ii–V to IV (major target)' },
            toks: 'Imaj7 ii7/IV V7/IV IVmaj7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Gm7 – C7 – Fmaj7 – G7 – Cmaj7: Gm7 – C7 schiebt elegant in Richtung F.', en: 'Cmaj7 – Gm7 – C7 – Fmaj7 – G7 – Cmaj7: Gm7 – C7 smoothly launches into F.' }
          },
          {
            title: { de: 'Nachher: mit iiø–V zu vi (Moll-Ziel)', en: 'After: with iiø–V to vi (minor target)' },
            toks: 'Imaj7 iiø/vi V7/vi vi7 ii7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – [Bø7] – E7 – Am7 – Dm7 – G7 – Cmaj7: Erst ein Moll-ii–V nach Am7, dann das große ii–V–I nach C.', en: 'Cmaj7 – Bø7 – E7 – Am7 – Dm7 – G7 – Cmaj7: A minor ii–V into Am7, followed by the main ii–V–I to C.' }
          },
          {
            title: { de: 'Kette: zwei ii–V hintereinander', en: 'Chain: back-to-back ii–V' },
            toks: 'ii7/ii V7/ii ii7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Em7 – A7 – Dm7 – G7 – Cmaj7: Reiner Quintfall E → A → D → G → C.', en: 'Em7 – A7 – Dm7 – G7 – Cmaj7: Pure falling fifths E → A → D → G → C.' }
          }
        ]
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
        body: {
          de: `<p>In Moll verändert sich die 2. Stufe: Statt <code>ii7</code> steht hier der <b>halbverminderte Akkord <code>iiø</code></b> (in c-Moll: <code>Dø7 = D – F – A♭ – C</code>). Die Dominante <code>V7</code> (<code>G7</code>) stammt aus harmonisch Moll und bringt den Leitton [B] mit.</p>
               <p><b>Geschmeidige Stimmführung:</b> Von <code>Dø7</code> zu <code>G7</code> bleiben D und F liegen, während A♭ → G und C → [B] je einen Halbton fallen. Von <code>G7</code> zu <code>Cm</code> bleibt G liegen, [B] steigt nach C und F fällt nach E♭!</p>`,
          en: `<p>In minor, degree 2 becomes <b>half-diminished <code>iiø</code></b> (in C minor: <code>Dø7 = D – F – A♭ – C</code>), while <code>V7</code> (<code>G7</code>) comes from harmonic minor with its leading tone B.</p>
               <p><b>Smooth voice leading:</b> From <code>Dø7</code> to <code>G7</code>, D and F hold while A♭ → G and C → B each drop a semitone. From <code>G7</code> to <code>Cm</code>, G holds while B rises to C and F drops to E♭!</p>`
        },
        examples: [
          {
            title: { de: 'ii–V–i in Moll (Grundform)', en: 'Minor ii–V–i (basic)' },
            toks: 'iiø V7 i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Dø7 – G7 – Cm: Der klassische Moll-Jazz-Schluss.', en: 'Dø7 – G7 – Cm: The signature minor jazz cadence.' }
          },
          {
            title: { de: 'Weicher Schluss mit i7 oder i6', en: 'Softer ending on i7 or i6' },
            toks: 'iiø V7 i6',
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
            toks: 'I V7/vi vi IV V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E7 – Am – F – G7 – C: E7 verleiht dem Wechsel ins Am sofort emotionale Spannung.', en: 'C – E7 – Am – F – G7 – C: E7 adds instant emotional pull into Am.' }
          },
          {
            title: { de: 'Leitton im Bass (1. Umkehrung)', en: 'Leading tone in the bass (1st inversion)' },
            toks: 'I V7/vi^1 vi V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E7/G♯ – Am – G7 – C: Der Leitton G♯ liegt direkt im Bass und steigt halbtonweise nach A.', en: 'C – E7/G♯ – Am – G7 – C: The leading tone G♯ sits right in the bass and climbs a half-step to A.' }
          },
          {
            title: { de: 'Doppeldominante: V7/V → V7 → I', en: 'Double dominant: V7/V → V7 → I' },
            toks: 'I IV V7/V V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – D7 – G7 – C: Zwei Dominanten im Quintfall hintereinander.', en: 'C – F – D7 – G7 – C: Two dominants chained in falling fifths.' }
          },
          {
            title: { de: 'Kette von Sekundärdominanten', en: 'Chain of secondary dominants' },
            toks: 'I V7/vi V7/ii V7/V V7 I',
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
            toks: 'I ii V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Dm – G7 – C: Die schlichte Grundversion.', en: 'C – Dm – G7 – C: The plain version.' }
          },
          {
            title: { de: 'Aufwärts: I – ♯I° – ii', en: 'Ascending: I – ♯I° – ii' },
            toks: 'I #I° ii V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C♯° – Dm – G7 – C: Der Bass klettert chromatisch C → C♯ → D.', en: 'C – C♯° – Dm – G7 – C: Chromatic bass climb C → C♯ → D.' }
          },
          {
            title: { de: 'Aufwärts zur Dominante: IV – ♯IV° – V', en: 'Ascending to V: IV – ♯IV° – V' },
            toks: 'I IV #IV° V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – F♯° – G7 – C: Typisch für Gospel, Blues und Jazz-Balladen (Bass F → F♯ → G).', en: 'C – F – F♯° – G7 – C: Classic gospel, blues, and jazz-ballad lift (bass F → F♯ → G).' }
          },
          {
            title: { de: 'Abwärts: iii – ♭III° – ii', en: 'Descending: iii – ♭III° – ii' },
            toks: 'I iii bIII° ii V7 I',
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
            toks: 'ii7 V7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – G7 – Cmaj7: Klassischer Quintfall im Bass (D → G → C).', en: 'Dm7 – G7 – Cmaj7: Classic fifths in the bass (D → G → C).' }
          },
          {
            title: { de: 'Nachher: V7 ersetzt durch ♭II7', en: 'After: V7 replaced by ♭II7' },
            toks: 'ii7 bII7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Dm7 – D♭7 – Cmaj7: Chromatisch fallender Bass (D → D♭ → C), oben bleiben F und [B] erhalten!', en: 'Dm7 – D♭7 – Cmaj7: Chromatic bass walkdown (D → D♭ → C) while F and B stay in place!' }
          },
          {
            title: { de: 'Im Turnaround + ersetzte Zwischendominante', en: 'Double tritone-sub turnaround' },
            toks: 'Imaj7 bIII7 ii7 bII7 Imaj7',
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
               • <code>♭VI – ♭VII – I</code> („Heldenkadenz“): <em>Super Mario Fanfare</em>, <em>With a Little Help from My Friends</em>, unzählige Film-Trailer!</div>`,
          en: `<p>With <b>modal interchange</b> you stay in your major key (e.g. C major) while borrowing chords from the <b>parallel minor</b> (C minor) for instant emotional depth:</p>
               <ul>
                 <li><b><code>iv</code> (Fm):</b> Minor subdominant — nostalgic, bittersweet (often right after <code>IV</code>!).</li>
                 <li><b><code>♭VI</code> (A♭):</b> Wide, cinematic, wondrous.</li>
                 <li><b><code>♭VII</code> (B♭):</b> Bold, rock-flavored lift into the tonic.</li>
                 <li><b><code>♭III</code> (E♭):</b> Dark, heroic major.</li>
               </ul>
               <div class="callout song"><strong>Song anchors</strong>
               • <code>IV → iv → I</code>: <em>Creep</em> (Radiohead), <em>In My Life</em> (Beatles)<br>
               • <code>♭VI – ♭VII – I</code> (“Hero cadence”): <em>Super Mario fanfare</em>, <em>With a Little Help from My Friends</em>, epic film scores!</div>`
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
            toks: 'I bVI bVII I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – A♭ – [B♭] – C: Episch, triumphierend und aus Rock & Filmmusik nicht wegzudenken.', en: 'C – A♭ – B♭ – C: Epic and triumphant — a staple of rock and film music.' }
          },
          {
            title: { de: 'Ganze Schatten-Kette: I – iv – ♭VI – ♭VII – I', en: 'Full borrowed chain: I – iv – ♭VI – ♭VII – I' },
            toks: 'I iv bVI bVII I',
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
            toks: 'Imaj7 iv7 bVII7 Imaj7',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Cmaj7 – Fm7 – [B♭7] – Cmaj7: Vergleiche dieses samtige Hineingleiten mit dem gewohnten G7 → C!', en: 'Cmaj7 – Fm7 – B♭7 – Cmaj7: Compare this velvety landing with a standard G7 → C!' }
          },
          {
            title: { de: 'Mit Dur-Subdominante davor: IV → iv7 → ♭VII7 → I', en: 'With major IV first: IV → iv7 → ♭VII7 → I' },
            toks: 'Imaj7 IVmaj7 iv7 bVII7 Imaj7',
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
                 <li><b>Moll-Line-Cliché (fallend):</b> <code>i – i(maj7) – i7 – i6</code> (z. B. <code>Cm – Cm(maj7) – Cm7 – Cm6</code>) – die Linie fällt chromatisch: <b>C → [B] → [B♭] → A</b>!</li>
                 <li><b>Dur-Line-Cliché (fallend):</b> <code>I – Imaj7 – I7 – IV</code> (z. B. <code>C – Cmaj7 – C7 – F</code>) – die Linie fällt <b>C → [B] → [B♭] → A</b> direkt in die Terz der Subdominante!</li>
                 <li><b>Dur-Line-Cliché (steigend):</b> <code>I – I+ – I6 – I7</code> – die Quinte klettert <b>G → G♯ → A → [B♭]</b>!</li>
               </ul>
               <div class="callout song"><strong>Weltberühmte Hör-Anker</strong>
               • <b>Dur fallend (<code>I – Imaj7 – I7 – IV</code>):</b> <em>Can't Take My Eyes Off You</em> (Frankie Valli), <em>My Way</em> (Frank Sinatra), <em>Something</em> (Beatles)!<br>
               • <b>Moll fallend (<code>i – i(maj7) – i7 – i6</code>):</b> <em>Stairway to Heaven</em> (Led Zeppelin), <em>My Funny Valentine</em>, <em>In a Sentimental Mood</em>, <em>James Bond</em>-Thema!</div>`,
          en: `<p>A <b>line cliché</b> is one of songwriting's most iconic devices: the chord (and often the bass) stays grounded while <b>a single inner voice glides chromatically semitone by semitone</b>!</p>
               <ul>
                 <li><b>Minor descending cliché:</b> <code>i – i(maj7) – i7 – i6</code> — one voice walks down: <b>C → B → B♭ → A</b>!</li>
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
            toks: 'I Imaj7 I7 IV iv I',
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
            toks: 'I I+ I6 I7 IV',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C+ – C6 – C7 – F: Die Quinte steigt chromatisch G → G♯ → A → [B♭] und mündet in F.', en: 'C – C+ – C6 – C7 – F: The fifth climbs chromatically G → G♯ → A → B♭ into F.' }
          }
        ]
      }
    ]
  };

  L.chromatic_mediants = {
    id: 'chromatic_mediants',
    badge: 'klassik',
    title: { de: 'Chromatische Medianten (Filmmusik-Farben)', en: 'Chromatic Mediants (Film-Score Colors)' },
    units: [
      {
        title: { de: 'Magische Terzsprünge statt Quintfall', en: 'Magical Third-Moves Instead of Fifths' },
        transposeBody: true,
        body: {
          de: `<p>Warum klingen Soundtracks wie <em>Star Wars</em>, <em>Herr der Ringe</em> oder <em>Inception</em> so episch und geheimnisvoll? Ihr Lieblingswerkzeug sind <b>chromatische Medianten</b>: Zwei Akkorde desselben Geschlechts (meist Dur → Dur oder Moll → Moll), deren Grundtöne eine <b>große oder kleine Terz</b> auseinanderliegen!</p>
               <ul>
                 <li><b><code>I → ♭VI</code> (z. B. C → A♭):</b> Groß, heldenhaft, weit (gemeinsamer Ton: C).</li>
                 <li><b><code>I → III</code> (z. B. C → E):</b> Strahlend, staunend, plötzlich aufgehendes Licht (gemeinsamer Ton: E).</li>
                 <li><b><code>I → ♭III</code> (z. B. C → E♭):</b> Abenteuerlich, mysteriös, düsterer Glanz (gemeinsamer Ton: G).</li>
                 <li><b><code>i → ♭vi</code> oder <code>i → ♭iii</code> (z. B. Cm → E♭m):</b> Dunkel, unheimlich (<em>Imperial March</em> / Darth Vader!).</li>
               </ul>
               <p><b>Das Geheimnis:</b> Obwohl der neue Akkord gar nicht zur Tonart gehört, verbindet <b>genau ein gemeinsamer Ton</b> beide Welten nahtlos!</p>`,
          en: `<p>Why do scores like <em>Star Wars</em>, <em>Lord of the Rings</em>, and Hans Zimmer themes feel so grand and otherworldly? Their secret weapon is <b>chromatic mediants</b>: two chords of the same quality (major → major or minor → minor) whose roots sit a <b>major or minor third apart</b>!</p>
               <ul>
                 <li><b><code>I → ♭VI</code> (e.g. C → A♭):</b> Heroic, vast (shared tone: C).</li>
                 <li><b><code>I → III</code> (e.g. C → E):</b> Radiant, wondrous (shared tone: E).</li>
                 <li><b><code>I → ♭III</code> (e.g. C → E♭):</b> Adventurous, mysterious (shared tone: G).</li>
                 <li><b><code>i → ♭vi</code> (e.g. Cm → A♭m):</b> Ominous, dark (<em>Imperial March</em>!).</li>
               </ul>
               <p><b>The magic trick:</b> Even though the chord comes from outside the key, <b>one shared common tone</b> glues the two worlds seamlessly together!</p>`
        },
        examples: [
          {
            title: { de: 'Heldenhaft & weit: I – ♭VI – I – III', en: 'Heroic & wondrous: I – ♭VI – I – III' },
            toks: 'I bVI I III',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – A♭ – C – E: Spüre den magischen Farbenwechsel – jedes Mal bleibt genau ein gemeinsamer Ton liegen!', en: 'C – A♭ – C – E: Feel the cinematic color shift — one common tone stays anchored every time!' }
          },
          {
            title: { de: 'Abenteuer-Kette: I – ♭III – ♭VI – I', en: 'Adventure loop: I – ♭III – ♭VI – I' },
            toks: 'I bIII bVI I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – E♭ – A♭ – C: Typische Fantasy- und Sci-Fi-Filmmusik-Wendung.', en: 'C – E♭ – A♭ – C: Classic fantasy and sci-fi film-score progression.' }
          },
          {
            title: { de: 'Düster (Imperial-Vibe): i – ♭vi – i', en: 'Dark (Imperial vibe): i – ♭vi – i' },
            toks: 'i bvi i bVI V',
            mode: 'min',
            transpose: true,
            desc: { de: 'Cm – A♭m – Cm – A♭ – G: Zwei Moll-Akkorde im Großterz-Abstand erzeugen sofort düstere Spannung.', en: 'Cm – A♭m – Cm – A♭ – G: Two minor chords a major third apart create instant dark drama.' }
          }
        ]
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
            toks: 'I vi IV@V V I',
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
                 <li><b>Enharmonische Modulation über <code>°7</code>:</b> Weil ein vollverminderter Septakkord symmetrisch ist (<code>C♯°7 = E°7 = G°7 = [B♭°7]</code>), kann jeder seiner 4 Töne als Leitton in eine <em>andere</em> Tonart auflösen – so springst du mit einem einzigen Akkord in weit entfernte Tonarten!</li>
               </ol>`,
          en: `<p>A well-placed <b>modulation (key change)</b> lifts a song onto a whole new emotional level. Three essential techniques appear everywhere:</p>
               <ol>
                 <li><b>Pivot-chord modulation (smooth):</b> Use a chord shared by <em>both</em> keys (e.g. <code>Am</code> = vi in C major AND ii in G major), then resolve via the new <code>V7 → I</code> (<code>D7 → G</code>)!</li>
                 <li><b>Direct modulation (“Truck Driver’s Gear Change”):</b> For the final chorus, jump straight up a <b>semitone or whole tone</b> (<em>Livin’ on a Prayer</em>, <em>Love on Top</em>, <em>My Heart Will Go On</em>), optionally preceded by the new V7!</li>
                 <li><b>Enharmonic modulation via <code>°7</code>:</b> Because a diminished 7th chord is symmetrical (<code>C♯°7 = E°7 = G°7 = B♭°7</code>), any of its 4 notes can act as a leading tone into a completely distant key!</li>
               </ol>`
        },
        examples: [
          {
            title: { de: 'Pivot-Modulation: C-Dur → G-Dur (über Am)', en: 'Pivot modulation: C major → G major (via Am)' },
            toks: 'I IV vi V7/V V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – Am (Pivot: vi in C = ii in G!) – D7 (neues V7) – G (neue Tonika!).', en: 'C – F – Am (pivot: vi in C = ii in G!) – D7 (new V7) – G (new tonic!).' }
          },
          {
            title: { de: 'Pop-Refrain-Rückung (+1 Ganzton über neue V7)', en: 'Pop chorus lift (+1 whole tone via new V7)' },
            toks: 'I V vi IV V7/II II',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – G – Am – F – A7 (neue Dominante!) – D (plötzlicher Energieschub einen Ganzton höher!).', en: 'C – G – Am – F – A7 (new dominant!) – D (instant energy boost a whole tone higher!).' }
          },
          {
            title: { de: 'Überraschung über °7 in eine entfernte Tonart', en: 'Surprise modulation via °7 to a distant key' },
            toks: 'I #I°7 bVI',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – C♯°7 (= G°7!) – A♭: Statt nach Dm aufzulösen, nutzt man das G in C♯°7 als Leitton nach A♭-Dur!', en: 'C – C♯°7 (= G°7!) – A♭: Instead of resolving to Dm, the G inside C♯°7 pulls straight into A♭ major!' }
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
            toks: 'i bII^1 i^2 V7 i',
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
            toks: 'i bVIger6 i^2 V7 i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: 'Cm – A♭dt+6 (A♭–C–E♭–F♯) – Cm/G – G7 – Cm: Achte im Live-View auf die korrekte Notation mit F♯ statt G♭!', en: 'Cm – A♭ger+6 (A♭–C–E♭–F♯) – Cm/G – G7 – Cm: Notice the proper F♯ spelling in the staff!' }
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
    'backdoor_cadence', 'line_cliches', 'chromatic_mediants',
    'pedal_upper', 'modulation'
  ].forEach(id => {
    if (L[id] && L[id].units) {
      L[id].units.forEach(u => {
        if (typeof u.body !== 'function') u.transposeBody = true;
      });
    }
  });
})();
