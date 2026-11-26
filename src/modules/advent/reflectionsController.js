/**
 * Controlador de las reflexiones de los domingos de Adviento.
 *
 * Las reflexiones se habilitan por domingo: en el segundo domingo de Adviento
 * se pueden leer la del primer domingo y la del propio segundo. El botón de
 * la cabecera (junto al del sonido) abre la lista de las disponibles.
 */

import {
  createSundayReflectionModal,
  createReflectionsListModal,
} from '../../components/advent/AdventReflection.js';
import { getAvailableReflections } from '../../data/adventReflections.js';
import { getToday } from '../../services/dateService.js';

/** Botón de la cabecera que abre la lista de reflexiones. */
let triggerButton = null;

/**
 * Registra el botón de la cabecera.
 * @param {HTMLElement|null} button
 */
export function registerReflectionsButton(button) {
  triggerButton = button ?? null;
}

/**
 * Muestra u oculta el botón según las reflexiones disponibles.
 *
 * @param {string} [dateKey] Fecha actual (YYYY-MM-DD).
 */
export function refreshReflectionsButton(dateKey = getToday().dateKey) {
  if (!triggerButton) return;
  const available = getAvailableReflections(dateKey);
  triggerButton.hidden = available.length === 0;
}

/**
 * Abre la reflexión de un domingo.
 *
 * @param {number} index Domingo (1..4).
 */
export function openSundayReflection(index) {
  const { modal } = createSundayReflectionModal({ index });
  modal.open();
}

/**
 * Abre la lista de reflexiones disponibles y, al elegir una, su contenido.
 */
export function openReflectionsList() {
  const { dateKey } = getToday();
  const { modal } = createReflectionsListModal({
    dateKey,
    onSelect: (index) => openSundayReflection(index),
  });
  modal.open();
}

export default openReflectionsList;
