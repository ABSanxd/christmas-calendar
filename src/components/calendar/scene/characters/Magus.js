/**
 * Un Rey Mago, de pie, con su corona y su regalo.
 *
 * Comparte con María, José y los pastores el mismo sistema de proporciones y
 * el mismo lenguaje de ilustración: cabeza ancha, ojos con brillo, mejillas
 * sonrosadas, túnica amplia con pliegues, banda clara en el bajo, filete
 * dorado y cinturón con hebilla.
 *
 * De los tres reyes se distinguen por el **color de la túnica** (verde,
 * amarillo y rojo), por la **corona** con sus gemas y por el **regalo** que
 * llevan en las manos:
 *
 * - `coffer`: un cofre abierto lleno de **oro**.
 * - `cup`: una copa de **incienso**, con su humo.
 * - `bowl`: una copa de **mirra**.
 *
 * Los reyes son personas mayores, así que llevan **barba**, a diferencia de
 * los pastores, que son jóvenes.
 *
 * El origen está en el suelo, para poder colocarlo y escalarlo con libertad.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo donde se apoya.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip]
 * @param {string} [options.robe]      Color de la túnica.
 * @param {string} [options.robeDark]
 * @param {string} [options.hem]       Banda clara del bajo.
 * @param {string} [options.accent]    Color del manto de los hombros.
 * @param {string} [options.accentDark]
 * @param {'coffer' | 'cup' | 'bowl'} [options.gift]  Tipo de regalo.
 * @param {string} [options.giftColor]  Color del regalo.
 * @param {string} [options.beard]
 * @param {string} [options.beardLight]
 * @param {string} [options.skin]
 * @param {string} [options.hair]
 * @returns {string}
 */
