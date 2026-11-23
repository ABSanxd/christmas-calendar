/**
 * Capa central: el círculo de la Natividad con la Sagrada Familia.
 *
 * Cada personaje es un componente aparte (María, José y el Niño) para poder
 * colocarlos y escalarlos con libertad dentro de la escena.
 */

import { SCENE_COLORS } from './shapes.js';
import { drawMary } from './characters/Mary.js';
import { drawJoseph } from './characters/Joseph.js';
import { drawBabyJesus } from './characters/BabyJesus.js';

/** Centro del círculo de la Natividad. */
export const NATIVITY_CENTER = { x: 800, y: 556 };
/** Radio del círculo de la Natividad. */
export const NATIVITY_RADIUS = 248;

/** Suelo del establo (dentro del círculo). */
const FLOOR = 604;

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
      <!-- Recorte del disco: el suelo de tierra no puede salirse -->
      <clipPath id="nativity-clip">
        <circle cx="${cx}" cy="${cy}" r="${r}"/>
      </clipPath>

      <!-- Aros dorados -->
      <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="none" stroke="${SCENE_COLORS.goldDeep}" stroke-width="10" opacity="0.85"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="3" opacity="0.9"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#nativity-disc)"/>

      <!-- Resplandor interior -->
      <ellipse cx="${cx}" cy="${cy - 90}" rx="230" ry="180" fill="url(#nativity-glow)"/>

      <!-- Rayos -->
      <g id="nativity-rays" data-layer="rays">${rays}</g>

      <!-- Suelo de tierra del establo: un montoncito dentro del disco, para
           que la familia no quede flotando dentro del círculo. -->
      <g clip-path="url(#nativity-clip)" data-layer="ground">
        <path d="M ${cx - 250} ${FLOOR + 34}
                 C ${cx - 150} ${FLOOR - 14} ${cx - 60} ${FLOOR - 2} ${cx} ${FLOOR - 12}
                 C ${cx + 60} ${FLOOR - 2} ${cx + 150} ${FLOOR - 14} ${cx + 250} ${FLOOR + 34}
                 L ${cx + 250} ${cy + r + 40} L ${cx - 250} ${cy + r + 40} Z"
              fill="${SCENE_COLORS.sandDark}"/>
        <path d="M ${cx - 250} ${FLOOR + 30}
                 C ${cx - 150} ${FLOOR - 18} ${cx - 60} ${FLOOR - 6} ${cx} ${FLOOR - 16}
                 C ${cx + 60} ${FLOOR - 6} ${cx + 150} ${FLOOR - 18} ${cx + 250} ${FLOOR + 30}
                 L ${cx + 250} ${cy + r + 40} L ${cx - 250} ${cy + r + 40} Z"
              fill="${SCENE_COLORS.sand}"/>
        <path d="M ${cx - 250} ${FLOOR + 26}
                 C ${cx - 150} ${FLOOR - 22} ${cx - 60} ${FLOOR - 10} ${cx} ${FLOOR - 20}
                 C ${cx + 60} ${FLOOR - 10} ${cx + 150} ${FLOOR - 22} ${cx + 250} ${FLOOR + 26}
                 L ${cx + 250} ${cy + r + 40} L ${cx - 250} ${cy + r + 40} Z"
              fill="${SCENE_COLORS.sandLight}"/>
        <!-- Paja suelta sobre la tierra -->
        <g stroke="${SCENE_COLORS.sandDark}" stroke-width="2" fill="none" opacity="0.65" stroke-linecap="round">
          <path d="M ${cx - 190} ${FLOOR + 22} l 10 -8 M ${cx - 172} ${FLOOR + 30} l -8 -10"/>
          <path d="M ${cx - 130} ${FLOOR - 2} l 9 -7 M ${cx - 104} ${FLOOR + 14} l -9 -9"/>
          <path d="M ${cx + 96} ${FLOOR + 12} l 10 -8 M ${cx + 128} ${FLOOR - 4} l -8 -9"/>
          <path d="M ${cx + 166} ${FLOOR + 24} l 9 -7 M ${cx + 192} ${FLOOR + 18} l -9 -9"/>
          <path d="M ${cx - 44} ${FLOOR + 34} l 10 -7 M ${cx + 40} ${FLOOR + 30} l -9 -8"/>
        </g>
      </g>

      <!-- Sombra que asienta el establo sobre la tierra -->
      <g clip-path="url(#nativity-clip)" opacity="0.28">
        <ellipse cx="${cx}" cy="${FLOOR + 16}" rx="150" ry="22" fill="#8a7647"/>
      </g>

      <!-- Establo: choza de techo alto, para que quepa toda la familia -->
      <g id="nativity-stable" data-layer="stable">
        <path d="M ${cx - 132} ${FLOOR + 8} L ${cx} ${FLOOR - 172} L ${cx + 132} ${FLOOR + 8} Z"
              fill="${SCENE_COLORS.roseDeep}" opacity="0.95"/>
        <path d="M ${cx - 132} ${FLOOR + 8} L ${cx} ${FLOOR - 172} L ${cx + 132} ${FLOOR + 8}"
              fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="3" opacity="0.8"/>
        <path d="M ${cx - 132} ${FLOOR + 8} L ${cx + 132} ${FLOOR + 8}" stroke="${SCENE_COLORS.sandDark}" stroke-width="5" opacity="0.7"/>
        <rect x="${cx - 136}" y="${FLOOR - 4}" width="9" height="36" rx="4" fill="${SCENE_COLORS.roseDeep}"/>
        <rect x="${cx + 127}" y="${FLOOR - 4}" width="9" height="36" rx="4" fill="${SCENE_COLORS.roseDeep}"/>
        <!-- Vigas del tejado -->
        <path d="M ${cx - 108} ${FLOOR + 8} L ${cx - 6} ${FLOOR - 142}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="2" opacity="0.45"/>
        <path d="M ${cx + 108} ${FLOOR + 8} L ${cx + 6} ${FLOOR - 142}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="2" opacity="0.45"/>
        <path d="M ${cx - 76} ${FLOOR + 8} L ${cx - 3} ${FLOOR - 72}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.8" opacity="0.3"/>
        <path d="M ${cx + 76} ${FLOOR + 8} L ${cx + 3} ${FLOOR - 72}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="1.8" opacity="0.3"/>
      </g>

      <!-- María, de pie a la izquierda -->
      ${drawMary({ x: cx - 84, y: FLOOR + 6, scale: 0.9 })}

      <!-- José, de pie a la derecha -->
      ${drawJoseph({ x: cx + 88, y: FLOOR + 6, scale: 0.9, flip: true })}

      <!-- El Niño en el pesebre, al frente -->
      ${drawBabyJesus({ x: cx, y: FLOOR + 26, scale: 1 })}

      <!-- Buey y asno junto al pesebre -->
      <g id="scene-animals" data-layer="characters">
        <!-- Buey -->
        <g transform="translate(${cx - 166} ${FLOOR - 6})">
          <rect x="-36" y="-18" width="6" height="18" rx="3" fill="${SCENE_COLORS.roseDeep}" opacity="0.85"/>
          <rect x="-8" y="-16" width="6" height="16" rx="3" fill="${SCENE_COLORS.roseDeep}" opacity="0.75"/>
          <ellipse cx="-20" cy="-26" rx="30" ry="19" fill="${SCENE_COLORS.roseDeep}"/>
          <path d="M 4 -34 Q 18 -38 22 -50" stroke="${SCENE_COLORS.roseDeep}" stroke-width="16" fill="none" stroke-linecap="round"/>
          <ellipse cx="28" cy="-54" rx="16" ry="12" fill="${SCENE_COLORS.rose}"/>
          <ellipse cx="40" cy="-50" rx="10" ry="7" fill="${SCENE_COLORS.roseDeep}" opacity="0.75"/>
          <path d="M 18 -64 Q 12 -76 24 -74 Q 20 -68 24 -62 Z" fill="#e6dcc4"/>
          <path d="M 32 -64 Q 36 -76 26 -76 Q 30 -68 26 -62 Z" fill="#e6dcc4"/>
          <circle cx="30" cy="-57" r="2.2" fill="${SCENE_COLORS.ink}"/>
        </g>

        <!-- Asno -->
        <g transform="translate(${cx + 166} ${FLOOR - 6}) scale(-1 1)">
          <rect x="-36" y="-18" width="6" height="18" rx="3" fill="#b7ae9c" opacity="0.9"/>
          <rect x="-8" y="-16" width="6" height="16" rx="3" fill="#b7ae9c" opacity="0.8"/>
          <ellipse cx="-20" cy="-26" rx="30" ry="19" fill="${SCENE_COLORS.ivoryDeep}"/>
          <path d="M 4 -34 Q 18 -38 22 -50" stroke="${SCENE_COLORS.ivoryDeep}" stroke-width="15" fill="none" stroke-linecap="round"/>
          <ellipse cx="28" cy="-54" rx="15" ry="11" fill="#cfc6b4"/>
          <ellipse cx="40" cy="-49" rx="9" ry="6.5" fill="#b7ae9c" opacity="0.85"/>
          <path d="M 18 -64 Q 10 -84 20 -82 Q 16 -72 22 -62 Z" fill="#cfc6b4"/>
          <path d="M 32 -64 Q 40 -84 30 -82 Q 34 -72 28 -62 Z" fill="#cfc6b4"/>
          <circle cx="31" cy="-56" r="2" fill="${SCENE_COLORS.ink}"/>
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
