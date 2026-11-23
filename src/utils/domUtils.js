/**
 * Utilidades mínimas de DOM.
 */

/**
 * Crea un elemento con atributos y contenido.
 * @param {string} tag
 * @param {object} [attributes]
 * @param {string | Node | Array<Node>} [children]
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, children = '') {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') element.className = value;
    else if (key === 'dataset') Object.assign(element.dataset, value);
    else if (key === 'html') element.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) element.setAttribute(key, '');
    else element.setAttribute(key, String(value));
  }

  appendChildren(element, children);
  return element;
}

/**
 * Añade hijos a un elemento, aceptando nodos y arrays.
 * @param {HTMLElement} parent
 * @param {string | Node | Array<Node>} children
 */
export function appendChildren(parent, children) {
  if (children === null || children === undefined) return;
  if (Array.isArray(children)) {
    children.forEach((child) => appendChildren(parent, child));
    return;
  }
  if (typeof children === 'string') {
    parent.appendChild(document.createTextNode(children));
    return;
  }
  parent.appendChild(children);
}

/**
 * Elimina todos los hijos de un elemento.
 * @param {HTMLElement} element
 */
export function clearElement(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

/**
 * Marca un elemento como oculto para lectores de pantalla.
 * @param {HTMLElement} element
 * @param {boolean} hidden
 */
export function setHidden(element, hidden) {
  if (!element) return;
  element.hidden = hidden;
  element.setAttribute('aria-hidden', String(hidden));
}

/**
 * Devuelve todos los elementos focusables dentro de un contenedor.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  return Array.from(container.querySelectorAll(selector)).filter(
    (element) => element.offsetParent !== null || element.getClientRects().length > 0,
  );
}

/**
 * Añade o quita una clase.
 * @param {HTMLElement} element
 * @param {string} className
 * @param {boolean} enabled
 */
export function toggleClass(element, className, enabled) {
  if (!element) return;
  element.classList.toggle(className, enabled);
}
