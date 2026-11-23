/**
 * Controlador del calendario.
 *
 * Coordina el renderizado, el estado de las casillas, la corona de Adviento,
 * las preferencias y las notificaciones.
 */

import { renderApplication, updateCurrentDate } from './calendarRenderer.js';
import { bindCalendarEvents } from './calendarEvents.js';
import { getDateKeyFromDay } from '../../data/adventDates.js';
import { getToday, isDateSimulationActive } from '../../services/dateService.js';
import {
  isDayOpened,
  isActivityCompleted,
  getProgressSummary,
  getProgressPercentage,
  resetProgress,
} from '../progress/progressTracker.js';
import { PROGRESS_EVENT } from '../progress/progressController.js';
import {
  registerAdventElements,
  applyAdventForDate,
  replayAdventAnimation,
} from '../advent/adventController.js';
import {
  openDayActivity,
  registerMarkerProvider,
} from '../activities/activityController.js';
import { createSettingsPanel } from '../../components/interface/SettingsPanel.js';
import { showToast } from '../../components/interface/Toast.js';
import { toggleSound, isSoundEnabled, initAudioController } from '../audio/audioController.js';
import {
  toggleNotifications,
  areNotificationsEnabled,
  startReminderLoop,
} from '../notifications/notificationController.js';
import { animateSceneEntrance } from '../animations/calendarAnimations.js';
import { CONFIG } from '../../data/configuration.js';

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
 * Desplaza la vista hasta la casilla del día de hoy.
 */
function goToToday() {
  const { dateKey } = getToday();
  const day = getDateKeyFromDay(1);
  let target = 1;
  for (let candidate = CONFIG.totalDays; candidate >= 1; candidate -= 1) {
    if (dateKey >= getDateKeyFromDay(candidate)) {
      target = candidate;
      break;
    }
  }
  void day;

  const marker = ui?.calendar.getMarker(target);
  if (marker) {
    marker.scrollIntoView({ behavior: 'smooth', block: 'center' });
    marker.classList.add('is-highlighted');
    window.setTimeout(() => marker.classList.remove('is-highlighted'), 1800);
  }
}

/**
 * Abre el panel de ajustes.
 */
function openSettings() {
  const { modal } = createSettingsPanel({
    settings: {
      sound: isSoundEnabled(),
      notifications: areNotificationsEnabled(),
      reducedMotion: document.documentElement.dataset.motion ?? 'system',
    },
    onPreferenceChange: (key, value) => {
      if (key === 'sound') {
        toggleSound(value);
        updateSoundButton();
      } else if (key === 'notifications') {
        if (value) toggleNotifications();
        else toggleNotifications();
      } else if (key === 'reducedMotion') {
        document.documentElement.dataset.motion = value;
      }
    },
    onResetProgress: () => {
      resetProgress();
      refreshCalendar();
      applyAdventForDate(getToday().dateKey);
      showToast('Tu progreso se ha reiniciado.', { tone: 'info' });
    },
    onClose: () => modal.close(),
  });

  modal.open();
}

/**
 * Refleja el estado del sonido en el botón de la cabecera.
 */
function updateSoundButton() {
  const button = ui?.actions?.querySelector('[data-action="sound"]');
  if (!button) return;
  const enabled = isSoundEnabled();
  button.setAttribute('aria-pressed', String(enabled));
  button.classList.toggle('is-muted', !enabled);
}

/**
 * Inicializa el calendario.
 */
export function initCalendarController() {
  const container = document.getElementById('app-root');
  if (!container) return;

  initAudioController();

  ui = renderApplication({
    container,
    onSelectDay: (day) => openDayActivity(day),
    isLocked,
    isOpened: (day) => isDayOpened(day),
    isCompleted: (day) => isActivityCompleted(day),
    onReplayWreath: () => replayAdventAnimation(getToday().dateKey),
  });

  container.hidden = false;

  const { dateKey } = getToday();
  updateCurrentDate(ui.currentDate, dateKey);

  registerAdventElements({ wreath: ui.wreath, message: ui.adventMessage });
  registerMarkerProvider((day) => ui.calendar.getMarker(day));

  bindCalendarEvents({
    actions: ui.actions,
    onToday: goToToday,
    onToggleSound: () => {
      toggleSound(!isSoundEnabled());
      updateSoundButton();
    },
    onNotifications: async () => {
      // Antes de pedir el permiso se explica para qué sirve, tal como pide el
      // diseño del proyecto: nunca se solicita sin contexto.
      if (!areNotificationsEnabled()) {
        showToast(
          'Los recordatorios te avisarán cuando haya una nueva casilla, mientras esta página esté abierta.',
          { tone: 'info', duration: 5000 },
        );
      }
      await toggleNotifications();
    },
    onSettings: openSettings,
    onProgress: refreshCalendar,
  });

  document.addEventListener(PROGRESS_EVENT, refreshCalendar);

  refreshCalendar();
  updateSoundButton();

  const scene = ui.calendar.element.querySelector('.bethlehem-scene');
  animateSceneEntrance(scene);

  applyAdventForDate(dateKey);
  startReminderLoop((day) => isDayOpened(day));

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshCalendar();
  });

  if (isDateSimulationActive()) {
    showToast('Modo simulación de fecha activo (solo en desarrollo).', { tone: 'info' });
  }
}

export default initCalendarController;
