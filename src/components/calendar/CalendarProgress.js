/**
 * Indicador de progreso del calendario.
 *
 * Es una franja fina que va justo debajo de la cabecera: la barrita, el
 * recuento de casillas y actividades, y el porcentaje, todo en una sola
 * línea y con un peso discreto.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * Crea la franja de progreso.
 * @returns {{element: HTMLElement, update: (summary: {opened: number, completed: number, total: number}, percentage: number) => void}}
 */
export function createCalendarProgress() {
  const element = createElement('div', { class: 'progress-strip' });
  element.innerHTML = `
    <div class="progress-strip__track" role="progressbar" aria-valuemin="0" aria-valuemax="100"
      aria-valuenow="0" aria-label="Progreso del calendario de Adviento">
      <span class="progress-strip__bar" data-progress-bar></span>
    </div>
    <p class="progress-strip__detail" data-progress-detail></p>
    <p class="progress-strip__value" data-progress-value>0 %</p>`;

  const value = element.querySelector('[data-progress-value]');
  const bar = element.querySelector('[data-progress-bar]');
  const track = element.querySelector('.progress-strip__track');
  const detail = element.querySelector('[data-progress-detail]');

  function update(summary, percentage) {
    if (!summary) return;
    value.textContent = `${percentage} %`;
    bar.style.width = `${percentage}%`;
    track.setAttribute('aria-valuenow', String(percentage));
    detail.textContent = `${summary.opened} de ${summary.total} casillas descubiertas · ${summary.completed} actividades realizadas`;
  }

  return { element, update };
}

export { CONFIG };
export default createCalendarProgress;
