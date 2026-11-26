/**
 * Corona de Adviento.
 *
 * Ilustración SVG independiente con las cuatro velas (morada, morada, rosa y
 * morada). La corona vive en la esquina superior derecha del calendario y
 * refleja el estado litúrgico del día.
 *
 * La misma ilustración se reutiliza en dos tamaños: la versión compacta de la
 * esquina y la versión grande de la ceremonia del domingo, cuando la corona
 * salta al centro de la pantalla para que el usuario encienda la vela.
 */

import { createElement } from '../../utils/domUtils.js';
import { renderCandle } from './AdventCandle.js';
import { CONFIG } from '../../data/configuration.js';

const VIEWBOX = { width: 560, height: 500 };
const RING_CENTER = { x: 280, y: 255 };
const RING_OUTER = 150;
const RING_INNER = 96;

/**
 * Contador de instancias.
 *
 * Cada copia de la corona necesita identificadores propios para sus
 * degradados: si se repiten, el navegador usaría siempre el primero
 * encontrado y el SVG de la ceremonia se dibujaría con el degradado de la
 * corona de la esquina.
 */
let instanceCount = 0;

/**
 * Posición de cada vela alrededor del aro.
 *
 * Dos arriba y dos abajo, repartidas en las diagonales para que ni la llama
 * ni el soporte de una vela se pisen con los de la vecina.
 */
const CANDLE_PLACES = [
  { x: RING_CENTER.x - 95, y: RING_CENTER.y - 95 },
  { x: RING_CENTER.x + 95, y: RING_CENTER.y - 95 },
  { x: RING_CENTER.x + 95, y: RING_CENTER.y + 95 },
  { x: RING_CENTER.x - 95, y: RING_CENTER.y + 95 },
];

/**
 * Genera una hoja de evergreen alrededor del aro.
 * @param {number} angle Ángulo en radianes.
 * @param {number} radius
 * @param {number} length
 * @param {number} width
 * @param {string} color
 * @param {number} tilt
 * @returns {string}
 */
function drawLeaf(angle, radius, length, width, color, tilt) {
  const x = RING_CENTER.x + Math.cos(angle) * radius;
  const y = RING_CENTER.y + Math.sin(angle) * radius;
  const degrees = (angle * 180) / Math.PI + tilt;
  return `<path d="M 0 0 Q ${length * 0.55} ${-width} ${length} 0 Q ${length * 0.55} ${width} 0 0 Z" fill="${color}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${degrees.toFixed(1)})"/>`;
}

/**
 * Piñita de pino: semilla marBrown con sus escamas.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} rotation
 * @param {number} scale
 * @returns {string}
 */
function drawPinecone(x, y, rotation, scale) {
  const cone = `
    <ellipse cx="0" cy="0" rx="9" ry="13" fill="#8a6136"/>
    <path d="M -7 -7 L 7 -7 M -8 0 L 8 0 M -6 7 L 6 7" stroke="#5d3d21" stroke-width="1.6" opacity="0.8"/>
    <path d="M 0 -12 L 0 12" stroke="#5d3d21" stroke-width="1.4" opacity="0.45"/>
    <ellipse cx="0" cy="0" rx="9" ry="13" fill="none" stroke="#5d3d21" stroke-width="1.2" opacity="0.6"/>`;

  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation}) scale(${scale})">${cone}</g>`;
}

/**
 * Construye el aro de evergreen.
 * @returns {string}
 */
