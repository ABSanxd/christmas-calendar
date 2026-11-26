import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(`${BASE}?fecha=2026-12-11`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
await page.locator('.calendar-day[data-day="11"]').click();
await page.waitForTimeout(700);

const grid = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.wordsearch__cell')).map((cell) => ({
    row: Number(cell.dataset.row),
    col: Number(cell.dataset.col),
    letter: cell.textContent,
  })),
);
const size = Math.max(...grid.map((c) => c.row)) + 1;
const words = await page.locator('.wordsearch__word').allTextContents();
const directions = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
let found = null;

for (const word of words) {
  for (let row = 0; row < size && !found; row += 1) {
    for (let col = 0; col < size && !found; col += 1) {
      for (const [dr, dc] of directions) {
        const cells = [];
        let ok = true;
        for (let i = 0; i < word.length; i += 1) {
          const r = row + dr * i;
          const c = col + dc * i;
          const cell = grid.find((g) => g.row === r && g.col === c);
          if (!cell || cell.letter !== word[i]) { ok = false; break; }
          cells.push(cell);
        }
        if (ok && cells.length === word.length) { found = { word, cells }; break; }
      }
    }
  }
}

const first = await page.locator(`.wordsearch__cell[data-row="${found.cells[0].row}"][data-col="${found.cells[0].col}"]`).boundingBox();
const last = await page.locator(`.wordsearch__cell[data-row="${found.cells.at(-1).row}"][data-col="${found.cells.at(-1).col}"]`).boundingBox();
await page.mouse.move(first.x + first.width / 2, first.y + first.height / 2);
await page.mouse.down();
await page.mouse.move(last.x + last.width / 2, last.y + last.height / 2, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(1200);

const state = await page.evaluate(() => ({
  found: document.querySelectorAll('.wordsearch__cell.is-found').length,
  selected: document.querySelectorAll('.wordsearch__cell.is-selected').length,
}));
console.log('palabra:', found.word);
console.log('celdas marcadas como encontradas (deben quedar):', state.found);
console.log('celdas solo selecionadas (deben ser 0):', state.selected);
await page.screenshot({ path: `${OUT}/dia-11-sopa-marcada.png` });

await browser.close();
