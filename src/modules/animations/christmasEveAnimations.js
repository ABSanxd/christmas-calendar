/**
 * Secuencia animada de la noche de Nochebuena.
 */

import gsap from 'gsap';

/**
 * Reproduce la secuencia completa de Nochebuena.
 *
 * @param {HTMLElement} overlay Elemento devuelto por `createChristmasEveScene`.
 * @param {object} [options]
 * @param {boolean} [options.instant] Si es `true`, muestra el estado final sin animar.
 * @returns {import('gsap').Timeline}
 */
export function playChristmasEveScene(overlay, options = {}) {
  const { instant = false } = options;
  if (!overlay) return gsap.timeline();

  const backdrop = overlay.querySelector('.christmas-eve__backdrop');
  const panel = overlay.querySelector('.christmas-eve__panel');
  const photo = overlay.querySelector('.christmas-eve__photo-frame');
  const content = overlay.querySelector('.christmas-eve__content');
  const actions = overlay.querySelector('.christmas-eve__actions');

  if (instant) {
    gsap.set([backdrop, panel, content, actions], { opacity: 1 });
    if (photo) gsap.set(photo, { opacity: 1, scale: 1 });
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  timeline
    .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' })
    .fromTo(
      panel,
      { opacity: 0, scale: 0.94, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '<',
    )
    // La imagen del nacimiento aparece con un leve acercamiento.
    .fromTo(
      photo,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.4',
    )
    // El texto llega después, pero los botones están disponibles desde el principio.
    .fromTo(
      content,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
      '-=0.45',
    )
    .fromTo(actions, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '<0.1');

  return timeline;
}

export default playChristmasEveScene;
