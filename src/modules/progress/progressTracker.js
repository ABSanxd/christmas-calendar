/**
 * Lógica del progreso: saber qué está abierto, qué se ha completado y qué
 * animaciones ya se han visto.
 *
 * Este módulo no toca el DOM: solo manipula el estado y lo persiste.
 */

import { CONFIG } from '../../data/configuration.js';
import {
  loadState,
  persistState,
  clearState,
  createDefaultState,
  sanitizeState,
} from './progressStorage.js';

/** @type {import('./progressStorage.js').ProgressState} */
let state = loadState();

/** Suscriptores de los cambios de estado. */
const listeners = new Set();

/**
 * Suscribe una función a los cambios de progreso.
 * @param {(state: import('./progressStorage.js').ProgressState) => void} listener
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Notifica a los suscriptores.
 */
function notify() {
  for (const listener of listeners) {
    try {
      listener(state);
    } catch (error) {
      console.warn('[calendario] Error en un suscriptor de progreso:', error);
    }
  }
}

/**
 * Devuelve el estado actual (solo lectura).
 * @returns {import('./progressStorage.js').ProgressState}
 */
export function getState() {
  return state;
}

/**
 * Indica si un día ya fue descubierto.
 * @param {number} day
 * @returns {boolean}
 */
export function isDayOpened(day) {
  return Boolean(state.openedDays[day]);
}

/**
 * Devuelve la fecha de primera apertura de un día.
 * @param {number} day
 * @returns {string|null}
 */
export function getOpenedAt(day) {
  return state.openedDays[day]?.openedAt ?? null;
}

/**
 * Marca un día como descubierto. Si ya estaba abierto, no cambia nada:
 * no se vuelve a registrar ni a repetir la animación inicial.
 * @param {number} day
 * @returns {{isNew: boolean, openedAt: string}}
 */
export function openDay(day) {
  const existing = state.openedDays[day];
  if (existing) {
    return { isNew: false, openedAt: existing.openedAt };
  }

  const openedAt = new Date().toISOString();
  state.openedDays[day] = { openedAt, completedAt: null, interactions: {} };
  persistState(state);
  notify();
  return { isNew: true, openedAt };
}

/**
 * Indica si la actividad de un día está completada.
 * @param {number} day
 * @returns {boolean}
 */
export function isActivityCompleted(day) {
  return Boolean(state.openedDays[day]?.completedAt);
}

/**
 * Marca la actividad de un día como completada.
 * @param {number} day
 * @param {object} [data] Respuestas o notas de la actividad.
 */
export function completeActivity(day, data = {}) {
  if (!state.openedDays[day]) {
    state.openedDays[day] = {
      openedAt: new Date().toISOString(),
      completedAt: null,
      interactions: {},
    };
  }
  const completedAt = new Date().toISOString();
  state.openedDays[day].completedAt = completedAt;
  state.openedDays[day].interactions = { ...state.openedDays[day].interactions, ...data };
  persistState(state);
  notify();
}

/**
 * Guarda datos parciales de una actividad (por ejemplo, respuestas a medias).
 * @param {number} day
 * @param {object} data
 */
export function saveInteraction(day, data) {
  if (!state.openedDays[day]) {
    state.openedDays[day] = {
      openedAt: new Date().toISOString(),
      completedAt: null,
      interactions: {},
    };
  }
  state.openedDays[day].interactions = { ...state.openedDays[day].interactions, ...data };
  persistState(state);
}

/**
 * Devuelve los datos guardados de la actividad de un día.
 * @param {number} day
 * @returns {object}
 */
export function getInteractions(day) {
  return { ...(state.openedDays[day]?.interactions ?? {}) };
}

/**
 * Indica si ya se vio la animación de un domingo.
 * @param {string} dateKey
 * @returns {boolean}
 */
export function hasSeenSundayAnimation(dateKey) {
  return Boolean(state.seenSundayAnimations[dateKey]);
}

/**
 * Registra que la animación de un domingo ya fue reproducida.
 * @param {string} dateKey
 */
export function markSundayAnimationSeen(dateKey) {
  if (state.seenSundayAnimations[dateKey]) return;
  state.seenSundayAnimations[dateKey] = new Date().toISOString();
  persistState(state);
  notify();
}

/**
 * Actualiza una preferencia del usuario.
 * @param {keyof import('./progressStorage.js').ProgressState['preferences']} key
 * @param {boolean | string | null} value
 */
export function setPreference(key, value) {
  state.preferences[key] = value;
  persistState(state);
  notify();
}

/**
 * Devuelve una preferencia.
 * @param {keyof import('./progressStorage.js').ProgressState['preferences']} key
 */
export function getPreference(key) {
  return state.preferences[key];
}

/**
 * Calcula el progreso general en porcentaje.
 * @returns {number} Entre 0 y 100.
 */
export function getProgressPercentage() {
  const opened = Object.keys(state.openedDays).length;
  const completed = Object.values(state.openedDays).filter((record) => record.completedAt).length;
  const total = CONFIG.totalDays;
  if (total === 0) return 0;
  return Math.round(((opened + completed) / (total * 2)) * 100);
}

/**
 * Devuelve cuántos días fueron descubiertos y cuántos completados.
 * @returns {{opened: number, completed: number, total: number}}
 */
export function getProgressSummary() {
  const opened = Object.keys(state.openedDays).length;
  const completed = Object.values(state.openedDays).filter((record) => record.completedAt).length;
  return { opened, completed, total: CONFIG.totalDays };
}

/**
 * Reinicia todo el progreso del calendario.
 */
export function resetProgress() {
  clearState();
  state = createDefaultState();
  persistState(state);
  notify();
}

/**
 * Sustituye el estado completo (usado al recuperar datos validados).
 * @param {unknown} raw
 */
export function hydrate(raw) {
  state = sanitizeState(raw);
  persistState(state);
  notify();
}

export default {
  subscribe,
  getState,
  isDayOpened,
  openDay,
  isActivityCompleted,
  completeActivity,
  getProgressPercentage,
  resetProgress,
};
