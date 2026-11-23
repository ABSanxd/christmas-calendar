/**
 * El Niño Jesús en el pesebre.
 *
 * El pesebre y el Niño forman una sola pieza, como en la ilustración de
 * referencia: un cuenco de madera oscuro y ancho, con la paja asomando por
 * el borde y el Niño sentado dentro, envuelto en su sábana blanca.
 *
 * Proporciones (unidades locales, la escena las coloca a escala 1):
 * - pesebre: 88 de ancho x 48 de alto;
 * - Niño: pequeño y compacto, con la cabeza a 26 de ancho; los ojos cerrados
 *   y la boca muy cerca de ellos, para que la carita se vea tierna.
 *
 * El origen está en la base del pesebre, para poder colocarlo dentro o fuera
 * del establo según convenga.
 */

import { SCENE_COLORS } from '../shapes.js';

/**
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Base del pesebre.
 * @param {number} [options.scale]
 * @param {boolean} [options.showManger] Si es `false`, se dibuja solo el Niño.
 * @returns {string}
 */
export function drawBabyJesus(options) {
  const { x, y, scale = 1, showManger = true } = options;

  const skin = '#f8dfc2';
  const skinShade = '#e3bb99';
  const wood = '#8a5a34';
  const woodDark = '#683f22';
  const woodLight = '#a57145';
  const straw = '#e6cd8c';
  const strawLight = '#f5e4ae';
  const strawDark = '#c6a45e';
  const hair = '#a87a4e';
  const hairLight = '#c39463';
  const gold = '#e2bb59';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  // Cuenco bajo y abierto: el Niño se asoma por encima.
  const manger = showManger
    ? `
    <!-- Patas del pesebre -->
    <path d="M -27 -13 C -28 -7 -28 -4 -27 0 L -18 0 C -19 -4 -19 -9 -18 -13 Z" fill="${woodDark}"/>
    <path d="M 27 -13 C 28 -7 28 -4 27 0 L 18 0 C 19 -4 19 -9 18 -13 Z" fill="${woodDark}"/>

    <!-- Paja del fondo -->
    <ellipse cx="0" cy="-46" rx="44" ry="11" fill="${straw}"/>
    <ellipse cx="0" cy="-48" rx="37" ry="8" fill="${strawDark}" opacity="0.5"/>

    <!-- Cuenco de madera -->
    <path d="M -44 -46 C -43 -25 -27 -11 0 -11 C 27 -11 43 -25 44 -46 Z" fill="${wood}"/>
    <path d="M -44 -46 C -43 -25 -27 -11 0 -11 C 27 -11 43 -25 44 -46 Z"
          fill="none" stroke="${woodDark}" stroke-width="2.4"/>
    <!-- Vetas de la madera -->
    <path d="M -34 -35 C -24 -26 -11 -20 0 -20" stroke="${woodLight}" stroke-width="2" fill="none" opacity="0.55"/>
    <path d="M 34 -35 C 24 -26 11 -20 0 -20" stroke="${woodLight}" stroke-width="2" fill="none" opacity="0.4"/>
    <path d="M -25 -20 C -17 -15 -9 -13 0 -13" stroke="${woodDark}" stroke-width="1.6" fill="none" opacity="0.45"/>
    <!-- Reflejo del borde -->
    <path d="M -43 -46 C -41 -37 -38 -30 -32 -24" stroke="${woodLight}" stroke-width="2.2" fill="none" opacity="0.4" stroke-linecap="round"/>`
    : '';

  // Paja del borde delantero: se dibuja después del Niño para que looya.
  const strawFront = showManger
    ? `
    <!-- Briznas de paja, cortas y agrupadas -->
    <path d="M -41 -47 C -40 -53 -37 -56 -34 -54 C -35 -51 -36 -48 -36 -46 Z" fill="${strawLight}"/>
    <path d="M -34 -48 C -32 -55 -29 -58 -26 -55 C -28 -52 -29 -49 -29 -47 Z" fill="${strawLight}"/>
    <path d="M -26 -49 C -24 -56 -21 -59 -18 -56 C -20 -53 -21 -50 -21 -48 Z" fill="${strawLight}"/>
    <path d="M -18 -50 C -16 -57 -12 -60 -9 -57 C -12 -54 -13 -51 -13 -49 Z" fill="${strawLight}"/>
    <path d="M 18 -50 C 20 -57 24 -60 27 -57 C 24 -54 23 -51 23 -49 Z" fill="${strawLight}"/>
    <path d="M 26 -49 C 28 -56 31 -59 34 -56 C 32 -53 31 -50 31 -48 Z" fill="${strawLight}"/>
    <path d="M 34 -48 C 36 -55 39 -58 42 -55 C 40 -52 39 -49 39 -47 Z" fill="${strawLight}"/>
    <path d="M 41 -47 C 42 -53 45 -56 48 -54 C 47 -51 46 -48 46 -46 Z" fill="${strawLight}" opacity="0.8"/>
    <!-- Mata de paja delante del Niño -->
    <path d="M -28 -45 C -22 -51 -13 -53 -5 -49 C -11 -46 -19 -43 -28 -45 Z" fill="${straw}"/>
    <path d="M 28 -45 C 22 -51 13 -53 5 -49 C 11 -46 19 -43 28 -45 Z" fill="${straw}"/>`
    : '';

  const baby = `
    <!-- === AURELA CON ESTRELLA === -->
    <ellipse cx="0" cy="-79" rx="18" ry="18" fill="none" stroke="${gold}" stroke-width="2.4" opacity="0.85"/>
    <ellipse cx="0" cy="-79" rx="18" ry="18" fill="none" stroke="${SCENE_COLORS.goldBright}" stroke-width="1" opacity="0.5"/>
    <path d="M 0 -106 L 3 -97 L 12 -94 L 3 -91 L 0 -82 L -3 -91 L -12 -94 L -3 -97 Z"
          fill="${SCENE_COLORS.goldBright}"/>
    <path d="M 0 -106 L 3 -97 L 12 -94 L 3 -91 L 0 -82 L -3 -91 L -12 -94 L -3 -97 Z"
          fill="none" stroke="${gold}" stroke-width="1" opacity="0.7"/>

    <!-- === SÁBANA Y PAÑALES === -->
    <path d="M -18 -52 C -18 -64 -11 -70 0 -70 C 11 -70 18 -64 18 -52
             Q 0 -46 -18 -52 Z" fill="${SCENE_COLORS.ivory}"/>
    <path d="M 5 -70 C 12 -67 18 -61 18 -52 Q 10 -48 3 -49 Z" fill="#e3dac8" opacity="0.8"/>
    <!-- Brazos envueltos en la sábana -->
    <ellipse cx="-16" cy="-58" rx="5" ry="3.8" fill="${SCENE_COLORS.ivory}" transform="rotate(-24 -16 -58)"/>
    <ellipse cx="16" cy="-58" rx="5" ry="3.8" fill="${SCENE_COLORS.ivory}" transform="rotate(24 16 -58)"/>
    <ellipse cx="-17" cy="-57" rx="3.2" ry="2.4" fill="${skin}" transform="rotate(-24 -17 -57)"/>
    <ellipse cx="17" cy="-57" rx="3.2" ry="2.4" fill="${skin}" transform="rotate(24 17 -57)"/>

    <!-- === CARA (cabeza pequeña) === -->
    <path d="M 0 -92 C 7 -92 13 -86 13 -79 C 13 -72 7 -67 0 -67
             C -7 -67 -13 -72 -13 -79 C -13 -86 -7 -92 0 -92 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-7.5" cy="-75" rx="3.4" ry="2.3" fill="${blush}" opacity="0.45"/>
    <ellipse cx="7.5" cy="-75" rx="3.4" ry="2.3" fill="${blush}" opacity="0.45"/>
    <!-- Cejas diminutas -->
    <path d="M -7.5 -85 Q -4.8 -86.6 -2.2 -85" stroke="${hair}" stroke-width="1.1" fill="none" opacity="0.55" stroke-linecap="round"/>
    <path d="M 2.2 -85 Q 4.8 -86.6 7.5 -85" stroke="${hair}" stroke-width="1.1" fill="none" opacity="0.55" stroke-linecap="round"/>
    <!-- Ojos cerraditos -->
    <path d="M -8 -79.5 Q -5 -76 -2 -79.5" stroke="${ink}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M 2 -79.5 Q 5 -76 8 -79.5" stroke="${ink}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <!-- Sonrisa, muy cerca de los ojos (sin nariz) -->
    <path d="M -2.8 -74 Q 0 -71.8 2.8 -74" stroke="#9c5f5a" stroke-width="1.5" fill="none" stroke-linecap="round"/>

    <!-- === PELLO CASTÁÑO CLARO === -->
    <path d="M -13 -80 C -14.5 -89 -8 -94 0 -94 C 8 -94 14.5 -89 13 -80
             C 12.4 -75 11.8 -72 11 -69
             C 10 -73 9.4 -76 8.6 -79
             C 7 -83 4 -84.6 0 -84.6 C -4 -84.6 -7 -83 -8.6 -79
             C -9.4 -76 -10 -73 -11 -69
             C -11.8 -72 -12.4 -75 -13 -80 Z"
          fill="${hair}"/>
    <path d="M -10 -83 C -8 -89.5 -3.5 -92.5 1 -92 C -4 -90.5 -7.5 -87.5 -8.8 -83 Z"
          fill="${hairLight}" opacity="0.55"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${scale})">${manger}${baby}${strawFront}</g>`;
}

export default drawBabyJesus;
