/* Visual SVG Renderers — Interactive Piano, Grand Staff, Fretboards, Circle of Fifths & CAGED */
(function () {
  const WHITE = [0, 2, 4, 5, 7, 9, 11];
  const LETTERS = 'CDEFGAB';

  function ledger(x, y) {
    return `<line x1="${x - 10}" x2="${x + 10}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1.2"/>`;
  }

  /**
   * Interactive clickable piano SVG.
   * options: { lo, hi, bass, activeNotes, selectedNotes, spellMap, degreeMap, labelMode, interactiveClass }
   */
  function pianoSVG(opts) {
    const T = MT.theory;
    const all = (opts.activeNotes || []).concat(opts.bass != null ? [opts.bass] : []);
    let lo = opts.lo != null ? opts.lo : (all.length ? Math.floor(Math.min(...all) / 12) * 12 : 48);
    let hi = opts.hi != null ? opts.hi : (all.length ? Math.ceil((Math.max(...all) + 1) / 12) * 12 : 84);
    if (all.length) {
      const minA = Math.floor(Math.min(...all) / 12) * 12;
      const maxA = Math.ceil((Math.max(...all) + 1) / 12) * 12;
      if (minA < lo) lo = minA;
      if (maxA > hi) hi = maxA;
    }
    hi = Math.max(hi, lo + 24);

    const activeSet = new Set(opts.activeNotes || []);
    const selSet = new Set(opts.selectedNotes || []);
    const pos = {};
    let x = 0;
    const kw = 26;
    const kh = 104;
    const bw = 18;
    const bh = 62;

    for (let m = lo; m < hi; m++) {
      if (WHITE.includes(m % 12)) {
        pos[m] = x;
        x += kw;
      }
    }

    let h = '';
    const cls = opts.interactiveClass || 'piano-key';
    const sp = opts.spellMap || null;
    const dm = opts.degreeMap || null;
    const showDeg = opts.labelMode === 'degrees' && dm;

    // White keys
    for (const mStr in pos) {
      const m = +mStr;
      const pc = m % 12;
      const isBass = opts.bass === m;
      const isAct = activeSet.has(m);
      const isSel = selSet.has(m);
      const isOn = isBass || isAct || isSel;
      const deg = showDeg ? dm[pc] : null;

      let fill = 'var(--surface)';
      if (isSel) fill = 'var(--ok)';
      else if (isOn && deg) fill = deg.color;
      else if (isBass) fill = 'var(--root)';
      else if (isAct) fill = 'var(--accent)';

      const textCol = isOn ? '#fff' : 'var(--muted)';
      const lbl = isOn
        ? (deg ? deg.label : T.fmtNote((sp && sp[pc]) || T.N_FLAT[pc]))
        : (pc === 0 ? 'C' + (m / 12 - 1) : '');

      h += `<g class="${cls}" data-midi="${m}">`;
      h += `<rect x="${pos[m]}" y="0" width="${kw}" height="${kh}" rx="2.5" fill="${fill}" stroke="var(--border)" stroke-width="1"/>`;
      if (isBass && showDeg) {
        h += `<rect x="${pos[m] + 3}" y="${kh - 5}" width="${kw - 6}" height="3" rx="1.5" fill="#fff" opacity="0.95" pointer-events="none"/>`;
      }
      if (lbl) {
        const fs = isOn ? (lbl.length > 2 ? 10 : lbl.length === 2 ? 11.5 : 13) : 9.5;
        const ty = isOn ? (kh - (isBass && showDeg ? 11 : 10)) : (kh - 8);
        h += `<text x="${pos[m] + kw / 2}" y="${ty}" text-anchor="middle" font-size="${fs}" font-weight="${isOn ? 800 : 500}" fill="${textCol}" pointer-events="none">${lbl}</text>`;
      }
      h += `</g>`;
    }

    // Black keys
    for (let m = lo + 1; m < hi; m++) {
      if (!WHITE.includes(m % 12) && pos[m - 1] != null) {
        const pc = m % 12;
        const isBass = opts.bass === m;
        const isAct = activeSet.has(m);
        const isSel = selSet.has(m);
        const isOn = isBass || isAct || isSel;
        const deg = showDeg ? dm[pc] : null;

        let fill = '#222429';
        if (isSel) fill = 'var(--ok)';
        else if (isOn && deg) fill = deg.color;
        else if (isBass) fill = 'var(--root)';
        else if (isAct) fill = 'var(--accent)';

        const bx = pos[m - 1] + kw - bw / 2;
        h += `<g class="${cls}" data-midi="${m}">`;
        h += `<rect x="${bx}" y="0" width="${bw}" height="${bh}" rx="2.5" fill="${fill}" stroke="#111" stroke-width="1"/>`;
        if (isOn) {
          const bLbl = deg ? deg.label : T.fmtNote((sp && sp[pc]) || T.N_FLAT[pc]);
          const fs = bLbl.length > 2 ? 7.5 : bLbl.length === 2 ? 9.5 : 11;
          h += `<text x="${bx + bw / 2}" y="${bh - 8}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#fff" pointer-events="none">${bLbl}</text>`;
          if (isBass && showDeg) {
            h += `<rect x="${bx + 3}" y="${bh - 4}" width="${bw - 6}" height="2.4" rx="1" fill="#fff" opacity="0.95" pointer-events="none"/>`;
          }
        }
        h += `</g>`;
      }
    }

    return `<svg class="piano-svg" viewBox="0 0 ${x} ${kh}" aria-label="Klaviatur">${h}</svg>`;
  }

  // Helper: diatonic step index for MIDI note + spelled name (C4 = 28)
  function diatonicStep(midi, rawName) {
    const acc = rawName.slice(1);
    const accOff = acc.length ? (acc[0] === '♯' ? acc.length : -acc.length) : 0;
    const oct = Math.floor((midi - accOff) / 12) - 1;
    return oct * 7 + LETTERS.indexOf(rawName[0]);
  }

  /**
   * Grand Staff (Treble + Bass Clef) for a voiced chord { bass, upper }
   */
  function grandStaffSVG(voicing, spellMap) {
    const T = MT.theory;
    const W = 152;
    let h = '';

    // Brace line on left
    h += `<line x1="8" y1="24" x2="8" y2="144" stroke="currentColor" stroke-width="2.5"/>`;

    // Treble staff lines (y = 24, 34, 44, 54, 64 -> F5, D5, B4, G4, E4)
    [24, 34, 44, 54, 64].forEach(y => {
      h += `<line x1="8" x2="${W - 4}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });
    // Bass staff lines (y = 104, 114, 124, 134, 144 -> A3, F3, D3, B2, G2)
    [104, 114, 124, 134, 144].forEach(y => {
      h += `<line x1="8" x2="${W - 4}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });

    // Clef symbols
    h += `<text x="12" y="61" font-size="52" fill="currentColor">𝄞</text>`;
    h += `<text x="13" y="136" font-size="44" fill="currentColor">𝄢</text>`;

    // Split notes: bass in bass clef (or <60), upper in treble clef
    const trebleNotes = (voicing.upper || []).slice().sort((a, b) => a - b);
    const bassNotes = voicing.bass != null ? [voicing.bass] : [];

    function renderGroup(notes, isTreble, color) {
      let prevD = -99;
      let shifted = 0;
      const usedAccSlots = [];

      notes.forEach(midi => {
        const raw = (spellMap && spellMap[midi % 12]) || T.N_FLAT[midi % 12];
        const acc = raw.slice(1);
        const d = diatonicStep(midi, raw);
        // Treble: E4 = d=30 at y=64; Bass: A3 = d=26 at y=104
        const y = isTreble ? 64 - (d - 30) * 5 : 104 + (26 - d) * 5;
        shifted = (d - prevD <= 1 && !shifted) ? 1 : 0;
        prevD = d;
        const x = 96 + shifted * 13;

        // Ledger lines
        if (isTreble) {
          for (let ly = 74; ly <= y + 1; ly += 10) h += ledger(x, ly);
          for (let ly = 14; ly >= y - 1; ly -= 10) h += ledger(x, ly);
        } else {
          for (let ly = 94; ly >= y - 1; ly -= 10) h += ledger(x, ly);
          for (let ly = 154; ly <= y + 1; ly += 10) h += ledger(x, ly);
        }

        h += `<ellipse cx="${x}" cy="${y}" rx="6.5" ry="4.6" fill="${color}" transform="rotate(-14 ${x} ${y})"/>`;

        if (acc) {
          let ax = x - 18 - (acc.length - 1) * 8;
          if (usedAccSlots.some(py => Math.abs(py - y) < 12)) {
            ax -= 13;
          }
          usedAccSlots.push(y);
          h += `<text x="${ax}" y="${y + 5.5}" font-size="17" font-weight="700" fill="${color}">${acc}</text>`;
        }
      });
    }

    renderGroup(trebleNotes, true, 'currentColor');
    renderGroup(bassNotes, false, 'var(--root)');

    return `<svg viewBox="0 0 ${W} 168" style="width:100%;max-width:160px;color:var(--fg)" aria-label="Notensystem">${h}</svg>`;
  }

  /**
   * Single-clef sequential staff for notation lessons (clef: 'treble' | 'bass')
   */
  function singleStaffSVG(items, clef = 'treble') {
    const W = 68 + items.length * 32;
    const isTreble = clef === 'treble';
    let h = '';
    [24, 34, 44, 54, 64].forEach(y => {
      h += `<line x1="6" x2="${W - 4}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });
    h += isTreble
      ? `<text x="10" y="61" font-size="52" fill="currentColor">𝄞</text>`
      : `<text x="10" y="56" font-size="44" fill="currentColor">𝄢</text>`;

    items.forEach(([midi, rawName], i) => {
      const acc = rawName.slice(1);
      const d = diatonicStep(midi, rawName);
      const y = isTreble ? 64 - (d - 30) * 5 : 24 + (26 - d) * 5;
      const x = 66 + i * 32;
      for (let ly = 74; ly <= y + 1; ly += 10) h += ledger(x, ly);
      for (let ly = 14; ly >= y - 1; ly -= 10) h += ledger(x, ly);
      h += `<ellipse cx="${x}" cy="${y}" rx="6.5" ry="4.6" fill="currentColor" transform="rotate(-14 ${x} ${y})"/>`;
      if (acc) {
        h += `<text x="${x - 19}" y="${y + 5.5}" font-size="17" font-weight="700" fill="currentColor">${acc}</text>`;
      }
      const disp = MT.theory.fmtNote(rawName);
      h += `<text x="${x}" y="94" text-anchor="middle" font-size="11" fill="var(--muted)">${disp}</text>`;
    });

    return `<svg viewBox="0 0 ${W} 102" style="width:100%;max-width:${Math.min(540, W * 1.15)}px;color:var(--fg)">${h}</svg>`;
  }

  /**
   * Key signature staff SVG for Circle of Fifths
   */
  function keySigSVG(key) {
    const T = MT.theory;
    const step = T.CIRCLE_ORDER.indexOf(key);
    const isSharp = step > 0 && step <= 6;
    const count = isSharp ? step : (12 - step) % 12;
    const D = isSharp ? [38, 35, 39, 36, 33, 37, 34] : [34, 37, 33, 36, 32, 35, 31];
    let h = '';
    [24, 34, 44, 54, 64].forEach(y => {
      h += `<line x1="6" x2="156" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });
    h += `<text x="10" y="61" font-size="52" fill="currentColor">𝄞</text>`;
    for (let i = 0; i < count; i++) {
      const y = 70 - (D[i] - 30) * 5;
      h += `<text x="${46 + i * 14}" y="${y}" font-size="21" font-weight="700" fill="currentColor">${isSharp ? '♯' : '♭'}</text>`;
    }
    const lbl = count ? `${count} ${isSharp ? '♯' : '♭'}` : MT.t('no_accidentals');
    return `<svg viewBox="0 0 162 84" style="width:162px;color:var(--fg)">${h}</svg><div class="hint">${MT.t('key_sig_label')}: <b>${lbl}</b></div>`;
  }

  /**
   * Guitar / Ukulele fretboard diagram SVG
   * opts: { degreeMap, spellMap, labelMode }
   */
  function fretSVG(grip, rootPC, ins, opts) {
    if (!grip) return '<div class="hint" style="padding:18px 0">–</div>';
    const T = MT.theory;
    const tun = T.TUN[ins || 'Gitarre'];
    const nStr = grip.length;
    const x0 = 26;
    const spanW = 78;
    const gap = spanW / (nStr - 1);
    const y0 = 30;
    const fH = 22;
    const fretted = grip.filter(v => v > 0);
    const maxF = fretted.length ? Math.max(...fretted) : 0;
    const base = maxF <= 4 ? 1 : Math.min(...fretted);

    const dm = opts && opts.degreeMap ? opts.degreeMap : null;
    const sp = opts && opts.spellMap ? opts.spellMap : null;
    const showDeg = (opts && opts.labelMode === 'degrees') && dm;

    let h = '';
    for (let i = 0; i < nStr; i++) {
      h += `<line x1="${x0 + i * gap}" y1="${y0}" x2="${x0 + i * gap}" y2="${y0 + 4 * fH}" stroke="currentColor" stroke-width="1.1"/>`;
    }
    for (let r = 0; r < 5; r++) {
      h += `<line x1="${x0}" y1="${y0 + r * fH}" x2="${x0 + spanW}" y2="${y0 + r * fH}" stroke="currentColor" stroke-width="${r === 0 && base === 1 ? 4 : 1}"/>`;
    }

    grip.forEach((v, i) => {
      const x = x0 + i * gap;
      if (v < 0) {
        h += `<text x="${x}" y="20" text-anchor="middle" font-size="13" fill="var(--muted)">×</text>`;
        return;
      }
      const pc = (tun[i] + v) % 12;
      const isRoot = pc === rootPC;
      const deg = showDeg ? dm[pc] : null;
      const noteLbl = sp ? T.fmtNote(sp[pc] || T.N_FLAT[pc]) : '';
      const dotFill = deg ? deg.color : (isRoot ? 'var(--root)' : 'var(--accent)');
      const textLbl = deg ? deg.label : noteLbl;

      if (v > 0) {
        const y = y0 + (v - base + 0.5) * fH;
        h += `<circle cx="${x}" cy="${y}" r="8.8" fill="${dotFill}" stroke="var(--surface)" stroke-width="1.4"/>`;
        if (textLbl) {
          const fs = textLbl.length > 2 ? 7 : textLbl.length === 2 ? 8 : 9.2;
          h += `<text x="${x}" y="${y + 3.2}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#fff">${textLbl}</text>`;
        }
      } else {
        // Open string (v === 0)
        const oy = 15;
        if (deg) {
          h += `<circle cx="${x}" cy="${oy}" r="7.4" fill="${dotFill}" stroke="var(--surface)" stroke-width="1.2"/>`;
          const fs = textLbl.length > 2 ? 6.5 : textLbl.length === 2 ? 7.5 : 8.5;
          h += `<text x="${x}" y="${oy + 2.8}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#fff">${textLbl}</text>`;
        } else {
          h += `<circle cx="${x}" cy="${oy}" r="6.6" fill="${isRoot ? 'var(--root)' : 'var(--surface)'}" stroke="${isRoot ? 'var(--root)' : 'currentColor'}" stroke-width="1.5"/>`;
          if (noteLbl) {
            const fs = noteLbl.length > 1 ? 6.8 : 8;
            h += `<text x="${x}" y="${oy + 2.7}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${isRoot ? '#fff' : 'currentColor'}">${noteLbl}</text>`;
          }
        }
      }
    });

    if (base > 1) {
      h += `<text x="3" y="${y0 + 16}" font-size="12" font-weight="700" fill="var(--muted)">${base}.</text>`;
    }
    return `<svg viewBox="0 0 122 128" style="width:120px;color:var(--fg)">${h}</svg>`;
  }

  /**
   * Interactive Circle of Fifths HTML (clickable keys + diatonic wedge + key signature + clickable diatonic chips)
   */
  function circleHTML(key) {
    const T = MT.theory;
    const step = T.CIRCLE_ORDER.indexOf(key);
    const sigStr = step === 0 ? MT.t('no_accidentals') : step < 6 ? `${step} ♯` : step === 6 ? '6 ♯ / 6 ♭' : `${12 - step} ♭`;
    const pt = (deg, r) => [150 + r * Math.cos(deg * Math.PI / 180), 150 + r * Math.sin(deg * Math.PI / 180)];
    const pStr = (deg, r) => pt(deg, r).map(v => v.toFixed(1)).join(' ');

    const a0 = (step - 1) * 30 - 90 - 15;
    const a1 = (step + 1) * 30 - 90 + 15;
    let h = `<path d="M${pStr(a0, 134)} A134 134 0 0 1 ${pStr(a1, 134)} L${pStr(a1, 36)} A36 36 0 0 0 ${pStr(a0, 36)} Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4"/>`;

    T.CIRCLE_ORDER.forEach((pc, i) => {
      const deg = i * 30 - 90;
      const d = (i - step + 12) % 12;
      const isCur = d === 0;
      const isNear = d === 1 || d === 11;

      // Outer major
      const [mx, my] = pt(deg, 108);
      const majLabel = T.fmtNote(T.N_FLAT[pc]);
      h += `<g data-ck="${pc}"><circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="19" fill="${isCur ? 'var(--accent)' : isNear ? 'var(--surface)' : 'var(--surface)'}" stroke="${isCur || isNear ? 'var(--accent)' : 'var(--border)'}" stroke-width="${isCur ? 2.5 : 1.5}"/><text x="${mx.toFixed(1)}" y="${(my + 4.5).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="${isCur ? 700 : 500}" fill="${isCur ? 'var(--accent-fg)' : 'currentColor'}">${majLabel}</text></g>`;

      // Inner relative minor
      const [nx, ny] = pt(deg, 68);
      const minPC = (pc + 9) % 12;
      const minRaw = (i >= 1 && i <= 6 ? T.N_SHARP : T.N_FLAT)[minPC];
      const minLabel = T.fmtNote(minRaw) + 'm';
      h += `<g data-ck="${pc}"><circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="16" fill="${isCur ? 'var(--root)' : 'var(--surface)'}" stroke="${isCur ? 'var(--root)' : isNear ? 'var(--accent)' : 'var(--border)'}" stroke-width="1.3"/><text x="${nx.toFixed(1)}" y="${(ny + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="${isCur ? 700 : 400}" fill="${isCur ? '#fff' : 'currentColor'}">${minLabel}</text></g>`;
    });

    // Roman numeral labels on the wedge
    [['IV', 'ii', -1], ['I', 'vi', 0], ['V', 'iii', 1]].forEach(([oL, iL, off]) => {
      const deg = (step + off) * 30 - 90;
      const [x1, y1] = pt(deg, 146);
      const [x2, y2] = pt(deg, 45);
      h += `<text x="${x1.toFixed(1)}" y="${(y1 + 4).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--accent)">${oL}</text>`;
      h += `<text x="${x2.toFixed(1)}" y="${(y2 + 3.5).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--accent)">${iL}</text>`;
    });

    const curMaj = T.fmtNote(T.N_FLAT[key]) + MT.t('key_maj_sfx');
    const curMin = T.fmtNote(T.spellInKey(key, 9, 5)) + MT.t('key_min_sfx');
    h += `<text x="150" y="143" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${curMaj}</text>`;
    h += `<text x="150" y="157" text-anchor="middle" font-size="10" fill="var(--muted)">(${curMin})</text>`;
    h += `<text x="150" y="170" text-anchor="middle" font-size="10" fill="var(--accent)">${sigStr}</text>`;

    // Diatonic chord chips (clickable!)
    const { triads } = T.harmonizeScale(T.SC.maj, key);
    const chips = triads.map(c =>
      `<button class="chip" data-chord-root="${c.root}" data-chord-q="${c.q}" data-chord-name="${c.rawName}" data-chord-tok="${c.tok}"><b>${c.tok}</b><span>${c.name}</span></button>`
    ).join('');

    return `
      <div class="circle-layout">
        <svg class="circle-svg" viewBox="-12 -12 324 324" style="color:var(--fg)">${h}</svg>
        <div class="circle-info">
          ${keySigSVG(key)}
          <p class="hint" style="margin-top:10px">${MT.t('circle_hint')}</p>
          <h4>${MT.t('diatonic_chords')} (${curMaj})</h4>
          <div class="chips">${chips}</div>
        </div>
      </div>
    `;
  }

  /**
   * CAGED shapes + full 15-fret color-coded guitar neck
   */
  function cagedHTML(key) {
    const T = MT.theory;
    const SHAPES = [
      ['C', 0, [-1, 3, 2, 0, 1, 0], 'x 1 3 5 1 3', '#dc2626'],
      ['A', 9, [-1, 0, 2, 2, 2, 0], 'x 1 5 1 3 5', '#d97706'],
      ['G', 7, [3, 2, 0, 0, 0, 3], '1 3 5 1 3 1', '#16a34a'],
      ['E', 4, [0, 2, 2, 1, 0, 0], '1 5 1 3 5 1', '#2563eb'],
      ['D', 2, [-1, -1, 0, 2, 3, 2], 'x x 1 5 1 3', '#9333ea']
    ];
    const sp = T.spellChord({ root: key, q: '' });
    const tun = T.TUN.Gitarre;
    const degMap = { 0: '1', 4: '3', 7: '5' };

    const rows = SHAPES.map(([name, baseRoot, f, degs, col]) => {
      const off = (key - baseRoot + 12) % 12;
      const g = f.map(v => v < 0 ? v : v + off);
      const notes = g.map((v, i) => v < 0 ? 'x' : T.fmtNote(sp[(tun[i] + v) % 12])).join(' ');
      return { off, name, g, degs, notes, col };
    }).sort((a, b) => a.off - b.off);

    // Individual shape cards
    const dm = T.chordDegreeMap({ root: key, q: '' });
    const cards = rows.map(r => {
      const posLbl = r.off ? MT.t('caged_barre', { f: r.off }) : MT.t('caged_open');
      return `<div class="live-fret-box">
        <div style="font-size:.82rem;font-weight:700;color:${r.col}">● ${r.name}-Form <span class="hint">(${posLbl})</span></div>
        ${fretSVG(r.g, key, 'Gitarre', { degreeMap: dm, spellMap: sp, labelMode: MT.state.labelMode })}
        <div class="hint" style="font-size:.75rem">${r.degs}</div>
        <div class="hint" style="font-size:.75rem">${r.notes}</div>
      </div>`;
    }).join('');

    // Full 15-fret neck
    let nh = '';
    for (let f = 0; f <= 15; f++) {
      nh += `<line x1="${40 + f * 44}" y1="24" x2="${40 + f * 44}" y2="124" stroke="currentColor" stroke-width="${f ? 1 : 4}"/>`;
    }
    for (let s = 0; s < 6; s++) {
      nh += `<line x1="40" y1="${24 + s * 20}" x2="${40 + 15 * 44}" y2="${24 + s * 20}" stroke="currentColor"/>`;
    }
    [3, 5, 7, 9, 12, 15].forEach(f => {
      nh += `<text x="${40 + (f - 0.5) * 44}" y="148" text-anchor="middle" font-size="12" fill="var(--muted)">${f}</text>`;
    });

    rows.forEach(r => {
      [0, 12].forEach(sh => {
        if (Math.max(...r.g) + sh > 15) return;
        r.g.forEach((v, s) => {
          if (v < 0) return;
          const fr = v + sh;
          const x = fr === 0 ? 22 : 40 + (fr - 0.5) * 44;
          const y = 24 + (5 - s) * 20;
          const isRoot = (tun[s] + v) % 12 === key;
          const deg = degMap[(tun[s] + v - key + 120) % 12] || '';
          nh += `<circle cx="${x}" cy="${y}" r="9" fill="${r.col}" stroke="${isRoot ? 'var(--fg)' : 'none'}" stroke-width="2.5"/>`;
          nh += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${deg}</text>`;
        });
      });
    });

    return `
      <p class="hint">${MT.t('caged_hint', { k: T.fmtNote(T.N_FLAT[key]) })}</p>
      <div class="dia-row">${cards}</div>
      <h4>${MT.t('caged_neck_title')}</h4>
      <p class="hint">${MT.t('caged_neck_hint')}</p>
      <div style="overflow-x:auto">
        <svg viewBox="0 0 720 158" style="min-width:640px;width:100%;color:var(--fg)">${nh}</svg>
      </div>
    `;
  }

  /**
   * Clear, large SVG table of Note Values & Rests (font-independent!)
   */
  function noteRestTableHTML() {
    const en = MT.state.lang === 'en';
    const miniStaff = inner =>
      `<svg viewBox="0 0 64 48" width="64" height="48" style="color:var(--fg);vertical-align:middle">
         <g stroke="var(--muted)" stroke-width="0.9" opacity="0.7">
           <line x1="4" y1="10" x2="60" y2="10"/>
           <line x1="4" y1="17" x2="60" y2="17"/>
           <line x1="4" y1="24" x2="60" y2="24"/>
           <line x1="4" y1="31" x2="60" y2="31"/>
           <line x1="4" y1="38" x2="60" y2="38"/>
         </g>
         ${inner}
       </svg>`;

    const noteWhole = miniStaff(`<ellipse cx="32" cy="27.5" rx="7" ry="4.5" fill="none" stroke="currentColor" stroke-width="2.2"/>`);
    const noteHalf = miniStaff(`<ellipse cx="28" cy="31" rx="6.2" ry="4.3" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-18 28 31)"/><line x1="33.5" y1="30" x2="33.5" y2="7" stroke="currentColor" stroke-width="2"/>`);
    const noteQuarter = miniStaff(`<ellipse cx="28" cy="31" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 28 31)"/><line x1="33.5" y1="30" x2="33.5" y2="7" stroke="currentColor" stroke-width="2"/>`);
    const noteEighth = miniStaff(`<ellipse cx="26" cy="31" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 26 31)"/><line x1="31.5" y1="30" x2="31.5" y2="7" stroke="currentColor" stroke-width="2"/><path d="M31.5 7 C40 11, 42 18, 37 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>`);
    const noteSixteenth = miniStaff(`<ellipse cx="26" cy="31" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 26 31)"/><line x1="31.5" y1="30" x2="31.5" y2="7" stroke="currentColor" stroke-width="2"/><path d="M31.5 7 C40 10, 42 16, 37 21" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M31.5 13 C40 16, 42 22, 37 27" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`);

    // Rests: Whole hangs from 4th line (y=17), Half sits on 3rd line (y=24)
    const restWhole = miniStaff(`<rect x="23" y="17" width="18" height="5.5" fill="currentColor"/>`);
    const restHalf = miniStaff(`<rect x="23" y="18.5" width="18" height="5.5" fill="currentColor"/>`);
    const restQuarter = miniStaff(`<path d="M29 10 L35 17 L28 24 L35 31 C31 31, 27 33, 29 37 C30 39, 33 40, 35 39" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`);
    const restEighth = miniStaff(`<circle cx="28" cy="18" r="2.8" fill="currentColor"/><path d="M29 19 C33 20, 36 18, 37 15 L31 35" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>`);
    const restSixteenth = miniStaff(`<circle cx="29" cy="15" r="2.5" fill="currentColor"/><path d="M30 16 C33 17, 36 15, 37 13" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="27" cy="23" r="2.5" fill="currentColor"/><path d="M28 24 C32 25, 34 23, 35 21" fill="none" stroke="currentColor" stroke-width="2"/><line x1="37" y1="13" x2="30" y2="37" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`);

    const rows = [
      [en ? 'Whole' : 'Ganze', noteWhole, restWhole, en ? '4 beats' : '4 Schläge', en ? 'Rest hangs under line 4' : 'Pause hängt unter der 4. Linie'],
      [en ? 'Half' : 'Halbe', noteHalf, restHalf, en ? '2 beats' : '2 Schläge', en ? 'Rest sits on line 3 (“hat”)' : 'Pause liegt auf der 3. Linie („Hut“)' ],
      [en ? 'Quarter' : 'Viertel', noteQuarter, restQuarter, en ? '1 beat' : '1 Schlag', en ? 'Pulse in 4/4 & 3/4' : 'Grundschlag im 4/4- & 3/4-Takt'],
      [en ? 'Eighth' : 'Achtel', noteEighth, restEighth, en ? '½ beat' : '½ Schlag', en ? 'Two per quarter beat' : 'Zwei pro Viertelschlag'],
      [en ? 'Sixteenth' : 'Sechzehntel', noteSixteenth, restSixteenth, en ? '¼ beat' : '¼ Schlag', en ? 'Four per quarter beat' : 'Vier pro Viertelschlag']
    ];

    return `
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr>
            <th>${en ? 'Value' : 'Wert'}</th>
            <th>${en ? 'Note' : 'Note'}</th>
            <th>${en ? 'Rest' : 'Pause'}</th>
            <th>${en ? 'Duration (4/4)' : 'Dauer (4/4)'}</th>
            <th>${en ? 'Memory tip' : 'Merkhilfe'}</th>
          </tr>
          ${rows.map(([lbl, n, r, dur, tip]) => `<tr><td><b>${lbl}</b></td><td>${n}</td><td>${r}</td><td>${dur}</td><td class="hint">${tip}</td></tr>`).join('')}
        </table>
      </div>`;
  }

  /**
   * Clear visual guide to Barlines, Repeats, Dotted Notes, Ties & Articulations
   */
  function articulationSymbolsHTML() {
    const en = MT.state.lang === 'en';
    const box = (w, inner) =>
      `<svg viewBox="0 0 ${w} 46" width="${w}" height="46" style="color:var(--fg);vertical-align:middle">
         <g stroke="var(--muted)" stroke-width="0.9" opacity="0.65">
           <line x1="2" y1="10" x2="${w - 2}" y2="10"/>
           <line x1="2" y1="17" x2="${w - 2}" y2="17"/>
           <line x1="2" y1="24" x2="${w - 2}" y2="24"/>
           <line x1="2" y1="31" x2="${w - 2}" y2="31"/>
           <line x1="2" y1="38" x2="${w - 2}" y2="38"/>
         </g>
         ${inner}
       </svg>`;

    const symDotted = box(68, `<ellipse cx="26" cy="27.5" rx="6" ry="4.2" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-18 26 27.5)"/><line x1="31.5" y1="26.5" x2="31.5" y2="6" stroke="currentColor" stroke-width="2"/><circle cx="39" cy="27.5" r="2.6" fill="var(--accent)"/>`);
    const symTie = box(82, `<ellipse cx="22" cy="27.5" rx="5.5" ry="4" fill="currentColor" transform="rotate(-18 22 27.5)"/><line x1="27" y1="26.5" x2="27" y2="8" stroke="currentColor" stroke-width="1.8"/><ellipse cx="56" cy="27.5" rx="5.5" ry="4" fill="currentColor" transform="rotate(-18 56 27.5)"/><line x1="61" y1="26.5" x2="61" y2="8" stroke="currentColor" stroke-width="1.8"/><path d="M23 34 Q39 44 55 34" fill="none" stroke="var(--accent)" stroke-width="2.4"/>`);
    const symBar = box(68, `<line x1="34" y1="10" x2="34" y2="38" stroke="currentColor" stroke-width="2.2"/>`);
    const symFinal = box(68, `<line x1="30" y1="10" x2="30" y2="38" stroke="currentColor" stroke-width="1.5"/><line x1="37" y1="10" x2="37" y2="38" stroke="currentColor" stroke-width="4.5"/>`);
    const symRepeat = box(72, `<circle cx="24" cy="20.5" r="2.3" fill="var(--accent)"/><circle cx="24" cy="27.5" r="2.3" fill="var(--accent)"/><line x1="32" y1="10" x2="32" y2="38" stroke="currentColor" stroke-width="1.5"/><line x1="39" y1="10" x2="39" y2="38" stroke="currentColor" stroke-width="4.5"/>`);
    const symStaccato = box(68, `<ellipse cx="32" cy="27.5" rx="5.8" ry="4.1" fill="currentColor" transform="rotate(-18 32 27.5)"/><line x1="37.2" y1="26.5" x2="37.2" y2="8" stroke="currentColor" stroke-width="1.9"/><circle cx="32" cy="37" r="2.6" fill="var(--accent)"/>`);
    const symLegato = box(86, `<ellipse cx="20" cy="31" rx="5.3" ry="3.8" fill="currentColor" transform="rotate(-18 20 31)"/><line x1="25" y1="30" x2="25" y2="12" stroke="currentColor" stroke-width="1.7"/><ellipse cx="42" cy="24" rx="5.3" ry="3.8" fill="currentColor" transform="rotate(-18 42 24)"/><line x1="47" y1="23" x2="47" y2="6" stroke="currentColor" stroke-width="1.7"/><ellipse cx="64" cy="27.5" rx="5.3" ry="3.8" fill="currentColor" transform="rotate(-18 64 27.5)"/><line x1="69" y1="26.5" x2="69" y2="9" stroke="currentColor" stroke-width="1.7"/><path d="M18 38 Q42 46 66 36" fill="none" stroke="var(--accent)" stroke-width="2.4"/>`);
    const symTenuto = box(68, `<ellipse cx="32" cy="27.5" rx="5.8" ry="4.1" fill="currentColor" transform="rotate(-18 32 27.5)"/><line x1="37.2" y1="26.5" x2="37.2" y2="8" stroke="currentColor" stroke-width="1.9"/><line x1="25" y1="37" x2="39" y2="37" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round"/>`);
    const symAccent = box(68, `<ellipse cx="32" cy="27.5" rx="5.8" ry="4.1" fill="currentColor" transform="rotate(-18 32 27.5)"/><line x1="37.2" y1="26.5" x2="37.2" y2="8" stroke="currentColor" stroke-width="1.9"/><path d="M25 35 L39 38.5 L25 42" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/>`);
    const symFermata = box(68, `<ellipse cx="32" cy="27.5" rx="6.2" ry="4.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 13 A12 10 0 0 1 44 13" fill="none" stroke="var(--accent)" stroke-width="2.3"/><circle cx="32" cy="11.5" r="2.2" fill="var(--accent)"/>`);

    const rows = [
      [symDotted, en ? 'Dotted note' : 'Punktierte Note', en ? 'A dot behind a note adds <b>half its value</b> (e.g. dotted half = 2 + 1 = 3 beats; dotted quarter = 1½ beats).' : 'Ein Punkt <b>hinter</b> dem Notenkopf verlängert die Note um die <b>Hälfte ihres Wertes</b> (punktierte Halbe = 2 + 1 = 3 Schläge; punktierte Viertel = 1½ Schläge).'],
      [symTie, en ? 'Tie' : 'Haltebogen', en ? 'Connects two <b>identical pitches</b> into one sustained sound (often across a barline) — you do not strike the second note again.' : 'Verbindet zwei <b>gleiche Töne</b> zu einem langen Klang (oft über den Taktstrich hinweg) – der zweite Ton wird nicht neu angeschlagen.'],
      [symBar, en ? 'Barline' : 'Taktstrich', en ? 'Divides music into regular measures (bars). The first beat right after a barline is naturally accented.' : 'Teilt das Stück in gleichmäßige Takte. Der erste Schlag direkt nach dem Taktstrich (die „Eins“) ist die Hauptbetonung.'],
      [symFinal, en ? 'Final double bar' : 'Schlussstrich', en ? 'Thin + thick line marks the end of a piece. Two thin lines separate major sections.' : 'Dünner + dicker Strich markieren das Stückende. Zwei dünne Striche (Doppelstrich) trennen Abschnitte (z. B. Strophe/Refrain).'],
      [symRepeat, en ? 'Repeat sign' : 'Wiederholungszeichen', en ? 'Double bar with two dots: repeat the enclosed section. Brackets “1.” / “2.” (volta) give different endings.' : 'Doppelstrich mit zwei Punkten: Abschnitt wiederholen. Klammern „1.“ / „2.“ (Volta) zeigen unterschiedliche Schlüsse an.'],
      [symStaccato, en ? 'Staccato (dot above/below)' : 'Staccato (Punkt über/unter Note)', en ? 'Play short and detached (roughly half the written duration). Careful: dot <em>above/below</em> = staccato, dot <em>behind</em> = dotted rhythm!' : 'Kurz, leicht und abgesetzt spielen! Achtung: Punkt <em>über/unter</em> der Note = Staccato; Punkt <em>hinter</em> der Note = Punktierung!'],
      [symLegato, en ? 'Legato (slur)' : 'Legato (Bindebogen)', en ? 'Connect <b>different pitches</b> smoothly without gaps between them (singing, flowing).' : 'Verbindet <b>unterschiedliche Töne</b> weich und nahtlos ohne hörbare Lücke dazwischen.'],
      [symTenuto, en ? 'Tenuto (line)' : 'Tenuto (Strich)', en ? 'Hold the note for its full value with gentle weight.' : 'Den Ton voll aushalten und leicht betonen (breit, getragen).'],
      [symAccent, en ? 'Accent (>)' : 'Akzent (>)', en ? 'Attack this note noticeably stronger than surrounding notes.' : 'Diesen Ton deutlich stärker und markanter anspielen.'],
      [symFermata, en ? 'Fermata' : 'Fermate', en ? 'Hold the note or rest freely longer than its written value (“pause and breathe”).' : 'Den Ton oder die Pause nach Gefühl länger aushalten („Ruhepunkt“).']
    ];

    return `
      <div style="overflow-x:auto">
        <table class="data-tbl">
          <tr>
            <th>${en ? 'Symbol' : 'Zeichen'}</th>
            <th>${en ? 'Name' : 'Begriff'}</th>
            <th>${en ? 'Meaning' : 'Bedeutung'}</th>
          </tr>
          ${rows.map(([svg, name, desc]) => `<tr><td>${svg}</td><td><b>${name}</b></td><td>${desc}</td></tr>`).join('')}
        </table>
      </div>`;
  }

  MT.visuals = {
    pianoSVG,
    grandStaffSVG,
    singleStaffSVG,
    keySigSVG,
    fretSVG,
    circleHTML,
    cagedHTML,
    noteRestTableHTML,
    articulationSymbolsHTML
  };
})();
