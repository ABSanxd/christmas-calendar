/**
 * Animación del angelito que enciende la vela de los domingos.
 */

import gsap from 'gsap';
import { createAdventAngel } from '../../components/advent/AdventAngel.js';

/**
 * @typedef {object} AngelFlightOptions
 * @property {HTMLElement} target Elemento (vela) al que debe dirigirse.
 * @property {boolean} [fromLeft] Dirección de entrada.
 * @property {import('gsap').Timeline} [timeline]
 * @property {() => void} [onArrive] Callback al llegar a la vela.
 */

/**
 * Calcula la posición de la llama dentro de la vela objetivo.
 * @param {HTMLElement} target
 * @returns {{x: number, y: number}}
 */
function getFlamePosition(target) {
  const rect = target.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height * 0.18,
  };
}

/**
 * Hace volar al angelito desde un borde de la pantalla hasta la vela.
 *
 * @param {AngelFlightOptions} options
 * @returns {Promise<void>}
 */
export function flyAngelTo(options) {
  const { target, fromLeft = true, timeline, onArrive } = options;

  return new Promise((resolve) => {
    if (!target) {
      resolve();
      return;
    }

    const angel = createAdventAngel();
    document.body.appendChild(angel);

    const destination = getFlamePosition(target);
    const startX = fromLeft ? -140 : window.innerWidth + 140;
    const startY = Math.max(90, window.innerHeight * 0.28);

    gsap.set(angel, {
      x: startX,
      y: startY,
      scale: 0.72,
      opacity: 0,
      rotate: fromLeft ? 12 : -12,
    });

    const flight = gsap.timeline({
      onComplete: () => {
        angel.remove();
        resolve();
      },
    });

    flight
      .to(angel, { opacity: 1, duration: 0.45, ease: 'power2.out' })
      .to(
        angel,
        {
          x: destination.x,
          y: destination.y - 24,
          scale: 1,
          rotate: fromLeft ? -6 : 6,
          duration: 1.85,
          ease: 'power1.inOut',
        },
        '>',
      )
      .to(
        angel,
        {
          y: destination.y - 46,
          duration: 0.28,
          ease: 'sine.out',
          onStart: () => onArrive?.(),
        },
        '>-0.1',
      )
      .to(
        angel,
        {
          x: fromLeft ? window.innerWidth + 160 : -160,
          y: destination.y - 90,
          opacity: 0,
          scale: 0.78,
          rotate: fromLeft ? -16 : 16,
          duration: 1.5,
          ease: 'power1.in',
        },
        '+=0.25',
      );

    if (timeline) {
      // Cuando se inserta en una línea de tiempo mayor, esta vuelo se integra
      // y la promesa se resuelve al terminar.
      timeline.add(flight, '<');
      flight.eventCallback('onComplete', () => {
        angel.remove();
        resolve();
      });
    }
  });
}

/**
 * Pequeño destello en la mano del ángel antes de encender la vela.
 * @param {HTMLElement} angel
 * @param {import('gsap').Timeline} [timeline]
 */
export function angelIgnites(angel, timeline) {
  const spark = angel?.querySelector('circle[fill="#ffeec2"]');
  if (!spark) return;
  const tween = gsap.to(spark, {
    scale: 2.4,
    transformOrigin: '50% 50%',
    duration: 0.4,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1,
  });
  if (timeline) timeline.add(tween, '<');
}

export default flyAngelTo;
