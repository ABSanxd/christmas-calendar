import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/days';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

const openDay = async (fecha, day) => {
  await page.goto(`${BASE}?fecha=${fecha}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  if (await page.locator('.advent-ceremony [data-target="true"]').count()) {
    await page.locator('.advent-ceremony [data-target="true"]').click({ force: true });
    await page.locator('[data-ceremony-continue]').waitFor({ state: 'visible', timeout: 15000 });
    await page.locator('[data-ceremony-continue]').click();
    await page.waitForTimeout(1200);
    await page.locator('.sunday-reflection__footer .button').click();
    await page.waitForTimeout(400);
  }
  await page.locator(`.calendar-day[data-day="${day}"]`).click();
  await page.waitForTimeout(600);
};

// --- DÍA 11: sopa de letras con arrastre ---
console.log('=== día 11: sopa de letras ===');
await openDay('2026-12-11', 11);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  intro:', (await page.locator('.activity__intro').textContent())?.trim());
console.log('  instrucción:', (await page.locator('.activity__instruction').textContent())?.trim());
console.log('  cierre:', (await page.locator('.activity__closing').textContent())?.trim());

// Se localiza una palabra en la cuadrícula y se arrastra sobre ella.
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

console.log('  palabra elegida:', found?.word);
const first = await page.locator(`.wordsearch__cell[data-row="${found.cells[0].row}"][data-col="${found.cells[0].col}"]`).boundingBox();
const last = await page.locator(`.wordsearch__cell[data-row="${found.cells.at(-1).row}"][data-col="${found.cells.at(-1).col}"]`).boundingBox();

await page.mouse.move(first.x + first.width / 2, first.y + first.height / 2);
await page.mouse.down();
await page.mouse.move(last.x + last.width / 2, last.y + last.height / 2, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(700);

console.log('  aviso tras arrastrar:', (await page.locator('.activity--wordsearch .activity__feedback').textContent())?.trim());
console.log('  palabras encontradas:', await page.locator('.wordsearch__word.is-found').count());
await page.screenshot({ path: `${OUT}/dia-11-sopa.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 7: solo el video ---
console.log('\n=== día 7: solo el video ===');
await openDay('2026-12-07', 7);
console.log('  letra:', await page.locator('.music__stanzas').count(), '(debe ser 0)');
console.log('  botón campanita:', await page.locator('.music__play').count(), '(debe ser 0)');
console.log('  juego de ritmo:', await page.locator('.rhythm').count(), '(debe ser 0)');
console.log('  reproductor:', await page.locator('.music__video-play').count());
await page.screenshot({ path: `${OUT}/dia-7-solo-video.png` });
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 8: reto ---
console.log('\n=== día 8: reto ===');
await openDay('2026-12-08', 8);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  subtítulo:', (await page.locator('.modal__subtitle').textContent())?.trim());
const steps8 = await page.locator('.activity__step-label').allTextContents();
steps8.forEach((s, i) => console.log(`  reto ${i + 1}: ${s}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 12 ---
console.log('\n=== día 12 ===');
await openDay('2026-12-12', 12);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
const steps12 = await page.locator('.activity__step-label').allTextContents();
steps12.forEach((s, i) => console.log(`  reto ${i + 1}: ${s}`));
await page.locator('.modal__close').click();
await page.waitForTimeout(300);

// --- DÍA 13 ---
console.log('\n=== día 13 ===');
await openDay('2026-12-13', 13);
console.log('  versículo:', (await page.locator('.verse-block blockquote').textContent())?.trim());
console.log('  mini-reto:', (await page.locator('.activity__challenge').textContent())?.trim());
await page.screenshot({ path: `${OUT}/dia-13-minireto.png` });

await browser.close();
