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

      <!-- Establo: casa con dos postes laterales y techo de dos vigas -->
      <g id="nativity-stable" data-layer="stable">
        <!-- Postes (muros) que sostienen el tejado -->
        <rect x="${cx - 148}" y="${FLOOR - 100}" width="16" height="110" rx="4" fill="${SCENE_COLORS.roseDeep}"/>
        <rect x="${cx + 132}" y="${FLOOR - 100}" width="16" height="110" rx="4" fill="${SCENE_COLORS.roseDeep}"/>
        <rect x="${cx - 148}" y="${FLOOR - 100}" width="16" height="110" rx="4" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2" opacity="0.7"/>
        <rect x="${cx + 132}" y="${FLOOR - 100}" width="16" height="110" rx="4" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2" opacity="0.7"/>
        <!-- Techo: dos vigas que juntas forman el triángulo, sin relleno -->
        <path d="M ${cx - 140} ${FLOOR - 100} L ${cx} ${FLOOR - 232}"
              stroke="${SCENE_COLORS.roseDeep}" stroke-width="22" stroke-linecap="round"/>
        <path d="M ${cx} ${FLOOR - 232} L ${cx + 140} ${FLOOR - 100}"
              stroke="${SCENE_COLORS.roseDeep}" stroke-width="22" stroke-linecap="round"/>
        <!-- Canto dorado de las vigas -->
        <path d="M ${cx - 140} ${FLOOR - 100} L ${cx} ${FLOOR - 232}"
              stroke="${SCENE_COLORS.gold}" stroke-width="3.4" opacity="0.9" stroke-linecap="round"/>
        <path d="M ${cx} ${FLOOR - 232} L ${cx + 140} ${FLOOR - 100}"
              stroke="${SCENE_COLORS.gold}" stroke-width="3.4" opacity="0.9" stroke-linecap="round"/>
        <!-- Travesaño que une los postes -->
        <path d="M ${cx - 140} ${FLOOR - 100} L ${cx + 140} ${FLOOR - 100}"
              stroke="${SCENE_COLORS.sandDark}" stroke-width="6" opacity="0.75"/>
        <!-- Vigas internas del tejado -->
        <path d="M ${cx - 96} ${FLOOR - 100} L ${cx - 6} ${FLOOR - 192}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="2" opacity="0.32"/>
        <path d="M ${cx + 96} ${FLOOR - 100} L ${cx + 6} ${FLOOR - 192}" stroke="${SCENE_COLORS.goldDeep}" stroke-width="2" opacity="0.32"/>
      </g>

      <!-- María, arrodillada a la izquierda (junto al Niño, dentro del claro).
           Su escala es algo menor que la de José, para que se lea más joven
           que él; el suelo (FLOOR) no cambia, así que los pies siguen
           apoyados en el mismo sitio. -->
      ${drawMary({ x: cx - 62, y: FLOOR + 6, scale: 0.78 })}

      <!-- José, de pie a la derecha (junto al Niño, dentro del claro) -->
      ${drawJoseph({ x: cx + 60, y: FLOOR + 6, scale: 0.9, flip: true })}

      <!-- El Niño en el pesebre, al frente -->
      ${drawBabyJesus({ x: cx, y: FLOOR + 14, scale: 1 })}

      <!-- Buey y asno junto al pesebre. Van un poco más bajos y más cerca de la
           familia, en primer plano, sin tapar a María ni a José. Su cara sigue
           el estilo de las ovejas: cabeza ovalada, trompa más oscura y dos
           ojitos mirando de frente. -->
      <g id="scene-animals" data-layer="characters">
        <!-- Buey -->
        <g transform="translate(${cx - 152} ${FLOOR + 42})">
          <rect x="-36" y="-18" width="6" height="18" rx="3" fill="${SCENE_COLORS.roseDeep}" opacity="0.85"/>
          <rect x="-8" y="-16" width="6" height="16" rx="3" fill="${SCENE_COLORS.roseDeep}" opacity="0.75"/>
          <ellipse cx="-20" cy="-26" rx="30" ry="19" fill="${SCENE_COLORS.roseDeep}"/>
          <path d="M 4 -34 Q 18 -38 22 -50" stroke="${SCENE_COLORS.roseDeep}" stroke-width="16" fill="none" stroke-linecap="round"/>
          <!-- Cuernos, por detrás de la cabeza -->
          <path d="M 13 -62 Q 6 -68 7 -77 Q 15 -80 23 -66 Z" fill="#e6dcc4"/>
          <path d="M 41 -62 Q 48 -68 47 -77 Q 39 -80 31 -66 Z" fill="#e6dcc4"/>
          <!-- Cabeza ovalada -->
          <ellipse cx="27" cy="-54" rx="17" ry="14" fill="${SCENE_COLORS.rose}"/>
          <!-- Trompa más oscura -->
          <ellipse cx="36" cy="-45" rx="10" ry="8" fill="${SCENE_COLORS.roseDeep}"/>
          <ellipse cx="39" cy="-42" rx="2.4" ry="1.8" fill="#efe6d8" opacity="0.85"/>
          <!-- Ojitos mirando de frente, como los de las ovejas -->
          <ellipse cx="20" cy="-58" rx="4.2" ry="5.2" fill="#ffffff"/>
          <ellipse cx="30" cy="-58" rx="4.2" ry="5.2" fill="#ffffff"/>
          <circle cx="20.6" cy="-56.8" r="2.3" fill="${SCENE_COLORS.ink}"/>
          <circle cx="30.6" cy="-56.8" r="2.3" fill="${SCENE_COLORS.ink}"/>
          <circle cx="19.2" cy="-58.6" r="0.9" fill="#ffffff"/>
          <circle cx="29.2" cy="-58.6" r="0.9" fill="#ffffff"/>
        </g>

        <!-- Asno -->
        <g transform="translate(${cx + 152} ${FLOOR + 42}) scale(-1 1)">
          <rect x="-36" y="-18" width="6" height="18" rx="3" fill="#b7ae9c" opacity="0.9"/>
          <rect x="-8" y="-16" width="6" height="16" rx="3" fill="#b7ae9c" opacity="0.8"/>
          <ellipse cx="-20" cy="-26" rx="30" ry="19" fill="${SCENE_COLORS.ivoryDeep}"/>
          <path d="M 4 -34 Q 18 -38 22 -50" stroke="${SCENE_COLORS.ivoryDeep}" stroke-width="15" fill="none" stroke-linecap="round"/>
          <!-- Orejas largas y afiladas, por detrás de la cabeza -->
          <path d="M 12 -56 Q 9 -76 16 -89 Q 22 -76 22 -62 Z" fill="#cfc6b4"/>
          <path d="M 42 -56 Q 45 -76 38 -89 Q 32 -76 32 -62 Z" fill="#cfc6b4"/>
          <!-- Cabeza ovalada -->
          <ellipse cx="27" cy="-54" rx="16" ry="13" fill="#cfc6b4"/>
          <!-- Trompa más oscura -->
          <ellipse cx="36" cy="-45" rx="9.5" ry="7.5" fill="#a89d89"/>
          <ellipse cx="39" cy="-42" rx="2.2" ry="1.6" fill="#efe6d8" opacity="0.85"/>
          <!-- Ojitos mirando de frente, como los de las ovejas -->
          <ellipse cx="20" cy="-58" rx="3.8" ry="4.8" fill="#ffffff"/>
          <ellipse cx="29" cy="-58" rx="3.8" ry="4.8" fill="#ffffff"/>
          <circle cx="20.5" cy="-56.9" r="2.1" fill="${SCENE_COLORS.ink}"/>
          <circle cx="29.5" cy="-56.9" r="2.1" fill="${SCENE_COLORS.ink}"/>
          <circle cx="19.4" cy="-58.5" r="0.8" fill="#ffffff"/>
          <circle cx="28.4" cy="-58.5" r="0.8" fill="#ffffff"/>
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
