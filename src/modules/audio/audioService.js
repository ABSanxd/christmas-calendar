/**
 * Servicio de audio.
 *
 * Todos los sonidos se sintetizan en el navegador con la Web Audio API: no
 * se incluyen archivos de audio externos, de modo que el proyecto funciona
 * sin conexión, no necesita licencias y pesa muy poco.
 *
 * Ningún sonido se reproduce automáticamente: siempre hace falta una
 * interacción previa del usuario.
 */

const NOTE_OFFSETS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** Estado global del servicio. */
let context = null;
let masterGain = null;
let enabled = true;
let unlocked = false;

/**
 * Crea (o recupera) el contexto de audio.
 * @returns {AudioContext|null}
 */
function getContext() {
  if (context) return context;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  try {
    context = new AudioContextClass();
    masterGain = context.createGain();
    masterGain.gain.value = 0.28;
    masterGain.connect(context.destination);
  } catch (error) {
    console.warn('[calendario] No se pudo crear el contexto de audio:', error);
    context = null;
  }
  return context;
}

/**
 * Activa o desactiva el sonido.
 * @param {boolean} value
 */
export function setAudioEnabled(value) {
  enabled = Boolean(value);
  if (!enabled && context && context.state === 'running') {
    context.suspend().catch(() => {});
  } else if (enabled && context && context.state === 'suspended') {
    context.resume().catch(() => {});
  }
}

/**
 * Indica si el sonido está activo.
 * @returns {boolean}
 */
export function isAudioEnabled() {
  return enabled;
}

/**
 * Desbloquea el audio tras la primera interacción del usuario.
 * @returns {boolean}
 */
export function unlockAudio() {
  if (unlocked) return true;
  const ctx = getContext();
  if (!ctx) return false;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  unlocked = true;
  return true;
}

/**
 * Convierte el nombre de una nota en su frecuencia.
 * @param {string} note Por ejemplo `A4`, `C#5`, `Eb3`.
 * @returns {number} Frecuencia en hercios.
 */
export function noteToFrequency(note) {
  const match = /^([A-G])(#|b)?(-?\d)$/.exec(note);
  if (!match) return 440;

  const [, letter, accidental, octaveText] = match;
  const octave = Number(octaveText);
  let semitone = NOTE_OFFSETS[letter];
  if (accidental === '#') semitone += 1;
  if (accidental === 'b') semitone -= 1;

  const midi = (octave + 1) * 12 + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

/**
 * Reproduce una campana suave.
 * @param {object} [options]
 * @param {number} [options.frequency]
 * @param {number} [options.duration]
 * @param {number} [options.volume]
 */
export function playChime(options = {}) {
  if (!enabled) return;
  const { frequency = 880, duration = 1.4, volume = 0.5 } = options;

  const ctx = getContext();
  if (!ctx || !masterGain) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  const partials = [1, 2.01, 3.02, 4.16];
  partials.forEach((partial, index) => {
    const oscillator = ctx.createOscillator();
    const partialGain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency * partial;
    partialGain.gain.value = 1 / (index + 1.6);
    oscillator.connect(partialGain);
    partialGain.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  });

  gain.connect(masterGain);
}

/**
 * Reproduce un destello de estrellas.
 */
export function playSparkle() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [1046.5, 1318.5, 1568, 2093].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.07;
    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + 0.45);
  });
}

/**
 * Reproduce el sonido de apertura de una casilla.
 */
export function playOpenSound() {
  playChime({ frequency: 659.25, duration: 1.6, volume: 0.45 });
}

/**
 * Reproduce el sonido de una vela encendida.
 */
export function playCandleSound() {
  playChime({ frequency: 523.25, duration: 1.9, volume: 0.5 });
}

/**
 * Reproduce una melodía nota a nota.
 *
 * @param {Array<[string, number]>} notes Pares `[nota, duración en tiempos]`.
 * @param {object} [options]
 * @param {number} [options.tempo] Pulsos por minuto.
 * @param {(index: number) => void} [options.onNote]
 * @returns {Promise<void>}
 */
export function playMelody(notes, options = {}) {
  const { tempo = 96, onNote } = options;
  if (!enabled) return Promise.resolve();

  const ctx = getContext();
  if (!ctx || !masterGain) return Promise.resolve();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const beat = 60000 / tempo;
  let elapsed = 0;

  return new Promise((resolve) => {
    notes.forEach(([note, duration], index) => {
      const start = ctx.currentTime + elapsed / 1000;
      const length = (duration * beat) / 1000;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = noteToFrequency(note);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.34, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + length * 0.92);

      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(start);
      oscillator.stop(start + length);

      window.setTimeout(() => onNote?.(index), elapsed);
      elapsed += duration * beat;
    });

    window.setTimeout(resolve, elapsed + 120);
  });
}

export default {
  playChime,
  playSparkle,
  playMelody,
  setAudioEnabled,
  isAudioEnabled,
  unlockAudio,
};
