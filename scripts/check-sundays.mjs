/**
 * Comprobación de las velas de la corona en los cuatro domingos de Adviento.
 *
 * En cada domingo el visitante tiene que ENCENDER la vela: la corona sale de
 * su esquina, se abre la ceremonia y la llama aparece cuando el usuario
 * toca la vela pendiente. El script hace lo mismo que el visitante.
 */

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

let failures = 0;

for (const testCase of cases) {
  // Cada caso necesita un navegador limpio: el progreso se guarda.
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto(`${BASE}?fecha=${testCase.date}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600);

  // Si hay ceremonia, el visitante enciende la vela y cierra la ceremonia.
  const pending = page.locator('.advent-ceremony [data-target="true"]');
  let hint = '';
  if (await pending.count()) {
    hint = (await page.locator('[data-ceremony-hint-text]').textContent())?.trim() ?? '';
    await pending.click({ force: true });
    const continueButton = page.locator('[data-ceremony-continue]');
    await continueButton.waitFor({ state: 'visible', timeout: 15000 });
    await continueButton.click();
    await page.waitForTimeout(1200);
    // La reflexión del domingo se abre al cerrar la ceremonia.
    await page.locator('.sunday-reflection__footer .button').click();
    await page.waitForTimeout(500);
  }

  const result = await page.evaluate(() => {
    const lit = Array.from(
      document.querySelectorAll('.hero__wreath [data-candle][data-lit="true"]'),
    ).length;
    return {
      lit,
      label: document.querySelector('.hero__wreath .advent-wreath__svg')?.getAttribute('aria-label') ?? '',
      litCount: document.querySelector('.hero__wreath .advent-wreath')?.dataset.litCount,
      ceremonyOpen: document.querySelectorAll('.advent-ceremony').length,
    };
  });

  const ok = result.lit === testCase.expected && result.ceremonyOpen === 0;
  if (!ok) failures += 1;
  console.log(
    `${ok ? '✓' : '✗'} ${testCase.name.padEnd(22)} velas encendidas: ${result.lit} (esperado ${testCase.expected})`,
  );
  if (hint) console.log(`    ceremonia: ${hint}`);
  console.log(`    ${result.label}`);
  if (errors.length) console.log(`    ERRORES: ${errors.join(' | ')}`);

  await page.close();
}

console.log(failures === 0 ? '\nTodo correcto.' : `\n${failures} comprobación(es) fallida(s).`);
await browser.close();
