/**
 * Pozo de agua y la mujer que lleva el balde.
 *
 * Se dibujan con el origen en el suelo, como el resto de personajes de la
 * escena, para que se puedan colocar y escalar con libertad. Comparten el
 * lenguaje del resto de la aldea: curvas suaves, contornos finos y la misma
 * paleta cálida.
 *
 * El pozo está revestido de "techtitos" (ladrillos de piedra) y el agua del
 * brocal es celeste, para que se lea de un vistazo que hay agua dentro.
 */

import { SCENE_COLORS } from '../shapes.js';

/** Tonos de los ladrillos con los que se reviste el cuerpo del pozo. */
const TILE_TONES = ['#f2e4c9', '#e7d6b6', '#dcc8a2', '#c3a97e'];

/** Altura del cuerpo del pozo, en unidades de la escena. */
const WELL_HEIGHT = 60;

/**
 * Hiladas de ladrillos ("techtitos") que revisten el cuerpo del pozo.
 *
 * Las hiladas se desplazan media pieza unas respecto a otras, como en un
 * muro de verdad, y los tonos se alternan para que la superficie tenga
 * textura sin necesidad de más trazos.
 *
 * @returns {string}
 */
function drawWellTiles() {
  const tiles = [];
  const rows = 5;
  const rowHeight = WELL_HEIGHT / rows;
  const top = -WELL_HEIGHT;

  for (let row = 0; row < rows; row += 1) {
    const y = top + row * rowHeight;
    const offset = row % 2 === 0 ? 0 : 9;

    for (let index = 0; index < 6; index += 1) {
      const x = -54 + offset + index * 18;
      const tone = TILE_TONES[(row * 3 + index * 2) % TILE_TONES.length];
      tiles.push(
        `<rect x="${x}" y="${y}" width="16" height="${rowHeight - 2}" rx="2.5" fill="${tone}"/>`,
      );
    }
  }

  return tiles.join('');
}

/**
 * Pozo de piedra con su brocal, sus techtitos y el agua.
 *
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo donde se apoya.
 * @param {number} [options.scale]
 * @returns {string}
 */
export function drawWell(options) {
  const { x, y, scale = 1 } = options;
  const top = -WELL_HEIGHT;

  const well = `
    <defs>
      <!-- El recorte mantiene los ladrillos dentro del cuerpo del pozo -->
      <clipPath id="well-body-clip">
        <path d="M -46 0 L -38 ${top} L 38 ${top} L 46 0 Z"/>
      </clipPath>
      <radialGradient id="well-water" cx="38%" cy="26%" r="80%">
        <stop offset="0%" stop-color="#e2f7ff"/>
        <stop offset="52%" stop-color="#8fd3ef"/>
        <stop offset="100%" stop-color="#4c9ec6"/>
      </radialGradient>
    </defs>

    <!-- Sombra en el suelo -->
    <ellipse cx="0" cy="0" rx="50" ry="9" fill="${SCENE_COLORS.brownDeep}" opacity="0.16"/>
    <!-- Cuerpo de piedra -->
    <path d="M -46 0 L -38 ${top} L 38 ${top} L 46 0 Z" fill="${SCENE_COLORS.wallDeep}"/>
    <!-- Techtitos: hiladas de ladrillo alternadas -->
    <g clip-path="url(#well-body-clip)">${drawWellTiles()}</g>
    <!-- Sombra del costado derecho -->
    <path d="M 16 ${top} L 38 ${top} L 46 0 L 20 0 Z" fill="${SCENE_COLORS.sandDark}" opacity="0.42"/>
    <!-- Brocal -->
    <ellipse cx="0" cy="${top}" rx="43" ry="10" fill="${SCENE_COLORS.wallShade}"/>
    <ellipse cx="0" cy="${top}" rx="43" ry="10" fill="none" stroke="${SCENE_COLORS.sandDark}" stroke-width="1.6" opacity="0.5"/>
    <!-- Cuerda colgando dentro del brocal -->
    <path d="M 8 ${top + 1} C 11 ${top + 9} 6 ${top + 14} 8 ${top + 20}" stroke="${SCENE_COLORS.sandDark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- Agua: el interior del brocal, en celeste -->
    <ellipse cx="0" cy="${top + 1}" rx="31" ry="7" fill="url(#well-water)"/>
    <!-- Brillos del agua -->
    <ellipse cx="-9" cy="${top - 1}" rx="11" ry="2.4" fill="#ffffff" opacity="0.42"/>
    <path d="M -17 ${top + 2.5} q 7 -2.6 13 0" stroke="#eafaff" stroke-width="1.6" fill="none" opacity="0.7" stroke-linecap="round"/>`;

  return `<g transform="translate(${x} ${y}) scale(${scale})">${well}</g>`;
}

/**
 * Mujer con un balde en la mano.
 *
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.y      Suelo donde se apoya.
 * @param {number} [options.scale]
 * @param {boolean} [options.flip] La mira hacia la izquierda si es `true`.
 * @returns {string}
 */
