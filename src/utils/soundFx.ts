let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function playChime(type: "success" | "error" | "click" | "victory", muted: boolean): void {
  if (muted) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  const playNote = (freq: number, startOffset: number, duration: number, gainPeak = 0.08) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type === "error" ? "triangle" : "sine";
    osc.frequency.setValueAtTime(freq, now + startOffset);
    gain.gain.setValueAtTime(0.0001, now + startOffset);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + startOffset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + startOffset);
    osc.stop(now + startOffset + duration + 0.02);
  };

  if (type === "click") {
    playNote(520, 0, 0.06, 0.04);
  } else if (type === "error") {
    playNote(240, 0, 0.14, 0.06);
    playNote(200, 0.1, 0.18, 0.05);
  } else if (type === "success") {
    playNote(523.25, 0, 0.16, 0.08);
    playNote(659.25, 0.09, 0.18, 0.08);
    playNote(783.99, 0.18, 0.28, 0.09);
  } else if (type === "victory") {
    playNote(523.25, 0, 0.16, 0.08);
    playNote(659.25, 0.1, 0.16, 0.08);
    playNote(783.99, 0.2, 0.18, 0.09);
    playNote(1046.5, 0.32, 0.42, 0.1);
  }
}
