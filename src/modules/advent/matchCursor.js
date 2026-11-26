/**
 * Cursor de fósforo.
 *
 * Durante la ceremonia del domingo el puntero del mouse se convierte en un
 * fósforo: es el propio usuario quien trae la llama hasta la vela. En el
 * teléfono no hay puntero, así que basta con tocar la vela; el cursor solo
 * se activa en dispositivos con ratón.
 *
 * El cursor se define en JavaScript (y no en CSS) porque hay que dibujar dos
 * versiones —fósforo apagado y fósforo encendido— y porque el SVG se codifica
 * como data URI en cada momento.
 */

/**
 * Punto caliente: la cabeza del fósforo, donde está la llama.
 *
 * El fósforo está **inclinado hacia la izquierda**: la cabeza queda en la
 * parte alta izquierda y el palo baja hacia la derecha.
 */
const HOTSPOT = { x: 9, y: 12 };

/**
 * Dibuja el fósforo.
 *
 * @param {boolean} lit Si la cabeza ya está encendida.
 * @returns {string}
 */
function buildMatchSvg(lit) {
  const flame = lit
    ? `<path d="M9 0 C 3 7 2 14 7 18 C 12 22 16 15 13.5 9.5 C 12.2 6.5 10.5 3.5 9 0 Z" fill="#ffd27a"/>
       <path d="M9 6 C 6.6 9.4 6.6 13.4 9 15.6 C 11.2 17.4 12 13.4 11 10.4 Z" fill="#fff6d2"/>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
    ${flame}
    <path d="M23 45 L11 20" stroke="#c8a06a" stroke-width="5" stroke-linecap="round"/>
    <path d="M23 45 L11 20" stroke="#8d6a3f" stroke-width="1.6" stroke-linecap="round" opacity="0.55"/>
    <ellipse cx="9" cy="13" rx="7" ry="8" fill="#b8492f"/>
    <ellipse cx="11.2" cy="10" rx="3" ry="3.4" fill="#d9684a" opacity="0.75"/>
  </svg>`;
}

/**
 * Comprueba si el dispositivo tiene un puntero real.
 * @returns {boolean}
 */
function hasPointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(pointer: fine)')?.matches ?? true;
}

/**
 * Activa el cursor de fósforo en todo el documento.
 *
 * @param {boolean} [lit] Si el fósforo ya aparece encendido.
 */
export function setMatchCursor(lit = false) {
  if (typeof document === 'undefined') return;
  if (!hasPointer()) return;

  const svg = buildMatchSvg(lit);
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${HOTSPOT.x} ${HOTSPOT.y}, auto`;
  document.documentElement.style.cursor = url;
}

/**
 * Enciende (o apaga) la cabeza del fósforo sin quitarlo de la pantalla.
 *
 * @param {boolean} lit
 */
export function igniteMatchCursor(lit = true) {
  setMatchCursor(lit);
}

/**
 * Devuelve el cursor normal del sistema.
 */
export function clearMatchCursor() {
  if (typeof document === 'undefined') return;
  document.documentElement.style.cursor = '';
}

export default setMatchCursor;
