/**
 * Archivo principal: carga los estilos, arranca la aplicación y registra el
 * service worker para el funcionamiento sin conexión.
 */

import './styles/main.css';
import { bootstrap } from './app.js';

/** Registra el service worker (solo en producción). */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!import.meta.env.PROD) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((error) => {
        console.warn('[calendario] No se pudo registrar el service worker:', error);
      });
  });
}

bootstrap();
registerServiceWorker();
