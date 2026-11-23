/**
 * Indicador de progreso del calendario.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * Crea la barra de progreso.
 * @returns {{element: HTMLElement, update: (summary: {opened: number, completed: number, total: number}, percentage: number) => void}}
 */
export function createCalendarProgress() {
  const element = createElement('section', { class: 'progress-card' });
  element.innerHTML = `
    <div class="progress-card__head">
      <h2 class="progress-card__title">Tu camino de Adviento</h2>
      <p class="progress-card__value" data-progress-value>0 %</p>
    </div>
    <div class="progress-card__track" role="progressbar" aria-valuemin="0" aria-valuemax="100"
      aria-valuenow="0" aria-label="Progreso del calendario de Adviento">
      <span class="progress-card__bar" data-progress-bar></span>
    </div>
    <p class="progress-card__detail" data-progress-detail></p>`;

  const value = element.querySelector('[data-progress-value]');
  const bar = element.querySelector('[data-progress-bar]');
  const track = element.querySelector('.progress-card__track');
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
