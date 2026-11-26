/**
 * Escena especial de Nochebuena.
 *
 * Se monta sobre el calendario como una capa a pantalla completa: la
 * fotografía del nacimiento de la comunidad, la fecha, el versículo y la
 * oración final.
 *
 * La imagen es opcional: mientras no exista el archivo
 * `public/assets/images/nacimiento.jpg`, el hueco queda reservado con un
 * aviso discreto.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';
import { getVerse } from '../../data/bibleVerses.js';

/**
 * Crea la capa de Nochebuena.
 *
 * @param {object} options
 * @param {boolean} [options.completed] Si el día ya está marcado como realizado.
 * @param {() => void} [options.onComplete] Se invoca al marcar el día como realizado.
 * @param {() => void} [options.onClose]
 * @returns {HTMLElement}
 */
export function createChristmasEveScene(options = {}) {
  const { completed = false, onComplete, onClose } = options;
  const verse = getVerse('AmorDios');

  const overlay = createElement('div', {
    class: 'christmas-eve',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Celebración de Nochebuena',
  });

  overlay.innerHTML = `
    <div class="christmas-eve__backdrop"></div>
    <div class="christmas-eve__panel">
      <div class="christmas-eve__visual">
        <div class="christmas-eve__photo-frame">
          <img class="christmas-eve__photo" src="assets/images/nacimiento.jpg"
            alt="El Niño Jesús en el pesebre" hidden>
          <p class="christmas-eve__photo-hint">Aquí irá la imagen del nacimiento</p>
        </div>
      </div>
      <div class="christmas-eve__content">
        <p class="christmas-eve__eyebrow">24 de diciembre</p>
        <h2 class="christmas-eve__title">Nochebuena</h2>
        <p class="christmas-eve__message">${CONFIG.christmasEveMessage}</p>
        <blockquote class="christmas-eve__verse">
          <p>${verse.text}</p>
          <cite>${verse.reference}</cite>
        </blockquote>
        <p class="christmas-eve__prayer">${CONFIG.christmasEvePrayer}</p>
        <aside class="christmas-eve__challenge">
          <strong class="christmas-eve__challenge-label">Reto final: </strong>
          <span class="christmas-eve__challenge-text">${CONFIG.christmasEveChallenge}</span>
        </aside>
      </div>
      <div class="christmas-eve__actions">
        <button type="button" class="button button--complete" data-eve-complete>
          ${completed ? 'Actualizar' : 'Marcar como realizada'}
        </button>
        <button type="button" class="button button--ghost" data-eve-close>Cerrar</button>
      </div>
    </div>`;

  // Cuando la comunidad deja su imagen del nacimiento en
  // `public/assets/images/nacimiento.jpg`, esta sustituye al aviso.
  const photo = overlay.querySelector('.christmas-eve__photo');
  const hint = overlay.querySelector('.christmas-eve__photo-hint');
  photo?.addEventListener('load', () => {
    photo.hidden = false;
    hint?.remove();
  });

  const completeButton = overlay.querySelector('[data-eve-complete]');
  completeButton?.addEventListener('click', () => {
    completeButton.textContent = completed ? 'Actualizado' : '¡Realizado!';
    onComplete?.();
  });

  const closeButton = overlay.querySelector('[data-eve-close]');
  closeButton?.addEventListener('click', () => onClose?.());

  return overlay;
}

export default createChristmasEveScene;
