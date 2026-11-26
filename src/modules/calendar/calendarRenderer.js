/**
 * Renderizador principal: construye la interfaz completa de la aplicación.
 *
 * Devuelve referencias a los elementos que después necesitan actualizarse
 * (fecha actual, progreso, corona y mensaje de los domingos).
 */

import { createElement } from '../../utils/domUtils.js';
import { createIcon } from '../../components/common/Icon.js';
import { createCalendar } from '../../components/calendar/Calendar.js';
import { createCalendarProgress } from '../../components/calendar/CalendarProgress.js';
import { createAdventWreath } from '../../components/advent/AdventWreath.js';
import { CONFIG } from '../../data/configuration.js';
import { formatShortDate } from '../../services/dateService.js';

/**
 * Marca del proyecto: estrella de Belén sobre una luna.
 * @returns {string}
 */
function renderBrandMark() {
  return `
    <svg class="app-header__mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brand-star" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="#ffeec2"/>
          <stop offset="60%" stop-color="#c6a568"/>
          <stop offset="100%" stop-color="#8d713f"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="20" fill="#17264a"/>
      <path d="M 32 6 L 37 26 L 57 31 L 37 36 L 32 56 L 27 36 L 7 31 L 27 26 Z" fill="url(#brand-star)"/>
      <circle cx="32" cy="31" r="4" fill="#fff6dd"/>
    </svg>`;
}

/**
 * Construye la aplicación dentro del contenedor indicado.
 *
 * @param {object} options
 * @param {HTMLElement} options.container
 * @param {(day: number) => void} options.onSelectDay
 * @param {(day: number) => boolean} options.isLocked
 * @param {(day: number) => boolean} options.isOpened
 * @param {(day: number) => boolean} options.isCompleted
 * @returns {object} Referencias de la interfaz.
 */
export function renderApplication(options) {
  const {
    container,
    onSelectDay,
    isLocked,
    isOpened,
    isCompleted,
  } = options;

  container.innerHTML = '';

  // --- Encabezado ---
  const header = createElement('header', { class: 'app-header' });
  const headerWrap = createElement('div', { class: 'page-wrap app-header__inner' });

  const brand = createElement('div', { class: 'app-header__brand' });
  brand.innerHTML = renderBrandMark();
  const titles = createElement('div', { class: 'app-header__titles' });
  titles.innerHTML = `
    <h1 class="app-header__title">
      <span class="app-header__title-full">${CONFIG.name}</span>
      <span class="app-header__title-short">Adviento 2026</span>
    </h1>
    <p class="app-header__subtitle">${CONFIG.tagline}</p>`;
  brand.appendChild(titles);

  const actions = createElement('nav', { class: 'app-header__actions', 'aria-label': 'Opciones' });
  const actionButtons = [
    {
      action: 'sound',
      icon: 'music',
      label: 'Apagar música',
      tip: 'Apagar música',
    },
    {
      action: 'reflections',
      icon: 'candle',
      label: 'Ver reflexiones de Adviento',
      tip: 'Ver reflexiones de Adviento',
    },
  ];

  const actionElements = {};

  actionButtons.forEach(({ action, icon, label, tip }) => {
    const button = createElement('button', {
      type: 'button',
      class: 'icon-button',
      'data-action': action,
      'aria-label': label,
    });
    if (action === 'sound') button.setAttribute('aria-pressed', 'true');
    button.appendChild(createIcon(icon));

    // El texto que explica qué hace el botón. Va oculto a los lectores de
    // pantalla porque el botón ya tiene su `aria-label`.
    const tooltip = createElement('span', {
      class: 'icon-button__tip',
      role: 'tooltip',
      'aria-hidden': 'true',
    });
    tooltip.textContent = tip;
    button.appendChild(tooltip);

    actions.appendChild(button);
    actionElements[action] = button;
  });

  headerWrap.appendChild(brand);
  headerWrap.appendChild(actions);
  header.appendChild(headerWrap);
  container.appendChild(header);

  // --- Franja de progreso: justo debajo de la cabecera ---
  const progress = createCalendarProgress();
  const progressWrap = createElement('div', { class: 'page-wrap progress-strip-wrap' });
  progressWrap.appendChild(progress.element);
  container.appendChild(progressWrap);

  // --- Cuerpo ---
  const main = createElement('main', { class: 'app-main', id: 'contenido-principal' });
  const wrap = createElement('div', { class: 'page-wrap' });

  // Saludo y fecha. La corona de Adviento vive en la esquina superior
  // derecha, al lado de la fecha, el título y la presentación.
  const hero = createElement('section', { class: 'hero' });
  hero.innerHTML = `
    <div class="hero__head">
      <p class="hero__date" data-current-date></p>
      <h2 class="hero__title">Camina con nosotros hacia Belén</h2>
      <p class="hero__text">
        Cada día, este calendario te acompaña con una reflexión, una oración, un
        reto y pequeños juegos para preparar el corazón. Ábrelas a medida que
        llega su fecha y deja que la luz de Adviento entre en tu casa.
      </p>
    </div>`;

  const wreath = createAdventWreath({ litCount: 0, variant: 'corner' });
  const wreathSlot = createElement('div', { class: 'hero__wreath' });
  wreathSlot.appendChild(wreath);
  hero.appendChild(wreathSlot);

  wrap.appendChild(hero);

  // Calendario.
  const calendar = createCalendar({
    onSelect: onSelectDay,
    isLocked,
    isOpened,
    isCompleted,
  });
  wrap.appendChild(calendar.element);

  main.appendChild(wrap);
  container.appendChild(main);

  // --- Pie ---
  const footer = createElement('footer', { class: 'app-footer' });
  footer.innerHTML = `
    <div class="page-wrap">
      <p>Calendario de Adviento 2026 · Comunidad Magnificat</p>
    </div>`;
  container.appendChild(footer);

  return {
    header,
    main,
    hero,
    calendar,
    progress,
    wreath,
    actions,
    reflectionsButton: actionElements.reflections,
    currentDate: hero.querySelector('[data-current-date]'),
  };
}

/**
 * Actualiza la fecha mostrada en el saludo.
 * @param {HTMLElement} element
 * @param {string} dateKey
 */
export function updateCurrentDate(element, dateKey) {
  if (!element) return;
  element.textContent = formatShortDate(dateKey);
}

export default renderApplication;
