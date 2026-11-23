/**
 * Información del dispositivo y del navegador.
 *
 * Sirve para decidir qué capacidades están disponibles (notificaciones,
 * vibración, soporte de `prefers-reduced-motion`) sin repetir comprobaciones
 * en varios módulos.
 */

/**
 * Indica si el usuario pidió menos movimiento a nivel de sistema.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detecta el tipo de dispositivo para ajustar la interfaz.
 * @returns {'mobile' | 'tablet' | 'desktop'}
 */
export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Indica si el dispositivo tiene pantalla táctil.
 * @returns {boolean}
 */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Devuelve el nombre de la aplicación instalado en modo PWA, si existe.
 * @returns {boolean}
 */
export function isInstalledAsApp() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

/**
 * Vibración corta, si el dispositivo la soporta.
 * @param {number} [pattern]
 */
export function vibrate(pattern = 18) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* La vibración es un extra: nunca debe romper la experiencia. */
    }
  }
}
