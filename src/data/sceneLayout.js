/**
 * Distribución de las 24 casillas dentro de la ilustración de Belén.
 *
 * Las coordenadas están expresadas en el sistema de referencia del SVG de la
 * escena (`viewBox="0 0 1600 1200"`). Cada casilla se dibuja sobre un
 * elemento real de la ilustración (puerta, ventana, arquitrabe, camino o
 * espacio del cielo) para que el calendario se sienta integrado en la escena.
 */

/**
 * @typedef {object} DaySpot
 * @property {number} day     Número de casilla.
 * @property {number} x       Centro horizontal en el viewBox.
 * @property {number} y       Centro vertical en el viewBox.
 * @property {string} host    Elemento de la escena donde se apoya la casilla.
 * @property {string} style   Variante del marco: door | window | niche | beacon.
 * @property {number} [angle] Rotación en grados para integrarse con la escena.
 */

/** @type {DaySpot[]} */
export const SCENE_SPOTS = [
  { day: 1, x: 150, y: 1082, host: 'bottom-left-house', style: 'door', angle: 0 },
  { day: 2, x: 300, y: 302, host: 'upper-left-house', style: 'window', angle: 0 },
  { day: 3, x: 1272, y: 302, host: 'upper-right-house', style: 'window', angle: 0 },
  { day: 4, x: 122, y: 170, host: 'sky', style: 'beacon', angle: 0 },
  { day: 5, x: 1462, y: 166, host: 'sky', style: 'beacon', angle: 0 },
  { day: 6, x: 1082, y: 1082, host: 'bottom-right-house', style: 'door', angle: 0 },
  { day: 7, x: 96, y: 502, host: 'left-wall', style: 'niche', angle: 0 },
  { day: 8, x: 1132, y: 266, host: 'right-house', style: 'niche', angle: 0 },
  { day: 9, x: 424, y: 1092, host: 'bottom-left-house', style: 'door', angle: 0 },
  { day: 10, x: 1508, y: 704, host: 'sheep-field', style: 'beacon', angle: 0 },
  { day: 11, x: 392, y: 152, host: 'left-angel', style: 'beacon', angle: 0 },
  { day: 12, x: 586, y: 852, host: 'wreath-path', style: 'niche', angle: 0 },
  { day: 13, x: 800, y: 268, host: 'central-arch', style: 'beacon', angle: 0 },
  { day: 14, x: 196, y: 642, host: 'left-magi', style: 'niche', angle: 0 },
  { day: 15, x: 1466, y: 332, host: 'right-house', style: 'niche', angle: 0 },
  { day: 16, x: 1118, y: 562, host: 'circle-edge', style: 'niche', angle: 0 },
  { day: 17, x: 1506, y: 442, host: 'right-wall', style: 'niche', angle: 0 },
  { day: 18, x: 96, y: 286, host: 'upper-left-house', style: 'window', angle: 0 },
  { day: 19, x: 1468, y: 962, host: 'bottom-right-house', style: 'niche', angle: 0 },
  { day: 20, x: 534, y: 562, host: 'circle-edge', style: 'niche', angle: 0 },
  { day: 21, x: 800, y: 148, host: 'star-of-bethlehem', style: 'beacon', angle: 0 },
  { day: 22, x: 170, y: 1146, host: 'bottom-left-corner', style: 'beacon', angle: 0 },
  { day: 23, x: 1448, y: 424, host: 'right-house', style: 'niche', angle: 0 },
  { day: 24, x: 1090, y: 872, host: 'wreath-path', style: 'niche', angle: 0 },
];

/** Dimensiones del viewBox de la escena, usadas para convertir a porcentajes. */
export const SCENE_VIEWBOX = { width: 1600, height: 1200 };

/**
 * Devuelve la posición de una casilla.
 * @param {number} day
 * @returns {DaySpot | undefined}
 */
export function getSpot(day) {
  return SCENE_SPOTS.find((spot) => spot.day === day);
}

/**
 * Convierte la posición de una casilla a coordenadas relativas (0-1).
 * @param {DaySpot} spot
 * @returns {{x: number, y: number}}
 */
export function toRelative(spot) {
  return {
    x: spot.x / SCENE_VIEWBOX.width,
    y: spot.y / SCENE_VIEWBOX.height,
  };
}

export default SCENE_SPOTS;
