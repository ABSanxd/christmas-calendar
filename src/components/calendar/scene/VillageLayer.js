/**
 * Capa de la aldea de Belén: casas, murallas, árboles y caminos.
 *
 * La aldea se ordena en tres planos, de atrás hacia delante:
 *
 * 1. **Torres**: dos edificios con cúpula asoman por encima de las fachadas.
 *    Sus ventanas quedan siempre por encima de la cornisa, de modo que se
 *    ven: ninguna fachada tapa las ventanas de la casa que tiene detrás.
 * 2. **Fachadas**: los muros bajos que sostienen las hornacinas del
 *    calendario, con dos grandes arcos (uno violeta y otro azul) y faroles
 *    colgados que dan calidez al conjunto.
 * 3. **Caserío bajo**: los edificios del primer plano, apoyados en el borde
 *    inferior del cuadro, para que ninguno parezca flotar sobre la arena.
 *
 * Todos los bloques se apoyan en la línea de suelo de su plano: las casas
 * lejanas en el horizonte y las cercanas en el borde del encuadre.
 */

import { SCENE_COLORS, drawHouse } from './shapes.js';
import { drawCypress, drawShrub } from './characters/Tree.js';
import { drawWell, drawWaterCarrier } from './characters/Well.js';

/**
 * Farol colgado de la pared, con su charco de luz cálida.
 *
 * @param {number} x
 * @param {number} y     Altura del punto donde cuelga.
 * @param {number} [scale]
 * @returns {string}
 */
