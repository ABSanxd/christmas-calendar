/**
 * Controlador de la corona de Adviento.
 *
 * Decide qué hacer con la corona según la fecha de hoy y el progreso guardado:
 *   - Si hoy es domingo de Adviento y el visitante no ha visto la ceremonia,
 *     la corona salta al centro de la pantalla y el usuario enciende la vela
 *     pendiente con el puntero en forma de fósforo.
 *   - Si el visitante ya la hizo, la corona se queda en su esquina con las
 *     velas ya encendidas.
 *   - Si el visitante entra después de varios domingos, se muestran encendidas
 *     las velas de los domingos anteriores sin repetir la ceremonia.
 */

import { setLitCandles } from '../animations/candleAnimations.js';
import { getAdventPlanForDate } from './adventDates.js';
import { setAdventState, getAdventState } from './adventState.js';
import { runLightingCeremony } from './adventCeremony.js';
import {
  checkSundayAnimationSeen,
  registerSundayAnimationSeen,
} from '../progress/progressController.js';
import { updateAdventWreath } from '../../components/advent/AdventWreath.js';

/** Contenedor de la corona dentro de la interfaz. */
let wreathElement = null;
/** Si la ceremonia de hoy ya se está reproduciendo. */
let playing = false;

/**
 * Registra los elementos de la corona.
 * @param {{wreath: HTMLElement}} elements
 */
export function registerAdventElements(elements) {
  wreathElement = elements.wreath;
}

/**
 * Aplica el plan de Adviento del día: enciende velas y, si corresponde,
 * celebra la ceremonia del domingo.
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
    return;
  }

  // Domingo de Adviento: la corona salta al centro y espera al usuario.
  playing = true;
  setAdventState({ animating: true });

  // Antes de salir, la esquina se queda con las velas de los domingos
  // anteriores: así el estado de la corona es correcto desde el primer
  // fotograma, aunque el visitante mire el fondo oscurecido.
  updateAdventWreath(wreathElement, plan.candlesBefore);
  setLitCandles(wreathElement, plan.candlesBefore);

  const originRect = wreathElement.getBoundingClientRect();

  try {
    await runLightingCeremony({ plan, originRect });
    registerSundayAnimationSeen(dateKey);
  } catch (error) {
    console.warn('[calendario] La ceremonia de Adviento no pudo completarse:', error);
  }

  // La esquina queda con la vela ya encendida.
  updateAdventWreath(wreathElement, plan.candlesAfter);
  setLitCandles(wreathElement, plan.candlesAfter);
  setAdventState({
    litCount: plan.candlesAfter,
    sundayIndex: plan.sunday?.index ?? 0,
    animating: false,
  });
  playing = false;
}

/**
 * Estado actual de la corona.
 */
export function getCurrentAdventState() {
  return getAdventState();
}

export default applyAdventForDate;
