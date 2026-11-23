/**
 * Estado de la corona de Adviento en tiempo de ejecución.
 *
 * Se mantiene separado del progreso persistido porque cambia con cada
 * visita: la corona puede encenderse y apagarse según el día en el que entra
 * el visitante, aunque el progreso guardado nunca se modifique por ello.
 */

const state = {
  /** Cuántas velas están encendidas ahora mismo. */
  litCount: 0,
  /** Índice del último domingo de Advento aplicado (0 si ninguno). */
  sundayIndex: 0,
  /** Si hay una animación en curso. */
  animating: false,
};

const listeners = new Set();

/**
 * Suscribe una función a los cambios de la corona.
 * @param {(state: {litCount: number, sundayIndex: number, animating: boolean}) => void} listener
 * @returns {() => void}
 */
export function subscribeToAdventState(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Actualiza el estado y notifica a los suscriptores.
 * @param {Partial<typeof state>} patch
 */
export function setAdventState(patch) {
  Object.assign(state, patch);
  for (const listener of listeners) {
    try {
      listener({ ...state });
    } catch (error) {
      console.warn('[calendario] Error en un suscriptor de la corona:', error);
    }
  }
}

/**
 * Estado actual de la corona.
 * @returns {{litCount: number, sundayIndex: number, animating: boolean}}
 */
export function getAdventState() {
  return { ...state };
}

export default getAdventState;
