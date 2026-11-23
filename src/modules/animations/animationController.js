/**
 * Controlador de animaciones.
 *
 * Expone un único sistema reutilizable para los cuatro domingos de Adviento
 * (`playAdventAnimation`) y para la escena de Nochebuena. Así no se crean
 * cuatro animaciones independientes, sino una que se parametriza.
 */

import gsap from 'gsap';
import { lightCandle, setLitCandles, sparkleAroundCandle } from './candleAnimations.js';
import { flyAngelTo } from './angelAnimations.js';
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
 * Espera un tiempo con GSAP (para mantener el ritmo de la línea de tiempo).
 * @param {number} seconds
 * @returns {Promise<void>}
 */
function wait(seconds) {
  return new Promise((resolve) => {
    gsap.delayedCall(seconds, resolve);
  });
}

/**
 * Indica si el usuario ha pedido menos movimiento.
 * @returns {boolean}
 */
export function shouldReduceMotion() {
  return prefersReducedMotion();
}

/**
 * Sistema de animación de los domingos de Adviento.
 *
 * @param {object} options
 * @param {number} options.candlesLit   Velas que ya deben estar encendidas.
 * @param {number} options.newCandle    Índice de la vela que se enciende (1..4).
 * @param {'purple'|'pink'} options.candleColor Color de la vela nueva.
 * @param {HTMLElement} options.wreath  Contenedor de la corona.
 * @param {HTMLElement} [options.messageElement] Elemento donde se muestra el mensaje.
 * @param {string} [options.message]
 * @param {boolean} [options.fromLeft]  Entrada del ángel por la izquierda.
 * @param {() => void} [options.onFinish]
 * @returns {Promise<void>}
 */
export async function playAdventAnimation(options) {
  const {
    candlesLit = 0,
    newCandle = 1,
    candleColor = 'purple',
    wreath,
    messageElement,
    message = '',
    fromLeft = true,
    onFinish,
  } = options;

  if (!wreath) {
    onFinish?.();
    return;
  }

  const figure = wreath.querySelector('.advent-wreath__figure');
  const candleElement = wreath.querySelector(`[data-candle="${newCandle}"]`);

  // --- Camino sin movimiento: se aplica el estado final directamente. ---
  if (shouldReduceMotion()) {
    setLitCandles(wreath, Math.max(candlesLit, newCandle));
    if (messageElement && message) {
      messageElement.textContent = message;
      gsap.set(messageElement, { opacity: 1, y: 0 });
    }
    onFinish?.();
    return;
  }

  // --- 1. La corona aparece en primer plano. ---
  gsap.set(wreath, { opacity: 0, y: 26 });
  await toPromise(
    gsap.to(wreath, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
    }),
  );

  // --- 2. Un pequeño giro y se detiene. ---
  if (figure) {
    await toPromise(
      gsap.fromTo(
        figure,
        { rotate: -5, scale: 0.96 },
        { rotate: 2, scale: 1, duration: 1.05, ease: 'power2.inOut' },
      ),
    );
    gsap.to(figure, { rotate: 0, duration: 0.5, ease: 'power2.out' });
  }

  // --- 3 y 4. Las velas anteriores permanecen encendidas. ---
  setLitCandles(wreath, candlesLit);

  // --- 5. El ángel entra y se dirige a la vela nueva. ---
  if (candleElement) {
    await flyAngelTo({
      target: candleElement,
      fromLeft,
      onArrive: () => {
        // --- 6. La llama aparece progresivamente. ---
        lightCandle(newCandle, { wreath });
        // --- 7. Destellos alrededor de la vela. ---
        sparkleAroundCandle(wreath, newCandle);
      },
    });
  }

  // --- 8. Salida suave y mensaje de bienvenida. ---
  await wait(0.35);

  if (messageElement && message) {
    gsap.fromTo(
      messageElement,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    );
    messageElement.textContent = message;
  }

  onFinish?.();
}

/**
 * Anima la aparición de una casilla recién descubierta.
 * @param {HTMLElement} marker
 */
export function animateDiscovery(marker) {
  if (!marker || shouldReduceMotion()) return;
  gsap.fromTo(
    marker,
    { scale: 0.86 },
    { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.55)' },
  );
}

export default playAdventAnimation;
