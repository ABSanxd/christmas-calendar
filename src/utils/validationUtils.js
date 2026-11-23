/**
 * Utilidades de validación.
 */

/**
 * Comprueba que un valor sea un entero dentro de un rango.
 * @param {unknown} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isIntegerInRange(value, min, max) {
  return Number.isInteger(value) && value >= min && value <= max;
}

/**
 * Comprueba que un texto no esté vacío tras recortarlo.
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNonEmptyText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Normaliza un texto para comparaciones (minúsculas, sin acentos ni signos).
 * @param {string} value
 * @returns {string}
 */
export function normalizeText(value) {
  return (value ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Comprueba que un objeto tenga la forma mínima esperada.
 * @param {unknown} value
 * @param {string[]} requiredKeys
 * @returns {boolean}
 */
export function hasShape(value, requiredKeys) {
  if (!value || typeof value !== 'object') return false;
  return requiredKeys.every((key) => key in value);
}

/**
 * Limita un valor numérico a un rango.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
