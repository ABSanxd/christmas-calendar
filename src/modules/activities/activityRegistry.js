/**
 * Registro de actividades.
 *
 * Mapa único que asocia cada tipo de contenido con su componente. Añadir un
 * tipo nuevo de actividad solo requiere registrarlo aquí: el calendario, el
 * modal y el controlador no necesitan modificarse.
 */

import { createReflection } from '../../components/activities/Reflection.js';
import { createPurpose } from '../../components/activities/Purpose.js';
import { createPrayer } from '../../components/activities/Prayer.js';
import { createChallenge } from '../../components/activities/Challenge.js';
import { createQuiz } from '../../components/activities/Quiz.js';
import { createTrivia } from '../../components/activities/Trivia.js';
import { createRiddle } from '../../components/activities/Riddle.js';
import { createScramble } from '../../components/activities/Scramble.js';
import { createWordSearch } from '../../components/activities/WordSearch.js';
import { createMusicActivity } from '../../components/activities/MusicActivity.js';

/**
 * @typedef {object} ActivityDefinition
 * @property {(options: object) => {element: HTMLElement, validate: () => boolean, getData: () => object}} create
 * @property {boolean} requiresAnswer Si hace falta una interacción para completarla.
 * @property {object} [options] Opciones adicionales para el constructor.
 */

/** @type {Record<string, ActivityDefinition>} */
export const ACTIVITY_REGISTRY = {
  reflection: { create: createReflection, requiresAnswer: true },
  purpose: { create: createPurpose, requiresAnswer: true },
  prayer: { create: createPrayer, requiresAnswer: false },
  challenge: { create: createChallenge, requiresAnswer: true, options: { family: false } },
  challengeFamily: { create: createChallenge, requiresAnswer: true, options: { family: true } },
  quiz: { create: createQuiz, requiresAnswer: true },
  trivia: { create: createTrivia, requiresAnswer: true },
  riddle: { create: createRiddle, requiresAnswer: true },
  scramble: { create: createScramble, requiresAnswer: true },
  wordsearch: { create: createWordSearch, requiresAnswer: true },
  music: { create: createMusicActivity, requiresAnswer: false },
};

/**
 * Devuelve la definición de una actividad.
 * @param {string} type
 * @returns {ActivityDefinition|null}
 */
export function getActivityDefinition(type) {
  return ACTIVITY_REGISTRY[type] ?? null;
}

/**
 * Indica si el tipo de actividad existe.
 * @param {string} type
 * @returns {boolean}
 */
export function hasActivityType(type) {
  return Boolean(ACTIVITY_REGISTRY[type]);
}

export default ACTIVITY_REGISTRY;
