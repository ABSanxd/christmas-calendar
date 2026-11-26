/**
 * Animaciones de las velas de la corona.
 */

import gsap from 'gsap';
import { CONFIG } from '../../data/configuration.js';

/**
 * Enciende una vela: la llama crece desde cero y queda latiendo suavemente.
 *
 * @param {number} candleIndex Índice 1..4 de la vela.
 * @param {object} [options]
 * @param {HTMLElement} [options.wreath] Contenedor de la corona.
 * @param {boolean} [options.instant] Si es `true`, la vela aparece ya encendida.
 * @param {import('gsap').Timeline} [options.timeline] Timeline donde insertarse.
 * @returns {import('gsap').Timeline | null}
 */
export function lightCandle(candleIndex, options = {}) {
  const { wreath, instant = false, timeline } = options;
  const flame = wreath?.querySelector(`#candle-flame-${candleIndex}`);
  const candle = wreath?.querySelector(`[data-candle="${candleIndex}"]`);
  if (!flame || !candle) return null;

  candle.dataset.lit = 'true';

  // El latido anterior se cancela: así la llama no se acumula de una vela a
  // otra cuando la corona se redibuja.
  if (flame.__heartbeat) {
    flame.__heartbeat.kill();
    flame.__heartbeat = null;
  }

  let tween = null;

  if (instant) {
    gsap.set(flame, { opacity: 1, scale: 1 });
    gsap.set(candle, { '--candle-glow': 1 });
  } else {
    tween = timeline
      ? timeline.add(
          gsap.fromTo(
            flame,
            { opacity: 0, scale: 0.2, transformOrigin: '50% 90%' },
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: 'back.out(2.2)',
              onUpdate: () => {
                candle.style.setProperty('--candle-glow', '0.55');
              },
              onComplete: () => {
                candle.style.setProperty('--candle-glow', '1');
              },
            },
          ),
          '<',
        )
      : gsap.fromTo(
          flame,
          { opacity: 0, scale: 0.2, transformOrigin: '50% 90%' },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(2.2)',
            onUpdate: () => {
              candle.style.setProperty('--candle-glow', '0.55');
            },
            onComplete: () => {
              candle.style.setProperty('--candle-glow', '1');
            },
          },
        );
  }

  // Latido suave y perpetuo de la llama.
  flame.__heartbeat = gsap.to(flame, {
    scaleY: 1.08,
    scaleX: 0.94,
    duration: 1.15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: '50% 90%',
    delay: instant ? 0 : 0.6,
  });

  return tween;
}

/**
 * Apaga todas las velas de la corona.
 * @param {HTMLElement} wreath
 */
export function extinguishCandles(wreath) {
  if (!wreath) return;
  for (let index = 1; index <= 4; index += 1) {
    const flame = wreath.querySelector(`#candle-flame-${index}`);
    const candle = wreath.querySelector(`[data-candle="${index}"]`);
    if (flame) {
      if (flame.__heartbeat) {
        flame.__heartbeat.kill();
        flame.__heartbeat = null;
      }
      gsap.set(flame, { opacity: 0, scale: 0.2 });
    }
    if (candle) {
      candle.dataset.lit = 'false';
      candle.style.setProperty('--candle-glow', '0');
    }
  }
}

/**
 * Enciende varias velas a la vez (para recuperar el estado ya alcanzado).
 * @param {HTMLElement} wreath
 * @param {number} litCount
 */
export function setLitCandles(wreath, litCount) {
  extinguishCandles(wreath);
  for (let index = 1; index <= litCount; index += 1) {
    lightCandle(index, { wreath, instant: true });
  }
}

/**
 * Destellos alrededor de la vela recién encendida.
 * @param {HTMLElement} wreath
 * @param {number} candleIndex
 * @param {import('gsap').Timeline} [timeline]
 */
export function sparkleAroundCandle(wreath, candleIndex, timeline) {
  if (!wreath) return;
  const candle = wreath.querySelector(`[data-candle="${candleIndex}"]`);
  if (!candle) return;

  const rect = candle.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height * 0.15;

  const colors = [CONFIG.candleColors.goldLight, CONFIG.candleColors.pinkLight, '#ffffff'];

  for (let index = 0; index < 14; index += 1) {
    const spark = document.createElement('span');
    spark.className = 'sparkle';
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty('--spark-color', colors[index % colors.length]);
    document.body.appendChild(spark);

    const angle = (index / 14) * Math.PI * 2;
    const distance = 42 + (index % 4) * 20;

    const tween = gsap.to(spark, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0.2,
      duration: 0.95,
      ease: 'power2.out',
      onComplete: () => spark.remove(),
    });

    if (timeline) timeline.add(tween, '<');
  }
}

export default lightCandle;
