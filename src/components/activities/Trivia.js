/**
 * Juego de preguntas con varias rondas y explicación final.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, enableDeselect } from './activityParts.js';

/**
 * Crea el juego de preguntas.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createTrivia(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--trivia' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const status = createElement('p', { class: 'trivia__status' });
  element.appendChild(status);

  const answers = new Map(Object.entries(saved.answers ?? {}));
  const questions = content.questions ?? [];
  let currentIndex = 0;

  const stage = createElement('section', { class: 'trivia__stage' });
  element.appendChild(stage);

  function renderQuestion() {
    stage.innerHTML = '';
    const question = questions[currentIndex];
    if (!question) {
      renderSummary();
      return;
    }

    status.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;

    const title = createElement('h3', { class: 'activity__question-title' });
    title.textContent = question.q;
    stage.appendChild(title);

    const list = createElement('div', { class: 'quiz__options', role: 'radiogroup' });
    const explain = createElement('p', { class: 'activity__feedback' });
    explain.hidden = true;

    // El botón de "Siguiente" se crea una sola vez por pregunta: si se
    // creara al responder, se irían acumulando varios en la misma ronda.
    const next = createElement('button', {
      type: 'button',
      class: 'button button--ghost',
    });
    next.hidden = true;
    next.textContent =
      currentIndex < questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultado';
    next.addEventListener('click', () => {
      currentIndex += 1;
      renderQuestion();
    });

    question.options.forEach((label, optionIndex) => {
      const optionLabel = createElement('label', { class: 'quiz__option' });
      const input = createElement('input', {
        type: 'radio',
        name: `trivia-${currentIndex}`,
        value: String(optionIndex),
      });
      const text = createElement('span', { class: 'quiz__label' });
      text.textContent = label;

      optionLabel.appendChild(input);
      optionLabel.appendChild(text);
      list.appendChild(optionLabel);

      input.addEventListener('change', () => {
        if (!input.checked) return;
        const isCorrect = optionIndex === question.correct;
        optionLabel.dataset.result = isCorrect ? 'correct' : 'incorrect';
        if (!isCorrect) {
          const correctLabel = list.children[question.correct];
          if (correctLabel) correctLabel.dataset.result = 'correct';
        }
        answers.set(String(currentIndex), String(optionIndex));
        explain.textContent = question.explain;
        explain.dataset.tone = isCorrect ? 'success' : 'info';
        explain.hidden = false;
        next.hidden = false;
      });
    });

    // La opción marcada se puede volver a pulsar para deseleccionarla.
    enableDeselect(list, () => {
      answers.delete(String(currentIndex));
      list.querySelectorAll('.quiz__option').forEach((option) => delete option.dataset.result);
      explain.hidden = true;
      next.hidden = true;
    });

    stage.appendChild(list);
    stage.appendChild(explain);
    stage.appendChild(next);

    const previous = answers.get(String(currentIndex));
    if (previous !== undefined) {
      const input = list.querySelector(`input[value="${previous}"]`);
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  function renderSummary() {
    stage.innerHTML = '';
    const correctCount = questions.filter(
      (question, index) => Number(answers.get(String(index))) === question.correct,
    ).length;

    const summary = createElement('div', { class: 'trivia__summary' });
    summary.innerHTML = `
      <p class="trivia__score">Has acertado ${correctCount} de ${questions.length}</p>
      <p class="trivia__encouragement">${
        correctCount === questions.length
          ? '¡Perfecto! Conoces bien la historia de la salvación de Jesús.'
          : 'Cada respuesta es una pequeña puerta: vuelve a intentarlo cuando quieras.'
      }</p>`;
    stage.appendChild(summary);

    // Se puede volver a empezar el cuestionario, para repetirlo o mejorarlo.
    const retry = createElement('button', {
      type: 'button',
      class: 'button button--ghost trivia__retry',
    });
    retry.textContent = 'Volver a intentar';
    retry.addEventListener('click', () => {
      currentIndex = 0;
      answers.clear();
      renderQuestion();
    });
    stage.appendChild(retry);

    if (content.closing) {
      const closing = createElement('p', { class: 'activity__closing' });
      closing.textContent = content.closing;
      stage.appendChild(closing);
    }
  }

  renderQuestion();

  return {
    element,
    validate: () => answers.size === questions.length,
    getData: () => ({ answers: Object.fromEntries(answers) }),
  };
}

export default createTrivia;
