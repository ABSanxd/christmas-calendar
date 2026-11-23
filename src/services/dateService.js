/**
 * Servicio de fechas.
 *
 * Todo el calendario se apoya en la zona horaria `America/Lima`, configurada
 * en `data/configuration.js`. De este modo el desbloqueo de las casillas es
 * idéntico para cualquier visitante, sin importar la zona horaria de su
 * dispositivo.
 */

import { CONFIG } from '../data/configuration.js';

const DATE_PARTS_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: CONFIG.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/**
 * Descompone una fecha real en las coordenadas de la zona horaria de Lima.
 * @param {Date} [date]
 * @returns {{year: number, month: number, day: number, hour: number, minute: number, second: number}}
 */
export function getLimaParts(date = new Date()) {
  const parts = {};
  for (const part of DATE_PARTS_FORMATTER.formatToParts(date)) {
    if (part.type !== 'literal') parts[part.type] = part.value;
  }
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // Intl puede devolver "24" para medianoche en algunos motores.
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

/**
 * Devuelve la fecha de hoy en Lima como clave `YYYY-MM-DD`.
 * @param {Date} [date]
 * @returns {string}
 */
export function getLimaDateKey(date = new Date()) {
  const { year, month, day } = getLimaParts(date);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Devuelve la hora de Lima en minutos desde medianoche.
 * @param {Date} [date]
 * @returns {number}
 */
export function getLimaMinutes(date = new Date()) {
  const { hour, minute } = getLimaParts(date);
  return hour * 60 + minute;
}

/**
 * Convierte una clave `YYYY-MM-DD` a una fecha local (medianoche).
 * @param {string} dateKey
 * @returns {Date}
 */
export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Compara dos claves de fecha (`YYYY-MM-DD`).
 * @param {string} a
 * @param {string} b
 * @returns {number} negativo si a < b, positivo si a > b
 */
export function compareDateKeys(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Devuelve la fecha de hoy respetando la simulación de desarrollo.
 *
 * En producción (`import.meta.env.DEV === false`) la simulación se ignora por
 * completo: el bloque se elimina al compilar.
 *
 * @returns {{dateKey: string, minutes: number, simulated: boolean}}
 */
export function getToday() {
  const simulation = getDevSimulation();
  if (simulation) {
    const { year, month, day } = simulation.parts;
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      dateKey,
      minutes: simulation.minutes,
      simulated: true,
    };
  }

  return {
    dateKey: getLimaDateKey(),
    minutes: getLimaMinutes(),
    simulated: false,
  };
}

/**
 * Lee la simulación de fecha habilitada únicamente en desarrollo.
 *
 * Permite probar cualquier día del Adviento sin esperar al día real:
 *   `?fecha=2026-12-13`  o  `?fecha=2026-12-13T18:30`
 *
 * @returns {{parts: {year: number, month: number, day: number}, minutes: number} | null}
 */
export function getDevSimulation() {
  if (!import.meta.env.DEV) return null;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get('fecha') || params.get('devDate');
  if (!raw) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec(raw);
  if (!match) return null;

  const [, year, month, day, hour = '9', minute = '0'] = match;
  return {
    parts: { year: Number(year), month: Number(month), day: Number(day) },
    minutes: Number(hour) * 60 + Number(minute),
  };
}

/**
 * Indica si la simulación de fecha está activa.
 * @returns {boolean}
 */
export function isDateSimulationActive() {
  return getDevSimulation() !== null;
}

/**
 * Formatea una fecha de forma legible en español.
 * @param {string} dateKey
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDateKey(dateKey, options = {}) {
  return new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: CONFIG.timezone,
    ...options,
  }).format(parseDateKey(dateKey));
}

/**
 * Devuelve una etiqueta corta como "domingo 13 de diciembre".
 * @param {string} dateKey
 * @returns {string}
 */
export function formatShortDate(dateKey) {
  return new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: CONFIG.timezone,
  })
    .format(parseDateKey(dateKey))
    .replace(/^\w/, (letter) => letter.toUpperCase());
}
