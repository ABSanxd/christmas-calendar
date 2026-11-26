/**
 * Marcos de las casillas.
 *
 * Todas las casillas comparten el mismo motivo: un disco de **cristal**
 * delante del número. Antes cada día tenía una forma distinta (puerta,
 * ventana, hornacina o brújula) y esas piezas grandes tapaban el dibujo de
 * la ilustración; ahora el cristal deja ver la escena de fondo y la
 * casilla se apoya con un brillo de luz sobre ella.
 */

import { SCENE_SPOTS } from '../../../data/sceneLayout.js';
import { SCENE_COLORS } from './shapes.js';

/**
 * Lente de cristal donde se apoya el número de la casilla.
 *
 * El disco es translúcido y lleva un brillo en el borde superior, como una
 * lente apoyada sobre la ilustración: el dibujo de fondo se sigue viendo.
 *
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function drawGlassLens(x, y) {
  const r = 32;
  return `
    <g class="scene-door" data-spot="glass">
      <circle cx="${x}" cy="${y}" r="${r + 9}" fill="url(#glass-halo)"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#glass-lens)"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.3" opacity="0.32"/>
      <path d="M ${x - r * 0.58} ${y - r * 0.42} A ${r * 0.74} ${r * 0.74} 0 0 1 ${x + r * 0.06} ${y - r * 0.92}"
            stroke="#ffffff" stroke-width="2.2" opacity="0.2" fill="none" stroke-linecap="round"/>
    </g>`;
}

/**
 * Construye la capa de marcos de las casillas.
 * @returns {string}
 */
export function renderDayDoors() {
  const frames = SCENE_SPOTS.map((spot) => drawGlassLens(spot.x, spot.y)).join('');

  return `<g id="scene-day-doors" data-layer="doors">${frames}</g>`;
}

export default renderDayDoors;
