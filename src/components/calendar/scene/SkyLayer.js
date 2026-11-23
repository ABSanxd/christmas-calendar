/**
 * Capa de cielo: estrellas, resplandores y haces de luz.
 *
 * Las estrellas se generan con un generador pseudoaleatorio determinista
 * (semilla fija) para que la ilustración sea idéntica en cada carga y en
 * cada dispositivo.
 */

import { SCENE_COLORS, drawSpark } from './shapes.js';

/**
 * Cúmulo nocturno: varias elipses agrupadas con un tono más claro que el
 * cielo, que dan profundidad al fondo.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} scale
 * @param {number} opacity
 * @param {string} color
 * @returns {string}
 */
function drawCloud(x, y, scale, opacity, color) {
  const puffs = [
    [-52, 6, 26],
    [-28, -6, 30],
    [0, -12, 34],
    [30, -4, 28],
    [54, 8, 22],
    [-8, 8, 26],
    [22, 10, 24],
  ]
    .map(
      ([px, py, r]) =>
        `<ellipse cx="${px}" cy="${py}" rx="${r}" ry="${r * 0.72}" fill="${color}"/>`,
    )
    .join('');

  return `<g transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}">
    ${puffs}
    <ellipse cx="0" cy="14" rx="78" ry="16" fill="${color}" opacity="0.7"/>
  </g>`;
}

/**
 * Generador pseudoaleatorio determinista (mulberry32).
 * @param {number} seed
 * @returns {() => number}
 */
function createRandom(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Construye la capa del cielo.
 * @param {{width: number, height: number}} viewBox
 * @returns {string}
 */
export function renderSky(viewBox) {
  const { width, height } = viewBox;
  const random = createRandom(20261129);
  const stars = [];

  // Estrellas repartidas por la bóveda celeste.
  for (let index = 0; index < 190; index += 1) {
    const x = random() * width;
    const y = random() * (height * 0.62);
    const size = 1.4 + random() * 3.6;
    const isPurple = random() < 0.34;
    const color = isPurple ? SCENE_COLORS.violetLight : SCENE_COLORS.goldLight;
    const opacity = (0.32 + random() * 0.55).toFixed(2);

    if (size > 4 && random() < 0.55) {
      // Estrellas grandes con destello en cruz.
      stars.push(drawSpark({ x, y, size: size * 2.4, color, opacity }));
      stars.push(`<circle cx="${x}" cy="${y}" r="${(size * 0.5).toFixed(2)}" fill="${color}" opacity="${opacity}"/>`);
    } else {
      stars.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(2)}" fill="${color}" opacity="${opacity}"/>`);
    }
  }

  // Haces de luz que unen las esquinas con el centro, como en la referencia.
  const beams = [
    `M 0 0 L 760 470 L 620 620 Z`,
    `M ${width} 0 L 840 470 L 980 620 Z`,
    `M 0 ${height} L 740 700 L 860 560 Z`,
    `M ${width} ${height} L 860 700 L 740 560 Z`,
  ]
    .map(
      (path) =>
        `<path d="${path}" fill="${SCENE_COLORS.goldLight}" opacity="0.07" filter="url(#scene-soften)"/>`,
    )
    .join('');

  return `
    <g id="scene-sky" data-layer="sky">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#sky-gradient)"/>
      <ellipse cx="800" cy="300" rx="620" ry="420" fill="url(#sky-halo)"/>
      ${beams}
      <g id="scene-stars" data-layer="stars">${stars.join('')}</g>

      <!-- Nubes nocturnas: dan profundidad al cielo -->
      <g id="scene-clouds" data-layer="clouds">
        ${drawCloud(210, 300, 1.15, 0.34, '#3b3f74')}
        ${drawCloud(560, 236, 0.82, 0.26, '#454a83')}
        ${drawCloud(1010, 292, 1.05, 0.3, '#3b3f74')}
        ${drawCloud(1400, 226, 0.78, 0.24, '#454a83')}
        ${drawCloud(880, 402, 1.3, 0.2, '#3d4176')}
        ${drawCloud(120, 430, 1.1, 0.18, '#3d4176')}
      </g>
    </g>
  `;
}

export default renderSky;
