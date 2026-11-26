/**
 * Actividad bíblica de reordenación: el usuario recompone un mensaje.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, setFeedback } from './activityParts.js';

/**
 * Baraja un array de forma determinista para que el orden no coincida con la
 * solución sin ser imposible de adivinar.
 * @template T
 * @param {T[]} items
 * @returns {T[]}
 */
function shuffle(items) {
  const array = [...items];
  let seed = items.length * 7919 + 13;
  for (let index = array.length - 1; index > 0; index -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const random = seed / 233280;
    const swapIndex = Math.floor(random * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

/**
 * Crea la actividad de reordenación.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createScramble(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--scramble' });

  // Algunas actividades piden que el visitante busque el texto por su cuenta
  // en la Biblia: en ese caso no se muestra el versículo.
  const verse = content.hideVerse ? null : verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const instruction = createElement('p', { class: 'activity__instruction' });
  instruction.textContent = content.instruction ?? '';
  element.appendChild(instruction);

  const answerRow = createElement('div', { class: 'scramble__answer' });
  answerRow.setAttribute('aria-label', 'Tu respuesta');

  const bank = createElement('div', { class: 'scramble__bank' });
  bank.setAttribute('aria-label', 'Palabras disponibles');

  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  const solution = content.solution ?? content.words.join(' ');
  const words = content.words ?? [];
  const placed = [];

  function renderAnswer() {
    answerRow.innerHTML = '';
    placed.forEach((word, index) => {
      const button = createElement('button', {
        type: 'button',
        class: 'scramble__word scramble__word--placed',
      });
      button.textContent = word;
      button.addEventListener('click', () => {
        placed.splice(index, 1);
        renderAnswer();
        renderBank();
      });
      answerRow.appendChild(button);
    });
    if (placed.length === 0) {
      const placeholder = createElement('span', { class: 'scramble__placeholder' });
      placeholder.textContent = 'Toca las palabras para colocarlas aquí';
      answerRow.appendChild(placeholder);
    }
  }

  function renderBank() {
    bank.innerHTML = '';
    const remaining = words.filter((word) => !placed.includes(word));
    const options = shuffle(remaining);
    options.forEach((word) => {
      const button = createElement('button', {
        type: 'button',
        class: 'scramble__word',
      });
      button.textContent = word;
      button.addEventListener('click', () => {
        placed.push(word);
        renderAnswer();
        renderBank();
        check();
      });
      bank.appendChild(button);
    });
  }

  function check() {
    if (placed.length !== words.length) return;
    const current = placed.join(' ');
    const isCorrect = current.toUpperCase() === solution.toUpperCase();
    if (isCorrect) {
      setFeedback(feedback, '¡Mensaje reconstruido! Los ángeles cantaron esto en Belén.', 'success');
      answerRow.dataset.result = 'correct';
    } else {
      setFeedback(feedback, 'Casi. Cambia el orden de alguna palabra e inténtalo de nuevo.', 'error');
      answerRow.dataset.result = 'incorrect';
    }
  }

  element.appendChild(answerRow);
  element.appendChild(bank);
  element.appendChild(feedback);

  if (content.hint) {
    const hint = createElement('p', { class: 'activity__hint' });
    hint.textContent = `Pista: ${content.hint}`;
    element.appendChild(hint);
  }

  if (saved.answer) {
    placed.push(...saved.answer.split(' '));
  }

  renderAnswer();
  renderBank();

  return {
    element,
    validate: () => placed.join(' ').toUpperCase() === solution.toUpperCase(),
    getData: () => ({ answer: placed.join(' ') }),
  };
}

export default createScramble;
