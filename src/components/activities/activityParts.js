/**
 * Piezas reutilizables de las actividades.
 *
 * Evitan duplicar el marcado de versículos, introducciones, listas de pasos y
 * selectores de opción en cada tipo de actividad.
 */

import { createElement } from '../../utils/domUtils.js';
import { getVerse } from '../../data/bibleVerses.js';

/**
 * Bloque con el versículo del día.
 * @param {string} verseKey
 * @returns {HTMLElement|null}
 */
export function verseBlock(verseKey) {
  if (!verseKey) return null;
  let verse;
  try {
    verse = getVerse(verseKey);
  } catch {
    return null;
  }

  const element = createElement('figure', { class: 'verse-block' });
  element.innerHTML = `
    <blockquote>${verse.text}</blockquote>
    <figcaption>${verse.reference} · ${verse.theme}</figcaption>`;
  return element;
}

/**
 * Párrafo de introducción.
 * @param {string} text
 * @returns {HTMLElement|null}
 */
export function introBlock(text) {
  if (!text) return null;
  const element = createElement('p', { class: 'activity__intro' });
  element.textContent = text;
  return element;
}

/**
 * Lista numerada de pasos o retos.
 * @param {string[]} steps
 * @returns {HTMLElement}
 */
export function stepsBlock(steps = []) {
  const element = createElement('ol', { class: 'activity__steps' });
  steps.forEach((step) => {
    const item = createElement('li', { class: 'activity__step' });
    const checkbox = createElement('input', {
      type: 'checkbox',
      class: 'activity__checkbox',
    });
    const label = createElement('label', { class: 'activity__step-label' });
    label.textContent = step;
    item.appendChild(checkbox);
    item.appendChild(label);
    element.appendChild(item);
  });
  return element;
}

/**
 * Lista de opciones marcables.
 *
 * En el modo de opción única se puede **deseleccionar**: pulsar otra vez la
 * opción ya marcada la deja sin elegir. Un botón de radio por sí solo no
 * permite eso, así que aquí se controla a mano.
 *
 * @param {string[]} options
 * @param {object} [config]
 * @param {boolean} [config.multiple]
 * @param {(selected: string[]) => void} [config.onChange]
 * @returns {HTMLElement}
 */
export function optionList(options = [], config = {}) {
  const { multiple = false, onChange } = config;
  const element = createElement('div', {
    class: `option-list${multiple ? ' option-list--multiple' : ''}`,
    role: multiple ? 'group' : 'radiogroup',
  });

  options.forEach((option, index) => {
    const label = createElement('label', { class: 'option-list__option' });
    const input = createElement('input', {
      type: multiple ? 'checkbox' : 'radio',
      name: `option-${index}-${Math.random().toString(36).slice(2, 8)}`,
      value: option,
      class: 'option-list__input',
    });

    const text = createElement('span', { class: 'option-list__text' });
    text.textContent = option;

    label.appendChild(input);
    label.appendChild(text);
    element.appendChild(label);
  });

  /**
   * Lee las opciones marcadas.
   * @returns {string[]}
   */
  const readSelected = () =>
    Array.from(element.querySelectorAll('input:checked')).map((input) => input.value);

  if (onChange) {
    // Estado anterior de la opción que se está pulsando: sirve para saber si
    // venía ya marcada (y entonces hay que deseleccionarla).
    let wasChecked = false;

    element.addEventListener('pointerdown', (event) => {
      const input = event.target.closest('.option-list__input');
      wasChecked = Boolean(input?.checked);
    });

    element.addEventListener('click', (event) => {
      const input = event.target.closest('.option-list__input');
      if (!input) return;
      if (!multiple && wasChecked) input.checked = false;
      wasChecked = false;
      onChange(readSelected());
    });

    element.addEventListener('change', () => {
      onChange(readSelected());
    });

    // Con el teclado también se puede quitar la selección.
    element.addEventListener('keydown', (event) => {
      if (multiple) return;
      if (event.key !== ' ' && event.key !== 'Enter') return;
      const input = event.target.closest('.option-list__input');
      if (!input || !input.checked) return;
      event.preventDefault();
      input.checked = false;
      onChange(readSelected());
    });
  }

  return element;
}

/**
 * Campo de texto libre (opcional, se guarda solo en este navegador).
 * @param {object} config
 * @param {string} config.placeholder
 * @param {string} config.value
 * @param {number} [config.maxLength]
 * @returns {HTMLTextAreaElement}
 */
export function noteField(config = {}) {
  const { placeholder = 'Escribe aquí…', value = '', maxLength = 280 } = config;
  const field = createElement('textarea', {
    class: 'note-field',
    rows: '3',
    maxlength: String(maxLength),
    placeholder,
    'aria-label': placeholder,
  });
  field.value = value;
  return field;
}

/**
 * Aviso de estado dentro de la actividad.
 * @param {HTMLElement} container
 * @param {string} message
 * @param {'success'|'error'|'info'} [tone]
 */
export function setFeedback(container, message, tone = 'info') {
  if (!container) return;
  container.textContent = message;
  container.dataset.tone = tone;
  container.hidden = !message;
}
