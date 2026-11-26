/**
 * Modal de actividad: muestra el contenido de un día y permite completarlo.
 */

import { createElement } from '../../utils/domUtils.js';
import { createModal } from '../interface/Modal.js';
import { getActivityType } from '../../data/activities.js';
import { getActivityDefinition } from '../../modules/activities/activityRegistry.js';
import { getInteractions } from '../../modules/progress/progressTracker.js';

/**
 * Crea el modal de una casilla.
 *
 * @param {object} options
 * @param {object} options.day  Datos del día (id, day, title, subtitle, type…).
 * @param {boolean} [options.completed] Si la actividad ya está completada.
 * @param {() => void} [options.onClose]
 * @param {(data: object) => void} [options.onComplete]
 * @returns {{modal: object, element: HTMLElement, activity: object|null}}
 */
export function createActivityModal(options) {
  const { day, completed = false, onClose, onComplete } = options;
  const typeInfo = getActivityType(day.type);

  const modal = createModal({
    title: day.title,
    subtitle: day.subtitle,
    size: day.type === 'music' ? 'wide' : 'regular',
    onClose,
  });

  const container = createElement('div', { class: 'activity-modal' });

  const header = createElement('header', { class: 'activity-modal__header' });
  header.innerHTML = `
    <span class="activity-modal__badge" aria-hidden="true">Día ${day.day}</span>
    <span class="activity-modal__type">${typeInfo.label}</span>`;
  container.appendChild(header);

  const content = createElement('div', { class: 'activity-modal__content' });
  container.appendChild(content);

  const footer = createElement('footer', { class: 'activity-modal__footer' });
  const completeButton = createElement('button', {
    type: 'button',
    class: 'button button--complete',
  });
  // Un día ya realizado se puede volver a abrir y actualizar: si más tarde se
  // completa otro de sus retos, se vuelve a marcar y el día queda al día.
  completeButton.textContent = completed ? 'Actualizar' : 'Marcar como realizada';

  const closeButton = createElement('button', {
    type: 'button',
    class: 'button button--ghost',
  });
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => modal.close());

  footer.appendChild(completeButton);
  footer.appendChild(closeButton);
  container.appendChild(footer);

  modal.content.appendChild(container);

  const definition = getActivityDefinition(day.type);
  let activity = null;

  if (definition) {
    activity = definition.create({
      content: day.content,
      verseKey: day.verseKey,
      saved: getInteractions(day.day),
      ...(definition.options ?? {}),
    });
    content.appendChild(activity.element);
  } else {
    const fallback = createElement('p', { class: 'activity__paragraph' });
    fallback.textContent = 'No hay contenido disponible para este día.';
    content.appendChild(fallback);
  }

  completeButton.addEventListener('click', () => {
    if (activity && !activity.validate()) {
      completeButton.textContent = 'Aún falta un poquito';
      completeButton.classList.add('is-rejected');
      window.setTimeout(() => {
        completeButton.textContent = completed ? 'Actualizar' : 'Marcar como realizada';
        completeButton.classList.remove('is-rejected');
      }, 1400);
      return;
    }

    const data = activity?.getData?.() ?? {};
    completeButton.textContent = completed ? 'Actualizado' : '¡Realizado!';
    activity?.onComplete?.();
    onComplete?.(data);
  });

  return { modal, element: container, activity };
}

export default createActivityModal;
