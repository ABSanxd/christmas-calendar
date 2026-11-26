/**
 * Vela individual de la corona de Adviento.
 *
 * La vela se dibuja en dos niveles:
 *
 *   - El grupo exterior lleva la posición (el `transform` estático). No se
 *     anima nunca.
 *   - El grupo interior contiene el dibujo y es el que anima GSAP (la llama
 *     crece y late, y la vela entera se inclina cuando es la que el usuario
 *     tiene que encender).
 *
 * La separación importa: si el grupo animado tuviera su propio `transform`,
 * el origen del escalado se calcularía en un espacio de coordenadas
 * equivocado y la vela se iría de su sitio.
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
 * @param {boolean} [options.target] Si es la vela que el usuario debe encender.
 * @param {number} [options.height]
 * @returns {string}
 */
export function renderCandle(options) {
  const { index, x, y, lit, target = false, height = 74 } = options;
  const palette = CANDLE_PALETTE[index - 1] ?? CANDLE_PALETTE[0];
  const width = 24;

  const classes = ['advent-candle'];
  if (target) classes.push('advent-candle--target');

  return `
    <g transform="translate(${x} ${y})">
      <g class="${classes.join(' ')}" data-candle="${index}" data-lit="${lit ? 'true' : 'false'}"${target ? ' data-target="true"' : ''}>
        <!-- Llama (se anima desde JS) -->
        <g transform="translate(0 ${-height - 22})">
          <g class="advent-candle__flame" id="candle-flame-${index}" data-flame="${index}"
             opacity="${lit ? 1 : 0}" style="opacity:${lit ? 1 : 0}">
            <ellipse cx="0" cy="0" rx="16" ry="24" fill="${CONFIG.candleColors.goldLight}" opacity="0.28"/>
            <path d="M 0 -20 C 9 -8 10 2 6 10 C 3 15 -3 15 -6 10 C -10 2 -9 -8 0 -20 Z" fill="${CONFIG.candleColors.pinkLight}"/>
            <path d="M 0 -10 C 5 -3 5 4 3 9 C 1 12 -1 12 -3 9 C -5 4 -5 -3 0 -10 Z" fill="${CONFIG.candleColors.goldBright}"/>
          </g>
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
      </g>
    </g>`;
}

export default renderCandle;
