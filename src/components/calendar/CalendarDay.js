/**
 * Casilla individual del calendario.
 *
 * Es un botón real: garantiza foco por teclado, lectura correcta por parte de
 * los lectores de pantalla y control sobre el estado bloqueado / descubierto.
 */

import { createElement } from '../../utils/domUtils.js';
import { getActivityType } from '../../data/activities.js';

/**
 * Candado de las casillas que todavía no se pueden abrir.
 * @type {string}
 */
export const LOCK_ICON =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
  '<path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
  '<rect x="4.8" y="10.2" width="14.4" height="10.2" rx="2.4" fill="currentColor"/></svg>';

/**
 * Pinta el distintivo de estado de una casilla.
 *
 * - **Bloqueada**: un candado, para que se entienda que aún no es su día.
 * - **Disponible**: una estrella que late, para saber qué hay que pulsar.
 * - **Abierta**: una estrella discreta.
 * - **Realizada**: un ✓.
 *
 * @param {HTMLElement} badge
 * @param {{locked: boolean, opened: boolean, completed: boolean}} state
 */
export function applyDayStateBadge(badge, state) {
  if (!badge) return;
  const { locked, opened, completed } = state;

  badge.classList.toggle('is-locked', locked);
  badge.classList.toggle('is-available', !locked && !opened && !completed);

  if (locked) {
    badge.innerHTML = LOCK_ICON;
  } else if (completed) {
    badge.textContent = '✓';
  } else {
    badge.textContent = '✧';
  }
}

/**
 * Crea el botón de una casilla.
 *
 * @param {object} options
 * @param {number} options.day
 * @param {string} options.title
 * @param {string} options.subtitle
 * @param {string} options.type
 * @param {'door'|'window'|'niche'|'beacon'} options.style
 * @param {number} options.left  Posición horizontal en porcentaje.
 * @param {number} options.top   Posición vertical en porcentaje.
 * @param {boolean} options.locked
 * @returns {HTMLButtonElement}
 */
export function createCalendarDay(options) {
  const { day, title, subtitle, type, style = 'niche', left, top, locked } = options;
  const typeInfo = getActivityType(type);

  const button = createElement('button', {
    type: 'button',
    class: `calendar-day calendar-day--${style}`,
    'data-day': String(day),
    'aria-disabled': locked ? 'true' : 'false',
    'aria-label': locked
      ? `Día ${day}: todavía no es tiempo de descubrir esta sorpresa`
      : `Día ${day}: ${title}. ${typeInfo.label}`,
  });

  button.style.left = `${left}%`;
  button.style.top = `${top}%`;

  button.innerHTML = `
    <span class="calendar-day__frame" aria-hidden="true"></span>
    <span class="calendar-day__number">${day}</span>
    <span class="calendar-day__state" aria-hidden="true"></span>
    <span class="calendar-day__tip" role="tooltip" hidden></span>`;

  if (locked) {
    button.classList.add('is-locked');
  }

  return button;
}

/**
 * Actualiza el estado visual de una casilla.
 *
 * @param {HTMLButtonElement} button
 * @param {object} state
 * @param {boolean} state.locked
 * @param {boolean} state.opened
 * @param {boolean} state.completed
 * @param {string} [state.title]
 */
export function updateCalendarDay(button, state) {
  const { locked, opened, completed, title } = state;

  button.classList.toggle('is-locked', locked);
  button.classList.toggle('is-opened', opened);
  button.classList.toggle('is-completed', completed);
  button.setAttribute('aria-disabled', locked ? 'true' : 'false');

  const stateIcon = button.querySelector('.calendar-day__state');
  applyDayStateBadge(stateIcon, { locked, opened, completed });

  const tip = button.querySelector('.calendar-day__tip');
  if (tip) {
    tip.textContent = locked ? 'Todavía no es tiempo' : title ?? '';
  }
}

export default createCalendarDay;
