/* Main Application Controller — Navigation, Player, Live View, Widgets & State */
(function () {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const T = MT.theory;
  const A = MT.audio;
  const V = MT.visuals;
  const S = MT.state;

  const LS_KEY = 'hl-trainer-v2';

  const DEFAULT_PRESETS = {
    'Pop: I – V – vi – IV': ['I V vi IV', 'maj'],
    '50er: I – vi – IV – V': ['I vi IV V', 'maj'],
    'Kadenz (Takt-Mix): I:4 vi:4 ii7:2 V7:2': ['I:4 vi:4 ii7:2 V7:2', 'maj'],
    'Kadenz: I – IV – V7 – I': ['I IV V7 I', 'maj'],
    'Ballade (Absteigender Bass)': ['I V^1 vi vi7^3 IV I^1 ii7 V7', 'maj'],
    'Line Cliché (Dur): I – Imaj7 – I7 – IV': ['I Imaj7 I7 IV iv I', 'maj'],
    'Backdoor-Kadenz: I – iv7 – ♭VII7 – I': ['Imaj7 iv7 bVII7 Imaj7', 'maj'],
    'Jazz ii–V–I (Dur)': ['ii7 V7 Imaj7', 'maj'],
    'Jazz ii–V–i (Moll)': ['iiø V7 i', 'min'],
    'Turnaround: I – vi – ii – V': ['Imaj7 vi7 ii7 V7', 'maj'],
    'Pachelbel-Kanon': ['I V vi iii IV I IV V', 'maj'],
    '12-Takt-Blues': ['I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 V7', 'maj'],
    'Andalusische Kadenz': ['i bVII bVI V', 'min'],
    'Heldenkadenz (Modal Interchange)': ['I bVI bVII I', 'maj'],
    'Orgelpunkt: I – IV/I – V/I – I': ['I IV@I V@I I', 'maj'],
    'Sekundärdominanten': ['I V7/vi vi V7/V V7 I', 'maj'],
    'Tritonus-Substitution': ['ii7 bII7 Imaj7', 'maj'],
    'Neapolitaner + i⁶₄': ['i bII^1 i^2 V7 i', 'min']
  };

  let customPresets = {};
  const openChapters = {};
  const scaleIdxByWidget = { scales_basic: 0, scales_modes: 0, scales_world: 0 };
  let scalePlaying = false;

  // Player state (shared by Practice Tool & Lesson Examples)
  const P = {
    toks: 'I V vi IV',
    mode: 'maj',
    inv: 0,
    bpm: 100,
    beats: 4,
    reps: 2,
    mod: 'none',
    countIn: false,
    metro: false,
    gridMode: false,
    run: false,
    source: 'practice', // 'practice' | 'example'
    exBtnId: null,
    exChords: null,
    exChipContainerId: null,
    idx: 0,
    beat: 0,
    rep: 0,
    round: 0,
    nextKey: null,
    prevUpper: null,
    prevBass: null,
    timer: null,
    countingIn: 0
  };

  const ALL_LESSON_IDS = MT.CHAPTERS.flatMap(ch => ch.lessons);

  /* -------------------- Persistence -------------------- */
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      if (saved.lang === 'de' || saved.lang === 'en') S.lang = saved.lang;
      if (saved.notation === 'int' || saved.notation === 'de') S.notation = saved.notation;
      if (saved.labelMode === 'notes' || saved.labelMode === 'degrees') S.labelMode = saved.labelMode;
      if (saved.theme === 'dark' || saved.theme === 'light') {
        S.theme = saved.theme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        S.theme = 'dark';
      }
      if (saved.views) Object.assign(S.views, saved.views);
      if (saved.done) S.done = saved.done;
      if (saved.customPresets) customPresets = saved.customPresets;
      if (saved.audioStyle) A.setStyle(saved.audioStyle);
      if (typeof saved.audioVol === 'number') A.setVolume(saved.audioVol);
    } catch (e) {}
  }

  function saveState() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        lang: S.lang,
        notation: S.notation,
        labelMode: S.labelMode,
        theme: S.theme,
        views: S.views,
        done: S.done,
        customPresets,
        audioStyle: A.settings.style,
        audioVol: A.settings.volume
      }));
    } catch (e) {}
  }

  /* -------------------- Rich Text Formatting -------------------- */
  function formatRichText(html) {
    if (!html) return '';
    // Replace explicit [B], [B♭], [B°], [Bø7], [B7], [B♭♭] markers cleanly with active notation
    return html.replace(/\[([A-G][♭♯]*(?:m7♭5|maj7|m7|m|7|°7|°|ø7|ø|\+)?)\]/g, (_, tok) => T.fmtNote(tok));
  }

  /* -------------------- Theme, Language & Notation -------------------- */
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', S.theme);
    const btn = $('#theme-btn');
    if (btn) btn.textContent = S.theme === 'dark' ? '☀️' : '🌙';
  }

  function applyNotationBtn() {
    const btn = $('#notation-btn');
    if (btn) {
      btn.textContent = S.notation === 'de' ? MT.t('notation_de_label') : MT.t('notation_int_label');
    }
  }

  function applyStaticI18n() {
    document.documentElement.lang = S.lang;
    document.title = MT.t('app_title');
    $('#app-title').textContent = MT.t('app_title');
    $('#sb-title').textContent = MT.t('sb_title');

    $$('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      el.textContent = MT.t(k);
    });

    $$('.lang-switch button').forEach(b => {
      b.classList.toggle('sel', b.dataset.lang === S.lang);
    });

    populateKeySelects();
    populateVoicingSelect($('#p-inv'), P.inv);
    populateChordQualSelect();
    populatePresets();
    applyNotationBtn();
    renderSidebar();
    renderActiveTab();
    if (S.curChord) showChord(S.curChord, false);
  }

  function populateKeySelects() {
    const opts = T.N_FLAT.map((raw, i) => `<option value="${i}">${T.fmtNote(raw)}</option>`).join('');
    ['#global-key', '#p-key'].forEach(sel => {
      const el = $(sel);
      if (el) {
        el.innerHTML = opts;
        el.value = String(S.key);
      }
    });
  }

  function populateVoicingSelect(el, currentVal) {
    if (!el) return;
    const list = MT.I18N[S.lang].voicings;
    el.innerHTML = list.map(([v, lbl]) => `<option value="${v}">${lbl}</option>`).join('');
    el.value = String(currentVal);
  }

  function populateChordQualSelect() {
    const el = $('#c-qual');
    if (!el) return;
    const prev = el.value;
    el.innerHTML = Object.keys(T.Q)
      .filter(q => !['it6', 'fr6', 'ger6'].includes(q))
      .map(q => `<option value="${q}">C${T.SF[q]}</option>`)
      .join('');
    if (prev && T.Q[prev]) el.value = prev;
  }

  function populatePresets() {
    const el = $('#p-preset');
    if (!el) return;
    const prev = el.value;
    const all = Object.assign({}, DEFAULT_PRESETS, customPresets);
    el.innerHTML = `<option value="">${MT.t('preset_select')}</option>` +
      Object.keys(all).map(k => `<option value="${k}">${k}</option>`).join('');
    if (prev && all[prev]) el.value = prev;
    updateDeletePresetBtn();
  }

  function updateDeletePresetBtn() {
    const name = $('#p-preset').value;
    $('#p-delete').classList.toggle('hide', !(name && customPresets[name]));
  }

  /* -------------------- Sidebar & Progress -------------------- */
  function renderSidebar() {
    const doneCount = ALL_LESSON_IDS.filter(id => S.done[id]).length;
    const pct = Math.round((doneCount / ALL_LESSON_IDS.length) * 100);
    $('#sb-progress').innerHTML = `
      <div style="display:flex;justify-content:space-between">
        <span>${MT.t('progress_label')}</span>
        <strong>${doneCount} / ${ALL_LESSON_IDS.length}</strong>
      </div>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>
    `;

    const chapHtml = MT.CHAPTERS.map(ch => {
      const isOpen = openChapters[ch.id] !== false;
      const items = ch.lessons.map(id => {
        const les = MT.LESSONS[id];
        if (!les) return '';
        const active = S.tab === 'l' && S.lessonId === id;
        const checked = S.done[id] ? '<span class="sb-check">✓</span>' : '';
        let unitsHtml = '';
        if (active && les.units.length > 1) {
          unitsHtml = `<div class="sb-units">` + les.units.map((u, idx) =>
            `<a href="#" class="sb-unit-link${idx === S.unitIdx ? ' cur' : ''}" data-unit="${idx}">${idx + 1}. ${MT.loc(u.title)}</a>`
          ).join('') + `</div>`;
        }
        return `<button class="sb-btn${active ? ' on' : ''}" data-lesson="${id}"><span>${MT.loc(les.title)}</span>${checked}</button>${unitsHtml}`;
      }).join('');
      return `<details data-chap="${ch.id}"${isOpen ? ' open' : ''}><summary>${MT.loc(ch.title)}</summary><div class="sb-tree">${items}</div></details>`;
    }).join('');

    const tools = [
      ['p', MT.t('tool_practice')],
      ['e', MT.t('tool_quiz')],
      ['c', MT.t('tool_chords')],
      ['q', MT.t('tool_circle')]
    ];
    const toolsHtml = `<div class="sb-group-lbl">${MT.t('tools')}</div>` +
      tools.map(([id, lbl]) => `<button class="sb-btn${S.tab === id ? ' on' : ''}" data-tab="${id}">${lbl}</button>`).join('');

    $('#sb-content').innerHTML = chapHtml + toolsHtml;
  }

  function closeDrawer() {
    $('#app').classList.remove('drawer-open');
    $('#backdrop').classList.remove('show');
  }

  /* -------------------- Tab Switching -------------------- */
  function switchTab(tabId) {
    if (S.tab !== tabId) {
      stopPlayer();
      A.stopScale();
      MT.quiz.stopCadenceAudio();
    }
    S.tab = tabId;
    ['l', 'p', 'e', 'c', 'q'].forEach(k => {
      $('#tab-' + k).classList.toggle('hide', k !== tabId);
    });
    renderSidebar();
    renderActiveTab();
    closeDrawer();
  }

  function renderActiveTab() {
    if (S.tab === 'l') renderLesson();
    else if (S.tab === 'p') renderPracticeView();
    else if (S.tab === 'e') MT.quiz.init();
    else if (S.tab === 'c') renderChordTable();
    else if (S.tab === 'q') $('#q-circle').innerHTML = V.circleHTML(S.key);
  }

  /* -------------------- Global Key Sync -------------------- */
  function setGlobalKey(newKey) {
    S.key = ((newKey % 12) + 12) % 12;
    $('#global-key').value = String(S.key);
    $('#p-key').value = String(S.key);
    renderActiveTab();
  }

  const BASIC_VOICING_LESSONS = new Set([
    'welcome', 'scales_basic', 'triads', 'degrees_functions', 'roman_numerals',
    'minor_harmony', 'cadences', 'intervals', 'notation', 'circle_build',
    'chord_symbols', 'sus_add_six'
  ]);

  /* -------------------- Lesson Renderer -------------------- */
  function openLesson(lessonId, unitIdx = 0) {
    stopPlayer();
    A.stopScale();
    scalePlaying = false;
    const lessonChanged = S.lessonId !== lessonId || S.tab !== 'l';
    S.tab = 'l';
    S.lessonId = lessonId;
    const les = MT.LESSONS[lessonId];
    S.unitIdx = Math.max(0, Math.min(unitIdx, les.units.length - 1));

    // In foundational lessons default to Root Position (0) so inversions don't confuse beginners;
    // in voice-leading / jazz / advanced lessons default to Voice Leading · Start Root (10).
    if (lessonChanged) {
      P.inv = BASIC_VOICING_LESSONS.has(lessonId) ? 0 : 10;
      const pInvEl = $('#p-inv');
      if (pInvEl) pInvEl.value = String(P.inv);
    }

    // Ensure chapter is open
    const chap = MT.CHAPTERS.find(c => c.lessons.includes(lessonId));
    if (chap) openChapters[chap.id] = true;

    ['l', 'p', 'e', 'c', 'q'].forEach(k => $('#tab-' + k).classList.toggle('hide', k !== 'l'));
    renderSidebar();
    renderLesson();
    closeDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderLesson() {
    const les = MT.LESSONS[S.lessonId];
    if (!les) return;
    const unit = les.units[S.unitIdx] || les.units[0];
    const chap = MT.CHAPTERS.find(c => c.lessons.includes(S.lessonId));
    const lesNum = ALL_LESSON_IDS.indexOf(S.lessonId);
    const badgeLbl = (MT.I18N[S.lang].badges || {})[les.badge] || les.badge;
    const isDone = !!S.done[S.lessonId];

    // Unit stepper pills
    const pills = les.units.length > 1
      ? `<div class="unit-pills">` + les.units.map((u, i) =>
          `<button class="unit-pill${i === S.unitIdx ? ' cur' : ''}" data-unit="${i}">${i + 1}. ${MT.loc(u.title)}</button>`
        ).join('') + `</div>`
      : '';

    // Curated Widget for this exact unit
    let widgetHtml = '';
    if (unit.widget) {
      widgetHtml = `<div id="unit-widget" style="margin:14px 0">${renderUnitWidget(unit.widget)}</div>`;
    }

    // Curated Listening Examples for this exact unit
    let exHtml = '';
    if (unit.examples && unit.examples.length) {
      const voicingOpts = MT.I18N[S.lang].voicings
        .map(([v, lbl]) => `<option value="${v}"${v === P.inv ? ' selected' : ''}>${lbl}</option>`).join('');

      const cards = unit.examples.map((ex, idx) => {
        const { chords } = T.parseProgression(ex.toks, S.key, ex.mode);
        const chipsId = `ex-chips-${idx}`;
        const btnId = `ex-btn-${idx}`;
        const rawDesc = MT.loc(ex.desc);
        const desc = ex.transpose
          ? T.transposeText(rawDesc.replace(/\[([^\]]+)\]/g, '$1'), S.key)
          : formatRichText(rawDesc);
        const relHtml = ex.relHint ? T.relativeMajorHint(ex.toks, S.key) : '';

        return `
          <div class="ex-card">
            <div class="ex-card-head">
              <strong>${formatRichText(MT.loc(ex.title))}</strong>
              <div class="row" style="margin:0">
                <button class="btn sm primary" id="${btnId}" data-ex-play="${idx}">${MT.t('listen')}</button>
                <button class="btn sm" data-ex-open="${idx}" title="${MT.t('open_in_practice')}">🎛</button>
              </div>
            </div>
            <div class="chips" id="${chipsId}">${chipsHTML(chords, -1)}</div>
            <p>${desc}</p>
            ${relHtml}
          </div>`;
      }).join('');

      const basicTip = BASIC_VOICING_LESSONS.has(S.lessonId)
        ? `<div class="callout tip" style="margin:8px 0 12px;font-size:.88rem">${MT.t('voicing_basic_tip')}</div>`
        : '';

      exHtml = `
        <div class="ex-section">
          <div class="card-head">
            <h3 style="margin:0">${MT.t('examples_title')}</h3>
            <label class="inline-ctrl">
              <span>${MT.t('voicing')}</span>
              <select id="lesson-voicing">${voicingOpts}</select>
            </label>
          </div>
          <p class="hint" style="margin-top:0">${MT.t('examples_note')}</p>
          ${basicTip}
          ${cards}
        </div>`;
    }

    // Inline Mini-Check
    let checkHtml = '';
    if (unit.check) {
      checkHtml = `
        <div class="quiz-box" id="mini-check">
          <h4 style="margin-top:0">✅ ${MT.t('mini_check')}</h4>
          <p style="font-weight:600">${formatRichText(MT.loc(unit.check.q))}</p>
          <div class="quiz-options">
            ${unit.check.opts.map((o, idx) => `<button class="quiz-opt" data-mc="${idx}">${formatRichText(MT.loc(o))}</button>`).join('')}
          </div>
          <div id="mc-feedback"></div>
        </div>`;
    }

    const isFirst = lesNum === 0 && S.unitIdx === 0;
    const isLast = lesNum === ALL_LESSON_IDS.length - 1 && S.unitIdx === les.units.length - 1;

    $('#lesson-card').innerHTML = `
      <div class="meta-row">
        <span>${MT.loc(chap.title)} › ${MT.t('lesson_of', { i: lesNum + 1, n: ALL_LESSON_IDS.length })}</span>
        <span class="badge ${les.badge}">${badgeLbl}</span>
        <button class="btn sm ${isDone ? 'primary' : ''}" id="mark-done-btn" style="margin-left:auto">
          ${isDone ? MT.t('done_btn_on') : MT.t('done_btn')}
        </button>
      </div>
      <h2>${MT.loc(les.title)}</h2>
      ${pills}
      <div class="prose">
        ${les.units.length > 1 ? `<h3 style="margin-top:0">${MT.loc(unit.title)}</h3>` : ''}
        ${unit.transposeBody ? T.transposeHTML(MT.loc(unit.body, S.key), S.key) : formatRichText(MT.loc(unit.body, S.key))}
      </div>
      ${widgetHtml}
      ${exHtml}
      ${checkHtml}
      <div class="lesson-nav">
        <button class="btn" id="nav-prev" ${isFirst ? 'disabled' : ''}>${MT.t('prev')}</button>
        <span class="hint">${MT.t('unit_of', { u: S.unitIdx + 1, n: les.units.length })}</span>
        <button class="btn primary" id="nav-next" ${isLast ? 'disabled' : ''}>${MT.t('next')}</button>
      </div>
    `;

    bindLessonEvents(les, unit);
  }

  function renderUnitWidget(type) {
    if (type === 'scales_basic' || type === 'scales_modes' || type === 'scales_world') {
      return renderScaleWidgetHTML(type);
    }
    if (type === 'circle') {
      return V.circleHTML(S.key);
    }
    if (type === 'caged') {
      return V.cagedHTML(S.key);
    }
    if (type === 'chord_table') {
      return renderChordSymbolTableHTML(S.key);
    }
    if (type === 'triad_table') {
      return renderTriadTableHTML(S.key);
    }
    if (type === 'interval_table') {
      return renderIntervalTableHTML(S.key);
    }
    if (type === 'sec_dom_table') {
      return renderSecDomTableHTML(S.key);
    }
    if (type === 'note_rest_table') {
      return V.noteRestTableHTML();
    }
    if (type === 'articulation_symbols') {
      return V.articulationSymbolsHTML();
    }
    if (type === 'notation_treble') {
      return `
        <div class="ex-card">
          <h4>${S.lang === 'en' ? 'Natural notes in the treble clef' : 'Stammtöne im Violinschlüssel'}</h4>
          ${V.singleStaffSVG([[60, 'C'], [62, 'D'], [64, 'E'], [65, 'F'], [67, 'G'], [69, 'A'], [71, 'B'], [72, 'C']], 'treble')}
          <h4>${S.lang === 'en' ? 'Notes with accidentals' : 'Noten mit Vorzeichen (♯ und ♭)'}</h4>
          ${V.singleStaffSVG([[61, 'C♯'], [63, 'E♭'], [66, 'F♯'], [68, 'A♭'], [70, 'B♭']], 'treble')}
        </div>`;
    }
    if (type === 'notation_bass') {
      return `
        <div class="ex-card">
          <h4>${S.lang === 'en' ? 'Bass clef notes (G2 to C4)' : 'Töne im Bassschlüssel (G2 bis C4)'}</h4>
          ${V.singleStaffSVG([[43, 'G'], [45, 'A'], [47, 'B'], [48, 'C'], [50, 'D'], [52, 'E'], [53, 'F'], [55, 'G'], [57, 'A'], [60, 'C']], 'bass')}
        </div>`;
    }
    return '';
  }

  function renderScaleWidgetHTML(widgetType) {
    const list = widgetType === 'scales_basic' ? T.SCALES_BASIC
      : widgetType === 'scales_modes' ? T.SCALES_MODES
      : T.SCALES_WORLD;
    const idx = Math.min(scaleIdxByWidget[widgetType] || 0, list.length - 1);
    const sc = list[idx];
    const ints = sc.ints;
    const isSeven = ints.length === 7;
    const base = 60 + S.key;
    const midiNotes = [...ints.map(x => base + x), base + 12];
    const degLabels = T.scaleDegreeLabels(ints);
    const rawNames = ints.map((x, i) => isSeven ? T.spellInKey(S.key, x, i) : T.N_FLAT[(S.key + x) % 12]);
    const dispNames = rawNames.map(n => T.fmtNote(n));
    const steps = ints.map((x, i) => {
      const d = (ints[i + 1] != null ? ints[i + 1] : 12) - x;
      if (S.lang === 'en') return d === 1 ? 'H' : d === 2 ? 'W' : d === 3 ? '1½' : String(d);
      return d === 1 ? 'H' : d === 2 ? 'G' : d === 3 ? '1½' : String(d);
    });

    const parentHtml = sc.parentOff != null
      ? `<p class="hint" style="margin:6px 0">${MT.t('mode_of', { k: T.noteName((S.key - sc.parentOff + 12) % 12), d: sc.deg })}</p>`
      : '';

    const spMap = {};
    ints.forEach((x, i) => { spMap[(S.key + x) % 12] = rawNames[i]; });

    let harmHtml = '';
    if (isSeven) {
      const { triads, sevenths } = T.harmonizeScale(ints, S.key);
      harmHtml = `
        <h4>${MT.t('scale_triads')}</h4>
        <div class="chips">${chipsHTML(triads, -1)}</div>
        <h4>${MT.t('scale_sevenths')}</h4>
        <div class="chips">${chipsHTML(sevenths, -1)}</div>`;
    } else {
      harmHtml = `<p class="hint">${MT.t('scale_no_chords')}</p>`;
    }

    const opts = list.map((s, i) => `<option value="${i}"${i === idx ? ' selected' : ''}>${MT.loc(s.name)}</option>`).join('');

    return `
      <div class="ex-card" data-scale-widget="${widgetType}">
        <div class="row" style="margin-top:0">
          <label class="inline-ctrl">
            <span>${MT.t('scale_select')}</span>
            <select id="scale-picker" data-sw="${widgetType}">${opts}</select>
          </label>
          <button class="btn sm ${scalePlaying ? 'playing' : 'primary'}" id="scale-play-btn" data-notes="${midiNotes.join(',')}">
            ${scalePlaying ? MT.t('scale_stop') : MT.t('scale_listen')}
          </button>
          <span class="hint">${S.lang === 'en' ? 'Steps' : 'Schritte'}: <b>${steps.join(' ')}</b></span>
        </div>
        <h4 style="margin:6px 0 4px">${T.noteName(S.key)} – ${MT.loc(sc.name)}</h4>
        ${parentHtml}
        <table class="sc-tbl">
          <tr>${degLabels.map(d => `<td><b>${d}</b></td>`).join('')}</tr>
          <tr>${dispNames.map(n => `<td>${n}</td>`).join('')}</tr>
        </table>
        ${V.pianoSVG({ lo: 60, hi: 84, bass: base, activeNotes: midiNotes.slice(1), spellMap: spMap })}
        ${harmHtml}
      </div>`;
  }

  function renderChordSymbolTableHTML(key) {
    const ROWS = [
      ['', 'Dur', 'Major'],
      ['m', 'Moll', 'Minor'],
      ['dim', 'vermindert', 'Diminished'],
      ['aug', 'übermäßig', 'Augmented'],
      ['7', 'Dominantsept', 'Dominant 7th'],
      ['maj7', 'Dur + gr. Septime', 'Major 7th'],
      ['m7', 'Moll + kl. Septime', 'Minor 7th'],
      ['m7b5', 'halbvermindert', 'Half-diminished'],
      ['dim7', 'vollvermindert', 'Fully diminished'],
      ['sus2', 'Sekunde statt Terz', '2nd instead of 3rd'],
      ['sus4', 'Quarte statt Terz', '4th instead of 3rd'],
      ['6', 'Dreiklang + Sexte', 'Triad + 6th'],
      ['add9', 'Dreiklang + 9 (ohne 7)', 'Triad + 9 (no 7th)'],
      ['9', 'Dominantsept + 9', 'Dominant 9th']
    ];
    const DEG_MAP = (q, s, i) => {
      if (s === 14) return '9';
      if (q === 'dim7' && i === 3) return '♭♭7';
      if ((q === 'dim' || q === 'm7b5') && s === 6) return '♭5';
      if (q === 'aug' && s === 8) return '♯5';
      return ['1', '♭2', '2', '♭3', '3', '4', '♭5', '5', '♯5', '6', '♭7', '7'][s % 12];
    };

    const trs = ROWS.map(([q, de, en]) => {
      const c = { root: key, q, rawName: T.N_FLAT[key] + T.SF[q] };
      c.name = T.fmtNote(c.rawName);
      const sp = T.spellChord(c);
      const degs = T.Q[q].map((s, i) => DEG_MAP(q, s, i)).join(' ');
      const notes = T.Q[q].map(s => T.fmtNote(sp[(key + s) % 12])).join(' ');
      return `<tr>
        <td><button class="btn sm" data-chord-root="${key}" data-chord-q="${q}" data-chord-name="${c.rawName}"><b>${c.name}</b></button></td>
        <td>${S.lang === 'en' ? en : de}</td>
        <td><code>${degs}</code></td>
        <td>${notes}</td>
      </tr>`;
    }).join('');

    return `
      <h4>${MT.t('sym_table_title', { k: T.noteName(key) })}</h4>
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr><th>${MT.t('col_symbol')}</th><th>${MT.t('col_meaning')}</th><th>${MT.t('col_degrees')}</th><th>${MT.t('col_notes')}</th></tr>
          ${trs}
        </table>
      </div>`;
  }

  function renderTriadTableHTML(key) {
    const en = S.lang === 'en';
    const ROWS = [
      ['', 'I', en ? 'Major' : 'Dur', '4 + 3', '1 – 3 – 5', en ? 'bright, stable' : 'hell, stabil'],
      ['m', 'i', en ? 'Minor' : 'Moll', '3 + 4', '1 – ♭3 – 5', en ? 'dark, gentle' : 'dunkel, weich'],
      ['dim', 'i°', en ? 'Diminished' : 'Vermindert', '3 + 3', '1 – ♭3 – ♭5', en ? 'tense, compact' : 'gespannt, eng'],
      ['aug', 'I+', en ? 'Augmented' : 'Übermäßig', '4 + 4', '1 – 3 – ♯5', en ? 'floating' : 'schwebend']
    ];
    const kName = T.noteName(key);
    const trs = ROWS.map(([q, tok, lbl, thirds, degs, mood]) => {
      const c = { root: key, q, rawName: T.N_FLAT[key] + T.SF[q], tok };
      c.name = T.fmtNote(c.rawName);
      const sp = T.spellChord(c);
      const notes = T.Q[q].map(s => T.fmtNote(sp[(key + s) % 12])).join(' – ');
      return `<tr>
        <td><button class="btn sm" data-chord-root="${key}" data-chord-q="${q}" data-chord-name="${c.rawName}" data-chord-tok="${tok}"><b>${c.name}</b></button></td>
        <td><b>${lbl}</b> (${tok})</td>
        <td>${thirds}</td>
        <td><code>${degs}</code></td>
        <td>${notes}</td>
        <td class="hint">${mood}</td>
      </tr>`;
    }).join('');

    return `
      <h4>${MT.t('triad_tbl_title', { k: kName })}</h4>
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr>
            <th>${en ? 'Chord' : 'Akkord'}</th>
            <th>${en ? 'Type' : 'Art'}</th>
            <th>${en ? 'Thirds' : 'Terzen'}</th>
            <th>${MT.t('col_degrees')}</th>
            <th>${en ? 'On ' + kName : 'Auf ' + kName}</th>
            <th>${en ? 'Character' : 'Klang'}</th>
          </tr>
          ${trs}
        </table>
      </div>`;
  }

  function renderIntervalTableHTML(key) {
    const en = S.lang === 'en';
    const kName = T.noteName(key);
    const ROWS = [
      [0, en ? 'Unison' : 'Prime', '1', 0],
      [1, en ? 'Minor 2nd' : 'kleine Sekunde', '♭2', 1],
      [2, en ? 'Major 2nd' : 'große Sekunde', '2', 1],
      [3, en ? 'Minor 3rd (minor)' : 'kleine Terz (Moll)', '♭3', 2],
      [4, en ? 'Major 3rd (major)' : 'große Terz (Dur)', '3', 2],
      [5, en ? 'Perfect 4th' : 'reine Quarte', '4', 3],
      [6, en ? 'Tritone' : 'Tritonus', '♯4 / ♭5', 3],
      [7, en ? 'Perfect 5th' : 'reine Quinte', '5', 4],
      [8, en ? 'Minor 6th' : 'kleine Sexte', '♭6 / ♯5', 5],
      [9, en ? 'Major 6th' : 'große Sexte', '6', 5],
      [10, en ? 'Minor 7th' : 'kleine Septime', '♭7', 6],
      [11, en ? 'Major 7th' : 'große Septime', '7', 6],
      [12, en ? 'Octave' : 'Oktave', '8', 0]
    ];

    const trs = ROWS.map(([semi, name, short, step]) => {
      const targetNote = semi === 12
        ? kName
        : T.fmtNote(T.spellInKey(key, semi, step));
      return `<tr>
        <td><button class="btn sm" data-play-interval="${semi}" title="${MT.t('listen')}">▶ ${semi}</button></td>
        <td>${semi === 6 ? '<b>' + name + '</b>' : name}</td>
        <td><code>${short}</code></td>
        <td><b>${kName} → ${targetNote}</b></td>
      </tr>`;
    }).join('');

    return `
      <h4>${MT.t('int_tbl_title', { k: kName })}</h4>
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr>
            <th>${en ? 'Semitones' : 'Halbtöne'}</th>
            <th>${en ? 'Interval' : 'Intervall'}</th>
            <th>${en ? 'Shorthand' : 'Kurzzeichen'}</th>
            <th>${en ? 'From ' + kName : 'Ab ' + kName}</th>
          </tr>
          ${trs}
        </table>
      </div>`;
  }

  function renderSecDomTableHTML(key) {
    const en = S.lang === 'en';
    const kName = T.noteName(key);
    const TARGETS = [
      ['ii', 'V7/ii', false],
      ['iii', 'V7/iii', false],
      ['IV', 'V7/IV', true],
      ['V', 'V7/V', false],
      ['vi', 'V7/vi', false]
    ];

    const trs = TARGETS.map(([tgtTok, domTok, isSeventhFall]) => {
      const tgt = T.parseChord(tgtTok, key, 'maj');
      const dom = T.parseChord(domTok, key, 'maj');
      const spDom = T.spellChord(dom);
      const spTgt = T.spellChord(tgt);
      const resStr = isSeventhFall
        ? `${T.fmtNote(spDom[(dom.root + 10) % 12])} → ${T.fmtNote(spTgt[(tgt.root + 4) % 12])} (${en ? '7th falls!' : 'Septime fällt!'})`
        : `${T.fmtNote(spDom[(dom.root + 4) % 12])} → ${T.fmtNote(spTgt[tgt.root])}`;

      return `<tr>
        <td>${tgtTok} (${tgt.name})</td>
        <td><code>${domTok}</code></td>
        <td><button class="btn sm" data-chord-root="${dom.root}" data-chord-q="${dom.q}" data-chord-name="${dom.rawName}" data-chord-tok="${domTok}"><b>${dom.name}</b></button></td>
        <td>${resStr}</td>
      </tr>`;
    }).join('');

    return `
      <h4>${MT.t('secdom_tbl_title', { k: kName })}</h4>
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr>
            <th>${en ? 'Target in ' + kName : 'Ziel in ' + kName}</th>
            <th>${MT.t('col_symbol')}</th>
            <th>${en ? 'Secondary Dom.' : 'Zwischendominante'}</th>
            <th>${en ? 'Leading tone → Target' : 'Leitton → Ziel'}</th>
          </tr>
          ${trs}
        </table>
      </div>`;
  }

  function bindLessonEvents(les, unit) {
    const lv = $('#lesson-voicing');
    if (lv) {
      lv.onchange = () => {
        P.inv = +lv.value;
        $('#p-inv').value = String(P.inv);
        if (S.curChord) showChord(S.curChord, false);
      };
    }

    const doneBtn = $('#mark-done-btn');
    if (doneBtn) {
      doneBtn.onclick = () => {
        S.done[S.lessonId] = !S.done[S.lessonId];
        saveState();
        renderSidebar();
        renderLesson();
      };
    }

    const prevBtn = $('#nav-prev');
    if (prevBtn) prevBtn.onclick = () => stepUnit(-1);

    const nextBtn = $('#nav-next');
    if (nextBtn) nextBtn.onclick = () => {
      // Auto-mark lesson learned when stepping past its final unit
      if (S.unitIdx === les.units.length - 1 && !S.done[S.lessonId]) {
        S.done[S.lessonId] = true;
        saveState();
      }
      stepUnit(1);
    };

    // Scale picker & Play/Stop
    const sp = $('#scale-picker');
    if (sp) {
      sp.onchange = () => {
        A.stopScale();
        scalePlaying = false;
        scaleIdxByWidget[sp.dataset.sw] = +sp.value;
        $('#unit-widget').innerHTML = renderScaleWidgetHTML(sp.dataset.sw);
        bindLessonEvents(les, unit);
      };
    }

    const spBtn = $('#scale-play-btn');
    if (spBtn) {
      spBtn.onclick = () => {
        if (scalePlaying) {
          A.stopScale();
          scalePlaying = false;
          spBtn.textContent = MT.t('scale_listen');
          spBtn.classList.remove('playing');
          spBtn.classList.add('primary');
          return;
        }
        stopPlayer();
        const notes = spBtn.dataset.notes.split(',').map(Number);
        scalePlaying = true;
        spBtn.textContent = MT.t('scale_stop');
        spBtn.classList.remove('primary');
        spBtn.classList.add('playing');
        A.playScale(notes, 340, null, () => {
          scalePlaying = false;
          const b = $('#scale-play-btn');
          if (b) {
            b.textContent = MT.t('scale_listen');
            b.classList.remove('playing');
            b.classList.add('primary');
          }
        });
      };
    }

    // Lesson example play/stop & open in practice tool
    $$('[data-ex-play]').forEach(btn => {
      btn.onclick = () => {
        const idx = +btn.dataset.exPlay;
        const btnId = btn.id;
        if (P.run && P.source === 'example' && P.exBtnId === btnId) {
          stopPlayer();
          return;
        }
        const ex = unit.examples[idx];
        const { chords } = T.parseProgression(ex.toks, S.key, ex.mode);
        startExamplePlayer(chords, btnId, `ex-chips-${idx}`);
      };
    });

    $$('[data-ex-open]').forEach(btn => {
      btn.onclick = () => {
        const ex = unit.examples[+btn.dataset.exOpen];
        P.toks = ex.toks;
        P.mode = ex.mode;
        P.reps = 2;
        P.mod = 'none';
        syncPracticeControls();
        switchTab('p');
      };
    });

    // Inline Mini-Check
    if (unit.check) {
      $$('[data-mc]').forEach(btn => {
        btn.onclick = () => {
          const picked = +btn.dataset.mc;
          const ok = picked === unit.check.ans;
          $$('[data-mc]').forEach((b, i) => {
            b.disabled = true;
            if (i === unit.check.ans) b.classList.add('correct');
            else if (i === picked) b.classList.add('wrong');
          });
          $('#mc-feedback').innerHTML = `<div class="quiz-feedback ${ok ? 'ok' : 'err'}">
            <b>${ok ? MT.t('q_correct') : MT.t('q_wrong')}</b> ${formatRichText(MT.loc(unit.check.exp))}
          </div>`;
        };
      });
    }
  }

  function stepUnit(dir) {
    const les = MT.LESSONS[S.lessonId];
    const nextU = S.unitIdx + dir;
    if (nextU >= 0 && nextU < les.units.length) {
      openLesson(S.lessonId, nextU);
    } else {
      const li = ALL_LESSON_IDS.indexOf(S.lessonId) + dir;
      if (li < 0 || li >= ALL_LESSON_IDS.length) return;
      const targetId = ALL_LESSON_IDS[li];
      const targetU = dir < 0 ? MT.LESSONS[targetId].units.length - 1 : 0;
      openLesson(targetId, targetU);
    }
  }

  /* -------------------- Chips Helper -------------------- */
  function chipsHTML(chords, activeIdx) {
    return chords.map((c, i) => `
      <button class="chip${i === activeIdx ? ' on' : ''}"
        data-chord-root="${c.root}"
        data-chord-q="${c.q}"
        data-chord-name="${c.rawName}"
        data-chord-tok="${c.tok || ''}"
        data-chord-fi="${c.fi != null ? c.fi : ''}"
        data-chord-cbass="${c.customBassPC != null ? c.customBassPC : ''}">
        <b>${T.fmtToken(c.tok || '')}</b>
        <span>${T.fmtNote(c.rawName)}</span>
      </button>`).join('');
  }

  /* -------------------- Live-View -------------------- */
  function showChord(chord, shouldPlay = true, playStyle = null, forcedVoicing = null) {
    const inv = S.tab === 'c' ? +$('#c-inv').value : P.inv;
    const voicing = forcedVoicing || T.voiceChord(chord, inv, null, 0, { key: S.key });
    const sp = T.spellChord(chord);
    S.curChord = Object.assign({}, chord, { _voicing: voicing });

    $('#live-chord-name').textContent = T.fmtNote(chord.rawName || chord.name);
    $('#live-chord-deg').textContent = chord.tok ? T.fmtToken(chord.tok) : '';
    const bassName = T.midiToName(voicing.bass, sp);
    const upperNames = voicing.upper.map(m => T.midiToName(m, sp)).join(' – ');
    $('#live-chord-notes').textContent = `${bassName} | ${upperNames}`;
    $('#live-play-block').disabled = false;
    $('#live-play-arp').disabled = false;

    if (shouldPlay) {
      A.playChordNotes(voicing.all, 1.45, playStyle || A.settings.style);
    }

    renderLiveBody(S.curChord, voicing, sp);
  }

  function renderLiveBody(chord, voicing, sp) {
    const bassPC = voicing.bass % 12;
    const dm = T.chordDegreeMap(chord);
    const isDeg = S.labelMode === 'degrees';
    const requireBass = (chord.fi != null && chord.fi > 0) || chord.customBassPC != null || (S.tab === 'c' && +$('#c-inv').value > 0);
    let html = '<div class="live-grid">';

    if (S.views.piano) {
      const legend = isDeg
        ? `<div class="legend-dots">
             <span><i class="dot-sw" style="background:var(--deg-root)"></i>${MT.t('deg_leg_root')}</span>
             <span><i class="dot-sw" style="background:var(--deg-third)"></i>${MT.t('deg_leg_third')}</span>
             <span><i class="dot-sw" style="background:var(--deg-fifth)"></i>${MT.t('deg_leg_fifth')}</span>
             <span><i class="dot-sw" style="background:var(--deg-seventh)"></i>${MT.t('deg_leg_seventh')}</span>
             <span><i class="dot-sw" style="background:var(--deg-ext)"></i>${MT.t('deg_leg_ext')}</span>
           </div>`
        : `<div class="legend-dots">
             <span><i class="dot-sw" style="background:var(--root)"></i>${MT.t('bass_legend')}</span>
             <span><i class="dot-sw" style="background:var(--accent)"></i>${MT.t('chord_legend')}</span>
           </div>`;

      const pLo = S.key >= 7 ? 36 : 48;
      html += `
        <div class="live-piano-box">
          ${V.pianoSVG({
            lo: pLo,
            hi: pLo + 36,
            bass: voicing.bass,
            activeNotes: voicing.upper,
            spellMap: sp,
            degreeMap: dm,
            labelMode: S.labelMode
          })}
          ${legend}
        </div>`;
    }

    if (S.views.staff) {
      html += `<div class="live-staff-box">${V.grandStaffSVG(voicing, sp)}</div>`;
    }

    if (S.views.guitar || S.views.ukulele) {
      const gGrips = S.views.guitar ? T.findGrips('Gitarre', chord, bassPC, requireBass) : [];
      const uGrips = S.views.ukulele ? T.findGrips('Ukulele', chord, bassPC, requireBass) : [];
      const refGrips = S.views.guitar ? gGrips : uGrips;
      const nVar = Math.max(1, refGrips.length);
      const curIdx = Math.min(S.gripVariant, nVar - 1);
      const gVarOpts = Array.from({ length: nVar }, (_, i) => {
        const pos = refGrips[i] ? ' · ' + T.gripPosLabel(refGrips[i]) : '';
        return `<option value="${i}"${i === curIdx ? ' selected' : ''}>${i + 1}${pos}</option>`;
      }).join('');
      const varSelect = `<div style="margin-bottom:4px"><label class="inline-ctrl" style="font-size:.76rem"><span>${MT.t('grip_variant')}</span><select id="live-gv" style="padding:2px 5px;font-size:.78rem">${gVarOpts}</select></label></div>`;
      const fretOpts = { degreeMap: dm, spellMap: sp, labelMode: S.labelMode };

      if (S.views.guitar) {
        const grip = gGrips[Math.min(S.gripVariant, Math.max(0, gGrips.length - 1))] || null;
        html += `<div class="live-fret-box">${varSelect}<div class="hint" style="font-size:.78rem">${MT.t('guitar')}${grip ? ' (' + T.gripPosLabel(grip) + ')' : ''}</div>${V.fretSVG(grip, chord.root, 'Gitarre', fretOpts)}</div>`;
      }
      if (S.views.ukulele) {
        const grip = uGrips[Math.min(S.gripVariant, Math.max(0, uGrips.length - 1))] || null;
        html += `<div class="live-fret-box">${!S.views.guitar ? varSelect : ''}<div class="hint" style="font-size:.78rem">${MT.t('ukulele')}${grip ? ' (' + T.gripPosLabel(grip) + ')' : ''}</div>${V.fretSVG(grip, chord.root, 'Ukulele', fretOpts)}</div>`;
      }
    }

    html += '</div>';
    $('#live-body').innerHTML = html;

    const gv = $('#live-gv');
    if (gv) {
      gv.onchange = () => {
        S.gripVariant = +gv.value;
        renderLiveBody(chord, voicing, sp);
      };
    }
  }

  /* -------------------- Practice Tool & Player Engine -------------------- */
  function syncPracticeControls() {
    $('#p-editor').value = P.toks;
    $('#p-mode').value = P.mode;
    $('#p-key').value = String(S.key);
    $('#p-inv').value = String(P.inv);
    $('#p-bpm').value = String(P.bpm);
    $('#p-bpm-num').value = String(P.bpm);
    $('#p-bpm-val').textContent = String(P.bpm);
    $('#p-beats').value = String(P.beats);
    $('#p-reps').value = String(P.reps);
    $('#p-mod').value = P.mod;
    $('#p-countin').checked = P.countIn;
    $('#p-metro').checked = P.metro;
    $('#p-grid-mode').checked = P.gridMode;
    renderPracticeView();
  }

  function renderBeatBar(activeBeat = -1, countInNum = 0, totalBeats = P.beats) {
    const bar = $('#beat-bar');
    if (!bar) return;
    const prefix = countInNum > 0 ? `<span class="beat-countin">Count-in: ${countInNum}</span>` : '';
    let dots = '';
    for (let b = 0; b < totalBeats; b++) {
      dots += `<span class="beat-dot${b === 0 ? ' down' : ''}${b === activeBeat ? ' on' : ''}"></span>`;
    }
    bar.innerHTML = prefix + dots;
  }

  function renderPracticeView(activeIdx = -1, activeBeat = -1) {
    const { chords, invalid } = T.parseProgression(P.toks, S.key, P.mode);
    const errEl = $('#p-error');
    if (invalid.length) {
      errEl.textContent = MT.t('parse_warn', { bad: invalid.join(', ') });
      errEl.classList.remove('hide');
    } else {
      errEl.classList.add('hide');
    }

    const box = $('#p-chips');
    const hasCustomBeats = chords.some(c => c.beats != null);
    if (P.gridMode || hasCustomBeats) {
      box.classList.add('beat-grid');
      box.innerHTML = chords.map((c, i) => {
        const len = c.beats != null ? c.beats : P.beats;
        const pips = Array.from({ length: len }, (_, b) =>
          `<span class="beat-pip filled${i === activeIdx && b === activeBeat ? ' cur' : ''}"></span>`
        ).join('');
        const grow = Math.max(1, len);
        return `
          <div class="grid-chip-card${i === activeIdx ? ' on' : ''}" style="flex:${grow} 1 ${66 + len * 14}px">
            <button class="grid-chip-main"
              data-chord-root="${c.root}"
              data-chord-q="${c.q}"
              data-chord-name="${c.rawName}"
              data-chord-tok="${c.tok || ''}"
              data-chord-fi="${c.fi != null ? c.fi : ''}"
              data-chord-cbass="${c.customBassPC != null ? c.customBassPC : ''}">
              <b>${T.fmtToken(c.tok || '')}</b>
              <span>${T.fmtNote(c.rawName)}</span>
            </button>
            <div class="grid-chip-bar">
              <div class="beat-pips" title="${len} ${MT.t('beats_per_chord')}">${pips}</div>
              <div class="beat-adj">
                <button type="button" data-beat-adj="-1" data-beat-idx="${i}" title="-1">−</button>
                <button type="button" data-beat-adj="1" data-beat-idx="${i}" title="+1">+</button>
              </div>
            </div>
          </div>`;
      }).join('');
    } else {
      box.classList.remove('beat-grid');
      box.innerHTML = chipsHTML(chords, activeIdx);
    }

    const keyLbl = T.noteName(S.key) + (P.mode === 'maj' ? MT.t('key_maj_sfx') : MT.t('key_min_sfx'));
    let info = `${MT.t('key')}: ${keyLbl}`;
    if (P.run && P.source === 'practice' && P.mod !== 'none' && P.rep + 1 >= P.reps) {
      const nk = peekNextKey();
      const nkLbl = T.noteName(nk) + (P.mode === 'maj' ? MT.t('key_maj_sfx') : MT.t('key_min_sfx'));
      info += `  ${MT.t('next_round_warn')} ${nkLbl}`;
    }
    $('#p-key-info').textContent = info;
    if (!P.run) renderBeatBar(-1, 0, P.beats);
  }

  function adjustChordBeats(idx, delta) {
    const rawTokens = (P.toks || '').split(/[\s,|–—]+/).filter(Boolean);
    let validIdx = 0;
    for (let i = 0; i < rawTokens.length; i++) {
      const c = T.parseChord(rawTokens[i], S.key, P.mode);
      if (!c) continue;
      if (validIdx === idx) {
        const cur = c.beats != null ? c.beats : P.beats;
        const next = Math.max(1, Math.min(8, cur + delta));
        const baseTok = rawTokens[i].replace(/:\d+$/, '');
        rawTokens[i] = `${baseTok}:${next}`;
        P.toks = rawTokens.join(' ');
        $('#p-editor').value = P.toks;
        renderPracticeView();
        return;
      }
      validIdx++;
    }
  }

  function peekNextKey() {
    if (P.mod === 'none') return S.key;
    if (P.mod === 'r') {
      if (P.nextKey == null) P.nextKey = Math.floor(Math.random() * 12);
      return P.nextKey;
    }
    return (S.key + +P.mod) % 12;
  }

  function applyModulation() {
    if (P.mod === 'none') return;
    const nk = peekNextKey();
    P.nextKey = null;
    S.key = nk;
    $('#global-key').value = String(S.key);
    $('#p-key').value = String(S.key);
  }

  function stopPlayer() {
    clearTimeout(P.timer);
    P.timer = null;
    P.run = false;
    P.countingIn = 0;

    $('#p-start').textContent = MT.t('start');
    $('#p-start').classList.remove('playing');
    $('#p-start').classList.add('primary');

    if (P.exBtnId) {
      const btn = document.getElementById(P.exBtnId);
      if (btn) {
        btn.textContent = MT.t('listen');
        btn.classList.remove('playing');
        btn.classList.add('primary');
      }
    }
    if (P.exChipContainerId && P.exChords) {
      const box = document.getElementById(P.exChipContainerId);
      if (box) box.innerHTML = chipsHTML(P.exChords, -1);
    }

    P.exBtnId = null;
    P.exChords = null;
    P.exChipContainerId = null;
    if (S.tab === 'p') renderPracticeView(-1);
    renderBeatBar(-1, 0);
  }

  function startPracticePlayer() {
    stopPlayer();
    A.stopScale();
    const { chords } = T.parseProgression(P.toks, S.key, P.mode);
    if (!chords.length) return;

    P.run = true;
    P.source = 'practice';
    P.idx = 0;
    P.beat = 0;
    P.rep = 0;
    P.round = 0;
    P.nextKey = null;
    P.prevUpper = null;
    P.prevBass = null;
    P.countingIn = P.countIn ? P.beats : 0;

    $('#p-start').textContent = MT.t('stop');
    $('#p-start').classList.remove('primary');
    $('#p-start').classList.add('playing');

    tickPlayer();
  }

  function startExamplePlayer(chords, btnId, chipContainerId) {
    stopPlayer();
    A.stopScale();
    if (!chords || !chords.length) return;

    P.run = true;
    P.source = 'example';
    P.exBtnId = btnId;
    P.exChords = chords;
    P.exChipContainerId = chipContainerId;
    P.idx = 0;
    P.beat = 0;
    P.round = 0;
    P.prevUpper = null;
    P.prevBass = null;
    P.countingIn = 0;

    const btn = document.getElementById(btnId);
    if (btn) {
      btn.textContent = MT.t('stop');
      btn.classList.remove('primary');
      btn.classList.add('playing');
    }

    tickPlayer();
  }

  function tickPlayer() {
    if (!P.run) return;
    const beatMs = 60000 / P.bpm;

    // Handle optional count-in
    if (P.countingIn > 0) {
      const curBeat = P.beats - P.countingIn;
      renderBeatBar(curBeat, curBeat + 1);
      A.playClick(curBeat === 0);
      P.countingIn--;
      P.timer = setTimeout(tickPlayer, beatMs);
      return;
    }

    const chords = P.source === 'example'
      ? P.exChords
      : T.parseProgression(P.toks, S.key, P.mode).chords;

    if (!chords || !chords.length) return stopPlayer();
    if (P.idx >= chords.length) P.idx = 0;

    const c = chords[P.idx];
    const beatsThisChord = P.source === 'example'
      ? Math.min(2, P.beats)
      : (c.beats != null ? c.beats : P.beats);

    if (P.source === 'practice') {
      renderBeatBar(P.beat, 0, beatsThisChord);
      if (P.metro) A.playClick(P.beat === 0);
    }

    // Trigger chord on beat 0
    if (P.beat === 0) {
      if (P.idx === 0) {
        P.prevUpper = null;
        P.prevBass = null;
      }
      const v = T.voiceChord(c, P.inv, P.prevUpper, P.round, { key: S.key, prevBass: P.prevBass });
      P.prevUpper = v.upper;
      P.prevBass = v.bass;

      if (P.source === 'practice') {
        renderPracticeView(P.idx, P.beat);
      } else if (P.exChipContainerId) {
        const box = document.getElementById(P.exChipContainerId);
        if (box) box.innerHTML = chipsHTML(chords, P.idx);
      }

      const chordDurSec = (beatMs * beatsThisChord * 0.94) / 1000;
      showChord(c, false, null, v);
      A.playChordNotes(v.all, chordDurSec, A.settings.style);
    } else if (P.source === 'practice' && (P.gridMode || chords.some(x => x.beats != null))) {
      renderPracticeView(P.idx, P.beat);
    }

    // Advance beat / chord
    P.beat++;
    if (P.beat >= beatsThisChord) {
      P.beat = 0;
      P.idx++;
      if (P.idx >= chords.length) {
        if (P.source === 'example') {
          P.timer = setTimeout(stopPlayer, beatMs);
          return;
        }
        P.idx = 0;
        P.round++;
        P.rep++;
        if (P.rep >= P.reps) {
          P.rep = 0;
          applyModulation();
        }
      }
    }

    P.timer = setTimeout(tickPlayer, beatMs);
  }

  /* -------------------- Chord Table Tab -------------------- */
  function renderChordTable() {
    const q = $('#c-qual').value;
    const ins = $('#c-inst').value;
    const inv = +$('#c-inv').value;

    $('#c-grid').innerHTML = T.N_FLAT.map((rawRoot, r) => {
      const c = { root: r, q, rawName: rawRoot + T.SF[q] };
      c.name = T.fmtNote(c.rawName);
      const v = T.voiceChord(c, inv, null, 0, { key: r });
      const sp = T.spellChord(c);
      const dm = T.chordDegreeMap(c);
      let visual = '';
      if (ins === 'Klavier') {
        const pLo = r >= 7 ? 36 : 48;
        visual = V.pianoSVG({
          lo: pLo, hi: pLo + 36,
          bass: v.bass, activeNotes: v.upper,
          spellMap: sp, degreeMap: dm, labelMode: S.labelMode
        });
      } else {
        const grips = T.findGrips(ins, c, v.bass % 12, inv > 0);
        visual = V.fretSVG(grips[0] || null, r, ins, { degreeMap: dm, spellMap: sp, labelMode: S.labelMode });
      }
      return `<div class="grid-cell" data-chord-root="${r}" data-chord-q="${q}" data-chord-name="${c.rawName}">
        <div style="font-weight:700;margin-bottom:6px">${c.name}</div>
        ${visual}
      </div>`;
    }).join('');
  }

  /* -------------------- Global Delegated Events -------------------- */
  function bindGlobalEvents() {
    // Sidebar toggle (desktop collapse / mobile drawer)
    $('#sb-toggle').onclick = () => {
      if (window.innerWidth <= 860) {
        const open = $('#app').classList.toggle('drawer-open');
        $('#backdrop').classList.toggle('show', open);
      } else {
        $('#app').classList.toggle('sb-collapsed');
      }
    };
    $('#sb-close').onclick = closeDrawer;
    $('#backdrop').onclick = closeDrawer;

    // Topbar controls
    $('#global-key').onchange = e => setGlobalKey(+e.target.value);
    $('#notation-btn').onclick = () => {
      S.notation = S.notation === 'int' ? 'de' : 'int';
      saveState();
      applyStaticI18n();
    };
    $('#theme-btn').onclick = () => {
      S.theme = S.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyTheme();
    };
    $$('.lang-switch button').forEach(b => {
      b.onclick = () => {
        S.lang = b.dataset.lang;
        saveState();
        applyStaticI18n();
      };
    });

    // Live-View controls
    $('#live-toggle').onclick = () => {
      const wrap = $('#live-wrap');
      const min = wrap.classList.toggle('minimized');
      $('#live-toggle').textContent = min ? '▴' : '▾';
    };
    $('#live-play-block').onclick = () => {
      if (S.curChord && S.curChord._voicing) {
        A.playChordNotes(S.curChord._voicing.all, 1.5, 'strum');
      }
    };
    $('#live-play-arp').onclick = () => {
      if (S.curChord && S.curChord._voicing) {
        A.playChordNotes(S.curChord._voicing.all, 1.7, 'arp');
      }
    };
    $$('#label-mode-toggle button').forEach(btn => {
      btn.classList.toggle('on', btn.dataset.lmode === S.labelMode);
      btn.onclick = () => {
        S.labelMode = btn.dataset.lmode;
        $$('#label-mode-toggle button').forEach(b => b.classList.toggle('on', b.dataset.lmode === S.labelMode));
        saveState();
        if (S.curChord && S.curChord._voicing) {
          renderLiveBody(S.curChord, S.curChord._voicing, T.spellChord(S.curChord));
        }
        if (S.tab === 'c') renderChordTable();
        if (S.tab === 'l' && S.lessonId === 'caged') renderLesson();
      };
    });
    $$('#inst-filter button').forEach(btn => {
      const k = btn.dataset.view;
      btn.classList.toggle('on', !!S.views[k]);
      btn.onclick = () => {
        S.views[k] = !S.views[k];
        // Ensure at least one view remains active
        if (!Object.values(S.views).some(Boolean)) S.views[k] = true;
        $$('#inst-filter button').forEach(b => b.classList.toggle('on', !!S.views[b.dataset.view]));
        saveState();
        if (S.curChord && S.curChord._voicing) {
          renderLiveBody(S.curChord, S.curChord._voicing, T.spellChord(S.curChord));
        }
      };
    });

    // Practice tool inputs
    $('#p-preset').onchange = e => {
      const all = Object.assign({}, DEFAULT_PRESETS, customPresets);
      const pr = all[e.target.value];
      if (pr) {
        P.toks = pr[0];
        P.mode = pr[1];
        syncPracticeControls();
      }
      updateDeletePresetBtn();
    };
    $('#p-mode').onchange = e => { P.mode = e.target.value; renderPracticeView(); };
    $('#p-key').onchange = e => setGlobalKey(+e.target.value);
    $('#p-inv').onchange = e => { P.inv = +e.target.value; if (S.curChord) showChord(S.curChord, false); };
    $('#p-editor').oninput = e => { P.toks = e.target.value; renderPracticeView(); };

    const syncBpm = val => {
      P.bpm = Math.max(40, Math.min(220, +val || 100));
      $('#p-bpm').value = String(P.bpm);
      $('#p-bpm-num').value = String(P.bpm);
      $('#p-bpm-val').textContent = String(P.bpm);
    };
    $('#p-bpm').oninput = e => syncBpm(e.target.value);
    $('#p-bpm-num').oninput = e => syncBpm(e.target.value);

    $('#p-beats').onchange = e => { P.beats = +e.target.value; renderBeatBar(-1, 0); };
    $('#p-reps').oninput = e => { P.reps = Math.max(1, Math.min(32, +e.target.value || 1)); };
    $('#p-mod').onchange = e => { P.mod = e.target.value; P.nextKey = null; };
    $('#p-countin').onchange = e => { P.countIn = e.target.checked; };
    $('#p-metro').onchange = e => { P.metro = e.target.checked; };
    $('#p-grid-mode').onchange = e => { P.gridMode = e.target.checked; renderPracticeView(); };

    $('#p-start').onclick = () => {
      if (P.run && P.source === 'practice') stopPlayer();
      else startPracticePlayer();
    };

    $('#p-save').onclick = () => {
      const name = prompt(MT.t('preset_prompt'));
      if (!name || !name.trim()) return;
      customPresets[name.trim()] = [P.toks, P.mode];
      saveState();
      populatePresets();
      $('#p-preset').value = name.trim();
      updateDeletePresetBtn();
    };

    $('#p-delete').onclick = () => {
      const name = $('#p-preset').value;
      if (name && customPresets[name]) {
        delete customPresets[name];
        saveState();
        populatePresets();
      }
    };

    // Audio & MIDI controls
    $('#audio-style').value = A.settings.style;
    $('#audio-style').onchange = e => { A.setStyle(e.target.value); saveState(); };
    $('#audio-vol').value = String(Math.round(A.settings.volume * 100));
    $('#audio-vol').oninput = e => { A.setVolume(+e.target.value / 100); saveState(); };
    $('#audio-internal').onchange = e => A.setInternal(e.target.checked);

    $('#midi-btn').onclick = async () => {
      const ok = await A.enableMIDI($('#midi-out'), $('#midi-status'), (cc, val) => {
        if (cc === 1) syncBpm(Math.round(40 + (val / 127) * 180));
        else if (cc === 2) { P.reps = 1 + Math.round((val / 127) * 15); $('#p-reps').value = String(P.reps); }
        else if (cc === 64 && val > 63) {
          if (P.run) stopPlayer();
          else startPracticePlayer();
        }
      });
      if (ok) $('#midi-btn').textContent = MT.t('midi_active');
    };

    // Chord table selects
    $('#c-qual').onchange = renderChordTable;
    $('#c-inst').onchange = renderChordTable;
    $('#c-inv').onchange = renderChordTable;

    // Document-wide click delegation (Sidebar, Chips, Interactive Piano Keys, Circle of Fifths)
    document.addEventListener('click', e => {
      let el;

      // Sidebar chapter lesson click
      if ((el = e.target.closest('[data-lesson]'))) {
        openLesson(el.dataset.lesson, 0);
        return;
      }
      // Sidebar or pill unit click
      if ((el = e.target.closest('[data-unit]'))) {
        e.preventDefault();
        openLesson(S.lessonId, +el.dataset.unit);
        return;
      }
      // Sidebar tool tab click
      if ((el = e.target.closest('[data-tab]'))) {
        switchTab(el.dataset.tab);
        return;
      }
      // Circle of Fifths key click
      if ((el = e.target.closest('g[data-ck]'))) {
        setGlobalKey(+el.dataset.ck);
        return;
      }
      // Interactive piano key click (Live View or Scale Widget)
      if ((el = e.target.closest('.piano-key'))) {
        const midi = +el.dataset.midi;
        A.playNote(midi, 0.8, 0, 0.85);
        return;
      }
      // Interval table play button -> play melodic then harmonic interval!
      if ((el = e.target.closest('[data-play-interval]'))) {
        const semi = +el.dataset.playInterval;
        const n1 = 60 + S.key;
        const n2 = n1 + semi;
        A.playNote(n1, 0.7, 0, 0.85);
        A.playNote(n2, 0.85, 0.42, 0.85);
        setTimeout(() => A.playChordNotes([n1, n2], 1.1, 'block'), 920);
        return;
      }
      // Beat grid +/- length adjustment
      if ((el = e.target.closest('[data-beat-adj]'))) {
        adjustChordBeats(+el.dataset.beatIdx, +el.dataset.beatAdj);
        return;
      }
      // Any chord chip or chord table cell click -> PLAY + SHOW IMMEDIATELY!
      if ((el = e.target.closest('[data-chord-root]'))) {
        const cb = el.dataset.chordCbass;
        const chord = {
          root: +el.dataset.chordRoot,
          q: el.dataset.chordQ || '',
          rawName: el.dataset.chordName,
          tok: el.dataset.chordTok || '',
          fi: el.dataset.chordFi !== '' && el.dataset.chordFi != null ? +el.dataset.chordFi : null,
          customBassPC: cb !== '' && cb != null ? +cb : null
        };
        chord.name = T.fmtNote(chord.rawName);
        showChord(chord, true);
        return;
      }
    });

    // Track open/closed chapters in sidebar
    document.addEventListener('toggle', e => {
      if (e.target && e.target.dataset && e.target.dataset.chap) {
        openChapters[e.target.dataset.chap] = e.target.open;
      }
    }, true);
  }

  /* -------------------- Boot -------------------- */
  function init() {
    loadState();
    applyTheme();
    bindGlobalEvents();
    applyStaticI18n();
    syncPracticeControls();
    openLesson('welcome', 0);
  }

  MT.app = { showChord, openLesson, setGlobalKey, stopPlayer };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
