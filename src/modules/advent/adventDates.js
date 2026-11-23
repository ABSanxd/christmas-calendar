/**
 * Cálculo del plan de Adviento para una fecha concreta.
 *
 * Un "plan" resume qué debe ocurrir en la corona ese día: cuántas velas están
 * encendidas, si corresponde reproducir la animación del domingo y cuál es el
 * mensaje de bienvenida.
 */

import { SUNDAYS, getSundayForDate, getLitCandlesCount, getLitCandlesAfterAnimation } from '../../data/adventDates.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * @typedef {object} AdventPlan
 * @property {boolean} isAdventPeriod    Si ya comenzó el Adviento.
 * @property {boolean} isSunday           Si hoy es domingo de Adviento.
 * @property {object|null} sunday         Datos del domingo correspondiente.
 * @property {number} candlesBefore       Velas encendidas antes de animar.
 * @property {number} candlesAfter        Velas encendidas al terminar.
 * @property {number} newCandle           Vela que se enciende (0 si no hay domingo).
 * @property {'purple'|'pink'} candleColor
 * @property {string} message
 * @property {boolean} shouldAnimate      Si corresponde reproducir la animación.
 */

/**
 * Devuelve el plan de Adviento para una fecha.
 *
 * @param {string} dateKey Fecha en formato YYYY-MM-DD.
 * @param {boolean} [animationAlreadySeen] Si el visitante ya vio la animación.
 * @returns {AdventPlan}
 */
export function getAdventPlanForDate(dateKey, animationAlreadySeen = false) {
  const sunday = getSundayForDate(dateKey);
  const isAdventPeriod = dateKey >= CONFIG.dates.adventStart;
  const isSunday = Boolean(sunday && sunday.date === dateKey);

  const candlesBefore = getLitCandlesCount(dateKey);
  const candlesAfter = getLitCandlesAfterAnimation(dateKey);

  return {
    isAdventPeriod,
    isSunday,
    sunday,
    candlesBefore,
    candlesAfter,
    newCandle: isSunday ? sunday.candle : 0,
    candleColor: isSunday ? sunday.color : 'purple',
    message: sunday ? sunday.message : '',
    shouldAnimate: isSunday && !animationAlreadySeen,
  };
}

/**
 * Devuelve los domingos de Adviento.
 */
export function listAdventSundays() {
  return [...SUNDAYS];
}

export default getAdventPlanForDate;
