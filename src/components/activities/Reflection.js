/**
 * Actividad de reflexión: lectura breve y una pregunta para meditar.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, optionList } from './activityParts.js';

/**
 * Crea la reflexión de un día.
 *
 * @param {object} options
 * @param {object} options.content Contenido de la actividad.
 * @param {string} [options.verseKey]
 * @param {object} [options.saved] Datos ya guardados por el usuario.
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createReflection(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--reflection' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  (content.paragraphs ?? []).forEach((paragraph) => {
    const text = createElement('p', { class: 'activity__paragraph' });
    text.textContent = paragraph;
    element.appendChild(text);
  });

  let selectedAnswer = saved.answer ?? '';

  if (content.question) {
    const question = createElement('section', { class: 'activity__question' });
    const prompt = createElement('h3', { class: 'activity__question-title' });
    prompt.textContent = content.question.prompt;
    question.appendChild(prompt);

    const options = optionList(content.question.options ?? [], {
      multiple: false,
      onChange: (values) => {
        selectedAnswer = values[0] ?? '';
      },
    });
    if (selectedAnswer) {
      const input = options.querySelector(`input[value="${CSS.escape(selectedAnswer)}"]`);
      if (input) input.checked = true;
    }
    question.appendChild(options);
    element.appendChild(question);
  }

  if (content.closing) {
    const closing = createElement('p', { class: 'activity__closing' });
    closing.textContent = content.closing;
    element.appendChild(closing);
  }

  return {
    element,
    validate: () => Boolean(selectedAnswer),
    getData: () => ({ answer: selectedAnswer }),
  };
}

export default createReflection;
