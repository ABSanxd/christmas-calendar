/**
 * Controlador de la corona de Adviento.
 *
 * Decide qué hacer con la corona según la fecha de hoy y el progreso guardado:
 *   - Si hoy es domingo de Adviento y el visitante no ha visto la animación,
 *     se reproduce la secuencia completa.
 *   - Si el visitante ya la vio, la corona se muestra con las velas ya
 *     encendidas y se ofrece un botón para volver a contemplarla.
 *   - Si el visitante entra después de varios domingos, se muestran encendidas
 *     las velas de los domingos anteriores sin reproducir sus animaciones.
 */

import { playAdventAnimation } from '../animations/animationController.js';
import { setLitCandles } from '../animations/candleAnimations.js';
import { getAdventPlanForDate } from './adventDates.js';
import { setAdventState, getAdventState } from './adventState.js';
import {
  checkSundayAnimationSeen,
  registerSundayAnimationSeen,
} from '../progress/progressController.js';
import { updateAdventWreath, updateWreathCaption, getWreathCaption } from '../../components/advent/AdventWreath.js';

/** Contenedor de la corona dentro de la interfaz. */
let wreathElement = null;
/** Elemento donde se escribe el mensaje del domingo. */
let messageElement = null;
/** Si la animación de hoy ya se está reproduciendo. */
let playing = false;

/**
 * Registra los elementos de la corona.
 * @param {{wreath: HTMLElement, message: HTMLElement}} elements
 */
export function registerAdventElements(elements) {
  wreathElement = elements.wreath;
  messageElement = elements.message;
}

/**
 * Aplica el plan de Adviento del día: enciende velas y, si corresponde,
 * reproduce la animación del domingo.
 *
 * @param {string} dateKey
 * @returns {Promise<void>}
 */
export async function applyAdventForDate(dateKey) {
  if (!wreathElement) return;

  const animationSeen = checkSundayAnimationSeen(dateKey);
  const plan = getAdventPlanForDate(dateKey, animationSeen);

  if (!plan.isAdventPeriod) {
    setLitCandles(wreathElement, 0);
    updateAdventWreath(wreathElement, 0);
    setAdventState({ litCount: 0, sundayIndex: 0, animating: false });
    return;
  }

  // Fuera del domingo: la corona muestra las velas de los domingos anteriores.
  if (!plan.shouldAnimate) {
    setLitCandles(wreathElement, plan.candlesAfter);
    updateAdventWreath(wreathElement, plan.candlesAfter);
    setAdventState({
      litCount: plan.candlesAfter,
      sundayIndex: plan.sunday?.index ?? 0,
      animating: false,
    });

    if (plan.sunday) {
      updateWreathCaption(wreathElement, plan.candlesAfter);
    }
    return;
  }

  // Domingo de Adviento: se reproduce la secuencia.
  playing = true;
  setAdventState({ animating: true });

  await playAdventAnimation({
    candlesLit: plan.candlesBefore,
    newCandle: plan.newCandle,
    candleColor: plan.candleColor,
    wreath: wreathElement,
    messageElement,
    message: plan.message,
    fromLeft: plan.newCandle % 2 === 1,
    onFinish: () => {
      registerSundayAnimationSeen(dateKey);
      updateWreathCaption(wreathElement, plan.candlesAfter);
      setAdventState({
        litCount: plan.candlesAfter,
        sundayIndex: plan.sunday?.index ?? 0,
        animating: false,
      });
      playing = false;
    },
  });
}

/**
 * Vuelve a reproducir la animación de la corona a petición del usuario.
 * @param {string} dateKey
 */
export async function replayAdventAnimation(dateKey) {
  if (!wreathElement || playing) return;

  const plan = getAdventPlanForDate(dateKey, false);
  playing = true;
  setAdventState({ animating: true });

  await playAdventAnimation({
    candlesLit: plan.candlesBefore,
    newCandle: plan.newCandle || 1,
    candleColor: plan.candleColor,
    wreath: wreathElement,
    messageElement,
    message: plan.message,
    fromLeft: (plan.newCandle || 1) % 2 === 1,
    onFinish: () => {
      setAdventState({ litCount: plan.candlesAfter, animating: false });
      playing = false;
    },
  });
}

/**
 * Estado actual de la corona.
 */
export function getCurrentAdventState() {
  return getAdventState();
}

export default applyAdventForDate;