function drawLantern(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
      <circle cx="0" cy="4" r="46" fill="${SCENE_COLORS.amber}" opacity="0.13"/>
      <path d="M 0 -34 L 0 -20" stroke="${SCENE_COLORS.brownDeep}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M -10 -20 L 10 -20 L 8 6 L -8 6 Z" fill="${SCENE_COLORS.amberSoft}"/>
      <path d="M -10 -20 L 10 -20 L 8 6 L -8 6 Z" fill="none" stroke="${SCENE_COLORS.brownDeep}" stroke-width="2.4"/>
      <path d="M -13 -20 L 13 -20 L 10 -28 L -10 -28 Z" fill="${SCENE_COLORS.brownDeep}"/>
      <path d="M -9 6 L 9 6 L 6 12 L -6 12 Z" fill="${SCENE_COLORS.brownDeep}"/>
      <circle cx="0" cy="-6" r="5" fill="${SCENE_COLORS.goldBright}" opacity="0.85"/>
    </g>`;
}

/**
 * Puerta grande en arco, abierta en la fachada.
 *
 * @param {object} options
 * @param {number} options.x       Borde izquierdo.
 * @param {number} options.bottom  Base, a ras de suelo.
 * @param {number} options.width
 * @param {number} options.height  Altura total del arco.
 * @param {string} options.color
 * @param {boolean} [options.glow]
 * @returns {string}
 */
function drawArchDoor(options) {
  const { x, bottom, width, height, color, glow = true } = options;
  const radius = width / 2;
  const spring = bottom - height + radius;
  const arch = `M ${x} ${bottom} L ${x} ${spring} A ${radius} ${radius} 0 0 1 ${x + width} ${spring} L ${x + width} ${bottom} Z`;
  return `
    <path d="${arch}" fill="${color}"/>
    <path d="${arch}" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2.6" opacity="0.85"/>
    ${glow ? `<ellipse cx="${x + width / 2}" cy="${bottom - 4}" rx="${(width * 0.85).toFixed(1)}" ry="${(width * 0.24).toFixed(1)}" fill="${SCENE_COLORS.amber}" opacity="0.22"/>` : ''}`;
}

/**
 * Ventana rehundida en la fachada: un hueco pequeño y oscuro con marco claro.
 *
 * @param {object} options
 * @param {number} options.x
 * @param {number} options.bottom
 * @param {number} options.width
 * @param {boolean} [options.lit]
 * @returns {string}
 */
function drawRecess(options) {
  const { x, bottom, width, lit = false } = options;
  const radius = width / 2;
  const height = width * 1.5;
  const top = bottom - height;
  const arch = `M ${x} ${bottom} L ${x} ${top + radius} A ${radius} ${radius} 0 0 1 ${x + width} ${top + radius} L ${x + width} ${bottom} Z`;
  return `
    <path d="${arch}" fill="${SCENE_COLORS.wallShade}" opacity="0.9"/>
    <path d="${arch}" fill="none" stroke="${SCENE_COLORS.wallDeep}" stroke-width="1.4" opacity="0.8"/>
    <path d="M ${x + 3} ${bottom - 3} L ${x + 3} ${top + radius} A ${radius - 3} ${radius - 3} 0 0 1 ${x + width - 3} ${top + radius} L ${x + width - 3} ${bottom - 3} Z"
          fill="${lit ? SCENE_COLORS.amber : SCENE_COLORS.brown}" opacity="${lit ? 0.9 : 0.7}"/>`;
}

/**
 * Fachada de la aldea: muro de piedra cálida con zócalo, cornisa y huecos.
 *
 * @param {object} options
 * @param {number} options.x       Borde izquierdo.
 * @param {number} options.width
 * @param {number} options.top     Altura de la cornisa.
 * @param {number} options.bottom  Base, sobre el suelo.
 * @param {string} [options.doors]
 * @param {string} [options.recesses]
 * @param {string} [options.lanterns]
 * @returns {string}
 */
function drawFacade(options) {
  const { x, width, top, bottom, doors = '', recesses = '', lanterns = '' } = options;
  const height = bottom - top;
  return `
    <g>
      <rect x="${x}" y="${top}" width="${width}" height="${height}" fill="${SCENE_COLORS.wall}"/>
      <rect x="${x}" y="${top}" width="${width * 0.055}" height="${height}" fill="${SCENE_COLORS.wallShade}" opacity="0.7"/>
      <rect x="${x + width * 0.945}" y="${top}" width="${width * 0.055}" height="${height}" fill="${SCENE_COLORS.wallShade}" opacity="0.7"/>
      <rect x="${x}" y="${bottom - height * 0.2}" width="${width}" height="${height * 0.2}" fill="${SCENE_COLORS.wallShade}" opacity="0.85"/>
      <rect x="${x - 10}" y="${top - 13}" width="${width + 20}" height="15" rx="3" fill="${SCENE_COLORS.wallDeep}"/>
      <rect x="${x - 10}" y="${top - 13}" width="${width + 20}" height="4" fill="${SCENE_COLORS.gold}" opacity="0.5"/>
      ${recesses}
      ${doors}
      ${lanterns}
    </g>`;
}

/**
 * Mata de hierba: tres briznas.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} [scale]
 * @returns {string}
 */
function drawGrassTuft(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="${SCENE_COLORS.grassDeep}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.75">
      <path d="M -8 0 C -8 -8 -11 -13 -15 -17"/>
      <path d="M 0 0 C 0 -10 -1 -16 -3 -21"/>
      <path d="M 8 0 C 8 -8 11 -13 15 -16"/>
    </g>`;
}

/**
 * Construye la capa de la aldea.
 * @param {{width: number, height: number}} viewBox
 * @returns {string}
 */
