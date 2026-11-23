/**
 * Ilustración completa de Belén.
 *
 * Devuelve el marcado SVG de la escena, con capas semánticas (`data-layer`)
 * que permiten orientar las animaciones de GSAP y los estados visuales de las
 * casillas.
 */

import { renderSky } from './SkyLayer.js';
import { renderVillage } from './VillageLayer.js';
import { renderNativity } from './NativityLayer.js';
import { renderAngels } from './AngelsLayer.js';
import { renderCharacters } from './CharactersLayer.js';
import { renderDayDoors } from './DayDoors.js';
import { SCENE_COLORS } from './shapes.js';
import { SCENE_VIEWBOX } from '../../../data/sceneLayout.js';

/**
 * Definiciones SVG (gradientes, filtros y patrones).
 * @returns {string}
 */
export function renderSceneDefs() {
  return `
    <defs>
      <linearGradient id="sky-gradient" x1="0" y1="0" x2="0.25" y2="1">
        <stop offset="0%" stop-color="${SCENE_COLORS.skyTop}"/>
        <stop offset="48%" stop-color="${SCENE_COLORS.skyMid}"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.skyLow}"/>
      </linearGradient>

      <radialGradient id="sky-halo" cx="50%" cy="22%" r="60%">
        <stop offset="0%" stop-color="${SCENE_COLORS.violetLight}" stop-opacity="0.34"/>
        <stop offset="60%" stop-color="${SCENE_COLORS.violetDeep}" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.night}" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="ground-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${SCENE_COLORS.sandLight}"/>
        <stop offset="55%" stop-color="${SCENE_COLORS.sand}"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.sandDark}"/>
      </linearGradient>

      <radialGradient id="nativity-disc" cx="50%" cy="38%" r="70%">
        <stop offset="0%" stop-color="#2b3a6e"/>
        <stop offset="55%" stop-color="#1b2749"/>
        <stop offset="100%" stop-color="#111a36"/>
      </radialGradient>

      <radialGradient id="nativity-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${SCENE_COLORS.goldLight}" stop-opacity="0.42"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.goldLight}" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="star-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${SCENE_COLORS.goldLight}" stop-opacity="0.55"/>
        <stop offset="55%" stop-color="${SCENE_COLORS.gold}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.gold}" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="star-metal" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stop-color="${SCENE_COLORS.goldBright}"/>
        <stop offset="55%" stop-color="${SCENE_COLORS.gold}"/>
        <stop offset="100%" stop-color="${SCENE_COLORS.goldDeep}"/>
      </linearGradient>

      <radialGradient id="door-interior" cx="50%" cy="32%" r="70%">
        <stop offset="0%" stop-color="#2a2144"/>
        <stop offset="70%" stop-color="#171f42"/>
        <stop offset="100%" stop-color="#0d1430"/>
      </radialGradient>

      <linearGradient id="gate-recess" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1b2549"/>
        <stop offset="100%" stop-color="#0e1531"/>
      </linearGradient>

      <filter id="scene-soften" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="9"/>
      </filter>

      <filter id="scene-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="mono"/>
        <feComponentTransfer in="mono" result="faded">
          <feFuncA type="linear" slope="0.07"/>
        </feComponentTransfer>
        <feComposite operator="over" in2="SourceGraphic"/>
      </filter>

      <filter id="scene-vignette" x="0" y="0" width="100%" height="100%">
        <feGaussianBlur stdDeviation="0"/>
      </filter>
    </defs>`;
}

/**
 * Marco exterior dorado, como el de la ilustración de referencia.
 * @returns {string}
 */
function renderFrame() {
  const { width, height } = SCENE_VIEWBOX;
  const inset = 18;
  return `
    <g id="scene-frame" data-layer="frame" pointer-events="none">
      <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="none" stroke="${SCENE_COLORS.gold}" stroke-width="12" opacity="0.55"/>
      <rect x="${inset + 14}" y="${inset + 14}" width="${width - (inset + 14) * 2}" height="${height - (inset + 14) * 2}" fill="none" stroke="${SCENE_COLORS.goldLight}" stroke-width="2" opacity="0.35"/>
    </g>`;
}

/**
 * Construye la ilustración completa.
 * @returns {string}
 */
export function renderBethlehemScene() {
  const viewBox = SCENE_VIEWBOX;

  return `
    <svg
      id="bethlehem-scene"
      class="bethlehem-scene"
      viewBox="0 0 ${viewBox.width} ${viewBox.height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración de la aldea de Belén bajo la noche, con la Sagrada Familia en el centro, ángeles con sus trompetas, la estrella de Belén y los reyes magos y los pastores a su alrededor."
      preserveAspectRatio="xMidYMid meet"
    >
      ${renderSceneDefs()}
      ${renderSky(viewBox)}
      ${renderVillage(viewBox)}
      ${renderNativity()}
      ${renderAngels()}
      ${renderCharacters()}
      ${renderDayDoors()}
      ${renderFrame()}
      <rect x="0" y="0" width="${viewBox.width}" height="${viewBox.height}" fill="transparent" filter="url(#scene-grain)" pointer-events="none"/>
    </svg>`;
}

export default renderBethlehemScene;
