/**
 * Capa de la aldea de Belén: casas, murallas, palmeras y caminos.
 */

import { SCENE_COLORS, drawHouse, drawPalm, group } from './shapes.js';

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
      <path d="M 800 1200 L 800 840" stroke="${SCENE_COLORS.sandLight}" stroke-width="72" fill="none" stroke-linecap="round" opacity="0.35"/>
    </g>`;

  // --- Aldea izquierda ---
  const leftVillage = `
    <g id="scene-village-left" data-layer="village">
      ${drawHouse({ x: 40, baseY: 660, width: 210, height: 250, windows: 2, door: true })}
      ${drawHouse({ x: 150, baseY: 640, width: 175, height: 195, windows: 2, door: false, color: SCENE_COLORS.ivoryShade, shade: SCENE_COLORS.ivoryDeep })}
      ${drawHouse({ x: 236, baseY: 672, width: 230, height: 300, windows: 3, door: true })}
      <rect x="24" y="470" width="452" height="196" fill="${SCENE_COLORS.ivoryShade}" opacity="0.96"/>
      <rect x="24" y="470" width="452" height="14" fill="${SCENE_COLORS.gold}" opacity="0.45"/>
      <path d="M 110 666 L 110 566 A 46 46 0 0 1 202 566 L 202 666 Z" fill="${SCENE_COLORS.violetDeep}" opacity="0.9"/>
      <path d="M 110 666 L 110 566 A 46 46 0 0 1 202 566 L 202 666 Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2" opacity="0.6"/>
      <path d="M 300 666 L 300 590 A 32 32 0 0 1 364 590 L 364 666 Z" fill="${SCENE_COLORS.night}" opacity="0.85"/>
      <path d="M 300 666 L 300 590 A 32 32 0 0 1 364 590 L 364 666 Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" opacity="0.5"/>
    </g>`;

  // --- Aldea derecha ---
  const rightVillage = `
    <g id="scene-village-right" data-layer="village">
      ${drawHouse({ x: 1150, baseY: 672, width: 240, height: 300, windows: 3, door: true })}
      ${drawHouse({ x: 1320, baseY: 640, width: 185, height: 205, windows: 2, door: false, color: SCENE_COLORS.ivoryShade, shade: SCENE_COLORS.ivoryDeep })}
      ${drawHouse({ x: 1390, baseY: 668, width: 190, height: 240, windows: 2, door: true })}
      <rect x="1128" y="470" width="452" height="200" fill="${SCENE_COLORS.ivoryShade}" opacity="0.96"/>
      <rect x="1128" y="470" width="452" height="14" fill="${SCENE_COLORS.gold}" opacity="0.45"/>
      <path d="M 1180 670 L 1180 566 A 46 46 0 0 1 1272 566 L 1272 670 Z" fill="${SCENE_COLORS.violetDeep}" opacity="0.9"/>
      <path d="M 1180 670 L 1180 566 A 46 46 0 0 1 1272 566 L 1272 670 Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2" opacity="0.6"/>
      <path d="M 1400 668 L 1400 592 A 30 30 0 0 1 1460 592 L 1460 668 Z" fill="${SCENE_COLORS.night}" opacity="0.85"/>
    </g>`;

  // --- Caserío inferior (como los edificios de la referencia) ---
  const bottomVillage = `
    <g id="scene-village-bottom" data-layer="village">
      ${drawHouse({ x: 60, baseY: 1180, width: 250, height: 300, windows: 2, door: true, color: SCENE_COLORS.ivoryShade, shade: SCENE_COLORS.ivoryDeep })}
      ${drawHouse({ x: 210, baseY: 1150, width: 210, height: 250, windows: 3, door: true, color: SCENE_COLORS.rose, shade: SCENE_COLORS.roseDeep })}
      ${drawHouse({ x: 300, baseY: 1180, width: 190, height: 230, windows: 2, door: false, color: SCENE_COLORS.violet, shade: SCENE_COLORS.violetDeep })}
      ${drawHouse({ x: 1110, baseY: 1180, width: 200, height: 240, windows: 2, door: false, color: SCENE_COLORS.violet, shade: SCENE_COLORS.violetDeep })}
      ${drawHouse({ x: 1180, baseY: 1150, width: 230, height: 270, windows: 3, door: true, color: SCENE_COLORS.rose, shade: SCENE_COLORS.roseDeep })}
      ${drawHouse({ x: 1300, baseY: 1180, width: 240, height: 300, windows: 2, door: true, color: SCENE_COLORS.ivoryShade, shade: SCENE_COLORS.ivoryDeep })}
    </g>`;

  // --- Palmeras ---
  const palms = `
    <g id="scene-palms" data-layer="palms">
      ${drawPalm({ x: 505, y: 690, scale: 0.92 })}
      ${drawPalm({ x: 1092, y: 700, scale: 0.86, flip: true })}
      ${drawPalm({ x: 545, y: 1140, scale: 1.05, flip: true })}
      ${drawPalm({ x: 1058, y: 1140, scale: 1.05 })}
      ${drawPalm({ x: 690, y: 690, scale: 0.7, flip: true })}
    </g>`;

  // --- Arbustos y vegetación ---
  const bushes = `
    <g id="scene-bushes" data-layer="decorations">
      ${[
        [300, 690, 0.9],
        [960, 700, 0.85],
        [640, 1160, 1],
        [930, 1170, 0.95],
      ]
        .map(
          ([x, y, scale]) => group(
            `<path d="M -26 0 Q -30 -24 -12 -26 Q -4 -40 8 -28 Q 26 -30 28 -8 Q 20 4 0 4 Z" fill="${SCENE_COLORS.violetLight}" opacity="0.85"/>`,
            { x, y, scale },
          ),
        )
        .join('')}
    </g>`;

  // --- Arco monumental del centro inferior ---
  const cityGate = `
    <g id="scene-city-gate" data-layer="village">
      <path d="M 690 1180 L 690 966 Q 800 790 910 966 L 910 1180 Z" fill="url(#gate-recess)"/>
      <path d="M 690 1180 L 690 966 Q 800 790 910 966 L 910 1180" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="9"/>
      <path d="M 706 1180 L 706 980 Q 800 828 894 980 L 894 1180" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2.4" opacity="0.75"/>
      <path d="M 722 1180 L 722 992 Q 800 868 878 992 L 878 1180" fill="none" stroke="${SCENE_COLORS.violetLight}" stroke-width="3" opacity="0.6"/>

      <!-- Columnas -->
      ${[690, 910]
        .map(
          (x) => `
          <rect x="${x - 26}" y="940" width="52" height="240" fill="${SCENE_COLORS.ivory}" opacity="0.96"/>
          <rect x="${x - 26}" y="940" width="16" height="240" fill="${SCENE_COLORS.ivoryShade}" opacity="0.8"/>
          <rect x="${x - 36}" y="922" width="72" height="24" fill="${SCENE_COLORS.gold}" opacity="0.85"/>
          <rect x="${x - 34}" y="1150" width="68" height="30" fill="${SCENE_COLORS.gold}" opacity="0.75"/>
          <circle cx="${x}" cy="1000" r="9" fill="${SCENE_COLORS.violet}" opacity="0.55"/>
          <circle cx="${x}" cy="1060" r="9" fill="${SCENE_COLORS.violet}" opacity="0.45"/>
          <circle cx="${x}" cy="1120" r="9" fill="${SCENE_COLORS.violet}" opacity="0.35"/>`,
        )
        .join('')}

      <!-- Puerta iluminada -->
      <path d="M 764 1180 L 764 1074 A 36 36 0 0 1 836 1074 L 836 1180 Z" fill="${SCENE_COLORS.violetDeep}"/>
      <path d="M 764 1180 L 764 1074 A 36 36 0 0 1 836 1074 L 836 1180 Z" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2.4"/>
      <ellipse cx="800" cy="1060" rx="96" ry="70" fill="${SCENE_COLORS.goldLight}" opacity="0.18"/>
      <circle cx="800" cy="1040" r="7" fill="${SCENE_COLORS.goldLight}" opacity="0.75"/>
    </g>`;

  return `${mountains}${ground}${paths}${leftVillage}${rightVillage}${bottomVillage}${cityGate}${palms}${bushes}`;
}

export default renderVillage;
