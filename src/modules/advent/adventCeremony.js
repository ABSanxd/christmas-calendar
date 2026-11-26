/**
 * Orquestación de la ceremonia de Adviento.
 *
 * Es la rutina que se ejecuta el domingo de Adviento:
 *
 *   1. La corona de la esquina salta al centro de la pantalla y el fondo se
 *      oscurece.
 *   2. El puntero del mouse se convierte en un fósforo y la vela que falta por
 *      encender late suavemente, con un mensaje que invita a tocarla.
 *   3. Cuando el usuario enciende la vela, aparece el mensaje del domingo y
 *      la ceremonia **espera a que el usuario la cierre**.
 *   4. Al cerrarla, la corona regresa a su esquina y se abre la reflexión de
 *      ese domingo.
 *
 * La rutina es la misma para los cuatro domingos: solo cambia cuál es la
 * vela pendiente (la primera el 29 de noviembre, la segunda el 6 de
 * diciembre, la tercera el 13 —la de Gaudete— y la cuarta el 20).
 */

import { createAdventCeremony } from '../../components/advent/AdventCeremony.js';
import {
  flyWreathToStage,
  flyWreathBack,
  pulseCandle,
  stopCandlePulse,
  fadeBackdropIn,
} from '../animations/adventCeremonyAnimations.js';
import { setMatchCursor, igniteMatchCursor, clearMatchCursor } from './matchCursor.js';
import { lightCandle, sparkleAroundCandle } from '../animations/candleAnimations.js';
import { playSound } from '../audio/audioController.js';
import { openSundayReflection } from './reflectionsController.js';

/**
 * Ejecuta la ceremonia completa.
 *
 * @param {object} options
 * @param {object} options.plan       Plan de Adviento del domingo.
 * @param {DOMRect} options.originRect Posición de la corona en la esquina.
 * @returns {Promise<void>}
 */
export async function runLightingCeremony(options) {
  const { plan, originRect } = options;
  const targetCandle = plan.newCandle || 1;

  let resolveLight;
  const litPromise = new Promise((resolve) => {
    resolveLight = resolve;
  });

  let resolveClose;
  const closedPromise = new Promise((resolve) => {
    resolveClose = resolve;
  });

  const ceremony = createAdventCeremony({
    litCount: plan.candlesBefore,
    targetCandle,
    message: plan.message,
    onLight: () => resolveLight(),
    onClose: () => resolveClose(),
  });

  document.body.appendChild(ceremony.element);

  // El fósforo sustituye al puntero del mouse mientras dura la ceremonia.
  setMatchCursor(false);

  const backdrop = ceremony.element.querySelector('[data-ceremony-backdrop]');
  await fadeBackdropIn(backdrop);
  await flyWreathToStage(ceremony.figure, originRect);

  // La vela pendiente late para invitar a tocarla.
  const pulse = pulseCandle(ceremony.target);

  // Esperamos a que el usuario encienda la vela.
  await litPromise;

  // La llama crece y salpican chispas alrededor.
  stopCandlePulse(ceremony.target);
  lightCandle(targetCandle, { wreath: ceremony.wreath });
  sparkleAroundCandle(ceremony.wreath, targetCandle);
  igniteMatchCursor(true);
  playSound('candle');

  // El mensaje del domingo sustituye al mensaje interactivo y la ceremonia
  // queda en manos del visitante: él decide cuándo seguir.
  ceremony.setHint('');
  ceremony.hint?.setAttribute('hidden', '');
  ceremony.showMessage();
  ceremony.showContinue();

  await closedPromise;

  // La corona vuelve a su esquina.
  await flyWreathBack(ceremony.figure, originRect);
  ceremony.destroy();
  clearMatchCursor();

  // El latido se detiene por si el elemento sigue en el DOM.
  if (pulse) pulse.kill();

  // Y se abre la reflexión del domingo.
  openSundayReflection(targetCandle);
}

export default runLightingCeremony;
