/**
 * Sopa de letras: encontrar las palabras escondidas en la cuadrícula.
 */

import { createElement } from '../../utils/domUtils.js';
import { verseBlock, introBlock, setFeedback } from './activityParts.js';

/**
 * Genera una cuadrícula con las palabras colocadas en distintas direcciones.
 *
 * @param {string[]} words
 * @param {number} size
 * @returns {{grid: string[][], placements: {word: string, cells: {row: number, col: number}[]}}}
 */
export function buildWordSearch(words, size = 9) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placements = [];
  const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: 0, col: -1 },
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  words.forEach((rawWord) => {
    const word = rawWord.toUpperCase().replace(/[^A-ZÑ]/g, '');
    if (!word) return;

    let placed = false;
    for (let attempt = 0; attempt < 400 && !placed; attempt += 1) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      const cells = [];

      let valid = true;
      for (let index = 0; index < word.length; index += 1) {
        const row = startRow + direction.row * index;
        const col = startCol + direction.col * index;
        if (row < 0 || row >= size || col < 0 || col >= size) {
          valid = false;
          break;
        }
        if (grid[row][col] && grid[row][col] !== word[index]) {
          valid = false;
          break;
        }
        cells.push({ row, col });
      }

      if (!valid || cells.length !== word.length) continue;

      cells.forEach((cell, index) => {
        grid[cell.row][cell.col] = word[index];
      });
      placements.push({ word, cells });
      placed = true;
    }
  });

  // Rellena los huecos con letras suaves.
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!grid[row][col]) grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }

  return { grid, placements };
}

/**
 * Crea la sopa de letras.
 *
 * @param {object} options
 * @param {object} options.content
 * @param {string} [options.verseKey]
 * @param {object} [options.saved]
 * @returns {{element: HTMLElement, validate: () => boolean, getData: () => object}}
 */
