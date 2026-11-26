/**
 * Controlador de actividades.
 *
 * Abre el contenido de una casilla, comprueba el desbloqueo por fecha en
 * JavaScript (no solo con CSS), registra el progreso y celebra la apertura.
 */

import { createActivityModal } from '../../components/activities/ActivityModal.js';
import { createChristmasEveScene } from '../../components/interface/ChristmasEveScene.js';
import { showToast } from '../../components/interface/Toast.js';
import { getAdventDay } from '../../data/adventDays.js';
import { getDateKeyFromDay } from '../../data/adventDates.js';
import { getToday } from '../../services/dateService.js';
import { getActivityDefinition } from './activityRegistry.js';
import { validateActivityData } from './activityValidator.js';
import {
  requestOpenDay,
  requestCompleteActivity,
  checkActivityCompleted,
} from '../progress/progressController.js';
import { playSound } from '../audio/audioController.js';
import { celebrateCompletion, animateDayDiscovery } from '../animations/calendarAnimations.js';
import { playChristmasEveScene } from '../animations/christmasEveAnimations.js';

/** Referencias a elementos de la interfaz que necesitan actualizarse. */
let markerProvider = null;

/**
 * Registra cómo obtener el elemento visual de una casilla.
 * @param {(day: number) => HTMLElement|null} provider
 */
export function registerMarkerProvider(provider) {
  markerProvider = provider;
}

/**
 * Indica si una casilla está desbloqueada en la fecha actual.
 * @param {number} day
 * @returns {boolean}
 */
export function isDayUnlocked(day) {
  const { dateKey } = getToday();
  return dateKey >= getDateKeyFromDay(day);
}

/**
 * Abre el contenido de una casilla.
 *
 * @param {number} dayNumber
 */
export function openDayActivity(dayNumber) {
  const day = getAdventDay(dayNumber);
  if (!day) return;

  // --- Comprobación de bloqueo en JavaScript. ---
  if (!isDayUnlocked(dayNumber)) {
    showToast('Todavía no es tiempo de descubrir esta sorpresa.', { tone: 'info' });
    const marker = markerProvider?.(dayNumber);
    marker?.classList.add('is-denied');
    window.setTimeout(() => marker?.classList.remove('is-denied'), 900);
    return;
  }

  // --- La Nochebuena tiene su propia experiencia. ---
  if (day.type === 'special') {
    openChristmasEveExperience();
    return;
  }

  // --- Registro de la apertura (solo la primera vez). ---
  const { isNew } = requestOpenDay(dayNumber);
  const marker = markerProvider?.(dayNumber);
  if (marker) {
    marker.classList.add('is-opened');
    if (isNew) {
      animateDayDiscovery(marker);
      playSound('open');
    }
  }

  const { modal } = createActivityModal({
    day,
    completed: checkActivityCompleted(dayNumber),
    onComplete: (data) => {
      if (!getActivityDefinition(day.type)) return;
      if (!validateActivityData(day.type, data).valid) return;

      requestCompleteActivity(dayNumber, data);
      playSound('sparkle');
      celebrateCompletion(marker ?? document.body);
      showToast('¡Actividad completada! Un paso más hacia Belén.', { tone: 'success' });
      marker?.classList.add('is-completed');
    },
  });

  modal.open();
}

/**
 * Abre la experiencia especial de Nochebuena.
 */
export function openChristmasEveExperience() {
  const overlayRoot = document.getElementById('overlay-root');
  if (!overlayRoot) return;

  const overlay = createChristmasEveScene({
    onClose: () => overlay.remove(),
  });
  overlayRoot.appendChild(overlay);

  playChristmasEveScene(overlay);
  requestOpenDay(24);
}

export default openDayActivity;