export function drawWaterCarrier(options) {
  const { x, y, scale = 1, flip = false } = options;

  const skin = '#f3d4b6';
  const skinShade = '#dfb092';
  const hair = '#6b4d33';
  const hairLight = '#8a6543';
  const robe = SCENE_COLORS.terracotta;
  const robeDark = SCENE_COLORS.terracottaDeep;
  const cream = '#f7f2e8';
  const wood = '#a87a4e';
  const woodDark = '#7b543a';
  const blush = '#ee9aa4';
  const ink = '#3a2b3f';

  const woman = `
    <!-- Sombra en el suelo -->
    <ellipse cx="0" cy="0" rx="26" ry="6" fill="${SCENE_COLORS.brownDeep}" opacity="0.16"/>

    <!-- === MANTO === -->
    <path d="M -16 -76 C -21 -52 -26 -26 -30 -2 Q 0 5 30 -2
             C 26 -26 21 -52 16 -76 Q 0 -84 -16 -76 Z" fill="${robe}"/>
    <path d="M -8 -78 C -13 -52 -16 -26 -15 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 8 -78 C 12 -52 14 -26 14 -1" stroke="${robeDark}" stroke-width="2.2" fill="none" opacity="0.3"/>
    <path d="M 0 -80 C -1 -50 -2 -26 -1 2" stroke="${robeDark}" stroke-width="2" fill="none" opacity="0.22"/>
    <path d="M -3 -79 C -5 -52 -6 -26 -5 2 L 5 2 C 6 -26 5 -52 3 -79 Z" fill="${SCENE_COLORS.goldLight}" opacity="0.12"/>
    <!-- Banda crema del bajo y filete dorado -->
    <path d="M -29 -13 Q 0 -2 29 -13 L 30 -2 Q 0 5 -30 -2 Z" fill="${cream}"/>
    <path d="M -29 -15 Q 0 -4 29 -15" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" fill="none" opacity="0.8"/>

    <!-- === Pañuelo sobre la cabeza === -->
    <path d="M -20 -90 C -23 -103 -13 -114 0 -114 C 13 -114 23 -103 20 -90
             C 19 -82 17 -76 15 -73 L -15 -73 C -17 -76 -19 -82 -20 -90 Z" fill="${hair}"/>
    <path d="M -18 -92 C -20 -103 -11 -112 -1 -112" stroke="${hairLight}" stroke-width="2.4" fill="none" opacity="0.6"/>
    <path d="M -20 -90 C -23 -103 -13 -114 0 -114 C 13 -114 23 -103 20 -90" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.2" opacity="0.35"/>

    <!-- === CARA === -->
    <path d="M 0 -104 C 11 -104 20 -97 20 -88 C 19 -80 11 -75 0 -73
             C -11 -75 -19 -80 -20 -88 C -20 -97 -11 -104 0 -104 Z" fill="${skin}"/>
    <ellipse cx="-11" cy="-82" rx="4.6" ry="3" fill="${blush}" opacity="0.42"/>
    <ellipse cx="11" cy="-82" rx="4.6" ry="3" fill="${blush}" opacity="0.42"/>
    <path d="M -11 -93 Q -7 -95.5 -3 -93" stroke="${hair}" stroke-width="1.5" fill="none" opacity="0.7" stroke-linecap="round"/>
    <path d="M 3 -93 Q 7 -95.5 11 -93" stroke="${hair}" stroke-width="1.5" fill="none" opacity="0.7" stroke-linecap="round"/>
    <ellipse cx="-7" cy="-87" rx="3.4" ry="4.2" fill="${ink}"/>
    <ellipse cx="7" cy="-87" rx="3.4" ry="4.2" fill="${ink}"/>
    <circle cx="-8.2" cy="-88.8" r="1.4" fill="#ffffff"/>
    <circle cx="5.8" cy="-88.8" r="1.4" fill="#ffffff"/>
    <ellipse cx="0" cy="-82" rx="1.5" ry="1.1" fill="${skinShade}" opacity="0.7"/>
    <path d="M -3.6 -78.5 Q 0 -75.5 3.6 -78.5" stroke="#9c5f5a" stroke-width="1.7" fill="none" stroke-linecap="round"/>

    <!-- === BRAZO QUE SOSTIENE EL BALDE === -->
    <path d="M 14 -70 C 21 -62 25 -50 25 -40" stroke="${robe}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 14 -70 C 21 -62 25 -50 25 -40" stroke="${robeDark}" stroke-width="2.4" fill="none" opacity="0.3"/>
    <ellipse cx="25" cy="-36" rx="5" ry="3.6" fill="${skin}" transform="rotate(20 25 -36)"/>

    <!-- === OTRO BRAZO, CAIDO JUNTO AL CUERPO === -->
    <path d="M -14 -70 C -19 -60 -21 -48 -21 -36" stroke="${robe}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M -14 -70 C -19 -60 -21 -48 -21 -36" stroke="${robeDark}" stroke-width="2.4" fill="none" opacity="0.3"/>
    <ellipse cx="-21" cy="-32" rx="4.6" ry="3.4" fill="${skin}" transform="rotate(-12 -21 -32)"/>

    <!-- === BALDE === -->
    <path d="M 25 -38 L 17 -14 L 33 -14 L 25 -38 Z" fill="${wood}"/>
    <path d="M 25 -38 L 25 -14 L 33 -14 L 25 -38 Z" fill="${woodDark}" opacity="0.45"/>
    <path d="M 17.6 -25 L 32.4 -25" stroke="${woodDark}" stroke-width="1.6" opacity="0.55"/>
    <path d="M 18 -32 Q 25 -44 32 -32" stroke="${woodDark}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="25" cy="-37" rx="4" ry="1.6" fill="${woodDark}" opacity="0.6"/>
  `;

  return `<g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">${woman}</g>`;
}

export default drawWell;
