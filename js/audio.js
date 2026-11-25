/* Multi-Instrument Web Audio Synthesizer (Piano, Rhodes, Organ, Strings, Pad, Guitar), Arpeggio/Strum, Metronome & Web MIDI */
(function () {
  let ctx = null;
  let masterGain = null;
  let dryBus = null;
  let wetBus = null;
  let stringsBus = null;
  let bowNoiseBuf = null;
  let waves = null;
  let midiOut = null;
  let scaleTimers = [];

  const INSTRUMENTS = ['rhodes', 'piano', 'organ', 'strings', 'pad', 'guitar'];

  const settings = {
    internal: true,
    volume: 0.75,
    style: 'strum',      // 'strum' | 'block' | 'arp'
    instrument: 'rhodes' // 'rhodes' | 'piano' | 'organ' | 'strings' | 'pad' | 'guitar'
  };

  function createRoomImpulse(ac, seconds = 0.95, decay = 2.8) {
    const rate = ac.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = ac.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const env = Math.pow(1 - i / len, decay);
        const white = (Math.random() * 2 - 1) * env;
        // Gentle low-pass smoothing so the room tail stays warm and natural
        lp = lp * 0.62 + white * 0.38;
        data[i] = lp;
      }
    }
    return buf;
  }

  function buildPeriodicWaves(ac) {
    const makeWave = amps => {
      const real = new Float32Array(amps.length);
      const imag = new Float32Array(amps.length);
      for (let i = 1; i < amps.length; i++) imag[i] = amps[i];
      return ac.createPeriodicWave(real, imag, { disableNormalization: false });
    };
    // Bowed violin/cello Helmholtz-style harmonic series (softer upper partials than raw sawtooth)
    const strAmps = [0];
    for (let h = 1; h <= 14; h++) {
      // Slight acoustic dip on 4th/8th partial + natural 1/h^1.28 rolloff
      const dip = (h === 4 || h === 8) ? 0.72 : 1.0;
      strAmps.push((dip / Math.pow(h, 1.28)));
    }
    return {
      // Acoustic piano harmonic rolloff
      piano: makeWave([0, 1.0, 0.52, 0.28, 0.16, 0.09, 0.05, 0.025, 0.012]),
      // Hammond drawbar registration (16' / 8' / 5⅓' / 4' / 2⅔' / 2')
      organ: makeWave([0, 1.0, 0.82, 0.48, 0.38, 0.0, 0.20, 0.0, 0.14]),
      // Bowed acoustic strings harmonic profile
      strings: makeWave(strAmps),
      // Nylon / acoustic guitar string partials
      guitar: makeWave([0, 1.0, 0.68, 0.44, 0.24, 0.14, 0.07, 0.035])
    };
  }

  function createNoiseBuffer(ac, seconds = 0.25) {
    const len = Math.floor(ac.sampleRate * seconds);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function buildStringsFormantBus(ac) {
    // Shared acoustic violin/cello body resonance chain (wood formants -> warm hall)
    const input = ac.createGain();
    const hp = ac.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 95;

    // Air/chest body resonance (~280 Hz)
    const fAir = ac.createBiquadFilter();
    fAir.type = 'peaking';
    fAir.frequency.value = 280;
    fAir.Q.value = 1.6;
    fAir.gain.value = 3.2;

    // Main spruce/wood body formant (~620 Hz)
    const fWood = ac.createBiquadFilter();
    fWood.type = 'peaking';
    fWood.frequency.value = 620;
    fWood.Q.value = 1.8;
    fWood.gain.value = 4.2;

    // Subtle dip in synthetic "nasal" midrange (~1250 Hz)
    const fDip = ac.createBiquadFilter();
    fDip.type = 'peaking';
    fDip.frequency.value = 1250;
    fDip.Q.value = 1.4;
    fDip.gain.value = -3.5;

    // Silk / bridge brilliance formant (~2450 Hz)
    const fBridge = ac.createBiquadFilter();
    fBridge.type = 'peaking';
    fBridge.frequency.value = 2450;
    fBridge.Q.value = 2.0;
    fBridge.gain.value = 2.8;

    // Smooth upper air rolloff (removes any residual synth edge)
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3350;
    lp.Q.value = 0.5;

    input.connect(hp).connect(fAir).connect(fWood).connect(fDip).connect(fBridge).connect(lp);
    lp.connect(dryBus);
    const wetSend = ac.createGain();
    wetSend.gain.value = 0.42;
    lp.connect(wetSend).connect(wetBus);
    return input;
  }

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 18;
      comp.ratio.value = 4;
      comp.attack.value = 0.005;
      comp.release.value = 0.15;

      masterGain = ctx.createGain();
      masterGain.gain.value = settings.volume;

      dryBus = ctx.createGain();
      dryBus.gain.value = 0.88;

      wetBus = ctx.createGain();
      wetBus.gain.value = 0.20;

      try {
        const conv = ctx.createConvolver();
        conv.buffer = createRoomImpulse(ctx);
        wetBus.connect(conv).connect(comp);
      } catch (e) {
        // Fallback if ConvolverNode unavailable
        wetBus.connect(comp);
      }

      dryBus.connect(comp);
      comp.connect(masterGain).connect(ctx.destination);
      waves = buildPeriodicWaves(ctx);
      bowNoiseBuf = createNoiseBuffer(ctx, 0.24);
      stringsBus = buildStringsFormantBus(ctx);
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

  function setInstrument(inst) {
    if (INSTRUMENTS.includes(inst)) settings.instrument = inst;
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

  function connectToBus(node, wetAmt = 0.22) {
    node.connect(dryBus);
    if (wetAmt > 0) {
      const send = ctx.createGain();
      send.gain.value = wetAmt;
      node.connect(send).connect(wetBus);
    }
  }

  /* ---- Voice Builders per Instrument ---- */

  function playRhodes(ac, freq, t0, durSec, vel) {
    // Classic Fender Rhodes: warm fundamental + bell tine FM transient + soft stereo-like tremolo
    const carrier = ac.createOscillator();
    const body = ac.createOscillator();
    const tine = ac.createOscillator();
    const bodyGain = ac.createGain();
    const tineGain = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, t0);

    body.type = 'triangle';
    body.frequency.setValueAtTime(freq, t0);
    body.detune.setValueAtTime(2, t0);
    bodyGain.gain.setValueAtTime(0.24, t0);

    // Subtle glassy bell tine (fast decay at 4x fundamental)
    tine.type = 'sine';
    tine.frequency.setValueAtTime(freq * 4, t0);
    tineGain.gain.setValueAtTime(0.085 * vel, t0);
    tineGain.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.14);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(3600, freq * 6), t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(520, freq * 2.1), t0 + Math.min(0.55, durSec * 0.65));

    // Gentle Rhodes tremolo LFO
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    lfo.frequency.setValueAtTime(4.8, t0);
    lfoGain.gain.setValueAtTime(0.015 * vel, t0);
    lfo.connect(lfoGain).connect(env.gain);

    const peak = 0.18 * vel;
    const stopAt = t0 + durSec + 0.18;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.010);
    env.gain.exponentialRampToValueAtTime(peak * 0.52, t0 + Math.min(0.4, durSec * 0.5));
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    carrier.connect(filter);
    body.connect(bodyGain).connect(filter);
    tine.connect(tineGain).connect(filter);
    filter.connect(env);
    connectToBus(env, 0.24);

    carrier.start(t0); body.start(t0); tine.start(t0); lfo.start(t0);
    carrier.stop(stopAt + 0.04); body.stop(stopAt + 0.04); tine.stop(t0 + 0.18); lfo.stop(stopAt + 0.04);
  }

  function playPiano(ac, freq, t0, durSec, vel) {
    // Warm acoustic piano: rich PeriodicWave + slightly detuned unison string + bright hammer transient
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const osc2Gain = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    osc1.setPeriodicWave(waves.piano);
    osc1.frequency.setValueAtTime(freq, t0);

    osc2.setPeriodicWave(waves.piano);
    osc2.frequency.setValueAtTime(freq, t0);
    osc2.detune.setValueAtTime(2.8, t0);
    osc2Gain.gain.setValueAtTime(0.45, t0);

    filter.type = 'lowpass';
    const startCut = Math.min(6800, freq * 10);
    const endCut = Math.max(600, freq * 2.2);
    filter.frequency.setValueAtTime(startCut, t0);
    filter.frequency.exponentialRampToValueAtTime(endCut, t0 + Math.min(0.42, durSec * 0.55));

    const peak = 0.19 * vel;
    const stopAt = t0 + durSec + 0.22;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.006);
    env.gain.exponentialRampToValueAtTime(peak * 0.42, t0 + Math.min(0.32, durSec * 0.4));
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    osc1.connect(filter);
    osc2.connect(osc2Gain).connect(filter);
    filter.connect(env);
    connectToBus(env, 0.26);

    osc1.start(t0); osc2.start(t0);
    osc1.stop(stopAt + 0.04); osc2.stop(stopAt + 0.04);
  }

  function playOrgan(ac, freq, t0, durSec, vel) {
    // Hammond-style drawbar organ: sustained additive partials + rotary shimmer + soft key click
    const osc = ac.createOscillator();
    const sub = ac.createOscillator();
    const subGain = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    osc.setPeriodicWave(waves.organ);
    osc.frequency.setValueAtTime(freq, t0);

    // 16' sub-drawbar on upper chords for warm gospel richness
    sub.type = 'sine';
    sub.frequency.setValueAtTime(freq * 0.5, t0);
    subGain.gain.setValueAtTime(freq > 180 ? 0.22 : 0.04, t0);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(3200, freq * 5.5), t0);

    // Gentle rotary speaker vibrato
    const lfo = ac.createOscillator();
    const lfoDepth = ac.createGain();
    lfo.frequency.setValueAtTime(5.6, t0);
    lfoDepth.gain.setValueAtTime(freq * 0.0045, t0);
    lfo.connect(lfoDepth).connect(osc.frequency);

    // Full organ sustain until release
    const peak = 0.135 * vel;
    const relStart = t0 + Math.max(0.18, durSec - 0.06);
    const stopAt = relStart + 0.14;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.012);
    env.gain.setValueAtTime(peak * 0.94, relStart);
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    osc.connect(filter);
    sub.connect(subGain).connect(filter);
    filter.connect(env);
    connectToBus(env, 0.28);

    osc.start(t0); sub.start(t0); lfo.start(t0);
    osc.stop(stopAt + 0.03); sub.stop(stopAt + 0.03); lfo.stop(stopAt + 0.03);
  }

  function playStrings(ac, freq, t0, durSec, vel) {
    // Expressive acoustic string section:
    // 3 micro-detuned bowed-string players + delayed human vibrato + subtle rosin bow-grip + wooden body formants
    const atk = Math.min(0.20, Math.max(0.11, durSec * 0.24));
    const relStart = t0 + Math.max(atk + 0.08, durSec - 0.04);
    const stopAt = relStart + 0.34;

    const noteFilter = ac.createBiquadFilter();
    noteFilter.type = 'lowpass';
    noteFilter.Q.setValueAtTime(0.6, t0);
    // Bow pressure opens brightness gently as the bow draws across the string
    noteFilter.frequency.setValueAtTime(Math.max(680, freq * 2.1), t0);
    noteFilter.frequency.linearRampToValueAtTime(Math.min(3400, freq * 5.2), t0 + atk + 0.14);
    noteFilter.frequency.exponentialRampToValueAtTime(Math.max(850, freq * 2.6), stopAt);

    const env = ac.createGain();
    const peak = 0.115 * vel;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + atk);
    env.gain.setValueAtTime(peak * 0.94, relStart);
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    // Delayed natural string vibrato (independent rate per note so chords shimmer organically!)
    const vib = ac.createOscillator();
    const vibEnv = ac.createGain();
    vib.type = 'sine';
    vib.frequency.setValueAtTime(5.1 + Math.random() * 0.8, t0);
    const vibDelay = t0 + Math.min(0.18, atk);
    vibEnv.gain.setValueAtTime(0.0001, t0);
    vibEnv.gain.setValueAtTime(0.0001, vibDelay);
    vibEnv.gain.linearRampToValueAtTime(freq * 0.0042, vibDelay + 0.28);
    vib.connect(vibEnv);

    // Three bowed players with slight human detune & onset stagger
    const players = [
      { detune: -5.5, gain: 0.42, offset: 0.000 },
      { detune: 0.0,  gain: 0.55, offset: 0.007 },
      { detune: 6.0,  gain: 0.42, offset: 0.015 }
    ];
    players.forEach(p => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.setPeriodicWave(waves.strings);
      osc.frequency.setValueAtTime(freq, t0 + p.offset);
      osc.detune.setValueAtTime(p.detune, t0 + p.offset);
      vibEnv.connect(osc.frequency);
      g.gain.setValueAtTime(p.gain, t0 + p.offset);
      osc.connect(g).connect(noteFilter);
      osc.start(t0 + p.offset);
      osc.stop(stopAt + 0.04);
    });

    // Subtle rosin bow-attack breath (very gentle, pitched near bridge formant)
    if (bowNoiseBuf) {
      const noise = ac.createBufferSource();
      const bp = ac.createBiquadFilter();
      const ng = ac.createGain();
      noise.buffer = bowNoiseBuf;
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(Math.min(2800, Math.max(900, freq * 3.5)), t0);
      bp.Q.setValueAtTime(2.5, t0);
      ng.gain.setValueAtTime(0.0001, t0);
      ng.gain.linearRampToValueAtTime(0.011 * vel, t0 + 0.045);
      ng.gain.exponentialRampToValueAtTime(0.0003, t0 + 0.17);
      noise.connect(bp).connect(ng).connect(stringsBus);
      noise.start(t0);
      noise.stop(t0 + 0.19);
    }

    noteFilter.connect(env).connect(stringsBus);
    vib.start(t0);
    vib.stop(stopAt + 0.04);
  }

  function playPad(ac, freq, t0, durSec, vel) {
    // Warm ambient synth pad: wide chorus detune + gentle filter bloom + dreamy tail
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    const osc3 = ac.createOscillator();
    const g3 = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t0);
    osc1.detune.setValueAtTime(-9, t0);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq, t0);
    osc2.detune.setValueAtTime(9, t0);

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 2, t0);
    g3.gain.setValueAtTime(0.14, t0);

    const atk = Math.min(0.28, durSec * 0.36);
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(1.1, t0);
    filter.frequency.setValueAtTime(Math.max(360, freq * 1.4), t0);
    filter.frequency.linearRampToValueAtTime(Math.min(1850, freq * 3.6), t0 + atk + 0.2);
    filter.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.6), t0 + durSec + 0.35);

    const peak = 0.115 * vel;
    const relStart = t0 + Math.max(atk + 0.08, durSec - 0.04);
    const stopAt = relStart + 0.45;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + atk);
    env.gain.setValueAtTime(peak * 0.9, relStart);
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(g3).connect(filter);
    filter.connect(env);
    connectToBus(env, 0.45);

    osc1.start(t0); osc2.start(t0); osc3.start(t0);
    osc1.stop(stopAt + 0.04); osc2.stop(stopAt + 0.04); osc3.stop(stopAt + 0.04);
  }

  function playGuitar(ac, freq, t0, durSec, vel) {
    // Warm nylon / acoustic guitar pluck: rich string partials + rapid brightness damping
    const osc = ac.createOscillator();
    const body = ac.createOscillator();
    const bodyGain = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    osc.setPeriodicWave(waves.guitar);
    osc.frequency.setValueAtTime(freq, t0);

    body.type = 'triangle';
    body.frequency.setValueAtTime(freq, t0);
    bodyGain.gain.setValueAtTime(0.32, t0);

    filter.type = 'lowpass';
    filter.Q.setValueAtTime(0.9, t0);
    filter.frequency.setValueAtTime(Math.min(5400, freq * 9), t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(460, freq * 1.7), t0 + 0.24);

    const peak = 0.21 * vel;
    const decayDur = Math.max(0.55, Math.min(2.4, durSec + 0.35));
    const stopAt = t0 + decayDur;
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 0.004);
    env.gain.exponentialRampToValueAtTime(peak * 0.36, t0 + 0.22);
    env.gain.exponentialRampToValueAtTime(0.0008, stopAt);

    osc.connect(filter);
    body.connect(bodyGain).connect(filter);
    filter.connect(env);
    connectToBus(env, 0.22);

    osc.start(t0); body.start(t0);
    osc.stop(stopAt + 0.04); body.stop(stopAt + 0.04);
  }

  function playNote(midi, durSec = 0.85, delaySec = 0, vel = 0.75) {
    sendMidiNote(midi, durSec * 1000, delaySec * 1000, vel);
    if (!settings.internal || settings.volume <= 0.001) return;

    const ac = ensureCtx();
    const t0 = ac.currentTime + delaySec;
    const freq = midiFreq(midi);

    switch (settings.instrument) {
      case 'piano':   return playPiano(ac, freq, t0, durSec, vel);
      case 'organ':   return playOrgan(ac, freq, t0, durSec, vel);
      case 'strings': return playStrings(ac, freq, t0, durSec, vel);
      case 'pad':     return playPad(ac, freq, t0, durSec, vel);
      case 'guitar':  return playGuitar(ac, freq, t0, durSec, vel);
      default:        return playRhodes(ac, freq, t0, durSec, vel);
    }
  }

  function playChordNotes(notes, durSec = 1.4, styleOverride) {
    if (!notes || !notes.length) return;
    const style = styleOverride || settings.style;
    // Strings & pads sound smoothest as unified block chords unless explicit Arp is requested
    const isSustain = settings.instrument === 'strings' || settings.instrument === 'pad' || settings.instrument === 'organ';
    const step = style === 'arp' ? 0.115
      : style === 'strum' ? (settings.instrument === 'guitar' ? 0.036 : isSustain ? 0.008 : 0.026)
      : 0;
    const sorted = notes.slice().sort((a, b) => a - b);
    const velScale = Math.min(1, 3.6 / Math.max(3, sorted.length));

    sorted.forEach((n, idx) => {
      const delay = idx * step;
      const remain = Math.max(0.35, durSec - delay * 0.45);
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
    osc.connect(env).connect(dryBus);
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
    INSTRUMENTS,
    settings,
    setVolume,
    setInternal,
    setStyle,
    setInstrument,
    playNote,
    playChordNotes,
    playScale,
    stopScale,
    playClick,
    enableMIDI
  };
})();
