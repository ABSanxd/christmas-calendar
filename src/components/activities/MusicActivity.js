/**
 * Actividad musical.
 *
 * Dos modos:
 *   - `sing`: muestra la letra de un villancico tradicional, lo reproduce con
 *     una melodía sintetizada y propone un pequeño juego de ritmo.
 *   - `compose`: invita a escribir un villancico propio con un acróstico.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, setFeedback } from './activityParts.js';
import { createYouTubePlayer } from './YouTubePlayer.js';
import { playMelody, playChime } from '../../modules/audio/audioService.js';

/**
 * Melodía de "Noche de paz" (canon tradicional, dominio público).
 * Cada nota es un grado con su duración relativa.
 */
const SILENT_NIGHT_MELODY = {
  tempo: 96,
  notes: [
    ['E4', 1], ['E4', 1], ['G4', 2], ['G4', 2], ['E4', 2], ['C4', 2], ['D4', 2], ['C4', 1],
    ['E4', 1], ['E4', 1], ['G4', 2], ['G4', 2], ['E4', 2], ['D4', 2], ['C4', 1], ['D4', 1],
    ['E4', 2], ['C4', 2], ['G3', 2], ['C4', 1], ['D4', 1], ['E4', 2], ['C4', 2], ['G3', 2],
  ],
};

/**
 * Crea la actividad musical.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createMusicActivity(options) {
  const { content, verseKey, saved = {} } = options;
  const element = createElement('div', {
    class: `activity activity--music activity--music-${content.mode ?? 'sing'}`,
  });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  if (content.mode === 'compose') {
    element.appendChild(renderComposeMode(content, saved));
  } else if (content.mode === 'video') {
    element.appendChild(renderVideoMode(content));
  } else {
    element.appendChild(renderSingMode(content, saved));
  }

  if (content.closing) {
    const closing = createElement('p', { class: 'activity__closing' });
    closing.textContent = content.closing;
    element.appendChild(closing);
  }

  return {
    element,
    validate: () => {
      if (content.mode === 'compose') {
        const inputs = element.querySelectorAll('.acrostic__input');
        return Array.from(inputs).every((input) => input.value.trim().length > 0);
      }
      return true;
    },
    getData: () => {
      if (content.mode === 'compose') {
        const inputs = element.querySelectorAll('.acrostic__input');
        return {
          acrostic: Array.from(inputs).map((input) => input.value.trim()),
        };
      }
      return { heard: saved.heard ?? false };
    },
  };
}

/**
 * Modo "video": solo el reproductor del villancico.
 *
 * Es el modo del día 7: la canción se ve y se escucha tal como la canta la
 * comunidad, sin letra ni juego de ritmo.
 *
 * @param {object} content
 * @returns {HTMLElement}
 */
function renderVideoMode(content) {
  const fragment = document.createDocumentFragment();

  if (content.title) {
    const title = createElement('h3', { class: 'music__title' });
    title.textContent = content.title;
    fragment.appendChild(title);
  }

  if (content.subtitle) {
    const subtitle = createElement('p', { class: 'music__subtitle' });
    subtitle.textContent = content.subtitle;
    fragment.appendChild(subtitle);
  }

  const { element: player } = createYouTubePlayer({
    videoId: content.videoId,
    title: content.videoTitle ?? content.title ?? 'Villancico en YouTube',
    author: content.videoAuthor ?? '',
  });
  fragment.appendChild(player);

  return fragment;
}

/**
 * Modo "cantar": letra, botón de escucha y juego de ritmo.
 * @param {object} content
 * @param {object} saved
 * @returns {HTMLElement}
 */
