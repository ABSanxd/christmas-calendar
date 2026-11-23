/**
 * Capa de personajes: los Reyes Magos, los pastores y sus ovejas.
 */

import { SCENE_COLORS, drawHorse, drawPerson, drawSheep, group } from './shapes.js';

/**
 * Construye la capa de personajes.
 * @returns {string}
 */
export function renderCharacters() {
  // --- Reyes Magos a caballo ---
  const magi = `
    <g id="scene-magi" data-layer="characters">
      <g transform="translate(232 726)">
        ${drawHorse({ x: 0, y: 0, scale: 0.92 })}
        <g transform="translate(-6 -54)">
          <path d="M -26 22 Q -30 -22 0 -48 Q 30 -22 26 22 Q 12 32 0 32 Q -12 32 -26 22 Z" fill="${SCENE_COLORS.violet}"/>
          <path d="M 8 -44 Q 28 -18 24 22 Q 12 31 2 31 Z" fill="${SCENE_COLORS.violetDeep}" opacity="0.45"/>
          <circle cx="0" cy="-60" r="15" fill="#e2bd97"/>
          <path d="M -15 -64 Q 0 -82 15 -62 L 12 -70 L 4 -76 L -4 -76 L -12 -70 Z" fill="${SCENE_COLORS.gold}"/>
          <circle cx="0" cy="-78" r="4" fill="${SCENE_COLORS.goldLight}"/>
          <circle cx="-4" cy="-61" r="1.6" fill="${SCENE_COLORS.ink}"/>
          <circle cx="4" cy="-61" r="1.6" fill="${SCENE_COLORS.ink}"/>
        </g>
        <g transform="translate(46 -46)">
          <path d="M -20 18 Q -24 -18 0 -40 Q 24 -18 20 18 Q 10 26 0 26 Q -10 26 -20 18 Z" fill="${SCENE_COLORS.rose}"/>
          <circle cx="0" cy="-50" r="13" fill="#e2bd97"/>
          <path d="M -13 -54 Q 0 -70 13 -52 L 10 -60 L 2 -64 L -3 -64 L -10 -60 Z" fill="${SCENE_COLORS.gold}"/>
          <circle cx="0" cy="-66" r="3.4" fill="${SCENE_COLORS.goldLight}"/>
        </g>
      </g>

      <g transform="translate(1392 748) scale(-1 1)">
        ${drawHorse({ x: 0, y: 0, scale: 0.88 })}
        <g transform="translate(-4 -52)">
          <path d="M -24 20 Q -28 -20 0 -44 Q 28 -20 24 20 Q 11 29 0 29 Q -11 29 -24 20 Z" fill="${SCENE_COLORS.violetDeep}"/>
          <circle cx="0" cy="-56" r="14" fill="#e2bd97"/>
          <path d="M -14 -60 Q 0 -76 14 -58 L 11 -66 L 3 -70 L -4 -70 L -11 -66 Z" fill="${SCENE_COLORS.gold}"/>
          <circle cx="0" cy="-73" r="3.6" fill="${SCENE_COLORS.goldLight}"/>
        </g>
      </g>
    </g>`;

  // --- Pastores ---
  const shepherds = `
    <g id="scene-shepherds" data-layer="characters">
      ${group(
        `
          ${drawPerson({ x: 0, y: 0, height: 150, robe: SCENE_COLORS.sandDark, robeDark: SCENE_COLORS.roseDeep, arms: 'holding' })}
          <path d="M 26 -86 L 34 6" stroke="${SCENE_COLORS.roseDeep}" stroke-width="6" stroke-linecap="round"/>
        `,
        { x: 1146, y: 742 },
      )}
      ${group(
        `
          ${drawPerson({ x: 0, y: 0, height: 132, robe: SCENE_COLORS.violetLight, robeDark: SCENE_COLORS.violet, arms: 'raised' })}
          <path d="M 24 -74 L 30 2" stroke="${SCENE_COLORS.roseDeep}" stroke-width="5" stroke-linecap="round"/>
        `,
        { x: 1214, y: 764 },
      )}
    </g>`;

  // --- Ovejas ---
  const sheep = `
    <g id="scene-sheep" data-layer="characters">
      ${drawSheep({ x: 1318, y: 792, scale: 1 })}
      ${drawSheep({ x: 1382, y: 774, scale: 0.88, flip: true })}
      ${drawSheep({ x: 1434, y: 800, scale: 0.95 })}
      ${drawSheep({ x: 1480, y: 778, scale: 0.82, flip: true })}
    </g>`;

  return `${magi}${shepherds}${sheep}`;
}

export default renderCharacters;
