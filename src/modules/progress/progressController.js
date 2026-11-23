/**
 * Controlador de progreso.
 *
 * Traduce las acciones de la interfaz (abrir un día, completar una actividad,
 * reiniciar) en llamadas al rastreador y difunde el resultado mediante
 * eventos del documento, de modo que el calendario, la corona y los avisos
 * puedan reaccionar sin conocerse entre sí.
 */

import {
  subscribe,
  getState,
  openDay,
  completeActivity,
  saveInteraction,
  isDayOpened,
  isActivityCompleted,
  getProgressSummary,
  getProgressPercentage,
  setPreference,
  getPreference,
  hasSeenSundayAnimation,
  markSundayAnimationSeen,
} from './progressTracker.js';

/** Nombre del evento emitido cuando cambia el progreso. */
export const PROGRESS_EVENT = 'calendario:progress';

/**
 * Inicializa el controlador y mantiene el estado sincronizado.
 * @returns {() => void} Función para detener la sincronización.
 */
export function initProgressController() {
  const unsubscribe = subscribe((state) => {
    document.dispatchEvent(
      new CustomEvent(PROGRESS_EVENT, {
        detail: {
          state,
          summary: getProgressSummary(),
          percentage: getProgressPercentage(),
        },
      }),
    );
  });

  // Registra la visita del usuario.
  setPreference('lastVisit', new Date().toISOString());

  return unsubscribe;
}

/**
 * Abre un día. Devuelve `isNew: true` solo la primera vez.
 * @param {number} day
 */
export function requestOpenDay(day) {
  const result = openDay(day);
  return { ...result, alreadyOpened: isDayOpened(day) && !result.isNew };
}

/**
 * Marca la actividad de un día como completada.
 * @param {number} day
 * @param {object} [data]
 */
export function requestCompleteActivity(day, data = {}) {
  completeActivity(day, data);
}

/**
 * Guarda datos parciales de una actividad.
 * @param {number} day
 * @param {object} data
 */
export function requestSaveInteraction(day, data) {
  saveInteraction(day, data);
}

/**
 * Actualiza una preferencia.
 * @param {string} key
 * @param {boolean | string | null} value
 */
export function updatePreference(key, value) {
  setPreference(key, value);
}

/**
 * Lee una preferencia.
 * @param {string} key
 */
export function readPreference(key) {
  return getPreference(key);
}

/**
 * Estado completo del progreso.
 */
export function readProgressState() {
  return getState();
}

/**
 * ¿La actividad del día ya está completada?
 * @param {number} day
 */
export function checkActivityCompleted(day) {
  return isActivityCompleted(day);
}

/**
 * ¿Ya se vio la animación de este domingo?
 * @param {string} dateKey
 */
export function checkSundayAnimationSeen(dateKey) {
  return hasSeenSundayAnimation(dateKey);
}

/**
 * Registra que la animación de un domingo ya fue vista.
 * @param {string} dateKey
 */
export function registerSundayAnimationSeen(dateKey) {
  markSundayAnimationSeen(dateKey);
}
