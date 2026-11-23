/**
 * Escena especial de Nochebuena.
 *
 * Se monta sobre el calendario como una capa a pantalla completa: la noche de
 * Belén, los ángeles que despliegan el cartel y, al final, la Sagrada Familia
 * como protagonista junto al versículo y la oración.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';
import { getVerse } from '../../data/bibleVerses.js';

/**
 * SVG de la escena nocturna de Nochebuena.
 * @returns {string}
 */
function renderSceneSvg() {
  const stars = Array.from({ length: 90 }, (_, index) => {
    const column = index % 18;
    const row = Math.floor(index / 18);
    const x = 40 + column * 92 + ((row * 37) % 60);
    const y = 34 + row * 52 + ((column * 23) % 40);
    const radius = 1.4 + ((index * 7) % 5) * 0.5;
    const color = index % 4 === 0 ? '#b79ac9' : '#f3dfa4';
    return `<circle class="eve-star" cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="0"/>`;
  }).join('');

  return `
    <svg class="christmas-eve__svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Noche de Belén: los ángeles anuncian el nacimiento de Jesús.">
      <defs>
        <linearGradient id="eve-sky" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stop-color="#080d22"/>
          <stop offset="55%" stop-color="#15214a"/>
          <stop offset="100%" stop-color="#2b2a58"/>
        </linearGradient>
        <radialGradient id="eve-glow" cx="50%" cy="62%" r="45%">
          <stop offset="0%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${CONFIG.candleColors.goldLight}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="eve-baby-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff3d0" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#f0dca6" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="560" fill="url(#eve-sky)"/>
      <g id="eve-stars">${stars}</g>
      <ellipse cx="500" cy="380" rx="420" ry="300" fill="url(#eve-glow)"/>

      <!-- Silueta de la aldea -->
      <g id="eve-village" opacity="0.92">
        <path d="M 0 430 L 0 360 L 70 360 L 70 330 Q 70 300 100 300 Q 130 300 130 330 L 130 360 L 190 360 L 190 340 L 250 340 L 250 372 L 750 372 L 750 340 L 810 340 L 810 366 L 870 366 L 870 320 Q 870 288 900 288 Q 930 288 930 320 L 930 360 L 1000 360 L 1000 430 Z" fill="#1b2244"/>
        <rect x="0" y="424" width="1000" height="136" fill="#d9c79d" opacity="0.92"/>
        <path d="M 0 470 Q 250 440 500 476 Q 750 512 1000 468 L 1000 560 L 0 560 Z" fill="#c2ae82" opacity="0.85"/>
      </g>

      <!-- Establo iluminado -->
      <g id="eve-stable">
        <path d="M 360 430 L 500 262 L 640 430 Z" fill="#7d4632"/>
        <path d="M 360 430 L 500 262 L 640 430" fill="none" stroke="${CONFIG.candleColors.gold}" stroke-width="4" opacity="0.9"/>
        <rect x="372" y="424" width="12" height="76" rx="5" fill="#7d4632"/>
        <rect x="616" y="424" width="12" height="76" rx="5" fill="#7d4632"/>
        <circle cx="500" cy="380" r="120" fill="url(#eve-baby-glow)" class="eve-baby-glow"/>

        <!-- María -->
        <path d="M 424 500 Q 414 420 452 392 Q 486 368 502 402 Q 516 444 506 500 Z" fill="#3f7f9c"/>
        <path d="M 452 392 Q 478 362 496 384 Q 474 392 452 392 Z" fill="#f6f0e5" opacity="0.9"/>
        <circle cx="470" cy="376" r="17" fill="#e8c9a8"/>

        <!-- José -->
        <path d="M 520 500 Q 514 414 536 384 Q 566 370 588 388 Q 600 434 592 500 Z" fill="${CONFIG.candleColors.rose}"/>
        <circle cx="560" cy="372" r="17" fill="#e8c9a8"/>
        <path d="M 588 396 L 610 480" stroke="#bda877" stroke-width="5" stroke-linecap="round"/>

        <!-- Niño -->
        <ellipse cx="500" cy="452" rx="42" ry="13" fill="#bda877"/>
        <ellipse cx="500" cy="424" rx="24" ry="15" fill="#f6f0e5"/>
        <circle cx="500" cy="410" r="13" fill="#f1ddc4"/>
        <circle cx="500" cy="410" r="26" fill="#ffeec2" opacity="0.35"/>
        <path d="M 500 388 l 4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 z" fill="#ffeec2" opacity="0.9"/>
      </g>

      <!-- Cartel de Nochebuena -->
      <g id="eve-banner" class="eve-banner" opacity="0">
        <path d="M 250 150 L 750 150 L 726 232 L 274 232 Z" fill="#f3ead7"/>
        <path d="M 250 150 L 750 150 L 726 232 L 274 232 Z" fill="none" stroke="${CONFIG.candleColors.gold}" stroke-width="4"/>
        <text x="500" y="206" text-anchor="middle" class="eve-banner__text">Nochebuena</text>
      </g>

      <!-- Tres ángeles con el cartel.
           El grupo exterior no lleva transform: es el que anima GSAP.
           El interior conserva su posición original. -->
      <g id="eve-angels" opacity="0">
        ${[
          { x: 300, y: 120, scale: 0.8 },
          { x: 500, y: 78, scale: 0.95 },
          { x: 700, y: 120, scale: 0.8 },
        ]
          .map(
            ({ x, y, scale }) => `
              <g class="eve-angel-fly">
                <g class="eve-angel" transform="translate(${x} ${y}) scale(${scale})">
                  <path d="M -22 0 C -48 -22 -68 -16 -72 4 C -56 0 -40 6 -28 14 Z" fill="#f6f0e5"/>
                  <path d="M 22 0 C 48 -22 68 -16 72 4 C 56 0 40 6 28 14 Z" fill="#f6f0e5"/>
                  <path d="M -20 26 Q -22 -14 0 -30 Q 22 -14 20 26 Q 10 32 0 32 Q -10 32 -20 26 Z" fill="${CONFIG.candleColors.violetLight}"/>
                  <circle cx="0" cy="-40" r="12" fill="#e8c9a8"/>
                  <circle cx="0" cy="-40" r="19" fill="${CONFIG.candleColors.goldLight}" opacity="0.4"/>
                </g>
              </g>`,
          )
          .join('')}
      </g>
    </svg>`;
}

