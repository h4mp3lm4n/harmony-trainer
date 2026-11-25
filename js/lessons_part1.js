/* Curriculum Part 1: Start, Basics, Minor Harmony, Cadences & Circle of Fifths */
(function () {
  MT.CHAPTERS = [
    { id: 'start', title: { de: 'Start', en: 'Start' }, lessons: ['welcome'] },
    {
      id: 'basics',
      title: { de: 'Grundlagen – Hören & Bauen', en: 'Basics – Hear & Build' },
      lessons: [
        'scales_basic', 'triads', 'degrees_functions', 'roman_numerals',
        'minor_harmony', 'cadences', 'intervals', 'notation'
      ]
    },
    {
      id: 'circle',
      title: { de: 'Quintenzirkel', en: 'Circle of Fifths' },
      lessons: ['circle_build', 'circle_apply']
    },
    {
      id: 'chords',
      title: { de: 'Akkorde, Voicings & Extensions', en: 'Chords, Voicings & Extensions' },
      lessons: ['chord_symbols', 'extensions', 'sus_add_six', 'voice_leading']
    },
    {
      id: 'scales',
      title: { de: 'Skalen & Modi', en: 'Scales & Modes' },
      lessons: ['modes', 'exotic_scales']
    },
    {
      id: 'adv_jazz',
      title: { de: 'Jazz-, Blues- & Gospel-Harmonik', en: 'Jazz, Blues & Gospel Harmony' },
      lessons: [
        'ii_v_i_maj', 'ii_v_chains', 'ii_v_i_min',
        'secondary_dom', 'dim_passing', 'tritone_sub',
        'jazz_blues', 'gospel_harmony',
        'rhythm_royal', 'coltrane_changes'
      ]
    },
    {
      id: 'adv_color',
      title: { de: 'Klangfarben, Filmmusik & Moderne', en: 'Color, Film & Modern Harmony' },
      lessons: [
        'line_cliches', 'pedal_upper', 'planing_structures',
        'modal_interchange', 'backdoor_cadence', 'chromatic_mediants',
        'quartal_harmony', 'negative_harmony'
      ]
    },
    {
      id: 'adv_neosoul',
      title: { de: 'Neo-Soul, R&B & Exotische Groove-Sounds', en: 'Neo-Soul, R&B & Exotic Groove Sounds' },
      lessons: [
        'neosoul_grooves', 'neosoul_exotic'
      ]
    },
    {
      id: 'adv_craft',
      title: { de: 'Stimmführung, Klassik & Reharmonisierung', en: 'Counterpoint, Classical & Reharmonization' },
      lessons: [
        'counterpoint', 'modulation', 'neapolitan', 'reharmonization'
      ]
    },
    {
      id: 'guitar',
      title: { de: 'Gitarre (CAGED)', en: 'Guitar (CAGED)' },
      lessons: ['caged']
    }
  ];

  MT.LESSONS = MT.LESSONS || {};

  MT.LESSONS.welcome = {
    id: 'welcome',
    badge: 'start',
    title: { de: 'Willkommen – So funktioniert der Trainer', en: 'Welcome – How This Trainer Works' },
    units: [
      {
        title: { de: 'Lernen in kleinen Happen', en: 'Learning in Bite-Sized Steps' },
        body: {
          de: `<p>Dieser Trainer führt dich Schritt für Schritt vom ersten Klang bis zur fortgeschrittenen Harmonielehre – direkt im Browser auf Handy, Tablet oder Computer.</p>
               <div class="callout tip"><strong>Tipp für den Einstieg</strong>Du musst keine Noten lesen können, um loszulegen! Starte zum Verstehen gern in <b>C-Dur</b> (keine Vorzeichen – die Muster sind am leichtesten zu erkennen). Sobald du oben eine andere Tonart wählst, passen sich alle Erklärungen, Tabellen, Umkehrungen und Hörbeispiele automatisch an!</div>
               <ul>
                 <li><strong>Jeder Akkord klingt sofort:</strong> Tippe ein beliebiges Akkordfeld an, um es zu hören und unten im <b>Live-View</b> auf Klaviatur, im Klaviersystem sowie auf Gitarre und Ukulele zu sehen.</li>
                 <li><strong>Interaktive Klaviatur:</strong> Jede Taste im Live-View ist anklickbar – probiere Töne direkt aus!</li>
                 <li><strong>Deutsche vs. internationale Schreibweise (<code>H / B</code> ↔ <code>B / B♭</code>):</strong> Auf Deutsch nutzt der Trainer automatisch die deutsche Schreibweise (<code>H / B</code>), auf Englisch automatisch die internationale (<code>B / B♭</code>). Möchtest du auch auf Deutsch lieber international mit <code>B / B♭</code> arbeiten (wie in vielen Pop- und Jazz-Büchern), stelle oben rechts einfach auf <b>B / B♭</b> um.</li>
               </ul>`,
          en: `<p>This trainer guides you step by step from your first chord to advanced harmony — right in your browser on phone, tablet, or desktop.</p>
               <div class="callout tip"><strong>Getting started</strong>You don't need to read sheet music to begin! Starting in <b>C major</b> (no accidentals) makes patterns easiest to grasp — and whenever you pick another key at the top, all explanations, tables, inversions, and audio examples transpose automatically!</div>
               <ul>
                 <li><strong>Every chord sounds immediately:</strong> Tap any chord tile to hear it and inspect it in the <b>Live View</b> below on piano, grand staff, guitar, and ukulele.</li>
                 <li><strong>Interactive piano:</strong> Click or tap any key in the Live View to hear individual notes.</li>
                 <li><strong>International vs. German notation (<code>B / B♭</code> ↔ <code>H / B</code>):</strong> English automatically uses international <code>B / B♭</code> while German defaults to <code>H / B</code> — you can toggle the top-right button anytime.</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Sofort ausprobieren: Die bekannteste Pop-Folge', en: 'Try it right away: The classic pop progression' },
            toks: 'I V vi IV',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – G – Am – F: Tippe einzelne Felder an oder klicke auf ▶ Hören. Achte unten auf die Klaviatur: Der gelbe Ton ist der Bass, die blauen Töne sind die rechte Hand.',
              en: 'C – G – Am – F: Tap individual tiles or hit ▶ Listen. Watch the piano below: amber is the bass note, blue is the right-hand voicing.'
            }
          }
        ]
      },
      {
        title: { de: 'Werkzeuge & Voicings', en: 'Tools & Voicings' },
        body: {
          de: `<ul>
                 <li><b>🎛 Übungstool:</b> Spiele eigene oder fertige Progressionen mit Taktanzeige, Vorzähler, Metronom, automatischer Modulation (Quintenzirkel) und Web MIDI.</li>
                 <li><b>🎯 Gehörbildung & Quiz:</b> Trainiere Dreiklänge, Vierklänge, Intervalle, Kadenzen und baue Akkorde selbst auf der Klaviatur.</li>
                 <li><b>🎸 Akkordtabelle & ⭕ Quintenzirkel:</b> Schnelles Nachschlagen für Klavier, Gitarre und Ukulele.</li>
               </ul>
               <h4>Welche Voicings gibt es?</h4>
               <p>In den Grundlagen zeigen wir standardmäßig die <b>Grundstellung (Schulbuch)</b>, damit Umkehrungen dich nicht verwirren. Bei den <b>Stimmführungs-Modi</b> bestimmst du die Startlage des ersten Akkords (Grundstellung, 1. oder 2. Umkehrung – oder alle 3 im Zyklus), und alle Folgeakkorde bewegen sich danach automatisch mit <b>minimaler Fingerbewegung</b> (echtes Voice Leading)!</p>
               <div class="callout tip"><strong>Wichtiger Hör-Tipp: Klingt eine Akkordfolge einmal komisch?</strong>
               Wenn dir ein Hörbeispiel in der aktuellen Einstellung etwas sperrig, sprunghaft oder ungewohnt vorkommt, schalte unten in der Live-View-Leiste einfach durch die <b>verschiedenen Lagen / Umkehrungen</b> (und Stimmführungs-Modi)! Dieselben Akkorde können in einer anderen Lage oder mit anderem Top-Ton plötzlich viel geschmeidiger, voller und musikalischer klingen.</div>`,
          en: `<ul>
                 <li><b>🎛 Practice Tool:</b> Play presets or custom progressions with beat grid, count-in, metronome, automatic key modulation, and Web MIDI.</li>
                 <li><b>🎯 Ear Training & Quiz:</b> Train your ear on triads, 7th chords, intervals, cadences, and build chords yourself on the piano.</li>
                 <li><b>🎸 Chord Table & ⭕ Circle of Fifths:</b> Quick reference for piano, guitar, and ukulele.</li>
               </ul>
               <h4>How do the voicing modes work?</h4>
               <p>Basic lessons start in <b>Root position</b> so chord building blocks stay crystal clear. In the <b>Voice-leading modes</b> you pick the starting inversion of the first chord (root, 1st, 2nd — or cycle through all 3), and every following chord moves with <b>minimal hand motion</b>!</p>
               <div class="callout tip"><strong>Important listening tip: Does a progression ever sound a bit odd?</strong>
               If a listening example feels clunky, jumpy, or slightly off in the current setting, try switching through the <b>different inversions / voicing positions</b> in the Live View bar below! The exact same chords often sound dramatically smoother, richer, and more natural in another position.</div>`
        }
      }
    ]
  };

  MT.LESSONS.scales_basic = {
    id: 'scales_basic',
    badge: 'basis',
    title: { de: 'Tonleitern: Dur & Moll', en: 'Scales: Major & Minor' },
    units: [
      {
        title: { de: 'Halbton, Ganzton & die Durtonleiter', en: 'Semitone, Whole Tone & Major Scale' },
        body: {
          de: `<p>Der <b>Halbton (H)</b> ist der kleinste Abstand am Klavier: von einer Taste zur unmittelbar nächsten (egal ob weiß oder schwarz). Zwei Halbtöne sind ein <b>Ganzton (G)</b>. Beispiel: C → D ist ein Ganzton (C♯ liegt dazwischen), E → F ist ein Halbton (keine schwarze Taste dazwischen).</p>
               <p>Jede <b>Durtonleiter</b> folgt der festen Formel <b>G – G – H – G – G – G – H</b>. Startest du auf C, brauchst du nur weiße Tasten: <code>C – D – E – F – G – A – [B] – C</code>.</p>
               <div class="callout"><strong>Schritt für Schritt: So entsteht G-Dur (mit der Formel G–G–H–G–G–G–H)</strong>
               Starte auf <b>G</b> und prüfe jeden einzelnen Schritt am Klavier:
               <ol style="margin:6px 0 6px 18px;padding:0">
                 <li><b>G → A</b> = Ganzton (<b>G</b> ✓ – G♯ liegt dazwischen)</li>
                 <li><b>A → [B]</b> = Ganzton (<b>G</b> ✓ – A♯/[B♭] liegt dazwischen)</li>
                 <li><b>[B] → C</b> = Halbton (<b>H</b> ✓ – keine schwarze Taste dazwischen!)</li>
                 <li><b>C → D</b> = Ganzton (<b>G</b> ✓)</li>
                 <li><b>D → E</b> = Ganzton (<b>G</b> ✓)</li>
                 <li><b>E → F♯</b> = Ganzton (<b>G</b> ✓) – <em>Achtung!</em> Von E nach F wäre es nur ein Halbton. Weil die Formel hier aber ein <b>G</b> verlangt, erhöhen wir F um einen Halbton auf die schwarze Taste <b>F♯</b>!</li>
                 <li><b>F♯ → G</b> = Halbton (<b>H</b> ✓ – genau der letzte Halbtonschritt zurück zum Grundton G!)</li>
               </ol>
               Ergebnis: <b>G – A – [B] – C – D – E – F♯ – G</b> (genau <b>1 Kreuz: F♯</b>).</div>
               <div class="callout tip"><strong>Merksatz zur Schreibweise</strong>In jeder 7-stufigen Tonleiter kommt jeder Buchstabe (C D E F G A [B]) genau <b>einmal</b> vor. Deshalb heißt der 7. Ton in G-Dur <b>F♯</b> und nicht G♭ (sonst gäbe es gar kein F und zweimal G!).</div>`,
          en: `<p>A <b>semitone (H)</b> is the smallest distance on the piano: from one key to the very next key (white or black). Two semitones make a <b>whole tone (W)</b>. For example, C → D is a whole tone (C♯ sits between), while E → F is a semitone.</p>
               <p>Every <b>major scale</b> follows the fixed formula <b>W – W – H – W – W – W – H</b>. Starting on C uses only white keys: <code>C – D – E – F – G – A – B – C</code>.</p>
               <div class="callout"><strong>Step by step: Building G major (with W–W–H–W–W–W–H)</strong>
               Start on <b>G</b> and check each step on the keyboard:
               <ol style="margin:6px 0 6px 18px;padding:0">
                 <li><b>G → A</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>A → B</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>B → C</b> = Half step (<b>H</b> ✓ — no black key in between!)</li>
                 <li><b>C → D</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>D → E</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>E → F♯</b> = Whole tone (<b>W</b> ✓) — <em>Watch out!</em> E to F is only a half step, so to satisfy the <b>W</b> in the formula we raise F up a semitone to <b>F♯</b>!</li>
                 <li><b>F♯ → G</b> = Half step (<b>H</b> ✓ — lands cleanly back on G!)</li>
               </ol>
               Result: <b>G – A – B – C – D – E – F♯ – G</b> (exact <b>1 sharp: F♯</b>).</div>
               <div class="callout tip"><strong>Spelling rule</strong>In any 7-note scale each letter (C D E F G A B) appears exactly <b>once</b>. That is why the 7th note of G major is <b>F♯</b>, not G♭ (otherwise F would be missing and G would appear twice!).</div>`
        },
        widget: 'scales_basic'
      },
      {
        title: { de: 'Moll: Dur ab der 6. Stufe', en: 'Minor: Major from the 6th Degree' },
        body: {
          de: `<p><b>Natürlich Moll</b> ist gar keine völlig neue Tonleiter: Starte einfach auf der <b>6. Stufe</b> einer Durtonleiter (oder gehe 3 Halbtöne nach unten). C-Dur ab A ergibt <code>A – [B] – C – D – E – F – G – A</code> = <b>a-Moll</b>. Dadurch verschiebt sich die Schrittfolge zur Moll-Formel: <b>G – H – G – G – H – G – G</b>.</p>
               <div class="callout"><strong>Schritt für Schritt: So entsteht d-Moll (und warum F-Dur ein [B♭] hat!)</strong>
               Wende die Moll-Formel <b>G – H – G – G – H – G – G</b> ab dem Ton <b>D</b> an:
               <ol style="margin:6px 0 6px 18px;padding:0">
                 <li><b>D → E</b> = Ganzton (<b>G</b> ✓)</li>
                 <li><b>E → F</b> = Halbton (<b>H</b> ✓ – keine schwarze Taste zwischen E und F!)</li>
                 <li><b>F → G</b> = Ganzton (<b>G</b> ✓)</li>
                 <li><b>G → A</b> = Ganzton (<b>G</b> ✓)</li>
                 <li><b>A → [B♭]</b> = Halbton (<b>H</b> ✓) – <em>Achtung!</em> Von A nach [B] wäre es ein Ganzton. Weil die Moll-Formel hier aber ein <b>H</b> verlangt, erniedrigen wir [B] um einen Halbton auf <b>[B♭]</b>! (Und es heißt [B♭], nicht A♯, weil das A schon vergeben ist.)</li>
                 <li><b>[B♭] → C</b> = Ganzton (<b>G</b> ✓ – passt perfekt!)</li>
                 <li><b>C → D</b> = Ganzton (<b>G</b> ✓ – zurück auf D!)</li>
               </ol>
               Ergebnis: <b>D – E – F – G – A – [B♭] – C – D</b> (genau <b>1 ♭-Vorzeichen: [B♭]</b>).<br>
               <b>Die Brücke zu F-Dur:</b> Spielst du exakt dieselben 7 Töne einfach ab dem 3. Ton (<b>F</b>), erhältst du <b>F – G – A – [B♭] – C – D – E – F = F-Dur</b>! Deshalb teilen sich <b>F-Dur und d-Moll</b> genau dieses eine Vorzeichen <b>[B♭]</b>.</div>
               <div class="callout"><strong>Wichtiger Begriffsunterschied (DE vs. EN)</strong>
               • <b>Relative Tonarten</b> (im Deutschen oft „Paralleltonarten“): gleiche Töne/Vorzeichen, anderer Grundton → C-Dur ↔ a-Moll, F-Dur ↔ d-Moll.<br>
               • <b>Gleichnamige Tonarten</b> (engl. <em>parallel keys</em>): gleicher Grundton, anderes Tongeschlecht → C-Dur ↔ c-Moll.</div>`,
          en: `<p><b>Natural minor</b> is not a completely new scale: simply start on the <b>6th degree</b> of a major scale (3 semitones down). C major starting on A gives <code>A – B – C – D – E – F – G – A</code> = <b>A minor</b>, shifting the step pattern to the minor formula: <b>W – H – W – W – H – W – W</b>.</p>
               <div class="callout"><strong>Step by step: Building D minor (and why F major has a B♭!)</strong>
               Apply the minor formula <b>W – H – W – W – H – W – W</b> starting on <b>D</b>:
               <ol style="margin:6px 0 6px 18px;padding:0">
                 <li><b>D → E</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>E → F</b> = Half step (<b>H</b> ✓ — no black key between E and F!)</li>
                 <li><b>F → G</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>G → A</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>A → B♭</b> = Half step (<b>H</b> ✓) — <em>Watch out!</em> A to B is a whole tone, so to get the required <b>H</b> we lower B by a semitone to <b>B♭</b>! (Named B♭, not A♯, so every letter appears once.)</li>
                 <li><b>B♭ → C</b> = Whole tone (<b>W</b> ✓)</li>
                 <li><b>C → D</b> = Whole tone (<b>W</b> ✓)</li>
               </ol>
               Result: <b>D – E – F – G – A – B♭ – C – D</b> (exact <b>1 flat: B♭</b>).<br>
               <b>The bridge to F major:</b> Start those exact same 7 notes on the 3rd note (<b>F</b>) and you get <b>F – G – A – B♭ – C – D – E – F = F major</b>! That is why <b>F major and D minor</b> share that single flat <b>B♭</b>.</div>
               <div class="callout"><strong>Relative vs. Parallel keys</strong>
               • <b>Relative keys</b> share the same notes and key signature (C major ↔ A minor, F major ↔ D minor).<br>
               • <b>Parallel keys</b> share the same root but change mode (C major ↔ C minor).</div>`
        },
        examples: [
          {
            title: { de: 'Stufenakkorde in Dur', en: 'Diatonic chords in major' },
            toks: 'I ii iii IV V vi vii°',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'Über jedem Ton der Durtonleiter entsteht ein Dreiklang aus leitereigenen Tönen. Höre den hellen Gesamtcharakter.',
              en: 'Building a triad on each scale degree produces the diatonic chords of major. Hear the bright overall character.'
            }
          },
          {
            title: { de: 'Stufenakkorde in natürlich Moll', en: 'Diatonic chords in natural minor' },
            toks: 'i ii° bIII iv v bVI bVII',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'In c-Moll: Cm – D° – E♭ – Fm – Gm – A♭ – [B♭] – exakt die Akkorde von E♭-Dur, nur ab der 6. Stufe! Hinweis: In moderner Pop-/Jazz-Schreibweise schreibt man ♭III, ♭VI, ♭VII (gemessen an Dur), in der Klassik oft einfach III, VI, VII.',
              en: 'In C minor: Cm – D° – E♭ – Fm – Gm – A♭ – B♭ — the exact chords of E♭ major starting on degree 6. Modern pop/jazz writes ♭III, ♭VI, ♭VII (measured from major), while classical theory often omits the ♭.'
            }
          }
        ]
      },
      {
        title: { de: 'Harmonisch & Melodisch Moll', en: 'Harmonic & Melodic Minor' },
        transposeBody: true,
        minorBody: true,
        body: {
          de: `<p>Im natürlichen Moll liegt die 7. Stufe einen ganzen Ton unter dem Grundton – es fehlt der starke <b>Leitton</b>. Deshalb nutzt die Musik zwei Varianten:</p>
               <ul>
                 <li><b>Harmonisch Moll:</b> Die 7. Stufe wird um einen Halbton erhöht (in c-Moll: [B] statt [B♭]). Dadurch wird die 5. Stufe zum Dur-Dominantakkord (<b>V7</b>), der zwingend zur Tonika zieht! Zwischen 6. und 7. Stufe entsteht ein Schritt von 1½ Tönen (übermäßige Sekunde).</li>
                 <li><b>Melodisch Moll (aufwärts ↑ / abwärts ↓):</b> Erhöht <b>aufwärts</b> zusätzlich die 6. Stufe (A statt A♭), um diesen 1½-Ton-Sprung in Melodien zu glätten. <b>Wichtig:</b> Diese Form wird meist nur <b>aufsteigend</b> verwendet (wenn die Melodie zum Leitton und Grundton strebt) – <b>absteigend</b> werden die 7. und 6. Stufe wieder zurückgenommen ([B♭] und A♭), sodass man wieder <b>natürliches Moll</b> spielt! <em>(Ausnahme: Im modernen Jazz wird oft auf- wie abwärts die aufsteigende Form als „Jazz Minor“ verwendet.)</em></li>
               </ul>
               <div class="callout tip"><strong>Spannende „exotische“ Stufenakkorde in harmonisch &amp; melodisch Moll!</strong>
               Durch die erhöhten Töne entstehen beim Terzenstapeln ganz neue, farbige Dreiklänge, die es in Dur und natürlich Moll gar nicht gibt:
               <ul>
                 <li><b>Harmonisch Moll:</b> <code>i – ii° – <b>♭III+</b> – iv – V – ♭VI – ♯vii°</code> → Auf der 3. Stufe entsteht ein <b>übermäßiger Dreiklang (♭III+)</b>, und auf der erhöhten 7. Stufe ein verminderter Leittonakkord (♯vii°)!</li>
                 <li><b>Melodisch Moll:</b> <code>i – ii – <b>♭III+</b> – IV – V – ♯vi° – ♯vii°</code> → Ebenfalls der <b>übermäßige Dreiklang (♭III+)</b>, dazu eine helle <b>Dur-Subdominante (IV)</b> und gleich <b>zwei verminderte Dreiklänge nebeneinander (♯vi°, ♯vii°)</b>!</li>
               </ul>
               Tipp: Im Tonleiter-Widget auf Einheit 1 kannst du oben zwischen allen vier Moll-Varianten umschalten und ihre Drei- und Vierklänge direkt durchhören!</div>`,
          en: `<p>In natural minor the 7th degree sits a whole tone below the tonic — there is no strong <b>leading tone</b>. Music therefore uses two variants:</p>
               <ul>
                 <li><b>Harmonic minor:</b> Raises the 7th degree by a semitone (in C minor: B instead of B♭). This turns V into a major dominant chord (<b>V7</b>) with strong pull back to i, creating a 1½-tone leap between degrees 6 and 7.</li>
                 <li><b>Melodic minor (ascending ↑ / descending ↓):</b> Also raises the 6th degree <b>ascending</b> (A instead of A♭) to smooth out that melodic leap. <b>Important:</b> In classical music this raised form is used mainly <b>going up</b> (pulling toward the tonic) — <b>descending</b>, the 7th and 6th degrees revert (B♭ and A♭), returning to <b>natural minor</b>! <em>(Exception: Modern jazz often uses the ascending “jazz minor” form in both directions.)</em></li>
               </ul>
               <div class="callout tip"><strong>“Exotic” diatonic chords born from harmonic &amp; melodic minor!</strong>
               Stacking thirds on these altered scales naturally creates striking triads that never occur in major or natural minor:
               <ul>
                 <li><b>Harmonic minor:</b> <code>i – ii° – <b>♭III+</b> – iv – V – ♭VI – ♯vii°</code> → Degree 3 produces an <b>augmented triad (♭III+)</b>, and the raised 7th creates a diminished leading-tone triad (♯vii°)!</li>
                 <li><b>Melodic minor:</b> <code>i – ii – <b>♭III+</b> – IV – V – ♯vi° – ♯vii°</code> → Also yields the <b>augmented triad (♭III+)</b>, a bright <b>major IV</b>, and <b>two adjacent diminished triads (♯vi°, ♯vii°)</b>!</li>
               </ul>
               Tip: Use the Scale widget in Unit 1 to explore all triads and 7th chords of harmonic and melodic minor!</div>`
        },
        examples: [
          {
            title: { de: 'Stufenakkorde: Harmonisch Moll (mit ♭III+ übermäßig!)', en: 'Diatonic triads: Harmonic minor (feat. augmented ♭III+!)' },
            toks: 'i ii° bIII+ iv V bVI #vii°',
            mode: 'min',
            transpose: true,
            desc: {
              de: 'Cm – D° – E♭+ – Fm – G – A♭ – [B°]: Achte besonders auf den schwebend-exotischen übermäßigen Dreiklang E♭+ auf der 3. Stufe!',
              en: 'Cm – D° – E♭+ – Fm – G – A♭ – B°: Listen closely to the floating, exotic augmented triad E♭+ on degree 3!'
            }
          },
          {
            title: { de: 'Stufenakkorde: Melodisch Moll (♭III+, Dur-IV, zwei Verminderte)', en: 'Diatonic triads: Melodic minor (♭III+, major IV, two dim triads)' },
            toks: 'i ii bIII+ IV V #vi° #vii°',
            mode: 'min',
            transpose: true,
            desc: {
              de: 'Cm – Dm – E♭+ – F – G – A° – [B°]: Ein faszinierender Mix aus Moll-Basis, übermäßigem ♭III+, hellem Dur-IV und zwei verminderten Akkorden am Ende.',
              en: 'Cm – Dm – E♭+ – F – G – A° – B°: A rich blend of minor tonic, augmented ♭III+, bright major IV, and two diminished chords.'
            }
          },
          {
            title: { de: 'Harmonisch Moll in Aktion: Dur-V mit Leitton', en: 'Harmonic minor in action: Major V with leading tone' },
            toks: 'i:2 iv:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'Cm – Fm – G7 – Cm: Durch das [B] in G7 entsteht die starke Spannung zurück nach Cm.',
              en: 'Cm – Fm – G7 – Cm: The raised leading tone B in G7 creates a compelling pull back to Cm.'
            }
          }
        ],
        check: {
          q: { de: 'Welcher Ton wird in harmonisch Moll gegenüber natürlich Moll erhöht?', en: 'Which scale degree is raised in harmonic minor compared to natural minor?' },
          opts: [
            { de: 'Die 3. Stufe', en: 'The 3rd degree' },
            { de: 'Die 7. Stufe (für den Leitton)', en: 'The 7th degree (for the leading tone)' },
            { de: 'Die 5. Stufe', en: 'The 5th degree' }
          ],
          ans: 1,
          exp: {
            de: 'Genau! Die erhöhte 7. Stufe erzeugt den Halbtonschritt zum Grundton und macht V zum Dur-Dominantakkord.',
            en: 'Exactly! Raising the 7th creates a semitone leading tone to the tonic and turns V into a major dominant.'
          }
        }
      }
    ]
  };

  MT.LESSONS.triads = {
    id: 'triads',
    badge: 'basis',
    title: { de: 'Dreiklänge & Umkehrungen', en: 'Triads & Inversions' },
    units: [
      {
        title: { de: 'Die vier Dreiklangsarten', en: 'The Four Triad Types' },
        body: {
          de: `<p>Ein <b>Dreiklang</b> stapelt zwei Terzen auf einen Grundton: <b>Grundton (1) – Terz (3) – Quinte (5)</b>. Je nach Größe der Terzen (große Terz = 4 Halbtöne, kleine Terz = 3 Halbtöne) entstehen vier Klangfarben. Die Tabelle darunter passt sich automatisch deiner gewählten <b>Tonart</b> an:</p>`,
          en: `<p>A <b>triad</b> stacks two thirds on a root: <b>root (1) – third (3) – fifth (5)</b>. Combining major thirds (4 semitones) and minor thirds (3 semitones) produces four distinct colors. The table below automatically adapts to your selected <b>Key</b>:</p>`
        },
        widget: 'triad_table',
        examples: [
          {
            title: { de: 'Alle vier Sorten im direkten Vergleich', en: 'All four triad types side by side' },
            toks: 'I i I° I+',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Cm – C° – C+: Höre genau hin, wie jeweils nur ein einzelner Ton wandert und die ganze Stimmung verändert.',
              en: 'C – Cm – C° – C+: Listen closely to how moving a single note transforms the entire mood.'
            }
          }
        ]
      },
      {
        title: { de: 'Umkehrungen: Sextakkord & Quartsextakkord', en: 'Inversions: Sixth & Six-Four Chords' },
        body: key => {
          const T = MT.theory;
          const r1 = T.fmtNote(T.spellInKey(key, 0, 0));
          const r3 = T.fmtNote(T.spellInKey(key, 4, 2));
          const r5 = T.fmtNote(T.spellInKey(key, 7, 4));
          const s5 = T.fmtNote(T.spellInKey(key, 8, 4));
          const b3 = T.fmtNote(T.spellInKey(key, 3, 2));
          const b5 = T.fmtNote(T.spellInKey(key, 6, 4));
          const d7 = T.fmtNote(T.spellInKey(key, 9, 5));
          return {
            de: `<p>Drehst du die Reihenfolge der Töne eines <b>${r1}-Dur-Dreiklangs</b> um, bleiben es <b>exakt dieselben drei Töne</b> (${r1}, ${r3}, ${r5}), aber ein anderer Ton liegt als <b>neuer tiefster Ton im Bass</b>:</p>
                 <ul>
                   <li><b>Grundstellung (<code>⁵₃</code>):</b> Grundton <b>${r1}</b> im Bass (<b>${r1} – ${r3} – ${r5}</b>). Ab ${r1} nach oben liegen Terz (${r3}) und Quinte (${r5}). Stabil und eindeutig.</li>
                   <li><b>1. Umkehrung (Sextakkord, <code>⁶</code>):</b> Terz <b>${r3}</b> als neuer Basston (<b>${r3} – ${r5} – ${r1}</b>, Schreibweise <code>${r1}/${r3}</code>). Zählst du ab dem <em>neuen</em> Basston <b>${r3}</b> aufwärts, liegen darüber eine Terz (${r3} → ${r5}) und eine <b>Sexte (${r3} → ${r1})</b> – daher der Name <em>Sextakkord</em>! Klingt weicher und verbindet Akkorde melodisch.</li>
                   <li><b>2. Umkehrung (Quartsextakkord, <code>⁶₄</code>):</b> Quinte <b>${r5}</b> als neuer Basston (<b>${r5} – ${r1} – ${r3}</b>, Schreibweise <code>${r1}/${r5}</code>). Zählst du ab dem <em>neuen</em> Basston <b>${r5}</b> aufwärts, liegen darüber eine <b>Quarte (${r5} → ${r1})</b> und eine <b>Sexte (${r5} → ${r3})</b> – daher der Name <em>Quartsextakkord</em>! Die Quarte über dem Bass wirkt wie ein Vorhalt Richtung Terz (typisch vor dem Schluss: <code>I⁶₄ – V – I</code>).</li>
                 </ul>
                 <div class="callout tip"><strong>Häufiges Missverständnis – wichtig für die Praxis!</strong>
                 Die Namen <em>„Sextakkord“</em> und <em>„Quartsextakkord“</em> bedeuten <b>nicht</b>, dass eine Quarte oder Sexte als neuer Ton zum ${r1}-Dur-Akkord dazukommt (das wären <code>${r1}sus4</code> oder <code>${r1}6</code>)! Die Ziffern <code>⁶</code> und <code>⁶₄</code> stammen aus dem Generalbass und messen die Intervalle <b>immer vom neuen, tiefsten Basston aus nach oben</b> – beim Quartsextakkord <code>${r1}/${r5}</code> ist die „Quarte“ schlicht der Abstand vom Bass <b>${r5}</b> hinauf zum eigentlichen Grundton <b>${r1}</b>!</div>
                 <div class="callout"><strong>Symmetrie-Zauber bei Übermäßig (<code>+</code>) &amp; Vollvermindert (<code>°7</code>)</strong>
                 Während Dur- und Moll-Umkehrungen völlig anders klingen, teilen zwei Akkordtypen die Oktave (12 Halbtöne) in <b>exakt gleiche Abstände</b>:
                 <ul>
                   <li><b>Übermäßig (<code>+</code>):</b> 4 + 4 + 4 Halbtöne (drei große Terzen). Jede Umkehrung von <code>${r1}+</code> (<b>${r1} – ${r3} – ${s5}</b>) ist klanglich wieder ein übermäßiger Dreiklang in Grundstellung: <code>${r1}+ = ${r3}+ = ${s5}+</code>! Es gibt im gesamten System nur <b>4 verschiedene</b> übermäßige Dreiklänge.</li>
                   <li><b>Vollvermindert (<code>°7</code>):</b> 3 + 3 + 3 + 3 Halbtöne (vier kleine Terzen). Jede Umkehrung von <code>${r1}°7</code> (<b>${r1} – ${b3} – ${b5} – ${d7}</b>) ist wieder derselbe Akkord: <code>${r1}°7 = ${b3}°7 = ${b5}°7 = ${d7}°7</code>! Es gibt also nur <b>3 verschiedene</b> vollverminderte Septakkorde!</li>
                 </ul>
                 Höre dir unten die Umkehrungen von <code>${r1}+</code> und <code>${r1}°7</code> direkt im Vergleich an!</div>`,
            en: `<p>Rearranging the notes of a <b>${r1} major triad</b> keeps the <b>exact same three pitches</b> (${r1}, ${r3}, ${r5}), but puts a different note at the bottom as the <b>new lowest bass note</b>:</p>
                 <ul>
                   <li><b>Root position (<code>⁵₃</code>):</b> root <b>${r1}</b> in the bass (<b>${r1} – ${r3} – ${r5}</b>). Measuring up from ${r1} gives a 3rd (${r3}) and 5th (${r5}). Stable and grounded.</li>
                   <li><b>1st inversion (sixth chord, <code>⁶</code>):</b> third <b>${r3}</b> becomes the new bass note (<b>${r3} – ${r5} – ${r1}</b>, written <code>${r1}/${r3}</code>). Measuring up from the <em>new</em> bass <b>${r3}</b> gives a 3rd (${r3} → ${r5}) and a <b>6th (${r3} → ${r1})</b> — hence <em>sixth chord</em>!</li>
                   <li><b>2nd inversion (six-four chord, <code>⁶₄</code>):</b> fifth <b>${r5}</b> becomes the new bass note (<b>${r5} – ${r1} – ${r3}</b>, written <code>${r1}/${r5}</code>). Measuring up from the <em>new</em> bass <b>${r5}</b> gives a <b>4th (${r5} → ${r1})</b> and a <b>6th (${r5} → ${r3})</b> — hence <em>six-four chord</em>! The fourth above the bass wants to resolve downward (<code>I⁶₄ – V – I</code>).</li>
                 </ul>
                 <div class="callout tip"><strong>Common pitfall — don’t mix these up!</strong>
                 <em>“Sixth chord”</em> and <em>“six-four chord”</em> do <b>not</b> add a 4th or 6th to ${r1} major (that would be <code>${r1}sus4</code> or <code>${r1}6</code>)! Those figured-bass numbers (<code>⁶</code>, <code>⁶₄</code>) <b>always measure intervals upward from the new lowest bass note</b> — in <code>${r1}/${r5}</code>, the “fourth” is simply the distance from the bass <b>${r5}</b> up to the chord’s true root <b>${r1}</b>!</div>
                 <div class="callout"><strong>Symmetrical magic: Augmented (<code>+</code>) &amp; Fully Diminished (<code>°7</code>)</strong>
                 Unlike major and minor triads, two chord types divide the 12-semitone octave into <b>perfectly equal slices</b>:
                 <ul>
                   <li><b>Augmented (<code>+</code>):</b> 4 + 4 + 4 semitones (major thirds). Every inversion of <code>${r1}+</code> (<b>${r1} – ${r3} – ${s5}</b>) sounds like another root-position augmented triad: <code>${r1}+ = ${r3}+ = ${s5}+</code>! Only <b>4 distinct</b> augmented triads exist in all of music.</li>
                   <li><b>Fully diminished (<code>°7</code>):</b> 3 + 3 + 3 + 3 semitones (minor thirds). Every inversion of <code>${r1}°7</code> (<b>${r1} – ${b3} – ${b5} – ${d7}</b>) is the exact same chord: <code>${r1}°7 = ${b3}°7 = ${b5}°7 = ${d7}°7</code>! Only <b>3 distinct</b> diminished 7th chords exist!</li>
                 </ul>
                 Hear the inversions of <code>${r1}+</code> and <code>${r1}°7</code> below!</div>`
          };
        },
        examples: [
          {
            title: { de: 'Grundstellung, 1. und 2. Umkehrung hören', en: 'Hear root position, 1st and 2nd inversion' },
            toks: 'I I^1 I^2 I',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – C/E – C/G – C: Achte im Live-View auf den gelben Basston und das Klaviersystem – der Bass wandert, der Akkord bleibt C-Dur.',
              en: 'C – C/E – C/G – C: Watch the amber bass note and grand staff in the Live View — the bass moves while the chord stays C major.'
            }
          },
          {
            title: { de: 'Symmetrie erleben: Übermäßiger Dreiklang in allen 3 Lagen (I+)', en: 'Symmetry in action: Augmented triad in all 3 inversions (I+)' },
            toks: 'I+ I+^1 I+^2 I+',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C+ – C+/E (= E+) – C+/G♯ (= A♭+) – C+: Jede Umkehrung hat exakt denselben 4+4-Abstand – schwebend und völlig symmetrisch!',
              en: 'C+ – C+/E (= E+) – C+/G♯ (= A♭+) – C+: Every inversion keeps the exact same 4+4 spacing — floating and symmetrical!'
            }
          },
          {
            title: { de: 'Symmetrie erleben: Vollvermindert (°7) in allen 4 Umkehrungen', en: 'Symmetry in action: Diminished 7th (°7) in all 4 inversions' },
            toks: 'I°7 I°7^1 I°7^2 I°7^3',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C°7 – C°7/E♭ (= E♭°7) – C°7/G♭ (= F♯°7) – C°7/A (= A°7): Alle 4 Umkehrungen bilden exakt dieselbe 3+3+3-Struktur!',
              en: 'C°7 – C°7/E♭ (= E♭°7) – C°7/G♭ (= F♯°7) – C°7/A (= A°7): All 4 inversions form the exact same 3+3+3 spacing!'
            }
          }
        ],
        check: {
          q: { de: 'Welcher Ton liegt bei einem C-Dur-Dreiklang in der 1. Umkehrung (C/E) im Bass?', en: 'Which note sits in the bass of a C major triad in 1st inversion (C/E)?' },
          opts: [
            { de: 'Der Grundton C', en: 'The root C' },
            { de: 'Die Terz E', en: 'The third E' },
            { de: 'Die Quinte G', en: 'The fifth G' }
          ],
          ans: 1,
          exp: {
            de: 'Richtig! In der 1. Umkehrung liegt immer die Terz im Bass (Sextakkord).',
            en: 'Correct! The 1st inversion always puts the third in the bass.'
          }
        }
      }
    ]
  };

  MT.LESSONS.degrees_functions = {
    id: 'degrees_functions',
    badge: 'basis',
    title: { de: 'Stufenakkorde & Funktionen in Dur', en: 'Diatonic Chords & Functions in Major' },
    units: [
      {
        title: { de: 'Das feste Muster jeder Durtonart', en: 'The Fixed Pattern of Every Major Key' },
        transposeBody: true,
        body: {
          de: `<p>Stapelst du über jedem Ton der Durtonleiter einen Dreiklang nur aus Tönen dieser Leiter, entsteht in <b>jeder</b> Durtonart dasselbe Muster:</p>
               <ul>
                 <li><b>Dur-Akkorde (groß):</b> <b>I, IV, V</b> (in C: C, F, G)</li>
                 <li><b>Moll-Akkorde (klein):</b> <b>ii, iii, vi</b> (in C: Dm, Em, Am)</li>
                 <li><b>Vermindert:</b> <b>vii°</b> (in C: [B°])</li>
               </ul>`,
          en: `<p>Stacking triads using only notes of the major scale always produces the exact same pattern in <b>every</b> major key:</p>
               <ul>
                 <li><b>Major chords (uppercase):</b> <b>I, IV, V</b> (in C: C, F, G)</li>
                 <li><b>Minor chords (lowercase):</b> <b>ii, iii, vi</b> (in C: Dm, Em, Am)</li>
                 <li><b>Diminished:</b> <b>vii°</b> (in C: B°)</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Alle sieben Stufenakkorde', en: 'All seven diatonic triads' },
            toks: 'I ii iii IV V vi vii°',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Dm – Em – F – G – Am – [B°]: Drei Dur-, drei Moll-Akkorde und ein verminderter Leitakkord.',
              en: 'C – Dm – Em – F – G – Am – B°: Three major chords, three minor chords, and one diminished leading-tone chord.'
            }
          }
        ]
      },
      {
        title: { de: 'Tonika, Subdominante, Dominante & ihre Stellvertreter', en: 'Tonic, Subdominant, Dominant & Their Relatives' },
        transposeBody: true,
        body: {
          de: `<p>Akkorde haben Aufgaben („Funktionen“) wie Figuren in einer Geschichte:</p>
               <ul>
                 <li><b>Tonika (T = I):</b> Zuhause, Ruhepunkt. Stellvertreter: <b>vi</b> (Tonikaparallele Tp – teilt 2 Töne mit I).</li>
                 <li><b>Subdominante (S = IV):</b> Aufbruch, Öffnung. Stellvertreter: <b>ii</b> (Subdominantparallele Sp – teilt 2 Töne mit IV).</li>
                 <li><b>Dominante (D = V):</b> Der zentrale <b>Spannungsträger</b> – sie drängt mit aller Kraft zurück zur Tonika. Verwandte: <b>vii°</b> (ein verkürzter V7 ohne Grundton) und <b>iii</b> (Dominantparallele Dp / Mediante).</li>
               </ul>
               <div class="callout"><strong>Ausblick Jazz &amp; Modern Pop: Spannung auf der Dominante noch weiter aufladen!</strong>
               Weil die Dominante (V) ohnehin für Spannung zuständig ist, würzt man sie im Jazz (und in emotionalen Balladen) gern mit <b>verminderten oder übermäßigen Klangfarben</b>:
               <ul>
                 <li><b><code>V7♭9</code> (z. B. G7♭9):</b> Über der Terz [B] entsteht ein kompletter <b>verminderter Septakkord</b> ([B]–D–F–A♭), der dramatisch in die Tonika fällt!</li>
                 <li><b><code>V+7</code> / <code>V7♯5</code> (z. B. G7♯5):</b> Die erhöhte Quinte (D♯) macht den Dreiklang <b>übermäßig</b> und zieht halbtonweise nach oben Richtung E (Terz von C).</li>
               </ul>
               Höre beide Varianten direkt in den Beispielen unten!</div>
               <div class="callout song"><strong>Hör-Anker aus bekannten Songs</strong>
               <code>I – IV – V – I</code> (T – S – D – T): <em>Twist and Shout</em>, <em>La Bamba</em>.<br>
               <code>I – vi – ii – V</code> (T – Tp – Sp – D): <em>Blue Moon</em>, <em>Heart and Soul</em>.</div>`,
          en: `<p>Chords act like characters in a story with distinct harmonic functions:</p>
               <ul>
                 <li><b>Tonic (T = I):</b> Home, rest. Relative stand-in: <b>vi</b> (shares 2 notes with I).</li>
                 <li><b>Subdominant (S = IV):</b> Moving away, opening up. Relative stand-in: <b>ii</b> (shares 2 notes with IV).</li>
                 <li><b>Dominant (D = V):</b> The main <b>tension carrier</b>, pulling back home to the tonic. Related chords: <b>vii°</b> (rootless V7) and <b>iii</b> (mediant).</li>
               </ul>
               <div class="callout"><strong>Jazz &amp; Modern Pop outlook: Supercharging dominant tension!</strong>
               Because V is all about tension, jazz musicians love adding <b>diminished or augmented colors</b> on top of it:
               <ul>
                 <li><b><code>V7♭9</code> (e.g. G7♭9):</b> Stacks a full <b>diminished 7th chord</b> (B–D–F–A♭) above the root for dramatic resolution!</li>
                 <li><b><code>V+7</code> / <code>V7♯5</code> (e.g. G7♯5):</b> Raises the 5th (D♯) into an <b>augmented</b> dominant that pulls upward by a half-step into E (the 3rd of C).</li>
               </ul>
               Listen to both flavors in the examples below!</div>
               <div class="callout song"><strong>Song anchors</strong>
               <code>I – IV – V – I</code>: <em>Twist and Shout</em>, <em>La Bamba</em>.<br>
               <code>I – vi – ii – V</code>: <em>Blue Moon</em>, <em>Heart and Soul</em>.</div>`
        },
        examples: [
          {
            title: { de: 'Hauptfunktionen: T – S – D – T', en: 'Primary functions: T – S – D – T' },
            toks: 'I IV V I',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – F – G – C: Das Grundgerüst der westlichen Harmonik.',
              en: 'C – F – G – C: The backbone of Western harmony.'
            }
          },
          {
            title: { de: 'Mit Stellvertretern: I – vi – ii – V – I', en: 'With relative stand-ins: I – vi – ii – V – I' },
            toks: 'I:2 vi:2 ii:1 V:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Am – Dm – G – C: Nachbarakkorde teilen gemeinsame Töne – dadurch fließt die Folge extrem weich.',
              en: 'C – Am – Dm – G – C: Neighboring chords share common tones, making the progression flow effortlessly.'
            }
          },
          {
            title: { de: 'Jazz-Spannung: Dominante mit ♭9 (V7♭9)', en: 'Jazz tension: Dominant with ♭9 (V7♭9)' },
            toks: 'I:2 ii7:1 V7b9:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Dm7 – G7♭9 – Cmaj7: In G7♭9 steckt ein verminderter Septakkord ([B]–D–F–A♭), der sofort maximale Zugkraft erzeugt!',
              en: 'C – Dm7 – G7♭9 – Cmaj7: G7♭9 embeds a diminished 7th chord (B–D–F–A♭) for intense pull!'
            }
          },
          {
            title: { de: 'Jazz-Spannung: Übermäßige Dominante (V+7 / V7♯5)', en: 'Jazz tension: Augmented dominant (V+7 / V7♯5)' },
            toks: 'I:2 ii7:1 V+7:1 Imaj7:4',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Dm7 – G7♯5 – Cmaj7: Die erhöhte Quinte D♯ drängt schwebend-gespannt nach oben ins E von Cmaj7.',
              en: 'C – Dm7 – G7♯5 – Cmaj7: The raised 5th (D♯) glides upward into the E of Cmaj7.'
            }
          }
        ],
        check: {
          q: { de: 'Welcher Moll-Akkord teilt zwei Töne mit der Subdominante IV (F-Dur) und kann sie vertreten?', en: 'Which minor chord shares two notes with the subdominant IV (F major) and can substitute for it?' },
          opts: [
            { de: 'ii (Dm)', en: 'ii (Dm)' },
            { de: 'iii (Em)', en: 'iii (Em)' },
            { de: 'vii° ([B°])', en: 'vii° (B°)' }
          ],
          ans: 0,
          exp: {
            de: 'Richtig! Dm (D–F–A) teilt F und A mit F-Dur (F–A–C) und ist die Subdominantparallele (Sp).',
            en: 'Right! Dm (D–F–A) shares F and A with F major (F–A–C), giving it subdominant function.'
          }
        }
      }
    ]
  };

  MT.LESSONS.roman_numerals = {
    id: 'roman_numerals',
    badge: 'basis',
    title: { de: 'Römische Stufenzahlen verstehen', en: 'Understanding Roman Numerals' },
    units: [
      {
        title: { de: 'Eine universelle Sprache für alle 12 Tonarten', en: 'One Universal Language for All 12 Keys' },
        body: key => {
          const T = MT.theory;
          const kMaj = T.fmtNote(T.spellInKey(key, 0, 0));
          const c1 = T.parseChord('I', key, 'maj').name;
          const c2 = T.parseChord('ii', key, 'maj').name;
          const c4 = T.parseChord('IV', key, 'maj').name;
          const c5 = T.parseChord('V', key, 'maj').name;
          const c6 = T.parseChord('vi', key, 'maj').name;
          const cb7 = T.parseChord('bVII', key, 'maj').name;
          const v7vi = T.parseChord('V7/vi', key, 'maj').name;

          // Relative minor comparison for the Golden Rule (e.g. C / Am -> a-Moll vs A-Dur)
          const minKey = T.relativeMinorKey(key);
          const kMin = T.fmtNote(T.spellInKey(key, 9, 5));
          const m3 = T.fmtNote(T.spellInKey(minKey, 3, 2));
          const m6 = T.fmtNote(T.spellInKey(minKey, 8, 5));
          const m7 = T.fmtNote(T.spellInKey(minKey, 10, 6));
          const maj3 = T.fmtNote(T.spellInKey(minKey, 4, 2));
          const maj6 = T.fmtNote(T.spellInKey(minKey, 9, 5));
          const maj7 = T.fmtNote(T.spellInKey(minKey, 11, 6));
          const minLower = kMin.charAt(0).toLowerCase() + kMin.slice(1);

          return {
            de: `<p>Statt für jede Tonart neue Akkorde auswendig zu lernen, beschreiben Musiker Akkordfolgen mit <b>römischen Zahlen</b> (hier direkt für deine gewählte Tonart <b>${kMaj}-Dur / ${minLower}-Moll</b>):</p>
                 <ul>
                   <li><b>Zahl (I bis VII):</b> Tonleiterstufe, auf der der Akkord steht (<code>I</code> = ${c1}, <code>V</code> = ${c5}).</li>
                   <li><b>Groß = Dur</b> (<code>I</code> = ${c1}, <code>IV</code> = ${c4}, <code>V</code> = ${c5}), <b>klein = Moll</b> (<code>ii</code> = ${c2}, <code>vi</code> = ${c6}).</li>
                   <li><b>Qualität &amp; Zusätze:</b> <code>°</code> = vermindert, <code>ø</code> = halbvermindert, <code>+</code> = übermäßig, Ziffern wie <code>V7</code> (${c5}7), <code>Imaj7</code> (${c1}maj7), <code>Isus4</code> (${c1}sus4).</li>
                   <li><b>Vorzeichen davor:</b> <code>♭VII</code> = Dur-Akkord auf der erniedrigten 7. Stufe (in ${kMaj}-Dur: <b>${cb7}</b>).</li>
                   <li><b>Schrägstrich (/):</b> „von“ – z. B. <code>V7/vi</code> = die Dominante <em>von</em> <code>vi</code> (in ${kMaj}-Dur: <b>${v7vi}</b> → ${c6}).</li>
                 </ul>
                 <div class="callout"><strong>Goldene Regel: Immer die Durtonleiter als Maßstab!</strong>
                 Die Nummerierung <code>I – II – III – IV – V – VI – VII</code> folgt in der modernen Pop-, Rock- und Jazz-Theorie <b>immer der Durtonleiter</b> (<code>1 2 3 4 5 6 7</code>) als festem Bezugssystem. Deshalb bekommen leitereigene Moll-Stufen auf der 3., 6. und 7. Stufe ein <code>♭</code> davor (<b><code>♭III</code>, <code>♭VI</code>, <code>♭VII</code></b>): In <b>${minLower}-Moll</b> sind <b>${m3}, ${m6} und ${m7}</b> gegenüber <b>${kMin}-Dur (${maj3}, ${maj6}, ${maj7})</b> jeweils einen Halbton tiefer – genau das macht das <code>♭</code> sofort sichtbar!</div>
                 <div class="callout tip"><strong>Probiere es direkt aus!</strong>Stelle oben in der Kopfzeile eine andere <b>Tonart</b> ein – die römischen Stufen bleiben gleich, alle Akkordnamen oben und in den Beispielen passen sich sofort an!</div>`,
            en: `<p>Instead of memorizing separate chords for every key, musicians describe progressions with <b>Roman numerals</b> (shown live for your selected key <b>${kMaj} major / ${kMin} minor</b>):</p>
                 <ul>
                   <li><b>Numeral (I–VII):</b> scale degree of the chord root (<code>I</code> = ${c1}, <code>V</code> = ${c5}).</li>
                   <li><b>Uppercase = Major</b> (<code>I</code> = ${c1}, <code>IV</code> = ${c4}, <code>V</code> = ${c5}), <b>lowercase = Minor</b> (<code>ii</code> = ${c2}, <code>vi</code> = ${c6}).</li>
                   <li><b>Quality &amp; extensions:</b> <code>°</code> = diminished, <code>ø</code> = half-diminished, <code>+</code> = augmented, plus numbers like <code>V7</code> (${c5}7), <code>Imaj7</code> (${c1}maj7), <code>Isus4</code> (${c1}sus4).</li>
                   <li><b>Accidental in front:</b> <code>♭VII</code> = major chord on the lowered 7th degree (in ${kMaj} major: <b>${cb7}</b>).</li>
                   <li><b>Slash (/):</b> “of” — e.g. <code>V7/vi</code> = the dominant <em>of</em> <code>vi</code> (in ${kMaj} major: <b>${v7vi}</b> → ${c6}).</li>
                 </ul>
                 <div class="callout"><strong>Golden rule: Always measured against the major scale!</strong>
                 In modern pop, rock, and jazz theory, Roman numeral numbering (<code>I–II–III–IV–V–VI–VII</code>) <b>always uses the major scale</b> as its fixed ruler. That is why even diatonic chords in natural minor carry a flat on degrees 3, 6, and 7 (<b><code>♭III</code>, <code>♭VI</code>, <code>♭VII</code></b>): in <b>${kMin} minor</b>, <b>${m3}, ${m6}, and ${m7}</b> sit a semitone lower than in <b>${kMin} major (${maj3}, ${maj6}, ${maj7})</b>.</div>
                 <div class="callout tip"><strong>Try it right now!</strong>Change the <b>Key</b> in the top bar — the Roman numerals stay identical while all chord names above and below transpose automatically.</div>`
          };
        },
        examples: [
          {
            title: { de: 'Bunte Mischung zum Ablesen', en: 'Mixed symbols to read and hear' },
            toks: 'I:2 iii:2 IV:2 iv:1 bVII:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'C – Em – F – Fm – [B♭] – C: Beachte groß vs. klein (IV = F, iv = Fm) und das Vorzeichen vor bVII ([B♭]).',
              en: 'C – Em – F – Fm – B♭ – C: Notice uppercase vs. lowercase (IV = F, iv = Fm) and the flat accidental on bVII (B♭).'
            }
          }
        ],
        check: {
          q: { de: 'Was bedeutet „iv“ in einer Dur-Tonart (z. B. in C-Dur)?', en: 'What does “iv” mean in a major key (e.g. C major)?' },
          opts: [
            { de: 'Dur-Akkord auf der 4. Stufe (F)', en: 'Major chord on the 4th degree (F)' },
            { de: 'Moll-Akkord auf der 4. Stufe (Fm)', en: 'Minor chord on the 4th degree (Fm)' },
            { de: 'Moll-Akkord auf der 6. Stufe (Am)', en: 'Minor chord on the 6th degree (Am)' }
          ],
          ans: 1,
          exp: {
            de: 'Kleinbuchstaben stehen immer für Moll – „iv“ ist also die Moll-Subdominante (Fm in C-Dur).',
            en: 'Lowercase always means minor — so “iv” is the minor subdominant (Fm in C major).'
          }
        }
      }
    ]
  };

  MT.LESSONS.minor_harmony = {
    id: 'minor_harmony',
    badge: 'pop',
    title: { de: 'Harmonik in Moll', en: 'Harmony in Minor' },
    units: [
      {
        title: { de: 'Natürlich Moll: Offen, episch & rockig', en: 'Natural Minor: Open, Epic & Rock' },
        transposeBody: true,
        minorBody: true,
        body: {
          de: `<p>Moll-Songs nutzen fast immer eine <b>Mischung</b> aus natürlichem Moll (ohne Leitton) und harmonischem Moll (mit Leitton).</p>
               <p>Im <b>natürlichen Moll</b> stehen auf der 6. und 7. Stufe starke Dur-Akkorde (<b><code>♭VI</code></b> und <b><code>♭VII</code></b> – in der modernen Pop-/Jazz-Schreibweise mit <code>♭</code> notiert, weil sie gegenüber der Durtonleiter einen Halbton tiefer liegen; in klassischer Musiktheorie schreibt man sie oft einfach <code>VI</code> und <code>VII</code>).</p>
               <p>Die Folge <code>i – ♭VI – ♭VII – i</code> verzichtet bewusst auf den Leitton und klingt dadurch offen, episch und treibend.</p>
               <div class="callout song"><strong>Hör-Anker</strong><code>i – ♭VI – ♭VII</code> (bzw. <code>i – ♭VII – ♭VI – ♭VII</code>): <em>All Along the Watchtower</em> (Jimi Hendrix / Bob Dylan), <em>Rolling in the Deep</em>, unzählige Rock- & Filmmusik-Themen.</div>`,
          en: `<p>Songs in minor almost always blend <b>natural minor</b> (no leading tone) with <b>harmonic minor</b> (with leading tone).</p>
               <p>In <b>natural minor</b>, degrees 6 and 7 produce bold major chords (<b><code>♭VI</code></b> and <b><code>♭VII</code></b> — modern pop/jazz writes the <code>♭</code> relative to major, whereas classical texts often write plain <code>VI</code> and <code>VII</code>).</p>
               <p>Progressions like <code>i – ♭VI – ♭VII – i</code> skip the leading tone for an open, epic, driving sound.</p>
               <div class="callout song"><strong>Song anchors</strong><code>i – ♭VI – ♭VII</code> / <code>i – ♭VII – ♭VI – ♭VII</code>: <em>All Along the Watchtower</em>, <em>Rolling in the Deep</em>, countless rock and film themes.</div>`
        },
        examples: [
          {
            title: { de: 'Epische Moll-Wendung: i – ♭VI – ♭VII – i', en: 'Epic minor progression: i – ♭VI – ♭VII – i' },
            toks: 'i:2 bVI:1 bVII:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'Cm – A♭ – [B♭] – Cm: Kein Leitton, dafür zwei kraftvolle Ganztonschritte zurück zur Tonika.',
              en: 'Cm – A♭ – B♭ – Cm: No leading tone, instead two bold whole-step moves back to the tonic.'
            }
          },
          {
            title: { de: 'Weiche Moll-Ballade: i – v – ♭VI – ♭VII', en: 'Soft minor ballad: i – v – ♭VI – ♭VII' },
            toks: 'i v bVI bVII',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'Cm – Gm – A♭ – [B♭]: Mit der Moll-Dominante (v = Gm) bleibt die Stimmung melancholisch und schwebend.',
              en: 'Cm – Gm – A♭ – B♭: Using the minor dominant (v = Gm) keeps the mood melancholic and floating.'
            }
          }
        ]
      },
      {
        title: { de: 'Harmonisch Moll & die Andalusische Kadenz', en: 'Harmonic Minor & the Andalusian Cadence' },
        transposeBody: true,
        minorBody: true,
        body: {
          de: `<p>Sobald eine Moll-Folge echte <b>Schlusswirkung</b> oder Dramatik braucht, wechselt die 5. Stufe von <code>v</code> (Moll) zu <b><code>V</code> bzw. <code>V7</code> (Dur)</b> aus harmonisch Moll.</p>
               <p>Ein weltberühmtes Beispiel für die Kombination aus beidem ist die <b>Andalusische Kadenz</b> <code>i – ♭VII – ♭VI – V</code>: Erst fällt der Bass schrittweise durch natürlich Moll, und am Ende zündet die Dur-Dominante <code>V</code>!</p>
               <div class="callout song"><strong>Hör-Anker</strong><code>i – ♭VII – ♭VI – V</code>: <em>Hit the Road Jack</em>, <em>Sultans of Swing</em>, <em>Smooth Criminal</em>, Flamenco-Musik.</div>`,
          en: `<p>Whenever a minor progression needs strong <b>resolution</b> or drama, degree 5 switches from <code>v</code> (minor) to <b><code>V</code> or <code>V7</code> (major)</b> from harmonic minor.</p>
               <p>The famous <b>Andalusian cadence</b> <code>i – ♭VII – ♭VI – V</code> combines both worlds: the bass walks down through natural minor and lands on a dramatic major dominant <code>V</code>!</p>
               <div class="callout song"><strong>Song anchors</strong><code>i – ♭VII – ♭VI – V</code>: <em>Hit the Road Jack</em>, <em>Sultans of Swing</em>, <em>Smooth Criminal</em>, Flamenco music.</div>`
        },
        examples: [
          {
            title: { de: 'Andalusische Kadenz: i – ♭VII – ♭VI – V', en: 'Andalusian cadence: i – ♭VII – ♭VI – V' },
            toks: 'i bVII bVI V',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'Cm – [B♭] – A♭ – G: Achte auf den absteigenden Bass C → [B♭] → A♭ → G und die Spannung auf G.',
              en: 'Cm – B♭ – A♭ – G: Hear the stepwise descending bass C → B♭ → A♭ → G landing on major G.'
            }
          },
          {
            title: { de: 'Klassische Moll-Kadenz mit Leitton', en: 'Classic minor cadence with leading tone' },
            toks: 'i:2 iv:1 V7:1 i:4',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: {
              de: 'Cm – Fm – G7 – Cm: Subdominante in Moll (iv), dann Dur-Dominante (V7) mit Leitton zurück in i.',
              en: 'Cm – Fm – G7 – Cm: Minor subdominant (iv), then major dominant (V7) pulling home to i.'
            }
          }
        ],
        check: {
          q: { de: 'Warum steht am Ende der Andalusischen Kadenz (i – ♭VII – ♭VI – V) ein großes V?', en: 'Why does the Andalusian cadence (i – ♭VII – ♭VI – V) end on an uppercase V?' },
          opts: [
            { de: 'Es ist ein Tippfehler, gemeint ist v', en: 'It is a typo for lowercase v' },
            { de: 'Der Dur-Akkord liefert den Leitton aus harmonisch Moll und erzeugt starke Spannung zurück zu i', en: 'The major chord provides the harmonic-minor leading tone and strong pull back to i' },
            { de: 'In Moll ist die 5. Stufe immer natürlich Dur', en: 'In natural minor degree 5 is always major' }
          ],
          ans: 1,
          exp: {
            de: 'Genau! Die Dur-Terz in V ist der Leitton zurück zur Tonika i und gibt der Kadenz ihren charakteristischen Zug.',
            en: 'Spot on! The major third of V is the leading tone back to i, giving the cadence its signature pull.'
          }
        }
      }
    ]
  };

  MT.LESSONS.cadences = {
    id: 'cadences',
    badge: 'basis',
    title: { de: 'Kadenzen & Harmonischer Rhythmus', en: 'Cadences & Harmonic Rhythm' },
    units: [
      {
        title: { de: 'Die fünf wichtigsten Schlusswendungen', en: 'The Five Essential Cadences' },
        body: {
          de: `<p>Eine <b>Kadenz</b> wirkt in der Musik wie Satzzeichen im Text – sie setzt einen Punkt, ein Komma oder ein Ausrufezeichen:</p>
               <ul>
                 <li><b>Authentischer Schluss (V → I):</b> Der klare Punkt. Leitton (7→1) und Septime (4→3) lösen sich zwingend auf.</li>
                 <li><b>Vollkadenz (I – IV – V – I):</b> T – S – D – T, der vollständige musikalische Satz.</li>
                 <li><b>Plagalschluss (IV → I):</b> Weicher, feierlicher Schluss („Amen-Kadenz“), ohne Leitton.</li>
                 <li><b>Halbschluss (… → V):</b> Bleibt offen wie ein Komma oder eine Frage.</li>
                 <li><b>Trugschluss (V → vi):</b> Überraschende Wendung! Statt der erwarteten Tonika kommt die Moll-Parallele vi.</li>
               </ul>`,
          en: `<p>A <b>cadence</b> acts like punctuation in speech — a period, a comma, or a plot twist:</p>
               <ul>
                 <li><b>Authentic cadence (V → I):</b> A firm period. The leading tone (7→1) and seventh (4→3) resolve strongly.</li>
                 <li><b>Full cadence (I – IV – V – I):</b> T – S – D – T, the complete harmonic sentence.</li>
                 <li><b>Plagal cadence (IV → I):</b> Gentle, solemn “Amen” ending without a leading tone.</li>
                 <li><b>Half cadence (… → V):</b> Ends on V, staying open like a comma or question mark.</li>
                 <li><b>Deceptive cadence (V → vi):</b> A surprise! Instead of I, we land on the relative minor vi.</li>
               </ul>`
        },
        examples: [
          {
            title: { de: 'Vollkadenz (T – S – D – T)', en: 'Full cadence (T – S – D – T)' },
            toks: 'I:2 IV:1 V7:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – G7 – C: Klarer Aufbau von Spannung und Auflösung. Vergleiche unbedingt Grundstellung vs. Stimmführung (Start Grundstellung / 1. / 2. Umkehrung) – die Oberstimme verändert den Schlusscharakter deutlich!', en: 'C – F – G7 – C: Clear build-up and release of tension. Be sure to compare Root Position vs. Voice Leading (Start Root / 1st / 2nd inversion) — the top note noticeably changes the cadence’s mood!' }
          },
          {
            title: { de: 'Plagalschluss („Amen“)', en: 'Plagal cadence (“Amen”)' },
            toks: 'I:2 IV:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – C: Warm und entspannt, ohne Leitton-Druck.', en: 'C – F – C: Warm and relaxed, without leading-tone pull.' }
          },
          {
            title: { de: 'Halbschluss (bleibt offen)', en: 'Half cadence (stays open)' },
            toks: 'I vi IV V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – Am – F – G: Endet auf der Dominante – dein Ohr erwartet, dass es weitergeht.', en: 'C – Am – F – G: Ends on the dominant — your ear expects more to follow.' }
          },
          {
            title: { de: 'Trugschluss und anschließende Auflösung', en: 'Deceptive cadence followed by real resolution' },
            toks: 'I:2 IV:1 V7:1 vi:2 ii:1 V7:1 I:4',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – G7 – Am (Überraschung!) – Dm – G7 – C (jetzt der echte Schluss).', en: 'C – F – G7 – Am (surprise!) – Dm – G7 – C (now the true resolution).' }
          }
        ]
      },
      {
        title: { de: 'Kadenzquartsext & Harmonischer Rhythmus', en: 'Cadential Six-Four & Harmonic Rhythm' },
        transposeBody: true,
        body: {
          de: `<h4>Der Kadenzquartsextakkord (I⁶₄ – V – I)</h4>
               <p>In der Klassik (und vielen Balladen) wird vor die Dominante gern die <b>2. Umkehrung der Tonika</b> gesetzt (<code>I⁶₄</code>, z. B. <code>C/G → G7 → C</code>). Der Bass steht schon auf G – von diesem Basston G aus gemessen liegen darüber die <b>Quarte C</b> und die <b>Sexte E</b> (daher <code>⁶₄</code>), die noch kurz „hängen“ und erst beim G7 abwärts in Terz ([B]) und Quinte (D) kippen.</p>
               <h4>Harmonischer Rhythmus (Wann wechseln Akkorde?)</h4>
               <p>Als <b>harmonischen Rhythmus</b> bezeichnet man das Tempo, in dem Akkorde wechseln:</p>
               <ul>
                 <li><b>Langsamer Wechsel (1 Akkord pro Takt):</b> Ruhig, weit, typisch für Pop-Refrains (4-Takt- oder 8-Takt-Schleifen).</li>
                 <li><b>Beschleunigung vor dem Schluss:</b> Oft stehen <code>I</code> und <code>vi</code> jeweils einen ganzen Takt, während <code>ii – V</code> sich einen Takt teilen – das erzeugt einen natürlichen Schub Richtung Zielakkord!</li>
               </ul>
               <div class="callout tip"><strong>Tipp fürs Übungstool</strong>Probiere dieselbe Progression im Übungstool einmal mit <b>4 Schlägen/Akkord</b> und einmal mit <b>2 Schlägen/Akkord</b> – sofort ändert sich das gesamte Energiegefühl!</div>`,
          en: `<h4>The Cadential Six-Four (I⁶₄ – V – I)</h4>
               <p>In classical music and ballads, the <b>2nd inversion of the tonic</b> (<code>I⁶₄</code>, e.g. <code>C/G → G7 → C</code>) often precedes the dominant. The bass already sits on G — measured up from that bass note G, C is a <b>4th</b> and E is a <b>6th</b> (hence <code>⁶₄</code>), suspending briefly before resolving down to B and D over G7.</p>
               <h4>Harmonic Rhythm (When do chords change?)</h4>
               <p><b>Harmonic rhythm</b> is the pace at which chords change:</p>
               <ul>
                 <li><b>Steady changes (1 chord per bar):</b> Spacious and grounded, typical of 4-bar and 8-bar pop loops.</li>
                 <li><b>Acceleration into a cadence:</b> Often <code>I</code> and <code>vi</code> get a full bar each while <code>ii – V</code> share one bar — creating natural momentum into the resolution.</li>
               </ul>
               <div class="callout tip"><strong>Practice Tool tip</strong>Try the same progression at <b>4 beats/chord</b> vs. <b>2 beats/chord</b> — the groove and forward pull change immediately!</div>`
        },
        examples: [
          {
            title: { de: 'Kadenzquartsext: I – IV – I⁶₄ – V7 – I', en: 'Cadential six-four: I – IV – I⁶₄ – V7 – I' },
            toks: 'I:2 IV:2 I^2:1 V7:1 I:2',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – C/G – G7 – C: Beachte im Bass die Linie C – F – G – G – C.', en: 'C – F – C/G – G7 – C: Notice the bass line C – F – G – G – C.' }
          }
        ],
        check: {
          q: { de: 'Welche Akkordfolge ist ein klassischer Trugschluss?', en: 'Which chord move is a classic deceptive cadence?' },
          opts: [
            { de: 'IV → I', en: 'IV → I' },
            { de: 'V → vi', en: 'V → vi' },
            { de: 'I → V', en: 'I → V' }
          ],
          ans: 1,
          exp: {
            de: 'Genau! Nach V erwartet das Ohr I – stattdessen auf vi zu landen täuscht die Erwartung.',
            en: 'Right! After V the ear expects I — landing on vi instead creates the deceptive surprise.'
          }
        }
      }
    ]
  };

  MT.LESSONS.intervals = {
    id: 'intervals',
    badge: 'basis',
    title: { de: 'Intervalle & Notennamen', en: 'Intervals & Note Names' },
    units: [
      {
        title: { de: 'Die 12 Töne & B vs. H', en: 'The 12 Notes & Accidentals' },
        body: {
          de: `<p>Unsere Musik teilt jede Oktave in <b>12 Halbtöne</b>: die 7 Stammtöne <b>C, D, E, F, G, A, [B]</b> (weiße Tasten) und 5 Zwischentöne (schwarze Tasten), die mit <b>♯</b> (erhöht, deutsch <em>-is</em>: Cis, Fis) oder <b>♭</b> (erniedrigt, deutsch <em>-es</em>: Des, Ges; Ausnahmen: Es, As, B) bezeichnet werden.</p>
               <div class="callout"><strong>International vs. Deutsch</strong>
               International heißt der 7. Stammton <b>B</b> und der erniedrigte Ton <b>B♭</b>. Im Deutschen heißt der Stammton traditionell <b>H</b> und der erniedrigte Ton <b>B</b>. Mit dem Button oben rechts kannst du diese App jederzeit zwischen beiden Welten umschalten!</div>`,
          en: `<p>Western music divides each octave into <b>12 semitones</b>: the 7 natural notes <b>C, D, E, F, G, A, B</b> (white keys) and 5 altered notes (black keys) written with <b>♯</b> (sharp, raised) or <b>♭</b> (flat, lowered).</p>
               <div class="callout"><strong>Enharmonic spelling</strong>
               The same piano key can have two names (e.g. F♯ and G♭). Which name is right depends on the key and chord context: in D major it is F♯, in A♭ major it is G♭ or D♭.</div>`
        }
      },
      {
        title: { de: 'Basis-Intervalle (0 bis 12 Halbtöne)', en: 'Core Intervals (0 to 12 Semitones)' },
        body: {
          de: `<p>Ein <b>Intervall</b> ist der Abstand zweier Töne. Die Kurzzeichen (<code>1, ♭3, 5, ♭7</code>) messen jeden Ton an der Dur-Tonleiter. Tippe eine Zeile in der Tabelle an, um das Intervall ab deiner gewählten Tonart direkt zu hören!</p>`,
          en: `<p>An <b>interval</b> is the distance between two pitches. Degree shorthand (<code>1, ♭3, 5, ♭7</code>) compares every note against the major scale. Tap any row below to hear the interval starting from your selected key!</p>`
        },
        widget: 'interval_table',
        examples: [
          {
            title: { de: 'Der Tritonus als Motor der Spannung', en: 'The tritone as the engine of tension' },
            toks: 'V7:2 I:4',
            mode: 'maj',
            transpose: true,
            desc: {
              de: 'G7 → C: Zwischen Terz ([B]) und Septime (F) liegt ein Tritonus (6 Halbtöne) – er halbiert die Oktave genau in der Mitte und will sich zwingend nach C und E auflösen.',
              en: 'G7 → C: Between the third (B) and seventh (F) sits a tritone (6 semitones) — dividing the octave in half and pulling straight into C and E.'
            }
          }
        ]
      },
      {
        title: { de: 'Die Brücke zu 9, 11 und 13', en: 'The Bridge to 9, 11, and 13' },
        body: {
          de: `<p>Später bei Jazz- und Pop-Akkorden begegnen dir Zahlen über 8: <b>9, 11 und 13</b>. Das sind keine geheimen Töne, sondern einfach <b>2, 4 und 6 eine Oktave höher</b> (2+7 = 9, 4+7 = 11, 6+7 = 13).</p>
               <ul>
                 <li><code>♭9</code> = kleine Sekunde eine Oktave höher · <code>♯9</code> klingt wie ♭3</li>
                 <li><code>♯11</code> = Tritonus eine Oktave höher</li>
                 <li><code>♭13</code> = kleine Sexte eine Oktave höher</li>
               </ul>
               <p class="hint">Tipp: Im Werkzeug <b>🎯 Gehörbildung</b> kannst du alle Intervalle direkt nach Gehör üben!</p>`,
          en: `<p>In jazz and pop chords you will see numbers above 8: <b>9, 11, and 13</b>. These are simply <b>2, 4, and 6 up an octave</b> (2+7 = 9, 4+7 = 11, 6+7 = 13).</p>
               <ul>
                 <li><code>♭9</code> = minor 2nd up an octave · <code>♯9</code> sounds like ♭3</li>
                 <li><code>♯11</code> = tritone up an octave</li>
                 <li><code>♭13</code> = minor 6th up an octave</li>
               </ul>
               <p class="hint">Tip: Practice hearing all intervals directly in the <b>🎯 Ear Training</b> tool!</p>`
        }
      }
    ]
  };

  MT.LESSONS.notation = {
    id: 'notation',
    badge: 'optional',
    title: { de: 'Notenschrift (Kompakt)', en: 'Reading Notation (Compact)' },
    units: [
      {
        title: { de: 'Violinschlüssel (G-Schlüssel) & Vorzeichen', en: 'Treble Clef (G Clef) & Accidentals' },
        body: {
          de: `<p>Noten liegen auf <b>5 Linien</b> und in <b>4 Zwischenräumen</b>. Der <b>Violinschlüssel (𝄞)</b> heißt auch <b>G-Schlüssel</b>, weil seine Spirale die 2. Linie von unten als <b>G4</b> markiert.</p>
               <p><b>Merksätze:</b> Linien von unten: <b>E – G – [B] – D – F</b> (<em>„Es geht hurtig durch Fluren“</em> / <em>„Every Good Boy Does Fine“</em>). Zwischenräume: <b>F – A – C – E</b> (das englische Wort <b>FACE</b>).</p>
               <p><b>Vorzeichen:</b> <b>♯</b> erhöht um einen Halbton, <b>♭</b> erniedrigt, <b>♮</b> hebt auf. Vorzeichen direkt am Zeilenanfang gelten für das ganze Stück.</p>
               <div class="callout"><strong>Enharmonische Verwechslung – zwei Schreibweisen, ein Ton!</strong>
               Im Notenbild können zwei Töne auf <b>unterschiedlichen Linien oder Zwischenräumen</b> stehen (z. B. <b>F♯</b> im 1. Zwischenraum vs. <b>G♭</b> auf der 2. Linie, oder sogar <b>E♯</b> vs. <b>F</b>) – auf Klavier und Gitarre drückst du aber <b>exakt dieselbe Taste bzw. denselben Bund</b>! Welche Schreibweise richtig ist, entscheidet die Tonart (damit jeder Stammton-Buchstabe in einer Tonleiter genau einmal vorkommt).</div>`,
          en: `<p>Notes sit on <b>5 lines</b> and <b>4 spaces</b>. The <b>treble clef (𝄞)</b> is also called the <b>G clef</b> because its spiral circles the 2nd line from the bottom as <b>G4</b>.</p>
               <p><b>Mnemonics:</b> Lines from bottom: <b>E – G – B – D – F</b> (<em>“Every Good Boy Does Fine”</em>). Spaces: <b>F – A – C – E</b> (spells <b>FACE</b>).</p>
               <p><b>Accidentals:</b> <b>♯</b> raises a semitone, <b>♭</b> lowers, <b>♮</b> cancels. Key signatures at the start of a line apply throughout the piece.</p>
               <div class="callout"><strong>Enharmonic equivalents — two notations, one single pitch!</strong>
               Two notes can look completely different on the staff (e.g. <b>F♯</b> in the 1st space vs. <b>G♭</b> on the 2nd line, or even <b>E♯</b> vs. <b>F</b>), yet you press the <b>exact same piano key or guitar fret</b>! Which spelling is used depends on the key signature so each letter appears once per scale.</div>`
        },
        widget: 'notation_treble'
      },
      {
        title: { de: 'Bassschlüssel (F-Schlüssel) & Klaviersystem', en: 'Bass Clef (F Clef) & Grand Staff' },
        body: {
          de: `<p>Der <b>Bassschlüssel (𝄢)</b> heißt <b>F-Schlüssel</b>: Seine zwei Punkte umfassen die 4. Linie als <b>F3</b>. Zusammen bilden Violin- und Bassschlüssel das <b>Klaviersystem</b> – das mittlere C (C4) liegt genau auf einer Hilfslinie dazwischen.</p>
               <p><b>Merksätze Bassschlüssel:</b> Linien <b>G – [B] – D – F – A</b> (<em>„Good Boys Do Fine Always“</em>), Zwischenräume <b>A – C – E – G</b> (<em>„All Cows Eat Grass“</em>).</p>
               <p><b>Akkorde in Noten:</b> Ein Dreiklang in Grundstellung ist ein gleichmäßiger Terzenstapel (Linie–Linie–Linie oder Raum–Raum–Raum). Im Live-View unten siehst du jetzt immer das vollständige Klaviersystem mit Bass- und Violinschlüssel!</p>`,
          en: `<p>The <b>bass clef (𝄢)</b> is the <b>F clef</b>: its two dots frame the 4th line as <b>F3</b>. Together, treble and bass clef form the <b>grand staff</b>, with middle C (C4) on a ledger line right between them.</p>
               <p><b>Mnemonics:</b> Lines <b>G – B – D – F – A</b> (<em>“Good Boys Do Fine Always”</em>), spaces <b>A – C – E – G</b> (<em>“All Cows Eat Grass”</em>).</p>
               <p><b>Chords in notation:</b> A root-position triad stacks neatly line–line–line or space–space–space. Watch the Live View below to see every chord on the full grand staff!</p>`
        },
        widget: 'notation_bass',
        examples: [
          {
            title: { de: 'Umkehrungen im Klaviersystem beobachten', en: 'Watch inversions on the grand staff' },
            toks: 'I I^1 I^2 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Beobachte im Live-View, wie der Basston im Bassschlüssel wandert und sich oben das Notenbild verändert.', en: 'Watch the bass note move in the bass clef while the treble chord changes shape.' }
          },
          {
            title: { de: 'Musikalische Stimmführung im Notenbild', en: 'Smooth voice leading in notation' },
            toks: 'I vi IV V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Achte darauf, wie wenig sich die Notenköpfe im Violinschlüssel bewegen, obwohl die Akkorde wechseln.', en: 'Notice how little the treble noteheads move even as the chords change.' }
          }
        ]
      },
      {
        title: { de: 'Notenwerte, Pausen & Taktarten', en: 'Note Values, Rests & Time Signatures' },
        body: {
          de: `<p>Jeder Notenwert hat eine genau gleich lange <b>Pause</b>. Im 5-Linien-Ausschnitt erkennst du auch den Unterschied zwischen ganzer Pause (hängt unter der 4. Linie) und halber Pause (liegt wie ein kleiner Hut auf der 3. Linie):</p>
               <p><b>Taktarten:</b> Die obere Zahl nennt die Schläge pro Takt, die untere den Grund-Notenwert (<code>4/4</code> = vier Viertel, Standard in Pop/Rock; <code>3/4</code> = drei Viertel, Walzer; <code>6/8</code> = zwei Dreiergruppen aus Achteln, schwingend).</p>`,
          en: `<p>Every note value has a matching <b>rest</b> of the exact same length. On the 5-line mini-staff you can clearly tell the whole rest (hangs under line 4) from the half rest (sits like a hat on line 3):</p>
               <p><b>Time signatures:</b> The top number gives beats per bar, the bottom gives the beat value (<code>4/4</code> = four quarters, pop/rock; <code>3/4</code> = waltz; <code>6/8</code> = two rolling groups of three eighths).</p>`
        },
        widget: 'note_rest_table'
      },
      {
        title: { de: 'Punktierte Noten, Taktstriche, Spielweisen, Dynamik & Tempo', en: 'Dotted Notes, Barlines, Articulation, Dynamics & Tempo' },
        body: {
          de: `<p>Noten verraten nicht nur Tonhöhe und Länge, sondern auch <b>Aufbau</b> (Taktstriche, Wiederholungen), <b>Spielweise</b> (kurz, gebunden, betont), <b>Lautstärke (Dynamik)</b> und <b>Tempo</b>:</p>
               <div class="callout"><strong>Navigation im Notenblatt</strong>
               <b>D.C.</b> (<em>da capo</em>) = zurück zum Anfang · <b>D.S.</b> (<em>dal segno</em>) = zurück zum Zeichen (𝄋) · <b>Fine</b> = Ende · <b>Coda</b> (𝄌) = angehängter Schlussabschnitt.</div>
               <h4>Dynamik (Lautstärke-Fachbegriffe)</h4>
               <p>Die Dynamik-Kürzel stammen aus dem Italienischen (<em>piano</em> = leise, <em>forte</em> = laut, <em>mezzo</em> = mittel/halb, <em>-issimo</em> = sehr):</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Zeichen</th><th>Fachbegriff (Italienisch)</th><th>Bedeutung</th></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">ppp</b></td><td><em>pianississimo</em></td><td>äußerst leise (so leise wie möglich)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">pp</b></td><td><em>pianissimo</em></td><td>sehr leise</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">p</b></td><td><em>piano</em></td><td>leise</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">mp</b></td><td><em>mezzopiano</em></td><td>mittelleise (halbleise)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">mf</b></td><td><em>mezzoforte</em></td><td>mittellaut (halblaut)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">f</b></td><td><em>forte</em></td><td>laut, kräftig</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">ff</b></td><td><em>fortissimo</em></td><td>sehr laut</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">fff</b></td><td><em>fortississimo</em></td><td>äußerst laut (so laut wie möglich)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">cresc. / &lt;</b></td><td><em>crescendo</em></td><td>allmählich lauter werden („wachsend“)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">decresc. / dim. / &gt;</b></td><td><em>decrescendo / diminuendo</em></td><td>allmählich leiser werden („abnehmend“)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">sfz / fp</b></td><td><em>sforzato / fortepiano</em></td><td>plötzlich stark betont (<em>sfz</em>) · laut anspielen, sofort leise (<em>fp</em>)</td></tr>
               </table></div>
               <h4>Tempi (Italienische Tempobezeichnungen)</h4>
               <p>Am Anfang eines Stückes steht meist ein italienisches Wort, das <b>Tempo und Grundstimmung</b> gleichzeitig beschreibt:</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Begriff</th><th>Wörtliche Bedeutung</th><th>Richtwert (BPM)</th></tr>
                 <tr><td><b>Largo</b></td><td>breit, sehr langsam, getragen</td><td>ca. 40–60</td></tr>
                 <tr><td><b>Adagio</b></td><td>langsam, ruhig, gemächlich</td><td>ca. 60–72</td></tr>
                 <tr><td><b>Andante</b></td><td>„gehend“ – im ruhigen Schritt-Tempo</td><td>ca. 76–104</td></tr>
                 <tr><td><b>Moderato</b></td><td>mäßig, mittel-schnell</td><td>ca. 104–120</td></tr>
                 <tr><td><b>Allegretto</b></td><td>etwas munter, leicht bewegt (langsamer als Allegro)</td><td>ca. 112–124</td></tr>
                 <tr><td><b>Allegro</b></td><td>fröhlich, munter, schnell</td><td>ca. 120–156</td></tr>
                 <tr><td><b>Vivace</b></td><td>lebhaft, feurig, spritzig</td><td>ca. 156–176</td></tr>
                 <tr><td><b>Presto</b></td><td>sehr schnell, eilig</td><td>ca. 176–200+</td></tr>
               </table></div>
               <p class="hint"><b>Tempoveränderungen im Stück:</b> <b>rit.</b> (<em>ritardando</em>) = langsamer werden · <b>accel.</b> (<em>accelerando</em>) = schneller werden · <b>a tempo</b> = zurück zum Ausgangstempo · <b>rubato</b> („geraubt“) = frei im Ausdruck schwankend.</p>
               <h4>Zeichen für Aufbau, Rhythmus &amp; Spielweise</h4>`,
          en: `<p>Sheet music communicates not only pitch and duration, but also <b>structure</b> (barlines, repeats), <b>articulation</b> (short, smooth, accented), <b>dynamics (volume)</b>, and <b>tempo</b>:</p>
               <div class="callout"><strong>Navigation marks</strong>
               <b>D.C.</b> (<em>da capo</em>) = back to the beginning · <b>D.S.</b> (<em>dal segno</em>) = back to the sign (𝄋) · <b>Fine</b> = end · <b>Coda</b> (𝄌) = closing section.</div>
               <h4>Dynamics (Volume Markings)</h4>
               <p>Dynamic markings come from Italian (<em>piano</em> = soft, <em>forte</em> = loud, <em>mezzo</em> = medium/half, <em>-issimo</em> = very):</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Symbol</th><th>Italian term</th><th>Meaning</th></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">ppp</b></td><td><em>pianississimo</em></td><td>as soft as possible</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">pp</b></td><td><em>pianissimo</em></td><td>very soft</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">p</b></td><td><em>piano</em></td><td>soft</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">mp</b></td><td><em>mezzopiano</em></td><td>moderately soft</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">mf</b></td><td><em>mezzoforte</em></td><td>moderately loud</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">f</b></td><td><em>forte</em></td><td>loud, strong</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">ff</b></td><td><em>fortissimo</em></td><td>very loud</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic;font-size:1.05rem">fff</b></td><td><em>fortississimo</em></td><td>as loud as possible</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">cresc. / &lt;</b></td><td><em>crescendo</em></td><td>gradually getting louder (“growing”)</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">decresc. / dim. / &gt;</b></td><td><em>decrescendo / diminuendo</em></td><td>gradually getting softer</td></tr>
                 <tr><td><b style="font-family:Georgia,serif;font-style:italic">sfz / fp</b></td><td><em>sforzato / fortepiano</em></td><td>sudden strong accent (<em>sfz</em>) · loud attack, immediately soft (<em>fp</em>)</td></tr>
               </table></div>
               <h4>Tempo Markings (Italian Terms &amp; Literal Meaning)</h4>
               <p>A piece usually opens with an Italian word expressing both <b>speed and character</b>:</p>
               <div style="overflow-x:auto"><table class="data-tbl">
                 <tr><th>Term</th><th>Literal meaning</th><th>Typical BPM</th></tr>
                 <tr><td><b>Largo</b></td><td>broad, very slow, stately</td><td>~40–60</td></tr>
                 <tr><td><b>Adagio</b></td><td>slow, calm, at ease</td><td>~60–72</td></tr>
                 <tr><td><b>Andante</b></td><td>“walking” — relaxed walking pace</td><td>~76–104</td></tr>
                 <tr><td><b>Moderato</b></td><td>moderate speed</td><td>~104–120</td></tr>
                 <tr><td><b>Allegretto</b></td><td>moderately lively (slightly slower than Allegro)</td><td>~112–124</td></tr>
                 <tr><td><b>Allegro</b></td><td>cheerful, bright, fast</td><td>~120–156</td></tr>
                 <tr><td><b>Vivace</b></td><td>lively, brisk, spirited</td><td>~156–176</td></tr>
                 <tr><td><b>Presto</b></td><td>very fast, urgent</td><td>~176–200+</td></tr>
               </table></div>
               <p class="hint"><b>Tempo changes:</b> <b>rit.</b> (<em>ritardando</em>) = slowing down · <b>accel.</b> (<em>accelerando</em>) = speeding up · <b>a tempo</b> = return to original speed · <b>rubato</b> (“stolen”) = flexible, expressive push and pull.</p>
               <h4>Barlines, Rhythm &amp; Articulation Symbols</h4>`
        },
        widget: 'articulation_symbols'
      }
    ]
  };

  MT.LESSONS.circle_build = {
    id: 'circle_build',
    badge: 'basis',
    title: { de: 'Quintenzirkel: Aufbau & Vorzeichen', en: 'Circle of Fifths: Structure & Key Signatures' },
    units: [
      {
        title: { de: 'Die Uhr der Quinten & Merksätze', en: 'The Clock of Fifths & Mnemonics' },
        body: {
          de: `<p>Der <b>Quintenzirkel</b> ordnet alle 12 Tonarten wie eine Uhr im Abstand einer reinen Quinte (7 Halbtöne): C steht auf 12 Uhr, G auf 1 Uhr, D auf 2 Uhr usw. Außen stehen die <b>Dur-Tonarten</b>, innen die jeweiligen <b>relativen Moll-Tonarten</b> (gleiche Vorzeichen, 3 Halbtöne tiefer).</p>
               <ul>
                 <li><b>Im Uhrzeigersinn (+1 ♯):</b> C → G → D → A → E → [B] → F♯ · Merksatz: <em>„Geh du alter Esel hol Fisch“</em>.</li>
                 <li><b>Gegen den Uhrzeigersinn (+1 ♭):</b> C → F → [B♭] → E♭ → A♭ → D♭ → G♭ · Merksatz: <em>„Frische Brezel essen Asse des Gesangs“</em>.</li>
               </ul>
               <p class="hint">Tippe unten eine beliebige Tonart im Kreis an – Vorzeichen und Stufenakkorde aktualisieren sich sofort!</p>`,
          en: `<p>The <b>Circle of Fifths</b> arranges all 12 keys like a clock a perfect fifth (7 semitones) apart: C at 12 o'clock, G at 1, D at 2, and so on. Outer ring = <b>major keys</b>; inner ring = their <b>relative minor keys</b> (same key signature, 3 semitones down).</p>
               <ul>
                 <li><b>Clockwise (+1 ♯):</b> C → G → D → A → E → B → F♯ · Order of sharps: <em>“Father Charles Goes Down And Ends Battle”</em> (F C G D A E B).</li>
                 <li><b>Counter-clockwise (+1 ♭):</b> C → F → B♭ → E♭ → A♭ → D♭ → G♭ · Order of flats: reverse (B E A D G C F).</li>
               </ul>
               <p class="hint">Tap any key on the circle below to inspect its key signature and diatonic chords!</p>`
        },
        widget: 'circle'
      },
      {
        title: { de: 'Vorzeichen & Funktionen auf einen Blick ablesen', en: 'Reading Key Signatures & Functions at a Glance' },
        body: {
          de: `<p><b>Vorzeichen-Trick:</b> Bei <b>♯-Tonarten</b> liegt das letzte ♯ immer einen Halbton unter dem Grundton (z. B. letztes ♯ = C♯ → D-Dur). Bei <b>♭-Tonarten</b> ist das <em>vorletzte</em> ♭ direkt der Grundton (z. B. [B♭], E♭, A♭ → E♭-Dur; Ausnahme: F-Dur hat ein ♭).</p>
               <p><b>Das Funktions-Fenster (gestrichelter Ausschnitt):</b> Die drei benachbarten Spalten rund um deine gewählte Tonart liefern sofort alle <b>6 wichtigsten Stufenakkorde</b>:</p>
               <ul>
                 <li><b>Links:</b> Subdominante <b>IV</b> (außen) & <b>ii</b> (innen)</li>
                 <li><b>Mitte:</b> Tonika <b>I</b> (außen) & <b>vi</b> (innen)</li>
                 <li><b>Rechts:</b> Dominante <b>V</b> (außen) & <b>iii</b> (innen)</li>
               </ul>`,
          en: `<p><b>Key-signature trick:</b> With <b>sharps</b>, the last ♯ is always a semitone below the major root (last ♯ = C♯ → D major). With <b>flats</b>, the <em>second-to-last</em> ♭ is the major root (B♭, E♭, A♭ → E♭ major; exception: F major has 1 ♭).</p>
               <p><b>The diatonic wedge (dashed area):</b> The three neighboring columns around your selected key instantly show all <b>6 core diatonic chords</b>:</p>
               <ul>
                 <li><b>Left:</b> Subdominant <b>IV</b> (outer) & <b>ii</b> (inner)</li>
                 <li><b>Center:</b> Tonic <b>I</b> (outer) & <b>vi</b> (inner)</li>
                 <li><b>Right:</b> Dominant <b>V</b> (outer) & <b>iii</b> (inner)</li>
               </ul>`
        },
        widget: 'circle',
        check: {
          transpose: false,
          q: { de: 'Wie viele Vorzeichen hat A-Dur (3 Schritte im Uhrzeigersinn ab C)?', en: 'How many accidentals does A major have (3 steps clockwise from C)?' },
          opts: [
            { de: '3 ♭', en: '3 flats' },
            { de: '3 ♯ (F♯, C♯, G♯)', en: '3 sharps (F♯, C♯, G♯)' },
            { de: '2 ♯ (F♯, C♯)', en: '2 sharps (F♯, C♯)' }
          ],
          ans: 1,
          exp: {
            de: 'Richtig! Jeder Schritt im Uhrzeigersinn fügt ein ♯ hinzu: G (1), D (2), A (3 ♯: F♯, C♯, G♯).',
            en: 'Right! Each clockwise step adds one sharp: G (1), D (2), A (3 sharps: F♯, C♯, G♯).'
          }
        }
      }
    ]
  };

  MT.LESSONS.circle_apply = {
    id: 'circle_apply',
    badge: 'pop',
    title: { de: 'Quintenzirkel: Anwenden & Song-Formeln', en: 'Circle of Fifths: Practical Uses & Song Formulas' },
    units: [
      {
        title: { de: 'Transponieren, Nachbartonarten & Quintfall', en: 'Transposing, Modulation & Fall of Fifths' },
        transposeBody: true,
        body: {
          de: `<ul>
                 <li><b>Transponieren ohne Rechnen:</b> Eine Akkordfolge ist ein geometrisches Muster im Kreis. Verschiebe das ganze Muster um eine Position nach rechts – schon ist der Song eine Quinte höher!</li>
                 <li><b>Modulation per Pivot-Akkord:</b> Nachbartonarten teilen 6 von 7 Tönen (z. B. C-Dur und G-Dur teilen C, Em, G, Am). Ein gemeinsamer Akkord (z. B. <code>Am</code> = vi in C, aber ii in G) dient als unauffällige Brücke („Pivot“).</li>
                 <li><b>Quintfall (gegen den Uhrzeigersinn):</b> Die stärkste Bewegung der Harmonielehre – jeder Grundton fällt eine Quinte (<code>A → D → G → C</code>). Im Kreis läufst du einfach Schritt für Schritt links herum!</li>
                 <li><b>Gegenüberliegende Position = Tritonus:</b> C ↔ F♯ (Grundlage der Tritonus-Substitution).</li>
               </ul>`,
          en: `<ul>
                 <li><b>Transpose visually:</b> Any progression is a shape on the circle. Rotate the shape one click clockwise and the entire song shifts up a fifth!</li>
                 <li><b>Pivot-chord modulation:</b> Neighboring keys share 6 of 7 notes (e.g. C and G share C, Em, G, Am). A shared chord (<code>Am</code> = vi in C, ii in G) acts as a seamless pivot.</li>
                 <li><b>Fall of fifths (counter-clockwise):</b> Harmony's strongest engine — each root drops a fifth (<code>A → D → G → C</code>), walking step by step counter-clockwise around the circle.</li>
                 <li><b>Opposite side = Tritone:</b> C ↔ F♯ (basis for tritone substitution).</li>
               </ul>`
        },
        widget: 'circle',
        examples: [
          {
            title: { de: 'Quintfall-Sequenz durch die ganze Tonart', en: 'Diatonic circle-of-fifths sequence' },
            toks: 'I IV vii° iii vi ii V7 I',
            mode: 'maj',
            transpose: true,
            desc: { de: 'C – F – [B°] – Em – Am – Dm – G7 – C: Jeder Schritt zieht im Kreis gegen den Uhrzeigersinn weiter.', en: 'C – F – B° – Em – Am – Dm – G7 – C: Every step moves counter-clockwise around the circle.' }
          }
        ]
      },
      {
        title: { de: 'Berühmte Song-Formeln direkt aus dem Kreis', en: 'Famous Song Formulas Straight from the Circle' },
        body: {
          de: `<p>Hunderte Welthits bedienen sich direkt aus dem gestrichelten 6-Akkorde-Segment des Quintenzirkels. Höre die vier wichtigsten Formeln direkt durch und wechsle oben testweise die Tonart!</p>`,
          en: `<p>Hundreds of hit songs pull their chords straight from the dashed 6-chord wedge of the Circle of Fifths. Listen to the four most famous formulas below and try switching the key at the top!</p>`
        },
        examples: [
          {
            title: { de: 'Pop-Standard: I – V – vi – IV', en: 'Pop standard: I – V – vi – IV' },
            toks: 'I V vi IV',
            mode: 'maj',
            transpose: true,
            desc: { de: '„Let It Be“, „No Woman, No Cry“, „Someone Like You“: Vier direkt benachbarte Positionen im Kreis.', en: '“Let It Be”, “No Woman, No Cry”, “Someone Like You”: Four neighboring positions on the circle.' }
          },
          {
            title: { de: '50er-Progression: I – vi – IV – V', en: '50s progression: I – vi – IV – V' },
            toks: 'I vi IV V',
            mode: 'maj',
            transpose: true,
            desc: { de: '„Stand By Me“, „Every Breath You Take“: Tonika, Tonikaparallele, Subdominante, Dominante.', en: '“Stand By Me”, “Unchained Melody”: Tonic, relative minor, subdominant, dominant.' }
          },
          {
            title: { de: 'Quintfall in Moll („I Will Survive“)', en: 'Minor circle sequence (“I Will Survive”)' },
            toks: 'i iv bVII bIII bVI ii° V7 i',
            mode: 'min',
            transpose: true,
            relHint: true,
            desc: { de: '„I Will Survive“, „Autumn Leaves“, „Fly Me to the Moon“: Jeder Grundton fällt eine Quinte (gegen den Uhrzeigersinn).', en: '“I Will Survive”, “Autumn Leaves”, “Fly Me to the Moon”: Every root drops a fifth.' }
          },
          {
            title: { de: 'Pachelbel-Kanon / „Memories“', en: 'Pachelbel Canon / “Memories”' },
            toks: 'I V vi iii IV I IV V',
            mode: 'maj',
            transpose: true,
            desc: { de: 'Pachelbels „Kanon in D“, Maroon 5 „Memories“, Green Day „Basket Case“: Alle sechs Hauptakkorde des Kreis-Segments in einer Kette.', en: 'Pachelbel “Canon in D”, Maroon 5 “Memories”, Green Day “Basket Case”: Uses all six chords of the wedge.' }
          }
        ]
      }
    ]
  };
})();
