/**
 * Oveja del rebaño de los pastores.
 *
 * La lana es un conjunto de mechones redondos; la cabeza es **ovalada y
 * oscura**, con un copete de lana encima, dos **orejas grandes** que cuelgan
 * a los lados y **dos ojitos blancos** con un **puntito negro** en cada uno,
 * que la hacen look tierna.
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
  const face = '#453e54';

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

    <!-- Cabeza ovalada y oscura -->
    <ellipse cx="-24" cy="-23" rx="11.5" ry="13" fill="${face}"/>

    <!-- Copete de lana sobre la cabeza -->
    <ellipse cx="-23" cy="-37" rx="10" ry="7" fill="${wool}"/>

    <!-- Orejas que cuelgan a los lados -->
    <path d="M -32 -30 C -38 -34 -45 -32 -46 -27 C -46 -22 -41 -20 -37 -22
             C -34 -24 -32 -27 -32 -30 Z" fill="${face}"/>
    <path d="M -17 -31 C -12 -35 -6 -34 -5 -29 C -4 -25 -9 -22 -13 -24
             C -15 -25 -16 -28 -17 -31 Z" fill="${face}"/>

    <!-- Ojitos blancos con un puntito negro -->
    <ellipse cx="-28.5" cy="-25" rx="4.8" ry="5.4" fill="#ffffff"/>
    <ellipse cx="-19.5" cy="-25" rx="4.8" ry="5.4" fill="#ffffff"/>
    <circle cx="-28" cy="-24.2" r="2.5" fill="${SCENE_COLORS.ink}"/>
    <circle cx="-19" cy="-24.2" r="2.5" fill="${SCENE_COLORS.ink}"/>
    <circle cx="-29" cy="-25.8" r="1" fill="#ffffff"/>
    <circle cx="-20" cy="-25.8" r="1" fill="#ffffff"/>

    <!-- Naricilla -->
    <ellipse cx="-27" cy="-16" rx="2.6" ry="1.9" fill="#efe6d8" opacity="0.8"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${sheep}</g>`;
}

export default drawSheep;
