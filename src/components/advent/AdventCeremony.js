/**
 * Ceremonia de encendido de la vela de Adviento.
 *
 * Es la experiencia que se abre el domingo de Adviento: la corona salta desde
 * su esquina hasta el centro de la pantalla, el fondo se oscurece y el
 * puntero del mouse se convierte en un fósforo. La vela que toca encender
 * late suavemente para invitar a tocarla, y el mensaje explica qué hacer.
 *
 * La misma experiencia sirve para los cuatro domingos: la vela a encender es
 * siempre la primera que todavía está apagada, y las de los domingos
 * anteriores ya aparecen encendidas.
 *
 * Cuando el usuario ha encendido la vela, la ceremonia **no se cierra sola**:
 * espera a que la cierre él, para que pueda leer el mensaje del domingo con
 * calma. Al cerrarla, se abre la reflexión de ese domingo.
 */

import { createElement } from '../../utils/domUtils.js';
import { renderAdventWreathSvg } from './AdventWreath.js';

/** Ordinales de las velas, para redactar el mensaje. */
const CANDLE_ORDINALS = ['', 'primera', 'segunda', 'tercera', 'cuarta'];

/**
 * Devuelve el nombre de la vela en texto.
 * @param {number} candleIndex
 * @returns {string}
 */
export function getCandleOrdinal(candleIndex) {
  return CANDLE_ORDINALS[candleIndex] ?? `${candleIndex}`;
}

/**
 * Crea la capa de la ceremonia.
 *
 * @param {object} options
 * @param {number} options.litCount      Velas ya encendidas.
 * @param {number} options.targetCandle  Vela que el usuario debe encender.
 * @param {string} [options.message]     Mensaje del domingo.
 * @param {() => void} [options.onLight] Se invoca cuando el usuario enciende la vela.
 * @param {() => void} [options.onClose] Se invoca cuando el usuario cierra la ceremonia.
 * @returns {object} Referencias de la ceremonia.
 */
export function createAdventCeremony(options = {}) {
  const { litCount = 0, targetCandle = 1, message = '', onLight, onClose } = options;

  const overlay = createElement('div', {
    class: 'advent-ceremony',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Encender la vela de Adviento',
  });

  overlay.innerHTML = `
    <div class="advent-ceremony__backdrop" data-ceremony-backdrop></div>
    <div class="advent-ceremony__stage">
      <div class="advent-ceremony__wreath" data-ceremony-wreath>
        ${renderAdventWreathSvg({ litCount, targetCandle })}
      </div>
      <p class="advent-ceremony__message" data-ceremony-message role="status"></p>
      <button type="button" class="advent-ceremony__hint" data-ceremony-hint>
        <span class="advent-ceremony__spark" aria-hidden="true">✧</span>
        <span data-ceremony-hint-text>Toca para encender la ${getCandleOrdinal(targetCandle)} velita</span>
      </button>
      <button type="button" class="advent-ceremony__continue" data-ceremony-continue hidden>
        Leer la reflexión de este domingo
      </button>
    </div>`;

  const wreath = overlay.querySelector('[data-ceremony-wreath]');
  const figure = wreath?.querySelector('.advent-wreath__figure');
  const hint = overlay.querySelector('[data-ceremony-hint]');
  const hintText = overlay.querySelector('[data-ceremony-hint-text]');
  const messageElement = overlay.querySelector('[data-ceremony-message]');
  const continueButton = overlay.querySelector('[data-ceremony-continue]');
  const target = wreath?.querySelector(`[data-candle="${targetCandle}"]`);

  let lit = false;
  let closed = false;

  /**
   * Enciende la vela: solo puede ocurrir una vez.
   */
  const light = () => {
    if (lit || closed) return;
    lit = true;
    onLight?.();
  };

  /**
   * Cierra la ceremonia: solo puede ocurrir una vez y solo cuando la vela
   * ya está encendida.
   */
  const close = () => {
    if (closed || !lit) return;
    closed = true;
    onClose?.();
  };

  // La vela es el objetivo táctil: se puede tocar, y también activar con el
  // teclado (Enter o espacio) sin depender del puntero.
  if (target) {
    target.setAttribute('role', 'button');
    target.setAttribute('tabindex', '0');
    target.setAttribute('aria-label', `Encender la ${getCandleOrdinal(targetCandle)} vela de Adviento`);
    target.addEventListener('click', light);
    target.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        light();
      }
    });
  }

  hint?.addEventListener('click', light);
  continueButton?.addEventListener('click', close);

  // Escape enciende la vela si todavía está apagada y cierra la ceremonia si
  // ya está encendida: nunca se queda bloqueada.
  const onKeydown = (event) => {
    if (event.key !== 'Escape') return;
    if (lit) close();
    else light();
  };
  document.addEventListener('keydown', onKeydown);

  return {
    element: overlay,
    wreath,
    figure,
    target,
    hint,
    messageElement,
    continueButton,

    /**
     * Indica si la vela ya está encendida.
     * @returns {boolean}
     */
    isLit: () => lit,

    /**
     * Cambia el texto del mensaje principal (el que invita a tocar).
     * @param {string} text
     */
    setHint(text) {
      if (hintText) hintText.textContent = text;
    },

    /**
     * Muestra el mensaje del domingo.
     * @param {string} [text]
     */
    showMessage(text = message) {
      if (!messageElement) return;
      messageElement.textContent = text;
      messageElement.classList.add('is-visible');
    },

    /**
     * Muestra el botón para terminar la ceremonia.
     */
    showContinue() {
      if (!continueButton) return;
      continueButton.hidden = false;
      continueButton.focus();
    },

    /**
     * Cierra la ceremonia y suprime el atajo de teclado.
     */
    destroy() {
      document.removeEventListener('keydown', onKeydown);
      overlay.remove();
    },
  };
}

export default createAdventCeremony;
