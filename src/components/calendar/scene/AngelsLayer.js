/**
 * Capa celeste: ángeles trompetistas y la Estrella de Belén.
 */

import { SCENE_COLORS } from './shapes.js';
import { drawAngel } from './characters/Angel.js';

/**
 * Construye la capa de ángeles y la estrella.
 * @returns {string}
 */
export function renderAngels() {
  return `
    <g id="scene-angels" data-layer="angels">
      ${drawAngel({ x: 392, y: 262, scale: 0.84 })}
      ${drawAngel({ x: 1208, y: 262, scale: 0.84, flip: true, robe: '#9c7ec9' })}
    </g>

    <g id="scene-star" data-layer="star">
      <circle cx="800" cy="150" r="86" fill="url(#star-halo)"/>
      <path d="M 800 62 L 818 122 L 878 140 L 818 158 L 800 218 L 782 158 L 722 140 L 782 122 Z" fill="url(#star-metal)"/>
      <path d="M 800 62 L 818 122 L 878 140 L 818 158 L 800 218 L 782 158 L 722 140 L 782 122 Z" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2" opacity="0.9"/>
      <path d="M 800 96 L 806 134 L 844 140 L 806 146 L 800 184 L 794 146 L 756 140 L 794 134 Z" fill="${SCENE_COLORS.goldLight}" opacity="0.95"/>
      <circle cx="800" cy="140" r="13" fill="${SCENE_COLORS.goldBright}" opacity="0.95"/>
      <path d="M 800 218 L 800 300" stroke="${SCENE_COLORS.goldLight}" stroke-width="3" opacity="0.35"/>
    </g>
  `;
}

export default renderAngels;
