/**
 * Exporta las ilustraciones del proyecto como archivos SVG autónomos.
 *
 * Uso: `node scripts/export-illustrations.mjs`
 *
 * Las ilustraciones que usa la aplicación están escritas como código (para
 * poder animarlas con GSAP), pero también se publican como SVG sueltos en
 * `public/assets/illustrations/` para reutilizarlas en otros proyectos.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderBethlehemScene, renderSceneDefs } from '../src/components/calendar/scene/BethlehemScene.js';
import { renderNativity } from '../src/components/calendar/scene/NativityLayer.js';
import { drawAngel } from '../src/components/calendar/scene/AngelsLayer.js';
import { renderAdventWreathSvg } from '../src/components/advent/AdventWreath.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const base = resolve(root, 'public/assets/illustrations');

/**
 * Escribe un archivo creando su carpeta.
 * @param {string} relativePath
 * @param {string} content
 */
function write(relativePath, content) {
  const target = resolve(base, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${content.trim()}\n`, 'utf8');
  console.log(`· ${relativePath}`);
}

// 1. Escena completa de Belén.
write('bethlehem/escena-belen.svg', renderBethlehemScene());

// 2. Círculo de la Natividad por separado.
write(
  'holy-family/pesebre.svg',
  `<svg viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La Sagrada Familia en el pesebre">
${renderSceneDefs()}
${renderNativity()}
</svg>`,
);

// 3. Ángel trompetista.
write(
  'angels/angel-trompetista.svg',
  `<svg viewBox="-130 -140 280 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ángel trompetista">
${drawAngel({ x: 0, y: 0, scale: 1 })}
</svg>`,
);

// 4. Corona de Adviento.
write('advent-wreath/corona-adviento.svg', renderAdventWreathSvg({ litCount: 4 }));

console.log('\nIlustraciones exportadas en public/assets/illustrations/');