function renderSingMode(content, saved) {
  const fragment = document.createDocumentFragment();

  const title = createElement('h3', { class: 'music__title' });
  title.textContent = content.title ?? 'Villancico';
  fragment.appendChild(title);

  if (content.subtitle) {
    const subtitle = createElement('p', { class: 'music__subtitle' });
    subtitle.textContent = content.subtitle;
    fragment.appendChild(subtitle);
  }

  // Si el día trae un vídeo, se ofrece la canción real antes que la
  // melodía sintetizada, que queda como alternativa sin conexión.
  if (content.videoId) {
    const { element: player } = createYouTubePlayer({
      videoId: content.videoId,
      title: content.videoTitle ?? content.title ?? 'Villancico en YouTube',
      author: content.videoAuthor ?? '',
    });
    fragment.appendChild(player);
  }

  const stanzas = createElement('div', { class: 'music__stanzas' });
  (content.stanzas ?? []).forEach((stanza) => {
    const block = createElement('p', { class: 'music__stanza' });
    stanza.forEach((line, index) => {
      const lineElement = createElement('span', { class: 'music__line' });
      lineElement.textContent = line;
      lineElement.dataset.index = String(index);
      block.appendChild(lineElement);
      block.appendChild(document.createElement('br'));
    });
    stanzas.appendChild(block);
  });
  fragment.appendChild(stanzas);

  // --- Botón de escucha ---
  const playButton = createElement('button', { type: 'button', class: 'button music__play' });
  const playLabel = content.videoId
    ? '<span aria-hidden="true">♪</span> Escuchar la melodía con la campanita'
    : '<span aria-hidden="true">♪</span> Escuchar la melodía';
  playButton.innerHTML = playLabel;

  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  let heard = Boolean(saved.heard);

  playButton.addEventListener('click', async () => {
    playButton.disabled = true;
    playButton.textContent = 'Suena la campanita…';
    const lines = element.querySelectorAll('.music__line');
    lines.forEach((line) => line.classList.add('is-singing'));

    await playMelody(SILENT_NIGHT_MELODY.notes, {
      tempo: SILENT_NIGHT_MELODY.tempo,
      onNote: (index) => {
        lines.forEach((line) => line.classList.remove('is-singing'));
        if (lines[index]) lines[index].classList.add('is-singing');
      },
    });

    lines.forEach((line) => line.classList.remove('is-singing'));
    playButton.disabled = false;
    playButton.innerHTML = content.videoId
      ? '<span aria-hidden="true">♪</span> Escuchar de nuevo con la campanita'
      : '<span aria-hidden="true">♪</span> Escuchar de nuevo';
    heard = true;
    setFeedback(feedback, '¡Qué bien! Ahora canta tú con la familia.', 'success');
  });

  fragment.appendChild(playButton);
  fragment.appendChild(feedback);

  // --- Juego de ritmo ---
  const game = createElement('section', { class: 'rhythm' });
  game.innerHTML = `
    <h4 class="rhythm__title">Juego de ritmo</h4>
    <p class="rhythm__hint">Toca el botón cuando la nota cruce la línea dorada.</p>`;

  const track = createElement('div', { class: 'rhythm__track' });
  const target = createElement('div', { class: 'rhythm__target' });
  track.appendChild(target);

  const tapButton = createElement('button', { type: 'button', class: 'rhythm__tap' });
  tapButton.textContent = '♪';

  const score = createElement('p', { class: 'rhythm__score' });
  score.textContent = 'Aciertos: 0';

  let hits = 0;
  let misses = 0;
  let notes = [];
  let animationFrame = null;
  let lastSpawn = 0;

  const FALL_DURATION = 2600;
  const TARGET_POSITION = 0.86;

  function spawnNote() {
    const note = createElement('span', { class: 'rhythm__note' });
    note.style.left = `${18 + Math.random() * 64}%`;
    track.appendChild(note);
    notes.push({ element: note, progress: 0 });
  }

  function loop(timestamp) {
    if (!lastSpawn) lastSpawn = timestamp;
    if (timestamp - lastSpawn > 900) {
      lastSpawn = timestamp;
      spawnNote();
    }

    let allPassed = true;
    notes = notes.filter((note) => {
      note.progress += 16 / FALL_DURATION;
      note.element.style.top = `${note.progress * 100}%`;
      if (note.progress >= 1.05) {
        note.element.remove();
        misses += 1;
        score.textContent = `Aciertos: ${hits} · Fallos: ${misses}`;
        return false;
      }
      allPassed = false;
      return true;
    });

    if (notes.length === 0 && allPassed && misses + hits > 0) {
      score.textContent = `Aciertos: ${hits} · Fallos: ${misses}`;
    }

    animationFrame = window.requestAnimationFrame(loop);
  }

  tapButton.addEventListener('click', () => {
    playChime();
    let hit = false;
    notes.forEach((note) => {
      const distance = Math.abs(note.progress - TARGET_POSITION);
      if (distance < 0.1 && !note.hit) {
        note.hit = true;
        note.element.classList.add('is-hit');
        hits += 1;
        hit = true;
      }
    });
    if (!hit) misses += 1;
    score.textContent = `Aciertos: ${hits} · Fallos: ${misses}`;
  });

  game.appendChild(track);
  game.appendChild(tapButton);
  game.appendChild(score);
  fragment.appendChild(game);

  // El juego se activa al primer toque para no gastar recursos en segundo plano.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationFrame) {
          animationFrame = window.requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      });
    },
    { threshold: 0.2 },
  );
  observer.observe(game);

  return fragment;
}

/**
 * Modo "componer": acróstico con las sílabas propuestas.
 * @param {object} content
 * @param {object} saved
 * @returns {HTMLElement}
 */
function renderComposeMode(content, saved) {
  const fragment = document.createDocumentFragment();

  const title = createElement('h3', { class: 'music__title' });
  title.textContent = content.title ?? 'Tu villancico';
  fragment.appendChild(title);

  if (content.subtitle) {
    const subtitle = createElement('p', { class: 'music__subtitle' });
    subtitle.textContent = content.subtitle;
    fragment.appendChild(subtitle);
  }

  const list = createElement('div', { class: 'acrostic' });
  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  (content.acrostic ?? []).forEach((entry, index) => {
    const row = createElement('div', { class: 'acrostic__row' });

    const label = createElement('label', { class: 'acrostic__label' });
    label.textContent = `${entry.syllable}`;

    const input = createElement('input', {
      type: 'text',
      class: 'acrostic__input',
      placeholder: entry.hint ?? '',
      'aria-label': `Frase que empieza por ${entry.syllable}`,
      autocomplete: 'off',
    });
    input.value = saved.acrostic?.[index] ?? '';

    const syllable = entry.syllable.toUpperCase();
    input.addEventListener('input', () => {
      const value = input.value.trim();
      const startsCorrectly = value.toUpperCase().startsWith(syllable);
      input.dataset.state = startsCorrectly ? 'ok' : value ? 'error' : '';
      if (value) {
        setFeedback(
          feedback,
          startsCorrectly
            ? '¡Qué bien empieza tu frase!'
            : `Tu frase debería empezar por "${entry.syllable}".`,
          startsCorrectly ? 'success' : 'error',
        );
      }
    });

    row.appendChild(label);
    row.appendChild(input);
    list.appendChild(row);
  });

  fragment.appendChild(list);
  fragment.appendChild(feedback);

  return fragment;
}

export default createMusicActivity;
