/**
 * San José, de pie junto al pesebre.
 *
 * Comparte con el ángel y con María el mismo sistema de proporciones y el
 * mismo tipo de manto, pero más **recto**: al ser hombre, la silueta no se
 * abre en campana como la de María, sino que cae casi recta.
 *
 * Vestuario: manto naranja largo con banda crema y filete dorado en el bajo,
 * y encima un **chaleco verde** que cubre las mangas y el torso hasta
 * media figura, dejando el naranja solo en la parte de abajo.
 *
 * Cabeza: **sin velo**; pelo corto y ondulado en el mismo marrón de la
 * barba, construido con un casquete y una fila de círculos que forman el
 * flequillo. La cara es más recta que ovalada y la barba va en punta,
 * dejando la boca dentro de la piel y no sobre la barba.
 *
 * El cayado se mantiene tal cual.
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
  const vest = '#4c7f52';
  const vestDark = '#38603d';
  const cream = '#f7f2e8';
  const hair = '#5a4029';
  const hairLight = '#74573a';
  const gold = '#e2bb59';
  const goldLight = '#f8e3a6';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  const joseph = `
    <!-- === CUELLO (detrás del manto, como el de María) === -->
    <path d="M -5 -126 L -11 -101 Q 0 -98 11 -101 L 5 -126 Z" fill="${skinShade}"/>

    <!-- === MANTO NARANJA (recto, con el cuerpo igual que María) === -->
    <path d="M -18 -114 C -21 -84 -25 -42 -28 -3 Q 0 5 28 -3
             C 25 -42 21 -84 18 -114 Q 0 -104 -18 -114 Z"
          fill="${robe}" stroke="${robeDark}" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Pliegues -->
    <path d="M -9 -114 C -11 -84 -13 -42 -13 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 8 -114 C 10 -84 12 -42 12 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 0 -116 C -1 -84 -1 -42 -1 2" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.22"/>
    <!-- Luz central -->
    <path d="M -3 -115 C -5 -84 -5 -42 -5 2 L 5 2 C 5 -42 5 -84 3 -115 Z"
          fill="${goldLight}" opacity="0.13"/>
    <!-- Sombra en los bordes -->
    <path d="M -18 -114 C -20 -86 -23 -42 -25 -6 Q -21 -3 -18 -5
             C -15 -42 -12 -84 -10 -113 Z" fill="${robeDark}" opacity="0.22"/>
    <path d="M 18 -114 C 20 -86 23 -42 25 -6 Q 21 -3 18 -5
             C 15 -42 12 -84 10 -113 Z" fill="${robeDark}" opacity="0.22"/>
    <!-- Banda crema del bajo y filete dorado -->
    <path d="M -27 -16 Q 0 -4 27 -16 L 28 -3 Q 0 5 -28 -3 Z" fill="${cream}"/>
    <path d="M -27 -18 Q 0 -6 27 -18" stroke="${gold}" stroke-width="1.4" fill="none" opacity="0.8"/>

    <!-- === CHALECO VERDE ABIERTO (solo a los lados, el centro va naranja) === -->
    <path d="M -17 -114 C -19 -92 -20 -70 -20 -48 L -7 -44
             C -8 -70 -9 -92 -9 -114 Q -13 -120 -17 -114 Z"
          fill="${vest}" stroke="${vestDark}" stroke-width="1" stroke-opacity="0.4"/>
    <path d="M 17 -114 C 19 -92 20 -70 20 -48 L 7 -44
             C 8 -70 9 -92 9 -114 Q 13 -120 17 -114 Z"
          fill="${vest}" stroke="${vestDark}" stroke-width="1" stroke-opacity="0.4"/>
    <!-- Dobladillo de cada faldón -->
    <path d="M -20 -50 L -7 -46 L -7 -41 L -20 -45 Z" fill="${vestDark}" opacity="0.5"/>
    <path d="M 20 -50 L 7 -46 L 7 -41 L 20 -45 Z" fill="${vestDark}" opacity="0.5"/>

    <!-- === MANGAS VERDES: a la misma distancia que las de María === -->
    <!-- Brazo del cayado -->
    <g transform="translate(-12 -105) rotate(14)">
      <path d="M -7 0 C -10.5 10 -11.5 25 -8.5 35 C -4.5 42 4.5 42 8.5 35
               C 11.5 25 10.5 10 7 0 C 2.5 -3 -2.5 -3 -7 0 Z"
            fill="${vest}" stroke="${vestDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -7 0 C -10.5 10 -11.5 25 -8.5 35 C -6 39 -2 40 0 40
               C -4 32 -5 17 -3 0 Z" fill="${vestDark}" opacity="0.28"/>
    </g>
    <ellipse cx="-22" cy="-66" rx="4.4" ry="3.4" fill="${skin}" transform="rotate(14 -22 -66)"/>
    <!-- Brazo abierto hacia el Niño -->
    <g transform="translate(13 -105) rotate(-9)">
      <path d="M -7 0 C -10.5 10 -11.5 25 -8.5 35 C -4.5 42 4.5 42 8.5 35
               C 11.5 25 10.5 10 7 0 C 2.5 -3 -2.5 -3 -7 0 Z"
            fill="${vest}" stroke="${vestDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -7 0 C -10.5 10 -11.5 25 -8.5 35 C -6 39 -2 40 0 40
               C -4 32 -5 17 -3 0 Z" fill="${vestDark}" opacity="0.28"/>
    </g>
    <ellipse cx="19" cy="-66" rx="4.4" ry="3.6" fill="${skin}" transform="rotate(-14 19 -66)"/>

    <!-- === CARA (recta, no ovalada) === -->
    <path d="M 0 -146 C 12 -146 21 -138 21 -128
             C 21 -119 17 -113 11 -111 L -11 -111
             C -17 -113 -21 -119 -21 -128 C -21 -138 -12 -146 0 -146 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.38"/>
    <ellipse cx="12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.38"/>
    <!-- Cejas -->
    <path d="M -12 -138 Q -7 -141 -2 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.8" stroke-linecap="round"/>
    <path d="M 2 -138 Q 7 -141 12 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.8" stroke-linecap="round"/>
    <!-- Ojos (se mantienen) -->
    <ellipse cx="-7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <ellipse cx="7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <circle cx="-8.2" cy="-133" r="1.5" fill="#ffffff"/>
    <circle cx="5.8" cy="-133" r="1.5" fill="#ffffff"/>
    <!-- Naricilla -->
    <ellipse cx="0" cy="-126" rx="1.6" ry="1.1" fill="${skinShade}" opacity="0.7"/>

    <!-- === BARBA: desde debajo de la nariz hacia abajo, como el pelo del Niño === -->
    <path d="M -16 -124
             C -18 -117 -16 -111 -13 -106 C -10 -102 -5 -100 0 -99
             C 5 -100 10 -102 13 -106 C 16 -111 18 -117 16 -124
             Q 0 -127 -16 -124 Z"
          fill="${hair}"/>
    <path d="M -11 -121 C -7 -118 -7 -112 -10 -108" stroke="${hairLight}" stroke-width="1.6" fill="none" opacity="0.45" stroke-linecap="round"/>

    <!-- Boca: encima de la barba, en su sitio -->
    <path d="M -4.2 -121 Q 0 -117.8 4.2 -121" stroke="#f0c9ad" stroke-width="1.9" fill="none" stroke-linecap="round"/>

    <!-- === CABELLO ONDULADO CORTO (casquete + círculos) === -->
    <path d="M 0 -148 C -14 -148 -21 -140 -21 -130
             C -21 -134 -19 -138 -17 -141 C -12 -144 -6 -145 0 -145
             C 6 -145 12 -144 17 -141 C 19 -138 21 -134 21 -130
             C 21 -140 14 -148 0 -148 Z" fill="${hair}"/>
    <circle cx="-16" cy="-138" r="4.3" fill="${hair}"/>
    <circle cx="-10.5" cy="-142" r="4.3" fill="${hair}"/>
    <circle cx="-5" cy="-144" r="4.3" fill="${hair}"/>
    <circle cx="0" cy="-145" r="4.3" fill="${hair}"/>
    <circle cx="5" cy="-144" r="4.3" fill="${hair}"/>
    <circle cx="10.5" cy="-142" r="4.3" fill="${hair}"/>
    <circle cx="16" cy="-138" r="4.3" fill="${hair}"/>
    <path d="M -15 -142 C -11 -145 -6 -146 0 -146" stroke="${hairLight}" stroke-width="1.6" fill="none" opacity="0.5" stroke-linecap="round"/>

    <!-- === CAYADO (encima de todo, para que no se pierda tras la cabeza) === -->
    <path d="M -22 -162 L -22 -4" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M -22 -162 C -22 -174 -13 -175 -11 -166" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M -22 -162 L -22 -4" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${joseph}</g>`;
}

export default drawJoseph;
