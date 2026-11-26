/**
 * Camello (dromedario) de la caravana de los Reyes Magos.
 *
 * Silueta de una joroba, cuello largo y curvado y patas finas, tal como
 * aparece en la ilustración de referencia.
 *
 * Encima de la joroba lleva la **carga**: una lona, sacos, un arcón y el
 * cordel que lo sujeta todo. Como los tres camellos van en fila, la carga es
 * lo que los distingue entre sí (cada uno lleva su propio tono de lona y de
 * sacos).
 *
 * El origen está en el suelo, para poder colocarlo y escalarlo con libertad.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo bajo las patas.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip] Mira hacia la izquierda si es `true`.
 * @param {string} [options.blanket]      Color de la lona de carga.
 * @param {string} [options.blanketDark]
 * @param {string} [options.sack]         Color de los sacos.
 * @param {string} [options.sackDark]
 * @param {string} [options.crate]        Color del arcón.
 * @param {boolean} [options.cargo]       Si lleva carga encima.
 * @returns {string}
 */
export function drawCamel(options) {
  const {
    x,
    y,
    scale = 1,
    flip = false,
    blanket = SCENE_COLORS.violet,
    blanketDark = SCENE_COLORS.violetDeep,
    sack = SCENE_COLORS.sand,
    sackDark = SCENE_COLORS.sandDark,
    crate = SCENE_COLORS.rose,
    cargo = true,
  } = options;

  const hide = '#c99a63';
  const hideDark = '#a97c4b';
  const hideLight = '#dcb483';

  const camel = `
    <!-- Patas -->
    <path d="M -26 -58 L -30 -34 L -26 -6 L -18 -6 L -18 -36 L -16 -58 Z" fill="${hideDark}"/>
    <path d="M -6 -60 L -8 -36 L -12 -6 L -4 -6 L 0 -36 L 2 -60 Z" fill="${hideDark}"/>
    <path d="M 12 -62 L 15 -36 L 19 -6 L 27 -6 L 24 -36 L 23 -62 Z" fill="${hideDark}"/>
    <path d="M 26 -60 L 29 -34 L 25 -6 L 33 -6 L 37 -34 L 34 -60 Z" fill="${hide}"/>
    <path d="M -26 -6 L -18 -6 L -18 -2 L -26 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M -12 -6 L -4 -6 L -4 -2 L -12 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M 19 -6 L 27 -6 L 27 -2 L 19 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
    <path d="M 25 -6 L 33 -6 L 33 -2 L 25 -2 Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>

    <!-- Cola -->
    <path d="M -38 -66 Q -48 -54 -45 -40" stroke="${hideDark}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="-45" cy="-38" r="4" fill="${SCENE_COLORS.roseDeep}"/>

    <!-- Cuerpo -->
    <path d="M -34 -58 Q -44 -84 -24 -98 Q -6 -108 12 -96 Q 30 -86 34 -60 Q 20 -50 -6 -52 Q -26 -54 -34 -58 Z" fill="${hide}"/>

    <!-- Joroba -->
    <path d="M -28 -88 Q -18 -148 10 -92 Q -6 -82 -28 -88 Z"
          fill="${hideLight}" stroke="${hideDark}" stroke-width="1.2" stroke-opacity="0.7"/>
    <path d="M -24 -89 Q -16 -126 2 -96" stroke="${hideDark}" stroke-width="1.6" fill="none" opacity="0.5"/>

    ${
      cargo
        ? `
    <!-- === CARGA ENCIMA DE LA JOROBA === -->
    <!-- Lona que cae por el lado de atrás -->
    <path d="M -28 -84 Q -26 -108 -14 -119 L -11 -111 Q -20 -100 -24 -81 Z" fill="${blanket}"/>
    <path d="M -24 -81 Q -20 -100 -11 -111" stroke="${blanketDark}" stroke-width="1.5" fill="none"/>
    <!-- Flecos de la lona -->
    <path d="M -24 -82 l -1 6 M -22 -90 l -1 6 M -18 -97 l 0 6"
          stroke="${blanketDark}" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Bulto grande, en la grupa -->
    <ellipse cx="-20" cy="-96" rx="9" ry="7" fill="${sack}"/>
    <path d="M -26 -99 Q -20 -95 -14 -99" stroke="${sackDark}" stroke-width="1.4" fill="none"/>
    <!-- Bulto pequeño, delante -->
    <ellipse cx="-4" cy="-93" rx="7" ry="5.5" fill="${sackDark}"/>
    <!-- Arcón, encima del bulto -->
    <rect x="-25" y="-115" width="13" height="11" rx="2" fill="${crate}"/>
    <rect x="-25" y="-115" width="13" height="11" rx="2" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.2" opacity="0.8"/>
    <path d="M -25 -110 L -12 -110 M -18 -115 L -18 -104" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.2" opacity="0.55"/>
    <!-- Cordel que sujeta la carga -->
    <path d="M -24 -90 Q -12 -104 10 -92" stroke="${SCENE_COLORS.sandDark}" stroke-width="2.2" fill="none" opacity="0.9"/>
    `
        : ''
    }

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
