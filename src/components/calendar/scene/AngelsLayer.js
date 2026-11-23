/**
 * Capa celeste: ángeles trompetistas y la Estrella de Belén.
 */

import { SCENE_COLORS, group } from './shapes.js';

/**
 * Ángel trompetista.
 * @param {{x: number, y: number, scale?: number, flip?: boolean, robe?: string}} options
 * @returns {string}
 */
export function drawAngel(options) {
  const { x, y, scale = 1, flip = false, robe = SCENE_COLORS.violetLight } = options;

  const angel = `
    <!-- Halo -->
    <circle cx="0" cy="-96" r="30" fill="${SCENE_COLORS.goldLight}" opacity="0.35"/>
    <circle cx="0" cy="-96" r="22" fill="${SCENE_COLORS.goldLight}" opacity="0.5"/>

    <!-- Ala posterior -->
    <path d="M -14 -76 C -54 -104 -86 -92 -96 -58 C -72 -60 -50 -52 -30 -40 Z" fill="${SCENE_COLORS.ivory}" opacity="0.9"/>
    <path d="M -20 -68 C -50 -82 -70 -76 -78 -56" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" fill="none" opacity="0.55"/>

    <!-- Manto -->
    <path d="M -34 26 Q -40 -40 0 -74 Q 40 -40 34 26 Q 18 40 0 40 Q -18 40 -34 26 Z" fill="${robe}"/>
    <path d="M 6 -66 Q 34 -30 30 26 Q 18 38 4 38 Z" fill="${SCENE_COLORS.violetDeep}" opacity="0.4"/>
    <path d="M -34 26 Q 0 44 34 26 L 34 34 Q 0 52 -34 34 Z" fill="${SCENE_COLORS.gold}" opacity="0.55"/>

    <!-- Cabeza -->
    <circle cx="0" cy="-96" r="17" fill="#e8c9a8"/>
    <path d="M -17 -100 Q 0 -122 17 -100 Q 0 -110 -17 -100 Z" fill="${SCENE_COLORS.goldDeep}" opacity="0.75"/>
    <circle cx="-5" cy="-97" r="1.8" fill="${SCENE_COLORS.ink}"/>
    <circle cx="5" cy="-97" r="1.8" fill="${SCENE_COLORS.ink}"/>

    <!-- Brazo y trompeta -->
    <path d="M 18 -44 Q 42 -44 56 -56" stroke="${robe}" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M 52 -58 L 118 -74 L 118 -50 L 52 -48 Z" fill="${SCENE_COLORS.gold}"/>
    <path d="M 52 -58 L 118 -74 L 118 -68 L 52 -52 Z" fill="${SCENE_COLORS.goldLight}" opacity="0.85"/>
    <circle cx="118" cy="-62" r="10" fill="${SCENE_COLORS.goldLight}" opacity="0.75"/>

    <!-- Estandarte que cuelga de la trompeta -->
    <path d="M 70 -48 Q 100 -34 96 6 Q 93 40 72 52 Q 84 22 74 -46 Z" fill="${SCENE_COLORS.pink}" opacity="0.92"/>
    <path d="M 70 -48 Q 100 -34 96 6 Q 93 40 72 52" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2" opacity="0.7"/>
    <path d="M 80 -18 Q 90 -26 92 -14 Q 86 -4 78 -10 Z" fill="${SCENE_COLORS.goldLight}" opacity="0.85"/>

    <!-- Ala delantera -->
    <path d="M 16 -70 C 46 -96 76 -88 88 -58 C 66 -60 48 -52 30 -40 Z" fill="${SCENE_COLORS.ivory}" opacity="0.82"/>
    <path d="M 22 -64 C 44 -78 62 -72 72 -54" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" fill="none" opacity="0.5"/>
  `;

  return group(angel, { x, y, scale, flip });
}

/**
 * Construye la capa de ángeles y la estrella.
 * @returns {string}
 */
export function renderAngels() {
  return `
    <g id="scene-angels" data-layer="angels">
      ${drawAngel({ x: 388, y: 168, scale: 0.96 })}
      ${drawAngel({ x: 1212, y: 164, scale: 0.96, flip: true, robe: '#8f6aa6' })}
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
