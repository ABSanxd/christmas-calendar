/**
 * Trivia bíblica: una pregunta con explicaciones por respuesta.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, setFeedback } from './activityParts.js';

/**
 * Crea la actividad de trivia.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createQuiz(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--quiz' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const question = createElement('h3', { class: 'activity__question-title' });
  question.textContent = content.question;
  element.appendChild(question);

  const list = createElement('div', { class: 'quiz__options', role: 'radiogroup' });
  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  let answered = false;

  content.options.forEach((option) => {
    const label = createElement('label', { class: 'quiz__option' });
    const input = createElement('input', {
      type: 'radio',
      name: `quiz-${Math.random().toString(36).slice(2, 8)}`,
      value: option.label,
      class: 'quiz__input',
    });
    const text = createElement('span', { class: 'quiz__label' });
    text.textContent = option.label;

    label.appendChild(input);
    label.appendChild(text);
    list.appendChild(label);

    input.addEventListener('change', () => {
      if (answered) return;
      answered = true;
      const isCorrect = Boolean(option.correct);
      label.dataset.result = isCorrect ? 'correct' : 'incorrect';
      if (!isCorrect) {
        const correctOption = Array.from(list.querySelectorAll('.quiz__option')).find((item) =>
          item.querySelector('input')?.value === content.options.find((entry) => entry.correct)?.label,
        );
        if (correctOption) correctOption.dataset.result = 'correct';
      }
      setFeedback(
        feedback,
        option.feedback,
        isCorrect ? 'success' : 'error',
      );
    });
  });

  element.appendChild(list);
  element.appendChild(feedback);

  if (saved.answer) {
    const input = list.querySelector(`input[value="${CSS.escape(saved.answer)}"]`);
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  if (content.closing) {
    const closing = createElement('p', { class: 'activity__closing' });
    closing.textContent = content.closing;
    element.appendChild(closing);
  }

  return {
    element,
    validate: () => answered,
    getData: () => {
      const checked = list.querySelector('input:checked');
      return { answer: checked?.value ?? '' };
    },
  };
}

export default createQuiz;
