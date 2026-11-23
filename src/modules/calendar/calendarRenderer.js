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
 * @param {() => void} options.onReplayWreath
 * @returns {object} Referencias de la interfaz.
 */
export function renderApplication(options) {
  const {
    container,
    onSelectDay,
    isLocked,
    isOpened,
    isCompleted,
    onReplayWreath,
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
    { action: 'today', icon: 'sun', label: 'Ir al día de hoy' },
    { action: 'sound', icon: 'music', label: 'Activar o desactivar el sonido' },
  ];

  actionButtons.forEach(({ action, icon, label }) => {
    const button = createElement('button', {
      type: 'button',
      class: 'icon-button',
      'data-action': action,
      'aria-label': label,
    });
    if (action === 'sound') button.setAttribute('aria-pressed', 'true');
    button.appendChild(createIcon(icon));
    actions.appendChild(button);
  });

  headerWrap.appendChild(brand);
  headerWrap.appendChild(actions);
  header.appendChild(headerWrap);
  container.appendChild(header);

  // --- Cuerpo ---
  const main = createElement('main', { class: 'app-main', id: 'contenido-principal' });
  const wrap = createElement('div', { class: 'page-wrap' });

  // Saludo y fecha.
  const hero = createElement('section', { class: 'hero' });
  hero.innerHTML = `
    <p class="hero__date" data-current-date></p>
    <h2 class="hero__title">Camina con nosotros hacia Belén</h2>
    <p class="hero__text">
      Cada día escondemos una sorpresa: una reflexión, una oración, un reto y
      pequeños juegos para preparar el corazón. Ábrelas a medida que llega su
      fecha y deja que la luz de Adviento entre en tu casa.
    </p>`;
  wrap.appendChild(hero);

  // Progreso.
  const progress = createCalendarProgress();
  wrap.appendChild(progress.element);

  // Calendario.
  const calendar = createCalendar({
    onSelect: onSelectDay,
    isLocked,
    isOpened,
    isCompleted,
  });
  wrap.appendChild(calendar.element);

  // Corona de Adviento.
  const wreathSection = createElement('section', { class: 'advent-section' });
  const wreathTitle = createElement('h2', { class: 'advent-section__title' });
  wreathTitle.textContent = 'La corona de Adviento';
  const adventMessage = createElement('p', {
    class: 'advent-section__message',
    'data-advent-message': '',
    role: 'status',
  });
  const wreath = createAdventWreath({
    litCount: 0,
    onReplay: onReplayWreath,
  });

  wreathSection.appendChild(wreathTitle);
  wreathSection.appendChild(adventMessage);
  wreathSection.appendChild(wreath);
  wrap.appendChild(wreathSection);

  main.appendChild(wrap);
  container.appendChild(main);

  // --- Pie ---
  const footer = createElement('footer', { class: 'app-footer' });
  footer.innerHTML = `
    <div class="page-wrap">
      <p>Calendario de Adviento 2026 · Comunidad católica</p>
      <p class="app-footer__message">
        Cada vela que enciendas y cada puerta que abras quedan guardadas en
        este dispositivo, solo para ti. Vuelve cuando quieras: tu camino de
        Adviento te estará esperando.
      </p>
      <p>Textos bíblicos: Biblia de Jerusalén (Reinaldo), edición de la RAE.</p>
    </div>`;
  container.appendChild(footer);

  return {
    header,
    main,
    hero,
    calendar,
    progress,
    wreath,
    adventMessage,
    actions,
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
