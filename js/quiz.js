/* Interactive Ear Training, Pitch Recognition & Build-a-Chord Quiz Engine */
(function () {
  const QSTATE = {
    mode: 'triads', // 'triads' | 'sevenths' | 'intervals' | 'cadences' | 'pitch' | 'build'
    intervalAll: false,
    pitchRef: true,    // true = relative pitch (with C4 reference), false = absolute pitch (no ref)
    pitchAll12: false, // false = 7 natural white keys, true = all 12 chromatic notes
    score: 0,
    total: 0,
    streak: 0,
    current: null,
    answered: false,
    picked: null,
    buildSel: new Set(),
    cadTimers: []
  };

  // Fisher-Yates shuffle bags prevent repetitive streaks (never same item back-to-back!)
  const bags = {};
  const lastPick = {};

  function drawFromBag(bagKey, size) {
    if (size <= 1) return 0;
    if (!bags[bagKey] || bags[bagKey].length === 0) {
      const deck = Array.from({ length: size }, (_, i) => i);
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      // Guarantee boundary between consecutive decks never repeats the immediately previous item
      if (lastPick[bagKey] != null && deck[deck.length - 1] === lastPick[bagKey]) {
        const swapIdx = Math.floor(Math.random() * (deck.length - 1));
        [deck[deck.length - 1], deck[swapIdx]] = [deck[swapIdx], deck[deck.length - 1]];
      }
      bags[bagKey] = deck;
    }
    const val = bags[bagKey].pop();
    lastPick[bagKey] = val;
    return val;
  }

  const TRIAD_OPTS = [
    { q: '', de: 'Dur (1–3–5)', en: 'Major (1–3–5)' },
    { q: 'm', de: 'Moll (1–♭3–5)', en: 'Minor (1–♭3–5)' },
    { q: 'dim', de: 'Vermindert (1–♭3–♭5)', en: 'Diminished (1–♭3–♭5)' },
    { q: 'aug', de: 'Übermäßig (1–3–♯5)', en: 'Augmented (1–3–♯5)' }
  ];

  const SEVENTH_OPTS = [
    { q: 'maj7', de: 'maj7 (Dur + gr. 7)', en: 'maj7 (Major 7th)' },
    { q: '7', de: '7 (Dominantsept)', en: '7 (Dominant 7th)' },
    { q: 'm7', de: 'm7 (Moll + kl. 7)', en: 'm7 (Minor 7th)' },
    { q: 'm7b5', de: 'm7♭5 / ø (Halbvermindert)', en: 'm7♭5 / ø (Half-diminished)' },
    { q: 'dim7', de: '°7 (Vollvermindert)', en: '°7 (Diminished 7th)' }
  ];

  const INTERVAL_BASIC = [
    { s: 3, de: 'kleine Terz (3 HT)', en: 'Minor 3rd (3 st)' },
    { s: 4, de: 'große Terz (4 HT)', en: 'Major 3rd (4 st)' },
    { s: 5, de: 'reine Quarte (5 HT)', en: 'Perfect 4th (5 st)' },
    { s: 7, de: 'reine Quinte (7 HT)', en: 'Perfect 5th (7 st)' },
    { s: 12, de: 'Oktave (12 HT)', en: 'Octave (12 st)' }
  ];

  const INTERVAL_ALL = [
    { s: 1, de: 'kl. Sekunde (1 HT)', en: 'Minor 2nd (1 st)' },
    { s: 2, de: 'gr. Sekunde (2 HT)', en: 'Major 2nd (2 st)' },
    { s: 3, de: 'kl. Terz (3 HT)', en: 'Minor 3rd (3 st)' },
    { s: 4, de: 'gr. Terz (4 HT)', en: 'Major 3rd (4 st)' },
    { s: 5, de: 'reine Quarte (5 HT)', en: 'Perfect 4th (5 st)' },
    { s: 6, de: 'Tritonus (6 HT)', en: 'Tritone (6 st)' },
    { s: 7, de: 'reine Quinte (7 HT)', en: 'Perfect 5th (7 st)' },
    { s: 8, de: 'kl. Sexte (8 HT)', en: 'Minor 6th (8 st)' },
    { s: 9, de: 'gr. Sexte (9 HT)', en: 'Major 6th (9 st)' },
    { s: 10, de: 'kl. Septime (10 HT)', en: 'Minor 7th (10 st)' },
    { s: 11, de: 'gr. Septime (11 HT)', en: 'Major 7th (11 st)' },
    { s: 12, de: 'Oktave (12 HT)', en: 'Octave (12 st)' }
  ];

  const CADENCE_OPTS = [
    { id: 'auth', toks: 'I:2 IV:1 V7:1 I:4', mode: 'maj', de: 'Authentische Vollkadenz (V7 → I)', en: 'Authentic Full Cadence (V7 → I)' },
    { id: 'plag', toks: 'I:2 IV:2 I:4', mode: 'maj', de: 'Plagalschluss (IV → I, „Amen“)', en: 'Plagal Cadence (IV → I, “Amen”)' },
    { id: 'decp', toks: 'I:2 IV:1 V7:1 vi:4', mode: 'maj', de: 'Trugschluss (V7 → vi)', en: 'Deceptive Cadence (V7 → vi)' },
    { id: 'half', toks: 'I:2 vi:2 IV:2 V:2', mode: 'maj', de: 'Halbschluss (endet auf V)', en: 'Half Cadence (ends on V)' },
    { id: 'min', toks: 'i:2 iv:1 V7:1 i:4', mode: 'min', de: 'Moll-Kadenz (i – iv – V7 – i)', en: 'Minor Cadence (i – iv – V7 – i)' }
  ];

  const PITCH_WHITE_PCS = [0, 2, 4, 5, 7, 9, 11];
  const PITCH_ALL_PCS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const REL_INTERVAL_NAME = {
    0: { de: 'Prime (C)', en: 'Unison (C)' },
    1: { de: 'kl. Sekunde über C', en: 'Minor 2nd above C' },
    2: { de: 'gr. Sekunde über C', en: 'Major 2nd above C' },
    3: { de: 'kl. Terz über C', en: 'Minor 3rd above C' },
    4: { de: 'gr. Terz über C', en: 'Major 3rd above C' },
    5: { de: 'reine Quarte über C', en: 'Perfect 4th above C' },
    6: { de: 'Tritonus über C', en: 'Tritone above C' },
    7: { de: 'reine Quinte über C', en: 'Perfect 5th above C' },
    8: { de: 'kl. Sexte über C', en: 'Minor 6th above C' },
    9: { de: 'gr. Sexte über C', en: 'Major 6th above C' },
    10: { de: 'kl. Septime über C', en: 'Minor 7th above C' },
    11: { de: 'gr. Septime über C', en: 'Major 7th above C' }
  };

  const BUILD_POOL = ['', 'm', 'dim', 'aug', '7', 'maj7', 'm7', 'sus4'];

  function stopCadenceAudio() {
    QSTATE.cadTimers.forEach(id => clearTimeout(id));
    QSTATE.cadTimers = [];
  }

  function pitchLabel(pc) {
    const T = MT.theory;
    if (pc === 6) return 'F♯ / G♭';
    const isBlack = [1, 3, 6, 8, 10].includes(pc);
    if (!isBlack) return T.noteName(pc);
    // For chromatic pitch quiz, show clear enharmonic pair (e.g. C♯ / D♭, or A♯ / B in DE)
    const sharp = T.fmtNote(T.N_SHARP[pc]);
    const flat = T.fmtNote(T.N_FLAT[pc]);
    return sharp === flat ? flat : `${sharp} / ${flat}`;
  }

  function newQuestion(autoplay = true) {
    stopCadenceAudio();
    QSTATE.answered = false;
    QSTATE.picked = null;
    QSTATE.buildSel = new Set();

    const T = MT.theory;
    const root = drawFromBag('root12', 12);
    const baseMidi = 57 + drawFromBag('intBase', 10); // A3..F#4

    if (QSTATE.mode === 'triads' || QSTATE.mode === 'sevenths') {
      const pool = QSTATE.mode === 'triads' ? TRIAD_OPTS : SEVENTH_OPTS;
      const ansIdx = drawFromBag(QSTATE.mode, pool.length);
      const opt = pool[ansIdx];
      const chord = { root, q: opt.q, rawName: T.N_FLAT[root] + T.SF[opt.q] };
      chord.name = T.fmtNote(chord.rawName);
      const v = T.voiceChord(chord, 0);
      QSTATE.current = { type: QSTATE.mode, chord, voicing: v, pool, ansIdx };
      if (autoplay) playPrompt('strum');
    } else if (QSTATE.mode === 'intervals') {
      const pool = QSTATE.intervalAll ? INTERVAL_ALL : INTERVAL_BASIC;
      const bagKey = QSTATE.intervalAll ? 'int_all' : 'int_basic';
      const ansIdx = drawFromBag(bagKey, pool.length);
      const opt = pool[ansIdx];
      QSTATE.current = { type: 'intervals', n1: baseMidi, n2: baseMidi + opt.s, pool, ansIdx };
      if (autoplay) playPrompt('arp');
    } else if (QSTATE.mode === 'cadences') {
      const key = drawFromBag('cadKey', 12);
      const ansIdx = drawFromBag('cadences', CADENCE_OPTS.length);
      const opt = CADENCE_OPTS[ansIdx];
      const { chords } = T.parseProgression(opt.toks, key, opt.mode);
      QSTATE.current = { type: 'cadences', key, opt, chords, pool: CADENCE_OPTS, ansIdx };
      if (autoplay) playPrompt('strum');
    } else if (QSTATE.mode === 'pitch') {
      const pcs = QSTATE.pitchAll12 ? PITCH_ALL_PCS : PITCH_WHITE_PCS;
      const bagKey = QSTATE.pitchAll12 ? 'pitch_all12' : 'pitch_white';
      const ansIdx = drawFromBag(bagKey, pcs.length);
      const pc = pcs[ansIdx];
      // Relative mode keeps mystery note in C4..B4 (or C5 for pc=0) right above C4 reference;
      // Absolute mode varies between C3..B4 (2 octaves) so you truly train pitch class!
      let midi;
      if (QSTATE.pitchRef) {
        midi = pc === 0 ? (Math.random() < 0.5 ? 60 : 72) : (60 + pc);
      } else {
        const octBase = Math.random() < 0.45 ? 48 : 60;
        midi = octBase + pc;
      }
      const pool = pcs.map(p => ({ pc: p, de: pitchLabel(p), en: pitchLabel(p) }));
      QSTATE.current = { type: 'pitch', pc, midi, refMidi: 60, withRef: QSTATE.pitchRef, pool, ansIdx };
      if (autoplay) playPrompt('pitch');
    } else if (QSTATE.mode === 'build') {
      const qIdx = drawFromBag('build_q', BUILD_POOL.length);
      const q = BUILD_POOL[qIdx];
      const chord = { root, q, rawName: T.N_FLAT[root] + T.SF[q] };
      chord.name = T.fmtNote(chord.rawName);
      const targetPCs = new Set(T.Q[q].map(s => (root + s) % 12));
      QSTATE.current = { type: 'build', chord, targetPCs };
    }
    render();
  }

  function playPrompt(style) {
    stopCadenceAudio();
    const q = QSTATE.current;
    if (!q) return;

    if (q.type === 'triads' || q.type === 'sevenths') {
      MT.audio.playChordNotes(q.voicing.all, 1.6, style || 'strum');
    } else if (q.type === 'intervals') {
      if (style === 'block') {
        MT.audio.playChordNotes([q.n1, q.n2], 1.4, 'block');
      } else {
        MT.audio.playNote(q.n1, 0.7, 0, 0.85);
        MT.audio.playNote(q.n2, 0.8, 0.52, 0.85);
        QSTATE.cadTimers.push(setTimeout(() => {
          MT.audio.playChordNotes([q.n1, q.n2], 1.1, 'block');
        }, 1120));
      }
    } else if (q.type === 'pitch') {
      if (style === 'ref') {
        MT.audio.playNote(q.refMidi, 0.85, 0, 0.85);
      } else if (q.withRef && style !== 'solo') {
        MT.audio.playNote(q.refMidi, 0.65, 0, 0.80);
        QSTATE.cadTimers.push(setTimeout(() => {
          MT.audio.playNote(q.midi, 1.2, 0, 0.90);
        }, 700));
      } else {
        MT.audio.playNote(q.midi, 1.25, 0, 0.90);
      }
    } else if (q.type === 'cadences') {
      const voicings = MT.theory.voiceProgression(q.chords, 10, 0, { key: q.key });
      let elapsedMs = 0;
      const beatMs = 680; // ~88 BPM calm cadence playback
      q.chords.forEach((c, idx) => {
        const beats = c.beats || 2;
        const durMs = beats * beatMs;
        const v = voicings[idx];
        const id = setTimeout(() => {
          MT.audio.playChordNotes(v.all, (durMs * 0.92) / 1000, 'strum');
        }, elapsedMs);
        QSTATE.cadTimers.push(id);
        elapsedMs += durMs;
      });
    } else if (q.type === 'build') {
      const v = MT.theory.voiceChord(q.chord, 0);
      MT.audio.playChordNotes(v.all, 1.5, style || 'strum');
    }
  }

  function answerChoice(idx) {
    if (QSTATE.answered || !QSTATE.current) return;
    QSTATE.answered = true;
    QSTATE.picked = idx;
    QSTATE.total++;
    const ok = idx === QSTATE.current.ansIdx;
    if (ok) {
      QSTATE.score++;
      QSTATE.streak++;
    } else {
      QSTATE.streak = 0;
    }
    if (QSTATE.current.chord && MT.app) {
      MT.app.showChord(QSTATE.current.chord, false);
    }
    render();
  }

  function checkBuild() {
    if (QSTATE.answered || !QSTATE.current) return;
    const pickedPCs = new Set([...QSTATE.buildSel].map(m => m % 12));
    const target = QSTATE.current.targetPCs;
    const ok = pickedPCs.size === target.size && [...target].every(pc => pickedPCs.has(pc));
    QSTATE.answered = true;
    QSTATE.picked = ok;
    QSTATE.total++;
    if (ok) {
      QSTATE.score++;
      QSTATE.streak++;
    } else {
      QSTATE.streak = 0;
    }
    const v = MT.theory.voiceChord(QSTATE.current.chord, 0);
    MT.audio.playChordNotes(v.all, 1.6, 'strum');
    if (MT.app) MT.app.showChord(QSTATE.current.chord, false);
    render();
  }

  function render() {
    const rootEl = document.getElementById('quiz-root');
    if (!rootEl) return;
    const T = MT.theory;
    const lang = MT.state.lang;

    const modes = [
      ['triads', MT.t('q_mode_triads')],
      ['sevenths', MT.t('q_mode_sevenths')],
      ['intervals', MT.t('q_mode_intervals')],
      ['cadences', MT.t('q_mode_cadences')],
      ['pitch', MT.t('q_mode_pitch')],
      ['build', MT.t('q_mode_build')]
    ];

    let body = '';
    const q = QSTATE.current;

    if (q) {
      // Refresh pitch option labels dynamically in case notation (H/B vs B/B♭) was toggled
      if (q.type === 'pitch') {
        q.pool.forEach(o => {
          const lbl = pitchLabel(o.pc);
          o.de = lbl;
          o.en = lbl;
        });
      }

      if (q.type === 'build') {
        const chordName = T.fmtNote(q.chord.rawName);
        const selNames = [...QSTATE.buildSel]
          .sort((a, b) => a - b)
          .map(m => T.noteName(m % 12))
          .join(' – ') || '—';

        const targetNotes = QSTATE.answered
          ? T.Q[q.chord.q].map(s => 60 + q.chord.root + s)
          : [];

        body = `
          <div class="quiz-box">
            <p style="font-size:1.05rem;font-weight:600;margin-top:0">${MT.t('q_build_prompt', { name: chordName, n: q.targetPCs.size })}</p>
            <div style="margin:12px 0">
              ${MT.visuals.pianoSVG({
                lo: 60,
                hi: 84,
                selectedNotes: [...QSTATE.buildSel],
                activeNotes: QSTATE.answered ? targetNotes : [],
                interactiveClass: 'quiz-piano-key'
              })}
            </div>
            <div class="row">
              <span>${MT.t('q_build_selected')} <b>${selNames}</b></span>
              <button class="btn sm" id="q-clear">${MT.t('q_build_clear')}</button>
              <button class="btn primary" id="q-check" ${QSTATE.answered || QSTATE.buildSel.size === 0 ? 'disabled' : ''}>${MT.t('check_answer')}</button>
              ${QSTATE.answered ? `<button class="btn primary" id="q-next">${MT.t('next_question')}</button>` : ''}
            </div>
            ${QSTATE.answered ? buildFeedback(q) : ''}
          </div>`;
      } else {
        let extra = '';
        if (q.type === 'intervals') {
          extra = `<div class="row">
            <button class="btn sm ${!QSTATE.intervalAll ? 'primary' : ''}" data-int-set="0">${MT.t('q_basic_only')}</button>
            <button class="btn sm ${QSTATE.intervalAll ? 'primary' : ''}" data-int-set="1">${MT.t('q_all_12')}</button>
          </div>`;
        } else if (q.type === 'pitch') {
          extra = `
            <div class="row">
              <button class="btn sm ${QSTATE.pitchRef ? 'primary' : ''}" data-pitch-ref="1">${MT.t('q_pitch_rel')}</button>
              <button class="btn sm ${!QSTATE.pitchRef ? 'primary' : ''}" data-pitch-ref="0">${MT.t('q_pitch_abs')}</button>
            </div>
            <div class="row" style="margin-top:6px">
              <button class="btn sm ${!QSTATE.pitchAll12 ? 'primary' : ''}" data-pitch-all="0">${MT.t('q_pitch_white')}</button>
              <button class="btn sm ${QSTATE.pitchAll12 ? 'primary' : ''}" data-pitch-all="1">${MT.t('q_pitch_all12')}</button>
            </div>`;
        }

        const optsHtml = q.pool.map((o, idx) => {
          let cls = 'quiz-opt';
          if (QSTATE.answered) {
            if (idx === q.ansIdx) cls += ' correct';
            else if (idx === QSTATE.picked) cls += ' wrong';
          }
          return `<button class="${cls}" data-qopt="${idx}" ${QSTATE.answered ? 'disabled' : ''}>${o[lang] || o.de}</button>`;
        }).join('');

        const pitchHint = q.type === 'pitch'
          ? `<p class="hint" style="margin:6px 0 8px">${q.withRef ? MT.t('q_pitch_hint_rel') : MT.t('q_pitch_hint_abs')}</p>`
          : '';

        const pitchVisual = (q.type === 'pitch' && QSTATE.answered)
          ? `<div style="margin-top:10px">${MT.visuals.pianoSVG({
              lo: q.midi < 60 ? 48 : 60,
              hi: q.midi < 60 ? 72 : 84,
              bass: q.withRef ? q.refMidi : null,
              activeNotes: [q.midi]
            })}</div>`
          : '';

        body = `
          ${extra}
          <div class="quiz-box">
            <div class="row">
              <button class="btn primary" id="q-replay">${MT.t('q_replay')}</button>
              ${q.type === 'pitch' && q.withRef ? `<button class="btn" id="q-play-ref">${MT.t('q_play_ref')}</button>` : ''}
              ${q.type !== 'cadences' && q.type !== 'pitch' ? `<button class="btn" id="q-replay-arp">${MT.t('q_replay_arp')}</button>` : ''}
              ${QSTATE.answered ? `<button class="btn primary" id="q-next" style="margin-left:auto">${MT.t('next_question')}</button>` : ''}
            </div>
            ${pitchHint}
            <div class="quiz-options">${optsHtml}</div>
            ${QSTATE.answered ? choiceFeedback(q) : ''}
            ${pitchVisual}
          </div>`;
      }
    }

    rootEl.innerHTML = `
      <h2>${MT.t('quiz_title')}</h2>
      <p class="hint">${MT.t('quiz_sub')}</p>
      <div class="quiz-modes">
        ${modes.map(([id, lbl]) => `<button data-qmode="${id}" class="${QSTATE.mode === id ? 'on' : ''}">${lbl}</button>`).join('')}
      </div>
      <div class="score-bar">
        <span>${MT.t('q_score')}: <b>${QSTATE.score} / ${QSTATE.total}</b></span>
        <span>${MT.t('q_streak')}: <b>🔥 ${QSTATE.streak}</b></span>
      </div>
      ${body}
    `;

    bindQuizEvents(rootEl);
  }

  function choiceFeedback(q) {
    const T = MT.theory;
    const lang = MT.state.lang;
    const ok = QSTATE.picked === q.ansIdx;
    const rightOpt = q.pool[q.ansIdx];
    let detail = '';

    if (q.type === 'triads' || q.type === 'sevenths') {
      const sp = T.spellChord(q.chord);
      const notes = T.Q[q.chord.q].map(s => T.fmtNote(sp[(q.chord.root + s) % 12])).join(' – ');
      detail = ` <b>${T.fmtNote(q.chord.rawName)}</b> (${notes})`;
    } else if (q.type === 'intervals') {
      detail = ` (${T.noteName(q.n1 % 12)} → ${T.noteName(q.n2 % 12)})`;
    } else if (q.type === 'pitch') {
      const noteOct = T.midiToName(q.midi);
      const relInfo = q.withRef && REL_INTERVAL_NAME[q.pc]
        ? ` · ${REL_INTERVAL_NAME[q.pc][lang] || REL_INTERVAL_NAME[q.pc].de}`
        : '';
      detail = ` (<b>${noteOct}</b>${relInfo})`;
    } else if (q.type === 'cadences') {
      const keyName = T.noteName(q.key) + (q.opt.mode === 'maj' ? MT.t('key_maj_sfx') : MT.t('key_min_sfx'));
      const cleanToks = q.opt.toks.replace(/:\d+/g, '');
      detail = ` — ${keyName}: <code>${cleanToks}</code> (${q.chords.map(c => T.fmtNote(c.rawName)).join(' – ')})`;
    }

    return `<div class="quiz-feedback ${ok ? 'ok' : 'err'}">
      <b>${ok ? MT.t('q_correct') : MT.t('q_wrong')}</b> ${rightOpt[lang] || rightOpt.de}${detail}
    </div>`;
  }

  function buildFeedback(q) {
    const T = MT.theory;
    const ok = QSTATE.picked === true;
    const sp = T.spellChord(q.chord);
    const notes = T.Q[q.chord.q].map(s => T.fmtNote(sp[(q.chord.root + s) % 12])).join(' – ');
    return `<div class="quiz-feedback ${ok ? 'ok' : 'err'}">
      <b>${ok ? MT.t('q_correct') : MT.t('q_wrong')}</b> ${T.fmtNote(q.chord.rawName)} = <b>${notes}</b>
    </div>`;
  }

  function bindQuizEvents(rootEl) {
    rootEl.querySelectorAll('[data-qmode]').forEach(btn => {
      btn.onclick = () => {
        QSTATE.mode = btn.dataset.qmode;
        newQuestion(QSTATE.mode !== 'build');
      };
    });
    rootEl.querySelectorAll('[data-int-set]').forEach(btn => {
      btn.onclick = () => {
        QSTATE.intervalAll = btn.dataset.intSet === '1';
        newQuestion(true);
      };
    });
    rootEl.querySelectorAll('[data-pitch-ref]').forEach(btn => {
      btn.onclick = () => {
        QSTATE.pitchRef = btn.dataset.pitchRef === '1';
        newQuestion(true);
      };
    });
    rootEl.querySelectorAll('[data-pitch-all]').forEach(btn => {
      btn.onclick = () => {
        QSTATE.pitchAll12 = btn.dataset.pitchAll === '1';
        newQuestion(true);
      };
    });
    rootEl.querySelectorAll('[data-qopt]').forEach(btn => {
      btn.onclick = () => answerChoice(+btn.dataset.qopt);
    });
    const rep = rootEl.querySelector('#q-replay');
    if (rep) rep.onclick = () => playPrompt(QSTATE.mode === 'pitch' ? 'pitch' : 'strum');
    const refBtn = rootEl.querySelector('#q-play-ref');
    if (refBtn) refBtn.onclick = () => playPrompt('ref');
    const repA = rootEl.querySelector('#q-replay-arp');
    if (repA) repA.onclick = () => playPrompt('arp');
    const nxt = rootEl.querySelector('#q-next');
    if (nxt) nxt.onclick = () => newQuestion(QSTATE.mode !== 'build');
    const clr = rootEl.querySelector('#q-clear');
    if (clr) clr.onclick = () => { QSTATE.buildSel.clear(); render(); };
    const chk = rootEl.querySelector('#q-check');
    if (chk) chk.onclick = checkBuild;

    rootEl.querySelectorAll('.quiz-piano-key').forEach(k => {
      k.onclick = () => {
        const midi = +k.dataset.midi;
        MT.audio.playNote(midi, 0.7, 0, 0.85);
        if (QSTATE.answered) return;
        if (QSTATE.buildSel.has(midi)) QSTATE.buildSel.delete(midi);
        else QSTATE.buildSel.add(midi);
        render();
      };
    });
  }

  function init() {
    if (!QSTATE.current) newQuestion(false);
    else render();
  }

  MT.quiz = { init, render, newQuestion, stopCadenceAudio };
})();
