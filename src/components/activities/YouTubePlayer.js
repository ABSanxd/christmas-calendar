/**
 * Reproductor de YouTube.
 *
 * Se usa en el villancico del día 7, para que se escuche la canción tal
 * como la canta la comunidad. Es la única parte del proyecto que carga
 * algo de un tercero: si no hay conexión, el reproductor lo avisa y el
 * visitante puede seguir con la melodía sintetizada, que funciona sin
 * internet.
 */

import { createElement } from '../../utils/domUtils.js';
import { setFeedback } from './activityParts.js';

/** Dirección del API de reproductores de YouTube. */
const API_SRC = 'https://www.youtube.com/iframe_api';

/** Promesa única de carga del API: se comparte entre reproductores. */
let apiPromise = null;

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
 * Crea el reproductor del villancico.
 *
 * @param {object} options
 * @param {string} options.videoId  Identificador del vídeo de YouTube.
 * @param {string} [options.title]  Título accesible del reproductor.
 * @param {string} [options.author] Autoría, para el crédito.
 * @returns {{element: HTMLElement}}
 */
export function createYouTubePlayer(options = {}) {
  const { videoId, title = 'Villancico en YouTube', author = '' } = options;

  const element = createElement('div', { class: 'music__video' });

  // El iframe se crea aquí (y no por el API) para que herede los estilos.
  const iframe = createElement('iframe', {
    class: 'music__video-frame',
    src: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`,
    title,
    allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
    allowfullscreen: true,
    loading: 'lazy',
  });

  const playButton = createElement('button', {
    type: 'button',
    class: 'button music__video-play',
  });
  playButton.innerHTML = '<span aria-hidden="true">▶</span> Ver y escuchar el villancico';

  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  const credit = createElement('p', { class: 'music__video-credit' });
  credit.textContent = author
    ? `Vídeo: ${author} · YouTube. Si no tienes conexión, escucha la melodía con la campanita.`
    : 'Vídeo: YouTube. Si no tienes conexión, escucha la melodía con la campanita.';

  let player = null;

  /**
   * Arranca la reproducción.
   */
  const play = async () => {
    playButton.disabled = true;
    setFeedback(feedback, 'Cargando el villancico…', 'info');

    try {
      const YT = await loadYouTubeApi();
      player = new YT.Player(iframe, {
        videoId,
        playerVars: {
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setFeedback(feedback, '♪ Suena el villancico. Canten juntos.', 'success');
          },
          onError: () => {
            setFeedback(
              feedback,
              'No se pudo reproducir el video. Puedes escuchar la melodía con la campanita.',
              'error',
            );
          },
        },
      });
    } catch (error) {
      // Sin conexión: se deja el reproductor simple con reproducción
      // automática por si el vídeo llegara a cargar desde la caché.
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      setFeedback(
        feedback,
        'Puede que no tengas conexión. Si el video no carga, escucha la melodía con la campanita.',
        'info',
      );
    } finally {
      playButton.disabled = false;
    }
  };

  playButton.addEventListener('click', play);

  element.appendChild(iframe);
  element.appendChild(playButton);
  element.appendChild(feedback);
  element.appendChild(credit);

  return { element };
}

export default createYouTubePlayer;
