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
  const stars = overlay.querySelectorAll('.eve-star');
  const angelsGroup = overlay.querySelector('#eve-angels');
  const angels = overlay.querySelectorAll('.eve-angel-fly');
  const banner = overlay.querySelector('.eve-banner');
  const babyGlow = overlay.querySelector('.eve-baby-glow');
  const stable = overlay.querySelector('#eve-stable');
  const content = overlay.querySelector('.christmas-eve__content');
  const actions = overlay.querySelector('.christmas-eve__actions');

  if (instant) {
    gsap.set([backdrop, panel, banner, content, actions], { opacity: 1 });
    gsap.set(stars, { opacity: 0.8 });
    gsap.set(angelsGroup, { opacity: 1 });
    gsap.set(angels, { x: 0, y: 0 });
    gsap.set(stable, { opacity: 1 });
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
    // Las estrellas empiezan a brillar.
    .to(
      stars,
      { opacity: 0.85, duration: 0.9, stagger: 0.012, ease: 'power1.inOut' },
      '-=0.2',
    )
    // Los ángeles entran volando.
    .fromTo(angelsGroup, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.35')
    .fromTo(
      angels,
      { y: -120, x: (index) => (index === 0 ? -140 : index === 2 ? 140 : 0) },
      {
        y: 0,
        x: 0,
        duration: 1.2,
        stagger: 0.16,
        ease: 'power2.out',
      },
      '<',
    )
    // El cartel se despliega.
    .fromTo(
      banner,
      { opacity: 0, scaleX: 0.1, transformOrigin: '50% 50%' },
      { opacity: 1, scaleX: 1, duration: 0.75, ease: 'power3.out' },
      '-=0.55',
    )
    // El pesebre se ilumina.
    .fromTo(
      stable,
      { opacity: 0.2 },
      { opacity: 1, duration: 0.9, ease: 'power2.inOut' },
      '-=0.3',
    )
    .fromTo(
      babyGlow,
      { scale: 0.4, transformOrigin: '50% 50%' },
      { scale: 1, duration: 1.1, ease: 'power2.out' },
      '<0.2',
    )
    // El texto llega al final, pero los botones están disponibles desde el principio.
    .fromTo(
      content,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
      '-=0.45',
    )
    .fromTo(actions, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '<0.1');

  return timeline;
}

/**
 * Reinicia la secuencia desde el principio.
 * @param {HTMLElement} overlay
 */
export function replayChristmasEveScene(overlay) {
  if (!overlay) return;
  const timeline = playChristmasEveScene(overlay);
  return timeline;
}

export default playChristmasEveScene;
