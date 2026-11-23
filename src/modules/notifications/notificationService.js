/**
 * Servicio de notificaciones del navegador.
 *
 * Limitaciones asumidas de forma explícita: GitHub Pages no tiene servidor,
 * así que no se pueden enviar notificaciones programadas con el navegador
 * cerrado. Este servicio solo muestra avisos mientras la página está abierta.
 */

import { supportsNotifications, getNotificationPermission, isPageVisible } from '../../services/deviceService.js';

/**
 * Solicita permiso para mostrar notificaciones.
 * @returns {Promise<'granted'|'denied'|'default'|'unsupported'>}
 */
export async function requestNotificationPermission() {
  if (!supportsNotifications()) return 'unsupported';
  if (getNotificationPermission() !== 'default') return getNotificationPermission();

  try {
    return await window.Notification.requestPermission();
  } catch (error) {
    console.warn('[calendario] No se pudo solicitar el permiso de notificaciones:', error);
    return 'denied';
  }
}

/**
 * Muestra una notificación.
 * @param {string} title
 * @param {object} [options]
 * @returns {Notification|null}
 */
export function showNotification(title, options = {}) {
  if (!supportsNotifications() || getNotificationPermission() !== 'granted') return null;

  try {
    const notification = new window.Notification(title, {
      body: options.body ?? '',
      icon: options.icon ?? './favicon.svg',
      tag: options.tag ?? 'calendario-navideño',
      silent: options.silent ?? false,
    });

    notification.addEventListener('click', () => {
      window.focus();
      notification.close();
    });

    return notification;
  } catch (error) {
    console.warn('[calendario] No se pudo mostrar la notificación:', error);
    return null;
  }
}

/**
 * Comprueba si ahora mismo tiene sentido avisar al usuario.
 *
 * Solo se avisa si la página está visible, hay permiso concedido y todavía
 * no se ha abierto la casilla del día.
 *
 * @param {object} options
 * @param {number} options.availableDay Día del calendario disponible hoy.
 * @param {boolean} options.alreadyOpened Si el usuario ya abrió el día.
 * @param {boolean} options.alreadyNotified Si ya se le avisó hoy.
 * @returns {boolean}
 */
export function shouldNotifyNow(options) {
  const { availableDay, alreadyOpened, alreadyNotified } = options;
  if (!isPageVisible()) return false;
  if (alreadyOpened || alreadyNotified) return false;
  return Number.isInteger(availableDay) && availableDay > 0;
}

export default {
  requestNotificationPermission,
  showNotification,
  shouldNotifyNow,
};
