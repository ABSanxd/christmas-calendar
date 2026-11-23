/**
 * Marcos de las casillas.
 *
 * Cada casilla se apoya en un elemento real de la ilustración: una puerta, una
 * ventana, una hornacina o una pequeña placa suspendida en el cielo. Estos
 * marcos son la "arquitectura" que une el calendario con el dibujo.
 */

import { SCENE_SPOTS } from '../../../data/sceneLayout.js';
import { SCENE_COLORS } from './shapes.js';

/**
 * Puerta en arco con marco dorado.
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function drawDoorFrame(x, y) {
  const width = 76;
  const height = 96;
  const left = x - width / 2;
  const bottom = y + height / 2;
  const top = bottom - height;
  const radius = width / 2;

  return `
    <g class="scene-door" data-spot="door">
      <path d="M ${left - 8} ${bottom} L ${left - 8} ${top + radius} A ${radius + 8} ${radius + 8} 0 0 1 ${left + width + 8} ${top + radius} L ${left + width + 8} ${bottom} Z" fill="${SCENE_COLORS.goldDeep}" opacity="0.85"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="url(#door-interior)"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="3"/>
      <path d="M ${left + width / 2} ${top + 6} L ${left + width / 2} ${bottom}" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" opacity="0.35"/>
    </g>`;
}

/**
 * Ventana en arco con parteluces.
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function drawWindowFrame(x, y) {
  const width = 72;
  const height = 78;
  const left = x - width / 2;
  const bottom = y + height / 2;
  const top = bottom - height;
  const radius = width / 2;

  return `
    <g class="scene-door" data-spot="window">
      <path d="M ${left - 7} ${bottom} L ${left - 7} ${top + radius} A ${radius + 7} ${radius + 7} 0 0 1 ${left + width + 7} ${top + radius} L ${left + width + 7} ${bottom} Z" fill="${SCENE_COLORS.goldDeep}" opacity="0.8"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="url(#door-interior)"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="3"/>
      <path d="M ${left + width / 2} ${top + 8} L ${left + width / 2} ${bottom}" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" opacity="0.5"/>
      <path d="M ${left + 4} ${y + 6} L ${left + width - 4} ${y + 6}" stroke="${SCENE_COLORS.gold}" stroke-width="1.6" opacity="0.5"/>
    </g>`;
}

/**
 * Hornacina sencilla.
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function drawNicheFrame(x, y) {
  const width = 62;
  const height = 76;
  const left = x - width / 2;
  const bottom = y + height / 2;
  const top = bottom - height;
  const radius = width / 2;

  return `
    <g class="scene-door" data-spot="niche">
      <path d="M ${left - 6} ${bottom} L ${left - 6} ${top + radius} A ${radius + 6} ${radius + 6} 0 0 1 ${left + width + 6} ${top + radius} L ${left + width + 6} ${bottom} Z" fill="${SCENE_COLORS.goldDeep}" opacity="0.72"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="url(#door-interior)"/>
      <path d="M ${left} ${bottom} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + width} ${top + radius} L ${left + width} ${bottom} Z" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="2.4" opacity="0.9"/>
    </g>`;
}

/**
 * Placa suspendida (para los puntos del cielo).
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
function drawBeaconFrame(x, y) {
  return `
    <g class="scene-door" data-spot="beacon">
      <circle cx="${x}" cy="${y}" r="38" fill="url(#door-interior)"/>
      <circle cx="${x}" cy="${y}" r="38" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2.6" opacity="0.95"/>
      <circle cx="${x}" cy="${y}" r="45" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="1.2" opacity="0.5"/>
      <path d="M ${x - 30} ${y} L ${x - 44} ${y} M ${x + 30} ${y} L ${x + 44} ${y} M ${x} ${y - 30} L ${x} ${y - 44} M ${x} ${y + 30} L ${x} ${y + 44}" stroke="${SCENE_COLORS.gold}" stroke-width="1.4" opacity="0.55"/>
    </g>`;
}

/**
 * Construye la capa de marcos de las casillas.
 * @returns {string}
 */
export function renderDayDoors() {
  const frames = SCENE_SPOTS.map((spot) => {
    switch (spot.style) {
      case 'door':
        return drawDoorFrame(spot.x, spot.y);
      case 'window':
        return drawWindowFrame(spot.x, spot.y);
      case 'niche':
        return drawNicheFrame(spot.x, spot.y);
      default:
        return drawBeaconFrame(spot.x, spot.y);
    }
  }).join('');

  return `<g id="scene-day-doors" data-layer="doors">${frames}</g>`;
}

export default renderDayDoors;
