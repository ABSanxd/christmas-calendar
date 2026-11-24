/**
 * Pastor joven con su manta sobre la cabeza.
 *
 * Comparte con María y José el mismo sistema de proporciones y el mismo
 * lenguaje de ilustración: cabeza ancha, ojos con brillo, mejillas
 * sonrosadas, túnica con pliegues, banda clara en el bajo y filete dorado.
 * Así los cinco personajes de la escena (María, José y los dos pastores) se
 * leen como de la misma familia ilustrada.
 *
 * Vestuario:
 * - **Manta de lana echada sobre la cabeza**, que hace de capucha y cae por
 *   los hombros. Es el manto ligero de los pastores de campo.
 * - Túnica de lana con banda clara en el bajo y filete dorado, como la de
 *   María y José.
 * - **Cinturón** de cuero a la cintura, con hebilla dorada.
 *
 * Rostro: **sin barba**, de pastor joven: solo el pelo corto asomando bajo
 * la manta y una boca sonriente.
 *
 * El cayado se apoya en el suelo y se inclina hacia fuera, para que no se
 * mezcle con la manta de la cabeza.
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
 * @param {string} [options.robe]     Color de la túnica.
 * @param {string} [options.robeDark] Sombra de la túnica.
 * @param {string} [options.hem]      Banda clara del bajo.
 * @param {string} [options.mantle]   Color de la manta sobre la cabeza.
 * @param {string} [options.mantleDark]
 * @param {string} [options.belt]     Color del cinturón.
 * @param {string} [options.skin]
 * @param {string} [options.hair]
 * @returns {string}
 */
