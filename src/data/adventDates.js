/**
 * Fechas litúrgicas del Adviento 2026 y cálculo de la corona.
 *
 * El Adviento de 2026 comienza el domingo 29 de noviembre.
 * Los cuatro domingos son:
 *   1) 29 de noviembre, 2) 06 de diciembre, 3) 13 de diciembre (Gaudete),
 *   4) 20 de diciembre.
 */

import { CONFIG } from './configuration.js';

/** @typedef {'2026-11-29'|'2026-12-06'|'2026-12-13'|'2026-12-20'} SundayKey */

/** Descripción de los domingos de Adviento. */
export const SUNDAYS = [
  {
    index: 1,
    date: '2026-11-29',
    name: 'Primer domingo de Adviento',
    candle: 1,
    color: 'purple',
    title: 'La primera vela',
    verse: 'Lc 2,30-31',
    message: CONFIG.sundayMessages[1],
  },
  {
    index: 2,
    date: '2026-12-06',
    name: 'Segundo domingo de Adviento',
    candle: 2,
    color: 'purple',
    title: 'La segunda vela',
    verse: 'Jn 1,5-9',
    message: CONFIG.sundayMessages[2],
  },
  {
    index: 3,
    date: '2026-12-13',
    name: 'Tercer domingo de Adviento · Gaudete',
    candle: 3,
    color: 'pink',
    title: 'La vela de Gaudete',
    verse: 'Jn 1,5-9',
    message: CONFIG.sundayMessages[3],
  },
  {
    index: 4,
    date: '2026-12-20',
    name: 'Cuarto domingo de Adviento',
    candle: 4,
    color: 'purple',
    title: 'La cuarta vela',
    verse: 'Mt 1,18-25',
    message: CONFIG.sundayMessages[4],
  },
];

/**
 * Devuelve el domingo de Adviento que corresponde a una fecha dada.
 * @param {string} dateKey Fecha en formato YYYY-MM-DD.
 * @returns {(typeof SUNDAYS)[number] | null}
 */
export function getSundayForDate(dateKey) {
  let found = null;
  for (const sunday of SUNDAYS) {
    if (dateKey >= sunday.date) found = sunday;
  }
  return found;
}

/**
 * Calcula cuántas velas deben estar encendidas según la fecha.
 *
 * Regla: nunca se muestran velas de domingos futuros. Si hoy es 13 de
 * diciembre, hay dos velas encendidas (la tercera se enciende en la
 * animación de ese día).
 *
 * @param {string} dateKey Fecha en formato YYYY-MM-DD.
 * @returns {number} Cantidad de velas encendidas (0 a 4).
 */
export function getLitCandlesCount(dateKey) {
  const sunday = getSundayForDate(dateKey);
  if (!sunday) return 0;
  // Antes de abrir la animación del domingo solo están encendidas las velas
  // de los domingos anteriores.
  return sunday.index - 1;
}

/**
 * Devuelve el número de velas que deben estar encendidas una vez concluida
 * la animación del domingo correspondiente a la fecha.
 * @param {string} dateKey Fecha en formato YYYY-MM-DD.
 * @returns {number}
 */
export function getLitCandlesAfterAnimation(dateKey) {
  const sunday = getSundayForDate(dateKey);
  return sunday ? sunday.index : 0;
}

/**
 * Indica si una fecha corresponde a alguno de los cuatro domingos.
 * @param {string} dateKey
 * @returns {boolean}
 */
export function isAdventSunday(dateKey) {
  return SUNDAYS.some((sunday) => sunday.date === dateKey);
}

/**
 * Calcula el día del calendario (1..24) que corresponde a una fecha.
 * @param {string} dateKey
 * @returns {number} 0 si la fecha está fuera del calendario.
 */
export function getCalendarDayFromDate(dateKey) {
  if (dateKey < CONFIG.dates.calendarStart) return 0;
  if (dateKey > CONFIG.dates.christmasEve) return 0;
  const start = new Date(`${CONFIG.dates.calendarStart}T00:00:00`);
  const current = new Date(`${dateKey}T00:00:00`);
  const diff = Math.round((current.getTime() - start.getTime()) / 86400000);
  return diff + 1;
}

/**
 * Devuelve la fecha clave (YYYY-MM-DD) del día N del calendario.
 * @param {number} day 1..24
 * @returns {string}
 */
export function getDateKeyFromDay(day) {
  const start = new Date(`${CONFIG.dates.calendarStart}T00:00:00`);
  start.setDate(start.getDate() + (day - 1));
  return start.toISOString().slice(0, 10);
}

export default SUNDAYS;
