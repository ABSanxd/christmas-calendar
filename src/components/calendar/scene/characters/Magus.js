/**
 * Un Rey Mago montado en su camello.
 *
 * Se dibuja con el origen en el lomo del camello, de forma que se pueda
 * colocar sobre cualquier animal y escalar de forma independiente.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Punto donde se apoya (lomo del camello).
 * @param {number} [options.scale]
 * @param {boolean} [options.flip]
 * @param {string} [options.robe]   Color del manto.
 * @param {string} [options.robeDark]
 * @param {string} [options.gift]    Color del regalo que lleva.
 * @returns {string}
 */
export function drawMagus(options) {
  const {
    x,
    y,
    scale = 1,
    flip = false,
    robe = SCENE_COLORS.violet,
    robeDark = SCENE_COLORS.violetDeep,
    gift = '#c9a24a',
  } = options;

  const skin = '#e0b48d';

  const magus = `
    <!-- Manto que cae sobre el lomo -->
    <path d="M -30 4 Q -26 -34 -8 -50 Q 12 -56 26 -42 Q 34 -22 32 4 Z" fill="${robe}"/>
    <path d="M 6 -50 Q 26 -44 32 4 L 14 4 Q 12 -30 6 -50 Z" fill="${robeDark}" opacity="0.55"/>
    <path d="M -30 0 Q 0 10 32 0 L 32 6 Q 0 16 -30 6 Z" fill="${SCENE_COLORS.gold}" opacity="0.55"/>

    <!-- Regazo y regalo -->
    <path d="M -16 -18 Q 0 -26 16 -18 L 14 -2 Q 0 4 -14 -2 Z" fill="${robeDark}" opacity="0.4"/>
    <rect x="2" y="-30" width="20" height="18" rx="2" fill="${gift}"/>
    <rect x="2" y="-30" width="20" height="18" rx="2" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="1.4" opacity="0.8"/>
    <path d="M 12 -30 L 12 -12 M 2 -23 L 22 -23" stroke="${SCENE_COLORS.goldLight}" stroke-width="1.6" opacity="0.85"/>
    <path d="M 12 -30 Q 6 -38 12 -40 Q 18 -38 12 -30 Z" fill="${SCENE_COLORS.goldLight}"/>

    <!-- Brazo -->
    <path d="M 18 -44 Q 26 -34 18 -28" stroke="${robe}" stroke-width="9" fill="none" stroke-linecap="round"/>

    <!-- Torso y hombros -->
    <path d="M -22 -52 Q -6 -74 12 -66 Q 26 -60 26 -44 Q 10 -34 -22 -44 Z" fill="${robe}"/>
    <path d="M -20 -50 Q -6 -66 10 -60" stroke="${SCENE_COLORS.gold}" stroke-width="2.6" fill="none" opacity="0.7"/>

    <!-- Cabeza -->
    <circle cx="-2" cy="-80" r="13" fill="${skin}"/>
    <path d="M -15 -84 Q -2 -98 11 -82 Q -2 -90 -15 -84 Z" fill="#6b563c" opacity="0.85"/>
    <circle cx="-6" cy="-80" r="1.6" fill="${SCENE_COLORS.ink}"/>
    <circle cx="3" cy="-80" r="1.6" fill="${SCENE_COLORS.ink}"/>
    <path d="M -7 -74 Q -1 -71 5 -75" stroke="${SCENE_COLORS.ink}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path d="M -9 -73 Q -2 -68 6 -73" stroke="#6b563c" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.7"/>

    <!-- Corona -->
    <path d="M -16 -89 L -16 -98 L -10 -93 L -4 -100 L 2 -93 L 8 -100 L 13 -93 L 12 -89 Z" fill="${SCENE_COLORS.gold}"/>
    <path d="M -16 -89 L 12 -89" stroke="${SCENE_COLORS.goldLight}" stroke-width="1.4"/>
    <circle cx="-2" cy="-102" r="3" fill="${SCENE_COLORS.goldLight}"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${magus}</g>`;
}

export default drawMagus;
