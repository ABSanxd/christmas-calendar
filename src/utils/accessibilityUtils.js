/**
 * Utilidades de accesibilidad.
 */

import { getFocusableElements } from './domUtils.js';

/**
 * Mantiene el foco dentro de un contenedor (foco atrapado).
 * @param {HTMLElement} container
 * @param {HTMLElement} previouslyFocused
 * @returns {() => void} Función para liberar el foco atrapado.
 */
export function trapFocus(container, previouslyFocused) {
  function onKeyDown(event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', onKeyDown);

  return () => {
    container.removeEventListener('keydown', onKeyDown);
    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus();
    }
  };
}

/**
 * Anuncia un mensaje a los lectores de pantalla.
 * @param {string} message
 * @param {HTMLElement} [liveRegion]
 */
export function announce(message, liveRegion) {
  if (!liveRegion) return;
  liveRegion.textContent = '';
  // Un pequeño retardo garantiza que el lector de pantalla detecte el cambio.
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 60);
}

/**
 * Marca un elemento como decorativo para lectores de pantalla.
 * @param {SVGElement | HTMLElement} element
 */
export function markDecorative(element) {
  if (!element) return;
  element.setAttribute('aria-hidden', 'true');
  element.setAttribute('focusable', 'false');
}

/**
 * Devuelve la etiqueta accesible de un icono.
 * @param {SVGElement | HTMLElement} element
 * @param {string} label
 */
export function labelIcon(element, label) {
  if (!element) return;
  element.setAttribute('role', 'img');
  element.setAttribute('aria-label', label);
}

/**
 * Comprueba si un elemento es visible para el usuario.
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isVisible(element) {
  if (!element) return false;
  return element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0;
}
