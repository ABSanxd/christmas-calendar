/**
 * Avisos efímeros (toasts) para confirmar acciones.
 */

import { createElement } from '../../utils/domUtils.js';

/**
 * Muestra un aviso en la parte superior de la pantalla.
 *
 * @param {string} message
 * @param {object} [options]
 * @param {'info'|'success'|'error'} [options.tone]
 * @param {number} [options.duration] Milisegundos visibles.
 */
export function showToast(message, options = {}) {
  const { tone = 'info', duration = 3200 } = options;
  const root = document.getElementById('toast-root');
  if (!root) return;

  const toast = createElement('div', { class: `toast toast--${tone}`, role: 'status' });
  toast.textContent = message;
  root.appendChild(toast);

  window.requestAnimationFrame(() => toast.classList.add('is-visible'));

  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 320);
  }, duration);
}

export default showToast;