export function drawShepherd(options) {
  const {
    x,
    y,
    scale = 1,
    flip = false,
    robe = '#b8824e',
    robeDark = '#8b5a2e',
    hem = '#dcb488',
    mantle = '#6f8b5c',
    mantleDark = '#526b41',
    belt = '#7a4b2a',
    beltDark = '#54331c',
    skin = '#f0cda9',
    skinShade = '#d5aa87',
    hair = '#4b3826',
    hairLight = '#6d5238',
    blush = '#ee9aa4',
    ink = '#3a2b3f',
  } = options;

  const shepherd = `
    <!-- === MANTA SOBRE LA CABEZA (capa de detrás) === -->
    <path d="M -31 -66
             C -34 -96 -34 -118 -31 -138
             C -34 -159 -16 -185 0 -185
             C 16 -185 34 -159 31 -138
             C 34 -118 34 -96 31 -66 Z"
          fill="${mantle}" stroke="${mantleDark}" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Pliegues de la manta a los lados -->
    <path d="M -25 -70 C -28 -98 -28 -118 -25 -136" stroke="${mantleDark}" stroke-width="2.2" fill="none" opacity="0.45" stroke-linecap="round"/>
    <path d="M 25 -70 C 28 -98 28 -118 25 -136" stroke="${mantleDark}" stroke-width="2.2" fill="none" opacity="0.45" stroke-linecap="round"/>
    <!-- Dobladillo de la manta -->
    <path d="M -31 -70 Q -16 -63 0 -63 Q 16 -63 31 -70" stroke="${mantleDark}" stroke-width="1.6" fill="none" opacity="0.4"/>
    <!-- Luz en la frente de la manta -->
    <path d="M -12 -152 C -8 -166 -3 -173 0 -173 C 3 -173 8 -166 12 -152
             C 8 -160 4 -164 0 -164 C -4 -164 -8 -160 -12 -152 Z"
          fill="#ffffff" opacity="0.14"/>

    <!-- === CUELLO (queda bajo el escote de la túnica) === -->
    <path d="M -5 -120 L -11 -104 Q 0 -101 11 -104 L 5 -120 Z" fill="${skinShade}"/>

    <!-- === TÚNICA === -->
    <path d="M -18 -112
             C -23 -88 -26 -50 -28 -4
             Q 0 4 28 -4
             C 26 -50 23 -88 18 -112
             Q 0 -102 -18 -112 Z"
          fill="${robe}" stroke="${robeDark}" stroke-width="1" stroke-opacity="0.35"/>
    <!-- Pliegues -->
    <path d="M -9 -112 C -12 -86 -14 -48 -14 -2" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 8 -112 C 11 -86 13 -48 13 -2" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 0 -114 C -1 -86 -1 -48 -1 2" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.22"/>
    <!-- Luz central -->
    <path d="M -3 -113 C -5 -86 -5 -48 -5 2 L 5 2 C 5 -48 5 -86 3 -113 Z"
          fill="${SCENE_COLORS.goldLight}" opacity="0.12"/>
    <!-- Sombra en los bordes -->
    <path d="M -18 -112 C -21 -86 -24 -48 -26 -6 Q -22 -3 -19 -5
             C -16 -48 -13 -86 -11 -111 Z" fill="${robeDark}" opacity="0.22"/>
    <path d="M 18 -112 C 21 -86 24 -48 26 -6 Q 22 -3 19 -5
             C 16 -48 13 -86 11 -111 Z" fill="${robeDark}" opacity="0.22"/>
    <!-- Banda clara del bajo y filete dorado -->
    <path d="M -27 -18 Q 0 -6 27 -18 L 28 -4 Q 0 4 -28 -4 Z" fill="${hem}"/>
    <path d="M -27 -20 Q 0 -8 27 -20" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" fill="none" opacity="0.8"/>

    <!-- === CINTURÓN === -->
    <path d="M -25 -74 Q 0 -67 25 -74 L 25 -64 Q 0 -57 -25 -64 Z" fill="${belt}"/>
    <path d="M -25 -74 Q 0 -67 25 -74" stroke="${beltDark}" stroke-width="1.2" fill="none" opacity="0.7"/>
    <path d="M -25 -64 Q 0 -57 25 -64" stroke="${beltDark}" stroke-width="1.2" fill="none" opacity="0.7"/>
    <!-- Hebilla dorada -->
    <rect x="-6" y="-71" width="12" height="11" rx="2.5" fill="${SCENE_COLORS.gold}"/>
    <rect x="-6" y="-71" width="12" height="11" rx="2.5" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1" opacity="0.85"/>
    <path d="M 0 -71 L 0 -60" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.4" opacity="0.85"/>
    <!-- Extremo suelto del cinturón -->
    <path d="M -14 -65 Q -16 -54 -20 -46 L -15 -44 Q -12 -54 -10 -64 Z" fill="${belt}"/>
    <path d="M -20 -46 L -15 -44 L -16 -48 L -21 -50 Z" fill="${beltDark}" opacity="0.7"/>

    <!-- === MANGAS DE CAMPANA === -->
    <!-- Brazo del cayado, que sujeta el bastón un poco por fuera -->
    <g transform="translate(-22 -108) rotate(18)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
      <!-- Puño claro, para que el brazo se lea aparte de la túnica -->
      <path d="M -9.8 27 C -5.5 35 5.5 35 9.8 27 C 10.6 31 8 35 0 36
               C -8 35 -10.6 31 -9.8 27 Z" fill="${hem}"/>
    </g>
    <ellipse cx="-33" cy="-71" rx="4.6" ry="3.5" fill="${skin}" transform="rotate(18 -33 -71)"/>
    <!-- Brazo abierto, como si saludara al pesebre -->
    <g transform="translate(15 -108) rotate(-27)">
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -5 36 5 36 9.5 29
               C 13 21 12 8 8.5 0 C 3 -3.5 -3 -3.5 -8.5 0 Z"
            fill="${robe}" stroke="${robeDark}" stroke-width="1.1" stroke-opacity="0.45"/>
      <path d="M -8.5 0 C -12 8 -13 21 -9.5 29 C -6 34 -2 35 0 35
               C -4 28 -5 12 -3 0 Z" fill="${robeDark}" opacity="0.28"/>
      <!-- Puño claro -->
      <path d="M -9.8 27 C -5.5 35 5.5 35 9.8 27 C 10.6 31 8 35 0 36
               C -8 35 -10.6 31 -9.8 27 Z" fill="${hem}"/>
    </g>
    <ellipse cx="31" cy="-79" rx="4.4" ry="3.4" fill="${skin}" transform="rotate(-27 31 -79)"/>

    <!-- === CARA (de pastor joven: sin barba) === -->
    <path d="M 0 -146 C 12 -146 21 -138 21 -128
             C 21 -119 17 -113 11 -111 L -11 -111
             C -17 -113 -21 -119 -21 -128 C -21 -138 -12 -146 0 -146 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.4"/>
    <ellipse cx="12" cy="-122" rx="4.4" ry="2.9" fill="${blush}" opacity="0.4"/>
    <!-- Cejas -->
    <path d="M -12 -138 Q -7 -141 -2 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.8" stroke-linecap="round"/>
    <path d="M 2 -138 Q 7 -141 12 -138" stroke="${hair}" stroke-width="1.8" fill="none" opacity="0.8" stroke-linecap="round"/>
    <!-- Ojos -->
    <ellipse cx="-7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <ellipse cx="7" cy="-131" rx="3.9" ry="4.8" fill="${ink}"/>
    <circle cx="-8.2" cy="-133" r="1.5" fill="#ffffff"/>
    <circle cx="5.8" cy="-133" r="1.5" fill="#ffffff"/>
    <!-- Naricilla -->
    <ellipse cx="0" cy="-126" rx="1.6" ry="1.1" fill="${skinShade}" opacity="0.7"/>
    <!-- Boca sonriente, sin barba -->
    <path d="M -4.2 -121 Q 0 -117.6 4.2 -121" stroke="#a4655c" stroke-width="1.9" fill="none" stroke-linecap="round"/>

    <!-- === PELO CORTO, asomando bajo la manta === -->
    <path d="M -22 -128
             C -23 -142 -14 -156 0 -156
             C 14 -156 23 -142 22 -128
             C 22 -138 12 -147 0 -147
             C -12 -147 -22 -138 -22 -128 Z"
          fill="${hair}"/>
    <path d="M -13 -146 C -8 -152 -3 -154 2 -153" stroke="${hairLight}" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round"/>

    <!-- === BORDE DELANTERO DE LA MANTA (marca el hueco de la capucha) === -->
    <path d="M -24 -130
             C -25 -146 -15 -158 0 -158
             C 15 -158 25 -146 24 -130
             L 32 -142
             C 35 -162 16 -185 0 -185
             C -16 -185 -35 -162 -32 -142 Z"
          fill="${mantle}"/>
    <path d="M -24 -130 C -25 -146 -15 -158 0 -158 C 15 -158 25 -146 24 -130"
          stroke="${mantleDark}" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round"/>

    <!-- === CAYADO (encima de todo, apoyado en el suelo) === -->
    <path d="M -30 -2 L -36 -168" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" stroke-linecap="round"/>
    <path d="M -36 -168 C -36 -182 -25 -183 -22 -173" stroke="${SCENE_COLORS.sandDark}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M -30 -2 L -36 -168" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${shepherd}</g>`;
}

export default drawShepherd;
