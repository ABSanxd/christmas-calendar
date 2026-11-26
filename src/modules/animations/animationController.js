/**
 * Controlador de animaciones.
 *
 * Expone un único sistema reutilizable para las animaciones del calendario y
 * para la escena de Nochebuena. La ceremonia de la corona de Adviento tiene su
 * propio módulo (`adventCeremonyAnimations.js`), porque necesita coordinarse
 * con la interacción del usuario.
 */

import gsap from 'gsap';
import { prefersReducedMotion } from '../../services/deviceService.js';

/**
 * Indica si el usuario ha pedido menos movimiento.
 * @returns {boolean}
 */
export function shouldReduceMotion() {
  return prefersReducedMotion();
}

/**
 * Anima la aparición de una casilla recién descubierta.
 *
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

export default animateDiscovery;
