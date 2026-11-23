/**
 * Camello (dromedario) del camino de los Reyes Magos.
 *
 * Silueta de una joroba, cuello largo y curvado y patas finas, tal como
 * aparece en la ilustración de referencia.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo bajo las patas.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip] Mira hacia la izquierda si es `true`.
 * @returns {string}
 */
export function drawCamel(options) {
  const { x, y, scale = 1, flip = false } = options;

  const hide = '#c99a63';
  const hideDark = '#a97c4b';
  const hideLight = '#dcb483';

  const camel = `
    <!-- Patas -->
    <path d="M -26 -58 L -30 -34 L -26 -6 L -18 -6 L -18 -36 L -16 -58 Z" fill="${hideDark}"/>
    <path d="M -6 -60 L -8 -36 L -12 -6 L -4 -6 L 0 -36 L 2 -60 Z" fill="${hideDark}"/>
    <path d="M 16 -58 L 18 -34 L 22 -6 L 30 -6 L 26 -36 L 26 -58 Z" fill="${hideDark}"/>
    <path d="M 32 -56 L 34 -32 L 30 -6 L 38 -6 L 42 -34 L 40 -56 Z" fill="${hide}"/>
    <path d="M -26 -6 L -18 -6 L -18 -2 L -26 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M -12 -6 L -4 -6 L -4 -2 L -12 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M 22 -6 L 30 -6 L 30 -2 L 22 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M 30 -6 L 38 -6 L 38 -2 L 30 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>

    <!-- Cola -->
    <path d="M -38 -66 Q -48 -54 -45 -40" stroke="${hideDark}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="-45" cy="-38" r="4" fill="${SCENE_COLORS.roseDeep}"/>

    <!-- Cuerpo -->
    <path d="M -34 -58 Q -44 -84 -24 -98 Q -6 -108 12 -96 Q 30 -86 34 -60 Q 20 -50 -6 -52 Q -26 -54 -34 -58 Z" fill="${hide}"/>

    <!-- Joroba -->
    <path d="M -22 -94 Q -10 -120 8 -100 Q -6 -92 -22 -94 Z" fill="${hideLight}"/>
    <path d="M -20 -94 Q -10 -112 2 -102" stroke="${hideDark}" stroke-width="1.6" fill="none" opacity="0.6"/>

    <!-- Cuello -->
    <path d="M 22 -92 Q 34 -110 32 -128 Q 31 -140 38 -144" stroke="${hide}" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M 24 -96 Q 33 -112 32 -128" stroke="${hideLight}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>

    <!-- Cabeza -->
    <ellipse cx="40" cy="-146" rx="11" ry="8" transform="rotate(-18 40 -146)" fill="${hide}"/>
    <ellipse cx="50" cy="-142" rx="7" ry="5" transform="rotate(-18 50 -142)" fill="${hideDark}"/>
    <circle cx="47" cy="-149" r="1.6" fill="${SCENE_COLORS.ink}"/>
    <path d="M 38 -152 Q 34 -158 38 -160" stroke="${hideDark}" stroke-width="2" fill="none" stroke-linecap="round"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${camel}</g>`;
}

export default drawCamel;
