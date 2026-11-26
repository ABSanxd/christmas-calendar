/**
 * Iconos SVG reutilizables de la interfaz.
 *
 * Se guardan como cadenas y se insertan en el DOM, de modo que cualquier
 * componente puede usar el mismo catálogo sin duplicar trazados.
 */

/** Catálogo de iconos. */
const ICONS = {
  sun: `<circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></g>`,
  music: `<path d="M9 18V6.4l10-2v11.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.6" cy="18" r="2.6" fill="currentColor"/><circle cx="16.6" cy="15.6" r="2.6" fill="currentColor"/>`,
  check: `<path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  spark: `<path d="M12 2.5l2.1 6.3 6.4 2.2-6.4 2.2L12 19.5l-2.1-6.3L3.5 11l6.4-2.2z" fill="currentColor"/>`,
  star: `<path d="M12 2.8l2.8 6.9 7.4.6-5.6 4.8 1.7 7.3L12 18.6l-6.3 3.8 1.7-7.3L1.8 10.3l7.4-.6z" fill="currentColor"/>`,
  candle: `<rect x="9" y="11.5" width="6" height="8.5" rx="1.2" fill="currentColor"/><path d="M12 2.4c2 2.3 2.7 3.9 2.7 5.3a2.7 2.7 0 1 1-5.4 0c0-1.4.7-3 2.7-5.3z" fill="currentColor"/>`,
};

/**
 * Devuelve el marcado de un icono.
 * @param {keyof typeof ICONS} name
 * @returns {string}
 */
export function getIcon(name) {
  return ICONS[name] ?? '';
}

/**
 * Crea un elemento con el icono.
 * @param {keyof typeof ICONS} name
 * @param {object} [options]
 * @param {string} [options.className]
 * @param {string} [options.label] Etiqueta accesible. Si no se indica, el icono es decorativo.
 * @returns {HTMLElement}
 */
export function createIcon(name, options = {}) {
  const { className = 'icon', label } = options;
  const wrapper = document.createElement('span');
  wrapper.className = className;
  wrapper.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ${
    label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'
  }>${getIcon(name)}</svg>`;
  return wrapper;
}

export default getIcon;
