/**
 * Árboles de la aldea de Belén.
 *
 * Los cipreses y pinos del desierto son la vegetación característica de la
 * escena. Se dibujan con una silueta escalonada (como en la ilustración de
 * referencia) y se repiten en distintos tamaños.
 */

import { SCENE_COLORS } from '../shapes.js';

/** Tonos disponibles, del más oscuro al más claro. */
const TONES = ['#2c4a3c', '#355745', '#3d634e'];

/**
 * Ciprés / pino con ramas escalonadas.
 *
 * @param {object} options
 * @param {number} options.x      Posición horizontal de la base.
 * @param {number} options.y      Posición vertical de la base (el suelo).
 * @param {number} [options.scale]
 * @param {boolean} [options.flip]
 * @param {number} [options.tone] 0, 1 o 2 (tono del follaje).
 * @returns {string}
 */
export function drawCypress(options) {
  const { x, y, scale = 1, flip = false, tone = 0 } = options;

  const height = 210;
  const maxWidth = 34;
  const tiers = 9;
  const color = TONES[tone % TONES.length];

  // Perfil escalonado: sube por el lado derecho y baja por el izquierdo.
  const side = [];
  for (let index = 1; index <= tiers; index += 1) {
    const ratio = index / tiers;
    const yPoint = -height + ratio * height;
    const width = maxWidth * ratio;
    side.push([width * 0.55, yPoint - (height / tiers) * 0.55]);
    side.push([width, yPoint]);
  }

  let outline = `M 0 ${-height}`;
  side.forEach(([px, py]) => {
    outline += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
  });
  outline += ` L ${(maxWidth * 0.16).toFixed(1)} 0`;
  for (let index = side.length - 1; index >= 0; index -= 1) {
    const [px, py] = side[index];
    outline += ` L ${(-px).toFixed(1)} ${py.toFixed(1)}`;
  }
  outline += ' Z';

  const texture = side
    .filter((_, index) => index % 3 === 0)
    .map(([px, py]) => {
      const yPoint = py + 6;
      return `M ${(-px * 0.8).toFixed(1)} ${yPoint.toFixed(1)} L ${(px * 0.8).toFixed(1)} ${yPoint.toFixed(1)}`;
    })
    .join(' ');

  const tree = `
    <path d="M -3 0 L -2 -26 L 2 -26 L 3 0 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.85"/>
    <path d="${outline}" fill="${color}"/>
    <path d="${texture}" stroke="${SCENE_COLORS.violetLight}" stroke-width="1.2" fill="none" opacity="0.28"/>
    <path d="M 0 ${-height + 16} L 0 -8" stroke="${SCENE_COLORS.violetLight}" stroke-width="1.4" opacity="0.3"/>`;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${tree}</g>`;
}

/**
 * Mata de hierba o arbusto bajo.
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y
 * @param {number} [options.scale]
 * @returns {string}
 */
export function drawShrub(options) {
  const { x, y, scale = 1 } = options;

  const shrub = `
    <path d="M -30 0 Q -34 -20 -16 -24 Q -6 -38 6 -25 Q 24 -30 28 -10 Q 22 4 0 4 Z"
      fill="${SCENE_COLORS.violetLight}" opacity="0.85"/>
    <path d="M -22 -6 Q -26 -18 -12 -20" stroke="${SCENE_COLORS.violetDeep}" stroke-width="1.6" fill="none" opacity="0.5"/>
    <path d="M 4 -20 Q 12 -30 20 -18" stroke="${SCENE_COLORS.violetDeep}" stroke-width="1.6" fill="none" opacity="0.5"/>`;

  return `<g transform="translate(${x} ${y}) scale(${scale})">${shrub}</g>`;
}

export default drawCypress;
