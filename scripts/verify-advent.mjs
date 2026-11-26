/**
 * Verificación de la ceremonia de Adviento y del nuevo lugar del pozo.
 *
 * Uso:
 *   node scripts/verify-advent.mjs [url]
 */

import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:5177/';
const OUT = 'C:/Users/boyit/AppData/Local/Temp/opencode/calendario-shots/advent';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error' || message.type() === 'warning') {
    errors.push(`[${message.type()}] ${message.text()}`);
  }
});
page.on('pageerror', (error) => errors.push(`[pageerror] ${error.message}`));

/** Estado del DOM en un momento dado. */
const state = () =>
  page.evaluate(() => ({
    ceremony: document.querySelectorAll('.advent-ceremony').length,
    pending: document.querySelector('.advent-ceremony [data-target="true"]')?.dataset.candle ?? '-',
    hint: document.querySelector('[data-ceremony-hint-text]')?.textContent?.trim() ?? '-',
    message: document.querySelector('[data-ceremony-message]')?.textContent?.trim() ?? '-',
    litCorner: document.querySelectorAll('.hero__wreath [data-lit="true"]').length,
    cursor: document.documentElement.style.cursor.slice(0, 42),
  }));

// --- 1. Domingo 29 de noviembre: debe empezar la ceremonia -----------------
await page.goto(`${BASE}?fecha=2026-11-29`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
console.log('1) antes de tocar:', JSON.stringify(await state()));
await page.screenshot({ path: `${OUT}/01-ceremonia.png` });

// --- 2. El usuario enciende la vela ----------------------------------------
await page.locator('.advent-ceremony [data-target="true"]').click({ force: true });
await page.waitForTimeout(1200);
console.log('2) vela encendida:', JSON.stringify(await state()));
await page.screenshot({ path: `${OUT}/02-vela-encendida.png` });

// La ceremonia espera: el usuario la cierra y se abre la reflexión.
const continueButton = page.locator('[data-ceremony-continue]');
await continueButton.waitFor({ state: 'visible', timeout: 15000 });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/02b-esperando-cierre.png` });
await continueButton.click();
await page.waitForTimeout(1200);

const reflection = await page.evaluate(() => ({
  modal: document.querySelectorAll('.sunday-reflection').length,
  title: document.querySelector('.sunday-reflection__item-title')?.textContent ?? '',
  gospel: document.querySelector('.sunday-reflection__gospel')?.textContent?.slice(0, 60) ?? '',
}));
console.log('3) reflexión abierta:', JSON.stringify(reflection));
await page.screenshot({ path: `${OUT}/03-reflexion.png` });

await page.locator('.sunday-reflection__footer .button').click();
await page.waitForTimeout(600);

console.log('4) de vuelta:', JSON.stringify(await state()));
await page.screenshot({ path: `${OUT}/04-vuelta.png` });

// --- 5. El pozo y la mujer --------------------------------------------------
await page.locator('#scene-village-well').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const well = await page.locator('#scene-village-well').boundingBox();
console.log('5) pozo:', JSON.stringify(well));
await page.locator('.calendar__scene').screenshot({ path: `${OUT}/05-escena.png` });
await page.screenshot({
  path: `${OUT}/05b-pozo.png`,
  clip: { x: well.x - 90, y: well.y - 110, width: well.width + 190, height: well.height + 130 },
});

// --- 5. Los cuatro domingos y los días deTranslated ------------------------
for (const [label, fecha] of [
  ['05-segundo', '2026-12-06'],
  ['06-tercer', '2026-12-13'],
  ['07-cuarto', '2026-12-20'],
  ['08-antes', '2026-11-20'],
  ['09-antes-adviento', '2026-11-28'],
  ['10-navidad', '2026-12-25'],
]) {
  await page.goto(`${BASE}?fecha=${fecha}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2800);
  console.log(`${label} ${fecha}:`, JSON.stringify(await state()));
  await page.screenshot({ path: `${OUT}/${label}.png` });
}

console.log('\n--- Consola ---');
if (errors.length === 0) console.log('Sin errores ni avisos.');
else errors.slice(0, 30).forEach((error) => console.log(error));

await browser.close();
