/* Interactive Ear Training & Build-a-Chord Quiz Engine */
(function () {
  const QSTATE = {
    mode: 'triads', // 'triads' | 'sevenths' | 'intervals' | 'cadences' | 'build'
    intervalAll: false,
    score: 0,
    total: 0,
    streak: 0,
    current: null,
    answered: false,
    picked: null,
    buildSel: new Set(),
    cadTimers: []
  };

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
    { id: 'auth', toks: 'I IV V7 I', mode: 'maj', de: 'Authentische Vollkadenz (V7 → I)', en: 'Authentic Full Cadence (V7 → I)' },
    { id: 'plag', toks: 'I IV I', mode: 'maj', de: 'Plagalschluss (IV → I, „Amen“)', en: 'Plagal Cadence (IV → I, “Amen”)' },
    { id: 'decp', toks: 'I IV V7 vi', mode: 'maj', de: 'Trugschluss (V7 → vi)', en: 'Deceptive Cadence (V7 → vi)' },
    { id: 'half', toks: 'I vi IV V', mode: 'maj', de: 'Halbschluss (endet auf V)', en: 'Half Cadence (ends on V)' },
    { id: 'min', toks: 'i iv V7 i', mode: 'min', de: 'Moll-Kadenz (i – iv – V7 – i)', en: 'Minor Cadence (i – iv – V7 – i)' }
  ];

  const BUILD_POOL = ['', 'm', 'dim', 'aug', '7', 'maj7', 'm7', 'sus4'];

  function stopCadenceAudio() {
    QSTATE.cadTimers.forEach(id => clearTimeout(id));
    QSTATE.cadTimers = [];
  }

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function newQuestion(autoplay = true) {
    stopCadenceAudio();
    QSTATE.answered = false;
    QSTATE.picked = null;
    QSTATE.buildSel = new Set();

    const T = MT.theory;
    const root = Math.floor(Math.random() * 12);
    const baseMidi = 57 + Math.floor(Math.random() * 10); // A3..F#4

    if (QSTATE.mode === 'triads' || QSTATE.mode === 'sevenths') {
      const pool = QSTATE.mode === 'triads' ? TRIAD_OPTS : SEVENTH_OPTS;
      const ansIdx = Math.floor(Math.random() * pool.length);
      const opt = pool[ansIdx];
      const chord = { root, q: opt.q, rawName: T.N_FLAT[root] + T.SF[opt.q] };
      chord.name = T.fmtNote(chord.rawName);
      const v = T.voiceChord(chord, 0);
      QSTATE.current = { type: QSTATE.mode, chord, voicing: v, pool, ansIdx };
      if (autoplay) playPrompt('strum');
    } else if (QSTATE.mode === 'intervals') {
      const pool = QSTATE.intervalAll ? INTERVAL_ALL : INTERVAL_BASIC;
      const ansIdx = Math.floor(Math.random() * pool.length);
      const opt = pool[ansIdx];
      QSTATE.current = { type: 'intervals', n1: baseMidi, n2: baseMidi + opt.s, pool, ansIdx };
      if (autoplay) playPrompt('arp');
    } else if (QSTATE.mode === 'cadences') {
      const key = Math.floor(Math.random() * 12);
      const ansIdx = Math.floor(Math.random() * CADENCE_OPTS.length);
      const opt = CADENCE_OPTS[ansIdx];
      const { chords } = T.parseProgression(opt.toks, key, opt.mode);
      QSTATE.current = { type: 'cadences', key, opt, chords, pool: CADENCE_OPTS, ansIdx };
      if (autoplay) playPrompt('strum');
    } else if (QSTATE.mode === 'build') {
      const q = rand(BUILD_POOL);
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
        MT.audio.playNote(q.n2, 0.8, 0.48, 0.85);
        QSTATE.cadTimers.push(setTimeout(() => {
          MT.audio.playChordNotes([q.n1, q.n2], 1.1, 'block');
        }, 1050));
      }
    } else if (q.type === 'cadences') {
      let prev = null;
      q.chords.forEach((c, idx) => {
        const v = MT.theory.voiceChord(c, 9, prev);
        prev = v.upper;
        const id = setTimeout(() => {
          MT.audio.playChordNotes(v.all, 0.95, 'strum');
        }, idx * 820);
        QSTATE.cadTimers.push(id);
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
    // Show answered chord in Live View if applicable
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
      ['build', MT.t('q_mode_build')]
    ];

    let body = '';
    const q = QSTATE.current;

    if (q) {
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
        const extra = q.type === 'intervals'
          ? `<div class="row">
               <button class="btn sm ${!QSTATE.intervalAll ? 'primary' : ''}" data-int-set="0">${MT.t('q_basic_only')}</button>
               <button class="btn sm ${QSTATE.intervalAll ? 'primary' : ''}" data-int-set="1">${MT.t('q_all_12')}</button>
             </div>`
          : '';

        const optsHtml = q.pool.map((o, idx) => {
          let cls = 'quiz-opt';
          if (QSTATE.answered) {
            if (idx === q.ansIdx) cls += ' correct';
            else if (idx === QSTATE.picked) cls += ' wrong';
          }
          return `<button class="${cls}" data-qopt="${idx}" ${QSTATE.answered ? 'disabled' : ''}>${o[lang] || o.de}</button>`;
        }).join('');

        body = `
          ${extra}
          <div class="quiz-box">
            <div class="row">
              <button class="btn primary" id="q-replay">${MT.t('q_replay')}</button>
              ${q.type !== 'cadences' ? `<button class="btn" id="q-replay-arp">${MT.t('q_replay_arp')}</button>` : ''}
              ${QSTATE.answered ? `<button class="btn primary" id="q-next" style="margin-left:auto">${MT.t('next_question')}</button>` : ''}
            </div>
            <div class="quiz-options">${optsHtml}</div>
            ${QSTATE.answered ? choiceFeedback(q) : ''}
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
    } else if (q.type === 'cadences') {
      const keyName = T.noteName(q.key) + (q.opt.mode === 'maj' ? MT.t('key_maj_sfx') : MT.t('key_min_sfx'));
      detail = ` — ${keyName}: <code>${q.opt.toks}</code> (${q.chords.map(c => T.fmtNote(c.rawName)).join(' – ')})`;
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
    rootEl.querySelectorAll('[data-qopt]').forEach(btn => {
      btn.onclick = () => answerChoice(+btn.dataset.qopt);
    });
    const rep = rootEl.querySelector('#q-replay');
    if (rep) rep.onclick = () => playPrompt('strum');
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
