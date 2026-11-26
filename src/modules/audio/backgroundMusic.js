/**
 * Música de fondo del calendario.
 *
 * Dos villancicos suenan en bucle y muy bajito mientras se recorre el
 * calendario, para que la página no esté en silencio. Se apagan solos cuando
 * se abre uno de los días musicales (el 7 y el 19), en los que el visitante
 * va a escuchar la canción con detalle, y vuelven a sonar al cerrarlos.
 *
 * El reproductor es un iframe de YouTube escondido: no se ve, pero se oye.
 * El reproductor nace con `autoplay` activado, de modo que la música empieza
 * en cuanto la página carga en los navegadores que lo permiten. Donde el
 * navegador exige una interacción previa, el primer toque o la primera tecla
 * la pone en marcha sin que el visitante tenga que buscar ningún botón.
 */

import { isAudioEnabled } from './audioService.js';

const API_SRC = 'https://www.youtube.com/iframe_api';

/** Villancicos del fondo, en orden. */
const TRACKS = ['zLzSDg9v6lk', 'xvDQp_51NxM'];

/** Volumen del fondo: bajito, para que no tape los sonidos de la interfaz. */
const VOLUME = 12;

let apiPromise = null;
let player = null;
let container = null;
/** El reproductor ya está listo para recibir órdenes. */
let ready = false;
/** Hay un día musical abierto: el fondo espera. */
let waiting = false;
/** El visitante ha apagado el sonido desde la cabecera. */
let soundOn = true;

/**
 * Carga el API de YouTube una sola vez.
 * @returns {Promise<object>}
 */
function loadYouTubeApi() {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous();
      resolve(window.YT);
    };

    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.addEventListener('error', () => reject(new Error('No se pudo cargar YouTube')));
    document.head.appendChild(script);
  });

  return apiPromise;
}

/**
 * Dirección del reproductor con la reproducción automática activada.
 * @returns {string}
 */
function buildEmbedUrl() {
  const params = new URLSearchParams({
    autoplay: '1',
    enablejsapi: '1',
    loop: '1',
    playlist: TRACKS.join(','),
    controls: '0',
    disablekb: '1',
    fs: '0',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
  });

  return `https://www.youtube.com/embed/${TRACKS[0]}?${params.toString()}`;
}

/**
 * Crea el contenedor invisible del reproductor.
 *
 * El iframe se crea a mano (y no con el API) para poder darle directamente
 * los atributos `allow="autoplay"` y `enablejsapi`, que son los que
 * permiten que el fondo suene sin que el visitante tenga que hacer nada más.
 *
 * @returns {HTMLElement}
 */
function createContainer() {
  if (container) return container;

  container = document.createElement('div');
  container.className = 'background-music';
  container.setAttribute('aria-hidden', 'true');
  container.innerHTML = `
    <iframe
      class="background-music__frame"
      title="Música de fondo del calendario"
      src="${buildEmbedUrl()}"
      allow="autoplay; encrypted-media; picture-in-picture"
      tabindex="-1"
      allowfullscreen></iframe>`;

  document.body.appendChild(container);
  return container;
}

/**
 * Prepara el reproductor y lo deja listo para sonar.
 * @param {() => void} [onReady]
 */
function preparePlayer(onReady) {
  if (player) {
    onReady?.();
    return;
  }

  createContainer();

  loadYouTubeApi()
    .then((YT) => {
      player = new YT.Player(container.querySelector('iframe'), {
        videoId: TRACKS[0],
        playerVars: {
          autoplay: 1,
          playlist: TRACKS.join(','),
          list: TRACKS.join(','),
          loop: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(VOLUME);
            ready = true;
            if (import.meta.env.DEV) window.__backgroundMusic = event.target;
            onReady?.();
            applyState();
          },
        },
      });
    })
    .catch(() => {
      // Sin conexión el calendario sigue en silencio: no es un error.
      player = null;
    });
}

/**
 * Traduce el estado actual a una orden para el reproductor.
 *
 * Suena cuando no hay ningún día musical abierto y el visitante no ha apagado
 * el sonido; en cualquier otro caso, calla.
 */
function applyState() {
  if (!player || !ready) return;

  if (waiting || !soundOn) {
    player.pauseVideo();
    return;
  }

  player.setVolume(VOLUME);
  player.playVideo();
}

/**
 * Arranca la música de fondo.
 */
export function startBackgroundMusic() {
  preparePlayer(() => applyState());
}

/**
 * Silencia el fondo sin olvidarlo: se vuelve a sonar con `resumeBackgroundMusic`.
 */
export function pauseBackgroundMusic() {
  waiting = true;
  applyState();
}

/**
 * Vuelve a poner el fondo tras cerrar el día musical.
 */
export function resumeBackgroundMusic() {
  waiting = false;
  applyState();
}

/**
 * Sincroniza el fondo con el estado del sonido de la interfaz.
 */
export function syncBackgroundMusic() {
  soundOn = isAudioEnabled();
  applyState();
}

/**
 * Prepara el fondo y lo arranca con la primera interacción.
 *
 * La música ya nace sonando por sí sola (`autoplay`); este paso solo está
 * para los navegadores que no lo permiten hasta que el visitante toca algo.
 */
export function initBackgroundMusic() {
  soundOn = isAudioEnabled();
  preparePlayer();

  const start = () => startBackgroundMusic();
  document.addEventListener('pointerdown', start, { once: true });
  document.addEventListener('keydown', start, { once: true });
}

export default initBackgroundMusic;
