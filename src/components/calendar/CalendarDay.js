/**
 * Casilla individual del calendario.
 *
 * Es un botón real: garantiza foco por teclado, lectura correcta por parte de
 * los lectores de pantalla y control sobre el estado bloqueado / descubierto.
 */

import { createElement } from '../../utils/domUtils.js';
import { getActivityType } from '../../data/activities.js';

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
  if (stateIcon) {
    stateIcon.textContent = locked ? '·' : completed ? '✓' : opened ? '✧' : '';
  }

  const tip = button.querySelector('.calendar-day__tip');
  if (tip) {
    tip.textContent = locked ? 'Todavía no es tiempo' : title ?? '';
  }
}

export default createCalendarDay;
