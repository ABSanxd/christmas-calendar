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

  const board = createElement('div', {
    class: 'wordsearch__board',
    style: `--wordsearch-size:${size}`,
    role: 'grid',
    'aria-label': 'Sopa de letras',
  });

  const wordList = createElement('ul', { class: 'wordsearch__words' });
  const feedback = createElement('p', { class: 'activity__feedback' });
  feedback.hidden = true;

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

      cell.addEventListener('click', () => {
        const last = selection[selection.length - 1];
        const isAdjacent =
          !last ||
          (Math.abs(last.row - rowIndex) <= 1 && Math.abs(last.col - colIndex) <= 1);
        if (!isAdjacent) selection.length = 0;
        selection.push({ row: rowIndex, col: colIndex });
        highlightCells(selection);
        checkSelection();
      });

      board.appendChild(cell);
    });
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
