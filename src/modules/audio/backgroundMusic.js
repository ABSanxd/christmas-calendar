/**
 * Música de fondo del calendario.
 *
 * Dos villancicos suenan en bucle y muy bajito mientras se recorre el
 * calendario, para que la página no esté en silencio. Se apagan solos cuando
 * se abre uno de los días musicales (el 7 y el 19), en los que el visitante
 * va a escuchar la canción con detalle, y vuelven a sonar al cerrarlos.
 *
 * El reproductor es un iframe de YouTube escondido: no se ve, pero se oye.
 * El navegador no deja reproducir sonido sin una interacción previa, así que
 * la música arranca con el primer toque o la primera tecla del visitante.
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
/** El visitante ya ha interactuado con la página: ya se puede reproducir. */
let interacted = false;
/** Hay un día musical abierto: el fondo espera. */
let waiting = false;

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
      src="https://www.youtube.com/embed/${TRACKS[0]}?enablejsapi=1&loop=1&playlist=${TRACKS.join(',')}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1"
      allow="autoplay; encrypted-media; picture-in-picture"
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
          playlist: TRACKS.join(','),
          list: TRACKS.join(','),
          loop: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(VOLUME);
            if (import.meta.env.DEV) window.__backgroundMusic = event.target;
            onReady?.();
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
 * Arranca la música de fondo (tras la primera interacción del visitante).
 */
export function startBackgroundMusic() {
  interacted = true;
  preparePlayer(() => {
    if (!player || waiting || !isAudioEnabled()) return;
    player.setVolume(VOLUME);
    player.playVideo();
  });
}

/**
 * Silencia el fondo sin olvidarlo: se vuelve a sonar con `resumeBackgroundMusic`.
 */
export function pauseBackgroundMusic() {
  waiting = true;
  try {
    player?.pauseVideo();
  } catch {
    /* Todavía no hay reproductor: no hay nada que pausar. */
  }
}

/**
 * Vuelve a poner el fondo tras cerrar el día musical.
 */
export function resumeBackgroundMusic() {
  waiting = false;
  if (!player || !interacted || !isAudioEnabled()) return;
  player.setVolume(VOLUME);
  player.playVideo();
}

/**
 * Sincroniza el fondo con el estado del sonido de la interfaz.
 */
export function syncBackgroundMusic() {
  if (!player) return;
  if (waiting || !isAudioEnabled()) {
    player.pauseVideo();
    return;
  }
  if (interacted) player.playVideo();
}

/**
 * Prepara el fondo y lo arranca con la primera interacción.
 */
export function initBackgroundMusic() {
  preparePlayer();
  const start = () => startBackgroundMusic();
  document.addEventListener('pointerdown', start, { once: true });
  document.addEventListener('keydown', start, { once: true });
}

export default initBackgroundMusic;
