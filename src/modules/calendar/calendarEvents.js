/**
 * Conexión de eventos de la interfaz del calendario.
 */

import { showToast } from '../../components/interface/Toast.js';

/**
 * Enlaza los botones de la cabecera y los eventos globales.
 *
 * @param {object} options
 * @param {HTMLElement} options.actions
 * @param {() => void} options.onToday
 * @param {() => void} options.onToggleSound
 * @param {() => void} options.onNotifications
 * @param {() => void} options.onSettings
 * @param {(detail: object) => void} [options.onProgress]
 * @returns {() => void} Función para quitar los escuchas.
 */
export function bindCalendarEvents(options) {
  const { actions, onToday, onToggleSound, onNotifications, onSettings, onProgress } = options;
  const cleanups = [];

  function bind(selector, handler) {
    const button = actions?.querySelector(selector);
    if (!button) return;
    button.addEventListener('click', handler);
    cleanups.push(() => button.removeEventListener('click', handler));
  }

  bind('[data-action="today"]', onToday);
  bind('[data-action="sound"]', onToggleSound);
  bind('[data-action="notifications"]', onNotifications);
  bind('[data-action="settings"]', onSettings);

  if (onProgress) {
    const listener = (event) => onProgress(event.detail);
    document.addEventListener('calendario:progress', listener);
    cleanups.push(() => document.removeEventListener('calendario:progress', listener));
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

/**
 * Muestra un aviso cuando el navegador no permite notificaciones.
 * @param {string} message
 */
export function notifyUnsupported(message) {
  showToast(message, { tone: 'error' });
}

export default bindCalendarEvents;
