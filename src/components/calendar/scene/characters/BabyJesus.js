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
  const goldLight = '#f8e3a6';
  const goldDeep = '#b48f3d';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  // Patas del pesebre: el cuenco va por encima, sobre ellas.
  const legs = showManger
    ? `
    <path d="M -27 -23 C -28 -14 -28 -5 -27 0 L -18 0 C -19 -6 -19 -15 -18 -23 Z" fill="${woodDark}"/>
    <path d="M 30 -23 C 31 -14 31 -5 30 0 L 19 0 C 20 -6 20 -15 19 -23 Z" fill="${woodDark}"/>`
    : '';

  // Cuenco bajo y abierto: el Niño se asoma por encima.
  const manger = showManger
    ? `
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
    <!-- Briznas de paja, caidas hacia abajo -->
    <path d="M -40 -47 C -45 -43 -46 -38 -43 -35 C -45 -39 -43 -43 -38 -46 Z" fill="${strawLight}"/>
    <path d="M -32 -49 C -36 -46 -37 -41 -35 -38 C -37 -41 -35 -45 -30 -48 Z" fill="${strawLight}"/>
    <path d="M -24 -50 C -27 -47 -28 -43 -26 -40 C -28 -43 -26 -46 -21 -49 Z" fill="${strawLight}"/>
    <path d="M 24 -50 C 27 -47 28 -43 26 -40 C 28 -43 26 -46 21 -49 Z" fill="${strawLight}"/>
    <path d="M 32 -49 C 36 -46 37 -41 35 -38 C 37 -41 35 -45 30 -48 Z" fill="${strawLight}"/>
    <path d="M 40 -47 C 45 -43 46 -38 43 -35 C 45 -39 43 -43 38 -46 Z" fill="${strawLight}" opacity="0.85"/>
    <!-- Mata de paja delante del Niño -->
    <path d="M -28 -44 C -22 -50 -13 -52 -5 -48 C -11 -45 -19 -42 -28 -44 Z" fill="${straw}"/>
    <path d="M 28 -44 C 22 -50 13 -52 5 -48 C 11 -45 19 -42 28 -44 Z" fill="${straw}"/>`
    : '';

  const baby = `
    <!-- === AURELA (igual que la de los angeles) === -->
    <ellipse cx="0" cy="-96" rx="19" ry="8" fill="${goldLight}" opacity="0.05"/>
    <ellipse cx="0" cy="-96" rx="16" ry="6.5" fill="${goldLight}" opacity="0.05"/>
    <ellipse cx="0" cy="-96" rx="13.5" ry="5.5" fill="${goldLight}" opacity="0.07"/>
    <g transform="rotate(-7 0 -96)">
      <ellipse cx="0" cy="-96" rx="12.5" ry="4.8" fill="none" stroke="${goldDeep}" stroke-width="3.6" opacity="0.45"/>
      <ellipse cx="0" cy="-96" rx="12.5" ry="4.8" fill="none" stroke="${gold}" stroke-width="2.5"/>
      <ellipse cx="0" cy="-96.9" rx="12.5" ry="4.8" fill="none" stroke="${goldLight}" stroke-width="1" opacity="0.85"/>
    </g>

    <!-- === SÁBANA Y PAÑALES === -->
    <path d="M -19 -50 C -20 -63 -11 -70 0 -70 C 11 -70 20 -63 19 -50
             Q 0 -44 -19 -50 Z" fill="${SCENE_COLORS.ivory}"/>
    <path d="M 5 -70 C 12 -67 19 -62 19 -50 Q 10 -46 3 -47 Z" fill="#e3dac8" opacity="0.8"/>

    <!-- === CARA (cabeza pequeña) === -->
    <path d="M 0 -90 C 6.5 -90 11.5 -85 11.5 -78.5 C 11.5 -72 6.5 -67 0 -67
             C -6.5 -67 -11.5 -72 -11.5 -78.5 C -11.5 -85 -6.5 -90 0 -90 Z"
          fill="${skin}"/>
    <!-- Mejillas -->
    <ellipse cx="-6.5" cy="-74.5" rx="3" ry="2" fill="${blush}" opacity="0.45"/>
    <ellipse cx="6.5" cy="-74.5" rx="3" ry="2" fill="${blush}" opacity="0.45"/>
    <!-- Cejas diminutas -->
    <path d="M -6.5 -84 Q -4.3 -85.4 -2 -84" stroke="${hair}" stroke-width="1" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M 2 -84 Q 4.3 -85.4 6.5 -84" stroke="${hair}" stroke-width="1" fill="none" opacity="0.5" stroke-linecap="round"/>
    <!-- Ojos cerraditos -->
    <path d="M -7 -78.5 Q -4.5 -76 -2 -78.5" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M 2 -78.5 Q 4.5 -76 7 -78.5" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <!-- Boquita muy cerca de los ojos (sin nariz) -->
    <path d="M -2.2 -73.5 Q 0 -72 2.2 -73.5" stroke="#9c5f5a" stroke-width="1.4" fill="none" stroke-linecap="round"/>

    <!-- === CABELLO: menos de la mitad, para que se vean los ojitos === -->
    <path d="M -11.5 -78.5 C -11.5 -85 -6.5 -90 0 -90
             C 6.5 -90 11.5 -85 11.5 -78.5
             Q 0 -83.5 -11.5 -78.5 Z"
          fill="${hair}"/>
    <path d="M -8 -83 C -6.5 -87.5 -3 -89.5 1 -89 C -4 -88 -6 -86 -7 -83 Z"
          fill="${hairLight}" opacity="0.55"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${scale})">${legs}${manger}${baby}${strawFront}</g>`;
}

export default drawBabyJesus;
