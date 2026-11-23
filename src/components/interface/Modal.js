/**
 * Modal genérico con foco atrapado, cierre por Escape y por fondo.
 */

import { createElement, clearElement } from '../../utils/domUtils.js';
import { trapFocus } from '../../utils/accessibilityUtils.js';

/**
 * Crea un modal.
 *
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.subtitle]
 * @param {string} [options.size] `compact` | `regular` | `wide`
 * @param {() => void} [options.onClose]
 * @returns {{element: HTMLElement, content: HTMLElement, open: () => void, close: () => void, isOpen: () => boolean}}
 */
export function createModal(options = {}) {
  const { title = '', subtitle = '', size = 'regular', onClose } = options;

  const overlay = createElement('div', { class: 'modal-overlay' });
  const dialog = createElement('div', {
    class: `modal modal--${size}`,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'modal-title',
  });

  const header = createElement('header', { class: 'modal__header' });
  const heading = createElement('div', { class: 'modal__heading' });
  const titleElement = createElement('h2', { class: 'modal__title', id: 'modal-title' });
  titleElement.textContent = title;
  heading.appendChild(titleElement);

  if (subtitle) {
    const subtitleElement = createElement('p', { class: 'modal__subtitle' });
    subtitleElement.textContent = subtitle;
    heading.appendChild(subtitleElement);
  }
  header.appendChild(heading);

  const closeButton = createElement('button', {
    type: 'button',
    class: 'modal__close',
    'aria-label': 'Cerrar',
  });
  closeButton.innerHTML = '<span aria-hidden="true">×</span>';
  header.appendChild(closeButton);

  const content = createElement('div', { class: 'modal__content' });

  dialog.appendChild(header);
  dialog.appendChild(content);
  overlay.appendChild(dialog);

  let releaseFocus = null;
  let isOpen = false;

  function open() {
    if (isOpen) return;
    isOpen = true;
    document.getElementById('modal-root')?.appendChild(overlay);
    document.body.classList.add('is-modal-open');
    releaseFocus = trapFocus(dialog, document.activeElement);
    closeButton.focus();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    releaseFocus?.();
    releaseFocus = null;
    overlay.remove();
    document.body.classList.remove('is-modal-open');
    onClose?.();
  }

  closeButton.addEventListener('click', close);
  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) close();
  });

  return {
    element: overlay,
    dialog,
    content,
    open,
    close,
    isOpen: () => isOpen,
    setTitle: (value) => {
      titleElement.textContent = value;
    },
    clear: () => clearElement(content),
  };
}

export default createModal;
