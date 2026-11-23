/**
 * Conexión de eventos de la interfaz del calendario.
 */

/**
 * Enlaza los botones de la cabecera y los eventos globales.
 *
 * @param {object} options
 * @param {HTMLElement} options.actions
 * @param {() => void} options.onToday
 * @param {() => void} options.onToggleSound
 * @param {(detail: object) => void} [options.onProgress]
 * @returns {() => void} Función para quitar los escuchas.
 */
export function bindCalendarEvents(options) {
  const { actions, onToday, onToggleSound, onProgress } = options;
  const cleanups = [];

  function bind(selector, handler) {
    const button = actions?.querySelector(selector);
    if (!button) return;
    button.addEventListener('click', handler);
    cleanups.push(() => button.removeEventListener('click', handler));
  }

  bind('[data-action="today"]', onToday);
  bind('[data-action="sound"]', onToggleSound);

  if (onProgress) {
    const listener = (event) => onProgress(event.detail);
    document.addEventListener('calendario:progress', listener);
    cleanups.push(() => document.removeEventListener('calendario:progress', listener));
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

export default bindCalendarEvents;
