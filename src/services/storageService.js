/**
 * Acceso seguro al almacenamiento local del navegador.
 *
 * Envuelve localStorage para que ningún error de cuota, de modo privado o de
 * navegador sin soporte pueda romper la aplicación. Todas las lecturas
 * devuelven un valor por defecto cuando el dato no existe o está corrupto.
 */

/** Indica si localStorage está realmente disponible. */
let storageAvailable = null;

/**
 * Comprueba la disponibilidad de localStorage una sola vez.
 * @returns {boolean}
 */
export function isStorageAvailable() {
  if (storageAvailable !== null) return storageAvailable;
  try {
    const probe = '__calendario_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    storageAvailable = true;
  } catch (error) {
    console.warn('[calendario] localStorage no disponible:', error);
    storageAvailable = false;
  }
  return storageAvailable;
}

/**
 * Lee y deserializa un valor del almacenamiento.
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readValue(key, fallback = null) {
  if (!isStorageAvailable()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[calendario] No se pudo leer "${key}":`, error);
    return fallback;
  }
}

/**
 * Serializa y guarda un valor.
 * @param {string} key
 * @param {unknown} value
 * @returns {boolean} `true` si la escritura se completó.
 */
export function writeValue(key, value) {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[calendario] No se pudo guardar "${key}":`, error);
    return false;
  }
}

/**
 * Elimina una clave del almacenamiento.
 * @param {string} key
 */
export function removeValue(key) {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[calendario] No se pudo borrar "${key}":`, error);
  }
}

/**
 * Elimina todas las claves que comienzan con un prefijo.
 * @param {string} prefix
 */
export function removeByPrefix(prefix) {
  if (!isStorageAvailable()) return;
  try {
    const keysToRemove = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key && key.startsWith(prefix)) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch (error) {
    console.warn(`[calendario] No se pudieron borrar las claves "${prefix}":`, error);
  }
}
