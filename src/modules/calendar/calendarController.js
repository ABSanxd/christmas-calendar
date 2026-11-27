/**
 * Controlador del calendario.
 *
 * Coordina el renderizado, el estado de las casillas, la corona de Adviento,
 * las preferencias y las notificaciones.
 */

import { renderApplication, updateCurrentDate } from './calendarRenderer.js';
import { bindCalendarEvents } from './calendarEvents.js';
import { getDateKeyFromDay } from '../../data/adventDates.js';
import { getToday, isDateSimulationActive, isPreviewBuild } from '../../services/dateService.js';
import {
  isDayOpened,
  isActivityCompleted,
  getProgressSummary,
  getProgressPercentage,
} from '../progress/progressTracker.js';
import { PROGRESS_EVENT } from '../progress/progressController.js';
import {
  registerAdventElements,
  applyAdventForDate,
} from '../advent/adventController.js';
import {
  registerReflectionsButton,
  refreshReflectionsButton,
  openReflectionsList,
} from '../advent/reflectionsController.js';
import {
  openDayActivity,
  registerMarkerProvider,
} from '../activities/activityController.js';
import { showToast } from '../../components/interface/Toast.js';
import { toggleSound, isSoundEnabled, initAudioController } from '../audio/audioController.js';
import { initBackgroundMusic, syncBackgroundMusic } from '../audio/backgroundMusic.js';
import { animateSceneEntrance } from '../animations/calendarAnimations.js';

/** Referencias de la interfaz ya renderizadas. */
let ui = null;

/**
 * Indica si una casilla sigue bloqueada en la fecha actual.
 * @param {number} day
 * @returns {boolean}
 */
function isLocked(day) {
  const { dateKey } = getToday();
  return dateKey < getDateKeyFromDay(day);
}

/**
 * Actualiza el indicador de progreso y el estado visual de las casillas.
 */
function refreshCalendar() {
  const summary = getProgressSummary();
  const percentage = getProgressPercentage();
  ui?.progress.update(summary, percentage);
  ui?.calendar.update();
}

/**
 * Refleja el estado del sonido en el botón de la cabecera.
 *
 * El texto del botón y el de su tooltip cambian con el estado: así el
 * visitante sabe si lo que va a pasar es apagar o encender la música.
 */
function updateSoundButton() {
  const button = ui?.actions?.querySelector('[data-action="sound"]');
  if (!button) return;
  const enabled = isSoundEnabled();
  button.setAttribute('aria-pressed', String(enabled));
  button.classList.toggle('is-muted', !enabled);

  const label = enabled ? 'Apagar música' : 'Activar música';
  button.setAttribute('aria-label', label);
  const tip = button.querySelector('.icon-button__tip');
  if (tip) tip.textContent = label;
}

/**
 * Inicializa el calendario.
 */
export function initCalendarController() {
  const container = document.getElementById('app-root');
  if (!container) return;

  initAudioController();
  initBackgroundMusic();

  ui = renderApplication({
    container,
    onSelectDay: (day) => openDayActivity(day),
    isLocked,
    isOpened: (day) => isDayOpened(day),
    isCompleted: (day) => isActivityCompleted(day),
  });

  container.hidden = false;

  const { dateKey } = getToday();
  updateCurrentDate(ui.currentDate, dateKey);

  registerAdventElements({ wreath: ui.wreath });
  registerReflectionsButton(ui.reflectionsButton);
  refreshReflectionsButton(dateKey);
  registerMarkerProvider((day) => ui.calendar.getMarker(day));

  bindCalendarEvents({
    actions: ui.actions,
    onToggleSound: () => {
      toggleSound(!isSoundEnabled());
      updateSoundButton();
      syncBackgroundMusic();
    },
    onReflections: () => openReflectionsList(),
    onProgress: refreshCalendar,
  });

  document.addEventListener(PROGRESS_EVENT, refreshCalendar);

  refreshCalendar();
  updateSoundButton();

  const scene = ui.calendar.element.querySelector('.bethlehem-scene');
  animateSceneEntrance(scene);

  applyAdventForDate(dateKey);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshCalendar();
  });

  if (isDateSimulationActive()) {
    showToast(
      isPreviewBuild()
        ? 'Vista de prueba: puedes abrir cualquier día con ?fecha=AAAA-MM-DD.'
        : 'Modo simulación de fecha activo (solo en desarrollo).',
      { tone: 'info' },
    );
  }
}

export default initCalendarController;
