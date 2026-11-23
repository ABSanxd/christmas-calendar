/**
 * Corona de Adviento.
 *
 * Ilustración SVG independiente con las cuatro velas (morada, morada, rosa y
 * morada). La corona está siempre presente en la parte inferior del calendario
 * y refleja el estado litúrgico del día.
 */

import { createElement } from '../../utils/domUtils.js';
import { renderCandle } from './AdventCandle.js';
import { CONFIG } from '../../data/configuration.js';

const VIEWBOX = { width: 560, height: 430 };
const RING_CENTER = { x: 280, y: 236 };
const RING_OUTER = 146;
const RING_INNER = 92;

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
 * Construye el aro de evergreen.
 * @returns {string}
 */
function renderWreathRing() {
  const leaves = [];
  const leavesOuter = 30;
  const leavesInner = 24;

  for (let index = 0; index < leavesOuter; index += 1) {
    const angle = (index / leavesOuter) * Math.PI * 2 - Math.PI / 2;
    const color = index % 2 === 0 ? '#2f6a52' : '#376f58';
    leaves.push(drawLeaf(angle, RING_OUTER - 16, 54, 15, color, 12));
    leaves.push(drawLeaf(angle + 0.1, RING_OUTER - 16, 48, 13, '#285a46', -14));
  }

  for (let index = 0; index < leavesInner; index += 1) {
    const angle = (index / leavesInner) * Math.PI * 2 - Math.PI / 2 + 0.12;
    const color = index % 2 === 0 ? '#3a7459' : '#2c624b';
    leaves.push(drawLeaf(angle, RING_INNER + 12, 40, 11, color, -10));
  }

  const berries = Array.from({ length: 14 }, (_, index) => {
    const angle = (index / 14) * Math.PI * 2 + 0.4;
    const radius = RING_OUTER - 42;
    const x = RING_CENTER.x + Math.cos(angle) * radius;
    const y = RING_CENTER.y + Math.sin(angle) * radius;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="${CONFIG.candleColors.pink}" opacity="0.92"/>`;
  }).join('');

  return `
    <g id="wreath-ring" data-layer="wreath">
      <circle cx="${RING_CENTER.x}" cy="${RING_CENTER.y}" r="${(RING_OUTER + RING_INNER) / 2}" fill="none" stroke="#23493b" stroke-width="${RING_OUTER - RING_INNER}" opacity="0.85"/>
      ${leaves.join('')}
      ${berries}
    </g>`;
}

/**
 * Construye el lazo inferior de la corona.
 * @returns {string}
 */
function renderBow() {
  const y = RING_CENTER.y + RING_OUTER - 10;
  const bow = `
    <path d="M -14 0 Q -58 -26 -64 4 Q -58 30 -14 12 Z" fill="${CONFIG.candleColors.purple}" opacity="0.95"/>
    <path d="M 14 0 Q 58 -26 64 4 Q 58 30 14 12 Z" fill="${CONFIG.candleColors.purple}" opacity="0.95"/>
    <path d="M -14 -6 Q -40 -12 -46 -2 Q -34 8 -14 6 Z" fill="${CONFIG.candleColors.purpleDeep}" opacity="0.7"/>
    <path d="M 14 -6 Q 40 -12 46 -2 Q 34 8 14 6 Z" fill="${CONFIG.candleColors.purpleDeep}" opacity="0.7"/>
    <circle cx="0" cy="2" r="13" fill="${CONFIG.candleColors.gold}"/>`;

  return `<g id="wreath-bow" data-layer="wreath" transform="translate(${RING_CENTER.x} ${y})">${bow}</g>`;
}

/**
 * Construye el medallón central.
 * @returns {string}
 */
function renderCenter() {
  const { x, y } = RING_CENTER;
  return `
    <g id="wreath-center" data-layer="wreath">
      <circle cx="${x}" cy="${y}" r="64" fill="url(#wreath-medallion)"/>
      <circle cx="${x}" cy="${y}" r="64" fill="none" stroke="${CONFIG.candleColors.gold}" stroke-width="2.4" opacity="0.85"/>
      <path d="M ${x} ${y - 38} L ${x} ${y + 34}" stroke="${CONFIG.candleColors.goldLight}" stroke-width="5" stroke-linecap="round"/>
      <path d="M ${x - 22} ${y - 6} L ${x + 22} ${y - 6}" stroke="${CONFIG.candleColors.goldLight}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${x}" cy="${y + 30}" r="5" fill="${CONFIG.candleColors.pinkLight}"/>
      <text x="${x}" y="${y + 56}" text-anchor="middle" class="wreath-center__label">ADVIENTO</text>
    </g>`;
}

/**
 * Construye el SVG completo de la corona.
 *
 * @param {object} options
 * @param {number} options.litCount Cuántas velas están encendidas (0..4).
 * @returns {string}
 */
export function renderAdventWreathSvg(options = {}) {
  const litCount = Math.max(0, Math.min(4, options.litCount ?? 0));
  const offsets = [-108, -36, 36, 108];
  const baseY = 152;

  const candles = offsets
    .map((offset, index) => {
      const candleNumber = index + 1;
      return renderCandle({
        index: candleNumber,
        x: RING_CENTER.x + offset,
        y: baseY,
        lit: candleNumber <= litCount,
      });
    })
    .join('');

  return `
    <svg class="advent-wreath__svg" viewBox="0 0 ${VIEWBOX.width} ${VIEWBOX.height}" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Corona de Adviento con cuatro velas: dos moradas, una rosa y una morada.">
      <defs>
        <radialGradient id="wreath-medallion" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#233057"/>
          <stop offset="70%" stop-color="#161f42"/>
          <stop offset="100%" stop-color="#101734"/>
        </radialGradient>
        <radialGradient id="wreath-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="${RING_CENTER.x}" cy="${RING_CENTER.y}" rx="${RING_OUTER + 40}" ry="${RING_OUTER + 40}" fill="url(#wreath-halo)"/>
      ${renderWreathRing()}
      ${renderCenter()}
      ${candles}
      ${renderBow()}
    </svg>`;
}

/**
 * Crea el componente DOM de la corona.
 *
 * @param {object} options
 * @param {number} options.litCount
 * @param {() => void} [options.onReplay]
 * @returns {HTMLElement}
 */
export function createAdventWreath(options = {}) {
  const { litCount = 0, onReplay } = options;

  const container = createElement('div', {
    class: 'advent-wreath',
    'data-lit-count': String(litCount),
  });

  const svgWrapper = createElement('div', { class: 'advent-wreath__figure' });
  svgWrapper.innerHTML = renderAdventWreathSvg({ litCount });
  container.appendChild(svgWrapper);

  const caption = createElement('p', { class: 'advent-wreath__caption' });
  caption.textContent = getWreathCaption(litCount);
  container.appendChild(caption);

  if (onReplay) {
    const replay = createElement('button', {
      type: 'button',
      class: 'advent-wreath__replay',
      'aria-label': 'Reproducir de nuevo la animación de la corona de Adviento',
    });
    replay.innerHTML =
      '<span aria-hidden="true">✧</span> Ver la animación de la corona';
    replay.addEventListener('click', onReplay);
    container.appendChild(replay);
  }

  return container;
}

/**
 * Texto que explica el estado de la corona.
 * @param {number} litCount
 * @returns {string}
 */
export function getWreathCaption(litCount) {
  switch (litCount) {
    case 0:
      return 'La corona espera al primer domingo de Adviento.';
    case 1:
      return 'Primera vela encendida: comienza nuestro camino.';
    case 2:
      return 'Dos velas encendidas: seguimos hacia Belén.';
    case 3:
      return 'La vela de Gaudete está encendida: ¡alégrate!';
    default:
      return 'Las cuatro velas encendidas: la luz ya está lista.';
  }
}

/**
 * Actualiza solo el texto explicativo, sin recrear el SVG (para no
 * interrumpir las animaciones de las llamas en curso).
 * @param {HTMLElement} container
 * @param {number} litCount
 */
export function updateWreathCaption(container, litCount) {
  if (!container) return;
  const caption = container.querySelector('.advent-wreath__caption');
  if (caption) caption.textContent = getWreathCaption(litCount);
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
  updateWreathCaption(container, litCount);
}

export default createAdventWreath;
