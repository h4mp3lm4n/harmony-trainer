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
   * Strictly classical piano-score layout (curved piano brace, serif clefs & accidentals, pure ink noteheads)
   */
  function grandStaffSVG(voicing, spellMap) {
    const T = MT.theory;
    const W = 160;
    const serif = 'Georgia, &quot;Times New Roman&quot;, serif';
    let h = '';

    // Classical curved piano brace + thin opening system barline + closing barline
    h += `<path d="M13 24 C6 26, 7 50, 9 64 C10 74, 8 81, 3 84 C8 87, 10 94, 9 104 C7 118, 6 142, 13 144 C9 140, 10 118, 12 104 C13 94, 11 87, 6 84 C11 81, 13 74, 12 64 C10 50, 9 28, 13 24 Z" fill="currentColor"/>`;
    h += `<line x1="16" y1="24" x2="16" y2="144" stroke="currentColor" stroke-width="1.2"/>`;
    h += `<line x1="${W - 6}" y1="24" x2="${W - 6}" y2="144" stroke="currentColor" stroke-width="1.1"/>`;

    // Treble staff lines (y = 24, 34, 44, 54, 64 -> F5, D5, B4, G4, E4)
    [24, 34, 44, 54, 64].forEach(y => {
      h += `<line x1="16" x2="${W - 6}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });
    // Bass staff lines (y = 104, 114, 124, 134, 144 -> A3, F3, D3, B2, G2)
    [104, 114, 124, 134, 144].forEach(y => {
      h += `<line x1="16" x2="${W - 6}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });

    // Classic serif clef symbols
    h += `<text x="20" y="61" font-size="52" font-family="${serif}" fill="currentColor">𝄞</text>`;
    h += `<text x="21" y="136" font-size="44" font-family="${serif}" fill="currentColor">𝄢</text>`;

    const trebleNotes = (voicing.upper || []).slice().sort((a, b) => a - b);
    const bassNotes = voicing.bass != null ? [voicing.bass] : [];

    function renderGroup(notes, isTreble) {
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
        const x = 104 + shifted * 12.5;

        // Classical ledger lines
        if (isTreble) {
          for (let ly = 74; ly <= y + 1; ly += 10) h += ledger(x, ly);
          for (let ly = 14; ly >= y - 1; ly -= 10) h += ledger(x, ly);
        } else {
          for (let ly = 94; ly >= y - 1; ly -= 10) h += ledger(x, ly);
          for (let ly = 154; ly <= y + 1; ly += 10) h += ledger(x, ly);
        }

        h += `<ellipse cx="${x}" cy="${y}" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 ${x} ${y})"/>`;

        if (acc) {
          let ax = x - 18 - (acc.length - 1) * 8;
          if (usedAccSlots.some(py => Math.abs(py - y) < 12)) {
            ax -= 13;
          }
          usedAccSlots.push(y);
          h += `<text x="${ax}" y="${y + 5.5}" font-size="17" font-family="${serif}" fill="currentColor">${acc}</text>`;
        }
      });
    }

    renderGroup(trebleNotes, true);
    renderGroup(bassNotes, false);

    return `<svg viewBox="0 0 ${W} 168" style="width:100%;max-width:168px;color:var(--fg)" aria-label="Klassisches Klaviersystem">${h}</svg>`;
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
   * Classical engraved scale notation staff (strictly traditional sheet-music layout:
   * classic clef, barlines, quarter-note stems, ledger lines, accidentals & natural cancellations, final double barline)
   */
  function scaleStaffSVG(items, clef = 'treble') {
    if (!items || !items.length) return '';
    const isTreble = clef !== 'bass';
    const topY = 42;
    const midY = topY + 20;
    const botY = topY + 40;
    const stepX = 44;
    const startX = 76;
    const W = startX + items.length * stepX + 18;
    const serif = 'Georgia, &quot;Times New Roman&quot;, serif';

    let h = '';
    // Five staff lines
    for (let i = 0; i < 5; i++) {
      const y = topY + i * 10;
      h += `<line x1="12" x2="${W - 10}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    }
    // Opening barline & classical final double barline
    h += `<line x1="12" x2="12" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="1.3"/>`;
    h += `<line x1="${W - 15}" x2="${W - 15}" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="1.1"/>`;
    h += `<line x1="${W - 10}" x2="${W - 10}" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="3.2"/>`;

    // Classical clef
    h += isTreble
      ? `<text x="16" y="${botY - 3}" font-size="52" font-family="${serif}" fill="currentColor">𝄞</text>`
      : `<text x="16" y="${topY + 32}" font-size="44" font-family="${serif}" fill="currentColor">𝄢</text>`;

    // Track active accidentals per diatonic step for proper natural (♮) cancellations
    const activeAcc = {};

    items.forEach(([midi, rawName], i) => {
      const acc = rawName.slice(1);
      const d = diatonicStep(midi, rawName);
      const y = isTreble ? (botY - (d - 30) * 5) : (topY + (26 - d) * 5);
      const x = startX + i * stepX;
      const pc = ((midi % 12) + 12) % 12;

      h += `<g class="staff-note" data-midi="${midi}" data-pc="${pc}">`;
      h += `<rect x="${x - 16}" y="${topY - 24}" width="32" height="${botY - topY + 68}" fill="transparent"/>`;

      // Ledger lines below / above staff
      for (let ly = botY + 10; ly <= y + 1; ly += 10) {
        h += `<line x1="${x - 10}" x2="${x + 10}" y1="${ly}" y2="${ly}" stroke="currentColor" stroke-width="1.1"/>`;
      }
      for (let ly = topY - 10; ly >= y - 1; ly -= 10) {
        h += `<line x1="${x - 10}" x2="${x + 10}" y1="${ly}" y2="${ly}" stroke="currentColor" stroke-width="1.1"/>`;
      }

      // Classical quarter-note stem (up below middle line, down on/above middle line)
      const stemUp = y > midY;
      if (stemUp) {
        h += `<line x1="${x + 5.7}" x2="${x + 5.7}" y1="${y - 1}" y2="${y - 31}" stroke="currentColor" stroke-width="1.35"/>`;
      } else {
        h += `<line x1="${x - 5.7}" x2="${x - 5.7}" y1="${y + 1}" y2="${y + 31}" stroke="currentColor" stroke-width="1.35"/>`;
      }

      // Tilted engraved notehead
      h += `<ellipse cx="${x}" cy="${y}" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 ${x} ${y})"/>`;

      // Accidental or natural sign
      let printAcc = '';
      if (acc) {
        if (activeAcc[d] !== acc) {
          printAcc = acc;
          activeAcc[d] = acc;
        }
      } else if (activeAcc[d]) {
        printAcc = '♮';
        activeAcc[d] = '';
      }
      if (printAcc) {
        const ax = x - 18 - (printAcc.length - 1) * 7;
        h += `<text x="${ax}" y="${y + 5.5}" font-size="17" font-family="${serif}" fill="currentColor">${printAcc}</text>`;
      }

      // Clean classic note label below staff
      const disp = MT.theory.fmtNote(rawName);
      h += `<text x="${x}" y="${botY + 38}" text-anchor="middle" font-size="11.5" font-family="${serif}" fill="var(--muted)">${disp}</text>`;
      h += `</g>`;
    });

    const H = botY + 48;
    return `<div style="overflow-x:auto"><svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:${Math.min(W, 320)}px;max-width:${Math.min(720, W * 1.15)}px;color:var(--fg)" aria-label="Klassische Tonleiter-Notation">${h}</svg></div>`;
  }

  /**
   * Classical engraved enharmonic comparison staff:
   * each pair [midi, rawA, rawB] is placed in its own bar separated by classical barlines,
   * visually demonstrating two different staff positions for the exact same sounding pitch.
   */
  function enharmonicStaffSVG(pairs) {
    if (!pairs || !pairs.length) return '';
    const topY = 42;
    const midY = topY + 20;
    const botY = topY + 40;
    const barW = 92;
    const startX = 62;
    const W = startX + pairs.length * barW + 14;
    const serif = 'Georgia, &quot;Times New Roman&quot;, serif';

    let h = '';
    for (let i = 0; i < 5; i++) {
      const y = topY + i * 10;
      h += `<line x1="12" x2="${W - 10}" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    }
    // Opening barline + treble clef
    h += `<line x1="12" x2="12" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="1.3"/>`;
    h += `<text x="16" y="${botY - 3}" font-size="52" font-family="${serif}" fill="currentColor">𝄞</text>`;

    function drawClassicNote(x, midi, rawName) {
      const acc = rawName.slice(1);
      const d = diatonicStep(midi, rawName);
      const y = botY - (d - 30) * 5;
      for (let ly = botY + 10; ly <= y + 1; ly += 10) {
        h += `<line x1="${x - 10}" x2="${x + 10}" y1="${ly}" y2="${ly}" stroke="currentColor" stroke-width="1.1"/>`;
      }
      for (let ly = topY - 10; ly >= y - 1; ly -= 10) {
        h += `<line x1="${x - 10}" x2="${x + 10}" y1="${ly}" y2="${ly}" stroke="currentColor" stroke-width="1.1"/>`;
      }
      if (y > midY) {
        h += `<line x1="${x + 5.7}" x2="${x + 5.7}" y1="${y - 1}" y2="${y - 31}" stroke="currentColor" stroke-width="1.35"/>`;
      } else {
        h += `<line x1="${x - 5.7}" x2="${x - 5.7}" y1="${y + 1}" y2="${y + 31}" stroke="currentColor" stroke-width="1.35"/>`;
      }
      h += `<ellipse cx="${x}" cy="${y}" rx="6.2" ry="4.4" fill="currentColor" transform="rotate(-18 ${x} ${y})"/>`;
      if (acc) {
        h += `<text x="${x - 18}" y="${y + 5.5}" font-size="17" font-family="${serif}" fill="currentColor">${acc}</text>`;
      }
    }

    pairs.forEach(([midi, rawA, rawB], idx) => {
      const bx = startX + idx * barW;
      const x1 = bx + 26;
      const x2 = bx + 68;
      drawClassicNote(x1, midi, rawA);
      drawClassicNote(x2, midi, rawB);

      const dispA = MT.theory.fmtNote(rawA);
      const dispB = MT.theory.fmtNote(rawB);
      h += `<text x="${(x1 + x2) / 2}" y="${botY + 38}" text-anchor="middle" font-size="11.5" font-family="${serif}" fill="var(--muted)">${dispA} = ${dispB}</text>`;

      // Barline after each pair (final double barline at end)
      const barEnd = bx + barW;
      if (idx < pairs.length - 1) {
        h += `<line x1="${barEnd}" x2="${barEnd}" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="1"/>`;
      } else {
        h += `<line x1="${W - 15}" x2="${W - 15}" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="1.1"/>`;
        h += `<line x1="${W - 10}" x2="${W - 10}" y1="${topY}" y2="${botY}" stroke="currentColor" stroke-width="3.2"/>`;
      }
    });

    const H = botY + 48;
    return `<div style="overflow-x:auto"><svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:${Math.min(W, 380)}px;max-width:${Math.min(720, W * 1.15)}px;color:var(--fg)" aria-label="Enharmonische Verwechslung im Notensystem">${h}</svg></div>`;
  }

  /**
   * Key signature staff SVG for Circle of Fifths (classical layout)
   */
  function keySigSVG(key) {
    const T = MT.theory;
    const step = T.CIRCLE_ORDER.indexOf(key);
    const isSharp = step > 0 && step <= 6;
    const count = isSharp ? step : (12 - step) % 12;
    const D = isSharp ? [38, 35, 39, 36, 33, 37, 34] : [34, 37, 33, 36, 32, 35, 31];
    const serif = 'Georgia, &quot;Times New Roman&quot;, serif';
    let h = '';
    [24, 34, 44, 54, 64].forEach(y => {
      h += `<line x1="8" x2="156" y1="${y}" y2="${y}" stroke="currentColor" stroke-width="1"/>`;
    });
    h += `<line x1="8" x2="8" y1="24" y2="64" stroke="currentColor" stroke-width="1.2"/>`;
    h += `<line x1="156" x2="156" y1="24" y2="64" stroke="currentColor" stroke-width="1.1"/>`;
    h += `<text x="12" y="61" font-size="52" font-family="${serif}" fill="currentColor">𝄞</text>`;
    for (let i = 0; i < count; i++) {
      const y = 70 - (D[i] - 30) * 5;
      h += `<text x="${48 + i * 14}" y="${y}" font-size="20" font-family="${serif}" fill="currentColor">${isSharp ? '♯' : '♭'}</text>`;
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
   * Classical engraved SVG table of Note Values & Rests
   * Generous 10px line spacing makes whole rest (hanging under line 4) vs. half rest (sitting on line 3) unmistakable!
   */
  function noteRestTableHTML() {
    const en = MT.state.lang === 'en';
    const miniStaff = inner =>
      `<svg viewBox="0 0 84 62" width="84" height="62" style="color:var(--fg);vertical-align:middle">
         <g stroke="currentColor" stroke-width="0.9" opacity="0.65">
           <line x1="4" y1="12" x2="80" y2="12"/>
           <line x1="4" y1="22" x2="80" y2="22"/>
           <line x1="4" y1="32" x2="80" y2="32"/>
           <line x1="4" y1="42" x2="80" y2="42"/>
           <line x1="4" y1="52" x2="80" y2="52"/>
         </g>
         ${inner}
       </svg>`;

    // Classic engraved notes (positioned cleanly on line 2 = y=42 or space 2 = y=37)
    const noteWhole = miniStaff(
      `<ellipse cx="42" cy="37" rx="7.6" ry="4.9" fill="none" stroke="currentColor" stroke-width="2.2"/>
       <ellipse cx="42" cy="37" rx="4.2" ry="3.4" fill="var(--surface)" transform="rotate(24 42 37)"/>`
    );
    const noteHalf = miniStaff(
      `<ellipse cx="38" cy="42" rx="6.6" ry="4.5" fill="none" stroke="currentColor" stroke-width="2.1" transform="rotate(-18 38 42)"/>
       <line x1="44" y1="40.5" x2="44" y2="10" stroke="currentColor" stroke-width="1.6"/>`
    );
    const noteQuarter = miniStaff(
      `<ellipse cx="38" cy="42" rx="6.6" ry="4.6" fill="currentColor" transform="rotate(-18 38 42)"/>
       <line x1="44" y1="40.5" x2="44" y2="10" stroke="currentColor" stroke-width="1.6"/>`
    );
    const noteEighth = miniStaff(
      `<ellipse cx="36" cy="42" rx="6.6" ry="4.6" fill="currentColor" transform="rotate(-18 36 42)"/>
       <line x1="42" y1="40.5" x2="42" y2="10" stroke="currentColor" stroke-width="1.6"/>
       <path d="M42 10 C48 14, 54 20, 50 30 C51 23, 47 18, 42 15 Z" fill="currentColor"/>`
    );
    const noteSixteenth = miniStaff(
      `<ellipse cx="36" cy="42" rx="6.6" ry="4.6" fill="currentColor" transform="rotate(-18 36 42)"/>
       <line x1="42" y1="40.5" x2="42" y2="10" stroke="currentColor" stroke-width="1.6"/>
       <path d="M42 10 C48 13, 54 19, 50 27 C51 21, 47 17, 42 14 Z" fill="currentColor"/>
       <path d="M42 18 C48 21, 54 27, 50 35 C51 29, 47 25, 42 22 Z" fill="currentColor"/>`
    );

    // Rests on 10px-spaced classical staff:
    // Line 4 = y=22, Line 3 = y=32 -> 4.4px bar leaves a huge unmistakable 5.6px white gap!
    const restWhole = miniStaff(
      `<line x1="26" y1="22" x2="58" y2="22" stroke="currentColor" stroke-width="1.5"/>
       <rect x="33" y="22" width="18" height="4.4" fill="currentColor"/>`
    );
    const restHalf = miniStaff(
      `<line x1="26" y1="32" x2="58" y2="32" stroke="currentColor" stroke-width="1.5"/>
       <rect x="33" y="27.6" width="18" height="4.4" fill="currentColor"/>`
    );
    // Classical engraved quarter rest (calligraphic path)
    const restQuarter = miniStaff(
      `<path d="M40 14 L46 22 C42 25, 38 28, 41 32 L46 37 C41 36, 37 39, 39 44 C40 46, 43 47, 45 46 C42 45, 41 42, 43 40 C45 39, 47 40, 48 41 L42 32 C46 28, 49 25, 47 21 L41 13 Z" fill="currentColor"/>`
    );
    const restEighth = miniStaff(
      `<circle cx="37" cy="26" r="3" fill="currentColor"/>
       <path d="M38 27.5 C42 28.5, 46 26, 48 22.5 L40.5 47" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`
    );
    const restSixteenth = miniStaff(
      `<circle cx="39" cy="21" r="2.7" fill="currentColor"/>
       <path d="M40 22.2 C43.5 23, 46.5 21, 48 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
       <circle cx="36" cy="31" r="2.7" fill="currentColor"/>
       <path d="M37 32.2 C41 33, 44 31, 45.5 28" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
       <line x1="48" y1="18" x2="39.5" y2="49" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
    );

    const rows = [
      [en ? 'Whole' : 'Ganze', noteWhole, restWhole, en ? '4 beats' : '4 Schläge', en ? 'Rest hangs down from line 4' : 'Pause hängt unter der 4. Linie herunter'],
      [en ? 'Half' : 'Halbe', noteHalf, restHalf, en ? '2 beats' : '2 Schläge', en ? 'Rest sits upward on line 3 (“hat”)' : 'Pause steht auf der 3. Linie nach oben („Hut“)' ],
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
   * Strictly classical engraved guide to Barlines, Repeats, Dotted Notes, Ties & Articulations
   */
  function articulationSymbolsHTML() {
    const en = MT.state.lang === 'en';
    const box = (w, inner) =>
      `<svg viewBox="0 0 ${w} 62" width="${w}" height="62" style="color:var(--fg);vertical-align:middle">
         <g stroke="currentColor" stroke-width="0.9" opacity="0.65">
           <line x1="2" y1="12" x2="${w - 2}" y2="12"/>
           <line x1="2" y1="22" x2="${w - 2}" y2="22"/>
           <line x1="2" y1="32" x2="${w - 2}" y2="32"/>
           <line x1="2" y1="42" x2="${w - 2}" y2="42"/>
           <line x1="2" y1="52" x2="${w - 2}" y2="52"/>
         </g>
         ${inner}
       </svg>`;

    const symDotted = box(78,
      `<ellipse cx="32" cy="37" rx="6.4" ry="4.4" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-18 32 37)"/>
       <line x1="38" y1="35.5" x2="38" y2="8" stroke="currentColor" stroke-width="1.5"/>
       <circle cx="46" cy="37" r="2.3" fill="currentColor"/>`
    );
    const symTie = box(92,
      `<ellipse cx="26" cy="37" rx="6" ry="4.2" fill="currentColor" transform="rotate(-18 26 37)"/>
       <line x1="31.6" y1="35.5" x2="31.6" y2="10" stroke="currentColor" stroke-width="1.5"/>
       <ellipse cx="64" cy="37" rx="6" ry="4.2" fill="currentColor" transform="rotate(-18 64 37)"/>
       <line x1="69.6" y1="35.5" x2="69.6" y2="10" stroke="currentColor" stroke-width="1.5"/>
       <path d="M27 44 Q45 56 63 44 Q45 52.5 27 44 Z" fill="currentColor"/>`
    );
    const symBar = box(78,
      `<line x1="39" y1="12" x2="39" y2="52" stroke="currentColor" stroke-width="1.6"/>`
    );
    const symFinal = box(78,
      `<line x1="35" y1="12" x2="35" y2="52" stroke="currentColor" stroke-width="1.3"/>
       <line x1="42" y1="12" x2="42" y2="52" stroke="currentColor" stroke-width="4.2"/>`
    );
    const symRepeat = box(82,
      `<circle cx="29" cy="27" r="2.2" fill="currentColor"/>
       <circle cx="29" cy="37" r="2.2" fill="currentColor"/>
       <line x1="37" y1="12" x2="37" y2="52" stroke="currentColor" stroke-width="1.3"/>
       <line x1="44" y1="12" x2="44" y2="52" stroke="currentColor" stroke-width="4.2"/>`
    );
    const symStaccato = box(78,
      `<ellipse cx="38" cy="37" rx="6.2" ry="4.3" fill="currentColor" transform="rotate(-18 38 37)"/>
       <line x1="43.6" y1="35.5" x2="43.6" y2="10" stroke="currentColor" stroke-width="1.5"/>
       <circle cx="38" cy="47.5" r="2.2" fill="currentColor"/>`
    );
    const symLegato = box(96,
      `<ellipse cx="22" cy="42" rx="5.6" ry="4" fill="currentColor" transform="rotate(-18 22 42)"/>
       <line x1="27.2" y1="40.5" x2="27.2" y2="16" stroke="currentColor" stroke-width="1.4"/>
       <ellipse cx="46" cy="32" rx="5.6" ry="4" fill="currentColor" transform="rotate(-18 46 32)"/>
       <line x1="51.2" y1="30.5" x2="51.2" y2="8" stroke="currentColor" stroke-width="1.4"/>
       <ellipse cx="70" cy="37" rx="5.6" ry="4" fill="currentColor" transform="rotate(-18 70 37)"/>
       <line x1="75.2" y1="35.5" x2="75.2" y2="11" stroke="currentColor" stroke-width="1.4"/>
       <path d="M21 49 Q46 61 71 46 Q46 57.5 21 49 Z" fill="currentColor"/>`
    );
    const symTenuto = box(78,
      `<ellipse cx="38" cy="37" rx="6.2" ry="4.3" fill="currentColor" transform="rotate(-18 38 37)"/>
       <line x1="43.6" y1="35.5" x2="43.6" y2="10" stroke="currentColor" stroke-width="1.5"/>
       <line x1="31" y1="47.5" x2="45" y2="47.5" stroke="currentColor" stroke-width="2.1"/>`
    );
    const symAccent = box(78,
      `<ellipse cx="38" cy="37" rx="6.2" ry="4.3" fill="currentColor" transform="rotate(-18 38 37)"/>
       <line x1="43.6" y1="35.5" x2="43.6" y2="10" stroke="currentColor" stroke-width="1.5"/>
       <path d="M31 45 L46 49.5 L31 54" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="miter"/>`
    );
    const symFermata = box(78,
      `<ellipse cx="39" cy="37" rx="7.2" ry="4.6" fill="none" stroke="currentColor" stroke-width="2"/>
       <path d="M25 18 C27 6, 51 6, 53 18 C50 9.5, 28 9.5, 25 18 Z" fill="currentColor"/>
       <circle cx="39" cy="15.5" r="2.1" fill="currentColor"/>`
    );

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
    scaleStaffSVG,
    enharmonicStaffSVG,
    keySigSVG,
    fretSVG,
    circleHTML,
    cagedHTML,
    noteRestTableHTML,
    articulationSymbolsHTML
  };
})();
