/**
 * Calendario ilustrado.
 *
 * Compone la escena de Belén con las 24 casillas integradas en la
 * ilustración y, para pantallas pequeñas, una versión alternativa en forma de
 * puertas que mantiene la identidad visual sin sacrificar la zona táctil.
 */

import { createElement } from '../../utils/domUtils.js';
import { renderBethlehemScene } from './scene/BethlehemScene.js';
import { createCalendarDay, updateCalendarDay, applyDayStateBadge } from './CalendarDay.js';
import { SCENE_SPOTS, toRelative } from '../../data/sceneLayout.js';
import { ADVENT_DAYS } from '../../data/adventDays.js';
import { getActivityType } from '../../data/activities.js';

/**
 * Crea el calendario completo.
 *
 * @param {object} options
 * @param {(day: number) => void} options.onSelect
 * @param {(day: number) => boolean} options.isLocked
 * @param {(day: number) => boolean} options.isOpened
 * @param {(day: number) => boolean} options.isCompleted
 * @returns {{element: HTMLElement, update: () => void, getMarker: (day: number) => HTMLElement|null}}
 */
export function createCalendar(options) {
  const { onSelect, isLocked, isOpened, isCompleted } = options;

  const element = createElement('section', { class: 'calendar', 'aria-label': 'Calendario de Adviento' });

  // --- Escena ilustrada ---
  const scene = createElement('div', { class: 'calendar__scene' });
  scene.innerHTML = renderBethlehemScene();

  const markers = createElement('div', { class: 'calendar__markers' });
  scene.appendChild(markers);

  const markerByDay = new Map();

  SCENE_SPOTS.forEach((spot) => {
    const dayData = ADVENT_DAYS.find((entry) => entry.day === spot.day);
    if (!dayData) return;

    const relative = toRelative(spot);
    const marker = createCalendarDay({
      day: spot.day,
      title: dayData.title,
      subtitle: dayData.subtitle,
      type: dayData.type,
      style: spot.style,
      left: relative.x * 100,
      top: relative.y * 100,
      locked: isLocked(spot.day),
    });

    marker.addEventListener('click', () => onSelect(spot.day));
    marker.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(spot.day);
      }
    });

    markers.appendChild(marker);
    markerByDay.set(spot.day, marker);
  });

  element.appendChild(scene);

  // --- Versión alternativa para móvil ---
  const mobile = createElement('div', { class: 'calendar__mobile' });
  const mobileTitle = createElement('h2', { class: 'calendar__mobile-title' });
  mobileTitle.textContent = 'Las 24 puertas de Belén';
  mobile.appendChild(mobileTitle);

  const mobileGrid = createElement('div', { class: 'calendar__mobile-grid' });

  ADVENT_DAYS.forEach((dayData) => {
    const typeInfo = getActivityType(dayData.type);
    const door = createElement('button', {
      type: 'button',
      class: 'calendar-door',
      'data-day': String(dayData.day),
    });
    door.innerHTML = `
      <span class="calendar-door__arch" aria-hidden="true"></span>
      <span class="calendar-door__number">${dayData.day}</span>
      <span class="calendar-door__label">${dayData.title}</span>
      <span class="calendar-door__type">${typeInfo.shortLabel}</span>
      <span class="calendar-door__state" aria-hidden="true"></span>`;

    door.addEventListener('click', () => onSelect(dayData.day));
    mobileGrid.appendChild(door);
    markerByDay.set(`mobile-${dayData.day}`, door);
  });

  mobile.appendChild(mobileGrid);
  element.appendChild(mobile);

  function update() {
    SCENE_SPOTS.forEach((spot) => {
      const marker = markerByDay.get(spot.day);
      if (!marker) return;
      const dayData = ADVENT_DAYS.find((entry) => entry.day === spot.day);
      updateCalendarDay(marker, {
        locked: isLocked(spot.day),
        opened: isOpened(spot.day),
        completed: isCompleted(spot.day),
        title: dayData?.title,
      });
    });

    ADVENT_DAYS.forEach((dayData) => {
      const door = markerByDay.get(`mobile-${dayData.day}`);
      if (!door) return;
      const locked = isLocked(dayData.day);
      door.classList.toggle('is-locked', locked);
      door.classList.toggle('is-opened', isOpened(dayData.day));
      door.classList.toggle('is-completed', isCompleted(dayData.day));
      door.setAttribute('aria-disabled', locked ? 'true' : 'false');
      const stateIcon = door.querySelector('.calendar-door__state');
      applyDayStateBadge(stateIcon, {
        locked,
        opened: isOpened(dayData.day),
        completed: isCompleted(dayData.day),
      });
    });
  }

  update();

  return {
    element,
    update,
    getMarker: (day) => markerByDay.get(day) ?? null,
  };
}

export default createCalendar;
