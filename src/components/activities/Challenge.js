/**
 * Reto personal o familiar.
 *
 * La misma pieza sirve para ambos: cambia la introducción, los pasos y el
 * mensaje de ánimo que ofrece el archivo de datos.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, stepsBlock } from './activityParts.js';

/**
 * Crea un reto.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {boolean} [options.family] Si el reto es familiar.
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createChallenge(options) {
  const { content, verseKey, family = false, saved = {} } = options;
  const element = createElement('div', {
    class: `activity activity--challenge${family ? ' activity--family' : ''}`,
  });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const steps = stepsBlock(content.steps ?? []);
  const checked = new Set(saved.checkedSteps ?? []);
  steps.querySelectorAll('input').forEach((input, index) => {
    if (checked.has(index)) input.checked = true;
    input.addEventListener('change', () => {
      if (input.checked) checked.add(index);
      else checked.delete(index);
    });
  });
  element.appendChild(steps);

  if (content.duration) {
    const duration = createElement('p', { class: 'activity__duration' });
    duration.textContent = `Tiempo estimado: ${content.duration}`;
    element.appendChild(duration);
  }

  if (content.encouragement) {
    const encouragement = createElement('p', { class: 'activity__encouragement' });
    encouragement.textContent = content.encouragement;
    encouragement.hidden = true;
    element.appendChild(encouragement);
  }

  return {
    element,
    validate: () => checked.size > 0,
    getData: () => ({ checkedSteps: Array.from(checked) }),
    onComplete: () => {
      const encouragement = element.querySelector('.activity__encouragement');
      if (encouragement) encouragement.hidden = false;
    },
  };
}

export default createChallenge;
