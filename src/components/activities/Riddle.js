/**
 * Acertijo: el usuario escribe su respuesta y puede pedir pistas.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, setFeedback } from './activityParts.js';
import { normalizeText } from '../../utils/validationUtils.js';

/**
 * Crea el acertijo del día.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createRiddle(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--riddle' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const question = createElement('p', { class: 'riddle__question' });
  question.textContent = content.question;
  element.appendChild(question);

  const form = createElement('form', { class: 'riddle__form' });
  const input = createElement('input', {
    type: 'text',
    class: 'riddle__input',
    placeholder: 'Escribe tu respuesta…',
    'aria-label': 'Tu respuesta al acertijo',
    autocomplete: 'off',
  });
  input.value = saved.answer ?? '';

  const submit = createElement('button', { type: 'submit', class: 'button' });
  submit.textContent = 'Responder';

  form.appendChild(input);
  form.appendChild(submit);
  element.appendChild(form);

  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;
  element.appendChild(feedback);

  // Pistas progresivas.
  const hintsBox = createElement('div', { class: 'riddle__hints' });
  element.appendChild(hintsBox);

  let hintIndex = 0;
  let solved = Boolean(saved.solved);

  const hints = content.hints ?? [];
  if (hints.length > 0) {
    const hintButton = createElement('button', {
      type: 'button',
      class: 'button button--ghost riddle__hint-button',
    });
    hintButton.textContent = 'Necesito una pista';
    hintButton.addEventListener('click', () => {
      if (hintIndex >= hints.length) {
        hintButton.disabled = true;
        hintButton.textContent = 'No hay más pistas';
        return;
      }
      const hint = createElement('p', { class: 'riddle__hint' });
      hint.textContent = `Pista ${hintIndex + 1}: ${hints[hintIndex]}`;
      hintsBox.appendChild(hint);
      hintIndex += 1;
      if (hintIndex >= hints.length) {
        hintButton.disabled = true;
        hintButton.textContent = 'No hay más pistas';
      }
    });
    element.appendChild(hintButton);
  }

  const accepted = [content.answer, ...(content.acceptedAnswers ?? [])].map(normalizeText);

  function check() {
    const value = normalizeText(input.value);
    if (!value) {
      setFeedback(feedback, 'Escribe una respuesta antes de continuar.', 'error');
      return;
    }
    if (accepted.includes(value)) {
      solved = true;
      setFeedback(feedback, content.success ?? '¡Correcto!', 'success');
      input.disabled = true;
      submit.disabled = true;
    } else {
      setFeedback(feedback, 'Todavía no. Piensa un poco más o pide una pista.', 'error');
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    check();
  });

  if (saved.solved) {
    solved = true;
    setFeedback(feedback, content.success ?? '¡Correcto!', 'success');
  }

  return {
    element,
    validate: () => solved,
    getData: () => ({ answer: input.value.trim(), solved }),
  };
}

export default createRiddle;
