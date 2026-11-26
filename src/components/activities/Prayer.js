/**
 * Actividad de oración.
 *
 * Permite rezar la oración, registrar una intención opcional (que nunca sale
 * del navegador) y marcar la actividad como completada.
 */

import { createElement } from '../../utils/domUtils.js';
import { getPrayer } from '../../data/prayers.js';
import { verseBlock, introBlock, noteField, setFeedback } from './activityParts.js';

/**
 * Crea la actividad de oración.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createPrayer(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', { class: 'activity activity--prayer' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.hint);
  if (intro) element.appendChild(intro);

  let prayer = null;
  try {
    prayer = getPrayer(content.prayerKey);
  } catch (error) {
    console.warn('[calendario] Oración no encontrada:', error);
  }

  if (prayer) {
    const section = createElement('section', { class: 'prayer' });
    const title = createElement('h3', { class: 'prayer__title' });
    title.textContent = prayer.title;
    const text = createElement('p', { class: 'prayer__text' });
    text.textContent = prayer.text;
    const duration = createElement('p', { class: 'prayer__duration' });
    duration.textContent = prayer.duration;

    section.appendChild(title);
    section.appendChild(text);
    section.appendChild(duration);
    element.appendChild(section);
  }

  let intention = saved.intention ?? '';

  if (content.allowIntention) {
    const section = createElement('section', { class: 'prayer__intention' });
    const label = createElement('h3', { class: 'prayer__intention-title' });
    label.textContent = '¿Por quién rezarás hoy? (opcional)';
    const field = noteField({
      placeholder: 'Escribe un nombre o una petición…',
      value: intention,
    });
    field.addEventListener('input', () => {
      intention = field.value.trim();
    });

    section.appendChild(label);
    section.appendChild(field);
    element.appendChild(section);
  }

  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;
  element.appendChild(feedback);

  return {
    element,
    validate: () => true,
    getData: () => ({ intention }),
    onComplete: () => {
      setFeedback(feedback, 'Has rezado. Que esta oración te acompañe todo el día.', 'success');
    },
  };
}

export default createPrayer;