/**
 * Crea la capa de Nochebuena.
 *
 * @param {object} options
 * @param {() => void} [options.onClose]
 * @returns {HTMLElement}
 */
export function createChristmasEveScene(options = {}) {
  const { onClose } = options;
  const verse = getVerse('AmorDios');

  const overlay = createElement('div', {
    class: 'christmas-eve',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Celebración de Nochebuena',
  });

  overlay.innerHTML = `
    <div class="christmas-eve__backdrop"></div>
    <div class="christmas-eve__panel">
      <div class="christmas-eve__visual">${renderSceneSvg()}</div>
      <div class="christmas-eve__content">
        <p class="christmas-eve__eyebrow">24 de diciembre</p>
        <h2 class="christmas-eve__title">Nochebuena</h2>
        <p class="christmas-eve__message">${CONFIG.christmasEveMessage}</p>
        <blockquote class="christmas-eve__verse">
          <p>${verse.text}</p>
          <cite>${verse.reference}</cite>
        </blockquote>
        <p class="christmas-eve__prayer">${CONFIG.christmasEvePrayer}</p>
      </div>
      <div class="christmas-eve__actions">
        <button type="button" class="button button--ghost" data-eve-replay>Volver a contemplar</button>
        <button type="button" class="button" data-eve-close>Cerrar</button>
      </div>
    </div>`;

  const closeButton = overlay.querySelector('[data-eve-close]');
  closeButton?.addEventListener('click', () => onClose?.());

  return overlay;
}

export default createChristmasEveScene;
