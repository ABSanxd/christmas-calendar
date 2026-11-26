/**
 * Reflexión de los domingos de Adviento.
 *
 * Se abre en un modal con el mismo estilo que el de las actividades: título,
 * contenido y pie con botones. Al terminar la ceremonia del domingo, el
 * visitante cierra la corona y esta reflexión aparece; además, se puede volver
 * a leer más adelante desde el botón de la cabecera.
 */

import { createElement } from '../../utils/domUtils.js';
import { createModal } from '../interface/Modal.js';
import { getSundayReflection, getAvailableReflections } from '../../data/adventReflections.js';

/**
 * Crea el modal con la reflexión de un domingo.
 *
 * @param {object} options
 * @param {number} options.index   Domingo (1..4).
 * @param {() => void} [options.onClose]
 * @returns {{modal: object, element: HTMLElement}}
 */
export function createSundayReflectionModal(options) {
  const { index, onClose } = options;
  const reflection = getSundayReflection(index);

  const modal = createModal({
    title: reflection?.title ?? 'Reflexión de Adviento',
    subtitle: reflection ? `${reflection.name} · ${reflection.reference}` : '',
    size: 'regular',
    onClose,
  });

  const container = createElement('div', { class: 'sunday-reflection' });

  if (!reflection) {
    container.innerHTML = '<p class="sunday-reflection__paragraph">No hay reflexión disponible.</p>';
    modal.content.appendChild(container);
    return { modal, element: container };
  }

  container.innerHTML = `
    <section class="sunday-reflection__block sunday-reflection__block--gospel">
      <h3 class="sunday-reflection__heading">El Evangelio</h3>
      <blockquote class="sunday-reflection__gospel">${reflection.gospel}</blockquote>
      <p class="sunday-reflection__reference">${reflection.reference}</p>
    </section>

    <section class="sunday-reflection__block">
      <h3 class="sunday-reflection__heading">Reflexión</h3>
      <p class="sunday-reflection__paragraph">${reflection.reflection}</p>
    </section>

    <section class="sunday-reflection__block sunday-reflection__block--candle">
      <h3 class="sunday-reflection__heading">${reflection.candleName}</h3>
      <p class="sunday-reflection__paragraph">${reflection.candle}</p>
      <p class="sunday-reflection__color">Vela ${reflection.color.toLowerCase()}</p>
    </section>`;

  const footer = createElement('footer', { class: 'sunday-reflection__footer' });
  const closeButton = createElement('button', { type: 'button', class: 'button button--ghost' });
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => modal.close());
  footer.appendChild(closeButton);
  container.appendChild(footer);

  modal.content.appendChild(container);
  return { modal, element: container };
}

/**
 * Crea el modal con la lista de reflexiones ya disponibles.
 *
 * Las reflexiones se habilitan por domingo: en el segundo domingo de Adviento
 * se pueden leer la del primer domingo y la del propio segundo.
 *
 * @param {object} options
 * @param {string} options.dateKey Fecha actual (YYYY-MM-DD).
 * @param {(index: number) => void} options.onSelect
 * @returns {{modal: object, element: HTMLElement}}
 */
export function createReflectionsListModal(options) {
  const { dateKey, onSelect } = options;
  const available = getAvailableReflections(dateKey);

  const modal = createModal({
    title: 'Reflexiones de Adviento',
    subtitle: available.length
      ? `${available.length} ${available.length === 1 ? 'disponible' : 'disponibles'}`
      : '',
    size: 'regular',
  });

  const container = createElement('div', { class: 'sunday-reflection' });

  if (available.length === 0) {
    container.innerHTML =
      '<p class="sunday-reflection__paragraph">La primera reflexión se abrirá el primer domingo de Adviento.</p>';
  } else {
    const list = createElement('ul', { class: 'sunday-reflection__list' });
    available.forEach((reflection) => {
      const item = createElement('li');
      const button = createElement('button', {
        type: 'button',
        class: 'sunday-reflection__item',
      });
      button.innerHTML = `
        <span class="sunday-reflection__item-name">${reflection.name}</span>
        <span class="sunday-reflection__item-title">${reflection.title}</span>
        <span class="sunday-reflection__item-reference">${reflection.reference}</span>`;
      button.addEventListener('click', () => {
        modal.close();
        onSelect?.(reflection.index);
      });
      item.appendChild(button);
      list.appendChild(item);
    });
    container.appendChild(list);
  }

  modal.content.appendChild(container);
  return { modal, element: container };
}

export default createSundayReflectionModal;
