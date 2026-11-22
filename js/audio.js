/* Warm E-Piano Web Audio Synthesizer, Arpeggio/Strum, Metronome & Web MIDI */
(function () {
  let ctx = null;
  let masterGain = null;
  let midiOut = null;
  let scaleTimers = [];

  const settings = {
    internal: true,
    volume: 0.75,
    style: 'strum' // 'strum' | 'block' | 'arp'
  };

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = settings.volume;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function setVolume(v) {
    settings.volume = Math.max(0, Math.min(1, v));
    if (masterGain && ctx) {
      masterGain.gain.setTargetAtTime(settings.volume, ctx.currentTime, 0.02);
    }
  }

  function setInternal(on) {
    settings.internal = !!on;
  }

  function setStyle(s) {
    settings.style = s;
  }

  function midiFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function sendMidiNote(midi, durMs, delayMs, vel) {
    if (!midiOut) return;
    const v = Math.max(1, Math.min(127, Math.round((vel || 0.75) * 110)));
    setTimeout(() => {
      try {
        midiOut.send([0x90, midi, v]);
        setTimeout(() => {
          try { midiOut.send([0x80, midi, 0]); } catch (e) {}
        }, durMs);
      } catch (e) {}
    }, delayMs || 0);
  }

  function playNote(midi, durSec = 0.85, delaySec = 0, vel = 0.75) {
    sendMidiNote(midi, durSec * 1000, delaySec * 1000, vel);
    if (!settings.internal || settings.volume <= 0.001) return;

    const ac = ensureCtx();
    const t0 = ac.currentTime + delaySec;
    const freq = midiFreq(midi);

    // Warm electric-piano voice: triangle fundamental + gentle 2nd harmonic + decaying lowpass
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const subGain = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t0);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t0);
    subGain.gain.setValueAtTime(0.18, t0);

    filter.type = 'lowpass';
    const startCut = Math.min(4200, freq * 6.5);
    const endCut = Math.max(480, freq * 1.9);
    filter.frequency.setValueAtTime(startCut, t0);
    filter.frequency.exponentialRampToValueAtTime(endCut, t0 + Math.min(0.6, durSec * 0.7));

    const peak = 0.16 * vel;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.014);
    env.gain.exponentialRampToValueAtTime(peak * 0.45, t0 + Math.min(0.35, durSec * 0.45));
    env.gain.exponentialRampToValueAtTime(0.0008, t0 + durSec);

    osc1.connect(filter);
    osc2.connect(subGain).connect(filter);
    filter.connect(env).connect(masterGain);

    osc1.start(t0);
    osc2.start(t0);
    osc1.stop(t0 + durSec + 0.06);
    osc2.stop(t0 + durSec + 0.06);
  }

  function playChordNotes(notes, durSec = 1.4, styleOverride) {
    if (!notes || !notes.length) return;
    const style = styleOverride || settings.style;
    const step = style === 'arp' ? 0.115 : style === 'strum' ? 0.028 : 0;
    const sorted = notes.slice().sort((a, b) => a - b);
    const velScale = Math.min(1, 3.6 / Math.max(3, sorted.length));

    sorted.forEach((n, idx) => {
      const delay = idx * step;
      const remain = Math.max(0.35, durSec - delay * 0.5);
      // Bass note slightly fuller
      const vel = (idx === 0 ? 0.95 : 0.78) * velScale;
      playNote(n, remain, delay, vel);
    });
  }

  function stopScale() {
    scaleTimers.forEach(id => clearTimeout(id));
    scaleTimers = [];
  }

  function playScale(notes, stepMs = 340, onStep, onDone) {
    stopScale();
    notes.forEach((n, i) => {
      const id = setTimeout(() => {
        playNote(n, 0.55, 0, 0.85);
        if (onStep) onStep(i, n);
      }, i * stepMs);
      scaleTimers.push(id);
    });
    const endId = setTimeout(() => {
      scaleTimers = [];
      if (onDone) onDone();
    }, notes.length * stepMs + 250);
    scaleTimers.push(endId);
  }

  function playClick(accent = false) {
    if (!settings.internal || settings.volume <= 0.001) return;
    const ac = ensureCtx();
    const t0 = ac.currentTime;
    const osc = ac.createOscillator();
    const env = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(accent ? 1150 : 780, t0);
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(accent ? 0.18 : 0.11, t0 + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0008, t0 + 0.045);
    osc.connect(env).connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.05);
  }

  async function enableMIDI(outSelectEl, statusEl, onCC) {
    if (!navigator.requestMIDIAccess) {
      if (statusEl) statusEl.textContent = MT.t('midi_unavail');
      return false;
    }
    try {
      const access = await navigator.requestMIDIAccess();
      function refreshOutputs() {
        if (!outSelectEl) return;
        const prevVal = outSelectEl.value;
        outSelectEl.innerHTML = `<option value="">${MT.t('midi_none')}</option>`;
        access.outputs.forEach(o => outSelectEl.add(new Option(o.name, o.id)));
        outSelectEl.value = prevVal;
        midiOut = access.outputs.get(outSelectEl.value) || null;
      }
      refreshOutputs();
      access.onstatechange = refreshOutputs;
      if (outSelectEl) {
        outSelectEl.onchange = () => {
          midiOut = access.outputs.get(outSelectEl.value) || null;
        };
      }
      access.inputs.forEach(inp => {
        inp.onmidimessage = msg => {
          const [st, d1, d2] = msg.data;
          if ((st & 0xf0) === 0xb0 && onCC) onCC(d1, d2);
        };
      });
      return true;
    } catch (e) {
      if (statusEl) statusEl.textContent = MT.t('midi_unavail');
      return false;
    }
  }

  MT.audio = {
    settings,
    setVolume,
    setInternal,
    setStyle,
    playNote,
    playChordNotes,
    playScale,
    stopScale,
    playClick,
    enableMIDI
  };
})();
