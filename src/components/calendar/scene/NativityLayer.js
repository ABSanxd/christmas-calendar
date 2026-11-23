/**
 * Capa central: el círculo de la Natividad con la Sagrada Familia.
 */

import { SCENE_COLORS, group } from './shapes.js';

/** Centro del círculo de la Natividad. */
export const NATIVITY_CENTER = { x: 800, y: 556 };
/** Radio del círculo de la Natividad. */
export const NATIVITY_RADIUS = 248;

/**
 * Construye la capa de la Natividad.
 * @returns {string}
 */
export function renderNativity() {
  const { x: cx, y: cy } = NATIVITY_CENTER;
  const r = NATIVITY_RADIUS;

  const rays = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * 74;
    const y1 = cy - 120 + Math.sin(angle) * 52;
    const x2 = cx + Math.cos(angle) * 190;
    const y2 = cy - 120 + Math.sin(angle) * 132;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${SCENE_COLORS.goldLight}" stroke-width="2" opacity="0.28"/>`;
  }).join('');

  return `
    <g id="scene-nativity" data-layer="nativity">
      <!-- Aros dorados -->
      <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="10" opacity="0.85"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="3" opacity="0.9"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#nativity-disc)"/>

      <!-- Resplandor interior -->
      <ellipse cx="${cx}" cy="${cy - 90}" rx="230" ry="180" fill="url(#nativity-glow)"/>

      <!-- Rays -->
      <g id="nativity-rays" data-layer="rays">${rays}</g>

      <!-- Establo -->
      <g id="nativity-stable" data-layer="stable">
        <path d="M ${cx - 150} ${cy + 40} L ${cx} ${cy - 130} L ${cx + 150} ${cy + 40} Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.95"/>
        <path d="M ${cx - 150} ${cy + 40} L ${cx} ${cy - 130} L ${cx + 150} ${cy + 40}" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="4" opacity="0.85"/>
        <rect x="${cx - 142}" y="${cy + 30}" width="12" height="150" rx="5" fill="${SCENE_COLORS.roseDeep}"/>
        <rect x="${cx + 130}" y="${cy + 30}" width="12" height="150" rx="5" fill="${SCENE_COLORS.roseDeep}"/>
        <path d="M ${cx - 130} ${cy + 40} Q ${cx} ${cy + 8} ${cx + 130} ${cy + 40} L ${cx + 130} ${cy + 58} Q ${cx} ${cy + 26} ${cx - 130} ${cy + 58} Z" fill="${SCENE_COLORS.sandDark}" opacity="0.85"/>
        <ellipse cx="${cx}" cy="${cy + 156}" rx="150" ry="26" fill="${SCENE_COLORS.sandDark}" opacity="0.7"/>
      </g>

      <!-- María, arrodillada -->
      <g id="character-mary" data-layer="characters">
        <path d="M ${cx - 92} ${cy + 150} Q ${cx - 104} ${cy + 40} ${cx - 62} ${cy + 4} Q ${cx - 30} ${cy - 26} ${cx - 2} ${cy + 6} Q ${cx + 18} ${cy + 52} ${cx + 4} ${cy + 150} Z" fill="#3f7f9c"/>
        <path d="M ${cx - 92} ${cy + 150} Q ${cx - 60} ${cy + 66} ${cx - 26} ${cy + 46} Q ${cx - 6} ${cy + 76} ${cx + 4} ${cy + 150} Z" fill="#2f6383" opacity="0.85"/>
        <path d="M ${cx - 62} ${cy + 4} Q ${cx - 40} ${cy - 40} ${cx - 6} ${cy - 16} Q ${cx - 24} ${cy + 2} ${cx - 62} ${cy + 4} Z" fill="${SCENE_COLORS.ivory}" opacity="0.92"/>
        <circle cx="${cx - 36}" cy="${cy - 26}" r="20" fill="#e8c9a8"/>
        <path d="M ${cx - 56} ${cy - 30} Q ${cx - 36} ${cy - 56} ${cx - 16} ${cy - 28} Q ${cx - 38} ${cy - 38} ${cx - 56} ${cy - 30} Z" fill="${SCENE_COLORS.violetDeep}" opacity="0.8"/>
        <path d="M ${cx - 58} ${cy + 22} Q ${cx - 28} ${cy + 6} ${cx - 6} ${cy + 24}" stroke="${SCENE_COLORS.ivory}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.9"/>
      </g>

      <!-- José, de pie con cayado -->
      <g id="character-joseph" data-layer="characters">
        <path d="M ${cx + 46} ${cy + 150} Q ${cx + 38} ${cy + 40} ${cx + 58} ${cy + 2} Q ${cx + 84} ${cy - 18} ${cx + 108} ${cy + 4} Q ${cx + 124} ${cy + 56} ${cx + 118} ${cy + 150} Z" fill="${SCENE_COLORS.rose}"/>
        <path d="M ${cx + 86} ${cy + 150} Q ${cx + 92} ${cy + 54} ${cx + 96} ${cy + 14} L ${cx + 118} ${cy + 6} Q ${cx + 126} ${cy + 60} ${cx + 118} ${cy + 150} Z" fill="${SCENE_COLORS.roseDeep}" opacity="0.6"/>
        <circle cx="${cx + 80}" cy="${cy - 22}" r="20" fill="#e8c9a8"/>
        <path d="M ${cx + 60} ${cy - 28} Q ${cx + 80} ${cy - 50} ${cx + 100} ${cy - 26} Q ${cx + 80} ${cy - 34} ${cx + 60} ${cy - 28} Z" fill="${SCENE_COLORS.ink}" opacity="0.7"/>
        <path d="M ${cx + 58} ${cy + 18} L ${cx + 30} ${cy - 20}" stroke="${SCENE_COLORS.sandDark}" stroke-width="6" stroke-linecap="round"/>
        <path d="M ${cx + 46} ${cy + 20} Q ${cx + 22} ${cy + 8} ${cx + 10} ${cy + 22}" stroke="${SCENE_COLORS.roseDeep}" stroke-width="6" fill="none" stroke-linecap="round"/>
      </g>

      <!-- El Niño Jesús en el pesebre -->
      <g id="character-baby" data-layer="characters">
        <ellipse cx="${cx + 8}" cy="${cy + 88}" rx="62" ry="18" fill="${SCENE_COLORS.sandDark}" opacity="0.9"/>
        <path d="M ${cx - 44} ${cy + 88} L ${cx - 44} ${cy + 50} A 52 26 0 0 1 ${cx + 60} ${cy + 50} L ${cx + 60} ${cy + 88} Z" fill="${SCENE_COLORS.sandDark}" opacity="0.95"/>
        <ellipse cx="${cx + 8}" cy="${cy + 52}" rx="34" ry="20" fill="${SCENE_COLORS.ivory}"/>
        <circle cx="${cx + 8}" cy="${cy + 34}" r="17" fill="#f1ddc4"/>
        <circle cx="${cx + 8}" cy="${cy + 34}" r="30" fill="${SCENE_COLORS.goldLight}" opacity="0.35"/>
        <path d="M ${cx + 8} ${cy + 6} l 5 12 13 2 -9 9 2 13 -11 -6 -11 6 2 -13 -9 -9 13 -2 z" fill="${SCENE_COLORS.goldLight}" opacity="0.9"/>
      </g>

      <!-- Buey y asno -->
      <g id="scene-animals" data-layer="characters" opacity="0.95">
        <g transform="translate(${cx - 176} ${cy + 30})">
          <path d="M -34 0 Q -34 -30 -12 -36 Q 10 -42 16 -22 Q 20 -8 8 0 Z" fill="${SCENE_COLORS.roseDeep}"/>
          <path d="M -22 -34 Q -32 -56 -46 -54 Q -38 -40 -34 -30 Z" fill="${SCENE_COLORS.roseDeep}"/>
          <path d="M -6 -36 Q 4 -56 18 -52 Q 6 -40 2 -30 Z" fill="${SCENE_COLORS.roseDeep}"/>
          <circle cx="-4" cy="-24" r="2.6" fill="${SCENE_COLORS.ink}"/>
        </g>
        <g transform="translate(${cx + 186} ${cy + 34})">
          <path d="M -28 0 Q -30 -32 -8 -38 Q 16 -42 18 -20 Q 20 -6 8 0 Z" fill="${SCENE_COLORS.ivoryDeep}"/>
          <path d="M -16 -36 Q -26 -60 -38 -56 Q -28 -42 -26 -30 Z" fill="${SCENE_COLORS.ivoryDeep}"/>
          <path d="M 2 -38 Q 14 -58 26 -52 Q 12 -42 10 -30 Z" fill="${SCENE_COLORS.ivoryDeep}"/>
          <circle cx="-2" cy="-26" r="2.4" fill="${SCENE_COLORS.ink}"/>
        </g>
      </g>

      <!-- Estrellitas de fondo del disco -->
      <g data-layer="decorations" opacity="0.7">
        <circle cx="${cx - 190}" cy="${cy - 130}" r="3" fill="${SCENE_COLORS.violetLight}"/>
        <circle cx="${cx + 186}" cy="${cy - 152}" r="2.6" fill="${SCENE_COLORS.goldLight}"/>
        <circle cx="${cx - 150}" cy="${cy + 150}" r="2.4" fill="${SCENE_COLORS.goldLight}"/>
        <circle cx="${cx + 158}" cy="${cy + 142}" r="3" fill="${SCENE_COLORS.violetLight}"/>
      </g>
    </g>
  `;
}

export default renderNativity;
