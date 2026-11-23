/**
 * Vela individual de la corona de Adviento.
 *
 * La llama es un elemento independiente (`#candle-flame-N`) para que GSAP
 * pueda animarla por separado del resto de la vela.
 */

import { CONFIG } from '../../data/configuration.js';

/**
 * Colores de cada vela: morada, morada, rosa (Gaudete) y morada.
 */
export const CANDLE_PALETTE = [
  { color: CONFIG.candleColors.purple, deep: CONFIG.candleColors.purpleDeep },
  { color: CONFIG.candleColors.purple, deep: CONFIG.candleColors.purpleDeep },
  { color: CONFIG.candleColors.pink, deep: '#b97d92' },
  { color: CONFIG.candleColors.purple, deep: CONFIG.candleColors.purpleDeep },
];

/**
 * Construye el SVG de una vela.
 *
 * @param {object} options
 * @param {number} options.index  Índice 1..4 de la vela.
 * @param {number} options.x      Posición horizontal del centro.
 * @param {number} options.y      Posición vertical de la base de la vela.
 * @param {boolean} options.lit   Si la vela está encendida.
 * @param {number} [options.height]
 * @returns {string}
 */
export function renderCandle(options) {
  const { index, x, y, lit, height = 74 } = options;
  const palette = CANDLE_PALETTE[index - 1] ?? CANDLE_PALETTE[0];
  const width = 24;
  const left = x - width / 2;
  const top = y - height;

  return `
    <g class="advent-candle" data-candle="${index}" data-lit="${lit ? 'true' : 'false'}" transform="translate(${x} ${y})">
      <!-- Llama (se anima desde JS) -->
      <g class="advent-candle__flame" id="candle-flame-${index}" data-flame="${index}"
         transform="translate(0 ${-height - 22})" opacity="${lit ? 1 : 0}" style="opacity:${lit ? 1 : 0}">
        <ellipse cx="0" cy="0" rx="16" ry="24" fill="${CONFIG.candleColors.goldLight}" opacity="0.28"/>
        <path d="M 0 -20 C 9 -8 10 2 6 10 C 3 15 -3 15 -6 10 C -10 2 -9 -8 0 -20 Z" fill="${CONFIG.candleColors.pinkLight}"/>
        <path d="M 0 -10 C 5 -3 5 4 3 9 C 1 12 -1 12 -3 9 C -5 4 -5 -3 0 -10 Z" fill="${CONFIG.candleColors.goldBright}"/>
      </g>

      <!-- Pabilo -->
      <path d="M 0 ${-height} L 0 ${-height - 7}" stroke="#4a3a2a" stroke-width="2.4" stroke-linecap="round"/>

      <!-- Cuerpo de cera -->
      <path d="M ${-width / 2} 0 L ${-width / 2} ${-height + 14} Q ${-width / 2 + 4} ${-height} 0 ${-height} Q ${width / 2 - 4} ${-height} ${width / 2} ${-height + 14} L ${width / 2} 0 Z" fill="${palette.color}"/>
      <path d="M ${-width / 2} 0 L ${-width / 2} ${-height + 14} Q ${-width / 2 + 4} ${-height} -6 ${-height} L -6 0 Z" fill="${palette.deep}" opacity="0.45"/>
      <path d="M ${-width / 2} -6 Q ${-width / 2 + 6} ${-height + 6} ${-width / 2 + 8} ${-height + 22}" stroke="${palette.deep}" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M ${width / 2} -4 Q ${width / 2 - 6} ${-height + 4} ${width / 2 - 9} ${-height + 18}" stroke="${palette.deep}" stroke-width="2.4" fill="none" opacity="0.6"/>

      <!-- Plato de la vela -->
      <path d="M ${-width / 2 - 9} 0 L ${width / 2 + 9} 0 L ${width / 2 + 5} 8 L ${-width / 2 - 5} 8 Z" fill="${CONFIG.candleColors.gold}" opacity="0.95"/>
      <path d="M ${-width / 2 - 9} 0 L ${width / 2 + 9} 0" stroke="${CONFIG.candleColors.goldLight}" stroke-width="1.6" opacity="0.8"/>
    </g>`;
}

export default renderCandle;
