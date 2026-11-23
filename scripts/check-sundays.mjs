import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] ?? 'http://localhost:5173/';

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });

const cases = [
  { date: '2026-11-29', expected: 1, name: 'Primer domingo' },
  { date: '2026-12-06', expected: 2, name: 'Segundo domingo' },
  { date: '2026-12-13', expected: 3, name: 'Gaudete' },
  { date: '2026-12-20', expected: 4, name: 'Cuarto domingo' },
  { date: '2026-12-24', expected: 4, name: 'Nochebuena' },
  { date: '2026-11-20', expected: 0, name: 'Antes del Adviento' },
];

for (const testCase of cases) {
  // Cada caso necesita un navegador limpio: el progreso se guarda.
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto(`${BASE}?fecha=${testCase.date}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(9000);

  const result = await page.evaluate(() => {
    const lit = Array.from(document.querySelectorAll('[data-candle]')).filter(
      (candle) => candle.dataset.lit === 'true',
    ).length;
    return {
      lit,
      caption: document.querySelector('.advent-wreath__caption')?.textContent ?? '',
      message: document.querySelector('[data-advent-message]')?.textContent ?? '',
      litCount: document.querySelector('.advent-wreath')?.dataset.litCount,
    };
  });

  const ok = result.lit === testCase.expected;
  console.log(
    `${ok ? '✓' : '✗'} ${testCase.name.padEnd(22)} velas encendidas: ${result.lit} (esperado ${testCase.expected})`,
  );
  console.log(`    ${result.caption}`);
  if (errors.length) console.log(`    ERRORES: ${errors.join(' | ')}`);

  await page.close();
}

await browser.close();