function renderWreathRing() {
  const leaves = [];
  const leavesOuter = 30;
  const leavesInner = 24;

  for (let index = 0; index < leavesOuter; index += 1) {
    const angle = (index / leavesOuter) * Math.PI * 2 - Math.PI / 2;
    const color = index % 2 === 0 ? '#4a9a72' : '#3f8c66';
    leaves.push(drawLeaf(angle, RING_OUTER - 16, 54, 15, color, 12));
    leaves.push(drawLeaf(angle + 0.1, RING_OUTER - 16, 48, 13, '#357a5c', -14));
  }

  for (let index = 0; index < leavesInner; index += 1) {
    const angle = (index / leavesInner) * Math.PI * 2 - Math.PI / 2 + 0.12;
    const color = index % 2 === 0 ? '#57ad82' : '#46987a';
    leaves.push(drawLeaf(angle, RING_INNER + 12, 40, 11, color, -10));
  }

  // Bayas: rojas y amarillas, para dar luces de color al ramo.
  const berryColors = [CONFIG.candleColors.red, CONFIG.candleColors.yellow];
  const berries = Array.from({ length: 14 }, (_, index) => {
    const angle = (index / 14) * Math.PI * 2 + 0.4;
    const radius = RING_OUTER - 42;
    const x = RING_CENTER.x + Math.cos(angle) * radius;
    const y = RING_CENTER.y + Math.sin(angle) * radius;
    const color = berryColors[index % berryColors.length];
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="${color}" opacity="0.95"/>`;
  }).join('');

  // Piñitas repartidas por el ramo.
  const cones = [
    [2.1, 104, -18, 1],
    [0.55, 118, 14, 0.92],
    [4.0, 112, 32, 0.85],
    [3.55, 126, -8, 0.78],
    [5.5, 96, 22, 0.72],
    [1.15, 128, -26, 0.68],
  ]
    .map(([angle, radius, rotation, scale]) => {
      const x = RING_CENTER.x + Math.cos(angle) * radius;
      const y = RING_CENTER.y + Math.sin(angle) * radius;
      return drawPinecone(x, y, rotation, scale);
    })
    .join('');

  return `
    <g id="wreath-ring" data-layer="wreath">
      <circle cx="${RING_CENTER.x}" cy="${RING_CENTER.y}" r="${(RING_OUTER + RING_INNER) / 2}" fill="none" stroke="#2e6b50" stroke-width="${RING_OUTER - RING_INNER}" opacity="0.85"/>
      ${leaves.join('')}
      ${cones}
      ${berries}
    </g>`;
}

/**
 * Construye el lazo inferior de la corona, en rojo.
 * @returns {string}
 */
function renderBow() {
  const y = RING_CENTER.y + RING_OUTER + 6;
  const bow = `
    <path d="M -14 0 Q -58 -26 -64 4 Q -58 30 -14 12 Z" fill="${CONFIG.candleColors.red}"/>
    <path d="M 14 0 Q 58 -26 64 4 Q 58 30 14 12 Z" fill="${CONFIG.candleColors.red}"/>
    <path d="M -14 -6 Q -40 -12 -46 -2 Q -34 8 -14 6 Z" fill="${CONFIG.candleColors.redDeep}" opacity="0.5"/>
    <path d="M 14 -6 Q 40 -12 46 -2 Q 34 8 14 6 Z" fill="${CONFIG.candleColors.redDeep}" opacity="0.5"/>
    <circle cx="0" cy="2" r="13" fill="${CONFIG.candleColors.gold}"/>`;

  return `<g id="wreath-bow" data-layer="wreath" transform="translate(${RING_CENTER.x} ${y})">${bow}</g>`;
}

/**
 * Construye el medallón central.
 * @param {string} uid Identificador único de esta instancia.
 * @returns {string}
 */
function renderCenter(uid) {
  const { x, y } = RING_CENTER;
  return `
    <g id="wreath-center" data-layer="wreath">
      <circle cx="${x}" cy="${y}" r="64" fill="url(#wreath-medallion-${uid})"/>
      <circle cx="${x}" cy="${y}" r="64" fill="none" stroke="${CONFIG.candleColors.gold}" stroke-width="2.4" opacity="0.85"/>
      <path d="M ${x} ${y - 38} L ${x} ${y + 34}" stroke="${CONFIG.candleColors.goldLight}" stroke-width="5" stroke-linecap="round"/>
      <path d="M ${x - 22} ${y - 6} L ${x + 22} ${y - 6}" stroke="${CONFIG.candleColors.goldLight}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y + 30}" r="5" fill="${CONFIG.candleColors.pinkLight}"/>
    </g>`;
}

/**
 * Construye el SVG completo de la corona.
 *
 * @param {object} options
 * @param {number} options.litCount     Cuántas velas están encendidas (0..4).
 * @param {number} [options.targetCandle] Vela que el usuario debe encender (0 si ninguna).
 * @returns {string}
 */
export function renderAdventWreathSvg(options = {}) {
  const litCount = Math.max(0, Math.min(4, options.litCount ?? 0));
  const targetCandle = options.targetCandle ?? 0;
  const uid = options.uid ?? `w${(instanceCount += 1)}`;

  const candles = CANDLE_PLACES.map((place, index) => {
    const candleNumber = index + 1;
    return renderCandle({
      index: candleNumber,
      x: place.x,
      y: place.y,
      lit: candleNumber <= litCount,
      target: candleNumber === targetCandle,
    });
  }).join('');

  const halo = targetCandle ? renderTargetHalo(CANDLE_PLACES[targetCandle - 1], uid) : '';

  return `
    <svg class="advent-wreath__svg" viewBox="0 0 ${VIEWBOX.width} ${VIEWBOX.height}" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="${getWreathAriaLabel(litCount)}">
      <defs>
        <radialGradient id="wreath-medallion-${uid}" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#233057"/>
          <stop offset="70%" stop-color="#161f42"/>
          <stop offset="100%" stop-color="#101734"/>
        </radialGradient>
        <radialGradient id="wreath-halo-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="wreath-target-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.85"/>
          <stop offset="45%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="${RING_CENTER.x}" cy="${RING_CENTER.y}" rx="${RING_OUTER + 40}" ry="${RING_OUTER + 40}" fill="url(#wreath-halo-${uid})"/>
      ${renderWreathRing()}
      ${renderCenter(uid)}
      ${halo}
      ${candles}
      ${renderBow()}
    </svg>`;
}

/**
 * Halo dorado que señala la vela que el usuario debe encender.
 *
 * @param {{x: number, y: number}|undefined} place
 * @param {string} uid
 * @returns {string}
 */
function renderTargetHalo(place, uid) {
  if (!place) return '';
  return `
    <g class="advent-wreath__target-halo" aria-hidden="true">
      <circle cx="${place.x}" cy="${place.y - 44}" r="66" fill="url(#wreath-target-${uid})"/>
    </g>`;
}

/**
 * Crea el componente DOM de la corona.
 *
 * @param {object} options
 * @param {number} options.litCount
 * @param {'corner'|'stage'} [options.variant] Tamaño y uso de la corona.
 * @returns {HTMLElement}
 */
export function createAdventWreath(options = {}) {
  const { litCount = 0, variant = 'corner' } = options;

  const container = createElement('div', {
    class: `advent-wreath advent-wreath--${variant}`,
    'data-lit-count': String(litCount),
  });

  const svgWrapper = createElement('div', { class: 'advent-wreath__figure' });
  svgWrapper.innerHTML = renderAdventWreathSvg({ litCount });
  container.appendChild(svgWrapper);

  return container;
}

/**
 * Descripción accesible del estado de la corona.
 * @param {number} litCount
 * @returns {string}
 */
export function getWreathAriaLabel(litCount) {
  const total = Math.max(0, Math.min(4, litCount));
  const state = [
    'todavía sin encender',
    'con la primera vela encendida',
    'con dos velas encendidas',
    'con la vela de Gaudete encendida',
    'con las cuatro velas encendidas',
  ][total];
  return `Corona de Adviento con cuatro velas: dos moradas, una rosa y una morada. Está ${state}.`;
}

/**
 * Actualiza el estado visual de la corona sin recrearla.
 * @param {HTMLElement} container
 * @param {number} litCount
 */
export function updateAdventWreath(container, litCount) {
  if (!container) return;
  container.dataset.litCount = String(litCount);
  const figure = container.querySelector('.advent-wreath__figure');
  if (figure) figure.innerHTML = renderAdventWreathSvg({ litCount });
}

export default createAdventWreath;
