/**
 * Controlador de notificaciones.
 *
 * Gestiona la preferencia del usuario, el recordatorio diario mientras la
 * página está abierta y el aviso de prueba tras activar los recordatorios.
 */

import { CONFIG } from '../../data/configuration.js';
import { getDateKeyFromDay } from '../../data/adventDates.js';
import { getToday } from '../../services/dateService.js';
import {
  requestNotificationPermission,
  showNotification,
  shouldNotifyNow,
} from './notificationService.js';
import { readPreference, updatePreference } from '../progress/progressController.js';
import { showToast } from '../../components/interface/Toast.js';

/** Clave interna para no avisar dos veces el mismo día. */
let lastNotifiedDate = null;
/** Temporizador del recordatorio. */
let reminderTimer = null;

/**
 * ¿Están activadas las notificaciones según la preferencia guardada?
 * @returns {boolean}
 */
export function areNotificationsEnabled() {
  return Boolean(readPreference('notifications'));
}

/**
 * Pide permiso y activa los recordatorios.
 * @returns {Promise<boolean>} `true` si quedaron activados.
 */
export async function enableNotifications() {
  const permission = await requestNotificationPermission();

  if (permission === 'unsupported') {
    showToast('Este navegador no admite notificaciones.', { tone: 'error' });
    return false;
  }

  if (permission !== 'granted') {
    updatePreference('notifications', false);
    showToast('No se activaron los recordatorios. Puedes intentarlo más tarde en Ajustes.', {
      tone: 'info',
    });
    return false;
  }

  updatePreference('notifications', true);
  showNotification('Calendario de Adviento 2026', {
    body: '¡Los recordatorios están activos! Te avisaremos cuando haya una nueva casilla.',
    tag: 'calendario-navideño-bienvenida',
  });
  showToast('¡Recordatorios activados!', { tone: 'success' });
  return true;
}

/**
 * Desactiva los recordatorios.
 */
export function disableNotifications() {
  updatePreference('notifications', false);
  stopReminderLoop();
  showToast('Recordatorios desactivados.', { tone: 'info' });
}

/**
 * Alterna el estado de los recordatorios.
 * @returns {Promise<boolean>}
 */
export async function toggleNotifications() {
  if (areNotificationsEnabled()) {
    disableNotifications();
    return false;
  }
  return enableNotifications();
}

/**
 * Calcula el día del calendario disponible hoy.
 * @returns {number}
 */
function getAvailableDay() {
  const { dateKey } = getToday();
  if (dateKey < CONFIG.dates.calendarStart) return 0;
  if (dateKey > CONFIG.dates.christmasEve) return CONFIG.totalDays;
  const start = getDateKeyFromDay(1);
  const diff = Math.round(
    (new Date(`${dateKey}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000,
  );
  return diff + 1;
}

/**
 * Comprueba si hay que avisar y, en ese caso, muestra el recordatorio.
 * @param {(day: number) => boolean} isDayOpened
 */
export function checkReminder(isDayOpened) {
  if (!areNotificationsEnabled()) return;

  const { dateKey } = getToday();
  const availableDay = getAvailableDay();
  const alreadyOpened = isDayOpened(availableDay);
  const alreadyNotified = lastNotifiedDate === dateKey;

  if (!shouldNotifyNow({ availableDay, alreadyOpened, alreadyNotified })) return;

  lastNotifiedDate = dateKey;
  showNotification('Hay una nueva sorpresa en el calendario', {
    body: `Ya puedes abrir la casilla del ${availableDay} de diciembre.`,
    tag: `calendario-dia-${availableDay}`,
  });
}

/**
 * Arranca el recordatorio periódico (solo mientras la página está abierta).
 * @param {(day: number) => boolean} isDayOpened
 */
export function startReminderLoop(isDayOpened) {
  stopReminderLoop();
  reminderTimer = window.setInterval(() => checkReminder(isDayOpened), 60 * 1000);
  window.setTimeout(() => checkReminder(isDayOpened), 1500);
}

/**
 * Detiene el recordatorio periódico.
 */
export function stopReminderLoop() {
  if (reminderTimer) {
    window.clearInterval(reminderTimer);
    reminderTimer = null;
  }
}

export default {
  enableNotifications,
  disableNotifications,
  toggleNotifications,
  startReminderLoop,
  stopReminderLoop,
};