export function drawMagus(options) {
  const {
    x,
    y,
    scale = 1,
    flip = false,
    robe = '#3f7a55',
    robeDark = '#2b5b3c',
    hem = '#e8dcc0',
    accent = '#c6a568',
    accentDark = '#8d713f',
    gift = 'coffer',
    giftColor = '#c9a24a',
    beard = '#5a4029',
    beardLight = '#74573a',
    skin = '#e8c2a0',
    skinShade = '#d0a585',
    hair = '#4a3524',
    hairLight = '#6b5038',
    blush = '#ee9aa4',
    ink = '#3a2b3f',
  } = options;

  /** Cofre abierto con el oro dentro. */
  const coffer = `
    <path d="M -25 -56 L -22 -82 L 22 -82 L 25 -56 Z" fill="#7d5334" stroke="#5b3a22" stroke-width="1.2"/>
    <path d="M -22 -82 L -24 -91 L 24 -91 L 22 -82 Z" fill="#96683f" stroke="#5b3a22" stroke-width="1.2"/>
    <path d="M -12 -56 L -10 -82 M 12 -56 L 10 -82" stroke="${SCENE_COLORS.goldDeep}" stroke-width="2" opacity="0.7"/>
    <ellipse cx="0" cy="-82" rx="21" ry="5" fill="${giftColor}"/>
    <circle cx="-11" cy="-85" r="4" fill="#e0b558"/>
    <circle cx="-1" cy="-87" r="4.4" fill="#f2d488"/>
    <circle cx="10" cy="-85" r="4" fill="#e0b558"/>
    <circle cx="-1" cy="-87" r="4.4" fill="none" stroke="#b8892f" stroke-width="0.9"/>
    <rect x="-5" y="-72" width="10" height="11" rx="2" fill="${SCENE_COLORS.gold}"/>
    <rect x="-5" y="-72" width="10" height="11" rx="2" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1" opacity="0.85"/>
    <circle cx="0" cy="-67" r="1.8" fill="${SCENE_COLORS.goldDeep}"/>
  `;

  /** Copa de incienso, con el humo subiendo. */
  const cup = `
    <path d="M 0 -96 Q -6 -106 1 -116 Q 6 -123 1 -132"
          stroke="#ffffff" stroke-width="2.4" fill="none" opacity="0.9" stroke-linecap="round"/>
    <path d="M -14 -90 L -11 -74 Q 0 -70 11 -74 L 14 -90 Z"
          fill="${giftColor}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-90" rx="14" ry="4" fill="${SCENE_COLORS.goldLight}"/>
    <!-- El incienso, dentro de la copa -->
    <ellipse cx="0" cy="-90" rx="10" ry="2.6" fill="#8d8068"/>
    <circle cx="-4" cy="-91" r="2.4" fill="#a1937a"/>
    <circle cx="4" cy="-91" r="2" fill="#7a6d58"/>
    <path d="M -14 -87 Q -22 -84 -19 -76" stroke="${giftColor}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M 14 -87 Q 22 -84 19 -76" stroke="${giftColor}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <rect x="-3" y="-72" width="6" height="12" rx="2" fill="${giftColor}"/>
    <ellipse cx="0" cy="-60" rx="9" ry="3" fill="${giftColor}"/>
    <ellipse cx="0" cy="-61" rx="9" ry="3" fill="${SCENE_COLORS.goldLight}" opacity="0.35"/>
  `;

  /** Copa de mirra: un recipiente ancho con la resina dentro. */
  const bowl = `
    <path d="M -16 -90 L -11 -76 Q 0 -72 11 -76 L 16 -90 Z"
          fill="${giftColor}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.2"/>
    <ellipse cx="0" cy="-90" rx="16" ry="4.2" fill="${SCENE_COLORS.goldLight}"/>
    <!-- La mirra, dentro de la copa -->
    <ellipse cx="0" cy="-90" rx="12" ry="3" fill="#6b4a3a"/>
    <circle cx="-6" cy="-91" r="3.2" fill="#7d5945"/>
    <circle cx="4" cy="-92" r="2.8" fill="#5d4033"/>
    <circle cx="10" cy="-90" r="2.2" fill="#7d5945"/>
    <path d="M -16 -86 Q -23 -83 -20 -76" stroke="${giftColor}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M 16 -86 Q 23 -83 20 -76" stroke="${giftColor}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <rect x="-3.5" y="-75" width="7" height="12" rx="2" fill="${giftColor}"/>
    <ellipse cx="0" cy="-63" rx="10" ry="3" fill="${giftColor}"/>
    <ellipse cx="0" cy="-64" rx="10" ry="3" fill="${SCENE_COLORS.goldLight}" opacity="0.35"/>
  `;

  const giftShape = gift === 'coffer' ? coffer : gift === 'bowl' ? bowl : cup;

  const magus = `
    <!-- === CUELLO === -->
    <path d="M -5 -124 L -11 -102 Q 0 -99 11 -102 L 5 -124 Z" fill="${skinShade}"/>

    <!-- === TÚNICA REAL === -->
    <path d="M -19 -114
             C -25 -88 -29 -50 -32 -4
             Q 0 4 32 -4
             C 29 -50 25 -88 19 -114
             Q 0 -104 -19 -114 Z"
          fill="${robe}" stroke="${robeDark}" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Pliegues -->
    <path d="M -10 -114 C -14 -88 -16 -50 -16 -2" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 9 -114 C 13 -88 15 -50 15 -2" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 0 -116 C -1 -88 -1 -50 -1 2" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.22"/>
    <!-- Luz central -->
    <path d="M -3 -115 C -5 -88 -6 -50 -6 2 L 6 2 C 6 -50 6 -88 3 -115 Z"
          fill="${SCENE_COLORS.goldLight}" opacity="0.13"/>
    <!-- Sombra en los bordes -->
    <path d="M -19 -114 C -23 -88 -27 -48 -30 -6 Q -25 -3 -21 -5
             C -17 -48 -13 -88 -11 -113 Z" fill="${robeDark}" opacity="0.22"/>
    <path d="M 19 -114 C 23 -88 27 -48 30 -6 Q 25 -3 21 -5
             C 17 -48 13 -88 11 -113 Z" fill="${robeDark}" opacity="0.22"/>
    <!-- Banda clara del bajo y filete dorado -->
    <path d="M -31 -18 Q 0 -6 31 -18 L 32 -4 Q 0 4 -32 -4 Z" fill="${hem}"/>
    <path d="M -31 -20 Q 0 -8 31 -20" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" fill="none" opacity="0.85"/>

    <!-- === CINTURÓN === -->
    <path d="M -26 -76 Q 0 -69 26 -76 L 26 -66 Q 0 -59 -26 -66 Z" fill="${accentDark}"/>
    <path d="M -26 -76 Q 0 -69 26 -76" stroke="#000000" stroke-width="1" fill="none" opacity="0.25"/>
    <rect x="-6.5" y="-73" width="13" height="12" rx="2.5" fill="${SCENE_COLORS.gold}"/>
    <rect x="-6.5" y="-73" width="13" height="12" rx="2.5" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1" opacity="0.85"/>
    <path d="M 0 -73 L 0 -61" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.4" opacity="0.85"/>

    <!-- === MANGAS DE CAMPANA === -->
    <g transform="translate(-16 -110) rotate(12)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
      <path d="M -9.8 27 C -5.5 35 5.5 35 9.8 27 C 10.6 31 8 35 0 36
               C -8 35 -10.6 31 -9.8 27 Z" fill="${hem}"/>
    </g>
    <g transform="translate(16 -110) rotate(-12)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
      <path d="M -9.8 27 C -5.5 35 5.5 35 9.8 27 C 10.6 31 8 35 0 36
               C -8 35 -10.6 31 -9.8 27 Z" fill="${hem}"/>
    </g>

    <!-- === MANTO DE LOS HOMBROS === -->
    <path d="M -20 -116
             C -27 -100 -29 -84 -28 -70
             C -21 -77 -12 -81 0 -81
             C 12 -81 21 -77 28 -70
             C 29 -84 27 -100 20 -116
             Q 0 -106 -20 -116 Z"
          fill="${accent}" stroke="${accentDark}" stroke-width="1" stroke-opacity="0.45"/>
    <path d="M -28 -70 C -21 -77 -12 -81 0 -81 C 12 -81 21 -77 28 -70"
          stroke="${accentDark}" stroke-width="1.6" fill="none" opacity="0.7"/>

    <!-- === REGALO (en las dos manos) === -->
    <g transform="translate(0 -78) scale(0.9) translate(0 78)">
      ${giftShape}
    </g>

    <!-- === MANOS (sujetan el regalo) === -->
    <ellipse cx="-23" cy="-77" rx="4.6" ry="3.6" fill="${skin}" transform="rotate(12 -23 -77)"/>
    <ellipse cx="23" cy="-77" rx="4.6" ry="3.6" fill="${skin}" transform="rotate(-12 23 -77)"/>

    <!-- === CARA === -->
    <path d="M 0 -146 C 12 -146 21 -138 21 -128
             C 21 -119 17 -113 11 -111 L -11 -111
             C -17 -113 -21 -119 -21 -128 C -21 -138 -12 -146 0 -146 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.35"/>
    <ellipse cx="12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.35"/>
    <!-- Cejas -->
    <path d="M -12 -138 Q -7 -141 -2 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.85" stroke-linecap="round"/>
    <path d="M 2 -138 Q 7 -141 12 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.85" stroke-linecap="round"/>
    <!-- Ojos -->
    <ellipse cx="-7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <ellipse cx="7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <circle cx="-8.2" cy="-133" r="1.5" fill="#ffffff"/>
    <circle cx="5.8" cy="-133" r="1.5" fill="#ffffff"/>
    <!-- Naricilla -->
    <ellipse cx="0" cy="-126" rx="1.6" ry="1.1" fill="${skinShade}" opacity="0.7"/>

    <!-- === BARBA (los reyes son mayores que los pastores) === -->
    <path d="M -14 -125
             C -17 -117 -15 -110 -11 -104 C -7 -99 -4 -97 0 -96
             C 4 -97 7 -99 11 -104 C 15 -110 17 -117 14 -125
             Q 0 -128 -14 -125 Z"
          fill="${beard}"/>
    <path d="M -9 -121 C -6 -117 -6 -110 -8 -106" stroke="${beardLight}" stroke-width="1.6" fill="none" opacity="0.45" stroke-linecap="round"/>
    <!-- Boca, sobre la barba -->
    <path d="M -4.2 -121 Q 0 -117.8 4.2 -121" stroke="#f0c9ad" stroke-width="1.9" fill="none" stroke-linecap="round"/>

    <!-- === PELO, bajo la corona === -->
    <path d="M -19 -138
             C -19 -148 -11 -154 0 -154
             C 11 -154 19 -148 19 -138
             C 16 -144 8 -148 0 -148
             C -8 -148 -16 -144 -19 -138 Z"
          fill="${hair}"/>
    <path d="M -12 -145 C -7 -150 -2 -151 3 -150" stroke="${hairLight}" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round"/>

    <!-- === CORONA === -->
    <path d="M -21 -140 L -22 -157 L -14.5 -147 L -7 -161 L 0 -148
             L 7 -161 L 14.5 -147 L 22 -157 L 21 -140 Z"
          fill="${SCENE_COLORS.gold}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1" stroke-opacity="0.7"/>
    <path d="M -21 -140 L 21 -140" stroke="${SCENE_COLORS.goldLight}" stroke-width="2"/>
    <path d="M -19 -145 L 19 -145" stroke="${SCENE_COLORS.goldLight}" stroke-width="1" opacity="0.45"/>
    <circle cx="0" cy="-164" r="3.4" fill="${SCENE_COLORS.goldLight}"/>
    <circle cx="-14.5" cy="-150" r="2.2" fill="${giftColor}"/>
    <circle cx="14.5" cy="-150" r="2.2" fill="${giftColor}"/>
    <circle cx="0" cy="-150" r="2.4" fill="${SCENE_COLORS.goldBright}"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${magus}</g>`;
}

export default drawMagus;
