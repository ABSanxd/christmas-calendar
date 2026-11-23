/**
 * Pastor con su cayado.
 *
 * Figura sencilla pero con las manos, el manto y el cayado bien definidos,
 * para que se lea con claridad junto al rebaño.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo bajo los pies.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip]
 * @param {string} [options.robe]
 * @returns {string}
 */
export function drawShepherd(options) {
  const { x, y, scale = 1, flip = false, robe = SCENE_COLORS.sandDark } = options;

  const skin = '#dfb892';
  const robeDark = SCENE_COLORS.roseDeep;

  const shepherd = `
    <!-- Cayado -->
    <path d="M 24 -132 L 26 0" stroke="${SCENE_COLORS.roseDeep}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 24 -132 Q 24 -142 18 -142" stroke="${SCENE_COLORS.roseDeep}" stroke-width="4" fill="none" stroke-linecap="round"/>

    <!-- Manto -->
    <path d="M -22 0 Q -24 -60 -10 -82 Q 0 -96 12 -84 Q 24 -64 24 0 Z" fill="${robe}"/>
    <path d="M 4 -88 Q 22 -70 24 0 L 8 0 Q 8 -50 4 -88 Z" fill="${robeDark}" opacity="0.45"/>
    <path d="M -22 -2 Q 0 8 24 -2 L 24 2 Q 0 12 -22 2 Z" fill="${robeDark}" opacity="0.5"/>

    <!-- Brazo que sujeta el cayado -->
    <path d="M 14 -72 Q 24 -62 24 -50" stroke="${robe}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="-48" r="4" fill="${skin}"/>

    <!-- Brazo extendido -->
    <path d="M -14 -70 Q -26 -58 -24 -44" stroke="${robe}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="-24" cy="-42" r="4" fill="${skin}"/>

    <!-- Cabeza -->
    <circle cx="0" cy="-104" r="13" fill="${skin}"/>
    <path d="M -13 -108 Q 0 -122 13 -106 Q 0 -114 -13 -108 Z" fill="#7a6247" opacity="0.9"/>
    <circle cx="-4" cy="-104" r="1.6" fill="${SCENE_COLORS.ink}"/>
    <circle cx="5" cy="-104" r="1.6" fill="${SCENE_COLORS.ink}"/>
    <path d="M -4 -97 Q 1 -94 6 -98" stroke="${SCENE_COLORS.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>

    <!-- Pañuelo -->
    <path d="M -14 -112 Q 0 -126 14 -110 L 12 -104 Q 0 -116 -12 -104 Z" fill="${SCENE_COLORS.rose}"/>
    <path d="M 12 -110 Q 22 -106 20 -94 Q 14 -98 10 -104 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.8"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${shepherd}</g>`;
}

export default drawShepherd;
