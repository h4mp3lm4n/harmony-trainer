/* Music Theory Engine — Spelling, Parsing, Voicing, Scales & Fretboard */
(function () {
  const N_FLAT = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  const N_SHARP = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const NAT = [0, 2, 4, 5, 7, 9, 11];
  const LETTERS = 'CDEFGAB';
  const RN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const SC = { maj: [0, 2, 4, 5, 7, 9, 11], min: [0, 2, 3, 5, 7, 8, 10] };
  const CIRCLE_ORDER = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];

  // Chord intervals in semitones from root
  const Q = {
    '': [0, 4, 7],
    m: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    '7': [0, 4, 7, 10],
    maj7: [0, 4, 7, 11],
    m7: [0, 3, 7, 10],
    m7b5: [0, 3, 6, 10],
    dim7: [0, 3, 6, 9],
    mMaj7: [0, 3, 7, 11],
    maj7s5: [0, 4, 8, 11],
    '7s5': [0, 4, 8, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    '6': [0, 4, 7, 9],
    m6: [0, 3, 7, 9],
    add9: [0, 4, 7, 14],
    madd9: [0, 3, 7, 14],
    '9': [0, 4, 7, 10, 14],
    maj9: [0, 4, 7, 11, 14],
    m9: [0, 3, 7, 10, 14],
    '13': [0, 4, 7, 10, 14, 21],
    '7b9': [0, 4, 7, 10, 13],
    '7s9': [0, 4, 7, 10, 15],
    it6: [0, 4, 10],
    fr6: [0, 4, 6, 10],
    ger6: [0, 4, 7, 10]
  };

  // Display suffixes
  const SF = {
    '': '',
    m: 'm',
    dim: '°',
    aug: '+',
    '7': '7',
    maj7: 'maj7',
    m7: 'm7',
    m7b5: 'ø',
    dim7: '°7',
    mMaj7: 'm(maj7)',
    maj7s5: 'maj7♯5',
    '7s5': '7♯5',
    sus2: 'sus2',
    sus4: 'sus4',
    '6': '6',
    m6: 'm6',
    add9: 'add9',
    madd9: 'madd9',
    '9': '9',
    maj9: 'maj9',
    m9: 'm9',
    '13': '13',
    '7b9': '7♭9',
    '7s9': '7♯9',
    it6: 'it+6',
    fr6: 'fr+6',
    ger6: 'dt+6'
  };

  // Letter-step offsets from root letter (0=root, 1=2nd, 2=3rd, 3=4th, 4=5th, 5=6th, 6=7th)
  const QS = {
    '': [0, 2, 4],
    m: [0, 2, 4],
    dim: [0, 2, 4],
    aug: [0, 2, 4],
    '7': [0, 2, 4, 6],
    maj7: [0, 2, 4, 6],
    m7: [0, 2, 4, 6],
    m7b5: [0, 2, 4, 6],
    dim7: [0, 2, 4, 6],
    mMaj7: [0, 2, 4, 6],
    maj7s5: [0, 2, 4, 6],
    '7s5': [0, 2, 4, 6],
    sus2: [0, 1, 4],
    sus4: [0, 3, 4],
    '6': [0, 2, 4, 5],
    m6: [0, 2, 4, 5],
    add9: [0, 2, 4, 1],
    madd9: [0, 2, 4, 1],
    '9': [0, 2, 4, 6, 1],
    maj9: [0, 2, 4, 6, 1],
    m9: [0, 2, 4, 6, 1],
    '13': [0, 2, 4, 6, 1, 5],
    '7b9': [0, 2, 4, 6, 1],
    '7s9': [0, 2, 4, 6, 1], // #9 = raised 2nd letter (e.g. E7#9 -> F## or enharmonic G; we spell cleanly below)
    it6: [0, 2, 5],
    fr6: [0, 2, 3, 5],
    ger6: [0, 2, 4, 5] // 5th step = augmented 6th (e.g. Ab C Eb F#)
  };

  // Right-hand upper voicing offsets for 5+/6-note chords (bass root is ALWAYS added in left hand!)
  const RH_EXT = {
    '9': [4, 7, 10, 14],
    maj9: [4, 7, 11, 14],
    m9: [3, 7, 10, 14],
    '13': [4, 10, 14, 21],
    '7b9': [4, 7, 10, 13],
    '7s9': [4, 10, 15],
    add9: [0, 4, 7, 14],
    madd9: [0, 3, 7, 14]
  };

  const TUN = {
    Gitarre: [40, 45, 50, 55, 59, 64], // E2 A2 D3 G3 B3 E4
    Ukulele: [67, 60, 64, 69]          // G4 C4 E4 A4
  };

  function accStr(d) {
    if (d === 0) return '';
    return d > 0 ? '♯'.repeat(d) : '♭'.repeat(-d);
  }

  // Format an internal (international) note or chord name according to notation setting ('int' vs 'de')
  function fmtNote(name) {
    if (!name || MT.state.notation !== 'de') return name;
    // Handle B-based notes carefully (avoid touching suffixes like 'm7b5')
    // Matches leading note name (optionally after '/')
    return name.replace(/(^|\/)([A-G])([♭♯]*)/g, function (m, pre, ltr, acc) {
      if (ltr !== 'B') return m;
      if (acc === '♭') return pre + 'B';
      if (acc === '♭♭') return pre + 'B♭';
      if (acc === '') return pre + 'H';
      if (acc === '♯') return pre + 'H♯';
      return m;
    });
  }

  function noteName(pc, sharp) {
    const raw = (sharp ? N_SHARP : N_FLAT)[((pc % 12) + 12) % 12];
    return fmtNote(raw);
  }

  function rawNoteName(pc, sharp) {
    return (sharp ? N_SHARP : N_FLAT)[((pc % 12) + 12) % 12];
  }

  // Spell a scale degree relative to a key (returns internal spelling, e.g. 'F♯', 'B♭')
  function spellInKey(key, semitones, letterSteps) {
    const baseLetter = LETTERS.indexOf(N_FLAT[key][0]);
    const l = (baseLetter + letterSteps + 70) % 7;
    const pc = (key + semitones + 120) % 12;
    const diff = ((pc - NAT[l] + 18) % 12) - 6;
    return LETTERS[l] + accStr(diff);
  }

  // Format Roman numeral token cleanly for display
  function fmtToken(tok) {
    if (!tok) return '';
    return tok
      .replace(/:\d+$/, '')
      .replace(/@([b#]?)(VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)/, (_, a, n) => '/' + (a === 'b' ? '♭' : a === '#' ? '♯' : '') + n.toUpperCase())
      .replace(/\^1$/, '⁶')
      .replace(/\^2$/, '⁶₄')
      .replace(/\^3$/, '⁴₂')
      .replace(/^b/, '♭')
      .replace(/^#/, '♯')
      .replace(/\/b/, '/♭')
      .replace(/\/#/, '/♯')
      .replace('7b9', '7♭9')
      .replace('7#9', '7♯9')
      .replace('7#5', '7♯5')
      .replace('+7', '+7')
      .replace('it6', 'it+6')
      .replace('fr6', 'fr+6')
      .replace('ger6', MT.state.lang === 'en' ? 'ger+6' : 'dt+6');
  }

  // Spell every pitch class of a chord cleanly (returns map pc -> internal note name)
  function spellChord(c) {
    const map = {};
    const rootLetter = c.rl != null
      ? c.rl
      : LETTERS.indexOf((c.tok && c.tok[0] === '#' ? N_SHARP : N_FLAT)[c.root][0]);
    const ints = Q[c.q] || Q[''];
    const steps = QS[c.q] || QS[''];
    ints.forEach((s, i) => {
      const l = (rootLetter + steps[i]) % 7;
      const pc = (c.root + s) % 12;
      let diff = ((pc - NAT[l] + 18) % 12) - 6;
      // For Hendrix 7#9, avoid awkward double-sharp (e.g. F## on E7#9 -> spell cleanly)
      if (c.q === '7s9' && i === 4 && Math.abs(diff) > 1) {
        const l2 = (rootLetter + 2) % 7;
        const d2 = ((pc - NAT[l2] + 18) % 12) - 6;
        map[pc] = LETTERS[l2] + accStr(d2);
      } else {
        map[pc] = LETTERS[l] + accStr(diff);
      }
    });
    return map;
  }

  function parseDegree(s, mode) {
    const m = /^([b#]?)(VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)/.exec(s);
    if (!m) return null;
    const idx = RN.indexOf(m[2].toUpperCase());
    // In minor mode, allow BOTH modern major-referenced bIII/bVI/bVII AND classical III/VI/VII
    // to point to the natural minor degrees (3, 8, 10), while #vi/#vii raise to 9/11!
    let off;
    if (mode === 'min' && m[1] === 'b' && (idx === 2 || idx === 5 || idx === 6)) {
      off = SC.min[idx];
    } else {
      off = SC[mode][idx] + (m[1] === 'b' ? -1 : m[1] === '#' ? 1 : 0);
    }
    return { o: off, idx, u: m[2] === m[2].toUpperCase(), l: m[0].length };
  }

  function parseChord(tok0, key, mode) {
    if (!tok0) return null;
    let tok = tok0;

    // Optional beat duration (:1..:8)
    let beats = null;
    const beatM = /:(\d+)$/.exec(tok);
    if (beatM) {
      beats = Math.max(1, Math.min(8, +beatM[1]));
      tok = tok.slice(0, -beatM[0].length);
    }

    // Optional explicit pedal / upper-structure bass (@I, @V, @bVII...)
    let customBassPC = null;
    let customBassName = null;
    const bassM = /@([b#]?(?:VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i))$/.exec(tok);
    if (bassM) {
      const bd = parseDegree(bassM[1], mode);
      if (!bd) return null;
      customBassPC = (key + bd.o + 120) % 12;
      customBassName = spellInKey(key, bd.o, bd.idx);
      tok = tok.slice(0, -bassM[0].length);
    }

    const invM = /\^(\d)$/.exec(tok);
    if (invM) tok = tok.slice(0, -invM[0].length);

    const parts = tok.split('/');
    if (parts.length > 2) return null;

    const target = parts[1] ? parseDegree(parts[1], mode) : null;
    if (parts[1] && !target) return null;

    const main = parseDegree(parts[0], parts[1] ? 'maj' : mode);
    if (!main) return null;

    const rem = parts[0].slice(main.l);
    let q = main.u ? '' : 'm';

    if (rem === '') {
      // keep major/minor triad
    } else if (rem === '°' || rem === 'dim') {
      q = 'dim';
    } else if (rem === '°7' || rem === 'dim7') {
      q = 'dim7';
    } else if (rem === 'ø' || rem === 'ø7' || rem === 'm7b5') {
      q = 'm7b5';
    } else if (rem === '+' || rem === 'aug') {
      q = 'aug';
    } else if (rem === '7') {
      q = main.u ? '7' : 'm7';
    } else if (rem === 'maj7' || rem === 'Δ') {
      q = main.u ? 'maj7' : 'mMaj7';
    } else if (rem === '7b9' || rem === '7♭9') {
      q = '7b9';
    } else if (rem === '7#9' || rem === '7♯9') {
      q = '7s9';
    } else if (rem === '7#5' || rem === '7♯5' || rem === '+7') {
      q = '7s5';
    } else if (rem === 'maj7#5' || rem === 'maj7♯5') {
      q = 'maj7s5';
    } else if (['sus2', 'sus4', 'maj9', '13', 'it6', 'fr6', 'ger6'].includes(rem)) {
      q = rem;
    } else if (['add9', '6', '9'].includes(rem)) {
      q = main.u ? rem : 'm' + rem;
    } else {
      return null; // Unknown suffix -> report as invalid!
    }

    const root = (key + main.o + (target ? target.o : 0) + 120) % 12;
    const baseLetter = LETTERS.indexOf(N_FLAT[key][0]);
    const rl = (baseLetter + main.idx + (target ? target.idx : 0)) % 7;
    const rootDiff = ((root - NAT[rl] + 18) % 12) - 6;
    const rawRootName = Math.abs(rootDiff) <= 1 ? (LETTERS[rl] + accStr(rootDiff)) : N_FLAT[root];
    const fi = invM ? +invM[1] : null;

    const c = {
      tok: tok0,
      fi,
      beats,
      customBassPC,
      root,
      q,
      rl: Math.abs(rootDiff) <= 1 ? rl : null
    };
    const sp = spellChord(c);
    const sfx = q === 'ger6' && MT.state.lang === 'en' ? 'ger+6' : SF[q];
    let rawName = rawRootName + sfx;
    if (customBassPC != null) {
      rawName += '/' + (customBassName || N_FLAT[customBassPC]);
    } else if (fi && fi > 0) {
      const ints = Q[q];
      const bassPC = (root + ints[fi % ints.length]) % 12;
      rawName += '/' + (sp[bassPC] || N_FLAT[bassPC]);
    }
    c.rawName = rawName;
    c.name = fmtNote(rawName);
    return c;
  }

  function parseProgression(str, key, mode) {
    const tokens = (str || '').split(/[\s,|–—]+/).filter(Boolean);
    const chords = [];
    const invalid = [];
    tokens.forEach(t => {
      const c = parseChord(t, key, mode);
      if (c) chords.push(c);
      else invalid.push(t);
    });
    return { chords, invalid };
  }

  // Map each pitch class of a chord to its interval degree label & semantic color role
  function chordDegreeMap(c) {
    const ROLE_COLOR = {
      root: 'var(--deg-root)',
      third: 'var(--deg-third)',
      fifth: 'var(--deg-fifth)',
      seventh: 'var(--deg-seventh)',
      ext: 'var(--deg-ext)'
    };
    const ints = Q[c.q] || Q[''];
    const map = {};
    ints.forEach((s, i) => {
      let label = '1';
      let role = 'root';
      if (s === 0) { label = '1'; role = 'root'; }
      else if (s === 2) { label = '2'; role = 'ext'; }
      else if (s === 3) { label = '♭3'; role = 'third'; }
      else if (s === 4) { label = '3'; role = 'third'; }
      else if (s === 5) { label = '4'; role = 'ext'; }
      else if (s === 6) {
        if (c.q === 'fr6') { label = '♯4'; role = 'ext'; }
        else { label = '♭5'; role = 'fifth'; }
      }
      else if (s === 7) { label = '5'; role = 'fifth'; }
      else if (s === 8) { label = '♯5'; role = 'fifth'; }
      else if (s === 9) {
        if (c.q === 'dim7' && i === 3) { label = '♭♭7'; role = 'seventh'; }
        else { label = '6'; role = 'seventh'; }
      }
      else if (s === 10) {
        if (['it6', 'fr6', 'ger6'].includes(c.q)) { label = '♯6'; role = 'seventh'; }
        else { label = '♭7'; role = 'seventh'; }
      }
      else if (s === 11) { label = '7'; role = 'seventh'; }
      else if (s === 13) { label = '♭9'; role = 'ext'; }
      else if (s === 14) { label = '9'; role = 'ext'; }
      else if (s === 15) { label = '♯9'; role = 'ext'; }
      else if (s === 21) { label = '13'; role = 'ext'; }
      map[(c.root + s) % 12] = { label, role, color: ROLE_COLOR[role] };
    });
    return map;
  }

  // Compute true 1-to-1 voice-leading distance between previous chord and candidate voicing
  function voiceLeadCost(prev, cand) {
    let cost = 0;
    if (prev.length === cand.length) {
      for (let i = 0; i < cand.length; i++) {
        cost += Math.abs(cand[i] - prev[i]);
      }
    } else {
      // Match every note in cand to nearest in prev AND every note in prev to nearest in cand
      for (const x of cand) cost += Math.min(...prev.map(p => Math.abs(p - x)));
      for (const p of prev) cost += Math.min(...cand.map(x => Math.abs(p - x))) * 0.5;
    }
    // Reward exact common tones staying put, keep top melody smooth
    const common = cand.filter(x => prev.includes(x)).length;
    const topMove = Math.abs(cand[cand.length - 1] - prev[prev.length - 1]);
    return cost - common * 0.4 + topMove * 0.25;
  }

  // Compute optimal voice-leading + close, smooth bass (never >= 2 octaves apart, no surprise jumps!)
  function voiceChord(c, inv, prev, roundNum, opts) {
    const key = opts && opts.key != null ? opts.key : (MT.state ? MT.state.key : 0);
    const prevBass = opts && opts.prevBass != null ? opts.prevBass : null;

    const ints = RH_EXT[c.q] || Q[c.q] || Q[''];
    const tonicBase = key >= 7 ? (48 + key) : (60 + key);
    const rootMidi = tonicBase + ((c.root - key + 12) % 12);
    const raw = ints.map(i => rootMidi + i);
    const L = raw.length;

    function rot(k) {
      const a = raw.slice();
      for (let i = 0; i < k; i++) a.push(a.shift() + 12);
      return a;
    }

    const fi = c.fi;
    let upper;

    if (inv < 8) {
      // Fixed voicing (Grundstellung or explicit inversion): clean, predictable, zero surprise jumps!
      const k = (fi != null ? fi : inv) % L;
      upper = rot(k);
    } else {
      // Voice-leading modes:
      // 10 = start root, 11 = start 1st inv, 12 = start 2nd inv, 8 = cycle (0 -> 1 -> 2), 9 = legacy alias for 10
      const startInv = inv === 8 ? (roundNum || 0) % 3 : (inv >= 10 ? inv - 10 : 0);

      if (!prev) {
        // First chord of progression (or single click): place exact requested starting inversion cleanly in center
        const k = (fi != null ? fi : startInv) % L;
        let best = rot(k);
        let bestScore = 1e9;
        for (const shift of [-24, -12, 0, 12]) {
          const v = rot(k).map(x => x + shift);
          const center = (v[0] + v[v.length - 1]) / 2;
          if (v[0] < 54 || v[v.length - 1] > 81) continue;
          const sc = Math.abs(center - 66);
          if (sc < bestScore) { bestScore = sc; best = v; }
        }
        upper = best;
      } else {
        // Subsequent chords: true 1-to-1 minimal voice leading with soft center gravity (no hard-wall octave flips!)
        const ks = fi != null ? [fi % L] : Array.from({ length: L }, (_, i) => i);
        let best = rot(fi != null ? fi % L : 0);
        let bestScore = 1e9;

        for (const k of ks) {
          for (const shift of [-24, -12, 0, 12]) {
            const v = rot(k).map(x => x + shift);
            if (v[0] < 50 || v[v.length - 1] > 84) continue;
            const center = (v[0] + v[v.length - 1]) / 2;
            const vl = voiceLeadCost(prev, v);
            // Soft penalty only if drifting outside comfortable keyboard range (57..76)
            const softRange = (v[0] < 55 ? (55 - v[0]) * 0.6 : 0) + (v[v.length - 1] > 78 ? (v[v.length - 1] - 78) * 0.6 : 0);
            const gravity = Math.abs(center - 65) * 0.06;
            const score = vl + softRange + gravity;
            if (score < bestScore) {
              bestScore = score;
              best = v;
            }
          }
        }
        upper = best;
      }
    }

    // Bass pitch class: pedal/upper-structure (@I) > explicit inversion (^1/^2/^3) > fixed inversion (1..3) > root
    let bassPC = c.root;
    if (c.customBassPC != null) {
      bassPC = c.customBassPC;
    } else if (fi != null && fi > 0) {
      const full = Q[c.q];
      bassPC = (c.root + full[fi % full.length]) % 12;
    } else if (inv >= 1 && inv <= 3) {
      const full = Q[c.q];
      bassPC = (c.root + full[inv % full.length]) % 12;
    }

    let bass;
    if (inv < 8) {
      bass = (RH_EXT[c.q] && fi == null && inv === 0 && c.customBassPC == null)
        ? (rootMidi - 12)
        : (upper[0] - 12);
      while (((bass % 12) + 12) % 12 !== bassPC) bass--;
      if (upper[0] - bass > 19 && bass + 12 <= upper[0] - 4) bass += 12;
      if (upper[0] - bass < 4) bass -= 12;
    } else {
      // Keep bass strictly 4..19 semitones below upper[0] (NEVER >= 2 octaves apart!)
      const minB = Math.max(38, upper[0] - 19);
      const maxB = Math.min(57, upper[0] - 4);
      const target = prevBass != null ? prevBass : (upper[0] - 12);

      // Hold exact pedal bass note if unchanged and within range
      if (c.customBassPC != null && prevBass != null && (prevBass % 12) === bassPC && prevBass >= minB && prevBass <= maxB) {
        bass = prevBass;
      } else {
        let bestB = null;
        let bestDist = 1e9;
        for (let oct = 2; oct <= 4; oct++) {
          const cand = 12 * (oct + 1) + bassPC;
          if (cand < minB || cand > maxB) continue;
          const d = Math.abs(cand - target);
          if (d < bestDist || (d === bestDist && Math.abs(cand - (upper[0] - 12)) < Math.abs(bestB - (upper[0] - 12)))) {
            bestDist = d;
            bestB = cand;
          }
        }
        if (bestB == null) {
          for (let oct = 2; oct <= 4; oct++) {
            const cand = 12 * (oct + 1) + bassPC;
            if (cand > upper[0] - 3 || cand < 36) continue;
            const d = Math.abs(cand - target);
            if (d < bestDist) { bestDist = d; bestB = cand; }
          }
        }
        bass = bestB != null ? bestB : (upper[0] - 12);
      }
    }

    return {
      bass,
      upper,
      all: [bass, ...upper]
    };
  }

  // Human-readable neck position label for a grip (e.g. "offen", "3. Bund", "5. Bund")
  function gripPosLabel(grip) {
    if (!grip) return '';
    const fretted = grip.filter(v => v > 0);
    const hasOpen = grip.some(v => v === 0);
    const minF = fretted.length ? Math.min(...fretted) : 0;
    const maxF = fretted.length ? Math.max(...fretted) : 0;
    if (hasOpen && maxF <= 4) return MT.t('caged_open');
    return MT.state.lang === 'en' ? `Fret ${minF}` : `${minF}. Bund`;
  }

  // Playable Guitar & Ukulele Grip Finder — returns genuinely distinct neck positions (CAGED-like zones!)
  const gripCache = {};
  function findGrips(ins, c, bassPC, requireBass) {
    const bassKey = requireBass ? bassPC : 'any';
    const cacheKey = ins + '|' + c.root + '|' + c.q + '|' + bassKey;
    if (gripCache[cacheKey]) return gripCache[cacheKey];

    const tun = TUN[ins];
    const nStr = tun.length;
    const fullPCs = Q[c.q].map(i => (c.root + i) % 12);

    let need = fullPCs;
    if (fullPCs.length === 5) {
      need = fullPCs.filter((_, i) => i !== 2);
    } else if (fullPCs.length >= 6) {
      need = ins === 'Ukulele'
        ? [fullPCs[0], fullPCs[1], fullPCs[3], fullPCs[5]]
        : fullPCs.filter((_, i) => i !== 2);
    }

    const strictModes = requireBass ? [1, 0] : [1, 0];
    const targetBass = requireBass ? bassPC : c.root;
    const allCandidates = [];

    for (const strict of strictModes) {
      const bucketBest = new Map(); // position zone -> [score, grip]
      for (let baseFret = 0; baseFret <= 10; baseFret++) {
        const opts = [];
        for (let s = 0; s < nStr; s++) {
          const a = ins === 'Ukulele' ? [] : [-1];
          if (baseFret <= 1) a.push(0);
          for (let f = Math.max(baseFret, 1); f <= baseFret + 3; f++) a.push(f);
          opts.push(a);
        }
        const f = new Array(nStr);
        function check() {
          const first = f.findIndex(v => v >= 0);
          if (first < 0) return;
          let last = nStr - 1;
          while (last > first && f[last] < 0) last--;
          if (f.slice(first, last + 1).some(v => v < 0)) return;
          const pitches = [];
          for (let s = 0; s < nStr; s++) {
            if (f[s] >= 0) pitches.push(tun[s] + f[s]);
          }
          if (pitches.length < 4) return;
          if (!pitches.every(p => fullPCs.includes(p % 12))) return;
          if (!need.every(req => pitches.some(p => p % 12 === req))) return;
          if (strict && (Math.min(...pitches) % 12) !== targetBass) return;

          const fretted = f.filter(v => v > 0);
          const minF = fretted.length ? Math.min(...fretted) : 0;
          const maxF = fretted.length ? Math.max(...fretted) : 0;
          const span = fretted.length ? maxF - minF : 0;

          const minCount = fretted.filter(v => v === minF).length;
          const hasOpen = f.some(v => v === 0);
          const fingers = (minCount >= 2 && !hasOpen)
            ? 1 + (fretted.length - minCount)
            : fretted.length;
          if (fingers > 4) return;

          const openBonus = f.filter(v => v === 0).length * -0.5;
          const score = span * 2.1 + (nStr - pitches.length) * 0.8 + fingers * 0.5 + openBonus + (strict ? 0 : 1.5);
          // Group into distinct neck zones: 0 = open, then 2-fret zones (1-2, 3-4, 5-6, 7-8, 9-11)
          const zone = (hasOpen && maxF <= 4) ? 0 : Math.ceil(minF / 2);
          const prev = bucketBest.get(zone);
          if (!prev || score < prev[0]) {
            bucketBest.set(zone, [score, f.slice(), minF]);
          }
        }
        function rec(s) {
          if (s === nStr) return check();
          for (const v of opts[s]) {
            f[s] = v;
            rec(s + 1);
          }
        }
        rec(0);
      }

      // Sort distinct neck zones from nut up the neck (open -> low -> mid -> high!)
      const zoneEntries = [...bucketBest.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(e => e[1]);

      for (const [, grip] of zoneEntries) {
        if (!allCandidates.some(g => g.join(',') === grip.join(','))) {
          allCandidates.push(grip);
        }
      }
      if (allCandidates.length >= 4) break;
    }

    // Sort distinct neck positions cleanly from nut up the neck (open -> low -> mid -> high)
    allCandidates.sort((a, b) => {
      const posOf = g => {
        const fr = g.filter(v => v > 0);
        const mx = fr.length ? Math.max(...fr) : 0;
        if (g.some(v => v === 0) && mx <= 4) return 0;
        return fr.length ? Math.min(...fr) : 0;
      };
      return posOf(a) - posOf(b);
    });

    return (gripCache[cacheKey] = allCandidates.slice(0, 5));
  }

  // Smart scale degree labels (fixes Persian & Locrian using ♭5 instead of duplicate ♯4!)
  function scaleDegreeLabels(ints) {
    const hasFifth = ints.includes(7);
    const hasFourth = ints.includes(5);
    return ints.map(x => {
      if (x === 0) return '1';
      if (x === 1) return '♭2';
      if (x === 2) return '2';
      if (x === 3) return ints.includes(4) && !ints.includes(2) ? '♯2' : '♭3';
      if (x === 4) return '3';
      if (x === 5) return '4';
      if (x === 6) return (hasFourth && !hasFifth) ? '♭5' : '♯4';
      if (x === 7) return '5';
      if (x === 8) return (!hasFifth && !ints.includes(6)) ? '♯5' : '♭6';
      if (x === 9) return '6';
      if (x === 10) return '♭7';
      if (x === 11) return '7';
      return String(x);
    });
  }

  // Transpose a C-based description string into the current key AND respect B/H notation!
  function transposeText(str, key) {
    if (!str) return '';
    const baseLetter = LETTERS.indexOf(N_FLAT[key][0]);
    function trOne(ltr, acc) {
      const li = ltr === 'H' ? 6 : LETTERS.indexOf(ltr);
      const origSemi = (ltr === 'H' ? 11 : NAT[li]) + (acc === '♯' ? 1 : acc === '♭' ? -1 : 0);
      const nl = (li + baseLetter) % 7;
      const pc = (origSemi + key + 120) % 12;
      const diff = ((pc - NAT[nl] + 18) % 12) - 6;
      const raw = Math.abs(diff) <= 1 ? (LETTERS[nl] + accStr(diff)) : N_FLAT[pc];
      return fmtNote(raw);
    }

    return str
      .replace(/(^|[^A-Za-zÄÖÜäöüß])([A-G])([♭♯]?)((?:maj9|maj7♯5|maj7|m7♭5|m9|m7|m6|madd9|m|7♭9|7♯9|7♯5|7|°7|°|ø7|ø|\+|sus[24]|add9|13|9|6|it\+6|fr\+6|dt\+6|ger\+6)?)(?![a-zäöüßA-Z]|-Saite|-Form|-Schlüssel|-string|-shape|-clef)/g,
        (m, pre, ltr, acc, suf) => {
          // Do not transpose lone English word "A"
          if (ltr === 'A' && !acc && !suf && MT.state.lang === 'en') {
            return m;
          }
          return pre + trOne(ltr, acc) + suf;
        })
      .replace(/(^|[^A-Za-zÄÖÜäöüß])([a-g])([♭♯]?)(?=-(?:Moll|Äolisch))/g,
        (m, pre, ltr, acc) => {
          const n = trOne(ltr.toUpperCase(), acc);
          return pre + n[0].toLowerCase() + n.slice(1);
        });
  }

  // Compute diatonic triads or seventh chords of any 7-note scale
  function harmonizeScale(ints, key) {
    if (ints.length !== 7) return { triads: [], sevenths: [] };
    const names = ints.map((x, i) => spellInKey(key, x, i));
    const triads = [];
    const sevenths = [];

    function rnLabel(i, q) {
      const d = ints[i] - SC.maj[i];
      const low = ['m', 'dim', 'm7', 'm7b5', 'dim7', 'mMaj7'].includes(q);
      const prefix = d < 0 ? '♭' : d > 0 ? '♯' : '';
      const num = low ? RN[i].toLowerCase() : RN[i];
      const suf = {
        dim: '°', aug: '+', m7: '7', '7': '7', maj7: 'maj7',
        m7b5: 'ø', dim7: '°7', mMaj7: 'maj7', maj7s5: 'maj7♯5', '7s5': '7♯5'
      }[q] || '';
      return prefix + num + suf;
    }

    for (let i = 0; i < 7; i++) {
      const gap = k => ints[(i + k) % 7] + (i + k >= 7 ? 12 : 0) - ints[i];
      const tq = { '4,7': '', '3,7': 'm', '3,6': 'dim', '4,8': 'aug' }[gap(2) + ',' + gap(4)];
      const sq = {
        '4,7,11': 'maj7', '4,7,10': '7', '3,7,10': 'm7', '3,6,10': 'm7b5',
        '3,6,9': 'dim7', '3,7,11': 'mMaj7', '4,8,11': 'maj7s5', '4,8,10': '7s5'
      }[gap(2) + ',' + gap(4) + ',' + gap(6)];
      const root = (key + ints[i]) % 12;
      const rl = (LETTERS.indexOf(N_FLAT[key][0]) + i) % 7;

      if (tq != null) {
        triads.push({
          root, q: tq, rl,
          tok: rnLabel(i, tq),
          rawName: names[i] + SF[tq],
          name: fmtNote(names[i] + SF[tq])
        });
      }
      if (sq != null) {
        sevenths.push({
          root, q: sq, rl,
          tok: rnLabel(i, sq),
          rawName: names[i] + SF[sq],
          name: fmtNote(names[i] + SF[sq])
        });
      }
    }
    return { triads, sevenths };
  }

  function midiToName(midi, spellMap) {
    const pc = ((midi % 12) + 12) % 12;
    const raw = (spellMap && spellMap[pc]) || N_FLAT[pc];
    const acc = raw.slice(1);
    const accOff = acc.length ? (acc[0] === '♯' ? acc.length : -acc.length) : 0;
    const oct = Math.floor((midi - accOff) / 12) - 1;
    return fmtNote(raw) + oct;
  }

  function relativeMajorHint(tokStr, key) {
    const relKey = (key + 3) % 12;
    const relName = fmtNote(spellInKey(key, 3, 2));
    const { chords } = parseProgression(tokStr, key, 'min');
    const degs = chords.map(c => {
      const idx = SC.maj.indexOf((c.root - relKey + 12) % 12);
      if (idx < 0) return MT.t('non_diatonic');
      const isMin = ['m', 'dim', 'm7', 'm7b5', 'dim7'].includes(c.q);
      return isMin ? RN[idx].toLowerCase() : RN[idx];
    });
    const majSfx = MT.t('key_maj_sfx');
    return `<div class="hint" style="margin-top:6px">${MT.t('rel_maj_prefix')}: <b>${relName}${majSfx}</b> · ${MT.t('rel_maj_degrees')}: ${degs.join(' – ')}</div>`;
  }

  // Scale catalog (all original scales preserved!)
  const SCALES_BASIC = [
    { name: { de: 'Dur (Ionisch)', en: 'Major (Ionian)' }, ints: [0, 2, 4, 5, 7, 9, 11] },
    { name: { de: 'Natürlich Moll', en: 'Natural Minor' }, ints: [0, 2, 3, 5, 7, 8, 10] },
    { name: { de: 'Harmonisch Moll', en: 'Harmonic Minor' }, ints: [0, 2, 3, 5, 7, 8, 11] },
    { name: { de: 'Melodisch Moll ↑', en: 'Melodic Minor ↑' }, ints: [0, 2, 3, 5, 7, 9, 11] }
  ];

  const SCALES_MODES = [
    { name: { de: 'Ionisch (= Dur)', en: 'Ionian (= Major)' }, ints: [0, 2, 4, 5, 7, 9, 11], parentOff: 0, deg: 1 },
    { name: { de: 'Dorisch', en: 'Dorian' }, ints: [0, 2, 3, 5, 7, 9, 10], parentOff: 2, deg: 2 },
    { name: { de: 'Phrygisch', en: 'Phrygian' }, ints: [0, 1, 3, 5, 7, 8, 10], parentOff: 4, deg: 3 },
    { name: { de: 'Lydisch', en: 'Lydian' }, ints: [0, 2, 4, 6, 7, 9, 11], parentOff: 5, deg: 4 },
    { name: { de: 'Mixolydisch', en: 'Mixolydian' }, ints: [0, 2, 4, 5, 7, 9, 10], parentOff: 7, deg: 5 },
    { name: { de: 'Äolisch (= nat. Moll)', en: 'Aeolian (= nat. Minor)' }, ints: [0, 2, 3, 5, 7, 8, 10], parentOff: 9, deg: 6 },
    { name: { de: 'Lokrisch', en: 'Locrian' }, ints: [0, 1, 3, 5, 6, 8, 10], parentOff: 11, deg: 7 }
  ];

  const SCALES_WORLD = [
    { name: { de: 'Pentatonik Dur', en: 'Major Pentatonic' }, ints: [0, 2, 4, 7, 9] },
    { name: { de: 'Pentatonik Moll', en: 'Minor Pentatonic' }, ints: [0, 3, 5, 7, 10] },
    { name: { de: 'Bluesskala', en: 'Blues Scale' }, ints: [0, 3, 5, 6, 7, 10] },
    { name: { de: 'Ganztonleiter', en: 'Whole-Tone Scale' }, ints: [0, 2, 4, 6, 8, 10] },
    { name: { de: 'Phrygisch-Dominant (Spanisch)', en: 'Phrygian Dominant (Spanish)' }, ints: [0, 1, 4, 5, 7, 8, 10] },
    { name: { de: 'Doppelharmonisch (Arabisch)', en: 'Double Harmonic (Arabic)' }, ints: [0, 1, 4, 5, 7, 8, 11] },
    { name: { de: 'Vermindert (G–H)', en: 'Diminished (W–H)' }, ints: [0, 2, 3, 5, 6, 8, 9, 11] },
    { name: { de: 'Ungarisch Moll', en: 'Hungarian Minor' }, ints: [0, 2, 3, 6, 7, 8, 11] },
    { name: { de: 'Hirajoshi (Japan)', en: 'Hirajoshi (Japan)' }, ints: [0, 2, 3, 7, 8] },
    { name: { de: 'In-Sen (Japan)', en: 'In-Sen (Japan)' }, ints: [0, 1, 5, 7, 10] },
    { name: { de: 'Yo (Japan)', en: 'Yo (Japan)' }, ints: [0, 2, 5, 7, 9] },
    { name: { de: 'Kumoi (Japan)', en: 'Kumoi (Japan)' }, ints: [0, 2, 3, 7, 9] },
    { name: { de: 'Miyako-bushi (Japan)', en: 'Miyako-bushi (Japan)' }, ints: [0, 1, 5, 7, 8] },
    { name: { de: 'Pelog (Java, vereinfacht)', en: 'Pelog (Java, simplified)' }, ints: [0, 1, 3, 7, 8] },
    { name: { de: 'Neapolitanisch Moll', en: 'Neapolitan Minor' }, ints: [0, 1, 3, 5, 7, 8, 11] },
    { name: { de: 'Alteriert (Super-Lokrisch)', en: 'Altered (Super-Locrian)' }, ints: [0, 1, 3, 4, 6, 8, 10] },
    { name: { de: 'Lydisch Dominant', en: 'Lydian Dominant' }, ints: [0, 2, 4, 6, 7, 9, 10] },
    { name: { de: 'Persisch', en: 'Persian' }, ints: [0, 1, 4, 5, 6, 8, 11] },
    { name: { de: 'Bebop Dominant', en: 'Bebop Dominant' }, ints: [0, 2, 4, 5, 7, 9, 10, 11] },
    { name: { de: 'Raga Todi (Indien)', en: 'Raga Todi (India)' }, ints: [0, 1, 3, 6, 7, 8, 11] },
    { name: { de: 'Enigmatisch (Verdi)', en: 'Enigmatic (Verdi)' }, ints: [0, 1, 4, 6, 8, 10, 11] },
    { name: { de: 'Prometheus (Skrjabin)', en: 'Prometheus (Scriabin)' }, ints: [0, 2, 4, 6, 9, 10] }
  ];

  // Transpose HTML safely (skips tags and protected non-chord phrases like "z. B.", "D.C.", "D.S.", "CAGED")
  function transposeHTML(html, key) {
    if (!html) return '';
    const saved = [];
    const protectRe = /<[^>]+>|z\.\s*B\.|D\.C\.|D\.S\.|CAGED|FACE|ACEG|\b[GH](?:\s+[GH]){3,}\b/g;
    const masked = html.replace(protectRe, m => {
      const idx = saved.length;
      saved.push(m);
      return `\u0000${idx}\u0000`;
    });
    const unwrapped = masked.replace(/\[([^\]]+)\]/g, '$1');
    const transposed = transposeText(unwrapped, key);
    return transposed.replace(/\u0000(\d+)\u0000/g, (_, i) => saved[+i]);
  }

  MT.theory = {
    N_FLAT, N_SHARP, NAT, LETTERS, RN, SC, CIRCLE_ORDER,
    Q, SF, QS, TUN,
    SCALES_BASIC, SCALES_MODES, SCALES_WORLD,
    fmtNote, noteName, rawNoteName, spellInKey, fmtToken,
    spellChord, chordDegreeMap, parseChord, parseProgression, voiceChord,
    findGrips, gripPosLabel, scaleDegreeLabels,
    transposeText, transposeHTML, harmonizeScale, midiToName, relativeMajorHint
  };
})();
