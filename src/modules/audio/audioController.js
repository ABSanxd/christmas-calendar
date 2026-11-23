/**
 * Controlador de audio.
 *
 * Mantiene el estado de la preferencia de sonido (guardada en el progreso) y
 * expone efectos con nombre para que el resto de la aplicación no necesite
 * conocer los detalles del servicio de audio.
 */

import {
  playChime,
  playSparkle,
  playOpenSound,
  playCandleSound,
  setAudioEnabled,
  isAudioEnabled,
  unlockAudio,
} from './audioService.js';
import { readPreference, updatePreference } from '../progress/progressController.js';

/** Catálogo de efectos disponibles. */
const SOUNDS = {
  open: playOpenSound,
  candle: playCandleSound,
  sparkle: playSparkle,
  chime: () => playChime(),
};

/**
 * Sincroniza el servicio de audio con la preferencia guardada.
 */
export function initAudioController() {
  setAudioEnabled(readPreference('sound') !== false);

  // El navegador exige una interacción del usuario: se desbloquea en el
  // primer gesto real (no se reproduce nada, solo se prepara el audio).
  const unlock = () => {
    if (isAudioEnabled()) unlockAudio();
  };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
}

/**
 * Activa o desactiva el sonido y guarda la preferencia.
 * @param {boolean} value
 */
export function toggleSound(value) {
  const enabled = Boolean(value);
  setAudioEnabled(enabled);
  updatePreference('sound', enabled);
  if (enabled) playChime();
}

/**
 * Indica si el sonido está activo.
 * @returns {boolean}
 */
export function isSoundEnabled() {
  return readPreference('sound') !== false;
}

/**
 * Reproduce un efecto por nombre.
 * @param {'open'|'candle'|'sparkle'|'chime'} name
 */
export function playSound(name) {
  if (!isSoundEnabled()) return;
  SOUNDS[name]?.();
}

export default playSound;
