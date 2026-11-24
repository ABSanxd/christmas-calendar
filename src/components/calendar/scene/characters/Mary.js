/**
 * La Virgen María, de pie junto al pesebre.
 *
 * Comparte con el ángel el mismo sistema de proporciones (cabeza ancha,
 * ojos con brillo o cerrados, mejillas sonrosadas), el mismo tipo de manto
 * de falda amplia con banda crema en el bajo y las mismas mangas de campana.
 * Por eso los tres personajes de la Natividad y los ángeles del cielo se
 * leen como una sola familia ilustrada.
 *
 * Vestuario: manto celeste claro con pliegues, banda crema y filete dorado
 * en el bajo, y medallón en el pecho.
 *
 * Cabeza: melena castaña con raya al centro, igual que la del ángel, y un
 * velo blanco que la envuelve por fuera. La parte de la melena que queda
 * junto a la cara es marrón; el exterior, blanco.
 *
 * Rostro: ojos cerrados, en señal de oración y ternura.
 *
 * El origen está en el suelo, para poder colocarla y escalarla con libertad.
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
export function drawMary(options) {
  const { x, y, scale = 1, flip = false } = options;

  const skin = '#f3d4b6';
  const skinShade = '#dfb092';
  const robe = '#8fc3dd';
  const robeDark = '#5e9ab9';
  const cream = '#f7f2e8';
  const hair = '#6b4d33';
  const hairLight = '#8a6543';
  const gold = '#e2bb59';
  const goldLight = '#f8e3a6';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  const mary = `
    <!-- === VELO DETRÁS (cae por los hombros) === -->
    <g transform="translate(0 4)">
      <path d="M -26 -66 C -30 -94 -29 -114 -27 -132
               C -30 -152 -15 -172 0 -172 C 15 -172 30 -152 27 -132
               C 29 -114 30 -94 26 -66
               C 22 -86 21 -104 20 -120 C 20 -136 12 -150 0 -150
               C -12 -150 -20 -136 -20 -120 C -21 -104 -22 -86 -26 -66 Z"
            fill="${cream}"/>
    </g>

    <!-- === CUELLO (detrás del manto: lo recorta el escote) === -->
    <path d="M -5 -124 L -11 -101 Q 0 -98 11 -101 L 5 -124 Z" fill="${skinShade}"/>

    <!-- === MANTO (igual que el del ángel) === -->
    <path d="M -17 -114 C -22 -84 -29 -42 -34 -3 Q 0 5 34 -3
             C 29 -42 22 -84 17 -114 Q 0 -104 -17 -114 Z"
          fill="${robe}" stroke="${robeDark}" stroke-width="1" stroke-opacity="0.3"/>
    <!-- Pliegues del faldón -->
    <path d="M -8 -114 C -13 -84 -15 -42 -13 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.28"/>
    <path d="M 8 -114 C 12 -84 14 -42 13 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.28"/>
    <path d="M 0 -117 C -1 -84 -2 -42 -1 2" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.2"/>
    <!-- Luz central -->
    <path d="M -3 -116 C -5 -84 -6 -42 -5 2 L 5 2 C 6 -42 5 -84 3 -116 Z"
          fill="${goldLight}" opacity="0.14"/>
    <!-- Sombra en los bordes -->
    <path d="M -17 -114 C -21 -86 -27 -44 -32 -6 Q -26 -3 -22 -5
             C -18 -42 -13 -84 -10 -113 Z" fill="${robeDark}" opacity="0.2"/>
    <path d="M 17 -114 C 21 -86 27 -44 32 -6 Q 26 -3 22 -5
             C 18 -42 13 -84 10 -113 Z" fill="${robeDark}" opacity="0.2"/>
    <!-- Banda crema del bajo y filete dorado -->
    <path d="M -33 -16 Q 0 -4 33 -16 L 34 -3 Q 0 5 -34 -3 Z" fill="${cream}"/>
    <path d="M -33 -18 Q 0 -6 33 -18" stroke="${gold}" stroke-width="1.4" fill="none" opacity="0.8"/>

    <!-- === MANGAS DE CAMPANA === -->
    <g transform="translate(-12 -110) rotate(7)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
    </g>
    <ellipse cx="-8" cy="-73" rx="4.4" ry="3.4" fill="${skin}" transform="rotate(12 -8 -73)"/>
    <g transform="translate(13 -110) rotate(-9)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
    </g>
    <ellipse cx="19" cy="-73" rx="4.4" ry="3.4" fill="${skin}" transform="rotate(-14 19 -73)"/>

    <!-- === CUELLO === -->

    <!-- === CARA === -->
    <path d="M 0 -148 C 11 -148 20 -140 20 -130 C 19 -122 11 -116 0 -114
             C -11 -116 -19 -122 -20 -130 C -20 -140 -11 -148 0 -148 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-11.5" cy="-121" rx="4.6" ry="3" fill="${blush}" opacity="0.42"/>
    <ellipse cx="11.5" cy="-121" rx="4.6" ry="3" fill="${blush}" opacity="0.42"/>
    <!-- Cejas -->
    <path d="M -11.5 -138 Q -7 -140.6 -2.5 -138" stroke="${hair}" stroke-width="1.5" fill="none" opacity="0.65" stroke-linecap="round"/>
    <path d="M 2.5 -138 Q 7 -140.6 11.5 -138" stroke="${hair}" stroke-width="1.5" fill="none" opacity="0.65" stroke-linecap="round"/>
    <!-- Ojos cerrados -->
    <path d="M -11.5 -130 Q -7.5 -125.2 -3.5 -130" stroke="${ink}" stroke-width="2.1" fill="none" stroke-linecap="round"/>
    <path d="M 3.5 -130 Q 7.5 -125.2 11.5 -130" stroke="${ink}" stroke-width="2.1" fill="none" stroke-linecap="round"/>
    <!-- Naricilla y sonrisa -->
    <ellipse cx="0" cy="-125" rx="1.4" ry="1" fill="${skinShade}" opacity="0.6"/>
    <path d="M -3.4 -121 Q 0 -118 3.4 -121" stroke="#9c5f5a" stroke-width="1.7" fill="none" stroke-linecap="round"/>

    <!-- === VELO (capa exterior blanca) === -->
    <g transform="translate(0 4)">
      <path d="M -27 -66
               C -29 -92 -27 -112 -26 -130
               C -29 -149 -15 -170 0 -170
               C 15 -170 29 -149 26 -130
               C 27 -112 29 -92 27 -66
               C 24 -82 22 -102 21 -118
               C 21 -124 20 -130 20 -130
               C 23 -144 12 -162 0 -162
               C -12 -162 -23 -144 -20 -130
               C -20 -130 -21 -124 -21 -118
               C -22 -102 -24 -82 -27 -66 Z"
            fill="${cream}"/>
    </g>

    <!-- === MELENA (capa interior marrón, junto a la cara) === -->
    <path d="M -20 -130
             C -23 -144 -12 -162 0 -162
             C 12 -162 23 -144 20 -130
             C 21 -116 24 -107 24 -101
             C 19 -95 18 -113 18 -132
             C 16 -141 8 -147 3 -147
             C 1 -149 -1 -149 -3 -147
             C -9 -147 -16 -141 -18 -132
             C -18 -113 -19 -95 -24 -101
             C -24 -107 -23 -116 -20 -130 Z"
          fill="${hair}"/>
    <!-- Brillo del pelo -->
    <path d="M -17 -140 C -19 -152 -11 -159 -2 -160 C -10 -156 -14 -149 -15 -141 Z"
          fill="${hairLight}" opacity="0.7"/>
    <path d="M 17 -140 C 19 -152 11 -159 2 -160 C 10 -156 14 -149 15 -141 Z"
          fill="${hairLight}" opacity="0.55"/>
    <!-- Raya al centro -->
    <path d="M 0 -160 C -1 -157 -1 -154 0 -151" stroke="#4e3826" stroke-width="1.4" fill="none" opacity="0.5" stroke-linecap="round"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${mary}</g>`;
}

export default drawMary;
