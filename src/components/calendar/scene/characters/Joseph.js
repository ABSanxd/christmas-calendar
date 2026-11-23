/**
 * San José, de pie junto al pesebre.
 *
 * Comparte con el ángel y con María el mismo sistema de proporciones: cabeza
 * ancha y baja, ojos grandes con brillo, mejillas sonrosadas y una sonrisa
 * corta. Todo está construido con curvas Bézier.
 *
 * Lectura del personaje:
 * - manto terracota largo con pliegues y un forro más oscuro en el lateral;
 * - capa oscura echada sobre un hombro;
 * - capucha clara sobre la cabeza (como el velo de María, para que el grupo
 *   se lea como una familia);
 * - barba y bigote castaños que le framing la cara;
 * - cayado en la mano exterior y la otra mano abierta hacia el Niño.
 *
 * El origen está en el suelo, para poder colocarlo con libertad.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo donde se apoya.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip]
 * @returns {string}
 */
export function drawJoseph(options) {
  const { x, y, scale = 1, flip = false } = options;

  const skin = '#eecaa8';
  const skinShade = '#d6ab88';
  const robe = '#c08552';
  const robeDark = '#9c6540';
  const cloak = '#a56a45';
  const hood = '#f7f2e8';
  const hoodShade = '#ddd3c0';
  const hair = '#5a4029';
  const gold = '#e2bb59';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  const joseph = `
    <!-- === CAYADO === -->
    <path d="M -30 -162 L -30 -4" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M -30 -162 C -30 -174 -21 -175 -19 -166" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M -30 -162 L -30 -4" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>

    <!-- === MANTO LARGO === -->
    <path d="M -22 -128 C -26 -96 -26 -52 -25 0 Q 0 10 25 0
             C 26 -52 26 -96 22 -128 Q 0 -140 -22 -128 Z" fill="${robe}"/>
    <!-- Pliegues -->
    <path d="M -10 -130 C -14 -96 -15 -48 -14 2" stroke="${robeDark}" stroke-width="2.4" fill="none" opacity="0.32"/>
    <path d="M 8 -132 C 12 -96 13 -48 12 2" stroke="${robeDark}" stroke-width="2.4" fill="none" opacity="0.32"/>
    <path d="M 0 -134 C -1 -96 -1 -48 0 4" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.22"/>
    <!-- Luz central -->
    <path d="M -3 -134 C -5 -96 -5 -48 -4 4 L 4 4
             C 5 -48 5 -96 3 -134 Z" fill="${gold}" opacity="0.1"/>
    <!-- Forro oscuro en el lateral -->
    <path d="M 14 -132 C 19 -98 21 -50 20 2 L 25 0
             C 26 -52 26 -96 22 -128 Z" fill="${robeDark}" opacity="0.45"/>
    <!-- Dobladillo del bajo -->
    <path d="M -25 -8 Q 0 2 25 -8 L 25 0 Q 0 10 -25 0 Z" fill="${robeDark}" opacity="0.5"/>

    <!-- === CAPA SOBRE EL HOMBRO === -->
    <path d="M -20 -126 C -26 -138 -13 -148 5 -144
             C 13 -141 18 -134 17 -127
             C 7 -132 -6 -130 -13 -123 C -17 -119 -19 -121 -20 -126 Z"
          fill="${cloak}"/>
    <path d="M -19 -124 C -24 -110 -26 -90 -24 -72 C -20 -86 -18 -104 -16 -118 Z"
          fill="${cloak}" opacity="0.9"/>

    <!-- === BRAZO QUE SOSTIENE EL CAYADO === -->
    <path d="M -17 -116 C -25 -108 -29 -98 -29 -88" stroke="${robe}" stroke-width="11" fill="none" stroke-linecap="round"/>
    <ellipse cx="-29" cy="-85" rx="5" ry="4.2" fill="${skin}" transform="rotate(14 -29 -85)"/>

    <!-- === BRAZO ABIERTO HACIA EL NIÑO === -->
    <path d="M 15 -116 C 25 -110 32 -102 36 -94" stroke="${robe}" stroke-width="10.5" fill="none" stroke-linecap="round"/>
    <path d="M 15 -116 C 25 -110 32 -102 36 -94" stroke="${robeDark}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4"/>
    <ellipse cx="39" cy="-91" rx="4.8" ry="3.8" fill="${skin}" transform="rotate(-18 39 -91)"/>

    <!-- === CAPUCHA (detrás) === -->
    <path d="M 0 -158 C -23 -158 -31 -140 -30 -122 C -29 -110 -27 -100 -26 -92
             C -16 -102 -8 -107 0 -107 C 8 -107 16 -102 26 -92
             C 27 -100 29 -110 30 -122 C 31 -140 23 -158 0 -158 Z" fill="${hoodShade}"/>

    <!-- === CARA === -->
    <path d="M 0 -146 C 11 -146 20 -140 20 -129 C 19 -121 11 -116 0 -114
             C -11 -116 -19 -121 -20 -129 C -20 -140 -11 -146 0 -146 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-12" cy="-122" rx="4.6" ry="3" fill="${blush}" opacity="0.4"/>
    <ellipse cx="12" cy="-122" rx="4.6" ry="3" fill="${blush}" opacity="0.4"/>
    <!-- Cejas -->
    <path d="M -12 -138 Q -7 -141 -2 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="M 2 -138 Q 7 -141 12 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.75" stroke-linecap="round"/>
    <!-- Ojos -->
    <ellipse cx="-7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <ellipse cx="7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <circle cx="-8.2" cy="-133" r="1.5" fill="#ffffff"/>
    <circle cx="5.8" cy="-133" r="1.5" fill="#ffffff"/>

    <!-- === BARBA Y BIGOTE === -->
    <path d="M -12 -127 C -13 -113 -8 -104 0 -103 C 8 -104 13 -113 12 -127
             C 9 -122 5 -120 0 -120 C -5 -120 -9 -122 -12 -127 Z" fill="${hair}"/>
    <path d="M -8 -125 Q 0 -119 8 -125 Q 6 -118 0 -118 Q -6 -118 -8 -125 Z" fill="${hair}"/>
    <!-- Naricilla y sonrisa (sobre la barba) -->
    <ellipse cx="0" cy="-127" rx="1.5" ry="1.1" fill="${skinShade}" opacity="0.7"/>
    <path d="M -3.6 -113 Q 0 -110 3.6 -113" stroke="#f0cdb4" stroke-width="1.7" fill="none" stroke-linecap="round"/>

    <!-- === CAPUCHA DELANTERA (enmarca la cara) === -->
    <path d="M -25 -126 C -29 -147 -17 -160 0 -160 C 17 -160 29 -147 25 -126
             C 25 -116 26 -108 26 -100 C 21 -106 19 -114 18 -123
             C 16 -139 10 -148 0 -148 C -10 -148 -16 -139 -18 -123
             C -19 -114 -21 -106 -26 -100 C -26 -108 -25 -116 -25 -126 Z"
          fill="${hood}"/>
    <!-- Paños estrechos de la capucha sobre los hombros -->
    <path d="M -25 -124 C -28 -112 -28 -96 -26 -80 C -23 -94 -22 -108 -21 -116 Z" fill="${hood}"/>
    <path d="M 25 -124 C 28 -112 28 -96 26 -80 C 23 -94 22 -108 21 -116 Z" fill="${hood}"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${joseph}</g>`;
}

export default drawJoseph;
