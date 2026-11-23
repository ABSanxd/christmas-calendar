/**
 * Animaciones del calendario: entrada de la escena, apertura de casillas y
 * celebración de actividades completadas.
 */

import gsap from 'gsap';

/**
 * Entrada suave de la escena y de las capas.
 * @param {HTMLElement} scene
 */
export function animateSceneEntrance(scene) {
  if (!scene) return;
  const layers = scene.querySelectorAll('[data-layer]');
  gsap.from(layers, {
    opacity: 0,
    y: 18,
    duration: 0.9,
    ease: 'power2.out',
    stagger: 0.08,
  });
}

/**
 * Apertura de una casilla: el marco se abre como una puerta.
 * @param {HTMLElement} marker
 * @returns {import('gsap').Timeline}
 */
export function animateDayDiscovery(marker) {
  if (!marker) return gsap.timeline();
  const timeline = gsap.timeline();
  timeline
    .to(marker, { scale: 1.18, duration: 0.32, ease: 'back.out(3)' })
    .to(marker, { scale: 0.92, duration: 0.22, ease: 'power2.in' })
    .to(marker, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' });
  return timeline;
}

/**
 * Celebración al completar una actividad: confeti de estrellas.
 * @param {HTMLElement} origin Elemento alrededor del cual caen las estrellas.
 */
export function celebrateCompletion(origin) {
  if (!origin) return;
  const rect = origin.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const colors = ['#f0dca6', '#dda3b8', '#9a76ad', '#ffffff', '#c6a568'];

  for (let index = 0; index < 26; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'sparkle sparkle--celebration';
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty('--spark-color', colors[index % colors.length]);
    document.body.appendChild(particle);

    const angle = (index / 26) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 90 + Math.random() * 170;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 60,
      opacity: 0,
      scale: 0.15,
      rotate: Math.random() * 180,
      duration: 1.25 + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => particle.remove(),
    });
  }
}

/**
 * Destello suave al descubrir una casilla nueva.
 * @param {HTMLElement} marker
 */
export function pulseMarker(marker) {
  if (!marker) return;
  const glow = document.createElement('span');
  glow.className = 'marker-glow';
  marker.appendChild(glow);
  gsap.fromTo(
    glow,
    { opacity: 0.85, scale: 0.6 },
    {
      opacity: 0,
      scale: 2.4,
      duration: 1.1,
      ease: 'power2.out',
      onComplete: () => glow.remove(),
    },
  );
}

export default animateDayDiscovery;
