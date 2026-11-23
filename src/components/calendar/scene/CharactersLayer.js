/**
 * Capa de personajes: los Reyes Magos en sus camellos, los pastores y el rebaño.
 */

import { SCENE_COLORS } from './shapes.js';
import { drawCamel } from './characters/Camel.js';
import { drawMagus } from './characters/Magus.js';
import { drawShepherd } from './characters/Shepherd.js';
import { drawSheep } from './characters/Sheep.js';

/**
 * Construye la capa de personajes.
 * @returns {string}
 */
export function renderCharacters() {
  // --- Reyes Magos ---
  // El camello va por delante y el mago se apoya sobre su lomo.
  const magi = `
    <g id="scene-magi" data-layer="characters">
      <g transform="translate(246 764)">
        ${drawCamel({ x: 0, y: 0, scale: 0.78 })}
        ${drawMagus({ x: -14, y: -78, scale: 0.78, robe: SCENE_COLORS.violet, gift: '#c9a24a' })}
      </g>

      <g transform="translate(1352 792)">
        ${drawCamel({ x: 0, y: 0, scale: 0.74, flip: true })}
        ${drawMagus({
          x: 12,
          y: -74,
          scale: 0.74,
          flip: true,
          robe: SCENE_COLORS.rose,
          gift: '#8fa9c4',
        })}
      </g>
    </g>`;

  // --- Pastores ---
  const shepherds = `
    <g id="scene-shepherds" data-layer="characters">
      ${drawShepherd({ x: 1156, y: 768, scale: 0.92 })}
      ${drawShepherd({ x: 1222, y: 792, scale: 0.82, flip: true, robe: SCENE_COLORS.violetLight })}
    </g>`;

  // --- Rebaño: disperso, como un rebaño de verdad ---
  const sheep = `
    <g id="scene-sheep" data-layer="characters">
      ${drawSheep({ x: 1276, y: 852, scale: 0.86 })}
      ${drawSheep({ x: 1322, y: 806, scale: 0.72, flip: true })}
      ${drawSheep({ x: 1372, y: 868, scale: 0.8 })}
      ${drawSheep({ x: 1420, y: 818, scale: 0.66, flip: true })}
      ${drawSheep({ x: 1466, y: 866, scale: 0.82 })}
      ${drawSheep({ x: 1348, y: 896, scale: 0.62, flip: true })}
      ${drawSheep({ x: 1432, y: 898, scale: 0.64 })}
    </g>`;

  return `${magi}${shepherds}${sheep}`;
}

export default renderCharacters;
