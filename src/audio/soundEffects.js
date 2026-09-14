// Cinema Kalalayam™ - Native Web Audio API Sound Effects & Synth BGM
// High production value, zero external audio asset dependency

class SoundManager {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.bgmGain = null;
    this.masterMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isReady() {
    this.init();
    return !!this.ctx;
  }

  // 1. Clapperboard Snap: Sharp wooden transient followed by short resonant decay
  playClapperboard() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;

    // White noise transient
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.008));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.9, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    // Body wood knock oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.7, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    noise.start(t);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  // 2. Iconic South Indian Mass Cinema Brass Stinger Fanfare
  playMassHorn() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;

    // Brass chord: root, fifth, octave, major third
    const freqs = [146.83, 220.00, 293.66, 369.99]; // D3, A3, D4, F#4 mass chord
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      // Slight pitch slide up into the hit
      osc.frequency.setValueAtTime(freq * 0.94, t);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);
      filter.frequency.exponentialRampToValueAtTime(3200, t + 0.12);
      filter.frequency.exponentialRampToValueAtTime(1200, t + 0.8);
      filter.Q.setValueAtTime(4.0, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22 / (idx + 1), t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.3);
    });

    // Layer sub punch
    this.playSubBoom(0.4);
  }

  // 3. Cinematic Sub-bass Dramatic Boom ("BWAAAAAAM")
  playSubBoom(volume = 0.8) {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.5);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 1.7);
  }

  // 4. Stadium / Front-bench Whistle
  playWhistle() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    vibrato.frequency.setValueAtTime(18, t); // Flutter
    vibratoGain.gain.setValueAtTime(45, t);
    vibrato.connect(osc.frequency);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(2800, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.4);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    vibrato.start(t);
    osc.start(t);
    vibrato.stop(t + 0.65);
    osc.stop(t + 0.65);
  }

  // 5. Director "CUT! RETAKE!" Buzzer Stinger
  playRetakeBuzzer() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;

    [185, 233].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  // 6. Level Up / High Mass Fanfare
  playLevelUp() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5

    notes.forEach((freq, idx) => {
      const noteTime = t + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.12, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.28);
    });
  }

  // 7. Subtle UI Click
  playClick() {
    if (!this.isReady() || this.masterMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  // 8. Loopable Retro Cinema Synthesizer BGM
  toggleBgm() {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    if (!this.isReady()) return;
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;

    const chords = [
      [146.83, 220.00, 293.66], // Dm
      [174.61, 220.00, 261.63], // F
      [130.81, 196.00, 261.63], // C
      [110.00, 164.81, 220.00]  // Am
    ];

    let chordIdx = 0;
    const stepTime = 1.6; // ~75 BPM dramatic cinematic groove

    const playLoopStep = () => {
      if (!this.bgmPlaying) return;
      const t = this.ctx.currentTime;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      // Pad synth
      chord.forEach(f => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, t);
        filter.frequency.linearRampToValueAtTime(850, t + stepTime * 0.5);
        filter.frequency.linearRampToValueAtTime(400, t + stepTime);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.03, t + 0.2);
        gain.gain.linearRampToValueAtTime(0.001, t + stepTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + stepTime + 0.1);
      });

      // Bass heartbeat kick
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.frequency.setValueAtTime(85, t);
      kickOsc.frequency.exponentialRampToValueAtTime(38, t + 0.3);
      kickGain.gain.setValueAtTime(0.09, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      kickOsc.connect(kickGain);
      kickGain.connect(this.ctx.destination);
      kickOsc.start(t);
      kickOsc.stop(t + 0.35);

      this.bgmTimeout = setTimeout(playLoopStep, stepTime * 1000);
    };

    playLoopStep();
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  toggleMute() {
    this.masterMuted = !this.masterMuted;
    if (this.masterMuted && this.bgmPlaying) {
      this.stopBgm();
    }
    return this.masterMuted;
  }
}

export const sounds = new SoundManager();
