/**
 * Angelito que atraviesa la pantalla durante las animaciones de los domingos.
 *
 * Es un elemento DOM independiente para que GSAP pueda moverlo con libertad
 * por cualquier punto de la ventana.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * SVG del angelito.
 * @returns {string}
 */
function renderAngelSvg() {
  return `
    <svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg" class="advent-angel__svg"
      role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="angel-aura" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <circle cx="80" cy="56" r="58" fill="url(#angel-aura)"/>

      <!-- Alas -->
      <path d="M 74 52 C 40 22 12 30 6 56 C 26 52 46 58 68 70 Z" fill="#f6f0e5" opacity="0.95"/>
      <path d="M 86 52 C 120 22 148 30 154 56 C 134 52 114 58 92 70 Z" fill="#f6f0e5" opacity="0.95"/>
      <path d="M 66 54 C 42 34 22 40 16 54" stroke="${CONFIG.candleColors.gold}" stroke-width="1.6" fill="none" opacity="0.5"/>
      <path d="M 94 54 C 118 34 138 40 144 54" stroke="${CONFIG.candleColors.gold}" stroke-width="1.6" fill="none" opacity="0.5"/>

      <!-- Manto -->
      <path d="M 56 106 Q 54 62 80 42 Q 106 62 104 106 Q 92 116 80 116 Q 68 116 56 106 Z" fill="${CONFIG.candleColors.violetLight}"/>
      <path d="M 84 46 Q 104 68 102 106 Q 92 114 82 115 Z" fill="${CONFIG.candleColors.violetDeep}" opacity="0.4"/>
      <path d="M 58 104 Q 80 116 102 104 L 102 110 Q 80 122 58 110 Z" fill="${CONFIG.candleColors.gold}" opacity="0.6"/>

      <!-- Cabeza y halo -->
      <circle cx="80" cy="30" r="16" fill="#e8c9a8"/>
      <circle cx="80" cy="30" r="26" fill="${CONFIG.candleColors.goldLight}" opacity="0.45"/>
      <path d="M 66 26 Q 80 10 94 26 Q 80 20 66 26 Z" fill="${CONFIG.candleColors.goldDeep}" opacity="0.8"/>
      <circle cx="74" cy="31" r="1.7" fill="#1c2340"/>
      <circle cx="86" cy="31" r="1.7" fill="#1c2340"/>
      <path d="M 74 38 Q 80 43 86 38" stroke="#1c2340" stroke-width="1.6" fill="none" stroke-linecap="round"/>

      <!-- Manos con la chispa -->
      <path d="M 62 68 Q 48 78 52 94" stroke="${CONFIG.candleColors.violetLight}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="52" cy="98" r="7" fill="${CONFIG.candleColors.goldLight}"/>
      <circle cx="52" cy="98" r="3" fill="${CONFIG.candleColors.goldBright}"/>
    </svg>`;
}

/**
 * Crea el angelito listo para animarse.
 * @returns {HTMLElement}
 */
export function createAdventAngel() {
  const element = createElement('div', {
    class: 'advent-angel',
    'aria-hidden': 'true',
  });
  element.innerHTML = renderAngelSvg();
  return element;
}

export default createAdventAngel;
