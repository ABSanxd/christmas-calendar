/**
 * Pantalla de bienvenida.
 *
 * Aparece en la primera visita. Antes de pedir permiso para las
 * notificaciones explica para qué sirven, tal como pide el diseño del
 * proyecto: el permiso solo se solicita cuando el visitante lo decide.
 */

import { createElement } from '../../utils/domUtils.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * Crea la pantalla de bienvenida.
 *
 * @param {object} options
 * @param {() => void} options.onStart
 * @param {() => void} [options.onEnableNotifications]
 * @param {boolean} [options.canNotify] Si el navegador soporta notificaciones.
 * @returns {{element: HTMLElement, destroy: () => void}}
 */
export function createWelcomeScreen(options) {
  const { onStart, onEnableNotifications, canNotify = false } = options;

  const element = createElement('div', { class: 'welcome', role: 'dialog', 'aria-modal': 'true' });
  element.innerHTML = `
    <div class="welcome__backdrop" aria-hidden="true"></div>
    <div class="welcome__panel">
      <div class="welcome__sky" aria-hidden="true">
        <span class="welcome__star welcome__star--1"></span>
        <span class="welcome__star welcome__star--2"></span>
        <span class="welcome__star welcome__star--3"></span>
        <span class="welcome__star welcome__star--4"></span>
      </div>

      <p class="welcome__eyebrow">Comienza el Adviento</p>
      <h1 class="welcome__title">${CONFIG.name}</h1>
      <p class="welcome__lead">
        Veinticuatro puertas, una en cada día. Detrás de cada una hay una
        reflexión, una oración, un reto o un juego para preparar el corazón
        y recibir a Jesús.
      </p>
      <p class="welcome__hint">
        Tu progreso se guarda en este navegador. No necesitas cuenta ni
        conexión después de la primera visita.
      </p>

      <div class="welcome__actions">
        <button type="button" class="button button--primary welcome__start">Comenzar</button>
      </div>

      <div class="welcome__invite" hidden>
        <p class="welcome__invite-title">¿Quieres un recordatorio cada día?</p>
        <p class="welcome__invite-text">
          Podemos mostrarte un aviso del navegador cuando se abre una nueva
          casilla, mientras esta página siga abierta. Nunca se enviará nada
          con el navegador cerrado.
        </p>
        <div class="welcome__invite-actions">
          <button type="button" class="button button--small" data-invite-yes>
            Sí, activar recordatorios
          </button>
          <button type="button" class="button button--ghost button--small" data-invite-no>
            Ahora no
          </button>
        </div>
      </div>
    </div>`;

  const invite = element.querySelector('.welcome__invite');
  const startButton = element.querySelector('.welcome__start');

  function dismiss() {
    onStart?.();
  }

  startButton.addEventListener('click', dismiss);

  // También se puede cerrar con Escape o clic en el fondo.
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });
  element.querySelector('.welcome__backdrop')?.addEventListener('click', dismiss);

  if (canNotify) {
    invite.hidden = false;
    invite.querySelector('[data-invite-yes]')?.addEventListener('click', () => {
      invite.hidden = true;
      onEnableNotifications?.();
    });
    invite.querySelector('[data-invite-no]')?.addEventListener('click', () => {
      invite.hidden = true;
    });
  }

  return {
    element,
    destroy: () => element.remove(),
  };
}

export default createWelcomeScreen;