export function createWordSearch(options) {
  const { content, verseKey, saved = {} } = options;
  const words = content.words ?? [];
  const size = Math.max(9, Math.max(...words.map((word) => word.length)) + 1);
  const { grid, placements } = buildWordSearch(words, size);

  const element = createElement('div', { class: 'activity activity--wordsearch' });

  const verse = verseBlock(verseKey);
  if (verse) element.appendChild(verse);

  const intro = introBlock(content.intro);
  if (intro) element.appendChild(intro);

  const instruction = createElement('p', { class: 'activity__instruction' });
  instruction.textContent = content.instruction ?? '';
  element.appendChild(instruction);

  const found = new Set(saved.found ?? []);
  const selection = [];

  // --- Arrastre para pintar las letras ---
  // Se puede marcar la palabra arrastrando sobre la cuadrícula (lo natural
  // en el celular) o tocando letra a letra (lo natural en el ordenador).
  let dragStart = null;
  let pointerCell = null;
  let dragging = false;

  const board = createElement('div', {
    class: 'wordsearch__board',
    style: `--wordsearch-size:${size}`,
    role: 'grid',
    'aria-label': 'Sopa de letras',
  });

  const wordList = createElement('ul', { class: 'wordsearch__words' });
  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

  /**
   * Devuelve la celda que hay bajo un punto de la pantalla.
   *
   * @param {number} x
   * @param {number} y
   * @returns {{row: number, col: number}|null}
   */
  function cellFromPoint(x, y) {
    const element = document.elementFromPoint(x, y);
    const cell = element?.closest?.('.wordsearch__cell');
    if (!cell) return null;
    return { row: Number(cell.dataset.row), col: Number(cell.dataset.col) };
  }

  /**
   * Calcula la línea recta entre dos celdas, en las ocho direcciones.
   *
   * @param {{row: number, col: number}} from
   * @param {{row: number, col: number}} to
   * @returns {{row: number, col: number}[]|null} `null` si no van en línea recta.
   */
  function lineBetween(from, to) {
    const rowDelta = Math.sign(to.row - from.row);
    const colDelta = Math.sign(to.col - from.col);
    const rowDistance = Math.abs(to.row - from.row);
    const colDistance = Math.abs(to.col - from.col);

    // Solo se admiten las direcciones horizontal, vertical y diagonal.
    if (rowDelta !== 0 && colDelta !== 0 && rowDistance !== colDistance) return null;

    const cells = [];
    let row = from.row;
    let col = from.col;

    for (let step = 0; step < 100; step += 1) {
      cells.push({ row, col });
      if (row === to.row && col === to.col) break;
      row += rowDelta;
      col += colDelta;
    }

    return cells;
  }

  /**
   * Añade una celda a la selección (toque letra a letra).
   * @param {{row: number, col: number}} cell
   */
  function addToSelection(cell) {
    const last = selection[selection.length - 1];
    const isAdjacent =
      !last || (Math.abs(last.row - cell.row) <= 1 && Math.abs(last.col - cell.col) <= 1);
    if (!isAdjacent) selection.length = 0;
    selection.push(cell);
    highlightCells(selection);
    checkSelection();
  }

  function renderWordList() {
    wordList.innerHTML = '';
    placements.forEach((placement) => {
      const item = createElement('li', {
        class: `wordsearch__word${found.has(placement.word) ? ' is-found' : ''}`,
      });
      item.textContent = placement.word;
      wordList.appendChild(item);
    });
  }

  function highlightCells(cells) {
    cells.forEach(({ row, col }) => {
      board.querySelector(`[data-row="${row}"][data-col="${col}"]`)?.classList.add('is-selected');
    });
  }

  function clearHighlight() {
    board.querySelectorAll('.is-selected').forEach((cell) => cell.classList.remove('is-selected'));
  }

  function checkSelection() {
    if (selection.length < 2) return;
    const letters = selection.map((cell) => grid[cell.row][cell.col]).join('');
    const reversed = [...letters].reverse().join('');

    const match = placements.find(
      (placement) =>
        !found.has(placement.word) &&
        (placement.word === letters || placement.word === reversed),
    );

    if (match) {
      found.add(match.word);
      highlightCells(match.cells);
      setFeedback(
        feedback,
        `¡"${match.word}" encontrada! Llevas ${found.size} de ${placements.length}.`,
        'success',
      );
      renderWordList();
    } else {
      setFeedback(feedback, 'Esas letras no forman una palabra. Inténtalo de nuevo.', 'error');
    }
    selection.length = 0;
    window.setTimeout(clearHighlight, 320);
  }

  grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      const cell = createElement('button', {
        type: 'button',
        class: 'wordsearch__cell',
        'data-row': String(rowIndex),
        'data-col': String(colIndex),
        role: 'gridcell',
      });
      cell.textContent = letter;
      board.appendChild(cell);
    });
  });

  // --- Ratón y dedo: se empieza a marcar al pulsar y se arrastra ---
  board.addEventListener('pointerdown', (event) => {
    const cell = event.target.closest('.wordsearch__cell');
    if (!cell) return;
    event.preventDefault();
    dragStart = { row: Number(cell.dataset.row), col: Number(cell.dataset.col) };
    pointerCell = dragStart;
    dragging = false;
    board.setPointerCapture?.(event.pointerId);
  });

  board.addEventListener('pointermove', (event) => {
    if (!dragStart) return;
    const cell = cellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    if (cell.row === pointerCell.row && cell.col === pointerCell.col) return;

    pointerCell = cell;
    const line = lineBetween(dragStart, cell);
    if (!line) return;

    dragging = true;
    selection.length = 0;
    selection.push(...line);
    clearHighlight();
    highlightCells(selection);
  });

  const finishSelection = (event) => {
    if (!dragStart) return;
    board.releasePointerCapture?.(event.pointerId);
    const start = dragStart;
    dragStart = null;

    // Arrastrado: ya está marcada la línea, solo se comprueba.
    if (dragging) {
      checkSelection();
      return;
    }

    // Toque simple: se sigue marcando letra a letra.
    addToSelection(start);
  };

  board.addEventListener('pointerup', finishSelection);
  board.addEventListener('pointercancel', finishSelection);

  // Con el teclado se marca también letra a letra.
  board.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const cell = event.target.closest('.wordsearch__cell');
    if (!cell) return;
    event.preventDefault();
    addToSelection({ row: Number(cell.dataset.row), col: Number(cell.dataset.col) });
  });

  element.appendChild(board);
  element.appendChild(wordList);
  element.appendChild(feedback);

  if (content.closing) {
    const closing = createElement('p', { class: 'activity__closing' });
    closing.textContent = content.closing;
    element.appendChild(closing);
  }

  renderWordList();

  return {
    element,
    validate: () => found.size === placements.length && placements.length > 0,
    getData: () => ({ found: Array.from(found) }),
  };
}

export default createWordSearch;
