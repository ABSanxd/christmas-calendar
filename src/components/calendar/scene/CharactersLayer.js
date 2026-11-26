/**
 * Capa de personajes: la caravana de los Reyes Magos, los pastores y el rebaño.
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
  // --- Caravana de los Reyes Magos ---
  // Los tres camellos van en fila, uno detrás de otro, con la carga sobre la
  // joroba; delante de ellos caminan los tres reyes, con su regalo en las
  // manos y la corona puesta.
  const magi = `
    <g id="scene-magi" data-layer="characters">
      <g id="scene-caravan" data-layer="characters">
        ${drawCamel({
          x: 126,
          y: 718,
          scale: 0.62,
          blanket: SCENE_COLORS.violet,
          blanketDark: SCENE_COLORS.violetDeep,
          sack: SCENE_COLORS.sand,
          sackDark: SCENE_COLORS.sandDark,
          crate: SCENE_COLORS.rose,
        })}
        ${drawCamel({
          x: 168,
          y: 746,
          scale: 0.7,
          blanket: SCENE_COLORS.rose,
          blanketDark: SCENE_COLORS.roseDeep,
          sack: SCENE_COLORS.sandLight,
          sackDark: SCENE_COLORS.sand,
          crate: SCENE_COLORS.violet,
        })}
        ${drawCamel({
          x: 218,
          y: 778,
          scale: 0.78,
          blanket: '#3f7a55',
          blanketDark: '#2b5b3c',
          sack: SCENE_COLORS.rose,
          sackDark: SCENE_COLORS.roseDeep,
          crate: SCENE_COLORS.sandDark,
        })}
      </g>

      <g id="scene-kings" data-layer="characters">
        <!-- Melquior: el mayor, con el oro en un cofre -->
        ${drawMagus({
          x: 286,
          y: 812,
          scale: 0.74,
          robe: '#3f7a55',
          robeDark: '#2b5b3c',
          hem: '#e8dcc0',
          accent: '#c6a568',
          accentDark: '#8d713f',
          gift: 'coffer',
          giftColor: '#c9a24a',
          beard: '#8d8a86',
          beardLight: '#b3b0ab',
        })}
        <!-- Gaspar: el más joven, con el incienso en una copa -->
        ${drawMagus({
          x: 346,
          y: 798,
          scale: 0.72,
          robe: '#d4af37',
          robeDark: '#a8862a',
          hem: '#f4e9c6',
          accent: SCENE_COLORS.violet,
          accentDark: SCENE_COLORS.violetDeep,
          gift: 'cup',
          giftColor: '#e8cf7c',
          beard: '#6b4a2f',
          beardLight: '#8a6543',
        })}
        <!-- Baltasar: con la mirra en un recipiente ancho -->
        ${drawMagus({
          x: 404,
          y: 818,
          scale: 0.74,
          robe: '#b5533f',
          robeDark: '#8c3a2c',
          hem: '#f0d9c8',
          accent: '#3f7a55',
          accentDark: '#2b5b3c',
          gift: 'bowl',
          giftColor: '#cfa15a',
          beard: '#5a4029',
          beardLight: '#74573a',
        })}
      </g>
    </g>`;

  // --- Pastores ---
  // Ambos son jóvenes, llevan la manta sobre la cabeza y el cinturón ceñido.
  const shepherds = `
    <g id="scene-shepherds" data-layer="characters">
      ${drawShepherd({
        x: 1140,
        y: 830,
        scale: 0.68,
        robe: '#b8824e',
        robeDark: '#8b5a2e',
        hem: '#dcb488',
        mantle: '#6f8b5c',
        mantleDark: '#526b41',
        belt: '#7a4b2a',
        beltDark: '#54331c',
      })}
      ${drawShepherd({
        x: 1198,
        y: 864,
        scale: 0.62,
        flip: true,
        robe: '#8a76b0',
        robeDark: '#5f4e85',
        hem: '#b3a3d0',
        mantle: '#c47f52',
        mantleDark: '#96593a',
        belt: '#6b4324',
        beltDark: '#4a2e17',
        skin: '#eac3a0',
        hair: '#3f2f21',
      })}
    </g>`;

  // --- Rebaño: disperso, en el campo, con las patas en el suelo ---
  const sheep = `
    <g id="scene-sheep" data-layer="characters">
      ${drawSheep({ x: 1272, y: 718, scale: 0.74 })}
      ${drawSheep({ x: 1352, y: 704, scale: 0.71, flip: true })}
      ${drawSheep({ x: 1428, y: 718, scale: 0.71 })}
      ${drawSheep({ x: 1330, y: 748, scale: 0.77, flip: true })}
      ${drawSheep({ x: 1298, y: 790, scale: 0.86 })}
      ${drawSheep({ x: 1382, y: 786, scale: 0.83, flip: true })}
      ${drawSheep({ x: 1446, y: 794, scale: 0.81 })}
    </g>`;

  return `${magi}${shepherds}${sheep}`;
}

export default renderCharacters;
