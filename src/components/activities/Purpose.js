/**
 * Actividad de propósito espiritual: una lista de compromisos marcables.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, optionList } from './activityParts.js';

/**
 * Crea la actividad de propósito.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createPurpose(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--purpose' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const selected = new Set(saved.selected ?? []);

  const list = optionList(content.options ?? [], {
    multiple: true,
    onChange: (values) => {
      selected.clear();
      values.forEach((value) => selected.add(value));
    },
  });

  list.querySelectorAll('input').forEach((input) => {
    if (selected.has(input.value)) input.checked = true;
  });

  element.appendChild(list);

  if (content.closing) {
    const closing = createElement('p', { class: 'activity__closing' });
    closing.textContent = content.closing;
    element.appendChild(closing);
  }

  return {
    element,
    validate: () => selected.size > 0,
    getData: () => ({ selected: Array.from(selected) }),
  };
}

export default createPurpose;