export function renderVillage(viewBox) {
  const { width, height } = viewBox;

  // --- Montañas lejanas ---
  const mountains = `
    <g id="scene-mountains" data-layer="mountains">
      <path d="M 0 700 L 0 520 Q 180 430 330 520 Q 470 600 610 520 Q 760 430 900 520 Q 1060 610 1210 520 Q 1390 420 1600 520 L 1600 700 Z" fill="${SCENE_COLORS.mountainFar}" opacity="0.85"/>
      <path d="M 0 700 L 0 590 Q 240 500 430 585 Q 640 675 830 585 Q 1060 480 1250 585 Q 1420 660 1600 585 L 1600 700 Z" fill="${SCENE_COLORS.mountainNear}" opacity="0.9"/>
    </g>`;

  // --- Suelo desértico ---
  const ground = `
    <g id="scene-ground" data-layer="ground">
      <path d="M 0 640 Q 400 600 800 640 Q 1200 680 1600 640 L 1600 ${height} L 0 ${height} Z" fill="url(#ground-gradient)"/>
      <path d="M 0 760 Q 380 720 760 770 Q 1140 820 1600 750 L 1600 820 Q 1140 890 760 840 Q 380 790 0 830 Z" fill="${SCENE_COLORS.sandLight}" opacity="0.55"/>
      <path d="M 0 980 Q 420 930 820 990 Q 1220 1050 1600 980 L 1600 ${height} L 0 ${height} Z" fill="${SCENE_COLORS.sand}" opacity="0.5"/>
    </g>`;

  // --- Caminos que conducen al pesebre ---
  const paths = `
    <g id="scene-paths" data-layer="paths" opacity="0.75">
      <path d="M 300 1200 Q 480 980 640 830 Q 720 770 790 730" stroke="${SCENE_COLORS.sandLight}" stroke-width="86" fill="none" stroke-linecap="round" opacity="0.5"/>
      <path d="M 1300 1200 Q 1120 980 960 830 Q 880 770 810 730" stroke="${SCENE_COLORS.sandLight}" stroke-width="86" fill="none" stroke-linecap="round" opacity="0.5"/>
      <path d="M 800 1200 L 800 900" stroke="${SCENE_COLORS.sandLight}" stroke-width="72" fill="none" stroke-linecap="round" opacity="0.35"/>
    </g>`;

  // --- Aldea izquierda -----------------------------------------------------
  // Dos torres asoman por detrás de la fachada: sus ventanas quedan por
  // encima de la cornisa y se ven todas.
  const leftVillage = `
    <g id="scene-village-left" data-layer="village">
      ${drawHouse({ x: 230, baseY: 462, width: 200, height: 170, windows: 2, litWindows: 2, door: false })}
      ${drawHouse({ x: 26, baseY: 470, width: 200, height: 192, windows: 2, litWindows: 1, door: false })}

      ${drawFacade({
        x: 20,
        width: 460,
        top: 455,
        bottom: 632,
        recesses: [32, 145, 190, 235, 362, 404].map((x, index) =>
          drawRecess({ x, bottom: 505, width: 24, lit: index === 1 || index === 4 }),
        ).join(''),
        doors: [
          drawArchDoor({ x: 159, bottom: 632, width: 90, height: 95, color: SCENE_COLORS.violetDeep }),
          drawArchDoor({ x: 348, bottom: 632, width: 78, height: 88, color: SCENE_COLORS.night }),
        ].join(''),
        lanterns: [drawLantern(140, 478), drawLantern(352, 478)].join(''),
      })}
    </g>`;

  // --- Aldea derecha -------------------------------------------------------
  const rightVillage = `
    <g id="scene-village-right" data-layer="village">
      ${drawHouse({ x: 1150, baseY: 470, width: 244, height: 140, windows: 2, litWindows: 2, door: false })}
      ${drawHouse({ x: 1380, baseY: 470, width: 168, height: 112, windows: 0, door: false })}

      ${drawFacade({
        x: 1120,
        width: 470,
        top: 455,
        bottom: 658,
        recesses: [1180, 1222, 1264, 1350, 1392].map((x, index) =>
          drawRecess({ x, bottom: 505, width: 24, lit: index === 0 || index === 3 }),
        ).join(''),
        doors: [
          drawArchDoor({ x: 1180, bottom: 658, width: 92, height: 100, color: SCENE_COLORS.violetDeep }),
          drawArchDoor({ x: 1360, bottom: 658, width: 82, height: 92, color: SCENE_COLORS.night }),
        ].join(''),
        lanterns: [drawLantern(1150, 478), drawLantern(1310, 478)].join(''),
      })}
    </g>`;

  // --- Caserío inferior (primer plano, pegado al borde del cuadro) ---------
  // Todos los bloques llegan hasta el final, así que ninguno flota sobre la
  // arena y el conjunto se lee como una calle de casas.
  const bottomVillage = `
    <g id="scene-village-bottom" data-layer="village">
      ${drawHouse({ x: 40, baseY: 1200, width: 230, height: 320, windows: 2, litWindows: 2, door: true, domeColor: SCENE_COLORS.wall })}
      ${drawHouse({ x: 210, baseY: 1200, width: 210, height: 300, windows: 3, litWindows: 2, door: true, color: SCENE_COLORS.terracotta, shade: SCENE_COLORS.terracottaDeep })}
      ${drawHouse({ x: 300, baseY: 1200, width: 190, height: 250, windows: 2, litWindows: 1, door: false, color: SCENE_COLORS.violet, shade: SCENE_COLORS.violetDeep })}
      ${drawHouse({ x: 1040, baseY: 1200, width: 200, height: 260, windows: 2, litWindows: 1, door: false, color: SCENE_COLORS.violet, shade: SCENE_COLORS.violetDeep })}
      ${drawHouse({ x: 1180, baseY: 1200, width: 230, height: 320, windows: 3, litWindows: 3, door: true, color: SCENE_COLORS.terracotta, shade: SCENE_COLORS.terracottaDeep })}
      ${drawHouse({ x: 1340, baseY: 1200, width: 240, height: 320, windows: 2, litWindows: 2, door: true, domeColor: SCENE_COLORS.wall })}
    </g>`;

  // --- Prado del rebaño: la hierba donde pastan las ovejas ---------------
  const pasture = `
    <g id="scene-pasture" data-layer="decorations">
      <path d="M 1206 806 Q 1222 718 1322 696 Q 1430 670 1488 702 Q 1500 762 1456 806 Z" fill="${SCENE_COLORS.grass}" opacity="0.22"/>
      <path d="M 1240 802 Q 1256 738 1332 720 Q 1416 702 1462 726 Q 1470 770 1434 802 Z" fill="${SCENE_COLORS.grassDeep}" opacity="0.14"/>
      ${[
        [1244, 784, 0.8], [1276, 748, 0.62], [1310, 774, 0.9], [1342, 730, 0.55],
        [1372, 770, 0.85], [1404, 736, 0.6], [1436, 780, 0.8], [1466, 748, 0.5],
        [1290, 794, 0.7], [1356, 798, 0.75],
      ]
        .map(([x, y, scale]) => drawGrassTuft(x, y, scale))
        .join('')}
    </g>`;

  // --- Cipreses: la vegetación característica del desierto ----------------
  // Cada uno está plantado en un sitio con sentido: unos delante de las
  // fachadas, otros flanqueando la puerta de la ciudad y otros en el borde
  // del prado del rebaño. Los que se solapaban con el círculo de la
  // Natividad se retiraron, porque ahí no se veían nada.
  const trees = `
    <g id="scene-trees" data-layer="trees">
      ${[
        [246, 660, 0.6, 0, true],
        [286, 660, 0.42, 2, false],
        [1102, 706, 0.58, 2, false],
        [1516, 706, 0.66, 1, true],
        [1550, 706, 0.46, 0, false],
        [268, 1190, 0.86, 2, true],
        [318, 1180, 0.58, 0, false],
        [610, 1190, 0.74, 1, true],
        [990, 1190, 0.78, 0, true],
        [1144, 1184, 0.54, 2, false],
        [1268, 1190, 0.88, 1, true],
        [1404, 1186, 0.6, 0, false],
      ]
        .map(([x, y, scale, tone, flip]) => drawCypress({ x, y, scale, tone, flip }))
        .join('')}
    </g>`;

  // --- Matas de piedra y matorrales, al pie de los muros -------------------
  const bushes = `
    <g id="scene-bushes" data-layer="decorations">
      ${[
        [268, 676, 0.7],
        [654, 1178, 0.9],
        [968, 1188, 0.7],
        [1566, 706, 0.7],
      ]
        .map(([x, y, scale]) => drawShrub({ x, y, scale }))
        .join('')}
    </g>`;

  // --- Pozo de agua y la mujer que lleva el balde -------------------------
  // Van un poco más atrás que el caserío del primer plano (escala menor y
  // una línea de suelo más alta), junto a la puerta de la ciudad, que es el
  // centro del cuadro. Así el pozo y la portadora quedan a la vista: antes
  // estaban tapados por el arco de la ciudad y no se veían.
  const villageWell = `
    <g id="scene-village-well" data-layer="characters">
      ${drawWell({ x: 1000, y: 880, scale: 0.9 })}
      ${drawWaterCarrier({ x: 932, y: 876, scale: 0.85 })}
    </g>`;

  // --- Puerta de la ciudad -------------------------------------------------
  // Un arco de piedra con moldura, un túnel violeta y una puerta iluminada
  // dentro: se lee como la entrada a la ciudad, no como un boquete oscuro.
  const cityGate = `
    <g id="scene-city-gate" data-layer="village">
      <!-- Pilastras que enmarcan la entrada -->
      ${[660, 900]
        .map(
          (x) => `
          <rect x="${x}" y="986" width="42" height="214" fill="${SCENE_COLORS.wall}"/>
          <rect x="${x}" y="986" width="13" height="214" fill="${SCENE_COLORS.wallShade}" opacity="0.85"/>
          <rect x="${x - 8}" y="962" width="58" height="26" rx="3" fill="${SCENE_COLORS.wallDeep}"/>
          <rect x="${x - 8}" y="962" width="58" height="4" fill="${SCENE_COLORS.gold}" opacity="0.55"/>
          <rect x="${x - 6}" y="1170" width="54" height="30" rx="3" fill="${SCENE_COLORS.wallDeep}"/>
          <rect x="${x - 6}" y="1170" width="54" height="4" fill="${SCENE_COLORS.gold}" opacity="0.45"/>`,
        )
        .join('')}

      <!-- Moldura de piedra del hueco -->
      <path d="M 676 1200 L 676 1046 Q 800 906 924 1046 L 924 1200 L 884 1200 L 884 1062 Q 800 944 716 1062 L 716 1200 Z" fill="${SCENE_COLORS.wallDeep}"/>
      <!-- Túnel -->
      <path d="M 716 1200 L 716 1062 Q 800 944 884 1062 L 884 1200 Z" fill="url(#gate-recess)"/>
      <path d="M 716 1200 L 716 1062 Q 800 944 884 1062 L 884 1200" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="3" opacity="0.55"/>
      <!-- Segundo anillo: da profundidad al túnel -->
      <path d="M 750 1200 L 750 1080 Q 800 1000 850 1080 L 850 1200 Z" fill="#4b3468"/>
      <!-- Puerta abierta con la luz cálida que sale de dentro -->
      <path d="M 770 1200 L 770 1128 Q 800 1080 830 1128 L 830 1200 Z" fill="${SCENE_COLORS.amber}"/>
      <path d="M 770 1200 L 770 1128 Q 800 1080 830 1128 L 830 1200 Z" fill="${SCENE_COLORS.amberSoft}" opacity="0.5"/>
      <!-- Charco de luz sobre la arena -->
      <ellipse cx="800" cy="1194" rx="128" ry="30" fill="${SCENE_COLORS.amberSoft}" opacity="0.3"/>

      <!-- Faroles colgados de las pilastras -->
      ${drawLantern(681, 1042, 1)}
      ${drawLantern(919, 1042, 1)}
    </g>`;

  return `${mountains}${ground}${paths}${leftVillage}${rightVillage}${bottomVillage}${pasture}${villageWell}${cityGate}${trees}${bushes}`;
}

export default renderVillage;
