/**
 * Animaciones de la ceremonia de Adviento.
 *
 * La corona de la esquina salta al centro de la pantalla y vuelve a su sitio
 * cuando el usuario ha encendido la vela. Para que el salto se vea como un
 * único movimiento (y no como un teletransporte) se usa la técnica FLIP: se
 * mide dónde está la corona en la esquina, se mide dónde va a estar en el
 * centro y se anima el desplazamiento y la escala que relacionan ambas
 * posiciones.
 */

import gsap from 'gsap';
import { prefersReducedMotion } from '../../services/deviceService.js';

/**
 * Envuelve un tween de GSAP en una promesa.
 * @param {import('gsap').Tween} tween
 * @returns {Promise<void>}
 */
function toPromise(tween) {
  return new Promise((resolve) => {
    tween.eventCallback('onComplete', resolve);
  });
}

/**
 * Calcula el desplazamiento y la escala que llevan la figura desde su
 * posición final hasta el rectángulo de origen.
 *
 * @param {HTMLElement} figure
 * @param {DOMRect|{left: number, top: number, width: number}} originRect
 * @returns {{x: number, y: number, scale: number}}
 */
function getFlipTransform(figure, originRect) {
  const target = figure.getBoundingClientRect();
  const scale = target.width > 0 ? originRect.width / target.width : 1;
  return {
    x: originRect.left - target.left,
    y: originRect.top - target.top,
    scale,
  };
}

/**
 * Hace que la corona de la ceremonia viaje desde la esquina hasta el centro.
 *
 * @param {HTMLElement} figure
 * @param {DOMRect|{left: number, top: number, width: number}} originRect
 * @returns {Promise<void>}
 */
export async function flyWreathToStage(figure, originRect) {
  if (!figure) return;

  if (prefersReducedMotion()) {
    gsap.set(figure, { x: 0, y: 0, scale: 1, opacity: 1, transformOrigin: '0 0' });
    return;
  }

  const from = getFlipTransform(figure, originRect);
  await toPromise(
    gsap.fromTo(
      figure,
      { ...from, opacity: 0, transformOrigin: '0 0' },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.inOut',
      },
    ),
  );
}

/**
 * Devuelve la corona a su sitio en la esquina.
 *
 * @param {HTMLElement} figure
 * @param {DOMRect|{left: number, top: number, width: number}} originRect
 * @returns {Promise<void>}
 */
export async function flyWreathBack(figure, originRect) {
  if (!figure) return;

  if (prefersReducedMotion()) {
    gsap.set(figure, { opacity: 0 });
    return;
  }

  const to = getFlipTransform(figure, originRect);
  await toPromise(
    gsap.to(figure, {
      ...to,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.inOut',
    }),
  );
}

/**
 * Hace latir la vela que el usuario debe encender.
 *
 * El movimiento es pequeño y continuo: una inclinación desde la base, como si
 * la vela llamara la atención.
 *
 * @param {HTMLElement} candle
 * @returns {import('gsap').Tween | null}
 */
export function pulseCandle(candle) {
  if (!candle) return null;
  if (prefersReducedMotion()) return null;

  return gsap.to(candle, {
    y: -11,
    scale: 1.05,
    transformOrigin: '50% 100%',
    duration: 0.95,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/**
 * Detiene el latido de la vela.
 *
 * @param {HTMLElement} candle
 */
export function stopCandlePulse(candle) {
  if (!candle) return;
  gsap.killTweensOf(candle);
  gsap.set(candle, { y: 0, scale: 1 });
}

/**
 * Fade simple para el fondo oscurecido.
 *
 * @param {HTMLElement} backdrop
 * @returns {Promise<void>}
 */
export async function fadeBackdropIn(backdrop) {
  if (!backdrop) return;
  if (prefersReducedMotion()) {
    gsap.set(backdrop, { opacity: 1 });
    return;
  }
  await toPromise(gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.6 }));
}

export default flyWreathToStage;
