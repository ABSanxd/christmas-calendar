/**
 * Validación de las actividades y de los datos que estas producen.
 */

import { hasActivityType, getActivityDefinition } from './activityRegistry.js';
import { getActivityType } from '../../data/activities.js';

/**
 * Valida que un día tenga una estructura de actividad utilizable.
 * @param {object} day
 * @returns {{valid: boolean, reason?: string}}
 */
export function validateDayDefinition(day) {
  if (!day || typeof day !== 'object') {
    return { valid: false, reason: 'El día no es un objeto válido.' };
  }
  if (!hasActivityType(day.type)) {
    return { valid: false, reason: `No hay componente registrado para el tipo "${day.type}".` };
  }
  if (!day.content || typeof day.content !== 'object') {
    return { valid: false, reason: 'El día no tiene contenido.' };
  }
  return { valid: true };
}

/**
 * Valida los datos que una actividad devuelve al completarse.
 * @param {string} type
 * @param {object} data
 * @returns {{valid: boolean, reason?: string}}
 */
export function validateActivityData(type, data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, reason: 'No hay datos de actividad.' };
  }
  if (!hasActivityType(type)) {
    return { valid: false, reason: `Tipo de actividad desconocido: "${type}".` };
  }

  switch (type) {
    case 'reflection':
    case 'purpose':
      if (!('answer' in data) && !('selected' in data)) {
        return { valid: false, reason: 'Falta la respuesta de la reflexión.' };
      }
      break;
    case 'quiz':
      if (!data.answer) {
        return { valid: false, reason: 'Falta la respuesta de la trivia.' };
      }
      break;
    case 'trivia':
      if (!data.answers || Object.keys(data.answers).length === 0) {
        return { valid: false, reason: 'Faltan las respuestas del juego.' };
      }
      break;
    case 'riddle':
      if (!data.solved) {
        return { valid: false, reason: 'El acertijo todavía no está resuelto.' };
      }
      break;
    case 'scramble':
      if (!data.answer) {
        return { valid: false, reason: 'El mensaje todavía no está ordenado.' };
      }
      break;
    case 'wordsearch':
      if (!Array.isArray(data.found) || data.found.length === 0) {
        return { valid: false, reason: 'Aún no has encontrado ninguna palabra.' };
      }
      break;
    case 'challenge':
    case 'challengeFamily':
      if (!Array.isArray(data.checkedSteps) || data.checkedSteps.length === 0) {
        return { valid: false, reason: 'Aún no has marcado ningún paso.' };
      }
      break;
    default:
      break;
  }

  return { valid: true };
}

/**
 * Indica si la actividad exige una interacción para poder completarse.
 * @param {string} type
 * @returns {boolean}
 */
export function requiresInteraction(type) {
  return getActivityDefinition(type)?.requiresAnswer ?? false;
}

/**
 * Etiqueta legible de un tipo de actividad.
 * @param {string} type
 * @returns {string}
 */
export function getActivityLabel(type) {
  return getActivityType(type).label;
}

export default validateDayDefinition;
