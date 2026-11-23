/**
 * Oveja del rebaño de los pastores.
 *
 * La lana es un conjunto de mechones redondos; la cabeza es **ovalada** y
 * oscura, con dos orejas, al contrario que un círculo.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Posición de las patas traseras (el suelo).
 * @param {number} [options.scale]
 * @param {boolean} [options.flip] Mira hacia la izquierda si es `true`.
 * @returns {string}
 */
export function drawSheep(options) {
  const { x, y, scale = 1, flip = false } = options;

  const wool = '#f4f0e6';
  const woolShade = '#ddd6c6';
  const face = '#4a4356';

  const sheep = `
    <!-- Patas -->
    <rect x="-19" y="-13" width="4" height="13" rx="2" fill="${face}" opacity="0.85"/>
    <rect x="-8" y="-12" width="4" height="12" rx="2" fill="${face}" opacity="0.7"/>
    <rect x="10" y="-12" width="4" height="12" rx="2" fill="${face}" opacity="0.7"/>
    <rect x="19" y="-13" width="4" height="13" rx="2" fill="${face}" opacity="0.85"/>

    <!-- Cola -->
    <circle cx="24" cy="-22" r="6" fill="${woolShade}"/>

    <!-- Cuerpo de lana: mechones superpuestos -->
    <ellipse cx="2" cy="-20" rx="24" ry="15" fill="${wool}"/>
    <circle cx="-13" cy="-25" r="10" fill="${wool}"/>
    <circle cx="-2" cy="-31" r="11" fill="${wool}"/>
    <circle cx="10" cy="-27" r="10" fill="${wool}"/>
    <circle cx="17" cy="-21" r="8" fill="${wool}"/>
    <circle cx="-8" cy="-18" r="8" fill="${woolShade}" opacity="0.55"/>
    <path d="M -20 -18 Q -6 -10 20 -16" stroke="${woolShade}" stroke-width="1.4" fill="none" opacity="0.7"/>

    <!-- Cabeza ovalada -->
    <ellipse cx="-24" cy="-24" rx="11" ry="13" fill="${face}"/>
    <ellipse cx="-28" cy="-20" rx="5" ry="4" fill="#5d5570" opacity="0.8"/>

    <!-- Orejas -->
    <path d="M -22 -34 Q -30 -42 -34 -36 Q -32 -28 -24 -30 Z" fill="${face}"/>
    <path d="M -27 -35 Q -33 -39 -35 -35 Q -33 -31 -28 -31 Z" fill="#5d5570" opacity="0.7"/>
    <path d="M -19 -35 Q -16 -43 -22 -44 Q -26 -41 -24 -34 Z" fill="${face}"/>

    <!-- Ojo y hocico -->
    <circle cx="-26" cy="-26" r="1.7" fill="${SCENE_COLORS.ivory}"/>
    <circle cx="-31" cy="-21" r="1.4" fill="#332e42" opacity="0.8"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${sheep}</g>`;
}

export default drawSheep;
