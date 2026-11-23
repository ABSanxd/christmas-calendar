/**
 * Esquema y persistencia del progreso del calendario.
 *
 * Todo el estado vive en `localStorage`, en una única clave versionada. El
 * progreso pertenece al navegador y al dispositivo: no se sincroniza entre
 * equipos ni se envía a ningún servidor.
 */

import { CONFIG } from '../../data/configuration.js';
import { readValue, writeValue, removeValue } from '../../services/storageService.js';

/**
 * @typedef {object} DayRecord
 * @property {string} openedAt    ISO de la primera apertura.
 * @property {string|null} completedAt ISO de la finalización de la actividad.
 * @property {object} interactions Respuestas o notas guardadas por el usuario.
 */

/**
 * @typedef {object} ProgressState
 * @property {number} version
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {Record<string, DayRecord>} openedDays
 * @property {Record<string, {completedAt: string, data: object}>} activities
 * @property {Record<string, string>} seenSundayAnimations
 * @property {{sound: boolean, notifications: boolean, reducedMotion: string, lastVisit: string|null}} preferences
 */

/**
 * Crea un estado inicial vacío.
 * @returns {ProgressState}
 */
export function createDefaultState() {
  const now = new Date().toISOString();
  return {
    version: CONFIG.storageVersion,
    createdAt: now,
    updatedAt: now,
    openedDays: {},
    activities: {},
    seenSundayAnimations: {},
    preferences: {
      sound: true,
      notifications: false,
      reducedMotion: 'system',
      lastVisit: null,
    },
  };
}

/**
 * Valida y normaliza el estado leído del almacenamiento.
 * @param {unknown} raw
 * @returns {ProgressState}
 */
export function sanitizeState(raw) {
  const fallback = createDefaultState();
  if (!raw || typeof raw !== 'object') return fallback;

  const state = {
    version: Number.isInteger(raw.version) ? raw.version : fallback.version,
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : fallback.createdAt,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : fallback.updatedAt,
    openedDays: {},
    activities: {},
    seenSundayAnimations: {},
    preferences: { ...fallback.preferences },
  };

  if (raw.openedDays && typeof raw.openedDays === 'object') {
    for (const [day, record] of Object.entries(raw.openedDays)) {
      const dayNumber = Number(day);
      if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > CONFIG.totalDays) continue;
      if (!record || typeof record !== 'object') continue;
      state.openedDays[dayNumber] = {
        openedAt: typeof record.openedAt === 'string' ? record.openedAt : fallback.createdAt,
        completedAt: typeof record.completedAt === 'string' ? record.completedAt : null,
        interactions:
          record.interactions && typeof record.interactions === 'object'
            ? { ...record.interactions }
            : {},
      };
    }
  }

  if (raw.activities && typeof raw.activities === 'object') {
    for (const [id, record] of Object.entries(raw.activities)) {
      if (!record || typeof record !== 'object') continue;
      state.activities[id] = {
        completedAt: typeof record.completedAt === 'string' ? record.completedAt : fallback.createdAt,
        data: record.data && typeof record.data === 'object' ? { ...record.data } : {},
      };
    }
  }

  if (raw.seenSundayAnimations && typeof raw.seenSundayAnimations === 'object') {
    for (const [dateKey, timestamp] of Object.entries(raw.seenSundayAnimations)) {
      if (typeof timestamp === 'string') state.seenSundayAnimations[dateKey] = timestamp;
    }
  }

  if (raw.preferences && typeof raw.preferences === 'object') {
    if (typeof raw.preferences.sound === 'boolean') {
      state.preferences.sound = raw.preferences.sound;
    }
    if (typeof raw.preferences.notifications === 'boolean') {
      state.preferences.notifications = raw.preferences.notifications;
    }
    if (typeof raw.preferences.reducedMotion === 'string') {
      state.preferences.reducedMotion = raw.preferences.reducedMotion;
    }
    if (typeof raw.preferences.lastVisit === 'string') {
      state.preferences.lastVisit = raw.preferences.lastVisit;
    }
  }

  return state;
}

/**
 * Lee el estado persistido.
 * @returns {ProgressState}
 */
export function loadState() {
  const raw = readValue(CONFIG.storageKey, null);
  const state = sanitizeState(raw);
  if (!raw) {
    // Primera visita: se crea el estado y se persiste de inmediato.
    persistState(state);
  }
  return state;
}

/**
 * Guarda el estado en el almacenamiento local.
 * @param {ProgressState} state
 * @returns {boolean}
 */
export function persistState(state) {
  state.updatedAt = new Date().toISOString();
  return writeValue(CONFIG.storageKey, state);
}

/**
 * Borra por completo el progreso guardado.
 */
export function clearState() {
  removeValue(CONFIG.storageKey);
}

export default loadState;
