/**
 * Utilidades de fecha puras (sin acceso al navegador).
 *
 * Trabajan siempre con claves `YYYY-MM-DD`, que se comparan de forma segura
 * porque mantienen el formato lexicográfico.
 */

/**
 * Valida que una cadena tenga formato `YYYY-MM-DD` y sea una fecha real.
 * @param {string} dateKey
 * @returns {boolean}
 */
export function isValidDateKey(dateKey) {
  if (typeof dateKey !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  );
}

/**
 * Devuelve los días de diferencia entre dos claves de fecha (b - a).
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function daysBetween(a, b) {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const start = Date.UTC(ay, am - 1, ad);
  const end = Date.UTC(by, bm - 1, bd);
  return Math.round((end - start) / 86400000);
}

/**
 * Suma días a una clave de fecha.
 * @param {string} dateKey
 * @param {number} amount
 * @returns {string}
 */
export function addDays(dateKey, amount) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

/**
 * Indica si una fecha está dentro del rango de Adviento del calendario.
 * @param {string} dateKey
 * @param {string} startKey
 * @param {string} endKey
 * @returns {boolean}
 */
export function isWithinRange(dateKey, startKey, endKey) {
  return dateKey >= startKey && dateKey <= endKey;
}

/**
 * Devuelve la fecha ISO completa (con hora) de un instante.
 * @param {Date} date
 * @returns {string}
 */
export function toIsoTimestamp(date = new Date()) {
  return date.toISOString();
}

/**
 * Devuelve la fecha de apertura formateada para mostrar al usuario.
 * @param {string} timestamp
 * @returns {string}
 */
export function formatOpenedAt(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
